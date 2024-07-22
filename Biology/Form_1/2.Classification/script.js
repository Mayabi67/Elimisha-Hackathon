// script.js

let questions = [
    {
        prompt: `What tool can be used to observe the external features of plants and animals closely?`,
        options: [
            "Telescope",
            "Microscope",
            "Magnifying lens",
            "Binoculars"
        ],
        answer: "Magnifying lens",
    },

    {
        prompt: `Which of the following is an important step when recording observations of living organisms?`,
        options: [
            "Ignoring small details",
            "Making sketches and notes of the main external characteristics",
            "Changing the environment of the specimen",
            "Guessing the characteristics without observation"
        ],
        answer: "Making sketches and notes of the main external characteristics",
    },

    {
        prompt: `Why is classification of living organisms necessary?`,
        options: [
            "To confuse scientists",
            "To organize living organisms into groups for easier study and identification",
            "To create more names for organisms",
            "To make it harder to study biology"
        ],
        answer: "To organize living organisms into groups for easier study and identification",
    },

    {
        prompt: `Which of the following is a major unit of classification in biology?`,
        options: [
            "Color",
            "Size",
            "Genus",
            "Weight"
        ],
        answer: "Genus",
    },

    {
        prompt: `What is the system called that uses two names to identify organisms?`,
        options: [
            "Trinomial nomenclature",
            "Monomial nomenclature",
            "Binomial nomenclature",
            "Polynomial nomenclature"
        ],
        answer: "Binomial nomenclature",
    },

    {
        prompt: `When using a magnifying lens, what is the best way to observe the external features of a specimen?`,
        options: [
            "Look from a distance",
            "Hold the lens steady and move the specimen slowly",
            "Shake the lens and specimen",
            "Use only natural light"
        ],
        answer: "Hold the lens steady and move the specimen slowly",
    },

    {
        prompt: `What should be included when recording observations of preserved specimens?`,
        options: [
            "Only the color",
            "A detailed description of the main external characteristics",
            "Only the size",
            "A rough estimate of weight"
        ],
        answer: "A detailed description of the main external characteristics",
    },

    {
        prompt: `What is the significance of using Binomial nomenclature in naming organisms?`,
        options: [
            "To provide a unique and universally accepted name for each species",
            "To give each organism multiple names",
            "To complicate the study of organisms",
            "To describe the organism's habitat"
        ],
        answer: "To provide a unique and universally accepted name for each species",
    },

    {
        prompt: `Which major unit of classification comes after "Kingdom"?`,
        options: [
            "Phylum",
            "Genus",
            "Species",
            "Order"
        ],
        answer: "Phylum",
    },

    {
        prompt: `What does the first part of a scientific name in Binomial nomenclature represent?`,
        options: [
            "Species",
            "Genus",
            "Family",
            "Class"
        ],
        answer: "Genus",
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