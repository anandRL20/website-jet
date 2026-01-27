// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initCounterAnimation();
});

/**
 * Create animated particles in the hero section
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    // Create 30 particles with random properties
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay for staggered effect
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Random animation duration between 10-20 seconds
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Set up Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements that need scroll animations
    const elementsToObserve = document.querySelectorAll(
        '.stat-item, .service-card, .feature-item, .section-header'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
}

/**
 * Handle navbar scroll effects
 */
function initNavbarScroll() {
    let lastScroll = 0;
    let ticking = false;
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        lastScroll = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Enable smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignore empty anchors
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

/**
 * Animate counter in stats section
 */
function initCounterAnimation() {
    const counter = document.querySelector('.counter');
    
    if (!counter) return;
    
    let count = 0;
    const target = 1000;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let hasAnimated = false;

    function updateCounter() {
        count += increment;
        if (count < target) {
            counter.textContent = Math.floor(count).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    }

    // Start counter when element is visible
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                setTimeout(updateCounter, 500);
            }
        });
    }, observerOptions);

    observer.observe(counter);
}

/**
 * Utility: Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initParticles,
        initScrollAnimations,
        initNavbarScroll,
        initSmoothScroll,
        initCounterAnimation,
        debounce,
        throttle
    };
}
