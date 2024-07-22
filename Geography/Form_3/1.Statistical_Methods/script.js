// script.js

let questions = [
    {
        prompt: `What is a compound bar graph used for?`,
        options: [
            "To display multiple datasets stacked on top of each other",
            "To show individual data points",
            "To compare two datasets using lines",
            "To represent data using circles"
        ],
        answer: "To display multiple datasets stacked on top of each other",
    },

    {
        prompt: `What does a cumulative bar graph show?`,
        options: [
            "The total amount accumulated over a period",
            "Individual values without accumulation",
            "Percentage composition",
            "The frequency distribution"
        ],
        answer: "The total amount accumulated over a period",
    },

    {
        prompt: `How are proportional circles used in statistical graphs?`,
        options: [
            "To represent different categories with varying circle sizes proportional to the values",
            "To show trends over time",
            "To display frequency distribution",
            "To compare percentages of different parts of a whole"
        ],
        answer: "To represent different categories with varying circle sizes proportional to the values",
    },

    {
        prompt: `Which chart is best suited for showing the percentage composition of a whole?`,
        options: [
            "Line chart",
            "Bar graph",
            "Pie chart",
            "Scatter plot"
        ],
        answer: "Pie chart",
    },

    {
        prompt: `In a pie chart, what does each "slice" represent?`,
        options: [
            "A frequency distribution",
            "A part of the whole dataset",
            "A trend over time",
            "A cumulative value"
        ],
        answer: "A part of the whole dataset",
    },

    {
        prompt: `What is a key advantage of using compound bar graphs?`,
        options: [
            "They can show multiple datasets in a single chart",
            "They are easier to read than pie charts",
            "They can represent time-series data",
            "They highlight individual data points"
        ],
        answer: "They can show multiple datasets in a single chart",
    },

    {
        prompt: `How are values typically represented in proportional circle charts?`,
        options: [
            "By the area of the circles",
            "By the color of the circles",
            "By the diameter of the circles",
            "By the radius of the circles"
        ],
        answer: "By the area of the circles",
    },

    {
        prompt: `What is the main purpose of a cumulative bar graph?`,
        options: [
            "To show the accumulation of data over time",
            "To compare individual data points",
            "To highlight proportional differences",
            "To show frequency distributions"
        ],
        answer: "To show the accumulation of data over time",
    },

    {
        prompt: `When interpreting a pie chart, how can you determine the largest category?`,
        options: [
            "By finding the largest slice",
            "By checking the longest bar",
            "By looking at the highest point on the graph",
            "By identifying the most numerous data points"
        ],
        answer: "By finding the largest slice",
    },

    {
        prompt: `Which statistical method uses circular graphs to represent data visually?`,
        options: [
            "Pie charts",
            "Line graphs",
            "Histograms",
            "Box plots"
        ],
        answer: "Pie charts",
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