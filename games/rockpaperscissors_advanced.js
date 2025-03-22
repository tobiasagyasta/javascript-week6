const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return `It's a tie! You both chose ${playerChoice}.`;
  }

  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return `You win! ${playerChoice} beats ${computerChoice}.`;
  } else {
    return `You lose! ${computerChoice} beats ${playerChoice}.`;
  }
}

rl.question("Enter Rock, Paper, or Scissors: ", (playerInput) => {
  const playerChoice = playerInput.trim().toLowerCase();
  const validChoices = ["rock", "paper", "scissors"];

  if (!validChoices.includes(playerChoice)) {
    console.log("Invalid choice! Please enter Rock, Paper, or Scissors.");
  } else {
    const computerChoice = getComputerChoice();
    console.log(`Computer chose: ${computerChoice}`);
    console.log(determineWinner(playerChoice, computerChoice));
  }
  rl.close();
});
