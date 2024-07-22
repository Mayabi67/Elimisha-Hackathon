// script.js

let questions = [
    {
        prompt: `What occurs in a redox reaction?`,
        options: [
            "Transfer of electrons between substances",
            "Transfer of protons between substances",
            "Transfer of neutrons between substances",
            "Formation of ionic bonds"
        ],
        answer: "Transfer of electrons between substances",
    },

    {
        prompt: `How is the oxidation number of an element determined?`,
        options: [
            "By assigning values based on electron transfer in compounds",
            "By calculating the number of protons in the nucleus",
            "By measuring the element's mass in a reaction",
            "By determining the element's atomic number"
        ],
        answer: "By assigning values based on electron transfer in compounds",
    },

    {
        prompt: `In the redox reaction of iron (II) with chlorine, what is the oxidation number change for iron?`,
        options: [
            "Iron changes from +2 to +3",
            "Iron changes from 0 to +2",
            "Iron changes from +3 to 0",
            "Iron remains unchanged"
        ],
        answer: "Iron changes from +2 to +3",
    },

    {
        prompt: `What is the reducing power of a substance?`,
        options: [
            "The ability to donate electrons to other substances",
            "The ability to accept electrons from other substances",
            "The ability to form ionic bonds",
            "The ability to release protons"
        ],
        answer: "The ability to donate electrons to other substances",
    },

    {
        prompt: `Which of the following has the highest oxidizing power?`,
        options: [
            "Fluorine",
            "Iodine",
            "Chlorine",
            "Bromine"
        ],
        answer: "Fluorine",
    },

    {
        prompt: `In a zinc-copper electrochemical cell, which direction does the electron flow?`,
        options: [
            "From zinc to copper through the external circuit",
            "From copper to zinc through the external circuit",
            "From zinc to copper through the electrolyte",
            "From copper to zinc through the electrolyte"
        ],
        answer: "From zinc to copper through the external circuit",
    },

    {
        prompt: `What do standard electrode potentials indicate?`,
        options: [
            "The tendency of a half-cell to gain or lose electrons",
            "The concentration of ions in a solution",
            "The temperature of the reaction",
            "The speed of the reaction"
        ],
        answer: "The tendency of a half-cell to gain or lose electrons",
    },

    {
        prompt: `What is the role of water in electrolysis?`,
        options: [
            "Water serves as a medium for ion movement and can be split into hydrogen and oxygen",
            "Water acts as a catalyst for the reaction",
            "Water absorbs excess heat from the reaction",
            "Water provides a source of carbon dioxide for the reaction"
        ],
        answer: "Water serves as a medium for ion movement and can be split into hydrogen and oxygen",
    },

    {
        prompt: `What determines preferential discharge in electrolysis?`,
        options: [
            "The relative concentration of ions in the electrolyte and the electrode potential",
            "The temperature of the electrolyte",
            "The pH of the electrolyte",
            "The physical size of the electrodes"
        ],
        answer: "The relative concentration of ions in the electrolyte and the electrode potential",
    },

    {
        prompt: `Which process is used for extracting metals from their ores?`,
        options: [
            "Electrolysis",
            "Condensation",
            "Filtration",
            "Distillation"
        ],
        answer: "Electrolysis",
    },

    {
        prompt: `What is electroplating used for?`,
        options: [
            "To deposit a layer of metal onto a surface for protection or decoration",
            "To separate different metal components from a mixture",
            "To remove impurities from a metal ore",
            "To increase the melting point of metals"
        ],
        answer: "To deposit a layer of metal onto a surface for protection or decoration",
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