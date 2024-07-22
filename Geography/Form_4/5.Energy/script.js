// script.js

let questions = [
    {
        prompt: `Which of the following is a major hydro-electric power project in Kenya?`,
        options: [
            "Turkwel Gorge Dam",
            "Kariba Dam",
            "Aswan High Dam",
            "Inga Dam"
        ],
        answer: "Turkwel Gorge Dam",
    },

    {
        prompt: `What is the primary source of geothermal energy in Kenya?`,
        options: [
            "The East African Rift Valley",
            "The Sahara Desert",
            "The Congo Basin",
            "The Nile Delta"
        ],
        answer: "The East African Rift Valley",
    },

    {
        prompt: `Which of the following countries has significant geothermal power projects alongside Kenya?`,
        options: [
            "Uganda",
            "Nigeria",
            "South Africa",
            "Egypt"
        ],
        answer: "Uganda",
    },

    {
        prompt: `What is one of the key benefits of hydro-electric power projects?`,
        options: [
            "Renewable and reduces reliance on fossil fuels",
            "Higher environmental pollution",
            "Irregular power supply",
            "Higher operational costs compared to fossil fuels"
        ],
        answer: "Renewable and reduces reliance on fossil fuels",
    },

    {
        prompt: `Which African country is known for the Inga Dam hydro-electric project?`,
        options: [
            "Democratic Republic of Congo",
            "Kenya",
            "Ghana",
            "South Africa"
        ],
        answer: "Democratic Republic of Congo",
    },

    {
        prompt: `What is one significant challenge associated with the energy crisis?`,
        options: [
            "Increased demand for energy outstripping supply",
            "Overproduction of renewable energy",
            "Excessive energy conservation measures",
            "Abundant fossil fuel reserves"
        ],
        answer: "Increased demand for energy outstripping supply",
    },

    {
        prompt: `Which of the following is a primary concern in the management and conservation of energy?`,
        options: [
            "Reducing waste and improving efficiency",
            "Increasing energy consumption",
            "Ignoring renewable sources",
            "Expanding fossil fuel extraction"
        ],
        answer: "Reducing waste and improving efficiency",
    },

    {
        prompt: `What is the role of electric power projects in Kenya’s energy sector?`,
        options: [
            "To provide a reliable source of electricity and support economic development",
            "To limit access to electricity in rural areas",
            "To increase dependence on imported energy",
            "To promote use of non-renewable resources"
        ],
        answer: "To provide a reliable source of electricity and support economic development",
    },

    {
        prompt: `What is one significant feature of geothermal power projects?`,
        options: [
            "Utilizes heat from the Earth's interior",
            "Requires extensive use of fossil fuels",
            "Leads to high greenhouse gas emissions",
            "Uses non-renewable resources"
        ],
        answer: "Utilizes heat from the Earth's interior",
    },

    {
        prompt: `Why is energy conservation important?`,
        options: [
            "To ensure sustainable use of resources and reduce environmental impact",
            "To increase energy consumption rates",
            "To deplete fossil fuel reserves more quickly",
            "To ignore environmental regulations"
        ],
        answer: "To ensure sustainable use of resources and reduce environmental impact",
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