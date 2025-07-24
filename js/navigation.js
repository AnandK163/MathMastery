document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. DOM Element Caching ---
    // Get all the necessary elements from the page at once.
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const pointsElement = document.getElementById('nav-points');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    
    // --- 2. Mobile Menu Logic (FIXED & ENHANCED) ---
    // This is the new, working logic for the bottom-bar menu.
    if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
        const toggleMenu = () => {
            // Check if the menu is currently open
            const isOpen = mobileMenu.classList.contains('open');
            // Use the 'force' argument of toggle to explicitly set the state
            mobileMenu.classList.toggle('open', !isOpen);
            mobileMenuOverlay.classList.toggle('open', !isOpen);
        };

        // Add event listeners to the button and the overlay
        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuOverlay.addEventListener('click', toggleMenu);
    }

    
    // --- 3. Points Display Logic (PRESERVED) ---
    // This feature remains unchanged and will continue to work as before.
    const updatePointsDisplay = () => {
        // Only run if the points element and the global store exist
        if (pointsElement && window.gameStore) {
            const state = window.gameStore.getState();
            pointsElement.textContent = state.totalPoints;
        }
    };

    // Listen for the custom event dispatched by store.js whenever points change
    window.addEventListener('gameStoreUpdate', updatePointsDisplay);
    
    // Call it once on page load to set the initial value
    updatePointsDisplay();


    // --- 4. Active Navigation Link Logic (PRESERVED) ---
    // This feature ensures the correct link is highlighted on each page.
    const updateActiveLinks = () => {
        // Get the current page's filename (e.g., "index.html", "lessons.html")
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
            
            // First, remove the active class from all links to reset the state
            link.classList.remove('active');

            // Then, add the active class only to the link that matches the current page
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    };

    // Call it once on page load to highlight the correct link
    updateActiveLinks();

});