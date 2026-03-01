"use client";

import { useEffect, useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProgressBar from "@/components/ui/ProgressBar";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { getYearProgress, getSeasonProgress, getDaylightProgress } from "@/lib/calculations/progress";

export default function TimeProgress() {
  const location = useGeolocation();
  const [yearProgress, setYearProgress] = useState(getYearProgress());
  const [season, setSeason] = useState(getSeasonProgress());
  const [daylight, setDaylight] = useState(
    getDaylightProgress(location.latitude, location.longitude)
  );

  useEffect(() => {
    const update = () => {
      setYearProgress(getYearProgress());
      setSeason(getSeasonProgress());
      setDaylight(getDaylightProgress(location.latitude, location.longitude));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [location.latitude, location.longitude]);

  return (
    <SectionWrapper variant="contained" id="time-progress">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            Time is passing
          </h2>
        </div>
      </ScrollReveal>

      <div className="space-y-8">
        <ScrollReveal delay={0.1}>
          <ProgressBar
            label="2026"
            value={yearProgress}
            detail={`Day ${Math.floor((yearProgress / 100) * 365)} of 365`}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <ProgressBar
            label={season.name}
            value={season.progress}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <ProgressBar
            label="Today's daylight"
            value={daylight.progress}
            detail={`${daylight.sunriseTime} → ${daylight.sunsetTime}`}
          />
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
