function determineWinner(playerChoice, computerChoice) {
  const choices = ["rock", "paper", "scissors"];

  // Validate choices
  if (!choices.includes(playerChoice) || !choices.includes(computerChoice)) {
    return "Invalid choice!";
  }

  // Check for a tie
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  }

  // Define winning conditions (Using an object instead of multiple if statements)
  const winningConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  console.log(Object.values(winningConditions));
  console.log(playerChoice + " " + winningConditions[playerChoice]);

  // Determine winner
  return winningConditions[playerChoice] === computerChoice
    ? "You win!"
    : "You lose!";
}

// Example usage:
console.log(determineWinner("rock", "scissors")); // "You win!"
console.log(determineWinner("paper", "rock")); // "You win!"
console.log(determineWinner("scissors", "scissors")); // "It's a tie!"
console.log(determineWinner("rock", "paper")); // "You lose!"
