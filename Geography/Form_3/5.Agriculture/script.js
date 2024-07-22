// script.js

let questions = [
    {
        prompt: `What is the definition of agriculture?`,
        options: [
            "The practice of growing crops and raising animals for food and other products",
            "The study of soil composition and land use",
            "The process of industrial production of goods",
            "The study of weather patterns and their impact on the environment"
        ],
        answer: "The practice of growing crops and raising animals for food and other products",
    },

    {
        prompt: `Which of the following is a factor influencing agriculture?`,
        options: [
            "Climate",
            "Soil type",
            "Water availability",
            "All of the above"
        ],
        answer: "All of the above",
    },

    {
        prompt: `What is one type of agriculture?`,
        options: [
            "Subsistence farming",
            "Tourism",
            "Manufacturing",
            "Mining"
        ],
        answer: "Subsistence farming",
    },

    {
        prompt: `Which of the following is a major cash crop in Kenya?`,
        options: [
            "Tea",
            "Corn",
            "Wheat",
            "Rice"
        ],
        answer: "Tea",
    },

    {
        prompt: `In which country is cocoa primarily studied for agriculture?`,
        options: [
            "Ghana",
            "Brazil",
            "Kenya",
            "Nigeria"
        ],
        answer: "Ghana",
    },

    {
        prompt: `What is a major crop studied in Kenya and Brazil?`,
        options: [
            "Coffee",
            "Sugar cane",
            "Maize",
            "Oil palm"
        ],
        answer: "Coffee",
    },

    {
        prompt: `Which of the following countries is known for oil palm production?`,
        options: [
            "Nigeria",
            "Kenya",
            "Argentina",
            "Denmark"
        ],
        answer: "Nigeria",
    },

    {
        prompt: `What is pastoral farming primarily associated with?`,
        options: [
            "Raising livestock",
            "Growing cash crops",
            "Cultivating vegetables",
            "Aquaculture"
        ],
        answer: "Raising livestock",
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