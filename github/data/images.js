/**
 * Image Optimization Configuration
 * Defines responsive image sources for optimal performance
 */

const IMAGES = {
  hero: {
    title: 'BCXI Welcome Hero',
    baseUrl: '/assets/web/hero/customer-experience-hero',
    formats: {
      webp: [
        { width: 1920, src: 'customer-experience-hero-1920.webp' },
        { width: 1280, src: 'customer-experience-hero-1280.webp' },
        { width: 768, src: 'customer-experience-hero-768.webp' },
        { width: 480, src: 'customer-experience-hero-480.webp' }
      ],
      avif: [
        { width: 1920, src: 'customer-experience-hero-1920.avif' },
        { width: 1280, src: 'customer-experience-hero-1280.avif' },
        { width: 768, src: 'customer-experience-hero-768.avif' },
        { width: 480, src: 'customer-experience-hero-480.avif' }
      ]
    },
    alt: 'Ghana customer experience intelligence platform',
    fetchPriority: 'high',
    decoding: 'sync'
  },

  dimensions: {
    access: {
      title: 'Access & Convenience',
      baseUrl: '/assets/web/dimensions/access-convenience',
      srcset: [
        { width: 800, src: 'access-convenience-800.webp' },
        { width: 600, src: 'access-convenience-600.webp' },
        { width: 400, src: 'access-convenience-400.webp' }
      ],
      alt: 'Access and convenience in customer experience',
      loading: 'lazy',
      decoding: 'async'
    },
    digital: {
      title: 'Digital Experience',
      baseUrl: '/assets/web/dimensions/digital-experience',
      srcset: [
        { width: 800, src: 'digital-experience-800.webp' },
        { width: 600, src: 'digital-experience-600.webp' },
        { width: 400, src: 'digital-experience-400.webp' }
      ],
      alt: 'Digital experience dimension',
      loading: 'lazy',
      decoding: 'async'
    },
    physical: {
      title: 'Physical Service Experience',
      baseUrl: '/assets/web/dimensions/physical-service',
      srcset: [
        { width: 800, src: 'physical-service-800.webp' },
        { width: 600, src: 'physical-service-600.webp' },
        { width: 400, src: 'physical-service-400.webp' }
      ],
      alt: 'Physical service experience dimension',
      loading: 'lazy',
      decoding: 'async'
    },
    customer_service: {
      title: 'Customer Service',
      baseUrl: '/assets/web/dimensions/customer-service',
      srcset: [
        { width: 800, src: 'customer-service-800.webp' },
        { width: 600, src: 'customer-service-600.webp' },
        { width: 400, src: 'customer-service-400.webp' }
      ],
      alt: 'Customer service dimension',
      loading: 'lazy',
      decoding: 'async'
    },
    speed: {
      title: 'Speed & Efficiency',
      baseUrl: '/assets/web/dimensions/speed-efficiency',
      srcset: [
        { width: 800, src: 'speed-efficiency-800.webp' },
        { width: 600, src: 'speed-efficiency-600.webp' },
        { width: 400, src: 'speed-efficiency-400.webp' }
      ],
      alt: 'Speed and efficiency dimension',
      loading: 'lazy',
      decoding: 'async'
    },
    value: {
      title: 'Product / Service Value',
      baseUrl: '/assets/web/dimensions/product-value',
      srcset: [
        { width: 800, src: 'product-value-800.webp' },
        { width: 600, src: 'product-value-600.webp' },
        { width: 400, src: 'product-value-400.webp' }
      ],
      alt: 'Product and service value dimension',
      loading: 'lazy',
      decoding: 'async'
    },
    trust: {
      title: 'Trust & Security',
      baseUrl: '/assets/web/dimensions/trust-security',
      srcset: [
        { width: 800, src: 'trust-security-800.webp' },
        { width: 600, src: 'trust-security-600.webp' },
        { width: 400, src: 'trust-security-400.webp' }
      ],
      alt: 'Trust and security dimension',
      loading: 'lazy',
      decoding: 'async'
    },
    transparency: {
      title: 'Transparency',
      baseUrl: '/assets/web/dimensions/transparency',
      srcset: [
        { width: 800, src: 'transparency-800.webp' },
        { width: 600, src: 'transparency-600.webp' },
        { width: 400, src: 'transparency-400.webp' }
      ],
      alt: 'Transparency dimension',
      loading: 'lazy',
      decoding: 'async'
    },
    resolution: {
      title: 'Problem Resolution',
      baseUrl: '/assets/web/dimensions/problem-resolution',
      srcset: [
        { width: 800, src: 'problem-resolution-800.webp' },
        { width: 600, src: 'problem-resolution-600.webp' },
        { width: 400, src: 'problem-resolution-400.webp' }
      ],
      alt: 'Problem resolution dimension',
      loading: 'lazy',
      decoding: 'async'
    },
    overall: {
      title: 'Overall Experience',
      baseUrl: '/assets/web/dimensions/overall-experience',
      srcset: [
        { width: 800, src: 'overall-experience-800.webp' },
        { width: 600, src: 'overall-experience-600.webp' },
        { width: 400, src: 'overall-experience-400.webp' }
      ],
      alt: 'Overall customer experience',
      loading: 'lazy',
      decoding: 'async'
    }
  },

  sectors: {
    banking: {
      title: 'Banking Customer Experience',
      baseUrl: '/assets/web/sectors/banking',
      srcset: [
        { width: 800, src: 'banking-800.webp' },
        { width: 600, src: 'banking-600.webp' },
        { width: 400, src: 'banking-400.webp' }
      ],
      alt: 'Banking sector CX experience',
      loading: 'lazy',
      decoding: 'async'
    },
    utilities: {
      title: 'Utilities',
      baseUrl: '/assets/web/sectors/utilities',
      srcset: [
        { width: 800, src: 'utilities-800.webp' },
        { width: 600, src: 'utilities-600.webp' },
        { width: 400, src: 'utilities-400.webp' }
      ],
      alt: 'Utilities sector CX experience',
      loading: 'lazy',
      decoding: 'async'
    },
    education: {
      title: 'Education',
      baseUrl: '/assets/web/sectors/education',
      srcset: [
        { width: 800, src: 'education-800.webp' },
        { width: 600, src: 'education-600.webp' },
        { width: 400, src: 'education-400.webp' }
      ],
      alt: 'Education sector CX experience',
      loading: 'lazy',
      decoding: 'async'
    }
  }
};

/**
 * Get responsive image HTML (picture element)
 */
function getResponsiveImageHtml(imageKey, category = 'dimensions') {
  const image = IMAGES[category]?.[imageKey];
  if (!image) return '';

  const { baseUrl, srcset, alt, loading, decoding } = image;

  let html = `<picture>`;

  // WebP sources
  srcset.forEach((variant, i) => {
    const media = i === 0 ? '' : i === 1 ? ' media="(max-width: 768px)"' : ' media="(max-width: 480px)"';
    html += `<source srcset="${baseUrl}-${variant.width}.webp"${media} type="image/webp">`;
  });

  // Fallback
  html += `<img src="${baseUrl}-800.webp" alt="${alt}" loading="${loading}" decoding="${decoding}">`;
  html += `</picture>`;

  return html;
}

/**
 * Get simple image element (for non-responsive)
 */
function getImageElement(imageKey, category = 'dimensions', size = 800) {
  const image = IMAGES[category]?.[imageKey];
  if (!image) return '';

  const src = `${image.baseUrl}-${size}.webp`;
  const { alt, loading, decoding } = image;

  return `<img src="${src}" alt="${alt}" loading="${loading}" decoding="${decoding}">`;
}
