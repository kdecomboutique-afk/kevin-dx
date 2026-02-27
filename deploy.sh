#!/bin/bash
# Script de deploiement kevin-dx.fr via SSH/rsync
set -e

echo "=== Build de production ==="
npm run build

echo ""
echo "=== Deploiement SSH vers Hostinger ==="
rsync -avz --delete \
  --exclude='.DS_Store' \
  out/ hostinger-kevin-dx:~/domains/kevin-dx.fr/public_html/

echo ""
echo "=== Deploiement termine ==="
echo "Site live sur https://kevin-dx.fr"
