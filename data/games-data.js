// data/games-data.js

/**
 * Defines the metadata for all available games, including the points
 * required to unlock them. The progression is designed to build from
 * foundational skills to more complex applications.
 */
export const games = [
    // --- Unlocked at Start (0 Points) ---
    {
        id: 'arithmetic-speed',
        title: 'Arithmetic Speed Challenge',
        description: 'Solve arithmetic problems as fast as you can!',
        icon: '⚡',
        difficulty: 'Easy',
        category: 'Arithmetic',
        requiredPoints: 0
    },
    {
        id: 'place-value-pop',
        title: 'Place Value Pop',
        description: 'Pop balloons that match the given place value (ones, tens, hundreds).',
        icon: '🎈',
        difficulty: 'Easy',
        category: 'Number Sense',
        requiredPoints: 0
    },
    {
        id: 'fraction-match',
        title: 'Fraction Matching Game',
        description: 'Match equivalent fractions and decimals',
        icon: '🎯',
        difficulty: 'Easy',
        category: 'Fractions',
        requiredPoints: 0
    },
    {
        id: 'graph-detective',
        title: 'Graph Detective',
        description: 'Interpret bar graphs, line charts, and pie charts to answer questions.',
        icon: '📈',
        difficulty: 'Easy',
        category: 'Data Interpretation',
        requiredPoints: 0
    },

    // --- First Tier Unlock (Requires Foundational Skills) ---
    {
        id: 'multiplication-grid-attack',
        title: 'Multiplication Grid Attack',
        description: 'Complete multiplication tables under time pressure.',
        icon: '✖️',
        difficulty: 'Medium',
        category: 'Multiplication',
        requiredPoints: 250
    },
    
    // --- Mid Tier Unlock (Introduces Algebra) ---
    {
        id: 'equation-solver',
        title: 'Equation Solver Puzzle',
        description: 'Find the missing values in equations.',
        icon: '🧩',
        difficulty: 'Medium',
        category: 'Algebra',
        requiredPoints: 600
    },

    // --- Equation Builder (Algebra/Medium, unlocked with Equation Solver) ---
    {
        id: 'equation-builder',
        title: 'Equation Builder',
        description: 'Form equations using numbers & operators to match the target number!',
        icon: '🧮',
        difficulty: 'Medium',
        category: 'Algebra',
        requiredPoints: 800
    },
    // --- Final Unlock (Unique Gameplay) ---
    {
        id: 'geometry-builder',
        title: 'Geometry Shape Builder',
        description: 'Create shapes and learn their properties.',
        icon: '📐',
        difficulty: 'Medium',
        category: 'Geometry',
        requiredPoints: 1000
    }
];