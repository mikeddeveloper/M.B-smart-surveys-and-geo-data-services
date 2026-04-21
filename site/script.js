// ============================================
// MB SMART SURVEYS — Interactions
// ============================================

// 1) AOS init + icons
const initIcons = () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
    return true;
  }
  return false;
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      duration: 850,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
    });
  }

  // Try rendering icons immediately; if Lucide hasn't loaded yet, retry.
  if (!initIcons()) {
    let tries = 0;
    const retry = setInterval(() => {
      tries++;
      if (initIcons() || tries > 20) clearInterval(retry);
    }, 150);
  }

  // Also re-render on full load, in case images/scripts finish later.
  window.addEventListener('load', initIcons);

  // Current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// 2) Nav scroll state
const nav = document.getElementById('nav');
const setNavState = () => {
  if (!nav) return;
  if (window.scrollY > 40) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', setNavState, { passive: true });
setNavState();

// 3) Mobile menu toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// 4) Parallax-lite on hero background layers (subtle, respects reduced motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const layer1 = document.querySelector('.hero__bg-layer--1');
const layer2 = document.querySelector('.hero__bg-layer--2');
if (!prefersReduced && layer1 && layer2) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      layer1.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      layer2.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
      ticking = false;
    });
  }, { passive: true });
}

// 6) Image fallbacks — reveal placeholder when photos fail to load.
// (Inline onerror handles most cases; this is a safety pass for cached errors.)
const handleImageFallbacks = () => {
  document.querySelectorAll('.leader__photo, .testimonial__photo').forEach(img => {
    const showFallback = () => {
      img.style.display = 'none';
      const fallback = img.nextElementSibling;
      if (fallback) fallback.style.display = 'flex';
    };
    if (img.complete && img.naturalWidth === 0) showFallback();
    img.addEventListener('error', showFallback);
  });
};
if (document.readyState === 'complete') handleImageFallbacks();
else window.addEventListener('load', handleImageFallbacks);

const form = document.getElementById('bookForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !service) {
      status.textContent = 'Please complete your name, email, and service.';
      status.className = 'form-status is-error';
      return;
    }
    if (!emailValid) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form-status is-error';
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = 'Sending…';

    // Simulate dispatch — in production, POST to your endpoint here.
    setTimeout(() => {
      status.textContent = `Thank you, ${name.split(' ')[0]}. We've received your request and will respond within 48 hours.`;
      status.className = 'form-status is-success';
      form.reset();
      btn.disabled = false;
      btn.innerHTML = originalHtml;
      if (window.lucide) lucide.createIcons();
    }, 900);
  });
}
