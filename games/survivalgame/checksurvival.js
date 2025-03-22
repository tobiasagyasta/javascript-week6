function checkSurvival(timeSurvived, isHit) {
  if (isHit) {
    return `Game Over! You survived for ${timeSurvived} seconds.`;
  }
  return `Keep going! You've survived ${timeSurvived} seconds so far.`;
}
