# REYAD Portfolio — Implementation Brief

## Owner decisions (2026-11-16)

This brief records the owner's latest explicit decisions. It supplements `ANTIGRAVITY_HANDOFF.md`; where script-library presentation differs, this brief is the current product direction.

### 1. Scripts library: full scripts only

- The public portfolio must present **complete scripts only**.
- Do not publish treatments, treatment beats, beat sheets, outlines, scene summaries, concepts, or partial drafts as scripts.
- Remove the public distinction between "Treatment" and "Full script". The public section is a library of complete scripts.
- Do not expose placeholder titles, working labels, or pending entries in the public interface.
- A script is publishable only when both its verified original title and its complete original body are present.
- Preserve every Arabic title, line, dialogue, direction, and punctuation exactly as supplied by the owner.
- Never invent, reconstruct, translate, paraphrase, summarize, or fill missing script text.
- If the complete source text is unavailable, keep the item out of the public library. Do not show a "coming soon" card unless the owner explicitly asks for one.
- Treatment/Beat data may be retained privately only if required for historical integrity, but it must not appear as public script content and must not be converted into a screenplay.

### 2. Known content boundaries

- Existing OPAL treatment records are not full scripts. They must not be presented publicly as scripts.
- The three football titles are not sufficient to publish; the full original Arabic text is required.
- Do not infer that a finished reel's story is identical to a treatment or script.
- Use only source text already present in verified project files or explicitly supplied by the owner. If source text is missing, leave it unpublished.

### 3. Technical and publishing safety

- Work only on `reyad/implementation` or another explicitly approved non-production branch.
- Never commit, merge, push, or sync changes to `main` without the owner's explicit approval.
- Do not deploy or publish without explicit approval.
- Do not overwrite or discard the owner's existing local Antigravity changes. Inspect and preserve them first.
- Keep the repository private; do not create a second repository or change hosting.
- Do not introduce new lockfiles or change package managers without a clear technical reason.

### 4. Required QA

- Confirm the Scripts navigation and route behave correctly when there are zero publishable scripts.
- No treatment labels, beat sheets, placeholder entries, or incomplete content should be reachable from public routes, metadata, sitemap, or internal navigation.
- Preserve responsive behavior, keyboard access, visible focus, reduced-motion support, and semantic headings.
- Run the existing tests and production build; report exact outcomes and any remaining failures.
- Keep all existing verified portfolio facts and metrics unchanged unless the owner supplies corrections.
