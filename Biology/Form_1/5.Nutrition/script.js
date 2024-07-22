// script.js

let questions = [
    {
        prompt: `What is the definition of nutrition?`,
        options: [
            "The process of respiration in living organisms",
            "The process by which living organisms obtain and use food for growth, metabolism, and repair",
            "The process of excreting waste materials from the body",
            "The process of reproduction in living organisms"
        ],
        answer: "The process by which living organisms obtain and use food for growth, metabolism, and repair",
    },

    {
        prompt: `Which of the following is an autotrophic mode of feeding?`,
        options: [
            "Herbivory",
            "Carnivory",
            "Photosynthesis",
            "Omnivory"
        ],
        answer: "Photosynthesis",
    },

    {
        prompt: `What is the importance of photosynthesis in nature?`,
        options: [
            "It helps in the breakdown of food",
            "It converts carbon dioxide and water into glucose and oxygen, providing energy for plants and oxygen for other organisms",
            "It is responsible for cell division",
            "It assists in excretion of waste"
        ],
        answer: "It converts carbon dioxide and water into glucose and oxygen, providing energy for plants and oxygen for other organisms",
    },

    {
        prompt: `How is the leaf adapted to photosynthesis?`,
        options: [
            "Thick cuticle to prevent water loss",
            "Large surface area to maximize light absorption",
            "Small size to reduce water intake",
            "Dark color to absorb more heat"
        ],
        answer: "Large surface area to maximize light absorption",
    },

    {
        prompt: `Which factor does not affect the rate of photosynthesis?`,
        options: [
            "Light intensity",
            "Carbon dioxide concentration",
            "Water availability",
            "Sound intensity"
        ],
        answer: "Sound intensity",
    },

    {
        prompt: `What is a primary difference between carbohydrates, proteins, and lipids?`,
        options: [
            "Carbohydrates store genetic information, proteins provide energy, and lipids build tissues",
            "Carbohydrates provide energy, proteins build and repair tissues, and lipids store energy",
            "Carbohydrates build tissues, proteins store energy, and lipids provide genetic information",
            "Carbohydrates provide structural support, proteins catalyze reactions, and lipids are involved in genetic expression"
        ],
        answer: "Carbohydrates provide energy, proteins build and repair tissues, and lipids store energy",
    },

    {
        prompt: `What is the role of enzymes in living organisms?`,
        options: [
            "They provide structural support to cells",
            "They act as catalysts to speed up biochemical reactions",
            "They store genetic information",
            "They transport oxygen in the blood"
        ],
        answer: "They act as catalysts to speed up biochemical reactions",
    },

    {
        prompt: `Which type of teeth are most commonly found in carnivorous mammals?`,
        options: [
            "Molars",
            "Incisors",
            "Canines",
            "Premolars"
        ],
        answer: "Canines",
    },

    {
        prompt: `What is a distinguishing feature of omnivorous feeding habits?`,
        options: [
            "Consumption of only plant materials",
            "Consumption of only animal flesh",
            "Consumption of both plant and animal materials",
            "Consumption of decomposed matter"
        ],
        answer: "Consumption of both plant and animal materials",
    },

    {
        prompt: `Which part of the human alimentary canal is primarily responsible for nutrient absorption?`,
        options: [
            "Stomach",
            "Small intestine",
            "Large intestine",
            "Esophagus"
        ],
        answer: "Small intestine",
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