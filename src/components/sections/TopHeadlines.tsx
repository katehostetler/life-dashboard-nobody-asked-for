"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { NewsHeadline } from "@/lib/types";

interface TopHeadlinesProps {
  headlines: NewsHeadline[];
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function TopHeadlines({ headlines }: TopHeadlinesProps) {
  if (!headlines.length) return null;

  return (
    <SectionWrapper variant="contained" id="top-headlines">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            Top headlines
          </h2>
          <p className="text-text-secondary text-[length:var(--font-size-body)]">
            The latest from The Guardian
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-1">
        {headlines.map((headline, i) => (
          <ScrollReveal key={headline.url} delay={0.1 * (i + 1)}>
            <a
              href={headline.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline gap-4 py-4 border-l-2 border-amber-primary/30 pl-4 hover:border-amber-primary hover:bg-cosmic-surface/30 transition-all duration-300 rounded-r-lg group"
            >
              <div className="flex-1 min-w-0">
                <span className="text-text-primary text-[length:var(--font-size-body)] font-medium group-hover:text-text-accent transition-colors">
                  {headline.title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-text-tertiary text-[length:var(--font-size-caption)]">
                  {headline.source}
                </span>
                <span className="text-text-tertiary text-[length:var(--font-size-caption)] tabular-nums">
                  {timeAgo(headline.publishedAt)}
                </span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
