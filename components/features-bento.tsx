"use client";

import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ListBulletIcon,
  LightBulbIcon,
  DocumentMagnifyingGlassIcon,
  UserGroupIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/lib/i18n/language-context";

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
  const { t } = useLanguage();
  const f = t.features;

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
              {f.badge}
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
            {f.title}
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
            {f.subtitle}
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
            <CardHeader icon={ChartBarIcon} title={f.card1.title} description={f.card1.description} />
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
                  {f.card1.runsLabel}
                </span>
              </div>
              <p className="text-xs text-zinc-500 max-w-[220px]">
                {f.card1.caption}
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
            <CardHeader icon={ListBulletIcon} title={f.card2.title} description={f.card2.description} />
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
            <CardHeader icon={LightBulbIcon} title={f.card3.title} description={f.card3.description} />
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
            <CardHeader icon={DocumentMagnifyingGlassIcon} title={f.card4.title} description={f.card4.description} />
          </motion.div>

          {/* Card 5: Concurrents détectés automatiquement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={cardStyle}
          >
            <CardHeader icon={UserGroupIcon} title={f.card5.title} description={f.card5.description} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
