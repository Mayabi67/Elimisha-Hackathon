// script.js

let questions = [
    {
        prompt: `What is the term used to describe the role of an organism in its ecosystem, including its habitat and interactions with other organisms?`,
        options: [
            "Niche",
            "Biome",
            "Community",
            "Population"
        ],
        answer: "Niche",
    },

    {
        prompt: `Which of the following is an abiotic factor in an ecosystem?`,
        options: [
            "Predation",
            "Competition",
            "Temperature",
            "Parasitism"
        ],
        answer: "Temperature",
    },

    {
        prompt: `How do saprophytes obtain their nutrients?`,
        options: [
            "By consuming living hosts",
            "By absorbing nutrients from dead organic matter",
            "By photosynthesis",
            "By parasitizing other organisms"
        ],
        answer: "By absorbing nutrients from dead organic matter",
    },

    {
        prompt: `What is the primary role of decomposers like fungi and bacteria in an ecosystem?`,
        options: [
            "To consume living organisms",
            "To recycle nutrients by breaking down dead organisms",
            "To produce energy through photosynthesis",
            "To provide shelter to other organisms"
        ],
        answer: "To recycle nutrients by breaking down dead organisms",
    },

    {
        prompt: `Which of the following is an example of a mutualistic relationship?`,
        options: [
            "A lion preying on a zebra",
            "A tapeworm living inside a host's intestines",
            "Bees pollinating flowers while obtaining nectar",
            "Moss growing on a tree bark without affecting the tree"
        ],
        answer: "Bees pollinating flowers while obtaining nectar",
    },

    {
        prompt: `How is energy typically transferred through a food chain?`,
        options: [
            "From consumers to producers",
            "From producers to consumers",
            "From decomposers to producers",
            "From the environment to decomposers"
        ],
        answer: "From producers to consumers",
    },

    {
        prompt: `What is the primary source of energy for most ecosystems?`,
        options: [
            "Chemical energy in soil",
            "Sunlight",
            "Heat from geothermal sources",
            "Energy stored in water"
        ],
        answer: "Sunlight",
    },

    {
        prompt: `What is a key characteristic of parasites that helps them adapt to their hosts?`,
        options: [
            "Ability to photosynthesize",
            "Specialized structures for attachment and nutrient absorption",
            "Ability to perform cellular respiration",
            "Ability to produce their own food"
        ],
        answer: "Specialized structures for attachment and nutrient absorption",
    },

    {
        prompt: `Which of the following best describes the nitrogen cycle?`,
        options: [
            "The movement of nitrogen through the atmosphere, soil, and living organisms",
            "The transfer of carbon between organisms and the environment",
            "The flow of energy from producers to consumers",
            "The recycling of water in the ecosystem"
        ],
        answer: "The movement of nitrogen through the atmosphere, soil, and living organisms",
    },

    {
        prompt: `How do plants adapt to dry environments?`,
        options: [
            "By having broad, flat leaves to absorb more sunlight",
            "By developing deep root systems and reduced leaf sizes",
            "By increasing the number of stomata",
            "By having bright-colored flowers to attract pollinators"
        ],
        answer: "By developing deep root systems and reduced leaf sizes",
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