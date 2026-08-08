#!/usr/bin/env bash
set -euo pipefail

REPO="/mnt/c/Users/lmari/OneDrive/Escritorio/Maestría/Codigo/nisse"
cd "$REPO"

# Load nvm if present
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  # shellcheck disable=SC1090
  . "$NVM_DIR/nvm.sh"
fi

echo "== Node.js via nvm =="
if ! command -v node >/dev/null 2>&1; then
  nvm install 24
  nvm alias default 24
fi
nvm use default >/dev/null 2>&1 || true
node -v
npm -v

echo "== Python venv (Linux) =="
rm -rf .venv
python3 -m venv .venv
# shellcheck disable=SC1091
source .venv/bin/activate
pip install -U pip
pip install -r backend/requirements.txt
python -c 'import django; print("Django", django.get_version())'

echo "== OpenSpec CLI =="
if ! command -v openspec >/dev/null 2>&1; then
  npm install -g @fission-ai/openspec@latest
fi
openspec --version

echo "Done."
echo "Activate: source .venv/bin/activate && . \"\$NVM_DIR/nvm.sh\""
