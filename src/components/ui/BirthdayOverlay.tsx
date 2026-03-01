"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBirthdayContext } from "@/components/providers/BirthdayProvider";

export default function BirthdayOverlay() {
  const { birthday, setBirthday, isLoaded } = useBirthdayContext();
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);

    if (!m || !d || !y || m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > new Date().getFullYear()) {
      setError("Please enter a valid date.");
      return;
    }

    const date = new Date(y, m - 1, d);
    if (date > new Date()) {
      setError("That date is in the future.");
      return;
    }

    setBirthday(date);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  // Don't render until localStorage is checked
  if (!isLoaded) return null;

  // If birthday is already set, don't show overlay
  if (birthday) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
        style={{
          background:
            "radial-gradient(ellipse at center, #1C1635 0%, #141024 40%, #0D0A1A 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center max-w-md"
        >
          <h1
            className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-2 leading-tight"
          >
            Tell me when you arrived
          </h1>
          <p className="text-text-secondary text-[length:var(--font-size-body)] mb-10">
            on this particular space rock
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value.replace(/\D/g, ""))}
                onKeyDown={handleKeyDown}
                className="w-16 bg-transparent border-b-2 border-border-glow text-center text-text-primary text-[length:var(--font-size-heading)] font-[family-name:var(--font-inter)] tabular-nums outline-none focus:border-amber-primary transition-colors pb-1"
                aria-label="Birth month"
              />
            </div>
            <span className="text-text-tertiary text-xl">/</span>
            <div className="text-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value.replace(/\D/g, ""))}
                onKeyDown={handleKeyDown}
                className="w-16 bg-transparent border-b-2 border-border-glow text-center text-text-primary text-[length:var(--font-size-heading)] font-[family-name:var(--font-inter)] tabular-nums outline-none focus:border-amber-primary transition-colors pb-1"
                aria-label="Birth day"
              />
            </div>
            <span className="text-text-tertiary text-xl">/</span>
            <div className="text-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
                onKeyDown={handleKeyDown}
                className="w-24 bg-transparent border-b-2 border-border-glow text-center text-text-primary text-[length:var(--font-size-heading)] font-[family-name:var(--font-inter)] tabular-nums outline-none focus:border-amber-primary transition-colors pb-1"
                aria-label="Birth year"
              />
            </div>
          </div>

          {error && (
            <p className="text-rose-accent text-[length:var(--font-size-caption)] mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-full bg-amber-primary text-cosmic-deepest font-[family-name:var(--font-inter)] font-semibold text-[length:var(--font-size-body)] hover:bg-amber-bright transition-colors duration-300 cursor-pointer"
          >
            Show me my numbers
          </button>

          <p className="text-text-tertiary text-[length:var(--font-size-caption)] mt-8 max-w-xs mx-auto">
            Stored only in your browser. Never sent anywhere.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
