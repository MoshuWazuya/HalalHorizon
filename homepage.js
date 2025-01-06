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
    console.log('JavaScript loaded'); // Debug line
    
    const hamburger = document.querySelector('.hamburgerstyle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) {
        console.error('Menu elements not found!'); // Debug line
        return;
    }

    hamburger.addEventListener('click', function(e) {
        console.log('Hamburger clicked'); // Debug line
        e.stopPropagation(); // Prevent click from bubbling
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});