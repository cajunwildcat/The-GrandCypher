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

function printCustomCap() {
    let thresholds = [...document.querySelectorAll(".custom-cap-info.threshold")]
        .map(input => Number.parseFloat(input.value.replaceAll(",", "")));
    let attenuations = [...document.querySelectorAll(".custom-cap-info.attenuation")]
        .map(input => Number.parseFloat(input.value.replaceAll(",", "")) / 100);

    if (thresholds.length != 4 || attenuations.length != 4 ||
        [...thresholds, ...attenuations].some(value => !Number.isFinite(value))) {
        throw new Error("Enter four valid thresholds and four valid attenuations before printing a cap.");
    }

    let simpleSoftCap = Math.round(
        thresholds[0] +
        (thresholds[1] - thresholds[0]) * attenuations[0] +
        (thresholds[2] - thresholds[1]) * attenuations[1] +
        (thresholds[3] - thresholds[2]) * attenuations[2]
    );
    console.log(`\t//${formatNum(simpleSoftCap)}\n\t"NEW_CAP_ID": {\n\t\t"id": "NEW_CAP_ID",\n\t\t"thresholds": [${thresholds.join(", ")}],\n\t\t"attenuations": [${attenuations.join(", ")}]\n\t},`);
}
