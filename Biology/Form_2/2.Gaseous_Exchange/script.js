// script.js

let questions = [
    {
        prompt: `Why is gaseous exchange necessary for living organisms?`,
        options: [
            "To provide energy for photosynthesis",
            "To exchange oxygen and carbon dioxide for cellular respiration and metabolic processes",
            "To eliminate waste products",
            "To transport nutrients"
        ],
        answer: "To exchange oxygen and carbon dioxide for cellular respiration and metabolic processes",
    },

    {
        prompt: `How do plants primarily carry out gaseous exchange?`,
        options: [
            "Through their roots",
            "Through their leaves via stomata",
            "Through their flowers",
            "Through their stems"
        ],
        answer: "Through their leaves via stomata",
    },

    {
        prompt: `What is a key difference between the internal structures of aquatic and terrestrial plants?`,
        options: [
            "Aquatic plants have thicker cuticles",
            "Terrestrial plants have a more extensive root system",
            "Aquatic plants have larger leaves",
            "Terrestrial plants have fewer stomata"
        ],
        answer: "Terrestrial plants have a more extensive root system",
    },

    {
        prompt: `What is the main respiratory structure in fish?`,
        options: [
            "Lungs",
            "Gills",
            "Tracheae",
            "Skin"
        ],
        answer: "Gills",
    },

    {
        prompt: `Which characteristic is common to all respiratory surfaces?`,
        options: [
            "Thick walls",
            "Dry surfaces",
            "Large surface area",
            "Opaque structure"
        ],
        answer: "Large surface area",
    },

    {
        prompt: `How do protozoa carry out gaseous exchange?`,
        options: [
            "Through gills",
            "Through lungs",
            "Through diffusion across their cell membrane",
            "Through tracheae"
        ],
        answer: "Through diffusion across their cell membrane",
    },

    {
        prompt: `What is the primary factor controlling the rate of breathing in humans?`,
        options: [
            "Temperature",
            "Oxygen concentration in the air",
            "Carbon dioxide levels in the blood",
            "Nutrient levels in the body"
        ],
        answer: "Carbon dioxide levels in the blood",
    },

    {
        prompt: `Which respiratory disease is caused by inflammation of the airways and is characterized by wheezing and shortness of breath?`,
        options: [
            "Asthma",
            "Tuberculosis",
            "Pneumonia",
            "Emphysema"
        ],
        answer: "Asthma",
    },

    {
        prompt: `What is one way to prevent respiratory diseases?`,
        options: [
            "Avoiding vaccinations",
            "Consuming more sugar",
            "Maintaining good hygiene and avoiding polluted environments",
            "Reducing physical activity"
        ],
        answer: "Maintaining good hygiene and avoiding polluted environments",
    },

    {
        prompt: `Which respiratory structure is found in insects and allows for direct gas exchange with the environment?`,
        options: [
            "Lungs",
            "Gills",
            "Tracheae",
            "Skin"
        ],
        answer: "Tracheae",
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