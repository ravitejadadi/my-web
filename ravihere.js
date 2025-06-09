// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animation to save resources
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05 // Trigger animation when 5% of the element is visible
});

// Observe all elements with the specified classes for fade-in animations
document.querySelectorAll('.card, .fade-up, .testimonial-card, .video-placeholder-card').forEach((el) => {
    observer.observe(el);
});

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIconOpen = document.getElementById("menu-icon-open");
const menuIconClose = document.getElementById("menu-icon-close");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuIconOpen.classList.toggle("hidden");
    menuIconClose.classList.toggle("hidden");
});

// Close mobile menu when a navigation link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove("hidden");
        menuIconClose.classList.add("hidden");
    });
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Handle local form submission with validation
const localForm = document.getElementById('local-registration-form');
const formMessage = document.getElementById('form-message');

if (localForm) {
    localForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission for this example

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        // Basic validation
        if (name === '' || email === '') {
            formMessage.textContent = 'Please fill in your Name and Email Address.';
            formMessage.className = 'mt-4 text-sm text-red-600';
            if (name === '') nameInput.focus();
            else emailInput.focus();
            return;
        }

        // Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'mt-4 text-sm text-red-600';
            emailInput.focus();
            return;
        }

        // Phone format validation (optional)
        const phonePattern = /^[+]?[\d\s-]+$/;
        if (phone !== '' && !phonePattern.test(phone)) {
            formMessage.textContent = 'Please enter a valid phone number.';
            formMessage.className = 'mt-4 text-sm text-red-600';
            phoneInput.focus();
            return;
        }

        // Success message
        formMessage.textContent = 'Thank you for your application! We will be in touch soon.';
        formMessage.className = 'mt-4 text-sm text-green-600';
        localForm.reset();
    });
}

// Unmute videos on hover/touch
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#videos video').forEach(video => {
        video.muted = true; // Start muted

        const unmuteVideo = () => {
            // Unmute this video and mute all others
            document.querySelectorAll('#videos video').forEach(v => v.muted = true);
            video.muted = false;
        };

        video.addEventListener('mouseenter', unmuteVideo);
        video.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            unmuteVideo();
        }, {
            passive: false
        });
    });
});