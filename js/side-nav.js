document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const menuTrigger = document.querySelector('.menu-trigger');
    const sideNav = document.querySelector('.side-nav');
    const sideNavOverlay = document.querySelector('.side-nav-overlay');
    const closeNav = document.querySelector('.close-nav');

    // Add visible class to menu trigger
    menuTrigger.classList.add('always-visible');

    // Function to open side navigation
    function openSideNav() {
        sideNav.classList.add('active');
        sideNavOverlay.classList.add('active');
        menuTrigger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close side navigation
    function closeSideNav() {
        sideNav.classList.remove('active');
        sideNavOverlay.classList.remove('active');
        menuTrigger.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    menuTrigger.addEventListener('click', openSideNav);
    closeNav.addEventListener('click', closeSideNav);
    sideNavOverlay.addEventListener('click', closeSideNav);

    // Close side nav when pressing escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideNav.classList.contains('active')) {
            closeSideNav();
        }
    });

    // Navbar scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close side nav if open
                if (sideNav.classList.contains('active')) {
                    closeSideNav();
                }
            }
        });
    });

    // Handle swipe to close on mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sideNav.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    sideNav.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 100;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            closeSideNav();
        }
    }
});
