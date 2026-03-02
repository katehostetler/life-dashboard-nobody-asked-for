"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TickingNumber from "@/components/ui/TickingNumber";
import { getRandomCosmicFact, getVoyagerDistance, getVoyagerRate } from "@/lib/calculations/cosmic-facts";
import type { WikiArticle } from "@/lib/types";

interface AlgorithmVsCosmosProps {
  topArticle: WikiArticle | null;
}

export default function AlgorithmVsCosmos({ topArticle }: AlgorithmVsCosmosProps) {
  const cosmicFact = getRandomCosmicFact();
  const voyagerAU = getVoyagerDistance();
  const voyagerRate = getVoyagerRate();

  return (
    <SectionWrapper variant="wide" id="algorithm-vs-cosmos">
      <ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 md:gap-0 relative">
          {/* Left: Internet */}
          <div className="md:pr-10 md:border-r border-border-glow">
            <h3 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-subheading)] text-text-secondary mb-4">
              The Internet Is Talking About
            </h3>
            {topArticle ? (
              <div>
                <a
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(topArticle.article.replace(/ /g, "_"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-playfair)] font-bold text-[length:var(--font-size-heading)] text-text-primary mb-2 block hover:text-text-accent transition-colors"
                >
                  {topArticle.article}
                </a>
                <p className="text-text-tertiary text-[length:var(--font-size-caption)]">
                  #1 on Wikipedia yesterday with{" "}
                  <span className="text-text-secondary tabular-nums">
                    {topArticle.views.toLocaleString()}
                  </span>{" "}
                  views
                </p>
              </div>
            ) : (
              <p className="text-text-tertiary text-[length:var(--font-size-body)]">
                Loading...
              </p>
            )}
          </div>

          {/* Glowing vertical divider (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px animate-glow-pulse"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(245, 166, 35, 0.4), transparent)",
              boxShadow: "0 0 30px rgba(245, 166, 35, 0.12)",
            }}
          />

          {/* Right: Cosmos */}
          <div className="md:pl-10">
            <h3 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-subheading)] text-text-secondary mb-4">
              Meanwhile, In the Universe
            </h3>
            <p className="text-text-primary text-[length:var(--font-size-body)] mb-4 leading-relaxed">
              {cosmicFact.text}
            </p>
            <div className="mt-4 pt-4 border-t border-border-subtle">
              <p className="text-text-tertiary text-[length:var(--font-size-caption)] mb-1">
                Voyager 1 is currently
              </p>
              <TickingNumber
                value={voyagerAU}
                rate={voyagerRate}
                format="decimal"
                decimals={6}
                className="text-[length:var(--font-size-heading)] text-text-accent"
                label="AU from the Sun"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
