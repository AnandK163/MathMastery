// Navigation Management
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Update navigation active states
    updateActiveNavigation();
    
    // Update points display
    updatePointsDisplay();
    
    // Listen for store updates
    window.addEventListener('gameStoreUpdate', updatePointsDisplay);
});

function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function updatePointsDisplay() {
    const pointsElement = document.getElementById('nav-points');
    if (pointsElement && window.gameStore) {
        const state = window.gameStore.getState();
        pointsElement.textContent = state.totalPoints;
    }
}