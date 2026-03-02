"use client";

import { useEffect, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TickingNumber from "@/components/ui/TickingNumber";
import { useBirthdayContext } from "@/components/providers/BirthdayProvider";
import { calculateBirthdayStats, getBirthdayRates } from "@/lib/calculations/birthday-math";

export default function YouAreHere() {
  const { birthday, clearBirthday } = useBirthdayContext();
  const [stats, setStats] = useState(() =>
    birthday ? calculateBirthdayStats(birthday) : null
  );

  useEffect(() => {
    if (!birthday) {
      setStats(null);
      return;
    }
    setStats(calculateBirthdayStats(birthday));

    // Recalculate base every 10 seconds to prevent drift
    const interval = setInterval(() => {
      setStats(calculateBirthdayStats(birthday));
    }, 10000);
    return () => clearInterval(interval);
  }, [birthday]);

  if (!birthday || !stats) return null;

  const rates = getBirthdayRates();

  return (
    <SectionWrapper variant="contained" id="you-are-here">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            Since you arrived
          </h2>
          <p className="text-text-secondary text-[length:var(--font-size-body)]">
            your heart has beaten approximately
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="text-center mb-12">
          <TickingNumber
            value={stats.heartbeats}
            rate={rates.heartbeats}
            format="integer"
            className="text-[length:var(--font-size-counter)] text-text-accent text-glow-amber"
          />
          <p className="text-text-tertiary text-[length:var(--font-size-caption)] mt-2">
            times (and counting)
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center min-w-0 overflow-hidden">
            <TickingNumber
              value={stats.sunOrbits}
              rate={rates.sunOrbits}
              format="decimal"
              decimals={4}
              className="text-[length:var(--font-size-body)] md:text-[length:var(--font-size-subheading)] text-text-primary"
            />
            <p className="text-text-tertiary text-[length:var(--font-size-caption)] mt-1">
              trips around the Sun
            </p>
          </div>
          <div className="text-center min-w-0 overflow-hidden">
            <TickingNumber
              value={stats.minutesAlive}
              rate={rates.minutesAlive}
              format="integer"
              className="text-[length:var(--font-size-body)] md:text-[length:var(--font-size-subheading)] text-text-primary"
            />
            <p className="text-text-tertiary text-[length:var(--font-size-caption)] mt-1">
              minutes alive
            </p>
          </div>
          <div className="text-center min-w-0 overflow-hidden">
            <span className="font-[family-name:var(--font-inter)] font-semibold text-[length:var(--font-size-body)] md:text-[length:var(--font-size-subheading)] text-text-primary tabular-nums">
              {stats.dogYears.toFixed(1)}
            </span>
            <p className="text-text-tertiary text-[length:var(--font-size-caption)] mt-1">
              in dog years
            </p>
          </div>
          <div className="text-center min-w-0 overflow-hidden">
            <span className="font-[family-name:var(--font-inter)] font-semibold text-[length:var(--font-size-body)] md:text-[length:var(--font-size-subheading)] text-text-primary tabular-nums">
              {stats.plutoYears.toFixed(4)}
            </span>
            <p className="text-text-tertiary text-[length:var(--font-size-caption)] mt-1">
              Pluto years old
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <div className="text-center mt-8">
          <button
            onClick={clearBirthday}
            className="text-text-tertiary text-[length:var(--font-size-caption)] underline underline-offset-4 hover:text-text-secondary transition-colors cursor-pointer"
          >
            Not you? Re-enter birthday
          </button>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
