document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger icon change if desired
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden'); // Remove hidden to show
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .service-card, .gallery-grid img, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        el.classList.add('hidden'); // JS actively hides them to start the animation
        observer.observe(el);
    });

    // Smooth scroll for anchor links (if any internal links remain)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Slideshow Logic
    const slideshows = document.querySelectorAll('.slideshow-grid');
    slideshows.forEach(container => {
        const images = container.querySelectorAll('img');
        if (images.length < 2) return;
        
        // Navigation Buttons
        const prevBtn = container.querySelector('.slide-prev');
        const nextBtn = container.querySelector('.slide-next');

        let currentIndex = 0;
        let slideInterval;

        // Ensure first image is active initially
        images[0].classList.add('active');

        const showSlide = (index) => {
            // Remove active from all
            images.forEach(img => img.classList.remove('active'));
            // Wrap index
            if (index >= images.length) currentIndex = 0;
            else if (index < 0) currentIndex = images.length - 1;
            else currentIndex = index;
            
            images[currentIndex].classList.add('active');
        };

        const nextSlide = () => {
            showSlide(currentIndex + 1);
        };

        const prevSlide = () => {
            showSlide(currentIndex - 1);
        };

        const startSlideshow = () => {
            slideInterval = setInterval(nextSlide, 4000);
        };

        const resetTimer = () => {
            clearInterval(slideInterval);
            startSlideshow();
        };

        // Event Listeners for Buttons
        if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault(); // prevent any default button behavior
                nextSlide();
                resetTimer();
            });

            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
                resetTimer();
            });
        }

        // Initialize
        startSlideshow();
    });
});


