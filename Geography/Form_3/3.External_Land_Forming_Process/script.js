// script.js

let questions = [
    {
        prompt: `What is weathering?`,
        options: [
            "The breakdown of rocks into smaller particles",
            "The movement of rocks due to gravity",
            "The process of river erosion",
            "The formation of glaciers"
        ],
        answer: "The breakdown of rocks into smaller particles",
    },

    {
        prompt: `Which of the following is an agent of weathering?`,
        options: [
            "Water",
            "Wind",
            "Temperature changes",
            "All of the above"
        ],
        answer: "All of the above",
    },

    {
        prompt: `What is the primary difference between mass wasting and weathering?`,
        options: [
            "Mass wasting involves the movement of soil and rock, while weathering is the breakdown of materials",
            "Mass wasting is caused by chemical reactions, while weathering is mechanical",
            "Mass wasting occurs only in rivers, while weathering occurs in lakes",
            "Weathering involves the movement of materials, while mass wasting is a breakdown process"
        ],
        answer: "Mass wasting involves the movement of soil and rock, while weathering is the breakdown of materials",
    },

    {
        prompt: `What is the main process in the hydrological cycle?`,
        options: [
            "Evaporation",
            "Precipitation",
            "Runoff",
            "All of the above"
        ],
        answer: "All of the above",
    },

    {
        prompt: `Which of the following is a feature formed by river action?`,
        options: [
            "Meander",
            "Desert dune",
            "Glacial valley",
            "Volcanic crater"
        ],
        answer: "Meander",
    },

    {
        prompt: `How are lakes classified?`,
        options: [
            "By their size and formation",
            "By their color and depth",
            "By their location and climate",
            "By their surrounding vegetation"
        ],
        answer: "By their size and formation",
    },

    {
        prompt: `What is the main difference between oceans and seas?`,
        options: [
            "Seas are smaller and partially enclosed by land",
            "Seas have higher salinity than oceans",
            "Oceans are fresh water, while seas are salty",
            "Oceans are warmer than seas"
        ],
        answer: "Seas are smaller and partially enclosed by land",
    },

    {
        prompt: `What process results in the formation of features like sand dunes in arid areas?`,
        options: [
            "Wind erosion",
            "Glacial movement",
            "River deposition",
            "Wave action"
        ],
        answer: "Wind erosion",
    },

    {
        prompt: `Which process leads to the formation of stalactites and stalagmites?`,
        options: [
            "Action of underground water",
            "Action of glaciers",
            "Wind erosion",
            "River action"
        ],
        answer: "Action of underground water",
    },

    {
        prompt: `What is glaciation?`,
        options: [
            "The process of ice formation and its effects on the landscape",
            "The movement of soil and rock due to gravity",
            "The action of rivers and their features",
            "The breakdown of rocks by chemical processes"
        ],
        answer: "The process of ice formation and its effects on the landscape",
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