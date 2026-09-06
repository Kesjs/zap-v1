# ZAP — fichiers modifiés / ajoutés

Base utilisée : ton dernier export GitHub (zap-v1-main_5.zip). Les fichiers ci-dessous
remplacent (ou ajoutent) ceux du repo, aux mêmes chemins.

## Fichiers à REMPLACER

- `app/login/page.tsx`
  - Handlers OTP/mot de passe corrigés (plus de fausse réussite sur erreur).
  - Lien "mot de passe oublié" redirige vers `/auth/callback?next=/reset-password`
    (au lieu de foncer direct vers `/dashboard` sans passer par la création du
    nouveau mot de passe).
  - Logo en haut à gauche : au survol, glisse et se transforme en bouton "← Retour"
    (façon Stripe Checkout) — accueil `/`.
  - Bouton submit de l'étape "Connexion" (envoi du code OTP) renommé
    "Recevoir mon code" → **"Se connecter"** (le flow OTP reste la méthode par
    défaut, seul le libellé change).
  - Liens "Conditions" / "Confidentialité" en bas de page pointent maintenant vers
    `/cgu` et `/confidentialite` (au lieu de `/#faq`, qui n'existait pas).

- `components/navbar.tsx`
  - Détecte la session Supabase : affiche "Tableau de bord" (desktop + mobile) si
    l'utilisateur est connecté, sinon "Connexion" / "Inscription".
  - Navbar flottante masquée sur `/dashboard`, `/login` **et `/reset-password`**
    (nouveau).

- `components/footer.tsx`
  - Liens "Mentions légales" et "Confidentialité" en bas de page : pointaient vers
    `#` (rien), pointent maintenant vers `/mentions-legales` et `/confidentialite`.
  - Ajout d'un 3ᵉ lien "CGU" → `/cgu`.

## Fichiers à AJOUTER (nouveaux)

- `app/reset-password/page.tsx`
  - Page manquante : après clic sur le lien reçu par email, l'utilisateur atterrit
    ici avec une session valide, saisit un nouveau mot de passe (+ confirmation),
    `supabase.auth.updateUser({ password })`, puis redirection vers `/dashboard`.
  - Gère aussi le cas lien expiré/invalide (message + bouton "Demander un nouveau
    lien" vers `/login?tab=forgot`).
  - Même logo animé "→ Retour" que `/login`.

- `app/mentions-legales/page.tsx` — page légale (contenu à faire relire par un
  juriste avant mise en prod, notamment le RCCM / forme juridique de la structure
  éditrice, laissés en placeholder).
- `app/confidentialite/page.tsx` — politique de confidentialité.
- `app/cgu/page.tsx` — conditions générales d'utilisation.

## Ce qui n'a PAS été touché

Tes modifications GitHub sur `app/page.tsx`, `app/solutions/[slug]/page.tsx` et
`components/dashboard/sidebar.tsx` n'ont pas été modifiées — seuls les fichiers
listés ci-dessus ont bougé.

## ⚠️ Point à vérifier

Le logo dans `navbar.tsx` que je te renvoie utilise `/logo.png` (sans texte "ZAP"
à côté), alors que ta version GitHub actuelle utilise `/log.jpg` + texte "ZAP".
Je n'ai pas retouché ce point (pas demandé cette fois) — dis-moi si tu veux que
j'aligne l'un sur l'autre.
