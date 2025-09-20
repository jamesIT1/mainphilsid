// Carousel functionality
let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlides() {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === slideIndex) {
            slide.classList.add("active");
        }
    });
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlides();
}

// Auto-play carousel
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Manual navigation
document.querySelector(".carousel-next").addEventListener("click", nextSlide);
document.querySelector(".carousel-prev").addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlides();
});

showSlides(); // Initial slide display

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when a link is clicked, and handle dropdown
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", (e) => {
    const isDropdownLink = n.parentElement.classList.contains('dropdown');
    const isMobileMenu = hamburger.classList.contains('active');

    if (isDropdownLink && isMobileMenu) {
        e.preventDefault();
        const dropdown = n.parentElement;
        const dropdownContent = n.nextElementSibling;

        dropdown.classList.toggle('active');
        if (dropdown.classList.contains('active')) {
            dropdownContent.style.display = 'block';
        } else {
            dropdownContent.style.display = 'none';
        }
    } else {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}));

// Google Sheet Form Submission
    const googleForm = document.getElementById('contact-google-form');
    
    if (googleForm) {
        const statusDiv = document.getElementById('form-status');

        googleForm.addEventListener('submit', e => {
            e.preventDefault();
            
            const submitBtn = googleForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1BVIKVz1sXHY99CoFCMvlYlgGJgz-bON5jiiiupGSWbYbbhwJukok1IRfWCgGNVKJ/exec';

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: new FormData(googleForm)
            })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    statusDiv.textContent = 'Thank you! Your message has been sent successfully.';
                    statusDiv.className = 'success';
                    googleForm.reset();
                } else {
                    throw new Error(data.message || 'An unknown error occurred.');
                }
            })
            .catch(error => {
                statusDiv.textContent = `An error occurred: ${error.message}`;
                statusDiv.className = 'error';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                    statusDiv.className = '';
                }, 6000);
            });
        });
    }
