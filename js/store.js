// Game Store - Local Storage Management
class GameStore {
    constructor() {
        this.storageKey = 'math-learn-storage';
        this.defaultState = {
            totalPoints: 0,
            badges: [],
            quizResults: [],
            gameResults: [],
            completedLessons: []
        };
        this.loadState();
    }

    loadState() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.state = stored ? JSON.parse(stored) : { ...this.defaultState };
        } catch (error) {
            console.error('Failed to load state from localStorage:', error);
            this.state = { ...this.defaultState };
        }
    }

    saveState() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch (error) {
            console.error('Failed to save state to localStorage:', error);
        }
    }

    getState() {
        return { ...this.state };
    }

    addPoints(points) {
        this.state.totalPoints += points;
        this.saveState();
        
        // Check for point-based badges
        this.checkPointBadges();
        
        // Trigger update events
        this.notifyStateChange();
    }

    checkPointBadges() {
        const { totalPoints, badges } = this.state;
        
        if (totalPoints >= 100 && !badges.find(b => b.id === 'first-hundred')) {
            this.addBadge({
                id: 'first-hundred',
                name: 'Century Achiever',
                description: 'Earned your first 100 points!',
                icon: '🏆'
            });
        }
        
        if (totalPoints >= 500 && !badges.find(b => b.id === 'five-hundred')) {
            this.addBadge({
                id: 'five-hundred',
                name: 'Math Master',
                description: 'Accumulated 500 points!',
                icon: '🌟'
            });
        }
        
        if (totalPoints >= 1000 && !badges.find(b => b.id === 'thousand')) {
            this.addBadge({
                id: 'thousand',
                name: 'Math Genius',
                description: 'Reached 1000 points milestone!',
                icon: '🎯'
            });
        }
    }

    addBadge(badge) {
        const newBadge = {
            ...badge,
            earnedAt: new Date().toISOString()
        };
        this.state.badges.push(newBadge);
        this.saveState();
        this.notifyStateChange();
        
        // Show badge notification
        this.showBadgeNotification(newBadge);
    }

    addQuizResult(result) {
        const quizResult = {
            ...result,
            completedAt: new Date().toISOString()
        };
        this.state.quizResults.push(quizResult);
        
        // Award points based on quiz performance
        const percentage = (result.score / result.totalQuestions) * 100;
        let points = 0;
        
        if (percentage >= 90) points = 20;
        else if (percentage >= 80) points = 15;
        else if (percentage >= 70) points = 10;
        else if (percentage >= 60) points = 5;
        
        if (points > 0) {
            this.addPoints(points);
        }
        
        // Check for quiz-based badges
        this.checkQuizBadges();
        
        this.saveState();
        this.notifyStateChange();
    }

    // ADD THIS ENTIRE NEW METHOD

    /**
     * Marks a lesson as complete and awards points if it's the first time.
     * A unique lesson ID is created by combining class and chapter IDs (e.g., 'c9-ch1').
     * @param {string} lessonId - The unique identifier for the lesson.
     * @param {number} points - The number of points to award for completion.
     */
    markLessonAsComplete(lessonId, points) {
        // Check if the lesson has already been completed
        if (this.state.completedLessons.includes(lessonId)) {
            console.log(`Lesson ${lessonId} already completed. No points awarded.`);
            return; // Exit the function if points were already awarded
        }
        
        // If not completed, add it to the list and award points
        console.log(`First time completing lesson ${lessonId}. Awarding ${points} points.`);
        this.state.completedLessons.push(lessonId);
        this.addPoints(points); // This will handle adding points, checking badges, and saving state
    }

    checkQuizBadges() {
        const { quizResults, badges } = this.state;
        
        // Check for perfect score
        const lastResult = quizResults[quizResults.length - 1];
        if (lastResult) {
            const percentage = (lastResult.score / lastResult.totalQuestions) * 100;
            if (percentage === 100 && !badges.find(b => b.id === 'perfect-score')) {
                this.addBadge({
                    id: 'perfect-score',
                    name: 'Perfect Score',
                    description: 'Got 100% on a quiz!',
                    icon: '💯'
                });
            }
        }
        
        // Check for quiz warrior badge
        if (quizResults.length >= 5 && !badges.find(b => b.id === 'quiz-warrior')) {
            this.addBadge({
                id: 'quiz-warrior',
                name: 'Quiz Warrior',
                description: 'Completed 5 quizzes!',
                icon: '⚔️'
            });
        }
    }

    addGameResult(result) {
        const gameResult = {
            ...result,
            completedAt: new Date().toISOString()
        };
        this.state.gameResults.push(gameResult);
        
        // Award points based on game performance
        this.addPoints(result.score);
        
        // Check for game-based badges
        this.checkGameBadges();
        
        this.saveState();
        this.notifyStateChange();
    }

    checkGameBadges() {
        const { gameResults, badges } = this.state;
        
        if (gameResults.length >= 3 && !badges.find(b => b.id === 'game-player')) {
            this.addBadge({
                id: 'game-player',
                name: 'Game Player',
                description: 'Played 3 different games!',
                icon: '🎮'
            });
        }
        
        const lastResult = gameResults[gameResults.length - 1];
        if (lastResult && lastResult.level >= 5 && !badges.find(b => b.id === 'level-master')) {
            this.addBadge({
                id: 'level-master',
                name: 'Level Master',
                description: 'Reached level 5 in a game!',
                icon: '🏅'
            });
        }
    }

    resetProgress() {
        this.state = { ...this.defaultState };
        this.saveState();
        this.notifyStateChange();
    }

    notifyStateChange() {
        // Dispatch custom event for state changes
        window.dispatchEvent(new CustomEvent('gameStoreUpdate', {
            detail: this.getState()
        }));
    }

    showBadgeNotification(badge) {
        // Create and show badge notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50 animate-slide-up';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">${badge.icon}</span>
                <div>
                    <div class="font-semibold text-foreground">New Badge Earned!</div>
                    <div class="text-sm text-muted-foreground">${badge.name}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
}

// Create global store instance
window.gameStore = new GameStore();