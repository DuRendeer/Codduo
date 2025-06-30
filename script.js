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
    // const parallaxBg = document.querySelector('.parallax-bg'); Isn't working anymore
    const parallaxShapes = document.querySelector('.parallax-shapes');
    const bannerImage = document.querySelector('.banner-image');

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

    initSimpleSpaceInvaders();

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
        footer.style.textAlign = 'center';
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
            footer.style.textAlign = 'center';
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



function initSimpleSpaceInvaders() {
    const canvas = document.getElementById('gameCanvas');
    const container = document.getElementById('spaceInvadersContainer');
    
    if (!canvas || !container) {
        console.log('Canvas ou container não encontrado');
        return;
    }

    // Criar e adicionar o overlay de pause se não existir
    let pausedOverlay = document.getElementById('gamePaused');
    if (!pausedOverlay) {
        pausedOverlay = document.createElement('div');
        pausedOverlay.id = 'gamePaused';
        pausedOverlay.className = 'game-paused visible';
        pausedOverlay.innerHTML = 'CODDUO INVADERS';
        container.appendChild(pausedOverlay);
    } else {
        pausedOverlay.innerHTML = 'CODDUO INVADERS';
    }

    // Criar overlay de Game Over
    let gameOverOverlay = document.getElementById('gameOverOverlay');
    if (!gameOverOverlay) {
        gameOverOverlay = document.createElement('div');
        gameOverOverlay.id = 'gameOverOverlay';
        gameOverOverlay.className = 'game-overlay';
        gameOverOverlay.innerHTML = `
            <div class="game-message">GAME OVER</div>
            <div class="reload-button" id="gameOverReload">
                <div class="reload-text">RESTART</div>
            </div>
        `;
        container.appendChild(gameOverOverlay);
    }

    // Criar overlay de Victory
    let victoryOverlay = document.getElementById('victoryOverlay');
    if (!victoryOverlay) {
        victoryOverlay = document.createElement('div');
        victoryOverlay.id = 'victoryOverlay';
        victoryOverlay.className = 'game-overlay victory';
        victoryOverlay.innerHTML = `
            <div class="game-message">VICTORY!</div>
            <div class="reload-button" id="victoryReload">
                <div class="reload-text">PLAY AGAIN</div>
            </div>
        `;
        container.appendChild(victoryOverlay);
    }

    try {
        const game = new SimpleSpaceInvaders(canvas);
        console.log('Space Invaders iniciado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar Space Invaders:', error);
    }
}


class SimpleSpaceInvaders {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.container = document.getElementById('spaceInvadersContainer');
        this.pausedOverlay = document.getElementById('gamePaused');
        this.gameOverOverlay = document.getElementById('gameOverOverlay');
        this.victoryOverlay = document.getElementById('victoryOverlay');
        
        if (!this.ctx) {
            throw new Error('Não foi possível obter contexto 2D do canvas');
        }
        
        this.gameActive = false;
        this.gameState = 'paused'; // 'paused', 'playing', 'gameOver', 'victory'
        this.mouseX = canvas.width / 2;
        this.mouseY = canvas.height / 2;
        this.mouseInCanvas = false;
        this.isTouching = false;
        this.lastTouchMove = 0;
        
        // Player
        this.player = {
            x: canvas.width / 2,
            y: canvas.height - 60,
            targetX: canvas.width / 2,
            size: 24,
            hitbox: 20
        };
        
        // Bullets
        this.bullets = [];
        this.bulletSpeed = 6;
        this.lastShot = 0;
        this.shootCooldown = 300;
        
        // Invaders
        this.invaders = [];
        this.invaderSpeed = 0.3;
        this.invaderDirection = 1;
        
        // Animation
        this.animationFrame = 0;
        
        this.setupControls();
        this.setupReloadButtons();
        this.resizeCanvas();
        this.createInvaders();
        this.gameLoop();
    }
    
    setupReloadButtons() {
        // Game Over reload button
        const gameOverReload = document.getElementById('gameOverReload');
        if (gameOverReload) {
            gameOverReload.addEventListener('click', () => this.restartGame());
            gameOverReload.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.restartGame();
            });
        }

        // Victory reload button
        const victoryReload = document.getElementById('victoryReload');
        if (victoryReload) {
            victoryReload.addEventListener('click', () => this.restartGame());
            victoryReload.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.restartGame();
            });
        }
    }
    
    restartGame() {
        // Reset game state
        this.gameState = 'paused';
        this.gameActive = false;
        this.bullets = [];
        this.invaderSpeed = 0.3;
        this.invaderDirection = 1;
        
        // Reset player position
        this.player.x = this.canvas.width / 2;
        this.player.targetX = this.canvas.width / 2;
        
        // Hide overlays
        this.gameOverOverlay.classList.remove('visible');
        this.victoryOverlay.classList.remove('visible');
        this.pausedOverlay.classList.add('visible');
        
        // Reset invaders
        this.createInvaders();
        
        // Reset touch state
        this.isTouching = false;
        this.mouseInCanvas = false;
    }
    
    showGameOver() {
        this.gameState = 'gameOver';
        this.gameActive = false;
        this.pausedOverlay.classList.remove('visible');
        this.gameOverOverlay.classList.add('visible');
    }
    
    showVictory() {
        this.gameState = 'victory';
        this.gameActive = false;
        this.pausedOverlay.classList.remove('visible');
        this.victoryOverlay.classList.add('visible');
    }
    
    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = Math.max(rect.width - 4, 400);
        this.canvas.height = Math.max(rect.height - 4, 400);
        
        // Reset player position
        this.player.x = this.canvas.width / 2;
        this.player.y = this.canvas.height - 60;
        this.player.targetX = this.canvas.width / 2;
    }
    
    setupControls() {
        // Desktop: Mouse enter/leave for game activation
        this.container.addEventListener('mouseenter', () => {
            if (!this.isTouching && this.gameState === 'paused') {
                this.mouseInCanvas = true;
                this.gameActive = true;
                this.gameState = 'playing';
                if (this.pausedOverlay) {
                    this.pausedOverlay.classList.remove('visible');
                }
            }
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (!this.isTouching && this.gameState === 'playing') {
                this.mouseInCanvas = false;
                this.gameActive = false;
                this.gameState = 'paused';
                if (this.pausedOverlay) {
                    this.pausedOverlay.classList.add('visible');
                }
                this.player.targetX = this.canvas.width / 2;
            }
        });
        
        // Desktop: Mouse movement
        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.gameActive || this.isTouching || this.gameState !== 'playing') return;
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            this.player.targetX = this.mouseX;
        });
        
        // Desktop: Mouse click to shoot
        this.canvas.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.gameActive && !this.isTouching && this.gameState === 'playing') {
                this.shoot();
            }
        });
        
        // Mobile: Touch controls
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.gameState !== 'paused') return;
            
            this.isTouching = true;
            this.mouseInCanvas = true;
            this.gameActive = true;
            this.gameState = 'playing';
            
            if (this.pausedOverlay) {
                this.pausedOverlay.classList.remove('visible');
            }
            
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouseX = touch.clientX - rect.left;
            this.mouseY = touch.clientY - rect.top;
            this.player.targetX = this.mouseX;
            
            this.shoot();
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!this.gameActive || !this.isTouching || this.gameState !== 'playing') return;
            
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouseX = touch.clientX - rect.left;
            this.mouseY = touch.clientY - rect.top;
            this.player.targetX = this.mouseX;
            this.lastTouchMove = Date.now();
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.gameState !== 'playing') return;
            
            const timeSinceMove = Date.now() - this.lastTouchMove;
            if (timeSinceMove > 100) {
                this.shoot();
            }
        });
        
        // Mobile: Touch fora do canvas para pausar
        document.addEventListener('touchstart', (e) => {
            if (!this.canvas.contains(e.target) && 
                !this.container.contains(e.target) && 
                this.gameState === 'playing') {
                
                if (this.isTouching) {
                    this.isTouching = false;
                    this.mouseInCanvas = false;
                    this.gameActive = false;
                    this.gameState = 'paused';
                    if (this.pausedOverlay) {
                        this.pausedOverlay.classList.add('visible');
                    }
                    this.player.targetX = this.canvas.width / 2;
                }
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createInvaders();
        });
    }
    
    createInvaders() {
        this.invaders = [];
        const cols = Math.floor(this.canvas.width / 60);
        const rows = 4;
        const startX = (this.canvas.width - (cols * 50)) / 2;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.invaders.push({
                    x: startX + col * 50,
                    y: row * 40 + 40,
                    size: 16,
                    alive: true,
                    type: row % 3
                });
            }
        }
    }
    
    shoot() {
        const now = Date.now();
        if (now - this.lastShot < this.shootCooldown) return;
        
        this.bullets.push({
            x: this.player.x,
            y: this.player.y - 15,
            size: 3
        });
        
        this.lastShot = now;
    }
    
    checkCollision(obj1, obj2, size1, size2) {
        const distance = Math.sqrt(
            Math.pow(obj1.x - obj2.x, 2) + 
            Math.pow(obj1.y - obj2.y, 2)
        );
        return distance < (size1 + size2) / 2;
    }
    
    update() {
        this.animationFrame++;
        
        // SEMPRE move player smoothly (mesmo parado)
        const diff = this.player.targetX - this.player.x;
        this.player.x += diff * 0.08;
        
        // Keep player in bounds
        this.player.x = Math.max(this.player.size, Math.min(this.canvas.width - this.player.size, this.player.x));
        
        // Only update game logic if playing
        if (this.gameState !== 'playing') return;
        
        // Move bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.y -= this.bulletSpeed;
            return bullet.y > 0;
        });
        
        // Move invaders
        let moveDown = false;
        let allInvadersDead = true;
        
        for (let invader of this.invaders) {
            if (!invader.alive) continue;
            
            allInvadersDead = false;
            invader.x += this.invaderSpeed * this.invaderDirection;
            
            if (invader.x <= 20 || invader.x >= this.canvas.width - 20) {
                moveDown = true;
            }
            
            // Game Over: Invader reached bottom
            if (invader.y >= this.canvas.height - 80) {
                this.showGameOver();
                return;
            }
            
            // Game Over: Invader hit player
            if (this.checkCollision(invader, this.player, invader.size, this.player.hitbox)) {
                this.showGameOver();
                return;
            }
        }
        
        if (moveDown) {
            this.invaderDirection *= -1;
            for (let invader of this.invaders) {
                if (invader.alive) {
                    invader.y += 20;
                }
            }
        }
        
        // Bullet-invader collision
        this.bullets = this.bullets.filter(bullet => {
            for (let invader of this.invaders) {
                if (invader.alive && this.checkCollision(bullet, invader, bullet.size, invader.size)) {
                    invader.alive = false;
                    return false;
                }
            }
            return true;
        });
        
        // Victory: All invaders destroyed
        if (allInvadersDead) {
            this.showVictory();
        }
    }
    
    drawPixelSprite(x, y, size, color, pattern) {
        this.ctx.fillStyle = color;
        const pixelSize = size / 8;
        
        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                if (pattern[row][col] === 1) {
                    this.ctx.fillRect(
                        x - (pattern[row].length * pixelSize) / 2 + col * pixelSize,
                        y - (pattern.length * pixelSize) / 2 + row * pixelSize,
                        pixelSize,
                        pixelSize
                    );
                }
            }
        }
    }
    
    draw() {
        // Clear canvas with space background
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // ESTRELAS SEMPRE SE MOVENDO
        this.ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 80; i++) {
            const x = (i * 47 + this.animationFrame * 0.3) % this.canvas.width;
            const y = (i * 31 + this.animationFrame * 0.15) % this.canvas.height;
            const twinkle = 0.3 + Math.sin(this.animationFrame * 0.05 + i) * 0.4;
            this.ctx.globalAlpha = Math.max(0, twinkle);
            this.ctx.fillRect(x, y, 1, 1);
        }
        this.ctx.globalAlpha = 1;
        
        // NAVE SEMPRE VISÍVEL NO CENTRO - COR ROXA
        const playerPattern = [
            [0,0,0,1,1,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,0],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [0,1,1,0,0,1,1,0],
            [0,0,1,0,0,1,0,0]
        ];
        this.drawPixelSprite(this.player.x, this.player.y, this.player.size, '#8b5fbf', playerPattern);
        
        // Only draw game elements if playing
        if (this.gameState !== 'playing') return;
        
        // Draw bullets
        this.ctx.fillStyle = '#ffff00';
        for (let bullet of this.bullets) {
            this.ctx.fillRect(bullet.x - bullet.size/2, bullet.y - bullet.size/2, bullet.size, bullet.size);
        }
        
        // Draw invaders - COR BRANCA
        const invaderPatterns = [
            [
                [0,0,1,0,0,0,1,0],
                [0,0,0,1,1,0,0,0],
                [0,0,1,1,1,1,0,0],
                [0,1,0,1,1,0,1,0],
                [1,1,1,1,1,1,1,1],
                [1,0,1,1,1,1,0,1],
                [1,0,1,0,0,1,0,1],
                [0,0,0,1,1,0,0,0]
            ],
            [
                [0,0,0,1,1,0,0,0],
                [0,0,1,1,1,1,0,0],
                [0,1,1,1,1,1,1,0],
                [1,1,0,1,1,0,1,1],
                [1,1,1,1,1,1,1,1],
                [0,0,1,0,0,1,0,0],
                [0,1,0,1,1,0,1,0],
                [1,0,1,0,0,1,0,1]
            ],
            [
                [0,0,0,0,0,0,0,0],
                [0,0,1,1,1,1,0,0],
                [0,1,1,1,1,1,1,0],
                [1,1,0,1,1,0,1,1],
                [1,1,1,1,1,1,1,1],
                [0,1,0,1,1,0,1,0],
                [1,0,0,0,0,0,0,1],
                [0,1,0,0,0,0,1,0]
            ]
        ];
        
        for (let invader of this.invaders) {
            if (invader.alive) {
                const animOffset = Math.sin(this.animationFrame * 0.1 + invader.x * 0.1) > 0 ? 0 : 1;
                let pattern = invaderPatterns[invader.type];
                if (animOffset === 1) {
                    pattern = pattern.map(row => [...row].reverse());
                }
                
                this.drawPixelSprite(
                    invader.x, 
                    invader.y, 
                    invader.size, 
                    '#ffffff',
                    pattern
                );
            }
        }
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
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
