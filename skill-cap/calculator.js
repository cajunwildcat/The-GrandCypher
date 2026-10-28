const DMGTYPES = Object.freeze({ NA: 0, SKILL: 1, CA: 2, COUNTER: 3, OLDSUMM: 4, SKILLSUMM: 5, FIXEDSUMM: 6 });
const ELEMS = Object.freeze({ Fire: 1, Water: 2, Earth: 3, Wind: 4, Light: 5, Dark: 6, Null: 0, Plain: 0, Destruction: 98 });
const ELEMSUP = Object.freeze({ 1: 4, 2: 1, 3: 2, 4: 3, 5: 6, 6: 5 });

function correctBaseATK(displATK, bulletPWR, shipBonus, shipReactor) {
    shipBonus = shipBonus / 100;
    const step1 = Math.ceil(displATK * bulletPWR / 1000);
    const step2 = Math.ceil(step1 * (1 + shipBonus));
    const step3 = Math.ceil(step2 * (100 + shipReactor) / 100);
    return step3 * 10;
}

function getMod(modList, mod, def = 0) {
    return modList[mod] ?? def;
}

function collapseBoosts(modList, dmgType) {
    modList = { ...modList };

    modList["ex might"] = modList.getMod(MODS.ex_might) + modList.getMod(MODS.ex_might_sp);
    modList["elem atk"] = modList.getMod(MODS.elem_atk) + modList.getMod(MODS.elem_atk_prog);

    let cap = 0;
    switch (dmgType) {
        case DMGTYPES.COUNTER:
        case DMGTYPES.NA: cap = modList.getMod(MODS.na_dmg_cap); break;
        case DMGTYPES.SKILL: cap = modList.getMod(MODS.skill_dmg_cap) + modList.getMod(MODS.skill_dmg_cap_sp); break;
        case DMGTYPES.CA: cap = modList.getMod(MODS.ca_dmg_cap); break;
    }
    modList[MODS.dmg_cap] = modList.getMod(MODS.dmg_cap) + modList.getMod(MODS.dmg_cap_sp) + cap;

    let amp = 0;
    switch (dmgType) {
        case DMGTYPES.COUNTER:
        case DMGTYPES.NA: amp = modList.getMod(MODS.na_dmg_amp) + modList.getMod(MODS.na_dmg_amp_sp); break;
        case DMGTYPES.SKILL: amp = modList.getMod(MODS.skill_dmg_amp) + modList.getMod(MODS.skill_dmg_amp_sp); break;
        case DMGTYPES.CA: amp = modList.getMod(MODS.ca_dmg_amp) + modList.getMod(MODS.ca_dmg_amp_sp); break;
    }
    modList[MODS.dmg_amp] = modList.getMod(MODS.elem_dmg_amp) + modList.getMod(MODS.dmg_amp) + modList.getMod(MODS.omega_dmg_amp) + modList.getMod(MODS.od_dmg_amp) + modList.getMod(MODS.null_amp) + amp;

    let supp = 0;
    switch (dmgType) {
        case DMGTYPES.COUNTER:
        case DMGTYPES.NA: supp = modList.getMod(MODS.na_dmg_supp) + modList.getMod(MODS.na_dmg_supp_sp); break;
        case DMGTYPES.SKILL: supp = modList.getMod(MODS.skill_dmg_supp) + modList.getMod(MODS.skill_dmg_supp_sp); break;
        case DMGTYPES.CA: supp = modList.getMod(MODS.ca_dmg_supp) + modList.getMod(MODS.ca_dmg_supp_sp); break;
    }
    modList[MODS.dmg_supp] = modList.getMod(MODS.dmg_supp) + supp;

    return modList;
}

function boostCap(capPreset, capBoost, capPen) {
    capPreset = structuredClone(capPreset);
    capPreset.thresholds = capPreset.thresholds.map(t => t + Math.ceil(t * capBoost));
    capPreset.attenuations = capPreset.attenuations.map(a => a * capPen);
    return capPreset;
}

function correctMod(m, neg = false) {
    if (neg) return (100 - m) / 100;
    return (m + 100) / 100;
}

function correctDEF(modList) {
    return modList.getMod(MODS.base_def) * (1 + (Math.max(-50, modList.getMod(MODS.def_up) - modList.getMod(MODS.def_down)) - modList.getMod(MODS.sp_def_down)) / 100) * (1 - (modList.getMod(MODS.def_ignore) / 100));
}

const mainModNames = [
    MODS.normal_might, MODS.normal_stamina, MODS.normal_enmity,
    MODS.omega_might, MODS.omega_stamina, MODS.omega_enmity,
    MODS.od_might, MODS.od_stamina, MODS.od_enmity, MODS.ex_might,
    MODS.perpetuity, MODS.jammed, MODS.strength, MODS.od_atk,
    MODS.break_atk, MODS.hype, MODS.sleep, MODS.stone, MODS.assassin,
    MODS.weapon_ca_dmg, MODS.passive_ca_dmg, MODS.na_dmg,
    MODS.stackable_atk_up, MODS.stackable_atk_up_sp, MODS.attack_down,
    MODS.global_field, MODS.local_field, MODS.primarch_summon,
    MODS.passive_enmity, MODS.sex_atk, MODS.debuff_atk, MODS.moon_prog,
    MODS.bounty_atk
];
function calcRaw(dmgType, modList, variance) {
    let correctedATK = correctBaseATK(modList.getMod(MODS.base_atk), 100, modList.getMod(MODS.crew_ship), modList.getMod(MODS.crew_reactor));

    let raw = mainModNames.map(mm => {
        if ((mm == MODS.weapon_ca_dmg || mm == MODS.passive_ca_dmg) && dmgType != DMGTYPES.CA) return 1;
        if ((mm == MODS.na_dmg) && dmgType != DMGTYPES.NA) return 1;
        return correctMod(modList.getMod(mm));
    }).reduce((acc, cur) => acc *= cur, 1);
    raw -= modList.getMod(MODS.stackable_atk_down);

    raw = Math.max(-0.5, raw);
    raw *= correctedATK;
    let dmgInstanceMod = modList.getMod(MODS.dmg_mod);
    if (dmgType == DMGTYPES.SKILL || dmgType == DMGTYPES.SKILLSUMM || dmgType == DMGTYPES.FIXEDSUMM) {
        dmgInstanceMod += modList.getMod(MODS.skill_dmg) - modList.getMod(MODS.bf_skill_dmg);
    }
    raw *= (dmgInstanceMod / 100);
    raw *= correctMod(modList.getMod(MODS.elem_atk));
    raw *= correctMod(modList.getMod(MODS.dmg_cut), true);
    raw *= correctMod(modList.getMod(MODS.bf_atk), true);
    if (dmgType == DMGTYPES.CA) {
        raw *= correctMod(modList.getMod(MODS.bf_ca_dmg), true);
    }
    raw *= variance;
    raw /= correctDEF(modList);
    if (dmgType == DMGTYPES.CA) {
        raw += modList.getMod(MODS.fixed_ca, 2000);
    }
    raw *= correctMod(modList.getMod(MODS.critical));
    return raw;
}

function applyCap(capPreset, incomingDMG) {
    capPreset = structuredClone(capPreset);
    capPreset.thresholds.splice(0, 0, 0);
    capPreset.attenuations.splice(0, 0, 1);
    let tl = capPreset.thresholds.length
    let tiers = new Array(tl);
    for (let i = 0; i < tl - 1; i++) {
        let ct = capPreset.thresholds[i];
        let nt = capPreset.thresholds[i + 1];
        let att = capPreset.attenuations[i];
        tiers[i] = Math.min(Math.max(incomingDMG - ct, 0), nt - ct) * att;
    }
    tiers[tl - 1] = Math.max((incomingDMG - capPreset.thresholds[tl - 1]), 0) * capPreset.attenuations[tl - 1];
    return tiers.reduce(sumArr, 0);
}

function calcDamage(dmgType, capPreset, modList, hardCap) {
    modList.getMod = (l, d) => getMod(modList, l, d);
    dmgInstanceMod = modList.getMod(MODS.dmg_mod);
    modList = collapseBoosts(modList, dmgType);
    capPreset = boostCap(capPreset, modList.getMod(MODS.dmg_cap) / 100, correctMod(modList.getMod(MODS.dmg_cap_pen)));
    if (dmgType == DMGTYPES.CA) hardCap = boostCap(hardCap, modList.getMod(MODS.sp_ca_dmg_cap), 1);

    rngs = makeSeqArray(101, (i) => (i - 50) / 1000 + 1);
    let raws = rngs.map(v => calcRaw(dmgType, modList, v));
    let dmgs = raws.map(r => applyCap(capPreset, r));

    const applyAmp = (dmgs) => dmgs.map(d => Math.ceil(d * correctMod(modList.getMod(MODS.dmg_amp))));
    const applySupp = (dmgs) => dmgs.map(d => d + modList.getMod(MODS.dmg_supp) + makeSeqArray(6, (i) => Math.ceil(modList.getMod(MODS[`wide_open_${i}`]) / 100 * d)).reduce(sumArr));
    const applyMit = (dmgs) => dmgs.map(d => d - modList.getMod(MODS.dmg_mit));
    const applyEleRes = (dmgs) => dmgs.map(d => Math.ceil(d * (1 - (modList.getMod(MODS.elem_res) / 100))));
    const applyHardCap = (dmgs) => dmgs.map(d => applyCap(hardCap, d));
    const applyMjolnirCap = (dmgs) => {
        if (dmgInstanceMod > 600) return dmgs;
        return dmgs.map(d => applyCap(DMGCAPS[`Mjolnir${Math.ceil(dmgInstanceMod / 100)}00`], d));
    }
    const applyEchoMod = (dmgs) => dmgs.map(d => d * ((modList.getMod(MODS.echo_mod) / 100) || 1));

    switch (dmgType) {
        case DMGTYPES.NA:
            dmgs = applyAmp(dmgs);
            dmgs = applyHardCap(dmgs);
            dmgs = applyEchoMod(dmgs);
            dmgs = applySupp(dmgs);
            break;
        case DMGTYPES.SKILL:
            dmgs = applySupp(dmgs);
            dmgs = applyAmp(dmgs);
            dmgs = applyMjolnirCap(dmgs);
            dmgs = applyHardCap(dmgs);
            break;
        case DMGTYPES.CA:
            dmgs = applySupp(dmgs);
            dmgs = applyAmp(dmgs);
            dmgs = applyHardCap(dmgs);
            dmgs = applyEchoMod(dmgs);
            break;
    }

    dmgs = applyMit(dmgs);
    dmgs = applyEleRes(dmgs);

    return dmgs;
}

function calcCap(dmgType, modList, hardCap, inputs) {
    let matches = [];
    let mlc = structuredClone(modList);
    mlc.getMod = (l, d) => getMod(mlc, l, d);
    mlc = collapseBoosts(mlc, dmgType);
    //filter out caps we never want to check
    let caps = Object.keys(DMGCAPS).filter(key => !(key.includes("Hard") || key.includes("Mjolnir") || key.includes("NA") || key == "Assassin"));
    let raw = calcRaw(dmgType, mlc, 1);
    //filter out caps that raw doesn't meet first threshold or the simple soft cap is less than 40% of 1.0 raw
    caps = caps.filter(c => {
        let boostedCap = boostCap(DMGCAPS[c], mlc.getMod(MODS.dmg_cap) / 100, correctMod(mlc.getMod(MODS.dmg_cap_pen)));
        if (boostedCap.thresholds[0] > raw) return false;
        //if (simpleSoftCap(boostedCap) / raw < 0.4) return false;
        return true;
    }).map(c => DMGCAPS[c]);

    inputs = [...new Set(inputs)];
    caps.forEach(cap => {
        let dmgs = calcDamage(dmgType, cap, modList, hardCap);
        let match = 0;
        inputs.forEach(d => {
            if (dmgs.includes(d)) match++;
        });
        if (match > 0) matches.push({ id: cap.id, match, dmgs });
    });
    return [matches.filter(p => p.match > 0).sort((a, b) => b.match - a.match), caps.length];
}

function simpleSoftCap(cap) {
    let tiers = cap.thresholds;
    let mods = cap.attenuations;
    return Math.round(tiers[0] + ((tiers[1] - tiers[0]) * mods[0]) + ((tiers[2] - tiers[1]) * mods[1]) + ((tiers[3] - tiers[2]) * mods[2]));
}