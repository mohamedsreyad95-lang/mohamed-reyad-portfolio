<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Portfolio content (projects, metrics, scripts, profile) lives only in `src/data/*.ts`; pages render from it so facts stay in one verifiable place.
- Project covers are typographic (`ProjectCover`), never generated stills, until real frames are supplied, so no fake thumbnails appear.
- Optional links (LinkedIn, CV) are `null` in `src/data/profile.ts` and the UI hides them when null, so nothing is fabricated.
- `src/test/content.test.ts` guards the verified-fact rules; update it when facts change.
- Scripts carry `group` (brand/sports), `kind` (treatment/full-script) and `status`; full scripts render from `body` in the RTL Arabic reader and only open when `body` exists, so missing text shows as pending instead of filler.
- Arabic and mixed titles render through `ScriptTitle`, which splits on " | " so Arabic and Latin parts never wrap into each other.
- The portrait renders only through `Threshold` (doorway frame) from `profile.portrait`; crop is set by its `focus` fields, so swapping in the real photo is a data change, not a layout change.
