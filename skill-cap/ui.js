let MODE = "find";
let allowedMods = new Set([MODS.normal_might, MODS.omega_might, MODS.od_might, MODS.ex_might, MODS.ex_might_sp, MODS.normal_stamina, MODS.omega_stamina, MODS.od_stamina, MODS.normal_enmity, MODS.omega_enmity, MODS.od_enmity, MODS.elem_atk, MODS.elem_atk_prog, MODS.counter_dmg, MODS.grid_critical, MODS.perpetuity, MODS.strength, MODS.jammed, MODS.od_atk, MODS.break_atk, MODS.hype, MODS.sleep, MODS.stone, MODS.assassin, MODS.weapon_ca_dmg, MODS.passive_ca_dmg, MODS.na_dmg, MODS.stackable_atk_up, MODS.stackable_atk_up_sp, MODS.attack_down, MODS.stackable_atk_down, MODS.global_field, MODS.local_field, MODS.primarch_summon, MODS.passive_enmity, MODS.sex_atk, MODS.debuff_atk, MODS.moon_prog, MODS.bounty_atk, MODS.dmg_cap_pen, MODS.crit_dmg, MODS.bf_atk, MODS.bf_ca_dmg, MODS.bf_skill_dmg, MODS.skill_dmg, MODS.cb_dmg, MODS.def_ignore, MODS.dmg_cap, MODS.dmg_cap_sp, MODS.na_dmg_cap, MODS.skill_dmg_cap, MODS.skill_dmg_cap_sp, MODS.ca_dmg_cap, MODS.sp_ca_dmg_cap, MODS.cb_dmg_cap, MODS.fc_dmg_cap, MODS.dmg_amp, MODS.omega_dmg_amp, MODS.od_dmg_amp, MODS.elem_dmg_amp, MODS.null_amp, MODS.na_dmg_amp, MODS.na_dmg_amp_sp, MODS.skill_dmg_amp, MODS.skill_dmg_amp_sp, MODS.ca_dmg_amp, MODS.ca_dmg_amp_sp, MODS.cb_dmg_amp, MODS.fc_dmg_amp, MODS.dmg_supp, MODS.na_dmg_supp, MODS.na_dmg_supp_sp, MODS.skill_dmg_supp, MODS.skill_dmg_supp_sp, MODS.ca_dmg_supp, MODS.ca_dmg_supp_sp, MODS.wide_open_1, MODS.wide_open_2, MODS.wide_open_3, MODS.wide_open_4, MODS.wide_open_5, MODS.wide_open_6, MODS.unique_na_supp, MODS.buff_critical]);
let activeStatuses = new Set();
const modOrder = Object.values(MODS);
let customModList = {};
let EMPwarning = JSON.parse(getLocalStor("emp-warning", true));
function toggleEMPWarning() {
    EMPwarning = !EMPwarning;
    setLocalStor("emp-warning", EMPwarning);
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
    "DMG Cap": MODS.dmg_cap,
    "Normal Attack DMG": MODS.na_dmg_amp,
    "Supp. C.A. DMG": MODS.ca_dmg_supp,
    "Special C.A. DMG Cap": MODS.sp_ca_dmg_cap,
    "Supp. Skill DMG": MODS.skill_dmg_supp,
    "N.A. DMG Amplify": MODS.na_dmg_amp,
    "C.A. DMG Amplify": MODS.ca_dmg_amp
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
        newTeam.elem = getInputVal("ally-elem-select");
        savedTeams[teamName] = newTeam;
        setLocalStor("saved-teams", savedTeams);
        saveButton.textContent = "Saved";
        saveButton.disabled = true;
    }

    let savedTeams = getLocalStor("saved-teams", DEFAULTSAVEDTEAMS);
    Object.keys(savedTeams).forEach(addTeamToSel);
    teamSel.onchange = () => {
        let team = teamSel.value;
        document.querySelectorAll("#mods-input-table .mod-row").forEach(row => {
            row.remove();
            allowedMods.add(row.id);
        });
        if (team == "Empty" || !savedTeams[team]) {
            resetSel();
        }
        else {
            Object.keys(savedTeams[team]).forEach(m => {
                if (m != "elem") addModsTableRow(m, savedTeams[team][m]);
            });
            document.querySelector("#ally-elem-select").value = savedTeams[team].elem ?? "Fire";
            delButton.disabled = false;
        }
        setupAddModRowSelect();
        inputUpdated();
    }
    saveNewButton.onclick = () => {
        let newTeamName = prompt("Enter a name for the team:");
        let savedTeamNames = Object.keys(savedTeams);
        let overwrite = false;
        do {
            if (newTeamName == "Empty") newTeamName = prompt("That is a reserved name. Enter another name:");
            if (newTeamName == "") newTeamName = prompt("That is an invalid name. Enter another name:");
            if (savedTeamNames.includes(newTeamName) && !(overwrite = confirm("There is already a team with that name. Do you want to overrite it?"))) return;
        } while (newTeamName == "Empty" || newTeamName == "");
        if (!newTeamName) return;
        saveTeam(newTeamName);
        if (!overwrite) addTeamToSel(newTeamName);
        teamSel.value = newTeamName;
        $(teamSel).trigger("chosen:updated");
    }
    saveButton.onclick = () => saveTeam(teamSel.value);
    delButton.onclick = () => {
        if (!confirm(`Are you sure you want to delete the saved team "${teamSel.value}"?`)) return;
        delete savedTeams[teamSel.value];
        teamSel.selectedOptions[0].remove();
        setLocalStor("saved-teams", savedTeams);
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
    let dmgType = getInputVal("dmg-type-select")
    let sel = document.querySelector("#dmg-cap-select");
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
}

function setupClassSelect() {
    let sel = document.querySelector("#mc-class-select");
    Object.keys(MCCLASS).forEach(cls => {
        if (cls == "Class Completion" || cls == "Non-Row V") return;
        let opt = document.createElement("option");
        opt.textContent = cls;
        if (cls.includes("Origin")) opt.dataset.search = cls[0] + "O";
        sel.appendChild(opt);
    });
    $(sel).trigger("chosen:updated");
}

function setupDMGCapContextMenu() {
    let capSelect = document.querySelector("#dmg-cap-select");
    let capControl = capSelect.nextElementSibling?.classList.contains("chosen-container")
        ? capSelect.nextElementSibling
        : capSelect;
    let menu = document.createElement("div");
    menu.className = "context-menu";
    menu.setAttribute("role", "menu");
    let copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.textContent = "Copy value";
    copyButton.setAttribute("role", "menuitem");
    menu.appendChild(copyButton);
    document.body.appendChild(menu);

    function hideMenu() {
        menu.classList.remove("visible");
    }

    capControl.addEventListener("contextmenu", event => {
        event.preventDefault();
        copyButton.disabled = !capSelect.value;
        menu.classList.add("visible");
        menu.style.left = `${Math.max(0, Math.min(event.clientX, window.innerWidth - menu.offsetWidth))}px`;
        menu.style.top = `${Math.max(0, Math.min(event.clientY, window.innerHeight - menu.offsetHeight))}px`;
    });

    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(capSelect.value);
            hideMenu();
        } catch (error) {
            console.error("Could not copy the selected damage cap.", error);
            alert("Could not copy the selected damage cap. Clipboard access may be unavailable.");
            hideMenu();
        }
    });

    document.addEventListener("pointerdown", event => {
        if (!menu.contains(event.target)) hideMenu();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") hideMenu();
    });
}

function setupStatusSelect(update = false) {
    let sel = document.querySelector("#add-status-col-select");
    sel.innerHTML = "<option></option>";
    for (let key of Object.keys(STATUSES).sort()) {
        if (activeStatuses.has(key)) continue;
        let opt = document.createElement("option");
        opt.textContent = key;
        opt.dataset.search = `${STATUSES[key].source} ${Object.keys(STATUSES[key].mods).join(" ")}`;
        sel.appendChild(opt);
    }
    $(sel).trigger("chosen:updated");
    if (update) inputUpdated();
}

function statusSelectChanged() {
    let sel = document.querySelector("#add-status-col-select");
    let statusKey = sel.value;
    activeStatuses.add(statusKey);
    let status = STATUSES[statusKey];
    let statusList = document.querySelector("#status-list");
    let statusElement = status.img ? document.createElement("img") : document.createElement("button");
    if (status.img) {
        statusElement.src = `https://gbf.wiki/Special:Redirect/file/${status.img}.png`;
        statusElement.alt = statusKey;
    } else {
        statusElement.type = "button";
        statusElement.classList.add("status-placeholder");
        statusElement.textContent = statusKey;
        statusElement.setAttribute("aria-label", `Remove ${statusKey} status`);
    }
    statusElement.onclick = () => {
        statusElement.remove();
        activeStatuses.delete(statusKey)
        setupStatusSelect(true);
    }
    statusList.appendChild(statusElement);
    $(statusElement).tooltipster({ side: "bottom", contentAsHTML: true })
        .tooltipster("content", `${statusKey}<hr>${Object.keys(status.mods).map(m => `${m}: ${formatNum(status.mods[m])}`).join("<br>")}`);
    setupStatusSelect(true);
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
        let skill = s[0];
        let val = parseFloat(s[1]);
        let src = s[2];
        if (val == 0) return;
        skill = EMPMap[skill];
        if (skill == MODS.jammed) val = 1;
        else if (skill == MODS.strength) {
            if (src == "emp") val = [3, 4, 6][val - 1];
            else val += 2;
        }
        else if (src == "perp-ring" && s[1]) {
            document.querySelector("#perp-ring-check").checked = true;
            return;
        }
        let inp = document.querySelector(`#mods-input-table tr[id="${skill}"] td:nth-child(3) .mod-value-input`);
        if (!inp) addModsTableRow(skill, [0, val]);
        else inp.value = val + parseFloat(inp.value || 0);
    });
    setupAddModRowSelect();
    inputUpdated();
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
    let g = 0;
    let y = 0;
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
    let obsInp = document.querySelector("#observed-input");
    let input = obsInp.value.trim();
    return input.split(/\s+/).filter(n => n != "").map(n => parseInt(n.replaceAll(",", "")));
}

function inputUpdated() {
    let input = getObsInput();
    switch (MODE) {
        case "find": findDMGCap(input); break;
        case "new":
        case "verify": calcDamageUI(); break;
    }
    displayCapInfo();
}

function dmgTypeChange(update = true) {
    let dmgType = getInputVal("dmg-type-select");
    [...document.querySelectorAll("#sub-table-echo-opt, span:has(>#echo-mod-input)")].forEach(ele => ele.hidden = dmgType == DMGTYPES.SKILL);
    let dmgModInput = document.querySelector("#dmg-mod-input");
    dmgModInput.classList.toggle("empty", dmgType != DMGTYPES.NA && dmgModInput.value == "");
    let subTableSel = document.querySelector("#sub-table-select");
    dmgModInput.disabled = dmgType == DMGTYPES.NA;
    document.querySelector("span:has(>#fixed-ca-select)").hidden = dmgType != DMGTYPES.CA;
    switch (dmgType) {
        case DMGTYPES.NA:
            dmgModInput.value = 100;
            break;
        case DMGTYPES.SKILL:
            if (subTableSel.value == "Echo") {
                subTableSel.value = "None";
                subTableChange(false);
            }
            break;
        case DMGTYPES.CA: break;
    }
    setupDMGCapSelect();
    setBulletPWRVis();
    if (update) inputUpdated();
}

function classChange(update = true) {
    let classSel = document.querySelector("#mc-class-select");
    let awkSel = document.querySelector("#char-awk-select");
    awkSel.hidden = classSel.value != "Non MC";
    [...document.querySelectorAll("span:has(>#perp-wonder-check), span:has(>#perp-ring-check)")].forEach(check => check.hidden = classSel.value != "Non MC");
    setBulletPWRVis();
    if (update) inputUpdated();
}

function calcDamageUI() {
    document.querySelector("#result-match-count").textContent = "";
    document.querySelector("#rng-result-table").classList.toggle("hide-sub-numbers", true);
    let modList = makeModList();
    if (modList[MODS.base_atk] == 0 || modList[MODS.dmg_mod] == 0) return;
    let subModList = structuredClone(modList);
    let subResults = null;
    let subTableVal = getInputVal("sub-table-select");
    switch (subTableVal) {
        case "Echo": subResults = true; subModList[MODS.echo_mod] = getInputVal("sub-table-echo-input"); break;
        case "RNG Crit": subResults = true; subModList[MODS.buff_critical] = getInputVal("sub-table-crit-input") + (subModList[MODS.buff_critical] ?? 0); break;
        case "DEF Down": subResults = true; subModList[MODS.def_down] = getInputVal("sub-table-def-input") + (subModList[MODS.def_down] ?? 0); break;
        case "% Cap": subResults = true; break;
        case "Custom": subResults = true; subModList = modList; modList = customModList; break;
    }
    let selectedCap;
    switch (MODE) {
        case "verify":
            selectedCap = document.querySelector("#dmg-cap-select").selectedOptions[0];
            if (!selectedCap) return;
            selectedCap = DMGCAPS[selectedCap.dataset.cap];
            break;
        case "new":
            selectedCap = {
                id: "",
                thresholds: [...document.querySelectorAll(".custom-cap-info.threshold")].map(n => parseFloat(n.value.replaceAll(",", ""))),
                attenuations: [...document.querySelectorAll(".custom-cap-info.attenuation")].map(n => parseFloat(n.value.replaceAll(",", "")) / 100),
            }
            break;
    }
    let baseResults = calcDamage(getInputVal("dmg-type-select"), selectedCap, modList, DMGCAPS[getInputVal("hard-cap-select")]);
    if (subResults) {
        if (subTableVal == "% Cap") {
            let dmgType = getInputVal("dmg-type-select")
            subModList.getMod = (l, d) => getMod(subModList, l, d);
            subModList = collapseBoosts(subModList, dmgType);
            let boostedCap = boostCap(selectedCap, subModList.getMod(MODS.dmg_cap) / 100, correctMod(subModList.getMod(MODS.dmg_cap_pen)))
            boostedCap.thresholds.splice(0, 0, 0);
            boostedCap.attenuations.splice(0, 0, 1);
            let rngs = makeSeqArray(101, (i) => (i - 50) / 1000 + 1);
            let raw = calcRaw(dmgType, subModList);
            let dmgs = rngs.map(v => {
                let newRaw = raw * v;
                if (dmgType == DMGTYPES.CA) {
                    newRaw += subModList.getMod(MODS.fixed_ca, 2000);
                }
                newRaw *= correctMod(subModList.getMod(MODS.critical));

                let percent = 0;
                for (let i = 0; i < boostedCap.thresholds.length - 1; i++) {
                    ct = boostedCap.thresholds[i];
                    nt = boostedCap.thresholds[i + 1];
                    percent += Math.min(newRaw > ct ? Math.min(newRaw,nt) - ct : 0, nt) / (nt-ct);
                }
                percent += Math.max(0, (newRaw / boostedCap.thresholds[boostedCap.thresholds.length - 1]) - 1)
                return `${Math.trunc(percent * 100)}%`;
            });
            subResults = dmgs;
        }
        else {
            subResults = calcDamage(getInputVal("dmg-type-select"), selectedCap, subModList, DMGCAPS[getInputVal("hard-cap-select")]);
        }
    }
    fillResultTable(baseResults, subResults);
}

function clearCapSel() {
    let capSel = document.querySelector("#dmg-cap-select");
    capSel.value = "";
    $(capSel).trigger("chosen:updated");
}

function findDMGCap(input) {
    let [results, checkCount, skipTypes] = calcCap(getInputVal("dmg-type-select"), makeModList(), DMGCAPS[getInputVal("hard-cap-select")], input);
    if (results.length == 1 || (results.lentgth > 1 && results[0].match > (results[1].match * 2))) {
        let cap = results[0].id;
        let capSel = document.querySelector("#dmg-cap-select");
        capSel.value = [...capSel.childNodes].find(n => n.dataset.cap == cap).innerHTML;
        $(capSel).trigger("chosen:updated");
        console.log(`Cap found: ${formatNum(simpleSoftCap(DMGCAPS[cap]))} (${cap})`);
        fillResultTable(results[0].dmgs);
        document.querySelector("#result-match-count").innerHTML += ` | Checked: ${checkCount} Caps`;
    }
    else {
        fillResultTable(new Array(101).fill(0));
        clearCapSel();
        let totalSkips = skipTypes.shortRaw + skipTypes.smallCap;
        document.querySelector("#result-match-count").innerHTML = `${(results.length > 1)? `${results.length} possible caps` : "0 possible caps"}. Double check your inputs, increase Raw, or increase observed inputs.<br>${totalSkips} skipped Caps: ${skipTypes.shortRaw} short on Raw, ${skipTypes.smallCap} below smallest observed input`;
    }
}

function modListInput() {
    inputUpdated();
    let team = document.querySelector("#saved-team-select").value;
    let saveButton = document.querySelector("#save-saved-team-button");
    saveButton.disabled = !team || team === "Empty";
    if (!saveButton.disabled) saveButton.textContent = "Save";
}

const flatModValues = [MODS.dmg_supp, MODS.ca_dmg_supp, MODS.ca_dmg_supp_sp, MODS.na_dmg_supp, MODS.na_dmg_supp_sp, MODS.skill_dmg_supp, MODS.skill_dmg_supp_sp];
function addModsTableRow(modID, gridValue = []) {
    if (!allowedMods.has(modID)) {
        console.warn(`Ignoring unsupported or already active mod: ${modID}`);
        return;
    }
    allowedMods.delete(modID);
    let table = document.querySelector("#mods-input-table");
    let cols = table.querySelector(".header-row").children.length - 1;
    let modIndex = modOrder.indexOf(modID);
    let rowIndex = [...table.rows].findIndex(existingRow =>
        existingRow.classList.contains("mod-row") && modOrder.indexOf(existingRow.id) > modIndex);
    let row = table.insertRow(rowIndex < 0 ? table.rows.length : rowIndex);
    row.id = modID;
    row.classList.add("mod-row")
    let labelCell = document.createElement("td");
    labelCell.classList.add("mods-label");
    labelCell.innerHTML = `<button class="remove-mod-row-button">X</button><img src="./assets/mod labels/${modID}.png" alt="${modID}">`;
    labelCell.querySelector(".remove-mod-row-button").onclick = () => {
        row.remove();
        allowedMods.add(modID);
        setupAddModRowSelect();
        inputUpdated();
    }
    row.appendChild(labelCell);
    if (modID == MODS.grid_critical) {
        let cell = document.createElement("td");
        cell.classList.add("mod-value");
        cell.colSpan = 3;
        cell.style.textAlign = "center";
        let input = document.createElement("input");
        input.type = "checkbox";
        input.oninput = modListInput;
        let label = document.createElement("span");
        label.textContent = "100%?";
        cell.appendChild(input);
        cell.appendChild(label);
        row.appendChild(cell);
        return;
    }
    for (let i = 0; i < cols; i++) {
        let cell = document.createElement("td");
        cell.classList.add("mod-value");
        cell.dataset.col = i;
        let input = document.createElement("input");
        input.classList.add("mod-value-input");
        if (gridValue[i] && gridValue[i] > 0) input.defaultValue = gridValue[i];
        cell.appendChild(input);
        input.oninput = modListInput;
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

function switchMode(update = true) {
    MODE = document.querySelector("#mode-select").value;
    let capSel = document.querySelector("#dmg-cap-select");
    capSel.disabled = MODE != "verify";
    if (capSel.disabled) clearCapSel();
    let subTableSel = document.querySelector("#sub-table-select");
    subTableSel.parentElement.hidden = MODE == "find";
    [...document.querySelectorAll("#cap-info-row .custom-cap-info")].forEach(inp => inp.hidden = !(MODE == "new"));
    [...document.querySelectorAll("#cap-info-row .cap-info")].forEach(inp => inp.hidden = (MODE == "new"));
    $(capSel).trigger("chosen:updated");
    if (update) inputUpdated();
}

function subTableChange(update = true) {
    let subTable = document.querySelector("#sub-table-select").value;
    customModList = {};
    [...document.querySelectorAll(".sub-table-input")].forEach(inp => inp.classList.remove("active"));
    switch (subTable) {
        case "Echo": document.querySelector("#sub-table-echo-input").classList.add("active"); break;
        case "RNG Crit": document.querySelector("#sub-table-crit-input").classList.add("active"); break;
        case "DEF Down": document.querySelector("#sub-table-def-input").classList.add("active"); break;
        case "Custom": customModList = makeModList(); break;
    }
    if (update) inputUpdated();
}

function getInputVal(eleID) {
    let val = document.querySelector(`#${eleID}`).value;
    let pval = parseFloat(val);
    return Number.isNaN(pval) ? val || 0 : pval;
}

function getCheckBox(eleID) {
    return document.querySelector(`#${eleID}`).checked;
}

function setBulletPWRVis() {
    let classSel = document.querySelector("#mc-class-select").value;
    let dmgTypeSel = document.querySelector("#dmg-type-select").value;
    document.querySelector("span:has(>#bullet-pwr-input)").hidden = !(dmgTypeSel == DMGTYPES.NA && (classSel == "Soldier" || classSel == "Gunslinger"));
}

function setupAddModRowSelect() {
    let sel = document.querySelector("#add-mod-row-select");
    sel.innerHTML = "";
    let blankOpt = document.createElement("option");
    sel.appendChild(blankOpt);
    allowedMods = sortSet(allowedMods, (a, b) => {
        return modOrder.indexOf(a) - modOrder.indexOf(b)
    });
    allowedMods.forEach(mod => {
        let opt = document.createElement("option");
        opt.textContent = mod;
        if (mod.includes("dmg cap") || mod.includes("dmg amp")) opt.dataset.search = mod.replace("dmg ", "");
        if (mod.includes("elem")) opt.dataset.search = `${mod.replace("elem", "ele")}, ${mod.replace("elem", "e")}`;
        if (mod.includes("od")) opt.dataset.search = `${mod.replace("od", "taboo")}, ${mod.replace("od", "odious")}`;
        sel.appendChild(opt);
    });
    $(sel).trigger("chosen:updated");
}

function createModRow(e) {
    addModsTableRow(e.target.value);
    setupAddModRowSelect();
    inputUpdated();
}

function displayCapInfo(e) {
    if (MODE == "new") return;
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
    let trs = [...document.querySelectorAll("#mods-input-table .mod-row")]
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
        if (row.id == MODS.grid_critical) addMod(row.id, row.querySelector("input").checked);
        else addMod(row.id, [...row.querySelectorAll("input")].map(i => parseFloat(i.value || 0)).reduce(sumArr));
    });
    //wonders
    if (getCheckBox("ele-atk-wonder-check") && getsElemATK) addMod(MODS.elem_atk, 3);
    if (getCheckBox("dmg-cap-wonder-check")) addMod(MODS.dmg_cap, 3);
    addMod(MODS.dmg_amp, getInputVal("amp-wonder-input"));
    if (getCheckBox(`${getInputVal("ally-elem-select").toLowerCase()}-yupei-check`)) {
        if (getsElemATK) addMod(MODS.elem_atk, 10);
        addMod(MODS.skill_dmg, 5);
        addMod(MODS.passive_ca_dmg, 5);
        if (seraphic) addMod(MODS.dmg_amp, 5);
        addMod(MODS.na_dmg_cap, 5);
        addMod(MODS.skill_dmg_cap, 5);
        addMod(MODS.ca_dmg_cap, 5);
    }
    if (seraphic && getCheckBox(`${getInputVal("ally-elem-select").toLowerCase()}-arcarum-ring-check`)) addMod(MODS.elem_dmg_amp, 10);
    //misc
    addMod(MODS.def_down, getInputVal("enemy-def-down-input"));
    addMod(MODS.def_up, getInputVal("enemy-def-up-input"));
    if (getCheckBox("def-down-sp-check")) addMod(MODS.sp_def_down, 10);
    if (getsElemATK) {
        addMod(MODS.crew_ship, getInputVal("crew-ship-input"));
        addMod(MODS.crew_reactor, getInputVal("crew-reactor-input"));
    }
    addMod(MODS.elem_res, getInputVal("elem-res-input"));
    addMod(MODS.echo_mod, getInputVal("echo-mod-input"));
    addMod(MODS.fixed_ca, getInputVal("fixed-ca-select"));
    addMod(MODS.base_atk, getInputVal("base-atk-input"));
    addMod(MODS.base_def, getInputVal("enemy-def-input"));
    addMod(MODS.dmg_mod, getInputVal("dmg-mod-input"));
    if ((mcClass = getInputVal("mc-class-select")) != "Non MC") {
        let cls = MCCLASS[mcClass];
        Object.keys(cls.mods).forEach(m => addMod(m, cls.mods[m]));
        if (cls.row < 5) for (let m in mList = MCCLASS["Non-Row V"].mods) addMod(m, mList[m]);
        for (let m in mList = MCCLASS["Class Completion"].mods) addMod(m, mList[m]);
        if (mcClass == "Gunslinger" || mcClass == "Soldier") addMod(MODS.bullet_pwr, getInputVal("bullet-pwr-input"));
    }
    else {
        let awkSel = document.querySelector("#char-awk-select");
        switch (awkSel.value) {
            case "Balanced":
                addMod(MODS.passive_ca_dmg, 20);
                break;
            case "Attack":
                addMod(MODS.passive_ca_dmg, 25);
                addMod(MODS.ca_dmg_cap, 15);
                break;
            case "Multiattack":
                addMod(MODS.na_dmg_cap, 5);
                addMod(MODS.na_dmg_amp, 5);
                break;
        }
        if (getCheckBox("perp-wonder-check")) addMod(MODS.perpetuity, 10);
        if (getCheckBox("perp-ring-check")) {
            addMod(MODS.perpetuity, 10);
            addMod(MODS.dmg_cap, 5);
        }
    }
    [...activeStatuses].forEach(status => {
        for (let m in mList = STATUSES[status].mods) addMod(m, mList[m]);
    });

    if (dmgElem == ELEMS.Plain) modList[MODS.elem_atk] = 0;
    return modList;
}

window.onload = () => {
    document.querySelectorAll("input, textarea").forEach(input => {
        let handler = inputUpdated;
        switch (input.id) {
            case "base-atk-input":
            case "dmg-mod-input":
                input.value = "";
                input.classList.toggle("empty", input.value == "");
                handler = () => {
                    input.classList.toggle("empty", input.value == "");
                    inputUpdated();
                };
                break;
        }
        input.value = input.defaultValue;
        input.addEventListener("input", handler);
    });
    document.querySelectorAll("select").forEach(select => {
        if (select.id == "saved-team-select") return;
        let handler = inputUpdated;
        switch (select.id) {
            case "mode-select": handler = switchMode; break;
            case "sub-table-select": handler = subTableChange; break;
            case "add-mod-row-select": handler = createModRow; break;
            case "dmg-type-select": handler = dmgTypeChange; break;
            case "add-status-col-select": handler = statusSelectChanged; break;
            case "mc-class-select": handler = classChange; break;
            case "ally-elem-select":
                select.value = "Fire";
                handler = () => {
                    select.dataset.value = select.value;
                    inputUpdated();
                };
                break;
        }
        $(select).on("change", handler);
    });
    document.querySelector("#char-emp-import-button").onclick = importCharEMPS;
    setupResultTable();
    setupDMGCapSelect();
    setupModsTableRows();
    subTableChange(false);
    dmgTypeChange(false);
    switchMode(false);
    setupAddModRowSelect();
    setupStatusSelect();
    setupSaveTeamControls();
    setupClassSelect();
    [...document.querySelectorAll(".wonder-input")].forEach(inp => {
        let prop;
        let event;
        switch (inp.type) {
            case "text": prop = "value"; event = "input"; break;
            case "checkbox": prop = "checked"; event = "change"; break;
        }
        let id = inp.id.replace("-input", "").replace("-check", "");
        inp[prop] = getLocalStor(id, inp[prop]);
        inp.addEventListener(event, (e) => setLocalStor(id, inp[prop]));
    });
    inputUpdated();
    $(".chosen-select").chosen({ width: "175px" });
    setupDMGCapContextMenu();
    document.querySelectorAll(".chosen-select").forEach(enableChosenAliasSearch);
}