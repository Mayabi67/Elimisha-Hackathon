// script.js

let questions = [
    {
        prompt: `Which of the following reactions is exothermic?`,
        options: [
            "Combustion of methane",
            "Photosynthesis",
            "Melting of ice",
            "Evaporation of water"
        ],
        answer: "Combustion of methane",
    },

    {
        prompt: `In an endothermic reaction, the enthalpy change (ΔH) is:`,
        options: [
            "Positive",
            "Negative",
            "Zero",
            "Cannot be determined"
        ],
        answer: "Positive",
    },

    {
        prompt: `The molar heat of fusion refers to the energy required to:`,
        options: [
            "Melt one mole of a solid",
            "Vaporize one mole of a liquid",
            "Condense one mole of a gas",
            "Freeze one mole of a liquid"
        ],
        answer: "Melt one mole of a solid",
    },

    {
        prompt: `The formation of hydrogen chloride gas from hydrogen and chlorine involves:`,
        options: [
            "Endothermic reaction",
            "Exothermic reaction",
            "No energy change",
            "Energy is absorbed and released equally"
        ],
        answer: "Exothermic reaction",
    },

    {
        prompt: `Which law states that the total enthalpy change of a reaction is the same, regardless of the route taken?`,
        options: [
            "Boyle's Law",
            "Hess's Law",
            "Charles's Law",
            "Avogadro's Law"
        ],
        answer: "Hess's Law",
    },

    {
        prompt: `When considering the heat of solution, what two energy changes must be accounted for?`,
        options: [
            "Hydration energy and lattice energy",
            "Fusion energy and vaporization energy",
            "Bond energy and kinetic energy",
            "Activation energy and reaction energy"
        ],
        answer: "Hydration energy and lattice energy",
    },

    {
        prompt: `Which fuel has the highest energy content per gram?`,
        options: [
            "Charcoal",
            "Ethanol (methylated spirit)",
            "Kerosene",
            "Diesel"
        ],
        answer: "Diesel",
    },

    {
        prompt: `What precaution should be taken when using fuels to avoid pollution?`,
        options: [
            "Burning in well-ventilated areas",
            "Using fuels in closed containers",
            "Storing fuels in warm places",
            "Using fuels near open flames"
        ],
        answer: "Burning in well-ventilated areas",
    },

    {
        prompt: `Which of the following fuels is considered the cleanest in terms of pollution?`,
        options: [
            "Diesel",
            "Kerosene",
            "Fuel oil",
            "Ethanol (methylated spirit)"
        ],
        answer: "Ethanol (methylated spirit)",
    },

    {
        prompt: `Why is it important to choose the appropriate fuel for a specific application?`,
        options: [
            "To minimize cost and maximize efficiency",
            "To maximize cost and minimize efficiency",
            "To increase pollution",
            "To reduce energy content"
        ],
        answer: "To minimize cost and maximize efficiency",
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