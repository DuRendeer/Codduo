// Mobile menu functions
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    menu.classList.toggle('active');
    btn.classList.toggle('active');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    menu.classList.remove('active');
    btn.classList.remove('active');
}

// Smooth scrolling for navigation links
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

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to elements when page loads
window.addEventListener('load', () => {
    document.querySelectorAll('.service-card, .team-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize rocket mouse follow after page loads
    initRocketInteraction();
});

// Rocket mouse follow and trail effect
function initRocketInteraction() {
    const spaceContainer = document.getElementById('spaceContainer');
    const rocket = document.getElementById('rocket');
    const canvas = document.getElementById('trailCanvas');
    
    if (!spaceContainer || !rocket || !canvas) {
        console.log('Elementos não encontrados!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    let trail = [];
    let isMouseInside = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Mobile movement variables
    let targetX = 0;
    let targetY = 0;
    let currentX = 20;
    let currentY = 120;
    let isMovingToTarget = false;

    // Set canvas size
    function resizeCanvas() {
        const rect = spaceContainer.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    spaceContainer.addEventListener('mouseenter', () => {
        if (!isMobile) {
            isMouseInside = true;
            console.log('Mouse entrou na área espacial!');
        }
    });

    spaceContainer.addEventListener('mouseleave', () => {
        if (!isMobile) {
            isMouseInside = false;
            trail = [];
            console.log('Mouse saiu da área espacial!');
        }
    });

    // Desktop: mouse move
    spaceContainer.addEventListener('mousemove', (e) => {
        if (isMobile || !isMouseInside) return;
        
        const rect = spaceContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Move rocket to mouse position instantly
        rocket.style.left = (mouseX - 20) + 'px';
        rocket.style.top = (mouseY - 20) + 'px';
        
        // Calculate rotation angle
        if (lastMouseX !== 0 || lastMouseY !== 0) {
            const deltaX = mouseX - lastMouseX;
            const deltaY = mouseY - lastMouseY;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            rocket.style.transform = `rotate(${angle + 90}deg)`;
        }
        
        // Add to trail
        trail.push({
            x: mouseX,
            y: mouseY,
            opacity: 1,
            size: 3
        });
        
        if (trail.length > 15) {
            trail.shift();
        }
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    });

    // Mobile: touch/click
    spaceContainer.addEventListener('click', (e) => {
        if (!isMobile) return;
        
        const rect = spaceContainer.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        isMovingToTarget = true;
        
        console.log(`Foguete indo para: ${targetX}, ${targetY}`);
    });

    // Mobile rocket movement animation
    function animateRocketMovement() {
        if (isMobile && isMovingToTarget) {
            // Calculate distance to target
            const deltaX = targetX - currentX;
            const deltaY = targetY - currentY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance > 5) {
                // Move gradually towards target
                const speed = 3;
                const moveX = (deltaX / distance) * speed;
                const moveY = (deltaY / distance) * speed;
                
                currentX += moveX;
                currentY += moveY;
                
                // Update rocket position
                rocket.style.left = (currentX - 20) + 'px';
                rocket.style.top = (currentY - 20) + 'px';
                
                // Calculate rotation angle
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                rocket.style.transform = `rotate(${angle + 90}deg)`;
                
                // Add to trail
                trail.push({
                    x: currentX,
                    y: currentY,
                    opacity: 1,
                    size: 3
                });
                
                if (trail.length > 20) {
                    trail.shift();
                }
            } else {
                isMovingToTarget = false;
                console.log('Foguete chegou ao destino!');
            }
        }
        
        requestAnimationFrame(animateRocketMovement);
    }
    
    // Start mobile animation loop
    animateRocketMovement();

    // Animation loop for trail
    function animateTrail() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw trail
        for (let i = 0; i < trail.length; i++) {
            const point = trail[i];
            
            // Fade out trail points
            point.opacity -= isMobile ? 0.03 : 0.05;
            point.size *= 0.95;
            
            if (point.opacity > 0) {
                // Create gradient for trail point
                const gradient = ctx.createRadialGradient(
                    point.x, point.y, 0,
                    point.x, point.y, point.size * 2
                );
                gradient.addColorStop(0, `rgba(139, 95, 191, ${point.opacity})`);
                gradient.addColorStop(0.5, `rgba(139, 95, 191, ${point.opacity * 0.5})`);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Remove faded points
        trail = trail.filter(point => point.opacity > 0);
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}
