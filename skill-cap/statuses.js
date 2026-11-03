const STATUSES = {
    "Zen": {
        source: "Nehan",
        img: "Status 3121",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_supp]: 50000
        }
    },
    "Star Sanctuary": {
        source: "Europa",
        img: "Status Star Sanctuary 1",
        mods: {
            [MODS.perpetuity]: 15
        }
    },
    "Achillea": {
        source: "Adam",
        img: "status_7483",
        mods: {
            [MODS.perpetuity]: 30
        }
    },
    "Noble Order": {
        source: "Charlotta (Grand)",
        img: "status_7507",
        mods: {
            [MODS.perpetuity]: 20
        }
    },
    "Magic Rebirth": {
        source: "Fif",
        img: "status_6166_2",
        mods: {
            [MODS.perpetuity]: 50
        }
    },
    "Honorary Bloodkin": {
        source: "Veight",
        img: "status_7558",
        mods: {
            [MODS.perpetuity]: 20
        }
    },
    "My Power Is Yours": {
        source: "Lyria (Event)",
        img: "status_1001",
        mods: {
            [MODS.perpetuity]: 30
        }
    },
    "Vibhuti": {
        source: "Shiva",
        img: "status_7525",
        mods: {
            [MODS.buff_critical]: 20
        }
    },
    "Glowing Alster": {
        source: "Seruel (Holiday)",
        img: "Status_Glowing Alster",
        mods: {
            [MODS.buff_critical]: 20
        }
    },
    "Snuggle Bunny": {
        source: "Makura (Valentine)",
        img: "status_7149",
        mods: {
            [MODS.buff_critical]: 30,
            [MODS.na_dmg_supp]: 50000
        }
    },
    "Auxiliary": {
        source: "Adam",
        img: "status_3175_1",
        mods: {
            [MODS.passive_ca_dmg]: 30,
            [MODS.ca_dmg_cap]: 10,
        }
    },
    "Aura der Heiterkeit": {
        source: "Aglovale (Yukata)",
        img: "status_7971",
        mods: {
            [MODS.dmg_supp]: 30000,
            // Range: 60%-20%; reassess later.
            [MODS.strength]: 60,
        }
    },
    "Unfathomable Mastery": {
        source: "Aletheia (Dark)",
        img: "status_7354",
        mods: {
            [MODS.buff_critical]: 20,
            [MODS.dmg_supp]: 50000,
        }
    },
    "Radiance of Splendor": {
        source: "Amaterasu",
        img: "status_7469",
        mods: {
            [MODS.skill_dmg_supp]: 50000,
        }
    },
    "Infinite Diversity": {
        source: "Andira",
        img: "Status_Infinite Diversity",
        mods: {
            [MODS.perpetuity]: 20,
        }
    },
    "Infinite Diversity (Summer)": {
        source: "Andira (Summer)",
        img: "Status_Infinite Diversity",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "Hidden Tiger, Crouching Dragon": {
        source: "Anila",
        img: "Status Sheep",
        mods: {
            [MODS.buff_critical]: 30,
            [MODS.normal_might]: 50,
        }
    },
    "Daemon Recall": {
        source: "Anne",
        img: "status_7442",
        mods: {
            [MODS.perpetuity]: 50,
        }
    },
    "Protector's Obsidian Sword": {
        source: "Apollonia (Summer)",
        img: "status_7565",
        mods: {
            [MODS.perpetuity]: 50,
            [MODS.dmg_supp]: 50000,
        }
    },
    "Crimson Assault": {
        source: "Asuka & Unit 02",
        img: "status_3370",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 25,
        }
    },
    "Tornado of Passion": {
        source: "Atman (Summer)",
        img: "status_7457",
        mods: {
            [MODS.sp_ca_dmg_cap]: 30,
        }
    },
    "Adagio": {
        source: "Augusta (Promo)",
        img: "Status ConcertoEarth",
        mods: {
            [MODS.elem_atk]: 45,
        }
    },
    "Tesshin": {
        source: "Azusa",
        img: "status_7239",
        mods: {
            [MODS.buff_critical]: 20,
        }
    },
    "Ashen Strife": {
        source: "Bennu (Holiday)",
        img: "status_6764",
        mods: {
            [MODS.buff_critical]: 100,
        }
    },
    "Enlightenment Embraced": {
        source: "Bhadra",
        img: "status_3416",
        mods: {
            [MODS.skill_dmg]: 50,
            [MODS.skill_dmg_cap]: 20,
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Well-Gone Guardian": {
        source: "Bhaisa",
        img: "status_7327",
        mods: {
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Guardianship": {
        source: "Black Knight",
        img: "Status Guardianship",
        mods: {
            [MODS.passive_ca_dmg]: 30,
            [MODS.dmg_cap]: 20,
            // Range: 15%-45%; reassess later.
            // Verify this modifier classification.
            [MODS.jammed]: 45,
        }
    },
    "Unwavering Conviction": {
        source: "Black Knight and Orchis",
        img: "",
        mods: {
            // Verify this modifier classification.
            [MODS.perpetuity]: 50,
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "Reversed Ouroboros": {
        source: "Cagliostro",
        img: "Status Reversed Ouroboros",
        mods: {
            [MODS.normal_might]: 10,
        }
    },
    "Reversed Ouroboros+": {
        source: "Cagliostro",
        img: "Status Reversed Ouroboros",
        mods: {
            [MODS.normal_might]: 30,
        }
    },
    "Eternal Ouroboros": {
        source: "Cagliostro (Grand)",
        img: "Status_7077",
        mods: {
            [MODS.passive_ca_dmg]: 100,
            [MODS.ca_dmg_cap]: 50,
            [MODS.sp_ca_dmg_cap]: 30,
        }
    },
    "Reversed Ouroboros (Halloween)": {
        source: "Cagliostro (Halloween)",
        img: "Status Reversed Ouroboros",
        mods: {
            [MODS.normal_might]: 30,
        }
    },
    "Submerged Ouroboros": {
        source: "Cagliostro (Summer)",
        img: "Status Submerged Ouroboros",
        mods: {
            [MODS.normal_might]: 50,
        }
    },
    "Alchemical Brilliance": {
        source: "Cagliostro and Clarisse",
        img: "status_6891",
        mods: {
            [MODS.buff_critical]: 30,
        }
    },
    "Instantaneity": {
        source: "Cain (Grand)",
        img: "Status_Instantaneity",
        mods: {
            [MODS.normal_might]: 30,
        }
    },
    "Smokin' Aid": {
        source: "Catherine (Wind)",
        img: "status_3227",
        mods: {
            [MODS.perpetuity]: 20,
        }
    },
    "Moophoric": {
        source: "Catura",
        img: "status_7796",
        mods: {
            [MODS.passive_ca_dmg]: 30,
            [MODS.ca_dmg_cap]: 10,
        }
    },
    "Moostletoe": {
        source: "Catura (Holiday)",
        img: "status_7493",
        mods: {
            [MODS.elem_atk]: 50,
        }
    },
    "Frilly 'n' Plucky": {
        source: "Chichiri (Water)",
        img: "status_6488",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "High of the Tiger": {
        source: "Cidala",
        img: "status_7774",
        mods: {
            [MODS.na_dmg_amp]: 20,
            [MODS.skill_dmg_amp]: 20,
        }
    },
    "A Girl's Gotta Have Guts!": {
        source: "Clarisse (Summer)",
        img: "status_7420",
        mods: {
            [MODS.perpetuity]: 10,
            [MODS.dmg_cap]: 5,
        }
    },
    "Monster Time": {
        source: "Constance",
        img: "status_6512",
        mods: {
            [MODS.perpetuity]: 50,
            [MODS.skill_dmg]: 100,
            [MODS.skill_dmg_cap]: 50,
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "A True Man's Pride": {
        source: "Darydara",
        img: "status_3378",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.buff_critical]: 20,
        }
    },
    "Jewel Glitz": {
        source: "De La Fille (Summer)",
        img: "Status Jewel Glitz",
        mods: {
            [MODS.normal_might]: 50,
        }
    },
    "Tlepilli Glow": {
        source: "Diantha (Summer)",
        img: "Status Tlepilli Glow",
        mods: {
            [MODS.normal_might]: 30,
        }
    },
    "Eight-Life's Pilgrimage": {
        source: "Eahta",
        img: "status_Eight-Life's Pilgrimage",
        mods: {
            [MODS.sp_ca_dmg_cap]: 30,
        }
    },
    "Whitescale Embrace": {
        source: "Echidna",
        img: "status_7495_1",
        mods: {
            [MODS.skill_dmg]: 50,
            [MODS.skill_dmg_cap]: 20,
        }
    },
    "Wild Firewheel": {
        source: "Elmott (Yukata)",
        img: "status_7888",
        mods: {
            [MODS.buff_critical]: 20,
        }
    },
    "Temperate Devotion": {
        source: "Estarriola",
        img: "status_6468_2",
        mods: {
            [MODS.na_dmg_supp]: 100000,
        }
    },
    "Armed": {
        source: "Eugen (Grand)",
        img: "Status Armed",
        mods: {
            [MODS.buff_critical]: 50,
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 25,
        }
    },
    "Celestial Guidance": {
        source: "Europa (Summer)",
        img: "Status Celestial Guidance",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 10,
        }
    },
    "Wake Me Up": {
        source: "Eustace (Yukata)",
        img: "status_6837",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
            [MODS.sp_ca_dmg_cap]: 30,
        }
    },
    "Snuggle": {
        source: "Ewiyar",
        img: "status_7302",
        mods: {
            [MODS.normal_might]: 30,
        }
    },
    "The Emerald's Windfall": {
        source: "Ewiyar (Grand)",
        img: "status_7543",
        mods: {
            [MODS.perpetuity]: 30,
        }
    },
    "Sunfire Spark": {
        source: "Fenie",
        img: "status_7864",
        mods: {
            [MODS.elem_atk]: 50,
        }
    },
    "Freigeist": {
        source: "Ferry (Grand)",
        img: "Status Freigeist",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 10,
        }
    },
    "Magic Torrent": {
        source: "Fif",
        img: "Status Magic Torrent",
        mods: {
            [MODS.perpetuity]: 50,
        }
    },
    "Silvery Snow": {
        source: "Filene",
        img: "status_7032",
        mods: {
            [MODS.elem_atk]: 30,
            [MODS.skill_dmg]: 50,
            [MODS.skill_dmg_cap]: 20,
        }
    },
    "Stellato": {
        source: "Florence (Dark)",
        img: "status_7978",
        mods: {
            [MODS.elem_atk]: 50,
            [MODS.skill_dmg_supp]: 50000,
        }
    },
    "Landslide's Blessing": {
        source: "Galleon",
        img: "status_7404",
        mods: {
            [MODS.elem_atk]: 50,
        }
    },
    "The Gold's Foundation": {
        source: "Galleon",
        img: "status_3158",
        mods: {
            [MODS.perpetuity]: 100,
            [MODS.dmg_cap]: 100,
        }
    },
    "The Gold's Love": {
        source: "Galleon (Summer)",
        img: "status_7961",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.na_dmg_amp]: 30,
        }
    },
    "Foundation of Prosperity": {
        source: "Galleon (Summer)",
        img: "status_3289",
        mods: {
            [MODS.na_dmg_amp]: 60,
        }
    },
    "Dracostrike": {
        source: "Grea (Summer)",
        img: "Status Dracoforce",
        mods: {
            [MODS.buff_critical]: 30,
        }
    },
    "Party Nightmare": {
        source: "Hallessena (Halloween)",
        img: "Status Party Nightmare",
        mods: {
            [MODS.dmg_supp]: 100000,
        }
    },
    "Limiter Break": {
        source: "Halluel and Malluel (Summer)",
        img: "Status Limiter Break",
        mods: {
            // Verify this modifier classification.
            [MODS.perpetuity]: 40,
            [MODS.dmg_cap]: 20,
        }
    },
    "Endflare": {
        source: "Hauhet",
        img: "status_6893",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.buff_critical]: 20,
        }
    },
    "Paramount Care": {
        source: "Himiko Toga",
        img: "status_7764",
        mods: {
            [MODS.elem_atk]: 50,
            [MODS.dmg_cap]: 10,
        }
    },
    "Venom and Vigor": {
        source: "Indala",
        img: "status_7258",
        mods: {
            [MODS.skill_dmg]: 50,
            [MODS.skill_dmg_cap]: 20,
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Arcane Awakening": {
        source: "Io (SSR)",
        img: "status_3399",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Ice Barrier": {
        source: "Izmir",
        img: "status_3112",
        mods: {
            [MODS.buff_critical]: 20,
        }
    },
    "Icy Smile": {
        source: "Izmir (Yukata)",
        img: "status_7185",
        mods: {
            [MODS.buff_critical]: 20,
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "Rakan Power!": {
        source: "Jack Rakan",
        img: "status_7142",
        mods: {
            [MODS.perpetuity]: 100,
            [MODS.dmg_amp]: 20,
            [MODS.dmg_cap]: 10,
        }
    },
    "Incite": {
        source: "Jeanne d'Arc (Dark)",
        img: "Status_1526",
        mods: {
            [MODS.perpetuity]: 100,
        }
    },
    "Salvation": {
        source: "Jeanne d'Arc (Summer)",
        img: "status_7024",
        mods: {
            [MODS.buff_critical]: 50,
            [MODS.dmg_cap]: 20,
        }
    },
    "Feuerwerk": {
        source: "Jessica (Yukata)",
        img: "Status Feuerwerk",
        mods: {
            [MODS.normal_might]: 50,
        }
    },
    "Blind Blade": {
        source: "Jin (Summer)",
        img: "Status Blind Blade",
        mods: {
            [MODS.assassin]: 300,
        }
    },
    "Azure Surge": {
        source: "Joel (SSR)",
        img: "status_3362",
        mods: {
            [MODS.skill_dmg_supp]: 50000,
        }
    },
    "Heavenly Winds": {
        source: "Kaguya",
        img: "status_7661",
        mods: {
            [MODS.elem_atk]: 50,
            [MODS.buff_critical]: 20,
        }
    },
    "Azure Oath": {
        source: "Katalina (Grand)",
        img: "Status Azure Oath",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.passive_ca_dmg]: 30,
            [MODS.dmg_cap]: 20,
        }
    },
    "Moonlit Determination": {
        source: "Kaworu & Mark.06",
        img: "status_3368_1",
        mods: {
            [MODS.elem_atk]: 50,
            [MODS.na_dmg_supp]: 50000,
        }
    },
    "Spirits' Shelter": {
        source: "Kokkoro",
        img: "Status Spirits' Shelter",
        mods: {
            [MODS.normal_might]: 30,
        }
    },
    "My Own Fancy": {
        source: "Kolulu (Earth)",
        img: "status_7900",
        mods: {
            [MODS.normal_might]: 30,
            [MODS.skill_dmg]: 50,
            [MODS.skill_dmg_cap]: 20,
            [MODS.skill_dmg_supp]: 50000,
        }
    },
    "Sunburn": {
        source: "Kolulu (Summer)",
        img: "status_6916",
        mods: {
            [MODS.normal_might]: 50,
        }
    },
    "Coquetterie": {
        source: "Korwa (Summer)",
        img: "Status Coquetterie",
        mods: {
            [MODS.elem_atk]: 50,
        }
    },
    "Flameshade Parasol": {
        source: "Kou (Light)",
        img: "status_3334",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "Glaring Radiance": {
        source: "Kumbhira (Summer)",
        img: "status_6377",
        mods: {
            [MODS.dmg_amp]: 50,
            [MODS.passive_ca_dmg]: 100,
            [MODS.ca_dmg_cap]: 90,
        }
    },
    "Renoncule": {
        source: "La Coiffe (SR)",
        img: "Status Renoncule",
        mods: {
            [MODS.elem_atk]: 30,
        }
    },
    "Infinite Love": {
        source: "Ladiva (Valentine)",
        img: "status_7336",
        mods: {
            [MODS.normal_might]: 30,
        }
    },
    "Evenfall": {
        source: "Lady Grey (Halloween)",
        img: "Status Evenfall",
        mods: {
            // Verify this modifier classification.
            // 15% per stack (max 45%); verify value and modifier.
            [MODS.perpetuity]: 15,
        }
    },
    "Gebaeck der Freude": {
        source: "Lancelot (Halloween)",
        img: "status_3369_1",
        mods: {
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Crescent": {
        source: "Leona (Grand)",
        img: "status_3110",
        mods: {
            [MODS.buff_critical]: 50,
            [MODS.dmg_cap]: 10,
        }
    },
    "Riesenjagd": {
        source: "Levi",
        img: "Status_Defiance",
        mods: {
            [MODS.assassin]: 100,
            [MODS.ca_dmg_cap]: 50,
        }
    },
    "Light-Up Stage": {
        source: "Lilele",
        img: "status_3364",
        mods: {
            [MODS.passive_ca_dmg]: 30,
            [MODS.ca_dmg_cap]: 10,
        }
    },
    "Colorful Shine Stage": {
        source: "Lilele",
        img: "status_3365",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "Sparkle Shower Stage": {
        source: "Lilele",
        img: "status_3366",
        mods: {
            [MODS.passive_ca_dmg]: 100,
            [MODS.ca_dmg_cap]: 50,
        }
    },
    "Disastrous Devotion": {
        source: "Lobelia (Valentine)",
        img: "status_3315",
        mods: {
            [MODS.skill_dmg_supp]: 50000,
        }
    },
    "Totally Forbidden Skillz": {
        source: "Lowain (Event)",
        img: "Status_Totally Forbidden Skillz",
        mods: {
            [MODS.normal_might]: 50,
        }
    },
    "Prayer of Imminent Light": {
        source: "Lu Woh",
        img: "status_3184",
        mods: {
            [MODS.normal_might]: 50,
            [MODS.buff_critical]: 30,
        }
    },
    "Whitefire Solidarity": {
        source: "Lucius (SSR)",
        img: "status_7958",
        mods: {
            [MODS.skill_dmg_supp]: 50000,
        }
    },
    "Haki": {
        source: "Luffy",
        img: "status_7390",
        mods: {
            // Verify this modifier classification.
            [MODS.perpetuity]: 30,
        }
    },
    "Finished Manuscript": {
        source: "Lunalu (SSR)",
        img: "status_3127",
        mods: {
            [MODS.normal_might]: 25,
            [MODS.dmg_cap]: 10,
        }
    },
    "Vestiges of the Astral God": {
        source: "Lyria (Event SSR)",
        img: "status_7576",
        mods: {
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Mother Hen's Beats": {
        source: "Mahira (Holiday)",
        img: "status_7284",
        mods: {
            [MODS.elem_atk]: 50,
            [MODS.dmg_cap]: 10,
        }
    },
    "Bunny Blitz": {
        source: "Makura",
        img: "status_33791",
        mods: {
            [MODS.buff_critical]: 20,
        }
    },
    "Hopped Up": {
        source: "Makura",
        img: "status_7515",
        mods: {
            [MODS.perpetuity]: 100,
            [MODS.dmg_cap]: 30,
        }
    },
    "Dual-Bladed Menace": {
        source: "Makura (Valentine)",
        img: "status_3317",
        mods: {
            [MODS.perpetuity]: 20,
        }
    },
    "Special Helmet": {
        source: "Manu Ponumau",
        img: "status_3394",
        mods: {
            [MODS.normal_might]: 30,
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Devotion to Justice": {
        source: "Maria Theresa",
        img: "Status Devotion to Justice",
        mods: {
            [MODS.buff_critical]: 50,
            [MODS.dmg_cap]: 20,
        }
    },
    "Righteous Indignation": {
        source: "Maria Theresa",
        img: "Status Righteous Indignation",
        mods: {
            [MODS.perpetuity]: 20,
        }
    },
    "Regalo Benedetto": {
        source: "Maria Theresa (Holiday)",
        img: "status_6405_2",
        mods: {
            [MODS.perpetuity]: 20,
        }
    },
    "Unholy Warcry": {
        source: "Marquiares",
        img: "status_12993",
        mods: {
            [MODS.assassin]: 150,
        }
    },
    "Warflame": {
        source: "Mars",
        img: "status_7998",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.na_dmg_amp]: 20,
        }
    },
    "Happy Sprinkles": {
        source: "Mary (Holiday)",
        img: "Status Happy Sprinkles",
        mods: {
            [MODS.normal_might]: 50,
        }
    },
    "Pebble of Happiness": {
        source: "Meg and Mari",
        img: "status_7627",
        mods: {
            [MODS.perpetuity]: 30,
        }
    },
    "Aetherial Arcanum": {
        source: "Metera (Grand)",
        img: "status_3371",
        mods: {
            [MODS.dmg_supp]: 50000,
        }
    },
    "Ignis Ward": {
        source: "Michael",
        img: "Status 1383_11",
        mods: {
            [MODS.passive_ca_dmg]: 30,
            [MODS.ca_dmg_cap]: 10,
        }
    },
    "Beastsoul Mantle": {
        source: "Mikaboshi",
        img: "status_3397",
        mods: {
            [MODS.perpetuity]: 25,
        }
    },
    "Phoenix Cicada Stance": {
        source: "Mirin (Summer)",
        img: "status_3162",
        mods: {
            [MODS.buff_critical]: 30,
            [MODS.dmg_supp]: 50000,
        }
    },
    "Incursion Rune": {
        source: "Mishra (SSR)",
        img: "Status 7058",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_cap]: 5,
        }
    },
    "Dark Royal Sword": {
        source: "Mordred",
        img: "status_3417",
        mods: {
            [MODS.na_dmg_amp]: 60,
        }
    },
    "Bua": {
        source: "Morrigna",
        img: "Status Bua",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_cap]: 20,
        }
    },
    "Tricky Constitution": {
        source: "Mugen (Halloween)",
        img: "status_7465",
        mods: {
            [MODS.buff_critical]: 300,
            [MODS.dmg_cap]: 50,
        }
    },
    "Sweet Treatment": {
        source: "Nehan (Valentine)",
        img: "status_7836",
        mods: {
            [MODS.buff_critical]: 20,
        }
    },
    "Gamuza": {
        source: "Nelliel Tu Odelschwanck",
        img: "status_6133_2",
        mods: {
            [MODS.skill_dmg_supp]: 30000,
        }
    },
    "Nemo the Big Nemo": {
        source: "Nemone",
        img: "status_6100",
        mods: {
            [MODS.buff_critical]: 50,
            [MODS.dmg_supp]: 100000,
        }
    },
    "Nine-Dragon Flamewreath": {
        source: "Nezha (Yukata)",
        img: "status_7554",
        mods: {
            [MODS.passive_ca_dmg]: 100,
        }
    },
    "Grand God Kaiser": {
        source: "Nicholas (Light)",
        img: "",
        mods: {
            [MODS.perpetuity]: 100,
        }
    },
    "World of Death and Love": {
        source: "Nier",
        img: "Status World of Death and Love",
        mods: {
            [MODS.local_field]: 20,
        }
    },
    "Eternal Vow": {
        source: "Nier",
        img: "status_7585",
        mods: {
            [MODS.perpetuity]: 50,
        }
    },
    "Death's Inversion": {
        source: "Nier",
        img: "status_7585_2",
        mods: {
            [MODS.perpetuity]: 50,
        }
    },
    "White Rose's Affinity": {
        source: "Nier (Yukata)",
        img: "status_7967",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_cap]: 10,
            [MODS.skill_dmg]: 50,
            [MODS.skill_dmg_cap]: 20,
        }
    },
    "Blush Lvl": {
        source: "Nina Drango",
        img: "Status Blush 1",
        mods: {
            // Verify this modifier classification.
            [MODS.perpetuity]: 80,
        }
    },
    "Moderato": {
        source: "Novei (Promo)",
        img: "Status ConcertoLight",
        mods: {
            [MODS.elem_atk]: 45,
        }
    },
    "Clockwork Actuation": {
        source: "Octavia",
        img: "status_6524",
        mods: {
            [MODS.dmg_supp]: 50000,
        }
    },
    "Twilight Aura": {
        source: "Olivia",
        img: "status_7801",
        mods: {
            [MODS.perpetuity]: 20,
            [MODS.dmg_cap]: 10,
        }
    },
    "Fallen Wings": {
        source: "Olivia (Grand)",
        img: "status_6866",
        mods: {
            [MODS.buff_critical]: 30,
            [MODS.dmg_cap]: 20,
        }
    },
    "Hopeful Pledge": {
        source: "Orchid",
        img: "status_3182",
        mods: {
            [MODS.normal_might]: 50,
            [MODS.dmg_cap]: 20,
            [MODS.buff_critical]: 50,
        }
    },
    "Largo": {
        source: "Pamela (Promo)",
        img: "Status ConcertoWater",
        mods: {
            [MODS.elem_atk]: 45,
        }
    },
    "Cloudwalk": {
        source: "Payila",
        img: "status_7789",
        mods: {
            [MODS.na_dmg_amp]: 10,
        }
    },
    "Dragon's Splash": {
        source: "Payila (Summer)",
        img: "status_3322_2",
        mods: {
            [MODS.perpetuity]: 50,
        }
    },
    "King's Blaze": {
        source: "Percival (Grand)",
        img: "status_3169",
        mods: {
            // Range: 60%-20%; reassess later.
            // Verify this modifier classification.
            [MODS.strength]: 60,
        }
    },
    "Spiritual Unison": {
        source: "Petra (SSR)",
        img: "status_3275_1",
        mods: {
            [MODS.perpetuity]: 50,
            [MODS.dmg_cap]: 30,
        }
    },
    "Trance Absolution": {
        source: "Pholia",
        img: "Status Trance Absolution",
        mods: {
            [MODS.buff_critical]: 50,
            [MODS.dmg_cap]: 20,
        }
    },
    "White Raiment": {
        source: "Pholia (Yukata)",
        img: "status_7594",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_cap]: 10,
            [MODS.buff_critical]: 20,
        }
    },
    "Trascendenza": {
        source: "Ragazzo",
        img: "status_7633",
        mods: {
            // Range: 40%-120%; reassess later.
            // Verify this modifier classification.
            [MODS.jammed]: 120,
        }
    },
    "Tilepatheia": {
        source: "Raziel (Event)",
        img: "status_7873",
        mods: {
            [MODS.normal_might]: 50,
        }
    },
    "Enigmatic Refuge": {
        source: "Raziel (Summer)",
        img: "status_7937",
        mods: {
            [MODS.elem_atk]: 50,
        }
    },
    "Moksha": {
        source: "Rei",
        img: "status_6801",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_cap]: 20,
        }
    },
    "Rekki Unleashed I": {
        source: "Reinhardtzar (Holiday)",
        img: "status_6793_1",
        mods: {
            [MODS.na_dmg_amp]: 10,
            [MODS.dmg_cap]: 10,
        }
    },
    "Rekki Unleashed II": {
        source: "Reinhardtzar (Holiday)",
        img: "status_6793_2",
        mods: {
            [MODS.na_dmg_amp]: 10,
            [MODS.dmg_cap]: 10,
        }
    },
    "Rekki Unleashed III": {
        source: "Reinhardtzar (Holiday)",
        img: "status_6793_3",
        mods: {
            [MODS.na_dmg_amp]: 20,
            [MODS.dmg_cap]: 20,
        }
    },
    "Animato": {
        source: "Robertina (Promo)",
        img: "Status ConcertoWind",
        mods: {
            [MODS.elem_atk]: 45,
        }
    },
    "Rose's Affection": {
        source: "Rosetta (Grand)",
        img: "Status 7267",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_supp]: 20000,
        }
    },
    "Free Rein": {
        source: "Sandira",
        img: "status_6962",
        mods: {
            [MODS.elem_atk]: 50,
        }
    },
    "Clawesome Vigor": {
        source: "Sen (SSR)",
        img: "status_6405_11",
        mods: {
            [MODS.perpetuity]: 50,
            [MODS.buff_critical]: 30,
        }
    },
    "Wild Whirlwind": {
        source: "Sen (SSR)",
        img: "status_6664",
        mods: {
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Stunning Love Strike": {
        source: "Sen (Valentine)",
        img: "status_3183",
        mods: {
            [MODS.counter_dmg_amp]: 150,
        }
    },
    "Sanguine Savagery": {
        source: "Sevastien (SSR)",
        img: "status_3293",
        mods: {
            [MODS.skill_dmg]: 60,
            [MODS.skill_dmg_cap]: 30,
        }
    },
    "Purification Brand": {
        source: "Sevilbarra (SSR)",
        img: "status_7707",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "Inner Eye": {
        source: "Shiva",
        img: "Status_Inner_Eye",
        mods: {
            [MODS.passive_ca_dmg]: 190,
            [MODS.ca_dmg_cap]: 90,
        }
    },
    "Guidance of the Blaze": {
        source: "Shiva",
        img: "Status_Guidance_of_the_Blaze",
        mods: {
            [MODS.perpetuity]: 15,
            [MODS.dmg_cap]: 10,
        }
    },
    "Fleet-Footed": {
        source: "Shukra",
        img: "status_7154",
        mods: {
            [MODS.na_dmg_amp]: 20,
        }
    },
    "Manigance": {
        source: "Siegfried",
        img: "Status Manigance",
        mods: {
            // Range: 40%-120%; reassess later.
            [MODS.jammed]: 120,
            [MODS.dmg_cap]: 20,
        }
    },
    "Blood of the Dragon": {
        source: "Siegfried (Grand)",
        img: "status_6892",
        mods: {
            [MODS.perpetuity]: 100,
            [MODS.dmg_cap]: 40,
        }
    },
    "Black Dragon Scale (Yukata)": {
        source: "Siegfried (Yukata)",
        img: "status_6577",
        mods: {
            [MODS.dmg_cap]: 30,
        }
    },
    "Backup Fire (Summer)": {
        source: "Silva (Summer)",
        img: "status_6763",
        mods: {
            [MODS.perpetuity]: 20,
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 20,
        }
    },
    "Segnen": {
        source: "Sophia (Water)",
        img: "status_7378",
        mods: {
            [MODS.normal_might]: 100,
        }
    },
    "Kicker": {
        source: "Special Week, Silence Suzuka, and Tokai Teio",
        img: "status_3137",
        mods: {
            [MODS.perpetuity]: 20,
            [MODS.buff_critical]: 50,
        }
    },
    "Flyer": {
        source: "Special Week, Silence Suzuka, and Tokai Teio",
        img: "status_3138",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "Scarlet Rope": {
        source: "Sui",
        img: "status_7905",
        mods: {
            [MODS.ca_dmg_supp]: 300000,
        }
    },
    "Geass of Absolute Obedience (Active)": {
        source: "Suzaku Kururugi",
        img: "Status Geass of Absolute Obedience Active",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.buff_critical]: 30,
        }
    },
    "Hubu Al-Raqs": {
        source: "Tabina (Summer)",
        img: "Status 7210",
        mods: {
            [MODS.skill_dmg]: 50,
            [MODS.skill_dmg_cap]: 20,
            [MODS.dmg_supp]: 50000,
        }
    },
    "Tiger's Blessing": {
        source: "Threo",
        img: "Status_Tiger's Blessing",
        mods: {
            [MODS.assassin]: 280,
            [MODS.ca_dmg_cap]: 100,
            [MODS.sp_ca_dmg_cap]: 30,
        }
    },
    "Phantom Lantern": {
        source: "Tien (Halloween)",
        img: "status_7120",
        mods: {
            [MODS.perpetuity]: 30,
        }
    },
    "Roaring": {
        source: "Tsubasa",
        img: "status_3212_1",
        mods: {
            [MODS.perpetuity]: 15,
        }
    },
    "Moonlight Blessing": {
        source: "Tsukuyomi",
        img: "status_7079",
        mods: {
            [MODS.ca_dmg_supp]: 300000,
        }
    },
    "Beyond the Fry": {
        source: "Ultimate Friday",
        img: "status_7518",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
        }
    },
    "Terra Ward": {
        source: "Uriel",
        img: "status_1383_13",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.skill_dmg]: 40,
            [MODS.skill_dmg_cap]: 20,
        }
    },
    "Nightlong Melody": {
        source: "Utsusemi",
        img: "status_7708",
        mods: {
            [MODS.normal_might]: 30,
        }
    },
    "Indomitable Conviction": {
        source: "Vane (Grand)",
        img: "status_7976",
        mods: {
            [MODS.perpetuity]: 100,
            [MODS.dmg_cap]: 30,
        }
    },
    "Ritterseele": {
        source: "Vane (Halloween)",
        img: "status_7244",
        mods: {
            [MODS.na_dmg_amp]: 30,
            [MODS.counter_dmg_amp]: 30,
            [MODS.passive_ca_dmg]: 100,
            [MODS.ca_dmg_cap]: 50,
            [MODS.cb_dmg]: 30,
            [MODS.cb_dmg_cap]: 20,
        }
    },
    "Blood Queen": {
        source: "Vania",
        img: "Status Blood Queen",
        mods: {
            [MODS.perpetuity]: 50,
        }
    },
    "Melas Unleashed": {
        source: "Vaseraga (Fire)",
        img: "status_3117",
        mods: {
            [MODS.normal_might]: 50,
            [MODS.buff_critical]: 30,
            [MODS.dmg_cap]: 20,
            [MODS.na_dmg_amp]: 20,
        }
    },
    "Soul Ravenous": {
        source: "Vaseraga (Grand)",
        img: "status_6581_11",
        mods: {
            [MODS.perpetuity]: 50,
            [MODS.dmg_cap]: 10,
        }
    },
    "The Burden": {
        source: "Vaseraga (Summer)",
        img: "status_7596",
        mods: {
            [MODS.perpetuity]: 30,
        }
    },
    "Awakening": {
        source: "Veight",
        img: "Status VeightAwaken",
        mods: {
            [MODS.perpetuity]: 50,
            [MODS.buff_critical]: 30,
        }
    },
    "Awakening+": {
        source: "Veight",
        img: "status_1622",
        mods: {
            [MODS.perpetuity]: 50,
            [MODS.buff_critical]: 30,
        }
    },
    "Fantasy Festival": {
        source: "Vikala",
        img: "Status Fantasy Festival",
        mods: {
            [MODS.passive_ca_dmg]: 30,
            [MODS.ca_dmg_cap]: 10,
        }
    },
    "Mighty Mouse": {
        source: "Vikala (Summer)",
        img: "status_7410",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_cap]: 20,
        }
    },
    "Festival Candyfluff": {
        source: "Vikala (Yukata)",
        img: "status_3333",
        mods: {
            [MODS.skill_dmg_amp]: 10,
        }
    },
    "Plan B": {
        source: "Vira (Wind)",
        img: "Status Plan B",
        mods: {
            // Verify this modifier classification.
            [MODS.perpetuity]: 100,
            [MODS.skill_dmg]: 50,
            [MODS.skill_dmg_cap]: 50,
        }
    },
    "Onslaught Tactics": {
        source: "Walfrid",
        img: "status_7505",
        mods: {
            [MODS.buff_critical]: 20,
        }
    },
    "Tentaforce": {
        source: "Wamdus",
        img: "status_7439",
        mods: {
            [MODS.dmg_amp]: 50,
        }
    },
    "Innocence Fairy": {
        source: "Wamdus (Holiday)",
        img: "status_7870",
        mods: {
            [MODS.na_dmg_amp]: 20,
        }
    },
    "The Vermillion's Bounty": {
        source: "Wilnas (Halloween)",
        img: "status_7949",
        mods: {
            [MODS.perpetuity]: 15,
            [MODS.dmg_cap]: 10,
        }
    },
    "Renie's Tears": {
        source: "Wulf and Renie",
        img: "Status Renie's Tears",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.buff_critical]: 30,
        }
    },
    "Nacht Fang": {
        source: "Wulf and Renie (Halloween)",
        img: "status_6980",
        mods: {
            [MODS.normal_might]: 80,
            [MODS.buff_critical]: 50,
        }
    },
    "Urdarbrunnr": {
        source: "Yggdrasil",
        img: "Status 7202",
        mods: {
            [MODS.normal_might]: 50,
        }
    },
    "Ironclad": {
        source: "Yngwie (Legend of Bravado and Revelry)",
        img: "status_3164",
        mods: {
            [MODS.perpetuity]: 30,
            [MODS.dmg_cap]: 20,
        }
    },
    "Ardent Blade": {
        source: "Yuisis",
        img: "Status Ardent Blade",
        mods: {
            [MODS.assassin]: 150,
            [MODS.ca_dmg_cap]: 80,
        }
    },
    "Ardent Blade+": {
        source: "Yuisis",
        img: "Status Ardent Blade",
        mods: {
            [MODS.assassin]: 200,
            [MODS.ca_dmg_cap]: 100,
        }
    },
    "Ardent Blade (Yukata)": {
        source: "Yuisis (Yukata)",
        img: "Status Ardent Blade",
        mods: {
            [MODS.assassin]: 300,
            [MODS.ca_dmg_cap]: 50,
        }
    },
    "Magic Horizons": {
        source: "Zeta and Vaseraga (Halloween)",
        img: "Status Magic Horizons",
        mods: {
            [MODS.perpetuity]: 50,
        }
    },
    "Sign of Zooey": {
        source: "Zooey",
        img: "Status Sign of Zooey",
        mods: {
            [MODS.normal_might]: 100,
        }
    },
    "Hidden Wish": {
        source: "Zooey (Holiday)",
        img: "status_7996",
        mods: {
            [MODS.passive_ca_dmg]: 50,
            [MODS.ca_dmg_cap]: 30,
            [MODS.ca_dmg_supp]: 300000,
        }
    },
    // These effects have missing values; verify all effects before enabling.
    /*
    "Zangetsu": {
        source: "Ichigo Kurosaki",
        img: "status_6580_2",
        mods: {
            // TODO: Verify all effects and numeric values.
        }
    },
    "Zeal of the Feather (SR)": {
        source: "Mahira (Event)",
        img: "",
        mods: {
            // TODO: Verify all effects and numeric values.
        }
    },
    */

}