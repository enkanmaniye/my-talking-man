# My Talking Man

A browser-based AI virtual companion that combines a 3D character, a configurable personality, persistent memory and virtual-pet gameplay.

**Status:** Stage 1, interface and navigation. The screens are visible, but accounts, chat, avatar generation and game features are not functional yet. See `docs/IMPLEMENTATION_PLAN.md`.

## Requirements

- Node.js 20.9 or later (22 recommended)
- npm

## Setup

```bash
npm install
cp .env.example .env.local
```

This stage needs no environment values or external accounts.

## Run

```bash
npm run dev
```

Open <http://localhost:3000>.

## Check the project

```bash
npm run verify
```

This runs type checking, linting, unit tests and a production build.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Generate Next.js types and run the TypeScript compiler |
| `npm test` | Run unit tests |
| `npm run verify` | Run type checks, lint, unit tests and a production build |
| `npm run test:e2e` | Run browser tests (first run `npx playwright install chromium`) |
| `npm run audit:prod` | Check only the packages that ship to production |

## Project layout

| Path | Contents |
|---|---|
| `app/` | Routes, layouts and API routes |
| `components/` | UI and 3D components |
| `features/` | Pure domain rules and configuration |
| `services/` | Server-side orchestration |
| `lib/` | Supabase and AI adapters, validation, utilities |
| `types/` | Shared TypeScript types |
| `supabase/migrations/` | Database migrations |
| `public/` | Static assets |
| `tests/` | Automated tests |
| `docs/` | Requirements, analysis, architecture, plan and provider comparison |

Start with `CLAUDE.md` for project rules and `docs/IMPLEMENTATION_PLAN.md` for current status.
