"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ShareButton from "@/components/ui/ShareButton";

export default function ShareFooter() {
  return (
    <SectionWrapper variant="compact" id="share">
      <ScrollReveal>
        <div className="text-center space-y-8">
          <ShareButton />

          <div className="space-y-2">
            <p className="text-text-tertiary text-[length:var(--font-size-caption)]">
              Data from{" "}
              <span className="text-text-secondary">NASA</span>,{" "}
              <span className="text-text-secondary">Wikipedia</span>,{" "}
              <span className="text-text-secondary">ISS Tracking API</span>,{" "}
              <span className="text-text-secondary">OpenSky Network</span>
            </p>
            <p className="text-text-tertiary text-[length:var(--font-size-caption)] italic">
              Made with curiosity
            </p>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
