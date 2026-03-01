# Life Dashboard Nobody Asked For

A visually stunning single-page web app that greets you with a curated collection of delightful, obscure, and mildly absurd facts about *right now*. Not a productivity tool. Not useful. Just... wonderful.

Every time you load the page, you get: real NASA photos of Earth, live ISS tracking, your heartbeat count since birth, what the world is reading, ticking global stats, and cosmic perspective — all wrapped in a warm, glowing editorial experience.

## Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS + CSS custom properties
- **Fonts:** Playfair Display (serif headlines) + Inter (sans-serif body)
- **Animation:** Motion (Framer Motion) + requestAnimationFrame counters
- **Deployment:** Vercel

## Project Structure

```
life-dashboard-nobody-asked-for/
├── CLAUDE.md        # Project-level AI assistant instructions
├── CHANGELOG.md     # Log of all changes (updated with every commit)
├── README.md        # This file — project overview and setup
└── src/
    ├── app/         # Next.js App Router pages and API routes
    ├── components/  # React components (sections/, ui/, providers/)
    └── lib/         # Utilities (api/, calculations/, hooks/, constants/, types/)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Source |
|----------|----------|--------|
| `NASA_API_KEY` | Yes | [api.nasa.gov](https://api.nasa.gov) (free, instant) |
| `OPENSKY_USERNAME` | No | [opensky-network.org](https://opensky-network.org) (free) |
| `OPENSKY_PASSWORD` | No | [opensky-network.org](https://opensky-network.org) (free) |

## Documentation Rules

- **CHANGELOG.md** is updated with every change
- **README.md** is updated whenever project structure or setup changes
- Both are included in the same commit as the related change

## AI Assistant Setup

This project uses a two-level CLAUDE.md configuration:

1. **Global** (`~/.claude/CLAUDE.md`) — applies to all sessions automatically via symlinks
2. **Project** (`./CLAUDE.md`) — project-specific rules loaded when working in this folder
