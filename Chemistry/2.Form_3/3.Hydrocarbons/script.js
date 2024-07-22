// script.js

let questions = [
    {
        prompt: `What is the general formula for alkanes?`,
        options: [
            "CnH2n+2",
            "CnH2n",
            "CnH2n-2",
            "CnH2n+1"
        ],
        answer: "CnH2n+2",
    },

    {
        prompt: `Which of the following is a characteristic feature of alkenes?`,
        options: [
            "Presence of a double bond",
            "Presence of a triple bond",
            "Presence of only single bonds",
            "Presence of a benzene ring"
        ],
        answer: "Presence of a double bond",
    },

    {
        prompt: `What is the IUPAC name for the compound with the formula C4H6?`,
        options: [
            "Butyne",
            "Butene",
            "Butane",
            "Butanol"
        ],
        answer: "Butyne",
    },

    {
        prompt: `Which reaction involves the addition of hydrogen to an alkene?`,
        options: [
            "Hydrogenation",
            "Dehydration",
            "Hydrolysis",
            "Oxidation"
        ],
        answer: "Hydrogenation",
    },

    {
        prompt: `What type of bond is present in alkynes?`,
        options: [
            "Single bond",
            "Double bond",
            "Triple bond",
            "Quadruple bond"
        ],
        answer: "Triple bond",
    },

    {
        prompt: `Which of the following is a common reaction for alkanes?`,
        options: [
            "Combustion",
            "Addition",
            "Substitution",
            "Oxidation"
        ],
        answer: "Combustion",
    },

    {
        prompt: `What happens when alkanes react with chlorine in the presence of UV light?`,
        options: [
            "Substitution reaction",
            "Addition reaction",
            "Elimination reaction",
            "Hydrolysis"
        ],
        answer: "Substitution reaction",
    },

    {
        prompt: `Which compound is an example of an alkene?`,
        options: [
            "Ethene",
            "Ethyne",
            "Methane",
            "Butane"
        ],
        answer: "Ethene",
    },

    {
        prompt: `When nitrates are heated, which type of products are typically formed?`,
        options: [
            "Oxides and nitrogen dioxide",
            "Alkanes and alkenes",
            "Carboxylic acids",
            "Hydrocarbons"
        ],
        answer: "Oxides and nitrogen dioxide",
    },

    {
        prompt: `Which of the following hydrocarbons is an example of an alkene?`,
        options: [
            "Propene",
            "Propane",
            "Butyne",
            "Ethane"
        ],
        answer: "Propene",
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