function getLocalStor(key, def = null) {
    let value = localStorage.getItem(key);
    if (!value && def) {
        localStorage.setItem(key, JSON.stringify(def));
        return def;
    }
    return JSON.parse(value);
}

function setLocalStor(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function sumArr(acc, cur) {
    return acc + cur;
}

function makeSeqArray(n, cb = (i) => i) {
    return new Array(n).fill(0).map((_, i) => cb(i));
}

let FMR = new Intl.NumberFormat("en-US");
function formatNum(num) {
    return isNaN(num)? num : FMR.format(num);
}

function sortSet(set, condition = (a, b) => a - b) {
    return new Set(Array.from(set).sort(condition));
}

function findDuplicateDamageValues(minDmgMod, maxDmgMod) {
    if (!Number.isInteger(minDmgMod) || !Number.isInteger(maxDmgMod) || minDmgMod > maxDmgMod) {
        throw new Error("Damage mod bounds must be integers with min less than or equal to max.");
    }

    let selectedCap;
    if (MODE == "verify") {
        let selectedCapOption = document.querySelector("#dmg-cap-select").selectedOptions[0];
        if (!selectedCapOption) throw new Error("Select a damage cap before checking damage values.");
        selectedCap = DMGCAPS[selectedCapOption.dataset.cap];
    }
    else if (MODE == "new") {
        selectedCap = { id: "", ...getCustomCapInfo() };
    }
    else {
        throw new Error("Select Verify or New Cap mode before checking damage values.");
    }

    let dmgType = getInputVal("dmg-type-select");
    let hardCap = DMGCAPS[getInputVal("hard-cap-select")];
    let baseModList = makeModList();
    let damageModsByValue = new Map();

    for (let dmgMod = minDmgMod; dmgMod <= maxDmgMod; dmgMod++) {
        let modList = { ...baseModList, [MODS.dmg_mod]: dmgMod };
        let damages = new Set(calcDamage(dmgType, selectedCap, modList, hardCap));
        damages.forEach(damage => {
            if (!damageModsByValue.has(damage)) damageModsByValue.set(damage, []);
            damageModsByValue.get(damage).push(dmgMod);
        });
    }

    let duplicateDamageValues = Array.from(damageModsByValue, ([damage, damageMods]) => ({
        damage,
        modCount: damageMods.length,
        damageMods,
    })).filter(result => result.modCount > 1).sort((a, b) => a.damage - b.damage);
    let totalDuplicateOccurrences = duplicateDamageValues.reduce((total, result) => total + result.modCount - 1, 0);

    console.log(`${duplicateDamageValues.length} damage values occur for more than one damage mod (${totalDuplicateOccurrences} additional occurrences).`);
    console.table(duplicateDamageValues);
    return { duplicateDamageValues, duplicateValueCount: duplicateDamageValues.length, totalDuplicateOccurrences };
}

function getCustomCapInfo() {
    let cap = {
        thresholds: [...document.querySelectorAll(".custom-cap-info.threshold")]
            .map(input => Number.parseFloat(input.value.replaceAll(",", ""))),
        attenuations: [...document.querySelectorAll(".custom-cap-info.attenuation")]
            .map(input => Number.parseFloat(input.value.replaceAll(",", "")) / 100),
    };

    if (cap.thresholds.length != 4 || cap.attenuations.length != 4 ||
        [...cap.thresholds, ...cap.attenuations].some(value => !Number.isFinite(value))) {
        throw new Error("Enter four valid thresholds and four valid attenuations before printing a cap.");
    }

    return cap;
}

function printCustomCap(id = "NEW_CAP_ID") {
    let cap = getCustomCapInfo();
    let capId = JSON.stringify(String(id));
    console.log(`\t//${formatNum(simpleSoftCap(cap))}\n\t${capId}: {\n\t\t"id": ${capId},\n\t\t"thresholds": [${cap.thresholds.join(", ")}],\n\t\t"attenuations": [${cap.attenuations.join(", ")}]\n\t},`);
}

function printCustomCapLua(id = "NEW_CAP_ID") {
    let cap = getCustomCapInfo();
    let luaId = String(id).replaceAll("\\", "\\\\").replaceAll("'", "\\'");
    console.log(`--${formatNum(simpleSoftCap(cap))}\n    ['${luaId}'] = {\n        id = '${luaId}',\n        thresholds = {${cap.thresholds.join(", ")}},\n        attenuations = {${cap.attenuations.join(", ")}}\n    },`);
}
