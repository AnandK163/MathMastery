// js/games/geometry-builder.js

const POINTS_PER_DISCOVERY = 25;

const shapesData = {
    triangle: { emoji: '🔺', name: 'Triangle', properties: 'A polygon with 3 sides. The sum of its interior angles is 180°.' },
    quadrilateral: { emoji: '◇', name: 'Quadrilateral', properties: 'A polygon with 4 sides. The sum of its interior angles is 360°.' },
    rectangle: { emoji: '▬', name: 'Rectangle', properties: 'A special quadrilateral where all four interior angles are right angles (90°).' },
    pentagon: { emoji: '⬠', name: 'Pentagon', properties: 'A polygon with 5 sides. The sum of its interior angles is 540°.' },
    hexagon: { emoji: '⬡', name: 'Hexagon', properties: 'A polygon with 6 sides. The sum of its interior angles is 720°.' },
};

// --- Module-level variables ---
let canvas, ctx, currentGameState, discoveredShapes, currentPath, dots;
let onScoreUpdate; // Callback to update the global score in real-time
const DOT_RADIUS = 5, GRID_SPACING = 50;

// --- Geometric Analysis Algorithms ---

function checkCollinearity(p, q, r) {
    const crossProduct = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    return Math.abs(crossProduct) < 1e-9;
}

function checkLineIntersection(p1, q1, p2, q2) {
    function orientation(p, q, r) {
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (Math.abs(val) < 1e-9) return 0;
        return (val > 0) ? 1 : 2;
    }
    function onSegment(p, q, r) {
        return (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
                q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y));
    }
    const o1 = orientation(p1, q1, p2), o2 = orientation(p1, q1, q2),
          o3 = orientation(p2, q2, p1), o4 = orientation(p2, q2, q1);
    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(p1, p2, q1)) return true;
    if (o2 === 0 && onSegment(p1, q2, q1)) return true;
    if (o3 === 0 && onSegment(p2, p1, q2)) return true;
    if (o4 === 0 && onSegment(p2, q1, q2)) return true;
    return false;
}

function isSimplePolygon(path) {
    const n = path.length;
    if (n <= 3) return true;
    for (let i = 0; i < n; i++) {
        for (let j = i + 2; j < n; j++) {
            if (i === 0 && j === n - 1) continue;
            if (checkLineIntersection(path[i], path[(i + 1) % n], path[j], path[(j + 1) % n])) return false;
        }
    }
    return true;
}

function isRectangle(path) {
    if (path.length !== 4) return false;
    for (let i = 0; i < 4; i++) {
        const p_prev = path[(i + 3) % 4], p_curr = path[i], p_next = path[(i + 1) % 4];
        const v1 = { x: p_prev.x - p_curr.x, y: p_prev.y - p_curr.y },
              v2 = { x: p_next.x - p_curr.x, y: p_next.y - p_curr.y };
        if (Math.abs(v1.x * v2.x + v1.y * v2.y) > 1e-5) return false;
    }
    return true;
}

// --- Main Game Logic ---

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickPos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    let closestDot = null, minDistance = Infinity;
    dots.forEach(dot => {
        const d = Math.hypot(dot.x - clickPos.x, dot.y - clickPos.y);
        if (d < minDistance && d < GRID_SPACING / 2) {
            minDistance = d;
            closestDot = dot;
        }
    });

    if (!closestDot) return;
    if (currentPath.length > 0 && closestDot === currentPath[currentPath.length - 1]) return;

    if (currentPath.length >= 3 && closestDot === currentPath[0]) {
        recognizeAndProcessPolygon(currentPath);
        currentPath = [];
    } else if (currentPath.length >= 2) {
        const lastPoint = currentPath[currentPath.length - 1], secondLastPoint = currentPath[currentPath.length - 2];
        if (checkCollinearity(secondLastPoint, lastPoint, closestDot)) {
            currentPath[currentPath.length - 1] = closestDot;
        } else {
            currentPath.push(closestDot);
        }
    } else {
        currentPath.push(closestDot);
    }
    drawCanvas();
}

function recognizeAndProcessPolygon(path) {
    const infoPanel = document.getElementById('shape-info');
    
    // Check for self-intersection first
    if (!isSimplePolygon(path)) {
        infoPanel.innerHTML = `
            <div class="text-center animate-pop-in">
                <div class="text-2xl font-bold text-destructive">❌ Self-Intersecting!</div>
                <p class="mt-2 text-sm">A simple polygon's edges cannot cross over each other. Please try again!</p>
            </div>`;
        infoPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    
    // If it's a simple polygon, identify it.
    const vertexCount = path.length;
    let shapeName = null;
    switch (vertexCount) {
        case 3: shapeName = 'triangle'; break;
        case 4: shapeName = isRectangle(path) ? 'rectangle' : 'quadrilateral'; break;
        case 5: shapeName = 'pentagon'; break;
        case 6: shapeName = 'hexagon'; break;
    }

    if (shapeName) {
        displayRecognitionResult(shapeName);
    } else {
        const polygonName = getPolygonName(vertexCount);
        infoPanel.innerHTML = `
            <div class="text-center animate-pop-in">
                <div class="text-2xl font-bold">✨ A ${polygonName}!</div>
                <p class="mt-2 text-sm">That's a great shape! This game tracks discoveries up to hexagons.</p>
            </div>`;
        infoPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function getPolygonName(sides) {
    const names = { 7: 'Heptagon', 8: 'Octagon', 9: 'Nonagon', 10: 'Decagon' };
    return names[sides] || `${sides}-sided polygon`;
}

function displayRecognitionResult(shapeName) {
    const shape = shapesData[shapeName];
    const infoPanel = document.getElementById('shape-info');
    infoPanel.innerHTML = `
        <div class="text-center animate-pop-in">
            <div class="text-6xl mb-2">${shape.emoji}</div>
            <h4 class="text-xl font-bold text-primary">You made a ${shape.name}!</h4>
            <p class="mt-2 text-sm">${shape.properties}</p>
        </div>`;

    infoPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (!discoveredShapes.has(shapeName)) {
        discoveredShapes.add(shapeName);
        currentGameState.score += POINTS_PER_DISCOVERY;
        currentGameState.correctAnswers++;
        
        if (onScoreUpdate) {
            onScoreUpdate(POINTS_PER_DISCOVERY);
        }
        
        const discoveryList = document.getElementById('discovery-list');
        const li = document.createElement('li');
        li.className = 'flex items-center space-x-2 animate-pop-in';
        li.innerHTML = `<span class="text-2xl">${shape.emoji}</span><span>${shape.name}</span><span class="font-bold text-green-500 ml-auto">+${POINTS_PER_DISCOVERY}pts</span>`;
        if (discoveryList.querySelector('.placeholder')) {
            discoveryList.innerHTML = ''; // Clear placeholder text
        }
        discoveryList.appendChild(li);
    }
}

// --- Canvas Drawing and UI Functions ---
function setupDotGrid() {
    dots = [];
    const BORDER_MARGIN = 40;
    for (let y = BORDER_MARGIN; y < canvas.height - BORDER_MARGIN / 2; y += GRID_SPACING) {
        for (let x = BORDER_MARGIN; x < canvas.width - BORDER_MARGIN / 2; x += GRID_SPACING) {
            dots.push({ x, y });
        }
    }
    drawCanvas();
}

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#dfe3e6';
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    });
    if (currentPath.length > 0) {
        ctx.strokeStyle = '#007bff', ctx.lineWidth = 4, ctx.beginPath(), ctx.moveTo(currentPath[0].x, currentPath[0].y);
        for (let i = 1; i < currentPath.length; i++) ctx.lineTo(currentPath[i].x, currentPath[i].y);
        ctx.stroke();
        ctx.fillStyle = '#28a745', ctx.beginPath(), ctx.arc(currentPath[0].x, currentPath[0].y, DOT_RADIUS + 3, 0, Math.PI * 2), ctx.fill();
    }
}

function clearCurrentPath() {
    currentPath = [];
    drawCanvas();
    document.getElementById('shape-info').innerHTML = '<span class="text-muted-foreground">Click dots to create a new shape!</span>';
}

// --- Exported Game Object ---
export const geometryBuilderGame = {
    render: () => {
        return `
            <div class="card max-w-4xl mx-auto">
                <div class="card-header text-center">
                    <h2 class="text-3xl font-bold">Geometry Shape Builder</h2>
                    <p class="text-muted-foreground mt-2">Draw polygons by connecting the dots!</p>
                </div>
                <div class="card-content p-4 sm:p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div class="md:col-span-2 md:order-1">
                            <canvas id="geometry-canvas" class="w-full border-2 border-dashed rounded-lg bg-white cursor-pointer" width="500" height="400" style="touch-action: none;"></canvas>
                        </div>
                        <div class="md:col-span-1 md:order-2">
                             <h3 class="text-lg font-semibold mb-2 text-center">Controls</h3>
                             <div class="grid grid-cols-1 gap-2 mb-4">
                                <button id="clear-canvas-btn" class="btn btn-destructive">Clear Current Shape</button>
                             </div>
                             <div class="mb-4">
                                <h4 class="font-semibold mb-2 text-center">Shape Information</h4>
                                <div id="shape-info" class="p-4 rounded-lg min-h-[120px] flex items-center justify-center text-center bg-blue-50 border border-blue-200">
                                    <span class="text-muted-foreground">Click dots to begin. Click the first dot to close a shape.</span>
                                </div>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-center">Discoveries</h3>
                             <ul id="discovery-list" class="space-y-3 bg-muted p-4 rounded-lg min-h-[150px]">
                                 <li class="text-sm text-muted-foreground placeholder">Discovered shapes will appear here...</li>
                             </ul>
                        </div>
                    </div>
                </div>
            </div>`;
    },
    init: (gameState, endGameCallback, updateGlobalScore) => {
        currentGameState = gameState;
        onScoreUpdate = updateGlobalScore;
        discoveredShapes = new Set();
        currentPath = [];
        dots = [];
        canvas = document.getElementById('geometry-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        
        setupDotGrid();
        canvas.addEventListener('click', handleCanvasClick);
        document.getElementById('clear-canvas-btn').addEventListener('click', clearCurrentPath);
    },
    cleanup: () => {
        currentGameState = null;
        onScoreUpdate = null;
        dots = [];
        currentPath = [];
        discoveredShapes = new Set();
    }
};