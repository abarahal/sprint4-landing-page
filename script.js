// Slider Plugin
class SimpleSlider {
    constructor(sliderElement) {
        this.slider = sliderElement instanceof HTMLElement ? sliderElement : document.querySelector(sliderElement);
        if (!this.slider) {
            console.error('SimpleSlider: slider element not found');
            return;
        }

        this.track = this.slider.querySelector('.track');
        if (!this.track) {
            console.error('SimpleSlider: track element not found');
            return;
        }

        // Look for controls in parent container
        this.sliderContainer = this.slider.parentElement;
        this.prevBtn = this.sliderContainer?.querySelector('[data-slider-prev]');
        this.nextBtn = this.sliderContainer?.querySelector('[data-slider-next]');
        this.slides = this.slider.querySelectorAll('.slide-item');

        this.currentIndex = 0;
        this.slideWidth = 0;
        this.gap = 24; // 1.5rem in pixels

        this.init();
    }

    init() {
        if (this.slides.length === 0) {
            console.warn('SimpleSlider: No slides found');
            return;
        }

        // Calculate slide width on load and resize
        this.calculateWidth();
        window.addEventListener('resize', () => this.calculateWidth());

        // Attach button listeners if they exist
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
    }

    calculateWidth() {
        this.slideWidth = this.slides[0].offsetWidth;
    }

    updatePosition() {
        const offset = -(this.currentIndex * (this.slideWidth + this.gap));
        this.track.style.transform = `translateX(${offset}px)`;
        this.track.style.transition = 'transform 0.3s ease-out';
    }

    next() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
            this.updatePosition();
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updatePosition();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Handle anchor links for internal navigation only
    document.querySelectorAll('a.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default for valid section anchors
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Initialize first slider only
    const sliderElement = document.querySelector('.slider');
    if (sliderElement) {
        new SimpleSlider(sliderElement);
    }

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
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const serviceError = document.getElementById('serviceError');
    const messageError = document.getElementById('messageError');

    // Validation functions
    function validateName(value) {
        if (!value) {
            return 'Name is required';
        }
        if (value.length < 2) {
            return 'Name must be at least 2 characters';
        }
        return null;
    }

    function validateEmail(value) {
        if (!value) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return null;
    }

    function validateService(value) {
        if (!value) {
            return 'Please select a service';
        }
        return null;
    }

    function validateMessage(value) {
        if (!value) {
            return 'Message is required';
        }
        if (value.length < 10) {
            return 'Message must be at least 10 characters';
        }
        return null;
    }

    // Clear error function
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }

    // Show error function
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.classList.add('show');
        errorElement.textContent = message;
    }

    // Real-time validation
    nameInput.addEventListener('blur', () => {
        const error = validateName(nameInput.value.trim());
        if (error) {
            showError(nameInput, nameError, error);
        } else {
            clearError(nameInput, nameError);
        }
    });

    emailInput.addEventListener('blur', () => {
        const error = validateEmail(emailInput.value.trim());
        if (error) {
            showError(emailInput, emailError, error);
        } else {
            clearError(emailInput, emailError);
        }
    });

    serviceInput.addEventListener('change', () => {
        const error = validateService(serviceInput.value.trim());
        if (error) {
            showError(serviceInput, serviceError, error);
        } else {
            clearError(serviceInput, serviceError);
        }
    });

    messageInput.addEventListener('blur', () => {
        const error = validateMessage(messageInput.value.trim());
        if (error) {
            showError(messageInput, messageError, error);
        } else {
            clearError(messageInput, messageError);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const serviceValue = serviceInput.value.trim();
        const messageValue = messageInput.value.trim();

        const nameErr = validateName(nameValue);
        const emailErr = validateEmail(emailValue);
        const serviceErr = validateService(serviceValue);
        const messageErr = validateMessage(messageValue);

        // Show errors if any
        if (nameErr) showError(nameInput, nameError, nameErr);
        else clearError(nameInput, nameError);

        if (emailErr) showError(emailInput, emailError, emailErr);
        else clearError(emailInput, emailError);

        if (serviceErr) showError(serviceInput, serviceError, serviceErr);
        else clearError(serviceInput, serviceError);

        if (messageErr) showError(messageInput, messageError, messageErr);
        else clearError(messageInput, messageError);

        // If any error, stop submission
        if (nameErr || emailErr || serviceErr || messageErr) {
            return;
        }

        console.log('Form Data Valid:', { nameValue, emailValue, serviceValue, messageValue });

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
                // Clear all error states
                clearError(nameInput, nameError);
                clearError(emailInput, emailError);
                clearError(serviceInput, serviceError);
                clearError(messageInput, messageError);
            })
            .catch(() => {
                alert('There was an error sending your message. Please try again later.');
            });
    });
});
