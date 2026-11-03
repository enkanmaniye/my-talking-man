# Architecture

Revision 2, 2026-11-03. The stack is unchanged: Next.js, React, TypeScript, Tailwind CSS, React Three Fiber, Supabase and Vercel. Photo-to-3D is now a core MVP pipeline. Unity is not used; see `AVATAR_PROVIDERS.md`.

```text
Browser
  Pages and UI ─────────────┐        3D scene (React Three Fiber)
  components/               │        loads the user's generated GLB
                            │        receives { emotion, action } only
                            │ HTTPS
Next.js server              ▼
  app/api routes and Server Components   session check, Zod validation
        │
  services/                 orchestration and authorization
    ├── features/           pure rules: personality, pet, economy, prompts
    ├── lib/ai              chat adapter ───────► AI provider
    └── lib/avatar          avatar adapter ─────► Avatar provider
        │
  lib/supabase ────────────► Supabase
                               Auth · Postgres + RLS · private Storage
                               Transactional functions for money and rewards
```

## Character creation flow

1. The user accepts the versioned consents. Without them, upload is blocked on the server.
2. Photos upload to a private bucket. Type and size are checked, and metadata is stripped.
3. The server creates an `avatar_jobs` row and sends only the required photos to the provider.
4. The browser polls our status route, and that route checks the provider. This needs no queue, survives a closed tab, and fits serverless time limits. A provider webhook can be added on top, and jobs with no result time out, since Avaturn sends no failure notice.
5. On success the server downloads the GLB, validates it and saves it to private storage with a capability manifest.
6. The user previews it in our viewer, then saves, regenerates or deletes it.
7. Photos are deleted once the character is saved, unless the user chooses to keep them for regeneration. The provider's copy is deleted by the available route.

## Provider isolation

```ts
interface AvatarProvider {
  readonly photoRequirements: PhotoRequirement[];
  readonly disclosure: ProviderDisclosure;
  createJob(input: AvatarJobInput): Promise<ProviderJobRef>;
  getJob(ref: ProviderJobRef): Promise<AvatarJobStatus>;
  fetchResult(ref: ProviderJobRef): Promise<AvatarResult>;
  deleteRemoteData(ref: ProviderJobRef): Promise<DeletionResult>;
}
```

The UI reads `photoRequirements` rather than assuming a number of photos. The consent screen reads `disclosure`, so changing vendor can't leave out-of-date wording. Chat providers follow the same pattern and expose a disclosure as well.

If no provider is configured, the feature reports that it is unavailable. Fake adapters exist only in test code.

## Chat request

1. The route verifies the session, validates the message and checks the configurable daily limit.
2. `chat-service` loads the character profile, recent messages, relevant memories and pet state.
3. `features/conversation` builds the prompt, with the safety rules.
4. The adapter streams the reply, and both messages are saved.
5. After the response, memory extraction runs on selected turns, followed by usage accounting.
6. A validated `{ emotion, action }` result goes to the animation controller.

## Trust boundaries

- The browser is untrusted. It requests actions and never states outcomes such as prices, balances or rewards.
- RLS protects user data even if a route has a bug. Server checks are a second layer.
- Money changes happen in one database transaction with an idempotency key.
- Pet state derives from stored values plus elapsed server time.
- Only adapters know a vendor's API.
- Photos reach a third party only after recorded consent, and only the photos that provider needs.

## Data areas

Stored separately, as the PRD requires: account, appearance, personality, memories, simulation state, inventory and purchases, game progress, conversation history.

New tables beyond the spec: `consents`, `onboarding_progress`, `avatar_jobs`, `ai_usage`, `game_sessions`.

`character_assets` records each generated model, its provider and its capability manifest. The renderer uses only what the manifest lists. It reports anything missing.

## Frontend structure

| Area | Routes |
|---|---|
| Public | `/`, `/login`, `/register` |
| Character creation | `/onboarding` |
| Main app | `/home`, `/chat`, `/games`, `/shop`, `/profile` |

Inventory and wardrobe are tabs in Shop. Character settings, memories and privacy controls are sections of Profile.
