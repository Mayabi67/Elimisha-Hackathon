// script.js

let questions = [
    {
        prompt: `Where are chromosomes located during mitosis?`,
        options: [
            "In the cell membrane",
            "In the nucleus",
            "In the cytoplasm",
            "In the Golgi apparatus"
        ],
        answer: "In the nucleus",
    },

    {
        prompt: `What is a key difference between mitosis and meiosis?`,
        options: [
            "Mitosis results in four daughter cells, while meiosis results in two daughter cells",
            "Meiosis involves two divisions, while mitosis involves one division",
            "Mitosis occurs in gametes, while meiosis occurs in somatic cells",
            "Meiosis results in identical daughter cells, while mitosis results in non-identical daughter cells"
        ],
        answer: "Meiosis involves two divisions, while mitosis involves one division",
    },

    {
        prompt: `What is one advantage of asexual reproduction?`,
        options: [
            "Increased genetic variation",
            "Faster reproduction rate",
            "Requires two parents",
            "Produces fewer offspring"
        ],
        answer: "Faster reproduction rate",
    },

    {
        prompt: `How does a wind-pollinated flower differ from an insect-pollinated flower?`,
        options: [
            "Wind-pollinated flowers are usually brightly colored, while insect-pollinated flowers are not",
            "Wind-pollinated flowers produce less pollen compared to insect-pollinated flowers",
            "Insect-pollinated flowers have small, inconspicuous flowers, while wind-pollinated flowers have large, showy flowers",
            "Wind-pollinated flowers have a strong fragrance, while insect-pollinated flowers do not"
        ],
        answer: "Wind-pollinated flowers produce less pollen compared to insect-pollinated flowers",
    },

    {
        prompt: `What is the primary purpose of fertilization in flowering plants?`,
        options: [
            "To produce seeds and fruits",
            "To increase the plant's height",
            "To enhance leaf growth",
            "To prepare the plant for winter"
        ],
        answer: "To produce seeds and fruits",
    },

    {
        prompt: `How are fruits and seeds typically dispersed?`,
        options: [
            "By wind, water, and animals",
            "By direct contact with the ground",
            "By animal digestion only",
            "By releasing spores"
        ],
        answer: "By wind, water, and animals",
    },

    {
        prompt: `What is a key difference between internal and external fertilization?`,
        options: [
            "Internal fertilization occurs inside the body, while external fertilization occurs outside the body",
            "Internal fertilization requires water, while external fertilization does not",
            "External fertilization is more common in mammals, while internal fertilization is more common in amphibians",
            "Internal fertilization occurs only in plants, while external fertilization occurs in animals"
        ],
        answer: "Internal fertilization occurs inside the body, while external fertilization occurs outside the body",
    },

    {
        prompt: `Which part of the human reproductive system produces sperm?`,
        options: [
            "Ovaries",
            "Testes",
            "Uterus",
            "Fallopian tubes"
        ],
        answer: "Testes",
    },

    {
        prompt: `What is the role of hormones in human reproduction?`,
        options: [
            "To regulate the menstrual cycle and sperm production",
            "To digest food",
            "To provide energy",
            "To transport oxygen"
        ],
        answer: "To regulate the menstrual cycle and sperm production",
    },

    {
        prompt: `Which of the following is a method of transmission for sexually transmitted infections (STIs)?`,
        options: [
            "Direct skin-to-skin contact",
            "Inhalation of airborne particles",
            "Contact with contaminated surfaces",
            "Drinking contaminated water"
        ],
        answer: "Direct skin-to-skin contact",
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