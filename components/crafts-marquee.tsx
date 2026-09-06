"use client";

import {
  WrenchScrewdriverIcon,
  ScissorsIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const crafts = [
  { name: "Mécanicien", icon: WrenchScrewdriverIcon },
  { name: "Couturière", icon: ScissorsIcon },
  { name: "Menuisier", icon: SparklesIcon },
  { name: "Commerçant", icon: BuildingStorefrontIcon },
  { name: "Prestataire de service", icon: BriefcaseIcon },
  { name: "Artisan", icon: UserGroupIcon },
];

export default function CraftsMarquee() {
  const items = [...crafts, ...crafts, ...crafts];

  return (
    <div
      style={{
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        padding: "18px 0",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Edge Fades */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          overflow: "hidden",
        }}
      >
        <div
          className="animate-marquee"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            width: "max-content",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "running";
          }}
        >
          {items.map((craft, i) => {
            const Icon = craft.icon;
            return (
              <div
                key={`${craft.name}-${i}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: 0,
                }}
              >
                <Icon
                  style={{
                    width: 20,
                    height: 20,
                    color: "#FFFFFF",
                    opacity: 0.85,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(244, 244, 245, 0.60)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {craft.name}
                </span>

                {/* Dot separator */}
                <span
                  aria-hidden="true"
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "rgba(244, 244, 245, 0.20)",
                    marginLeft: "24px",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
