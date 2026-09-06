# Templates d'Email Supabase — ZAP (Monochrome Luxe)

Ces modèles d'emails HTML sont spécialement conçus pour remplacer les emails en texte brut de Supabase par des emails professionnels haut de gamme, compatibles avec tous les clients de messagerie (Gmail, Apple Mail, Outlook) et fidèles à l'identité visuelle de **ZAP**.

---

## 1. Magic Link / Code de connexion OTP (`magic-link-otp.html`)

- **Emplacement dans Supabase** :
  `Authentication` > `Email Templates` > **Magic Link**
- **Objet de l'email (Subject)** :
  ```text
  Votre code d'accès ZAP : {{ .Token }}
  ```
- **Corps de l'email (Message Body)** :
  Copiez et collez l'intégralité du fichier [`magic-link-otp.html`](./magic-link-otp.html).

---

## 2. Confirmation d'inscription (`confirm-signup.html`)

- **Emplacement dans Supabase** :
  `Authentication` > `Email Templates` > **Confirm signup**
- **Objet de l'email (Subject)** :
  ```text
  Bienvenue sur ZAP — Confirmez votre adresse email
  ```
- **Corps de l'email (Message Body)** :
  Copiez et collez l'intégralité du fichier [`confirm-signup.html`](./confirm-signup.html).

---

## 3. Réinitialisation de mot de passe (`reset-password.html`)

- **Emplacement dans Supabase** :
  `Authentication` > `Email Templates` > **Reset password**
- **Objet de l'email (Subject)** :
  ```text
  Réinitialisation de votre mot de passe ZAP
  ```
- **Corps de l'email (Message Body)** :
  Copiez et collez l'intégralité du fichier [`reset-password.html`](./reset-password.html).

---

## Variables Supabase utilisées

- `{{ .Token }}` : Le code à 6 chiffres à usage unique (OTP).
- `{{ .ConfirmationURL }}` : Le lien direct sécurisé de validation/connexion.
- `{{ .SiteURL }}` : L'URL de votre application configurée dans Supabase.
