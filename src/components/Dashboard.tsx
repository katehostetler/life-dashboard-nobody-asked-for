"use client";

import SkyGradientProvider from "@/components/providers/SkyGradientProvider";
import BirthdayProvider from "@/components/providers/BirthdayProvider";
import BirthdayOverlay from "@/components/ui/BirthdayOverlay";
import GlowDivider from "@/components/ui/GlowDivider";

import HeroEarth from "@/components/sections/HeroEarth";
import ISSTracker from "@/components/sections/ISSTracker";
import YouAreHere from "@/components/sections/YouAreHere";
import AlgorithmVsCosmos from "@/components/sections/AlgorithmVsCosmos";
import WorldReading from "@/components/sections/WorldReading";
import LiveCounters from "@/components/sections/LiveCounters";
import TimeProgress from "@/components/sections/TimeProgress";
import ShareFooter from "@/components/sections/ShareFooter";

import type { WikiArticle } from "@/lib/types";

interface DashboardProps {
  earthImage: {
    imageUrl: string;
    caption: string;
    date: string;
  } | null;
  wikiArticles: WikiArticle[];
  flightCount: number;
}

export default function Dashboard({
  earthImage,
  wikiArticles,
  flightCount,
}: DashboardProps) {
  const topArticle = wikiArticles.length > 0 ? wikiArticles[0] : null;

  return (
    <SkyGradientProvider>
      <BirthdayProvider>
        <BirthdayOverlay />

        <main>
          {/* 1. Hero Earth */}
          <HeroEarth
            imageUrl={earthImage?.imageUrl ?? null}
            caption={earthImage?.caption ?? null}
            date={earthImage?.date ?? null}
          />

          <GlowDivider />

          {/* 2. ISS Tracker */}
          <ISSTracker />

          <GlowDivider />

          {/* 3. You Are Here (Personal Stats) */}
          <YouAreHere />

          <GlowDivider />

          {/* 4. Algorithm vs. Reality */}
          <AlgorithmVsCosmos topArticle={topArticle} />

          <GlowDivider />

          {/* 5. What 8 Billion People Read Yesterday */}
          <WorldReading articles={wikiArticles} />

          <GlowDivider />

          {/* 6. Right Now, On Earth */}
          <LiveCounters flightCount={flightCount} />

          <GlowDivider />

          {/* 7. Time Is Passing */}
          <TimeProgress />

          <GlowDivider />

          {/* 8. Share Footer */}
          <ShareFooter />
        </main>
      </BirthdayProvider>
    </SkyGradientProvider>
  );
}
