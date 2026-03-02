"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { TrendingSearch } from "@/lib/types";

interface TrendingNowProps {
  trends: TrendingSearch[];
}

export default function TrendingNow({ trends }: TrendingNowProps) {
  if (!trends.length) return null;

  return (
    <SectionWrapper variant="contained" id="trending-now">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            Trending right now
          </h2>
          <p className="text-text-secondary text-[length:var(--font-size-body)]">
            What the United States is searching for on Google
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-1">
        {trends.map((trend, i) => (
          <ScrollReveal key={trend.title} delay={0.1 * (i + 1)}>
            <a
              href={trend.url || `https://www.google.com/search?q=${encodeURIComponent(trend.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline gap-4 py-4 border-l-2 border-amber-primary/30 pl-4 hover:border-amber-primary hover:bg-cosmic-surface/30 transition-all duration-300 rounded-r-lg group"
            >
              <span className="text-text-tertiary text-[length:var(--font-size-caption)] font-[family-name:var(--font-inter)] font-medium w-6 shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-text-primary text-[length:var(--font-size-body)] font-medium group-hover:text-text-accent transition-colors">
                  {trend.title}
                </span>
              </div>
              {trend.traffic && (
                <span className="text-text-tertiary text-[length:var(--font-size-caption)] tabular-nums shrink-0">
                  {trend.traffic}
                </span>
              )}
            </a>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
