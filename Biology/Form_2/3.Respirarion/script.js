// script.js

let questions = [
    {
        prompt: `What is the significance of respiration in living organisms?`,
        options: [
            "It produces food through photosynthesis",
            "It generates energy for cellular processes by breaking down glucose",
            "It helps in the elimination of waste products",
            "It stores genetic information"
        ],
        answer: "It generates energy for cellular processes by breaking down glucose",
    },

    {
        prompt: `Which of the following statements correctly distinguishes between aerobic and anaerobic respiration?`,
        options: [
            "Aerobic respiration occurs in the absence of oxygen, while anaerobic respiration requires oxygen",
            "Aerobic respiration requires oxygen, while anaerobic respiration occurs without oxygen",
            "Both aerobic and anaerobic respiration require oxygen",
            "Neither aerobic nor anaerobic respiration requires oxygen"
        ],
        answer: "Aerobic respiration requires oxygen, while anaerobic respiration occurs without oxygen",
    },

    {
        prompt: `Which of the following is an example of anaerobic respiration in industry?`,
        options: [
            "Brewing beer",
            "Photosynthesis in plants",
            "Respiration in mammals",
            "Oxygen production in plants"
        ],
        answer: "Brewing beer",
    },

    {
        prompt: `Which product is commonly made using anaerobic respiration at home?`,
        options: [
            "Cheese",
            "Wine",
            "Bread",
            "Butter"
        ],
        answer: "Bread",
    },

    {
        prompt: `How can you demonstrate that respiration takes place in plants using an experiment?`,
        options: [
            "Place a plant in a dark environment and measure oxygen levels",
            "Place a plant in water and observe oxygen bubbles",
            "Use a respirometer to measure carbon dioxide production",
            "Expose a plant to sunlight and measure glucose production"
        ],
        answer: "Use a respirometer to measure carbon dioxide production",
    },

    {
        prompt: `What is one way to show that respiration takes place in animals?`,
        options: [
            "Measure the amount of water absorbed",
            "Measure the amount of carbon dioxide exhaled",
            "Observe changes in light absorption",
            "Monitor the production of glucose"
        ],
        answer: "Measure the amount of carbon dioxide exhaled",
    },

    {
        prompt: `What is a key product of anaerobic respiration in muscles during strenuous exercise?`,
        options: [
            "Oxygen",
            "Lactic acid",
            "Ethanol",
            "Glucose"
        ],
        answer: "Lactic acid",
    },

    {
        prompt: `Which gas is a byproduct of aerobic respiration?`,
        options: [
            "Carbon dioxide",
            "Oxygen",
            "Nitrogen",
            "Methane"
        ],
        answer: "Carbon dioxide",
    },

    {
        prompt: `Why is anaerobic respiration economically important in the baking industry?`,
        options: [
            "It produces glucose for the dough",
            "It generates carbon dioxide, which helps the dough rise",
            "It removes oxygen from the dough",
            "It adds flavor to the bread"
        ],
        answer: "It generates carbon dioxide, which helps the dough rise",
    },

    {
        prompt: `What is the main difference in the energy yield between aerobic and anaerobic respiration?`,
        options: [
            "Aerobic respiration produces less energy than anaerobic respiration",
            "Anaerobic respiration produces more energy than aerobic respiration",
            "Aerobic respiration produces more energy than anaerobic respiration",
            "Both aerobic and anaerobic respiration produce the same amount of energy"
        ],
        answer: "Aerobic respiration produces more energy than anaerobic respiration",
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