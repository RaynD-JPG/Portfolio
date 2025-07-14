const CONFIG = {
    // Typing animation texts
    typingTexts: [
        "Initializing system...",
        "Loading neural networks...",
        "Scanning for vulnerabilities...",
        "Ready for deployment.",
        "Welcome to the future."
    ],
    
    // Typing speed settings
    typingSpeed: 100,     
    deleteSpeed: 50,     
    pauseTime: 2000,    
    
    // Project card animation settings
    cardAnimationDelay: 200, 
    
    // Glitch effect settings
    glitchIntensity: 2, 
    glitchFrequency: 0.1 
};

// Typing Animation
class TypingAnimation {
    constructor(element, texts, config) {
        this.element = element;
        this.texts = texts;
        this.config = config;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Adding characters
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        // Determine typing speed
        let typeSpeed = this.isDeleting ? this.config.deleteSpeed : this.config.typingSpeed;
        
        // Check if word is complete
        if (!this.isDeleting && this.charIndex === currentText.length) {
            // Pause before deleting
            typeSpeed = this.config.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Move to next text
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Project Card Animations
class ProjectAnimations {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.initIntersectionObserver();
        this.addHoverEffects();
    }
    
    initIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * CONFIG.cardAnimationDelay);
                }
            });
        }, options);
        
        this.cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
        });
    }
    
    addHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addParticleEffect(card);
            });
        });
    }
    
    addParticleEffect(card) {
        // Create floating particles on hover
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: float 2s ease-out forwards;
            `;
            
            const rect = card.getBoundingClientRect();
            particle.style.left = Math.random() * rect.width + 'px';
            particle.style.top = Math.random() * rect.height + 'px';
            
            card.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    }
}

// Enhanced Glitch Effect
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.isGlitching = false;
        this.initGlitch();
    }
    
    initGlitch() {
        // Random glitch intervals
        setInterval(() => {
            if (Math.random() < CONFIG.glitchFrequency && !this.isGlitching) {
                this.startGlitch();
            }
        }, 100);
    }
    
    startGlitch() {
        this.isGlitching = true;
        let iterations = 0;
        const maxIterations = 10;
        
        const glitchInterval = setInterval(() => {
            let glitchedText = '';
            
            for (let i = 0; i < this.originalText.length; i++) {
                if (Math.random() < 0.3) {
                    glitchedText += this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
                } else {
                    glitchedText += this.originalText[i];
                }
            }
            
            this.element.textContent = glitchedText;
            iterations++;
            
            if (iterations >= maxIterations) {
                clearInterval(glitchInterval);
                this.element.textContent = this.originalText;
                this.isGlitching = false;
            }
        }, 50);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.initScrollIndicator();
        this.initSmoothScrolling();
    }
    
    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                document.querySelector('.projects').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }
    
    initSmoothScrolling() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Cyber Grid Animation
class CyberGrid {
    constructor() {
        this.grid = document.querySelector('.cyber-grid');
        this.initParallax();
    }
    
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (this.grid) {
                this.grid.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }
}

// Contact Animation
class ContactAnimations {
    constructor() {
        this.contactItems = document.querySelectorAll('.contact-item');
        this.initContactAnimations();
    }
    
    initContactAnimations() {
        this.contactItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Copy to clipboard functionality
                const value = item.querySelector('.contact-value').textContent;
                navigator.clipboard.writeText(value).then(() => {
                    this.showCopyFeedback(item);
                });
            });
        });
    }
    
    showCopyFeedback(item) {
        const feedback = document.createElement('div');
        feedback.textContent = 'COPIED!';
        feedback.style.cssText = `
            position: absolute;
            top: -30px;
            right: 10px;
            background: var(--primary-green);
            color: var(--bg-dark);
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 0.8rem;
            font-weight: bold;
            z-index: 1000;
            animation: fadeInOut 2s ease-out forwards;
        `;
        
        item.style.position = 'relative';
        item.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥 Cyberpunk Portfolio Loading...');
    
    // Initialize typing animation
    const typingElement = document.getElementById('typing-output');
    if (typingElement) {
        new TypingAnimation(typingElement, CONFIG.typingTexts, CONFIG);
    }
    
    // Initialize glitch effect
    const glitchElement = document.querySelector('.glitch-text');
    if (glitchElement) {
        new GlitchEffect(glitchElement);
    }
    
    // Initialize project animations
    new ProjectAnimations();
    
    // Initialize smooth scrolling
    new SmoothScroll();
    
    // Initialize cyber grid
    new CyberGrid();
    
    // Initialize contact animations
    new ContactAnimations();
    
    console.log('✅ All systems operational');
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TypingAnimation,
        ProjectAnimations,
        GlitchEffect,
        SmoothScroll,
        CyberGrid,
        ContactAnimations
    };
}