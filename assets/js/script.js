/* Eva | The Real Estate Queen — site JS */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Highlight active nav link based on current URL
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // Smooth reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });

  // Contact form → redirect to WhatsApp with prefilled message
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name') || '';
      const email = fd.get('email') || '';
      const phone = fd.get('phone') || '';
      const interest = fd.get('interest') || '';
      const budget = fd.get('budget') || '';
      const message = fd.get('message') || '';

      const text = `Hello Eva, I'd like to connect.%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Interested in:* ${interest}%0A` +
        `*Budget:* ${budget}%0A` +
        `*Message:* ${message}`;

      const wa = `https://wa.me/2349028719409?text=${encodeURIComponent(decodeURIComponent(text))}`;
      window.open(wa, '_blank');

      const status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Opening WhatsApp… if it doesn\'t open, message Eva directly on +234 902 871 9409.';
        status.style.color = 'var(--color-terracotta-dark)';
      }
    });
  }
});
