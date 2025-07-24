// Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    updateBadges();
    
    // Listen for store updates
    window.addEventListener('gameStoreUpdate', function() {
        updateStats();
        updateBadges();
    });
});

function updateStats() {
    if (!window.gameStore) return;
    
    const state = window.gameStore.getState();
    const statsGrid = document.getElementById('stats-grid');
    
    if (!statsGrid) return;
    
    const stats = [
        {
            label: "Total Points",
            value: state.totalPoints,
            icon: "⭐",
            color: "text-warning"
        },
        {
            label: "Badges Earned",
            value: state.badges.length,
            icon: "🏆",
            color: "text-accent"
        },
        {
            label: "Quizzes Completed",
            value: state.quizResults.length,
            icon: "🎯",
            color: "text-secondary"
        },
        {
            label: "Games Played",
            value: state.gameResults.length,
            icon: "⚡",
            color: "text-primary"
        }
    ];
    
    statsGrid.innerHTML = stats.map((stat, index) => `
        <div class="card text-center animate-slide-up hover:shadow-card transition-all duration-300" style="animation-delay: ${index * 0.1}s;">
            <div class="card-content pt-6">
                <div class="flex items-center justify-center mb-3">
                    <span class="text-2xl">${stat.icon}</span>
                </div>
                <div class="text-2xl font-bold ${stat.color} mb-2">
                    ${stat.value}
                </div>
                <div class="text-sm text-muted-foreground">
                    ${stat.label}
                </div>
            </div>
        </div>
    `).join('');
}

function updateBadges() {
    if (!window.gameStore) return;
    
    const state = window.gameStore.getState();
    const badgesSection = document.getElementById('badges-section');
    const badgesContainer = document.getElementById('badges-container');
    
    if (!badgesSection || !badgesContainer) return;
    
    if (state.badges.length > 0) {
        badgesSection.style.display = 'block';
        
        // Show only the last 3 badges
        const recentBadges = state.badges.slice(-3);
        
        badgesContainer.innerHTML = recentBadges.map((badge, index) => `
            <div class="badge badge-outline text-lg p-3 animate-bounce-in" style="animation-delay: ${index * 0.1}s;">
                <span class="mr-2 text-xl">${badge.icon}</span>
                ${badge.name}
            </div>
        `).join('');
    } else {
        badgesSection.style.display = 'none';
    }
}