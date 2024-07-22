// script.js

let questions = [
    {
        prompt: `Which of the following factors most influences the location of industries?`,
        options: [
            "Proximity to raw materials",
            "Availability of colored lights",
            "Local fashion trends",
            "Proximity to tourist attractions"
        ],
        answer: "Proximity to raw materials",
    },

    {
        prompt: `Which industry is known for its significant presence in the Ruhr region of Germany?`,
        options: [
            "Iron and steel industry",
            "Textile industry",
            "Software industry",
            "Automobile industry"
        ],
        answer: "Iron and steel industry",
    },

    {
        prompt: `What is one major benefit of industrialization in Kenya?`,
        options: [
            "Increased employment opportunities",
            "Decreased economic growth",
            "Increased reliance on imports",
            "Decline in infrastructure development"
        ],
        answer: "Increased employment opportunities",
    },

    {
        prompt: `Which of the following is a common problem associated with industrialization in Kenya?`,
        options: [
            "Environmental pollution",
            "Decreased local innovation",
            "Reduction in global trade",
            "Excessive agricultural output"
        ],
        answer: "Environmental pollution",
    },

    {
        prompt: `What is one solution to the problems caused by industrialization?`,
        options: [
            "Implementing stricter environmental regulations",
            "Encouraging more industrial waste",
            "Reducing workforce training",
            "Limiting technological advancements"
        ],
        answer: "Implementing stricter environmental regulations",
    },

    {
        prompt: `Which industry is characterized by a high level of automation and precision, particularly in Japan?`,
        options: [
            "Electronics industry",
            "Textile industry",
            "Food processing industry",
            "Mining industry"
        ],
        answer: "Electronics industry",
    },

    {
        prompt: `What type of industry is often found in rural areas and involves small-scale production?`,
        options: [
            "Cottage industry",
            "Heavy manufacturing",
            "Automobile assembly",
            "Large-scale chemical production"
        ],
        answer: "Cottage industry",
    },

    {
        prompt: `Which factor is less likely to influence the location of industries?`,
        options: [
            "Access to skilled labor",
            "Proximity to competitors",
            "Availability of large water bodies",
            "Local aesthetic preferences"
        ],
        answer: "Local aesthetic preferences",
    },

    {
        prompt: `What is a significant feature of the car manufacturing industry in Japan?`,
        options: [
            "High levels of technological innovation and efficiency",
            "Reliance on outdated manufacturing techniques",
            "Limited international market presence",
            "Focus solely on luxury vehicles"
        ],
        answer: "High levels of technological innovation and efficiency",
    },

    {
        prompt: `In which region is the Iron and Steel industry notably prominent?`,
        options: [
            "Ruhr region of Germany",
            "Southeast Asia",
            "Amazon Basin",
            "Sahara Desert"
        ],
        answer: "Ruhr region of Germany",
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