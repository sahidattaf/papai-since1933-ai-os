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

## Strategy

This repo is designed as a standalone Papai client implementation and as a reusable Hospitality OS demo for Curaçao restaurants.
