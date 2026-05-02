const screens = {
  title: document.getElementById("titleScreen"),
  selectTrain: document.getElementById("selectScreen"),
  playing: document.getElementById("gameScreen"),
  stopped: document.getElementById("gameScreen"),
  danger: document.getElementById("gameScreen"),
  clear: document.getElementById("resultScreen"),
  gameover: document.getElementById("resultScreen")
};

const trainChoices = document.getElementById("trainChoices");
const trainElement = document.getElementById("train");
const stage = document.getElementById("stage");
const stageDecor = document.getElementById("stageDecor");
const crossing = document.getElementById("crossing");
const signal = document.getElementById("signal");
const hazardElement = document.getElementById("hazard");
const roamHazardElement = document.getElementById("roamHazard");
const statusBadge = document.getElementById("statusBadge");
const progressBadge = document.getElementById("progressBadge");
const stageBadge = document.getElementById("stageBadge");
const trainNameLabel = document.getElementById("trainNameLabel");
const routeSign = document.getElementById("routeSign");
const goalFlag = document.getElementById("goalFlag");
const resultScreen = document.getElementById("resultScreen");
const resultHeading = document.getElementById("resultHeading");
const resultText = document.getElementById("resultText");
const confetti = document.getElementById("confetti");
const soundButton = document.getElementById("soundButton");
const actionButton = document.getElementById("actionButton");

const trains = [
  { id: "hayabusa", name: "はやぶさ風", className: "train-hayabusa bullet", speed: 48, speedLabel: "はやい" },
  { id: "komachi", name: "こまち風", className: "train-komachi bullet", speed: 48, speedLabel: "はやい" },
  { id: "yellow", name: "ドクターイエロー風", className: "train-yellow bullet", speed: 44, speedLabel: "はやめ" },
  { id: "local", name: "普通電車風", className: "train-local local", speed: 39, speedLabel: "ふつう" },
  { id: "freight", name: "貨物列車風", className: "train-freight freight", speed: 34, speedLabel: "ゆっくり" }
];

const stagePlan = [
  { eventType: "crossing", sign: "つぎのまちへ" },
  { eventType: "crossing", sign: "つぎのふみきりへ" },
  { eventType: "crossing", sign: "つぎのはしへ" },
  { eventType: "roam", sign: "つぎのえきへ" },
  { eventType: "mixed", sign: "ゴール" }
];

const backgroundThemes = [
  {
    label: "まち",
    className: "stage-town",
    hazards: ["person", "box"],
    decor: [
      ["building", "left:8%;"],
      ["building", "left:17%; height:64px;"],
      ["building", "right:18%; height:70px;"]
    ]
  },
  {
    label: "こうえん",
    className: "stage-park",
    hazards: ["person", "animal", "box"],
    decor: [
      ["park-tree", "left:10%;"],
      ["park-tree", "right:22%;"],
      ["bench", "left:23%;"]
    ]
  },
  {
    label: "かわとはし",
    className: "stage-river",
    hazards: ["person", "box"],
    decor: [
      ["river", ""],
      ["bridge", ""],
      ["park-tree", "right:12%; transform:scale(.85);"]
    ]
  },
  {
    label: "たんぼ",
    className: "stage-rice",
    hazards: ["cat", "dog", "ball", "windbox"],
    decor: [
      ["field-row", "left:8%;"],
      ["field-row", "right:16%; transform:scale(.88);"],
      ["rice-tree", "left:31%;"]
    ]
  },
  {
    label: "えきのちかく",
    className: "stage-station",
    hazards: ["bird", "cat", "ball"],
    decor: [
      ["station", "left:9%;"],
      ["platform", "left:7%;"],
      ["building", "right:16%; height:82px;"]
    ]
  },
  {
    label: "やま",
    className: "stage-mountain",
    hazards: ["person", "box", "dog"],
    decor: [
      ["rice-tree", "left:12%; transform:scale(.9);"],
      ["field-row", "right:18%;"],
      ["tower-slim", "right:11%; transform:scale(.68);"]
    ]
  },
  {
    label: "うみのちかく",
    className: "stage-seaside",
    hazards: ["bird", "ball", "windbox"],
    decor: [
      ["sea", ""],
      ["big-bridge", "right:8%; left:auto; transform:scale(.78);"],
      ["building", "left:12%; height:58px;"]
    ]
  },
  {
    label: "ビルのまち",
    className: "stage-city",
    hazards: ["person", "box", "ball"],
    decor: [
      ["building", "left:7%; height:95px;"],
      ["building", "left:16%; height:72px;"],
      ["tower-slim", "right:18%;"]
    ]
  },
  {
    label: "ゆうえんち",
    className: "stage-amusement",
    hazards: ["person", "ball", "cat"],
    decor: [
      ["wheel-bg", "left:10%;"],
      ["building", "right:20%; height:58px;"],
      ["park-tree", "right:10%; transform:scale(.78);"]
    ]
  },
  {
    label: "ドームのまち",
    className: "stage-dome",
    hazards: ["person", "box", "ball"],
    decor: [
      ["dome", "left:9%;"],
      ["building", "right:18%; height:70px;"],
      ["park-tree", "right:10%; transform:scale(.72);"]
    ]
  },
  {
    label: "タワーのまち",
    className: "stage-tower",
    hazards: ["person", "box", "bird"],
    decor: [
      ["tower-red", "left:12%;"],
      ["building", "right:18%; height:70px;"],
      ["building", "right:9%; height:58px;"]
    ]
  },
  {
    label: "みずうみ",
    className: "stage-lake",
    hazards: ["bird", "cat", "windbox"],
    decor: [
      ["lake", ""],
      ["big-bridge", "left:30%; transform:scale(.72);"],
      ["park-tree", "right:11%; transform:scale(.8);"]
    ]
  }
];

const weatherOptions = [
  { label: "はれ", className: "weather-sunny" },
  { label: "くもり", className: "weather-cloudy" },
  { label: "ゆうがた", className: "weather-evening" },
  { label: "よる", className: "weather-night" },
  { label: "あめ上がり", className: "weather-after-rain" }
];

let stages = [];

const game = {
  state: "title",
  selectedTrain: trains[0],
  trainX: 0,
  speed: 34,
  running: true,
  stageIndex: 0,
  danger: null,
  eventDone: false,
  nextDangerAt: 70,
  dangerClearAt: 0,
  lastTime: 0,
  animationId: 0
};

const audio = {
  enabled: true,
  ready: false,
  context: null,
  bgmTimer: 0,
  runTimer: 0,
  crossingTimer: 0
};

function showScreen(state) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[state].classList.add("is-active");
  game.state = state;
}

function createTrainMarkup(train, mini = false) {
  const cargoMarkup = train.id === "freight"
    ? '<span class="cargo-car cargo-one"></span><span class="cargo-car cargo-two"></span>'
    : "";
  const innerMarkup = `
    <span class="train-body">
      <span class="window-strip"></span>
      <span class="door"></span>
      <span class="train-line"></span>
      <span class="light"></span>
    </span>
    ${cargoMarkup}
    <span class="wheel wheel-one"></span>
    <span class="wheel wheel-two"></span>
  `;

  return mini ? `<span class="mini-train ${train.className}">${innerMarkup}</span>` : innerMarkup;
}

function buildTrainChoices() {
  trainChoices.innerHTML = "";
  trains.forEach((train) => {
    const button = document.createElement("button");
    button.className = `train-card ${train.id === game.selectedTrain.id ? "is-selected" : ""}`;
    button.type = "button";
    button.setAttribute("aria-pressed", train.id === game.selectedTrain.id ? "true" : "false");
    button.dataset.trainId = train.id;
    button.innerHTML = `${createTrainMarkup(train, true)}<strong>${train.name}</strong><span class="speed-label">${train.speedLabel}</span>`;
    button.addEventListener("click", () => {
      unlockAudio();
      selectTrain(train.id);
      playToneSet("select");
    });
    trainChoices.appendChild(button);
  });
}

function selectTrain(trainId) {
  game.selectedTrain = trains.find((train) => train.id === trainId) || trains[0];
  document.querySelectorAll(".train-card").forEach((card) => {
    const selected = card.dataset.trainId === trainId;
    card.classList.toggle("is-selected", selected);
    card.setAttribute("aria-pressed", selected ? "true" : "false");
  });
}

function applyTrainStyle() {
  trainElement.className = `train ${game.selectedTrain.className}`;
  trainElement.innerHTML = createTrainMarkup(game.selectedTrain, false);
  trainNameLabel.textContent = game.selectedTrain.name;
}

function resetGame() {
  cancelAnimationFrame(game.animationId);
  unlockAudio();
  stages = buildStageRoute();
  applyTrainStyle();
  game.speed = game.selectedTrain.speed;
  game.trainX = 0;
  game.running = true;
  game.stageIndex = 0;
  game.danger = null;
  game.eventDone = false;
  game.nextDangerAt = randomDangerPoint();
  game.dangerClearAt = 0;
  game.lastTime = 0;
  updateStageView();
  updateTrainPosition();
  setDanger(null);
  setStatus("すすめるよ！", "safe");
  showScreen("playing");
  playToneSet("start");
  startBgm();
  updateLoops();
  game.animationId = requestAnimationFrame(updateGame);
}

function currentStage() {
  return stages[game.stageIndex];
}

function randomDangerPoint() {
  return 48 + Math.random() * 46;
}

function buildStageRoute() {
  const shuffledThemes = shuffle(backgroundThemes);
  return stagePlan.map((slot, index) => {
    const theme = shuffledThemes[index % shuffledThemes.length];
    const weather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    return {
      ...theme,
      eventType: slot.eventType,
      sign: index === stagePlan.length - 1 ? "ゴール" : slot.sign,
      weatherLabel: weather.label,
      weatherClass: weather.className
    };
  });
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function chooseEvent(stageInfo) {
  if (stageInfo.eventType === "mixed") {
    return Math.random() < 0.55 ? "roam" : "crossing";
  }
  return stageInfo.eventType;
}

function chooseHazard(stageInfo) {
  const hazards = stageInfo.hazards;
  return hazards[Math.floor(Math.random() * hazards.length)];
}

function updateStageView() {
  const stageInfo = currentStage();
  stage.className = `stage ${stageInfo.className} ${stageInfo.weatherClass}`;
  stageBadge.textContent = `${stageInfo.label}・${stageInfo.weatherLabel}`;
  progressBadge.textContent = `ステージ ${game.stageIndex + 1} / ${stages.length}`;
  routeSign.textContent = stageInfo.sign;
  routeSign.classList.toggle("is-hidden", game.stageIndex === stages.length - 1);
  goalFlag.classList.toggle("is-hidden", game.stageIndex !== stages.length - 1);
  stageDecor.innerHTML = stageInfo.decor
    .map(([className, style]) => `<span class="${className}" style="${style}"></span>`)
    .join("");
}

function setStatus(text, mode) {
  statusBadge.textContent = text;
  statusBadge.classList.toggle("danger", mode === "danger");
  statusBadge.classList.toggle("wait", mode === "wait");
  updateActionButton();
}

function updateActionButton() {
  if (!actionButton) {
    return;
  }

  const canGo = !game.running && !game.danger && (game.state === "playing" || game.state === "stopped" || game.state === "danger");
  const shouldStop = game.running || Boolean(game.danger);

  actionButton.disabled = false;
  actionButton.classList.toggle("go", canGo);
  actionButton.classList.toggle("stop", shouldStop || !canGo);

  if (canGo) {
    actionButton.textContent = "すすむ";
    return;
  }

  if (!game.running && game.danger) {
    actionButton.textContent = "かくにん中";
    actionButton.disabled = true;
    return;
  }

  actionButton.textContent = "とまる";
}

function setDanger(danger) {
  game.danger = danger;
  const isCrossingDanger = danger && danger.kind === "crossing";
  const isRoamDanger = danger && danger.kind === "roam";

  crossing.classList.toggle("is-danger", Boolean(isCrossingDanger));
  signal.classList.toggle("danger", Boolean(isCrossingDanger));
  signal.classList.toggle("safe", !isCrossingDanger);

  hazardElement.className = isCrossingDanger ? `hazard crossing-hazard ${danger.hazard}` : "hazard crossing-hazard hidden";
  roamHazardElement.className = isRoamDanger ? `hazard roam-hazard is-moving ${danger.hazard}` : "hazard roam-hazard hidden";
  updateActionButton();
  updateLoops();
}

function triggerDanger() {
  const stageInfo = currentStage();
  const kind = chooseEvent(stageInfo);
  const hazard = chooseHazard(stageInfo);
  const clearDelay = kind === "crossing" ? 3000 + Math.random() * 1500 : 2400 + Math.random() * 1200;

  game.dangerClearAt = performance.now() + clearDelay;
  setDanger({ kind, hazard });
  setStatus("とまって！", "danger");
  showScreen("danger");
}

function clearDanger() {
  setDanger(null);
  game.eventDone = true;
  setStatus("すすめるよ！", game.running ? "safe" : "wait");
  showScreen(game.running ? "playing" : "stopped");
  playToneSet("safe");
}

function updateTrainPosition() {
  trainElement.style.setProperty("--train-x", `${game.trainX}px`);
}

function getStageMetrics() {
  const stageWidth = stage.clientWidth;
  const trainWidth = trainElement.offsetWidth;
  return {
    resetX: -trainWidth * 0.16,
    finishX: stageWidth - trainWidth - 28,
    crossingStart: stageWidth * 0.63 - trainWidth * 0.2,
    crossingEnd: stageWidth * 0.63 + 96,
    roamStart: stageWidth * 0.5 - trainWidth * 0.1,
    roamEnd: stageWidth * 0.64
  };
}

function updateGame(time) {
  if (!game.lastTime) {
    game.lastTime = time;
  }

  const deltaSeconds = Math.min((time - game.lastTime) / 1000, 0.05);
  game.lastTime = time;

  if (game.running) {
    game.trainX += game.speed * deltaSeconds;
    updateTrainPosition();
  }

  const metrics = getStageMetrics();

  if (!game.danger && !game.eventDone && game.trainX >= game.nextDangerAt && game.trainX < metrics.crossingStart - 150) {
    triggerDanger();
  }

  if (game.danger && !game.running && time >= game.dangerClearAt) {
    clearDanger();
  }

  if (game.danger && trainInDangerZone(metrics)) {
    endGame(false);
    return;
  }

  if (game.trainX >= metrics.finishX) {
    completeStage(metrics);
    return;
  }

  game.animationId = requestAnimationFrame(updateGame);
}

function trainInDangerZone(metrics) {
  const trainFront = game.trainX + trainElement.offsetWidth * 0.86;
  const trainBack = game.trainX + trainElement.offsetWidth * 0.14;
  if (game.danger.kind === "crossing") {
    return trainFront >= metrics.crossingStart && trainBack <= metrics.crossingEnd;
  }
  return trainFront >= metrics.roamStart && trainBack <= metrics.roamEnd;
}

function completeStage(metrics) {
  if (game.stageIndex >= stages.length - 1) {
    endGame(true);
    return;
  }

  game.stageIndex += 1;
  game.trainX = metrics.resetX;
  game.running = true;
  game.eventDone = false;
  game.nextDangerAt = randomDangerPoint();
  game.dangerClearAt = 0;
  game.lastTime = 0;
  updateStageView();
  updateTrainPosition();
  setDanger(null);
  setStatus("つぎのステージ", "safe");
  playToneSet("next");
  updateLoops();
  game.animationId = requestAnimationFrame(updateGame);
}

function goTrain() {
  unlockAudio();

  if (game.state === "title") {
    showScreen("selectTrain");
    startBgm();
    playToneSet("select");
    return;
  }

  if (game.state === "playing" || game.state === "stopped" || game.state === "danger") {
    game.running = true;
    showScreen(game.danger ? "danger" : "playing");
    setStatus(game.danger ? "とまって！" : "すすめるよ！", game.danger ? "danger" : "safe");
    playToneSet("go");
    updateActionButton();
    updateLoops();
  }
}

function stopTrain() {
  unlockAudio();

  if (game.state !== "playing" && game.state !== "danger" && game.state !== "stopped") {
    return;
  }

  game.running = false;
  showScreen(game.danger ? "danger" : "stopped");
  setStatus(game.danger ? "あんぜんかくにん" : "とまったよ", game.danger ? "danger" : "wait");
  playToneSet("stop");
  updateActionButton();
  updateLoops();
}

function mainAction() {
  if (game.state === "title") {
    goTrain();
    return;
  }

  if (game.running || game.danger) {
    stopTrain();
    return;
  }

  goTrain();
}

function endGame(clear) {
  cancelAnimationFrame(game.animationId);
  game.running = false;
  const lastDanger = game.danger;
  setDanger(null);
  stopRunLoop();
  stopCrossingLoop();
  resultScreen.classList.toggle("gameover", !clear);

  if (clear) {
    resultHeading.textContent = "クリア！";
    resultText.textContent = "ぜんぶ あんぜんに とおれたね";
    makeConfetti();
    playToneSet("clear");
    showScreen("clear");
    return;
  }

  resultHeading.textContent = "あぶない！";
  resultText.textContent = lastDanger && lastDanger.kind === "roam"
    ? "どうぶつやものがいたら とまろうね"
    : "ふみきりでは あんぜんかくにん";
  confetti.innerHTML = "";
  playToneSet("gameover");
  showScreen("gameover");
}

function makeConfetti() {
  const colors = ["#d94949", "#e6bd43", "#35a86b", "#2c7fb4", "#d88535"];
  confetti.innerHTML = "";

  for (let i = 0; i < 44; i += 1) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--paper", colors[i % colors.length]);
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.animationDuration = `${1.4 + Math.random() * 1.2}s`;
    confetti.appendChild(piece);
  }
}

function unlockAudio() {
  if (!audio.enabled || audio.ready) {
    return;
  }

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      audio.enabled = false;
      updateSoundButton();
      return;
    }
    audio.context = new AudioContextClass();
    audio.ready = true;
    if (audio.context.state === "suspended") {
      audio.context.resume().catch(() => {});
    }
  } catch (error) {
    audio.enabled = false;
    audio.ready = false;
    updateSoundButton();
  }
}

function note(frequency, duration = 0.16, when = 0, type = "sine", volume = 0.055) {
  if (!audio.enabled || !audio.ready || !audio.context) {
    return;
  }

  try {
    const now = audio.context.currentTime + when;
    const oscillator = audio.context.createOscillator();
    const gain = audio.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain).connect(audio.context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.04);
  } catch (error) {
    stopAllAudioLoops();
  }
}

function crossingBell() {
  note(1150, 0.075, 0, "square", 0.028);
  note(760, 0.065, 0.035, "square", 0.018);
}

function playToneSet(kind) {
  if (!audio.enabled) {
    return;
  }
  unlockAudio();

  const patterns = {
    select: [[523, 0.08, 0]],
    start: [[659, 0.1, 0], [784, 0.1, 0.1], [988, 0.18, 0.2], [784, 0.12, 0.42], [1046, 0.22, 0.56]],
    go: [[440, 0.08, 0], [587, 0.09, 0.09]],
    stop: [[392, 0.12, 0], [330, 0.16, 0.12]],
    safe: [[523, 0.11, 0], [659, 0.13, 0.12]],
    next: [[440, 0.08, 0], [554, 0.08, 0.08]],
    clear: [[523, 0.12, 0], [659, 0.12, 0.12], [784, 0.14, 0.24], [1046, 0.18, 0.39], [988, 0.12, 0.62], [1046, 0.34, 0.76]],
    gameover: [[392, 0.18, 0], [349, 0.22, 0.18]]
  };

  (patterns[kind] || []).forEach(([freq, dur, delay]) => note(freq, dur, delay, "sine", 0.055));
}

function startBgm() {
  if (!audio.enabled || audio.bgmTimer) {
    return;
  }
  unlockAudio();
  const melody = [392, 440, 494, 587, 659, 587, 494, 440];
  const bright = [784, 880, 988, 1046];
  let index = 0;
  audio.bgmTimer = window.setInterval(() => {
    if (audio.enabled && audio.ready && game.state !== "gameover") {
      const stageBoost = Math.min(game.stageIndex, 4);
      const volume = 0.018 + stageBoost * 0.0025;
      note(melody[index % melody.length], 0.18, 0, "sine", volume);
      if (stageBoost >= 2 && index % 2 === 0) {
        note(bright[(index + stageBoost) % bright.length], 0.08, 0.08, "triangle", 0.012);
      }
      if (stageBoost >= 4 && index % 4 === 1) {
        note(1175, 0.1, 0.16, "sine", 0.013);
      }
      index += 1;
    }
  }, 560);
}

function startRunLoop() {
  if (!audio.enabled || audio.runTimer) {
    return;
  }
  unlockAudio();
  audio.runTimer = window.setInterval(() => {
    if (game.running && (game.state === "playing" || game.state === "danger")) {
      note(145, 0.045, 0, "triangle", 0.022);
      note(185, 0.045, 0.14, "triangle", 0.016);
    }
  }, 380);
}

function stopRunLoop() {
  if (audio.runTimer) {
    window.clearInterval(audio.runTimer);
    audio.runTimer = 0;
  }
}

function startCrossingLoop() {
  if (!audio.enabled || audio.crossingTimer) {
    return;
  }
  unlockAudio();
  crossingBell();
  audio.crossingTimer = window.setInterval(() => {
    if (game.danger && game.danger.kind === "crossing") {
      crossingBell();
    }
  }, 360);
}

function stopCrossingLoop() {
  if (audio.crossingTimer) {
    window.clearInterval(audio.crossingTimer);
    audio.crossingTimer = 0;
  }
}

function updateLoops() {
  if (!audio.enabled) {
    stopAllAudioLoops();
    return;
  }

  if (game.running && (game.state === "playing" || game.state === "danger")) {
    startRunLoop();
  } else {
    stopRunLoop();
  }

  if (game.danger && game.danger.kind === "crossing") {
    startCrossingLoop();
  } else {
    stopCrossingLoop();
  }
}

function stopAllAudioLoops() {
  if (audio.bgmTimer) {
    window.clearInterval(audio.bgmTimer);
    audio.bgmTimer = 0;
  }
  stopRunLoop();
  stopCrossingLoop();
}

function updateSoundButton() {
  soundButton.textContent = audio.enabled ? "おと ON" : "おと OFF";
  soundButton.setAttribute("aria-pressed", audio.enabled ? "true" : "false");
}

document.getElementById("toSelectButton").addEventListener("click", () => {
  unlockAudio();
  startBgm();
  playToneSet("select");
  showScreen("selectTrain");
});

document.getElementById("startButton").addEventListener("click", resetGame);

document.getElementById("retryButton").addEventListener("click", () => {
  unlockAudio();
  playToneSet("select");
  showScreen("title");
});

actionButton.addEventListener("click", mainAction);

soundButton.addEventListener("click", () => {
  audio.enabled = !audio.enabled;
  if (!audio.enabled) {
    stopAllAudioLoops();
  } else {
    unlockAudio();
    startBgm();
    updateLoops();
    playToneSet("select");
  }
  updateSoundButton();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    mainAction();
  }

  if (event.code === "Enter" || event.code === "ArrowRight") {
    event.preventDefault();
    mainAction();
  }
});

window.addEventListener("resize", updateTrainPosition);

stages = buildStageRoute();
buildTrainChoices();
applyTrainStyle();
updateStageView();
updateSoundButton();
updateActionButton();
showScreen("title");
