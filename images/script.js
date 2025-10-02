/* script.js
   Enhanced interactions for SangDev portfolio
   - Keep your original behavior + many extras
   - Well commented for the lab
*/

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ============================
     Optional welcome alert
     (Uncomment the next line if you want it)
  ============================ */
  // alert('Welcome to SangDev Portfolio!');

  /* ============================
     Dynamic footer year
  ============================ */
  const footerP = document.querySelector('footer p');
  if (footerP) {
    footerP.textContent = `© ${new Date().getFullYear()} SangDev. All rights reserved.`;
  }

  /* ============================
     Smooth scroll for nav links + click highlight
  ============================ */
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // mark clicked link active
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ============================
     Active nav link based on scroll position
  ============================ */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  function updateActiveOnScroll() {
    const pos = window.scrollY + window.innerHeight / 3;
    for (const sec of sections) {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (a) a.classList.add('active');
      }
    }
  }
  window.addEventListener('scroll', updateActiveOnScroll);
  updateActiveOnScroll();

  /* ============================
     Hero typing effect (name)
  ============================ */
  const heroSpan = document.querySelector('.hero-content h1 span');
  if (heroSpan) {
    const original = heroSpan.textContent.trim();
    heroSpan.textContent = '';
    let i = 0;
    (function type() {
      if (i < original.length) {
        heroSpan.textContent += original.charAt(i);
        i++;
        setTimeout(type, 90);
      }
    })();
  }

  /* ============================
     Hero mouseover glow (keeps original styles when mouse out)
  ============================ */
  const heroH1 = document.querySelector('.hero-content h1');
  if (heroH1) {
    heroH1.addEventListener('mouseover', () => {
      heroH1.dataset.origColor = heroH1.style.color || '';
      heroH1.dataset.origShadow = heroH1.style.textShadow || '';
      heroH1.style.color = 'var(--neon-green)';
      heroH1.style.textShadow = '0 0 20px var(--neon-green), 0 0 40px var(--neon-pink)';
    });
    heroH1.addEventListener('mouseout', () => {
      heroH1.style.color = heroH1.dataset.origColor;
      heroH1.style.textShadow = heroH1.dataset.origShadow;
    });
  }

  /* ============================
     Read More / Read Less (About)
     Uses computedStyle so it works even if display set in CSS
  ============================ */
  const readBtn = document.getElementById('myBtn');
  if (readBtn) {
    const dots = document.getElementById('dots');
    const more = document.getElementById('more');
    // ensure elements exist
    if (dots && more) {
      // ensure initial states
      more.style.display = window.getComputedStyle(more).display === 'none' ? 'none' : 'inline';
      readBtn.addEventListener('click', () => {
        const dotsHidden = window.getComputedStyle(dots).display === 'none';
        if (dotsHidden) {
          dots.style.display = 'inline';
          more.style.display = 'none';
          readBtn.textContent = 'Read More';
        } else {
          dots.style.display = 'none';
          more.style.display = 'inline';
          readBtn.textContent = 'Read Less';
        }
      });
    }
  }

  /* ============================
     Contact form validation
  ============================ */
  const contactForm = document.querySelector('.contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const name = contactForm.querySelector('input[type="text"]').value.trim();
      const email = contactForm.querySelector('input[type="email"]').value.trim();
      const message = contactForm.querySelector('textarea').value.trim();
      const errors = [];
      if (!name) errors.push('Please enter your name.');
      if (!email) errors.push('Please enter your email.');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email.');
      if (!message) errors.push('Please enter your message.');

      if (errors.length) {
        alert(errors.join('\n'));
        e.preventDefault();
        return;
      }

      // No backend in this lab — show success and prevent real submit
      alert('✅ Thanks! Your message was received.');
      e.preventDefault();
      contactForm.reset();
    });
  }

  /* ============================
     Dark / Light theme toggle (persist with localStorage)
     Add a button with id="themeToggle"
  ============================ */
  const themeBtn = document.getElementById('themeToggle');
  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-mode');
      if (themeBtn) themeBtn.textContent = 'Dark Mode';
    } else {
      document.body.classList.remove('light-mode');
      if (themeBtn) themeBtn.textContent = 'Light Mode';
    }
  }
  // load saved preference
  const savedLight = localStorage.getItem('sangdev_theme') === 'light';
  applyTheme(savedLight);
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nowLight = !document.body.classList.contains('light-mode');
      applyTheme(nowLight);
      localStorage.setItem('sangdev_theme', nowLight ? 'light' : 'dark');
    });
  }

  /* ============================
     Scroll-to-top button
     Add a button with id="topBtn"
  ============================ */
  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================
     Skill hover micro-animation
  ============================ */
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.transform = 'translateY(-6px) scale(1.03)';
      card.style.transition = 'transform 200ms ease';
    });
    card.addEventListener('mouseout', () => {
      card.style.transform = '';
    });
  });

  /* ============================
     Project card click -> simple modal
     Clicking opens modal with template description
  ============================ */
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.textContent.trim();
      const modal = document.createElement('div');
      modal.className = 'proj-modal';
      modal.innerHTML = `
        <div class="proj-modal-inner" role="dialog" aria-modal="true" aria-label="${title} details">
          <button class="proj-close" aria-label="Close project modal">✕</button>
          <h3>${title}</h3>
          <p>This is a short description for <strong>${title}</strong>. Add technologies used, your role, and links here.</p>
        </div>
      `;
      document.body.appendChild(modal);

      // close handlers
      const closeBtn = modal.querySelector('.proj-close');
      closeBtn.addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (ev) => {
        if (ev.target === modal) modal.remove();
      });
    });
  });

}); // end DOMContentLoaded
