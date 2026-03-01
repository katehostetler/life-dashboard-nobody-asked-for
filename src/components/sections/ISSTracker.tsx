"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MiniMap from "@/components/ui/MiniMap";
import { useISS } from "@/lib/hooks/useISS";

export default function ISSTracker() {
  const { position, astronautCount, isLoading } = useISS();

  return (
    <SectionWrapper variant="wide" id="iss">
      <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            Meanwhile, overhead
          </h2>
          {astronautCount !== null && (
            <p className="text-text-secondary text-[length:var(--font-size-body)]">
              <span className="text-text-accent font-semibold tabular-nums">
                {astronautCount}
              </span>{" "}
              humans are in space right now
            </p>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mx-auto max-w-2xl">
          {isLoading ? (
            <div className="aspect-[2/1] rounded-lg bg-cosmic-surface flex items-center justify-center">
              <span className="text-text-tertiary text-[length:var(--font-size-caption)]">
                Locating the ISS...
              </span>
            </div>
          ) : (
            <MiniMap
              latitude={position?.latitude ?? 0}
              longitude={position?.longitude ?? 0}
            />
          )}
        </div>
      </ScrollReveal>

      {position && (
        <ScrollReveal delay={0.3}>
          <div className="flex justify-center gap-8 mt-6 text-[length:var(--font-size-caption)]">
            <span className="text-text-tertiary">
              Lat: <span className="text-text-secondary tabular-nums">{position.latitude.toFixed(2)}°</span>
            </span>
            <span className="text-text-tertiary">
              Lon: <span className="text-text-secondary tabular-nums">{position.longitude.toFixed(2)}°</span>
            </span>
            <span className="text-text-tertiary">
              Alt: <span className="text-text-secondary tabular-nums">{Math.round(position.altitude)} km</span>
            </span>
          </div>
        </ScrollReveal>
      )}
    </SectionWrapper>
  );
}
