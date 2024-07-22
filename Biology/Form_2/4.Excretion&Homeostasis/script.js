// script.js

let questions = [
    {
        prompt: `What is the key difference between excretion and egestion?`,
        options: [
            "Excretion is the removal of metabolic waste from the body, while egestion is the removal of undigested food",
            "Excretion is the removal of undigested food, while egestion is the removal of metabolic waste",
            "Excretion and egestion are the same processes",
            "Egestion is a process occurring only in plants, while excretion occurs only in animals"
        ],
        answer: "Excretion is the removal of metabolic waste from the body, while egestion is the removal of undigested food",
    },

    {
        prompt: `Why is excretion necessary for living organisms?`,
        options: [
            "To remove excess nutrients from the body",
            "To remove harmful metabolic wastes and maintain internal chemical balance",
            "To produce energy",
            "To aid in reproduction"
        ],
        answer: "To remove harmful metabolic wastes and maintain internal chemical balance",
    },

    {
        prompt: `What is one use of excretory products in plants?`,
        options: [
            "To create energy",
            "To aid in seed dispersal",
            "To prevent water loss",
            "To act as a defense mechanism against herbivores"
        ],
        answer: "To act as a defense mechanism against herbivores",
    },

    {
        prompt: `Which method of excretion is used by the unicellular organism, Paramecium?`,
        options: [
            "Excretion through the cell membrane",
            "Egestion through a specialized structure called the anal pore",
            "Filtration through the contractile vacuole",
            "Absorption through the cell wall"
        ],
        answer: "Egestion through a specialized structure called the anal pore",
    },

    {
        prompt: `How does the human skin contribute to excretion?`,
        options: [
            "By filtering blood to remove waste products",
            "By removing excess salts and urea through sweat",
            "By absorbing nutrients from food",
            "By producing hormones"
        ],
        answer: "By removing excess salts and urea through sweat",
    },

    {
        prompt: `What is the main function of the kidneys in humans?`,
        options: [
            "To produce hormones",
            "To filter blood and remove waste products to form urine",
            "To regulate body temperature",
            "To digest food"
        ],
        answer: "To filter blood and remove waste products to form urine",
    },

    {
        prompt: `What is the concept of homeostasis?`,
        options: [
            "The process of digestion",
            "The maintenance of a stable internal environment despite external changes",
            "The movement of substances across cell membranes",
            "The production of energy in cells"
        ],
        answer: "The maintenance of a stable internal environment despite external changes",
    },

    {
        prompt: `How do mammals typically gain heat?`,
        options: [
            "By metabolic processes and activity",
            "By sweating",
            "By staying in a cool environment",
            "By excreting waste"
        ],
        answer: "By metabolic processes and activity",
    },

    {
        prompt: `What role does the hypothalamus play in temperature regulation?`,
        options: [
            "It produces hormones that regulate blood pressure",
            "It monitors and controls body temperature by initiating appropriate responses",
            "It filters blood to remove waste",
            "It absorbs nutrients from food"
        ],
        answer: "It monitors and controls body temperature by initiating appropriate responses",
    },

    {
        prompt: `What is a common symptom of Diabetes mellitus?`,
        options: [
            "Excessive thirst and frequent urination",
            "Increased appetite and weight loss",
            "Fatigue and headaches",
            "Dark, dry skin"
        ],
        answer: "Excessive thirst and frequent urination",
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