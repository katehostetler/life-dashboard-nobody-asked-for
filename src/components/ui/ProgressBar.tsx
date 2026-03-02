"use client";

interface ProgressBarProps {
  label: string;
  value: number; // 0-100
  detail?: string;
  className?: string;
}

export default function ProgressBar({
  label,
  value,
  detail,
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-baseline">
        <span className="text-text-primary text-[length:var(--font-size-body)] font-medium">
          {label}
        </span>
        <span className="text-text-accent tabular-nums text-[length:var(--font-size-body)] font-semibold" suppressHydrationWarning>
          {clampedValue.toFixed(1)}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-cosmic-surface overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          suppressHydrationWarning
          style={{
            width: `${clampedValue}%`,
            background:
              "linear-gradient(90deg, var(--color-amber-primary), var(--color-amber-bright))",
            boxShadow: "0 0 12px rgba(245, 166, 35, 0.4)",
          }}
        />
      </div>
      {detail && (
        <p className="text-text-tertiary text-[length:var(--font-size-caption)]">
          {detail}
        </p>
      )}
    </div>
  );
}
