"use client";

import SkyGradientProvider from "@/components/providers/SkyGradientProvider";
import BirthdayProvider from "@/components/providers/BirthdayProvider";
import BirthdayOverlay from "@/components/ui/BirthdayOverlay";
import GlowDivider from "@/components/ui/GlowDivider";

import HeroEarth from "@/components/sections/HeroEarth";
import ISSTracker from "@/components/sections/ISSTracker";
import YouAreHere from "@/components/sections/YouAreHere";
import TrendingNow from "@/components/sections/TrendingNow";
import AlgorithmVsCosmos from "@/components/sections/AlgorithmVsCosmos";
import WorldReading from "@/components/sections/WorldReading";
import TopHeadlines from "@/components/sections/TopHeadlines";
import LiveCounters from "@/components/sections/LiveCounters";
import MarketPulse from "@/components/sections/MarketPulse";
import TonightsSky from "@/components/sections/TonightsSky";
import OnThisDay from "@/components/sections/OnThisDay";
import TimeProgress from "@/components/sections/TimeProgress";
import ShareFooter from "@/components/sections/ShareFooter";

import type { WikiArticle, TrendingSearch, NewsHeadline, NasaApod, OnThisDayEvent } from "@/lib/types";

interface DashboardProps {
  earthImage: {
    imageUrl: string;
    caption: string;
    date: string;
  } | null;
  wikiArticles: WikiArticle[];
  flightCount: number;
  trends: TrendingSearch[];
  headlines: NewsHeadline[];
  apod: NasaApod | null;
  onThisDay: OnThisDayEvent[];
}

export default function Dashboard({
  earthImage,
  wikiArticles,
  flightCount,
  trends,
  headlines,
  apod,
  onThisDay,
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

          {/* 4. Trending Now */}
          <TrendingNow trends={trends} />

          <GlowDivider />

          {/* 5. Algorithm vs. Reality */}
          <AlgorithmVsCosmos topArticle={topArticle} />

          <GlowDivider />

          {/* 6. What 8 Billion People Read Yesterday */}
          <WorldReading articles={wikiArticles} />

          <GlowDivider />

          {/* 7. Top Headlines */}
          <TopHeadlines headlines={headlines} />

          <GlowDivider />

          {/* 8. Right Now, On Earth */}
          <LiveCounters flightCount={flightCount} />

          <GlowDivider />

          {/* 9. Market Pulse */}
          <MarketPulse />

          <GlowDivider />

          {/* 10. Tonight's Sky */}
          <TonightsSky apod={apod} />

          <GlowDivider />

          {/* 11. On This Day */}
          <OnThisDay events={onThisDay} />

          <GlowDivider />

          {/* 12. Time Is Passing */}
          <TimeProgress />

          <GlowDivider />

          {/* 13. Share Footer */}
          <ShareFooter />
        </main>
      </BirthdayProvider>
    </SkyGradientProvider>
  );
}
