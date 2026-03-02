# Changelog

## 2026-03-01

### Bug Fixes
- Fixed background going white below the hero section (replaced background-attachment: fixed with fixed pseudo-element)
- Fixed birthday stats numbers overlapping at narrow widths (reduced font sizes, fewer decimals)
- Fixed Earth image not loading when NASA API rate-limited (added fallback image)
- Fixed Earth circle harsh edge (added radial gradient overlay for smooth blending)
- Fixed hydration error in ProgressBar (initialize state to 0, calculate in useEffect)

### New Features
- Added Trending Now section (Google Trends RSS, top 10 US searches)
- Added Top Headlines section (The Guardian API, 5 latest headlines)
- Added Market Pulse section (BTC, SOL, Gold, Oil with live ticking prices)
- Added Tonight's Sky section (moon phase via suncalc + NASA APOD)
- Added On This Day section (Wikipedia historical events)
- Made AlgorithmVsCosmos top article title clickable (links to Wikipedia)
- Made all new section items clickable with proper external links

### Data Sources Added
- Google Trends RSS (no auth, 30min cache)
- The Guardian API (requires GUARDIAN_API_KEY)
- CoinGecko API (free, no auth) for BTC + SOL
- Metals.dev API (requires METALS_API_KEY) for Gold
- Alpha Vantage API (requires ALPHA_VANTAGE_KEY) for Oil/WTI
- NASA APOD API (shares NASA_API_KEY, 12hr cache)
- Wikipedia On This Day API (no auth, 24hr cache)
