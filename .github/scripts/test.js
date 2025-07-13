import { writeFileSync, existsSync, readFileSync } from 'fs';
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
		checked: true,
		tooltip: "This will filter the options to be non-seasonal versions of characters unless that character only has 1 seasonal playable"
    },
];`

let characterData;
let latestCount;
characterData = JSON.parse(readFileSync(characterFilePath, "utf8"));
latestCount = 0
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
            img: `${id}_01.webp`,
            opts: {
                rarity: [char.rarity],
                series: series,
                element: [char.element],
                gender: [char.gender],
                race: char.race,
                unique: (char.pageName.includes(" (") && Object.values(characterData).filter(c=>c.name==char.name).length != 1) || typeof(char.charid) != "number"
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