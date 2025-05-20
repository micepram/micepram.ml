document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
});

function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let stars = [];
    let animationId;
    
    const STAR_COUNT = 200;
    const STAR_SPEED = 0.02;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    function createStar() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2,
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
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
        
        if (star.size > 1.2) {
            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.size * 3
            );
            gradient.addColorStop(0, `rgba(244, 197, 66, ${alpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(244, 197, 66, 0)');
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    function updateStars(scrollY) {
        stars.forEach(star => {
            const parallaxFactor = star.layer * 0.1;
            star.y += scrollY * parallaxFactor * STAR_SPEED;
            
            if (star.y > height + 10) {
                star.y = -10;
                star.x = Math.random() * width;
            } else if (star.y < -10) {
                star.y = height + 10;
                star.x = Math.random() * width;
            }
        });
    }
    
    let lastScrollY = window.scrollY;
    let time = 0;
    
    function animate() {
        time += 16;
        
        ctx.clearRect(0, 0, width, height);
        
        const scrollDelta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        updateStars(scrollDelta);
        
        stars.forEach(star => drawStar(star, time));
        
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
