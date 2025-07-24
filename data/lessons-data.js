// data/lessons-data.js

/**
 * Contains the curriculum structure for all available classes.
 */
export const classData = [
    // ... (Class 6, 7, 8, 10 data remains unchanged)
    {
        classNumber: 9,
        title: "Class 9 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 15,
        lessonsCount: 60,
        difficulty: "Medium",
        isComingSoon: false
    },
    // ...
];

/**
 * Contains detailed chapter information for each class.
 * Each chapter can have a 'videoUrl', a 'notesUrl', both, or neither.
 */
export const chapterData = {
    9: [
        {
            id: "ch1",
            title: "Number Systems",
            description: "An introduction to real numbers, including rational and irrational numbers.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
            notesUrl: null, // No notes provided for this chapter yet
            topics: ["Real Numbers", "Rational Numbers", "Irrational Numbers"]
        },
        {
            id: "ch2",
            title: "Polynomials",
            description: "Learn about polynomial division and the remainder theorem.",
            points: 15,
            videoUrl: "https://www.youtube.com/embed/mikVsxr9iAI", // Provided Video
            notesUrl: null,
            topics: ["Division Algorithm", "Remainder Theorem", "Factorization"]
        },
        {
            id: "ch3",
            title: "Co-ordinate Geometry",
            description: "Understand the Cartesian plane and how to plot points.",
            points: 10,
            videoUrl: null, // No video, will show "Coming Soon"
            notesUrl: "https://drive.google.com/file/d/1gw2tVZzC6oMV6kn_kx-2rS5GRF6woZPk/view?usp=drive_link",
            topics: ["Cartesian System", "Plotting Points", "Quadrants"]
        },
        {
            id: "ch4",
            title: "Quadrilaterals",
            description: "Explore the properties of different types of quadrilaterals.",
            points: 15,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/1k5K5AqG8FJHAZKiOA23Ng0UpB2mWYrUF/view?usp=drive_link",
            topics: ["Parallelogram", "Rhombus", "Trapezium", "Properties"]
        },
        {
            id: "ch5",
            title: "Areas of Parallelograms & Triangles",
            description: "Learn theorems related to the areas of parallelograms and triangles.",
            points: 15,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/131sDzLC8OsROygsJ1eE5jrudFkavleZQ/view?usp=drive_link",
            topics: ["Figures on Same Base", "Area Theorems", "Calculations"]
        },
        {
            id: "ch6",
            title: "Circles",
            description: "A comprehensive look at circles and their related terms and theorems.",
            points: 20,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/1r39qNIIovhm1pu8UM3QrxntfDRymtbBa/view?usp=drive_link",
            topics: ["Chords", "Arcs", "Cyclic Quadrilaterals", "Tangents"]
        },
        {
            id: "ch7",
            title: "Triangles",
            description: "A deep dive into the properties and congruence of triangles.",
            points: 20,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/1N2A5FzO6hGDzZyv-FUz3O4aI3ZE5lMTz/view?usp=drive_link",
            topics: ["Congruence Rules", "Inequalities in a Triangle", "Properties"]
        },
        {
            id: "ch8",
            title: "Similar Triangles (Exercise 8.2)",
            description: "Work through Exercise 8.2 on similar triangles with video and notes.",
            points: 25,
            videoUrl: "https://www.youtube.com/embed/raC2aiw-7Ms",
            notesUrl: "https://drive.google.com/file/d/19npeZbKnEKgHHh-6OI16n0kmVH2woRvU/view?usp=drive_link",
            topics: ["Similarity Criteria", "Problem Solving", "Exercise 8.2"]
        }
    ],
    10: [
        // Your Class 10 data would go here
    ]
};