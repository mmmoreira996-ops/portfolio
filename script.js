// Language toggle
let lang = 'pt';

function toggleLang() {
  lang = lang === 'pt' ? 'en' : 'pt';
  document.getElementById('langToggle').textContent = lang === 'pt' ? 'EN' : 'PT';
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  document.querySelectorAll('[data-pt]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val) el.textContent = val;
  });
}

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Animated counters
function runCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const fps = 60;
    const increment = target / (duration / (1000 / fps));
    let current = 0;

    const tick = () => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current);
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

// Trigger counters when results section enters viewport
let counted = false;
const resultsEl = document.querySelector('.results-section');
if (resultsEl) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      runCounters();
    }
  }, { threshold: 0.25 }).observe(resultsEl);
}

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

sections.forEach(s => {
  s.style.opacity = '0';
  s.style.transform = 'translateY(24px)';
  s.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  fadeObs.observe(s);
});
