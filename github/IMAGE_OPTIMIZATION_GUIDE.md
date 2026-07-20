# 📸 BCXI Image Optimization Guide

## Overview

This guide walks through the **complete image optimization system** for BCXI, converting full-resolution infographics into performant web derivatives.

**Goal:** Reduce homepage imagery footprint from ~11.5MB to <2MB while maintaining visual quality across devices.

---

## Quick Start

### 1. Prepare Source Images

Copy all original high-resolution CX infographic images to:
```
github/assets/originals/
```

**Expected:** 27+ JPEG images (~11.5 MB)

### 2. Install Dependencies

```bash
cd github
npm install
```

This installs **Sharp** (image processor) and **Nodemon** (file watcher).

### 3. Run Optimization

```bash
npm run optimize
```

This:
- Reads all images from `assets/originals/`
- Categorizes them (hero/dimensions/sectors)
- Generates responsive sizes (1920/1280/768/480 for hero, 800/600/400 for cards)
- Converts to WebP (quality 78) and AVIF (quality 65)
- Saves to `assets/web/{category}/`
- Outputs a manifest and statistics

### 4. Update HTML (if not done)

Already done in this build! See "Responsive Images in HTML" below.

### 5. Test & Monitor

```bash
# View optimization manifest
cat assets/web/manifest.json

# Run Lighthouse (in Chrome DevTools)
# Audit Performance tab
```

---

## Directory Structure

```
github/
├── assets/
│   ├── originals/                    ← Copy full-res images here
│   │   ├── WhatsApp Image ....jpeg
│   │   └── ... (27 images)
│   │
│   └── web/                          ← Auto-generated optimized images
│       ├── hero/
│       │   ├── customer-experience-hero-1920.webp
│       │   ├── customer-experience-hero-1280.webp
│       │   ├── customer-experience-hero-768.webp
│       │   ├── customer-experience-hero-480.webp
│       │   ├── customer-experience-hero-1920.avif
│       │   └── ... (AVIF variants)
│       │
│       ├── dimensions/
│       │   ├── access-convenience/
│       │   │   ├── access-convenience-800.webp
│       │   │   ├── access-convenience-600.webp
│       │   │   └── access-convenience-400.webp
│       │   ├── digital-experience/
│       │   └── ... (10 dimension categories)
│       │
│       ├── sectors/
│       │   ├── banking/
│       │   ├── utilities/
│       │   └── education/
│       │
│       └── manifest.json              ← Auto-generated metadata
```

---

## Optimization Strategy

### LEVEL 1 — Master Hero

**Purpose:** Hero image above fold (homepage)  
**Device Sizes:**
- Desktop (1920px): 1920px wide
- Laptop (1280px): 1280px wide
- Tablet (768px): 768px wide
- Mobile (480px): 480px wide

**Formats:** WebP (default) + AVIF (fallback for older browsers)

**Loading:** `fetchpriority="high"` + `decoding="sync"` (blocks page until loaded)

**File Size Target:** ~80-120 KB per breakpoint

### LEVEL 2 — CX Dimension Cards

**Purpose:** Homepage "What BCXI Measures" section (10 dimensions)  
**Device Sizes:**
- Compact (800px): 800px wide
- Medium (600px): 600px wide
- Small (400px): 400px wide

**Formats:** WebP only (AVIF overhead not justified for small images)

**Loading:** `loading="lazy"` + `decoding="async"` (non-critical)

**File Size Target:** ~40-60 KB per card

### LEVEL 3 — Sector Cards

**Purpose:** Homepage "Choose an Industry" section (7 sectors)  
**Device Sizes:** Same as dimensions (800/600/400)

**Formats:** WebP only

**Loading:** `loading="lazy"` + `decoding="async"`

**File Size Target:** ~40-60 KB per card

---

## Responsive Image HTML

### Hero Image (Picture Element)

```html
<picture>
  <!-- 1920px (desktop) -->
  <source srcset="/assets/web/hero/customer-experience-hero-1920.avif" type="image/avif">
  <source srcset="/assets/web/hero/customer-experience-hero-1920.webp" type="image/webp">
  
  <!-- 1280px (laptop) -->
  <source media="(max-width: 1280px)" srcset="/assets/web/hero/customer-experience-hero-1280.avif" type="image/avif">
  <source media="(max-width: 1280px)" srcset="/assets/web/hero/customer-experience-hero-1280.webp" type="image/webp">
  
  <!-- 768px (tablet) -->
  <source media="(max-width: 768px)" srcset="/assets/web/hero/customer-experience-hero-768.avif" type="image/avif">
  <source media="(max-width: 768px)" srcset="/assets/web/hero/customer-experience-hero-768.webp" type="image/webp">
  
  <!-- 480px (mobile) -->
  <source media="(max-width: 480px)" srcset="/assets/web/hero/customer-experience-hero-480.avif" type="image/avif">
  <source media="(max-width: 480px)" srcset="/assets/web/hero/customer-experience-hero-480.webp" type="image/webp">
  
  <!-- Fallback -->
  <img src="/assets/web/hero/customer-experience-hero-1920.webp"
       alt="Ghana customer experience intelligence platform"
       fetchpriority="high"
       decoding="sync"
       width="1920"
       height="600">
</picture>
```

### Card Image (Simple Responsive)

```html
<img src="/assets/web/dimensions/access-convenience-800.webp"
     alt="Access and convenience in customer experience"
     loading="lazy"
     decoding="async"
     srcset="
       /assets/web/dimensions/access-convenience-800.webp 800w,
       /assets/web/dimensions/access-convenience-600.webp 600w,
       /assets/web/dimensions/access-convenience-400.webp 400w"
     sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 100vw">
```

---

## Image Attributes Explained

### `loading="lazy"`

Delays loading until image is about to enter viewport. Used for below-fold images.

**NOT used:** Hero image (needs to load immediately)  
**Used:** Dimension cards, sector cards

### `decoding="async"`

Tells browser not to block page rendering while decoding image. Good for non-critical images.

**Suggested:** Most images below the fold  
**Exception:** Hero image uses `decoding="sync"` (critical path)

### `fetchpriority="high"`

Hints to browser that hero image is critical, fetch with higher priority.

**Used:** Only for primary hero image  
**Not used:** Everything else

### `srcset` & `sizes`

Tells browser which image to download for current viewport size.

```html
srcset="
  image-800.webp 800w,   ← 800px wide image
  image-600.webp 600w,   ← 600px wide image
  image-400.webp 400w"   ← 400px wide image

sizes="
  (min-width: 1024px) 300px,  ← On desktop, image is 300px wide
  (min-width: 768px) 250px,   ← On tablet, image is 250px wide
  100vw"                      ← On mobile, image is full viewport width
```

---

## Expected Performance Improvements

### Before Optimization

| Metric | Value |
|--------|-------|
| Total image size | ~11.5 MB |
| Files | 27 high-res JPEGs |
| Formats | Only JPEG |
| Responsive | None (single file served to all devices) |
| Lazy loading | None |

### After Optimization

| Metric | Value |
|--------|-------|
| Total image size | ~1.8-2.2 MB (80-85% reduction) |
| Files | ~75 optimized (WebP + AVIF) |
| Formats | WebP (primary) + AVIF (fallback) |
| Responsive | Yes (4 sizes for hero, 3 for cards) |
| Lazy loading | Yes (all below-fold images) |
| Mobile-optimized | Yes (480px hero, 400px cards) |

### Lighthouse Improvements

**Expected scores:**

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| Performance | 45-55 | 85-90 | 90+ |
| LCP (Largest Contentful Paint) | 3.5s | 1.2s | <2.5s |
| CLS (Cumulative Layout Shift) | 0.1 | 0.02 | <0.1 |
| First Input Delay | 80ms | 30ms | <100ms |

---

## Advanced: Running Optimization Continuously

If you frequently add new images:

```bash
npm run optimize-watch
```

This watches the `assets/originals/` folder and re-optimizes whenever a new image is added.

**Stop with:** `Ctrl + C`

---

## Troubleshooting

### Problem: "Sharp installation failed"

**Solution:**
```bash
npm install --save-dev sharp --build-from-source
```

Or use prebuilt binaries:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problem: "No images found in assets/originals/"

**Solution:** Copy images to `github/assets/originals/` first, then run:
```bash
npm run optimize
```

### Problem: "AVIF files are larger than WebP"

**This is normal.** AVIF doesn't always compress smaller than WebP for infographics. Solution: Only generate AVIF for hero images (already configured).

### Problem: "Images look blurry on mobile"

**Check:** Verify `sizes` attribute in HTML matches actual CSS width. If image is 300px CSS but `sizes` says `100vw`, browser may pick wrong image.

---

## Manual Image Processing (Without Node.js)

If you cannot install Node.js, you can manually optimize using online tools:

1. **TinyPNG.com** (free, 20 images/month)
   - Upload JPEG → Download WebP
   - Repeat for each size

2. **Squoosh.app** (free, no limits)
   - Upload image
   - Select WebP, set quality 78
   - Download

3. **ImageOptim** (Mac) or **FileOptimizer** (Windows)
   - Drag-drop to optimize locally

Then manually organize into folder structure above.

---

## Deployment Checklist

- [ ] Copy all original images to `assets/originals/`
- [ ] Run `npm run optimize`
- [ ] Verify `assets/web/` folder is populated
- [ ] Check `assets/web/manifest.json` for statistics
- [ ] Update HTML `<img>` and `<picture>` tags (or use provided examples)
- [ ] Test on mobile device (360px width minimum)
- [ ] Run Lighthouse audit
- [ ] Verify Core Web Vitals:
  - LCP < 2.5s
  - CLS < 0.1
  - FID < 100ms
- [ ] Push to GitHub Pages
- [ ] Monitor real-world performance with analytics

---

## File Size Reference

**Expected optimized file sizes:**

```
Hero images (1920px):  ~120 KB (WebP) + ~100 KB (AVIF)
Hero images (1280px):  ~80 KB (WebP) + ~70 KB (AVIF)
Hero images (768px):   ~60 KB (WebP)
Hero images (480px):   ~40 KB (WebP)

Dimension card (800px): ~55 KB (WebP)
Dimension card (600px): ~40 KB (WebP)
Dimension card (400px): ~25 KB (WebP)

Total for full homepage: ~1.8-2.2 MB
```

---

## Next Steps

1. ✅ Optimization script created
2. ✅ Configuration documented
3. ⏳ Copy images to `assets/originals/`
4. ⏳ Run optimization
5. ⏳ Deploy and test

**Once complete, your homepage will load images ~5-7x faster on mobile!**

---

**Questions?** See `DEPLOYMENT.md` or `IMAGE_OPTIMIZATION_GUIDE.md` for more.
