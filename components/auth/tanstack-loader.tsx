"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Vérification des identifiants d'atelier...",
  "Initialisation du registre et du cachet...",
  "Accès autorisé — Préparation du cockpit...",
];

export default function TanStackLoader({
  onFinished,
}: {
  onFinished?: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Step 1 -> Step 2
    const timer1 = setTimeout(() => {
      setStepIndex(1);
      setProgress(65);
    }, 700);

    // Step 2 -> Step 3
    const timer2 = setTimeout(() => {
      setStepIndex(2);
      setProgress(98);
    }, 1400);

    // Finish -> redirect
    const timer3 = setTimeout(() => {
      setProgress(100);
      if (onFinished) onFinished();
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinished]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
      style={{
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top glowing TanStack progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-zinc-900 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-300"
          initial={{ width: "10%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          style={{
            boxShadow: "0 0 12px rgba(255, 255, 255, 0.9)",
          }}
        />
      </div>

      {/* Central HUD Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="w-[90%] max-w-[360px] rounded-2xl border border-white/10 bg-[#0c0c0e]/95 p-7 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Geometric animated spinner */}
        <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/10 border-t-white"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner ring reversed */}
          <motion.div
            className="absolute inset-1.5 rounded-full border border-white/5 border-b-zinc-400"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
          {/* Center core pulse */}
          <motion.div
            className="h-3 w-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Dynamic step message ticker */}
        <div className="h-10 flex items-center justify-center mb-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-[14.5px] font-medium text-white tracking-tight leading-snug"
            >
              {steps[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-400 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ZAP ATELIER • SYNCHRONISATION</span>
        </div>
      </motion.div>
    </div>
  );
}
