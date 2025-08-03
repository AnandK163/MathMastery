// --- GAME CONFIGURATION ---
const GAME_DURATION = 60; // seconds
const BALLOON_COUNT = 10;
const MIN_CORRECT_BALLOONS = 3; // Ensure at least this many correct balloons per round
const POINTS_PER_CORRECT = 5;
const PENALTY_PER_INCORRECT = 5;

// --- GAME STATE VARIABLES ---
let timerInterval;
let gameTimer;
let currentTargetValue; // The digit to look for
let currentPlaceValueName; // "ones", "tens", "hundreds"

const placeValues = [
    { name: "ones" },
    { name: "tens" },
    { name: "hundreds" }
];

// --- HELPER FUNCTIONS ---

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gets the digit at a specific place value from a number.
 * e.g., getDigitAtPlace(123, 'tens') returns 2.
 */
function getDigitAtPlace(number, placeName) {
    if (placeName === "ones") {
        return number % 10;
    } else if (placeName === "tens") {
        return Math.floor(number / 10) % 10;
    } else if (placeName === "hundreds") {
        return Math.floor(number / 100) % 10;
    }
    return 0;
}

// --- CORE GAME LOGIC ---

/**
 * Generates a new set of balloons and updates the game's target.
 */
function generateBalloons() {
    const balloonsContainer = document.getElementById('pvp-balloons-container');
    if (!balloonsContainer) return;
    balloonsContainer.innerHTML = ''; // Clear previous balloons

    const selectedPlace = placeValues[getRandomNumber(0, placeValues.length - 1)];
    currentPlaceValueName = selectedPlace.name;
    currentTargetValue = getRandomNumber(1, 9); // Target is a single digit from 1-9

    document.getElementById('pvp-target-text').textContent = `Pop balloons with ${currentTargetValue} in the ${currentPlaceValueName} place!`;

    let correctCount = 0;
    const numbers = new Set(); // Use a Set to avoid duplicate balloon numbers

    // Create a balanced set of balloons
    while (numbers.size < BALLOON_COUNT) {
        let num;
        // Decide if we should force a correct balloon
        const forceCorrect = correctCount < MIN_CORRECT_BALLOONS;
        
        if (forceCorrect || Math.random() < 0.4) { // 40% chance of being a correct number
            // Construct a correct number
            const ones = (currentPlaceValueName === 'ones') ? currentTargetValue : getRandomNumber(0, 9);
            const tens = (currentPlaceValueName === 'tens') ? currentTargetValue : getRandomNumber(0, 9);
            const hundreds = (currentPlaceValueName === 'hundreds') ? currentTargetValue : getRandomNumber(0, 9);
            num = hundreds * 100 + tens * 10 + ones;
        } else {
            // Generate an incorrect number
            do {
                num = getRandomNumber(1, 999);
            } while (getDigitAtPlace(num, currentPlaceValueName) === currentTargetValue);
        }
        
        if (num > 0 && !numbers.has(num)) {
            numbers.add(num);
            if (getDigitAtPlace(num, currentPlaceValueName) === currentTargetValue) {
                correctCount++;
            }
        }
    }

    // Create and append balloon elements from the generated numbers
    numbers.forEach(num => {
        const isCorrect = getDigitAtPlace(num, currentPlaceValueName) === currentTargetValue;
        const balloonElement = document.createElement('div');
        const color = `hsl(${getRandomNumber(0, 360)}, 80%, 60%)`;
        balloonElement.className = 'pvp-balloon text-white font-bold rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110';
        balloonElement.style.backgroundColor = color;
        balloonElement.textContent = num;
        balloonElement.dataset.isCorrect = isCorrect;
        balloonsContainer.appendChild(balloonElement);
    });
}

/**
 * Handles a click on a balloon, updates score, and checks for round completion.
 */
function handleBalloonClick(e, gameState) {
    const balloon = e.target.closest('.pvp-balloon');
    // Ignore if not a balloon or if it's already popped
    if (!balloon || balloon.classList.contains('popped')) return;

    balloon.classList.add('popped'); // Mark as popped to prevent multiple clicks
    const isCorrectClick = balloon.dataset.isCorrect === 'true';

    if (isCorrectClick) {
        gameState.score += POINTS_PER_CORRECT;
        gameState.correctAnswers++;
        balloon.classList.add('animate-pop-correct');
    } else {
        gameState.score -= PENALTY_PER_INCORRECT;
        balloon.classList.add('animate-pop-incorrect');
    }
    
    // Remove the balloon from DOM after animation
    balloon.addEventListener('animationend', () => {
        balloon.remove();
        // Check if all *correct* balloons have been popped
        const remainingCorrect = document.querySelectorAll('.pvp-balloon[data-is-correct="true"]').length;
        if (remainingCorrect === 0) {
            // Generate a new set of balloons for the next round
            setTimeout(generateBalloons, 300);
        }
    });

    gameState.questionsAnswered++;
    updateGameUI(gameState);
}


/**
 * Updates the score and timer display in the UI.
 */
function updateGameUI(gameState) {
    document.getElementById('pvp-score').textContent = gameState.score;
    document.getElementById('pvp-timer').textContent = gameTimer;
}

/**
 * Initializes and starts the game loop.
 */
function startGame(gameState, endGameCallback) {
    // PRIMARY FIX: Hide the start button to prevent multiple clicks/timers.
    document.getElementById('pvp-start-btn').classList.add('hidden');
    
    // Reset game state
    gameTimer = GAME_DURATION;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.questionsAnswered = 0;
    updateGameUI(gameState);
    
    // Generate the first set of balloons
    generateBalloons();

    // Clear any residual timers before starting a new one (robustness).
    if (timerInterval) clearInterval(timerInterval);

    // Start the game timer
    timerInterval = setInterval(() => {
        gameTimer--;
        updateGameUI(gameState);
        if (gameTimer <= 0) {
            clearInterval(timerInterval);
            if (endGameCallback) endGameCallback();
        }
    }, 1000);
}

// --- EXPORTED GAME OBJECT ---
export const placeValuePopGame = {
    render: (gameState) => {
        return `
            <style>
                @keyframes pop-correct {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes pop-incorrect {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                .animate-pop-correct { animation: pop-correct 0.3s ease-out forwards; }
                .animate-pop-incorrect { animation: pop-incorrect 0.3s ease-in-out; }
                .pvp-balloon { width: 80px; height: 80px; }
            </style>
            <div class="game-container text-center max-w-2xl mx-auto p-4">
                <h2 class="text-3xl font-bold mb-2">Place Value Pop!</h2>
                <p class="text-lg text-muted-foreground mb-6">Pop balloons with the correct digit in the specified place.</p>
                
                <div class="flex justify-around items-center mb-6 text-xl font-semibold">
                    <div>Score: <span id="pvp-score">${gameState.score}</span></div>
                    <div>Time: <span id="pvp-timer">${GAME_DURATION}</span>s</div>
                </div>

                <div class="bg-blue-100 text-blue-800 p-4 rounded-lg mb-8 text-2xl font-bold">
                    Target: <span id="pvp-target-text"></span>
                </div>

                <div id="pvp-balloons-container" class="flex flex-wrap gap-4 p-4 justify-center items-center bg-gray-100 rounded-lg min-h-[300px]">
                    <div class="text-gray-500">Balloons will appear here...</div>
                </div>

                <button id="pvp-start-btn" class="btn btn-primary mt-8">Start Game</button>
            </div>
        `;
    },
    init: (gameState, endGameCallback) => {
        // Main entry point to start the game
        document.getElementById('pvp-start-btn').addEventListener('click', () => {
            startGame(gameState, endGameCallback);
        });
        
        // Use event delegation for balloon clicks
        document.getElementById('pvp-balloons-container').addEventListener('click', (e) => {
            handleBalloonClick(e, gameState);
        });
    },
    cleanup: () => {
        clearInterval(timerInterval);
    }
};