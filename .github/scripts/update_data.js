import { writeFileSync, existsSync, readFileSync } from 'fs';
import { get } from 'https';
import { config } from 'dotenv';
import sharp from 'sharp';

// Load environment variables from .env file (only in local development)
if (process.env.NODE_ENV !== 'production') {
    config();
}

const USER_AGENT = process.env.USER_AGENT;

let downloadlist = [];

const urls = {
    summons: "https://gbf.wiki/index.php?title=Special:CargoExport&format=json&limit=5000&tables=summons&fields=id%2C_pageName%3DpageName%2Cname%2Cevo_max%3DmaxUncap%2Crarity%2Celement%2Cseries%2Cjpname&formatversion=2",
    characters: "https://gbf.wiki/index.php?title=Special:CargoExport&format=json&limit=5000&tables=characters&fields=_pageName%3DpageName%2Cid%2Cseries%2Cstyle_name%3DstyleName%2Cstyle_id%3DstyleId%2Cjpname%2Cname%2Crelease_date%3DreleaseDate%2Cgender%2Cobtain%2C5star_date%3DflbDate%2Cmax_evo%3DmaxUncap%2Cexpedition_type%3DexpeditionType%2Crarity%2Celement%2Ctype%2Ccustomtype%2Crace%2Cjoin_weapon%3DrecruitWeapon%2Cweapon%2Cart_ex%3Dartex%2Cart_bonus%3Dartbonus%2Cgender%2Ccharid&formatversion=2",
    weapons: "https://gbf.wiki/index.php?title=Special:CargoExport&format=json&limit=5000&tables=weapons&fields=id%2C_pageName%3DpageName%2Cevo_max%3DmaxUncap%2Crarity%2Cseries%2Celement%2Ccharacter_unlock%3Dcharacter%2Ctype%2Cawakening%2Cawakening_type1%3DawakeningType1%2Cawakening_type2%3DawakeningType2%2Cs1_icon%3Ds1Icon%2Cs2_icon%3Ds2Icon%2Cs3_icon%3Ds3Icon%2Cs1_name%3Ds1Name%2Cs2_name%3Ds2Name%2Cs3_name%3Ds3Name%2Cjpname&formatversion=2",
    abilities: "https://gbf.wiki/index.php?title=Special:CargoExport&format=json&limit=5000&tables=class_skill&fields=ix%2Cname%2C&formatversion=2"
};

const files = {
    characters: [
        { query: "characters", file: "characters.json" },
        { query: "minCharacters", file: "characters-min.json" }
    ],
    summons: [
        { query: "summons", file: "summons.json" },
        { query: "minSummons", file: "summons-min.json" }
    ],
    weapons: [
        { query: "weapons", file: "weapons.json" },
        { query: "minWeapons", file: "weapons-min.json" }
    ],
    abilities: [
        { query: "abilities", file: "abilities.json" }
    ]
};

const jqQueries = {
    summons: data => data.map(item => ({
        [item.id]: {
            pageName: item.pageName.replace(/&#039;/g, "'"),
            name: item.name.replace(/&#039;/g, "'"),
            maxUncap: item.maxUncap,
            rarity: item.rarity,
            element: item.element,
            series: item.series,
            jpname: item.jpname
        }
    })).reduce((acc, curr) => Object.assign(acc, curr), {}),
    minSummons: data => data.map(item => ({
        [item.id]: {
            pageName: item.pageName.replace(/&#039;/g, "'"),
            name: item.name.replace(/&#039;/g, "'"),
            maxUncap: item.maxUncap
        }
    })).reduce((acc, curr) => Object.assign(acc, curr), {}),
    characters: data => data.map(item => {
        if (item.id != 3030182000) {
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/zoom/${item.id}_01.png`, `./assets/characters/full/${item.id}_01`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/zoom/${item.id}_02.png`, `./assets/characters/full/${item.id}_02`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/quest/${item.id}_01.jpg`, `./assets/characters/tall/${item.id}_01`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/quest/${item.id}_02.jpg`, `./assets/characters/tall/${item.id}_02`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/m/${item.id}_01.jpg`, `./assets/characters/icon/${item.id}_01`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/m/${item.id}_02.jpg`, `./assets/characters/icon/${item.id}_02`);

            downloadImage(`https://media.skycompass.io/assets/customizes/characters/1138x1138/${item.id}_01.png`, `./assets/characters/skycompass/${item.id}_01`);
            downloadImage(`https://media.skycompass.io/assets/customizes/characters/1138x1138/${item.id}_02.png`, `./assets/characters/skycompass/${item.id}_02`);
            if (item.maxUncap >= 5) {
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/zoom/${item.id}_03.png`, `./assets/characters/full/${item.id}_03`);
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/quest/${item.id}_03.jpg`, `./assets/characters/tall/${item.id}_03`);
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/m/${item.id}_03.jpg`, `./assets/characters/icon/${item.id}_03`);
            }
            if (item.maxUncap >= 6) {
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/zoom/${item.id}_04.png`, `./assets/characters/full/${item.id}_04`);
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/quest/${item.id}_04.jpg`, `./assets/characters/tall/${item.id}_04`);
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/m/${item.id}_04.jpg`, `./assets/characters/icon/${item.id}_04`);
            }
            if (item.artbonus != null) {
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/zoom/${item.id}_91.png`, `./assets/characters/full/${item.id}_91`);
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/quest/${item.id}_91.png`, `./assets/characters/full/${item.id}_91`);
                downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/m/${item.id}_91.png`, `./assets/characters/full/${item.id}_91`);
            }
        }
        return {
            [item.id]: {
                pageName: item.pageName.replace(/&#039;/g, "'"),
                name: item.name.replace(/&#039;/g, "'"),
                maxUncap: item.maxUncap,
                rarity: item.rarity,
                element: item.element.trim(),
                series: item.series,
                styleName: item.styleName,
                styleId: item.styleId,
                jpname: item.jpname,
                releaseDate: item.releaseDate,
                gender: item.gender,
                obtain: item.obtain,
                flbDate: item.flbDate,
                expeditionType: item.expeditionType,
                type: item.type.trim(),
                customType: item.customType,
                race: item.race.map(r => r.trim()),
                recruitWeapon: item.recruitWeapon ? item.recruitWeapon.replace(/&#039;/g, "'") : null,
                weapon: item.weapon.map(w => w.trim()),
                artbouns: item.artbouns ? true : false,
                artex: item.artex ? true : false,
                gender: item.gender,
                charid: item.charid
            }
        }
    }).reduce((acc, curr) => Object.assign(acc, curr), {}),
    minCharacters: data => data.map(item => ({
        [item.id]: {
            pageName: item.pageName.replace(/&#039;/g, "'")
        }
    })).reduce((acc, curr) => Object.assign(acc, curr), {}),
    weapons: data => data.map(item => ({
        [item.id]: {
            pageName: item.pageName.replace(/&#039;/g, "'"),
            maxUncap: item.maxUncap,
            rarity: item.rarity,
            series: item.series,
            element: item.element,
            character: item.character,
            skill1: {
                name: item.s1Name ? item.s1Name.replace(/&#039;/g, "'") : null,
                icon: item["s1Icon"],
            },
            skill2: {
                name: item.s2Name ? item.s2Name.replace(/&#039;/g, "'") : null,
                icon: item["s2Icon"],
            },
            skill3: {
                name: item.s3Name ? item.s3Name.replace(/&#039;/g, "'") : null,
                icon: item["s3Icon"],
            },
            type: item.type,
            awakening: item.awakening,
            awakeningType1: item.awakeningType1,
            awakeningType2: item.awakeningType2,
            jpname: item.jpname
        }
    })).reduce((acc, curr) => Object.assign(acc, curr), {}),
    minWeapons: data => data.map(item => ({
        [item.id]: {
            maxUncap: item.maxUncap
        }
    })).reduce((acc, curr) => Object.assign(acc, curr), {}),
    abilities: data => data.map(item => ({
        [item.name.replace(/&#039;/g, "'")]: {
            ix: item.ix,
        }
    })).reduce((acc, curr) => Object.assign(acc, curr), {})
};

async function fetchData(url) {
    let data = [];
    await fetch(url, {
        headers: {
            "User-Agent": USER_AGENT
        }
    })
        .then(response => response.json())
        .then(response => data = response)
        .catch(error => console.log(error));
    return data;
}

async function processData() {
    for (const [key, url] of Object.entries(urls)) {
        console.log(`Fetching ${key}...`);
        let data = await fetchData(url);
        files[key].forEach(f => {
            let query = jqQueries[f.query](data);
            writeFileSync(f.file, JSON.stringify(query, null, 2));
            console.log(`Saved ${f.file}.`);
        })
    }
}

function downloadImage(srcLink, destinationFile) {
    if (existsSync(`${destinationFile}.webp`)) {
        return;
    }
    downloadlist.push(async () => {
        get(srcLink, (res) => {
            let data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', async () => {
                const buffer = Buffer.concat(data);
                // Convert to webp using sharp
                try {
                    await sharp(buffer)
                        .webp()
                        .toFile(`${destinationFile}.webp`);
                    console.log(`New image: ${destinationFile}`);
                } catch (err) {
                    console.error(`Error converting image ${destinationFile}:`, err);
                }
            });
        }).on('error', (err) => {
            console.error('Error downloading image:', err);
        });
    });
}

// Update json files

await processData().catch(err => {
    console.error('Error processing data:', err);
    process.exit(1);
});

// Update character sorter datasets

let characterFilePath = "./characters.json";
let sorterDataPath = "./sorter/src/js/data/";
let overhead = `dataSet[dataSetVersion] = {};

dataSet[dataSetVersion].options = [
    {
		name: "Filter by Rarity",
		key: "rarity",
		checked: true,
		sub: [
			{ name: "SSR", key: "SSR" },
			{ name: "SR", key: "SR", checked: false },
			{ name: "R", key: "R", checked: false }
		]
	},
	{
		name: "Filter by Series",
		key: "series",
		checked: true,
		sub: [
			{ name: "Summer", key: "summer" },
			{ name: "Yukata", key: "yukata" },
			{ name: "Valentine", key: "valentine" },
			{ name: "Halloween", key: "halloween" },
			{ name: "Holiday", key: "holiday" },
			{ name: "Formal", key: "formal" },
			{ name: "12 Generals", key: "12generals" },
			{ name: "Grand", key: "grand" },
			{ name: "Fantasy", key: "fantasy" },
			{ name: "Collab", key: "tie-in", checked: false },
			{ name: "Eternals", key: "eternals" },
			{ name: "Evokers", key: "evokers" },
			{ name: "4 Saints", key: "4saints" },
			{ name: "None", key: "none" },
		]
	},
	{
		name: "Filter by Element",
		key: "element",
        checked: false,
		sub: [
			{name: "Fire", key: "Fire"},
			{name: "Water", key: "Water"},
			{name: "Earth", key: "Earth"},
			{name: "Wind", key: "Wind"},
			{name: "Light", key: "Light"},
			{name: "Dark", key: "Dark"},
		]
	},
	{
		name: "Filter by Race",
		key: "race",
        checked: false,
		sub: [
			{name: "Human", key: "Human"},
			{name: "Erune", key: "Erune"},
			{name: "Draph", key: "Draph"},
			{name: "Harvin", key: "Harvin"},
			{name: "Primal", key: "Primal"},
			{name: "Other", key: "Other"},
		]
	},
    {
		name: "Filter by Gender",
		key: "gender",
        checked: false,
		sub: [
			{name: "Male", key: "m"},
			{name: "Female", key: "f"},
			{name: "Other", key: "o"},
		]
	},
	{
        name: "Filter to Unique",
        key: "unique",
		checked: false,
		tooltip: "This will filter the options to be non-seasonal versions of characters unless that character only has 1 seasonal playable. You should leave this unchecked unless you have all or almost all other filters enabled."
    },
];`

let characterData;
let latestCount;
characterData = JSON.parse(readFileSync(characterFilePath, "utf8"));
latestCount = readFileSync(sorterDataPath + "latest-count", "utf-8");
if (Object.keys(characterData).length != latestCount) {
    let date = new Date();
    let dataDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + (date.getDate() + 1)).slice(-2)}`;
    console.log(`Writing new dataset for ${dataDate}`);
    let formattedData = [];
    for (const id in characterData) {
        let char = characterData[id];
        let series = char.series ? char.series.split(",") : ["none"];
        formattedData.push({
            name: char.pageName,
            img: `full/${id}_01.webp`,
            img2: `icon/${id}_01.webp`,
            opts: {
                rarity: [char.rarity],
                series: series,
                element: [char.element],
                gender: [char.gender],
                race: char.race,
                unique: (char.pageName.includes(" (") && Object.values(characterData).filter(c => c.name == char.name).length != 1) || typeof (char.charid) != "number"
            }
        });
    }
    let pageHTML = readFileSync("./sorter/index.html", "utf8");
    let splitHTML = pageHTML.split(/<!--Datasets-->[\s\S]+?<!--End Datasets-->/);
    let datasets = pageHTML.match(/<!--Datasets-->[\s\S]+?<!--End Datasets-->/)[0];
    datasets = datasets.replace("<!--End Datasets-->", `<script src="src/js/data/${dataDate}.js"></script>\n\t<!--End Datasets-->`);
    pageHTML = splitHTML[0] + datasets + splitHTML[1];
    writeFileSync("./sorter/index.html", pageHTML);
    writeFileSync(sorterDataPath + "latest-count", Object.keys(characterData).length.toString());
    writeFileSync(`${sorterDataPath}${dataDate}.js`, `dataSetVersion = "${dataDate}";
${overhead}

dataSet[dataSetVersion].characterData = ${JSON.stringify(formattedData)};`);
}

// Download images
(function resolveDownloads(i) {
    setTimeout(() => {
        if (i < downloadlist.length) {
            downloadlist[i]();
            resolveDownloads(i + 1)
        }
    }, 100);
})(0)