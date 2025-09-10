// --- GAME CONFIGURATION ---
const GAME_DURATION = 60; // seconds
const GRID_SIZE = 5; // 5x5 grid
const POINTS_PER_CORRECT = 25;
const PENALTY_PER_INCORRECT = 10;

// --- GAME STATE VARIABLES ---
let timerInterval;
let gameTimer;
let activeCell = null;
let onGameEndCallback = null; // Store the callback to be accessible by event handlers

// --- HELPER FUNCTIONS ---

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates and displays the multiplication grid.
 */
function generateMultiplicationGrid() {
    const gridContainer = document.getElementById('mga-grid-container');
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; // Clear previous grid
    gridContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE + 1}, 1fr)`;

    const rowFactors = Array.from({ length: GRID_SIZE }, () => getRandomNumber(2, 12));
    const colFactors = Array.from({ length: GRID_SIZE }, () => getRandomNumber(2, 12));

    // Top-left empty cell
    gridContainer.appendChild(document.createElement('div'));

    // Top header row (column factors)
    for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'mga-cell mga-factor bg-gray-300 text-gray-800 font-bold';
        cell.textContent = colFactors[i];
        gridContainer.appendChild(cell);
    }

    // Subsequent rows (row factors + answer cells)
    for (let r = 0; r < GRID_SIZE; r++) {
        // First cell in the row is the row factor
        const rowFactorCell = document.createElement('div');
        rowFactorCell.className = 'mga-cell mga-factor bg-gray-300 text-gray-800 font-bold';
        rowFactorCell.textContent = rowFactors[r];
        gridContainer.appendChild(rowFactorCell);

        // Answer cells for the rest of the row
        for (let c = 0; c < GRID_SIZE; c++) {
            const answer = rowFactors[r] * colFactors[c];
            const cell = document.createElement('div');
            cell.className = 'mga-cell mga-answer-cell bg-white text-gray-900 cursor-pointer hover:bg-yellow-200 transition-colors';
            cell.dataset.answer = answer;
            cell.textContent = '?';
            // Add the event listener directly
            cell.addEventListener('click', handleCellClick);
            gridContainer.appendChild(cell);
        }
    }
}

/**
 * Handles a click on an answer cell, highlighting it as active.
 */
function handleCellClick(e) {
    if (activeCell) {
        activeCell.classList.remove('ring-2', 'ring-blue-500', 'z-10');
    }
    activeCell = e.target;
    activeCell.classList.add('ring-2', 'ring-blue-500', 'z-10');
    document.getElementById('mga-input').focus();
}

/**
 * Handles the user's input, checks the answer, and updates the game state.
 */
function handleInput(e, gameState) {
    // Only proceed if Enter is pressed and a cell is active
    if (e.key !== 'Enter' || !activeCell) return;
    
    // Prevent empty submission
    if (e.target.value === '') return;

    const userAnswer = parseInt(e.target.value, 10);
    const correctAnswer = parseInt(activeCell.dataset.answer, 10);

    gameState.questionsAnswered++;
    let wasCorrect = false;

    if (userAnswer === correctAnswer) {
        gameState.score += POINTS_PER_CORRECT;
        gameState.correctAnswers++;
        activeCell.textContent = correctAnswer;
        activeCell.classList.add('bg-green-200', 'text-green-800', 'font-bold');
        activeCell.classList.remove('cursor-pointer', 'hover:bg-yellow-200');
        wasCorrect = true;
    } else {
        gameState.score -= PENALTY_PER_INCORRECT;
        activeCell.textContent = correctAnswer; // Show correct answer
        activeCell.classList.add('bg-red-200', 'text-red-800', 'font-bold');
        activeCell.classList.remove('cursor-pointer', 'hover:bg-yellow-200');
    }

    // This cell is now answered, so remove its click listener
    activeCell.removeEventListener('click', handleCellClick);
    activeCell.classList.remove('ring-2', 'ring-blue-500', 'z-10');
    activeCell = null;
    e.target.value = '';
    updateGameUI(gameState);

    // Check if all answer cells are filled
    const remainingCells = document.querySelectorAll('.mga-answer-cell[data-answer]').length;
    const answeredCorrectly = document.querySelectorAll('.mga-answer-cell.bg-green-200').length;
    const answeredIncorrectly = document.querySelectorAll('.mga-answer-cell.bg-red-200').length;
    
    if ((answeredCorrectly + answeredIncorrectly) === GRID_SIZE * GRID_SIZE) {
        clearInterval(timerInterval);
        // CRITICAL FIX: Call the stored callback function
        if (onGameEndCallback) {
            setTimeout(onGameEndCallback, 500); // Short delay to see final score
        }
    }
}


/**
 * Updates the score and timer display in the UI.
 */
function updateGameUI(gameState) {
    document.getElementById('mga-score').textContent = gameState.score;
    document.getElementById('mga-timer').textContent = gameTimer;
}

/**
 * Initializes and starts the game loop.
 */
function startGame(gameState, endGameCallback) {
    // Store the callback function so it can be accessed from event handlers
    onGameEndCallback = endGameCallback;

    // Set initial game state
    gameTimer = GAME_DURATION;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.questionsAnswered = 0;
    updateGameUI(gameState);
    
    // Generate the grid for the new game
    generateMultiplicationGrid();
    
    // Update UI elements for active game state
    document.getElementById('mga-start-btn').classList.add('hidden');
    document.getElementById('mga-input-container').classList.remove('hidden');
    document.getElementById('mga-input').focus();


    // Start the game timer
    timerInterval = setInterval(() => {
        gameTimer--;
        updateGameUI(gameState);
        if (gameTimer <= 0) {
            clearInterval(timerInterval);
            // Call the callback when time runs out
            if (onGameEndCallback) onGameEndCallback();
        }
    }, 1000);
}

// --- EXPORTED GAME OBJECT ---
export const multiplicationGridAttackGame = {
    render: (gameState) => {
        return `
            <div class="game-container text-center max-w-lg mx-auto p-4">
                <h2 class="text-3xl font-bold mb-2">Multiplication Grid Attack!</h2>
                <p class="text-lg text-muted-foreground mb-6">Click a '?' cell, type the answer, and press Enter!</p>
                
                <div class="flex justify-around items-center mb-6 text-xl font-semibold">
                    <div>Score: <span id="mga-score">${gameState.score}</span></div>
                    <div>Time: <span id="mga-timer">${GAME_DURATION}</span>s</div>
                </div>

                <div id="mga-grid-container" class="grid gap-1 bg-gray-400 p-2 rounded-lg mx-auto shadow-lg aspect-square">
                    <!-- Grid will be generated here by JS -->
                    <div class="flex items-center justify-center text-gray-600 col-span-6 row-span-6">
                        Click "Start Game" to begin...
                    </div>
                </div>

                <div id="mga-input-container" class="mt-6 hidden">
                    <label for="mga-input" class="sr-only">Enter Answer</label>
                    <input type="number" id="mga-input" class="input w-48 text-center text-2xl p-2" placeholder="Answer" />
                </div>

                <button id="mga-start-btn" class="btn btn-primary mt-8">Start Game</button>
            </div>
        `;
    },
    init: (gameState, endGameCallback) => {
        // The start button is the single entry point to begin the game.
        document.getElementById('mga-start-btn').addEventListener('click', () => {
            startGame(gameState, endGameCallback);
        });

        // The input listener handles all answer submissions.
        document.getElementById('mga-input').addEventListener('keyup', (e) => {
            handleInput(e, gameState);
        });
    },
    cleanup: () => {
        clearInterval(timerInterval);
        onGameEndCallback = null; // Clear the stored callback
    }
};