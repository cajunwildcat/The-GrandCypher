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