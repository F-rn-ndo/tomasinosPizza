// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('active');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Redirect to Google Maps for comments
function redirectToGoogleMaps() {
    // Replace with actual Google Maps review link
    window.open('https://www.google.com/maps/place/[PLACE_ID]/reviews', '_blank');
}

// Initialize page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set delivery platform links
    const didiLink = document.querySelector('.delivery-btn:first-child');
    const uberLink = document.querySelector('.delivery-btn:last-child');
    
    if (didiLink) {
        didiLink.href = 'https://didi.com.mx/food/'; // Replace with actual DiDi Food link
    }
    
    if (uberLink) {
        uberLink.href = 'https://www.ubereats.com/mx'; // Replace with actual Uber Eats link
    }

    // Add click event for social media buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('facebook')) {
                window.open('https://www.facebook.com/tomasinos', '_blank');
            } else if (this.classList.contains('instagram')) {
                window.open('https://www.instagram.com/tomasinos', '_blank');
            } else if (this.classList.contains('twitter')) {
                window.open('https://www.twitter.com/tomasinos', '_blank');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('nav-menu');
        const toggleButton = document.querySelector('.mobile-menu-toggle');
        
        if (!navMenu.contains(event.target) && !toggleButton.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe menu items for scroll animations
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Add loading effect
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Smooth scroll behavior for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('active');
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('nav-menu');
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});