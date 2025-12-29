// ===== IRONGATE UNIVERSITY - MAIN JAVASCRIPT =====

// ===== CURSOR GLOW EFFECT (Desktop Only) =====
if (window.innerWidth > 1024) {
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn-neo, .neo-card, .nav-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorGlow.classList.remove('hover');
            });
        });
    }
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
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

// ===== LETTER-BY-LETTER ANIMATION =====
function animateText(element, text, delay = 100) {
    if (!element) return;
    element.innerHTML = '';
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.transition = 'opacity 0.3s ease';
            span.style.opacity = '1';
        }, index * delay);
    });
}

// ===== NUMBER COUNTER ANIMATION =====
function formatNumber(num, prefix = '', suffix = '') {
    // Add commas for thousands
    const formatted = num.toLocaleString('en-US');
    return prefix + formatted + suffix;
}

function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target, prefix, suffix);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current), prefix, suffix);
        }
    }, 16);
}

// Initialize counters when in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            if (target && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number, .stat-value-large').forEach(stat => {
    counterObserver.observe(stat);
});

// ===== FORM FLOATING LABELS (Login Page) =====
function initFloatingLabels() {
    const inputs = document.querySelectorAll('.floating-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Initialize floating labels when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingLabels);
} else {
    initFloatingLabels();
}

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== MOBILE MENU CLOSE ON LINK CLICK =====
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if clicking dropdown toggle
        if (link.classList.contains('dropdown-toggle')) {
            return;
        }
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
});

// ===== PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN =====
function initMobileMenuToggle() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (!navbarCollapse || !navbarToggler) return;
    
    // Ensure Bootstrap collapse is initialized
    if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        // Initialize collapse if not already initialized
        if (!bootstrap.Collapse.getInstance(navbarCollapse)) {
            new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
        }
    }
    
    // Handle body scroll lock when menu opens/closes
    const handleMenuToggle = function() {
        setTimeout(() => {
            const isOpen = navbarCollapse.classList.contains('show');
            console.log('Menu state:', isOpen ? 'OPEN' : 'CLOSED'); // Debug log
            
            if (isOpen) {
                // Force visibility
                navbarCollapse.style.display = 'block';
                navbarCollapse.style.visibility = 'visible';
                navbarCollapse.style.opacity = '1';
                navbarCollapse.style.pointerEvents = 'auto';
                
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            } else {
                navbarCollapse.style.display = 'none';
                navbarCollapse.style.visibility = 'hidden';
                navbarCollapse.style.opacity = '0';
                navbarCollapse.style.pointerEvents = 'none';
                
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        }, 50);
    };
    
    // Listen for Bootstrap collapse events
    navbarCollapse.addEventListener('shown.bs.collapse', function() {
        console.log('Bootstrap collapse shown event fired');
        handleMenuToggle();
    });
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
        console.log('Bootstrap collapse hidden event fired');
        handleMenuToggle();
    });
    
    // Also handle click on toggler (backup)
    navbarToggler.addEventListener('click', function(e) {
        console.log('Hamburger button clicked');
        // Don't prevent default - let Bootstrap handle it
        setTimeout(function() {
            handleMenuToggle();
            // Double check after a short delay
            setTimeout(function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.display = 'block';
                    navbarCollapse.style.visibility = 'visible';
                    navbarCollapse.style.opacity = '1';
                }
            }, 200);
        }, 100);
    });
    
    // Close menu on window resize if it's open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });
    
    // Close menu when clicking outside (on overlay)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            // Close if clicking outside the navbar (on the overlay/background)
            if (!e.target.closest('.navbar-collapse') && 
                !e.target.closest('.navbar-toggler') && 
                navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        }
    });
    
    // Add overlay element for better UX
    if (!document.querySelector('.navbar-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'navbar-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1039;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);
        
        // Show/hide overlay when menu opens/closes
        navbarCollapse.addEventListener('shown.bs.collapse', function() {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            overlay.style.pointerEvents = 'auto';
        });
        
        navbarCollapse.addEventListener('hidden.bs.collapse', function() {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            overlay.style.pointerEvents = 'none';
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
    }
    
    // Add close button to menu
    if (!navbarCollapse.querySelector('.menu-close-btn')) {
        const closeButton = document.createElement('button');
        closeButton.className = 'menu-close-btn';
        closeButton.innerHTML = '✕';
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('aria-label', 'Close menu');
        closeButton.style.cssText = `
            position: absolute;
            top: calc(var(--spacing-unit) * 2);
            right: calc(var(--spacing-unit) * 2);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: var(--titanium-silver);
            background: rgba(255, 255, 255, 0.05);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1043;
            transition: all 0.2s ease;
            padding: 0;
            line-height: 1;
        `;
        
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
        
        closeButton.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(184, 115, 51, 0.2)';
            this.style.color = 'var(--molten-copper)';
        });
        
        closeButton.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.color = 'var(--titanium-silver)';
        });
        
        navbarCollapse.insertBefore(closeButton, navbarCollapse.firstChild);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initMobileMenuToggle, 100);
    });
} else {
    setTimeout(initMobileMenuToggle, 100);
}

// ===== MOBILE DROPDOWN MENU FIX =====
let mobileDropdownHandlers = [];

// Prevent Bootstrap from initializing dropdowns on mobile/tablet
function preventBootstrapDropdowns() {
    const isMobileOrTablet = window.innerWidth <= 991;
    
    if (isMobileOrTablet) {
        // Remove data-bs-toggle attribute from all dropdown toggles
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.removeAttribute('data-bs-toggle');
            toggle.removeAttribute('data-bs-auto-close');
            
            // Dispose any existing Bootstrap dropdown instances
            try {
                if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
                    const instance = bootstrap.Dropdown.getInstance(toggle);
                    if (instance) {
                        instance.dispose();
                    }
                }
            } catch (e) {
                // Ignore errors
            }
        });
    }
}

// Custom dropdown handler for mobile/tablet
function handleMobileDropdown(e) {
    // Find the dropdown toggle - check multiple possible targets
    let toggle = e.target.closest('.dropdown-toggle');
    
    // If not found, check if the click was on the nav-link itself
    if (!toggle) {
        const navLink = e.target.closest('.nav-link');
        if (navLink && navLink.classList.contains('dropdown-toggle')) {
            toggle = navLink;
        }
    }
    
    // If still not found, check parent
    if (!toggle) {
        toggle = e.target.closest('.nav-item.dropdown')?.querySelector('.dropdown-toggle');
    }
    
    if (!toggle) return;
    
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
    const dropdown = toggle.closest('.dropdown');
    const menu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
    
    if (menu) {
        const isOpen = menu.classList.contains('show');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
            if (otherMenu !== menu) {
                otherMenu.classList.remove('show');
            }
        });
        document.querySelectorAll('.dropdown-toggle').forEach(otherToggle => {
            if (otherToggle !== toggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current dropdown
        if (!isOpen) {
            menu.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
            // Scroll menu into view if needed
            setTimeout(() => {
                menu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            menu.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
        }
    }
}

function initMobileDropdowns() {
    const isMobileOrTablet = window.innerWidth <= 991;
    
    // Clean up existing handlers
    mobileDropdownHandlers.forEach(({ toggle, clickHandler, touchHandler }) => {
        if (toggle && toggle.parentNode) {
            toggle.removeEventListener('click', clickHandler, true);
            toggle.removeEventListener('touchend', touchHandler);
        }
    });
    mobileDropdownHandlers = [];
    
    if (isMobileOrTablet) {
        // Prevent Bootstrap dropdowns
        preventBootstrapDropdowns();
        
        // Remove href="#" from dropdown toggles to prevent page jump
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            if (toggle.getAttribute('href') === '#') {
                toggle.setAttribute('href', 'javascript:void(0);');
            }
        });
        
        // Add direct click handlers to each dropdown toggle
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            // Click handler
            const clickHandler = function(e) {
                if (window.innerWidth > 991) return;
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                handleMobileDropdown(e);
            };
            
            // Touch handler
            const touchHandler = function(e) {
                if (window.innerWidth > 991) return;
                e.preventDefault();
                e.stopPropagation();
                handleMobileDropdown(e);
            };
            
            // Attach handlers
            toggle.addEventListener('click', clickHandler, true);
            toggle.addEventListener('touchend', touchHandler, { passive: false });
            
            // Store handlers for cleanup
            mobileDropdownHandlers.push({ toggle, clickHandler, touchHandler });
        });
        
        // Add document-level click handler for outside clicks
        const outsideClickHandler = function(e) {
            if (window.innerWidth > 991) return;
            
            // Don't interfere with hamburger menu toggle
            if (e.target.closest('.navbar-toggler')) {
                return;
            }
            
            // Check if clicking on dropdown item
            if (e.target.closest('.dropdown-item')) {
                // Close mobile menu after clicking a link
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    setTimeout(() => {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }, 100);
                }
                return;
            }
            
            // Close all dropdowns when clicking outside
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
                document.querySelectorAll('.dropdown-toggle').forEach(t => {
                    t.setAttribute('aria-expanded', 'false');
                });
            }
        };
        
        document.addEventListener('click', outsideClickHandler, true);
        mobileDropdownHandlers.push({ toggle: document, clickHandler: outsideClickHandler });
        
    } else {
        // Re-enable Bootstrap dropdowns on desktop
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.setAttribute('data-bs-toggle', 'dropdown');
            if (toggle.getAttribute('href') === 'javascript:void(0);') {
                toggle.setAttribute('href', '#');
            }
        });
    }
}

// Ensure hamburger menu toggle works - don't interfere with it
function ensureHamburgerMenuWorks() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) return;
    
    // Ensure Bootstrap collapse is properly initialized
    if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        // Make sure the data attributes are correct
        if (!navbarToggler.hasAttribute('data-bs-toggle')) {
            navbarToggler.setAttribute('data-bs-toggle', 'collapse');
        }
        if (!navbarToggler.hasAttribute('data-bs-target')) {
            navbarToggler.setAttribute('data-bs-target', '#navbarNav');
        }
        if (!navbarToggler.hasAttribute('aria-controls')) {
            navbarToggler.setAttribute('aria-controls', 'navbarNav');
        }
        if (!navbarToggler.hasAttribute('aria-expanded')) {
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
        
        // Ensure the button type is correct
        if (navbarToggler.tagName !== 'BUTTON') {
            navbarToggler.setAttribute('type', 'button');
        }
        
        // Initialize collapse if not already done
        if (!bootstrap.Collapse.getInstance(navbarCollapse)) {
            new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
        }
        
        // Ensure click events aren't blocked
        navbarToggler.style.pointerEvents = 'auto';
        navbarToggler.style.cursor = 'pointer';
    }
}

// Initialize immediately
preventBootstrapDropdowns();
initMobileDropdowns();
ensureHamburgerMenuWorks();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        preventBootstrapDropdowns();
        initMobileDropdowns();
        ensureHamburgerMenuWorks();
        initMobileMenuToggle();
    });
} else {
    setTimeout(function() {
        preventBootstrapDropdowns();
        initMobileDropdowns();
        ensureHamburgerMenuWorks();
        initMobileMenuToggle();
    }, 100);
}

// Re-initialize on resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        preventBootstrapDropdowns();
        initMobileDropdowns();
        ensureHamburgerMenuWorks();
    }, 150);
});

// Also prevent Bootstrap initialization after page load
setTimeout(function() {
    preventBootstrapDropdowns();
    initMobileDropdowns();
    ensureHamburgerMenuWorks();
}, 500);

// Re-initialize when navbar collapse is shown (for dynamically loaded content)
const navbarCollapseElement = document.querySelector('.navbar-collapse');
if (navbarCollapseElement) {
    navbarCollapseElement.addEventListener('shown.bs.collapse', function() {
        setTimeout(function() {
            preventBootstrapDropdowns();
            initMobileDropdowns();
        }, 100);
    });
}

