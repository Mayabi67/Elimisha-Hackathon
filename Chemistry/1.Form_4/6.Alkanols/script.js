// script.js

let questions = [
    {
        prompt: `What is the general formula for alkanols?`,
        options: [
            "ROH",
            "RCOOH",
            "RNH2",
            "RCOOR"
        ],
        answer: "ROH",
    },

    {
        prompt: `Which method is commonly used for the preparation of alkanols?`,
        options: [
            "Hydration of alkenes",
            "Oxidation of alkanes",
            "Hydrolysis of esters",
            "Reduction of aldehydes"
        ],
        answer: "Hydration of alkenes",
    },

    {
        prompt: `Which of the following is NOT a common use of alkanols?`,
        options: [
            "Solvents",
            "Fuels",
            "Pharmaceuticals",
            "Polymers"
        ],
        answer: "Polymers",
    },

    {
        prompt: `What is the general formula for alkanoic acids?`,
        options: [
            "RCOOH",
            "ROH",
            "RNH2",
            "RCOOR"
        ],
        answer: "RCOOH",
    },

    {
        prompt: `How are alkanoic acids typically prepared?`,
        options: [
            "By oxidation of primary alkanols",
            "By hydration of alkenes",
            "By reduction of ketones",
            "By polymerization of alkanes"
        ],
        answer: "By oxidation of primary alkanols",
    },

    {
        prompt: `Which property of alkanoic acids changes gradually with the increase in carbon chain length?`,
        options: [
            "Physical properties",
            "Chemical reactivity",
            "Solubility in water",
            "Boiling point"
        ],
        answer: "Physical properties",
    },

    {
        prompt: `What is the characteristic property of alkanoic acids?`,
        options: [
            "Acidic nature",
            "Basic nature",
            "Neutral nature",
            "High reactivity with metals"
        ],
        answer: "Acidic nature",
    },

    {
        prompt: `Which of the following is a type of soapless detergent?`,
        options: [
            "Synthetic detergent",
            "Soap",
            "Natural soap",
            "Polymeric detergent"
        ],
        answer: "Synthetic detergent",
    },

    {
        prompt: `What is the main difference between natural and synthetic polymers?`,
        options: [
            "Synthetic polymers are man-made, while natural polymers are derived from natural sources",
            "Natural polymers are more durable",
            "Synthetic polymers are more biodegradable",
            "Natural polymers are less versatile"
        ],
        answer: "Synthetic polymers are man-made, while natural polymers are derived from natural sources",
    },

    {
        prompt: `Which of the following is a common synthetic fibre?`,
        options: [
            "Nylon",
            "Cotton",
            "Wool",
            "Silk"
        ],
        answer: "Nylon",
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