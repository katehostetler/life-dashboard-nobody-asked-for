"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { OnThisDayEvent } from "@/lib/types";

interface OnThisDayProps {
  events: OnThisDayEvent[];
}

export default function OnThisDay({ events }: OnThisDayProps) {
  if (!events.length) return null;

  const today = new Date();
  const monthName = today.toLocaleString("en-US", { month: "long" });
  const dayOfMonth = today.getDate();

  return (
    <SectionWrapper variant="contained" id="on-this-day">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            On this day
          </h2>
          <p className="text-text-secondary text-[length:var(--font-size-body)]">
            {monthName} {dayOfMonth} through the centuries
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-6">
        {events.map((event, i) => (
          <ScrollReveal key={`${event.year}-${i}`} delay={0.15 * (i + 1)}>
            <div className="border-l-2 border-amber-primary/30 pl-4 hover:border-amber-primary transition-colors">
              <span className="font-[family-name:var(--font-playfair)] font-bold text-[length:var(--font-size-heading)] text-text-accent">
                {event.year}
              </span>
              <p className="text-text-primary text-[length:var(--font-size-body)] mt-1 leading-relaxed">
                {event.text}
              </p>
              {event.pages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {event.pages.map((page) => (
                    <a
                      key={page.url}
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary text-[length:var(--font-size-caption)] underline underline-offset-2 hover:text-text-accent transition-colors"
                    >
                      {page.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
