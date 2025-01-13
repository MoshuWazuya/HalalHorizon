// Smooth scrolling for navigation links
$(document).ready(function() {
    $('nav ul li a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Load dynamic data for Places section using AJAX and JSON
    $.ajax({
        url: 'data/places.json', // JSON file path
        method: 'GET',
        dataType: 'json',
        success: function(data) {
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
        error: function(err) {
            console.error('Error loading places:', err);
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Get all required elements
    const hamburger = document.querySelector('.hamburgerstyle');
    const navLinks = document.querySelector('.nav-links');
    const menuLinks = document.querySelectorAll('.nav-links a');

    // Check if elements exist
    if (!hamburger || !navLinks) {
        console.error('Required menu elements not found!');
        return;
    }

    // Toggle menu function
    const toggleMenu = (show) => {
        if (show === undefined) {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        } else {
            hamburger.classList.toggle('active', show);
            navLinks.classList.toggle('active', show);
        }
    };

    // Hamburger click handler
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navLinks.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close menu on window resize (prevents menu from staying open when switching to desktop view)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) { // Desktop breakpoint
                toggleMenu(false);
            }
        }, 250);
    });

    // Prevent scrolling when menu is open (optional)
    const toggleScroll = (disable) => {
        document.body.style.overflow = disable ? 'hidden' : '';
    };

    // Add scroll lock when menu opens (optional)
    navLinks.addEventListener('transitionend', function() {
        toggleScroll(this.classList.contains('active'));
    });
});