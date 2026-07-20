// Sector-specific scripts

document.addEventListener('DOMContentLoaded', function() {
  // Determine sector from URL
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const sectorSlug = pathSegments[0];

  if (sectorSlug === 'banks' || sectorSlug === 'sectors') {
    renderBankGrid();
    setupSearchFilter();
  } else if (window.location.pathname.includes('/banks/review.html')) {
    handleReviewPage();
  }
});

// Render bank grid
function renderBankGrid() {
  const grid = document.getElementById('bank-grid');
  const noResults = document.getElementById('no-results');

  if (!grid || !INSTITUTIONS || !INSTITUTIONS.banking) return;

  const banks = INSTITUTIONS.banking;

  grid.innerHTML = banks.map(bank => {
    return `
      <a href="review.html?institution=${bank.slug}" class="institution-card" data-bank-name="${bank.name.toLowerCase()}">
        <img src="${bank.logoPath}" alt="${bank.name}" class="institution-logo" onerror="this.style.display='none'">
        <div class="institution-name">${bank.name}</div>
        <div class="institution-cta">Review Experience</div>
      </a>
    `;
  }).join('');

  if (noResults) {
    noResults.style.display = 'none';
  }
}

// Search filter functionality
function setupSearchFilter() {
  const searchInput = document.getElementById('bank-search');
  const grid = document.getElementById('bank-grid');
  const noResults = document.getElementById('no-results');

  if (!searchInput || !grid) return;

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const cards = grid.querySelectorAll('.institution-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const bankName = card.getAttribute('data-bank-name');
      if (bankName.includes(query)) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });

  // Focus input on page load for better UX
  searchInput.focus();
}

// Handle review page
function handleReviewPage() {
  const params = new URLSearchParams(window.location.search);
  const institutionSlug = params.get('institution');

  if (!institutionSlug) {
    window.location.href = '/banks/';
    return;
  }

  const institution = getInstitutionBySlug('banking', institutionSlug);

  if (!institution) {
    window.location.href = '/banks/';
    return;
  }

  // Update page content with institution details
  updateReviewPage(institution);

  // Set up form submission
  const startButton = document.getElementById('start-assessment');
  const changeButton = document.getElementById('change-bank');

  if (startButton) {
    startButton.addEventListener('click', function(e) {
      e.preventDefault();
      // Redirect to Google Form
      // For now, just open the form URL
      window.location.href = institution.formUrl;
    });
  }

  if (changeButton) {
    changeButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/banks/';
    });
  }
}

// Update review page with institution details
function updateReviewPage(institution) {
  const titleEl = document.querySelector('.review-container h1');
  const subtitleEl = document.querySelector('.review-subtitle');
  const descriptionEl = document.querySelector('.review-description');

  if (titleEl) {
    titleEl.textContent = `Review Your Experience With\n${institution.name}`;
  }

  if (subtitleEl) {
    subtitleEl.innerHTML = `${institution.name}`;
  }

  if (descriptionEl) {
    descriptionEl.innerHTML = `Your experience matters. Complete the BCXI Banking Customer Experience assessment based on your interactions with ${institution.name}.`;
  }

  // Update page title
  document.title = `Review ${institution.name} | BCXI Banking`;

  // Set up breadcrumb if it exists
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <div class="container">
        <a href="/">BCXI</a> / <a href="/banks/">Banking</a> / <span>${institution.name}</span>
      </div>
    `;
  }
}

// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js').catch(() => {});
}
