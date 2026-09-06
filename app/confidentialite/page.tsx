import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité — ZAP",
  description: "Comment ZAP collecte, utilise et protège vos données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-black text-white font-['DM_Sans'] flex flex-col">
      <div className="flex-1 mx-auto w-full max-w-3xl px-6 pb-20 pt-28 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Vie privée
        </p>
        <h1 className="mt-3 font-['DM_Serif_Display'] text-3xl font-normal tracking-tight text-white sm:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-300">
          <Section title="1. Données collectées">
            <p>Lorsque vous utilisez ZAP, nous collectons :</p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-zinc-600">
              <li>Votre adresse email, utilisée pour la connexion (mot de passe ou code à usage unique) ;</li>
              <li>Les informations de votre atelier ou activité (nom, cachet, coordonnées) que vous renseignez ;</li>
              <li>Les devis, factures et reçus que vous créez sur la plateforme ;</li>
              <li>Des données techniques (adresse IP, type d'appareil) nécessaires au bon fonctionnement du Service.</li>
            </ul>
          </Section>

          <Section title="2. Finalités du traitement">
            <p>Vos données sont utilisées pour :</p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-zinc-600">
              <li>Créer et sécuriser votre compte ;</li>
              <li>Générer vos documents commerciaux (devis, factures, reçus) ;</li>
              <li>Vous contacter en cas de besoin (support, information sur le Service) ;</li>
              <li>Améliorer la qualité et la sécurité de la plateforme.</li>
            </ul>
          </Section>

          <Section title="3. Base légale et conservation">
            <p>
              Le traitement repose sur l'exécution du contrat qui vous lie à ZAP lors de la création de
              votre compte, ainsi que sur votre consentement pour les communications optionnelles. Vos
              données sont conservées pendant la durée d'utilisation de votre compte, puis archivées ou
              supprimées conformément aux obligations légales applicables.
            </p>
          </Section>

          <Section title="4. Partage des données">
            <p>
              Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec des
              prestataires techniques strictement nécessaires au fonctionnement du Service (hébergement,
              envoi d'emails, authentification), soumis à des obligations de confidentialité.
            </p>
          </Section>

          <Section title="5. Sécurité">
            <p>
              L'authentification et le stockage des données reposent sur une infrastructure sécurisée
              (chiffrement des mots de passe, connexions chiffrées, gestion de sessions par cookies
              sécurisés).
            </p>
          </Section>

          <Section title="6. Vos droits">
            <p>
              Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos
              données. Vous pouvez exercer ces droits à tout moment en nous contactant à l'adresse{" "}
              <a href="mailto:contact@zap.africa" className="text-white underline underline-offset-2 hover:text-zinc-300">
                contact@zap.africa
              </a>.
            </p>
          </Section>

          <Section title="7. Contact">
            <p>
              Pour toute question relative à cette politique, écrivez-nous à{" "}
              <a href="mailto:contact@zap.africa" className="text-white underline underline-offset-2 hover:text-zinc-300">
                contact@zap.africa
              </a>{" "}
              ou via WhatsApp.
            </p>
          </Section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-medium text-white">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
