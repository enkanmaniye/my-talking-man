# Specification analysis

Reviewed: `PRD.md` (including its two updates) and `PROJECT_SPEC.md`, 2026-11-03.

Service facts were checked on the date above and must be rechecked before use. This is not legal advice.

## 1. Approved decisions

Lucy decided these on 2026-11-03. They override `PRD.md` and `PROJECT_SPEC.md`, and they replace my earlier recommendations.

| # | Decision |
|---|---|
| A1 | **Photo-to-3D is a core MVP requirement.** Users upload multiple photographs and get a realistic generated 3D character. A stock character must not replace it. Paid services are acceptable, and the result matters more than the lowest price, after a real comparison. |
| A2 | **Photo upload is part of core onboarding** and is not deferred. |
| A3 | **Approved:** users are 18+, characters are adults, any general topic is allowed, romance and flirting are allowed, and explicit sexual content is not. Permission and consent are required before images are processed or an avatar is generated. |
| A4 | **Approved:** a visible daily message limit for the MVP, configurable later. |
| A5 | **Providers that may use prompts for improvement are not banned.** The selected provider's retention and training policies must be disclosed to users. Photographs and unnecessary personal data don't go to external providers without disclosure and consent. |

Still open:

- **A6 Name:** a trademark check before public launch, as "My Talking Man" echoes "My Talking Tom".
- **A7 Style:** the character aims for realism, and the interface stays playful.
- **A8 Legal:** review before public launch. The Orrick summary lists companion-chatbot laws in California and New York, with others following. Face data may fall under biometric and privacy laws such as GDPR, Illinois BIPA and Thailand's PDPA.
- **Provider choice:** see `AVATAR_PROVIDERS.md`.

Stage numbers in sections 2 and 3 use the original numbering. `IMPLEMENTATION_PLAN.md` holds the current sequence.

## 2. Contradictions and proposed resolutions

| # | Conflict | Proposed resolution |
|---|---|---|
| C1 | The PRD says "downloads" and mentions store-style flows; its update says website only | Website only. The update supersedes the earlier text. |
| C2 | The PRD requires an AI-guided interview; Stage 3 says no AI yet | Stage 3 builds structured forms and the profile. New Stage 4b adds the adaptive interview, writing to the same profile. |
| C3 | Personality preview needs AI but its settings arrive in Stage 3 | The preview ships in Stage 4b. |
| C4 | Trait lists differ across three places, and the spec has 10 styles against the PRD's 15 weighted styles | One registry in `features/personality`: the union of the traits, signed sliders, normalized style weights and free-text additions. |
| C5 | PRD needs: Health, Hunger, Sleep, Energy, Happiness. Spec needs: Health, Hunger, Energy, Happiness, Hygiene, Social | Keep the six spec stats, plus an `is_sleeping` state with timestamps. All run 0–100 where 100 is good, so "hunger" is stored as satiety. |
| C6 | Navigation differs in all three places: PRD original, PRD update and the spec's page list. The spec has no Landing or Games page | Landing plus five main views: Home (dashboard and room merged), Chat, Games, Shop (with Inventory and Wardrobe), Profile/Settings. |
| C7 | Two memory levels in the PRD, three in the spec | Use the spec's three. Add provenance: `user_stated`, `user_entered`, `roleplay`. |
| C8 | Stage 5 offers view, edit and delete; the PRD also requires manual add, correction and personality reset | Include all of them. |
| C9 | The spec's table list has `pet_actions`; the Stage 2 prompt omits it | Include it. |
| C10 | "Build complete pages" conflicts with "no fake functionality" | Stage 1 shows real layouts with honest "not available yet" states and labelled sample data. |
| C11 | "Express opinions" and "shared fictional experiences" against "avoid inventing personal experiences" | The character may hold in-character opinions and roleplay, but may not assert invented facts about the real person or the user. Provenance enforces this. |
| C12 | Stage 2 creates every table before features are designed | Create the identity and character tables in Stage 2, and the rest in the stage that uses them. Fewer migrations will need correcting. |
| C13 | Apple sign-in is in the PRD but not the spec | Email first, then optional Google. Apple sign-in requires a paid Apple Developer account, so it needs approval. |

## 3. Missing technical decisions

| # | Gap | Proposed decision | Stage |
|---|---|---|---|
| M1 | Multi-table transactions: `supabase-js` has no client transaction API | Postgres functions (RPC) for wallet, purchases and rewards | 8 |
| M2 | Duplicate purchase or reward requests | Idempotency keys with a unique constraint | 8, 10 |
| M3 | Memory retrieval method | Start with Postgres full-text search, recency and importance, at no cost. Add `pgvector` if testing shows it is needed. | 5 |
| M4 | Rate limiting without Redis on serverless | Postgres usage counters | 4 |
| M5 | Streaming replies and background memory extraction | Stream the response, then extract after it finishes, on a sample of turns to limit cost | 4, 5 |
| M6 | Pet decay | Pure function evaluated on read and write; no scheduled job | 7 |
| M7 | Time zones for streaks and daily rewards | Store an IANA time zone on `profiles` | 2 |
| M8 | Mini-game cheating: a browser-run game can't prove its score | Server-issued sessions, plausibility limits and daily reward caps. Reduces abuse, does not eliminate it. | 10 |
| M9 | Tables absent from the spec | `onboarding_progress`, `consents`, `ai_usage`, `character_appearance`, `game_sessions`, and XP/level fields | As needed |
| M10 | Encryption of sensitive data | TLS and provider encryption at rest for the MVP. Application-level encryption would limit search and is deferred. | 2 |
| M11 | Account deletion and data export | Add account deletion, cascading to storage; export follows | 2, 12 |
| M12 | 3D asset standard | Follow the chosen provider's skeleton and blendshapes, recorded in a capability manifest | 4 |
| M13 | Generated models are private and can be large (about 6 MB per body, per Avatar SDK) | Store in Supabase with signed URLs and browser caching; watch the 5 GB egress limit | 4 |
| M14 | No-WebGL fallback, sounds, notifications and progression have no stage | Fallback in Stage 6. Sounds, XP/levels and notifications are post-MVP, in-app first. | 6+ |
| M15 | Auth email | Supabase's built-in sender is intended for low volume. Confirm limits at Stage 2; a custom SMTP service may be needed. | 2 |

## 4. Implementation risks

| Risk | Impact | Mitigation |
|---|---|---|
| Clothing needs meshes rigged to the same skeleton | High: previewing clothes on a character is real 3D asset work | Prefer provider-supplied outfits, checked in Stage 4A |
| Generated models may lack rich facial expressions | Medium | Check blendshapes in Stage 4A, and report anything unsupported |
| A generated avatar may not fit animations or clothing, or may trade recognizability for facial animation | High | Stage 4A tests real output before any subscription |
| Fixed avatar cost of about $800/month | High | Begin only after the trial; cap regenerations per user |
| Mobile browser performance with realistic models | Medium | Size budget, compressed textures, lazy loading and a quality setting |
| LLM output varies, so tests can flake | Medium | Fake adapter in CI, structured output validation, recorded live checks |
| Character drift and repetition | Medium | Compact profile in every request, plus a small evaluation set |
| Emotional dependence | Medium | No guilt-based messages, clear AI labelling, crisis handling |
| AI cost growth | High | Message window, token and daily limits, per-user usage tracking |
| Free-tier fragility | Medium | See section 5; do not hold real user data on the free tier without a backup |

## 5. Service limits checked

| Service | Free tier | Consequence |
|---|---|---|
| Supabase Free | 500 MB database, 1 GB storage, 5 GB egress, 50,000 MAU, 2 active projects, paused after 1 week of inactivity, no automatic backups | Fine for development. Unsuitable for real user data without manual backups. Pro starts at $25/month. |
| Vercel Hobby | Free, 100 GB transfer, 1M function invocations, 4 active CPU hours, 300 s function limit; **non-commercial personal use only** | Fine until monetized. Commercial use needs Pro, from $20 per developer seat per month. |
| AI usage | Billed separately from any Claude subscription | Exact cost to be quoted at Stage 4 |

## Sources

- [Supabase pricing](https://supabase.com/docs/pricing)
- [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Avatar platforms in 2026 (Avatar SDK blog; vendor source)](https://avatarsdk.com/blog/2026/08/31/avatar-platforms-2026-whos-alive-whos-gone/)
- [Best free AI APIs in 2026 (third-party)](https://aireiter.com/blog/best-free-ai-api)
- [2026 state chatbot laws (Orrick)](https://www.orrick.com/en/Insights/2026/04/2026-State-Chatbot-Laws-Key-Provisions-and-Regulatory-Trends)
