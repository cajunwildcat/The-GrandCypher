let MODE = "find";
let activeMods = new Set();
let allowedMods = new Set([MODS.normal_might, MODS.omega_might, MODS.od_might, MODS.ex_might, MODS.ex_might_sp, MODS.normal_stamina, MODS.omega_stamina, MODS.od_stamina, MODS.normal_enmity, MODS.omega_enmity, MODS.od_enmity, MODS.elem_atk, MODS.elem_atk_prog, MODS.counter_dmg, MODS.critical, MODS.perpetuity, MODS.strength, MODS.jammed, MODS.od_atk, MODS.break_atk, MODS.hype, MODS.sleep, MODS.stone, MODS.assassin, MODS.weapon_ca_dmg, MODS.passive_ca_dmg, MODS.na_dmg, MODS.stackable_atk_up, MODS.stackable_atk_up_sp, MODS.attack_down, MODS.stackable_atk_down, MODS.global_field, MODS.local_field, MODS.primarch_summon, MODS.passive_enmity, MODS.sex_atk, MODS.debuff_atk, MODS.moon_prog, MODS.bounty_atk, MODS.dmg_cap_pen, MODS.crit_dmg, MODS.bf_atk, MODS.bf_ca_dmg, MODS.bf_skill_dmg, MODS.skill_dmg, MODS.cb_dmg, MODS.def_ignore, MODS.dmg_cap, MODS.dmg_cap_sp, MODS.na_dmg_cap, MODS.skill_dmg_cap, MODS.skill_dmg_cap_sp, MODS.ca_dmg_cap, MODS.sp_ca_dmg_cap, MODS.cb_dmg_cap, MODS.fc_dmg_cap, MODS.dmg_amp, MODS.omega_dmg_amp, MODS.od_dmg_amp, MODS.elem_dmg_amp, MODS.null_amp, MODS.na_dmg_amp, MODS.na_dmg_amp_sp, MODS.skill_dmg_amp, MODS.skill_dmg_amp_sp, MODS.ca_dmg_amp, MODS.ca_dmg_amp_sp, MODS.cb_dmg_amp, MODS.fc_dmg_amp, MODS.dmg_supp, MODS.na_dmg_supp, MODS.na_dmg_supp_sp, MODS.skill_dmg_supp, MODS.skill_dmg_supp_sp, MODS.ca_dmg_supp, MODS.ca_dmg_supp_sp, MODS.wide_open_1, MODS.wide_open_2, MODS.wide_open_3, MODS.wide_open_4, MODS.wide_open_5, MODS.wide_open_6]);
let customModList = {};
let EMPwarning = JSON.parse(getSetLocalStor("emp-warning", null, "true"));
function toggleEMPWarning() { 
    EMPwarning = !EMPwarning; 
    getSetLocalStor("emp-warning", JSON.stringify(EMPwarning));
}
const EMPMap = {
    "Skill DMG": MODS.skill_dmg,
    "Skill DMG Cap": MODS.skill_dmg_cap,
    "C.A. DMG": MODS.passive_ca_dmg,
    "C.A. DMG Cap": MODS.ca_dmg_cap,
    "Stamina": MODS.strength,
    "Enmity": MODS.jammed,
    "Supplemental DMG": MODS.dmg_supp,
    "Fire ATK": MODS.elem_atk,
    "Water ATK": MODS.elem_atk,
    "Earth ATK": MODS.elem_atk,
    "Wind ATK": MODS.elem_atk,
    "Light ATK": MODS.elem_atk,
    "Dark ATK": MODS.elem_atk,
}

function setupSaveTeamControls() {
    let delButton = document.querySelector("#delete-saved-team-button");
    let saveButton = document.querySelector("#save-saved-team-button");
    let saveNewButton = document.querySelector("#save-new-saved-team-button");
    let teamSel = document.querySelector("#saved-team-select");
    teamSel.value = "";
    function addTeamToSel(teamName) {
        let opt = document.createElement("option");
        opt.textContent = teamName;
        teamSel.appendChild(opt);
        saveButton.disabled = false;
    }
    function resetSel() {
        teamSel.value = "";
        $(teamSel).trigger("chosen:updated");
        saveButton.disabled = true;
        delButton.disabled = true;
    }
    function saveTeam(teamName) {
        let newTeam = {};
        [...document.querySelectorAll(".mod-row")].forEach(r => {
            newTeam[r.id] = [...r.querySelectorAll(".mod-value-input")].map(v => v.value);
        });
        savedTeams[teamName] = newTeam;
        getSetLocalStor("saved-teams", JSON.stringify(savedTeams));
        saveButton.textContent = "Saved";
    }
    
    let savedTeams = JSON.parse(getSetLocalStor("saved-teams"));
    if (!savedTeams) {
        savedTeams = JSON.parse(DEFAULTSAVEDTEAMS);
        getSetLocalStor("saved-teams", DEFAULTSAVEDTEAMS);
    }
    Object.keys(savedTeams).forEach(addTeamToSel);
    teamSel.onchange = () => {
        let team = teamSel.value;
        [...document.querySelectorAll(".remove-mod-row-button")].forEach(r => r.click());
        if (team == "Empty") {
            resetSel();
            return;
        }
        Object.keys(savedTeams[team]).forEach(m => addModsTableRow(m, savedTeams[team][m]));
        delButton.disabled = false;
        saveButton.disabled = false;
        inputUpdated();
    }
    saveNewButton.onclick = () => {
        let newTeamName = prompt("Enter a name for the team:");
        let savedTeamNames = Object.keys(savedTeams);
        do {
            if (newTeamName == "Empty") newTeamName = prompt("That is a reserved name. Enter another name:");
            if (newTeamName == "") newTeamName = prompt("That is an invalid name. Enter another name:");
            if (savedTeamNames.includes(newTeamName) && !confirm("There is already a team with that name. Do you want to overrite it?")) return;
        } while (newTeamName == "Empty")
        if (!newTeamName) return;
        saveTeam(newTeamName);
        addTeamToSel(newTeamName);
        teamSel.value = newTeamName;
        $(teamSel).trigger("chosen:updated");
    }
    saveButton.onclick = () => saveTeam(teamSel.value);
    delButton.onclick = () => {
        if (!confirm(`Are you sure you want to delete the saved team "${teamSel.value}"?`)) return;
        delete savedTeams[teamSel.value];
        teamSel.selectedOptions[0].remove();
        getSetLocalStor("saved-teams", JSON.stringify(savedTeams));
        resetSel();
    }
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
    dmgType = getInputVal("dmg-type-select")
    sel = document.querySelector("#dmg-cap-select");
    sel.innerHTML = "";
    Object.keys(DMGCAPS).forEach(key => {
        if (key.includes("Hard") || key.includes("Mjolnir")) return;
        switch (dmgType) {
            case DMGTYPES.COUNTER:
            case DMGTYPES.NA: if (!key.includes("NA")) return; break;
            case DMGTYPES.SKILL: (key.includes("NA") || key.includes("CA")); break;
            case DMGTYPES.CA: if (!key.includes("CA")) return; break;
        }
        let opt = document.createElement("option");
        opt.textContent = `${formatNum(simpleSoftCap(DMGCAPS[key]))} (${key})`;
        opt.dataset.cap = key;
        sel.appendChild(opt);
    });
    $(sel).trigger("chosen:updated");
    inputUpdated();
}

async function importCharEMPS() {
    if (EMPwarning && !confirm(`This will clear the "Passive" column in the mod table. Do you want to continue?\nYou can toggle this warning by typing "toggleEMPWarning()" in the dev console.`)) return;
    let importText;
    await navigator.clipboard.readText().then(r => importText = r);
    try {
        importText = JSON.parse(importText);
    } catch (e) {
        alert("The contents on the clipboard weren't in the expected format.")
        return;
    }
    [...document.querySelectorAll("#mods-input-table td:nth-child(3) .mod-value-input")].forEach(inp => inp.value = "");
    importText.forEach(s => {
        skill = s[0];
        val = parseFloat(s[1]);
        src = s[2];
        if (val == 0) return;
        skill = EMPMap[skill];
        if (skill == MODS.jammed) val = 1;
        else if (skill == MODS.strength) {
            if (src == "emp") val = [3, 4, 6][val-1];
            else val += 2;
        }
        let inp = document.querySelector(`#mods-input-table tr[id="${skill}"] td:nth-child(3) .mod-value-input`);
        if (!inp) addModsTableRow(skill, [0,val]);
        else inp.value = val + parseFloat(inp.value || 0);
    });
}

function setupModsTableRows() {
    addModsTableRow(MODS.normal_might, []);
    addModsTableRow(MODS.omega_might, []);
    addModsTableRow(MODS.ex_might, []);
    addModsTableRow(MODS.elem_atk, []);
    addModsTableRow(MODS.dmg_amp, []);
    addModsTableRow(MODS.elem_dmg_amp, []);
    addModsTableRow(MODS.dmg_cap, []);
    addModsTableRow(MODS.na_dmg_cap, []);
    addModsTableRow(MODS.skill_dmg_cap, []);
    addModsTableRow(MODS.na_dmg_supp, []);
    addModsTableRow(MODS.dmg_cap_pen, []);
    addModsTableRow(MODS.skill_dmg, []);
    addModsTableRow(MODS.perpetuity, []);
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
        });
        if (cell.querySelector(".green-highlight")) g++;
        if (cell.querySelector(".yellow-highlight") || cell.querySelector(".orange-highlight")) y++;
    });
    let matchCount = document.querySelector("#result-match-count");
    if (dmgNumList.length == 0) matchCount.textContent = "There are no inputs";
    else {
        matchCount.innerHTML = `Exact: ${g} | OBO: ${y} | Failed: ${dmgNumList.length - (g + y)}`;
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
    displayCapInfo();
    $(".chosen-select").trigger("chosen:updated");
}

function dmgTypeChange() {
    let dmgType = getInputVal("dmg-type-select");
    [...document.querySelectorAll("#sub-table-echo-opt, span:has(>#echo-mod-input)")].forEach(ele => ele.hidden = dmgType == DMGTYPES.SKILL);
    let dmgModInput = document.querySelector("#dmg-mod-input");
    dmgModInput.disabled = false;
    switch (dmgType) {
        case DMGTYPES.NA:
            dmgModInput.disabled = true;
            dmgModInput.value = 100;
            break;
        case DMGTYPES.Skill:
            if ((subTableSel = document.querySelector("#sub-table-select")).value == "Echo") {
                subTableSel.value = "None";
                subTableChange();
            }
            break;
        case DMGTYPES.CA: break;
        case DMGTYPES.NA: break;
    }
    setupDMGCapSelect();
}

function calcDamageUI() {
    document.querySelector("#result-match-count").textContent = "";
    let modList = makeModList();
    let subModList = structuredClone(modList);
    let subResults = null;
    switch (getInputVal("sub-table-select")) {
        case "Echo": subResults = true; subModList[MODS.echo_mod] = getInputVal("sub-table-echo-input"); break;
        case "RNG Crit": subResults = true; subModList[MODS.critical] = getInputVal("sub-table-crit-input") + (subModList[MODS.critical] ?? 0); break;
        case "DEF Down": subResults = true; subModList[MODS.def_down] = getInputVal("sub-table-def-input") + (subModList[MODS.def_down] ?? 0); break;
        case "Custom": subResults = true; subModList = modList; modList = customModList; break;
    }
    let selectedCap = document.querySelector("#dmg-cap-select").selectedOptions[0];
    if (!selectedCap) return;
    selectedCap = DMGCAPS[selectedCap.dataset.cap];
    let baseResults = calcDamage(getInputVal("dmg-type-select"), selectedCap, modList, DMGCAPS[getInputVal("hard-cap-select")]);
    if (subResults) subResults = calcDamage(getInputVal("dmg-type-select"), selectedCap, subModList, DMGCAPS[getInputVal("hard-cap-select")]);
    fillResultTable(baseResults, subResults);
}

function findDMGCap(input) {
    let [results, checkCount] = calcCap(getInputVal("dmg-type-select"), makeModList(), DMGCAPS[getInputVal("hard-cap-select")], input);
    if (results.length == 1) {
        let cap = results[0].id;
        console.log(`Cap found: ${formatNum(simpleSoftCap(DMGCAPS[cap]))} (${cap})`);
        fillResultTable(results[0].dmgs);
        document.querySelector("#result-match-count").textContent += ` | Checked: ${checkCount} Caps`;
        let capSel = document.querySelector("#dmg-cap-select");
        capSel.value = [...capSel.childNodes].find(n => n.dataset.cap == cap).textContent;
        $(".chosen-select").trigger("chosen:updated");
    }
    else if (results.length == 0) {
        fillResultTable(new Array(101).fill(0));
        document.querySelector("#dmg-cap-select").value = "";
        document.querySelector("#result-match-count").textContent = `Inconclusive, none found. Check your inputs.`;
    }
    else {
        document.querySelector("#result-match-count").textContent = `Inconclusive, multiple possible. Try inputting more observed values or increasing Raw.`;
    }
}

const flatModValues = [MODS.dmg_supp, MODS.ca_dmg_supp, MODS.ca_dmg_supp_sp, MODS.na_dmg_supp, MODS.na_dmg_supp_sp, MODS.skill_dmg_supp, MODS.skill_dmg_supp_sp];
function addModsTableRow(modID, gridValue = []) {
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
        setupAddModRowSelect();
    }
    row.appendChild(labelCell);
    for (let i = 0; i < cols; i++) {
        let cell = document.createElement("td");
        cell.classList.add("mod-value");
        cell.dataset.col = i;
        let input = document.createElement("input");
        input.classList.add("mod-value-input");
        if (gridValue[i] && gridValue[i] > 0) input.defaultValue = gridValue[i];
        cell.appendChild(input);
        input.oninput = () => {
            inputUpdated();
            document.querySelector("#save-saved-team-button").textContent = "Save";
        };
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
    switch (e.key) {
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

function subTableChange() {
    let subTable = document.querySelector("#sub-table-select").value;
    customModList = {};
    [...document.querySelectorAll(".sub-table-input")].forEach(inp => inp.classList.remove("active"));
    switch (subTable) {
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
    return Number.isNaN(pval) ? val : pval;
}

function getCheckBox(eleID) {
    return document.querySelector(`#${eleID}`).checked;
}

function setupAddModRowSelect() {
    let sel = document.querySelector("#add-mod-row-select");
    sel.innerHTML = "";
    let blankOpt = document.createElement("option");
    sel.appendChild(blankOpt);
    allowedMods = sortSet(allowedMods, (a, b) => {
        let modKeys = Object.values(MODS);
        return modKeys.indexOf(a) - modKeys.indexOf(b)
    });
    allowedMods.forEach(mod => {
        let opt = document.createElement("option");
        opt.textContent = mod;
        sel.appendChild(opt);
    });
    $(sel).trigger("chosen:updated");
}

function createModRow(e) {
    addModsTableRow(e.target.value);
    setupAddModRowSelect();
}

function displayCapInfo(e) {
    let selectedCap = document.querySelector("#dmg-cap-select").selectedOptions[0];
    if (!selectedCap) return;
    selectedCap = DMGCAPS[selectedCap.dataset.cap];
    let capInfos = [...document.querySelectorAll("#cap-info-row .cap-info")];
    selectedCap = [...selectedCap.thresholds.map(n => formatNum(n)), ...selectedCap.attenuations.map(n => (n * 100) + "%")];
    capInfos.forEach((ci, i) => {
        ci.textContent = selectedCap[i];
    });
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
    let skipAmp = (enemyElem == ELEMS.Null) ? (dmgElem == ELEMS.Destruction) ? "" : MODS.elem_dmg_amp : MODS.null_amp;
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
    if (getCheckBox("def-down-sp-check")) addMod(MODS.sp_def_down, 10);
    if (getsElemATK) {
        addMod(MODS.crew_ship, getInputVal("crew-ship-input"));
        addMod(MODS.crew_reactor, getInputVal("crew-reactor-input"));
    }
    addMod(MODS.elem_res, getInputVal("elem-res-input"));
    addMod(MODS.echo_mod, getInputVal("echo-mod-input"));
    addMod(MODS.base_atk, getInputVal("base-atk-input"));
    addMod(MODS.base_def, getInputVal("enemy-def-input"));
    addMod(MODS.dmg_mod, getInputVal("dmg-mod-input"));

    if (dmgElem == ELEMS.Plain) modList[MODS.elem_atk] = 0;
    return modList;
}

window.onload = (e) => {
    [...document.querySelectorAll("input, select, textarea")].forEach(i => {
        i.oninput = inputUpdated;
        switch (i.id) {
            case "mode-select": i.oninput = switchMode; break;
            case "sub-table-select": i.onchange = subTableChange; break;
            case "add-mod-row-select": i.onchange = createModRow; break;
            case "dmg-type-select": i.onchange = dmgTypeChange; break;
        }
    });
    document.querySelector("#char-emp-import-button").onclick = importCharEMPS;
    setupResultTable();
    setupDMGCapSelect();
    setupModsTableRows();
    switchMode();
    subTableChange();
    dmgTypeChange();
    setupAddModRowSelect();
    setupSaveTeamControls();
    [...document.querySelectorAll("#amp-wonder-input, #crew-ship-input, #crew-reactor-input")].forEach(inp => {
        let id = inp.id.replace("-input", "");
        inp.value = getSetLocalStor(id, null, getInputVal(inp.id));
        inp.addEventListener("input", (e) => getSetLocalStor(id, e.target.value));
    });
    inputUpdated();
    $(".chosen-select").chosen({ width: "175px" });
}