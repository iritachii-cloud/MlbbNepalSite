// Global variables
let heroes = [];
let currentHeroIndex = 0;
let filteredHeroes = [];

// Fetch data
fetch('data/data.json')
    .then(res => res.json())
    .then(data => {
        heroes = data;
        filteredHeroes = heroes;
        renderCards(filteredHeroes);
    })
    .catch(err => console.error('Error loading heroes:', err));

// Render cards
function renderCards(heroesArray) {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = heroesArray.map((hero, index) => `
        <div class="hero-card" data-index="${index}">
            <img src="${hero.icon}" alt="${hero.name}" onerror="this.src='https://via.placeholder.com/120'">
            <h3>${hero.name}</h3>
            <div class="nickname">${hero.nickname}</div>
            <div class="rating">
                ${generateStars(hero.rating)} <span>(${hero.rating})</span>
            </div>
        </div>
    `).join('');

    // Add click listeners
    document.querySelectorAll('.hero-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            currentHeroIndex = index;
            showModal(heroesArray[index]);
        });
    });
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 10 - fullStars - halfStar;
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    filteredHeroes = heroes.filter(hero =>
        hero.name.toLowerCase().includes(term) ||
        hero.nickname.toLowerCase().includes(term)
    );
    renderCards(filteredHeroes);
    // Reset index? Keep safe
    currentHeroIndex = 0;
});

// Modal elements
const modal = document.getElementById('heroModal');
const modalContent = document.getElementById('modalHeroContent');
const closeBtn = document.querySelector('#heroModal .close');
const prevBtn = document.getElementById('prevHero');
const nextBtn = document.getElementById('nextHero');

// Show modal with hero data
function showModal(hero) {
    modalContent.innerHTML = buildModalHTML(hero);
    modal.style.display = 'flex';

    // Setup image toggles
    setupImageToggles(hero);
    
    // Animate progress bars
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }, 100);
}

function buildModalHTML(hero) {
    return `
        <div class="modal-hero-detail">
            <div class="image-section">
                <img id="mainHeroImage" class="main-image" src="${hero.images.real}" alt="${hero.name}">
                <div class="image-selector" id="imageSelector">
                    <button class="active" data-type="real">Real</button>
                    <button data-type="animated">Animated</button>
                    <button data-type="nineties">90's</button>
                </div>
                <div class="gallery" id="gallery">
                    ${hero.images.gallery.map(src => `<img src="${src}" alt="gallery" onclick="document.getElementById('mainHeroImage').src='${src}'">`).join('')}
                </div>
            </div>

            <div class="info-section">
                <div class="info-block">
                    <h3>${hero.name}</h3>
                    <p><strong>Nickname:</strong> ${hero.nickname}</p>
                    <p><strong>Rating:</strong> ${hero.rating} / 10</p>
                    <p><strong>Famous for:</strong> ${hero.famousFor}</p>
                </div>

                <div class="info-block">
                    <h3>Stats</h3>
                    <div class="stats">
                        <div class="stat-item">
                            <span class="stat-label">Attack</span>
                            <div class="progress-bar"><div class="progress-fill" data-width="${hero.stats.attack}"></div></div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Defense</span>
                            <div class="progress-bar"><div class="progress-fill" data-width="${hero.stats.defense}"></div></div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Movement</span>
                            <div class="progress-bar"><div class="progress-fill" data-width="${hero.stats.movement}"></div></div>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Atk Speed</span>
                            <div class="progress-bar"><div class="progress-fill" data-width="${hero.stats.attackSpeed}"></div></div>
                        </div>
                    </div>
                </div>

                <div class="info-block full-width">
                    <h3>Lore</h3>
                    <p>${hero.lore}</p>
                </div>

                <div class="info-block">
                    <h3>Abilities</h3>
                    <ul class="ability-list">
                        ${hero.abilities.map(ab => `<li><strong>${ab.name}:</strong> ${ab.description}</li>`).join('')}
                    </ul>
                </div>

                <div class="info-block">
                    <h3>Ultimate</h3>
                    <p>${hero.ultimate}</p>
                </div>

                <div class="info-block">
                    <h3>Attire</h3>
                    <ul>${hero.attire.map(item => `<li>${item}</li>`).join('')}</ul>
                </div>

                <div class="info-block">
                    <h3>Physical Appearance</h3>
                    <ul>${hero.physicalAppearance.map(desc => `<li>${desc}</li>`).join('')}</ul>
                </div>

                <div class="info-block">
                    <h3>Weapon</h3>
                    <p>${Array.isArray(hero.weapon) ? hero.weapon.join(', ') : hero.weapon}</p>
                </div>

                <div class="info-block">
                    <h3>Mount</h3>
                    <p>${hero.mount || 'None'}</p>
                </div>

                <div class="info-block">
                    <h3>Aura</h3>
                    <p>${hero.aura}</p>
                </div>

                <div class="info-block">
                    <h3>Personality</h3>
                    <p>${hero.personality}</p>
                </div>
            </div>
        </div>
    `;
}

function setupImageToggles(hero) {
    const buttons = document.querySelectorAll('#imageSelector button');
    const mainImg = document.getElementById('mainHeroImage');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const type = btn.dataset.type;
            mainImg.src = hero.images[type];
        });
    });
}

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Swipe / next previous
function showAdjacentHero(direction) {
    let newIndex = currentHeroIndex + direction;
    if (newIndex < 0) newIndex = filteredHeroes.length - 1;
    if (newIndex >= filteredHeroes.length) newIndex = 0;
    currentHeroIndex = newIndex;
    showModal(filteredHeroes[newIndex]);
}

prevBtn.addEventListener('click', () => showAdjacentHero(-1));
nextBtn.addEventListener('click', () => showAdjacentHero(1));

// Optional: touch swipe
let touchStartX = 0;
modalContent.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

modalContent.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) showAdjacentHero(-1); // swipe right -> prev
        else showAdjacentHero(1); // swipe left -> next
    }
});