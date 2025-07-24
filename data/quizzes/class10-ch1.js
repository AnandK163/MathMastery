// data/quizzes/class9-ch1.js
// Quiz data for Class 9, Chapter 1: Number Systems

export const quiz = {
    id: "ch1",
    title: "Number Systems",
    description: "Real numbers, rational and irrational numbers",
    questions: [
        {
            question: "Which of the following is an irrational number?",
            options: ["1/3", "0.25", "√2", "2/7"],
            correct: 2,
            explanation: "√2 cannot be expressed as a fraction of integers, making it irrational."
        },
        // ... add the rest of the questions for this chapter here ...
        {
            question: "What is the additive inverse of -3/7?",
            options: ["-7/3", "7/3", "3/7", "-3/7"],
            correct: 2,
            explanation: "The additive inverse of -3/7 is 3/7 because (-3/7) + (3/7) = 0"
        }
    ]
};