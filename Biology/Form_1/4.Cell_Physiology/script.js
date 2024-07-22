// script.js

let questions = [
    {
        prompt: `What is the definition of cell physiology?`,
        options: [
            "The study of the physical and chemical functions of cells",
            "The study of cell shapes",
            "The study of cell reproduction",
            "The study of cell locations"
        ],
        answer: "The study of the physical and chemical functions of cells",
    },

    {
        prompt: `What is the main function of the cell membrane in relation to permeability?`,
        options: [
            "To generate energy",
            "To control the movement of substances into and out of the cell",
            "To store genetic information",
            "To support the cell structure"
        ],
        answer: "To control the movement of substances into and out of the cell",
    },

    {
        prompt: `Which process involves the movement of molecules from an area of higher concentration to an area of lower concentration?`,
        options: [
            "Active transport",
            "Osmosis",
            "Diffusion",
            "Filtration"
        ],
        answer: "Diffusion",
    },

    {
        prompt: `What is the main difference between diffusion and osmosis?`,
        options: [
            "Diffusion involves the movement of water, osmosis involves the movement of solutes",
            "Osmosis involves the movement of water, diffusion involves the movement of solutes",
            "Diffusion requires energy, osmosis does not",
            "Osmosis requires energy, diffusion does not"
        ],
        answer: "Osmosis involves the movement of water, diffusion involves the movement of solutes",
    },

    {
        prompt: `Which of the following factors can affect the rate of diffusion?`,
        options: [
            "Temperature",
            "Light intensity",
            "Sound waves",
            "Magnetic fields"
        ],
        answer: "Temperature",
    },

    {
        prompt: `What is active transport?`,
        options: [
            "The movement of molecules against their concentration gradient using energy",
            "The passive movement of molecules along their concentration gradient",
            "The movement of water across a semipermeable membrane",
            "The movement of molecules without the need for energy"
        ],
        answer: "The movement of molecules against their concentration gradient using energy",
    },

    {
        prompt: `Which experiment can be used to demonstrate osmosis?`,
        options: [
            "Using dialysis tubing filled with sugar solution in water",
            "Measuring temperature changes in a chemical reaction",
            "Observing plant growth in different light conditions",
            "Counting cell divisions under a microscope"
        ],
        answer: "Using dialysis tubing filled with sugar solution in water",
    },

    {
        prompt: `How does osmosis play a role in plant cells?`,
        options: [
            "It helps in photosynthesis",
            "It provides energy for growth",
            "It maintains turgor pressure in cells",
            "It aids in reproduction"
        ],
        answer: "It maintains turgor pressure in cells",
    },

    {
        prompt: `What is turgor pressure?`,
        options: [
            "The pressure exerted by water inside the cell against the cell wall",
            "The force that drives active transport",
            "The pressure that causes cell division",
            "The pressure that moves molecules during diffusion"
        ],
        answer: "The pressure exerted by water inside the cell against the cell wall",
    },

    {
        prompt: `What happens during plasmolysis in plant cells?`,
        options: [
            "Cells become turgid",
            "Cells gain water and swell",
            "Cells lose water and the cytoplasm shrinks away from the cell wall",
            "Cells undergo active transport"
        ],
        answer: "Cells lose water and the cytoplasm shrinks away from the cell wall",
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