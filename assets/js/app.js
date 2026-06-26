(function () {
  const root = document.documentElement;
  const base = document.body.dataset.base || "";
  const fallback = `${base}assets/commingsoon.png`;
  const mode = localStorage.getItem("mlbb-mode") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const tracks = [
    ["Arena Overture", "theme1.mp3", "theme1.jpg"], ["Alucard", "themealucard.mp3", "themealucard.jpg"],
    ["Fanny", "themefanny.mp3", "themefanny.jpg"], ["Kagura", "themekagura.mp3", "themekagura.jpg"],
    ["Ling", "themeling.mp3", "themeling.jpg"], ["Gusion", "themegusion.mp3", "themegusion.jpg"],
    ["Miya", "thememiya.mp3", "thememiya.jpg"], ["Layla", "themelayla.mp3", "themelayla.jpg"],
    ["Eudora", "themeeudora.mp3", "themeeudora.jpg"], ["Saber", "themesaber.mp3", "themesaber.jpg"],
    ["Alice", "themealice.mp3", "themealice.jpg"], ["Lightborn", "theme-lightborn.mp3", "theme-lightborn.jpg"],
    ["Chou", "theme-chou.mp3", "theme-chou.jpg"], ["Nana", "theme-nana.mp3", "theme-nana.jpg"],
    ["Hayabusa", "theme-hayabusa.mp3", "theme-hayabusa.jpg"], ["Angela", "theme-angela.mp3", "theme-angela.jpg"]
  ];
  let trackIndex = +(localStorage.getItem("mlbb-track") || 0);
  let heroes = [];
  let heroThemes = [];
  root.dataset.theme = mode;

  const imageViewerState = { images: [], index: 0 };

  window.APP = {
    base, fallback, version: Date.now(),
    fetchJSON(path) {
      const joiner = path.includes("?") ? "&" : "?";
      return fetch(`${path}${joiner}v=${this.version}`, { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`Could not load ${path}`);
        return response.json();
      });
    },
    image(img) {
      img.addEventListener("error", () => {
        if (!img.src.endsWith("commingsoon.png")) img.src = fallback;
      }, { once: true });
    },
    openModal(id) { document.getElementById(id)?.classList.add("show"); },
    closeModal(id) { document.getElementById(id)?.classList.remove("show"); },
    openImageViewer(images = [], startSrc = "", options = {}) {
      const viewer = document.getElementById("imageViewer");
      const image = document.getElementById("imageViewerImage");
      const title = document.getElementById("imageViewerTitle");
      if (!viewer || !image) return;

      const unique = [];
      images.forEach((src) => {
        if (src && !unique.includes(src)) unique.push(src);
      });
      if (!unique.length) unique.push(startSrc || fallback);

      if (startSrc && !unique.includes(startSrc)) unique.unshift(startSrc);
      imageViewerState.images = unique;
      imageViewerState.index = Math.max(0, unique.indexOf(startSrc));
      viewer.style.cssText = options.theme || "";
      title.textContent = options.title || "Image preview";
      updateImageViewer();
      viewer.classList.add("show");
      document.body.classList.add("image-viewer-open");
    },
    closeImageViewer() {
      document.getElementById("imageViewer")?.classList.remove("show");
      document.body.classList.remove("image-viewer-open");
    },
    applyHeroTheme(hero) {
      const id = typeof hero === "object" ? hero.id : +hero || 0;
      const name = typeof hero === "object" ? hero.name : "Arena";
      const mode = root.dataset.theme;
      const palette = heroThemes.find((item) => item.id === id)?.[mode] || (mode === "dark"
        ? { primary:"#a855f7",secondary:"#ef284c",accent:"#ffba31",glow:"#a855f7" }
        : { primary:"#0878df",secondary:"#27a5ee",accent:"#c88a08",glow:"#0878df" });
      root.style.setProperty("--primary", palette.primary);
      root.style.setProperty("--secondary", palette.secondary);
      root.style.setProperty("--accent", palette.accent);
      root.style.setProperty("--glow", `${palette.glow}61`);
      document.querySelectorAll("[data-palette-key]").forEach((el) => {
        const value = palette[el.dataset.paletteKey];
        el.style.background = value; el.title = `${el.dataset.paletteKey}: ${value}`;
        el.querySelector("small").textContent = value;
      });
      localStorage.setItem("mlbb-hero-theme", JSON.stringify({ id, name }));
      document.querySelectorAll("[data-theme-name]").forEach((el) => el.textContent = name);
      const select = document.getElementById("globalHeroTheme");
      if (select) select.value = String(id);
    }
  };

  function updateImageViewer() {
    const image = document.getElementById("imageViewerImage");
    const count = document.getElementById("imageViewerCount");
    const current = imageViewerState.images[imageViewerState.index] || fallback;
    image.src = current;
    count.textContent = `${imageViewerState.index + 1} / ${imageViewerState.images.length}`;
  }

  function shiftImageViewer(direction) {
    const total = imageViewerState.images.length;
    if (!total) return;
    imageViewerState.index = (imageViewerState.index + direction + total) % total;
    updateImageViewer();
  }

  function installImageViewer() {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="image-viewer" id="imageViewer" aria-modal="true" role="dialog">
        <div class="image-viewer-top">
          <div><span class="eyebrow">Full image</span><h2 id="imageViewerTitle">Image preview</h2></div>
          <span id="imageViewerCount" class="status-pill"></span>
          <button class="image-viewer-close" id="imageViewerClose" aria-label="Close image preview">&times;</button>
        </div>
        <button class="image-viewer-nav prev" id="imageViewerPrev" aria-label="Previous image">&lsaquo;</button>
        <img id="imageViewerImage" src="${fallback}" alt="">
        <button class="image-viewer-nav next" id="imageViewerNext" aria-label="Next image">&rsaquo;</button>
      </div>`);

    const viewer = document.getElementById("imageViewer");
    let touchStart = 0;
    document.getElementById("imageViewerClose").addEventListener("click", APP.closeImageViewer);
    document.getElementById("imageViewerPrev").addEventListener("click", () => shiftImageViewer(-1));
    document.getElementById("imageViewerNext").addEventListener("click", () => shiftImageViewer(1));
    viewer.addEventListener("click", (event) => {
      if (event.target === viewer) APP.closeImageViewer();
    });
    viewer.addEventListener("touchstart", (event) => {
      touchStart = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });
    viewer.addEventListener("touchend", (event) => {
      const delta = (event.changedTouches[0]?.clientX || 0) - touchStart;
      if (Math.abs(delta) > 45) shiftImageViewer(delta > 0 ? -1 : 1);
    }, { passive: true });
    addEventListener("keydown", (event) => {
      if (!viewer.classList.contains("show")) return;
      if (event.key === "Escape") APP.closeImageViewer();
      if (event.key === "ArrowLeft") shiftImageViewer(-1);
      if (event.key === "ArrowRight") shiftImageViewer(1);
    });
  }

  function installGlobalDock() {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="global-dock">
        <button class="music-orb" id="musicOrb" aria-label="Open music player"><img id="musicOrbArt" src="${base}assets/images/album/theme1.jpg" alt=""></button>
        <button class="theme-orb" id="themeOrb" aria-label="Open theme lab"><span data-theme-name>Arena</span><b>THEME LAB</b></button>
      </div>
      <aside class="command-panel" id="themePanel"><button class="panel-x" data-panel-close="themePanel">&times;</button>
        <div class="eyebrow">Global visual loadout</div><h2>Theme Lab</h2>
        <label>Hero palette<select id="globalHeroTheme"><option value="0">Arena Default</option></select></label>
        <div class="palette-preview"><span data-palette-key="primary">Primary<small></small></span><span data-palette-key="secondary">Secondary<small></small></span><span data-palette-key="accent">Accent<small></small></span><span data-palette-key="glow">Glow<small></small></span></div>
        <div class="mode-switch"><button data-mode="dark">Dark Mode</button><button data-mode="light">Light Mode</button></div>
        <p class="tiny-copy">Yes, the entire site can dress like your main now. This is normal behavior.</p>
      </aside>
      <aside class="command-panel music-panel" id="musicPanel"><button class="panel-x" data-panel-close="musicPanel">&times;</button>
        <div class="eyebrow">Global battle radio</div><h2 id="trackName">Arena Overture</h2>
        <div class="record"><img id="albumArt" src="${base}assets/images/album/theme1.jpg" alt=""></div>
        <select id="trackSelect"></select>
        <div class="player-buttons"><button id="prevTrack">|&lt;</button><button id="playTrack">PLAY</button><button id="nextTrack">&gt;|</button><button id="shuffleTrack">SHUF</button><button id="loopTrack">LOOP</button></div>
        <div class="player-range"><span id="currentTime">0:00</span><input id="seekTrack" type="range" min="0" max="100" value="0"><span id="durationTime">0:00</span></div>
        <label class="volume-row">Volume<input id="volumeTrack" type="range" min="0" max="100" value="45"></label>
        <p class="tiny-copy">Spacebar controls playback while you are not typing. Dramatic entrances sold separately.</p>
      </aside>
      <audio id="globalAudio" preload="metadata"></audio>`);
  }

  function initThemeLab() {
    const saved = JSON.parse(localStorage.getItem("mlbb-hero-theme") || '{"id":0,"name":"Arena"}');
    Promise.all([APP.fetchJSON(`${base}mlbb-wheel/data/heroes.json`), APP.fetchJSON(`${base}data/hero-themes.json`)]).then(([data, themes]) => {
      heroes = data; heroThemes = themes;
      document.getElementById("globalHeroTheme").insertAdjacentHTML("beforeend", heroes.map((hero) => `<option value="${hero.id}">${hero.name}</option>`).join(""));
      APP.applyHeroTheme(heroes.find((hero) => hero.id === +saved.id) || saved);
    }).catch(() => APP.applyHeroTheme(saved));
    document.getElementById("globalHeroTheme").addEventListener("change", (e) => APP.applyHeroTheme(heroes.find((hero) => hero.id === +e.target.value) || 0));
    document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => {
      root.dataset.theme = button.dataset.mode; localStorage.setItem("mlbb-mode", button.dataset.mode);
      APP.applyHeroTheme(heroes.find((hero) => hero.id === +(document.getElementById("globalHeroTheme").value)) || 0);
    }));
  }

  function initMusic() {
    const audio = document.getElementById("globalAudio");
    const select = document.getElementById("trackSelect");
    const play = document.getElementById("playTrack");
    select.innerHTML = tracks.map((track, index) => `<option value="${index}">${track[0]}</option>`).join("");
    audio.volume = .45;
    function time(value) { return Number.isFinite(value) ? `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}` : "0:00"; }
    function load(index, autoplay = false) {
      trackIndex = (index + tracks.length) % tracks.length; const track = tracks[trackIndex];
      audio.src = `${base}assets/audio/${track[1]}`; select.value = trackIndex; document.getElementById("trackName").textContent = track[0];
      ["albumArt", "musicOrbArt"].forEach((id) => document.getElementById(id).src = `${base}assets/images/album/${track[2]}`);
      localStorage.setItem("mlbb-track", trackIndex); if (autoplay) audio.play().catch(() => { });
    }
    function toggle() { audio.paused ? audio.play().catch(() => { }) : audio.pause(); }
    load(trackIndex);
    play.addEventListener("click", toggle); document.getElementById("prevTrack").addEventListener("click", () => load(trackIndex - 1, true));
    document.getElementById("nextTrack").addEventListener("click", () => load(trackIndex + 1, true));
    document.getElementById("shuffleTrack").addEventListener("click", () => load(Math.floor(Math.random() * tracks.length), true));
    document.getElementById("loopTrack").addEventListener("click", (e) => { audio.loop = !audio.loop; e.target.classList.toggle("active", audio.loop); });
    select.addEventListener("change", () => load(+select.value, true));
    audio.addEventListener("play", () => { play.textContent = "PAUSE"; document.body.classList.add("music-playing"); });
    audio.addEventListener("pause", () => { play.textContent = "PLAY"; document.body.classList.remove("music-playing"); });
    audio.addEventListener("ended", () => load(trackIndex + 1, true));
    audio.addEventListener("timeupdate", () => { document.getElementById("seekTrack").value = audio.duration ? audio.currentTime / audio.duration * 100 : 0; document.getElementById("currentTime").textContent = time(audio.currentTime); document.getElementById("durationTime").textContent = time(audio.duration); });
    document.getElementById("seekTrack").addEventListener("input", (e) => { if (audio.duration) audio.currentTime = audio.duration * e.target.value / 100; });
    document.getElementById("volumeTrack").addEventListener("input", (e) => audio.volume = e.target.value / 100);
    addEventListener("keydown", (e) => { if (e.code === "Space" && !/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) { e.preventDefault(); toggle(); } });
  }

  installGlobalDock();
  installImageViewer();
  document.querySelectorAll("img").forEach(APP.image);
  new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => { if (node.nodeName === "IMG") APP.image(node); node.querySelectorAll?.("img").forEach(APP.image); }))).observe(document.body, { childList: true, subtree: true });
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => { button.textContent = "Theme Lab"; button.addEventListener("click", () => document.getElementById("themePanel").classList.add("show")); });
  document.getElementById("themeOrb").addEventListener("click", () => { document.getElementById("musicPanel").classList.remove("show"); document.getElementById("themePanel").classList.toggle("show"); });
  document.getElementById("musicOrb").addEventListener("click", () => { document.getElementById("themePanel").classList.remove("show"); document.getElementById("musicPanel").classList.toggle("show"); });
  document.querySelectorAll("[data-panel-close]").forEach((button) => button.addEventListener("click", () => document.getElementById(button.dataset.panelClose).classList.remove("show")));
  document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", () => APP.closeModal(button.dataset.closeModal)));
  document.querySelectorAll(".modal").forEach((modal) => modal.addEventListener("click", (event) => { if (event.target === modal) modal.classList.remove("show"); }));
  initThemeLab(); initMusic();
})();
