// script.js

let questions = [
    {
        prompt: `What is the definition of wildlife?`,
        options: [
            "Wildlife refers to all living organisms in their natural habitats.",
            "Wildlife includes only domesticated animals in farms.",
            "Wildlife means plants that are cultivated for human use.",
            "Wildlife refers exclusively to animals in zoos."
        ],
        answer: "Wildlife refers to all living organisms in their natural habitats.",
    },

    {
        prompt: `Which factor significantly influences the distribution of wildlife in East Africa?`,
        options: [
            "Climate and habitat availability",
            "Urbanization and technology",
            "Population density of humans",
            "Cultural practices of local communities"
        ],
        answer: "Climate and habitat availability",
    },

    {
        prompt: `What is the primary distinction between a game reserve and a national park?`,
        options: [
            "Game reserves allow controlled hunting, while national parks do not.",
            "National parks allow agriculture, while game reserves do not.",
            "Game reserves are smaller than national parks.",
            "National parks are privately owned, while game reserves are government-managed."
        ],
        answer: "Game reserves allow controlled hunting, while national parks do not.",
    },

    {
        prompt: `Which of the following is a major national park located in East Africa?`,
        options: [
            "Serengeti National Park",
            "Kruger National Park",
            "Yellowstone National Park",
            "Great Smoky Mountains National Park"
        ],
        answer: "Serengeti National Park",
    },

    {
        prompt: `What is one significant role of wildlife in East Africa?`,
        options: [
            "Maintaining ecological balance and biodiversity",
            "Increasing urbanization",
            "Enhancing industrial development",
            "Reducing agricultural productivity"
        ],
        answer: "Maintaining ecological balance and biodiversity",
    },

    {
        prompt: `Which of the following is a major problem facing wildlife in East Africa?`,
        options: [
            "Habitat loss due to deforestation and agriculture",
            "Overpopulation of species",
            "Excessive rainfalls",
            "Low human population density"
        ],
        answer: "Habitat loss due to deforestation and agriculture",
    },

    {
        prompt: `What is one method used for the management and conservation of wildlife in East Africa?`,
        options: [
            "Anti-poaching patrols and habitat restoration",
            "Encouraging illegal hunting",
            "Promoting agricultural expansion",
            "Reducing protected areas"
        ],
        answer: "Anti-poaching patrols and habitat restoration",
    },

    {
        prompt: `What is the primary purpose of a wildlife sanctuary?`,
        options: [
            "To provide a protected area for wildlife with minimal human interference",
            "To serve as a location for agricultural experiments",
            "To facilitate commercial hunting",
            "To act as a tourist resort"
        ],
        answer: "To provide a protected area for wildlife with minimal human interference",
    },

    {
        prompt: `Which East African country is known for the Maasai Mara National Reserve?`,
        options: [
            "Kenya",
            "Tanzania",
            "Uganda",
            "Rwanda"
        ],
        answer: "Kenya",
    },

    {
        prompt: `What does the term 'biodiversity' refer to in the context of wildlife?`,
        options: [
            "The variety and variability of life forms within an ecosystem",
            "The total number of animal species only",
            "The number of plant species only",
            "The extent of human activity in wildlife areas"
        ],
        answer: "The variety and variability of life forms within an ecosystem",
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