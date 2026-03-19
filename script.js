/* ============================================================
   PORTFOLIO — Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Smooth-scroll nav links ----
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const navbar   = document.getElementById('navbar');
  const navMenu  = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // close mobile menu
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // ---- Active nav highlight on scroll ----
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ---- Mobile menu toggle ----
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // ---- Reveal on scroll (Intersection Observer) ----
  const reveals = document.querySelectorAll('.reveal');

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));

  // ---- Project expand / collapse ----
  const projectToggles = document.querySelectorAll('.project-toggle');

  projectToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const detail = document.getElementById(targetId);

      if (!detail) return;

      const isOpen = detail.classList.contains('open');

      // Close all others
      document.querySelectorAll('.project-detail.open').forEach(d => {
        d.classList.remove('open');
      });
      document.querySelectorAll('.project-toggle').forEach(b => {
        b.textContent = 'Read More';
      });

      if (!isOpen) {
        detail.classList.add('open');
        btn.textContent = 'Show Less';

        // Smooth scroll to the card
        setTimeout(() => {
          btn.closest('.project-card').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    });
  });
});
