# My Talking Man: project instructions

Read this file, `docs/PROJECT_SPEC.md` and the relevant parts of `docs/PRD.md` before changing anything.
Where they disagree, the approved decisions in `docs/ANALYSIS.md` override both. `docs/IMPLEMENTATION_PLAN.md` holds the current stage order and acceptance criteria, and its stage numbers replace those in the spec.

## Product overview

A browser-only website (no native apps) where a user creates a personalized 3D virtual boyfriend. It combines:

1. Free-form AI conversation shaped by a configurable personality.
2. Persistent memory that the user can view, edit and delete.
3. Virtual-pet care, an economy, a shop and room customization.

Desktop is the primary target; mobile browsers must stay usable. The character is a fictional simulation, never the real person.

## Current status

- **Current stage:** 1, awaiting local verification. See `docs/IMPLEMENTATION_PLAN.md`.
- **Budget:** small, but realistic photo-to-3D may justify a paid service once approved. Keep every external service replaceable.
- **Core MVP requirement:** a realistic character generated from uploaded photographs. Never replace it, even temporarily, with a stock character or placeholder presented as the user's character.

## Architecture

| Layer | Location | May contain | Must not contain |
|---|---|---|---|
| Presentation | `app/`, `components/` | Rendering, local UI state, API calls | Business rules, prompts, balance numbers, service-role access |
| Application | `services/` | Orchestration, authorization, I/O | React, Three.js |
| Domain | `features/` | Pure rules, configuration, schemas | Network or database calls |
| Infrastructure | `lib/supabase`, `lib/ai`, `lib/avatar` | Vendor clients and adapters | Business rules |
| Data | `supabase/migrations/` | Schema, RLS, transactional RPCs | Application secrets |
| 3D | `components/character`, `components/room` | Rendering, animation control | AI logic |

Dependency direction: `app` → `services` → `features` and `lib`. `features` imports nothing above it.

- Client code receives data through API routes or Server Components. Anything secret or authoritative stays server-side.
- Server-only modules start with `import "server-only"`.
- The AI returns a validated state such as `{ emotion, action }`. The 3D layer maps that to whatever animations exist.
- Next.js 16 conventions apply: `proxy.ts` rather than `middleware.ts`, async `params`, `searchParams`, `cookies()` and `headers()`, and ESLint run directly rather than through `next lint`.

## Development workflow

1. Implement only the requested stage. Do not start the next stage without approval.
2. Do not rewrite unrelated working code or remove functionality without approval.
3. Preserve the architecture and stack. Explain any proposed replacement before making it.
4. Run `npm run verify` after changes, plus Playwright once it exists. Fix failures before continuing.
5. Explain every migration and environment-variable change.
6. Finish each stage with the end-of-stage report below.

### Honesty rules

- Never call a feature complete because its UI exists. Complete means it was exercised end to end and worked.
- If a check could not run, say so and list it as unverified. Do not imply it passed.
- Never invent API responses, simulate a successful save or purchase, or pretend an external service works.
- No important button may have an empty handler. Unavailable features are shown as unavailable.
- Mock data is allowed only for Stage 1 layout work, must live in a clearly named module, and must be labelled in the UI. It must never reach a production feature.

### Paid services

Do not introduce a paid service, or a free tier that requires billing details, without first stating the cost and getting Lucy's explicit approval. Check current pricing and terms from the vendor's own pages before relying on a service.

## Coding conventions

- TypeScript in strict mode. No `any` without a comment explaining why.
- Validate all external input with Zod: request bodies, query parameters, AI output, stored JSON.
- Keep Server Components as the default. Add `"use client"` only where needed.
- Use `kebab-case` file names, `PascalCase` components and `camelCase` functions.
- Keep game balance in `features/pet-system` and `features/economy` configuration, never in components.
- Keep prompts in `features/conversation` and `features/personality`, never in components.
- Every important feature has loading, empty, error and success states.
- Important controls work by keyboard. 3D views have a fallback for missing WebGL.
- Add dependencies only when the current stage needs them, and state why.

## Security and privacy

- AI keys and the Supabase secret key stay server-side. Never put a secret in a `NEXT_PUBLIC_` variable.
- Derive identity from the verified session. Never trust a user ID sent by the browser.
- Use the service-role client only in audited server modules, for operations RLS cannot express.
- Validate, authenticate and authorize every protected operation.
- Rate-limit AI requests and enforce token and daily limits on the server.
- Send AI providers the minimum personal data needed.
- A provider that may use prompts for improvement is allowed, but only with its retention and training policy disclosed to users before first use.
- Photographs are private: a private bucket, short-lived signed URLs, type and size checks, and metadata stripped.
- Never send a photograph to a third party without explicit, recorded, versioned consent that names the provider. Enforce this on the server, not only in the UI.
- Send a provider only the photos it needs, and delete them when no longer needed.
- Users can delete photographs, generated models, memories, conversations and their account.
- Never log message content, memories, photographs or secrets.

### Companion safety (approved)

- The product is clearly labelled as AI, and the character never claims to be human or to be the real person.
- Users must be 18+, and characters must be adults. Any indication that a character or depicted person is a minor blocks photos, avatar generation and romantic content.
- Any general topic is allowed. Romance and flirting are allowed. Explicit sexual content is not.
- Before photos are processed, the user confirms the depicted person is an adult who gave informed consent.
- Self-harm or crisis signals break character and surface crisis resources.
- Disliked topics change tone only; they never block a conversation.
- Notifications and pet mechanics never apply emotional pressure, and chat is never gated by game state.
- Memories keep their provenance: user-stated, user-entered or roleplay. Simulated events are never presented as verified facts about the real person.

## Database rules

- All schema changes go through versioned files in `supabase/migrations/`. Never edit an applied migration.
- Every user-owned table has `user_id`, foreign keys, RLS enabled and tested policies.
- Add indexes for foreign keys and common queries.
- Store timestamps as `timestamptz` in UTC. Daily boundaries use the user's stored time zone.
- Clients have no write access to wallets, transactions, inventory grants or rewards.
- Currency and purchases change only through transactional Postgres functions that take an idempotency key, with balance checks and a ledger entry.
- Pet state is computed on the server from timestamps, never from a browser timer.

## Testing requirements

- **Vitest:** domain logic, validation, prompt building and balance calculations.
- **Integration:** RLS isolation between two real users, and transactional functions, including duplicate and failure cases.
- **Playwright:** the main flow of each stage, from Stage 1 onward.
- **AI:** automated tests use a fake adapter. Changes to personality behaviour also get a recorded check against the live provider.
- **3D:** cover load, invalid model, missing animation and no-WebGL states.

## End-of-stage report

Always include:

- What was implemented.
- Files created or modified.
- Database changes.
- Required environment variables.
- Tests run and their results.
- Fully functional features.
- Incomplete features.
- Known bugs and technical risks.
- Decisions needing approval.
- The exact command to run the application.
