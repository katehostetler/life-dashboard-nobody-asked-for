"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getMoonPhase } from "@/lib/calculations/moon-phase";
import type { NasaApod } from "@/lib/types";

interface TonightsSkyProps {
  apod: NasaApod | null;
}

export default function TonightsSky({ apod }: TonightsSkyProps) {
  const moon = getMoonPhase();

  return (
    <SectionWrapper variant="wide" id="tonights-sky">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            Tonight&apos;s sky
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-0 relative">
          {/* Left: Moon Phase */}
          <div className="md:pr-10 md:border-r border-border-glow">
            <h3 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-subheading)] text-text-secondary mb-4">
              Moon Phase
            </h3>
            <div className="text-center md:text-left">
              <span className="text-6xl md:text-7xl block mb-3">
                {moon.emoji}
              </span>
              <p className="font-[family-name:var(--font-playfair)] font-bold text-[length:var(--font-size-heading)] text-text-primary mb-2">
                {moon.phaseName}
              </p>
              <p className="text-text-tertiary text-[length:var(--font-size-caption)]">
                {moon.illumination}% illuminated
              </p>
            </div>
          </div>

          {/* Glowing vertical divider (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px animate-glow-pulse"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(245, 166, 35, 0.4), transparent)",
              boxShadow: "0 0 30px rgba(245, 166, 35, 0.12)",
            }}
          />

          {/* Right: APOD */}
          <div className="md:pl-10">
            <h3 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-subheading)] text-text-secondary mb-4">
              NASA Picture of the Day
            </h3>
            {apod ? (
              <div>
                {apod.media_type === "image" && (
                  <a
                    href={apod.hdurl || apod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-3 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={apod.url}
                      alt={apod.title}
                      className="w-full h-40 object-cover"
                    />
                  </a>
                )}
                <a
                  href={`https://apod.nasa.gov/apod/astropix.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-playfair)] font-bold text-[length:var(--font-size-body)] text-text-primary hover:text-text-accent transition-colors"
                >
                  {apod.title}
                </a>
                <p className="text-text-tertiary text-[length:var(--font-size-caption)] mt-1 line-clamp-2">
                  {apod.explanation}
                </p>
              </div>
            ) : (
              <p className="text-text-tertiary text-[length:var(--font-size-body)]">
                Loading...
              </p>
            )}
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
