let creeps = [];
let filtered = [];
let currentIndex = 0;
let activeForm = "monster";

const grid = document.getElementById("creepGrid");
const detail = document.getElementById("creepDetail");
const safe = (value, fallback = "Coming soon") => value || fallback;
const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const stars = (rating) => {
  const filled = Math.round(rating / 2);
  return `${"&#9733;".repeat(filled)}${"&#9734;".repeat(5 - filled)}`;
};
const uniqueImages = (items) => [...new Set(items.filter(Boolean))];

function formImage(creep, formKey = "monster") {
  const form = creep.forms?.[formKey] || creep.forms?.monster || {};
  return safe(form.images?.real, APP.fallback);
}

function renderClasses() {
  const select = document.getElementById("creepClass");
  const classes = [...new Set(creeps.map((creep) => creep.class))].sort();
  select.insertAdjacentHTML("beforeend", classes.map((name) => `<option value="${esc(name)}">${esc(name)}</option>`).join(""));
}

function render() {
  grid.innerHTML = filtered.length ? filtered.map((creep, index) => `
    <button class="creep-card" data-index="${index}" data-theme="${creep.id % 10}">
      <span class="card-corner">#${String(creep.id).padStart(2, "0")}</span>
      <span class="creep-art">
        <img src="${esc(formImage(creep))}" alt="${esc(creep.name)}">
        <span class="creep-sigil" aria-hidden="true"><i></i></span>
      </span>
      <span class="card-meta">
        <span class="eyebrow">${esc(creep.class)} // ${esc(creep.role)}</span>
        <span class="name-line"><h3>${esc(creep.name)}</h3><b>${esc(creep.rating)}</b></span>
        <p>${esc(creep.monsterName)}</p>
        <span class="rating">${stars(creep.rating)}</span>
        <span class="mini-stats">
          <em>THR ${creep.stats?.threat || 0}</em>
          <em>DUR ${creep.stats?.durability || 0}</em>
          <em>RWD ${creep.stats?.reward || 0}</em>
        </span>
      </span>
    </button>`).join("") : `<div class="empty panel">No creeps match this search.</div>`;
  document.getElementById("creepCount").textContent = `${filtered.length} creeps`;
}

function filter() {
  const term = document.getElementById("creepSearch").value.toLowerCase();
  const creepClass = document.getElementById("creepClass").value;
  const threat = +document.getElementById("threatFilter").value;
  filtered = creeps.filter((creep) => {
    const haystack = [
      creep.name, creep.monsterName, creep.role, creep.class, creep.element, creep.famousFor,
      creep.forms?.monster?.body, creep.forms?.monster?.weapon, creep.forms?.monster?.aura,
      creep.forms?.human?.body, creep.forms?.human?.weapon, creep.forms?.human?.aura
    ].join(" ").toLowerCase();
    return haystack.includes(term) && (!creepClass || creep.class === creepClass) && creep.rating >= threat;
  });
  render();
}

function statBars(stats = {}) {
  return Object.entries(stats).map(([name, value]) => `
    <div class="stat"><span>${esc(name)}</span><span class="stat-bar"><i style="width:${Math.min(value, 100)}%"></i></span></div>
  `).join("");
}

function formButtons(creep) {
  return ["monster", "human"].map((key) => {
    const form = creep.forms[key];
    return `<button class="${activeForm === key ? "active" : ""}" data-form="${key}">${key === "monster" ? "Monster Form" : "Human Form"}<small>${esc(form.title)}</small></button>`;
  }).join("");
}

function imageButtons(form) {
  return ["real", "animated", "nineties"].map((type) => `
    <button data-image="${esc(safe(form.images?.[type], APP.fallback))}">${type}</button>
  `).join("");
}

function creepViewerImages(creep) {
  return uniqueImages(Object.values(creep.forms || {}).flatMap((form) => {
    const images = form.images || {};
    return [images.real, images.animated, images.nineties, ...(images.gallery || [])];
  }));
}

function renderDetail() {
  const creep = filtered[currentIndex];
  if (!creep) return;
  const form = creep.forms[activeForm];
  const gallery = form.images?.gallery || [];
  detail.innerHTML = `
    <div class="profile-grid">
      <div class="profile-visual">
        <div class="form-tabs">${formButtons(creep)}</div>
        <div class="creep-frame" data-form-view="${activeForm}">
          <img id="mainCreepImage" class="expandable-image" src="${esc(safe(form.images?.real, APP.fallback))}" alt="${esc(creep.name)} ${esc(activeForm)} form" title="Open full image">
          <div class="energy-core" aria-hidden="true"></div>
        </div>
        <div class="image-tabs">${imageButtons(form)}</div>
        <div class="gallery-strip">${gallery.map((src) => `<img src="${esc(src)}" alt="${esc(creep.name)} gallery">`).join("")}</div>
      </div>
      <div class="profile-info">
        <div class="eyebrow">${esc(creep.class)} // ${esc(creep.element)} // ${esc(creep.rating)}/10</div>
        <h2>${esc(creep.name)}</h2>
        <p class="form-title">${esc(form.title)} <span>${esc(form.subtitle)}</span></p>
        <div class="profile-chips"><span>${esc(creep.role)}</span><span>${esc(creep.monsterName)}</span><span>${esc(creep.element)}</span></div>
        <h3>Combat index</h3>${statBars(creep.stats)}
        <h3>Battlefield value</h3><p>${esc(creep.battlefieldValue)}</p>
        <h3>Form anatomy</h3><p>${esc(form.body)}</p>
        <h3>Weapon</h3><p>${esc(form.weapon)}</p>
        <h3>Aura</h3><p>${esc(form.aura)}</p>
        <h3>Famous for</h3><p>${esc(creep.famousFor)}</p>
        <h3>Signature read</h3><p>${esc(form.signature)}</p>
      </div>
    </div>`;

  detail.querySelectorAll("[data-form]").forEach((button) => button.addEventListener("click", () => {
    activeForm = button.dataset.form;
    renderDetail();
  }));
  detail.querySelectorAll("[data-image], .gallery-strip img").forEach((node) => node.addEventListener("click", () => {
    document.getElementById("mainCreepImage").src = node.dataset.image || node.src;
  }));
  document.getElementById("mainCreepImage").addEventListener("click", () => {
    APP.openImageViewer(creepViewerImages(creep), document.getElementById("mainCreepImage").getAttribute("src"), { title: `${creep.name} // ${activeForm} form` });
  });
}

function showCreep(index) {
  currentIndex = index;
  activeForm = "monster";
  const creep = filtered[currentIndex];
  if (!creep) return;
  APP.applyHeroTheme({ id: creep.id, name: creep.name });
  renderDetail();
  APP.openModal("creepModal");
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".creep-card");
  if (card) showCreep(+card.dataset.index);
});
document.getElementById("creepSearch").addEventListener("input", filter);
document.getElementById("creepClass").addEventListener("change", filter);
document.getElementById("threatFilter").addEventListener("change", filter);
document.getElementById("prevCreep").addEventListener("click", () => showCreep((currentIndex - 1 + filtered.length) % filtered.length));
document.getElementById("nextCreep").addEventListener("click", () => showCreep((currentIndex + 1) % filtered.length));

APP.fetchJSON("data/data.json").then((data) => {
  creeps = data;
  filtered = creeps;
  renderClasses();
  render();
}).catch((error) => {
  grid.innerHTML = `<div class="empty panel">${esc(error.message)}</div>`;
});
