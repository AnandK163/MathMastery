// data/lessons-data.js

/**
 * Contains the curriculum structure for all available classes.
 */
export const classData = [
    // ... (Class 6, 7, 8, 10 data remains unchanged)
    {
        classNumber: 10,
        title: "Class 10 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 15,
        lessonsCount: 60,
        difficulty: "Hard",
        isComingSoon: false
    },
    {
        classNumber: 9,
        title: "Class 9 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 15,
        lessonsCount: 60,
        difficulty: "Medium",
        isComingSoon: false
    },
    {
        classNumber: 8,
        title: "Class 8 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 15,
        lessonsCount: 60,
        difficulty: "Medium",
        isComingSoon: false
    },
    {
        classNumber: 7,
        title: "NMMS",
        description: "Preparing for advanced mathematics",
        chaptersCount: 15,
        lessonsCount: 60,
        difficulty: "Medium",
        isComingSoon: true
    },
    {
        classNumber: 7,
        title: "Class 7 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 15,
        lessonsCount: 60,
        difficulty: "Medium",
        isComingSoon: true
    },
    {
        classNumber: 6,
        title: "Class 6 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 15,
        lessonsCount: 60,
        difficulty: "Hard",
        isComingSoon: true
    },
    // ...
];

/**
 * Contains detailed chapter information for each class.
 * Each chapter can have a 'videoUrl', a 'notesUrl', both, or neither.
 */
export const chapterData = {
    10: [
        {
            id: "ch1",
            title: "Real Numbers (Part 1)",
            description: "Understanding the basics of real numbers and their properties.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/jKKpNc5hhNs",
            notesUrl: null,
            topics: ["Real Numbers"]
        },
        {
            id: "ch2",
            title: "Real Numbers (Part 2)",
            description: "Continuing with real numbers: divisions, HCF and LCM.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/fsS-39Nv17A",
            notesUrl: null,
            topics: ["Real Numbers"]
        },
        {
            id: "ch3",
            title: "Real Numbers (Part 3)",
            description: "Explore Euclid’s division lemma and applications.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/GJzohSJvlqw",
            notesUrl: null,
            topics: ["Real Numbers"]
        },
        {
            id: "ch4",
            title: "Real Numbers (Part 4)",
            description: "Learn more on irrational numbers and decimal expansions.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/YN9M3OGQPi0",
            notesUrl: null,
            topics: ["Real Numbers"]
        },
        {
            id: "ch5",
            title: "Real Numbers (Part 5)",
            description: "More examples and exercises on real numbers.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/nsXcOpKmbh8",
            notesUrl: null,
            topics: ["Real Numbers"]
        },
        {
            id: "ch6",
            title: "Real Numbers (Part 6)",
            description: "Wrapping up real numbers with key theorems and tricks.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/ohmeRsYLhXU",
            notesUrl: null,
            topics: ["Real Numbers"]
        },
        {
            id: "ch7",
            title: "Sets (Part 1)",
            description: "Introduction to sets, types, and representations.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/veiCFEMpJjg",
            notesUrl: null,
            topics: ["Sets"]
        },
        {
            id: "ch8",
            title: "Sets (Part 2)",
            description: "Understanding subsets, power sets, and Venn diagrams.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/WadiLeLj7HM",
            notesUrl: null,
            topics: ["Sets"]
        },
        {
            id: "ch9",
            title: "Sets (Part 3)",
            description: "Set operations: union, intersection, and complements.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/bA-8Z702Au0",
            notesUrl: null,
            topics: ["Sets"]
        },
        {
            id: "ch10",
            title: "Polynomials (Part 1)",
            description: "Introduction to polynomials and degrees.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/lfKUUHQbKs8",
            notesUrl: null,
            topics: ["Polynomials"]
        },
        {
            id: "ch11",
            title: "Polynomials (Part 2)",
            description: "Polynomial identities and factorization methods.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/8ETyfwUnDak",
            notesUrl: null,
            topics: ["Polynomials"]
        },
        {
            id: "ch12",
            title: "Polynomials (Part 3)",
            description: "More problems and applications of identities.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/5eMV95iA3cI",
            notesUrl: null,
            topics: ["Polynomials"]
        },
        {
            id: "ch13",
            title: "Polynomials (Part 4)",
            description: "Revision and summary of key polynomial concepts.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/5eMV95iA3cI",
            notesUrl: null,
            topics: ["Polynomials"]
        },
        {
            id: "ch14",
            title: "Coordinate Geometry (Part 1)",
            description: "Basics of coordinate geometry and plotting points.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/Mfd9PbUUiCM",
            notesUrl: null,
            topics: ["Coordinate Geometry"]
        },
        {
            id: "ch15",
            title: "Coordinate Geometry (Part 2)",
            description: "Distance formula and section formula.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/2JLgHI1c1NQ",
            notesUrl: null,
            topics: ["Coordinate Geometry"]
        },
        {
            id: "ch16",
            title: "Similar Triangles (Part 1)",
            description: "Triangle similarity and basic theorems.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/OIYD98c_uUE",
            notesUrl: null,
            topics: ["Similar Triangles"]
        },
        {
            id: "ch17",
            title: "Similar Triangles (Part 2)",
            description: "Applying similarity criteria to solve problems.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/kAq0zCqMWvs",
            notesUrl: null,
            topics: ["Similar Triangles"]
        },
        {
            id: "ch18",
            title: "Similar Triangles (Part 3)",
            description: "Using similarity to find unknown lengths.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/VEYbsG57Lfk",
            notesUrl: null,
            topics: ["Similar Triangles"]
        },
        {
            id: "ch19",
            title: "Similar Triangles (Part 4)",
            description: "More problem-solving using triangle similarity.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/sNLhIfWtdlY",
            notesUrl: null,
            topics: ["Similar Triangles"]
        },
        {
            id: "ch20",
            title: "Similar Triangles (Part 5)",
            description: "Exercise 8.2 deep dive and concept applications.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/raC2aiw-7Ms",
            notesUrl: null,
            topics: ["Similar Triangles", "Exercise 8.2"]
        },
        {
            id: "ch21",
            title: "Trigonometry (Part 1)",
            description: "Introduction to trigonometric ratios and angles.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/InjU9ZJ1KbQ",
            notesUrl: null,
            topics: ["Trigonometry"]
        },
        {
            id: "ch22",
            title: "Trigonometry (Part 2)",
            description: "Trigonometric identities and their proofs.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/X4LbV0WUW68",
            notesUrl: null,
            topics: ["Trigonometry"]
        },
        {
            id: "ch23",
            title: "Trigonometry (Part 3)",
            description: "Problem solving using trigonometric identities.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/A5BdFlgPUr8",
            notesUrl: null,
            topics: ["Trigonometry"]
        },
        {
            id: "ch24",
            title: "Trigonometry (Part 4)",
            description: "Applications of trigonometry in real life.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/EQGQ4_ja-NI",
            notesUrl: null,
            topics: ["Trigonometry"]
        }
    ],
    9: [
            {
            id: "ch1",
            title: "Real Numbers - Part 1",
            description: "Introduction to real numbers and number systems.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/Y-n13twxdcs",
            notesUrl: null,
            topics: ["Real Numbers", "Number Line"]
        },
        {
            id: "ch2",
            title: "Real Numbers - Part 2",
            description: "Exploring properties and classifications of real numbers.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/EsYwsjOzw_o",
            notesUrl: null,
            topics: ["Properties", "Irrational Numbers"]
        },
        {
            id: "ch3",
            title: "Real Numbers - Part 3",
            description: "Understanding rational and irrational numbers with examples.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/zXN9hdeKrxI",
            notesUrl: null,
            topics: ["Rational Numbers", "Irrational Numbers"]
        },
        {
            id: "ch4",
            title: "Real Numbers - Part 4",
            description: "Problems and concepts related to real numbers.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/64uiYXjhPb0",
            notesUrl: null,
            topics: ["Applications", "Examples"]
        },
        {
            id: "ch5",
            title: "Real Numbers - Part 5",
            description: "Review and advanced problem-solving on real numbers.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/xRCrej4wtAk",
            notesUrl: null,
            topics: ["Problem Solving", "Review"]
        },
        {
            id: "ch6",
            title: "Polynomials - Part 1",
            description: "Introduction to polynomials and their basic terms.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/Rx0LxxQTw1Q",
            notesUrl: null,
            topics: ["Terms", "Degree", "Coefficients"]
        },
        {
            id: "ch7",
            title: "Polynomials - Part 2",
            description: "Addition and subtraction of polynomials.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/-QHxeK7mf_0",
            notesUrl: null,
            topics: ["Addition", "Subtraction"]
        },
        {
            id: "ch8",
            title: "Polynomials - Part 3",
            description: "Polynomial division and factorization.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/mikVsxr9iAI",
            notesUrl: null,
            topics: ["Division", "Factorization"]
        },
        {
            id: "ch9",
            title: "Polynomials - Part 4",
            description: "Special identities and problems on polynomials.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/cbM9j6TCPvE",
            notesUrl: null,
            topics: ["Identities", "Problem Solving"]
        },
        
        {
            id: "ch10",
            title: "Co-ordinate Geometry",
            description: "Understand the Cartesian plane and how to plot points.",
            points: 10,
            videoUrl: null, // No video, will show "Coming Soon"
            notesUrl: "https://drive.google.com/file/d/1gw2tVZzC6oMV6kn_kx-2rS5GRF6woZPk/view?usp=drive_link",
            topics: ["Cartesian System", "Plotting Points", "Quadrants"]
        },
        {
            id: "ch11",
            title: "Quadrilaterals",
            description: "Explore the properties of different types of quadrilaterals.",
            points: 15,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/1k5K5AqG8FJHAZKiOA23Ng0UpB2mWYrUF/view?usp=drive_link",
            topics: ["Parallelogram", "Rhombus", "Trapezium", "Properties"]
        },
        {
            id: "ch12",
            title: "Areas of Parallelograms & Triangles",
            description: "Learn theorems related to the areas of parallelograms and triangles.",
            points: 15,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/131sDzLC8OsROygsJ1eE5jrudFkavleZQ/view?usp=drive_link",
            topics: ["Figures on Same Base", "Area Theorems", "Calculations"]
        },
        {
            id: "ch13",
            title: "Circles",
            description: "A comprehensive look at circles and their related terms and theorems.",
            points: 20,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/1r39qNIIovhm1pu8UM3QrxntfDRymtbBa/view?usp=drive_link",
            topics: ["Chords", "Arcs", "Cyclic Quadrilaterals", "Tangents"]
        },
        {
            id: "ch14",
            title: "Triangles",
            description: "A deep dive into the properties and congruence of triangles.",
            points: 20,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/1N2A5FzO6hGDzZyv-FUz3O4aI3ZE5lMTz/view?usp=drive_link",
            topics: ["Congruence Rules", "Inequalities in a Triangle", "Properties"]
        },
        {
            id: "ch15",
            title: "Similar Triangles (Exercise 8.2)",
            description: "Work through Exercise 8.2 on similar triangles with video and notes.",
            points: 25,
            videoUrl: null,
            notesUrl: "https://drive.google.com/file/d/19npeZbKnEKgHHh-6OI16n0kmVH2woRvU/view?usp=drive_link",
            topics: ["Similarity Criteria", "Problem Solving", "Exercise 8.2"]
        }
    ],
    8: [
        {
            id: "ch1",
            title: "Divisibility Rules",
            description: "Understand rules for divisibility by different numbers and how to apply them in problems.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/Xj-G2afaOxI",
            notesUrl: null,
            topics: ["Divisibility", "Number Properties", "Shortcuts"]
        },
        {
            id: "ch2",
            title: "Squares and Square Roots - Part 1",
            description: "Introduction to perfect squares and finding square roots.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/6lke7zDOP3k",
            notesUrl: null,
            topics: ["Squares", "Square Roots"]
        },
        {
            id: "ch3",
            title: "Squares and Square Roots - Part 2",
            description: "Methods to find square roots using factorization.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/T5pt2-weBzg",
            notesUrl: null,
            topics: ["Square Roots", "Factorization"]
        },
        {
            id: "ch4",
            title: "Squares and Square Roots - Part 3",
            description: "Solving word problems involving squares and square roots.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/q8VKPeLJSig",
            notesUrl: null,
            topics: ["Word Problems", "Applications"]
        },
        {
            id: "ch5",
            title: "Squares and Square Roots - Part 4",
            description: "Estimation methods and practice exercises.",
            points: 10,
            videoUrl: "https://www.youtube.com/embed/_F63czEnwT4",
            notesUrl: null,
            topics: ["Estimation", "Practice"]
        }
    ],
};