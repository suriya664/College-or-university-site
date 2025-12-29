// Dashboard JavaScript

// Sidebar toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    function toggleSidebar() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        }
    }
    
    function closeSidebar() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            e.stopPropagation();
            closeSidebar();
        });
    }
    
    // Close sidebar when clicking outside on mobile/tablet
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            if (sidebar && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && 
                    sidebarToggle && 
                    !sidebarToggle.contains(e.target) && 
                    !sidebarOverlay.contains(e.target)) {
                    closeSidebar();
                }
            }
        }
    });
    
    // Close sidebar on window resize if switching to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeSidebar();
        }
    });
    
    // Set active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        }
    });
    
    // Animate stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.replace(/[^0-9.]/g, '');
                animateNumber(target, 0, parseFloat(finalValue), 1000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
});

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        const displayValue = element.textContent.includes('%') 
            ? current.toFixed(1) + '%'
            : element.textContent.includes(',')
            ? Math.floor(current).toLocaleString()
            : Math.floor(current);
        
        element.textContent = displayValue;
    }, 16);
}

