#!/bin/bash
# Script de deploiement kevin-dx.fr
set -e

echo "=== Build de production ==="
npm run build

echo ""
echo "=== Creation du zip de deploiement ==="
cd out
zip -r ../kevin-dx-deploy.zip . -x "*.DS_Store"
cd ..

SIZE=$(du -h kevin-dx-deploy.zip | cut -f1)
echo ""
echo "=== Deploiement pret ==="
echo "Fichier : kevin-dx-deploy.zip ($SIZE)"
echo ""
echo "Prochaine etape :"
echo "1. Connecte-toi sur hpanel.hostinger.com"
echo "2. File Manager > public_html/"
echo "3. Upload kevin-dx-deploy.zip"
echo "4. Extraire le zip"
echo "5. Supprimer le zip"
