// ===================================
// Cybersecurity Portfolio JavaScript
// Author: Darsh Turakhia
// ===================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animated counter for metrics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatMetric(target);
            clearInterval(timer);
        } else {
            element.textContent = formatMetric(Math.floor(current));
        }
    }, 16);
}

function formatMetric(value) {
    if (value >= 100000) {
        return '$' + (value / 1000).toFixed(0) + 'K+';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + 'K+';
    } else if (value == 18) {
        return value + '%';
    } else if (value == 2) {
        return value + '+';
    } else {
        return '24/7';
    }
}

// Trigger counter animation when metrics section is visible
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metrics = entry.target.querySelectorAll('.metric-value');
            const values = [2, 100000, 18, 24]; // Years, $, %, 24/7
            
            metrics.forEach((metric, index) => {
                setTimeout(() => {
                    animateCounter(metric, values[index], 1500);
                }, index * 200);
            });
            
            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const metricsSection = document.querySelector('.metrics');
if (metricsSection) {
    metricsObserver.observe(metricsSection);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function setActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let formspree handle the actual submission
        // This just adds visual feedback
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Re-enable after 2 seconds (formspree will redirect anyway)
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
}

// Add typing effect to hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on page load
// window.addEventListener('load', () => {
//     const subtitle = document.querySelector('.hero h2');
//     if (subtitle) {
//         const text = subtitle.textContent;
//         typeWriter(subtitle, text, 50);
//     }
// });

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'rgba(100, 255, 218, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(100, 255, 218, 0.1)';
    });
});

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.3)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Console easter egg for recruiters
console.log('%c👋 Hello, Recruiter!', 'color: #64FFDA; font-size: 24px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #8892B0; font-size: 14px;');
console.log('%cIf you\'re interested in my work, let\'s connect:', 'color: #E6F1FF; font-size: 12px;');
console.log('%c📧 darshturakhia@gmail.com', 'color: #64FFDA; font-size: 12px;');
console.log('%c💼 linkedin.com/in/darsh-turakhia', 'color: #64FFDA; font-size: 12px;');
console.log('%c', 'background: linear-gradient(90deg, #64FFDA, #00D9FF); padding: 10px;');

// Back to top button (optional - uncomment to enable)
// const backToTop = document.createElement('button');
// backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
// backToTop.className = 'back-to-top';
// backToTop.style.cssText = `
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     background: var(--accent);
//     color: var(--primary-dark);
//     border: none;
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     cursor: pointer;
//     display: none;
//     z-index: 999;
//     font-size: 20px;
//     transition: all 0.3s ease;
// `;

// document.body.appendChild(backToTop);

// window.addEventListener('scroll', () => {
//     if (window.scrollY > 500) {
//         backToTop.style.display = 'block';
//     } else {
//         backToTop.style.display = 'none';
//     }
// });

// backToTop.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });

// Log page load time (for performance monitoring)
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});