"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function AnimatedButton({
  isLoading = false,
  loadingText,
  children,
  className = "",
  disabled,
  ...props
}: AnimatedButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className={`relative h-12 w-full overflow-hidden rounded-[10px] bg-white text-[15px] font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex h-full w-full items-center justify-center gap-2"
          >
            <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
            {loadingText && (
              <span className="text-sm font-medium">{loadingText}</span>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex h-full w-full items-center justify-center"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
