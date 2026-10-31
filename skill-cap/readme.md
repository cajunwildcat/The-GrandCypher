Use the tool: https://cajunwildcat.github.io/The-GrandCypher/skill-cap/
## Modes
 - "Verify" works like the old damage calc sheet. It just runs the formula on the numbers you provide and if you provide observed inputs it will highlight matching ones
 - "Find" will use all of the inputs except for DMG Cap (which should be disabled on the UI) to find the DMG Cap of coresponding to the values provided to the observed inputs.
 - "New Cap" will allow you to enter custom values for the damage cap infos at the top of the rng results table

## Inputs
 - You can use the arrow keys to move between "cells" in the mods table on the left. Pressing "Enter" while focused on an input will lock the arrow keys, allowing you to use left/right to move the typing indicator. Pressing "Enter" again will unlock the input and resume normal nav controls. Unfocusing the input by clicking somewhere/something else (did you know this is tied to the `blur` event? not something like `focuslost`) will also unlock the nav controls.
 - The big empty text box next the rng table is the Observed Inputs... input. Its where the numbers you see in-game go to make them highlight on the rng table. Numbers both with and without commas are fine.
 - Leave "Echo Mod" as 0 if you want non-echo numbers. Any other value will apply it in the formula.
 - Many Mod categories are superfolous and included just for organizational purposes. You could put all of your supp values in "DMG Supp" and it'd be the same as correctly matching them to the applicable grid/buff categories. By extension, Main Raw Damage Mod labels effectively mean nothing- you could use "Od Enimty" instead of Jammed if you have no od enmity sources and nothing would change.
 - MC Classes selected from the appropriate drop down automatically apply the stats gained from the following passives:
    - Soldier's `Seasoned Survivalist` (N.A. DMG Cap)
    - Rising Force's `New Wave` (Perp ATK)
    - Viking's `Dual-Axe Legend` (N.A. Supp)
    - Manadiver's `Manadiver's Sapience` (Skill DMG & Skill DMG Cap)
    - Warlock's `Arcane Master` (Skill DMG) and `Metaphysics` (Skill DMG Cap)
    - Hermit's, Sorcerer's, and Wizard's `Sprite's Aura` (Skill DMG)
    - Luchador's `False Finish` (Normal Might)
    - Ogre's, Kung Fu Artist's, and Grappler's `Tigerstrike Solace` (Normal Might)

## Sub Tables
These are meant to provide a limited way to verify against 2 rng tables at once without having the visual clutter of multiple tables.
 - "Echo" is for same element echos
 - "RNG Crit" is for crit buffs that aren't 100% or when grid crit isn't 100%
 - "DEF Down" is for when a DEF Down debuff is applied between a set of observed inputs (auto nuke after NA and getting DS worth of NA numbers)
 - "% Cap" displays the raw damage as a percentage of Damage Cap. Having enough raw to reach a threhold is "worth" 100%, so fully capping (reaching the 1% attenuation) is 400%
 - "Custom" captures the state of the formula inputs upon switching to it, then preserves it as the main number while any changes you make to the inputs will be reflected in the sub table numbers

## Persistence
Wonders and crew ship/reactor values are saved to local browser storage so you do not need to re-enter them every page visit.

## Caveats (Things I'm aware of to reach parity with old sheet)
 - Bullet PWR isn't implemented.
 - Fixed CA is fixed to 2000 currently.
 - Plain damage and Null enemy daamge numbers probably don't work right.