# Papai Since 1933 AI OS

AI-powered restaurant command center for Papai Since 1933 in Willemstad, Curaçao.

## Purpose

This project helps Papai manage reservations, hiring, content planning, customer reviews, and restaurant operations using AI agents and automation workflows.

## Restaurant Profile

- Name: Papai Since 1933
- Instagram: @papaisince1933
- Location: Jan Noorduynweg #19-6, Willemstad, Curaçao
- Hours: Open daily from 11am–12am
- Reservations: +5999 527 2247

## Core Modules

- AI reservation assistant
- WhatsApp booking workflow
- Hiring funnel
- Instagram content planner
- Review request system
- Manager weekly report
- Hospitality OS agent integration

## Tech Stack

- Next.js
- TypeScript
- Supabase
- Tailwind CSS
- WhatsApp Business API-ready structure
- Claude Code-ready architecture
- GitHub repository workflow

## Status

MVP planning and scaffold phase.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run test
npm run lint
npm run build
```

## How to run locally (development)

1. Install dependencies:

```bash
npm install
```

2. Optional: copy environment template (no real keys required for local dev):

```bash
cp .env.example .env.local || true
```

3. Run the dev server:

```bash
npm run dev
```

4. Validate bundled data used by the dashboard:

```bash
npm run test
```

Notes:
- The app includes a Supabase-ready client (`lib/supabase.ts`) but does not require real API keys to run locally. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` to enable live DB features.
- The UI uses a simple black background with white text and a warm orange accent color defined in `app/globals.css`.

## Supabase optional setup

The app is designed to work without any real Supabase credentials.

Required env vars when you want to enable live persistence:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

When those values are present, the shared persistence layer in `lib/persistence.ts` will use Supabase create/read operations for reservations, reviews, content posts, and applicants.

When they are missing, the app automatically falls back to `localStorage`, so local development and demos continue to work without requiring any external services.

The fallback behavior is intentionally documented in the code comments inside `lib/persistence.ts` and `lib/supabase.ts` so the app can be enabled later without changing the UI flow.

## Deployment (Vercel)

Deploy the Papai AI OS dashboard to Vercel in minutes — no real Supabase credentials required.

### Quick Start

```bash
npm i -g vercel
vercel
```

Or connect via GitHub for automatic deployments on every push.

**See full Deployment Guide:** [docs/deployment.md](docs/deployment.md)

Key features:
- **Zero-config deployment:** Works with `npm run build` and `npm start`
- **LocalStorage fallback:** All data persists locally if Supabase credentials are missing
- **Optional Supabase:** Add env vars to enable server-side persistence later
- **Continuous deployment:** Every push to `main` auto-deploys to Vercel

## Strategy

This repo is designed as a standalone Papai client implementation and as a reusable Hospitality OS demo for Curaçao restaurants.
