let questions = [
    {
        prompt: `How is sulfur typically extracted from its natural deposits?`,
        options: [
            "Frasch process",
            "Fractional distillation",
            "Electrolysis",
            "Solvay process"
        ],
        answer: "Frasch process",
    },

    {
        prompt: `What is the chemical formula for sulfur dioxide?`,
        options: [
            "SO₂",
            "SO₃",
            "H₂S",
            "H₂SO₄"
        ],
        answer: "SO₂",
    },

    {
        prompt: `Which of the following is a key step in the manufacture of sulfuric acid?`,
        options: [
            "Oxidation of sulfur dioxide",
            "Reduction of sulfur dioxide",
            "Neutralization of sulfur dioxide",
            "Hydrolysis of sulfur dioxide"
        ],
        answer: "Oxidation of sulfur dioxide",
    },

    {
        prompt: `What is a notable property of sulfuric acid (H₂SO₄)?`,
        options: [
            "It is a strong oxidizing agent",
            "It is a strong reducing agent",
            "It is a weak acid",
            "It is a colorless gas"
        ],
        answer: "It is a strong oxidizing agent",
    },

    {
        prompt: `What is the main industrial use of sulfuric acid?`,
        options: [
            "Fertilizer production",
            "Bleaching",
            "Solvent extraction",
            "Food preservation"
        ],
        answer: "Fertilizer production",
    },

    {
        prompt: `How is hydrogen sulfide (H₂S) commonly detected in the laboratory?`,
        options: [
            "By its distinctive rotten egg smell",
            "By its color change in litmus paper",
            "By its reaction with sodium hydroxide",
            "By its explosive nature"
        ],
        answer: "By its distinctive rotten egg smell",
    },

    {
        prompt: `What happens when sulfur dioxide is dissolved in water?`,
        options: [
            "It forms sulfuric acid",
            "It forms sulfurous acid",
            "It forms sulfur",
            "It forms hydrogen sulfide"
        ],
        answer: "It forms sulfurous acid",
    },

    {
        prompt: `Which method is commonly used to remove sulfur dioxide from flue gases?`,
        options: [
            "Scrubbing with calcium carbonate",
            "Electrolysis",
            "Neutralization with sulfuric acid",
            "Oxidation with chlorine"
        ],
        answer: "Scrubbing with calcium carbonate",
    },

    {
        prompt: `What is the primary function of sulfuric acid in the contact process for making sulfuric acid?`,
        options: [
            "Catalyst",
            "Reducing agent",
            "Solvent",
            "Neutralizer"
        ],
        answer: "Catalyst",
    },

    {
        prompt: `Which of the following is a common use of hydrogen sulfide in industry?`,
        options: [
            "As a reducing agent",
            "In the manufacture of sulfuric acid",
            "In the production of sulfur dioxide",
            "As a disinfectant"
        ],
        answer: "As a reducing agent",
    },

    {
        prompt: `Which property of sulfuric acid makes it useful in dehydrating sugars?`,
        options: [
            "Its strong acidic nature",
            "Its ability to act as an oxidizing agent",
            "Its strong dehydrating property",
            "Its high boiling point"
        ],
        answer: "Its strong dehydrating property",
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