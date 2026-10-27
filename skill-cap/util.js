function getSetLocalStor(key, value = null) {
    if (value) localStorage.setItem(key, value);
    return localStorage.getItem(key)
}

function sumArr(acc, cur) {
    return acc + cur;
}

function makeSeqArray(n, cb = (i) => i) {
    return new Array(n).fill(0).map((_,i)=>cb(i));
}