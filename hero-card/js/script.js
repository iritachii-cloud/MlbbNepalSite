let heroes = [], filtered = [], currentIndex = 0;
const grid = document.getElementById("cardsGrid");
const safe = (value, fallback = "Coming soon") => value || fallback;
const uniqueImages = (items) => [...new Set(items.filter(Boolean))];
const stars = (rating) => `${"★".repeat(Math.round(rating / 2))}${"☆".repeat(5 - Math.round(rating / 2))}`;

function render() {
  grid.innerHTML = filtered.length ? filtered.map((hero, index) => `
    <button class="hero-card" data-index="${index}" data-theme="${hero.id % 10}">
      <span class="card-corner">#${String(hero.id).padStart(3, "0")}</span>
      <span class="card-image"><img src="${safe(hero.images?.icon || hero.icon, APP.fallback)}" alt="${hero.name}"><i></i></span>
      <span class="card-meta"><span class="eyebrow">Land of Dawn // Hero</span><span class="name-line"><h3>${hero.name}</h3><b>${hero.rating}</b></span><p>${safe(hero.nickname)}</p>
      <span class="rating">${stars(hero.rating)}</span><span class="mini-stats"><em>ATK ${hero.stats?.attack || 0}</em><em>DEF ${hero.stats?.defense || 0}</em><em>MOV ${hero.stats?.movement || 0}</em></span></span>
    </button>`).join("") : `<div class="empty panel">No heroes match this search.</div>`;
  document.getElementById("heroCount").textContent = `${filtered.length} heroes`;
}
function filter() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const rating = +document.getElementById("ratingFilter").value;
  filtered = heroes.filter((hero) => `${hero.name} ${hero.nickname}`.toLowerCase().includes(term) && hero.rating >= rating);
  render();
}
function list(items) { return (items || []).map((item) => `<li>${typeof item === "string" ? item : `<strong>${item.name}:</strong> ${item.description}`}</li>`).join("") || "<li>Coming soon</li>"; }
function showHero(index) {
  currentIndex = index; const hero = filtered[index]; if (!hero) return;
  APP.applyHeroTheme(hero);
  const images = hero.images || {}; const gallery = images.gallery || [];
  const viewerImages = uniqueImages([images.real || hero.icon, images.animated, images.nineties, ...gallery]);
  document.getElementById("modalHeroContent").innerHTML = `<div class="profile-grid">
    <div class="profile-visual"><img id="mainHeroImage" class="expandable-image" src="${safe(images.real || hero.icon, APP.fallback)}" alt="${hero.name}" title="Open full image">
      <div class="image-tabs">${["real", "animated", "nineties"].map((type) => `<button data-image="${safe(images[type], APP.fallback)}">${type}</button>`).join("")}</div>
      <div class="gallery-strip">${gallery.map((src) => `<img src="${src}" alt="${hero.name} gallery">`).join("")}</div>
    </div><div class="profile-info"><div class="eyebrow">Hero profile // ${hero.rating}/10</div><h2>${hero.name}</h2><p>${safe(hero.nickname)}</p>
      <h3>Combat index</h3>${Object.entries(hero.stats || {}).map(([name, value]) => `<div class="stat"><span>${name}</span><span class="stat-bar"><i style="width:${value}%"></i></span></div>`).join("")}
      <h3>Lore</h3><p>${safe(hero.lore)}</p><h3>Abilities</h3><ul>${list(hero.abilities)}</ul><h3>Ultimate</h3><p>${safe(hero.ultimate)}</p>
      <h3>Famous for</h3><p>${safe(hero.famousFor)}</p><h3>Weapon</h3><p>${safe(Array.isArray(hero.weapon) ? hero.weapon.join(", ") : hero.weapon)}</p></div></div>`;
  document.querySelectorAll("[data-image], .gallery-strip img").forEach((node) => node.addEventListener("click", () => document.getElementById("mainHeroImage").src = node.dataset.image || node.src));
  document.getElementById("mainHeroImage").addEventListener("click", () => {
    APP.openImageViewer(viewerImages, document.getElementById("mainHeroImage").getAttribute("src"), { title: hero.name });
  });
  APP.openModal("heroModal");
}
grid.addEventListener("click", (event) => { const card = event.target.closest(".hero-card"); if (card) showHero(+card.dataset.index); });
document.getElementById("searchInput").addEventListener("input", filter); document.getElementById("ratingFilter").addEventListener("change", filter);
document.getElementById("prevHero").addEventListener("click", () => showHero((currentIndex - 1 + filtered.length) % filtered.length));
document.getElementById("nextHero").addEventListener("click", () => showHero((currentIndex + 1) % filtered.length));
APP.fetchJSON("data/data.json").then((data) => { heroes = data; filtered = heroes; render(); }).catch((error) => grid.innerHTML = `<div class="empty panel">${error.message}</div>`);
