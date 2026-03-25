// js/audio.js – final version with theme dropdown
(function() {
    // ==================== CONFIGURATION ====================
    const THEMES = [
        { name: "Epic Battle",   file: "theme1.mp3", image: "../assets/images/album/theme1.jpg" },
        { name: "The Prince Goes Home Tonight",    file: "theme2.mp3", image: "../assets/images/album/theme2.jpg" },
        { name: "The Taste of Virtual Love",   file: "theme3.mp3", image: "../assets/images/album/theme3.jpg" },
        { name: "赤き狩人の刃 (The Crimson Hunter’s Blade)",   file: "themealucard.mp3", image: "../assets/images/album/themealucard.jpg" },
        { name: "蒼穹のケーブルダンス (The Azure Sky’s Cable Dance)",   file: "themefanny.mp3", image: "../assets/images/album/themefanny.jpg" },
        { name: "星降る傘の舞 (The Starfall Umbrella Dance)",   file: "themekagura.mp3", image: "../assets/images/album/themekagura.jpg" },
        { name: "青嵐の剣舞 (The Azure Gale Sword Dance)",   file: "themeling.mp3", image: "../assets/images/album/themeling.jpg" },
        { name: "紫影の刃舞 (The Violet Shadow Blade Dance)",   file: "themegusion.mp3", image: "../assets/images/album/themegusion.jpg" },
        { name: "月影の弓華 (The Moonlit Bow Blossom)",   file: "thememiya.mp3", image: "../assets/images/album/thememiya.jpg" },
        { name: "魔砲の閃光 (The Malefic Cannon Flash)",   file: "themelayla.mp3", image: "../assets/images/album/themelayla.jpg" },
        { name: "雷獄の華雷 (The Thunder Prison's Flowering Lightning)",   file: "themeeudora.mp3", image: "../assets/images/album/themeeudora.jpg" },
        { name: "斬光の双刃 (The Slashing Light's Twin Blades)",   file: "themesaber.mp3", image: "../assets/images/album/themesaber.jpg" },
        { name: "竹嵐の剛拳 (The Bamboo Storm's Iron Fist)",   file: "theme-akai.mp3", image: "../assets/images/album/theme-akai.jpg" },
        { name: "光翼の聖天使 (The Light-Winged Holy Angel)",   file: "theme-rafaela.mp3", image: "../assets/images/album/theme-rafaela.jpg" },
        { name: "北溟の鉤爪 (The Northern Sea's Hook Claw)",   file: "theme-franco.mp3", image: "../assets/images/album/theme-franco.jpg" },
        { name: "逆襲の龍王 (The Counter‑Attacking Dragon King)",   file: "theme-chou.mp3", image: "../assets/images/album/theme-chou.jpg" },
        { name: "ブーメラン☆キャット (Boomerang☆Cat)",   file: "theme-nana.mp3", image: "../assets/images/album/theme-nana.jpg" },
        { name: "栄光の一蹴 (The Glory Kick)",   file: "theme-bruno.mp3", image: "../assets/images/album/theme-bruno.jpg" },
        { name: "荒野の正義 (Justice of the Wasteland)",   file: "theme-clint.mp3", image: "../assets/images/album/theme-clint.jpg" },
        { name: "ふわふわバルモンド (Fluffy Balmond)",   file: "theme-balmond.mp3", image: "../assets/images/album/theme-balmond.jpg" },
        { name: "迷宮の咆哮 (The Labyrinth’s Roar)",   file: "theme-minotaur.mp3", image: "../assets/images/album/theme-minotaur.jpg" },
        { name: "血の女王の舞踏 (The Blood Queen’s Dance)",   file: "themealice.mp3", image: "../assets/images/album/themealice.jpg" },
        { name: "龍槍の継承者 (The Heir of the Dragon Spear)",   file: "theme-zilong.mp3", image: "../assets/images/album/theme-zilong.jpg" },
        { name: "機巧の鉄槌 (The Mechanical Iron Hammer)",   file: "theme-lolita.mp3", image: "../assets/images/album/theme-lolita.jpg" },
        { name: "影刃の守護者 (The Shadow Blade's Guardian)",   file: "theme-hayabusa.mp3", image: "../assets/images/album/theme-hayabusa.jpg" },
        { name: "氷河の戦乙女 (The Glacier's Valkyrie)",   file: "theme-freya.mp3", image: "../assets/images/album/theme-freya.jpg" },
        { name: "潮風の舞い (Dance of the Sea Breeze)",   file: "theme-kalea.mp3", image: "../assets/images/album/theme-kalea.jpg" }
    ];
    const DEFAULT_THEME_INDEX = 0;
    const FADE_DURATION = 1000;

    // ==================== DOM ELEMENTS ====================
    const audio = document.getElementById('themeSong');
    const musicBtn = document.getElementById('musicToggle');
    const musicModal = document.getElementById('musicModal');
    const modalAlbumImg = document.getElementById('modalAlbumImg');
    const modalThemeName = document.getElementById('modalThemeName');
    const playPauseBtn = document.getElementById('modalPlayPause');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    const shuffleBtn = document.getElementById('modalShuffle');
    const loopBtn = document.getElementById('modalLoop');
    const seekSlider = document.getElementById('modalSeek');
    const volumeSlider = document.getElementById('modalVolume');
    const currentTimeSpan = document.getElementById('modalCurrentTime');
    const durationSpan = document.getElementById('modalDuration');
    const closeModalBtn = document.getElementById('closeModal');
    const themeSelect = document.getElementById('themeSelectDropdown'); // changed ID

    if (!audio || !musicBtn || !musicModal) {
        console.warn('Audio elements missing – audio disabled');
        return;
    }

    // ---- DYNAMIC BASE PATH ----
    let rootPath = '';
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        const src = scripts[i].src;
        if (src && src.includes('audio.js')) {
            const lastSlash = src.lastIndexOf('/');
            const scriptDir = src.substring(0, lastSlash);
            const parentDir = scriptDir.substring(0, scriptDir.lastIndexOf('/'));
            rootPath = parentDir + '/';
            break;
        }
    }
    if (!rootPath) rootPath = './';
    const AUDIO_FOLDER = rootPath + 'assets/audio/';
    const IMAGE_FOLDER = rootPath + 'assets/images/album/';

    // ==================== GLOBAL STATE ====================
    let isPlaying = false;
    let currentThemeIndex = null;
    let fadeInterval = null;
    let hasUserInteracted = localStorage.getItem('audioUserInteracted') === 'true';
    let shuffleMode = localStorage.getItem('shuffleMode') === 'true';
    let loopMode = localStorage.getItem('loopMode') === 'true';
    let playlist = [];
    let currentPlaylistIndex = 0;
    let autoPlayTimeout = null;

    function updatePlaylist() {
        if (shuffleMode) {
            playlist = [...Array(THEMES.length).keys()];
            for (let i = playlist.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
            }
            currentPlaylistIndex = playlist.findIndex(idx => idx === currentThemeIndex);
            if (currentPlaylistIndex === -1) {
                currentPlaylistIndex = 0;
                currentThemeIndex = playlist[0];
            }
        } else {
            playlist = [...Array(THEMES.length).keys()];
            currentPlaylistIndex = currentThemeIndex;
        }
        localStorage.setItem('shuffleMode', shuffleMode);
        localStorage.setItem('loopMode', loopMode);
    }

    function getCurrentTheme() {
        return THEMES[playlist[currentPlaylistIndex]];
    }

    // ==================== UI UPDATES ====================
    function populateThemeDropdown() {
        if (!themeSelect) return;
        themeSelect.innerHTML = '';
        THEMES.forEach((theme, idx) => {
            const option = document.createElement('option');
            option.value = idx;
            option.textContent = theme.name;
            if (idx === currentThemeIndex) option.selected = true;
            themeSelect.appendChild(option);
        });
    }

    function updateUI() {
        const theme = getCurrentTheme();
        // main button album art
        if (isPlaying) {
            musicBtn.style.backgroundImage = `url(${IMAGE_FOLDER + theme.image.split('/').pop()})`;
            musicBtn.style.backgroundSize = 'cover';
            musicBtn.innerHTML = '';
            musicBtn.classList.add('rotating');
        } else {
            musicBtn.style.backgroundImage = '';
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicBtn.classList.remove('rotating');
        }

        // modal
        modalAlbumImg.src = IMAGE_FOLDER + theme.image.split('/').pop();
        modalThemeName.textContent = theme.name;
        playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        shuffleBtn.classList.toggle('active', shuffleMode);
        loopBtn.classList.toggle('active', loopMode);
        if (!isPlaying) {
            modalAlbumImg.classList.remove('rotating');
        } else {
            modalAlbumImg.classList.add('rotating');
        }

        // update dropdown selected index
        if (themeSelect && themeSelect.value != currentThemeIndex) {
            themeSelect.value = currentThemeIndex;
        }
    }

    // ==================== AUDIO CONTROL ====================
    function loadTheme(index, playAfterLoad = false) {
        if (index === currentThemeIndex) return;
        const theme = THEMES[index];
        if (!theme) return;

        const fullPath = AUDIO_FOLDER + theme.file;

        if (isPlaying) {
            fadeOutAndSwitch(fullPath, playAfterLoad);
        } else {
            audio.src = fullPath;
            audio.load();
            if (playAfterLoad && (hasUserInteracted || document.hasFocus())) {
                audio.play().catch(e => console.warn(e));
            }
        }
        currentThemeIndex = index;
        updatePlaylist();
        updateUI();
        populateThemeDropdown(); // update dropdown selection
        localStorage.setItem('audioThemeIndex', index);
        saveAudioState();
    }

    function fadeOutAndSwitch(newSrc, playAfter) {
        if (fadeInterval) clearInterval(fadeInterval);
        const startVolume = audio.volume;
        const stepTime = 50;
        const steps = FADE_DURATION / stepTime;
        let step = 0;

        fadeInterval = setInterval(() => {
            step++;
            const newVol = startVolume * (1 - step / steps);
            audio.volume = Math.max(0, newVol);
            if (step >= steps) {
                clearInterval(fadeInterval);
                fadeInterval = null;
                audio.pause();
                audio.src = newSrc;
                audio.load();
                audio.volume = 0;
                if ((playAfter && (hasUserInteracted || document.hasFocus())) || isPlaying) {
                    audio.play().then(() => fadeIn()).catch(e => console.warn(e));
                }
            }
        }, stepTime);
    }

    function fadeIn() {
        if (fadeInterval) clearInterval(fadeInterval);
        const stepTime = 50;
        const steps = FADE_DURATION / stepTime;
        let step = 0;
        audio.volume = 0;

        fadeInterval = setInterval(() => {
            step++;
            const newVol = step / steps;
            audio.volume = Math.min(1, newVol);
            if (step >= steps) {
                clearInterval(fadeInterval);
                fadeInterval = null;
            }
        }, stepTime);
    }

    function saveAudioState() {
        const state = {
            currentTime: audio.currentTime,
            volume: audio.volume,
            playing: isPlaying,
            themeIndex: currentThemeIndex,
            userInteracted: hasUserInteracted,
            shuffleMode,
            loopMode
        };
        localStorage.setItem('audioState', JSON.stringify(state));
        localStorage.setItem('audioUserInteracted', hasUserInteracted);
    }

    function loadAudioState() {
        const state = localStorage.getItem('audioState');
        if (state) {
            try {
                const { currentTime, volume, playing, themeIndex, userInteracted, shuffleMode: savedShuffle, loopMode: savedLoop } = JSON.parse(state);
                if (userInteracted !== undefined) hasUserInteracted = userInteracted;
                if (savedShuffle !== undefined) shuffleMode = savedShuffle;
                if (savedLoop !== undefined) loopMode = savedLoop;
                if (themeIndex !== undefined && themeIndex !== currentThemeIndex) {
                    currentThemeIndex = themeIndex;
                    updatePlaylist();
                    loadTheme(currentThemeIndex, false);
                }
                audio.currentTime = currentTime || 0;
                audio.volume = volume !== undefined ? volume : 0.5;
                volumeSlider.value = audio.volume * 100;
                audio.muted = false;

                if (hasUserInteracted && playing && !isPlaying) {
                    audio.play().then(() => {
                        isPlaying = true;
                        updateUI();
                        saveAudioState();
                    }).catch(err => {
                        console.log("Autoplay blocked; waiting for interaction");
                        isPlaying = false;
                        updateUI();
                    });
                } else {
                    isPlaying = false;
                    updateUI();
                }
            } catch(e) { console.warn(e); }
        } else {
            audio.volume = 0.5;
            volumeSlider.value = 50;
            audio.muted = false;
            isPlaying = false;
            updateUI();
            loadTheme(DEFAULT_THEME_INDEX, false);
        }
    }

    function togglePlay() {
        if (!hasUserInteracted) {
            hasUserInteracted = true;
            startAudio();
            return;
        }
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            updateUI();
            saveAudioState();
        } else {
            audio.play().then(() => {
                isPlaying = true;
                updateUI();
                saveAudioState();
            }).catch(e => console.warn(e));
        }
    }

    function playNext() {
        let nextIndex;
        if (shuffleMode) {
            nextIndex = (currentPlaylistIndex + 1) % playlist.length;
        } else {
            nextIndex = (currentThemeIndex + 1) % THEMES.length;
        }
        if (loopMode) {
            // allowed
        } else if (nextIndex === 0 && currentThemeIndex === THEMES.length - 1) {
            return;
        }
        if (shuffleMode) {
            currentPlaylistIndex = nextIndex;
            const newThemeIndex = playlist[currentPlaylistIndex];
            loadTheme(newThemeIndex, true);
        } else {
            loadTheme(nextIndex, true);
        }
    }

    function playPrev() {
        let prevIndex;
        if (shuffleMode) {
            prevIndex = (currentPlaylistIndex - 1 + playlist.length) % playlist.length;
        } else {
            prevIndex = (currentThemeIndex - 1 + THEMES.length) % THEMES.length;
        }
        if (loopMode) {
            // allowed
        } else if (prevIndex === THEMES.length - 1 && currentThemeIndex === 0) {
            return;
        }
        if (shuffleMode) {
            currentPlaylistIndex = prevIndex;
            const newThemeIndex = playlist[currentPlaylistIndex];
            loadTheme(newThemeIndex, true);
        } else {
            loadTheme(prevIndex, true);
        }
    }

    function startAudio() {
        if (autoPlayTimeout) clearTimeout(autoPlayTimeout);
        if (hasUserInteracted) return;

        hasUserInteracted = true;
        saveAudioState();

        const savedState = localStorage.getItem('audioState');
        if (savedState) {
            const { currentTime, volume, playing, themeIndex, shuffleMode: savedShuffle, loopMode: savedLoop } = JSON.parse(savedState);
            if (savedShuffle !== undefined) shuffleMode = savedShuffle;
            if (savedLoop !== undefined) loopMode = savedLoop;
            if (themeIndex !== undefined && themeIndex !== currentThemeIndex) {
                currentThemeIndex = themeIndex;
                updatePlaylist();
                loadTheme(currentThemeIndex, false);
            }
            audio.currentTime = currentTime || 0;
            audio.volume = volume !== undefined ? volume : 0.5;
            volumeSlider.value = audio.volume * 100;
            audio.muted = false;
            if (playing) {
                audio.play().then(() => {
                    isPlaying = true;
                    updateUI();
                    saveAudioState();
                }).catch(e => console.warn(e));
            }
        } else {
            autoPlayTimeout = setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * THEMES.length);
                currentThemeIndex = randomIndex;
                updatePlaylist();
                loadTheme(randomIndex, true);
            }, 3000);
        }
    }

    // ==================== EVENT LISTENERS ====================
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        musicBtn.addEventListener('click', () => {
            musicModal.classList.add('show');
        });
    } else {
        musicBtn.addEventListener('dblclick', () => {
            musicModal.classList.add('show');
        });
    }

    closeModalBtn.addEventListener('click', () => {
        musicModal.classList.remove('show');
    });
    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrev);
    nextBtn.addEventListener('click', playNext);
    shuffleBtn.addEventListener('click', () => {
        shuffleMode = !shuffleMode;
        updatePlaylist();
        updateUI();
        saveAudioState();
    });
    loopBtn.addEventListener('click', () => {
        loopMode = !loopMode;
        updateUI();
        saveAudioState();
    });
    seekSlider.addEventListener('input', (e) => {
        if (audio.duration) {
            const seekTo = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTo;
        }
    });
    volumeSlider.addEventListener('input', (e) => {
        const vol = e.target.value / 100;
        audio.volume = vol;
        saveAudioState();
    });
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            seekSlider.value = percent;
            currentTimeSpan.textContent = formatTime(audio.currentTime);
            durationSpan.textContent = formatTime(audio.duration);
        }
    });
    audio.addEventListener('ended', () => {
        if (loopMode) {
            audio.currentTime = 0;
            audio.play();
        } else {
            playNext();
        }
    });
    audio.addEventListener('play', () => {
        isPlaying = true;
        updateUI();
        saveAudioState();
    });
    audio.addEventListener('pause', () => {
        isPlaying = false;
        updateUI();
        saveAudioState();
    });
    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
    });

    // Dropdown change listener
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const newIndex = parseInt(e.target.value);
            if (newIndex !== currentThemeIndex) {
                loadTheme(newIndex, isPlaying);
            }
        });
    }

    document.addEventListener('click', () => {
        if (!hasUserInteracted) {
            startAudio();
        }
    }, { once: true });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }

    // ==================== INITIALISATION ====================
    updatePlaylist();
    populateThemeDropdown();
    loadAudioState();
})();