"use client";

interface GlowDividerProps {
  className?: string;
}

export default function GlowDivider({ className = "" }: GlowDividerProps) {
  return (
    <div
      className={`mx-auto max-w-[48rem] px-6 ${className}`}
      role="separator"
    >
      <div
        className="h-px w-full animate-glow-pulse"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245, 166, 35, 0.4), transparent)",
          boxShadow: "0 0 40px rgba(245, 166, 35, 0.15)",
        }}
      />
    </div>
  );
}
