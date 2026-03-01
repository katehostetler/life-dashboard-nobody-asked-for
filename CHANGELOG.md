# Changelog

All notable changes to the life-dashboard-nobody-asked-for project will be documented in this file.

---

## 2026-03-01

### Added
- Initialized project with git
- Created project-level `CLAUDE.md` with project-specific rules
- Created `CHANGELOG.md` for tracking all changes
- Created `README.md` with project overview and structure

### Added — Full Dashboard Implementation
- **Next.js 14+ foundation** with App Router, TypeScript, Tailwind CSS v4
- **Design system** ("Warm Cosmic"): deep purples, amber accents, soft glows via CSS custom properties
- **Google Fonts**: Playfair Display (serif headlines) + Inter (sans-serif body/counters)
- **8 scroll sections**:
  1. Hero Earth — NASA EPIC satellite photo with slow rotation animation
  2. ISS Tracker — SVG world map with live ISS position (5s polling via SWR), astronaut count
  3. You Are Here — heartbeat counter, sun orbits, minutes alive, dog years, Pluto years (requestAnimationFrame)
  4. Algorithm vs. Cosmos — Wikipedia #1 article vs. cosmic fact + Voyager 1 distance ticker
  5. World Reading — top 5 Wikipedia articles with view counts, editorial numbered list
  6. Live Counters — flights, babies, Google searches, emails, CO₂, trees (ticking from global rates)
  7. Time Progress — year, season, daylight progress bars (suncalc-based)
  8. Share Footer — Web Share API / clipboard copy, credits
- **Living sky gradient** background shifts with local time of day (suncalc + geolocation)
- **Birthday overlay** — fullscreen first-visit input, stored in localStorage
- **3-tier geolocation** — browser API → IP geolocation → NYC default
- **API routes**: `/api/iss` (astros proxy), `/api/geolocation` (IP lookup), `/api/og` (dynamic OG image)
- **Scroll reveal animations** via Motion (Framer Motion) with `prefers-reduced-motion` support
- **Glowing amber dividers** between sections with pulse animation
- **Responsive design** — works on mobile (390px) through desktop (1440px+)
- **Shared UI primitives**: SectionWrapper, GlowDivider, ScrollReveal, TickingNumber, ProgressBar, MiniMap
