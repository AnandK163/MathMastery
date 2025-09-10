// --- GAME CONFIGURATION ---
const GAME_DURATION = 60; // seconds
const POINTS_PER_CORRECT = 25;
const PENALTY_PER_INCORRECT = 10;

// --- GAME STATE VARIABLES ---
let timerInterval;
let gameTimer;
let currentQuestion;
let canAnswer = true; // Flag to prevent multiple answer clicks

// --- HELPER FUNCTIONS ---

/**
 * Generates a random number within a specified range (inclusive).
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates random data for the graphs.
 * @param {string} type - 'bar', 'line', or 'pie'
 * @returns {object} - An object containing the data array.
 */
function generateRandomData(type) {
    const numCategories = getRandomNumber(3, 5);
    const data = [];

    if (type === 'bar' || type === 'line') {
        const labels = ['A', 'B', 'C', 'D', 'E'];
        for (let i = 0; i < numCategories; i++) {
            data.push({ label: labels[i], value: getRandomNumber(10, 100) });
        }
    } else if (type === 'pie') {
        // Create a pool of slices with consistent names and colors for robustness.
        const slicePool = [
            { label: 'Ruby', color: '#e53e3e' },
            { label: 'Sapphire', color: '#3182ce' },
            { label: 'Emerald', color: '#38a169' },
            { label: 'Gold', color: '#d69e2e' },
            { label: 'Amethyst', color: '#805ad5' },
        ].sort(() => Math.random() - 0.5); // Shuffle for variety each game.

        const selectedSlices = slicePool.slice(0, numCategories);
        let remainingPercentage = 100;

        for (let i = 0; i < numCategories - 1; i++) {
            const value = getRandomNumber(10, Math.floor(remainingPercentage / 2));
            data.push({ ...selectedSlices[i], value: value });
            remainingPercentage -= value;
        }
        // Assign the remainder to the last slice to ensure it totals 100%.
        data.push({ ...selectedSlices[numCategories - 1], value: remainingPercentage });
    }
    return { data };
}


// --- SVG GENERATION FUNCTIONS ---

function generateBarGraphSVG(data) {
    const width = 400;
    const height = 250;
    const barWidth = (width / data.length) * 0.7;
    const barSpacing = (width / data.length) * 0.3;
    const maxValue = Math.max(...data.map(d => d.value));
    const scaleY = height / maxValue;

    let bars = '';
    data.forEach((d, i) => {
        const barHeight = d.value * scaleY;
        const x = i * (barWidth + barSpacing) + barSpacing / 2;
        const y = height - barHeight;
        bars += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#4CAF50"></rect>`;
        bars += `<text x="${x + barWidth / 2}" y="${y - 5}" text-anchor="middle" font-size="12" fill="#333">${d.value}</text>`;
        bars += `<text x="${x + barWidth / 2}" y="${height + 15}" text-anchor="middle" font-size="12" fill="#333">${d.label}</text>`;
    });

    return `<svg width="${width}" height="${height + 20}" viewBox="0 0 ${width} ${height + 20}" class="bg-white rounded-lg shadow-md mx-auto">
                <g>${bars}</g>
            </svg>`;
}

function generateLineChartSVG(data) {
    const width = 400;
    const height = 250;
    const padding = 30;
    const maxValue = Math.max(...data.map(d => d.value));
    const scaleX = (width - 2 * padding) / (data.length - 1);
    const scaleY = (height - 2 * padding) / maxValue;

    let elements = `<polyline points="${data.map((d, i) => `${padding + i * scaleX},${height - padding - d.value * scaleY}`).join(' ')}" fill="none" stroke="#2196F3" stroke-width="2"/>`;
    
    data.forEach((d, i) => {
        const cx = padding + i * scaleX;
        const cy = height - padding - d.value * scaleY;
        elements += `<circle cx="${cx}" cy="${cy}" r="4" fill="#2196F3"></circle>`;
        elements += `<text x="${cx}" y="${cy - 10}" text-anchor="middle" font-size="12" fill="#333">${d.value}</text>`;
        elements += `<text x="${cx}" y="${height - padding + 15}" text-anchor="middle" font-size="12" fill="#333">${d.label}</text>`;
    });

    return `<svg width="${width}" height="${height + 20}" viewBox="0 0 ${width} ${height + 20}" class="bg-white rounded-lg shadow-md mx-auto">
                <g>${elements}</g>
            </svg>`;
}

function generatePieChartSVG(data) {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;

    let slices = '';
    let startAngle = -90; // Start from the top for a more standard look

    data.forEach((d) => {
        const sliceAngle = (d.value / 100) * 360;
        const endAngle = startAngle + sliceAngle;
        const x1 = centerX + radius * Math.cos(Math.PI * startAngle / 180);
        const y1 = centerY + radius * Math.sin(Math.PI * startAngle / 180);
        const x2 = centerX + radius * Math.cos(Math.PI * endAngle / 180);
        const y2 = centerY + radius * Math.sin(Math.PI * endAngle / 180);
        const largeArcFlag = sliceAngle > 180 ? 1 : 0;

        // Use the color directly from the data object for robustness
        slices += `<path d="M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z" fill="${d.color}"></path>`;
        
        const textAngle = startAngle + sliceAngle / 2;
        const textX = centerX + (radius / 1.5) * Math.cos(Math.PI * textAngle / 180);
        const textY = centerY + (radius / 1.5) * Math.sin(Math.PI * textAngle / 180);
        slices += `<text x="${textX}" y="${textY}" text-anchor="middle" font-size="14" fill="white" font-weight="bold">${d.value}%</text>`;

        startAngle = endAngle;
    });

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="bg-white rounded-lg shadow-md mx-auto">
                <g>${slices}</g>
            </svg>`;
}

// --- UI FEEDBACK ---

/**
 * Creates and displays a short-lived "toast" notification for feedback.
 * @param {string} message - The text to display (e.g., "+15 Points").
 * @param {boolean} isSuccess - Determines the color (true for green, false for red).
 */
function createToast(message, isSuccess) {
    const container = document.getElementById('gd-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    
    // Using inline styles for transform and transition for dynamic creation
    toast.className = `flex items-center p-3 rounded-lg shadow-lg text-white font-bold ${bgColor} transition-all duration-500 ease-out`;
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    toast.textContent = message;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    });

    // Animate out and remove after a delay
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 2500); // Toast visible for 2.5 seconds
}


// --- CORE GAME LOGIC ---

/**
 * Creates a complete question set with data, text, options, and the correct answer.
 */
function getRandomQuestionData() {
    const graphTypes = ['bar', 'line', 'pie'];
    const type = graphTypes[getRandomNumber(0, graphTypes.length - 1)];
    const { data } = generateRandomData(type);

    let questionText = '';
    let answer = '';

    if (type === 'bar') {
        const maxVal = Math.max(...data.map(d => d.value));
        answer = data.find(d => d.value === maxVal).label;
        questionText = `Which category has the highest value?`;
    } else if (type === 'line') {
        const minVal = Math.min(...data.map(d => d.value));
        answer = data.find(d => d.value === minVal).label;
        questionText = `Which point has the lowest value?`;
    } else if (type === 'pie') {
        const maxVal = Math.max(...data.map(d => d.value));
        answer = data.find(d => d.value === maxVal).label;
        questionText = `Which slice represents the largest percentage?`;
    }
    
    const options = data.map(d => d.label).sort(() => Math.random() - 0.5);

    return { type, data, question: questionText, options, answer };
}

/**
 * Renders a new question, including the graph and options, to the DOM.
 */
function renderQuestionContent() {
    currentQuestion = getRandomQuestionData();
    const optionsContainer = document.getElementById('gd-options-container');
    const questionTextElement = document.getElementById('gd-question-text');
    const graphDisplayElement = document.getElementById('gd-graph-display');

    if (!optionsContainer || !questionTextElement || !graphDisplayElement) return;

    let graphSVG = '';
    if (currentQuestion.type === 'bar') {
        graphSVG = generateBarGraphSVG(currentQuestion.data);
    } else if (currentQuestion.type === 'line') {
        graphSVG = generateLineChartSVG(currentQuestion.data);
    } else if (currentQuestion.type === 'pie') {
        graphSVG = generatePieChartSVG(currentQuestion.data);
    }

    graphDisplayElement.innerHTML = graphSVG;
    questionTextElement.textContent = currentQuestion.question;

    optionsContainer.innerHTML = currentQuestion.options.map(option => `
        <button class="btn btn-outline gd-option-btn" data-option="${option}">${option}</button>
    `).join('');
    
    canAnswer = true;
}

/**
 * Handles the user's answer, updates score, provides feedback, and loads the next question.
 */
function handleAnswer(e, gameState) {
    if (!canAnswer) return;
    canAnswer = false;

    const selectedButton = e.target;
    const selectedOption = selectedButton.dataset.option;
    gameState.questionsAnswered++;

    let pointsChange = 0;
    let wasCorrect = false;

    document.querySelectorAll('.gd-option-btn').forEach(button => {
        button.disabled = true;
    });

    if (selectedOption === currentQuestion.answer) {
        pointsChange = POINTS_PER_CORRECT;
        wasCorrect = true;
        selectedButton.classList.replace('btn-outline', 'btn-success');
    } else {
        pointsChange = -PENALTY_PER_INCORRECT;
        selectedButton.classList.replace('btn-outline', 'btn-destructive');
        document.querySelectorAll('.gd-option-btn').forEach(button => {
            if (button.dataset.option === currentQuestion.answer) {
                button.classList.replace('btn-outline', 'btn-primary');
            }
        });
    }

    gameState.score += pointsChange;
    if(wasCorrect) gameState.correctAnswers++;
    updateGameUI(gameState);

    // Show feedback toast
    const feedbackMessage = `${pointsChange > 0 ? '+' : ''}${pointsChange} Points`;
    createToast(feedbackMessage, wasCorrect);

    setTimeout(renderQuestionContent, 1500);
}

/**
 * Updates the score and timer display.
 */
function updateGameUI(gameState) {
    document.getElementById('gd-score').textContent = gameState.score;
    document.getElementById('gd-timer').textContent = gameTimer;
}

/**
 * Initializes and starts the game loop.
 */
function startGame(gameState, endGameCallback) {
    gameTimer = GAME_DURATION;
    gameState.score = 0;
    gameState.correctAnswers = 0;
    gameState.questionsAnswered = 0;
    
    updateGameUI(gameState);
    renderQuestionContent();

    timerInterval = setInterval(() => {
        gameTimer--;
        updateGameUI(gameState);
        if (gameTimer <= 0) {
            clearInterval(timerInterval);
            if(endGameCallback) endGameCallback();
        }
    }, 1000);
}

// --- EXPORTED GAME OBJECT ---
export const graphDetectiveGame = {
    render: (gameState) => {
        return `
            <div class="relative game-container text-center max-w-2xl mx-auto p-4">
                <!-- Toast Container for Pop-up Notifications -->
                <div id="gd-toast-container" class="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2 w-48"></div>

                <h2 class="text-3xl font-bold mb-2">Graph Detective!</h2>
                <p class="text-lg text-muted-foreground mb-6">Analyze the graphs and answer the questions correctly.</p>
                
                <div class="flex justify-around items-center mb-6 text-xl font-semibold">
                    <div>Score: <span id="gd-score">${gameState.score}</span></div>
                    <div>Time: <span id="gd-timer">${GAME_DURATION}</span>s</div>
                </div>

                <div id="gd-game-area" class="mb-8 relative min-h-[450px]">
                    <div id="gd-graph-display" class="graph-display mb-4 flex justify-center items-center min-h-[300px]"></div>
                    <p id="gd-question-text" class="text-xl font-semibold mb-4 h-12 flex items-center justify-center"></p>
                    <div id="gd-options-container" class="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
                </div>

                <button id="gd-start-btn" class="btn btn-primary mt-4">Start Game</button>
            </div>
        `;
    },
    init: (gameState, endGameCallback) => {
        const startBtn = document.getElementById('gd-start-btn');
        const optionsContainer = document.getElementById('gd-options-container');

        startBtn.addEventListener('click', (event) => {
            event.target.classList.add('hidden');
            startGame(gameState, endGameCallback);
        });

        optionsContainer.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('gd-option-btn')) {
                handleAnswer(e, gameState);
            }
        });
    },
    cleanup: () => {
        clearInterval(timerInterval);
    }
};