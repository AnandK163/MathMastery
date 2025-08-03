// js/notes.js

// --- IMPORTS ---
import { classData, chapterData } from '../data/notes-data.js';


// --- STATE MANAGEMENT ---
let selectedClassNumber = null;

// --- DOM ELEMENT CACHING ---
const DOMElements = {
    classSelection: document.getElementById('class-selection'),
    chapterSelection: document.getElementById('chapter-selection'),
    breadcrumb: document.getElementById('breadcrumb'),
    breadcrumbText: document.getElementById('breadcrumb-text'),
    backToClassesBtn: document.getElementById('back-btn'),
    chapterTitle: document.getElementById('chapter-title'),
    chaptersGrid: document.getElementById('chapters-grid'),
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    showClassSelection();
});

/**
 * Sets up the main event listeners for the page.
 */
function setupEventListeners() {
    DOMElements.backToClassesBtn.addEventListener('click', showClassSelection);
    DOMElements.classSelection.addEventListener('click', handleClassCardClick);
    DOMElements.chaptersGrid.addEventListener('click', handleChapterCardClick);
}

// --- UI NAVIGATION / STATE UPDATES ---

/**
 * Displays the main class selection grid and hides other sections.
 */
function showClassSelection() {
    selectedClassNumber = null;
    DOMElements.classSelection.classList.remove('hidden');
    DOMElements.chapterSelection.classList.add('hidden');
    DOMElements.breadcrumb.classList.add('hidden');
    renderClasses();
}

/**
 * Displays the chapters for a selected class.
 * @param {number} classNumber - The class number to display chapters for.
 */
function showChapterSelection(classNumber) {
    selectedClassNumber = classNumber;
    DOMElements.classSelection.classList.add('hidden');
    DOMElements.chapterSelection.classList.remove('hidden');
    DOMElements.breadcrumb.classList.remove('hidden');
    DOMElements.breadcrumbText.textContent = `Notes / Class ${selectedClassNumber}`;
    DOMElements.chapterTitle.textContent = `Class ${selectedClassNumber} - Choose a Chapter`;
    renderChapters(classNumber);
}

// --- DYNAMIC RENDERING ---

/**
 * Renders the class cards into the DOM.
 */
function renderClasses() {
    const difficultyColors = {
        'Easy': 'bg-green-100 text-green-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'Hard': 'bg-red-100 text-red-800'
    };
    
    DOMElements.classSelection.innerHTML = classData.map(classInfo => {
        const chapters = chapterData[classInfo.classNumber] || [];
        const chaptersCount = chapters.length;
        const notesCount = chapters.filter(chapter => chapter.notesUrl).length;

        return `
        <div class="card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card animate-slide-up relative ${classInfo.isComingSoon ? 'opacity-50 pointer-events-none' : ''}" 
             data-class-number="${classInfo.classNumber}">
            ${classInfo.isComingSoon ? `
                <div class="coming-soon-overlay">
                    <div class="coming-soon-text"><div class="text-2xl mb-2">🚀</div><div>Coming Soon</div></div>
                </div>` : ''}
            
            <div class="card-header">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-xl font-bold">${classInfo.classNumber}</div>
                    <span class="badge ${difficultyColors[classInfo.difficulty] || ''}">${classInfo.difficulty}</span>
                </div>
                <h3 class="card-title">${classInfo.title}</h3>
                <p class="card-description">${classInfo.description}</p>
            </div>
            
            <div class="card-content">
                <div class="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>📚 ${chaptersCount} chapters</span>
                    <span>📝 ${notesCount} sets of notes</span>
                </div>
                <button class="btn ${classInfo.isComingSoon ? 'btn-outline' : 'btn-primary'} w-full">${classInfo.isComingSoon ? 'Coming Soon' : 'View Notes'}</button>
            </div>
        </div>
    `}).join('');
}

/**
 * Renders the chapter cards for a given class number.
 * @param {number} classNumber - The class to render chapters for.
 */
function renderChapters(classNumber) {
    const chapters = chapterData[classNumber] || [];
    const completedNotes = window.gameStore ? window.gameStore.getCompletedLessons('notes') : []; // Using lesson completion for notes

    DOMElements.chaptersGrid.innerHTML = chapters.map(chapter => {
        const lessonId = `notes-${classNumber}-${chapter.id}`;
        const isCompleted = completedNotes.includes(lessonId);

        return `
        <div class="card flex flex-col justify-between animate-slide-up" data-lesson-id="${lessonId}" data-points="${chapter.points}">
            <div>
                <div class="card-header">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-xl">📚</div>
                            <div>
                                <h3 class="card-title text-lg">${chapter.title}</h3>
                                <p class="card-description">${chapter.description}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="badge ${isCompleted ? 'badge-secondary' : 'badge-primary'}">
                                ${isCompleted ? 'Viewed' : `+${chapter.points} PTS`}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-content pt-0">
                    <div class="flex flex-wrap gap-2">
                        ${(chapter.topics || []).map(topic => `<span class="badge badge-secondary text-xs">${topic}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="card-actions mt-4 pt-4 border-t border-border">
                <a href="${chapter.notesUrl ? chapter.notesUrl : '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full ${!chapter.notesUrl ? 'opacity-50 cursor-not-allowed' : ''}">
                    📄 ${!chapter.notesUrl ? 'Notes Not Available' : 'View Notes'}
                </a>
            </div>
        </div>
    `}).join('');
}

// --- EVENT HANDLERS ---

/**
 * Handles clicks on the class selection container.
 * @param {Event} e - The click event object.
 */
function handleClassCardClick(e) {
    const card = e.target.closest('.card[data-class-number]');
    if (card) {
        const classNum = parseInt(card.dataset.classNumber, 10);
        const classInfo = classData.find(c => c.classNumber === classNum);
        if (classInfo && !classInfo.isComingSoon) {
            showChapterSelection(classNum);
        }
    }
}

/**
 * Handles clicks on chapter cards to award points.
 * @param {Event} e - The click event object.
 */
function handleChapterCardClick(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const card = e.target.closest('.card[data-lesson-id]');
    if (card && card.dataset.lessonId && card.dataset.points) {
        const lessonId = card.dataset.lessonId;
        const points = parseInt(card.dataset.points, 10);

        // Award points only if they haven't been awarded before.
        if (points > 0) {
            window.gameStore.markLessonAsComplete(lessonId, points);

            // Update the UI for this specific card without a full re-render
            const badge = card.querySelector('.badge');
            if (badge) {
                badge.textContent = 'Viewed';
                badge.classList.remove('badge-primary');
                badge.classList.add('badge-secondary');
            }
            // Prevent re-awarding points
            card.dataset.points = '0';
        }
    }
}