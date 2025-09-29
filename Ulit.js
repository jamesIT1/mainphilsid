document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Handle clicks within the nav menu for closing and dropdowns
    if (navMenu) {
        navMenu.addEventListener('click', (e) => {
            // We only care about clicks on links
            const link = e.target.closest('a');
            if (!link) {
                return;
            }

            const parentNavItem = link.closest('.nav-item');
            const isDropdownToggle = parentNavItem && parentNavItem.classList.contains('dropdown');

            // Special handling for dropdown toggle on mobile
            if (isDropdownToggle && window.innerWidth <= 992) {
                e.preventDefault();
                parentNavItem.classList.toggle('active');
                const content = parentNavItem.querySelector('.dropdown-content');
                // Toggle display for the dropdown content
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            } else {
                // For all other links, or on desktop, just close the hamburger menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    }
});

// Carousel functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlides() {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

if (slides.length > 0) {
    showSlides();

    const prev = document.querySelector('.carousel-prev');
    const next = document.querySelector('.carousel-next');

    if(prev && next) {
        prev.addEventListener('click', () => {
            slideIndex--;
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }
            showManualSlides();
        });

        next.addEventListener('click', () => {
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            showManualSlides();
        });
    }

    function showManualSlides() {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[slideIndex - 1].classList.add('active');
    }
}

// scroll to top
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
};

if(scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
}
