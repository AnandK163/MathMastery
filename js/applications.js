// js/applications.js
import { applications, applicationCategories } from '../data/applications-data.js';

const DOMElements = {
    categoryGrid: document.getElementById('application-categories'),
    contentArea: document.getElementById('application-content'),
};

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    setupEventListeners();
});

function setupEventListeners() {
    DOMElements.categoryGrid.addEventListener('click', handleCategoryClick);
    DOMElements.contentArea.addEventListener('click', handleCalculatorEvents);
}

function renderCategories() {
    DOMElements.categoryGrid.innerHTML = applicationCategories.map(cat => `
        <div class="card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card animate-slide-up"
             data-app-id="${cat.id}">
            <div class="card-header text-center">
                <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    ${cat.icon}
                </div>
                <h3 class="card-title">${cat.title}</h3>
                <p class="card-description">${cat.description}</p>
            </div>
        </div>
    `).join('');
}

function handleCategoryClick(e) {
    const card = e.target.closest('.card');
    if (card && card.dataset.appId) {
        renderApplication(card.dataset.appId);
    }
}

function renderApplication(appId) {
    const app = applications[appId];
    if (!app) return;

    DOMElements.contentArea.innerHTML = `
        <div class="card animate-slide-up">
            <div class="card-header">
                <h2 class="text-2xl font-bold">${app.title}</h2>
                <p class="text-muted-foreground">${app.description}</p>
            </div>
            <div class="card-content space-y-6">
                ${app.scenarios.map(scenario => `
                    <div class="p-4 border rounded-lg" data-scenario-id="${app.id}">
                        <h3 class="text-lg font-semibold mb-4">${scenario.title}</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            ${scenario.inputs.map(input => `
                                <div>
                                    <label for="${input.id}" class="block text-sm font-medium text-muted-foreground">${input.label}</label>
                                    <input type="${input.type}" id="${input.id}" class="input w-full mt-1">
                                </div>
                            `).join('')}
                        </div>
                        <button class="btn btn-primary" data-action="calculate">Calculate</button>
                        <div class="mt-4 p-4 bg-muted rounded-lg hidden" data-result-area></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    window.scrollTo({ top: DOMElements.contentArea.offsetTop - 100, behavior: 'smooth' });
}

function handleCalculatorEvents(e) {
    if (e.target.dataset.action !== 'calculate') return;

    const scenarioContainer = e.target.closest('[data-scenario-id]');
    const appId = scenarioContainer.dataset.scenarioId;
    const scenario = applications[appId].scenarios[0]; // Assuming one scenario for now

    const values = {};
    scenario.inputs.forEach(input => {
        values[input.id] = parseFloat(document.getElementById(input.id).value) || 0;
    });

    const result = scenario.calculate(values);
    const resultArea = scenarioContainer.querySelector('[data-result-area]');
    resultArea.innerHTML = result;
    resultArea.classList.remove('hidden');
}