#!/usr/bin/env node

/**
 * BCXI Image Optimization Script
 *
 * Converts full-resolution CX infographic images into optimized
 * web derivatives using Sharp.
 *
 * Usage: node optimize-images.js
 *
 * Requires: npm install sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ORIGINAL_PATH = path.join(__dirname, '../assets/originals');
const WEB_PATH = path.join(__dirname, '../assets/web');
const QUALITY_WEBP = 78;
const QUALITY_AVIF = 65;

// Image categorization
const IMAGE_CATEGORIES = {
  hero: {
    pattern: /master|welcome|hero|main/i,
    sizes: [
      { width: 1920, suffix: '1920' },
      { width: 1280, suffix: '1280' },
      { width: 768, suffix: '768' },
      { width: 480, suffix: '480' }
    ]
  },
  dimensions: {
    pattern: /access|convenience|digital|experience|physical|service|customer|people|speed|efficiency|trust|transparency|security|problem|resolution|accountability|value|quality|overall|experience/i,
    sizes: [
      { width: 800, suffix: '800' },
      { width: 600, suffix: '600' },
      { width: 400, suffix: '400' }
    ]
  },
  sectors: {
    pattern: /bank|utility|education|civil|telecom|healthcare|utilities|education|government|telecommunications|health/i,
    sizes: [
      { width: 800, suffix: '800' },
      { width: 600, suffix: '600' },
      { width: 400, suffix: '400' }
    ]
  }
};

let stats = {
  processed: 0,
  failed: 0,
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  details: []
};

/**
 * Determine category from filename
 */
function getCategory(filename) {
  for (const [category, config] of Object.entries(IMAGE_CATEGORIES)) {
    if (config.pattern.test(filename)) {
      return category;
    }
  }
  return 'uncategorized';
}

/**
 * Get sanitized filename for output
 */
function getSanitizedName(original) {
  return original
    .replace(/WhatsApp Image [\d\-:\s]+\(?(\d+)?\)?\.jpeg/i, (match, num) => {
      const timestamp = Date.now().toString().slice(-6);
      return `image-${timestamp}.jpeg`;
    })
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Create directory if it doesn't exist
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath, filename) {
  const category = getCategory(filename);
  const sizes = IMAGE_CATEGORIES[category].sizes;
  const baseName = path.parse(filename).name;
  const categoryPath = path.join(WEB_PATH, category);

  ensureDir(categoryPath);

  console.log(`\n📷 Processing: ${filename}`);
  console.log(`   Category: ${category}`);

  const originalSize = fs.statSync(filePath).size;
  let categoryOptimizedSize = 0;

  for (const size of sizes) {
    try {
      // WebP format
      const webpPath = path.join(categoryPath, `${baseName}-${size.suffix}.webp`);
      await sharp(filePath)
        .resize(size.width, size.width * 0.6, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: QUALITY_WEBP })
        .toFile(webpPath);

      const webpSize = fs.statSync(webpPath).size;
      categoryOptimizedSize += webpSize;

      console.log(`   ✓ WebP ${size.suffix}px: ${(webpSize / 1024).toFixed(1)} KB`);

      // AVIF format (for hero only as it's larger for cards)
      if (category === 'hero') {
        const avifPath = path.join(categoryPath, `${baseName}-${size.suffix}.avif`);
        await sharp(filePath)
          .resize(size.width, size.width * 0.6, {
            fit: 'cover',
            position: 'center'
          })
          .avif({ quality: QUALITY_AVIF })
          .toFile(avifPath);

        const avifSize = fs.statSync(avifPath).size;
        categoryOptimizedSize += avifSize;
        console.log(`   ✓ AVIF ${size.suffix}px: ${(avifSize / 1024).toFixed(1)} KB`);
      }
    } catch (error) {
      console.error(`   ✗ Failed to create ${size.suffix}px: ${error.message}`);
      stats.failed++;
    }
  }

  stats.processed++;
  stats.totalOriginalSize += originalSize;
  stats.totalOptimizedSize += categoryOptimizedSize;
  stats.details.push({
    filename,
    category,
    originalSize,
    optimizedSize: categoryOptimizedSize,
    reduction: ((1 - categoryOptimizedSize / originalSize) * 100).toFixed(1)
  });

  console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB → Optimized: ${(categoryOptimizedSize / 1024).toFixed(1)} KB (${((1 - categoryOptimizedSize / originalSize) * 100).toFixed(1)}% reduction)`);
}

/**
 * Main optimization routine
 */
async function optimizeAll() {
  console.log('\n🚀 BCXI Image Optimization\n');
  console.log(`📁 Source: ${ORIGINAL_PATH}`);
  console.log(`📁 Destination: ${WEB_PATH}\n`);

  // Ensure directories exist
  ensureDir(ORIGINAL_PATH);
  ensureDir(WEB_PATH);

  // Get all image files
  const files = fs.readdirSync(ORIGINAL_PATH)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  if (files.length === 0) {
    console.log('❌ No images found in assets/originals/');
    console.log('\nTo use this script:');
    console.log('1. Copy original high-resolution images to assets/originals/');
    console.log('2. Run: node optimize-images.js');
    process.exit(1);
  }

  console.log(`Found ${files.length} images to optimize...\n`);

  // Process each image
  for (const file of files) {
    try {
      await optimizeImage(path.join(ORIGINAL_PATH, file), file);
    } catch (error) {
      console.error(`\n❌ Error processing ${file}:`, error.message);
      stats.failed++;
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY\n');
  console.log(`Total images processed: ${stats.processed}`);
  console.log(`Failed: ${stats.failed}`);
  console.log(`\nOriginal total size: ${(stats.totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(stats.totalOptimizedSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total reduction: ${((1 - stats.totalOptimizedSize / stats.totalOriginalSize) * 100).toFixed(1)}%\n`);

  // Top reductions
  console.log('📈 Per-image reductions:');
  stats.details
    .sort((a, b) => parseFloat(b.reduction) - parseFloat(a.reduction))
    .slice(0, 10)
    .forEach(d => {
      console.log(`   ${d.filename}: ${d.reduction}% (${(d.originalSize / 1024).toFixed(0)}KB → ${(d.optimizedSize / 1024).toFixed(0)}KB)`);
    });

  // Save manifest
  const manifest = {
    generatedAt: new Date().toISOString(),
    stats: {
      imagesProcessed: stats.processed,
      totalOriginalSizeMB: parseFloat((stats.totalOriginalSize / (1024 * 1024)).toFixed(2)),
      totalOptimizedSizeMB: parseFloat((stats.totalOptimizedSize / (1024 * 1024)).toFixed(2)),
      reductionPercent: parseFloat(((1 - stats.totalOptimizedSize / stats.totalOriginalSize) * 100).toFixed(1))
    },
    images: stats.details
  };

  fs.writeFileSync(
    path.join(WEB_PATH, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`\n✅ Optimization complete! Manifest saved to assets/web/manifest.json`);
  console.log(`\n🎯 Next steps:`);
  console.log(`1. Update HTML to use responsive <picture> elements`);
  console.log(`2. Add loading="lazy" to images below the fold`);
  console.log(`3. Test with Lighthouse for performance metrics`);
}

// Run optimization
optimizeAll().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
