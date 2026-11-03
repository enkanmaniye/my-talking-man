# Implementation plan

**Revision 2, 2026-11-03.** Reflects Lucy's approved decisions. Stage numbers here replace those in `PROJECT_SPEC.md`.

Each stage ends with `npm run verify`, its stage tests and an end-of-stage report. The next stage starts after approval. A stage is complete only when verified by a real run.

## Sequence

| Stage | Name | Status | Spec stage |
|---|---|---|---|
| 0 | Project setup | **Complete** | 0 |
| 1 | Interface and navigation | Built; awaiting local verification | 1 |
| 2 | Auth, database, private storage | Next | 2 |
| 3 | Character creation: consent, photos, profile | | 3 |
| 4A | Avatar provider trial and approval | **Paid decision** | 11 (moved) |
| 4B | Avatar pipeline and basic viewer | | 11 and part of 6 (moved) |
| 5 | AI chat, limits, disclosures | | 4 |
| 5B | AI interview and personality preview | | New |
| 6 | Memory | | 5 |
| 7 | Character animation and room | | Rest of 6 |
| 8 | Pet mechanics | | 7 |
| 9 | Economy, shop, inventory | | 8 |
| 10 | Room and clothing customization | | 9 |
| 11 | Mini-game and achievements | | 10 |
| 12 | Testing, security review, deployment | | 12 |

The MVP is complete after Stage 12, and it **includes photo-to-3D**.

## Acceptance criteria

### Stage 0: complete

Lucy confirmed on her machine: `npm install`, `npm run dev` and `npm run verify` succeeded, with TypeScript, ESLint, 3 Vitest tests and the production build all passing.

### Stage 1

- Landing, register, login, onboarding, Home, Chat, Games, Shop and Profile are reachable.
- Navigation works by mouse, touch and keyboard, with the current page marked.
- Layouts work at desktop and phone widths with no horizontal scrolling.
- Loading, error and not-found states exist.
- Unavailable actions are visibly disabled, and sample data is labelled.
- No stock or placeholder character is presented as the user's boyfriend.

**Status:** built, not yet verified in Next.js. npm is unavailable in the build environment, so these ran outside Next.js with stand-ins:

- Type check with minimal shims, and all 7 unit tests with a Vitest stand-in.
- 17 views rendered with React and Tailwind, then checked in Chromium at 1280, 768, 390 and 320 px: no overflow, one main heading, visible navigation, labelled controls, no enabled fake actions, no page errors.
- All internal links resolve, and key text colours reach at least 5.8:1 contrast.

Still to confirm locally: `npm run verify` and `npm run test:e2e`, which cover real routing, the current-page marker, the 404 status and the `next.config.ts` change.

### Stage 2

- Users can register, log in and log out. Registration requires confirming age 18+.
- A second user can't read or change the first user's data, proven by a test with two real accounts.
- Data persists after refresh, and secrets stay out of client bundles.
- A private storage bucket exists, with access limited to the owner.
- Users can delete their account.

### Stage 3

- A user can't upload photographs until all consent items are accepted. Each acceptance is stored with its wording version and time.
- Consent covers: the user is 18+; the person shown is an adult; that person gave informed consent; and processing by the named provider, including location and retention.
- Upload supports selection, preview, removal, replacement, progress, and type and size validation. Metadata is stripped.
- The character's age is required and must be 18 or over.
- Profile, personality, style and topic settings save, reload and can be edited.
- Photos and all data can be deleted, and deletion is confirmed in storage.
- Requested photo slots come from the provider's configuration.

### Stage 4A: gate

- Real output is scored per `AVATAR_PROVIDERS.md`.
- Vendor answers on training, retention, deletion and licensing are in writing.
- Lucy approves a provider, a budget and a subscription start date.
- **No later stage that needs the avatar begins without this gate.** If no provider is acceptable, work stops for a decision.

### Stage 4B

- A real provider generates a character from real photos through the server, with no key in the browser.
- Generation runs as a background job, with progress. The user can leave and return.
- Failures and timeouts are detected and shown, including providers that give no failure notice.
- The user previews the result in our 3D viewer, then saves, regenerates or deletes it.
- The GLB is validated and held in private storage.
- Provider usage is capped per user, because regeneration has a real cost.
- Deleting a character removes the photos and models from our storage and sends the provider's deletion request.
- Tests use a fake adapter that exists only in test code. Production never fakes success: with no provider configured, the feature reports that it is unavailable.

### Stage 5

- The user can discuss any general topic. Different personalities produce meaningfully different replies, verified live.
- Romance and flirting work. Explicit sexual requests are declined in character.
- Conversations survive refresh, and API keys stay server-side.
- The daily message limit is configurable and visible, and is enforced on the server.
- Before first chat, the user sees the AI provider's name and its retention and training policy.
- The character never claims to be human or the real person.
- Self-harm signals surface crisis resources.
- Failures show an error and never a fake reply.

### Stage 5B

- The AI interview adapts to answers and updates the same structured profile.
- A preview conversation shows the effect of personality settings.

### Stages 6–12

These keep the criteria in `PROJECT_SPEC.md`, with these additions:

- **6:** Memory keeps provenance, and supports manual add, correction and personality reset.
- **7:** Animation uses only what the generated avatar supports, and anything missing is reported. A no-WebGL fallback exists.
- **8:** Six stats plus sleep state, all 0–100 with 100 being good.
- **9:** Purchases are transactional and idempotent.
- **10:** Clothing works on generated avatars, within what the provider supports.
- **11:** Rewards use server sessions and daily caps.
- **12:** Includes legal review before public launch, a trademark check and backups.

## Open decisions

| Decision | Needed by |
|---|---|
| Multiple-photo requirement if MetaPerson wins (see `AVATAR_PROVIDERS.md`) | Stage 3 |
| Approve $800/month budget range for the provider | Stage 4A |
| Choice of AI provider | Stage 5 |
