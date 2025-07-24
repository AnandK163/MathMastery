// js/games.js

import { games } from '../data/games-data.js';
// Import the logic for each game from their new, separate files
import { arithmeticSpeedGame } from './games/arithmetic-speed.js';
// (Assuming you create these other files in the same pattern)
import { equationSolverGame } from './games/equation-solver.js';
import { geometryBuilderGame } from './games/geometry-builder.js';
import { fractionMatchGame } from './games/fraction-match.js';

// A map to link game IDs from data to their logic modules
const gameModules = {
    'arithmetic-speed': arithmeticSpeedGame,
    'equation-solver': equationSolverGame,
    'geometry-builder': geometryBuilderGame,
    'fraction-match': fractionMatchGame
};

let currentGame = null;
let gameState = {};

const DOMElements = {
    gameSelection: document.getElementById('game-selection'),
    gamePlayer: document.getElementById('game-player'),
    gameContent: document.getElementById('game-content'),
    backToGamesBtn: document.getElementById('back-to-games'),
};

document.addEventListener('DOMContentLoaded', () => {
    renderGameSelection();
    setupEventListeners();
});

function setupEventListeners() {
    DOMElements.gameSelection.addEventListener('click', handleGameCardClick);
    DOMElements.backToGamesBtn.addEventListener('click', showGameSelection);
}

function showGameSelection() {
    // Cleanup previous game if it exists and has a cleanup function
    if (currentGame && gameModules[currentGame.id]?.cleanup) {
        gameModules[currentGame.id].cleanup();
    }
    currentGame = null;
    gameState = {};
    DOMElements.gameSelection.classList.remove('hidden');
    DOMElements.gamePlayer.classList.add('hidden');
}

function renderGameSelection() {
    const difficultyColors = {
        'Easy': 'bg-green-100 text-green-800', 'Medium': 'bg-yellow-100 text-yellow-800', 'Hard': 'bg-red-100 text-red-800'
    };
    DOMElements.gameSelection.innerHTML = games.map(game => `
        <div class="card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card animate-slide-up" data-game-id="${game.id}">
            <div class="card-header">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-white text-2xl">${game.icon}</div>
                    <span class="badge ${difficultyColors[game.difficulty]}">${game.difficulty}</span>
                </div>
                <h3 class="card-title">${game.title}</h3>
                <p class="card-description">${game.description}</p>
            </div>
            <div class="card-content">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm text-muted-foreground">Category: ${game.category}</span>
                </div>
                <button class="btn btn-accent w-full">🎮 Play Game</button>
            </div>
        </div>
    `).join('');
}

function handleGameCardClick(e) {
    const card = e.target.closest('.card[data-game-id]');
    if (card) {
        startGame(card.dataset.gameId);
    }
}

function startGame(gameId) {
    const gameData = games.find(g => g.id === gameId);
    const gameModule = gameModules[gameId];

    if (!gameData || !gameModule) {
        console.error(`Game with id "${gameId}" not found or module not loaded.`);
        return;
    }

    currentGame = gameData;
    gameState = { score: 0, level: 1, questionsAnswered: 0, correctAnswers: 0 };
    
    DOMElements.gameSelection.classList.add('hidden');
    DOMElements.gamePlayer.classList.remove('hidden');

    // 1. Render the game's HTML
    DOMElements.gameContent.innerHTML = gameModule.render(gameState);
    
    // 2. Initialize the game's event listeners
    gameModule.init(gameState, endGame);
}

function endGame() {
    // Cleanup previous game if it exists and has a cleanup function
    if (currentGame && gameModules[currentGame.id]?.cleanup) {
        gameModules[currentGame.id].cleanup();
    }
    
    if (window.gameStore) {
        window.gameStore.addGameResult({
            gameType: currentGame.title,
            score: gameState.score,
            level: gameState.level
        });
    }

    const accuracy = Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100) || 0;
    DOMElements.gameContent.innerHTML = `
        <div class="card text-center animate-slide-up">
            <div class="card-header">
                <h2 class="text-3xl font-bold mb-4">Game Complete! 🎉</h2>
                <div class="text-6xl font-bold text-primary mb-4">${gameState.score}</div>
                <div class="text-xl text-muted-foreground mb-4">Final Score</div>
                <div class="text-lg font-semibold text-warning">Level ${gameState.level} Reached</div>
            </div>
            <div class="card-content">
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div><div class="text-2xl font-bold">${gameState.correctAnswers}</div><div class="text-sm text-muted-foreground">Correct Answers</div></div>
                    <div><div class="text-2xl font-bold">${accuracy}%</div><div class="text-sm text-muted-foreground">Accuracy</div></div>
                </div>
                <div class="space-y-4">
                    <button id="play-again-btn" class="btn btn-primary w-full">Play Again</button>
                    <button id="choose-game-btn" class="btn btn-secondary w-full">Choose Another Game</button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for the end game buttons, fixing the onclick issue
    document.getElementById('play-again-btn').addEventListener('click', () => startGame(currentGame.id));
    document.getElementById('choose-game-btn').addEventListener('click', showGameSelection);
}