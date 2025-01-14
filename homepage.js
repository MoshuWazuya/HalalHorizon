// Smooth scrolling for navigation links
$(document).ready(function () {
    $('nav ul li a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    // Load dynamic data for Places section using AJAX and JSON
    $.ajax({
        url: 'data/places.json', // JSON file path
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('Places loaded successfully:', data);
            let placesHtml = '';
            data.places.forEach(place => {
                placesHtml += `
                    <div class="place">
                        <img src="${place.image}" alt="${place.name}">
                        <h3>${place.name}</h3>
                        <p>${place.description}</p>
                    </div>
                `;
            });
            $('#places-container').html(placesHtml);
        },
        error: function (err) {
            console.error('Error loading places:', err);
        }
    });
    
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the hamburger menu and nav links
    const hamburger = document.querySelector('.hamburgerstyle');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Toggle menu visibility
        const toggleMenu = () => {
            const isActive = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            toggleScroll(isActive); // Prevent scrolling when menu is open
        };

        hamburger.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        navLinks.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                toggleScroll(false);
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                toggleScroll(false);
            }
        });
    }

    // Prevent scrolling when menu is open
    const toggleScroll = (disable) => {
        document.body.style.overflow = disable ? 'hidden' : '';
    };

    // Close menu on window resize (prevents menu from staying open when switching to desktop view)
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768) { // Desktop breakpoint
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                toggleScroll(false);
            }
        }, 250);
    });
});
