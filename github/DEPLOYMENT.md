# BCXI GitHub Pages Deployment Guide

## Overview

This is the GitHub Pages public-facing website for the BCXI Ghana Experience Index platform. It provides:

- **Root homepage** (`/index.html`) — Multi-sector BCXI platform introduction
- **Sector pages** (`/banks/index.html`, etc.) — Industry selection and institution directories
- **Review pages** (`/banks/review.html`, etc.) — Pre-survey institution details
- **Support pages** (`/pages/`) — Privacy, methodology, contact, institutions info
- **Data configuration** (`/data/`) — Sector and institution definitions
- **Static assets** (`/assets/`) — Images for CX dimensions, touchpoints, and welcome hero

The actual survey, scoring and admin functions are handled by Google Apps Script. GitHub Pages routes users to the Google Form for survey completion.

## Directory Structure

```
github/
├── index.html                 # Root homepage (BCXI master platform)
├── manifest.webmanifest       # PWA manifest
├── sw.js                      # Service worker
│
├── banks/
│   ├── index.html            # Banking sector landing page
│   └── review.html           # Individual bank review page
│
├── pages/
│   ├── privacy.html          # Privacy policy
│   ├── methodology.html       # Methodology documentation
│   ├── contact.html          # Contact information
│   └── institutions.html      # For institutions section
│
├── data/
│   ├── config.js             # Sector configuration (active/coming soon)
│   └── institutions.js       # Institution data (23 banks + future sectors)
│
├── styles/
│   ├── main.css              # Main stylesheet
│   └── sectors.css           # Sector-specific styles
│
├── scripts/
│   ├── main.js               # Main application logic
│   └── sectors.js            # Sector page logic
│
└── assets/
    ├── welcome/
    │   └── hero.png          # Welcome hero image
    ├── sections/
    │   ├── access-convenience.png
    │   ├── digital-experience.png
    │   ├── ... (8 more CX dimensions)
    ├── shared/
    │   ├── branch-experience.png
    │   ├── atm-experience.png
    │   └── ... (more touchpoint scenes)
    └── institutions/
        ├── absa-bank-ghana-limited/
        │   └── logo.png
        ├── access-bank-ghana-plc/
        │   └── logo.png
        └── ... (21 more banks)
```

## Configuration

### Add a New Sector

1. Edit `/data/config.js`:
   ```javascript
   {
     id: 'utilities',
     name: 'Utilities',
     slug: 'utilities',
     status: 'active',        // or 'coming-soon'
     description: '...',
     icon: '⚡',
     defaultFormUrl: 'https://forms.gle/...'
   }
   ```

2. Create `/sectors/{slug}/index.html` (copy from `/banks/index.html` and customize)

3. Add institutions to `/data/institutions.js`:
   ```javascript
   utilities: [
     { id: 'UTIL_01', name: '...', slug: '...', logoPath: '...', formUrl: '...' }
   ]
   ```

### Add an Institution to Banking

1. Edit `/data/institutions.js` — add to the `banking` array
2. Create folder: `/assets/institutions/{slug}/`
3. Add `logo.png` to the folder (official institution logo)

## Deployment

### To GitHub Pages

1. Ensure repository is set to publish from `/github` folder or root (depending on your repo structure)
2. Commit all changes to your repository
3. Push to GitHub
4. GitHub Actions automatically builds and deploys to your GitHub Pages URL

### To Custom Domain

1. Add your domain to repository settings
2. Create `CNAME` file in the `github/` folder with your domain
3. Update DNS to point to GitHub Pages
4. GitHub handles SSL certificate automatically

## Important Notes

### Bank Logos

**⚠️ PLACEHOLDER LOGOS NOT PROVIDED** — Each bank entry currently displays the bank name in a styled box instead of official logos. You must:

1. Obtain official bank logos from each institution (or their approved sources)
2. Place them as PNG/WebP files in `/assets/institutions/{bank-slug}/logo.png`
3. Logos should have transparent backgrounds where possible
4. Recommended size: optimized for 200x100px display

### Google Forms Integration

The current routing sends all banking surveys to:
```
https://docs.google.com/forms/d/e/1FAIpQLSeBiDy-eEmFO8kZ1TrAWGOkfcR8F6BCJeDD5dMT_CBvLP331A/viewform
```

The Google Form itself contains a bank selection question. To support prefilled URLs per bank:

1. Obtain the prefilled URL from Google Forms for each bank
2. Add to institution object: `prefilledFormUrl: 'https://forms.gle/...'`
3. The routing logic will use prefilled URL if available, else fallback to default form

### Privacy & Compliance

- Do NOT expose Google Sheet IDs or response data URLs in public code ✓ (not exposed)
- Privacy policy template provided in `/pages/privacy.html`
- Update contact email addresses in all pages and footer
- Update privacy notice before launch with actual data handling practices

### Mobile Testing

Test at these breakpoints:
- 320px (iPhone SE)
- 375px (iPhone)
- 430px (Galaxy)
- 768px (Tablet)
- 1024px+ (Desktop)

Run this test:
```bash
# Open browser DevTools
# Set device emulation to each size
# Verify: no horizontal scroll, images scale, buttons accessible
```

## Links & References

- **Public Homepage:** `/` (root)
- **Banking Sector:** `/banks/`
- **Individual Bank Review:** `/banks/review.html?institution={slug}`
- **Google Form:** https://forms.gle/T6LoqoBxdVZyK1Ny6

## Future Phases

- [ ] Add utilities sector (copy banking structure)
- [ ] Add education sector
- [ ] Add civil service sector
- [ ] Create dashboard for benchmarking results (if applicable)
- [ ] Implement institution admin login
- [ ] Add multilingual support (English/Twi/French)
- [ ] Create mobile app wrapper

## Troubleshooting

**Sectors not showing:**
- Check browser console for JS errors
- Verify `/data/config.js` and `/data/institutions.js` load correctly
- Ensure all file paths are relative (start with `/`, not absolute URLs)

**Images not loading:**
- Verify asset files exist in `/assets/` folder
- Check relative paths in HTML/CSS (use `/assets/...`)
- For HTTPS deployment, ensure all resources are HTTPS

**Form not opening:**
- Verify Google Form URL is correct and publicly accessible
- Check that review page correctly reads query parameters
- Ensure form link is not blocked by browser security

## Contact

For questions about deployment, modification or architecture:
- **Technical:** research@bcxighana.org
- **General:** info@bcxighana.org
