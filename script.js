/**
 * Responsive Landing Page - JavaScript Interactions
 * Handles smooth scrolling, accessibility features, and performance optimizations
 */

// ============================================
// 1. Accessibility Features
// ============================================

/**
 * Skip to main content link functionality
 * Allows keyboard users to skip navigation and go directly to content
 */
document.addEventListener('DOMContentLoaded', () => {
    // Enable focus management
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Lazy loading images for performance
    initializeLazyLoading();

    

    
});

// ============================================
// 2. Lazy Loading Images
// ============================================

/**
 * Initialize lazy loading for images
 * Improves page performance by loading images only when they're visible
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Image will load naturally with loading="lazy" attribute
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.removeAttribute('loading');
        });
    }
}


// handling form 
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const successEl = document.getElementById('formSuccess');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const name = data.get('name')?.toString().trim();
        const email = data.get('email')?.toString().trim();
        const service = data.get('service')?.toString().trim();
        const message = data.get('message')?.toString().trim();

        console.log('Form Data:', { name, email, service, message });

        // Simulate submit 
        fetch('#', { method: 'POST' })
            .then(() => {
                if (successEl) {
                    successEl.classList.remove('hidden');
                    successEl.textContent = 'Thanks — your message has been sent.';
                } else {
                    alert('Thanks — your message has been sent.');
                }
                form.reset();
            })
            .catch(() => {
                alert('There was an error sending your message. Please try again later.');
            });
    });
});
