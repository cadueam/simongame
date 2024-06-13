document.addEventListener("DOMContentLoaded", () => {
  const btnStart = document.getElementById("btnStart");
  const buttons = document.querySelectorAll(".btn");
  const levelDisplay = document.getElementById("level");
  const highestScoreDisplay = document.querySelector("h3");
  let sequence = [];
  let playerSequence = [];
  let level = 0;
  let highestScore = 0;

  btnStart.addEventListener("click", startGame);

  buttons.forEach((button) => {
    button.addEventListener("click", handlePlayerInput);
  });

  function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    nextLevel();
  }

  function nextLevel() {
    level++;
    playerSequence = [];
    levelDisplay.textContent = `Level ${level}`;
    generateSequence();
    displaySequence();
  }

  function generateSequence() {
    const nextColor = Math.floor(Math.random() * 4);
    sequence.push(nextColor);
  }

  function displaySequence() {
    buttons.forEach((button) => {
      button.disabled = true;
    });

    let i = 0;
    const interval = setInterval(() => {
      const button = document.getElementById(`btn${sequence[i]}`);
      button.classList.add("active");

      setTimeout(() => {
        button.classList.remove("active");
      }, 500);

      i++;

      if (i >= sequence.length) {
        clearInterval(interval);
        buttons.forEach((button) => {
          button.disabled = false;
        });
      }
    }, 1000);
  }

  function handlePlayerInput(event) {
    const clickedButton = event.target;
    const color = parseInt(clickedButton.getAttribute("data-value"));
    playerSequence.push(color);
    clickedButton.classList.add("active");

    setTimeout(() => {
      clickedButton.classList.remove("active");
    }, 500);

    checkPlayerInput();
  }

  function checkPlayerInput() {
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
      endGame();
      return;
    }

    if (playerSequence.length === sequence.length) {
      if (level > highestScore) {
        highestScore = level;
        highestScoreDisplay.textContent = `Your Highest Score: ${highestScore}`;
      }
      setTimeout(nextLevel, 1000);
    }
  }

  function endGame() {
    alert("Game Over!");
    btnStart.textContent = "Restart";
  }
});
