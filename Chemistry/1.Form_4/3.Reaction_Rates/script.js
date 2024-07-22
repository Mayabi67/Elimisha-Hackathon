// script.js

let questions = [
    {
        prompt: `What is the rate of reaction?`,
        options: [
            "The speed at which reactants are converted into products",
            "The time it takes for a reaction to reach equilibrium",
            "The amount of energy needed to start a reaction",
            "The quantity of reactants used in a reaction"
        ],
        answer: "The speed at which reactants are converted into products",
    },

    {
        prompt: `What does collision theory state about chemical reactions?`,
        options: [
            "Chemical reactions occur when reactant particles collide with sufficient energy",
            "Chemical reactions occur only at high temperatures",
            "Chemical reactions occur when particles are in contact but do not need energy",
            "Chemical reactions occur when particles move slowly"
        ],
        answer: "Chemical reactions occur when reactant particles collide with sufficient energy",
    },

    {
        prompt: `How does increasing the concentration of reactants affect the rate of reaction?`,
        options: [
            "It increases the rate of reaction by providing more particles to collide",
            "It decreases the rate of reaction by reducing particle collisions",
            "It has no effect on the rate of reaction",
            "It makes the reaction reach equilibrium faster"
        ],
        answer: "It increases the rate of reaction by providing more particles to collide",
    },

    {
        prompt: `What is the effect of increasing temperature on the rate of a reaction?`,
        options: [
            "It increases the rate of reaction by providing more energy to the particles",
            "It decreases the rate of reaction by reducing particle energy",
            "It has no effect on the reaction rate",
            "It makes the reaction less likely to occur"
        ],
        answer: "It increases the rate of reaction by providing more energy to the particles",
    },

    {
        prompt: `What is meant by equilibrium in a reversible reaction?`,
        options: [
            "The state where the rate of the forward reaction equals the rate of the reverse reaction",
            "The state where all reactants are converted to products",
            "The state where no reaction occurs",
            "The state where the reaction stops completely"
        ],
        answer: "The state where the rate of the forward reaction equals the rate of the reverse reaction",
    },

    {
        prompt: `What does Le Chatelier's Principle state about equilibrium?`,
        options: [
            "If a dynamic equilibrium is disturbed, the system will adjust to counteract the disturbance",
            "Equilibrium can only be achieved if the reaction is completed",
            "The equilibrium position does not change with external changes",
            "Equilibrium can be achieved only in a closed system"
        ],
        answer: "If a dynamic equilibrium is disturbed, the system will adjust to counteract the disturbance",
    },

    {
        prompt: `How is the Haber process used in industry?`,
        options: [
            "To produce ammonia from nitrogen and hydrogen",
            "To produce sulfuric acid from sulfur dioxide and oxygen",
            "To produce methane from carbon dioxide and hydrogen",
            "To produce ethylene from ethane"
        ],
        answer: "To produce ammonia from nitrogen and hydrogen",
    },

    {
        prompt: `What is the main purpose of the Contact Process in industry?`,
        options: [
            "To produce sulfuric acid from sulfur dioxide and oxygen",
            "To produce ammonia from nitrogen and hydrogen",
            "To produce nitric acid from nitrogen oxides",
            "To produce hydrochloric acid from hydrogen chloride and water"
        ],
        answer: "To produce sulfuric acid from sulfur dioxide and oxygen",
    },

    {
        prompt: `What effect does increasing pressure have on the rate of a reaction involving gases?`,
        options: [
            "It increases the rate of reaction by increasing the frequency of collisions",
            "It decreases the rate of reaction by reducing the space for collisions",
            "It has no effect on the reaction rate",
            "It makes the reaction slower by decreasing particle movement"
        ],
        answer: "It increases the rate of reaction by increasing the frequency of collisions",
    },

    {
        prompt: `What happens to the equilibrium position if you add more reactants to a system at equilibrium?`,
        options: [
            "The equilibrium position shifts to favor the formation of more products",
            "The equilibrium position shifts to favor the reactants",
            "The equilibrium position does not change",
            "The reaction rate decreases"
        ],
        answer: "The equilibrium position shifts to favor the formation of more products",
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