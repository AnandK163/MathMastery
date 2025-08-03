// js/games/geometry-builder.js

const POINTS_PER_DISCOVERY = 50; // Points for discovering a new shape

// --- Shape templates and data ---
const shapesData = {
    triangle: {
        emoji: '🔺',
        name: 'Triangle',
        properties: 'A polygon with 3 sides and 3 angles totaling 180°.',
        template: [
            { x: 0, y: 100 }, { x: 50, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }
        ]
    },
    rectangle: {
        emoji: '▬',
        name: 'Rectangle',
        properties: 'A 4-sided polygon with four 90° right angles.',
        template: [
            { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 0, y: 0 }
        ]
    },
    circle: {
        emoji: '⭕',
        name: 'Circle',
        properties: 'A round shape where all points are equidistant from the center.',
        template: Array.from({ length: 64 }, (_, i) => {
            const angle = (i / 64) * 2 * Math.PI;
            return { x: 50 + 50 * Math.cos(angle), y: 50 + 50 * Math.sin(angle) };
        })
    }
};

// --- Module-level variables for the game session ---
let canvas, ctx;
let isDrawing = false;
let userPath = []; // Stores the {x, y} coordinates of the user's drawing
let discoveredShapes = new Set();
let currentGameState = null;
let preprocessedTemplates = {}; // Store processed templates for efficiency

// =================================================================
// --- $1 UNISTROKE RECOGNIZER IMPLEMENTATION (Simplified) ---
// =================================================================

const NUM_RESAMPLE_POINTS = 64; // Standard number of points to resample to

/**
 * Main recognition function. Compares a user's path against pre-defined templates.
 * @param {Array} points - The user's drawn path.
 * @returns {object|null} - The best match with a score, or null.
 */
function recognize(points) {
    if (points.length < 10) return null; // Path too short

    const processedPoints = processPath(points);
    let bestDistance = Infinity;
    let bestMatch = null;

    // Compare against each preprocessed template
    for (const shapeName in preprocessedTemplates) {
        const templatePoints = preprocessedTemplates[shapeName];
        // Search for the best rotational alignment
        const distance = distanceAtBestAngle(processedPoints, templatePoints, -Math.PI / 2, Math.PI / 2);
        
        if (distance < bestDistance) {
            bestDistance = distance;
            bestMatch = shapeName;
        }
    }
    
    // The score is an inverse of the distance. Closer to 1 is a better match.
    const score = 1 - (bestDistance / (0.5 * Math.sqrt(2 * 250 * 250)));
    return { name: bestMatch, score: score };
}

/**
 * Normalizes a path by resampling, scaling, and translating it to origin.
 * @param {Array} points - An array of {x,y} points.
 * @returns {Array} The normalized path.
 */
function processPath(points) {
    let resampled = resample(points, NUM_RESAMPLE_POINTS);
    const indicativeAngle = Math.atan2(resampled[0].y, resampled[0].x);
    let rotated = rotateBy(resampled, -indicativeAngle);
    let scaled = scaleTo(rotated, 250);
    return translateTo(scaled, { x: 0, y: 0 });
}

function resample(points, n) {
    const I = pathLength(points) / (n - 1);
    let D = 0.0;
    let newPoints = [points[0]];
    for (let i = 1; i < points.length; i++) {
        const d = distance(points[i - 1], points[i]);
        if ((D + d) >= I) {
            const qx = points[i - 1].x + ((I - D) / d) * (points[i].x - points[i - 1].x);
            const qy = points[i - 1].y + ((I - D) / d) * (points[i].y - points[i - 1].y);
            const newPoint = { x: qx, y: qy };
            newPoints.push(newPoint);
            points.splice(i, 0, newPoint);
            D = 0.0;
        } else {
            D += d;
        }
    }
    if (newPoints.length === n - 1) newPoints.push(points[points.length - 1]);
    return newPoints;
}

function scaleTo(points, size) {
    const B = boundingBox(points);
    const scale = size / Math.max(B.width, B.height);
    return points.map(p => ({ x: p.x * scale, y: p.y * scale }));
}

function translateTo(points, origin) {
    const c = centroid(points);
    return points.map(p => ({
        x: p.x - c.x + origin.x,
        y: p.y - c.y + origin.y
    }));
}

function rotateBy(points, angle) {
    const c = centroid(points);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return points.map(p => ({
        x: (p.x - c.x) * cos - (p.y - c.y) * sin + c.x,
        y: (p.x - c.x) * sin + (p.y - c.y) * cos + c.y
    }));
}

/**
 * Calculates the "golden section search" for the best rotation angle.
 * @param {Array} points - The user's points
 * @param {Array} template - The template points
 * @param {number} a - Start angle range
 * @param {number} b - End angle range
 */
function distanceAtBestAngle(points, template, a, b) {
    // --- FIX: Declared these variables with `let` instead of `const` ---
    let x1, f1, x2, f2;

    const phi = 0.5 * (-1.0 + Math.sqrt(5.0));
    const anglePrecision = 0.02; // ~1 degree

    x1 = phi * a + (1.0 - phi) * b;
    f1 = distanceAtAngle(points, template, x1);
    x2 = (1.0 - phi) * a + phi * b;
    f2 = distanceAtAngle(points, template, x2);

    while (Math.abs(b - a) > anglePrecision) {
        if (f1 < f2) {
            b = x2; x2 = x1; f2 = f1;
            x1 = phi * a + (1.0 - phi) * b;
            f1 = distanceAtAngle(points, template, x1);
        } else {
            a = x1; x1 = x2; f1 = f2;
            x2 = (1.0 - phi) * a + phi * b;
            f2 = distanceAtAngle(points, template, x2);
        }
    }
    return Math.min(f1, f2);
}

function distanceAtAngle(points, template, angle) {
    return pathDistance(rotateBy(points, angle), template);
}

// --- Helper geometric functions ---
const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
const pathLength = (points) => points.reduce((d, p, i) => i > 0 ? d + distance(p, points[i - 1]) : 0, 0);
const pathDistance = (path1, path2) => path1.reduce((d, p, i) => d + distance(p, path2[i]), 0) / path1.length;
const centroid = (points) => ({ x: points.reduce((sum, p) => sum + p.x, 0) / points.length, y: points.reduce((sum, p) => sum + p.y, 0) / points.length });
const boundingBox = (points) => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of points) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};
// =================================================================
// --- END OF RECOGNIZER IMPLEMENTATION ---
// =================================================================


// --- Drawing and Game Logic ---

function startDrawing(event) {
    event.preventDefault();
    clearCanvas(false);
    isDrawing = true;
    userPath = [getCanvasCoordinates(event)];
    ctx.beginPath();
    ctx.moveTo(userPath[0].x, userPath[0].y);
}

function draw(event) {
    if (!isDrawing) return;
    event.preventDefault();
    const point = getCanvasCoordinates(event);
    userPath.push(point);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
}

function stopDrawing() {
    if (!isDrawing || userPath.length < 10) {
        isDrawing = false;
        return;
    }
    isDrawing = false;
    
    const result = recognize(userPath);
    handleRecognitionResult(result);
}

function handleRecognitionResult(result) {
    const infoPanel = document.getElementById('shape-info');
    if (!result || result.score < 0.82) { // Slightly increased threshold for better accuracy
        infoPanel.innerHTML = `<div class="text-destructive font-semibold">Hmm, that's a tricky one. Try drawing the shape again more clearly!</div>`;
        return;
    }

    const shapeName = result.name;
    const shape = shapesData[shapeName];
    infoPanel.innerHTML = `
        <div class="text-center animate-pop-in">
            <div class="text-6xl mb-2">${shape.emoji}</div>
            <h4 class="text-xl font-bold text-primary">It's a ${shape.name}!</h4>
            <p class="mt-2 text-sm">${shape.properties}</p>
        </div>
    `;

    if (!discoveredShapes.has(shapeName)) {
        discoveredShapes.add(shapeName);
        currentGameState.score += POINTS_PER_DISCOVERY;
        currentGameState.correctAnswers++;
        
        const discoveryList = document.getElementById('discovery-list');
        const li = document.createElement('li');
        li.className = 'flex items-center space-x-2 animate-pop-in';
        li.innerHTML = `<span class="text-2xl">${shape.emoji}</span><span>${shape.name}</span><span class="font-bold text-green-500 ml-auto">+${POINTS_PER_DISCOVERY}pts</span>`;
        discoveryList.appendChild(li);
    }
}

function clearCanvas(clearAll = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (clearAll) {
        userPath = [];
        document.getElementById('shape-info').innerHTML = '<span class="text-muted-foreground">Draw a shape in the box above!</span>';
    }
}

function getCanvasCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches ? event.touches[0] : event;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
}

// --- Exported Game Object ---

export const geometryBuilderGame = {
    render: () => {
        return `
            <div class="card max-w-4xl mx-auto">
                <div class="card-header text-center">
                    <h2 class="text-3xl font-bold">Geometry Shape Builder</h2>
                    <p class="text-muted-foreground mt-2">Draw a triangle, rectangle, or circle to discover it!</p>
                </div>
                <div class="card-content p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="md:col-span-2">
                            <h3 class="text-lg font-semibold mb-4 text-center">Drawing Canvas</h3>
                            <canvas id="geometry-canvas" class="w-full border-2 border-dashed border-primary rounded-lg cursor-crosshair bg-white" width="500" height="400"></canvas>
                            <div class="mt-4 text-center">
                                <button id="clear-canvas-btn" class="btn btn-destructive">Clear Drawing</button>
                            </div>
                        </div>
                        <div class="md:col-span-1">
                             <h3 class="text-lg font-semibold mb-4 text-center">Discoveries</h3>
                             <ul id="discovery-list" class="space-y-3 bg-muted p-4 rounded-lg min-h-[150px]">
                             </ul>
                             <div class="mt-6">
                                <h4 class="font-semibold mb-2 text-center">Shape Information:</h4>
                                <div id="shape-info" class="p-4 rounded-lg min-h-[150px] flex items-center justify-center text-center">
                                    <span class="text-muted-foreground">Draw a shape in the box!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    },
    init: (gameState) => {
        currentGameState = gameState;
        discoveredShapes = new Set();
        canvas = document.getElementById('geometry-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        for (const shapeName in shapesData) {
            preprocessedTemplates[shapeName] = processPath(shapesData[shapeName].template);
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);
        
        document.getElementById('clear-canvas-btn').addEventListener('click', () => clearCanvas(true));
    },
    cleanup: () => {
        currentGameState = null;
        userPath = [];
        preprocessedTemplates = {};
    }
};