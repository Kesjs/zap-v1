# ZAP — Cockpit de Facturation & Devis Certifiés pour Artisans & Entrepreneurs (UEMOA / OHADA)

<p align="center">
  <img src="./public/banner.png" alt="ZAP Banner" width="100%" style="border-radius: 12px; border: 1px solid #262626;" onerror="this.style.display='none'"/>
</p>

<p align="center">
  <strong>Générez en 30 secondes des devis, factures et reçus officiels conformes aux normes OHADA/UEMOA, avec acompte d'atelier, règlement Mobile Money (Wave, MTN MoMo, Orange Money) et partage WhatsApp direct.</strong>
</p>

<p align="center">
  <a href="https://github.com/Kesjs/zap"><img src="https://img.shields.io/badge/GitHub-Kesjs%2Fzap-D4AF37?style=flat-square&logo=github" alt="GitHub Repo"/></a>
  <a href="#fonctionnalités-clés"><img src="https://img.shields.io/badge/Normes-OHADA%20%7C%20UEMOA%20%7C%20DGI-0C0C0C?style=flat-square&logo=blueprint" alt="Conformité"/></a>
  <a href="#stack-technique"><img src="https://img.shields.io/badge/Next.js-16%20(React%2019)-white?style=flat-square&logo=nextdotjs" alt="Next.js"/></a>
  <a href="#stack-technique"><img src="https://img.shields.io/badge/Devise-FCFA%20(XOF%2FXAF)-10B981?style=flat-square" alt="Devise"/></a>
</p>

---

## 📖 Sommaire

1. [Vision & Problématique Terrain](#-vision--problématique-terrain)
2. [Fonctionnalités Clés (Features de ZAP)](#-fonctionnalités-clés-features-de-zap)
   - [A. Cockpit Pro Mobile-First & Desktop](#a-cockpit-pro-mobile-first--desktop)
   - [B. Modèles Réels & Conformes (OHADA, UEMOA, DGI)](#b-modèles-réels--conformes-ohada-uemoa-dgi)
   - [C. Liberté Totale : Modèles Personnalisés & Page Blanche](#c-liberté-totale--modèles-personnalisés--page-blanche)
   - [D. Acompte 100% Optionnel & Calcul du Solde à la Livraison](#d-acompte-100-optionnel--calcul-du-solde-à-la-livraison)
   - [E. Intégration Native Mobile Money](#e-intégration-native-mobile-money)
   - [F. Partage WhatsApp en 1 Clic](#f-partage-whatsapp-en-1-clic)
   - [G. Registre des Ventes & Trésorerie d'Atelier](#g-registre-des-ventes--trésorerie-datelier)
   - [H. Catalogue d'Atelier & Modèles de Prix Multi-Métiers](#h-catalogue-datelier--modèles-de-prix-multi-métiers)
   - [I. Empreinte Certifiée & Sceau d'Authenticité](#i-empreinte-certifiée--sceau-dauthenticité)
3. [Architecture & Stack Technique](#-architecture--stack-technique)
4. [Installation & Démarrage](#-installation--démarrage)
5. [Déploiement](#-déploiement)

---

## 🌍 Vision & Problématique Terrain

En Afrique de l'Ouest (Bénin, Côte d'Ivoire, Sénégal, Togo, Burkina Faso, Mali, Niger, Guinée), des millions d'artisans d'excellence (menuisiers, maîtres tailleurs, entrepreneurs BTP, électriciens, garagistes, créateurs de mode) travaillent quotidiennement sur devis et commandes personnalisées. 

Leurs défis majeurs :
- **Perte de crédibilité** avec des bouts de papier manuscrits ou des messages WhatsApp informels sans valeur probante.
- **Litiges fréquents sur les acomptes** : absence de document formel fixant l'avance perçue pour acheter les matériaux et le solde restant dû à la livraison.
- **Lenteur administrative** des logiciels de facturation occidentaux inadaptés aux devises locales (FCFA), sans gestion du Mobile Money ni prise en compte des régimes fiscaux locaux (TPS, Régime synthétique, exonération TVA).

**ZAP résout cette équation en fournissant un cockpit numérique haut de gamme, rapide comme l'éclair, ultra fluide et pensé pour le terrain africain.**

---

## ✨ Fonctionnalités Clés (Features de ZAP)

### A. Cockpit Pro Mobile-First & Desktop
- **Sidebar Collapsible Intuitive (240px <-> 68px)** : Inspirée de l'ergonomie de *Locative*, la barre latérale se rétracte en format rail compact d'un simple clic avec persistance dans le navigateur, offrant un espace de travail maximal.
- **Drawer Mobile tout-en-un** : Pilotable à une main sur smartphone sur les chantiers ou en atelier.
- **Esthétique Dark Luxe & Or** (`#0C0C0C`, `#171717`, `#262626`, `#D4AF37`) : Une interface sobre, prestigieuse et sans ombres floues déformantes, garantissant un rendu 60+ FPS constant.
- **Jauge de Quota Visuelle** : Suivi immédiat des documents gratuits disponibles (ex: 3/8 créés).

---

### B. Modèles Réels & Conformes (OHADA, UEMOA, DGI)
ZAP intègre de vrais modèles de documents juridiquement et fiscalement conformes aux standards ouest-africains :
1. **Facture d'Atelier & Fabrication (Norme OHADA)** :
   - Décomposition distincte : **Fournitures & Matières premières** (bois, quincaillerie, tissu pagne) vs **Façon d'atelier & Main d'œuvre**.
   - Parfait pour menuisiers, tapissiers, forgerons et créateurs de mode.
2. **Devis Proforma Chantier & Travaux (Norme UEMOA)** :
   - Clauses de validité d'offre (15 ou 30 jours), calendrier d'intervention et mention "Bon pour Accord".
   - Prévu pour entrepreneurs BTP, électriciens et plombiers.
3. **Facture Commerciale Normalisée (UEMOA / DGI)** :
   - Mentions fiscales obligatoires : N° IFU (Identifiant Fiscal Unique), Registre RCCM, mention légale de dispense de TVA (*Art. 238bis du Code Général des Impôts / Régime de la TPS*).
4. **Reçu de Trésorerie & Quittance Libératoire** :
   - Preuve juridique formelle d'encaissement direct (espèces ou Mobile Money).

---

### C. Liberté Totale : Modèles Personnalisés & Page Blanche
Les artisans et entrepreneurs ne sont **jamais contraints** d'utiliser les modèles par défaut :
- **Page Blanche (Document 100% Vierge)** : Possibilité de démarrer sans modèle pour saisir librement ses désignations, quantités et montants.
- **⭐ Enregistrement de Modèles Personnalisés** : L'artisan peut configurer son propre ensemble de prestations (ex: *"Mon Devis Salon Cuir 6 Places"*, *"Mon Forfait Révision Moteur VIP"*) et le sauvegarder en 1 clic dans son espace personnel.
- **Gestion des Modèles d'Atelier** : Chargement instantané et suppression de ses modèles personnalisés sauvegardés.

---

### D. Acompte 100% Optionnel & Calcul du Solde à la Livraison
Conçu pour coller à la réalité de terrain des paiements en Afrique de l'Ouest :
- **Interrupteur (Toggle) Débrayable** : Désactivé par défaut pour les ventes comptant ou prestations directes.
- **Activation en 1 Clic** pour les commandes nécessitant une avance d'atelier.
- **Boutons de Raccourcis Réalistes** :
  - `30% (Achat matériaux)`
  - `50% (Standard atelier)`
  - `70% (Avance forte / commande sur mesure)`
- **Synthèse Financière à 3 Volets** :
  - `Montant Total Net`
  - `Acompte Perçu` (vert émeraude)
  - `Reste Dû à la Livraison` (or ZAP)
- Calcul automatique en temps réel des montants en **FCFA** (`tabular-nums`).

---

### E. Intégration Native Mobile Money
- Prise en charge des réseaux dominants en Afrique de l'Ouest : **Wave**, **MTN MoMo**, **Orange Money**, **Moov Money** et **Espèces (Cash)**.
- Numéro marchand et réseau de paiement affichés directement sur le document officiel et pré-remplis dans le message de règlement.

---

### F. Partage WhatsApp en 1 Clic
- Génération automatique d'un lien `wa.me` encodé avec un message de courtoisie professionnel complet :
  - Type et numéro du document (ex: `FAC-2025-0105`)
  - Montant total net en FCFA
  - Détail de l'acompte perçu et du reste à régler à la livraison
  - Coordonnées de règlement Mobile Money
  - Lien sécurisé de consultation et téléchargement du PDF certifié.

---

### G. Registre des Ventes & Trésorerie d'Atelier
- Suivi en direct du statut des documents : **Payé (Encaissé)** ou **En attente**.
- Métriques de performance financière de l'atelier : Total encaissé en FCFA, total en attente de règlement.
- **Duplication 1-clic** : Re-facturez un client récurrent en clonant son document précédent sans ressaisir les informations.
- Filtres rapides par type (Devis, Facture, Reçu) et recherche instantanée.

---

### H. Catalogue d'Atelier & Modèles de Prix Multi-Métiers
- Organisation par corps de métier : `Menuiserie & Bois`, `Couture & Mode`, `BTP & Électricité`, `Mécanique & Auto`, `Services & Divers`.
- **Création libre de catégories personnalisées** selon votre activité spécifique (ex: *Ferronnerie*, *Sérigraphie*, *Coiffure*).
- **Option "Partir de zéro"** : Bouton pour vider tous les exemples en 1 clic pour un catalogue 100% sur mesure, avec bouton de restauration des modèles types à tout moment.
- **Bouton "+ Facturer" 1-clic** : Insère instantanément une prestation du catalogue dans une nouvelle facture.
- Persistance locale des données (`localStorage`).

---

### I. Empreinte Certifiée & Sceau d'Authenticité
- **Tampon d'Atelier Officiel** : Sceau circulaire rouge/or garantissant la provenance professionnelle.
- **Signature Manuscrite Certifiée** : Option d'apposition de la griffe de l'artisan.
- **QR Code de Vérification** : Permet au client ou à l'administration de vérifier l'authenticité du document émis en scannant le code.

---

## 🛠 Architecture & Stack Technique

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Style & Design System** : [Tailwind CSS 4](https://tailwindcss.com/) — Palette Dark Luxe (`#0C0C0C`, `#171717`, `#262626`, `#D4AF37`)
- **Typographie** : `DM Serif Display` (titres d'autorité) & `DM Sans` (ergonomie financière et lisibilité chiffres)
- **Animations & Transitions** : [Framer Motion](https://www.framer.com/motion/) (transitions fluides, zéro saccade)
- **Icônes** : `@heroicons/react` 24 (Outline & Solid)
- **Visualisation 3D** : Three.js `Beams` avec fallback CSS ambiant instantané à la milliseconde zéro.

---

## 🚀 Installation & Démarrage

### Prérequis
- [Node.js](https://nodejs.org/) 20+
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Installation des dépendances
```bash
git clone https://github.com/Kesjs/zap.git
cd zap
npm install
```

### Lancement du serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour accéder à la Landing Page, puis [http://localhost:3000/dashboard](http://localhost:3000/dashboard) pour accéder au cockpit.

---

## 📦 Déploiement

Le projet est configuré pour un déploiement instantané sur **Vercel** :

1. Connectez votre dépôt GitHub `https://github.com/Kesjs/zap` sur [Vercel](https://vercel.com/).
2. La configuration Next.js 16 App Router est automatiquement reconnue.
3. Déploiement en production en moins de 60 secondes.

---

## 📄 Licence

Distribué sous licence MIT. Tous droits réservés — ZAP Africa.
