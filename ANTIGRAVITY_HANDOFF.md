# Antigravity Handoff — Mohamed Reyad Portfolio

> Read this file and the root `AGENTS.md` before making changes. This document is a project handoff and operating brief, not permission to redesign or deploy immediately.

## 1. Repository and handoff baseline

- GitHub repository: `mohamedsreyad95-lang/mohamed-reyad-portfolio`
- Repository URL: https://github.com/mohamedsreyad95-lang/mohamed-reyad-portfolio
- Lovable project: https://lovable.dev/projects/149007a0-67c7-4ebe-a92c-c0426f48c478
- Lovable preview: https://id-preview--149007a0-67c7-4ebe-a92c-c0426f48c478.lovable.app
- Connected production branch: `main`
- Handoff branch: `antigravity/handoff`
- Baseline commit: `a0df6b36a67b30e3eadb905edf00fe8e73153a92`
- Baseline verified against Lovable's current `latest_commit_sha` on 2026-11-16. The GitHub `main` HEAD and Lovable HEAD matched exactly at handoff time.
- The repository is private. Keep it private.

**Important:** Lovable ↔ GitHub sync is already active. The README confirms that Lovable changes commit to this repository and pushes to `main` sync back into Lovable. Do not create a second repository or reconnect a different one.

## 2. What this project is

A personal creative portfolio for Mohamed Reyad, positioned as a **Reels Creator & Scriptwriter**. It should communicate the ability to turn familiar, relatable situations into entertaining short-form stories, with the product or message integrated naturally.

Core copy already in the project:
- Headline: “Good ideas deserve better stories.”
- Positioning: “I look for the story before I think about the shot.”
- Closing line: “Have a brief? Let’s tell its story.”

The site is a portfolio, not an agency website and not a generic marketing template.

## 3. Current stack and commands

- React 19 + TypeScript
- TanStack Start / TanStack Router (file-based routes)
- Vite 8
- Tailwind CSS 4
- shadcn/ui + Radix primitives
- Vitest + Testing Library
- Bun lockfile is present (`bun.lock`) and `bunfig.toml` defines install safeguards.

Use Bun first to respect the committed lockfile:

```bash
bun install
bun run dev
bun run lint
bun run test
bun run build
```

Available scripts are defined in `package.json`: `dev`, `build`, `build:dev`, `preview`, `lint`, `format`, `test`, and `test:watch`.

Do not introduce a second lockfile or switch package managers without a clear technical reason and an explicit note in the handoff.

## 4. Architecture map

- `src/routes/`: pages and route loaders
  - `index.tsx`: homepage
  - `work.tsx`: visual work and project previews
  - `about.tsx`: about and experience
  - `contact.tsx`: email / WhatsApp contact
  - `scripts.index.tsx` and `scripts.$slug.tsx`: script library and reader
  - `__root.tsx`: app shell, header/footer, global metadata and error handling
- `src/components/site/`: portfolio-specific components (project cards, covers, modal, work rail, script showcase, header/footer, etc.)
- `src/components/ui/`: shared UI primitives
- `src/data/profile.ts`: profile, contact details and experience timeline
- `src/data/projects.ts`: project catalogue, work areas, categories and verified metrics
- `src/data/scripts.ts`: script/treatment catalogue and original text blocks
- `src/styles.css`: design tokens, typography, surfaces, animation and global styling
- `src/test/`: content integrity and routing tests
- `roadmap.md`: open content dependencies and project backlog
- `AGENTS.md`: mandatory project rules; read it before editing.

The route tree is generated. Do not hand-edit `src/routeTree.gen.ts` unless the framework explicitly requires it; prefer route files and the configured generator.

## 5. Content integrity — non-negotiable

Portfolio facts live in `src/data/*.ts`. Keep content data-driven and update tests whenever verified facts change.

- Never invent views, plays, likes, comments, clients, responsibilities, dates, scripts, credits, URLs or assets.
- OPAL Shower Gel Rebranding: `15,389 likes` and `333 comments` belong to that Instagram post. The `2M+` figure is a separate campaign-level combined-view result across Facebook, TikTok and Instagram. Never label the post likes/comments as views.
- Wedding Show posts are collaborative. Do not individually claim camera/edit/director credits that have not been verified.
- The three OPAL entries in the script data are treatments, not full scripts. Do not turn summaries into screenplay dialogue.
- Football entries must remain unpublished until their original text is supplied.
- A script is readable only when its original title and complete supplied body exist. Preserve Arabic source text exactly; do not translate, paraphrase or fill gaps.
- Typographic project covers are intentional until real approved stills/frames are available. Do not generate fake thumbnails or use generic stock images.
- LinkedIn URL, CV URL and portrait are currently `null` by design. Do not fabricate them or add stand-ins.

## 6. Design and product direction

Target: **cinematic, contemporary, editorial, polished and memorable**. It should feel professionally art-directed, not like a generic AI landing page or a dated 2018 template.

- Balance a personal, sketch-like/playful character with a high-end professional finish.
- Strong typography, deliberate composition, refined transitions and meaningful motion; avoid effects for their own sake.
- Mobile is a first-class experience, not a compressed desktop layout.
- Current implementation uses warm charcoal and restrained coral. The owner has also asked for a lighter, less gloomy overall feel. Review the actual preview and tokens before changing the palette; do not blindly make everything black or replace the visual identity.
- Keep copy human and concise. Avoid generic AI marketing language and excessive punctuation.
- Keep the wordmark/name as **MOHAMED REYAD / REYAD**.
- Do not add “available to move to Cairo”.
- Do not include OPAL sales/revenue figures. Verified content-performance metrics are distinct from sales figures.
- Keep the email and WhatsApp contact actions clear and easy to use.
- Preserve accessibility: semantic HTML, keyboard access, visible focus, contrast, reduced-motion support and sensible heading order.

## 7. Current known state and open dependencies

The current code includes a homepage, visual-work page, about page and contact page. Script routes/components exist, but navigation and visible script groups are intentionally data-dependent and may remain hidden when no complete scripts are publishable.

The roadmap records these content dependencies:
1. Approved portrait photo (the layout already has a real-photo slot).
2. Original full Arabic text for the four brand scripts from the older portfolio source.
3. Original full text for the three football scripts.
4. The complete Home Bundle / Peace of Mind treatment, if it is to be published as a treatment.
5. Verified original Arabic titles for the nine reels.
6. Representative reel examples for restaurants/cafés, creators and non-wedding event coverage.
7. The actual CV file and verified LinkedIn URL.

Do not block technical QA on missing content. Keep honest empty/hidden states until the owner supplies source material.

## 8. Safe working protocol

1. Start by reading `AGENTS.md`, this handoff and `roadmap.md`.
2. Confirm the checked-out branch and current `main` HEAD before work. The baseline above is a snapshot, not a guarantee that `main` has not advanced.
3. Work on a dedicated feature branch. Do not push experimental changes directly to `main`.
4. First pass must be an audit only: install dependencies, run lint, tests and production build, inspect the current preview on mobile and desktop, and report findings before broad redesign.
5. Separate verified bugs from subjective design opportunities. Prioritise broken routes, layout overflow, inaccessible controls and content errors before polish.
6. Make small, reviewable changes. Keep the project buildable after each meaningful step.
7. Run `bun run lint`, `bun run test` and `bun run build` after changes. Report exact failures; do not claim success without running them.
8. Do not deploy or publish. Do not change hosting, DNS, secrets, authentication, backend services or billing without explicit approval.

### Git/Lovable safety

- Never force-push.
- Never rewrite published history (no rebase/amend/squash of commits already pushed).
- Do not delete or casually replace `.lovable/`, `AGENTS.md`, generated files or Lovable-managed configuration.
- `vite.config.ts` is intentionally configured through `@lovable.dev/vite-tanstack-config`; inspect its comments before touching it.
- Do not commit secrets, API keys, private credentials or local environment files.
- Keep `main` as the Lovable-connected branch. Merge reviewed work into `main` only after approval.

## 9. First Antigravity task

**Do not redesign yet.** Perform a baseline technical + visual audit and return a concise report containing:

- install / lint / test / build results;
- route and refresh checks for `/`, `/work`, `/about`, `/contact`, and script routes where applicable;
- desktop and mobile layout issues, especially at 360–390px widths;
- accessibility and reduced-motion findings;
- content/data integrity issues, if any;
- a prioritised plan (P0 bugs, P1 usability/responsive, P2 visual polish).

After the audit, propose the smallest high-impact improvements that respect the direction above. Wait for owner approval before a broad visual redesign, content invention, or production deployment.

---

Handoff prepared from the live Lovable project and its connected GitHub repository on 2026-11-16. Re-check the live branch before acting because the owner may continue editing in Lovable.
