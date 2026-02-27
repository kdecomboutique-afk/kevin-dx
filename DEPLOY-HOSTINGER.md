# Deploiement kevin-dx.fr sur Hostinger

## Etape 1 : Build de production

```bash
npm run build
```

Le dossier `out/` contient le site statique complet (48 pages).

## Etape 2 : Upload sur Hostinger

### Methode A : File Manager (plus simple)

1. Connecte-toi sur [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Va dans **Sites Web** > ton domaine > **Gestionnaire de fichiers**
3. Ouvre le dossier `public_html/`
4. **Supprime tout** le contenu existant dans `public_html/`
5. Compresse le dossier `out/` en zip :
   ```bash
   cd out && zip -r ../kevin-dx-deploy.zip . && cd ..
   ```
6. Upload `kevin-dx-deploy.zip` dans `public_html/`
7. Clique droit > **Extraire** le zip
8. Supprime le fichier zip apres extraction

### Methode B : FTP/SFTP (FileZilla)

1. Dans hPanel > **Fichiers** > **Comptes FTP**, note les identifiants :
   - Hote : ftp.kevin-dx.fr (ou IP du serveur)
   - Port : 21 (FTP) ou 22 (SFTP)
   - Utilisateur : ton identifiant FTP
   - Mot de passe : ton mot de passe FTP
2. Connecte-toi avec FileZilla
3. Navigue vers `/public_html/`
4. Upload TOUT le contenu du dossier `out/` (pas le dossier lui-meme)

### Methode C : Git Auto Deploy

1. Push le code sur GitHub
2. Dans hPanel > **Avance** > **Git**
3. Configure le repo GitHub
4. Ajoute un script de build :
   ```bash
   npm install && npm run build && cp -r out/* public_html/
   ```

## Etape 3 : Configuration DNS

### Si le domaine est achete chez Hostinger :
- Le DNS est deja configure, rien a faire.

### Si le domaine est achete ailleurs :
1. Va chez ton registrar (OVH, Gandi, etc.)
2. Modifie les nameservers vers :
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
   (Les nameservers exacts sont dans hPanel > DNS Zone)
3. Attends la propagation (jusqu'a 48h)

## Etape 4 : SSL (HTTPS)

1. hPanel > **Securite** > **SSL**
2. Clique **Installer SSL** (Let's Encrypt gratuit)
3. Selectionne le domaine `kevin-dx.fr`
4. Coche aussi `www.kevin-dx.fr`
5. Active **Forcer HTTPS** dans les parametres

## Etape 5 : Verification post-deploiement

- [ ] Le site charge sur https://kevin-dx.fr
- [ ] La redirection www -> non-www fonctionne
- [ ] Toutes les pages sont accessibles
- [ ] Le formulaire de contact envoie (tester avec Formspree)
- [ ] Le formulaire de devis envoie (tester avec Formspree)
- [ ] Les images s'affichent correctement
- [ ] La banniere cookies apparait
- [ ] Le sitemap est accessible : https://kevin-dx.fr/sitemap.xml
- [ ] Le robots.txt est accessible : https://kevin-dx.fr/robots.txt
- [ ] Le SSL est actif (cadenas vert)
- [ ] Lighthouse : Performance > 90, SEO > 90

## Etape 6 : Email professionnel

1. hPanel > **Emails** > **Comptes email**
2. Cree `contact@kevin-dx.fr`
3. Les records MX/SPF/DKIM sont configures automatiquement par Hostinger
4. Utilise cette adresse comme destinataire Formspree

## Commandes utiles

```bash
# Build
npm run build

# Zipper pour upload
cd out && zip -r ../kevin-dx-deploy.zip . && cd ..

# Tester localement
npx serve out
```
