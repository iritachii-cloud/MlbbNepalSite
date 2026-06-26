const roles = ["Fighter", "Assassin", "Marksman", "Tank", "Support", "Mage"];
let currentRoles = [...roles];
let rotation = 0;
let spinning = false;
let selectedRole = "";
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const colors = ["#a855f7", "#ef284c", "#1678e5", "#e09a17", "#d946ef", "#0ea5a4"];

function drawWheel() {
  const size = canvas.width;
  const center = size / 2;
  const slice = Math.PI * 2 / currentRoles.length;
  ctx.clearRect(0, 0, size, size);
  currentRoles.forEach((role, index) => {
    const start = index * slice;
    ctx.beginPath(); ctx.moveTo(center, center); ctx.arc(center, center, center - 12, start, start + slice); ctx.closePath();
    const gradient = ctx.createRadialGradient(center, center, 30, center, center, center);
    gradient.addColorStop(0, "#171020"); gradient.addColorStop(1, colors[index]);
    ctx.fillStyle = gradient; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,.4)"; ctx.lineWidth = 3; ctx.stroke();
    ctx.save(); ctx.translate(center, center); ctx.rotate(start + slice / 2); ctx.fillStyle = "white"; ctx.font = "800 29px Oxanium"; ctx.textAlign = "right"; ctx.fillText(role.toUpperCase(), center - 48, 10); ctx.restore();
  });
  ctx.beginPath(); ctx.arc(center, center, center - 22, 0, Math.PI * 2); ctx.strokeStyle = "#ffba31"; ctx.lineWidth = 10; ctx.stroke();
}

function renderChips() { document.getElementById("roleChips").innerHTML = currentRoles.map((role) => `<span>${role}</span>`).join(""); }
function spin() {
  if (spinning) return;
  spinning = true; document.getElementById("spinWheelBtn").disabled = true; APP.closeModal("roleModal");
  document.getElementById("wheelStatus").textContent = "Drafting role...";
  const duration = +document.getElementById("duration").value * 1000;
  const target = rotation + Math.PI * (10 + Math.random() * 6);
  const startRotation = rotation; const start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    rotation = startRotation + (target - startRotation) * eased;
    canvas.style.transform = `rotate(${rotation - Math.PI / 2}rad)`;
    if (p < 1) requestAnimationFrame(frame); else finish();
  }
  requestAnimationFrame(frame);
}
function finish() {
  const slice = Math.PI * 2 / currentRoles.length;
  const normalized = ((-rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  selectedRole = currentRoles[Math.floor(normalized / slice) % currentRoles.length];
  spinning = false; document.getElementById("spinWheelBtn").disabled = false;
  document.getElementById("wheelStatus").textContent = `Drafted: ${selectedRole}`;
  document.getElementById("resultRole").textContent = selectedRole;
  APP.openModal("roleModal");
}
document.getElementById("spinWheelBtn").addEventListener("click", spin);
document.getElementById("retryRole").addEventListener("click", spin);
document.getElementById("acceptRole").addEventListener("click", () => location.href = `../mlbb-slot/index.html?role=${encodeURIComponent(selectedRole)}`);
document.getElementById("shuffleRoles").addEventListener("click", () => { currentRoles.sort(() => Math.random() - .5); drawWheel(); renderChips(); });
document.getElementById("duration").addEventListener("input", (e) => document.getElementById("durationValue").textContent = `${e.target.value}s`);
drawWheel(); renderChips();
