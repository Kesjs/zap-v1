// Mini-illustrations pour la rangée compacte de features-bento.
// Toutes partagent le même cadre : une fenêtre de réponse IA (chrome de chat + repère IA),
// pour ancrer chaque carte dans le vrai mécanisme du produit — pas des pictos SaaS génériques.

const TRACK = "#1A1A1D";

function AnswerWindowFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 220 72" preserveAspectRatio="none" className="w-full h-full">
      <rect x="0" y="0" width="220" height="72" rx="10" fill={TRACK} />

      {/* Chrome de fenêtre de chat */}
      <circle cx="14" cy="16" r="2" fill="#4B4B52" />
      <circle cx="21" cy="16" r="2" fill="#4B4B52" />
      <circle cx="28" cy="16" r="2" fill="#4B4B52" />
      {/* Repère "réponse IA" */}
      <path
        d="M198,12 L200,16 L204,17 L200,18 L198,22 L196,18 L192,17 L196,16 Z"
        fill="#FFFFFF"
        opacity="0.5"
      />
      <line x1="14" y1="24" x2="206" y2="24" stroke="#26262B" strokeWidth="1" />

      {children}
    </svg>
  );
}

/** Requêtes suivies — la question telle qu'elle est tapée à l'IA, pas une tendance abstraite. */
export function TrackedQueriesIllustration() {
  return (
    <AnswerWindowFrame>
      <rect x="14" y="43" width="118" height="6" rx="3" fill="#FFFFFF" opacity="0.85" />
      <text
        x="142"
        y="55"
        fontFamily="'DM Serif Display', serif"
        fontSize="26"
        fill="#FFFFFF"
      >
        ?
      </text>
      <rect x="170" y="38" width="2" height="16" fill="#FFFFFF" opacity="0.5" />
    </AnswerWindowFrame>
  );
}

/** Opportunités priorisées — le trou dans la réponse IA où la marque pourrait apparaître. */
export function ConfidenceBarsIllustration() {
  return (
    <AnswerWindowFrame>
      <rect x="14" y="34" width="150" height="5" rx="2.5" fill="#3F3F46" />
      <rect x="14" y="45" width="88" height="5" rx="2.5" fill="#3F3F46" />
      <rect
        x="108"
        y="40"
        width="42"
        height="13"
        rx="6.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.3"
        strokeDasharray="3 3"
      />
      <text
        x="129"
        y="50"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        +
      </text>
      <rect x="14" y="57" width="110" height="5" rx="2.5" fill="#3F3F46" />
    </AnswerWindowFrame>
  );
}

/** Preuves cliquables — le passage exact surligné dans la réponse, avec le lien vers la source. */
export function QuoteLinkIllustration() {
  return (
    <AnswerWindowFrame>
      <rect x="14" y="34" width="130" height="5" rx="2.5" fill="#3F3F46" />
      <rect x="14" y="45" width="96" height="5" rx="2.5" fill="#FFFFFF" opacity="0.95" />
      <rect x="14" y="56" width="70" height="5" rx="2.5" fill="#3F3F46" />
      <circle cx="196" cy="58" r="12" fill="#FFFFFF" />
      <path
        d="M191,63 L201,53 M195,53 H201 V59"
        stroke="#0A0A0B"
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </AnswerWindowFrame>
  );
}

/** Concurrents détectés — plusieurs marques citées dans la même réponse : vous, et les autres. */
export function NodeNetworkIllustration() {
  return (
    <AnswerWindowFrame>
      <rect x="14" y="34" width="150" height="5" rx="2.5" fill="#3F3F46" />
      <rect x="14" y="48" width="40" height="11" rx="5.5" fill="#FFFFFF" />
      <rect x="60" y="48" width="36" height="11" rx="5.5" fill="none" stroke="#5A5A60" strokeWidth="1.2" />
      <rect x="102" y="48" width="36" height="11" rx="5.5" fill="none" stroke="#5A5A60" strokeWidth="1.2" />
    </AnswerWindowFrame>
  );
}
