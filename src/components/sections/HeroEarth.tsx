"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HeroEarthProps {
  imageUrl: string | null;
  caption: string | null;
  date: string | null;
}

export default function HeroEarth({ imageUrl, caption, date }: HeroEarthProps) {
  const hoursAgo = date
    ? Math.round((Date.now() - new Date(date).getTime()) / 3600000)
    : null;

  return (
    <SectionWrapper variant="hero" id="hero">
      <ScrollReveal>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-8">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(245, 166, 35, 0.08) 0%, transparent 70%)",
              }}
            />
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt="Earth from space"
                  className="w-full h-full rounded-full object-cover animate-slow-rotate"
                  style={{
                    boxShadow:
                      "0 0 80px rgba(100, 140, 255, 0.15), 0 0 160px rgba(245, 166, 35, 0.08)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, transparent 55%, rgba(13,10,26,0.4) 75%, rgba(13,10,26,0.9) 90%, #0D0A1A 100%)",
                  }}
                />
              </>
            ) : (
              <>
                <div
                  className="w-full h-full rounded-full bg-cosmic-surface flex items-center justify-center"
                  style={{
                    boxShadow: "0 0 80px rgba(100, 140, 255, 0.1)",
                  }}
                >
                  <span className="text-text-tertiary text-[length:var(--font-size-body)]">
                    Loading Earth...
                  </span>
                </div>
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, transparent 55%, rgba(13,10,26,0.4) 75%, rgba(13,10,26,0.9) 90%, #0D0A1A 100%)",
                  }}
                />
              </>
            )}
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-hero)] text-text-primary leading-none mb-4">
            You are here.
          </h1>

          {hoursAgo !== null && (
            <p className="text-text-secondary text-[length:var(--font-size-body)] max-w-md">
              This is what Earth looked like{" "}
              <span className="text-text-accent">
                {hoursAgo === 0 ? "moments" : `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"}`}
              </span>{" "}
              ago, photographed from a million miles away.
            </p>
          )}

          {!hoursAgo && caption && (
            <p className="text-text-secondary text-[length:var(--font-size-body)] max-w-md">
              {caption}
            </p>
          )}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
