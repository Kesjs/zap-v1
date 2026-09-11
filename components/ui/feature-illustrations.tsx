// Mini-illustrations monochromes pour la rangée compacte de features-bento.
// Même palette que l'anneau de score : fond ardoise #1A1A1D, trait/fill blanc.

const TRACK = "#1A1A1D";

function IllustrationFrame({
  children,
  viewBox = "0 0 220 72",
}: {
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <rect x="0" y="0" width="220" height="72" rx="10" fill={TRACK} />
      {children}
    </svg>
  );
}

/** Requêtes suivies — mini courbe de suivi. */
export function TrendLineIllustration() {
  return (
    <IllustrationFrame>
      <polyline
        points="14,52 52,40 90,47 128,24 166,30 204,15"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="128" cy="24" r="3" fill="#FFFFFF" />
      <circle cx="204" cy="15" r="3.5" fill="#FFFFFF" />
    </IllustrationFrame>
  );
}

/** Opportunités priorisées — barres de confiance, même logique visuelle que l'anneau (track + fill). */
export function ConfidenceBarsIllustration() {
  const bars = [
    { y: 18, width: 178 },
    { y: 36, width: 132 },
    { y: 54, width: 96 },
  ];
  return (
    <IllustrationFrame>
      {bars.map((bar, i) => (
        <g key={i}>
          <rect x="14" y={bar.y - 3} width="192" height="6" rx="3" fill="#2A2A2E" />
          <rect
            x="14"
            y={bar.y - 3}
            width={bar.width}
            height="6"
            rx="3"
            fill="#FFFFFF"
            opacity={1 - i * 0.2}
          />
        </g>
      ))}
    </IllustrationFrame>
  );
}

/** Preuves cliquables — citation + lien souligné. */
export function QuoteLinkIllustration() {
  return (
    <IllustrationFrame>
      <text
        x="12"
        y="36"
        fontFamily="'DM Serif Display', serif"
        fontSize="34"
        fill="#FFFFFF"
        opacity="0.9"
      >
        &ldquo;
      </text>
      <rect x="46" y="20" width="150" height="4" rx="2" fill="#3F3F46" />
      <rect x="46" y="30" width="110" height="4" rx="2" fill="#3F3F46" />
      <rect x="46" y="48" width="70" height="3" rx="1.5" fill="#FFFFFF" opacity="0.9" />
      <line
        x1="46"
        y1="55"
        x2="116"
        y2="55"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity="0.6"
      />
    </IllustrationFrame>
  );
}

/** Concurrents détectés — réseau de nœuds (marque centrale + concurrents satellites). */
export function NodeNetworkIllustration() {
  const satellites = [
    { x: 46, y: 20 },
    { x: 46, y: 52 },
    { x: 176, y: 36 },
  ];
  return (
    <IllustrationFrame>
      {satellites.map((s, i) => (
        <line
          key={i}
          x1="110"
          y1="36"
          x2={s.x}
          y2={s.y}
          stroke="#FFFFFF"
          strokeWidth="1"
          opacity="0.35"
        />
      ))}
      {satellites.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r="5"
          fill="#1A1A1D"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          opacity="0.75"
        />
      ))}
      <circle cx="110" cy="36" r="9" fill="#FFFFFF" />
    </IllustrationFrame>
  );
}
