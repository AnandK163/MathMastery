// js/games/equation-solver.js

const GAME_DURATION = 120; // 2 minutes for a more thoughtful game
const POINTS_PER_ATTEMPT = [25, 15, 5];
const HINT_PENALTY = 15;

// --- Module-level variables ---
let timerInterval;
let gameTimer;

/**
 * Generates a new linear equation problem.
 */
function generateEquation() {
    const x = Math.floor(Math.random() * 12) + 2;
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 20) + 1;
    const result = a * x + b;
    const display = `${a}x + ${b} = ${result}`;
    const hint = `First, subtract ${b} from both sides. Then, divide the result by ${a}.`;
    return { answer: x, display, hint };
}

/**
 * Updates the score and timer display in the UI.
 */
function updateGameUI(gameState) {
    document.getElementById('eq-score').textContent = gameState.score;
    document.getElementById('eq-timer').textContent = gameTimer;
}

/**
 * Sets up the next equation in the UI.
 */
function nextEquation(gameState) {
    gameState.currentEquation = generateEquation();
    gameState.attempts = 0;

    const answerInput = document.getElementById('equation-answer');
    answerInput.disabled = false;
    answerInput.value = '';
    answerInput.focus();
    
    document.getElementById('equation-display').textContent = gameState.currentEquation.display;
    document.getElementById('equation-feedback').classList.add('hidden');
    document.getElementById('equation-hint').classList.add('hidden');
    document.getElementById('hint-btn').disabled = false;
}

/**
 * Checks the user's submitted answer.
 */
function checkAnswer(gameState) {
    const answerInput = document.getElementById('equation-answer');
    const userAnswer = parseInt(answerInput.value, 10);
    const feedbackEl = document.getElementById('equation-feedback');
    
    if (isNaN(userAnswer)) {
        feedbackEl.textContent = 'Please enter a valid number.';
        feedbackEl.className = 'mt-6 text-lg text-yellow-600 font-semibold';
        feedbackEl.classList.remove('hidden');
        return;
    }

    gameState.attempts++;
    gameState.questionsAnswered++;

    if (userAnswer === gameState.currentEquation.answer) {
        const points = POINTS_PER_ATTEMPT[Math.min(gameState.attempts - 1, POINTS_PER_ATTEMPT.length - 1)] || 5;
        gameState.score += points;
        gameState.correctAnswers++;
        
        feedbackEl.textContent = `Correct! +${points} points!`;
        feedbackEl.className = 'mt-6 text-lg text-green-600 font-semibold';
        
        answerInput.disabled = true;
        document.getElementById('hint-btn').disabled = true;
        
        setTimeout(() => nextEquation(gameState), 2000);
    } else {
        feedbackEl.textContent = 'Not quite. Try that again!';
        feedbackEl.className = 'mt-6 text-lg text-red-600 font-semibold';
    }
    feedbackEl.classList.remove('hidden');
    updateGameUI(gameState); // Update score display after checking
}

/**
 * Displays a hint for the user and applies a penalty.
 */
function showHint(gameState) {
    const hintEl = document.getElementById('equation-hint');
    hintEl.textContent = `Hint: ${gameState.currentEquation.hint}`;
    hintEl.classList.remove('hidden');
    
    gameState.score = Math.max(0, gameState.score - HINT_PENALTY);
    document.getElementById('hint-btn').disabled = true;
    
    const feedbackEl = document.getElementById('equation-feedback');
    feedbackEl.textContent = `Hint used! -${HINT_PENALTY} points.`;
    feedbackEl.className = 'mt-6 text-lg text-yellow-600 font-semibold';
    feedbackEl.classList.remove('hidden');
    updateGameUI(gameState); // Update score display after penalty
}

/**
 * Initializes and starts the game loop, including the timer.
 */
function startGame(gameState, endGameCallback) {
    // Show the game area and hide the start button
    document.getElementById('eq-start-btn').classList.add('hidden');
    document.getElementById('eq-game-area').classList.remove('hidden');
    
    // Initialize game state and timer
    gameTimer = GAME_DURATION;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.questionsAnswered = 0;
    
    updateGameUI(gameState);
    nextEquation(gameState);

    // Start the timer
    timerInterval = setInterval(() => {
        gameTimer--;
        updateGameUI(gameState);
        if (gameTimer <= 0) {
            clearInterval(timerInterval);
            if (endGameCallback) endGameCallback();
        }
    }, 1000);
}

export const equationSolverGame = {
    render: (gameState) => {
        return `
            <div class="card max-w-lg mx-auto">
                <div class="card-header text-center">
                    <h2 class="text-3xl font-bold">Equation Solver Puzzle</h2>
                    <p class="text-muted-foreground mt-2">Find the value of 'x' before time runs out!</p>
                </div>
                <div class="card-content p-6 text-center">
                    <div class="flex justify-between items-center mb-8 text-xl font-semibold">
                        <div>Score: <span id="eq-score">${gameState.score}</span></div>
                        <div>Time: <span id="eq-timer">${GAME_DURATION}</span>s</div>
                    </div>
                    
                    <!-- Game area, hidden initially -->
                    <div id="eq-game-area" class="hidden">
                        <div class="bg-muted p-6 rounded-lg mb-8">
                            <div class="text-4xl font-bold tracking-wider" id="equation-display"></div>
                        </div>
                        <div class="mb-6 flex items-center justify-center space-x-2">
                            <label class="text-2xl font-bold" for="equation-answer">x = </label>
                            <input type="number" id="equation-answer" class="input text-center text-2xl w-32" placeholder="?" autofocus>
                        </div>
                        <div class="flex justify-center space-x-4">
                            <button id="check-btn" class="btn btn-primary px-8">Check Answer</button>
                            <button id="hint-btn" class="btn btn-outline">Show Hint</button>
                        </div>
                        <div id="equation-feedback" class="mt-6 text-lg font-semibold hidden"></div>
                        <div id="equation-hint" class="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded hidden text-sm"></div>
                    </div>

                    <!-- Start button, shown initially -->
                    <button id="eq-start-btn" class="btn btn-primary btn-lg mt-8">Start Game</button>
                </div>
            </div>`;
    },
    init: (gameState, endGameCallback) => {
        // Main entry point: Start button
        document.getElementById('eq-start-btn').addEventListener('click', () => {
            startGame(gameState, endGameCallback);
        });
        
        // Event listeners for the game controls
        document.getElementById('check-btn').addEventListener('click', () => checkAnswer(gameState));
        document.getElementById('hint-btn').addEventListener('click', () => showHint(gameState));
        document.getElementById('equation-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAnswer(gameState);
        });
    },
    cleanup: () => {
      // CRITICAL: Clear the interval when the component is unmounted
      clearInterval(timerInterval);
    }
};