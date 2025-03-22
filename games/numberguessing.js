const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function numberGuessingGame() {
  const secretNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1-100
  let attemptsLeft = 5; // Number of attempts

  console.log("Welcome to the Number Guessing Game!");
  console.log("Guess a number between 1 and 100. You have 5 attempts.");

  function getUserGuess() {
    if (attemptsLeft === 0) {
      console.log(`Game over! The correct number was ${secretNumber}.`);
      rl.close();
      return;
    }

    rl.question(
      `Attempts left: ${attemptsLeft}\nEnter your guess: `,
      function (input) {
        const playerGuess = parseInt(input, 10);

        if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100) {
          console.log(
            "Invalid input! Please enter a number between 1 and 100."
          );
        } else if (playerGuess === secretNumber) {
          console.log("🎉 Congratulations! You guessed the right number!");
          rl.close();
          return;
        } else {
          console.log(
            playerGuess > secretNumber
              ? "Too high! Try again."
              : "Too low! Try again."
          );
          attemptsLeft--;
        }

        getUserGuess(); // Ask again
      }
    );
  }

  getUserGuess(); // Start the game loop
}

// Run the game
numberGuessingGame();
