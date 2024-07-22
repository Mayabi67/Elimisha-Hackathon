// script.js

let questions = [
    {
        prompt: `What is the primary difference between continuous and discontinuous variations?`,
        options: [
            "Continuous variation shows a range of phenotypes, while discontinuous variation has distinct categories",
            "Continuous variation involves genetic mutations, while discontinuous variation does not",
            "Continuous variation is influenced by environmental factors, while discontinuous variation is purely genetic",
            "Continuous variation is visible in animals only, while discontinuous variation is visible in plants only"
        ],
        answer: "Continuous variation shows a range of phenotypes, while discontinuous variation has distinct categories",
    },

    {
        prompt: `Which of the following correctly describes the structure of chromosomes?`,
        options: [
            "Chromosomes are made of RNA and proteins",
            "Chromosomes consist of DNA coiled around histone proteins",
            "Chromosomes are composed of lipids and carbohydrates",
            "Chromosomes are made up of amino acids"
        ],
        answer: "Chromosomes consist of DNA coiled around histone proteins",
    },

    {
        prompt: `What does Mendel's first law of inheritance state?`,
        options: [
            "Genes for different traits are inherited independently of one another",
            "Each parent contributes one allele for each trait, and alleles segregate during gamete formation",
            "All alleles are dominant and recessive traits are not expressed",
            "Genetic traits are always inherited together"
        ],
        answer: "Each parent contributes one allele for each trait, and alleles segregate during gamete formation",
    },

    {
        prompt: `How is a Punnett square used in genetics?`,
        options: [
            "To calculate the probability of offspring inheriting certain traits",
            "To determine the physical appearance of organisms",
            "To measure the size of chromosomes",
            "To map the location of genes on a chromosome"
        ],
        answer: "To calculate the probability of offspring inheriting certain traits",
    },

    {
        prompt: `Which term describes the genetic makeup of an organism, while the term describing the observable characteristics is known as?`,
        options: [
            "Genotype; Phenotype",
            "Phenotype; Genotype",
            "Homozygosity; Heterozygosity",
            "Dominance; Recessiveness"
        ],
        answer: "Genotype; Phenotype",
    },

    {
        prompt: `What is the difference between haploidy and diploidy?`,
        options: [
            "Haploidy refers to having one set of chromosomes, while diploidy refers to having two sets",
            "Haploidy involves double the number of chromosomes compared to diploidy",
            "Haploidy occurs in somatic cells, while diploidy occurs in gametes",
            "Haploidy is the same as homozygosity, while diploidy is the same as heterozygosity"
        ],
        answer: "Haploidy refers to having one set of chromosomes, while diploidy refers to having two sets",
    },

    {
        prompt: `How is the ABO blood group inheritance pattern explained?`,
        options: [
            "It is determined by multiple alleles with codominance and dominance relationships",
            "It is a result of a single dominant allele controlling the blood type",
            "It follows a Mendelian recessive inheritance pattern",
            "It is determined by environmental factors rather than genetics"
        ],
        answer: "It is determined by multiple alleles with codominance and dominance relationships",
    },

    {
        prompt: `Which of the following is an example of a genetically inherited disorder?`,
        options: [
            "Cystic fibrosis",
            "Asthma",
            "Diabetes type 2",
            "Hypertension"
        ],
        answer: "Cystic fibrosis",
    },

    {
        prompt: `What typically causes chromosomal mutations?`,
        options: [
            "Errors during DNA replication or cell division",
            "Exposure to certain chemicals or radiation",
            "Errors during protein synthesis",
            "Nutritional deficiencies"
        ],
        answer: "Errors during DNA replication or cell division",
    },

    {
        prompt: `What is a practical application of genetics in modern medicine?`,
        options: [
            "Genetic screening for inherited diseases",
            "Determining the color of fruits",
            "Improving plant growth rates",
            "Selecting animal breeding pairs based on size"
        ],
        answer: "Genetic screening for inherited diseases",
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