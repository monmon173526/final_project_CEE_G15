document.addEventListener("DOMContentLoaded", () => {
  const player2Button = document.getElementById("2p-button");
  player2Button.addEventListener("click", () => {
    window.location.href = "twoPlayer.html";
  }); 

  const player3Button = document.getElementById("3p-button");
  player3Button.addEventListener("click", () => {
    window.location.href = "threePlayer.html";
  });

  const player4Button = document.getElementById("4p-button");
  player4Button.addEventListener("click", () => {
    window.location.href = "fourPlayer.html";
  });

  const leaderboardButton = document.getElementById("leaderboard-button");
  leaderboardButton.addEventListener("click", () => {
    window.location.href = "leaderboard.html";
  });
});
