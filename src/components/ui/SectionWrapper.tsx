"use client";

import { ReactNode } from "react";

type SectionVariant = "hero" | "wide" | "contained" | "compact";

interface SectionWrapperProps {
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  id?: string;
}

const variantStyles: Record<SectionVariant, string> = {
  hero: "min-h-screen flex flex-col items-center justify-center px-6 py-32",
  wide: "max-w-[64rem] mx-auto px-6 py-24",
  contained: "max-w-[48rem] mx-auto px-6 py-24",
  compact: "max-w-[48rem] mx-auto px-6 py-16",
};

export default function SectionWrapper({
  children,
  variant = "contained",
  className = "",
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`relative ${variantStyles[variant]} ${className}`}>
      {children}
    </section>
  );
}
