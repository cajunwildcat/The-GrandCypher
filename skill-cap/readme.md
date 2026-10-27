Use the tool: https://cajunwildcat.github.io/The-GrandCypher/skill-cap/
## Modes
 - "Verify" works like the old damage calc sheet. It just runs the formula on the numbers you provide and if you provide observed inputs it will highlight matching ones
 - "Find" will use all of the inputs except for DMG Cap (which should be disabled on the UI) to find the DMG Cap of coresponding to the values provided to the observed inputs.

## Inputs
 - You can use the arrow keys to move between "cells" in the mods table on the left. Pressing "Enter" while focused on an input will lock the arrow keys, allowing you to use left/right to move the typing indicator. Pressing "Enter" again will unlock the input and resume normal nav controls. Unfocusing the input (did you know this is tied to the `blur` event? not something like `focuslost`) will also unlock the nav controls.
 - The big empty text box next the rng table is the Observed Inputs... input. Its where the numbers you see in-game go to make them highlight on the rng table. Numbers both with and without commas are fine.
 - Leave "Echo Mod" as 0 if you want non-echo numbers. Any other value will apply it in the formula.
 - Many Mod categories are superfolous and included just for organizational purposes. You could put all of your supp values in "DMG Supp" and it'd be the same as correctly matching them to the applicable grid/buff categories. By extension, Main Raw Damage Mod labels effectively mean nothing- you could use "Od Enimty" instead of Jammed if you have no od enmity sources and nothing would change.

## Sub Tables
These are meant to provide a limited way to verify against 2 rng tables at once without having the visual clutter of multiple tables.
 - "Echo" is for same element echos
 - "RNG Crit" is for crit buffs that aren't 100% or when grid crit isn't 100%
 - "DEF Down" is for when a DEF Down debuff is applied between a set of observed inputs (auto nuke after NA and getting DS worth of NA numbers)
 - "Custom" captures the state of the formula inputs upon switching to it, then preserves it as the main number while any changes you make to the inputs will be reflected in the sub table numbers

## Persistence
Wonders and crew ship/reactor values are saved to local browser storage so you do not need to re-enter them every page visit.

## Caveats (Things I'm aware of to reach parity with old sheet)
 - Bullet PWR isn't implemented.
 - There is no category for sp na supp (sorry faa0 bullet).
 - Fixed CA is fixed to 2000 currently.
 - Plain damage and Null enemy daamge numbers probably don't work right.
 - The default grid values are currently taken from the Fire grid on https://gbf.wiki/User:Cajunwildcat/Testing#Standardized_Testing_Grids. Planned to allow some sort of local saving of presets.
 - Earring/Ring/EMP Stamina/Enmity will eventually have unique input functionality; assuming max HP the following values can be used:
    - Each Enmity source: 1% jammed
    - Stamina EMP:
    - 1★: 3% Strength
    - 3★: 4% Strength
    - 2★: 6% Strength
    - Stamina Ring/Earring: (lvl + 2)%
    - Supplemental Earring: (lvl * 2,000)