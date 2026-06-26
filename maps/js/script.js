const SVG_NS = "http://www.w3.org/2000/svg";
const regions = {
  moniyan: {
    name: "Moniyan Empire", subtitle: "The Radiant Heart", color: "#d7b45b",
    summary: "The centre-west empire of light. Lumina City anchors its road network; Castle Grandrock watches the north, Castle Aberleen guards the southern mist, and Azure Lake shines in the southeast.",
    worldPath: "M245 225 Q295 178 390 190 Q500 180 585 245 L565 405 Q515 485 390 470 Q280 455 225 360 Z", label: [395, 315],
    source: "Map Moniyan Empire Region.litcoffee",
    landmarks: [["Lumina City", 540, 350, "Imperial capital at the nexus of the Moniyan Plains and sacred roads.", "Capital"], ["Castle Grandrock", 525, 180, "Northern fortress built upon a colossal defensible plateau.", "Fortress"], ["Castle Gorge", 260, 350, "Western capital surrounded by mines and defensive walls.", "City"], ["Castle Aberleen", 525, 555, "Southern Paxley duchy, shrouded in supernatural mist.", "Castle"], ["Azure Lake", 815, 500, "Deep blue-teal lake in the empire's southeast.", "Lake"], ["Swan Castle", 870, 545, "House Alvin's secluded white-marble castle on Azure Lake.", "Castle"], ["Monastery of Light", 675, 285, "Sacred white sanctuary with a radiant golden spire.", "Sanctuary"], ["Mossenia", 775, 350, "Imperial sanctuary marked by an ancient ring of standing stones.", "Sanctuary"], ["Black Forest", 320, 565, "Wild southeastern woodland tied to werewolves and old dangers.", "Forest"], ["Moniyan Plains", 380, 420, "The empire's broad, road-crossed agricultural heartland.", "Plains"]]
  },
  northern: {
    name: "Northern Vale", subtitle: "The Frozen Throne", color: "#9ed8e7",
    summary: "The frozen northern crown of the continent. Queen's Peak rises above the Frozen Sea, while the Megalith Wasteland forms the dangerous southern frontier.",
    worldPath: "M255 75 Q410 20 640 55 Q775 65 835 145 L775 210 Q630 185 520 205 Q370 190 245 215 Q205 145 255 75 Z", label: [525, 120],
    source: "Map Northern Vale Region.litcoffee",
    landmarks: [["Queen's Peak", 255, 245, "Titanic ice-sheathed mountain and Aurora's crystalline throne.", "Peak"], ["Frozen Sea", 170, 120, "Silver-blue northern sea broken by drifting icebergs.", "Sea"], ["Megalith Wasteland", 560, 590, "Southern frontier of red earth and towering stone spires.", "Wasteland"], ["Great Martyr Shrine", 585, 365, "Sacred shrine at the heart of the Vale.", "Shrine"], ["Magic Academy", 930, 300, "Mysterious floating academy connected by an enchanted bridge.", "Academy"], ["Kastiya", 890, 150, "Warm-lit port on the northeastern coast.", "Port"], ["Ice Palace", 300, 205, "Aurora's translucent sanctuary at Queen's Peak.", "Palace"]]
  },
  agelta: {
    name: "Agelta Drylands", subtitle: "The Sun-Scorched Expanse", color: "#c68a42",
    summary: "The far southwest desert. The Emerald Road crosses ruins and city-states before fraying toward Los Pecados and the trackless Western Expanse.",
    worldPath: "M95 385 Q180 350 300 375 L430 450 L410 650 Q275 705 125 640 Q65 530 95 385 Z", label: [245, 515],
    source: "Map Agelta Drylands Region.litcoffee",
    landmarks: [["Emerald Road", 560, 310, "Ancient trade road cutting diagonally across the desert.", "Trade Route"], ["Wind Fort", 385, 260, "Sandstone garrison shaped by centuries of desert wind.", "Fortress"], ["Fire Throat", 300, 500, "Volcanic forge-city glowing with amber and crimson.", "Forge City"], ["Ruins of Tivacan", 180, 380, "Broken columns and the sealed tomb of Khufra.", "Ruins"], ["Minoan Labyrinth", 675, 445, "Seven-ring open-air maze and Minotaur's prison of memory.", "Labyrinth"], ["Stargate Valley", 825, 260, "Celestial observatories connected like constellations.", "Observatory"], ["Los Pecados", 580, 635, "Lawless canyon city at the edge of the Western Expanse.", "City"], ["Belerick's Oasis", 760, 590, "A perfect emerald oasis created by Belerick.", "Oasis"], ["Western Expanse", 195, 625, "Trackless sea of dunes beyond organised roads.", "Desert"], ["Foggy Mountains", 930, 390, "Misty northeastern barrier adjacent to Moniyan.", "Mountains"]]
  },
  eruditio: {
    name: "Eruditio", subtitle: "City of Scholars", color: "#8c78d9",
    summary: "A techno-arcane city-state at the mid-west, north of the Agelta desert proper. Brass spires, airships, gears, and lightning define its skyline.",
    worldPath: "M120 305 Q175 265 245 290 L280 355 L225 410 L145 395 Q105 350 120 305 Z", label: [190, 345],
    source: "Map Eruditio Region.litcoffee",
    landmarks: [["Grand Spire", 575, 300, "Central tower and intellectual heart of Eruditio.", "Spire"], ["Airship Docks", 260, 245, "Elevated docks crowded with arcane airships.", "Docks"], ["Gear Quarter", 380, 500, "Industrial district of heavy machinery and inventions.", "District"], ["Lightning Reactor", 850, 425, "City-scale power reactor blazing with violet-white current.", "Reactor"], ["Laboratory 1718", 570, 650, "Hidden subterranean foundry of souls beneath the Gear Quarter.", "Hidden Lab"], ["Scholars District", 720, 245, "Research halls and experimental academies.", "District"], ["Eruditio Rangers", 880, 590, "Operational headquarters of the city's defenders.", "Headquarters"]]
  },
  lantis: {
    name: "Lantis Mountains", subtitle: "The Great Divide", color: "#9b927f",
    summary: "The continent's longest mountain barrier, separating Moniyan from the Barren Lands and slowing every major Abyssal offensive.",
    worldPath: "M585 190 L635 180 L665 500 L610 535 L565 405 Z", label: [620, 345],
    source: "Map 1 Global.litcoffee",
    landmarks: [["Gate of Lament", 565, 270, "A fortified passage through the northern divide.", "Gate"], ["Sanctum Vigil", 430, 390, "Lightward watch-fort overlooking the passes.", "Sanctum"], ["Grock Graveyard", 700, 360, "Ancient resting ground of stone guardians.", "Graveyard"], ["Lantis Spine", 585, 170, "Highest, longest mountain spine in the Land of Dawn.", "Mountains"], ["Southern Breach", 620, 610, "Critical southern passage repeatedly tested by demon tides.", "Pass"], ["Abyssward Scar", 850, 470, "Corrupted eastern face exposed to Barren Lands miasma.", "Scar"], ["Lightward Pass", 260, 500, "Western route descending into Moniyan territory.", "Pass"]]
  },
  barren: {
    name: "Barren Lands & Necrokeep", subtitle: "The Land of Despair", color: "#7c665c",
    summary: "Once prosperous territory east of the Lantis Mountains, now blighted by Abyssal corruption. Necrokeep dominates its centre.",
    worldPath: "M655 250 Q750 220 850 280 L875 470 Q810 545 675 515 L630 450 Z", label: [755, 385],
    source: "Map Barren Lands Region.litcoffee",
    landmarks: [["Necrokeep", 590, 370, "Vexana's jagged Fortress of Despair at the region's heart.", "Fortress"], ["Askati Forest", 520, 185, "Pale petrified forest north of Necrokeep.", "Forest"], ["Despair Place", 500, 610, "Cracked ochre plain south of the fortress.", "Wasteland"], ["Stormeye Wasteland", 870, 430, "Eastern wasteland beneath a permanent storm vortex.", "Wasteland"], ["Rantha Mountains", 710, 650, "Secondary mountain range along the south.", "Mountains"], ["Lantis Mountains", 230, 360, "Western barrier separating the blight from Moniyan.", "Mountains"], ["Outer War Zone", 350, 260, "Dead-tree frontier where organised patrols can still operate.", "War Zone"]]
  },
  azrya: {
    name: "Azrya Woodlands", subtitle: "The Moonlit Realm", color: "#4f9871",
    summary: "Moonlit forests in the south-centre, nestled between Moniyan, the Barren Lands, and the southern coast. The Tree of Life anchors the realm.",
    worldPath: "M425 485 Q525 450 650 500 L720 620 Q650 705 500 680 L405 605 Z", label: [560, 585],
    source: "Map Azrya Woodlands Region.litcoffee",
    landmarks: [["Tree of Life", 575, 325, "World-spanning ancient tree at the absolute centre of Azrya.", "Sacred Tree"], ["Lunar Temple", 590, 220, "Moon-white shrine grown into the Tree's highest boughs.", "Temple"], ["Moonlake", 590, 605, "Still silver lake south of the Tree, reflecting the temple.", "Lake"], ["Moonlit Forest", 370, 390, "Vast sacred forest crossed by shafts of silver light.", "Forest"], ["Shadow Swamp", 920, 445, "Corrupted eastern stain near the Barren Lands.", "Swamp"], ["Enchanted Forest", 260, 500, "Wild western glade shimmering with cyan and gold motes.", "Forest"], ["Dark Forest", 775, 590, "Ancient foreboding woodland of charcoal trunks.", "Forest"], ["Root Sanctuary", 540, 420, "Healing sanctuary formed by the Tree's cathedral-like roots.", "Sanctuary"]]
  },
  shadow: {
    name: "Shadow Abyss", subtitle: "The Kingdom of Darkness", color: "#564080",
    summary: "The far-eastern wound in the world. The Crack of the Abyss splits the land beneath the inverted Night Palace.",
    worldPath: "M875 215 Q985 175 1080 250 L1120 445 Q1040 555 885 490 L850 300 Z", label: [985, 350],
    source: "Map Shadow Abyss Region.litcoffee",
    landmarks: [["Crack of the Abyss", 600, 500, "Colossal cyan-lit fissure and birthplace of the Abyss.", "Abyssal Rift"], ["Night Palace", 600, 330, "Obsidia's inverted obsidian cathedral suspended above the Crack.", "Palace"], ["Sanguine Lair", 300, 220, "Alice's vermilion-black thorned domain to the north.", "Lair"], ["Molten Realm", 860, 610, "Thamuz's volcanic territory at the southern edge.", "Volcanic Realm"], ["Abyssal Dragon Spine", 930, 250, "Colossal bone-white spine coiling around the region.", "Dragon Remains"], ["Four Bone Bridges", 600, 410, "Delicate bridges connecting the palace to shattered cliffs.", "Bridge"]]
  },
  cadia: {
    name: "Cadia Riverlands", subtitle: "The Dragon Isles", color: "#5f9b76",
    summary: "An island continent across the Sea of Hope at the far east. The Dragon Altar rests in its cloud-shrouded mountainous heart.",
    worldPath: "M930 70 Q1035 35 1145 100 L1150 235 Q1060 280 940 230 L900 145 Z", label: [1035, 145],
    source: "Map Cadia Riverlands Region.litcoffee",
    landmarks: [["Dragon Altar", 575, 375, "Sacred tiered pagoda encircled by the Great Dragon.", "Altar"], ["City of the Dragon", 520, 125, "Northern port city ruled by Empress Zetian.", "Capital"], ["Forbidden Area of Dragon Soul", 790, 300, "Mist-shrouded sealed peak glowing emerald.", "Forbidden Peak"], ["Jaguar Peak", 275, 315, "Named western mountain peak of the Riverlands.", "Peak"], ["Sky Arch", 335, 500, "Natural celestial arch near the hidden Scarlet Shadow canyon.", "Landmark"], ["Stream Valley", 600, 600, "River-cut valley beneath the central mountains.", "Valley"], ["Black Dragon Lair", 880, 625, "Yu Zhong's domain in the southern mountains.", "Lair"], ["Scarlet Shadow", 845, 190, "Hidden canyon of the four sects northeast of Sky Arch.", "Hidden Canyon"]]
  },
  vonetis: {
    name: "Vonetis Sea & Archipelago", subtitle: "The Southern Islands", color: "#48a9a6",
    summary: "The tropical archipelago scattered across the far southern seas. Perlas is its central trade hub; Blue Flame and Baker Islands mark its north and south.",
    worldPath: "M300 690 Q360 655 420 700 Q485 660 545 715 Q620 670 690 720 Q770 675 845 720 Q920 680 990 720 L970 750 L330 750 Z", label: [655, 725],
    source: "Map Vontesis Sea & Aechipelago Region.litcoffee",
    landmarks: [["Perlas", 565, 375, "Largest central island and bustling trade port.", "Island Capital"], ["Blue Flame Island", 560, 130, "Northern island shrouded in permanent glowing blue mist.", "Island"], ["Baker Island", 360, 650, "Dark southern research island below Agelta.", "Island"], ["Sea-Spirit Whale", 930, 390, "Legendary spirit whale of the Great Southern Channel.", "Mythic Beast"], ["Great Southern Channel", 790, 520, "Open eastern water crossed by ships and sea spirits.", "Sea Route"], ["Makadan Islands", 280, 340, "Warrior islands associated with Lapu-Lapu.", "Islands"], ["Lapu-Lapu Shrine", 520, 330, "Sacred coral platform overlooking Perlas.", "Shrine"]]
  }
};

const worldOrder = ["northern", "moniyan", "eruditio", "agelta", "lantis", "barren", "azrya", "shadow", "cadia", "vonetis"];
const svg = document.getElementById("fantasyMap");
const title = document.getElementById("mapTitle");
let currentRegion = null, selectedLandmark = null, labelsVisible = true;
let view = { x: 0, y: 0, w: 1200, h: 760 }, drag = null, moved = false;

const MAINLAND_PATH = "M65 342C42 326 48 296 78 282L121 270C127 237 161 234 185 215L214 175C239 149 278 147 304 126L346 96L392 105L430 91L466 97L510 72L552 82L590 74L623 103L662 111L703 104L746 129L762 166L800 177L824 205L816 239L843 263L832 293L859 318L882 354L870 385L893 414L878 448L850 462L858 493L831 518L799 517L782 552L746 567L720 555L690 590L652 600L623 584L597 613L559 605L532 619L497 604L467 621L432 607L413 580L378 607L341 603L315 584L278 599L246 580L229 550L190 553L156 531L150 502L115 490L93 463L101 436L71 418L65 390L79 368Z";
const CADIA_PATH = "M920 139C943 95 986 91 1018 70C1060 52 1113 69 1125 105C1160 121 1167 158 1145 183C1163 217 1136 251 1103 250C1075 281 1029 270 1007 247C969 261 929 237 930 203C900 187 897 158 920 139Z";
const WORLD_REGION_PATHS = {
  northern: "M150 48H850V225C790 235 742 217 690 232C626 248 576 218 520 231C449 250 394 219 333 229C259 239 203 226 150 239Z",
  moniyan: "M135 218C235 193 332 214 414 217C492 220 554 235 588 286L570 420C512 463 442 477 365 466C291 457 217 430 165 386Z",
  eruditio: "M55 268C113 245 180 251 229 279L250 356C216 391 163 414 103 397C67 366 54 318 55 268Z",
  agelta: "M40 374C129 349 207 365 282 399C339 426 386 460 433 488L420 690H45Z",
  lantis: "M540 187C577 191 617 195 642 218C632 303 654 381 674 468C658 510 626 546 589 560C568 496 548 435 539 370C548 306 535 248 540 187Z",
  barren: "M626 213C705 209 782 230 846 275L910 435C846 478 772 505 677 489C649 417 626 330 626 213Z",
  azrya: "M392 448C473 440 550 456 613 514C646 557 670 607 675 680H365Z",
  shadow: "M668 431C755 414 842 425 933 458L962 690H650C652 600 652 512 668 431Z"
};
const WORLD_LABELS = {
  northern: [480, 151, 146], moniyan: [357, 326, 152], eruditio: [151, 329, 118], agelta: [251, 510, 150],
  lantis: [603, 346, 142], barren: [749, 354, 190], azrya: [526, 557, 154], shadow: [793, 485, 145],
  cadia: [1029, 164, 166], vonetis: [1000, 620, 182]
};
const REGIONAL_ATLAS = {
  northern: {
    boundary: "M72 220L122 190L150 135L225 122L268 82L355 94L414 58L500 80L575 55L642 94L730 78L778 118L858 113L902 160L1000 172L1050 225L1118 252L1090 610L1015 640L935 622L850 674L760 650L680 692L590 665L500 704L410 664L315 682L250 638L165 626L105 570Z",
    extras: [["Aurora Road", 720, 455, "A frozen pilgrimage road lit by blue witchfire.", "Road"], ["Fallen Golem Field", 790, 625, "Megalith wreckage scattered across the southern ice.", "Ruins"], ["Kraken Reach", 1030, 165, "Dangerous waters beyond Kastiya where tentacles break the ice.", "Sea"], ["Frostbound Pass", 430, 510, "The guarded southern passage out of the Vale.", "Pass"], ["Glacial Crown", 445, 145, "A ring of ancient peaks above the central ice shelf.", "Mountains"]]
  },
  moniyan: {
    boundary: "M78 182L145 150L205 105L300 116L360 82L455 105L535 72L625 100L720 86L785 128L880 118L955 166L1055 190L1110 270L1088 355L1120 430L1060 492L1045 585L960 612L885 666L790 646L705 695L615 665L530 704L445 672L355 690L285 645L195 630L145 570L80 525L105 445L70 370L102 292Z",
    extras: [["Imperial Palace", 615, 385, "The radiant seat of the Moniyan crown within Lumina.", "Palace"], ["Oracle Plaza", 650, 445, "Ceremonial plaza where imperial decrees are proclaimed.", "Plaza"], ["Cathedral of Light", 735, 400, "A monumental sanctuary of the Church of Light.", "Sanctuary"], ["Lightborn Citadel", 760, 455, "Fortress and command hall of the Lightborn defenders.", "Citadel"], ["Radiant Market", 455, 405, "The empire's busiest crossroads of merchants and pilgrims.", "Market"], ["Lakeside Palaces", 805, 465, "Noble estates overlooking Azure Lake.", "Palace"]]
  },
  agelta: {
    boundary: "M70 175L130 130L230 118L290 78L390 100L470 72L555 100L640 82L720 120L810 105L895 145L1000 135L1085 205L1120 300L1090 390L1118 488L1050 540L1015 620L920 635L845 690L750 665L655 700L565 672L475 702L390 660L290 680L220 630L135 612L105 548L62 500L82 420L55 340L88 270Z",
    extras: [["Twin-City Causeway", 350, 390, "The wind-and-fire road joining Wind Fort to Fire Throat.", "Causeway"], ["Khufra's Sealed Tomb", 215, 430, "The deepest sealed chamber beneath the Tivacan ruins.", "Tomb"], ["Astral Observatory", 885, 205, "A star-reading tower within Stargate Valley.", "Observatory"], ["Canyon Gate", 510, 575, "The guarded sandstone entrance to Los Pecados.", "Gate"], ["Seven-Ring Arena", 675, 500, "The ritual heart of the Minoan Labyrinth.", "Arena"], ["Emerald Caravanserai", 500, 285, "A protected rest stop along the Emerald Road.", "Outpost"]]
  },
  eruditio: {
    boundary: "M105 175L190 132L280 145L345 92L440 110L520 70L605 105L700 82L785 120L875 105L955 155L1045 170L1100 245L1082 335L1110 420L1060 485L1042 580L950 610L875 662L780 642L700 690L610 660L515 695L430 655L335 670L265 625L175 615L130 555L75 505L100 425L65 345L92 265Z",
    extras: [["Academy of Arcane Sciences", 735, 335, "Experimental academy joining magic to modern science.", "Academy"], ["Central Aether Rail", 530, 430, "Elevated transit line connecting Eruditio's major districts.", "Railway"], ["Chrono Plaza", 640, 530, "A civic square built around a synchronized time engine.", "Plaza"], ["Inventors Guild", 430, 575, "Workshop district where prototypes become legends.", "Guild"], ["Aether Foundry", 870, 500, "A high-energy factory powered by refined aether.", "Foundry"], ["Rangers Watchtower", 930, 610, "Forward observation tower of the Eruditio Rangers.", "Watchtower"]]
  },
  lantis: {
    boundary: "M300 700L245 655L268 590L220 525L258 465L225 390L275 330L270 255L330 210L355 130L430 112L485 55L550 108L605 62L665 118L730 70L790 132L855 145L875 220L930 268L915 345L970 405L925 475L945 548L880 590L855 660L775 650L720 705L645 675L575 720L500 680L420 710L365 665Z",
    extras: [["Frostward Ridge", 455, 225, "The snowbound northern face of the great divide.", "Ridge"], ["Rantha Approach", 760, 600, "Southern road descending toward the Rantha Mountains.", "Pass"], ["Vigil Road", 385, 455, "A patrol route linking the Sanctum and western watchposts.", "Road"], ["Eastwatch Redoubt", 820, 390, "A fortified ledge facing the Barren Lands.", "Fortress"], ["Stoneheart Vale", 560, 520, "A sheltered valley between the tallest Lantis peaks.", "Valley"]]
  },
  barren: {
    boundary: "M82 205L145 160L230 170L295 110L390 125L470 75L560 105L650 82L725 125L820 105L890 155L990 165L1065 230L1105 315L1080 395L1115 475L1055 535L1030 615L935 630L860 682L770 655L680 695L590 665L500 704L410 665L320 680L245 635L155 620L112 555L65 500L88 420L55 340L90 275Z",
    extras: [["Bridge of Sighs", 525, 430, "The haunted stone bridge leading into Necrokeep.", "Bridge"], ["Jagged Bone Throne", 620, 350, "Vexana's throne at the fortress's cursed centre.", "Throne"], ["Faramis' Spire", 690, 300, "The alchemical tower of the Shadow Walker.", "Spire"], ["Leomord's Black Yard", 555, 510, "A silent mustering ground for the undead cavalry.", "War Yard"], ["Askati Gate", 480, 220, "The ruined northern gate beneath the petrified forest.", "Gate"], ["Stormeye Crater", 930, 455, "The violent centre of the permanent eastern storm.", "Crater"]]
  },
  azrya: {
    boundary: "M75 210L145 165L225 170L290 112L380 125L455 80L540 105L625 72L700 115L790 98L860 145L950 155L1030 210L1095 280L1072 360L1110 440L1060 505L1040 590L950 620L875 675L785 650L700 700L610 665L520 705L435 670L345 688L275 642L185 625L135 568L72 520L92 435L58 350L95 275Z",
    extras: [["Archer's Perch", 650, 285, "A high silverwood platform overlooking the Tree of Life.", "Watchpost"], ["Weeping Willow Grove", 430, 570, "Moonlit willows surrounding still enchanted pools.", "Grove"], ["Lightning Meadow", 315, 520, "A luminous meadow where blue sparks dance over flowers.", "Meadow"], ["Ancient Rune-Stone Circle", 760, 520, "A ring of old stones inscribed in Elven runes.", "Sanctuary"], ["Flower-Petal Glade", 280, 405, "A bright glade filled with drifting magical petals.", "Glade"], ["Moonwell", 700, 610, "A sacred spring reflecting the lunar sky.", "Spring"]]
  },
  shadow: {
    boundary: "M155 145L245 115L330 135L415 78L505 112L590 65L675 110L760 80L835 132L930 120L1000 180L1070 205L1105 290L1080 370L1115 460L1060 520L1035 610L945 635L865 685L780 655L690 700L600 665L510 705L425 665L335 680L260 630L180 610L130 550L75 500L100 420L65 335L105 260Z",
    extras: [["Mana Veins", 505, 555, "Cyan energy channels branching from the Crack of the Abyss.", "Abyssal Rift"], ["Obsidian Gate", 600, 405, "The inverted entrance to the Night Palace.", "Gate"], ["Blood Crystal Court", 315, 285, "Alice's crimson ceremonial court before the Sanguine Lair.", "Court"], ["Infernal Forge", 840, 560, "A colossal forge feeding the Molten Realm.", "Forge"], ["Chasm Watch", 710, 475, "A precarious platform observing the Crack below.", "Watchpost"]]
  },
  cadia: {
    boundary: "M86 250L140 180L225 170L285 115L375 130L445 82L530 112L605 70L685 115L775 92L845 145L940 150L1010 210L1085 250L1105 330L1080 400L1110 475L1050 535L1020 610L930 625L850 680L760 650L680 695L585 665L500 705L420 665L330 682L255 635L170 620L125 555L70 510L95 430L62 350Z",
    extras: [["Genbu's Rest", 720, 570, "A secluded riverland sanctuary associated with Baxia.", "Sanctuary"], ["Shadow Sect", 820, 245, "The hidden northern compound of the Shadow Sect.", "Sect City"], ["Scarlet Sect", 900, 300, "A crimson garden-fortress of the Scarlet Sect.", "Sect City"], ["Onmyodo Sect", 850, 365, "A spiritual enclave of seals and shikigami.", "Sect City"], ["Demon Sect", 925, 430, "The forbidden cliffside stronghold of the Demon Sect.", "Sect City"], ["Sky River", 460, 470, "A broad river descending from the sacred central peaks.", "River"], ["Dragon Gate", 520, 190, "Monumental northern gate of the Dragon Isles.", "Gate"]]
  },
  vonetis: {
    boundary: "M55 95H1145V690H55Z",
    extras: [["Siren's Reef", 925, 500, "A dangerous coral kingdom watched by three guardians.", "Reef"], ["Sunken Temple", 955, 555, "Ancient temple halls visible beneath clear southern water.", "Temple"], ["Coral Archway", 855, 525, "A monumental reef arch marking sacred waters.", "Landmark"], ["Tidal Pool", 1010, 465, "A luminous pool shaped by the archipelago's tides.", "Pool"], ["War Canoe Harbor", 470, 420, "Perlas harbor for the island warriors' great canoes.", "Harbor"], ["Market Plaza", 620, 430, "Perlas's lively open-air trade plaza.", "Market"], ["Blue Channel", 690, 215, "Deep-water route beneath Blue Flame Island's mist.", "Sea Route"]]
  }
};

function defs(detail = false, region = null) {
  const c = region?.color || "#6fa487";
  return `<defs>
    <linearGradient id="oceanGradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#276f77"/><stop offset=".45" stop-color="#164d59"/><stop offset="1" stop-color="#092f3e"/></linearGradient>
    <radialGradient id="mainLandGradient"><stop stop-color="#b8a96c"/><stop offset=".58" stop-color="#817d52"/><stop offset="1" stop-color="#4d563f"/></radialGradient>
    <linearGradient id="cadiaLand" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#54885c"/><stop offset="1" stop-color="#264d42"/></linearGradient>
    <pattern id="wavePattern" width="44" height="24" patternUnits="userSpaceOnUse"><path d="M0 13Q11 3 22 13T44 13" fill="none" stroke="#a3d0c8" stroke-width="1"/></pattern>
    <pattern id="worldGrain" width="90" height="90" patternUnits="userSpaceOnUse"><path d="M2 17Q24 9 45 20T88 18M8 56Q31 43 54 56T91 52" fill="none" stroke="#fff1c2" stroke-opacity=".08"/><circle cx="24" cy="40" r="1" fill="#201c13" opacity=".18"/><circle cx="70" cy="75" r="1.4" fill="#201c13" opacity=".15"/></pattern>
    <pattern id="detailGrid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M0 17 Q8 8 17 17 T34 17" fill="none" stroke="${c}" stroke-opacity=".16"/></pattern>
    <radialGradient id="detailLand"><stop stop-color="${c}" stop-opacity=".95"/><stop offset=".68" stop-color="${c}" stop-opacity=".62"/><stop offset="1" stop-color="#332d25"/></radialGradient>
    ${worldOrder.map(id => `<linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${regions[id].color}" stop-opacity=".82"/><stop offset="1" stop-color="${regions[id].color}" stop-opacity=".38"/></linearGradient>`).join("")}
    <clipPath id="mainlandClip"><path d="${MAINLAND_PATH}"/></clipPath>
    <clipPath id="cadiaClip"><path d="${CADIA_PATH}"/></clipPath>
    <filter id="landShadow"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000" flood-opacity=".5"/></filter>
    <filter id="regionGlow"><feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#fff1b3" flood-opacity=".8"/></filter>
    <filter id="textGlow"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#ffe092" flood-opacity=".9"/></filter>
    <filter id="rugged"><feTurbulence baseFrequency=".018" numOctaves="3" seed="8" type="fractalNoise" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="5"/></filter>
  </defs>`;
}
function markerIcon(type) {
  if (/City|Capital|Castle|Palace|Fortress|Academy|Sanctuary|Shrine|Temple|Headquarters|Docks|District/.test(type)) return "M-7 6V-2L0-8 7-2V6H2V1H-2V6Z";
  if (/Peak|Mountain/.test(type)) return "M-9 7L-2-7 2 0 5-5 10 7Z";
  if (/Forest|Tree/.test(type)) return "M0-9L-8 4H-3L-7 9H7L3 4H8Z";
  if (/Lake|Sea|Swamp|Oasis|Island/.test(type)) return "M-9 1Q-4-6 0 1Q4 8 9 1Q5 10 0 5Q-5 10-9 1Z";
  return "M0-9L8 0 0 9-8 0Z";
}
function worldSvg() {
  const mainlandRegions = ["northern", "moniyan", "eruditio", "agelta", "lantis", "barren", "azrya", "shadow"].map(id => `<g class="world-region" data-region="${id}"><path class="region-shape world-region-fill" fill="url(#g-${id})" d="${WORLD_REGION_PATHS[id]}"/></g>`).join("");
  const labels = worldOrder.map(id => worldLabel(id)).join("");
  const borders = `<g class="world-borders"><path d="M142 229C257 217 337 236 423 223C501 210 563 241 626 225C701 206 757 235 816 245"/><path d="M172 386C251 376 313 410 370 449C435 475 507 449 570 420"/><path d="M229 279C233 315 240 346 250 356"/><path d="M540 187C552 260 536 328 570 420C590 481 603 521 601 592"/><path d="M626 225C625 314 647 405 677 489"/><path d="M433 488C496 450 557 470 613 514"/><path d="M677 489C731 450 807 438 881 426"/></g>`;
  const routes = `<g class="world-routes"><path class="trade-route" d="M350 330C275 338 220 349 154 340M350 330C416 258 474 205 510 158M350 330C426 392 482 478 526 552M350 330C470 326 573 328 721 350M721 350C765 394 786 442 793 486"/><path class="trade-route sea-route" d="M510 158C720 98 889 122 1017 161M526 552C721 635 838 638 1000 620"/></g>`;
  return `${defs()}<rect class="ocean-base" width="1200" height="760"/><rect class="ocean-lines" width="1200" height="760"/><g class="world-map-art"><path class="mainland-underlay" d="${MAINLAND_PATH}"/><path class="mainland-base" d="${MAINLAND_PATH}"/><g clip-path="url(#mainlandClip)">${mainlandRegions}<rect class="world-grain" width="1200" height="760"/>${worldTerrain()}</g><path class="mainland-coast" d="${MAINLAND_PATH}"/>${borders}${routes}${cadiaWorld()}${vonetisWorld()}</g><g class="world-labels">${labels}</g><g class="title-cartouche"><path d="M425 24H775L800 48L775 72H425L400 48Z"/><text class="map-title-svg" x="600" y="48">THE LAND OF DAWN</text><text class="map-subtitle-svg" x="600" y="65">AN INTERACTIVE LORE ATLAS</text></g>`;
}
function worldLabel(id) {
  const r = regions[id], [x, y, w] = WORLD_LABELS[id];
  return `<g class="region-label-group" data-region="${id}" transform="translate(${x} ${y})"><path class="label-plaque" d="M${-w / 2} -19H${w / 2 - 13}L${w / 2} -6V19H${-w / 2 + 13}L${-w / 2} 6Z"/><path class="label-sigil" d="M${-w / 2 + 8} -14L${-w / 2 + 31} -14L${-w / 2 + 35} 0L${-w / 2 + 20} 15L${-w / 2 + 5} 0Z"/><text class="region-label" x="12" y="-2">${r.name}</text><text class="region-sub" x="12" y="11">${r.subtitle}</text></g>`;
}
function cadiaWorld() {
  return `<g class="world-region offshore-region" data-region="cadia"><path class="offshore-underlay" d="${CADIA_PATH}"/><path class="region-shape offshore-land cadia-land" d="${CADIA_PATH}"/><g clip-path="url(#cadiaClip)" class="cadia-terrain">${mountainRange([[952, 130], [987, 110], [1034, 101], [1080, 120], [1111, 158]], .62)}${forestPatch([[965, 193], [1002, 216], [1075, 196], [1118, 210]], .5)}<path class="river" d="M1045 110C1030 148 1060 178 1020 220"/></g><path class="offshore-coast" d="${CADIA_PATH}"/></g>`;
}
function vonetisWorld() {
  const paths = ["M905 591C922 570 956 574 967 596C954 619 923 622 905 591Z", "M972 628C995 597 1038 603 1052 633C1036 661 991 661 972 628Z", "M1065 580C1084 558 1116 564 1128 588C1115 611 1080 612 1065 580Z", "M1091 661C1106 646 1135 648 1143 669C1129 687 1104 685 1091 661Z", "M866 651C880 636 905 640 914 659C900 674 877 674 866 651Z"];
  return `<g class="world-region offshore-region vonetis-group" data-region="vonetis">${paths.map(d => `<path class="offshore-underlay" d="${d}"/><path class="region-shape offshore-land vonetis-land" d="${d}"/><path class="offshore-coast" d="${d}"/>`).join("")}</g>`;
}
function mountainRange(points, scale = 1) { return points.map(([x, y], i) => `<g class="terrain-symbol mountain-cluster" transform="translate(${x} ${y}) scale(${scale * (.8 + (i % 3) * .13)})"><path d="M-18 13L-4-15L8 4L16-9L31 13Z"/><path d="M-4-15L0-6L5-9L8 4" class="snow-line"/></g>`).join("") }
function forestPatch(points, scale = 1) { return points.map(([x, y], i) => `<g class="terrain-symbol forest-cluster" transform="translate(${x} ${y}) scale(${scale * (.85 + (i % 2) * .16)})"><path d="M0-15L-11 3H-5L-10 13H10L5 3H11Z"/><path d="M15-10L6 5H11L7 14H24L20 5H25Z"/></g>`).join("") }
function worldTerrain() {
  return `<g class="world-terrain">
    ${mountainRange([[285, 146], [330, 125], [375, 117], [420, 112], [465, 110], [510, 117], [556, 126], [602, 143]], .72)}
    ${mountainRange([[566, 214], [576, 259], [585, 304], [595, 350], [607, 399], [621, 447], [638, 492]], .63)}
    ${mountainRange([[686, 261], [722, 273], [758, 286], [798, 305]], .52)}
    ${forestPatch([[235, 280], [278, 267], [315, 288], [387, 260], [438, 279], [478, 310]], .58)}
    ${forestPatch([[439, 505], [474, 530], [510, 501], [548, 538], [575, 571]], .72)}
    ${forestPatch([[688, 388], [728, 404], [768, 392], [822, 410]], .5)}
    <g class="desert-dunes"><path d="M108 472Q151 441 194 472T280 472M92 510Q137 480 182 510T272 510M145 551Q189 525 234 551T323 551"/></g>
    <path class="river" d="M405 145C390 207 447 228 425 291C407 345 452 388 435 451C426 486 449 516 474 542"/>
    <path class="river" d="M675 259C702 299 685 338 716 374C749 410 728 449 752 486"/>
    <path class="abyss-rift" d="M817 438L793 463L821 481L791 509L809 541"/>
  </g>`;
}
function islands() { return `<path class="island" d="M1090 585q22-16 45 5q-19 24-44 7zM1040 635q15-12 32 3q-14 18-31 5zM200 700q18-14 38 3q-17 20-37 5z"/>`; }
function detailBoundary(id) {
  return REGIONAL_ATLAS[id]?.boundary || REGIONAL_ATLAS.moniyan.boundary;
}
function getRegionLandmarks(id) { return [...regions[id].landmarks, ...(REGIONAL_ATLAS[id]?.extras || [])] }
function regionalRoutes(id, landmarks) {
  const hub = landmarks[0], branches = landmarks.slice(1).map((l, i) => i % 2 === 0 ? `M${hub[1]} ${hub[2]}Q${(hub[1] + l[1]) / 2 + (i % 3 - 1) * 45} ${(hub[2] + l[2]) / 2 - (i % 2) * 35} ${l[1]} ${l[2]}` : "").join("");
  const className = id === "vonetis" ? "detail-route regional-sea-route" : "detail-route regional-road";
  return `<g class="regional-routes"><path class="${className}" d="${branches}"/></g>`;
}
function terrainIcons(points, type, scale = .7) {
  if (type === "mountain") return mountainRange(points, scale);
  if (type === "forest") return forestPatch(points, scale);
  return "";
}
function regionalScene(id) {
  const scenes = {
    northern: `<g class="regional-scene ice-scene">${terrainIcons([[220, 245], [285, 210], [365, 235], [500, 175], [650, 210], [760, 250], [890, 220]], "mountain", .9)}<path class="ice-ridge" d="M115 345L235 315L330 350L445 310L555 352L675 320L805 365L950 330L1080 375"/><path class="glacier-river" d="M270 180C330 280 300 390 420 470C510 530 530 620 610 690"/><g class="ice-floes">${[[130, 145], [190, 115], [930, 155], [1020, 205], [165, 580], [990, 585]].map(([x, y], i) => `<path style="--delay:${i * -1.2}s" d="M${x - 28} ${y}l18-15 30 4 14 20-25 13-32-5z"/>`).join("")}</g><g class="snowfall">${Array.from({ length: 20 }, (_, i) => `<circle style="--delay:${i * -.35}s" cx="${90 + (i * 59) % 1040}" cy="${115 + (i * 83) % 540}" r="${2 + i % 3}"/>`).join("")}</g></g>`,
    moniyan: `<g class="regional-scene moniyan-scene">${terrainIcons([[160, 210], [230, 175], [900, 210], [980, 250], [270, 600], [920, 585]], "mountain", .7)}${terrainIcons([[210, 380], [285, 430], [330, 520], [860, 365], [930, 430], [380, 610]], "forest", .65)}<path class="royal-river" d="M365 120C430 220 395 315 480 390C555 455 600 540 585 675"/><ellipse class="azure-lake" cx="820" cy="510" rx="130" ry="78"/><g class="farmland">${Array.from({ length: 8 }, (_, i) => `<path d="M${165 + i * 68} 300q35-24 70 0t70 0M${145 + i * 72} 335q35-24 70 0t70 0"/>`).join("")}</g><g class="city-glow"><circle cx="540" cy="350" r="72"/><circle cx="815" cy="510" r="48"/></g></g>`,
    agelta: `<g class="regional-scene agelta-scene">${terrainIcons([[910, 210], [970, 250], [1020, 315], [955, 390]], "mountain", .78)}<g class="dune-field">${Array.from({ length: 13 }, (_, i) => `<path style="--delay:${i * -.4}s" d="M${90 + (i * 79) % 950} ${180 + (i * 67) % 460}q38-30 76 0t76 0"/>`).join("")}</g><path class="emerald-road" d="M150 585C300 480 390 390 560 310S800 220 970 155"/><path class="canyon" d="M110 390L270 355L355 430L490 445L590 550L760 565L900 650"/><g class="oasis-art"><ellipse cx="760" cy="590" rx="78" ry="36"/><circle cx="730" cy="545" r="12"/><circle cx="785" cy="550" r="10"/></g><g class="heat-haze">${Array.from({ length: 7 }, (_, i) => `<path style="--delay:${i * -.5}s" d="M${160 + i * 135} 620q25-35 50 0t50 0"/>`).join("")}</g></g>`,
    eruditio: `<g class="regional-scene eruditio-scene"><g class="tech-grid">${Array.from({ length: 8 }, (_, i) => `<path d="M${180 + i * 115} 130V650M130 ${170 + i * 65}H1070"/>`).join("")}</g><g class="aether-rail"><path d="M210 245C390 310 510 260 575 300S770 420 930 590"/><path d="M300 570C430 500 600 520 850 425"/></g><g class="gear-field">${[[250, 245], [380, 500], [575, 300], [720, 245], [850, 425], [930, 590]].map(([x, y], i) => `<g style="--delay:${i * -.7}s" transform="translate(${x} ${y})"><circle r="${26 + i % 3 * 8}"/><path d="M-35 0H35M0-35V35M-25-25L25 25M25-25L-25 25"/></g>`).join("")}</g><g class="aether-pulses">${Array.from({ length: 12 }, (_, i) => `<circle style="--delay:${i * -.25}s" cx="${160 + (i * 89) % 900}" cy="${150 + (i * 113) % 500}" r="3"/>`).join("")}</g></g>`,
    lantis: `<g class="regional-scene lantis-scene">${terrainIcons([[340, 180], [420, 140], [500, 180], [580, 120], [660, 170], [740, 125], [820, 190], [380, 300], [470, 270], [560, 320], [650, 270], [750, 320], [430, 450], [520, 410], [620, 455], [720, 420], [500, 590], [610, 560], [710, 610]], "mountain", 1.15)}<path class="mountain-pass" d="M260 540C390 500 430 420 565 390S720 315 880 260"/><path class="mountain-pass lightward" d="M300 620C440 590 560 520 620 610"/><g class="mountain-mist">${Array.from({ length: 7 }, (_, i) => `<path style="--delay:${i * -.6}s" d="M${230 + i * 115} ${235 + (i % 3) * 145}q65-35 130 0t130 0"/>`).join("")}</g></g>`,
    barren: `<g class="regional-scene barren-scene">${terrainIcons([[180, 230], [245, 205], [900, 220], [980, 275], [250, 610], [800, 620]], "forest", .7)}<g class="dead-forest">${Array.from({ length: 18 }, (_, i) => `<path d="M${120 + (i * 61) % 980} ${170 + (i * 97) % 500}v-25m0 10l-10-12m10 5l11-13"/>`).join("")}</g><path class="blight-rift" d="M250 520L340 475L420 505L510 440L590 470L680 390L760 430L880 360"/><g class="stormeye"><circle cx="870" cy="430" r="75"/><circle cx="870" cy="430" r="48"/><circle cx="870" cy="430" r="19"/></g><g class="ashfall">${Array.from({ length: 18 }, (_, i) => `<circle style="--delay:${i * -.3}s" cx="${100 + (i * 67) % 1000}" cy="${130 + (i * 107) % 560}" r="${1 + i % 3}"/>`).join("")}</g></g>`,
    azrya: `<g class="regional-scene azrya-scene">${terrainIcons([[145, 230], [210, 190], [285, 235], [860, 210], [945, 250], [995, 330], [180, 520], [260, 590], [850, 590], [960, 520], [380, 230], [725, 245]], "forest", 1.05)}<ellipse class="moonlake-art" cx="590" cy="605" rx="135" ry="62"/><g class="life-tree"><path d="M575 440V230M575 300L485 220M575 315L670 225M575 355L455 330M575 365L710 330"/><circle cx="575" cy="235" r="75"/></g><g class="moonbeams">${Array.from({ length: 7 }, (_, i) => `<path style="--delay:${i * -.5}s" d="M${210 + i * 130} 100L${310 + i * 100} 650"/>`).join("")}</g><g class="forest-motes">${Array.from({ length: 24 }, (_, i) => `<circle style="--delay:${i * -.23}s" cx="${100 + (i * 73) % 1000}" cy="${140 + (i * 101) % 520}" r="${2 + i % 2}"/>`).join("")}</g></g>`,
    shadow: `<g class="regional-scene shadow-scene">${terrainIcons([[170, 190], [260, 155], [890, 190], [990, 245], [250, 620], [870, 620]], "mountain", .8)}<path class="major-abyss" d="M600 115L555 215L625 290L565 380L635 470L570 590L610 690"/><path class="minor-abyss" d="M330 260L410 330L385 430M790 300L720 375L760 480"/><g class="lava-field">${Array.from({ length: 6 }, (_, i) => `<path d="M${780 + i * 45} 560q35-55 70 0t70 0"/>`).join("")}</g><g class="abyss-orbit"><circle cx="600" cy="500" r="105"/><circle cx="600" cy="500" r="145"/></g><g class="abyss-sparks">${Array.from({ length: 22 }, (_, i) => `<circle style="--delay:${i * -.2}s" cx="${180 + (i * 83) % 850}" cy="${140 + (i * 109) % 520}" r="${2 + i % 3}"/>`).join("")}</g></g>`,
    cadia: `<g class="regional-scene cadia-scene">${terrainIcons([[250, 210], [330, 170], [420, 205], [560, 155], [660, 190], [790, 175], [900, 230], [980, 280]], "mountain", .78)}${terrainIcons([[180, 430], [260, 500], [370, 560], [730, 520], [845, 460], [940, 530]], "forest", .72)}<path class="cadia-river" d="M520 130C490 230 560 280 520 360S580 500 520 650"/><path class="cadia-river branch" d="M520 360C400 380 345 470 255 520M520 360C665 370 750 440 900 470"/><g class="cloud-banks">${Array.from({ length: 7 }, (_, i) => `<path style="--delay:${i * -.7}s" d="M${120 + i * 145} ${150 + (i % 3) * 175}q45-35 90 0t90 0"/>`).join("")}</g><g class="dragon-current"><path d="M380 420C470 300 660 290 790 395S940 520 1010 450"/></g></g>`,
    vonetis: `<g class="regional-scene vonetis-scene"><g class="reef-field">${Array.from({ length: 18 }, (_, i) => `<circle cx="${95 + (i * 73) % 1050}" cy="${130 + (i * 109) % 520}" r="${8 + i % 4 * 4}"/>`).join("")}</g><g class="regional-islands"><path d="M445 300Q565 220 680 300L650 455Q550 500 455 440Z"/><path d="M505 90Q575 55 650 105L625 190Q555 220 500 170Z"/><path d="M250 550Q335 500 415 555L390 650Q305 685 240 625Z"/><path d="M800 410Q900 350 1010 420L980 570Q870 610 790 535Z"/><path d="M120 270Q210 225 285 285L260 390Q175 420 110 350Z"/></g><g class="sea-currents">${Array.from({ length: 8 }, (_, i) => `<path style="--delay:${i * -.5}s" d="M${80 + i * 125} ${200 + (i % 4) * 110}q60-35 120 0t120 0"/>`).join("")}</g><g class="blue-flame"><path d="M560 155q-30-45 5-75q45 35 5 78q35-10 50 25q-45 28-60-28z"/></g></g>`
  };
  return scenes[id] || scenes.moniyan;
}
function detailSvg(id) {
  const r = regions[id], landmarks = getRegionLandmarks(id), boundary = detailBoundary(id);
  const landBase = id === "vonetis" ? "" : `<path class="regional-underlay" d="${boundary}"/><path class="regional-land" fill="url(#detailLand)" d="${boundary}"/><path class="regional-grain" fill="url(#worldGrain)" d="${boundary}"/>`;
  const coast = id === "vonetis" ? "" : `<path class="regional-coast" d="${boundary}"/>`;
  const marks = landmarks.map((l, i) => {
    const supplemental = i >= regions[id].landmarks.length, width = Math.max(72, Math.min(142, l[0].length * 6.2 + 22));
    return `<g class="landmark ${supplemental ? "supplemental-poi" : "major-poi"}" data-landmark="${i}" transform="translate(${l[1]} ${l[2]})"><circle class="pulse" r="${supplemental ? 7 : 11}"/><path class="pin" d="${markerIcon(l[4])}"/><g class="landmark-label" transform="translate(0 -20)"><rect x="${-width / 2}" y="-13" width="${width}" height="22" rx="3"/><text y="1">${l[0]}</text></g><text class="minor" y="16">${l[4]}</text></g>`;
  }).join("");
  return `${defs(true, r)}<defs><clipPath id="regionalClip"><path d="${boundary}"/></clipPath></defs><rect class="regional-ocean ocean-base" width="1200" height="760"/><rect class="ocean-lines" width="1200" height="760"/><g class="regional-map region-${id}">${landBase}<g clip-path="url(#regionalClip)">${regionalScene(id)}${regionalRoutes(id, landmarks)}</g>${coast}</g><g class="regional-cartouche"><path d="M390 20H810L840 48L810 80H390L360 48Z"/><text class="map-title-svg" x="600" y="49">${r.name.toUpperCase()}</text><text class="map-subtitle-svg" x="600" y="68">${r.subtitle.toUpperCase()}</text></g><g class="regional-landmarks">${marks}</g>`;
}
function renderWorld() {
  currentRegion = null; selectedLandmark = null; svg.dataset.region = "world"; svg.innerHTML = worldSvg(); title.textContent = "World Overview"; setMapUrl(); resetView(); bindMapItems(); setInspectorWorld(); updateRail();
}
function renderRegion(id) {
  currentRegion = id; selectedLandmark = null; const r = regions[id]; svg.dataset.region = id; svg.innerHTML = detailSvg(id); title.textContent = r.name; setMapUrl(id); resetView(); bindMapItems(); setInspectorRegion(id); updateRail();
}
function setMapUrl(region = "") { const query = region ? `?region=${encodeURIComponent(region)}` : ""; try { history.replaceState({ region }, "", `${location.pathname}${query}`) } catch { } }
function bindMapItems() {
  svg.classList.toggle("labels-hidden", !labelsVisible);
  svg.querySelectorAll("[data-region]").forEach(el => el.addEventListener("click", e => { if (!moved) { e.stopPropagation(); renderRegion(el.dataset.region) } }));
  svg.querySelectorAll("[data-landmark]").forEach(el => el.addEventListener("click", e => { if (!moved) { e.stopPropagation(); selectLandmark(+el.dataset.landmark) } }));
}
function setInspectorWorld() {
  inspector("World Atlas", "Land of Dawn", "Select a glowing region label to open its dedicated map. The overview places the Northern Vale across the far north; Moniyan centre-west; the Barren Lands and Shadow Abyss east; Agelta southwest; Azrya south-centre; Cadia offshore east; and Vonetis across the far southern sea.", worldOrder.map(id => regions[id].name), []);
}
function setInspectorRegion(id) {
  const r = regions[id], landmarks = getRegionLandmarks(id); inspector(`${landmarks.length} mapped locations`, r.name, r.summary, landmarks.map(x => x[0]), [{ label: "Return to world map", fn: renderWorld }]);
}
function selectLandmark(index) {
  selectedLandmark = index; svg.querySelectorAll(".landmark").forEach((x, i) => x.classList.toggle("active", i === index)); const l = getRegionLandmarks(currentRegion)[index];
  inspector(l[4], l[0], l[3], [regions[currentRegion].name, l[4]], [{ label: `View all ${regions[currentRegion].name} landmarks`, fn: () => setInspectorRegion(currentRegion) }, { label: "Return to world map", fn: renderWorld }]);
}
function inspector(typeText, titleText, text, tags, actions) {
  document.getElementById("inspectorType").textContent = typeText; document.getElementById("inspectorTitle").textContent = titleText; document.getElementById("inspectorText").textContent = text;
  document.getElementById("inspectorTags").innerHTML = tags.slice(0, 12).map(x => `<span>${x}</span>`).join("");
  const area = document.getElementById("inspectorActions"); area.innerHTML = ""; actions.forEach(a => { const b = document.createElement("button"); b.textContent = a.label; b.addEventListener("click", a.fn); area.appendChild(b) });
}
function updateRail() {
  document.getElementById("regionRail").innerHTML = `<button data-open="world" class="${!currentRegion ? "active" : ""}" style="--region:#d4b66a">World</button>` + worldOrder.map(id => `<button data-open="${id}" class="${currentRegion === id ? "active" : ""}" style="--region:${regions[id].color}">${regions[id].name}</button>`).join("");
  document.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => b.dataset.open === "world" ? renderWorld() : renderRegion(b.dataset.open)));
}
function setView() { svg.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`) }
function resetView() { view = { x: 0, y: 0, w: 1200, h: 760 }; setView() }
function zoom(factor, cx = view.x + view.w / 2, cy = view.y + view.h / 2) { const nw = Math.max(360, Math.min(1200, view.w * factor)); const nh = nw / 1200 * 760; view.x = cx - (cx - view.x) * (nw / view.w); view.y = cy - (cy - view.y) * (nh / view.h); view.w = nw; view.h = nh; clamp(); setView() }
function clamp() { view.x = Math.max(-80, Math.min(1280 - view.w, view.x)); view.y = Math.max(-50, Math.min(810 - view.h, view.y)) }
function point(event) { const rect = svg.getBoundingClientRect(); return { x: view.x + (event.clientX - rect.left) / rect.width * view.w, y: view.y + (event.clientY - rect.top) / rect.height * view.h } }
svg.addEventListener("wheel", e => { e.preventDefault(); const p = point(e); zoom(e.deltaY > 0 ? 1.13 : .87, p.x, p.y) }, { passive: false });
svg.addEventListener("pointerdown", e => { svg.setPointerCapture(e.pointerId); drag = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y }; moved = false; svg.classList.add("dragging") });
svg.addEventListener("pointermove", e => { if (!drag) return; const rect = svg.getBoundingClientRect(), dx = (e.clientX - drag.x) / rect.width * view.w, dy = (e.clientY - drag.y) / rect.height * view.h; if (Math.abs(dx) + Math.abs(dy) > 3) moved = true; view.x = drag.vx - dx; view.y = drag.vy - dy; clamp(); setView() });
svg.addEventListener("pointerup", () => { drag = null; svg.classList.remove("dragging"); setTimeout(() => moved = false, 0) });
document.getElementById("zoomIn").addEventListener("click", () => zoom(.8)); document.getElementById("zoomOut").addEventListener("click", () => zoom(1.2)); document.getElementById("resetMap").addEventListener("click", resetView); document.getElementById("worldButton").addEventListener("click", renderWorld);
document.getElementById("toggleLabels").addEventListener("click", () => { labelsVisible = !labelsVisible; svg.classList.toggle("labels-hidden", !labelsVisible) });
document.getElementById("fullscreenMap").addEventListener("click", () => document.getElementById("mapFrame").requestFullscreen?.());
addEventListener("keydown", e => { if (e.key === "+") zoom(.8); if (e.key === "-") zoom(1.2); if (e.key === "0") resetView(); if (e.key === "Escape" && currentRegion) renderWorld() });
const initialRegion = new URLSearchParams(location.search).get("region");
regions[initialRegion] ? renderRegion(initialRegion) : renderWorld();
