function getSetLocalStor(key, value = null, def = null) {
    if (value) localStorage.setItem(key, value);
    return localStorage.getItem(key) ?? def;
}

function sumArr(acc, cur) {
    return acc + cur;
}

function makeSeqArray(n, cb = (i) => i) {
    return new Array(n).fill(0).map((_,i)=>cb(i));
}

let FMR = new Intl.NumberFormat("en-US");
function formatNum(num) {
    return FMR.format(num);
}

function sortSet(set, condition = (a,b) => a - b) {
    return new Set(Array.from(set).sort(condition));
}