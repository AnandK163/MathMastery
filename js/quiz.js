// js/quiz.js

// --- IMPORTS ---
import { allQuizzes } from '../data/quizzes/index.js';
import { classData } from '../data/quiz-config.js';

// --- STATE MANAGEMENT ---
const state = {
    selectedClassNumber: null,
    selectedChapterId: null,
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
};

// --- DOM ELEMENT CACHING ---
const DOMElements = {
    classSelection: document.getElementById('class-selection'),
    chapterSelection: document.getElementById('chapter-selection'),
    quizPlayer: document.getElementById('quiz-player'),
    breadcrumb: document.getElementById('breadcrumb'),
    breadcrumbText: document.getElementById('breadcrumb-text'),
    backToClassesBtn: document.getElementById('back-btn'),
    backToChaptersBtn: document.getElementById('back-to-chapters'),
    chapterTitle: document.getElementById('chapter-title'),
    chaptersGrid: document.getElementById('chapters-grid'),
    quizTitle: document.getElementById('quiz-title'),
    quizDescription: document.getElementById('quiz-description'),
    quizContent: document.getElementById('quiz-content'),
    quizResults: document.getElementById('quiz-results'),
    quizProgress: document.getElementById('quiz-progress'),
    scoreDisplay: document.getElementById('score-display'),
    percentageDisplay: document.getElementById('percentage-display'),
    pointsEarned: document.getElementById('points-earned'),
    reviewAnswersBtn: document.getElementById('review-answers'),
    retakeQuizBtn: document.getElementById('retake-quiz'),
    backToQuizzesBtn: document.getElementById('back-to-quizzes'),
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    showClassSelection();
});

function setupEventListeners() {
    DOMElements.backToClassesBtn.addEventListener('click', showClassSelection);
    DOMElements.backToChaptersBtn.addEventListener('click', () => showChapterSelection(state.selectedClassNumber));
    DOMElements.reviewAnswersBtn.addEventListener('click', showReview);
    DOMElements.retakeQuizBtn.addEventListener('click', retakeQuiz);
    DOMElements.backToQuizzesBtn.addEventListener('click', () => showChapterSelection(state.selectedClassNumber));

    // Event Delegation for dynamic content
    DOMElements.classSelection.addEventListener('click', handleClassCardClick);
    DOMElements.chaptersGrid.addEventListener('click', handleChapterCardClick);
    DOMElements.quizContent.addEventListener('click', handleQuizInteraction);
}

// --- UI NAVIGATION & STATE ---

function resetQuizState() {
    state.currentQuiz = null;
    state.currentQuestionIndex = 0;
    state.userAnswers = [];
    state.score = 0;
}

function showClassSelection() {
    state.selectedClassNumber = null;
    DOMElements.classSelection.classList.remove('hidden');
    DOMElements.chapterSelection.classList.add('hidden');
    DOMElements.quizPlayer.classList.add('hidden');
    DOMElements.breadcrumb.classList.add('hidden');
    renderClasses();
}

function showChapterSelection(classNumber) {
    state.selectedClassNumber = classNumber;
    state.selectedChapterId = null;
    DOMElements.classSelection.classList.add('hidden');
    DOMElements.chapterSelection.classList.remove('hidden');
    DOMElements.quizPlayer.classList.add('hidden');
    DOMElements.breadcrumb.classList.remove('hidden');
    DOMElements.breadcrumbText.textContent = `Quizzes / Class ${classNumber}`;
    DOMElements.chapterTitle.textContent = `Class ${classNumber} - Choose a Chapter Quiz`;
    renderChapters(classNumber);
}

function startQuiz(classNumber, chapterId) {
    const quiz = allQuizzes[classNumber]?.find(q => q.id === chapterId);
    if (!quiz) return;

    resetQuizState();
    state.currentQuiz = quiz;
    state.selectedChapterId = chapterId;
    state.userAnswers = new Array(quiz.questions.length).fill(null);

    DOMElements.classSelection.classList.add('hidden');
    DOMElements.chapterSelection.classList.add('hidden');
    DOMElements.quizPlayer.classList.remove('hidden');
    DOMElements.quizContent.classList.remove('hidden');
    DOMElements.quizResults.classList.add('hidden');

    DOMElements.quizTitle.textContent = quiz.title;
    DOMElements.quizDescription.textContent = quiz.description;
    
    renderCurrentQuestion();
}

// --- DYNAMIC RENDERING ---

function renderClasses() {
    DOMElements.classSelection.innerHTML = classData.map(classInfo => {
        const quizzesForClass = allQuizzes[classInfo.classNumber] || [];
        const isAvailable = !classInfo.isComingSoon && quizzesForClass.length > 0;

        return `
        <div class="card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card animate-slide-up relative ${!isAvailable ? 'opacity-50 pointer-events-none' : ''}" 
             data-class-number="${classInfo.classNumber}">
            ${!isAvailable ? `<div class="coming-soon-overlay"><div class="coming-soon-text"><div class="text-2xl mb-2">🚀</div><div>Coming Soon</div></div></div>` : ''}
            <div class="card-header">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center text-white text-xl font-bold">${classInfo.classNumber}</div>
                    <span class="badge ${classInfo.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : classInfo.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">${classInfo.difficulty}</span>
                </div>
                <h3 class="card-title">${classInfo.title}</h3>
                <p class="card-description">${classInfo.description}</p>
            </div>
            <div class="card-content">
                 <div class="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>📚 ${quizzesForClass.length} available quizzes</span>
                </div>
                <button class="btn ${!isAvailable ? 'btn-outline' : 'btn-secondary'} w-full">${!isAvailable ? 'Coming Soon' : 'Start Quiz'}</button>
            </div>
        </div>`;
    }).join('');
}

function renderChapters(classNumber) {
    const chapters = allQuizzes[classNumber] || [];
    DOMElements.chaptersGrid.innerHTML = chapters.map(chapter => `
        <div class="card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card animate-slide-up"
             data-chapter-id="${chapter.id}">
            <div class="card-header">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center text-white">🧠</div>
                        <div>
                            <h3 class="card-title text-lg">${chapter.title}</h3>
                            <p class="card-description">${chapter.description}</p>
                        </div>
                    </div>
                    <span class="badge badge-outline">${chapter.questions.length} questions</span>
                </div>
            </div>
            <div class="card-content">
                <button class="btn btn-secondary w-full">🎯 Start Quiz</button>
            </div>
        </div>`).join('');
}

function renderCurrentQuestion() {
    if (!state.currentQuiz || state.currentQuestionIndex >= state.currentQuiz.questions.length) {
        showResults();
        return;
    }
    const question = state.currentQuiz.questions[state.currentQuestionIndex];
    DOMElements.quizProgress.textContent = `${state.currentQuestionIndex + 1} / ${state.currentQuiz.questions.length}`;

    DOMElements.quizContent.innerHTML = `
        <div class="quiz-question animate-fade-in">
            <h3 class="text-xl font-semibold mb-4">Question ${state.currentQuestionIndex + 1}: ${question.question}</h3>
            <div class="quiz-options space-y-2">
                ${question.options.map((option, index) => {
                    const isSelected = state.userAnswers[state.currentQuestionIndex] === index;
                    return `<div class="quiz-option p-3 rounded border border-border cursor-pointer transition-colors hover:bg-muted ${isSelected ? 'selected' : ''}" data-option-index="${index}">
                        <span class="font-medium">${String.fromCharCode(65 + index)}.</span> ${option}
                    </div>`
                }).join('')}
            </div>
            <div class="mt-6 flex justify-between">
                <button data-action="prev" class="btn btn-outline" ${state.currentQuestionIndex === 0 ? 'disabled' : ''}>Previous</button>
                <button data-action="next" class="btn btn-primary" ${state.userAnswers[state.currentQuestionIndex] === null ? 'disabled' : ''}>
                    ${state.currentQuestionIndex === state.currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                </button>
            </div>
        </div>`;
}

// --- QUIZ LOGIC & RESULTS ---

// In js/quiz.js

// ...

function showResults() {
    state.score = state.userAnswers.reduce((score, answer, index) => {
        return answer === state.currentQuiz.questions[index].correct ? score + 1 : score;
    }, 0);
    
    const percentage = Math.round((state.score / state.currentQuiz.questions.length) * 100);
    
    // --- UPDATE: Call the GameStore to add the quiz result and award points ---
    if (window.gameStore) {
        window.gameStore.addQuizResult({
            class: state.selectedClassNumber,
            chapter: state.currentQuiz.title,
            score: state.score,
            totalQuestions: state.currentQuiz.questions.length
        });
    }
    
    const pointsEarned = percentage >= 90 ? 20 : percentage >= 80 ? 15 : percentage >= 70 ? 10 : percentage >= 60 ? 5 : 0;
    
    // ... (rest of the function is the same)
    DOMElements.quizContent.classList.add('hidden');
    DOMElements.quizResults.classList.remove('hidden');
    DOMElements.scoreDisplay.textContent = `${state.score}/${state.currentQuiz.questions.length}`;
    DOMElements.percentageDisplay.textContent = `${percentage}%`;
    DOMElements.pointsEarned.textContent = `+${pointsEarned} points earned`;
}

function showReview() {
    DOMElements.quizContent.classList.remove('hidden');
    DOMElements.quizResults.classList.add('hidden');
    DOMElements.quizContent.innerHTML = `
        <div class="space-y-6"><h3 class="text-2xl font-bold mb-6">Review Your Answers</h3>
        ${state.currentQuiz.questions.map((q, qIndex) => {
            const userAnswer = state.userAnswers[qIndex];
            const isCorrect = userAnswer === q.correct;
            return `<div class="card"><div class="card-header"><h4 class="text-lg font-semibold">Q${qIndex + 1}: ${q.question}</h4></div>
            <div class="card-content"><div class="space-y-2">
            ${q.options.map((opt, oIndex) => `<div class="p-3 rounded border ${oIndex === q.correct ? 'quiz-option correct' : oIndex === userAnswer && !isCorrect ? 'quiz-option incorrect' : 'border-border'}">
                <span class="font-medium">${String.fromCharCode(65 + oIndex)}.</span> ${opt}
                ${oIndex === q.correct ? ' ✓' : ''}${oIndex === userAnswer && !isCorrect ? ' ✗' : ''}
            </div>`).join('')}</div>
            <div class="mt-4 p-3 bg-muted rounded"><strong>Explanation:</strong> ${q.explanation}</div></div></div>`;
        }).join('')}
        <div class="text-center"><button id="back-to-results" class="btn btn-primary">Back to Results</button></div></div>`;
    
    // Add event listener for the new button
    document.getElementById('back-to-results').addEventListener('click', showResults);
}

function retakeQuiz() {
    startQuiz(state.selectedClassNumber, state.selectedChapterId);
}

// --- EVENT HANDLERS (Delegation) ---

function handleClassCardClick(e) {
    const card = e.target.closest('.card');
    if (card && card.dataset.classNumber) {
        const classNum = parseInt(card.dataset.classNumber, 10);
        showChapterSelection(classNum);
    }
}

function handleChapterCardClick(e) {
    const card = e.target.closest('.card');
    if (card && card.dataset.chapterId) {
        startQuiz(state.selectedClassNumber, card.dataset.chapterId);
    }
}

function handleQuizInteraction(e) {
    const target = e.target;
    const option = target.closest('.quiz-option');
    const actionButton = target.closest('button[data-action]');

    if (option) {
        state.userAnswers[state.currentQuestionIndex] = parseInt(option.dataset.optionIndex, 10);
        renderCurrentQuestion(); // Re-render to show selection and enable Next button
    }
    
    if (actionButton) {
        const action = actionButton.dataset.action;
        if (action === 'next') {
            state.currentQuestionIndex++;
            renderCurrentQuestion();
        } else if (action === 'prev') {
            state.currentQuestionIndex--;
            renderCurrentQuestion();
        }
    }
}