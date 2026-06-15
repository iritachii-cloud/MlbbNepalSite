const SVG_NS = "http://www.w3.org/2000/svg";
const regions = {
  moniyan: {
    name:"Moniyan Empire", subtitle:"The Radiant Heart", color:"#d7b45b",
    summary:"The centre-west empire of light. Lumina City anchors its road network; Castle Grandrock watches the north, Castle Aberleen guards the southern mist, and Azure Lake shines in the southeast.",
    worldPath:"M245 225 Q295 178 390 190 Q500 180 585 245 L565 405 Q515 485 390 470 Q280 455 225 360 Z", label:[395,315],
    source:"Map Moniyan Empire Region.litcoffee",
    landmarks:[["Lumina City",540,350,"Imperial capital at the nexus of the Moniyan Plains and sacred roads.","Capital"],["Castle Grandrock",525,180,"Northern fortress built upon a colossal defensible plateau.","Fortress"],["Castle Gorge",260,350,"Western capital surrounded by mines and defensive walls.","City"],["Castle Aberleen",525,555,"Southern Paxley duchy, shrouded in supernatural mist.","Castle"],["Azure Lake",815,500,"Deep blue-teal lake in the empire's southeast.","Lake"],["Swan Castle",870,545,"House Alvin's secluded white-marble castle on Azure Lake.","Castle"],["Monastery of Light",675,285,"Sacred white sanctuary with a radiant golden spire.","Sanctuary"],["Mossenia",775,350,"Imperial sanctuary marked by an ancient ring of standing stones.","Sanctuary"],["Black Forest",320,565,"Wild southeastern woodland tied to werewolves and old dangers.","Forest"],["Moniyan Plains",380,420,"The empire's broad, road-crossed agricultural heartland.","Plains"]]
  },
  northern: {
    name:"Northern Vale", subtitle:"The Frozen Throne", color:"#9ed8e7",
    summary:"The frozen northern crown of the continent. Queen's Peak rises above the Frozen Sea, while the Megalith Wasteland forms the dangerous southern frontier.",
    worldPath:"M255 75 Q410 20 640 55 Q775 65 835 145 L775 210 Q630 185 520 205 Q370 190 245 215 Q205 145 255 75 Z", label:[525,120],
    source:"Map Northern Vale Region.litcoffee",
    landmarks:[["Queen's Peak",255,245,"Titanic ice-sheathed mountain and Aurora's crystalline throne.","Peak"],["Frozen Sea",170,120,"Silver-blue northern sea broken by drifting icebergs.","Sea"],["Megalith Wasteland",560,590,"Southern frontier of red earth and towering stone spires.","Wasteland"],["Great Martyr Shrine",585,365,"Sacred shrine at the heart of the Vale.","Shrine"],["Magic Academy",930,300,"Mysterious floating academy connected by an enchanted bridge.","Academy"],["Kastiya",890,150,"Warm-lit port on the northeastern coast.","Port"],["Ice Palace",300,205,"Aurora's translucent sanctuary at Queen's Peak.","Palace"]]
  },
  agelta: {
    name:"Agelta Drylands", subtitle:"The Sun-Scorched Expanse", color:"#c68a42",
    summary:"The far southwest desert. The Emerald Road crosses ruins and city-states before fraying toward Los Pecados and the trackless Western Expanse.",
    worldPath:"M95 385 Q180 350 300 375 L430 450 L410 650 Q275 705 125 640 Q65 530 95 385 Z", label:[245,515],
    source:"Map Agelta Drylands Region.litcoffee",
    landmarks:[["Emerald Road",560,310,"Ancient trade road cutting diagonally across the desert.","Trade Route"],["Wind Fort",385,260,"Sandstone garrison shaped by centuries of desert wind.","Fortress"],["Fire Throat",300,500,"Volcanic forge-city glowing with amber and crimson.","Forge City"],["Ruins of Tivacan",180,380,"Broken columns and the sealed tomb of Khufra.","Ruins"],["Minoan Labyrinth",675,445,"Seven-ring open-air maze and Minotaur's prison of memory.","Labyrinth"],["Stargate Valley",825,260,"Celestial observatories connected like constellations.","Observatory"],["Los Pecados",580,635,"Lawless canyon city at the edge of the Western Expanse.","City"],["Belerick's Oasis",760,590,"A perfect emerald oasis created by Belerick.","Oasis"],["Western Expanse",195,625,"Trackless sea of dunes beyond organised roads.","Desert"],["Foggy Mountains",930,390,"Misty northeastern barrier adjacent to Moniyan.","Mountains"]]
  },
  eruditio: {
    name:"Eruditio", subtitle:"City of Scholars", color:"#8c78d9",
    summary:"A techno-arcane city-state at the mid-west, north of the Agelta desert proper. Brass spires, airships, gears, and lightning define its skyline.",
    worldPath:"M120 305 Q175 265 245 290 L280 355 L225 410 L145 395 Q105 350 120 305 Z", label:[190,345],
    source:"Map Eruditio Region.litcoffee",
    landmarks:[["Grand Spire",575,300,"Central tower and intellectual heart of Eruditio.","Spire"],["Airship Docks",260,245,"Elevated docks crowded with arcane airships.","Docks"],["Gear Quarter",380,500,"Industrial district of heavy machinery and inventions.","District"],["Lightning Reactor",850,425,"City-scale power reactor blazing with violet-white current.","Reactor"],["Laboratory 1718",570,650,"Hidden subterranean foundry of souls beneath the Gear Quarter.","Hidden Lab"],["Scholars District",720,245,"Research halls and experimental academies.","District"],["Eruditio Rangers",880,590,"Operational headquarters of the city's defenders.","Headquarters"]]
  },
  lantis: {
    name:"Lantis Mountains", subtitle:"The Great Divide", color:"#9b927f",
    summary:"The continent's longest mountain barrier, separating Moniyan from the Barren Lands and slowing every major Abyssal offensive.",
    worldPath:"M585 190 L635 180 L665 500 L610 535 L565 405 Z", label:[620,345],
    source:"Map 1 Global.litcoffee",
    landmarks:[["Gate of Lament",565,270,"A fortified passage through the northern divide.","Gate"],["Sanctum Vigil",430,390,"Lightward watch-fort overlooking the passes.","Sanctum"],["Grock Graveyard",700,360,"Ancient resting ground of stone guardians.","Graveyard"],["Lantis Spine",585,170,"Highest, longest mountain spine in the Land of Dawn.","Mountains"],["Southern Breach",620,610,"Critical southern passage repeatedly tested by demon tides.","Pass"],["Abyssward Scar",850,470,"Corrupted eastern face exposed to Barren Lands miasma.","Scar"],["Lightward Pass",260,500,"Western route descending into Moniyan territory.","Pass"]]
  },
  barren: {
    name:"Barren Lands & Necrokeep", subtitle:"The Land of Despair", color:"#7c665c",
    summary:"Once prosperous territory east of the Lantis Mountains, now blighted by Abyssal corruption. Necrokeep dominates its centre.",
    worldPath:"M655 250 Q750 220 850 280 L875 470 Q810 545 675 515 L630 450 Z", label:[755,385],
    source:"Map Barren Lands Region.litcoffee",
    landmarks:[["Necrokeep",590,370,"Vexana's jagged Fortress of Despair at the region's heart.","Fortress"],["Askati Forest",520,185,"Pale petrified forest north of Necrokeep.","Forest"],["Despair Place",500,610,"Cracked ochre plain south of the fortress.","Wasteland"],["Stormeye Wasteland",870,430,"Eastern wasteland beneath a permanent storm vortex.","Wasteland"],["Rantha Mountains",710,650,"Secondary mountain range along the south.","Mountains"],["Lantis Mountains",230,360,"Western barrier separating the blight from Moniyan.","Mountains"],["Outer War Zone",350,260,"Dead-tree frontier where organised patrols can still operate.","War Zone"]]
  },
  azrya: {
    name:"Azrya Woodlands", subtitle:"The Moonlit Realm", color:"#4f9871",
    summary:"Moonlit forests in the south-centre, nestled between Moniyan, the Barren Lands, and the southern coast. The Tree of Life anchors the realm.",
    worldPath:"M425 485 Q525 450 650 500 L720 620 Q650 705 500 680 L405 605 Z", label:[560,585],
    source:"Map Azrya Woodlands Region.litcoffee",
    landmarks:[["Tree of Life",575,325,"World-spanning ancient tree at the absolute centre of Azrya.","Sacred Tree"],["Lunar Temple",590,220,"Moon-white shrine grown into the Tree's highest boughs.","Temple"],["Moonlake",590,605,"Still silver lake south of the Tree, reflecting the temple.","Lake"],["Moonlit Forest",370,390,"Vast sacred forest crossed by shafts of silver light.","Forest"],["Shadow Swamp",920,445,"Corrupted eastern stain near the Barren Lands.","Swamp"],["Enchanted Forest",260,500,"Wild western glade shimmering with cyan and gold motes.","Forest"],["Dark Forest",775,590,"Ancient foreboding woodland of charcoal trunks.","Forest"],["Root Sanctuary",540,420,"Healing sanctuary formed by the Tree's cathedral-like roots.","Sanctuary"]]
  },
  shadow: {
    name:"Shadow Abyss", subtitle:"The Kingdom of Darkness", color:"#564080",
    summary:"The far-eastern wound in the world. The Crack of the Abyss splits the land beneath the inverted Night Palace.",
    worldPath:"M875 215 Q985 175 1080 250 L1120 445 Q1040 555 885 490 L850 300 Z", label:[985,350],
    source:"Map Shadow Abyss Region.litcoffee",
    landmarks:[["Crack of the Abyss",600,500,"Colossal cyan-lit fissure and birthplace of the Abyss.","Abyssal Rift"],["Night Palace",600,330,"Obsidia's inverted obsidian cathedral suspended above the Crack.","Palace"],["Sanguine Lair",300,220,"Alice's vermilion-black thorned domain to the north.","Lair"],["Molten Realm",860,610,"Thamuz's volcanic territory at the southern edge.","Volcanic Realm"],["Abyssal Dragon Spine",930,250,"Colossal bone-white spine coiling around the region.","Dragon Remains"],["Four Bone Bridges",600,410,"Delicate bridges connecting the palace to shattered cliffs.","Bridge"]]
  },
  cadia: {
    name:"Cadia Riverlands", subtitle:"The Dragon Isles", color:"#5f9b76",
    summary:"An island continent across the Sea of Hope at the far east. The Dragon Altar rests in its cloud-shrouded mountainous heart.",
    worldPath:"M930 70 Q1035 35 1145 100 L1150 235 Q1060 280 940 230 L900 145 Z", label:[1035,145],
    source:"Map Cadia Riverlands Region.litcoffee",
    landmarks:[["Dragon Altar",575,375,"Sacred tiered pagoda encircled by the Great Dragon.","Altar"],["City of the Dragon",520,125,"Northern port city ruled by Empress Zetian.","Capital"],["Forbidden Area of Dragon Soul",790,300,"Mist-shrouded sealed peak glowing emerald.","Forbidden Peak"],["Jaguar Peak",275,315,"Named western mountain peak of the Riverlands.","Peak"],["Sky Arch",335,500,"Natural celestial arch near the hidden Scarlet Shadow canyon.","Landmark"],["Stream Valley",600,600,"River-cut valley beneath the central mountains.","Valley"],["Black Dragon Lair",880,625,"Yu Zhong's domain in the southern mountains.","Lair"],["Scarlet Shadow",845,190,"Hidden canyon of the four sects northeast of Sky Arch.","Hidden Canyon"]]
  },
  vonetis: {
    name:"Vonetis Sea & Archipelago", subtitle:"The Southern Islands", color:"#48a9a6",
    summary:"The tropical archipelago scattered across the far southern seas. Perlas is its central trade hub; Blue Flame and Baker Islands mark its north and south.",
    worldPath:"M300 690 Q360 655 420 700 Q485 660 545 715 Q620 670 690 720 Q770 675 845 720 Q920 680 990 720 L970 750 L330 750 Z", label:[655,725],
    source:"Map Vontesis Sea & Aechipelago Region.litcoffee",
    landmarks:[["Perlas",565,375,"Largest central island and bustling trade port.","Island Capital"],["Blue Flame Island",560,130,"Northern island shrouded in permanent glowing blue mist.","Island"],["Baker Island",360,650,"Dark southern research island below Agelta.","Island"],["Sea-Spirit Whale",930,390,"Legendary spirit whale of the Great Southern Channel.","Mythic Beast"],["Great Southern Channel",790,520,"Open eastern water crossed by ships and sea spirits.","Sea Route"],["Makadan Islands",280,340,"Warrior islands associated with Lapu-Lapu.","Islands"],["Lapu-Lapu Shrine",520,330,"Sacred coral platform overlooking Perlas.","Shrine"]]
  }
};

const worldOrder=["northern","moniyan","eruditio","agelta","lantis","barren","azrya","shadow","cadia","vonetis"];
const svg=document.getElementById("fantasyMap");
const title=document.getElementById("mapTitle");
let currentRegion=null, selectedLandmark=null, labelsVisible=true;
let view={x:0,y:0,w:1200,h:760}, drag=null, moved=false;

function defs(detail=false, region=null){
  const c=region?.color||"#6fa487";
  return `<defs>
    <linearGradient id="oceanGradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#123d4b"/><stop offset=".48" stop-color="#0a2938"/><stop offset="1" stop-color="#071b29"/></linearGradient>
    <pattern id="wavePattern" width="42" height="22" patternUnits="userSpaceOnUse"><path d="M0 12 Q10 2 21 12 T42 12" fill="none" stroke="#8bc3c8" stroke-width="1"/></pattern>
    <pattern id="detailGrid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M0 17 Q8 8 17 17 T34 17" fill="none" stroke="${c}" stroke-opacity=".16"/></pattern>
    <radialGradient id="detailLand"><stop stop-color="${c}" stop-opacity=".95"/><stop offset=".68" stop-color="${c}" stop-opacity=".62"/><stop offset="1" stop-color="#332d25"/></radialGradient>
    ${worldOrder.map(id=>`<linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${regions[id].color}" stop-opacity=".98"/><stop offset="1" stop-color="${regions[id].color}" stop-opacity=".5"/></linearGradient>`).join("")}
    <filter id="landShadow"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000" flood-opacity=".5"/></filter>
    <filter id="regionGlow"><feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#fff1b3" flood-opacity=".8"/></filter>
    <filter id="textGlow"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#ffe092" flood-opacity=".9"/></filter>
  </defs>`;
}
function markerIcon(type){
  if(/City|Capital|Castle|Palace|Fortress|Academy|Sanctuary|Shrine|Temple|Headquarters|Docks|District/.test(type)) return "M-7 6V-2L0-8 7-2V6H2V1H-2V6Z";
  if(/Peak|Mountain/.test(type)) return "M-9 7L-2-7 2 0 5-5 10 7Z";
  if(/Forest|Tree/.test(type)) return "M0-9L-8 4H-3L-7 9H7L3 4H8Z";
  if(/Lake|Sea|Swamp|Oasis|Island/.test(type)) return "M-9 1Q-4-6 0 1Q4 8 9 1Q5 10 0 5Q-5 10-9 1Z";
  return "M0-9L8 0 0 9-8 0Z";
}
function worldSvg(){
  const routes=`<path class="trade-route" d="M395 315 Q265 330 190 345 M395 315 Q490 165 525 120 M395 315 Q510 405 560 585 M395 315 Q600 300 755 385 M755 385 Q890 350 985 350"/><path class="trade-route sea-route" d="M395 315 Q810 75 1035 145 M395 315 Q555 630 655 725 M1035 145 Q900 500 655 725"/>`;
  const regionMarkup=worldOrder.map(id=>{const r=regions[id];return `<g data-region="${id}"><path class="region-shape world-coast" fill="url(#g-${id})" d="${r.worldPath}"/><g class="region-label-group" transform="translate(${r.label[0]} ${r.label[1]})"><text class="region-label">${r.name}</text><text class="region-sub" y="15">${r.subtitle}</text></g></g>`}).join("");
  return `${defs()}<rect class="ocean-base" width="1200" height="760"/><rect class="ocean-lines" width="1200" height="760"/><text class="map-title-svg" x="600" y="38">THE LAND OF DAWN</text><text class="map-subtitle-svg" x="600" y="58">AN INTERACTIVE LORE ATLAS</text>${routes}${regionMarkup}<g opacity=".7">${islands()}</g>`;
}
function islands(){return `<path class="island" d="M1090 585q22-16 45 5q-19 24-44 7zM1040 635q15-12 32 3q-14 18-31 5zM200 700q18-14 38 3q-17 20-37 5z"/>`;}
function terrain(region){
  const mountains=Array.from({length:10},(_,i)=>`<path class="mountain" opacity=".45" d="M${155+i*92} ${155+(i%3)*38}l18-32 20 32 14-21 23 35h-76z"/>`).join("");
  const trees=Array.from({length:18},(_,i)=>`<path class="tree" opacity=".42" transform="translate(${120+(i*67)%970} ${250+(i*83)%360}) scale(${.6+(i%3)*.13})" d="M0-18L-13 4H-5L-10 15H10L5 4H13Z"/>`).join("");
  if(["northern","lantis","cadia"].includes(region)) return mountains;
  if(["azrya","moniyan","barren"].includes(region)) return trees+mountains;
  if(region==="vonetis") return islands()+Array.from({length:8},(_,i)=>`<ellipse class="island" cx="${180+i*120}" cy="${230+(i%3)*150}" rx="${55+(i%2)*20}" ry="${24+(i%3)*8}"/>`).join("");
  if(region==="shadow") return `<path d="M590 160L525 680M660 170L620 690" stroke="#69e1df" stroke-width="10" opacity=".35" filter="url(#regionGlow)"/>${mountains}`;
  return mountains;
}
function detailBoundary(id){
  const shapes={northern:"M100 170Q260 60 570 80Q930 50 1100 205L1030 650Q730 710 450 670Q170 710 85 480Z",moniyan:"M110 130Q410 60 720 120Q1080 120 1100 360Q1060 670 700 690Q320 710 90 520Z",agelta:"M90 120Q360 50 780 100Q1090 160 1110 500Q930 710 520 690Q160 700 70 480Z",eruditio:"M145 115Q420 35 800 110Q1080 160 1060 560Q780 700 360 660Q120 570 145 115Z",lantis:"M210 690Q150 450 330 120Q530 20 650 150Q780 10 950 170Q1080 420 930 700Z",barren:"M90 150Q350 70 740 115Q1080 180 1110 510Q910 700 480 680Q130 650 70 420Z",azrya:"M90 170Q350 50 720 90Q1090 160 1100 520Q880 710 480 690Q120 650 70 430Z",shadow:"M160 100Q510 30 900 100Q1110 270 1020 670Q680 720 250 650Q80 420 160 100Z",cadia:"M120 180Q300 30 650 80Q1030 20 1100 330Q1080 650 720 700Q360 690 100 520Z",vonetis:"M70 110Q400 35 820 95Q1120 180 1100 590Q790 730 360 680Q80 600 70 110Z"};return shapes[id]||shapes.moniyan;
}
function detailSvg(id){
  const r=regions[id];
  const routePoints=r.landmarks.map(x=>`${x[1]},${x[2]}`).join(" ");
  const marks=r.landmarks.map((l,i)=>`<g class="landmark" data-landmark="${i}" transform="translate(${l[1]} ${l[2]})"><circle class="pulse" r="10"/><path class="pin" d="${markerIcon(l[4])}"/><text y="-17">${l[0]}</text><text class="minor" y="-6">${l[4]}</text></g>`).join("");
  return `${defs(true,r)}<rect class="ocean-base" width="1200" height="760"/><rect class="ocean-lines" width="1200" height="760"/><path class="world-coast" fill="url(#detailLand)" d="${detailBoundary(id)}"/><path fill="url(#detailGrid)" opacity=".8" d="${detailBoundary(id)}"/>${terrain(id)}<polyline class="detail-route" points="${routePoints}"/><text class="map-title-svg" x="600" y="52">${r.name.toUpperCase()}</text><text class="map-subtitle-svg" x="600" y="73">${r.subtitle.toUpperCase()}</text>${marks}`;
}
function renderWorld(){
  currentRegion=null;selectedLandmark=null;svg.innerHTML=worldSvg();title.textContent="World Overview";resetView();bindMapItems();setInspectorWorld();updateRail();
}
function renderRegion(id){
  currentRegion=id;selectedLandmark=null;const r=regions[id];svg.innerHTML=detailSvg(id);title.textContent=r.name;resetView();bindMapItems();setInspectorRegion(id);updateRail();
}
function bindMapItems(){
  svg.classList.toggle("labels-hidden",!labelsVisible);
  svg.querySelectorAll("[data-region]").forEach(el=>el.addEventListener("click",e=>{if(!moved){e.stopPropagation();renderRegion(el.dataset.region)}}));
  svg.querySelectorAll("[data-landmark]").forEach(el=>el.addEventListener("click",e=>{if(!moved){e.stopPropagation();selectLandmark(+el.dataset.landmark)}}));
}
function setInspectorWorld(){
  inspector("World Atlas","Land of Dawn","Select a glowing region label to open its dedicated map. The overview places the Northern Vale across the far north; Moniyan centre-west; the Barren Lands and Shadow Abyss east; Agelta southwest; Azrya south-centre; Cadia offshore east; and Vonetis across the far southern sea.",worldOrder.map(id=>regions[id].name),[]);
}
function setInspectorRegion(id){
  const r=regions[id];inspector("Regional Map",r.name,r.summary,r.landmarks.map(x=>x[0]),[{label:"Return to world map",fn:renderWorld}]);
}
function selectLandmark(index){
  selectedLandmark=index;svg.querySelectorAll(".landmark").forEach((x,i)=>x.classList.toggle("active",i===index));const l=regions[currentRegion].landmarks[index];
  inspector(l[4],l[0],l[3],[regions[currentRegion].name,l[4]], [{label:`View all ${regions[currentRegion].name} landmarks`,fn:()=>setInspectorRegion(currentRegion)},{label:"Return to world map",fn:renderWorld}]);
}
function inspector(typeText,titleText,text,tags,actions){
  document.getElementById("inspectorType").textContent=typeText;document.getElementById("inspectorTitle").textContent=titleText;document.getElementById("inspectorText").textContent=text;
  document.getElementById("inspectorTags").innerHTML=tags.slice(0,12).map(x=>`<span>${x}</span>`).join("");
  const area=document.getElementById("inspectorActions");area.innerHTML="";actions.forEach(a=>{const b=document.createElement("button");b.textContent=a.label;b.addEventListener("click",a.fn);area.appendChild(b)});
}
function updateRail(){
  document.getElementById("regionRail").innerHTML=`<button data-open="world" class="${!currentRegion?"active":""}" style="--region:#d4b66a">World</button>`+worldOrder.map(id=>`<button data-open="${id}" class="${currentRegion===id?"active":""}" style="--region:${regions[id].color}">${regions[id].name}</button>`).join("");
  document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>b.dataset.open==="world"?renderWorld():renderRegion(b.dataset.open)));
}
function setView(){svg.setAttribute("viewBox",`${view.x} ${view.y} ${view.w} ${view.h}`)}
function resetView(){view={x:0,y:0,w:1200,h:760};setView()}
function zoom(factor,cx=view.x+view.w/2,cy=view.y+view.h/2){const nw=Math.max(360,Math.min(1200,view.w*factor));const nh=nw/1200*760;view.x=cx-(cx-view.x)*(nw/view.w);view.y=cy-(cy-view.y)*(nh/view.h);view.w=nw;view.h=nh;clamp();setView()}
function clamp(){view.x=Math.max(-80,Math.min(1280-view.w,view.x));view.y=Math.max(-50,Math.min(810-view.h,view.y))}
function point(event){const rect=svg.getBoundingClientRect();return{x:view.x+(event.clientX-rect.left)/rect.width*view.w,y:view.y+(event.clientY-rect.top)/rect.height*view.h}}
svg.addEventListener("wheel",e=>{e.preventDefault();const p=point(e);zoom(e.deltaY>0?1.13:.87,p.x,p.y)},{passive:false});
svg.addEventListener("pointerdown",e=>{svg.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY,vx:view.x,vy:view.y};moved=false;svg.classList.add("dragging")});
svg.addEventListener("pointermove",e=>{if(!drag)return;const rect=svg.getBoundingClientRect(),dx=(e.clientX-drag.x)/rect.width*view.w,dy=(e.clientY-drag.y)/rect.height*view.h;if(Math.abs(dx)+Math.abs(dy)>3)moved=true;view.x=drag.vx-dx;view.y=drag.vy-dy;clamp();setView()});
svg.addEventListener("pointerup",()=>{drag=null;svg.classList.remove("dragging");setTimeout(()=>moved=false,0)});
document.getElementById("zoomIn").addEventListener("click",()=>zoom(.8));document.getElementById("zoomOut").addEventListener("click",()=>zoom(1.2));document.getElementById("resetMap").addEventListener("click",resetView);document.getElementById("worldButton").addEventListener("click",renderWorld);
document.getElementById("toggleLabels").addEventListener("click",()=>{labelsVisible=!labelsVisible;svg.classList.toggle("labels-hidden",!labelsVisible)});
document.getElementById("fullscreenMap").addEventListener("click",()=>document.getElementById("mapFrame").requestFullscreen?.());
addEventListener("keydown",e=>{if(e.key==="+")zoom(.8);if(e.key==="-")zoom(1.2);if(e.key==="0")resetView();if(e.key==="Escape"&&currentRegion)renderWorld()});
renderWorld();
