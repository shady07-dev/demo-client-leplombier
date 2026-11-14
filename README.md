# LE PLOMBIER — Site vitrine (v1)

Refonte de https://www.leplombier73.fr/ — HTML/CSS/JS statique, sans build.

## Structure

```
index.html · prestations.html · garanties.html · contact.html · mentions-legales.html
assets/
├── css/
│   ├── base/        variables (couleurs, typo…), reset, typography, utilities
│   ├── layout/      header, footer
│   ├── components/  buttons, sections, cards, forms, accordion, animations
│   └── pages/       home, prestations, garanties, contact, legal  (1 fichier par page)
├── js/
│   ├── core/        utils (namespace LP), icons (icônes SVG via data-icon)
│   ├── components/  header, reveal, counter, accordion, scroll-ui, bubbles
│   ├── pages/       home, prestations, contact  (1 fichier par page)
│   └── main.js      initialise les composants puis LP.pages[<body data-page>]
└── img/             logo d'origine (2 versions), favicon, photos/
```

Les noms de pages reprennent les URL d'origine (`prestations.html`, etc.) pour conserver le référencement.

## Ajouter une page
1. Copier une page existante, changer `<body data-page="xxx">` et le `<title>`.
2. Créer `assets/css/pages/xxx.css` (et au besoin `assets/js/pages/xxx.js` qui déclare `LP.pages.xxx = { init() {} }`).

## Couleurs
Définies dans `assets/css/base/variables.css` — vert du logo d'origine : `#01B598`.

## À faire
- Formulaire de contact : ouvre actuellement la messagerie (mailto). Brancher un service d'envoi dans `assets/js/pages/contact.js`.
- Compléter les mentions légales (forme juridique, directeur de publication, hébergeur).
- Photos : seule la photo de la bannière d'origine (basse résolution) était disponible — des photos HD de chantiers amélioreraient fortement le rendu.
