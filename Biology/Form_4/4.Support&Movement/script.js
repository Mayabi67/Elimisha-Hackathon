// script.js

let questions = [
    {
        prompt: `Why is support and movement necessary for animals and plants?`,
        options: [
            "Support helps maintain structural integrity, while movement is essential for obtaining resources and reproduction",
            "Support prevents environmental changes, and movement is unnecessary",
            "Support is only necessary for animals, and movement is only necessary for plants",
            "Support and movement are irrelevant to survival"
        ],
        answer: "Support helps maintain structural integrity, while movement is essential for obtaining resources and reproduction",
    },

    {
        prompt: `How do supporting tissues differ in young and old plants?`,
        options: [
            "Young plants have more flexible and less lignified tissues, while old plants have more rigid and lignified tissues",
            "Young plants have lignified tissues, while old plants have more flexible tissues",
            "Young and old plants have the same type of supporting tissues",
            "Young plants have no supporting tissues, while old plants have complex ones"
        ],
        answer: "Young plants have more flexible and less lignified tissues, while old plants have more rigid and lignified tissues",
    },

    {
        prompt: `What are the functions of the exoskeleton and endoskeleton in animals?`,
        options: [
            "Exoskeleton provides external support and protection, while endoskeleton provides internal support and facilitates movement",
            "Exoskeleton and endoskeleton serve the same functions",
            "Exoskeleton provides internal support, and endoskeleton provides external protection",
            "Exoskeleton is used for locomotion, while endoskeleton is used for respiration"
        ],
        answer: "Exoskeleton provides external support and protection, while endoskeleton provides internal support and facilitates movement",
    },

    {
        prompt: `How does locomotion occur in a finned fish?`,
        options: [
            "By using its fins and body undulations to push against water",
            "By using its gills to create a current",
            "By contracting its muscles to create a vacuum",
            "By crawling on the ocean floor"
        ],
        answer: "By using its fins and body undulations to push against water",
    },

    {
        prompt: `Which bones are part of the axial skeleton in mammals?`,
        options: [
            "Skull, vertebral column, and rib cage",
            "Limbs and pelvis",
            "Shoulder girdle and arms",
            "Pelvis and legs"
        ],
        answer: "Skull, vertebral column, and rib cage",
    },

    {
        prompt: `What are the functions of different types of joints in mammals?`,
        options: [
            "Hinge joints allow movement in one direction, ball-and-socket joints allow multi-directional movement, and pivot joints allow rotation",
            "Hinge joints allow rotation, ball-and-socket joints allow limited movement, and pivot joints provide no movement",
            "All joints in mammals are fixed and do not allow movement",
            "Joints only serve to connect bones without allowing movement"
        ],
        answer: "Hinge joints allow movement in one direction, ball-and-socket joints allow multi-directional movement, and pivot joints allow rotation",
    },

    {
        prompt: `How do muscles bring about movement in mammals?`,
        options: [
            "Muscles contract and pull on bones to produce movement",
            "Muscles expand and push against external surfaces",
            "Muscles create chemical reactions to move bones",
            "Muscles relax and create a vacuum to move bones"
        ],
        answer: "Muscles contract and pull on bones to produce movement",
    },

    {
        prompt: `Which of the following is NOT a type of muscle tissue in mammals?`,
        options: [
            "Smooth muscle",
            "Cardiac muscle",
            "Skeletal muscle",
            "Elastic muscle"
        ],
        answer: "Elastic muscle",
    },

    {
        prompt: `Where is smooth muscle found and what is its function?`,
        options: [
            "In the walls of internal organs, controlling involuntary movements",
            "In the skeletal system, aiding voluntary movement",
            "In the heart, facilitating heartbeat",
            "In the limbs, providing structure and support"
        ],
        answer: "In the walls of internal organs, controlling involuntary movements",
    },

    {
        prompt: `What is the primary function of skeletal muscle tissue?`,
        options: [
            "To facilitate voluntary movement of the limbs and body",
            "To regulate heartbeat",
            "To control the movement of internal organs",
            "To provide structural support to the body"
        ],
        answer: "To facilitate voluntary movement of the limbs and body",
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