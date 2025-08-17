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

const convertTableToTemplate = (tableText) => {
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
};

window.onload = e => {
    document.querySelector("#convert-button").onclick = (e) => {
        document.querySelector("#output-textarea").value =
            convertTableToTemplate(document.querySelector("#input-textarea").value)
    }
}