import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — ZAP",
  description: "Conditions générales d'utilisation de la plateforme ZAP.",
};

export default function CguPage() {
  return (
    <div className="min-h-screen bg-black text-white font-['DM_Sans'] flex flex-col">
      <div className="flex-1 mx-auto w-full max-w-3xl px-6 pb-20 pt-28 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Conditions
        </p>
        <h1 className="mt-3 font-['DM_Serif_Display'] text-3xl font-normal tracking-tight text-white sm:text-4xl">
          Conditions générales d'utilisation
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-300">
          <Section title="1. Objet">
            <p>
              Les présentes conditions générales d'utilisation (« CGU ») régissent l'accès et l'usage de
              la plateforme ZAP, permettant aux entrepreneurs et indépendants de créer des devis,
              factures et reçus numériques. L'utilisation du Service implique l'acceptation pleine et
              entière des présentes CGU.
            </p>
          </Section>

          <Section title="2. Accès au Service">
            <p>
              L'accès à ZAP nécessite la création d'un compte via une adresse email valide, avec
              connexion par mot de passe ou par code à usage unique envoyé par email. Vous êtes
              responsable de la confidentialité de vos identifiants et de toute activité effectuée depuis
              votre compte.
            </p>
          </Section>

          <Section title="3. Utilisation du Service">
            <p>Vous vous engagez à :</p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-zinc-600">
              <li>Fournir des informations exactes lors de la création de votre compte et de vos documents ;</li>
              <li>Utiliser le Service conformément à la loi et aux bonnes pratiques commerciales ;</li>
              <li>Ne pas utiliser ZAP pour émettre des documents frauduleux ou trompeurs ;</li>
              <li>Ne pas tenter de porter atteinte à la sécurité ou au fonctionnement de la plateforme.</li>
            </ul>
          </Section>

          <Section title="4. Documents générés">
            <p>
              Les devis, factures et reçus générés via ZAP le sont sur la base des informations que vous
              renseignez. Vous restez seul responsable de l'exactitude, de la conformité fiscale et de la
              validité juridique des documents émis auprès de vos clients.
            </p>
          </Section>

          <Section title="5. Disponibilité du Service">
            <p>
              ZAP met en œuvre les moyens raisonnables pour assurer la disponibilité et la sécurité du
              Service, sans pouvoir garantir une disponibilité continue et sans interruption
              (maintenance, incidents techniques indépendants de notre volonté).
            </p>
          </Section>

          <Section title="6. Résiliation">
            <p>
              Vous pouvez cesser d'utiliser ZAP à tout moment. Nous nous réservons le droit de suspendre
              ou de résilier un compte en cas d'usage frauduleux ou de non-respect des présentes CGU.
            </p>
          </Section>

          <Section title="7. Données personnelles">
            <p>
              Le traitement de vos données personnelles est décrit dans notre{" "}
              <a href="/confidentialite" className="text-white underline underline-offset-2 hover:text-zinc-300">
                politique de confidentialité
              </a>.
            </p>
          </Section>

          <Section title="8. Modification des CGU">
            <p>
              ZAP peut modifier les présentes CGU à tout moment. Les utilisateurs seront informés des
              changements substantiels ; la poursuite de l'utilisation du Service après modification vaut
              acceptation des nouvelles conditions.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              Pour toute question relative aux présentes CGU, contactez-nous à{" "}
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
