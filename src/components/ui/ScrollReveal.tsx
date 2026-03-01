"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
