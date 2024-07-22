// script.js

let questions = [
    {
        prompt: `What is the definition of land reclamation?`,
        options: [
            "The process of converting unusable land into productive land",
            "The restoration of land to its original state",
            "The practice of clearing land for urban development",
            "The conversion of forest land into agricultural land"
        ],
        answer: "The process of converting unusable land into productive land",
    },

    {
        prompt: `What is the definition of land rehabilitation?`,
        options: [
            "The process of improving degraded land to restore its productivity",
            "The practice of converting land for industrial use",
            "The removal of pollutants from land",
            "The development of land for residential purposes"
        ],
        answer: "The process of improving degraded land to restore its productivity",
    },

    {
        prompt: `Which of the following is a significant irrigation scheme in Kenya?`,
        options: [
            "Mwea-Tebera",
            "Pekera",
            "Great Rift Valley",
            "Lake Victoria Basin"
        ],
        answer: "Mwea-Tebera",
    },

    {
        prompt: `What is a notable problem experienced in irrigation farming in Kenya?`,
        options: [
            "Waterlogging",
            "Excessive rainfall",
            "Soil erosion",
            "High cost of machinery"
        ],
        answer: "Waterlogging",
    },

    {
        prompt: `What is one of the methods of land reclamation in Kenya?`,
        options: [
            "Draining swampy areas",
            "Clearing forests",
            "Building urban centers",
            "Excavating minerals"
        ],
        answer: "Draining swampy areas",
    },

    {
        prompt: `What is the primary significance of irrigation farming in Kenya?`,
        options: [
            "Increasing agricultural productivity in arid and semi-arid regions",
            "Reducing urban sprawl",
            "Promoting industrial development",
            "Increasing forest cover"
        ],
        answer: "Increasing agricultural productivity in arid and semi-arid regions",
    },

    {
        prompt: `Which irrigation scheme is associated with the development of large-scale rice production?`,
        options: [
            "Mwea-Tebera",
            "Pekera",
            "Ahero",
            "Bunyala"
        ],
        answer: "Mwea-Tebera",
    },

    {
        prompt: `What is one method of land rehabilitation used in Kenya?`,
        options: [
            "Reforestation",
            "Urbanization",
            "Mining",
            "Industrial farming"
        ],
        answer: "Reforestation",
    },

    {
        prompt: `Which irrigation scheme focuses on the development of horticultural crops?`,
        options: [
            "Pekera",
            "Mwea-Tebera",
            "Tana Delta",
            "Kerio Valley"
        ],
        answer: "Pekera",
    },

    {
        prompt: `What is a common issue faced with land reclamation projects in Kenya?`,
        options: [
            "Soil salinization",
            "Water scarcity",
            "High soil fertility",
            "Lack of available land"
        ],
        answer: "Soil salinization",
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