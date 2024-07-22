// script.js

let questions = [
    {
        prompt: `What is the definition of transport in biological systems?`,
        options: [
            "The movement of genetic material",
            "The process of moving water, nutrients, and gases throughout an organism",
            "The process of reproduction",
            "The generation of energy in cells"
        ],
        answer: "The process of moving water, nutrients, and gases throughout an organism",
    },

    {
        prompt: `What is the main function of root hairs in plants?`,
        options: [
            "To provide support",
            "To absorb water and minerals from the soil",
            "To produce food through photosynthesis",
            "To store nutrients"
        ],
        answer: "To absorb water and minerals from the soil",
    },

    {
        prompt: `How does the structure of xylem contribute to its function?`,
        options: [
            "Xylem cells are dead and hollow, allowing efficient transport of water and minerals",
            "Xylem cells are living and flexible, aiding in the production of food",
            "Xylem cells have thick walls to support photosynthesis",
            "Xylem cells store energy for the plant"
        ],
        answer: "Xylem cells are dead and hollow, allowing efficient transport of water and minerals",
    },

    {
        prompt: `Which part of the leaf is most involved in transpiration?`,
        options: [
            "Epidermis",
            "Stomata",
            "Mesophyll",
            "Cuticle"
        ],
        answer: "Stomata",
    },

    {
        prompt: `Which force is primarily responsible for the upward movement of water in plants?`,
        options: [
            "Root pressure",
            "Capillary action",
            "Transpiration pull",
            "Gravitational pull"
        ],
        answer: "Transpiration pull",
    },

    {
        prompt: `What is the significance of transpiration in plants?`,
        options: [
            "It helps in the production of food",
            "It aids in the cooling of the plant and the movement of water and minerals",
            "It provides structural support",
            "It stores genetic information"
        ],
        answer: "It aids in the cooling of the plant and the movement of water and minerals",
    },

    {
        prompt: `Which circulatory system type involves blood circulating in vessels throughout the body?`,
        options: [
            "Open circulatory system",
            "Closed circulatory system",
            "Partial circulatory system",
            "Respiratory circulatory system"
        ],
        answer: "Closed circulatory system",
    },

    {
        prompt: `What is the function of the heart in the circulatory system?`,
        options: [
            "To store oxygen",
            "To pump blood throughout the body",
            "To digest food",
            "To filter waste from the blood"
        ],
        answer: "To pump blood throughout the body",
    },

    {
        prompt: `Which component of blood is primarily responsible for oxygen transport?`,
        options: [
            "White blood cells",
            "Platelets",
            "Red blood cells",
            "Plasma"
        ],
        answer: "Red blood cells",
    },

    {
        prompt: `Why is blood clotting important?`,
        options: [
            "It provides energy to cells",
            "It prevents excessive bleeding and helps in wound healing",
            "It aids in digestion",
            "It stores genetic information"
        ],
        answer: "It prevents excessive bleeding and helps in wound healing",
    }
];


// Get Dom Elements

let questionsEl =
    document.querySelector(
        "#questions"
    );
let timerEl =
    document.querySelector("#timer");
let choicesEl =
    document.querySelector("#options");
let submitBtn = document.querySelector(
    "#submit-score"
);
let startBtn =
    document.querySelector("#start");
let nameEl =
    document.querySelector("#name");
let feedbackEl = document.querySelector(
    "#feedback"
);
let reStartBtn =
    document.querySelector("#restart");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(
        clockTick,
        1000
    );
    timerEl.textContent = time;
    let landingScreenEl =
        document.getElementById(
            "start-screen"
        );
    landingScreenEl.setAttribute(
        "class",
        "hide"
    );
    questionsEl.removeAttribute(
        "class"
    );
    getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
    let currentQuestion =
        questions[currentQuestionIndex];
    let promptEl =
        document.getElementById(
            "question-words"
        );
    promptEl.textContent =
        currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function(choice, i) {
            let choiceBtn =
                document.createElement(
                    "button"
                );
            choiceBtn.setAttribute(
                "value",
                choice
            );
            choiceBtn.textContent =
                i + 1 + ". " + choice;
            choiceBtn.onclick =
                questionClick;
            choicesEl.appendChild(
                choiceBtn
            );
        }
    );
}

// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
    if (
        this.value !==
        questions[currentQuestionIndex]
            .answer
    ) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was 
        ${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent =
            "Correct!";
        feedbackEl.style.color =
            "green";
    }
    feedbackEl.setAttribute(
        "class",
        "feedback"
    );
    setTimeout(function() {
        feedbackEl.setAttribute(
            "class",
            "feedback hide"
        );
    }, 2000);
    currentQuestionIndex++;
    if (
        currentQuestionIndex ===
        questions.length
    ) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End quiz by hiding questions,
// Stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl =
        document.getElementById(
            "quiz-end"
        );
    endScreenEl.removeAttribute(
        "class"
    );
    let finalScoreEl =
        document.getElementById(
            "score-final"
        );
    finalScoreEl.textContent = time;
    questionsEl.setAttribute(
        "class",
        "hide"
    );
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage
// Along with users' name

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores =
            JSON.parse(
                window.localStorage.getItem(
                    "highscores"
                )
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem(
            "highscores",
            JSON.stringify(highscores)
        );
        alert(
            "Your Score has been Submitted"
        );
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;