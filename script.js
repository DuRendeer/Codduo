// Loading Screen

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('fade-out');
    }, 1000);
});

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

// Enhanced Parallax and Scroll Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const rateShapes = scrolled * -0.3;
    const rateBanner = scrolled * -0.2;

    // Header background on scroll
    const header = document.querySelector('header');
    if (scrolled > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }

    // Parallax layers
    const parallaxBg = document.querySelector('.parallax-bg');
    const parallaxShapes = document.querySelector('.parallax-shapes');
    const bannerImage = document.querySelector('.banner-image');

    if (parallaxBg) {
        parallaxBg.style.transform = `translate3d(0, ${rate}px, 0)`;
    }

    if (parallaxShapes) {
        parallaxShapes.style.transform = `translate3d(0, ${rateShapes}px, 0) rotate(${scrolled * 0.05}deg)`;
    }

    if (bannerImage) {
        bannerImage.style.transform = `translate3d(0, ${rateBanner}px, 0) scale(${1 + scrolled * 0.0002})`;
    }
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Special handling for staggered animations
            if (entry.target.classList.contains('service-card')) {
                const cards = entry.target.parentElement.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transitionDelay = `${index * 0.2}s`;
                        card.classList.add('animate');
                    }, index * 100);
                });
            }

            if (entry.target.classList.contains('team-card')) {
                const cards = entry.target.parentElement.querySelectorAll('.team-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transitionDelay = `${index * 0.3}s`;
                        card.classList.add('animate');
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

// Text Animation Observer
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Animate child elements with stagger
            const children = entry.target.querySelectorAll('h2, p');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate');
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Observe section titles
    document.querySelectorAll('.section-title').forEach(el => {
        observer.observe(el);
    });

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(el => {
        observer.observe(el);
    });

    // Observe team cards
    document.querySelectorAll('.team-card').forEach(el => {
        observer.observe(el);
    });

    // Observe text sections
    document.querySelectorAll('.about-text, .about-visual, .contact-content').forEach(el => {
        textObserver.observe(el);
    });

    // Observe footer
    const footer = document.querySelector('footer');
    if (footer) {
        observer.observe(footer);
    }

    // Initialize rocket interaction after page loads
    initRocketInteraction();

    // Add scroll-triggered micro animations
    initMicroAnimations();
});

// Micro animations for enhanced interactivity
function initMicroAnimations() {
    // Floating shapes random movement
    document.querySelectorAll('.floating-shape').forEach((shape, index) => {
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            shape.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });

    // Particles enhanced trail
    document.querySelectorAll('.hero-particle').forEach(particle => {
        particle.addEventListener('animationiteration', () => {
            const randomDelay = Math.random() * 2;
            particle.style.animationDelay = `${randomDelay}s`;
        });
    });

    // Service cards hover ripple effect
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(139, 95, 191, 0.1)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '200px';
            ripple.style.height = '200px';
            ripple.style.marginLeft = '-100px';
            ripple.style.marginTop = '-100px';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
    document.head.appendChild(style);
}

// Enhanced rocket interaction (mantido original mas com melhorias)
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
    let currentX = 30;
    let currentY = 150;
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

        // Move rocket to mouse position with smooth transition
        rocket.style.left = (mouseX - 20) + 'px';
        rocket.style.top = (mouseY - 20) + 'px';

        // Calculate rotation angle with enhanced smoothness
        if (lastMouseX !== 0 || lastMouseY !== 0) {
            const deltaX = mouseX - lastMouseX;
            const deltaY = mouseY - lastMouseY;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            rocket.style.transform = `rotate(${angle + 90}deg) scale(1.1)`;
        }

        // Enhanced trail with multiple colors
        trail.push({
            x: mouseX,
            y: mouseY,
            opacity: 1,
            size: 4,
            hue: (Date.now() / 10) % 360
        });

        if (trail.length > 20) {
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
            const deltaX = targetX - currentX;
            const deltaY = targetY - currentY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance > 5) {
                const speed = 4;
                const moveX = (deltaX / distance) * speed;
                const moveY = (deltaY / distance) * speed;

                currentX += moveX;
                currentY += moveY;

                rocket.style.left = (currentX - 20) + 'px';
                rocket.style.top = (currentY - 20) + 'px';

                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                rocket.style.transform = `rotate(${angle + 90}deg) scale(1.1)`;

                // Enhanced mobile trail
                trail.push({
                    x: currentX,
                    y: currentY,
                    opacity: 1,
                    size: 4,
                    hue: (Date.now() / 10) % 360
                });

                if (trail.length > 25) {
                    trail.shift();
                }
            } else {
                isMovingToTarget = false;
                rocket.style.transform = `rotate(0deg) scale(1)`;
                console.log('Foguete chegou ao destino!');
            }
        }

        requestAnimationFrame(animateRocketMovement);
    }

    animateRocketMovement();

    // Enhanced trail animation
    function animateTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < trail.length; i++) {
            const point = trail[i];

            point.opacity -= isMobile ? 0.03 : 0.04;
            point.size *= 0.96;

            if (point.opacity > 0) {
                // Create colorful gradient trail
                const gradient = ctx.createRadialGradient(
                    point.x, point.y, 0,
                    point.x, point.y, point.size * 3
                );

                const color = `hsl(${280 + Math.sin(point.hue) * 30}, 70%, 60%)`;
                gradient.addColorStop(0, `${color.replace('rgb', 'rgba').replace(')', `, ${point.opacity})`)})`);
                gradient.addColorStop(0.5, `rgba(139, 95, 191, ${point.opacity * 0.6})`);
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Add sparkle effect
                if (Math.random() > 0.7) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${point.opacity * 0.8})`;
                    ctx.beginPath();
                    ctx.arc(point.x + Math.random() * 10 - 5, point.y + Math.random() * 10 - 5, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        trail = trail.filter(point => point.opacity > 0);
        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// Enhanced scroll-based animations
let ticking = false;
function updateAnimations() {
    const scrolled = window.pageYOffset;

    // Header glow effect based on scroll
    const header = document.querySelector('header');
    const glowIntensity = Math.min(scrolled / 500, 1);
    header.style.boxShadow = `0 2px 20px rgba(139, 95, 191, ${glowIntensity * 0.3})`;

    // Parallax particles opacity based on scroll
    const particles = document.querySelectorAll('.hero-particle');
    particles.forEach(particle => {
        const opacity = Math.max(1 - scrolled / 800, 0);
        particle.style.opacity = opacity;
    });

    // Ensure footer is visible
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'block';
        footer.style.visibility = 'visible';
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
});

// Force footer visibility on load
window.addEventListener('load', () => {
    setTimeout(() => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.display = 'block';
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
        }
    }, 100);
});

// Add dynamic favicon based on scroll
function updateFavicon() {
    const scrolled = window.pageYOffset;
    const isScrolled = scrolled > 100;

    // You can add favicon changes here if needed
    document.title = isScrolled ? 'Codduo • Scroll Active' : 'Codduo - Soluções Digitais';
}

window.addEventListener('scroll', updateFavicon);

// Preload images for better performance
function preloadImages() {
    const imageUrls = ['banner.jpg', 'logo.png', 'du.png', 'leo.png'];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

preloadImages();


// Enhanced Reviews Carousel Controls
document.addEventListener('DOMContentLoaded', function () {
    const reviewsTrack = document.querySelector('.reviews-track');

    if (reviewsTrack) {
        // Pause animation on hover for individual cards
        const reviewCards = document.querySelectorAll('.review-card');

        reviewCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                reviewsTrack.style.animationPlayState = 'paused';
            });

            card.addEventListener('mouseleave', () => {
                reviewsTrack.style.animationPlayState = 'running';
            });
        });

        // Add touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        reviewsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            reviewsTrack.style.animationPlayState = 'paused';
        });

        reviewsTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            setTimeout(() => {
                reviewsTrack.style.animationPlayState = 'running';
            }, 1000);
        });
    }
});
