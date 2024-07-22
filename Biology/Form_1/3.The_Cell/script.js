// script.js

let questions = [
    {
        prompt: `What is the definition of a cell?`,
        options: [
            "The smallest unit of life that can perform all life processes",
            "A large structure in the body",
            "A type of molecule",
            "A part of the digestive system"
        ],
        answer: "The smallest unit of life that can perform all life processes",
    },

    {
        prompt: `What is the primary purpose of a light microscope?`,
        options: [
            "To measure weight",
            "To observe very small objects and details",
            "To magnify celestial objects",
            "To detect sound waves"
        ],
        answer: "To observe very small objects and details",
    },

    {
        prompt: `Which part of the light microscope holds the slide in place?`,
        options: [
            "Objective lens",
            "Stage",
            "Eyepiece",
            "Coarse adjustment knob"
        ],
        answer: "Stage",
    },

    {
        prompt: `How should the light microscope be cared for?`,
        options: [
            "Keep it in direct sunlight",
            "Clean the lenses with a soft cloth and store it covered when not in use",
            "Use it with wet hands",
            "Disassemble it after every use"
        ],
        answer: "Clean the lenses with a soft cloth and store it covered when not in use",
    },

    {
        prompt: `Which cell component can be observed under both light and electron microscopes?`,
        options: [
            "Mitochondria",
            "Nucleus",
            "Ribosomes",
            "Chloroplasts"
        ],
        answer: "Nucleus",
    },

    {
        prompt: `What is a key difference between plant and animal cells?`,
        options: [
            "Plant cells have chloroplasts, animal cells do not",
            "Animal cells have cell walls, plant cells do not",
            "Plant cells have a nucleus, animal cells do not",
            "Animal cells have large vacuoles, plant cells do not"
        ],
        answer: "Plant cells have chloroplasts, animal cells do not",
    },

    {
        prompt: `Which stain is commonly used to observe plant cells under a microscope?`,
        options: [
            "Iodine solution",
            "Methylene blue",
            "Eosin",
            "Crystal violet"
        ],
        answer: "Iodine solution",
    },

    {
        prompt: `What is a common method to estimate the size of a cell under a microscope?`,
        options: [
            "Using a ruler",
            "Comparing it to a known scale on the microscope",
            "Guessing based on appearance",
            "Measuring the slide with a tape measure"
        ],
        answer: "Comparing it to a known scale on the microscope",
    },

    {
        prompt: `What is the difference between tissues and organs?`,
        options: [
            "Tissues are groups of similar cells, organs are structures composed of different tissues",
            "Tissues are found in animals, organs are found in plants",
            "Tissues perform a single function, organs perform multiple functions",
            "Tissues are larger than organs"
        ],
        answer: "Tissues are groups of similar cells, organs are structures composed of different tissues",
    },

    {
        prompt: `Which part of the light microscope is used to adjust the focus on high power?`,
        options: [
            "Coarse adjustment knob",
            "Fine adjustment knob",
            "Diaphragm",
            "Stage clips"
        ],
        answer: "Fine adjustment knob",
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