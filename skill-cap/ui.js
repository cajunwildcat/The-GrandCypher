let MODE = "find";
let FMR = new Intl.NumberFormat("en-US");
let activeMods = new Set();
let allowedMods = new Set([MODS.normal_might, MODS.omega_might, MODS.od_might, MODS.ex_might, MODS.ex_might_sp, MODS.normal_stamina, MODS.omega_stamina, MODS.od_stamina, MODS.normal_enmity, MODS.omega_enmity, MODS.od_enmity, MODS.elem_atk, MODS.elem_atk_prog, MODS.counter_dmg, MODS.critical, MODS.perpetuity, MODS.strength, MODS.jammed, MODS.od_atk, MODS.break_atk, MODS.hype, MODS.sleep, MODS.stone, MODS.assassin, MODS.weapon_ca_dmg, MODS.passive_ca_dmg, MODS.na_dmg, MODS.stackable_atk_up, MODS.stackable_atk_up_sp, MODS.attack_down, MODS.stackable_atk_down, MODS.global_field, MODS.local_field, MODS.primarch_summon, MODS.passive_enmity, MODS.sex_atk, MODS.debuff_atk, MODS.moon_prog, MODS.bounty_atk, MODS.dmg_cap_pen, MODS.crit_dmg, MODS.bf_atk, MODS.bf_ca_dmg, MODS.bf_skill_dmg, MODS.skill_dmg, MODS.cb_dmg, MODS.def_ignore, MODS.dmg_cap, MODS.dmg_cap_sp, MODS.na_dmg_cap, MODS.skill_dmg_cap, MODS.skill_dmg_cap_sp, MODS.ca_dmg_cap, MODS.sp_ca_dmg_cap, MODS.cb_dmg_cap, MODS.fc_dmg_cap, MODS.dmg_amp, MODS.omega_dmg_amp, MODS.od_dmg_amp, MODS.elem_dmg_amp, MODS.null_amp, MODS.na_dmg_amp, MODS.na_dmg_amp_sp, MODS.skill_dmg_amp, MODS.skill_dmg_amp_sp, MODS.ca_dmg_amp, MODS.ca_dmg_amp_sp, MODS.cb_dmg_amp, MODS.fc_dmg_amp, MODS.dmg_supp, MODS.na_dmg_supp, MODS.na_dmg_supp_sp, MODS.skill_dmg_supp, MODS.skill_dmg_supp_sp, MODS.ca_dmg_supp, MODS.ca_dmg_supp_sp, MODS.wide_open_1, MODS.wide_open_2, MODS.wide_open_3, MODS.wide_open_4, MODS.wide_open_5, MODS.wide_open_6]);
let customModList = {};

function formatNum(num) {
    return FMR.format(num);
}

function setupResultTable() {
    let table = document.querySelector("#rng-result-table");
    for (let i = 0; i < 101; i++) {
        let s = document.createElement("span");
        s.classList.add("rng-number");
        s.textContent = 0;
        table.appendChild(s);
    }
    let s = document.createElement("span");
    s.id = "result-match-count";
    table.appendChild(s);
}

function setupDMGCapSelect() {
    sel = document.querySelector("#dmg-cap-select");
    Object.keys(DMGCAPS).forEach(key => {
        if (key.includes("Hard") || key.includes("Mjolnir")) return;
        let opt = document.createElement("option");
        opt.textContent = `${formatNum(simpleSoftCap(DMGCAPS[key]))} (${key})`;
        opt.dataset.cap = key;
        sel.appendChild(opt);
    });
}

function setupModsTableRows() {
    addModsTableRow(MODS.normal_might, 45);
    addModsTableRow(MODS.omega_might, 364.8);
    addModsTableRow(MODS.ex_might, 145);
    addModsTableRow(MODS.elem_atk, 215);

    addModsTableRow(MODS.omega_dmg_amp, 7.6);
    addModsTableRow(MODS.elem_dmg_amp, 30);
    addModsTableRow(MODS.na_dmg_amp, 10);

    addModsTableRow(MODS.dmg_cap, 20);
    addModsTableRow(MODS.na_dmg_cap, 10);
    addModsTableRow(MODS.skill_dmg_cap, 60);

    addModsTableRow(MODS.na_dmg_supp, 20000);

    addModsTableRow(MODS.dmg_cap_pen, 3.5);

    addModsTableRow(MODS.skill_dmg, 0);
    addModsTableRow(MODS.perpetuity, 0);
}

function fillResultTable(valueArr, subValueArr = null) {
    let table = document.querySelector("#rng-result-table");
    table.classList.toggle("hide-sub-numbers", !subValueArr);
    valueArr.forEach((d, i) => {
        let s = table.childNodes[i];
        s.innerHTML = "";
        let p = document.createElement("p");
        p.dataset.value = d;
        p.textContent = formatNum(d);
        p.style.fontSize = "";
        s.appendChild(p);
        if (s.textContent.length > 7) s.style.fontSize = "15px";
        if (s.textContent.length > 9) s.style.fontSize = "13px";
        if (subValueArr) {
            let sp = document.createElement("p");
            sp.textContent = formatNum(subValueArr[i]);
            sp.dataset.value = subValueArr[i];
            sp.classList.add("sub-table-number");
            s.appendChild(sp);
        }
    });
    highlightResultTable(getObsInput());
}

function highlightResultTable(dmgNumList) {
    if (dmgNumList.length == 0) return;
    dmgNumList = [...new Set(dmgNumList)];
    let table = document.querySelector("#rng-result-table");
    let g = y = 0;
    [...table.childNodes].forEach(cell => {
        [...cell.querySelectorAll("p")].forEach(num => {
            num.classList.toggle("green-highlight", dmgNumList.includes(parseInt(num.dataset.value)));
            num.classList.toggle("yellow-highlight", dmgNumList.includes(parseInt(num.dataset.value) - 1) || dmgNumList.includes(parseInt(num.dataset.value) + 1));
            num.classList.toggle("orange-highlight", dmgNumList.includes(parseInt(num.dataset.value) - 2) || dmgNumList.includes(parseInt(num.dataset.value) + 2));
            if (num.classList.contains("green-highlight")) g++;
            if (num.classList.contains("yellow-highlight") || num.classList.contains("orange-highlight")) y++;
        });
    });
    let matchCount = document.querySelector("#result-match-count");
    if (dmgNumList.length == 0) matchCount.textContent = "There are no inputs";
    else {
        matchCount.innerHTML = `Exact Matches: ${g} | OBO Matches: ${y} | Failed Matches: ${dmgNumList.length - (g + y)}`;
    }
}

function getObsInput() {
    obsInp = document.querySelector("#observed-input");
    let input = obsInp.value.trim();
    return input.split(/\s+/).filter(n => n != "").map(n => parseInt(n.replaceAll(",", "")));
}

function inputUpdated() {
    input = getObsInput();
    switch (MODE) {
        case "find": findDMGCap(input); break;
        case "verify": calcDamageUI(); break;
    }
}

function calcDamageUI() {
    let modList = makeModList();
    let subModList = structuredClone(modList);
    let subResults = null;
    switch (getInputVal("sub-table-select")) {
        case "Echo": subResults = true; subModList[MODS.echo_mod] = getInputVal("sub-table-echo-input"); break;
        case "RNG Crit": subResults = true; subModList[MODS.critical] = getInputVal("sub-table-crit-input") + (subModList[MODS.critical] ?? 0); break;
        case "DEF Down": subResults = true; subModList[MODS.def_down] = getInputVal("sub-table-def-input") + (subModList[MODS.def_down] ?? 0); break;
        case "Custom": subResults = true; subModList = modList; modList = customModList; break;
    }
    let baseResults = calcDamage(getInputVal("dmg-type-select"), DMGCAPS[document.querySelector("#dmg-cap-select").selectedOptions[0].dataset.cap], 
        modList, getInputVal("base-atk-input"), getInputVal("dmg-mod-input"), getInputVal("enemy-def-input"), DMGCAPS[getInputVal("hard-cap-select")]);
    if (subResults) subResults = calcDamage(getInputVal("dmg-type-select"), DMGCAPS[document.querySelector("#dmg-cap-select").selectedOptions[0].dataset.cap], 
        subModList, getInputVal("base-atk-input"), getInputVal("dmg-mod-input"), getInputVal("enemy-def-input"), DMGCAPS[getInputVal("hard-cap-select")]);
    fillResultTable(baseResults, subResults);
}

function findDMGCap(input) {
    let results = calcCap(getInputVal("dmg-type-select"), makeModList(), getInputVal("base-atk-input"), 
        getInputVal("dmg-mod-input"), getInputVal("enemy-def-input"), DMGCAPS[getInputVal("hard-cap-select")], input);
    if (results.length == 1) {
        let cap = results[0][0];
        console.log(`Cap found: ${formatNum(simpleSoftCap(DMGCAPS[cap]))} (${cap})`);
        fillResultTable(results[0][2]);
        let capSel = document.querySelector("#dmg-cap-select");
        capSel.value = [...capSel.childNodes].find(n => n.dataset.cap == cap).textContent;
        $(".chosen-select").trigger("chosen:updated");
    }
    else if (results.length == 0) {
        fillResultTable(new Array(101).fill(0));
        document.querySelector("#dmg-cap-select").value = 0;
    }
}

const flatModValues = [MODS.dmg_supp, MODS.ca_dmg_supp, MODS.ca_dmg_supp_sp, MODS.na_dmg_supp, MODS.na_dmg_supp_sp, MODS.skill_dmg_supp, MODS.skill_dmg_supp_sp];
function addModsTableRow(modID, gridValue = 0) {
    activeMods.add(modID);
    allowedMods.delete(modID);
    table = document.querySelector("#mods-input-table");
    let cols = table.querySelector(".header-row").children.length - 1;
    let row = table.insertRow(table.rows.length);
    row.id = modID;
    row.classList.add("mod-row")
    let labelCell = document.createElement("td");
    labelCell.classList.add("mods-label");
    labelCell.innerHTML = `<button class="remove-mod-row-button">X</button><img src="./assets/mod labels/${modID}.png" alt="${modID}">`;
    labelCell.querySelector(".remove-mod-row-button").onclick = () => {
        row.remove();
        activeMods.delete(modID);
        allowedMods.add(modID);
        inputUpdated();
    }
    row.appendChild(labelCell);
    for (let i = 0; i < cols; i++) {
        let cell = document.createElement("td");
        cell.classList.add("mod-value");
        cell.dataset.col = i;
        let input = document.createElement("input");
        input.classList.add("mod-value-input");
        if (i == 0 && gridValue > 0) input.defaultValue = gridValue;
        cell.appendChild(input); 
        input.oninput = inputUpdated;
        input.onkeydown = navModInputs;
        input.onblur = () => {
            input.classList.remove("locked");
            navLocked = false;
        }
        if (!flatModValues.includes(modID)) cell.append("%");
        row.appendChild(cell);
    }
}

let navLocked = false;
function navModInputs(e) {
    if (e.key == "Enter") e.target.classList.toggle("locked", navLocked = !navLocked);
    if (navLocked) return;
    let target = e.target;
    let col = target.parentElement.dataset.col;
    switch(e.key) {
        case "ArrowUp": target.parentElement.parentElement.previousElementSibling?.querySelectorAll("input")[col]?.focus(); break;
        case "ArrowRight": target.parentElement.nextElementSibling?.querySelector("input")?.focus(); break;
        case "ArrowDown": target.parentElement.parentElement.nextElementSibling?.querySelectorAll("input")[col]?.focus(); break;
        case "ArrowLeft": target.parentElement.previousElementSibling?.querySelector("input")?.focus(); break;
    }
}

function switchMode() {
    MODE = document.querySelector("#mode-select").value;
    let capSel = document.querySelector("#dmg-cap-select");
    capSel.disabled = MODE == "find";
    $(".chosen-select").trigger("chosen:updated");
    subTableSel = document.querySelector("#sub-table-select");
    subTableSel.parentElement.hidden = MODE == "find";
    inputUpdated();
}

function subTableChange(e) {
    let subTable = document.querySelector("#sub-table-select").value;
    customModList = {};
    [...document.querySelectorAll(".sub-table-input")].forEach(inp=>inp.classList.remove("active"));
    switch(subTable) {
        case "Echo": document.querySelector("#sub-table-echo-input").classList.add("active"); break;
        case "RNG Crit": document.querySelector("#sub-table-crit-input").classList.add("active"); break;
        case "DEF Down": document.querySelector("#sub-table-def-input").classList.add("active"); break;
        case "Custom": customModList = makeModList(); break;
    }
    inputUpdated();
}

function getInputVal(eleID) {
    let val = document.querySelector(`#${eleID}`).value;
    let pval = parseFloat(val);
    return Number.isNaN(pval)? val : pval;
}

function getCheckBox(eleID) {
    return document.querySelector(`#${eleID}`).checked;
}

function setupAddModRowSelect() {
    let sel = document.querySelector("#add-mod-row-select");
    sel.innerHTML = "";
    let blankOpt = document.createElement("option");
    sel.appendChild(blankOpt);
    allowedMods.forEach(mod => {
        let opt = document.createElement("option");
        opt.textContent = mod;
        sel.appendChild(opt);
    });
    $(sel).trigger("chosen:updated");
}

function createModRow(e) {
    addModsTableRow(e.target.value);
    let inp = document.querySelector(`.mod-row[id="${e.target.value}"] input`);
    setupAddModRowSelect();
}

function makeModList() {
    trs = [...document.querySelectorAll("#mods-input-table .mod-row")]
    let modList = {};
    const addMod = (m, v) => modList[m] = v + (modList[m] ?? 0);
    //elem superiority rules
    let allyElem = ELEMS[getInputVal("ally-elem-select")];

    let dmgElem = getInputVal("ally-dmg-elem-select");
    if (dmgElem == "Ally Elem") dmgElem = allyElem;
    else dmgElem = ELEMS[dmgElem];

    let enemyElem = getInputVal("enemy-elem-select");
    if (enemyElem == "Inferior") enemyElem = ELEMSUP[allyElem];
    else enemyElem = ELEMS[enemyElem];

    let seraphic = enemyElem == ELEMSUP[allyElem];

    let superior = 0;
    if (dmgElem == ELEMS.Destruction) superior = 1;
    else if (enemyElem == ELEMSUP[dmgElem]) superior = 1;
    else if (dmgElem == ELEMSUP[enemyElem]) superior = -1;

    if (superior == 1 || getCheckBox("piercing-sight-check")) addMod(MODS.elem_atk, 50);
    else if (superior == -1) addMod(MODS.elem_atk, -25);
    let getsElemATK = dmgElem >= ELEMS.Fire && dmgElem <= ELEMS.Dark;
    //mods table
    let skipAmp = (enemyElem == ELEMS.Null)? (dmgElem == ELEMS.Destruction)? "" : MODS.elem_dmg_amp : MODS.null_amp;
    trs.forEach(row => {
        if (row.id == skipAmp) return;
        if (row.id == MODS.elem_dmg_amp && superior != 1) return;
        if ((row.id == MODS.elem_atk || row.id == MODS.elem_atk_prog) && !getsElemATK) return;
        addMod(row.id, [...row.querySelectorAll("input")].map(i => parseFloat(i.value || 0)).reduce(sumArr));
    });
    //wonders
    if (getCheckBox("ele-atk-wonder-check") && getsElemATK) addMod(MODS.elem_atk, 3);
    if (getCheckBox("dmg-cap-wonder-check")) addMod(MODS.dmg_cap, 3);
    addMod(MODS.dmg_amp, getInputVal("amp-wonder-input"));
    if (getCheckBox("yupei-check")) {
        if (getsElemATK) addMod(MODS.elem_atk, 10);
        addMod(MODS.skill_dmg, 5);
        addMod(MODS.passive_ca_dmg, 5);
        if (seraphic) addMod(MODS.dmg_amp, 5);
        addMod(MODS.na_dmg_cap, 5);
        addMod(MODS.skill_dmg_cap, 5);
        addMod(MODS.ca_dmg_cap, 5);
    }
    //misc
    if (getCheckBox("perp-ring-check")) {
        addMod(MODS.perpetuity, 10);
        addMod(MODS.dmg_cap, 5);
    }
    addMod(MODS.def_down, getInputVal("enemy-def-down-input"));
    addMod(MODS.def_up, getInputVal("enemy-def-up-input"));
    if (getCheckBox("def-down-sp-check")) addMod(MODS.sp_def_down);
    if (getsElemATK) {
        addMod(MODS.crew_ship, getInputVal("crew-ship-input"));
        addMod(MODS.crew_reactor, getInputVal("crew-reactor-input"));
    }
    addMod(MODS.elem_res, getInputVal("elem-res-input"))
    addMod(MODS.echo_mod, getInputVal("echo-mod-input"))
    return modList;
}

window.onload = (e) => {
    [...document.querySelectorAll("input, select")].forEach(i => i.oninput = inputUpdated);
    setupResultTable();
    setupDMGCapSelect();
    setupModsTableRows();
    document.querySelector("#mode-select").oninput = switchMode;
    switchMode();
    document.querySelector("#dmg-cap-select").value = "135,000 (1000003)";
    
    [...document.querySelectorAll("#amp-wonder-input, #crew-ship-input, #crew-reactor-input")].forEach(inp => {
        let id = inp.id.replace("-input","");
        inp.value = getSetLocalStor(id);
        inp.addEventListener("input", (e) => getSetLocalStor(id, e.target.value));
    });

    document.querySelector("#sub-table-select").onchange = subTableChange;
    subTableChange();

    setupAddModRowSelect();
    document.querySelector("#add-mod-row-select").onchange = createModRow;
    
    let obsInp = document.querySelector("#observed-input");
    obsInp.oninput = inputUpdated;
    inputUpdated();
    $(".chosen-select").chosen();
}