"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChartBarIcon,
  ListBulletIcon,
  LightBulbIcon,
  DocumentMagnifyingGlassIcon,
  UserGroupIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/lib/i18n/language-context";
import { ScoreRing } from "@/components/ui/score-ring";
import { ReflectSweep } from "@/components/ui/reflect-sweep";
import {
  TrendLineIllustration,
  ConfidenceBarsIllustration,
  QuoteLinkIllustration,
  NodeNetworkIllustration,
} from "@/components/ui/feature-illustrations";

const cardStyle: React.CSSProperties = {
  background: "#121215",
  border: "1px solid rgba(255, 255, 255, 0.08)",
};

function CardHeader({
  icon: Icon,
  title,
  description,
  compact = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div>
        <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center mb-3">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "16px",
            color: "#FFFFFF",
            marginBottom: "6px",
          }}
        >
          {title}
        </h3>
        <p className="text-xs text-zinc-500 font-light leading-relaxed">
          {description}
        </p>
      </div>
    );
  }

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

  const rowRef = useRef<HTMLDivElement>(null);
  const rowInView = useInView(rowRef, { once: true, margin: "-10% 0px" });

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

        {/* Anneau de score — seule pièce animée, porte tout le mouvement de la section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-7 md:p-9 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 transition-all duration-200"
          style={cardStyle}
        >
          <ScoreRing value={73} />

          <div className="flex-1 text-center md:text-left">
            <CardHeader icon={ChartBarIcon} title={f.card1.title} description={f.card1.description} />
            <p className="mt-4 text-xs text-zinc-500 max-w-md mx-auto md:mx-0">
              {f.card1.caption}
            </p>
          </div>
        </motion.div>

        {/* Rangée compacte — statique, sans animation individuelle propre. Le seul mouvement (le reflet) est déclenché en cascade au niveau de la rangée. */}
        <div ref={rowRef} className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl p-5" style={cardStyle}>
            <CardHeader compact icon={ListBulletIcon} title={f.card2.title} description={f.card2.description} />
            <div className="relative mt-4 h-[72px] overflow-hidden rounded-lg">
              <TrendLineIllustration />
              <ReflectSweep active={rowInView} delayMs={0} />
            </div>
          </div>

          <div className="rounded-xl p-5" style={cardStyle}>
            <CardHeader compact icon={LightBulbIcon} title={f.card3.title} description={f.card3.description} />
            <div className="relative mt-4 h-[72px] overflow-hidden rounded-lg">
              <ConfidenceBarsIllustration />
              <ReflectSweep active={rowInView} delayMs={80} />
            </div>
          </div>

          <div className="rounded-xl p-5" style={cardStyle}>
            <CardHeader compact icon={DocumentMagnifyingGlassIcon} title={f.card4.title} description={f.card4.description} />
            <div className="relative mt-4 h-[72px] overflow-hidden rounded-lg">
              <QuoteLinkIllustration />
              <ReflectSweep active={rowInView} delayMs={160} />
            </div>
          </div>

          <div className="rounded-xl p-5" style={cardStyle}>
            <CardHeader compact icon={UserGroupIcon} title={f.card5.title} description={f.card5.description} />
            <div className="relative mt-4 h-[72px] overflow-hidden rounded-lg">
              <NodeNetworkIllustration />
              <ReflectSweep active={rowInView} delayMs={240} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
