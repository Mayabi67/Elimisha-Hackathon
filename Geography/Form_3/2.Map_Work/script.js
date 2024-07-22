// script.js

let questions = [
    {
        prompt: `Which physical feature on a topographical map is indicated by closely spaced contour lines?`,
        options: [
            "A gentle slope",
            "A steep slope",
            "A river",
            "A plain"
        ],
        answer: "A steep slope",
    },

    {
        prompt: `What type of vegetation is typically shown by green shading on a topographical map?`,
        options: [
            "Desert",
            "Forest",
            "Urban area",
            "Water body"
        ],
        answer: "Forest",
    },

    {
        prompt: `What does the blue color on a topographical map usually represent?`,
        options: [
            "Vegetation",
            "Urban areas",
            "Water bodies",
            "Mountains"
        ],
        answer: "Water bodies",
    },

    {
        prompt: `Which symbol on a topographical map indicates an economic activity such as mining?`,
        options: [
            "Pickaxe and shovel",
            "Tree",
            "House",
            "Wavy lines"
        ],
        answer: "Pickaxe and shovel",
    },

    {
        prompt: `What is the typical representation of settlements on a topographical map?`,
        options: [
            "Green shading",
            "Blue lines",
            "Cluster of dots or small squares",
            "Contour lines"
        ],
        answer: "Cluster of dots or small squares",
    },

    {
        prompt: `When reducing a map, what happens to the scale?`,
        options: [
            "It increases",
            "It decreases",
            "It remains the same",
            "It gets inverted"
        ],
        answer: "It decreases",
    },

    {
        prompt: `What is the purpose of drawing a cross section on a topographical map?`,
        options: [
            "To show elevation changes along a line",
            "To indicate land use",
            "To measure distance between points",
            "To identify vegetation types"
        ],
        answer: "To show elevation changes along a line",
    },

    {
        prompt: `How is vertical exaggeration calculated in a topographical cross section?`,
        options: [
            "Horizontal scale / Vertical scale",
            "Vertical scale / Horizontal scale",
            "Elevation / Distance",
            "Distance / Elevation"
        ],
        answer: "Horizontal scale / Vertical scale",
    },

    {
        prompt: `What is the gradient of a slope if the elevation change is 100 meters over a horizontal distance of 500 meters?`,
        options: [
            "1:5",
            "1:50",
            "1:500",
            "1:100"
        ],
        answer: "1:5",
    },

    {
        prompt: `Which feature on a topographical map indicates that two points are intervisible?`,
        options: [
            "A line of sight can be drawn between them without obstruction",
            "They are on the same contour line",
            "They are at the same elevation",
            "They are connected by a river"
        ],
        answer: "A line of sight can be drawn between them without obstruction",
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