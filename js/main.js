// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - now.getDay()));
    nextSunday.setHours(9, 0, 0, 0); // Set to 9 AM

    const timeLeft = nextSunday.getTime() - now.getTime();
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Enhanced Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;

    // Scroll behavior
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

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
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
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
});

// Testimonial Carousel
const testimonialCarousel = document.querySelector('.testimonial-carousel');
let isDown = false;
let startX;
let scrollLeft;

testimonialCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    testimonialCarousel.classList.add('active');
    startX = e.pageX - testimonialCarousel.offsetLeft;
    scrollLeft = testimonialCarousel.scrollLeft;
});

testimonialCarousel.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialCarousel.classList.remove('active');
});

testimonialCarousel.addEventListener('mouseup', () => {
    isDown = false;
    testimonialCarousel.classList.remove('active');
});

testimonialCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    testimonialCarousel.scrollLeft = scrollLeft - walk;
});

