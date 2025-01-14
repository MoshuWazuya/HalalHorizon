document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburgerstyle');
    const navLinks = document.querySelector('.nav-links');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (!hamburger || !navLinks) {
        console.error('Menu elements not found!');
        return;
    }

    const toggleMenu = (show) => {
        const isActive = show !== undefined ? show : !hamburger.classList.contains('active');
        hamburger.classList.toggle('active', isActive);
        navLinks.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : ''; 
        hamburger.setAttribute('aria-expanded', isActive); 
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu(false);
        }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                toggleMenu(false);
            }
        }, 250);
    });
});
