// script.js

let questions = [
    {
        prompt: `What is the definition of soil?`,
        options: [
            "A layer of sand covering the Earth",
            "A mixture of organic matter, minerals, gases, liquids, and organisms that together support life",
            "A pure mineral substance",
            "A type of rock formation"
        ],
        answer: "A mixture of organic matter, minerals, gases, liquids, and organisms that together support life",
    },

    {
        prompt: `Which of the following is not a component of soil?`,
        options: [
            "Minerals",
            "Organic matter",
            "Air",
            "Plastic"
        ],
        answer: "Plastic",
    },

    {
        prompt: `Which process involves the breakdown of rocks into smaller particles to form soil?`,
        options: [
            "Weathering",
            "Condensation",
            "Evaporation",
            "Precipitation"
        ],
        answer: "Weathering",
    },

    {
        prompt: `What is the term for the vertical section of soil that shows all its layers?`,
        options: [
            "Soil catena",
            "Soil horizon",
            "Soil profile",
            "Soil strata"
        ],
        answer: "Soil profile",
    },

    {
        prompt: `Which property of soil is determined by the size of its particles?`,
        options: [
            "Texture",
            "Color",
            "pH level",
            "Temperature"
        ],
        answer: "Texture",
    },

    {
        prompt: `What is soil erosion?`,
        options: [
            "The process of soil formation",
            "The gradual wearing away of topsoil by natural forces",
            "The increase in soil fertility",
            "The creation of new soil layers"
        ],
        answer: "The gradual wearing away of topsoil by natural forces",
    },

    {
        prompt: `Which type of soil degeneration is characterized by the loss of nutrients and organic matter?`,
        options: [
            "Salinization",
            "Desertification",
            "Soil erosion",
            "Soil compaction"
        ],
        answer: "Desertification",
    },

    {
        prompt: `Why is soil classification important?`,
        options: [
            "To organize soil samples alphabetically",
            "To determine the best use and management practices for different soils",
            "To identify soil colors",
            "To measure soil temperature"
        ],
        answer: "To determine the best use and management practices for different soils",
    },

    {
        prompt: `What is one significant role of soil in the environment?`,
        options: [
            "Acting as a natural reservoir for water",
            "Increasing atmospheric pollution",
            "Preventing plant growth",
            "Blocking sunlight"
        ],
        answer: "Acting as a natural reservoir for water",
    },

    {
        prompt: `Which of the following practices helps in soil conservation?`,
        options: [
            "Overgrazing",
            "Deforestation",
            "Crop rotation",
            "Urbanization"
        ],
        answer: "Crop rotation",
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