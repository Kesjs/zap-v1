"use client";

import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ListBulletIcon,
  LightBulbIcon,
  DocumentMagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

const cardStyle: React.CSSProperties = {
  background: "#121215",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

function CardHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "22px",
          color: "#FFFFFF",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md">
        {description}
      </p>
    </div>
  );
}

export default function FeaturesBento() {
  return (
    <section
      id="fonctionnalites"
      style={{
        background: "#09090B",
        padding: "96px 24px",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-4">
            <DocumentCheckIcon className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-xs tracking-wider uppercase font-medium text-zinc-300">
              Fonctionnalités Clés
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 42px)",
              color: "#FFFFFF",
              lineHeight: 1.18,
              marginBottom: "16px",
            }}
          >
            Une couche de monitoring entre ta marque et les moteurs d&apos;IA.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "#A1A1AA",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Fini les suppositions sur ta présence dans les réponses IA. Chaque score, chaque opportunité s&apos;appuie sur des preuves vérifiables.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Score de visibilité (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={cardStyle}
          >
            <CardHeader
              icon={ChartBarIcon}
              title="Un score, fondé sur des réponses IA réelles"
              description="ChatGPT est interrogé plusieurs fois sur les requêtes liées à ton secteur. Le score reflète une fréquence d'apparition mesurée — jamais une estimation ou un résultat binaire."
            />
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-4 flex-wrap">
              <div
                className="rounded-full border border-white/30 flex flex-col items-center justify-center text-center bg-white/[0.02]"
                style={{ width: "64px", height: "64px" }}
              >
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  3-5
                </span>
                <span className="text-[9px] text-zinc-400 uppercase tracking-wide">
                  runs / requête
                </span>
              </div>
              <p className="text-xs text-zinc-500 max-w-[220px]">
                Minimum garanti par requête suivie, jamais un seul passage.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Requêtes suivies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={cardStyle}
          >
            <CardHeader
              icon={ListBulletIcon}
              title="30 requêtes suivies"
              description="Les questions que tes clients posent réellement à ChatGPT, accepté, modifié ou ajouté par toi — analysées chaque semaine."
            />
          </motion.div>

          {/* Card 3: Opportunités */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={cardStyle}
          >
            <CardHeader
              icon={LightBulbIcon}
              title="Opportunités priorisées"
              description="3 à 5 opportunités affichées, chacune avec un niveau de confiance — validée seulement si confirmée sur plusieurs runs et plusieurs requêtes liées."
            />
          </motion.div>

          {/* Card 4: Preuves / citations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={cardStyle}
          >
            <CardHeader
              icon={DocumentMagnifyingGlassIcon}
              title="Preuves cliquables"
              description="Chaque indicateur de visibilité renvoie à la réponse IA exacte qui le justifie. Aucune recommandation sans preuve, aucune causalité affirmée — seulement des corrélations observées."
            />
          </motion.div>

          {/* Card 5: Évolution dans le temps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={cardStyle}
          >
            <CardHeader
              icon={ArrowTrendingUpIcon}
              title="Suivi dans le temps"
              description="Fais une modification sur ton site, reviens 2 à 3 semaines après : Reflet te montre la corrélation avant/après sur ta visibilité."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
