#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# Aluta Technology Ventures — Package Script
# Run this in Replit to produce aluta-deploy.zip
# Usage: bash package.sh
#
# Output: aluta-deploy.zip — upload this to your server, then:
#   unzip aluta-deploy.zip -d aluta-deploy
#   cd aluta-deploy
#   sudo bash install.sh
# ─────────────────────────────────────────────────────────────────────────────

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_ZIP="$REPO_DIR/aluta-deploy.zip"

GREEN='\033[0;32m'; NC='\033[0m'
info()    { echo -e "${GREEN}[✓]${NC} $*"; }
section() { echo -e "\n${GREEN}━━━ $* ━━━${NC}"; }

# ── Install dependencies ──────────────────────────────────────────────────────
section "Installing dependencies"
cd "$REPO_DIR"
pnpm install --frozen-lockfile
info "Dependencies ready"

# ── Build frontend ─────────────────────────────────────────────────────────────
section "Building frontend"
# PORT and BASE_PATH satisfy vite.config.ts requirements.
# NODE_ENV=production skips Replit-only dev plugins.
PORT=3000 BASE_PATH=/ NODE_ENV=production \
  pnpm --filter @workspace/aluta-website run build
info "Frontend built → artifacts/aluta-website/dist/public/"

# ── Build API server ───────────────────────────────────────────────────────────
section "Building API server"
pnpm --filter @workspace/api-server run build
info "API built → artifacts/api-server/dist/"

# ── Assemble the deployment package ───────────────────────────────────────────
section "Assembling package"
STAGING=$(mktemp -d)
trap 'rm -rf "$STAGING"' EXIT

mkdir -p "$STAGING/public" "$STAGING/api"

rsync -a "$REPO_DIR/artifacts/aluta-website/dist/public/" "$STAGING/public/"
rsync -a "$REPO_DIR/artifacts/api-server/dist/"          "$STAGING/api/"
cp    "$REPO_DIR/install.sh"                              "$STAGING/install.sh"
chmod +x "$STAGING/install.sh"

info "Staged: $(du -sh "$STAGING" | cut -f1) total"

# ── Zip ────────────────────────────────────────────────────────────────────────
section "Creating aluta-deploy.zip"
rm -f "$OUT_ZIP"
cd "$STAGING"
zip -r "$OUT_ZIP" . -x "*.DS_Store"
cd "$REPO_DIR"

ZIP_SIZE=$(du -sh "$OUT_ZIP" | cut -f1)
info "Created: aluta-deploy.zip ($ZIP_SIZE)"

# ── Instructions ──────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━ Next steps ━━━${NC}"
echo "  1. Download aluta-deploy.zip from the Files panel"
echo "  2. Upload it to your server (scp or SFTP)"
echo "  3. On the server:"
echo "       unzip aluta-deploy.zip -d aluta-deploy"
echo "       cd aluta-deploy"
echo "       sudo bash install.sh"
echo ""
