"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const text = "The Life Dashboard Nobody Asked For — delightful facts about right now.";

    if (navigator.share) {
      try {
        await navigator.share({ title: "Life Dashboard", text, url });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard failed silently
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-8 py-3 rounded-full border border-border-glow text-text-primary font-[family-name:var(--font-inter)] font-medium text-[length:var(--font-size-body)] hover:bg-amber-primary/10 hover:border-amber-primary transition-all duration-300 cursor-pointer"
    >
      {copied ? "Link copied!" : "Share today\u2019s dashboard"}
    </button>
  );
}
