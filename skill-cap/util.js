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
