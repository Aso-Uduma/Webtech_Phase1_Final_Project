
  /* ============================ Mobile Menu Toggle ============================ */
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('active');
    });
  }

  /* ============================ Smooth Scroll for Anchor Links ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        window.scrollTo({
          top: targetEl.offsetTop - 60,
          behavior: 'smooth'
        });
        if (siteNav && siteNav.classList.contains('active')) {
          siteNav.classList.remove('active');
        }
      }
    });
  });

  /* ============================ Active Nav Link on Scroll ============================ */
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 70;
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  /* ============================ Portfolio Filtering ============================ */
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const category = this.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        item.style.display = (category === 'all' || item.classList.contains(category)) ? 'block' : 'none';
      });
    });
  });

  /* ============================ In‑View Animation Helper ============================ */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  animatedEls.forEach(el => observer.observe(el));

  /* ============================ Skill Bar Fill Animation ============================ */
  const skillBars = document.querySelectorAll('.skill-bar .fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        if (!entry.target.dataset.filled) {
          entry.target.style.width = targetWidth;
          entry.target.dataset.filled = 'true';
        }
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    bar.setAttribute('data-width', width);
    skillObserver.observe(bar);
  });

  /* ============================ Parallax Scroll Effect ============================ */
  const parallaxSections = document.querySelectorAll(
    '.hero-section, .services-section, .portfolio-section, .about-section, .experience-section'
  );
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    parallaxSections.forEach(section => {
      const offset = scrollTop * 0.3;
      section.style.backgroundPosition = `center ${offset}px`;
    });
  });

  /* ============================ Background Fade-in Effect ============================ */
  const bgSections = document.querySelectorAll('[data-bg-animate]');
  const bgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('bg-visible', entry.isIntersecting);
    });
  }, { threshold: 0.3 });
  bgSections.forEach(section => bgObserver.observe(section));

  /* ============================ Load Header ============================ */
  fetch('header.html')
    .then(r => r.text())
    .then(d => document.getElementById('header').innerHTML = d)
    .catch(err => console.error('Header load error:', err));

  