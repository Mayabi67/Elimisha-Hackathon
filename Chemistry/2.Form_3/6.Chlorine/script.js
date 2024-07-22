// script.js

let questions = [
    {
        prompt: `What is the chemical formula for chlorine gas?`,
        options: [
            "Cl₂",
            "HCl",
            "Cl",
            "ClO₂"
        ],
        answer: "Cl₂",
    },

    {
        prompt: `How is chlorine gas typically prepared in the laboratory?`,
        options: [
            "By the reaction of hydrochloric acid with manganese dioxide",
            "By the electrolysis of sodium chloride solution",
            "By heating ammonium chloride",
            "By the reaction of sulfur dioxide with water"
        ],
        answer: "By the reaction of hydrochloric acid with manganese dioxide",
    },

    {
        prompt: `What is the primary use of chlorine gas in water treatment?`,
        options: [
            "Disinfection",
            "Neutralization",
            "Oxidation",
            "Bleaching"
        ],
        answer: "Disinfection",
    },

    {
        prompt: `What is the chemical formula for hydrogen chloride gas?`,
        options: [
            "HCl",
            "Cl₂",
            "H₂Cl",
            "H₂O"
        ],
        answer: "HCl",
    },

    {
        prompt: `How does hydrogen chloride gas behave when dissolved in water?`,
        options: [
            "It forms hydrochloric acid",
            "It forms sulfuric acid",
            "It forms chlorine",
            "It remains as a gas"
        ],
        answer: "It forms hydrochloric acid",
    },

    {
        prompt: `Which of the following is a significant effect of hydrogen chloride gas in organic solvents?`,
        options: [
            "It can form organic chlorides",
            "It reacts to form alcohols",
            "It neutralizes acids",
            "It forms sulfur dioxide"
        ],
        answer: "It can form organic chlorides",
    },

    {
        prompt: `What is one common use of hydrogen chloride gas?`,
        options: [
            "In the manufacture of PVC",
            "As a disinfectant",
            "As a food preservative",
            "In the production of sulfuric acid"
        ],
        answer: "In the manufacture of PVC",
    },

    {
        prompt: `How does the presence of water affect the properties of hydrogen chloride gas?`,
        options: [
            "It dissolves to form hydrochloric acid",
            "It becomes a solid",
            "It loses its acidic properties",
            "It turns into chlorine gas"
        ],
        answer: "It dissolves to form hydrochloric acid",
    },

    {
        prompt: `Which of the following is NOT a use of chlorine gas?`,
        options: [
            "Water purification",
            "Bleaching agent",
            "Production of hydrochloric acid",
            "Disinfectant in swimming pools"
        ],
        answer: "Production of hydrochloric acid",
    },

    {
        prompt: `What is the primary role of chlorine in the disinfection of drinking water?`,
        options: [
            "To kill bacteria and pathogens",
            "To neutralize acidic water",
            "To react with organic materials",
            "To increase the pH level"
        ],
        answer: "To kill bacteria and pathogens",
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