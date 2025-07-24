// js/lessons.js

// --- IMPORTS ---
// Import the curriculum data from our dedicated data file.
import { classData, chapterData } from '../data/lessons-data.js';

// --- STATE MANAGEMENT ---
// Keep track of the user's current selection.
let selectedClassNumber = null;

// --- DOM ELEMENT CACHING ---
// Store references to frequently used DOM elements for better performance.
const DOMElements = {
    classSelection: document.getElementById('class-selection'),
    chapterSelection: document.getElementById('chapter-selection'),
    videoPlayer: document.getElementById('video-player'),
    breadcrumb: document.getElementById('breadcrumb'),
    breadcrumbText: document.getElementById('breadcrumb-text'),
    backToClassesBtn: document.getElementById('back-btn'),
    backToChaptersBtn: document.getElementById('back-to-chapters'),
    chapterTitle: document.getElementById('chapter-title'),
    chaptersGrid: document.getElementById('chapters-grid'),
    videoTitle: document.getElementById('video-title'),
    videoDescription: document.getElementById('video-description'),
    videoFrame: document.getElementById('video-frame'),
    videoTopics: document.getElementById('video-topics'),
};

// --- INITIALIZATION ---
// This runs as soon as the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    showClassSelection(); // Start by showing the class selection view.
});

/**
 * Sets up the main event listeners for the page.
 */
function setupEventListeners() {
    DOMElements.backToClassesBtn.addEventListener('click', showClassSelection);
    DOMElements.backToChaptersBtn.addEventListener('click', () => showChapterSelection(selectedClassNumber));

    // Event delegation for dynamically created cards.
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
    DOMElements.videoPlayer.classList.add('hidden');
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
    DOMElements.videoPlayer.classList.add('hidden');
    DOMElements.breadcrumb.classList.remove('hidden');
    DOMElements.breadcrumbText.textContent = `Lessons / Class ${selectedClassNumber}`;
    DOMElements.chapterTitle.textContent = `Class ${selectedClassNumber} - Choose a Lesson`;
    renderChapters(classNumber);
}

/**
 * Displays the video player for a selected chapter.
 * @param {string} chapterId - The unique ID of the chapter to display.
 */
function showVideoPlayer(chapterId) {
    const chapter = chapterData[selectedClassNumber]?.find(ch => ch.id === chapterId);
    if (!chapter || !chapter.videoUrl) return; // Exit if chapter or video isn't found

    // Award points for watching the lesson for the first time.
    if (window.gameStore && chapter.points > 0) {
        const uniqueLessonId = `c${selectedClassNumber}-${chapter.id}`;
        window.gameStore.markLessonAsComplete(uniqueLessonId, chapter.points);
    }

    DOMElements.classSelection.classList.add('hidden');
    DOMElements.chapterSelection.classList.add('hidden');
    DOMElements.videoPlayer.classList.remove('hidden');
    
    DOMElements.videoTitle.textContent = chapter.title;
    DOMElements.videoDescription.textContent = chapter.description;
    DOMElements.videoFrame.src = chapter.videoUrl;
    
    DOMElements.videoTopics.innerHTML = (chapter.topics || [])
        .map(topic => `<span class="badge badge-outline">${topic}</span>`)
        .join('');
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
    
    DOMElements.classSelection.innerHTML = classData.map(classInfo => `
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
                    <span>📚 ${classInfo.chaptersCount} chapters</span>
                    <span>🎯 ${classInfo.lessonsCount} lessons</span>
                </div>
                <button class="btn ${classInfo.isComingSoon ? 'btn-outline' : 'btn-primary'} w-full">${classInfo.isComingSoon ? 'Coming Soon' : 'Start Learning'}</button>
            </div>
        </div>
    `).join('');
}

/**
 * Renders the chapter cards for a given class number with conditional lesson and notes buttons.
 * @param {number} classNumber - The class to render chapters for.
 */
function renderChapters(classNumber) {
    const completedLessons = window.gameStore ? window.gameStore.getState().completedLessons : [];
    const chapters = chapterData[classNumber] || [];
    
    DOMElements.chaptersGrid.innerHTML = chapters.map(chapter => {
        const uniqueLessonId = `c${classNumber}-${chapter.id}`;
        const isCompleted = completedLessons.includes(uniqueLessonId);

        return `
        <div class="card flex flex-col justify-between animate-slide-up ${isCompleted ? 'border-green-500' : ''}">
            <!-- Top section for content -->
            <div>
                <div class="card-header">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-xl">
                                ${isCompleted ? '✔️' : '📚'}
                            </div>
                            <div>
                                <h3 class="card-title text-lg">${chapter.title}</h3>
                                <p class="card-description">${chapter.description}</p>
                            </div>
                        </div>
                        <span class="badge badge-primary">+${chapter.points || 0} PTS</span>
                    </div>
                </div>
                <div class="card-content pt-0">
                    <div class="flex flex-wrap gap-2">
                        ${(chapter.topics || []).map(topic => `<span class="badge badge-secondary text-xs">${topic}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Bottom section for action buttons, separated by a line -->
            <div class="card-actions mt-4 pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
                ${
                    chapter.videoUrl
                    ? `<button data-action="watch-video" data-chapter-id="${chapter.id}" class="btn btn-primary w-full">
                           ▶️ ${isCompleted ? 'Watch Again' : 'Watch Lesson'}
                       </button>`
                    : `<button class="btn btn-outline opacity-50 w-full" disabled>Video Coming Soon</button>`
                }
                
                ${
                    chapter.notesUrl
                    ? `<a href="${chapter.notesUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary w-full">
                           📄 View Notes
                       </a>`
                    : '' // Render nothing if no notes URL is present
                }
            </div>
        </div>
        `;
    }).join('');
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
        // Ensure the class is not marked as coming soon before proceeding
        if (classInfo && !classInfo.isComingSoon) {
            showChapterSelection(classNum);
        }
    }
}

/**
 * Handles clicks on the chapters grid container using event delegation.
 * This is more efficient as it handles clicks for any button inside the grid.
 * @param {Event} e - The click event object.
 */
function handleChapterCardClick(e) {
    const watchButton = e.target.closest('button[data-action="watch-video"]');
    
    // Check if the "Watch Lesson" button was clicked
    if (watchButton) {
        const chapterId = watchButton.dataset.chapterId;
        if (chapterId) {
            showVideoPlayer(chapterId);
        }
    }
    // Note: The "View Notes" link is a standard <a> tag and works automatically.
    // No specific JavaScript handling is needed for it.
}