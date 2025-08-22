window.onload = e => {
    document.querySelector("#convert-button").onclick = e => {
        const input = document.querySelector("#input-textarea");
        const output = document.querySelector("#output-textarea");

        let walkData = JSON.parse(input.value);
        input.value = "";
        output.value = walkData.map(i => {
            let kind, num, id;
            switch (i.item_kind) {
                case "4": kind = "p"; break;
                case "7": kind = "rupie"; id = ""; break;
                case "10": kind = "i"; break;
                case "17": kind = "gold book"; id = ""; break;
                case "19": kind = "cp"; id = ""; break;
                case "73": kind = "ring"; break;
                case "89": kind = "awk"; break;
                default:
                    if (i.chapter_id) {
                        kind = i.img_path.split("/sign_")[1].replace(".png", "").replace("hell_", "nm");
                        id = "";
                        num = 1;
                    }
                    else {
                        num = 1;
                        id = "";
                        switch (i.type) {
                            case 3: kind = "no zone"; break;
                            case 9: kind = "route split"; break;
                            case 10: kind = "minigame"; break;
                            case 12: kind = "Tsuchinoko"; break;
                        }
                    }
                    break;
            }
            if (num == undefined) num = i.item_num;
            if (id == undefined) id = i.item_id;
            return `${kind}${id}\t${num}`;
        }).join("\n");
    }
}