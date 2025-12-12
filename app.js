const totalGames = document.getElementById("total-games");
const totalWins = document.getElementById("total-wins");
const totalLosses = document.getElementById("total-losses");
const totalTies = document.getElementById("total-ties");
const currentStreak = document.getElementById("current-streak");
const winRate = document.getElementById("win-rate");
const currentPointsInput = document.getElementById("points-current");
const points = document.getElementById("points");
const rachaActualInput = document.getElementById("racha-actual");
const gapText = document.getElementById("gapText");
let gap = 0;
let streakPoints = 0;
let pointsValue = 0;
let pointsBase = 10;

const updateTotalGames = () => {
  const value = parseInt(totalGames.textContent);
  totalGames.textContent = value + 1;
};

const updateWinRate = () => {
  const valueTotalLosses = parseInt(totalLosses.textContent);
  const valueTotalWins = parseInt(totalWins.textContent);

  const valueRate =
    (valueTotalWins / (valueTotalWins + valueTotalLosses)) * 100;
  winRate.textContent = `${valueRate.toFixed(2)}%`;
  currentPointsInput.value = pointsValue;
  gapText.textContent = gap > 0 ? `+${gap}` : gap;

  gapText.style.setProperty(
    "color",
    gap === 0 ? "var(--zero)" : gap > 0 ? "var(--positive)" : "var(--negative)"
  );
};

const updateTotalWins = () => {
  const value = parseInt(totalWins.textContent);
  totalWins.textContent = value + 1;
  pointsValue += pointsBase + streakPoints;
  points.textContent = pointsValue;
  localStorage.setItem("points", pointsValue);
  gap += pointsBase + streakPoints;
};

const updateTotalLoss = () => {
  const value = parseInt(totalLosses.textContent);
  totalLosses.textContent = value + 1;
  pointsValue -= pointsBase;
  points.textContent = pointsValue;
  gap -= 10;
};

const updateTotalTies = () => {
  const value = parseInt(totalTies.textContent);
  totalTies.textContent = value + 1;
  points.textContent = pointsValue;
  localStorage.setItem("points", pointsValue);
};

const updateCurrentStreak = (result) => {
  const streak = parseInt(currentStreak.textContent);

  if (result === "win") {
    if (streak + 1 > 1)
      streakPoints = streakPoints < 12 ? streakPoints + 3 : 12;
    currentStreak.textContent = `${streak + 1}`;
    rachaActualInput.value = streak + 1;
  }
  if (result === "loss") {
    streakPoints = 0;
    currentStreak.textContent = `${0}`;
    rachaActualInput.value = 0;
  }
  if (result === "tie") {
    streakPoints = 0;
    currentStreak.textContent = `${0}`;
    rachaActualInput.value = 0;
  }
};

window.addEventListener("load", () => {
  const saved = localStorage.getItem("points");

  if (saved !== null) {
    pointsValue = Number(saved);
  } else {
    localStorage.setItem("points", pointsValue);
  }

  points.textContent = pointsValue;
  currentPointsInput.value = pointsValue;
});

addEventListener("click", (event) => {
  if (event.target.id === "win") {
    updateCurrentStreak("win");
    updateTotalGames();
    updateTotalWins();
    updateWinRate();
  }

  if (event.target.id === "loss") {
    updateCurrentStreak("loss");
    updateTotalGames();
    updateTotalLoss();
    updateWinRate();
  }

  if (event.target.id === "tie") {
    updateCurrentStreak("tie");
    updateTotalGames();
    updateTotalTies();
  }
});

addEventListener("change", (e) => {
  if (e.target.id === "points-current") {
    pointsValue = parseInt(currentPointsInput.value);
    localStorage.setItem("points", pointsValue);
    points.textContent = pointsValue;
  }

  if (e.target.id === "racha-actual") {
    const racha = parseInt(rachaActualInput.value) || 0;
    currentStreak.textContent = racha;

    streakPoints = 0;
    if (racha > 1) streakPoints = Math.min((racha - 1) * 3, 12);
  }
});
