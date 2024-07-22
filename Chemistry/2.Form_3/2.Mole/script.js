// script.js

let questions = [
    {
        prompt: `What is the definition of a mole in chemistry?`,
        options: [
            "The quantity of substance that contains as many entities as there are in 12 grams of carbon-12",
            "The weight of a substance in grams",
            "The volume occupied by one mole of a gas",
            "The amount of a substance that reacts with or produces one mole of hydrogen ions"
        ],
        answer: "The quantity of substance that contains as many entities as there are in 12 grams of carbon-12",
    },

    {
        prompt: `How do you convert grams to moles?`,
        options: [
            "Divide the mass by the molar mass",
            "Multiply the mass by the molar mass",
            "Add the mass to the molar mass",
            "Subtract the molar mass from the mass"
        ],
        answer: "Divide the mass by the molar mass",
    },

    {
        prompt: `What is the molar mass of water (H₂O)?`,
        options: [
            "18 g/mol",
            "16 g/mol",
            "36 g/mol",
            "8 g/mol"
        ],
        answer: "18 g/mol",
    },

    {
        prompt: `If you have 1 mole of sodium chloride (NaCl), how many grams of NaCl do you have?`,
        options: [
            "58.44 grams",
            "22.99 grams",
            "35.45 grams",
            "40.00 grams"
        ],
        answer: "58.44 grams",
    },

    {
        prompt: `Which of the following represents the empirical formula for a compound with a molar mass of 180 g/mol and a molecular formula of C₆H₁₂O₆?`,
        options: [
            "CH₂O",
            "C₆H₁₂O₆",
            "C₁₂H₂₄O₁₂",
            "CO"
        ],
        answer: "CH₂O",
    },

    {
        prompt: `How is the empirical formula different from the molecular formula?`,
        options: [
            "The empirical formula shows the simplest whole-number ratio of elements, while the molecular formula shows the actual number of atoms of each element",
            "The empirical formula is the same as the molecular formula",
            "The empirical formula shows the exact mass of each element, while the molecular formula shows the ratio",
            "The empirical formula shows the ratios of ions in a compound, while the molecular formula shows the total number of ions"
        ],
        answer: "The empirical formula shows the simplest whole-number ratio of elements, while the molecular formula shows the actual number of atoms of each element",
    },

    {
        prompt: `What is the molar volume of an ideal gas at standard temperature and pressure (STP)?`,
        options: [
            "22.4 liters",
            "1 liter",
            "10 liters",
            "32 liters"
        ],
        answer: "22.4 liters",
    },

    {
        prompt: `What is the formula used to calculate the number of moles from volume and molar concentration?`,
        options: [
            "Moles = Volume × Molar Concentration",
            "Moles = Mass / Molar Mass",
            "Moles = Volume / Molar Volume",
            "Moles = Molar Concentration / Volume"
        ],
        answer: "Moles = Volume × Molar Concentration",
    },

    {
        prompt: `If 50 grams of calcium carbonate (CaCO₃) decomposes into calcium oxide (CaO) and carbon dioxide (CO₂), what is the molar mass of calcium carbonate?`,
        options: [
            "100 g/mol",
            "50 g/mol",
            "150 g/mol",
            "200 g/mol"
        ],
        answer: "100 g/mol",
    },

    {
        prompt: `What is the purpose of using the mole in chemical equations?`,
        options: [
            "To relate the amount of substances involved in a chemical reaction",
            "To calculate the density of gases",
            "To determine the color changes in a reaction",
            "To measure the temperature of the reaction"
        ],
        answer: "To relate the amount of substances involved in a chemical reaction",
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