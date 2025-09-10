// js/games/equation-builder.js

const POINTS_PER_CORRECT = 25;

let currentGameState = null;
let target = null;
let numbers = [];
let operators = [];
let equation = "";
let onScoreUpdate = null;

const AVAILABLE_OPERATORS = ["+", "-", "*", "/"];

// --- Helpers ---
function generateNewChallenge() {
    // Produce a solvable target using 2 or 3 numbers, then add two extra numbers
    let created = false;
    while (!created) {
        const n1 = Math.floor(Math.random() * 9) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;
        const op = AVAILABLE_OPERATORS[Math.floor(Math.random() * AVAILABLE_OPERATORS.length)];

        // Skip invalid integer division pairs
        if (op === "/" && (n2 === 0 || n1 % n2 !== 0)) continue;

        let base = 0;
        switch (op) {
            case "+": base = n1 + n2; break;
            case "-": base = n1 - n2; break;
            case "*": base = n1 * n2; break;
            case "/": base = n1 / n2; break;
        }

        // Optionally add a third number
        const useThird = Math.random() < 0.5;
        let nums = [n1, n2];
        let final = base;
        if (useThird) {
            const n3 = Math.floor(Math.random() * 9) + 1;
            let op2 = AVAILABLE_OPERATORS[Math.floor(Math.random() * AVAILABLE_OPERATORS.length)];
            // Avoid bad division
            if (op2 === "/" && (n3 === 0 || final % n3 !== 0)) op2 = "+";
            switch (op2) {
                case "+": final = final + n3; break;
                case "-": final = final - n3; break;
                case "*": final = final * n3; break;
                case "/": final = final / n3; break;
            }
            nums = [n1, n2, n3];
        }

        // Only keep reasonable integer targets
        if (!Number.isFinite(final) || !Number.isInteger(final) || Math.abs(final) > 200) continue;

        // Add two extra distinct numbers (or allow duplicates if needed)
        while (nums.length < 5) {
            const extra = Math.floor(Math.random() * 9) + 1;
            if (!nums.includes(extra)) nums.push(extra);
            else if (nums.length < 5) nums.push(extra);
        }

        // Shuffle
        for (let i = nums.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }

        numbers = nums;
        target = final;
        equation = "";
        operators = [...AVAILABLE_OPERATORS];
        created = true;
    }
}

function renderButtons() {
    const elementsDiv = document.getElementById("eq-elements");
    if (!elementsDiv) return;
    elementsDiv.innerHTML = "";

    numbers.forEach((n) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-primary m-1 eq-num-btn";
        btn.innerText = n;
        btn.addEventListener("click", () => addToEquation(String(n), btn));
        elementsDiv.appendChild(btn);
    });

    operators.forEach((o) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-secondary m-1 eq-op-btn";
        btn.innerText = o;
        btn.addEventListener("click", () => addToEquation(o, btn));
        elementsDiv.appendChild(btn);
    });
}

function addToEquation(value, btn) {
    // Add spacing for readability
    if (equation && !equation.endsWith(" ")) equation += " ";
    equation += value;
    document.getElementById("eq-box").innerText = "Your Equation: " + equation;

    // Disable number buttons once used
    if (!isNaN(Number(value)) && btn) btn.disabled = true;
}

function evaluateExpression(expr) {
    // Use Function constructor to evaluate safely in module scope
    // Note: This still executes arbitrary code; keep input limited by UI buttons
    return Function(`"use strict"; return (${expr})`)();
}

function checkEquation() {
    const message = document.getElementById("eq-message");
    try {
        const result = evaluateExpression(equation);
        if (Math.abs(result - target) < 1e-9) {
            message.innerHTML = `<span class="text-green-600 font-bold">✅ Correct! You matched ${target}!</span>`;
            if (currentGameState) {
                currentGameState.score += POINTS_PER_CORRECT;
                currentGameState.correctAnswers++;
            }
            if (onScoreUpdate) onScoreUpdate(POINTS_PER_CORRECT);
        } else {
            message.innerHTML = `<span class="text-red-600 font-bold">❌ Incorrect! Your result was ${result}.</span>`;
        }
    } catch (err) {
        message.innerHTML = `<span class="text-orange-600 font-bold">⚠️ Invalid Equation!</span>`;
    }
}

function resetGame() {
    generateNewChallenge();
    const targetEl = document.getElementById("eq-target");
    if (targetEl) targetEl.innerText = target;
    const box = document.getElementById("eq-box");
    if (box) box.innerText = "Your Equation: ";
    const msg = document.getElementById("eq-message");
    if (msg) msg.innerText = "";
    renderButtons();
}

// --- Exported Game Object ---
export const equationBuilderGame = {
    render: () => `
        <div class="card max-w-3xl mx-auto">
            <div class="card-header text-center">
                <h2 class="text-3xl font-bold">Equation Builder</h2>
                <p class="text-muted-foreground mt-2">Form equations using numbers & operators to match the target!</p>
            </div>
            <div class="card-content p-4 sm:p-6 text-center">
                <p class="target text-lg font-semibold mb-4">🎯 Target Number: <span id="eq-target"></span></p>
                <div id="eq-elements" class="flex flex-wrap justify-center gap-2 mb-4"></div>
                <div id="eq-box" class="p-3 border-2 border-dashed rounded-lg bg-gray-100 mb-4">Your Equation: </div>
                <div class="flex flex-wrap justify-center gap-3">
                    <button id="eq-check-btn" class="btn btn-success">Check Equation</button>
                    <button id="eq-reset-btn" class="btn btn-destructive">New Challenge</button>
                </div>
                <p id="eq-message" class="mt-4 text-base"></p>
            </div>
        </div>`,

    init: (gameState, endGameCallback, updateGlobalScore) => {
        currentGameState = gameState || null;
        onScoreUpdate = updateGlobalScore || null;

        generateNewChallenge();
        const targetEl = document.getElementById("eq-target");
        if (targetEl) targetEl.innerText = target;
        renderButtons();

        const checkBtn = document.getElementById("eq-check-btn");
        const resetBtn = document.getElementById("eq-reset-btn");
        if (checkBtn) checkBtn.addEventListener("click", checkEquation);
        if (resetBtn) resetBtn.addEventListener("click", resetGame);
    },

    cleanup: () => {
        currentGameState = null;
        onScoreUpdate = null;
        target = null;
        numbers = [];
        operators = [];
        equation = "";
    }
};
