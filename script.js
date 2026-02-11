
document.addEventListener('DOMContentLoaded', () => {

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

    //animating the title
    function animateTitle(id = 'animatedTitle', speed = 35) {
        const el = document.getElementById(id);
        if (!el) return;
        const fullText = el.dataset.text || el.textContent.trim();
        el.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            el.textContent = fullText.slice(0, ++i);
            if (i >= fullText.length) clearInterval(timer);
        }, speed);
    }

    animateTitle('animatedTitle', 40);

});


// Lazy loading images 
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
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
