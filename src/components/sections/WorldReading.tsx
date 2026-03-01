"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { WikiArticle } from "@/lib/types";

interface WorldReadingProps {
  articles: WikiArticle[];
}

export default function WorldReading({ articles }: WorldReadingProps) {
  if (!articles.length) return null;

  return (
    <SectionWrapper variant="contained" id="world-reading">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            What 8 billion people read yesterday
          </h2>
          <p className="text-text-secondary text-[length:var(--font-size-body)]">
            The most-viewed articles on English Wikipedia
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-1">
        {articles.map((article, i) => (
          <ScrollReveal key={article.article} delay={0.1 * (i + 1)}>
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.article.replace(/ /g, "_"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline gap-4 py-4 border-l-2 border-amber-primary/30 pl-4 hover:border-amber-primary hover:bg-cosmic-surface/30 transition-all duration-300 rounded-r-lg group"
            >
              <span className="text-text-tertiary text-[length:var(--font-size-caption)] font-[family-name:var(--font-inter)] font-medium w-6 shrink-0">
                {article.rank}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-text-primary text-[length:var(--font-size-body)] font-medium group-hover:text-text-accent transition-colors">
                  {article.article}
                </span>
              </div>
              {article.views > 0 && (
                <span className="text-text-tertiary text-[length:var(--font-size-caption)] tabular-nums shrink-0">
                  {article.views.toLocaleString()} views
                </span>
              )}
            </a>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
