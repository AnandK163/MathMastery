// js/games/fraction-match.js

let state;
let onEnd;
let timeoutIds = []; // To store and clear timeouts

/**
 * Generates and shuffles pairs of fractions/decimals.
 */
const generateFractionPairs = () => {
    const pairs = [
        { value: 0.5, displays: ['1/2', '0.5'] }, { value: 0.25, displays: ['1/4', '0.25'] },
        { value: 0.75, displays: ['3/4', '0.75'] }, { value: 0.2, displays: ['1/5', '0.2'] }
    ];
    const cards = pairs.flatMap((pair, pairIndex) => 
        pair.displays.map(display => ({ display, value: pair.value, pairIndex, matched: false }))
    );
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
};

/**
 * Logic for checking if two selected cards are a match.
 */
const checkMatch = () => {
    const [firstIndex, secondIndex] = state.selectedCardIndices;
    const card1 = state.fractions[firstIndex];
    const card2 = state.fractions[secondIndex];
    const feedbackEl = document.getElementById('fraction-feedback');
    const firstCardEl = document.getElementById(`card-${firstIndex}`);
    const secondCardEl = document.getElementById(`card-${secondIndex}`);

    state.questionsAnswered++;

    if (card1.value === card2.value) {
        card1.matched = true;
        card2.matched = true;
        state.matchedPairs++;
        state.score += 10; // Reduced from 20 to 10
        state.correctAnswers++;
        
        firstCardEl.classList.add('correct');
        secondCardEl.classList.add('correct');
        feedbackEl.textContent = 'Match found! +10 points';
        feedbackEl.className = 'mt-4 text-center text-green-600 font-semibold';
        
        if (state.matchedPairs === 4) {
            timeoutIds.push(setTimeout(() => onEnd(), 1500));
        }
    } else {
        firstCardEl.classList.add('incorrect');
        secondCardEl.classList.add('incorrect');
        feedbackEl.textContent = 'Not a match. Try again!';
        feedbackEl.className = 'mt-4 text-center text-red-600 font-semibold';
        
        timeoutIds.push(setTimeout(() => {
            firstCardEl.classList.remove('incorrect');
            secondCardEl.classList.remove('incorrect');
        }, 1000));
    }
    
    timeoutIds.push(setTimeout(() => {
        firstCardEl.classList.remove('selected');
        secondCardEl.classList.remove('selected');
        state.selectedCardIndices = [];
        feedbackEl.classList.add('hidden');
    }, 1200));
};

/**
 * Handles the logic when a user clicks a card.
 * @param {number} index - The index of the clicked card.
 */
const selectCard = (index) => {
    if (state.selectedCardIndices.length >= 2 || state.fractions[index].matched || state.selectedCardIndices.includes(index)) {
        return;
    }
    
    state.selectedCardIndices.push(index);
    document.getElementById(`card-${index}`).classList.add('selected');
    
    if (state.selectedCardIndices.length === 2) {
        timeoutIds.push(setTimeout(checkMatch, 500));
    }
};

export const fractionMatchGame = {
    render: (gameState) => {
        state = gameState;
        state.fractions = generateFractionPairs();
        state.selectedCardIndices = [];
        state.matchedPairs = 0;
        return `
            <div class="card">
                <div class="card-header">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold">Fraction Matching Game</h2>
                        <div class="text-center"><div class="text-lg font-bold">${state.score}</div><div class="text-sm text-muted-foreground">Score</div></div>
                    </div>
                    <p class="text-muted-foreground">Find the matching pairs of equivalent fractions and decimals.</p>
                </div>
                <div class="card-content">
                    <div class="game-board grid-cols-4" id="fraction-board">
                        ${state.fractions.map((fraction, index) => `
                            <div class="game-cell" data-card-index="${index}" id="card-${index}">
                                <div class="game-cell-inner">${fraction.display}</div>
                            </div>`).join('')}
                    </div>
                    <div id="fraction-feedback" class="mt-4 text-center hidden"></div>
                </div>
            </div>`;
    },
    init: (gameState, endGame) => {
        state = gameState;
        onEnd = endGame;
        
        document.getElementById('fraction-board').addEventListener('click', (e) => {
            const card = e.target.closest('.game-cell');
            if (card && card.dataset.cardIndex) {
                selectCard(parseInt(card.dataset.cardIndex, 10));
            }
        });
    },
    cleanup: () => {
        // Clear any pending timeouts when the user leaves the game
        timeoutIds.forEach(id => clearTimeout(id));
        timeoutIds = [];
    }
};