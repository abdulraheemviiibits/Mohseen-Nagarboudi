/* ============================================================
   MUSLIM WEDDING INVITATION — main.js
   ============================================================ */

// ---- CONFIGURATION ----
const CONFIG = {
  weddingDate: new Date('2026-05-22T14:00:00'),
  coupleName: { groom: 'Mohseen', bride: 'Muskan' },
  websiteUrl: window.location.href,
};

// ============================================================
// PRELOADER
// ============================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
    // Show dua popup after 2s
    setTimeout(showDuaPopup, 2000);
    // Trigger confetti
    triggerConfetti();
  }, 1800);
});

// ============================================================
// PARTICLES CANVAS
// ============================================================
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    const types = ['star', 'crescent', 'dot'];
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.1,
      type: types[Math.floor(Math.random() * types.length)],
      twinkle: Math.random() * Math.PI * 2,
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function drawStar(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const ai = ((i * 4 + 2) * Math.PI) / 5 - Math.PI / 2;
      if (i === 0) ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
      else ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      ctx.lineTo(x + (r * 0.4) * Math.cos(ai), y + (r * 0.4) * Math.sin(ai));
    }
    ctx.closePath();
    ctx.fill();
  }

  const gold = '#C9A84C';
  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.twinkle += 0.03;
      const op = p.opacity * (0.7 + 0.3 * Math.sin(p.twinkle));
      ctx.globalAlpha = op;
      ctx.fillStyle = gold;
      if (p.type === 'star') drawStar(ctx, p.x, p.y, p.size + 1);
      else if (p.type === 'crescent') {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'transparent'; ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(p.x + p.size * 0.6, p.y - p.size * 0.3, p.size * 0.75, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = gold;
      } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2); ctx.fill();
      }
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
})();

// ============================================================
// CONFETTI
// ============================================================
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const colors = ['#C9A84C', '#E8D5A3', '#1B6B3A', '#F5F0E8', '#9A7A32'];
  let pieces = [];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width, y: -20,
      w: Math.random() * 10 + 5, h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4, vy: Math.random() * 3 + 2,
      rot: Math.random() * Math.PI * 2, rotV: (Math.random() - 0.5) * 0.15, life: 1
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter(p => p.y < canvas.height + 30);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += 0.05;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color; ctx.globalAlpha = Math.min(1, (canvas.height - p.y) / 200);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (pieces.length > 0 && frame < 300) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ============================================================
// NAVBAR
// ============================================================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Hamburger
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.toggle('open');
  });
}
document.querySelectorAll('#mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.remove('open');
  });
});

// ============================================================
// THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) icon.textContent = next === 'dark' ? '☽' : '☀';
    localStorage.setItem('wedding-theme', next);
  });
}
// Restore theme
const savedTheme = localStorage.getItem('wedding-theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = savedTheme === 'dark' ? '☽' : '☀';
}

// ============================================================
// COUNTDOWN
// ============================================================
function updateCountdown() {
  const now = new Date();
  const diff = CONFIG.weddingDate - now;
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  if (diff <= 0) {
    if (cdDays) cdDays.textContent = 'YAY';
    if (cdHours) cdHours.textContent = '00';
    if (cdMins) cdMins.textContent = '00';
    if (cdSecs) cdSecs.textContent = '00';
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  
  if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
  if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
  if (cdMins) cdMins.textContent = String(mins).padStart(2, '0');
  if (cdSecs) cdSecs.textContent = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// AUDIO CONTROL (Nasheed Player)
// ============================================================
let audio = null;
let audioPlaying = false;

const audioBtn = document.getElementById('audio-btn');
if (audioBtn) {
  audioBtn.addEventListener('click', () => {
    if (!audio) {
      audio = new Audio('assets/nasheed.mp3');
      audio.loop = true;
    }
    
    audioPlaying = !audioPlaying;
    audioBtn.classList.toggle('playing', audioPlaying);
    const label = audioBtn.querySelector('.audio-label');
    if (label) label.textContent = audioPlaying ? 'Pause' : 'Nasheed';
    
    if (audioPlaying) {
      audio.play().catch(err => {
        console.warn("Autoplay / audio play blocked by browser policy:", err);
        audioPlaying = false;
        audioBtn.classList.remove('playing');
        if (label) label.textContent = 'Nasheed';
        showToast('🔊 Please tap/click anywhere first, then play.');
      });
    } else {
      audio.pause();
    }
  });
}

// ============================================================
// DUA POPUP
// ============================================================
function showDuaPopup() {
  const popup = document.getElementById('dua-popup');
  const overlay = document.getElementById('popup-overlay');
  if (popup) popup.classList.add('active');
  if (overlay) overlay.classList.add('active');
}

function closeDuaPopup() {
  const popup = document.getElementById('dua-popup');
  const overlay = document.getElementById('popup-overlay');
  if (popup) popup.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  
  // Clean autoplay trigger upon user interaction
  if (!audioPlaying && audioBtn) {
    audioBtn.click();
  }
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed;bottom:5rem;left:50%;transform:translateX(-50%);
    background:rgba(10,10,20,0.95);border:1px solid rgba(255,255,255,0.1);color:rgb(245,240,232);
    padding:0.8rem 1.5rem;border-radius:30px;font-size:0.85rem;z-index:9999;
    backdrop-filter:blur(12px);transition:opacity 0.4s;box-shadow:0 8px 30px rgba(0,0,0,0.4)`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { 
    toast.style.opacity = '0'; 
    setTimeout(() => toast.remove(), 400); 
  }, 3000);
}

// ============================================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// ACTIVE NAV LINK HIGHLIGHT
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observerNav.observe(s));

// Active nav style
const navStyle = document.createElement('style');
navStyle.textContent = '.nav-links a.active { color: var(--gold) !important; background: rgba(201,168,76,0.1); }';
document.head.appendChild(navStyle);

// ============================================================
// INVITATION CARD 3D TILT
// ============================================================
const card = document.getElementById('invite-card');
if (card) {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const inner = card.querySelector('.invite-card-inner');
    if (inner) inner.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.invite-card-inner');
    if (inner) inner.style.transform = '';
  });
}

// ============================================================
// MAP SWITCHER
// ============================================================
window.switchMap = function(venue) {
  const iframe = document.querySelector('.map-wrapper iframe');
  const btnNikah = document.getElementById('btn-map-nikah');
  const btnWalima = document.getElementById('btn-map-walima');
  
  if (!iframe) return;
  
  if (venue === 'nikah') {
    iframe.src = "https://maps.google.com/maps?q=Abu%20Function%20Hall,%20Sindagi&t=&z=15&ie=UTF8&iwloc=&output=embed";
    if (btnNikah) btnNikah.classList.add('active');
    if (btnWalima) btnWalima.classList.remove('active');
  } else if (venue === 'walima') {
    iframe.src = "https://maps.google.com/maps?q=A%20J%20Sethji%20Marriage%20Hall,%20Vijayapura&t=&z=15&ie=UTF8&iwloc=&output=embed";
    if (btnWalima) btnWalima.classList.add('active');
    if (btnNikah) btnNikah.classList.remove('active');
  }
};

// ============================================================
// PAGE INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Re-observe any lazily inserted reveals
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
});
