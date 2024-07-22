// script.js

let questions = [
    {
        prompt: `What are the major factors influencing fishing?`,
        options: [
            "Water temperature, salinity, and availability of food",
            "Land temperature, rainfall, and soil fertility",
            "Human population density, urbanization, and industrialization",
            "Political stability, trade agreements, and tourism"
        ],
        answer: "Water temperature, salinity, and availability of food",
    },

    {
        prompt: `Which of the following is a major fishing ground in the world?`,
        options: [
            "The North Atlantic",
            "The Sahara Desert",
            "The Amazon Rainforest",
            "The Himalayas"
        ],
        answer: "The North Atlantic",
    },

    {
        prompt: `What is a common method of fishing in freshwater lakes?`,
        options: [
            "Trapping",
            "Deep-sea trawling",
            "Longlining",
            "Gillnetting"
        ],
        answer: "Trapping",
    },

    {
        prompt: `What is one of the main problems facing fishing in Kenya?`,
        options: [
            "Overfishing",
            "Abundant fish stocks",
            "Excessive rainfall",
            "Low fishing demand"
        ],
        answer: "Overfishing",
    },

    {
        prompt: `Which method of fishing involves the use of large nets to catch fish?`,
        options: [
            "Trawling",
            "Angling",
            "Spearfishing",
            "Hand gathering"
        ],
        answer: "Trawling",
    },

    {
        prompt: `What is a significant difference between fishing in Kenya and Japan?`,
        options: [
            "Kenya relies more on traditional methods, while Japan uses advanced technology",
            "Kenya has more fish species, while Japan has fewer",
            "Japan has higher fish consumption rates compared to Kenya",
            "Kenya's fishing grounds are more polluted than Japan's"
        ],
        answer: "Kenya relies more on traditional methods, while Japan uses advanced technology",
    },

    {
        prompt: `Which type of fishery focuses on catching fish from oceans and seas?`,
        options: [
            "Marine fishery",
            "Freshwater fishery",
            "Aquaculture",
            "Estuarine fishery"
        ],
        answer: "Marine fishery",
    },

    {
        prompt: `What is a major issue in managing and conserving freshwater fisheries?`,
        options: [
            "Pollution",
            "Excessive fish diversity",
            "Natural fish migration",
            "Abundant water resources"
        ],
        answer: "Pollution",
    },

    {
        prompt: `What type of fishing involves using a rod and reel to catch fish?`,
        options: [
            "Angling",
            "Trawling",
            "Gillnetting",
            "Longlining"
        ],
        answer: "Angling",
    },

    {
        prompt: `What is one solution to overfishing problems in Kenya?`,
        options: [
            "Implementing fishing quotas",
            "Encouraging more fishing",
            "Expanding fishing areas",
            "Reducing fishing regulations"
        ],
        answer: "Implementing fishing quotas",
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