const getSubstringFromNInstance = (str, char, N = 3) => {
    // Initialize the position for searching and the count of occurrences
    let position = -1;

    // Loop to find the index of the third occurrence of the character
    for (let i = 0; i < N; i++) {
        position = str.indexOf(char, position + 1);
        if (position === -1) break; // If the character is not found, exit the loop
    }

    // If the third occurrence is found, return the substring starting from it
    if (position !== -1) {
        return str.substring(position + 1);
    } else {
        // Return an empty string or null if the third occurrence is not found
        return '';
    }
};

/* const convertTableToTemplate = (tableText) => {
    tableText = tableText.substring(tableText.indexOf("|-")).replace(`|}`, "");
    // Split the input into rows based on the MediaWiki table row delimiter "|-"
    let rows = tableText.split("|-").filter(i => i.trim() != "");

    // Iterate over each row
    rows = rows.map((row, index) => {
        let info = row.split("\n|").filter(i => i.trim() != "");
        console.log(info);
        
        let wep = info[0].match(/(i|I)tm\|[^|]+\|/);
        if (wep) wep = "|weapon=" + wep[0].split("|")[1];
        else {
            wep = info[0].match(/{{.+}}/);
            if (!wep) wep = info;
            wep = "|customweapon=" + wep[0];
        }
        
        let i = 1;
        let rank;
        if (info.length > 3) {
            rank = "|rank=" + info[i].match(/'''.+'''/)[0].replaceAll("'''", "");
            i++;
        }
        let copies = "|copies=" + info[i].substring(info[i].indexOf("|") + 1).replaceAll("'''", "").trim();
        i++;
        let notes = "|notes=" + info[i].substring(info[i].indexOf("|") + 1).trim();

        return `{{Advanced Grids/WeaponTable/Row
${wep}${rank? "\n"+rank : ""}
${copies}
${notes}
}}`
    });

    // Join all sections into the final output
    return `{{Advanced Grids/WeaponTable|color=core|\n${rows.join("\n\n")}\n}}`;
}; */

function convertTeamSpread(input) {
    let team = input.match(/\|team={{Team(.|\n)+}}\W?\|weapons=/)[0];
    team = team.replace("|team={{Team\n", "").replace(/}}\W?\|weapons=/, "");
    team.match(/\|\w+\d=/g).forEach(k => {
        k = k.slice(1,-1)
        if (!k.includes("class") && !k.includes("skill") && !k.includes("char")) {
            let n = k.slice(-1);
            team = team.replace(k, k.replace(n, `char${n}`));
        }
    });
    ["artsupport","artmain","transmain","transsupport"].forEach(k=>{
        let t = team.match(new RegExp(String.raw`\|${k}=(\w|\d)+`,'g'))
        if (!t) return;
        t = t[0];
        team = team.replace(t, "");
    })
    let mainS = team.match(/\|main=.+\n/)[0];
    let suppS = team.match(/\|support=.+\n/)[0];
    team = team.replace(mainS, "");
    team = team.replace(suppS, "");

    let weapon = input.match(/\|weapons={{(.|\n)+}}\W?\|summons=/)[0];
    weapon = weapon.replace("|weapons={{WeaponGridSkills\n","").replace(/}}\W?\|summons=/,"")
    let summon = input.match(/\|summons={{(.|\n)+}}\n}}/)[0];
    summon = summon.replace("|summons={{SummonGrid\n","","").replace("}}\n}}","");
    summon = summon.replace(/\|main=.+\n/, "");
    summon.match(/\|\w+\d=/g).forEach(k => {
        k = k.slice(1,-1)
        if (!["s1", "s2", "s3", "s4", "sub1", "sub2"].includes(k)) {
            let n = k.slice(-1);
            summon = summon.replace(k, k.replace(n, `s${n}`));
        }
    });

    return ["{{TeamSpread",
        "\n",
        team,
        "\n",
        weapon,
        "\n",
        mainS,
        suppS,
        summon,
        "\n|comments=\n|source=\n|rotation=\n}}"
].join("");
}

window.onload = e => {
    document.querySelector("#convert-button").onclick = (e) => {
        document.querySelector("#output-textarea").value =
            convertTeamSpread(document.querySelector("#input-textarea").value)
    }
}