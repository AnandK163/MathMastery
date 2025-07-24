// js/games/equation-solver.js

let state; // Holds the game's current state (score, level, etc.)
let onEnd; // A callback function to signal the game is over

/**
 * Generates a new linear equation problem.
 */
const generateEquation = () => {
    const x = Math.floor(Math.random() * 20) + 1;
    const a = Math.floor(Math.random() * 10) + 2;
    const b = Math.floor(Math.random() * 20) + 1;
    const result = a * x + b;
    const display = `${a}x + ${b} = ${result}`;
    const hint = `First, subtract ${b} from both sides. Then, divide the result by ${a}.`;
    return { answer: x, display, hint };
};

/**
 * Moves to the next equation, updating the UI.
 */
const nextEquation = () => {
    state.currentEquation = generateEquation();
    state.attempts = 0;
    state.level++;
    
    document.getElementById('equation-display').textContent = state.currentEquation.display;
    document.getElementById('equation-answer').value = '';
    document.getElementById('equation-answer').focus();
    document.getElementById('equation-feedback').classList.add('hidden');
    document.getElementById('equation-hint').classList.add('hidden');
};

/**
 * Checks the user's submitted answer against the correct answer.
 */
const checkAnswer = () => {
    const answerInput = document.getElementById('equation-answer');
    const userAnswer = parseInt(answerInput.value, 10);
    const feedbackEl = document.getElementById('equation-feedback');
    
    if (isNaN(userAnswer)) {
        feedbackEl.textContent = 'Please enter a valid number.';
        feedbackEl.className = 'mt-4 text-center text-yellow-600 font-semibold';
        feedbackEl.classList.remove('hidden');
        return;
    }

    state.attempts++;
    state.questionsAnswered++;

    if (userAnswer === state.currentEquation.answer) {
        // Award more points for fewer attempts
        const points = Math.max(5 - (state.attempts - 1) * 2, 1); // Reduced point scale
        state.score += points;
        state.correctAnswers++;
        
        feedbackEl.textContent = `Correct! You earned +${points} points!`;
        feedbackEl.className = 'mt-4 text-center text-green-600 font-semibold';
        feedbackEl.classList.remove('hidden');

        answerInput.disabled = true; // Prevent further input
        setTimeout(nextEquation, 2000);
    } else {
        feedbackEl.textContent = 'Not quite. Try that again!';
        feedbackEl.className = 'mt-4 text-center text-red-600 font-semibold';
        feedbackEl.classList.remove('hidden');
    }
};

/**
 * Displays a hint for the user.
 */
const showHint = () => {
    const hintEl = document.getElementById('equation-hint');
    hintEl.textContent = `Hint: ${state.currentEquation.hint}`;
    hintEl.classList.remove('hidden');
    // Penalize for using a hint
    if (state.score > 0) {
        state.score = Math.max(0, state.score - 1);
    }
};

export const equationSolverGame = {
    /**
     * Renders the initial HTML structure for the game.
     * @param {object} gameState - The initial state from the controller.
     * @returns {string} The HTML string for the game.
     */
    render: (gameState) => {
        state = gameState;
        state.currentEquation = generateEquation();
        state.attempts = 0;
        return `
            <div class="card">
                <div class="card-header">
                    <h2 class="text-2xl font-bold">Equation Solver Puzzle</h2>
                    <p class="text-muted-foreground">Find the value of 'x' in the equation.</p>
                </div>
                <div class="card-content">
                    <div class="text-center mb-8">
                        <div class="text-3xl font-bold mb-4" id="equation-display">${state.currentEquation.display}</div>
                        <div class="mb-4"><label class="block text-sm font-medium mb-2" for="equation-answer">x = </label>
                            <input type="number" id="equation-answer" class="input text-center text-xl w-32" placeholder="?" autofocus>
                        </div>
                    </div>
                    <div class="flex justify-center space-x-4">
                        <button id="check-btn" class="btn btn-primary">Check Answer</button>
                        <button id="hint-btn" class="btn btn-outline">Hint</button>
                        <button id="next-btn" class="btn btn-secondary">Next Equation</button>
                    </div>
                    <div id="equation-feedback" class="mt-4 text-center hidden"></div>
                    <div id="equation-hint" class="mt-4 p-4 bg-muted rounded hidden"></div>
                </div>
            </div>`;
    },
    /**
     * Initializes the game by attaching event listeners after rendering.
     * @param {object} gameState - The shared game state.
     * @param {function} endGame - The callback to end the game.
     */
    init: (gameState, endGame) => {
        state = gameState;
        onEnd = endGame; // This game doesn't have an automatic end, but we keep the pattern.
        
        document.getElementById('check-btn').addEventListener('click', checkAnswer);
        document.getElementById('hint-btn').addEventListener('click', showHint);
        document.getElementById('next-btn').addEventListener('click', nextEquation);
        document.getElementById('equation-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAnswer();
        });
    }
};