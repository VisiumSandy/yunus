/* ============================================================
   YNS LAZARO — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- HEADER scroll effect ---- */
  const header = document.getElementById('header');
  const floatCta = document.getElementById('floatCta');

  function onScroll() {
    const y = window.scrollY;
    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (y > 300) {
      floatCta.classList.add('visible');
    } else {
      floatCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- BURGER MENU ---- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    // animate burger
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  /* ---- SMOOTH ANCHOR SCROLL (offset for fixed header) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- INTERSECTION OBSERVER — card reveal ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.service-card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });

  /* ---- DEVIS FORM ---- */
  const form = document.getElementById('devisForm');
  const successPanel = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      // Build mailto link as fallback submission
      const data = new FormData(form);
      const nom     = data.get('nom') || '';
      const tel     = data.get('tel') || '';
      const email   = data.get('email') || '';
      const travaux = data.get('travaux') || '';
      const msg     = data.get('message') || '';

      const body = encodeURIComponent(
        `Bonjour,\n\nJe souhaite obtenir un devis.\n\nNom : ${nom}\nTéléphone : ${tel}\nEmail : ${email}\n\nType de travaux : ${travaux}\n\nDescription :\n${msg}\n\nCordialement,\n${nom}`
      );

      const subject = encodeURIComponent(`Demande de devis - ${travaux || 'Maçonnerie'}`);
      const mailtoLink = `mailto:varto58@outlook.com?subject=${subject}&body=${body}`;

      // Simulate brief processing then open mail client
      setTimeout(() => {
        window.location.href = mailtoLink;
        // Show success message
        successPanel.classList.add('show');
        form.style.display = 'none'; // hide form
      }, 800);
    });
  }

  /* ---- ACTIVE NAV LINK on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            if (!link.classList.contains('nav-cta')) {
              link.style.color = 'var(--c-light)';
            }
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- PARALLAX subtle on hero image ---- */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroImg.style.transform = `translateY(${y * 0.25}px)`;
    }, { passive: true });
  }

});
