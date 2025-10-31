dataSetVersion = "2025-10-32";
dataSet[dataSetVersion] = {};

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
];

dataSet[dataSetVersion].characterData = [];