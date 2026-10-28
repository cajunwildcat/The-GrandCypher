# Skill Cap Verifier

Project-specific guidance for AI agents working in this directory.

## Project overview

A static, client-side JavaScript tool for calculating and verifying Granblue Fantasy damage. Its **Verify** mode calculates the damage range for a selected cap; **Find** mode compares observed values against possible caps. The user guide and known calculation limitations are in [readme.md](./readme.md).

## Structure

- `index.html` defines the UI and loads the classic scripts in dependency order: `default-saved-teams.js`, `util.js`, `caps.js`, `mods.js`, `calculator.js`, and `ui.js`. jQuery, Chosen, and `chosen-alias-search.js` support searchable dropdowns.
- `calculator.js` contains damage calculation and cap-finding logic. `caps.js` holds cap presets and hard-cap data; `mods.js` defines mod names used throughout the app.
- `ui.js` builds the mod table, translates form inputs into a mod list, manages saved teams and sub-tables, and renders/highlights results.
- `util.js` contains small shared helpers. `style.css` styles the page.
- `default-saved-teams.js` supplies initial saved-team data. `emp-bookmarklet.js` and `emp-bookmarklet` are separate bookmarklet snippets; changes to them should remain compatible with their use in the game client.
- `assets/` contains UI imagery and mod-label images. `chosen-alias-search.js` adds invisible `data-search` aliases to Chosen options; see [agent-implentation-docs.md](./agent-implentation-docs.md).

## Important conventions

- This app uses classic scripts and shared globals, not modules or a build system. Preserve script load order and existing global names unless intentionally migrating the architecture.
- Do not edit `calculator.js`. Suggestions for changes to its function declarations or structure are welcome when they would let its existing capabilities be used in new ways; present those as proposals rather than making the changes directly.
- Damage calculations are order-sensitive. When changing the formula, preserve the stages in `calcDamage` (raw damage, cap, damage-type-specific amp/supplemental/echo handling, hard cap, mitigation, and elemental resistance) and check the relevant paths for normal attacks, skills, and charge attacks.
- Mod identifiers are shared across `MODS`, UI row IDs, saved-team data, and image filenames (`assets/mod labels/<mod-id>.png`). Keep these identifiers consistent when adding or renaming a mod. `makeModList()` also applies element, wonder, and other UI-derived modifiers.
- Keep the controls in `index.html`, their selectors/handlers in `ui.js`, and any related styles in `style.css` in sync. Mod rows are created dynamically; test row addition/removal and saved-team loading when changing that behavior.
- Persistent browser settings use `localStorage`; saved teams are JSON under `saved-teams`, and wonder/crew inputs are stored by their input IDs without the `-input` suffix. Avoid changing keys or serialized shapes without accounting for existing browser data.
- This repository has no package manifest, build, or automated test suite. Do not invent a build step or add dependencies for routine changes.

## Validation

For behavior changes, serve this directory as static files (for example, `python -m http.server`) and test in a browser. Check both Verify and Find modes, observed-value highlighting, affected damage types, and any relevant sub-table or saved-team behavior. The page loads jQuery and Chosen from CDNs, so those features require network access. For formula changes, compare representative inputs against known results and account for the limitations listed in [readme.md](./readme.md).
