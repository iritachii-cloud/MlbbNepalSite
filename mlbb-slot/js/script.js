let heroes = [], pool = [], rolling = false, selectedFilters = new Set();
const incomingRole = new URLSearchParams(location.search).get("role");
const combatRoles = ["Fighter", "Assassin", "Marksman", "Tank", "Support", "Mage"];
const lanes = ["Jungle", "EXP Lane", "Gold Lane", "Mid Lane", "Roam"];
const reel = document.getElementById("reelCard");
const card = (hero) => `<div class="reel-card"><img src="${hero?.image || APP.fallback}" alt="${hero?.name || "Coming soon"}"><strong>${hero?.name || "READY"}</strong><small>${hero ? `${hero.primary_role} // ${(hero.preferred_lane || []).join(", ")}` : "Awaiting chaos"}</small></div>`;

function buildFilters() {
  const make = (value, type) => `<label class="filter-check"><input type="checkbox" data-filter="${value}" data-type="${type}" ${value === incomingRole ? "checked" : ""}><span>${value}</span></label>`;
  document.getElementById("roleFilters").innerHTML = combatRoles.map((value) => make(value, "role")).join("");
  document.getElementById("laneFilters").innerHTML = lanes.map((value) => make(value, "lane")).join("");
  if (incomingRole) selectedFilters.add(incomingRole);
  document.querySelectorAll("[data-filter]").forEach((input) => input.addEventListener("change", () => {
    input.checked ? selectedFilters.add(input.dataset.filter) : selectedFilters.delete(input.dataset.filter); updatePool();
  }));
}
function updatePool() {
  pool = selectedFilters.size ? heroes.filter((hero) => hero.roles.some((role) => selectedFilters.has(role)) || (hero.preferred_lane || []).some((lane) => selectedFilters.has(lane))) : [...heroes];
  const label = selectedFilters.size ? [...selectedFilters].join(" + ") : "All heroes";
  document.getElementById("activeRole").textContent = label; document.getElementById("poolCount").textContent = pool.length;
  document.getElementById("poolBreakdown").innerHTML = combatRoles.map((role) => `<span>${role}: ${pool.filter((hero) => hero.roles.includes(role)).length}</span>`).join("");
  renderPoolList();
  if (!rolling) { reel.innerHTML = card(pool[0]); document.getElementById("slotStatus").textContent = `${pool.length} eligible heroes. The reel is judging your choices.`; }
}
function renderPoolList() {
  document.getElementById("heroPoolList").innerHTML = pool.map((hero) => `<div class="pool-hero"><img src="${hero.image || APP.fallback}" alt=""><div><strong>${hero.name}</strong><small>${hero.roles.join(" / ")}</small></div></div>`).join("");
}
function spin() {
  if (rolling || !pool.length) return;
  rolling = true; document.getElementById("spinSlot").disabled = true; document.getElementById("slotStatus").textContent = "Reel in motion. Blame fate, not the code.";
  const duration = +document.getElementById("spinDuration").value * 1000; const start = performance.now(); let lastSwap = 0;
  function frame(now) {
    const elapsed = now - start; const progress = Math.min(elapsed / duration, 1); const cadence = 55 + Math.pow(progress, 4) * 380;
    if (now - lastSwap > cadence) { reel.innerHTML = card(pool[Math.floor(Math.random() * pool.length)]); lastSwap = now; }
    if (progress < 1) requestAnimationFrame(frame); else reveal(pool[Math.floor(Math.random() * pool.length)]);
  }
  requestAnimationFrame(frame);
}
function reveal(hero) {
  reel.innerHTML = card(hero); document.getElementById("resultImage").src = hero.image || APP.fallback; document.getElementById("resultName").textContent = hero.name;
  document.getElementById("resultNickname").textContent = `${hero.nickname} // ${hero.roles.join(" + ")}`; document.getElementById("slotStatus").textContent = `Draft complete: ${hero.name}`;
  rolling = false; document.getElementById("spinSlot").disabled = false; APP.applyHeroTheme(hero); APP.openModal("heroResultModal");
  if (hero.sound) { const sound = new Audio(hero.sound); sound.volume = .45; sound.play().catch(() => {}); }
}
document.getElementById("allHeroes").addEventListener("click", () => { selectedFilters.clear(); document.querySelectorAll("[data-filter]").forEach((input) => input.checked = false); updatePool(); });
document.getElementById("shufflePool").addEventListener("click", () => { pool.sort(() => Math.random() - .5); renderPoolList(); if (!rolling) reel.innerHTML = card(pool[0]); });
document.getElementById("spinDuration").addEventListener("input", (e) => document.getElementById("durationValue").textContent = `${e.target.value} seconds`);
document.getElementById("spinSlot").addEventListener("click", spin); document.getElementById("reroll").addEventListener("click", () => { APP.closeModal("heroResultModal"); spin(); });
buildFilters();
APP.fetchJSON("../mlbb-wheel/data/heroes.json").then((data) => { heroes = data; updatePool(); }).catch((error) => document.getElementById("slotStatus").textContent = error.message);
