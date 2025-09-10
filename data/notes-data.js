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
        chaptersCount: 24,
        notesCount: 60,
        difficulty: "Hard",
        isComingSoon: false
    },
    {
        classNumber: 9,
        title: "Class 9 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 24,
        notesCount: 60,
        difficulty: "Medium",
        isComingSoon: false
    },
    {
        classNumber: 8,
        title: "Class 8 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 24,
        notesCount: 60,
        difficulty: "Medium",
        isComingSoon: false
    },
    {
        classNumber: 7,
        title: "NMMS",
        description: "Preparing for advanced mathematics",
        chaptersCount: 24,
        notesCount: 60,
        difficulty: "Medium",
        isComingSoon: true
    },
    {
        classNumber: 7,
        title: "Class 7 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 24,
        notesCount: 60,
        difficulty: "Medium",
        isComingSoon: true
    },
    {
        classNumber: 6,
        title: "Class 6 Mathematics",
        description: "Preparing for advanced mathematics",
        chaptersCount: 24,
        notesCount: 60,
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
            title: "REAL NUMBERS",
            description: "Notes on real numbers.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1x9OmFXcOqWVFGy8dJxmfuXywbpqHO6z0/view?usp=drive_link',
            topics: ["Real Numbers"]
        },
        {
            id: "ch2",
            title: "SETS",
            description: "Notes on sets.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1i0SBYqE55xJbNCg9-4RXUwFcHmA3eYFs/view?usp=drive_link',
            topics: ["Sets"]
        },
        {
            id: "ch3",
            title: "POLYNOMIALS",
            description: "Notes on polynomials.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1ncwHDSBK2fNHWRXZH-hUVByFX1bPrEFO/view?usp=drive_link',
            topics: ["Polynomials", "Algebra"]
        },
        {
            id: "ch4",
            title: "PAIR OF LINEAR EQUATIONS IN TWO VARIABLES",
            description: "Notes on linear equations.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1yClU3733fRvAi-DvCpo33l77Peg6crBU/view?usp=drive_link',
            topics: ["Linear Equations", "Algebra"]
        },
        {
            id: "ch5",
            title: "QUADRATIC EQUATIONS",
            description: "Notes on quadratic equations.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1StTeadV7Co8amQBS-7iiwk9VPPH3HHXA/view?usp=drive_link',
            topics: ["Quadratic Equations", "Algebra"]
        },
        {
            id: "ch6",
            title: "PROGRESSIONS",
            description: "Notes on progressions.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1YHLAKOSn33HsvO8bDhZU2kqzQowTCar7/view?usp=drive_link',
            topics: ["Progressions", "Sequences"]
        },
        {
            id: "ch7",
            title: "COORDINATE GEOMETRY",
            description: "Notes on coordinate geometry.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1bYAYhXu5bCr2XeQdaf7HSuLsErRtX5gm/view?usp=sharing',
            topics: ["Coordinate Geometry", "Geometry"]
        },
        {
            id: "ch8",
            title: "SIMILAR TRIANGLES",
            description: "Notes on similar triangles.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/17OT-Hn-krP5jGvBj4I1KfP221fOOxuUx/view?usp=sharing',
            topics: ["Similar Triangles", "Geometry"]
        },
        {
            id: "ch9",
            title: "TANGENTS AND SECANTS TO A CIRCLE",
            description: "Notes on tangents and secants.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1ULdxh366H4TSAsjrmO_m5X9mnZX0MAA9/view?usp=drive_link',
            topics: ["Tangents", "Secants", "Circles", "Geometry"]
        },
        {
            id: "ch10",
            title: "MENSURATION",
            description: "Notes on mensuration.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1JWI6LRO3kmVHbeMkAhJDmzkVUOq3TLLZ/view?usp=drive_link',
            topics: ["Mensuration", "Geometry"]
        },
        {
            id: "ch11",
            title: "TRIGONOMETRY",
            description: "Notes on trigonometry.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1p-5F7SdKIYFdA2xE8cH91xZaqTNAXSaM/view?usp=drive_link',
            topics: ["Trigonometry"]
        },
        {
            id: "ch12",
            title: "APPLICATIONS OF TRIGONOMETRY",
            description: "Notes on applications of trigonometry.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1sg059EGOOcJTNmi_tjrbakGENpgfdeVZ/view?usp=drive_link',
            topics: ["Trigonometry", "Applications"]
        },
        {
            id: "ch13",
            title: "PROBABILITY",
            description: "Notes on probability.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1Edsu_QyM7KBR4OaiBeKf1K2mNf7PVMSM/view?usp=drive_link',
            topics: ["Probability"]
        },
        {
            id: "ch14",
            title: "STATISTICS",
            description: "Notes on statistics.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1HAFMynkXpGAeb0Ra8WYYWPKACTp0Rgfm/view?usp=drive_link',
            topics: ["Statistics"]
        }
    ],
    9: [
        {
            id: "ch1",
            title: "Real Numbers",
            description: "Notes on real numbers.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1YMraBqiWj_Byhp4MO7bO4G3VNm60wZxp/view?usp=drive_link',
            topics: ["Real Numbers"]
        },
        {
            id: "ch2",
            title: "Polynomials and Factorization",
            description: "Notes on polynomials and factorization.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1IUtFppjEd4pYqMvGILCcic2JxXjYyIfb/view?usp=drive_link',
            topics: ["Polynomials", "Factorization", "Algebra"]
        },
        {
            id: "ch3",
            title: "Elements of Geometry",
            description: "Notes on the elements of geometry.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1ZgRKQfFxojHdym0wi0YaYTDZtp4yKdSg/view?usp=drive_link',
            topics: ["Geometry"]
        },
        {
            id: "ch4",
            title: "Co-Ordinate Geometry",
            description: "Notes on co-ordinate geometry.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1PL0CHCnzIuldgFLyXBJJ2WO69UP9Q-rw/view?usp=drive_link',
            topics: ["Co-ordinate Geometry", "Geometry"]
        },
        {
            id: "ch5",
            title: "Linear equations in two variables",
            description: "Notes on linear equations in two variables.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1zTbnKA4ad-SiZRoFDmcZlOffVj_iJO5r/view?usp=drive_link',
            topics: ["Linear Equations", "Algebra"]
        },
        {
            id: "ch6",
            title: "Triangles",
            description: "Notes on triangles.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1IlGrZXj7z0Fd1LrwpzQFsclw8uNPRGf_/view?usp=drive_link',
            topics: ["Triangles", "Geometry"]
        },
        {
            id: "ch7",
            title: "Quadrilaterals",
            description: "Notes on quadrilaterals.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1SGEHDwZw12DPiSrV3HlRgi9Gr4Nbad_b/view?usp=drive_link',
            topics: ["Quadrilaterals", "Geometry"]
        },
        {
            id: "ch8",
            title: "Statistics",
            description: "Notes on statistics.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1gGetbI-VEq5_XnPvuTN9MtVPWXU5puS9/view?usp=drive_link',
            topics: ["Statistics"]
        },
        {
            id: "ch9",
            title: "Surface areas and volumes",
            description: "Notes on surface areas and volumes.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1AyFeXyvDeYHIkRfjlB_nj9tkMNunqPEL/view?usp=drive_link',
            topics: ["Surface Areas", "Volumes", "Mensuration"]
        },
        {
            id: "ch10",
            title: "Areas",
            description: "Notes on areas.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/14tB5oXeKiZptTjtog0hzk2jgX8M9LBZo/view?usp=drive_link',
            topics: ["Areas", "Mensuration"]
        },
        {
            id: "ch11",
            title: "Circles",
            description: "Notes on circles.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1UEVzld63YRUwXNOq6FRh2itGBwCNwfqc/view?usp=drive_link',
            topics: ["Circles", "Geometry"]
        },
        {
            id: "ch12",
            title: "Geometrical Construtions",
            description: "Notes on geometrical construtions.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1mjdne08Nxc9m_JCRgR0Y7HNAa6b1-3k7/view?usp=drive_link',
            topics: ["Geometrical Construtions", "Geometry"]
        },
        {
            id: "ch13",
            title: "Probability",
            description: "Notes on probability.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1fiWJzyqO1SJY2ZvLYDTPiiMi1-umpIah/view?usp=drive_link',
            topics: ["Probability"]
        }
    ],
    8: [
        {
            id: "ch1",
            title: "Rational numbers",
            description: "Notes on rational numbers.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1VgjY2VLLtVOX_rvwBSF6v9RcKqEgy_Iu/view?usp=drive_link',
            topics: ["Rational Numbers"]
        },
        {
            id: "ch2",
            title: "Linear equations in one variable",
            description: "Notes on linear equations in one variable.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1SzB1kDIHXYhkFh9z3BmZA-VH7xrEEIS3/view?usp=drive_link',
            topics: ["Linear Equations", "Algebra"]
        },
        {
            id: "ch3",
            title: "CONSTRUCTION OF QUADRILATERALS",
            description: "Notes on construction of quadrilaterals.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1QIrHAiHyORQph9cIp6RuglA_sImRfhKT/view?usp=drive_link',
            topics: ["Quadrilaterals", "Geometry", "Construction"]
        },
        {
            id: "ch4",
            title: "EXPONENTS AND POWERS",
            description: "Notes on exponents and powers.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1J4JOtZJWz4lSNk6kPzoO9c1wCrS1ywrt/view?usp=drive_link',
            topics: ["Exponents", "Powers"]
        },
        {
            id: "ch5",
            title: "COMPARING QUANTITIES USING PROPORTION",
            description: "Notes on comparing quantities using proportion.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1mKuul5X9_kIj-aR8pzq60oH3uutC5SRs/view?usp=drive_link',
            topics: ["Ratio", "Proportion"]
        },
        {
            id: "ch6",
            title: "SQUARE ROOTS AND CUBE ROOTS",
            description: "Notes on square roots and cube roots.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1mTzjbGGkWdUvLju2bqjFYFYZVm2D1qzt/view?usp=drive_link',
            topics: ["Square Roots", "Cube Roots"]
        },
        {
            id: "ch7",
            title: "FREQUENCY DISTRIBUTIONS AND TABLES",
            description: "Notes on frequency distributions and tables.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1ZGYr4r2ZGDRAcPJSn3kkkQJIeqGQFvke/view?usp=drive_link',
            topics: ["Statistics", "Frequency"]
        },
        {
            id: "ch8",
            title: "EXPLORATION OF GEOMETRIC FIGURES",
            description: "Notes on exploration of geometric figures.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1-LXiClATgLSYjt5mTvV6mzKqZ5qqi8vp/view?usp=drive_link',
            topics: ["Geometry"]
        },
        {
            id: "ch9",
            title: "AREAS OF PLANE FIGURES",
            description: "Notes on areas of plane figures.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1iPBZy5dsQpVwxhdtkPrmt5C8NtmJ9Wws/view?usp=drive_link',
            topics: ["Areas", "Mensuration"]
        },
        {
            id: "ch10",
            title: "DIRECT AND INVERSE PROPORTIONS",
            description: "Notes on direct and inverse proportions.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/14fWggC6MvAtKJmaNbkGMnqib6PTiDlOP/view?usp=drive_link',
            topics: ["Ratio", "Proportion"]
        },
        {
            id: "ch11",
            title: "ALGEBRAIC EXPRESSIONS",
            description: "Notes on algebraic expressions.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1ynswBEjwwyOi9zcI0D7HJicYUscVqgTC/view?usp=drive_link',
            topics: ["Algebraic Expressions", "Algebra"]
        },
        {
            id: "ch12",
            title: "FACTORIZATION",
            description: "Notes on factorization.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1H5EuLBE1i9o-MDZb9Y7fXiXDtgv6ObFT/view?usp=drive_link',
            topics: ["Factorization", "Algebra"]
        },
        {
            id: "ch13",
            title: "Visualizing 3-D in 2-D",
            description: "Notes on visualizing 3-D in 2-D.",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1KxneG7H0JMJj74Btx9hdAeGtjpFBxeLI/view?usp=drive_link',
            topics: ["3D", "2D", "Visualization"]
        },
        {
            id: "ch14",
            title: "SURFACE AREA AND VOLUME (CUBE-CUBOID)",
            description: "Notes on surface area and volume (cube-cuboid).",
            points: 50,
            notesUrl: 'https://drive.google.com/file/d/1tG-hpgYDVyir2Phn3g24HrUIbGjdqtZo/view?usp=drive_link',
            topics: ["Surface Area", "Volume", "Mensuration"]
        }
    ]
};