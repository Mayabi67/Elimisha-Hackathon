// script.js

let questions = [
    {
        prompt: `What is the meaning of evolution?`,
        options: [
            "The process by which organisms change over time through genetic variation and natural selection",
            "The method of creating new species through artificial breeding",
            "The sudden appearance of new species due to environmental changes",
            "The theory that all organisms have existed in their current form since the beginning of time"
        ],
        answer: "The process by which organisms change over time through genetic variation and natural selection",
    },

    {
        prompt: `What is one current concept of evolution?`,
        options: [
            "Evolution occurs only through random genetic mutations",
            "Evolution is driven solely by environmental changes",
            "Evolution is a gradual process that involves both genetic variation and natural selection",
            "Evolution results in the perfect adaptation of organisms to their environment"
        ],
        answer: "Evolution is a gradual process that involves both genetic variation and natural selection",
    },

    {
        prompt: `What does the term "struggle for existence" refer to in evolutionary theory?`,
        options: [
            "The competition between individuals and species for limited resources",
            "The effort organisms make to find mates",
            "The challenge of adapting to new environments",
            "The physical fight between predators and prey"
        ],
        answer: "The competition between individuals and species for limited resources",
    },

    {
        prompt: `What is meant by "survival of the fittest"?`,
        options: [
            "Only the strongest individuals survive in all situations",
            "Individuals that are best adapted to their environment are more likely to survive and reproduce",
            "The fittest organisms are those that live the longest",
            "Survival of the fittest means only the largest individuals survive"
        ],
        answer: "Individuals that are best adapted to their environment are more likely to survive and reproduce",
    },

    {
        prompt: `Which of the following is considered evidence for organic evolution?`,
        options: [
            "Fossil records showing gradual changes in species over time",
            "The uniformity of genetic material across all organisms",
            "The absence of genetic variation in modern species",
            "The consistent size and shape of organisms throughout history"
        ],
        answer: "Fossil records showing gradual changes in species over time",
    },

    {
        prompt: `How does antibiotic resistance occur in bacteria?`,
        options: [
            "Through the accumulation of mutations that allow bacteria to survive drug treatment",
            "By preventing the bacteria from reproducing",
            "By destroying the antibiotic before it can act",
            "Through the direct destruction of the bacteria by the antibiotic"
        ],
        answer: "Through the accumulation of mutations that allow bacteria to survive drug treatment",
    },

    {
        prompt: `What is the role of fungicide resistance in fungi?`,
        options: [
            "Fungi develop mutations that make them resistant to fungicides, allowing them to survive and reproduce",
            "Fungicides become more effective over time",
            "Fungi develop resistance by avoiding exposure to fungicides",
            "Fungicide resistance is not observed in fungi"
        ],
        answer: "Fungi develop mutations that make them resistant to fungicides, allowing them to survive and reproduce",
    },

    {
        prompt: `What causes pesticide resistance in insects?`,
        options: [
            "Insects with mutations that confer resistance survive and reproduce, passing these traits to their offspring",
            "Pesticides become less effective over time",
            "Insects develop resistance by avoiding contact with pesticides",
            "Resistance is caused by a lack of genetic variation in insect populations"
        ],
        answer: "Insects with mutations that confer resistance survive and reproduce, passing these traits to their offspring",
    },

    {
        prompt: `Which of the following is NOT evidence for organic evolution?`,
        options: [
            "Comparative anatomy showing homologous structures",
            "Molecular biology revealing similarities in DNA sequences across species",
            "The use of identical genes in all species",
            "Embryological development patterns across different species"
        ],
        answer: "The use of identical genes in all species",
    },

    {
        prompt: `Which concept explains the development of antibiotic resistance in bacteria?`,
        options: [
            "Natural selection favoring resistant individuals",
            "Genetic drift leading to random changes in allele frequencies",
            "Gene flow between populations of bacteria",
            "Sexual selection for non-resistant traits"
        ],
        answer: "Natural selection favoring resistant individuals",
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