# Maison Deeya

Site web moderne, premium et responsive pour **Maison Deeya**, une patisserie haut de gamme situee a Faya, Abidjan.

Le site met en avant l'univers de la marque, les specialites, les services, la galerie, la localisation et un module simple de commande en ligne avec panier.

## Apercu

Fonctionnalites principales :

- Hero immersif avec image premium, CTA et effet de scroll.
- Sections : A propos, Specialites, Experience client, Services, Galerie, Commande, Localisation.
- Panier interactif avec ajout, retrait, quantites et total estime.
- Liens rapides vers WhatsApp, Glovo et appel telephonique.
- Carte Google Maps integree pour Maison Deeya a Faya, Abidjan.
- Animations fluides avec Framer Motion.
- Interface responsive mobile, tablette et desktop.
- SEO configure dans `app/layout.tsx`.

## Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Installation

Installer les dependances :

```bash
npm install
```

Lancer le serveur de developpement :

```bash
npm run dev
```

Le site est disponible sur :

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Lance le serveur local Next.js.

```bash
npm run build
```

Compile le site pour la production et verifie TypeScript.

```bash
npm run start
```

Lance la version de production apres un build.

```bash
npm run lint
```

Lance le lint Next.js.

## Structure du projet

```text
.
├── app
│   ├── globals.css      # Styles globaux, theme, responsive masonry
│   ├── layout.tsx       # Metadata SEO et layout racine
│   └── page.tsx         # Page principale et logique du panier
├── next.config.mjs      # Configuration Next.js
├── package.json         # Scripts et dependances
├── tailwind.config.ts   # Theme Tailwind et couleurs Maison Deeya
└── tsconfig.json        # Configuration TypeScript
```

## Personnalisation

La plupart du contenu se trouve dans :

```text
app/page.tsx
```

Zones utiles a modifier :

- `products` : noms, descriptions, images et prix des produits.
- `gallery` : images de la galerie style Instagram.
- `reviews` : avis clients.
- Liens WhatsApp, Glovo et telephone dans la section commande.
- Adresse, horaires et texte de contact dans la section localisation et le footer.

Les couleurs du theme sont definies dans :

```text
tailwind.config.ts
```

Palette actuelle :

- creme
- blanc casse
- chocolat
- rose pastel
- dore leger
- vert pistache en accent discret

## Commande en ligne

Le panier est gere cote client dans `app/page.tsx`.

Comportement actuel :

- Ajouter un produit depuis les cards ou la section commande.
- Modifier les quantites avec les boutons plus et moins.
- Calcul automatique du total.
- Generation d'un message WhatsApp avec les produits selectionnes.

Avant mise en ligne, remplacer les placeholders :

```text
+225 07 00 00 00 00
https://wa.me/2250700000000
```

par le vrai numero de Maison Deeya.

## Images

Les images actuelles utilisent des URLs distantes Unsplash pour obtenir rapidement un rendu visuel premium.

Pour un site final de production, il est recommande de remplacer ces images par :

- photos reelles de la boutique,
- photos des desserts Maison Deeya,
- photos de l'equipe,
- visuels optimises et compresses.

## SEO

Les informations SEO sont dans :

```text
app/layout.tsx
```

Elements deja configures :

- titre,
- description,
- mots-cles,
- Open Graph,
- langue `fr`.

## Verification avant livraison

Commande recommandee :

```bash
npm run build
```

Le build doit se terminer sans erreur avant tout deploiement.

"# site_boulangerie" 
