// js/games/arithmetic-speed.js

let state;
let onEnd;
let timer;

const generateProblem = () => {
    // ... (logic for generating a problem, identical to your original generateArithmeticProblem)
    const operations = ['+', '-', '×', '÷'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a, b, answer;
    switch(operation) {
        case '+': a = Math.floor(Math.random() * 50) + 1; b = Math.floor(Math.random() * 50) + 1; answer = a + b; break;
        case '-': a = Math.floor(Math.random() * 50) + 20; b = Math.floor(Math.random() * a); answer = a - b; break;
        case '×': a = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; answer = a * b; break;
        case '÷': answer = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; a = answer * b; break;
    }
    return { question: `${a} ${operation} ${b}`, answer };
};

const nextProblem = () => {
    state.currentProblem = generateProblem();
    document.getElementById('speed-problem').textContent = state.currentProblem.question;
    const answerInput = document.getElementById('speed-answer');
    answerInput.value = '';
    answerInput.focus();
    document.getElementById('speed-feedback').classList.add('hidden');
};

const checkAnswer = () => {
    const answerInput = document.getElementById('speed-answer');
    const userAnswer = parseInt(answerInput.value, 10);
    const feedbackEl = document.getElementById('speed-feedback');
    if (isNaN(userAnswer)) return;

    state.questionsAnswered++;
    answerInput.disabled = true;

    if (userAnswer === state.currentProblem.answer) {
        state.score += 25;
        state.correctAnswers++;
        feedbackEl.textContent = 'Correct! +10 points';
        feedbackEl.className = 'mt-4 text-center text-green-600 font-semibold';
    } else {
        feedbackEl.textContent = `Incorrect. The answer was ${state.currentProblem.answer}`;
        feedbackEl.className = 'mt-4 text-center text-red-600 font-semibold';
    }
    document.getElementById('speed-score').textContent = state.score;
    feedbackEl.classList.remove('hidden');

    setTimeout(() => {
        answerInput.disabled = false;
        nextProblem();
    }, 1500);
};

export const arithmeticSpeedGame = {
    render: (gameState) => {
        state = gameState;
        state.currentProblem = generateProblem();
        state.timeLeft = 60;
        return `
            <div class="card">
                <div class="card-header">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold">Arithmetic Speed Challenge</h2>
                        <div class="flex space-x-4">
                            <div class="text-center"><div class="text-lg font-bold" id="speed-score">${state.score}</div><div class="text-sm text-muted-foreground">Score</div></div>
                            <div class="text-center"><div class="text-lg font-bold" id="speed-timer">${state.timeLeft}</div><div class="text-sm text-muted-foreground">Time</div></div>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="text-center mb-8">
                        <div class="text-4xl font-bold mb-4" id="speed-problem">${state.currentProblem.question}</div>
                        <input type="number" id="speed-answer" class="input text-center text-2xl w-32" placeholder="?" autofocus>
                    </div>
                    <div class="flex justify-center space-x-4">
                        <button id="submit-btn" class="btn btn-primary">Submit</button>
                        <button id="skip-btn" class="btn btn-outline">Skip</button>
                    </div>
                    <div id="speed-feedback" class="mt-4 text-center hidden"></div>
                </div>
            </div>`;
    },
    init: (gameState, endGame) => {
        state = gameState;
        onEnd = endGame;
        document.getElementById('submit-btn').addEventListener('click', checkAnswer);
        document.getElementById('skip-btn').addEventListener('click', nextProblem);
        document.getElementById('speed-answer').addEventListener('keypress', (e) => e.key === 'Enter' && checkAnswer());
        
        timer = setInterval(() => {
            state.timeLeft--;
            document.getElementById('speed-timer').textContent = state.timeLeft;
            if (state.timeLeft <= 0) {
                clearInterval(timer);
                onEnd();
            }
        }, 1000);
    },
    cleanup: () => {
        clearInterval(timer);
    }
};