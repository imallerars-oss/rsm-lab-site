// ===== Mobile nav toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ===== Contact form (static demo — not connected to a backend) =====
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const requiredFields = contactForm.querySelectorAll('[required]');
    let valid = true;

    requiredFields.forEach(field => {
      const errorEl = field.parentElement.querySelector('.field-error');
      if (!field.value.trim()) {
        valid = false;
        if (errorEl) errorEl.style.display = 'block';
        field.style.borderColor = 'var(--red)';
      } else {
        if (errorEl) errorEl.style.display = 'none';
        field.style.borderColor = '';
      }
    });

    if (!valid) return;

    contactForm.style.display = 'none';
    document.querySelector('#form-success').style.display = 'block';
  });
}
