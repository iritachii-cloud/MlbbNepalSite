let sliderImages = [];
let currentSlide = 0;
let slideInterval;
let eventsData = [];
let rosterData = [];

// Audio control
const audio = document.getElementById('themeSong');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

function initAudio() {
    // Attempt autoplay, but due to browser policies we'll show button
    audio.volume = 0.5;
    // Try to autoplay
    audio.play().catch(() => {
        // Autoplay blocked; show button to start
        musicBtn.innerHTML = '<i class="fas fa-play"></i> Play Theme';
        isPlaying = false;
    });
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i> Play Theme';
            isPlaying = false;
        } else {
            audio.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Theme';
            isPlaying = true;
        }
    });
    audio.addEventListener('ended', () => {
        // loop handled by loop attribute
    });
}

fetch('data/data.json')
    .then(res => res.json())
    .then(data => {
        sliderImages = data.heroSlider;
        renderSlider();
        rosterData = data.roster;
        renderRoster(rosterData);
        eventsData = data.events;
        renderEvents(eventsData);
        initSliderControls();
        initFadeInOnScroll();
        attachRosterModal();
        initAudio();
    })
    .catch(err => console.error('Error loading data:', err));

// Slider functions
function renderSlider() {
    const slider = document.getElementById('heroSlider');
    const dots = document.querySelector('.slider-dots');
    slider.innerHTML = '';
    dots.innerHTML = '';
    sliderImages.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slide ${i+1}`;
        slider.appendChild(img);
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(i));
        dots.appendChild(dot);
    });
    if (sliderImages.length) goToSlide(0);
    startAutoSlide();
}

function goToSlide(index) {
    const slider = document.getElementById('heroSlider');
    const dots = document.querySelectorAll('.dot');
    if (index < 0) index = sliderImages.length - 1;
    if (index >= sliderImages.length) index = 0;
    currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoSlide() { slideInterval = setInterval(nextSlide, 5000); }
function stopAutoSlide() { clearInterval(slideInterval); }

function initSliderControls() {
    document.querySelector('.prev').addEventListener('click', () => {
        stopAutoSlide(); prevSlide(); startAutoSlide();
    });
    document.querySelector('.next').addEventListener('click', () => {
        stopAutoSlide(); nextSlide(); startAutoSlide();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { stopAutoSlide(); prevSlide(); startAutoSlide(); }
        else if (e.key === 'ArrowRight') { stopAutoSlide(); nextSlide(); startAutoSlide(); }
    });
    const sliderContainer = document.querySelector('.slider-container');
    let touchStart = 0;
    sliderContainer.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; stopAutoSlide(); });
    sliderContainer.addEventListener('touchend', e => {
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
        startAutoSlide();
    });
    document.getElementById('heroSlider').addEventListener('dblclick', e => {
        if (e.target.tagName === 'IMG') showImagePopup(e.target.src);
    });
}

function showImagePopup(src) {
    const popup = document.getElementById('imagePopup');
    popup.querySelector('img').src = src;
    popup.style.display = 'flex';
}
document.querySelector('#imagePopup .close').addEventListener('click', () => {
    document.getElementById('imagePopup').style.display = 'none';
});

// Roster
function renderRoster(roster) {
    const grid = document.getElementById('rosterGrid');
    const desc = document.getElementById('rosterDescription');
    if (desc) desc.innerHTML = `<p>Ten elite warriors forged in the crucible of competitive MLBB. Each brings a unique legacy and skill set to the battlefield.</p>`;
    grid.innerHTML = '';
    roster.forEach(member => {
        const card = document.createElement('div');
        card.className = 'roster-card';
        card.setAttribute('data-id', member.id);
        card.setAttribute('data-caliber', member.caliber || 'pro');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <div class="role">${member.role}</div>
            <div class="hero">⚔️ ${member.favHero}</div>
        `;
        grid.appendChild(card);
    });
}

function attachRosterModal() {
    const rosterGrid = document.getElementById('rosterGrid');
    if (!rosterGrid) return;

    rosterGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.roster-card');
        if (!card) return;
        const id = parseInt(card.getAttribute('data-id'));
        const member = rosterData.find(m => m.id === id);
        if (member) {
            showRosterModal(member);
        }
    });
}

function showRosterModal(member) {
    // Set basic info
    document.getElementById('rosterModalName').innerText = member.name;
    document.getElementById('rosterModalRole').innerText = member.role;
    document.getElementById('rosterModalHero').innerText = member.favHero;
    document.getElementById('rosterModalMotto').innerText = member.motto;
    document.getElementById('rosterModalVision').innerText = member.vision;
    document.getElementById('rosterModalExp').innerText = member.experience;
    document.getElementById('rosterModalFun').innerText = member.funFact;
    document.getElementById('rosterModalQA').innerText = member.qaAnswer;
    document.getElementById('rosterModalAvatar').src = member.image;

    // Render skill bars
    const skillsContainer = document.getElementById('rosterModalSkills');
    skillsContainer.innerHTML = '';
    if (member.skills && member.skills.length) {
        member.skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-item';
            skillDiv.innerHTML = `
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.value}%</span>
                </div>
                <div class="skill-bar-bg">
                    <div class="skill-bar-fill" style="width: 0%;"></div>
                </div>
            `;
            skillsContainer.appendChild(skillDiv);
        });
        // Animate bars after modal opens
        setTimeout(() => {
            document.querySelectorAll('#rosterModalSkills .skill-bar-fill').forEach((bar, idx) => {
                const value = member.skills[idx].value;
                bar.style.width = value + '%';
            });
        }, 100);
    } else {
        skillsContainer.innerHTML = '<p>No skill data available.</p>';
    }

    const modal = document.getElementById('rosterModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Events
function renderEvents(events) {
    const grid = document.getElementById('eventsGrid');
    grid.innerHTML = '';
    events.forEach(event => {
        const item = document.createElement('div');
        item.className = 'event-item';
        item.innerHTML = `
            <div class="event-info">
                <h3>${event.title}</h3>
                <div class="event-date">${new Date(event.date).toLocaleDateString()}</div>
                <h4>${event.heading}</h4>
                <p class="event-description">${truncate(event.description, 160)}</p>
                <span class="read-more" data-id="${event.id}">Read more</span>
            </div>
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
        `;
        grid.appendChild(item);
    });
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const event = eventsData.find(ev => ev.id === id);
            showEventModal(event);
        });
    });
}

function truncate(text, len) {
    if (text.length <= len) return text;
    return text.slice(0, len) + '...';
}

function showEventModal(event) {
    document.getElementById('modalTitle').innerText = event.title;
    document.getElementById('modalDate').innerText = new Date(event.date).toLocaleDateString();
    document.getElementById('modalDescription').innerText = event.description;
    const modal = document.getElementById('eventModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Close modals
function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('show');
    });
    document.getElementById('imagePopup').style.display = 'none';
}

document.querySelectorAll('.modal .close').forEach(close => {
    close.addEventListener('click', closeModals);
});
window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) closeModals();
});

// Intersection Observer
function initFadeInOnScroll() {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.2 });
    faders.forEach(el => observer.observe(el));
}

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    alert("धन्यवाद! Our scouts will get back to you faster than a Fanny cable.");
    e.target.reset();
});