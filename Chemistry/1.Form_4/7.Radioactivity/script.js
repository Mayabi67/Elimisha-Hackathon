// script.js

let questions = [
    {
        prompt: `Which type of radiation consists of high-energy electromagnetic waves?`,
        options: [
            "Alpha rays",
            "Beta rays",
            "Gamma rays",
            "X-rays"
        ],
        answer: "Gamma rays",
    },

    {
        prompt: `What does the term "half-life" refer to in radioactive decay?`,
        options: [
            "The time required for half of the radioactive atoms in a sample to decay",
            "The time it takes for a radioactive element to become stable",
            "The time needed for the entire sample to decay",
            "The amount of radiation emitted in a given period"
        ],
        answer: "The time required for half of the radioactive atoms in a sample to decay",
    },

    {
        prompt: `Which radiation type is characterized by the emission of a helium nucleus?`,
        options: [
            "Alpha rays",
            "Beta rays",
            "Gamma rays",
            "Neutron rays"
        ],
        answer: "Alpha rays",
    },

    {
        prompt: `What change occurs in the nucleus during alpha decay?`,
        options: [
            "The nucleus loses two protons and two neutrons",
            "The nucleus gains two protons and two neutrons",
            "The nucleus loses an electron",
            "The nucleus gains a neutron"
        ],
        answer: "The nucleus loses two protons and two neutrons",
    },

    {
        prompt: `Which process involves the splitting of a heavy nucleus into two lighter nuclei?`,
        options: [
            "Fission",
            "Fusion",
            "Beta decay",
            "Gamma decay"
        ],
        answer: "Fission",
    },

    {
        prompt: `In which of the following applications are radioisotopes used?`,
        options: [
            "Carbon dating",
            "Agriculture",
            "Medicine",
            "All of the above"
        ],
        answer: "All of the above",
    },

    {
        prompt: `Which of the following is a common use of radioisotopes in medicine?`,
        options: [
            "Diagnosis and treatment of cancer",
            "Pesticide application",
            "Water purification",
            "Carbon dating of artifacts"
        ],
        answer: "Diagnosis and treatment of cancer",
    },

    {
        prompt: `What is a major environmental concern related to radioactive pollution?`,
        options: [
            "Contamination of soil and water",
            "Increased soil fertility",
            "Enhanced crop yield",
            "Reduction in greenhouse gas emissions"
        ],
        answer: "Contamination of soil and water",
    },

    {
        prompt: `What effect can exposure to high levels of radiation have on human health?`,
        options: [
            "Increased risk of cancer",
            "Enhanced immune response",
            "Improved overall health",
            "Increased resistance to infections"
        ],
        answer: "Increased risk of cancer",
    },

    {
        prompt: `Which radioactive decay process does not change the atomic number of the element?`,
        options: [
            "Gamma decay",
            "Alpha decay",
            "Beta decay",
            "Neutron emission"
        ],
        answer: "Gamma decay",
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