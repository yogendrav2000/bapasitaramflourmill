// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Active Nav Link Highlight =====
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY + 150;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add('active');
                link.style.color = navbar.classList.contains('scrolled') ? 'var(--primary)' : 'var(--golden-light)';
            } else {
                link.classList.remove('active');
                link.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Hero Particles (Floating Wheat Grains) =====
function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    const grains = ['🌾', '✦', '·', '✧', '🌾'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('span');
        particle.className = 'hero-particle';
        particle.textContent = grains[Math.floor(Math.random() * grains.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.fontSize = (Math.random() * 12 + 10) + 'px';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(particle);
    }
}

createParticles();

// ===== Scroll Reveal Animations =====
function initScrollReveal() {
    const reveals = document.querySelectorAll(
        '.about-grid, .about-content, .about-image, ' +
        '.product-card, .info-card, ' +
        '.nutrition-table-wrapper, .nh-card, ' +
        '.feature-card, ' +
        '.contact-card, .contact-map, ' +
        '.section-header'
    );
    
    reveals.forEach(el => el.classList.add('reveal'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered delay for grid items
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => observer.observe(el));
}

initScrollReveal();

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Nutrition Ring Animation =====
function animateNutritionRings() {
    const rings = document.querySelectorAll('.nh-ring circle:last-child');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target.querySelector('.nh-ring circle:last-child');
                if (circle) {
                    const dashOffset = circle.getAttribute('stroke-dashoffset');
                    circle.style.strokeDashoffset = '283';
                    circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
                    setTimeout(() => {
                        circle.style.strokeDashoffset = dashOffset;
                    }, 200);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.nh-card').forEach(card => {
        observer.observe(card);
    });
}

animateNutritionRings();

// ===== Counter Animation for Stats =====
function animateCounters() {
    const counters = document.querySelectorAll('.badge-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent);
                if (isNaN(target)) return;
                
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target + '%';
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current) + '%';
                    }
                }, 30);
                
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        
        const content = document.querySelector('.hero-content');
        if (content) {
            content.style.transform = `translateY(${scrolled * 0.15}px)`;
            content.style.opacity = 1 - (scrolled / heroHeight) * 0.6;
        }
    }
});

// ===== Preloader (optional quick fade) =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ===== Year in Footer =====
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
}
