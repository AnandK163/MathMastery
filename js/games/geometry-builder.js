// js/games/geometry-builder.js

let state;

const shapesData = {
    triangle: { emoji: '🔺', name: 'Triangle', sides: 3, angles: '180°', properties: 'A polygon with 3 sides and 3 angles.' },
    square: { emoji: '⬜', name: 'Square', sides: 4, angles: '360°', properties: 'A rectangle with all sides equal.' },
    circle: { emoji: '⭕', name: 'Circle', sides: 0, angles: '360°', properties: 'A round shape with no corners or edges.' },
    rectangle: { emoji: '▬', name: 'Rectangle', sides: 4, angles: '360°', properties: 'A polygon with 4 sides and 4 right angles.' }
};

/**
 * Creates a shape on the canvas and displays its properties.
 * @param {string} shapeType - The type of shape to create ('triangle', 'square', etc.).
 */
const createShape = (shapeType) => {
    const shape = shapesData[shapeType];
    if (!shape) return;

    document.getElementById('geometry-canvas').innerHTML = `
        <div class="text-center animate-pop-in">
            <div class="text-6xl mb-4">${shape.emoji}</div>
            <div class="text-xl font-semibold">${shape.name}</div>
        </div>`;
        
    document.getElementById('shape-info').innerHTML = `
        <div class="space-y-2">
            <div><strong>Name:</strong> ${shape.name}</div>
            <div><strong>Sides:</strong> ${shape.sides}</div>
            <div><strong>Sum of Angles:</strong> ${shape.angles}</div>
            <div><strong>Properties:</strong> ${shape.properties}</div>
        </div>`;
    
    // Award points for interacting
    state.score += 2; // Reduced from 5 to 2
    state.questionsAnswered++; // Treat each interaction as a "question"
    state.correctAnswers++;
};

/**
 * Clears the canvas and info panel to their default state.
 */
const clearCanvas = () => {
    document.getElementById('geometry-canvas').innerHTML = 'Click a shape tool to create shapes';
    document.getElementById('shape-info').innerHTML = 'Select a shape to see its properties';
};

export const geometryBuilderGame = {
    render: (gameState) => {
        state = gameState;
        return `
            <div class="card">
                <div class="card-header">
                    <h2 class="text-2xl font-bold">Geometry Shape Builder</h2>
                    <p class="text-muted-foreground">Click the buttons to create shapes and learn their properties.</p>
                </div>
                <div class="card-content">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-lg font-semibold mb-4">Shape Tools</h3>
                            <div id="shape-tools" class="space-y-2">
                                <button data-shape="triangle" class="btn btn-outline w-full">🔺 Triangle</button>
                                <button data-shape="square" class="btn btn-outline w-full">⬜ Square</button>
                                <button data-shape="circle" class="btn btn-outline w-full">⭕ Circle</button>
                                <button data-shape="rectangle" class="btn btn-outline w-full">▬ Rectangle</button>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-semibold mb-2">Shape Information:</h4>
                                <div id="shape-info" class="p-3 bg-muted rounded text-sm min-h-[120px]">Select a shape to see its properties.</div>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-4">Canvas</h3>
                            <div id="geometry-canvas" class="w-full h-64 border border-border rounded bg-card flex items-center justify-center text-muted-foreground">Click a shape tool to create shapes.</div>
                            <div class="mt-4 text-center">
                                <button id="clear-canvas-btn" class="btn btn-destructive">Clear Canvas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    },
    init: (gameState) => {
        state = gameState;
        
        // Use event delegation for the shape tools
        document.getElementById('shape-tools').addEventListener('click', (e) => {
            const button = e.target.closest('button[data-shape]');
            if (button) {
                createShape(button.dataset.shape);
            }
        });
        
        document.getElementById('clear-canvas-btn').addEventListener('click', clearCanvas);
    }
};