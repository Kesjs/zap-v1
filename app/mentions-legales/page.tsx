import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Mentions légales — ZAP",
  description: "Mentions légales de la plateforme ZAP.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-['DM_Sans'] flex flex-col">
      <div className="flex-1 mx-auto w-full max-w-3xl px-6 pb-20 pt-28 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Informations légales
        </p>
        <h1 className="mt-3 font-['DM_Serif_Display'] text-3xl font-normal tracking-tight text-white sm:text-4xl">
          Mentions légales
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-300">
          <Section title="1. Éditeur de la plateforme">
            <p>
              La plateforme ZAP (ci-après « ZAP » ou « le Service ») est éditée par l'entreprise
              responsable de son développement et de son exploitation.
            </p>
            <ul className="mt-3 space-y-1.5 list-none">
              <li><span className="text-zinc-500">Nom commercial :</span> ZAP</li>
              <li><span className="text-zinc-500">Contact :</span> contact@zap.africa</li>
              <li><span className="text-zinc-500">Zone de service :</span> Bénin, Côte d'Ivoire</li>
            </ul>
            <p className="mt-3 text-zinc-500">
              Les informations d'immatriculation complètes (forme juridique, RCCM, siège social) seront
              précisées ici dès finalisation de l'enregistrement de la structure éditrice.
            </p>
          </Section>

          <Section title="2. Hébergement">
            <p>
              Le Service est hébergé par des prestataires d'infrastructure cloud tiers assurant le
              stockage des données et la disponibilité de l'application. Les coordonnées précises de
              l'hébergeur sont communiquées sur demande à l'adresse contact@zap.africa.
            </p>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <p>
              L'ensemble des éléments composant le Service (textes, logos, interfaces, modèles de
              documents, code source) est protégé par le droit de la propriété intellectuelle. Toute
              reproduction ou représentation, totale ou partielle, sans autorisation préalable est
              interdite.
            </p>
          </Section>

          <Section title="4. Données à caractère personnel">
            <p>
              Le traitement des données personnelles des utilisateurs est détaillé dans notre{" "}
              <a href="/confidentialite" className="text-white underline underline-offset-2 hover:text-zinc-300">
                politique de confidentialité
              </a>.
            </p>
          </Section>

          <Section title="5. Contact">
            <p>
              Pour toute question relative à ces mentions légales, contactez-nous à l'adresse{" "}
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
