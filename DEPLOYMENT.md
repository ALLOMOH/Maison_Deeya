# Documentation de deploiement

Ce document explique comment deployer le site **Maison Deeya** en production.

## Prerequis

- Node.js 20 ou plus recent recommande.
- npm disponible.
- Le projet doit contenir `package.json` et `package-lock.json`.
- Le build doit passer localement.

Verification locale :

```bash
npm install
npm run build
```

## Option recommandee : Vercel

Vercel est l'option la plus simple pour un projet Next.js.

### Etapes

1. Mettre le projet dans un depot GitHub, GitLab ou Bitbucket.
2. Se connecter sur [Vercel](https://vercel.com).
3. Cliquer sur `Add New Project`.
4. Importer le depot du projet.
5. Laisser Vercel detecter automatiquement Next.js.
6. Verifier les commandes :

```text
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

7. Cliquer sur `Deploy`.

### Domaine personnalise

Dans Vercel :

1. Ouvrir le projet.
2. Aller dans `Settings`.
3. Aller dans `Domains`.
4. Ajouter le domaine, par exemple :

```text
maisondeeya.com
www.maisondeeya.com
```

5. Configurer les DNS selon les instructions Vercel.

## Option serveur Node.js

Cette option convient pour un VPS ou un serveur dedie.

### Installation sur le serveur

Cloner ou copier le projet sur le serveur, puis lancer :

```bash
npm install
npm run build
```

Demarrer le site :

```bash
npm run start
```

Par defaut, Next.js lance l'application sur :

```text
http://localhost:3000
```

### Lancer sur un port precis

```bash
npm run start -- -p 3000
```

## Deploiement avec PM2

PM2 permet de garder le site actif en arriere-plan.

Installer PM2 :

```bash
npm install -g pm2
```

Lancer l'application :

```bash
pm2 start npm --name maison-deeya -- run start
```

Voir le statut :

```bash
pm2 status
```

Voir les logs :

```bash
pm2 logs maison-deeya
```

Redemarrer :

```bash
pm2 restart maison-deeya
```

Arreter :

```bash
pm2 stop maison-deeya
```

## Configuration Nginx

Exemple de reverse proxy Nginx vers Next.js sur le port `3000`.

```nginx
server {
    listen 80;
    server_name maisondeeya.com www.maisondeeya.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Apres modification :

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## HTTPS avec Certbot

Installer Certbot puis generer le certificat :

```bash
sudo certbot --nginx -d maisondeeya.com -d www.maisondeeya.com
```

Verifier le renouvellement automatique :

```bash
sudo certbot renew --dry-run
```

## Variables et contenus a verifier avant production

Avant de deployer officiellement :

- Remplacer le numero WhatsApp placeholder.
- Remplacer le numero d'appel placeholder.
- Verifier le lien Glovo final si Maison Deeya possede une page directe.
- Remplacer les images Unsplash par les photos officielles.
- Verifier les prix.
- Verifier les horaires.
- Verifier les textes SEO dans `app/layout.tsx`.
- Tester le site sur mobile.

## Checklist de mise en ligne

```bash
npm install
npm run build
npm run start
```

Puis verifier :

- La page d'accueil s'affiche.
- Les images se chargent.
- Le panier fonctionne.
- Le bouton WhatsApp ouvre le bon numero.
- La carte Google Maps s'affiche.
- Le site est responsive.
- Aucun message d'erreur critique n'apparait dans la console navigateur.

## Maintenance

Pour mettre a jour le site :

1. Modifier les fichiers du projet.
2. Tester localement avec `npm run dev`.
3. Verifier avec `npm run build`.
4. Pousser les changements vers le depot Git.
5. Laisser Vercel redeployer automatiquement ou redemarrer le serveur Node.

