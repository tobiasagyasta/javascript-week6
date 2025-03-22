const dialogues = {
  intro: "Welcome, traveler! What brings you here?",
  enemy_attack: "The monster lunges at you!",
  victory: "You have defeated the monster!",
  game_over: "You have fallen. Try again?",
  boss_ambush: "The boss suddenly attacks!",
};

function getDialogue(scene) {
  return dialogues[scene] || "No dialogue found.";
}

// Example usage:
console.log(getDialogue("intro")); // "Welcome, traveler! What brings you here?"
console.log(getDialogue("enemy_attack")); // "The monster lunges at you!"
console.log(getDialogue("unknown")); // "No dialogue found."
