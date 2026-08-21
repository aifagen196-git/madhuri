(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  const savedTheme = localStorage.getItem('madhuri-theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  updateThemeIcon();

  themeToggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('madhuri-theme', root.dataset.theme);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    if (themeToggle) themeToggle.textContent = root.dataset.theme === 'light' ? '☾' : '☼';
  }

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
})();
