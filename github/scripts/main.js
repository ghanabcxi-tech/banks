// Main application script

document.addEventListener('DOMContentLoaded', function() {
  renderSectors();
  setupScrollingNavigation();
});

// Render sectors grid dynamically
function renderSectors() {
  const grid = document.getElementById('sectors-grid');
  if (!grid || !BCXI_CONFIG || !BCXI_CONFIG.sectors) return;

  grid.innerHTML = BCXI_CONFIG.sectors.map(sector => {
    const isActive = sector.status === 'active';
    const cardClass = `sector-card ${isActive ? 'active' : 'coming-soon'}`;
    const href = `/${sector.slug}/`;
    const onClick = !isActive ? 'return false;' : '';

    return `
      <a href="${href}" class="${cardClass}" onclick="${onClick}">
        <div class="sector-icon">${sector.icon}</div>
        <h3>${sector.name}</h3>
        <p class="sector-description">${sector.description}</p>
        <span class="sector-status ${!isActive ? 'coming-soon' : ''}">
          ${isActive ? 'Active' : 'Coming Soon'}
        </span>
      </a>
    `;
  }).join('');
}

// Update active nav link based on scroll position
function setupScrollingNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });

    // Always show Home as active if at top
    if (scrollY < 200) {
      document.querySelector('.nav-link[href="/"]')?.classList.add('active');
    }
  });
}

// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
