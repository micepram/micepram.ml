document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initHeroTransition();
    initScrollAnimations();
    initStatCounters();
    initTimelineProgress();
});

function initHeroTransition() {
    const hero = document.getElementById('hero');
    const header = document.getElementById('siteHeader');
    const aboutSection = document.getElementById('about');
    
    if (!hero || !header || !aboutSection) return;
    
    // Always show the hero animation on page load/refresh
    // Clear any previous state
    hero.classList.remove('collapsed');
    header.classList.remove('visible');
    
    // Wait for the name animation to complete (all letters reveal by ~1.1s)
    // Then wait a bit more to let user appreciate it (~3.5s total)
    // Then trigger the transition
    const transitionDelay = 3500; // 3.5 seconds after page load
    
    setTimeout(() => {
        // Collapse the hero
        hero.classList.add('collapsed');
        
        // Show the header
        header.classList.add('visible');
        
        // Smooth scroll to top of page after a small delay
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400);
        
    }, transitionDelay);
}

function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let stars = [];
    let animationId;
    
    const STAR_COUNT = 300;
    const SCROLL_FACTOR = 0.3;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    function createStar() {
        const shouldTwinkle = Math.random() < 0.7;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.8 + 0.5,
            opacity: Math.random() * 0.6 + 0.3,
            twinkleSpeed: shouldTwinkle ? (Math.random() * 0.003 + 0.001) : 0,
            twinkleOffset: Math.random() * Math.PI * 2,
            twinkleAmount: shouldTwinkle ? (Math.random() * 0.6 + 0.2) : 0,
            layer: Math.random() < 0.3 ? 1 : Math.random() < 0.6 ? 2 : 3
        };
    }
    
    function initStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(createStar());
        }
    }
    
    function drawStar(star, time) {
        let alpha = star.opacity;
        if (star.twinkleSpeed > 0) {
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * star.twinkleAmount + (1 - star.twinkleAmount / 2);
            alpha = star.opacity * twinkle;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
        
        if (star.size > 1.2) {
            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.size * 3
            );
            gradient.addColorStop(0, `rgba(255, 184, 0, ${alpha * 0.35})`);
            gradient.addColorStop(1, 'rgba(255, 184, 0, 0)');
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    let time = 0;
    let lastScrollY = 0;
    
    function animate() {
        time += 16;
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        lastScrollY = scrollY;
        
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => {
            // Move stars based on scroll with layer-based parallax
            const parallaxSpeed = star.layer * SCROLL_FACTOR * 0.1;
            star.y -= scrollDelta * parallaxSpeed;
            
            // Wrap stars around
            if (star.y < -10) {
                star.y = height + 10;
                star.x = Math.random() * width;
            } else if (star.y > height + 10) {
                star.y = -10;
                star.x = Math.random() * width;
            }
            
            drawStar(star, time);
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    resize();
    initStars();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
        initStars();
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.section-label, .about-intro, .about-secondary, .stat-item, .timeline-item, .research-intro, .publication-row, .award-card, .project-card, .skill-category, .cert-card, .education-content, .contact-heading, .contact-text, .contact-email, .contact-social'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
            }
        });
    }, observerOptions);

    const statsContainer = document.querySelector('.stats-row');
    if (statsContainer) {
        observer.observe(statsContainer);
    }

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.dataset.target);
            const suffix = stat.dataset.suffix || '';
            const prefix = stat.dataset.prefix || '';
            const isDecimal = stat.dataset.decimal === 'true';
            const duration = 2000;
            const startTime = performance.now();

            function easeOutQuart(t) {
                return 1 - Math.pow(1 - t, 4);
            }

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const current = target * easedProgress;

                if (isDecimal) {
                    stat.textContent = prefix + current.toFixed(current < 10 ? 2 : 1) + suffix;
                } else {
                    stat.textContent = prefix + Math.floor(current) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    if (isDecimal) {
                        stat.textContent = prefix + target + suffix;
                    } else {
                        stat.textContent = prefix + target + suffix;
                    }
                }
            }

            requestAnimationFrame(update);
        });
    }
}

function initTimelineProgress() {
    const timeline = document.querySelector('.timeline');
    const progress = document.querySelector('.timeline-progress');
    
    if (!timeline || !progress) return;

    function updateProgress() {
        const timelineRect = timeline.getBoundingClientRect();
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const windowHeight = window.innerHeight;
        
        const scrolledIntoTimeline = windowHeight * 0.5 - timelineTop;
        const progressHeight = Math.max(0, Math.min(scrolledIntoTimeline, timelineHeight));
        const progressPercent = (progressHeight / timelineHeight) * 100;
        
        progress.style.height = `${progressPercent}%`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}
