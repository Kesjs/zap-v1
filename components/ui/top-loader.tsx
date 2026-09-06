"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TopLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // When route changes, flash progress bar to 100% and fade out
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Intercept anchor clicks to provide instant visual feedback
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && (href.startsWith("/") || href.startsWith("#"))) {
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ width: "0%", opacity: 1 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              width: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25 },
            }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #D4AF37 0%, #E2B170 100%)",
              boxShadow: "0 0 10px rgba(212, 175, 55, 0.8), 0 0 5px #E2B170",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
