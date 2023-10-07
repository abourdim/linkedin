# Job Search Portfolio v1.0

**Abdelhak Bourdim** — Senior Embedded Software Engineer — 20+ years

Multi-country job search web application with 4 markets, 3 languages, 7 themes.

## Quick Start

```bash
chmod +x start_here.sh
./start_here.sh
```

Opens at `http://localhost:8000/jobs/` — PIN: `123456`

## What's Inside

| Country | Documents | Languages |
|---------|-----------|-----------|
| Switzerland (CH) | CV, LinkedIn, Letter, Pitch, Interview, Plan, Prompts, Queries, Live Jobs | FR, EN, AR |
| France (FR) | CV, LinkedIn, Letter, Pitch, Interview, Plan, Prompts, Queries, Live Jobs | FR, EN, AR |
| Luxembourg (LU) | CV, LinkedIn, Letter, Pitch, Interview, Plan, Prompts, Queries, Live Jobs | FR, EN, AR |
| Gulf / GCC | CV, LinkedIn, Letter, Pitch, Interview, Plan, Prompts, Queries, Live Jobs | FR, EN, AR |

## Features

- **SPA** — Single Page Application, zero dependencies, no build step
- **3 Languages** — French, English, Arabic (full RTL support)
- **7 Themes** — Light, Dark, Blue, High Contrast, Golden Age, Alhambra, Medina
- **PIN Access** — SHA-256 hashed, 24h session
- **Edit Mode** — Modify documents in-browser, auto-saved to localStorage
- **Downloads** — HTML, TXT, PDF, copy to clipboard
- **Command Palette** — Ctrl+K for quick navigation
- **Live Jobs** — Adzuna API integration per country
- **111+ documents** — CVs, cover letters, pitches, plans, prompts, queries

## Tech Stack

Vanilla HTML/CSS/JS. No Node. No npm. No build. Python 3 for local server.

## File Map

```
start_here.sh       Launch script
serve.py            Local dev server
howto.html          Detailed documentation
jobs/               SPA application
  index.html        Entry point
  css/              Themes + layout
  js/               App logic (7 modules)
01-111_*            Content documents (CH/FR/LU/Gulf × FR/EN/AR)
```

## Deploy to GitHub Pages

```bash
gh repo create cv_updated --public --source=. --push
# Settings > Pages > Source: main branch
# Access: https://username.github.io/cv_updated/jobs/
```

## License

Private — Abdelhak Bourdim, 2026
