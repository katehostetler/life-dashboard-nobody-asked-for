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
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-[26rem] md:h-[26rem] mb-8">
            {/* Atmospheric glow behind Earth */}
            <div
              className="absolute -inset-12 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(80, 120, 255, 0.07) 20%, rgba(245, 166, 35, 0.03) 40%, transparent 65%)",
              }}
            />
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Earth from space"
                className="w-full h-full object-cover animate-slow-rotate"
                style={{
                  maskImage:
                    "radial-gradient(circle, white 40%, rgba(255,255,255,0.3) 52%, transparent 62%)",
                  WebkitMaskImage:
                    "radial-gradient(circle, white 40%, rgba(255,255,255,0.3) 52%, transparent 62%)",
                }}
              />
            ) : (
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
