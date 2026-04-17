/* ---- Portfolio Javascript ---- */
// Must run after DOM is ready so all <i data-lucide> tags are parsed
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});

/* ---- CUSTOM CURSOR ---- */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// Ring follows with smooth physics lag
(function animRing() {
  rx += (mx - rx) * .1;
  ry += (my - ry) * .1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// Cursor expands on interactive elements
document.querySelectorAll('a, button, .soc-btn, .soc-big, .proj-card, .sk-card, .ab-card, .hn-cert-wrap').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    ring.style.width    = '52px';
    ring.style.height   = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
  });
});

/* ---- NAV — visible only after scrolling past masthead ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 160);
});

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children')
  .forEach(el => revealObserver.observe(el));

/* ---- HAMBURGER MENU (mobile) ---- */
document.getElementById('hamburger').addEventListener('click', () => {
  const links = document.getElementById('navLinks');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.cssText = `
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 55px; left: 0; right: 0;
      background: #0a0a0a;
      padding: 24px 32px;
      gap: 20px;
      border-bottom: 1px solid rgba(245,242,238,.1);
      z-index: 200;
    `;
  }
});

/* ---- TYPING EFFECT (hero title) ---- */
const titleEl = document.querySelector('.hero-title');
if (titleEl) {
  const text = titleEl.textContent;
  titleEl.textContent = '';
  titleEl.style.borderRight = '2px solid #CC0000';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      titleEl.textContent += text[i++];
      setTimeout(type, 52);
    } else {
      setTimeout(() => { titleEl.style.borderRight = 'none'; }, 800);
    }
  };
  setTimeout(type, 900);
}

/* ---- COUNTER ANIMATION (hero stats) ---- */
const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.hn-val').forEach(el => {
      const raw = el.textContent;
      const num = parseInt(raw);
      if (isNaN(num)) return;
      const suffix = raw.replace(/[0-9]/g, '');
      let current = 0;
      const steps = Math.max(num, 1);
      const timer = setInterval(() => {
        current++;
        el.textContent = current + suffix;
        if (current >= num) clearInterval(timer);
      }, 1200 / steps);
    });
    counterObserver.disconnect();
  }
}, { threshold: .4 });

counterObserver.observe(document.getElementById('hero'));

/* ---- CERTIFICATIONS — no dropdown, plain stat ---- */
// (dropdown removed per update)

/* ---- SMOOTH SCROLL — hero buttons ---- */
const heroContactBtn  = document.getElementById('heroContactBtn');
const heroProjectsBtn = document.getElementById('heroProjectsBtn');

if (heroContactBtn) {
  heroContactBtn.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}
if (heroProjectsBtn) {
  heroProjectsBtn.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---- MAGNETIC BUTTONS ---- */
document.querySelectorAll('.btn-red, .btn-outline, .nav-hire').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * .18;
    const y = (e.clientY - r.top  - r.height / 2) * .18;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
