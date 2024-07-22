// script.js

let questions = [
    {
        prompt: `How does growth differ from development in organisms?`,
        options: [
            "Growth refers to an increase in size, while development includes both growth and differentiation into specialized structures",
            "Growth is about achieving maturity, while development refers to aging",
            "Growth only occurs in plants, while development occurs in animals",
            "Growth is an external change, while development is internal"
        ],
        answer: "Growth refers to an increase in size, while development includes both growth and differentiation into specialized structures",
    },

    {
        prompt: `Which factor is NOT typically analyzed when studying growth rates in plants?`,
        options: [
            "Rate of leaf production",
            "Amount of sunlight",
            "Height of the plant",
            "Color of the plant leaves"
        ],
        answer: "Color of the plant leaves",
    },

    {
        prompt: `What is one key factor affecting seed viability and dormancy?`,
        options: [
            "Temperature",
            "Seed color",
            "Plant height",
            "Type of soil"
        ],
        answer: "Temperature",
    },

    {
        prompt: `Which condition is essential for seed germination?`,
        options: [
            "Exposure to light",
            "Presence of water",
            "Cold temperatures",
            "High salinity"
        ],
        answer: "Presence of water",
    },

    {
        prompt: `What distinguishes epigeal germination from hypogeal germination?`,
        options: [
            "Epigeal germination involves cotyledons emerging above the soil, while hypogeal germination involves cotyledons remaining below the soil",
            "Epigeal germination occurs in aquatic plants, while hypogeal germination occurs in terrestrial plants",
            "Epigeal germination involves seedling growth in darkness, while hypogeal germination involves seedling growth in light",
            "Epigeal germination results in faster growth than hypogeal germination"
        ],
        answer: "Epigeal germination involves cotyledons emerging above the soil, while hypogeal germination involves cotyledons remaining below the soil",
    },

    {
        prompt: `What part of a seed is responsible for absorbing water during germination?`,
        options: [
            "Embryo",
            "Seed coat",
            "Endosperm",
            "Cotyledons"
        ],
        answer: "Seed coat",
    },

    {
        prompt: `Which region of a seedling is primarily responsible for growth?`,
        options: [
            "Root tip",
            "Stem node",
            "Leaf margin",
            "Seed coat"
        ],
        answer: "Root tip",
    },

    {
        prompt: `What is apical dominance in plants?`,
        options: [
            "The tendency of the main stem to grow more strongly than lateral branches due to the influence of the apical bud",
            "The growth of lateral branches over the main stem",
            "The process by which plants grow roots at the shoot tips",
            "The ability of plants to grow in any direction"
        ],
        answer: "The tendency of the main stem to grow more strongly than lateral branches due to the influence of the apical bud",
    },

    {
        prompt: `How does complete metamorphosis differ from incomplete metamorphosis in insects?`,
        options: [
            "Complete metamorphosis includes four stages: egg, larva, pupa, and adult, while incomplete metamorphosis includes three stages: egg, nymph, and adult",
            "Complete metamorphosis occurs in aquatic insects, while incomplete metamorphosis occurs in terrestrial insects",
            "Complete metamorphosis results in fewer stages than incomplete metamorphosis",
            "Complete metamorphosis includes only egg and adult stages"
        ],
        answer: "Complete metamorphosis includes four stages: egg, larva, pupa, and adult, while incomplete metamorphosis includes three stages: egg, nymph, and adult",
    },

    {
        prompt: `What role do hormones play in plant growth and development?`,
        options: [
            "Hormones regulate various processes such as growth, flowering, and fruit development",
            "Hormones control only reproductive processes",
            "Hormones are not involved in plant growth",
            "Hormones only affect seed germination"
        ],
        answer: "Hormones regulate various processes such as growth, flowering, and fruit development",
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