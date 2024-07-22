// script.js

let questions = [
    {
        prompt: `What is the definition of biology?`,
        options: [
            "The study of rocks and minerals",
            "The study of human behavior",
            "The study of living organisms and their interactions with the environment",
            "The study of celestial bodies"
        ],
        answer: "The study of living organisms and their interactions with the environment",
    },

    {
        prompt: `Which of the following is not a branch of biology?`,
        options: [
            "Botany",
            "Zoology",
            "Microbiology",
            "Astronomy"
        ],
        answer: "Astronomy",
    },

    {
        prompt: `Why is the study of biology important?`,
        options: [
            "It helps us understand weather patterns",
            "It enables us to design better machines",
            "It helps us understand the functioning of living organisms and improve health and agriculture",
            "It allows us to predict future events"
        ],
        answer: "It helps us understand the functioning of living organisms and improve health and agriculture",
    },

    {
        prompt: `Which of the following is a characteristic of living organisms?`,
        options: [
            "Photosynthesis",
            "Respiration",
            "Inertia",
            "Reflection"
        ],
        answer: "Respiration",
    },

    {
        prompt: `What is one main difference between plants and animals?`,
        options: [
            "Plants can move from one place to another, animals cannot",
            "Plants have chlorophyll and can perform photosynthesis, animals cannot",
            "Animals can perform photosynthesis, plants cannot",
            "Animals have cell walls, plants do not"
        ],
        answer: "Plants have chlorophyll and can perform photosynthesis, animals cannot",
    },

    {
        prompt: `Which branch of biology deals with the study of animals?`,
        options: [
            "Botany",
            "Zoology",
            "Microbiology",
            "Ecology"
        ],
        answer: "Zoology",
    },

    {
        prompt: `How does biology contribute to the field of medicine?`,
        options: [
            "By improving weather forecasts",
            "By enhancing communication technology",
            "By understanding disease mechanisms and developing treatments",
            "By developing new cooking recipes"
        ],
        answer: "By understanding disease mechanisms and developing treatments",
    },

    {
        prompt: `Which characteristic of living organisms involves the intake and use of nutrients?`,
        options: [
            "Reproduction",
            "Growth",
            "Nutrition",
            "Excretion"
        ],
        answer: "Nutrition",
    },

    {
        prompt: `What is the primary purpose of photosynthesis in plants?`,
        options: [
            "To generate heat",
            "To produce food (glucose)",
            "To move water through the plant",
            "To eliminate waste"
        ],
        answer: "To produce food (glucose)",
    },

    {
        prompt: `Which of the following is an example of a microorganism studied in microbiology?`,
        options: [
            "Bacteria",
            "Elephants",
            "Oak trees",
            "Rocks"
        ],
        answer: "Bacteria",
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