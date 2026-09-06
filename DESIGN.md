# Design System — ZAP (Charte Officielle)

> Document de référence officiel régissant l'identité visuelle de **ZAP**.
> **Règle absolue** : Toute page actuelle ou future (Landing page, Dashboard, Login, Éditeur de documents, Pages solutions) doit se conformer strictement aux directives de ce document.

---

## 1. Direction Artistique & Ambiance

- **Positionnement** : Application SaaS de création et gestion de documents officiels (devis, factures, reçus, signature tactile et cachet numérique) pour les artisans et indépendants.
- **Thème officiel** : **Monochrome Luxe & Précision Artisanale (Noir, Blanc, Gris)**.
- **Atmosphère** : Sobriété radicale, orfèvrerie numérique, contrastes francs et haute lisibilité. Zéro fioriture inutile.

---

## 2. Palette de Couleurs Officielle

| Rôle | Token / Valeur CSS | Utilisation |
|---|---|---|
| **Fond Hero (WebGL)** | `#000000` | Noir pur absolu avec animation 3D Beams |
| **Fond Global Page** | `#09090B` | Fond unifié de l'application (Zinc-950) |
| **Surfaces & Cartes** | `#121215` | Cartes Bento, conteneurs, cartes de prix, formulaires |
| **Bordures par défaut** | `rgba(255, 255, 255, 0.08)` | Séparateurs, bordures de cartes au repos (1px) |
| **Bordures actives / Hover** | `rgba(255, 255, 255, 0.25)` | Cartes sélectionnées, survol, focus d'input |
| **Texte Primaire** | `#FFFFFF` | Titres, chiffres majeurs, boutons primaires, logos |
| **Texte Secondaire** | `#A1A1AA` | Paragraphes explicatifs, sous-titres, liens au repos |
| **Texte Discret (Muted)** | `#71717A` | Mentions légales, notes de bas de page, dates |
| **Accent Notation Unique** | `#FBBF24` | **Uniquement** pour les 5 étoiles de notation des avis |

### ⛔ Règles d'or & Anti-patterns strictement proscrits
1. **ZÉRO ÉMOJI** : Aucun émoji Unicode dans l'interface. Utiliser **exclusivement** les icônes SVG de `@heroicons/react` (outline ou solid).
2. **PLUS AUCUNE TEINTE DORÉE (`#D4AF37` / `#E2B170`)** : L'ancien thème or a été totalement banni au profit du monochrome pur (blanc / gris / noir).
3. **AUCUN DÉGRADÉ VIOLET / CYAN / NÉON "SaaS AI"** : Conserver un aspect artisanal, authentique et officiel.
4. **AUCUN FOND BLANC OU GRIS CLAIR EN PLEIN ÉCRAN** : L'application est exclusivement en Dark Mode haute précision.

---

## 3. Typographie

- **Titres & Display (`font-serif`)** : `DM Serif Display`
  - Utilisé pour : Logo ZAP, titres de section H1/H2, sceau officiel et métriques clés.
  - Évoque le cachet d'authenticité, le sceau légal et la signature artisanale.
- **Interface & Textes (`font-sans`)** : `DM Sans`
  - Utilisé pour : Descriptions, boutons CTA, tableaux, listes de fonctionnalités, navigation, formulaires.
  - Assure une lisibilité parfaite sur smartphone.

---

## 4. Composants & Standards Visuels

### A. Faisceaux Lumineux (Beams 3D)
- Utilisation : Arrière-plan du Hero.
- Caractéristiques : Faisceaux blancs (`lightColor="#ffffff"`) sur fond noir (`#000000`), vitesse modérée, rotation 30°.
- Optimisation : Gel automatique du rendu Three.js au défilement (`IntersectionObserver`) et quand l'onglet est inactif (`document.visibilityState`).

### B. Navigation Flottante (Floating Pill Navbar)
- Barre flottante en pilule (`max-w-5xl`), fond `rgba(10, 10, 10, 0.78)`, `backdrop-filter: blur(16px)`.
- Liens en gris `#A1A1AA` transitionnant vers `#FFFFFF` au survol.
- Logo ZAP blanc pur avec icône.

### C. Boutons d'Action (CTA)
- **Bouton Primaire** : Fond blanc `#FFFFFF`, texte noir `#000000`, `font-weight: 600`, bord arrondi `rounded-xl` (ou `10px`), léger halo blanc au survol (`box-shadow: 0 0 25px rgba(255,255,255,0.2)`).
- **Bouton Secondaire** : Fond `rgba(255, 255, 255, 0.05)`, bordure `rgba(255, 255, 255, 0.12)`, texte blanc `#FFFFFF`.

### D. Cartes Bento & Conteneurs
- Fond `#121215`, bordure `1px solid rgba(255, 255, 255, 0.08)`, angles arrondis `rounded-2xl`.
- Encart d'icône : carré arrondi (`rounded-xl`) en `bg-white/[0.06]` avec icône blanche.
