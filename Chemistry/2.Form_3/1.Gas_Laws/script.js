// script.js

let questions = [
    {
        prompt: `What does Boyle's Law state about the relationship between pressure and volume of a gas?`,
        options: [
            "Pressure is directly proportional to volume",
            "Pressure is inversely proportional to volume",
            "Volume is directly proportional to temperature",
            "Pressure is independent of volume"
        ],
        answer: "Pressure is inversely proportional to volume",
    },

    {
        prompt: `According to Charles' Law, what happens to the volume of a gas when its temperature increases at constant pressure?`,
        options: [
            "Volume decreases",
            "Volume increases",
            "Volume remains the same",
            "Volume fluctuates unpredictably"
        ],
        answer: "Volume increases",
    },

    {
        prompt: `Which of the following equations represents the combined gas law?`,
        options: [
            "PV = k",
            "V/T = k",
            "PV/T = k",
            "P = V/T"
        ],
        answer: "PV/T = k",
    },

    {
        prompt: `If the volume of a gas is doubled while keeping the temperature constant, what happens to the pressure according to Boyle's Law?`,
        options: [
            "Pressure doubles",
            "Pressure halves",
            "Pressure remains the same",
            "Pressure increases by four times"
        ],
        answer: "Pressure halves",
    },

    {
        prompt: `Which gas law is represented by the equation P1V1/T1 = P2V2/T2?`,
        options: [
            "Boyle's Law",
            "Charles' Law",
            "Avogadro's Law",
            "Combined Gas Law"
        ],
        answer: "Combined Gas Law",
    },

    {
        prompt: `In Charles' Law, if the temperature of a gas is halved at constant pressure, what happens to the volume?`,
        options: [
            "Volume is halved",
            "Volume is doubled",
            "Volume remains unchanged",
            "Volume quadruples"
        ],
        answer: "Volume is halved",
    },

    {
        prompt: `If the pressure of a gas is increased while the volume and temperature are held constant, what will happen to the gas according to the gas laws?`,
        options: [
            "The gas will expand",
            "The gas will contract",
            "The volume will increase",
            "The temperature will decrease"
        ],
        answer: "The gas will contract",
    },

    {
        prompt: `Which of the following conditions are required to apply the gas laws correctly?`,
        options: [
            "The gas must be ideal",
            "The gas must be real",
            "The gas must be at high temperature",
            "The gas must be at low pressure"
        ],
        answer: "The gas must be ideal",
    },

    {
        prompt: `What will be the effect on the volume of a gas if its temperature is increased from 273 K to 373 K at constant pressure?`,
        options: [
            "The volume will increase",
            "The volume will decrease",
            "The volume will remain constant",
            "The volume will double"
        ],
        answer: "The volume will increase",
    },

    {
        prompt: `Which gas law is used to calculate changes in volume when temperature changes at constant pressure?`,
        options: [
            "Boyle's Law",
            "Charles' Law",
            "Ideal Gas Law",
            "Avogadro's Law"
        ],
        answer: "Charles' Law",
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