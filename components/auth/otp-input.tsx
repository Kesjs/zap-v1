"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, TargetAndTransition } from "framer-motion";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (code: string) => void;
  hasError?: boolean;
  isSuccess?: boolean;
  isDisabled?: boolean;
}

export default function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  hasError = false,
  isSuccess = false,
  isDisabled = false,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // Focus the first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // When error triggers, refocus first input
  useEffect(() => {
    if (hasError) {
      inputsRef.current[0]?.focus();
    }
  }, [hasError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const chars = value.split("");

    if (char) {
      chars[index] = char;
      const newValue = chars.join("");
      onChange(newValue);

      // Auto-advance
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      if (newValue.length === length && onComplete) {
        onComplete(newValue);
      }
    } else {
      // Empty
      chars[index] = "";
      onChange(chars.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasteData) return;

    onChange(pasteData);

    // Focus appropriate input or last
    const nextIndex = Math.min(pasteData.length, length - 1);
    inputsRef.current[nextIndex]?.focus();

    if (pasteData.length === length && onComplete) {
      onComplete(pasteData);
    }
  };

  // Horizontal shake animation on error
  const shakeAnimation: TargetAndTransition | undefined = hasError
    ? {
        x: [-8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.4, ease: "easeInOut" as const },
      }
    : undefined;

  return (
    <motion.div
      animate={shakeAnimation}
      className="flex items-center justify-between gap-2 sm:gap-2.5 my-4"
    >
      {Array.from({ length }).map((_, index) => {
        const digit = value[index] || "";
        const isFocused = focusedIndex === index;

        // Sequential pulse on success
        const pulseDelay = index * 0.08;

        return (
          <motion.div
            key={index}
            animate={
              isSuccess
                ? {
                    scale: [1, 1.05, 1],
                    borderColor: ["#C4634B", "#3F7D5C", "#3F7D5C"],
                  }
                : undefined
            }
            transition={{
              duration: 0.4,
              delay: pulseDelay,
              ease: "easeOut",
            }}
            style={{
              position: "relative",
              borderRadius: "6px",
              background: "#FFFFFF",
            }}
          >
            <input
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={isDisabled || isSuccess}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={() => setFocusedIndex(index)}
              style={{
                width: "44px",
                height: "52px",
                textAlign: "center",
                fontFamily: "'Fraunces', serif",
                fontSize: "22px",
                color: isSuccess ? "#3F7D5C" : "#22314A",
                background: "transparent",
                border: hasError
                  ? "1.5px solid #A23B3B"
                  : isFocused
                  ? "1.5px solid #C4634B"
                  : "1.5px solid rgba(34,49,74,0.22)",
                borderRadius: "6px",
                outline: "none",
                transition: "border-color 0.2s",
                caretColor: "#C4634B",
              }}
              aria-label={`Chiffre ${index + 1}`}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
