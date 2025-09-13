// Modern Portfolio JavaScript with Advanced Interactions

class ModernPortfolio {
    constructor() {
        this.cursor = {
            dot: null,
            outline: null
        };
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.magneticElements = [];
        
        this.init();
    }
    
    init() {
        this.initCustomCursor();
        this.initMagneticButtons();
        this.initSmoothScrolling();
        this.initNavigation();
        this.initScrollAnimations();
        this.initParticles();
        this.initFormHandling();
        this.initMobileMenu();
        this.initScrollEffects();
        
        console.log('🚀 Modern Portfolio loaded successfully!');
    }
    
    // Custom Cursor System
    initCustomCursor() {
        this.cursor.dot = document.querySelector('[data-cursor-dot]');
        this.cursor.outline = document.querySelector('[data-cursor-outline]');
        
        if (!this.cursor.dot || !this.cursor.outline) return;
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Update cursor position
            this.cursor.dot.style.left = e.clientX + 'px';
            this.cursor.dot.style.top = e.clientY + 'px';
        });
        
        // Smooth cursor outline following
        let outlineX = 0;
        let outlineY = 0;
        
        const animateOutline = () => {
            outlineX += (this.mouse.x - outlineX) * 0.15;
            outlineY += (this.mouse.y - outlineY) * 0.15;
            
            this.cursor.outline.style.left = outlineX + 'px';
            this.cursor.outline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateOutline);
        };
        
        animateOutline();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .magnetic-btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursor.outline.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.outline.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursor.outline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            });
        });
    }
    
    // Magnetic Button Effects
    initMagneticButtons() {
        this.magneticElements = document.querySelectorAll('.magnetic-btn');
        
        this.magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                const translateX = x * strength;
                const translateY = y * strength;
                
                element.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // Smooth Scrolling
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Navigation Effects
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Hide/show navbar on scroll
            if (scrollY > lastScrollY && scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            // Add blur effect when scrolling
            if (scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.05)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
            }
            
            lastScrollY = scrollY;
        });
    }
    
    // Scroll Triggered Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger effect for grid items
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe sections and cards
        const animateElements = document.querySelectorAll(
            '.glass-card, .section-header, .skill-card, .project-card, .stat-item, .timeline-item, .blog-card, .testimonial-card, .education-card'
        );
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });
        
        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.gradient-orb');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Particle System
    initParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const opacity = Math.random() * 0.5 + 0.2;
            const duration = Math.random() * 3 + 2;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, transparent 70%);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: particleFloat ${duration}s ease-in-out infinite;
            `;
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, duration * 1000);
        };
        
        // Create particles periodically
        setInterval(createParticle, 300);
        
        // Add particle float animation to CSS if not exists
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes particleFloat {
                    0% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Form Handling
    initFormHandling() {
        const form = document.querySelector('.form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.style.opacity = '0.8';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Message Sent! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                }, 2000);
            }, 1000);
        });
        
        // Enhanced input focus effects
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.02)';
                input.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
                input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            });
        });
    }
    
    // Mobile Menu
    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
    
    // Advanced Scroll Effects
    initScrollEffects() {
        // Scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            z-index: 10000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
        
        // Reveal animations for text elements
        const textElements = document.querySelectorAll('.hero-title .title-line');
        textElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 1000 + (index * 200));
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
});

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading styles if not exists
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeOut 0.8s ease-out 0.5s forwards;
            }
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    visibility: hidden;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
