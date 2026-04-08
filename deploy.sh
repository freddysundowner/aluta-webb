#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# Aluta Technology Ventures — Production Deployment Script
# Targets: Ubuntu 22.04 / 24.04 LTS (or any Debian-based system)
# Usage:   sudo bash deploy.sh
# ─────────────────────────────────────────────────────────────────────────────

DOMAIN="alutatechnologies.com"
WWW_DOMAIN="www.alutatechnologies.com"
SITE_ROOT="/var/www/alutatechnologies"
API_DIR="/opt/aluta-api"
API_PORT="8080"
NODE_VERSION="22"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Colours ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()    { echo -e "${GREEN}[✓]${NC} $*"; }
warn()    { echo -e "${YELLOW}[!]${NC} $*"; }
fatal()   { echo -e "${RED}[✗]${NC} $*"; exit 1; }
section() { echo -e "\n${GREEN}━━━ $* ━━━${NC}"; }

# ── Root check ───────────────────────────────────────────────────────────────
[[ $EUID -ne 0 ]] && fatal "Run this script as root: sudo bash deploy.sh"

# ── Collect secrets ──────────────────────────────────────────────────────────
section "Configuration"

if [[ -z "${BREVO_API_KEY:-}" ]]; then
  read -rsp "  Enter your BREVO_API_KEY: " BREVO_API_KEY; echo
fi
[[ -z "$BREVO_API_KEY" ]] && fatal "BREVO_API_KEY is required."

if [[ -z "${SESSION_SECRET:-}" ]]; then
  SESSION_SECRET=$(openssl rand -hex 32)
  warn "Generated SESSION_SECRET (save this safely): $SESSION_SECRET"
fi

read -rp "  Enter your email for SSL certificate (Let's Encrypt): " SSL_EMAIL
[[ -z "$SSL_EMAIL" ]] && fatal "SSL email is required."

info "Domain:  $DOMAIN"
info "Repo:    $REPO_DIR"

# ── System packages ──────────────────────────────────────────────────────────
section "Installing system packages"
apt-get update -qq
apt-get install -y -qq curl git rsync nginx certbot python3-certbot-nginx ufw

# ── Node.js ──────────────────────────────────────────────────────────────────
section "Installing Node.js $NODE_VERSION"
if ! command -v node &>/dev/null || \
   [[ "$(node -e 'process.stdout.write(process.version.split(".")[0].slice(1))')" -lt "$NODE_VERSION" ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | bash -
  apt-get install -y -qq nodejs
fi
info "Node $(node --version)"

# ── pnpm ─────────────────────────────────────────────────────────────────────
section "Installing pnpm"
if ! command -v pnpm &>/dev/null; then
  npm install -g pnpm@latest --quiet
fi
info "pnpm $(pnpm --version)"

# ── Build the project ─────────────────────────────────────────────────────────
section "Installing dependencies & building"
cd "$REPO_DIR"
pnpm install --frozen-lockfile

# Build frontend
# PORT and BASE_PATH are required by vite.config.ts; NODE_ENV=production
# prevents Replit-specific dev plugins from being loaded.
info "Building frontend…"
PORT=3000 BASE_PATH=/ NODE_ENV=production \
  pnpm --filter @workspace/aluta-website run build

# Build API server
info "Building API server…"
pnpm --filter @workspace/api-server run build

info "Build complete"

# ── Deploy static files ───────────────────────────────────────────────────────
section "Deploying static files to $SITE_ROOT"
mkdir -p "$SITE_ROOT"
rsync -a --delete "$REPO_DIR/artifacts/aluta-website/dist/public/" "$SITE_ROOT/"
chown -R www-data:www-data "$SITE_ROOT"
info "Static files deployed"

# ── Deploy API server ─────────────────────────────────────────────────────────
section "Deploying API server to $API_DIR"
mkdir -p "$API_DIR"
rsync -a --delete "$REPO_DIR/artifacts/api-server/dist/" "$API_DIR/dist/"

# Write environment file (root-readable only; systemd reads it before user switch)
cat > "$API_DIR/.env" <<EOF
PORT=$API_PORT
NODE_ENV=production
BREVO_API_KEY=$BREVO_API_KEY
SESSION_SECRET=$SESSION_SECRET
EOF
chmod 600 "$API_DIR/.env"
info "API files deployed"

# ── Systemd service for the API ───────────────────────────────────────────────
section "Creating systemd service: aluta-api"

# Resolve node path now (before writing the unit file) so it works even if
# the binary was just installed and isn't yet on sudo's PATH.
NODE_BIN="$(command -v node || true)"
[[ -z "$NODE_BIN" ]] && NODE_BIN="/usr/bin/node"

cat > /etc/systemd/system/aluta-api.service <<EOF
[Unit]
Description=Aluta Technology Ventures API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=$API_DIR
EnvironmentFile=$API_DIR/.env
ExecStart=$NODE_BIN --enable-source-maps $API_DIR/dist/index.mjs
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal
SyslogIdentifier=aluta-api

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable aluta-api
# restart (not just start) so redeployments also pick up new code
systemctl restart aluta-api

# Give the process a moment then confirm it's running
sleep 3
if ! systemctl is-active --quiet aluta-api; then
  fatal "aluta-api failed to start. Run: journalctl -u aluta-api -n 50"
fi
info "aluta-api service started and healthy"

# ── Nginx configuration ───────────────────────────────────────────────────────
# Written using a single-quoted heredoc so nginx variables ($host etc.)
# are preserved verbatim. Domain names and paths are hardcoded deliberately.
section "Configuring nginx for $DOMAIN"

cat > /etc/nginx/sites-available/alutatechnologies <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name alutatechnologies.com www.alutatechnologies.com;

    root /var/www/alutatechnologies;
    index index.html;

    # ── API proxy ────────────────────────────────────────────────────────────
    # Matches /api and /api/* — passes the full URI to Express unchanged.
    location /api {
        proxy_pass         http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # ── Long-lived cache for hashed assets ──────────────────────────────────
    # Placed before the SPA catch-all so the regex takes priority for assets.
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # ── SPA fallback ─────────────────────────────────────────────────────────
    # All other paths serve index.html so React Router handles routing.
    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX

# Enable the site, remove the default placeholder
ln -sf /etc/nginx/sites-available/alutatechnologies /etc/nginx/sites-enabled/alutatechnologies
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx
info "nginx configured"

# ── Firewall ──────────────────────────────────────────────────────────────────
section "Configuring firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
info "Firewall rules applied (SSH + HTTP + HTTPS)"

# ── SSL certificate via Let's Encrypt ────────────────────────────────────────
section "Obtaining SSL certificate"
warn "DNS A records for $DOMAIN and $WWW_DOMAIN must point to this server's IP."
read -rp "  Press ENTER once DNS is live, or Ctrl+C to skip SSL for now: "

certbot --nginx \
  --non-interactive \
  --agree-tos \
  --email "$SSL_EMAIL" \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN" \
  --redirect

info "SSL certificate installed — HTTPS enabled with auto-redirect"

# Ensure auto-renewal. certbot.timer is available on Ubuntu 22.04+ when
# certbot is installed via apt. Use grep to reliably detect it, then fall
# back to a cron job on older systems.
if systemctl list-unit-files | grep -q "certbot.timer"; then
  systemctl enable --now certbot.timer
  info "certbot.timer enabled for auto-renewal"
else
  (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'") \
    | sort -u | crontab -
  info "Cron job added for auto-renewal (certbot.timer not found)"
fi

# ── Done ──────────────────────────────────────────────────────────────────────
section "Deployment complete"
echo ""
echo -e "  ${GREEN}Website:${NC}  https://$DOMAIN"
echo -e "  ${GREEN}API:${NC}      http://127.0.0.1:$API_PORT  (internal only)"
echo -e "  ${GREEN}Logs:${NC}     journalctl -u aluta-api -f"
echo -e "  ${GREEN}Renew:${NC}    certbot renew --dry-run"
echo ""
info "To redeploy after code changes, pull the latest code and re-run this script."
