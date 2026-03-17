// Global variables
let sliderImages = [];
let currentSlide = 0;
let slideInterval;
let eventsData = [];

// Fetch data from JSON
fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        sliderImages = data.heroSlider;
        renderSlider();
        renderAbout(data.about);
        eventsData = data.events;
        renderEvents(eventsData);
        initSliderControls();
        initFadeInOnScroll();
    })
    .catch(error => console.error('Error loading data:', error));

// Render Hero Slider
function renderSlider() {
    const slider = document.getElementById('heroSlider');
    const dotsContainer = document.querySelector('.slider-dots');
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';

    sliderImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slide ${index + 1}`;
        img.dataset.index = index;
        slider.appendChild(img);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    if (sliderImages.length > 0) {
        goToSlide(0);
        startAutoSlide();
    }
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

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function initSliderControls() {
    document.querySelector('.prev').addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    document.querySelector('.next').addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    // Touch swipe for mobile
    let touchStartX = 0;
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        stopAutoSlide();
    });
    sliderContainer.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoSlide();
    });

    // Keyboard arrows
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
    });

    // Double-click on image for fullscreen popup
    document.getElementById('heroSlider').addEventListener('dblclick', e => {
        if (e.target.tagName === 'IMG') {
            const src = e.target.src;
            showImagePopup(src);
        }
    });
}

// Fullscreen Image Popup
function showImagePopup(src) {
    const popup = document.getElementById('imagePopup');
    const img = popup.querySelector('img');
    img.src = src;
    popup.style.display = 'flex';
}

document.querySelector('#imagePopup .close').addEventListener('click', () => {
    document.getElementById('imagePopup').style.display = 'none';
});

// Render About Section
function renderAbout(aboutData) {
    document.getElementById('aboutDescription').innerHTML = `<p>${aboutData.description}</p>`;
    const teamGrid = document.getElementById('teamGrid');
    teamGrid.innerHTML = '';
    aboutData.team.forEach(member => {
        const div = document.createElement('div');
        div.className = 'team-member';
        div.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
        `;
        teamGrid.appendChild(div);
    });
}

// Render Events
function renderEvents(events) {
    const grid = document.getElementById('eventsGrid');
    grid.innerHTML = '';
    events.forEach((event, index) => {
        const item = document.createElement('div');
        item.className = 'event-item';
        item.innerHTML = `
            <div class="event-info">
                <h3>${event.title}</h3>
                <div class="event-date">${new Date(event.date).toLocaleDateString()}</div>
                <h4>${event.heading}</h4>
                <p class="event-description">${truncateText(event.description, 150)}</p>
                <span class="read-more" data-id="${event.id}">Read more</span>
            </div>
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
        `;
        grid.appendChild(item);
    });

    // Add read more listeners
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.id);
            const event = events.find(ev => ev.id === id);
            showEventModal(event);
        });
    });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Event Modal
function showEventModal(event) {
    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalDate').textContent = new Date(event.date).toLocaleDateString();
    document.getElementById('modalDescription').textContent = event.description;
    document.getElementById('eventModal').style.display = 'flex';
}

document.querySelector('#eventModal .close').addEventListener('click', () => {
    document.getElementById('eventModal').style.display = 'none';
});

// Fade-in on scroll (Intersection Observer)
function initFadeInOnScroll() {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    faders.forEach(el => observer.observe(el));
}