let npcs = [];
let filtered = [];
let currentIndex = 0;

const grid = document.getElementById("npcGrid");
const count = document.getElementById("npcCount");
const detail = document.getElementById("npcDetail");
const searchInput = document.getElementById("npcSearch");
const categorySelect = document.getElementById("npcCategory");

const CATEGORY_HUES = {
  Scientist: [188, 43, 285],
  Warrior: [8, 42, 212],
  "Martial Artist": [145, 34, 205],
  Cyborg: [199, 312, 38],
  Villain: [348, 270, 26],
  Ruler: [258, 43, 190],
  Deity: [48, 196, 292],
  "Religious Leader": [55, 181, 328],
  Shaman: [136, 278, 35],
  Crafter: [29, 176, 318],
  Monk: [151, 38, 213],
  Scholar: [211, 286, 42],
  Civilian: [90, 30, 199]
};

const entities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

function html(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => entities[char]);
}

function safe(value, fallback = APP.fallback) {
  return value || fallback;
}

function stars(rating) {
  const filled = Math.max(0, Math.min(5, Math.round((+rating || 0) / 2)));
  return `${"\u2605".repeat(filled)}${"\u2606".repeat(5 - filled)}`;
}

function textScore(value) {
  return String(value || "").split("").reduce((score, char) => score + char.charCodeAt(0), 0);
}

function npcStyle(npc) {
  const base = CATEGORY_HUES[npc.category] || [textScore(npc.name) % 360, 38, 198];
  const shift = ((npc.id || 0) * 17 + textScore(npc.name)) % 44;
  const hueA = (base[0] + shift) % 360;
  const hueB = (base[1] + shift * 1.35 + 360) % 360;
  const hueC = (base[2] + shift * .7 + 360) % 360;
  return [
    `--npc-a:hsl(${Math.round(hueA)} 88% 62%)`,
    `--npc-b:hsl(${Math.round(hueB)} 82% 47%)`,
    `--npc-c:hsl(${Math.round(hueC)} 96% 70%)`,
    `--npc-glow:hsl(${Math.round(hueA)} 88% 56% / .45)`
  ].join(";");
}

function npcFrame(npc) {
  return (Number(npc.id || 0) + textScore(npc.category)) % 5;
}

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function uniqueImages(images) {
  const seen = new Set();
  return images.filter((src) => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}

function npcImages(npc) {
  const images = npc.images || {};
  const real = safe(images.real || npc.image);
  const animated = safe(images.animated || real);
  const nineties = safe(images.nineties || images["90s"] || real);
  const gallery = uniqueImages(toArray(images.gallery || npc.gallery));

  return {
    real,
    animated,
    nineties,
    gallery
  };
}

function statValue(npc, key) {
  return npc.stats?.[key] ?? 0;
}

function render() {
  grid.innerHTML = filtered.length ? filtered.map((npc, index) => {
    const images = npcImages(npc);
    return `
      <button class="npc-card" style="${npcStyle(npc)}" data-frame="${npcFrame(npc)}" data-index="${index}">
        <span class="npc-id">NPC ${String(npc.id).padStart(2, "0")}</span>
        <span class="npc-image">
          <img src="${html(images.real)}" alt="${html(npc.name)}">
          <i></i>
        </span>
        <span class="npc-meta">
          <span class="eyebrow">${html(npc.category)} // dossier</span>
          <span class="npc-name-line"><h2>${html(npc.name)}</h2><b>${html(npc.rating)}</b></span>
          <h3>${html(npc.title)}</h3>
          <span class="npc-rating" aria-label="${html(npc.rating)} out of 10">${stars(npc.rating)}</span>
          <span class="npc-mini-stats">
            <em>PWR ${statValue(npc, "power")}</em>
            <em>INT ${statValue(npc, "intellect")}</em>
            <em>INF ${statValue(npc, "influence")}</em>
          </span>
        </span>
      </button>`;
  }).join("") : `<div class="empty panel">No NPC dossiers match this search.</div>`;

  count.textContent = `${filtered.length} dossiers`;
}

function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const category = categorySelect.value;
  filtered = npcs.filter((npc) => {
    const haystack = `${npc.name} ${npc.title} ${npc.category} ${npc.summary} ${npc.biography}`.toLowerCase();
    return (!category || npc.category === category) && haystack.includes(query);
  });
  render();
}

function renderStats(stats = {}) {
  return Object.entries(stats).map(([name, value]) => `
    <div class="npc-stat">
      <span>${html(name)} ${html(value)}</span>
      <i><b style="width:${Math.max(0, Math.min(100, +value || 0))}%"></b></i>
    </div>`).join("");
}

function renderImageTabs(images) {
  return [
    ["real", "Real", images.real],
    ["animated", "Animated", images.animated],
    ["nineties", "Nineties", images.nineties]
  ].map(([key, label, src], index) => `
    <button class="${index === 0 ? "active" : ""}" data-npc-image="${html(src)}" data-npc-tab="${key}">${label}</button>
  `).join("");
}

function openNpc(index) {
  currentIndex = index;
  const npc = filtered[index];
  if (!npc) return;

  const images = npcImages(npc);
  const theme = npcStyle(npc);
  const affiliations = toArray(npc.affiliations);
  const gallery = images.gallery.map((src, imageIndex) => `
    <img src="${html(src)}" alt="${html(npc.name)} gallery ${imageIndex + 1}" data-npc-image="${html(src)}">
  `).join("");

  detail.style.cssText = theme;
  detail.innerHTML = `
    <div class="npc-profile" style="${theme}" data-frame="${npcFrame(npc)}">
      <div class="npc-visual">
        <div class="npc-portrait-stage">
          <img id="mainNpcImage" src="${html(images.real)}" alt="${html(npc.name)}">
          <span class="npc-stage-label">${html(npc.category)}</span>
        </div>
        <div class="npc-image-tabs">${renderImageTabs(images)}</div>
        <div class="npc-gallery-strip">${gallery}</div>
        <div class="rating-seal">${stars(npc.rating)} // ${html(npc.rating)}/10</div>
      </div>
      <div class="npc-info">
        <div class="eyebrow">${html(npc.category)} // NPC dossier ${String(npc.id).padStart(2, "0")}</div>
        <h2>${html(npc.name)}</h2>
        <h3 class="npc-title">${html(npc.title)}</h3>
        <p class="npc-summary">${html(npc.summary)}</p>
        <div class="affiliations">${affiliations.map((item) => `<span>${html(item)}</span>`).join("")}</div>
        <h3>Capability Index</h3>
        <div class="npc-stats">${renderStats(npc.stats)}</div>
        <h3>Appearance & Presence</h3>
        <p>${html(npc.appearance)}</p>
        <h3>Weapon, Power & Aura</h3>
        <p>${html(npc.weaponPower)}</p>
        <h3>Complete Biography</h3>
        <p>${html(npc.biography)}</p>
        <span class="source-tag">Deep source: ${html(npc.source)}</span>
      </div>
    </div>`;

  const mainImage = document.getElementById("mainNpcImage");
  detail.querySelectorAll("[data-npc-image]").forEach((node) => {
    node.addEventListener("click", () => {
      mainImage.src = node.dataset.npcImage || node.src;
      detail.querySelectorAll(".npc-image-tabs button").forEach((button) => {
        button.classList.toggle("active", button === node);
      });
    });
  });

  APP.openModal("npcModal");
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".npc-card");
  if (card) openNpc(+card.dataset.index);
});

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
document.getElementById("prevNpc").addEventListener("click", () => {
  if (filtered.length) openNpc((currentIndex - 1 + filtered.length) % filtered.length);
});
document.getElementById("nextNpc").addEventListener("click", () => {
  if (filtered.length) openNpc((currentIndex + 1) % filtered.length);
});

APP.fetchJSON("../data/npcs.json").then((data) => {
  npcs = data;
  filtered = data;
  const categories = [...new Set(data.map((npc) => npc.category))].sort();
  categorySelect.insertAdjacentHTML("beforeend", categories.map((category) => `<option>${html(category)}</option>`).join(""));
  render();
}).catch((error) => {
  grid.innerHTML = `<div class="empty panel">${html(error.message)}</div>`;
});
