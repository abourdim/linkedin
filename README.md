# Job Search Portfolio v2.0

**Abdelhak Bourdim** — Senior Embedded Software Engineer — 20+ years
France | USA | Canada | Egypt

Multi-country job search web application with 4 markets, 3 languages, 7 themes.

**Live:** https://abourdim.github.io/linkedin/jobs/ (PIN: `123456`)

## Quick Start

```bash
chmod +x start_here.sh
./start_here.sh
```

Opens at `http://localhost:8000/jobs/` — PIN: `123456`

## What's Inside

| Country | Documents | Languages |
|---------|-----------|-----------|
| Switzerland (CH) | CV (Swiss + Detailed + 1-Page), LinkedIn, Letter, Pitch, Interview, Flash Cards, Plan, Prompts, Queries, Jobs | FR, EN, AR |
| France (FR) | CV (French + 1-Page), LinkedIn, Letter, Pitch, Interview, Flash Cards, Plan, Prompts, Queries, Jobs | FR, EN, AR |
| Luxembourg (LU) | CV (Luxembourg + 1-Page), LinkedIn, Letter, Pitch, Interview, Flash Cards, Plan, Prompts, Queries, Jobs | FR, EN, AR |
| Gulf / GCC | CV (Gulf + 1-Page), LinkedIn, Letter, Pitch, Interview, Flash Cards, Plan, Prompts, Queries, Jobs | FR, EN, AR |

## Features

- **SPA** — Single Page Application, zero dependencies, no build step
- **3 Languages** — French, English, Arabic (full RTL support)
- **7 Themes** — Light, Dark, Blue, High Contrast, Golden Age, Alhambra, Medina
- **PIN Access** — SHA-256 hashed, 24h session
- **Edit Mode** — Modify documents in-browser, auto-saved to localStorage
- **Downloads** — HTML, TXT, PDF, copy to clipboard
- **Command Palette** — Ctrl+K for quick navigation
- **Live Jobs** — Adzuna API integration per country
- **Flash Cards** — 30 interactive flip cards (TECH/Q&A/VOCAB)
- **Copy Buttons** — Click-to-copy on prompts and search queries
- **QR Code** — Portfolio link QR on 1-page CVs
- **PWA** — Offline support via service worker
- **Google Analytics** — Visitor tracking (GA4)
- **SEO** — Open Graph + Twitter Card meta tags
- **Mobile** — Swipe-to-close sidebar, 44px touch targets
- **75 PDFs** — Delivery folder organized by country/language

## How to Use

### Access the Portfolio
1. Open https://abourdim.github.io/linkedin/jobs/
2. Enter PIN: `123456`
3. Browse by country (CH/FR/LU/Gulf) and section

### Navigation
- **Country tabs** — Top of sidebar (CH, FR, LU, Gulf)
- **Sections** — CV, LinkedIn, Letter, Pitch, Interview, Plan, Prompts, Queries, Jobs, Help
- **Languages** — FR/EN/AR buttons at bottom of sidebar
- **Ctrl+K** — Command palette for quick search

### Download Documents
- **PDF** button — Download formatted PDF
- **TXT** button — Download plain text
- **HTML** button — Download web page
- **Clipboard** icon — Copy text content
- **Link** icon — Copy direct URL

### Flash Cards
In "Interview Prep > Flash Cards" — click cards to flip:
- **TECH** (blue) — Technical competencies
- **Q&A** (orange) — Interview questions & answers
- **VOCAB** (green) — FR/EN vocabulary

### Copy Prompts & Queries
- **Prompts**: Click "Copy" button on each prompt box
- **Queries**: Click directly on the query text (turns green = copied)

### Google Analytics
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select "Portfolio Abdelhak" property
3. **Real-time** — See who is viewing now
4. **Reports > Engagement** — Most viewed pages
5. **Reports > Acquisition** — Traffic sources

### Delivery Folder
Pre-built PDFs in `delivery/` organized by country and language:
```
delivery/
  01_ch/   01_FR/ 02_EN/ 03_AR/   (9 files FR, 6 EN, 4 AR)
  02_fr/   01_FR/ 02_EN/ 03_AR/   (5 files FR, 5 EN, 3 AR)
  03_lu/   01_FR/ 02_EN/ 03_AR/   (same structure)
  04_gulf/ 01_FR/ 02_EN/ 03_AR/   (same structure)
  05_shared/                       (generic documents)
```

## Tech Stack

Vanilla HTML/CSS/JS. No Node. No npm. No build. Python 3 for local server.

## Testing

```bash
npm install
npm test
```

80 unit tests covering all 7 JS modules (Jest + jsdom).

## File Map

```
start_here.sh        Launch script
serve.py             Local dev server (Python 3)
jobs/                SPA application
  index.html         Entry point (SEO, GA, PWA)
  manifest.json      PWA manifest
  sw.js              Service worker
  css/               Themes + layout
  js/                7 modules (app, i18n, themes, pin, downloads, editor, jobs)
  img/               QR code
content/             All documents (HTML + PDF)
  ch/ fr/ lu/ gulf/  Country-specific documents
  shared/            Generic documents (letters, prompts, flash cards, help)
delivery/            75 PDFs organized by country/language
tests/               Jest unit tests
```

## License

Private — Abdelhak Bourdim, 2026
