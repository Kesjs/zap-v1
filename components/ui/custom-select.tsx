"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Sélectionner...",
  disabled = false,
  className = "",
  size = "md",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation (Escape to close)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const heightClass = size === "sm" ? "h-9 text-xs px-3" : "h-11 text-sm px-3.5";

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between rounded-xl border bg-black text-left transition-all outline-none cursor-pointer ${heightClass} ${
          isOpen
            ? "border-white/50 ring-1 ring-white/20 shadow-lg shadow-black/40"
            : "border-white/15 hover:border-white/30"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption ? (
            <>
              <span className="text-white font-medium truncate">
                {selectedOption.label}
              </span>
              {selectedOption.badge && (
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10">
                  {selectedOption.badge}
                </span>
              )}
            </>
          ) : (
            <span className="text-zinc-500 truncate">{placeholder}</span>
          )}
        </div>

        <ChevronDownIcon
          className={`w-4 h-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute left-0 right-0 z-50 mt-1.5 rounded-xl border border-white/15 bg-[#0A0A0A]/95 backdrop-blur-xl p-1 shadow-2xl shadow-black/80 max-h-60 overflow-y-auto"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-white/15 text-white font-medium"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate">{option.label}</span>
                    {option.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">
                        {option.badge}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <CheckIcon className="w-4 h-4 text-white shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
