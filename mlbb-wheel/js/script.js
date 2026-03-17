// Global variables
let heroes = [];
let roles = ['Fighter', 'Assassin', 'Marksman', 'Tank', 'Support', 'Mage']; // base roles
let currentRoles = [...roles];
let selectedRole = '';
let spinWheelInterval, spinSlotInterval;
let currentHeroesForRole = [];

// Fetch heroes
fetch('data/heroes.json')
    .then(res => res.json())
    .then(data => {
        heroes = data;
        initWheel();
    });

// Canvas wheel
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
let rotation = 0;
let spinVelocity = 0;

function drawWheel() {
    const angleStep = (Math.PI * 2) / currentRoles.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < currentRoles.length; i++) {
        const startAngle = i * angleStep + rotation;
        const endAngle = startAngle + angleStep;
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#0f52ba' : '#001f3f';
        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(startAngle + angleStep/2);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(currentRoles[i], 80, 10);
        ctx.restore();
    }
}

function initWheel() {
    drawWheel();
}

// Spin wheel
document.getElementById('spinWheelBtn').addEventListener('click', () => {
    const duration = parseInt(document.getElementById('wheelDuration').value) * 1000;
    const startTime = performance.now();
    spinVelocity = 20; // initial speed
    function animateSpin(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        spinVelocity = 20 * (1 - progress); // decelerate
        rotation += spinVelocity * 0.01;
        drawWheel();
        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            // Determine selected role
            const angleStep = (Math.PI * 2) / currentRoles.length;
            const rawAngle = (rotation % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
            // adjust for pointer direction (assuming pointer at top)
            const pointerAngle = (Math.PI/2 - rawAngle + Math.PI*2) % (Math.PI*2);
            const index = Math.floor(pointerAngle / angleStep) % currentRoles.length;
            selectedRole = currentRoles[index];
            document.getElementById('selectedRole').textContent = `Selected Role: ${selectedRole}`;
            // Show slot section
            document.getElementById('slot').style.display = 'block';
            // Load heroes for this role
            loadHeroesForRole(selectedRole);
        }
    }
    requestAnimationFrame(animateSpin);
});

// Randomize roles
document.getElementById('randomizeRoles').addEventListener('click', () => {
    // Shuffle roles array
    currentRoles = [...roles];
    for (let i = currentRoles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentRoles[i], currentRoles[j]] = [currentRoles[j], currentRoles[i]];
    }
    drawWheel();
});

// Duration display
document.getElementById('wheelDuration').addEventListener('input', e => {
    document.getElementById('wheelDurationValue').textContent = e.target.value + 's';
});

// Load heroes for selected role
function loadHeroesForRole(role) {
    currentHeroesForRole = heroes.filter(h => h.roles.includes(role));
    renderHeroList();
}

function renderHeroList() {
    const listDiv = document.getElementById('heroList');
    listDiv.innerHTML = '<h4>Heroes in this role:</h4><ul>' + 
        currentHeroesForRole.map(h => `<li>${h.name} (${h.nickname})</li>`).join('') + 
        '</ul>';
}

// Slot machine
let slotRolling = false;
document.getElementById('spinSlotBtn').addEventListener('click', () => {
    if (slotRolling || currentHeroesForRole.length === 0) return;
    const duration = parseInt(document.getElementById('slotDuration').value) * 1000;
    const startTime = performance.now();
    slotRolling = true;
    const reel = document.getElementById('slotReel');
    function animateSlot(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Random hero name flicker
        const randomIndex = Math.floor(Math.random() * currentHeroesForRole.length);
        reel.textContent = currentHeroesForRole[randomIndex].name;
        if (progress < 1) {
            requestAnimationFrame(animateSlot);
        } else {
            // Final selection
            const finalIndex = Math.floor(Math.random() * currentHeroesForRole.length);
            const hero = currentHeroesForRole[finalIndex];
            reel.textContent = hero.name;
            slotRolling = false;
            showResultModal(hero);
        }
    }
    requestAnimationFrame(animateSlot);
});

// Randomize hero list (shuffle)
document.getElementById('randomizeHeroes').addEventListener('click', () => {
    if (currentHeroesForRole.length === 0) return;
    for (let i = currentHeroesForRole.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentHeroesForRole[i], currentHeroesForRole[j]] = [currentHeroesForRole[j], currentHeroesForRole[i]];
    }
    renderHeroList();
});

// Slot duration display
document.getElementById('slotDuration').addEventListener('input', e => {
    document.getElementById('slotDurationValue').textContent = e.target.value + 's';
});

// Modal
function showResultModal(hero) {
    const modal = document.getElementById('resultModal');
    document.getElementById('heroImage').src = hero.image;
    document.getElementById('heroName').textContent = hero.name;
    document.getElementById('heroNickname').textContent = hero.nickname;
    const audio = document.getElementById('heroSound');
    audio.src = hero.sound;
    audio.play();
    modal.style.display = 'flex';
    startConfetti();
}

document.querySelector('#resultModal .close').addEventListener('click', () => {
    document.getElementById('resultModal').style.display = 'none';
    stopConfetti();
});

// Confetti (simple canvas animation)
let confettiActive = false;
let confettiCanvas = document.getElementById('confettiCanvas');
let confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];

function startConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiActive = true;
    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 10,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 5,
            tiltAngle: 0
        });
    }
    updateConfetti();
}

function updateConfetti() {
    if (!confettiActive) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let p of confettiParticles) {
        confettiCtx.beginPath();
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(p.x, p.y, p.r, p.r * 1.5);
        p.y += Math.cos(p.d) + 1 + p.r / 2;
        p.x += Math.sin(p.tiltAngle) * 2;
        p.tiltAngle += 0.1;
        if (p.y > confettiCanvas.height) {
            p.y = 0;
            p.x = Math.random() * confettiCanvas.width;
        }
    }
    requestAnimationFrame(updateConfetti);
}

function stopConfetti() {
    confettiActive = false;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles = [];
}