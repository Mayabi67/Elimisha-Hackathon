// script.js

let questions = [
    {
        prompt: `What is the definition of irritability in living organisms?`,
        options: [
            "The ability of an organism to respond to environmental changes",
            "The process by which organisms grow and develop",
            "The capacity to reproduce and produce offspring",
            "The tendency to become inactive in response to stress"
        ],
        answer: "The ability of an organism to respond to environmental changes",
    },

    {
        prompt: `What is a stimulus in biological terms?`,
        options: [
            "A change in the environment that triggers a response in an organism",
            "The internal condition of an organism at rest",
            "The result of a biological response",
            "A type of plant hormone"
        ],
        answer: "A change in the environment that triggers a response in an organism",
    },

    {
        prompt: `How does a tactic response differ from a tropic response?`,
        options: [
            "Tactic responses involve movement towards or away from a stimulus, while tropic responses involve growth towards or away from a stimulus",
            "Tropic responses are faster than tactic responses",
            "Tactic responses are specific to plants, while tropic responses are specific to animals",
            "Tropic responses are voluntary, while tactic responses are involuntary"
        ],
        answer: "Tactic responses involve movement towards or away from a stimulus, while tropic responses involve growth towards or away from a stimulus",
    },

    {
        prompt: `What role do plant hormones play in tropic responses?`,
        options: [
            "They regulate the direction and rate of growth in response to environmental stimuli",
            "They are responsible for photosynthesis",
            "They control the color of flowers",
            "They influence the reproductive cycle of plants"
        ],
        answer: "They regulate the direction and rate of growth in response to environmental stimuli",
    },

    {
        prompt: `Which of the following is NOT a function of the mammalian nervous system?`,
        options: [
            "Receiving and processing sensory information",
            "Regulating hormonal balance",
            "Coordinating voluntary and involuntary actions",
            "Facilitating communication between different body parts"
        ],
        answer: "Regulating hormonal balance",
    },

    {
        prompt: `What is the difference between simple reflex actions and conditioned reflex actions?`,
        options: [
            "Simple reflex actions are automatic and involve a direct response to a stimulus, while conditioned reflex actions are learned and involve associations between stimuli",
            "Simple reflex actions are voluntary, while conditioned reflex actions are involuntary",
            "Conditioned reflex actions are faster than simple reflex actions",
            "Simple reflex actions involve multiple brain regions, while conditioned reflex actions are localized"
        ],
        answer: "Simple reflex actions are automatic and involve a direct response to a stimulus, while conditioned reflex actions are learned and involve associations between stimuli",
    },

    {
        prompt: `What is the role of the endocrine system in humans?`,
        options: [
            "It regulates physiological processes through the release of hormones",
            "It facilitates muscle contraction",
            "It processes sensory information",
            "It provides structural support to the body"
        ],
        answer: "It regulates physiological processes through the release of hormones",
    },

    {
        prompt: `How does drug abuse affect human health?`,
        options: [
            "It can lead to addiction, mental health issues, and damage to various organs",
            "It improves overall physical fitness",
            "It enhances cognitive abilities",
            "It has no significant impact on health"
        ],
        answer: "It can lead to addiction, mental health issues, and damage to various organs",
    },

    {
        prompt: `Which part of the human ear is responsible for converting sound waves into electrical signals?`,
        options: [
            "Cochlea",
            "Ear drum",
            "Ossicles",
            "Auricle"
        ],
        answer: "Cochlea",
    },

    {
        prompt: `What is the role of the retina in the human eye?`,
        options: [
            "It converts light into electrical signals that are sent to the brain",
            "It focuses light onto the lens",
            "It regulates the amount of light entering the eye",
            "It maintains the shape of the eye"
        ],
        answer: "It converts light into electrical signals that are sent to the brain",
    },

    {
        prompt: `Which condition of the eye is characterized by difficulty seeing distant objects clearly, and how is it corrected?`,
        options: [
            "Myopia (nearsightedness), corrected with concave lenses",
            "Hyperopia (farsightedness), corrected with convex lenses",
            "Astigmatism, corrected with cylindrical lenses",
            "Presbyopia, corrected with bifocal lenses"
        ],
        answer: "Myopia (nearsightedness), corrected with concave lenses",
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