"use client";

import { useEffect, useRef, useState } from "react";

interface TickingNumberProps {
  value: number;
  rate?: number; // increment per second (for live-ticking counters)
  format?: "integer" | "decimal" | "compact";
  decimals?: number;
  className?: string;
  label?: string;
}

function formatNumber(
  value: number,
  format: "integer" | "decimal" | "compact",
  decimals: number
): string {
  switch (format) {
    case "compact": {
      if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
      if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
      if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
      return Math.floor(value).toLocaleString();
    }
    case "decimal":
      return value.toFixed(decimals);
    case "integer":
    default:
      return Math.floor(value).toLocaleString();
  }
}

export default function TickingNumber({
  value,
  rate = 0,
  format = "integer",
  decimals = 2,
  className = "",
  label,
}: TickingNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const startValueRef = useRef<number>(value);

  useEffect(() => {
    startValueRef.current = value;
    startTimeRef.current = performance.now();

    if (rate === 0) {
      setDisplayValue(value);
      return;
    }

    const tick = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      setDisplayValue(startValueRef.current + rate * elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, rate]);

  return (
    <div className="text-center">
      <span
        className={`tabular-nums font-[family-name:var(--font-inter)] font-semibold ${className}`}
      >
        {formatNumber(displayValue, format, decimals)}
      </span>
      {label && (
        <span className="block mt-1 text-text-secondary text-[length:var(--font-size-caption)]">
          {label}
        </span>
      )}
    </div>
  );
}
