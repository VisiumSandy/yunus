/* ============================================================
   YNS LAZARO — script.js
============================================================ */

// ── Header sticky ────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('stuck', window.scrollY > 50);
}, { passive: true });

// ── Burger menu ──────────────────────────────────────────────
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ─────────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.sr').forEach(el => io.observe(el));

// ── Counters ──────────────────────────────────────────────────
function counter(el) {
  const target = +el.dataset.target, dur = 1800, step = 16;
  const inc = target / (dur / step);
  let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + inc, target);
    el.textContent = Math.floor(cur);
    if (cur >= target) clearInterval(t);
  }, step);
}
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat__num[data-target]').forEach(counter);
      cio.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stats').forEach(s => cio.observe(s));

// ── Contact form ──────────────────────────────────────────────
const form = document.getElementById('contactForm');
const ok   = document.getElementById('formOk');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Envoi en cours…'; btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/></svg> Envoyer ma demande de devis`;
      btn.disabled = false;
      ok.classList.add('show');
      setTimeout(() => ok.classList.remove('show'), 6000);
    }, 1200);
  });
}

// ── Smooth scroll ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
