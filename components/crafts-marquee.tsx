"use client";

import {
  BuildingOffice2Icon,
  CubeTransparentIcon,
  ShoppingBagIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/lib/i18n/language-context";

const icons = [BuildingOffice2Icon, CubeTransparentIcon, ShoppingBagIcon, MegaphoneIcon];

export default function CraftsMarquee() {
  const { t } = useLanguage();
  const segments = t.marquee.segments.map((name, i) => ({ name, icon: icons[i] }));
  const items = [...segments, ...segments, ...segments];

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
          {items.map((segment, i) => {
            const Icon = segment.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 flex-shrink-0"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#71717A",
                  whiteSpace: "nowrap",
                }}
              >
                <Icon className="w-4 h-4" style={{ color: "#52525B" }} />
                {segment.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
