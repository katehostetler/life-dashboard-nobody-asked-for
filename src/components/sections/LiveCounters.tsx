"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TickingNumber from "@/components/ui/TickingNumber";
import { WORLD_STATS } from "@/lib/constants/world-rates";
import { getCountSinceMidnightUTC } from "@/lib/calculations/world-stats";

const ICONS: Record<string, string> = {
  plane: "\u2708\uFE0F",
  baby: "\uD83D\uDC76",
  search: "\uD83D\uDD0D",
  mail: "\u2709\uFE0F",
  cloud: "\uD83C\uDF2B\uFE0F",
  tree: "\uD83C\uDF33",
};

interface LiveCountersProps {
  flightCount: number;
}

export default function LiveCounters({ flightCount }: LiveCountersProps) {
  return (
    <SectionWrapper variant="wide" id="live-counters">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            Right now, on Earth
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {WORLD_STATS.map((stat, i) => {
          const isFlights = stat.icon === "plane";
          const initialValue = isFlights
            ? flightCount
            : getCountSinceMidnightUTC(stat.rate);
          const rate = isFlights ? 0 : stat.rate;

          return (
            <ScrollReveal key={stat.label} delay={0.1 * i}>
              <div className="text-center p-4 rounded-lg hover:bg-cosmic-surface/30 transition-colors duration-300">
                <div className="text-2xl mb-3" role="img" aria-hidden>
                  {ICONS[stat.icon] ?? ""}
                </div>
                <TickingNumber
                  value={initialValue}
                  rate={rate}
                  format="compact"
                  className="text-[length:var(--font-size-heading)] text-text-primary"
                />
                <p className="text-text-secondary text-[length:var(--font-size-caption)] mt-2">
                  {stat.label}
                </p>
                {isFlights && flightCount === 10000 && (
                  <span className="inline-block mt-1 text-text-tertiary text-xs bg-cosmic-surface/50 px-2 py-0.5 rounded-full">
                    estimated
                  </span>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
