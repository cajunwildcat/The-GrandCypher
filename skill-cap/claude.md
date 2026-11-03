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

## Status effect mapping

When mapping `character_status_effects.json` into `STATUSES` in `statuses.js`, each character is the `source`, each ability entry is a unique status whose ability name is the display key, and its effects array determines the `mods`. Add only entries with at least one numeric effect represented by `MODS`; leave new `img` values empty until their IDs are researched. Exclude an effect line that starts with bolded text (`'''...'''`) or other conditional wording. If an effect description omits its numeric value, look it up before adding it.

| Effect wording or template | `MODS` key | Value |
|---|---|---|
| `{{atkmod\|ATK\|m=p}}` or legacy `tt` with Perpetuity modifier | `perpetuity` | Listed percentage |
| `{{atkmod\|ATK\|m=n}}` or legacy `tt` with Normal modifier | `normal might` | Listed percentage |
| `{{atkmod\|ATK\|m=ass}}` | `assassin` | Listed percentage |
| Stackable ATK Up | `stackable atk up` | Listed percentage |
| Elemental ATK Up (for example, Fire/Wind ATK Up) | `elem atk` | Listed percentage |
| Strength / Stamina | `strength` | Highest listed percentage; retain the full range in a comment for reassessment |
| Jammed or enmity-style ATK Up based on low HP | `jammed` for the confirmed effects below | Highest listed percentage; retain the full range in a comment for reassessment |
| C.A. DMG Up | `passive ca dmg` | Listed percentage; do not use `weapon ca dmg` |
| Critical templates (`{{crit\|text\|chance\|modifier}}`) | `buff critical` | Third parameter only; ignore the displayed text and chance |
| Supplemental DMG | `dmg supp` | Damage cap value, not the percentage |
| Supplemental Normal Attack DMG | `na dmg supp` | Damage cap value |
| Supplemental Skill DMG | `skill dmg supp` | Damage cap value |
| Supplemental C.A. DMG | `ca dmg supp` | Damage cap value |
| DMG Cap Up, or a type-specific cap (Normal Attack, Skill, C.A., Special C.A., Chain Burst, or Fated Chain) | `dmg cap`, `na dmg cap`, `skill dmg cap`, `ca dmg cap`, `sp ca dmg cap`, `cb dmg cap`, or `fc dmg cap` respectively | Listed percentage |
| Skill DMG Up / Chain Burst DMG Up | `skill dmg` / `cb dmg` | Listed percentage |
| DMG Amplified, or type-specific amplification (Normal Attack, Skill, C.A., Chain Burst, or Fated Chain) | `dmg amp`, `na dmg amp`, `skill dmg amp`, `ca dmg amp`, `cb dmg amp`, or `fc dmg amp` respectively | Listed percentage; use the `(sp)` key when the effect is explicitly special |
| DEF Down / explicitly Special DEF Down; ATK Down / stackable ATK Down | `def down` / `sp def down`; `attack down` / `stackable atk down` respectively | Listed percentage |
| Bonus damage / Echo | No mapping | Do not map bonus damage effects to `echo mod` |
| `{{atkmod\|Amplify\|m=s}}` counterattack damage | `counter dmg amp` | Listed percentage |
| Counterattack damage amplification | `counter dmg amp` | Listed percentage; the key is declared but not yet supported by the calculator or mod-row UI |

Confirmed per-effect mappings and review notes:

- `Luffy / Haki` (30% ATK Up) and `Ichigo Kurosaki / Zangetsu` (ATK Up) use `perpetuity`; verify these modifier classifications.
- `Mahira (Event) / Zeal of the Feather (SR)` (ATK Up) uses `normal might`; verify this classification.
- `Ichigo Kurosaki / Zangetsu` and `Mahira (Event) / Zeal of the Feather (SR)` are commented out in `statuses.js` until their missing effect values and all mappings can be verified.
- The user supplied `perpeuity` for the perpetuity mappings; it is interpreted as `perpetuity` and should be verified.
- `Aglovale (Yukata) / Aura der Heiterkeit` (60%-20% Strength) uses `strength` at 60%; retain a `60%-20%` comment for reassessment.
- `Percival (Grand) / King's Blaze` (60%-20% ATK Up) uses `strength` at 60%; verify the classification and reassess the range.
- `Ragazzo / Trascendenza` (40%-120% ATK Up based on low HP) uses `jammed` at 120%; verify the classification and retain a `40%-120%` comment for reassessment.
- `Siegfried / Manigance` (40%-120% Jammed) uses `jammed` at 120%; retain a `40%-120%` comment for reassessment.
- Unique-ATK entries were individually mapped per user direction: `Vira (Wind) / Plan B`, `Lady Grey (Halloween) / Evenfall`, `Halluel and Malluel (Summer) / Limiter Break`, `Black Knight and Orchis / Instant Charge`, and `Nina Drango / Blush Lvl 4` use `perpetuity` (verify each classification). `Lady Grey (Halloween) / Evenfall` uses 15% per stack, not its 45% maximum. `Black Knight / Guardianship` uses `jammed` at 45%; retain a `15%-45%` comment for reassessment. `Nier / World of Death and Love` uses `local field` at 20%.
- `Sen (Valentine) / Stunning Love Strike` uses `counter dmg amp` at 150%. `Vane (Halloween) / Ritterseele` uses `cb dmg`, `na dmg amp`, and `counter dmg amp` at 30%.
- `ATK Up to all foes` effects are excluded because they modify foe ATK rather than the damage calculated for the player.
- Ignore DEF Down effects: these describe a status affecting the source character, while `def down` represents the enemy's DEF in the calculator. Do not map bonus-damage effects to `echo mod`.
- If one ability has the same MODS key at multiple values, create a second status entry for the higher-value version and append `+` to that status name (for example, `Reversed Ouroboros+`). For duplicate ability names across character pages, append the source character's parenthetical qualifier (for example, `Ardent Blade (Yukata)`).
- Ignore effects whose description starts with bolded text (`'''...'''`), as these are generally conditional effects; also ignore other lines that begin with a conditional trigger (for example, upon an enemy special or after normal attacks).

## Validation

For behavior changes, serve this directory as static files (for example, `python -m http.server`) and test in a browser. Check both Verify and Find modes, observed-value highlighting, affected damage types, and any relevant sub-table or saved-team behavior. The page loads jQuery and Chosen from CDNs, so those features require network access. For formula changes, compare representative inputs against known results and account for the limitations listed in [readme.md](./readme.md).
