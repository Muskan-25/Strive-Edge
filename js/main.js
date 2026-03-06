(function () {
  'use strict';

  // Header scroll effect
  var header = document.getElementById('header');
  if (header) {
    function onScroll() {
      var logo = header.querySelector('.logo');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        if (logo && !header.classList.contains('home')) {
          var light = logo.getAttribute('data-light');
          if (light) logo.src = light;
        }
      } else {
        header.classList.remove('scrolled');
        if (logo && !header.classList.contains('home')) {
          var dark = logo.getAttribute('data-dark');
          if (dark) logo.src = dark;
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // Mobile drawer
  var menuToggle = document.getElementById('menuToggle');
  var drawer = document.getElementById('drawer');
  var drawerOverlay = document.getElementById('drawerOverlay');
  if (menuToggle && drawer) {
    function openDrawer() {
      drawer.classList.add('open');
      if (drawerOverlay) drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      if (drawerOverlay) drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    menuToggle.addEventListener('click', function () {
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }

  // Scroll to top button
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    scrollTopBtn.style.display = 'none';
  }

  // Footer year
  var yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form submit
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn ? btn.textContent : '';
      if (btn) btn.disabled = true;
      if (btn) btn.textContent = 'Sending...';

      var formData = new FormData(contactForm);
      var data = {};
      formData.forEach(function (v, k) { data[k] = v; });

      fetch('https://sanhi-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json().then(function (j) { return res.ok ? j : Promise.reject(j); }); })
        .then(function () {
          alert('Your message has been sent successfully!');
          contactForm.reset();
        })
        .catch(function (err) {
          alert(err.message || 'Something went wrong. Please try again.');
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = originalText;
          }
        });
    });
  }

  // Hash scroll on load (for how-we-work, why-choose-us)
  if (window.location.hash) {
    setTimeout(function () {
      var el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
})();
