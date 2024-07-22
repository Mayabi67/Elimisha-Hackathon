// script.js

let questions = [
    {
        prompt: `What defines an acid in terms of its behavior in water?`,
        options: [
            "An acid dissociates in water to give hydrogen ions (H+)",
            "An acid dissociates in water to give hydroxide ions (OH-)",
            "An acid dissociates in water to form salt",
            "An acid dissociates in water to form water and carbon dioxide"
        ],
        answer: "An acid dissociates in water to give hydrogen ions (H+)",
    },

    {
        prompt: `How do bases behave in water?`,
        options: [
            "Bases dissociate in water to give hydroxide ions (OH-)",
            "Bases dissociate in water to give hydrogen ions (H+)",
            "Bases form salts when dissolved in water",
            "Bases form acids when dissolved in water"
        ],
        answer: "Bases dissociate in water to give hydroxide ions (OH-)",
    },

    {
        prompt: `Which of the following is an example of a strong acid?`,
        options: [
            "Hydrochloric acid (HCl)",
            "Acetic acid (CH3COOH)",
            "Carbonic acid (H2CO3)",
            "Citric acid (C6H8O7)"
        ],
        answer: "Hydrochloric acid (HCl)",
    },

    {
        prompt: `What is characteristic of amphoteric oxides?`,
        options: [
            "They react with both acids and alkalis",
            "They only react with acids",
            "They only react with alkalis",
            "They do not react with either acids or alkalis"
        ],
        answer: "They react with both acids and alkalis",
    },

    {
        prompt: `What is observed when hydrogen chloride is dissolved in methyl benzene?`,
        options: [
            "It does not ionize and remains a non-electrolyte",
            "It ionizes and produces H+ and Cl- ions",
            "It forms hydrogen chloride gas",
            "It reacts with methyl benzene to form a new compound"
        ],
        answer: "It does not ionize and remains a non-electrolyte",
    },

    {
        prompt: `What is the primary reaction of dry ammonia gas with acids?`,
        options: [
            "Ammonia gas reacts with acids to form ammonium salts",
            "Ammonia gas forms ammonia chloride directly",
            "Ammonia gas reacts to form water and ammonia salts",
            "Ammonia gas does not react with acids"
        ],
        answer: "Ammonia gas reacts with acids to form ammonium salts",
    },

    {
        prompt: `What defines a salt in terms of its formation?`,
        options: [
            "A salt is an ionic compound formed when cations combine with anions",
            "A salt is formed when acids react with bases to produce water and salt",
            "A salt is an ionic compound formed only in aqueous solutions",
            "A salt is a compound that only forms with metal oxides"
        ],
        answer: "A salt is an ionic compound formed when cations combine with anions",
    },

    {
        prompt: `What is a precipitation reaction?`,
        options: [
            "A reaction where an insoluble solid forms from two soluble reactants",
            "A reaction where two gases react to form a liquid",
            "A reaction where a liquid evaporates to form a solid",
            "A reaction where heat is absorbed without any solid formation"
        ],
        answer: "A reaction where an insoluble solid forms from two soluble reactants",
    },

    {
        prompt: `What is the effect of hardness in water?`,
        options: [
            "Hard water contains high concentrations of calcium and magnesium ions, affecting soap's ability to lather",
            "Hard water contains low levels of minerals, making it less likely to form soap scum",
            "Hard water improves the taste of water but does not affect its cleanliness",
            "Hard water has no effect on the use of soaps and detergents"
        ],
        answer: "Hard water contains high concentrations of calcium and magnesium ions, affecting soap's ability to lather",
    },

    {
        prompt: `What is a complex ion?`,
        options: [
            "A complex ion consists of a central metal ion bonded to one or more ligands",
            "A complex ion is an ion that contains more than one element",
            "A complex ion is formed from the combination of acids and bases",
            "A complex ion is a type of salt formed through precipitation"
        ],
        answer: "A complex ion consists of a central metal ion bonded to one or more ligands",
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