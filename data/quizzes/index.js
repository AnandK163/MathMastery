// data/quizzes/index.js
// This file acts as a master list for all available quizzes.
// To add a new quiz:
// 1. Create a new file in this directory (e.g., 'classX-chY.js').
// 2. Import it below (e.g., `import { quiz as classXchY } from './classX-chY.js';`).
// 3. Add the imported quiz to the correct class array in the `allQuizzes` object.

// Import quizzes for Class 9
import { quiz as class9ch1 } from './class9-ch1.js';
import { quiz as class9ch2 } from './class9-ch2.js';

// Import quizzes for Class 10
import { quiz as class10ch1 } from './class10-ch1.js';
import { quiz as class10ch2 } from './class10-ch2.js';

// ...import other quiz files here...

// Aggregate all quizzes into a single, structured object.
export const allQuizzes = {
    // We can add quizzes for classes 6, 7, 8 here when they are ready
    6: [], 
    7: [],
    8: [],
    9: [
        class9ch1,
        class9ch2
    ],
    10: [
        class10ch1,
        class10ch2
    ]
    // ...add other imported quizzes to their respective class arrays...
};