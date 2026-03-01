import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Life Dashboard Nobody Asked For",
  description:
    "A curated collection of delightful, obscure, and mildly absurd facts about right now.",
  openGraph: {
    title: "Life Dashboard Nobody Asked For",
    description:
      "Real NASA photos. Live ISS tracking. Your heartbeat count. What the world is reading. All wrapped in cosmic warmth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
