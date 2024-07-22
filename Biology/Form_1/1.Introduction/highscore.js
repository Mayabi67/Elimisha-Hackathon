// Function to print high scores
function printHighscores() {
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscores.sort((a, b) => b.score - a.score);

    const olEl = document.getElementById("highscores");
    olEl.innerHTML = ""; // Clear existing list items

    highscores.forEach(score => {
        let liTag = document.createElement("li");
        liTag.textContent = `${score.name} - ${score.score}`;
        olEl.appendChild(liTag);
    });
}

// Function to clear high scores
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    printHighscores(); // Refresh the list to reflect changes
}

// Attach event listener to the clear button
document.getElementById("clear").addEventListener("click", clearHighscores);

// Print high scores on page load
printHighscores();
