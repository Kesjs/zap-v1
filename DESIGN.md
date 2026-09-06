# Design System — ZAP

> Document de référence généré selon les directives de design Impeccable (`/impeccable document`).
> Toute modification ultérieure doit respecter ce document pour maintenir l'identité visuelle "Luxe & Premium".

---

## 1. Direction Artistique & Ambiance

- **Positionnement** : Application de gestion de documents officiels (reçus, devis, factures) pour les artisans et indépendants d'Afrique de l'Ouest.
- **Thème** : Dark Mode "Luxe & Premium" exclusif.
- **Atmosphère** : Précision artisanale, sobriété, orfèvrerie numérique, zéro fioriture superflue.

---

## 2. Palette de Couleurs

| Rôle | Token CSS / HEX | Utilisation |
|---|---|---|
| **Background Principal** | `--color-bg` / `#0C0C0C` | Fond pleine page, noir chaud et profond |
| **Surfaces & Cartes** | `--color-surface` / `#171717` | Cartes Bento, conteneurs, cards pricing |
| **Bordures Subtiles** | `--color-border` / `#262626` | Séparateurs, bordures au repos (1px) |
| **Texte Primaire** | `--color-text` / `#F4F4F5` | Titres, données chiffrées, texte fort |
| **Texte Secondaire** | `--color-text-muted` / `#A1A1AA` | Sous-titres, descriptions, métadonnées |
| **Accent Or Impérial** | `--color-accent` / `#D4AF37` | Badges, CTA primaire, bordures actives, icônes |
| **Accent Or Chaud** | `--color-accent-warm` / `#E2B170` | Dégradés subtils sur les halos et hover |

### Règles d'or (Anti-patterns proscrits)
-  **Aucun dégradé violet / cyan / néon "SaaS AI".**
-  **Aucun fond blanc ou gris froid d'ordinateur.**
-  **Aucune couleur non harmonisée avec le noir et l'or.**

---

## 3. Typographie

- **Titres & Display (`font-serif`)** : `DM Serif Display`
  - Utilisé pour le Logo ZAP, les H1, H2 et chiffres majeurs.
  - Évoque le cachet d'authenticité, la signature et le sceau officiel.
- **Corps de texte & Interface (`font-sans`)** : `DM Sans`
  - Lisibilité optimale sur mobile et contraste net.
  - Utilisé pour les descriptions, boutons, listes et navigation.

---

## 4. Composants & Effets Clés

1. **Beams (React Bits / Three.js)** :
   - Faisceaux 3D subtils en arrière-plan du Hero.
   - Teinte champagne/or tamisée sans éblouissement.

2. **BorderGlow (Survol interactif)** :
   - Halo lumineux suivant la position du curseur sur les cartes Bento et la carte Pro.
   - Gradient radial chaud (`#D4AF37` vers `#E2B170` à faible opacité).

3. **Crossfade Avant / Après (Cachet Numérique)** :
   - Présentation interactive du document brut vs document officiel certifié avec sceau.

4. **Floating Navbar** :
   - Pilule flottante sticky (`#0C0C0C` à 85% d'opacité avec `backdrop-blur: 16px`).
   - Logo ZAP en or, liens sobres, CTA compact.

---

## 5. Icônes & Éléments Graphiques

- **Bibliothèque unique** : Heroicons (`@heroicons/react/24/outline` & `solid`).
- **Images** : Photographies Unsplash authentiques d'artisans et scènes réelles.
- **Zéro emoji** dans l'interface professionnelle.
