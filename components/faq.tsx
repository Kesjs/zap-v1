"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/lib/i18n/language-context";

export default function Faq() {
  const { t } = useLanguage();
  const faqs = t.faq.items;
  const [openId, setOpenId] = useState<string | null>("which-ai");

  return (
    <section
      id="faq"
      style={{
        background: "#000000",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 40px)",
              color: "#F4F4F5",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            {t.faq.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(244, 244, 245, 0.65)",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            {t.faq.subtitle}
          </motion.p>
        </div>

        {/* Accordion list */}
        <div style={{ borderTop: "1px solid #262626" }}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  borderBottom: "1px solid #262626",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "22px 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "16px",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "18px",
                      color: isOpen ? "#FFFFFF" : "#F4F4F5",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ flexShrink: 0 }}
                  >
                    <ChevronDownIcon
                      style={{
                        width: 20,
                        height: 20,
                        color: isOpen ? "#FFFFFF" : "rgba(244,244,245,0.45)",
                      }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14.5px",
                          fontWeight: 300,
                          color: "rgba(244, 244, 245, 0.65)",
                          lineHeight: 1.7,
                          paddingBottom: "22px",
                          margin: 0,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
