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
    abilities: "https://gbf.wiki/index.php?title=Special:CargoExport&format=json&limit=5000&tables=class_skill&fields=ix%2Cname%2Cicon%2Cunique_key%3Did&formatversion=2",
    classes: "https://gbf.wiki/index.php?title=Special:CargoExport&format=json&limit=5000&tables=classes&fields=name%2Cjpname%2Cid_num%3Did%2Cid%3Dimgid&formatversion=2",
};

const files = {
    characters: [
        { query: "characters", file: "characters.json" },
    ],
    summons: [
        { query: "summons", file: "summons.json" },
    ],
    weapons: [
        { query: "weapons", file: "weapons.json" },
    ],
    abilities: [
        { query: "abilities", file: "abilities.json" },
    ],
    classes: [
        { query: "classes", file: "classes.json" }
    ]
};

const jqQueries = {
    summons: data => data.map(item => {
        addImageDownload(item.id, "summon");
        if (item.maxUncap >= 5) addImageDownload(item.id + "_02", "summon");
        if (item.maxUncap >= 6) addImageDownload(item.id + "_04", "summon");

        return {
            [item.id]: {
                pageName: item.pageName.replace(/&#039;/g, "'"),
                name: item.name.replace(/&#039;/g, "'"),
                maxUncap: item.maxUncap,
                rarity: item.rarity,
                element: item.element,
                series: item.series,
                jpname: item.jpname
            }
        }
    }).reduce((acc, curr) => Object.assign(acc, curr), {}),

    characters: data => data.map(item => {
        addImageDownload(item.id + "_01", "character");
        if (item.maxUncap >= 5) addImageDownload(item.id + "_03", "character");
        if (item.maxUncap >= 6) addImageDownload(item.id + "_04", "character");

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

    weapons: data => data.map(item => {
        addImageDownload(item.id, "weapon");
        if (item.maxUncap >= 6) {
            addImageDownload(item.id + "_02", "weapon");
            addImageDownload(item.id + "_03", "weapon");
        }

        return {
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
        }
    }).reduce((acc, curr) => Object.assign(acc, curr), {}),

    abilities: data => data.map(item => ({
        [item.name.replace(/&#039;/g, "'")]: {
            ix: item.ix,
            id: item.id,
            icon: item.icon
        }
    })).reduce((acc, curr) => Object.assign(acc, curr), {}),

    classes: data => data.map(item => ({
        [item.name.replace(/&#039;/g, "'")]: {
            id: item.id,
            imgid: item.imgid,
            jpname: item.jpname
        }
    })).reduce((acc, curr) => Object.assign(acc, curr), {})
};

const ERROR_LOG_FILE = './assets/error_log.json';

function loadErrorLog() {
    if (existsSync(ERROR_LOG_FILE)) {
        try {
            return JSON.parse(readFileSync(ERROR_LOG_FILE, 'utf-8'));
        } catch {
            return {};
        }
    }
    return {};
}

function saveErrorLog(errorLog) {
    writeFileSync(ERROR_LOG_FILE, JSON.stringify(errorLog, null, 2));
}

function addToErrorLog(destinationFile) {
    const errorLog = loadErrorLog();
    if (!errorLog[destinationFile]) {
        errorLog[destinationFile] = new Date().toISOString();
        saveErrorLog(errorLog);
    }
}

function isInErrorLog(destinationFile) {
    const errorLog = loadErrorLog();
    return errorLog.hasOwnProperty(destinationFile);
}

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

function addImageDownload(itemID, itemType) {
    switch (itemType) {
        case "character":
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/s/${itemID}.jpg`, `./assets/characters/square/${itemID}`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/npc/quest/${itemID}.jpg`, `./assets/characters/tall/${itemID}`);
            break;
        case "summon":
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/summon/party_main/${itemID}.jpg`, `./assets/summons/party_main/${itemID}`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/summon/party_sub/${itemID}.jpg`, `./assets/summons/party_sub/${itemID}`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/summon/m/${itemID}.jpg`, `./assets/summons/icon/${itemID}`);
            break;
        case "weapon":
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/weapon/m/${itemID}.jpg`, `./assets/weapons/icon/${itemID}`);
            downloadImage(`https://prd-game-a-granbluefantasy.akamaized.net/assets_en/img/sp/assets/weapon/ls/${itemID}.jpg`, `./assets/weapons/mainhand/${itemID}`);
            break;
    }
}

function downloadImage(srcLink, destinationFile) {
    if (existsSync(`${destinationFile}.webp`)) {
        return;
    }
    if (isInErrorLog(destinationFile)) {
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
                    console.error(`Error converting image ${srcLink}:`, err);
                    addToErrorLog(destinationFile);
                }
            });
        }).on('error', (err) => {
            console.error('Error downloading image:', err);
            addToErrorLog(destinationFile);
        });
    });
}

// Update json files
await processData().catch(err => {
    console.error('Error processing data:', err);
    process.exit(1);
});

// Download images
(function resolveDownloads(i) {
    setTimeout(() => {
        if (i < downloadlist.length) {
            downloadlist[i]();
            resolveDownloads(i + 1)
        }
    }, 100);
})(0)