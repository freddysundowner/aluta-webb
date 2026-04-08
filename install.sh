#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# Aluta Technology Ventures — Server Install Script
# Run this INSIDE the unzipped aluta-deploy/ folder:
#   unzip aluta-deploy.zip -d aluta-deploy
#   cd aluta-deploy
#   sudo bash install.sh
#
# The server needs no build tools — everything is pre-built in this package.
# ─────────────────────────────────────────────────────────────────────────────

DOMAIN="alutatechnologies.com"
WWW_DOMAIN="www.alutatechnologies.com"
SITE_ROOT="/var/www/alutatechnologies"
API_DIR="/opt/aluta-api"
API_PORT="8080"
NODE_VERSION="22"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Colours ──────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()    { echo -e "${GREEN}[✓]${NC} $*"; }
warn()    { echo -e "${YELLOW}[!]${NC} $*"; }
fatal()   { echo -e "${RED}[✗]${NC} $*"; exit 1; }
section() { echo -e "\n${GREEN}━━━ $* ━━━${NC}"; }

# ── Detect source layout ──────────────────────────────────────────────────────
# Supports two modes:
#   1. Unzipped package:  ./public/  and ./api/
#   2. Repo root (after package.sh build): ./artifacts/aluta-website/dist/public/  and ./artifacts/api-server/dist/
[[ $EUID -ne 0 ]] && fatal "Run as root: sudo bash install.sh"

if [[ -d "$SCRIPT_DIR/public" && -d "$SCRIPT_DIR/api" ]]; then
  PUBLIC_SRC="$SCRIPT_DIR/public/"
  API_SRC="$SCRIPT_DIR/api/"
  info "Source: pre-built package"
elif [[ -d "$SCRIPT_DIR/artifacts/aluta-website/dist/public" && -d "$SCRIPT_DIR/artifacts/api-server/dist" ]]; then
  PUBLIC_SRC="$SCRIPT_DIR/artifacts/aluta-website/dist/public/"
  API_SRC="$SCRIPT_DIR/artifacts/api-server/dist/"
  info "Source: repo build output"
else
  fatal "Cannot find built files. Run 'bash package.sh' first, then re-run this script."
fi

# ── Collect secrets ──────────────────────────────────────────────────────────
section "Configuration"

if [[ -z "${BREVO_API_KEY:-}" ]]; then
  read -rsp "  Enter your BREVO_API_KEY: " BREVO_API_KEY; echo
fi
[[ -z "$BREVO_API_KEY" ]] && fatal "BREVO_API_KEY is required."

if [[ -z "${SESSION_SECRET:-}" ]]; then
  SESSION_SECRET=$(openssl rand -hex 32)
  warn "Generated SESSION_SECRET — save this somewhere safe: $SESSION_SECRET"
fi

read -rp "  Enter your email for SSL certificate (Let's Encrypt): " SSL_EMAIL
[[ -z "$SSL_EMAIL" ]] && fatal "SSL email is required."

info "Domain:   $DOMAIN"
info "Package:  $PACKAGE_DIR"

# ── System packages ───────────────────────────────────────────────────────────
section "Installing system packages"
apt-get update -qq
apt-get install -y -qq rsync nginx certbot python3-certbot-nginx ufw curl

# ── Node.js (runtime only — no build tools needed) ───────────────────────────
section "Installing Node.js $NODE_VERSION runtime"
if ! command -v node &>/dev/null || \
   [[ "$(node -e 'process.stdout.write(process.version.split(".")[0].slice(1))')" -lt "$NODE_VERSION" ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | bash -
  apt-get install -y -qq nodejs
fi
info "Node $(node --version)"

# ── Deploy static files ───────────────────────────────────────────────────────
section "Deploying website to $SITE_ROOT"
mkdir -p "$SITE_ROOT"
rsync -a --delete "$PUBLIC_SRC" "$SITE_ROOT/"
chown -R www-data:www-data "$SITE_ROOT"
info "Static files deployed"

# ── Deploy API server ─────────────────────────────────────────────────────────
section "Deploying API server to $API_DIR"
mkdir -p "$API_DIR"
rsync -a --delete "$API_SRC" "$API_DIR/dist/"

# Environment file — root-readable only (systemd reads before user switch)
cat > "$API_DIR/.env" <<EOF
PORT=$API_PORT
NODE_ENV=production
BREVO_API_KEY=$BREVO_API_KEY
SESSION_SECRET=$SESSION_SECRET
EOF
chmod 600 "$API_DIR/.env"
info "API files deployed"

# ── Systemd service ───────────────────────────────────────────────────────────
section "Creating systemd service: aluta-api"

# Resolve the node binary path now — avoids stale PATH issues under sudo
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
systemctl restart aluta-api

sleep 3
if ! systemctl is-active --quiet aluta-api; then
  fatal "aluta-api failed to start. Check logs: journalctl -u aluta-api -n 50"
fi
info "aluta-api service started and healthy"

# ── Nginx ─────────────────────────────────────────────────────────────────────
section "Configuring nginx for $DOMAIN"

cat > /etc/nginx/sites-available/alutatechnologies <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name alutatechnologies.com www.alutatechnologies.com;

    root /var/www/alutatechnologies;
    index index.html;

    # API proxy — full URI passed to Express unchanged
    location /api {
        proxy_pass         http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # Long-lived cache for hashed static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # SPA fallback — React Router handles all other paths
    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/alutatechnologies /etc/nginx/sites-enabled/alutatechnologies
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
info "nginx configured"

# ── Firewall ──────────────────────────────────────────────────────────────────
section "Configuring firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
info "Firewall: SSH + HTTP + HTTPS allowed"

# ── SSL ───────────────────────────────────────────────────────────────────────
section "Obtaining SSL certificate"
warn "DNS A records for $DOMAIN and $WWW_DOMAIN must point to this server's IP."
read -rp "  Press ENTER once DNS is pointing here, or Ctrl+C to skip SSL: "

certbot --nginx \
  --non-interactive \
  --agree-tos \
  --email "$SSL_EMAIL" \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN" \
  --redirect

info "SSL certificate installed — HTTPS active with auto-redirect"

# Auto-renewal
if systemctl list-unit-files | grep -q "certbot.timer"; then
  systemctl enable --now certbot.timer
  info "certbot.timer enabled for auto-renewal"
else
  (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'") \
    | sort -u | crontab -
  info "Cron job added for auto-renewal"
fi

# ── Done ──────────────────────────────────────────────────────────────────────
section "Installation complete"
echo ""
echo -e "  ${GREEN}Website:${NC}  https://$DOMAIN"
echo -e "  ${GREEN}API:${NC}      http://127.0.0.1:$API_PORT  (internal only)"
echo -e "  ${GREEN}Logs:${NC}     journalctl -u aluta-api -f"
echo -e "  ${GREEN}Renew:${NC}    certbot renew --dry-run"
echo ""
info "To update the site, download a new package zip and re-run this script."
