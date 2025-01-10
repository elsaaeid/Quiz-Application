// Quiz questions array
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Who is the founder of Microsoft?",
        options: ["Steve Jobs", "Elon Musk", "Bill Gates", "Jeff Bezos"],
        answer: "Bill Gates"
    }
];

// DOM elements
const questionContainer = document.getElementById("question-container");
const quiz = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");
const restartButton = document.getElementById("restart-btn");

// Variables
let currentQuestionIndex = 0;
let score = 0;

// Load the first question
function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Generate options dynamically
    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectAnswer(li, currentQuestion.answer));
        optionsElement.appendChild(li);
    });
}

// Initialize the quiz
loadQuestion();

// Handle answer selection
function selectAnswer(selectedOption, correctAnswer) {
    const options = optionsElement.querySelectorAll("li");
    options.forEach(option => {
        option.classList.add(option.textContent === correctAnswer ? "correct" : "incorrect");
        option.style.pointerEvents = "none"; // Disable further clicks
    });

    // Check if the selected answer is correct
    if (selectedOption.textContent === correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "#28a745";
    } else {
        feedbackElement.textContent = "Incorrect!";
        feedbackElement.style.color = "#dc3545";
    }

    nextButton.disabled = false; // Enable next button
}

// Move to the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

// Show score and end the quiz
function showScore() {
    questionContainer.classList.add("hidden");
    quiz.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreElement.textContent = score;
    totalElement.textContent = questions.length;
}

// Restart the quiz
restartButton.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    scoreContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    quiz.classList.remove("hidden");
    loadQuestion();
});

// Reset the state for the next question
function resetState() {
    nextButton.disabled = true;
    feedbackElement.textContent = "";
    optionsElement.innerHTML = ""; // Clear previous options
}
