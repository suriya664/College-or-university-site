// ===== HOME PAGE SPECIFIC ANIMATIONS =====

// Letter-by-letter hero title animation
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent.trim();
        animateText(heroTitle, titleText, 80);
    }
});

// Hero section parallax effect
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const heroBackground = heroSection.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

