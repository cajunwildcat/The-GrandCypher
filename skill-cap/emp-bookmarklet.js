let goodMods = ["Supplemental DMG", "Skill DMG Cap", "Skill DMG", "Stamina", "Enmity", "C.A. DMG", "C.A. DMG Cap", "Fire ATK", "Water ATK", "Earth ATK", "Wind ATK", "Light ATK", "Dark ATK", "DMG Cap", "Normal Attack DMG", "Supp. C.A. DMG", "Special C.A. DMG Cap", "Supp. Skill DMG", "N.A. DMG Amplify", "C.A. DMG Amplify"];
navigator.clipboard.writeText(JSON.stringify([
    ["perp-ring", Game.view.npcaugmentData.constant_id == "10", "perp-ring"], 
    ...Game.view.npcaugmentData.param_data.filter(pd => goodMods.includes(pd.type.name.trim())).map(pd => [pd.type.name.trim(),pd.param.total_param, "ring"]), 
    ...([...document.querySelectorAll("#prt-extend-numbers-list .txt-bonus-name")].map(n => [...(n.textContent.split(" +").map(e=>e.trim().replaceAll("%",""))), "radiance"]).filter(n => goodMods.includes(n[0]))), 
    ...Game.view.bonusListModel.attributes.bonus_list.filter(b => goodMods.includes(b.name.trim())).map(b => [b.name.trim(), b.bonus[b.current_level], "emp"])]));
alert("Copied EMPs to Clipboard.");