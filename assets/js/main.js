// ===== THEME TOGGLE =====
(function() {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  if (!nav) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle Theme');

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  `;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  function updateToggleIcon(theme) {
    toggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  }

  let currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateToggleIcon(currentTheme);

  if (hamburger) {
    nav.insertBefore(toggleBtn, hamburger);
  } else {
    nav.appendChild(toggleBtn);
  }

  toggleBtn.addEventListener('click', () => {
    currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateToggleIcon(currentTheme);
  });
})();

// ===== NAV HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ===== ACTIVE NAV LINK =====
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === currentPage) a.classList.add('active');
});

// ===== PROGRESS BARS =====
function animateProgressBars() {
  document.querySelectorAll('.progress-fill[data-width]').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}
const progressSection = document.querySelector('.skills-section');
if (progressSection) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateProgressBars(); obs.disconnect(); }
  }, { threshold: 0.2 });
  obs.observe(progressSection);
} else {
  setTimeout(animateProgressBars, 400);
}

// ===== CERT MODAL =====
document.querySelectorAll('.cert-preview-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.cert-card');
    const title = card.querySelector('.cert-title')?.textContent;
    const org = card.querySelector('.cert-org')?.textContent;
    const modal = document.getElementById('cert-modal');
    if (modal) {
      modal.querySelector('.modal-cert-name').textContent = title || '';
      modal.querySelector('.modal-cert-org').textContent = org || '';
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
});
document.getElementById('cert-modal')?.addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('modal-close')) {
    this.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// ===== FILTER TABS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.cert-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
    });
  });
});
