# My Talking Man
## Technical Architecture and Staged Implementation Specification

**Product:** My Talking Man  
**Platform:** Browser-only website  
**Primary experience:** A realistic 3D virtual boyfriend with an AI personality, free-form conversation, persistent memory, virtual-pet mechanics, and a customizable environment.

**Development approach:** Incremental implementation using Claude Code.  
**Budget constraint:** Small. Prefer free tiers, open-source libraries, and replaceable external services.

---

# 1. Product architecture

## 1.1 Recommended technology stack

Use the following stack unless a technical limitation justifies changing it. Claude Code must explain any proposed replacement before implementing it.

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js + React + TypeScript | Browser application |
| Styling | Tailwind CSS | Responsive interface |
| 3D rendering | Three.js + React Three Fiber | Character, room, objects, animations |
| 3D utilities | Drei | Camera, lighting, model loading and controls |
| Backend | Next.js server-side routes | Business logic and API endpoints |
| Database | Supabase PostgreSQL | Users, profiles, memories, game state |
| Authentication | Supabase Auth | User accounts and sessions |
| File storage | Supabase Storage | Character images, avatars and assets |
| AI integration | Provider-independent AI service | Character conversations and memory |
| Validation | Zod | Validate API requests and stored data |
| Testing | Vitest + Playwright | Unit and browser testing |
| Deployment | Vercel or another compatible host | Website hosting |

Use free-tier services initially. Before relying on a service, check its current free-tier limitations. Do not introduce paid infrastructure without explaining why it is necessary.

## 1.2 High-level architecture

The application should have five main layers:

**1. Presentation layer**

Responsible for the website interface, navigation, chat window, character display, room, inventory, shop, settings and mini-games.

**2. Application layer**

Contains business logic: conversation orchestration, personality configuration, pet statistics, rewards, purchases, inventory and user preferences.

**3. Data layer**

Stores user accounts, character profiles, personality settings, memories, conversation history, pet statistics, inventory and room configuration.

**4. AI layer**

Responsible for generating responses consistent with the boyfriend's personality, retrieving relevant memories, updating memory and respecting the user's conversation settings.

**5. 3D layer**

Displays the character and environment, handles animations, character interactions, camera controls and object placement.

Keep these layers separate. The 3D renderer must not contain AI business logic, and AI prompts must not be scattered throughout React components.

## 1.3 Suggested project structure

```text
my-talking-man/
│
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── onboarding/
│   ├── dashboard/
│   ├── chat/
│   ├── character/
│   ├── room/
│   ├── shop/
│   ├── inventory/
│   ├── settings/
│   │
│   ├── api/
│   │   ├── chat/
│   │   ├── memory/
│   │   ├── character/
│   │   ├── pet/
│   │   └── shop/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── chat/
│   ├── character/
│   ├── pet/
│   ├── room/
│   ├── shop/
│   └── onboarding/
│
├── features/
│   ├── personality/
│   ├── conversation/
│   ├── memory/
│   ├── pet-system/
│   ├── economy/
│   ├── inventory/
│   └── customization/
│
├── lib/
│   ├── supabase/
│   ├── ai/
│   ├── validation/
│   └── utilities/
│
├── services/
│   ├── chat-service.ts
│   ├── memory-service.ts
│   ├── pet-service.ts
│   ├── reward-service.ts
│   └── character-service.ts
│
├── types/
├── public/
│   ├── models/
│   ├── animations/
│   ├── textures/
│   └── images/
│
├── tests/
├── CLAUDE.md
├── .env.example
└── package.json
```

Claude Code may adjust this structure when necessary, but it must preserve separation between features, services, UI and data access.

---

# 2. Core systems

## 2.1 User accounts and onboarding

The user must be able to register, log in and maintain a persistent profile.

The onboarding process should collect information about the boyfriend character:

- Name, age (if applicable), and basic profile information.
- Personality traits.
- Hobbies and interests.
- Favourite food, books, films, music and other topics.
- Topics he likes, dislikes or feels neutral about.
- Ambitions, dreams and personal goals.
- Important life experiences and background.
- Communication preferences.
- Relationship preferences and interaction style.
- Photographs from different angles for the character creation workflow.

The onboarding information must be editable later.

Do not assume that every detail supplied by the user is objectively true about a real person. Store it as user-provided character information.

## 2.2 Personality engine

The character must have a configurable personality that influences how he communicates and behaves.

Store personality characteristics separately from communication style.

**Personality traits:**

- Introverted / extroverted.
- Calm / energetic.
- Serious / playful.
- Confident / shy.
- Affectionate / emotionally reserved.
- Patient / impatient.
- Optimistic / pessimistic.
- Romantic / practical.
- Humorous / serious.
- Sarcastic / straightforward.

**Communication style:**

- Romantic.
- Humorous.
- Sarcastic.
- Cold.
- Affectionate.
- Playful.
- Serious.
- Supportive.
- Teasing.
- Reserved.

Use configurable values rather than hardcoding a single personality into the AI prompt.

**Topic preferences:**

Each topic should have a preference value:

- Likes.
- Dislikes.
- Neutral.

Examples: programming, sports, politics, relationships, films, travel, food, science and music.

The personality engine should generate a structured character profile and pass it to the AI conversation service.

Changing personality settings must influence future conversations.

## 2.3 Free-form AI conversation

This is one of the central product features.

The user must be able to talk to the boyfriend freely, as in a general-purpose AI chat. Conversations must not be restricted to predefined relationship questions or scripted dialogue.

The character should:

- Discuss arbitrary subjects.
- Ask questions and continue conversations naturally.
- Express opinions consistent with his profile.
- Remember relevant information from previous conversations.
- React differently depending on his personality.
- Have preferences and interests.
- Express disagreement when appropriate.
- Avoid repeating the same generic responses.
- Maintain continuity between conversations.

The AI should not simply repeat the personality description in every response. It must use that information to shape its actual conversational behaviour.

Use a provider-independent architecture:

```text
Conversation UI
      |
      v
Chat API
      |
      v
Conversation Service
      |
      +---- Personality Service
      |
      +---- Memory Retrieval
      |
      +---- Pet State Context
      |
      v
AI Provider Adapter
      |
      v
Response
      |
      +---- Save Message
      |
      +---- Evaluate Memory
      |
      +---- Update Pet Interaction
```

Create an AI provider interface so the application can switch between compatible AI providers without rewriting the conversation system.

For the initial version, use one provider configured through environment variables. Do not expose API keys in browser code.

**Important cost requirement:** Do not send the entire conversation history on every request. Use a limited recent-message window and relevant memory retrieval. Add configurable limits for response length and usage.

## 2.4 Persistent memory

The character should remember relevant details across sessions.

Examples:

- The user's preferences.
- Important events.
- Previous conversations.
- Relationship milestones.
- Plans and promises.
- Favourite subjects.
- Important personal information voluntarily shared by the user.

Use three memory categories:

**Short-term memory:** Recent messages and the current conversation context.

**Long-term memory:** Important facts and preferences extracted from conversations.

**Relationship memory:** Shared experiences, milestones, recurring jokes, important dates and relationship-related context.

Memory should be stored separately from the chat transcript.

The user must be able to review, edit and delete stored memories. Do not store every message as a permanent memory.

## 2.5 3D character system

The character should be rendered in the browser using Three.js and React Three Fiber.

The first implementation should support:

- Loading a 3D human character from a GLB/GLTF file.
- Camera positioning and controls.
- Realistic lighting and materials.
- Idle animation.
- Walking animation.
- Sitting animation, if available.
- Talking animation.
- Basic emotional expressions, if supported by the model.
- Interaction animations.
- Character reactions to user actions.

The 3D character must be independent of the AI system. The AI can return an emotional or behavioural state, and the renderer can translate that state into an available animation.

For example:

```text
AI response
    |
    v
Emotion / action state
    |
    v
Animation controller
    |
    v
3D character animation
```

### Realistic character generation

The long-term objective is to allow users to upload several photographs and create a realistic 3D boyfriend.

This must be treated as a separate integration, not assumed to be a feature that Three.js can perform.

The recommended progression is:

1. Build the 3D viewer using an existing legally licensed human GLB model.
2. Implement animation and character interaction.
3. Create a character asset import system.
4. Investigate a dedicated image-to-3D or human-avatar generation service.
5. Integrate the service only after testing output quality, cost, licensing and commercial-use permissions.

Do not promise that photographs can automatically produce a high-quality, fully rigged and animated 3D human without a suitable external generation pipeline.

The application should clearly distinguish placeholder character assets from a successfully generated custom character.

## 2.6 Virtual pet system

The boyfriend should have persistent virtual-pet statistics.

Initial statistics:

| Statistic | Meaning |
|---|---|
| Hunger | Whether he needs food |
| Energy | Whether he needs rest |
| Happiness | General mood |
| Health | Overall condition |
| Hygiene | Personal cleanliness |
| Social need | Need for interaction |

Each statistic should have a defined range, such as 0–100.

Actions should affect statistics:

- Feeding increases hunger satisfaction.
- Sleeping restores energy.
- Talking can increase social satisfaction.
- Playing increases happiness.
- Certain activities can reduce energy.
- Neglecting needs can gradually affect mood.

Use a configurable game-balance system. Do not scatter arbitrary statistic changes across UI components.

Store timestamps and calculate elapsed time on the server. Do not depend on a browser timer to maintain persistent pet state.

## 2.7 Economy, rewards and shop

Implement an internal virtual currency.

Users can earn currency through:

- Daily interactions.
- Mini-games.
- Completing activities.
- Maintaining relationship or pet-care streaks.
- Other configurable achievements.

Users can spend currency on:

- Food.
- Clothes.
- Accessories.
- Furniture.
- Room decorations.
- Other character customizations.

All purchases must be validated on the server.

The user must not be able to grant themselves unlimited currency by changing browser state.

## 2.8 Room and customization

The user should be able to customize the boyfriend's environment.

Initial features:

- Room background.
- Furniture placement.
- Decorations.
- Character clothing.
- Accessories.
- Available objects.
- Character location within the room.

Represent the room as structured data so the configuration can be saved and restored.

## 2.9 Mini-games

Mini-games should be independent modules.

Start with one simple mini-game that can award virtual currency.

Do not build multiple mini-games before the reward system, inventory and persistence are working.

---

# 3. Database architecture

Use Supabase PostgreSQL.

Create the following logical tables. Claude Code may refine column types and relationships but must preserve the intended data model.

| Table | Purpose |
|---|---|
| profiles | User profile and account settings |
| characters | Boyfriend character profile |
| personality_settings | Character personality configuration |
| topic_preferences | Topics the character likes or dislikes |
| character_assets | Uploaded images and generated 3D assets |
| conversations | Conversation metadata |
| messages | Individual chat messages |
| memories | Persistent character memories |
| pet_state | Current virtual-pet statistics |
| pet_actions | History of pet interactions |
| wallets | User's virtual currency balance |
| transactions | Currency earnings and spending |
| shop_items | Available purchasable objects |
| inventory | Items owned by the user |
| room_settings | Saved room configuration |
| achievements | Achievement definitions |
| user_achievements | Achievements earned by users |

Requirements:

- Every user-owned record must be associated with the correct authenticated user.
- Use Supabase Row Level Security.
- Never trust a user ID supplied by the browser as proof of ownership.
- Use server-side authorization checks.
- Use database transactions for purchases and currency changes.
- Add appropriate foreign keys and indexes.
- Store timestamps in a consistent timezone.
- Provide database migrations.
- Never commit secrets or service-role keys.

---

# 4. Security, privacy and reliability

The application must:

- Keep AI API keys on the server.
- Validate all incoming requests.
- Apply authentication and authorization to protected operations.
- Use Row Level Security.
- Limit AI request frequency and token usage.
- Avoid exposing private photographs or conversation data.
- Allow users to delete uploaded images and stored memories.
- Use explicit consent before processing photographs through external services.
- Avoid sending unnecessary personal data to AI providers.
- Handle API errors and network failures gracefully.
- Never simulate successful purchases or saved data when the server operation failed.

Add loading, empty, error and success states to every important feature.

---

# 5. Development stages

**Implementation rule:** Complete one stage, run its tests, fix errors and verify the result before moving to the next stage.

Do not generate the whole application in one operation.

## Stage 0 — Project planning and technical setup

Deliverables:

- Review this specification.
- Identify missing decisions.
- Confirm the architecture.
- Create the project.
- Configure TypeScript and styling.
- Create the project structure.
- Create `CLAUDE.md`.
- Create `.env.example`.
- Add a README with setup instructions.

Acceptance criteria:

- The application starts locally.
- The project builds successfully.
- No unnecessary dependencies are installed.
- The README explains how to run the project.

### Prompt for Claude Code

```text
Read the complete My Talking Man technical specification.

Do not implement all features yet.

First, inspect the existing project directory and determine whether
a project already exists.

Create a technical implementation plan based on the specification.

Use:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- Three.js
- React Three Fiber

Create a clean project structure and a CLAUDE.md file containing:
- Product overview
- Architecture
- Coding conventions
- Security requirements
- Database rules
- Testing requirements
- Development workflow

Create an .env.example file without real secrets.

Implement only the initial project setup.

Run the development server and production build.
Fix all errors.

Do not create fake functionality or placeholder buttons that pretend
to perform completed operations.

At the end, report:
1. Files created.
2. Dependencies installed.
3. Commands needed to run the project.
4. What works.
5. What remains incomplete.
6. Any decisions requiring my approval.
```

## Stage 1 — Website interface and navigation

Deliverables:

- Main dashboard.
- Navigation.
- Chat page layout.
- Character page.
- Room page.
- Shop page.
- Inventory page.
- Settings page.
- Responsive desktop and mobile-browser layouts.

Use a consistent visual design.

The website should feel like a polished virtual companion product rather than a generic administration dashboard.

Acceptance criteria:

- All pages are accessible.
- Navigation works.
- Layout adapts to different screen sizes.
- Important interface states are implemented.
- No native iOS or Android application is created.

### Prompt

```text
Implement Stage 1 of My Talking Man.

Build the complete website interface and navigation.

Create:
- Dashboard
- Chat page
- Character page
- Room page
- Shop
- Inventory
- Settings

Use Next.js, TypeScript and Tailwind CSS.

Prioritize a polished, modern visual experience.

The application must be browser-only and responsive.

You may use temporary visual data for layout development,
but clearly separate mock data from real application services.

Do not pretend that database operations, purchases or AI conversations
are functional if they are not implemented.

Run the application, inspect the pages and fix layout and runtime errors.

Do not begin Stage 2 until Stage 1 is verified.
```

## Stage 2 — Authentication and database

Deliverables:

- Supabase configuration.
- Registration and login.
- User profiles.
- Database migrations.
- Row Level Security policies.
- Persistent user settings.

Acceptance criteria:

- Users can register and log in.
- Users can log out.
- Data persists after refreshing the page.
- One user cannot access another user's records.
- Secrets are never exposed in client-side code.

### Prompt

```text
Implement Stage 2: authentication and database persistence.

Integrate Supabase Auth and PostgreSQL.

Create the database schema for:
- profiles
- characters
- personality_settings
- topic_preferences
- character_assets
- conversations
- messages
- memories
- pet_state
- wallets
- transactions
- shop_items
- inventory
- room_settings
- achievements
- user_achievements

Create migrations and Row Level Security policies.

Implement registration, login and logout.

Connect the existing interface to authenticated user state.

Do not store important user data only in localStorage.

Use server-side authorization for protected operations.

Test:
- Registration
- Login
- Logout
- Data persistence
- User data isolation
- Unauthorized access

Do not continue until these tests pass.
```

## Stage 3 — Onboarding and personality configuration

Deliverables:

- Character creation questionnaire.
- Profile editor.
- Personality settings.
- Communication-style settings.
- Topic preferences.
- Photo upload.
- Persistent onboarding progress.

Acceptance criteria:

- The user can create a character.
- Settings are saved in the database.
- The user can edit them later.
- Uploaded photographs are stored securely.
- The personality profile can be retrieved by backend services.

### Prompt

```text
Implement Stage 3: character onboarding and personality configuration.

Build an onboarding workflow that collects the information described
in the product specification.

Separate:
1. Character background.
2. Personality traits.
3. Communication style.
4. Topic preferences.
5. Interests and hobbies.
6. Relationship preferences.
7. Photographs.

Use structured database fields where appropriate.

Implement editable settings.

Integrate Supabase Storage for image uploads.

Add validation and error handling.

The completed onboarding must produce a structured character profile
that can be consumed by the AI conversation service.

Do not implement AI conversations yet.

Test saving, loading, editing and deleting character information.
```

## Stage 4 — AI conversation and personality engine

Deliverables:

- AI provider abstraction.
- Secure server-side AI integration.
- Free-form chat.
- Personality-aware responses.
- Topic preferences.
- Conversation persistence.
- Conversation history.
- Error and usage handling.

Acceptance criteria:

- The user can discuss arbitrary topics.
- The character responds according to configured personality.
- The conversation survives page refreshes.
- API keys remain server-side.
- AI failures are handled correctly.
- The application can switch providers through its adapter interface.

### Prompt

```text
Implement Stage 4: AI boyfriend conversation.

This is a central feature of My Talking Man.

Build a provider-independent AI integration.

Create:
- AI provider interface
- Provider adapter
- Conversation service
- Personality prompt builder
- Chat API
- Conversation history service

The AI must receive the character's structured personality profile,
communication preferences, interests and topic preferences.

The character must be able to discuss arbitrary subjects,
not just predefined relationship topics.

The character should:
- Maintain a consistent personality.
- Express opinions according to his profile.
- Remember relevant context supplied to the conversation.
- Ask natural follow-up questions.
- Avoid repetitive generic answers.
- Respect topic preferences.

Store messages in Supabase.

Keep API keys on the server.

Limit conversation context and response length to control costs.

Do not hardcode the character's personality into individual UI components.

Test the same conversation with different personality configurations
and verify that responses differ meaningfully.

Document the provider configuration in README.md.
```

## Stage 5 — Persistent memory

Deliverables:

- Short-term conversation context.
- Long-term memory extraction.
- Memory retrieval.
- Relationship memories.
- Memory management interface.

Acceptance criteria:

- Relevant information can be remembered across sessions.
- Retrieved memories influence later conversations.
- The user can inspect, edit and delete memories.
- Memory extraction does not save every message indiscriminately.

### Prompt

```text
Implement Stage 5: persistent AI memory.

Build a memory system with three categories:
- Short-term context
- Long-term personal memories
- Relationship memories

Create memory extraction and retrieval services.

The system should identify useful information from conversations
and save it as structured memory records.

Retrieve relevant memories before generating a response.

Do not send the entire memory database to the AI on every request.

Implement a memory management interface where users can:
- View memories
- Edit memories
- Delete memories

Include safeguards against saving irrelevant or repetitive information.

Test memory creation, retrieval, editing, deletion and persistence
across separate sessions.
```

## Stage 6 — Realistic 3D character

Deliverables:

- Three.js / React Three Fiber integration.
- GLB/GLTF character loader.
- Camera and lighting.
- Idle animation.
- Talking animation.
- Basic emotional states.
- Animation controller.
- Character asset management.

Acceptance criteria:

- A real 3D model renders in the browser.
- The character can be animated.
- The interface remains usable while the model loads.
- Missing or invalid models produce a useful error state.
- The character system can accept replacement models.

### Prompt

```text
Implement Stage 6: browser-based realistic 3D character.

Use Three.js and React Three Fiber.

Load a licensed GLB/GLTF human character model.

Implement:
- Character rendering
- Lighting
- Camera controls
- Idle animation
- Talking animation
- Available emotional expressions
- Animation state management

Create a reusable CharacterViewer component.

Keep model loading and animation logic separate from the chat system.

The character should be able to receive states such as:
idle, talking, happy, sad, tired and surprised.

If the chosen model does not support a particular expression
or animation, report the limitation rather than pretending it works.

Optimize performance for ordinary desktop browsers.

Do not implement AI photo-to-3D generation in this stage.

Test loading, rendering, animation switching and error handling.
```

## Stage 7 — Virtual pet mechanics

Deliverables:

- Pet statistics.
- Feeding.
- Sleeping.
- Playing.
- Social interaction.
- Time-based state changes.
- Character reactions.
- Persistent state.

Acceptance criteria:

- Statistics persist after refresh.
- Actions produce predictable changes.
- Time-based changes are calculated reliably.
- The character's visible behaviour reflects his state.

### Prompt

```text
Implement Stage 7: virtual pet mechanics.

Build a dedicated pet-state service.

Implement:
- Hunger
- Energy
- Happiness
- Health
- Hygiene
- Social need

Use a consistent 0-100 scale.

Implement actions such as:
- Feed
- Sleep
- Play
- Talk
- Interact

Define all statistic changes in a centralized configuration.

Persist state in Supabase.

Calculate elapsed time using timestamps and server-side logic.

Connect pet state to the character's animation and mood system.

Test all actions, state boundaries, persistence and elapsed-time behaviour.
```

## Stage 8 — Currency, rewards, shop and inventory

Deliverables:

- Virtual wallet.
- Reward rules.
- Transactions.
- Shop.
- Inventory.
- Item purchases.
- Item usage.

Acceptance criteria:

- Currency is persistent.
- Purchases are validated server-side.
- Currency cannot be manipulated through browser tools.
- Purchased items appear in inventory.
- Failed purchases do not deduct currency.

### Prompt

```text
Implement Stage 8: virtual economy.

Create a secure currency and reward system.

Implement:
- Wallet
- Transaction history
- Reward rules
- Shop catalogue
- Inventory
- Purchase operations
- Item usage

Use database transactions for purchases and currency changes.

Never trust the browser to calculate or validate a purchase.

Create a few sample items for testing.

Ensure that all inventory and wallet changes persist.

Test insufficient balance, duplicate requests, successful purchases,
failed purchases and unauthorized access.
```

## Stage 9 — Room and character customization

Deliverables:

- Room customization.
- Furniture placement.
- Character clothing.
- Accessories.
- Saved room layouts.
- Inventory integration.

Acceptance criteria:

- Users can customize their environment.
- Owned items can be used.
- Room configuration persists.
- Items cannot be equipped without ownership.

### Prompt

```text
Implement Stage 9: room and character customization.

Connect the room system to inventory.

Allow users to:
- Select furniture.
- Place available objects.
- Change room decorations.
- Change character clothing.
- Equip accessories.
- Save their room configuration.

Store room layout as structured data.

Validate ownership before equipping or placing purchased items.

Ensure that the 3D scene updates when customization changes.

Test persistence and ownership validation.
```

## Stage 10 — Mini-games and achievements

Deliverables:

- At least one playable mini-game.
- Reward integration.
- Achievement system.
- Activity history.

Acceptance criteria:

- The game is playable.
- Rewards are validated server-side.
- Achievements persist.
- Users cannot directly manipulate their rewards.

### Prompt

```text
Implement Stage 10: mini-games and achievements.

Start with one simple mini-game.

Integrate it with the existing wallet and achievement services.

Create reusable interfaces so additional games can be added later.

Validate all rewards on the server.

Test game completion, reward calculation, achievement unlocking
and duplicate reward prevention.
```

## Stage 11 — Photo-to-3D generation

Deliverables:

- Research and compare image-to-3D / human-avatar providers.
- Select a suitable service based on realism, cost, output format and licensing.
- Integrate the chosen provider.
- Upload and process photographs.
- Store generated assets.
- Import the resulting model into the 3D viewer.

Acceptance criteria:

- The user explicitly consents to external image processing.
- The provider successfully generates a compatible asset.
- The application handles processing failures.
- The generated model can be loaded by the 3D renderer.
- The user can replace or delete the generated character.

### Prompt

```text
Implement Stage 11 only after the existing 3D character system works.

Research suitable services for generating realistic human 3D avatars
from multiple photographs.

Compare:
- Output quality
- Cost
- API availability
- Commercial licensing
- GLB/GLTF compatibility
- Rigging and animation support
- Privacy and image retention

Do not select a provider without explaining the trade-offs.

Propose the lowest-cost viable option.

After approval, implement the integration using a separate service module.

Never expose provider credentials in the browser.

Obtain explicit user consent before sending photographs externally.

Do not claim successful generation unless the provider actually
returns a usable asset.
```

## Stage 12 — Testing, optimization and deployment

Deliverables:

- Unit tests.
- Integration tests.
- Browser tests.
- Security review.
- Performance improvements.
- Production deployment instructions.

Acceptance criteria:

- Main user flows work.
- No critical console errors.
- Database security policies are tested.
- AI keys are protected.
- 3D assets load reliably.
- Application builds successfully.
- Deployment instructions are documented.

### Prompt

```text
Implement Stage 12: final testing and deployment preparation.

Review the complete application.

Test:
- Registration and login
- Onboarding
- Personality editing
- AI conversations
- Memory retrieval
- 3D character rendering
- Character animations
- Pet mechanics
- Currency
- Purchases
- Inventory
- Room customization
- Mini-games
- Data isolation

Use unit, integration and browser tests where appropriate.

Inspect the application for:
- Security vulnerabilities
- Broken navigation
- Missing error handling
- Data persistence issues
- Unprotected API keys
- Invalid database access
- Performance problems
- 3D rendering problems

Fix critical and high-priority defects.

Create a deployment guide.

Report honestly which features are complete, partially implemented
or still dependent on external services.

Do not label a feature complete merely because its UI exists.
```

---

# 6. Rules for working with Claude Code

Place these rules in `CLAUDE.md` and keep them active throughout development.

1. Read the project specification and `CLAUDE.md` before making changes.
2. Implement only the requested stage.
3. Do not rewrite unrelated working code.
4. Do not remove existing functionality without approval.
5. Do not invent API responses or pretend external services work.
6. Do not leave important buttons connected to empty handlers.
7. Do not use mock data in production features.
8. Keep business logic out of UI components.
9. Use TypeScript types and request validation.
10. Keep secrets in environment variables.
11. Add tests for important business logic.
12. Run relevant tests and builds after changes.
13. Fix errors before proceeding.
14. Explain database migrations and environment-variable changes.
15. Report incomplete functionality honestly.
16. Ask before introducing a paid external service.
17. Preserve the existing architecture unless a change is justified.
18. Do not silently replace the chosen technology stack.

## Required end-of-stage report

At the end of every stage, Claude Code must provide:

- What was implemented.
- Which files were created or modified.
- Which database changes were made.
- Which environment variables are required.
- Which tests were executed and their results.
- Which features are fully functional.
- Which features are incomplete.
- Any known bugs or technical risks.
- The exact command to run the application.

---

# 7. Budget and implementation priorities

With a small budget, prioritize a functional core before advanced visual features.

**Build first:**
- Website and authentication.
- Character onboarding.
- Personality configuration.
- AI conversation.
- Persistent memory.
- Basic 3D character viewer.

**Build next:**
- Pet mechanics.
- Currency and rewards.
- Inventory and shop.
- Room customization.
- Mini-games.

**Build last:**
- Custom realistic 3D generation from photographs.
- Advanced facial animation.
- Lip synchronization.
- Complex character movement.
- Expensive real-time voice features.

Do not spend money on a photo-to-3D provider before the rest of the product can load and display a compatible 3D model.

The Claude Code subscription is a development tool subscription; it does not automatically pay for AI conversations inside the deployed website. Runtime AI API usage, image generation, storage and hosting may have separate charges. Keep these services optional and configurable.

---

# 8. Definition of a successful MVP

The first release should be considered a working MVP only when a user can:

1. Create an account.
2. Create a boyfriend character.
3. Configure his personality and interests.
4. Open the website and see a 3D character.
5. Have unrestricted AI conversations with him.
6. Receive responses consistent with his personality.
7. Have important information remembered across sessions.
8. Feed, play with and interact with the character.
9. Save character and pet progress.
10. Return later and continue from the saved state.

The first MVP does not require automatic photo-to-3D generation, advanced facial animation, voice calls or multiple mini-games.

**Final development principle:** A smaller application with genuinely working AI, memory, persistence and 3D rendering is more valuable than a visually impressive prototype containing buttons that do nothing.
