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
const routeSign = document.getElementById("routeSign");
const goalFlag = document.getElementById("goalFlag");
const resultScreen = document.getElementById("resultScreen");
const resultHeading = document.getElementById("resultHeading");
const resultText = document.getElementById("resultText");
const resultHint = document.getElementById("resultHint");
const confetti = document.getElementById("confetti");
const soundButton = document.getElementById("soundButton");
const speedButton = document.getElementById("speedButton");
const speedMeter = document.getElementById("speedMeter");
const speedLabel = document.getElementById("speedLabel");
const speedFill = document.getElementById("speedFill");

const trains = [
  { id: "hayabusa", name: "はやぶさ風", className: "train-hayabusa bullet", baseSpeed: 48, accel: 28, brake: 32, speedLabel: "はやい" },
  { id: "komachi", name: "こまち風", className: "train-komachi bullet", baseSpeed: 48, accel: 28, brake: 32, speedLabel: "はやい" },
  { id: "yellow", name: "ドクターイエロー風", className: "train-yellow bullet", baseSpeed: 44, accel: 25, brake: 34, speedLabel: "はやめ" },
  { id: "local", name: "普通電車風", className: "train-local local", baseSpeed: 39, accel: 21, brake: 39, speedLabel: "ふつう" },
  { id: "freight", name: "貨物列車風", className: "train-freight freight", baseSpeed: 34, accel: 17, brake: 44, speedLabel: "ゆっくり" }
];

const speedSteps = [
  { label: "ゆっくり", multiplier: 0.42 },
  { label: "ふつう", multiplier: 0.72 },
  { label: "はやい", multiplier: 1.05 },
  { label: "さいこうそく", multiplier: 1.62 }
];

const crossingHazards = ["person", "car"];
const obstacleHazards = ["cat", "dog"];

const holdToBrakeDelay = 220;

const stagePlan = [
  { sign: "つぎのまちへ" },
  { sign: "つぎのふみきりへ" },
  { sign: "つぎのはしへ" },
  { sign: "つぎのえきへ" },
  { sign: "ゴール" }
];

const backgroundThemes = [
  {
    label: "まち",
    className: "stage-town",
    hazards: ["cat"],
    decor: [
      ["building", "left:8%;"],
      ["building", "left:17%; height:64px;"],
      ["building", "right:18%; height:70px;"]
    ]
  },
  {
    label: "こうえん",
    className: "stage-park",
    hazards: ["dog", "cat"],
    decor: [
      ["park-tree", "left:10%;"],
      ["park-tree", "right:22%;"],
      ["bench", "left:23%;"]
    ]
  },
  {
    label: "かわとはし",
    className: "stage-river",
    hazards: ["cat", "dog"],
    decor: [
      ["river", ""],
      ["bridge", ""],
      ["park-tree", "right:12%; transform:scale(.85);"]
    ]
  },
  {
    label: "たんぼ",
    className: "stage-rice",
    hazards: ["cat", "dog", "windbox"],
    decor: [
      ["field-row", "left:8%;"],
      ["field-row", "right:16%; transform:scale(.88);"],
      ["rice-tree", "left:31%;"]
    ]
  },
  {
    label: "えきのちかく",
    className: "stage-station",
    hazards: ["cat", "dog"],
    decor: [
      ["station", "left:9%;"],
      ["platform", "left:7%;"],
      ["building", "right:16%; height:82px;"]
    ]
  },
  {
    label: "やま",
    className: "stage-mountain",
    hazards: ["dog", "cat"],
    decor: [
      ["rice-tree", "left:12%; transform:scale(.9);"],
      ["field-row", "right:18%;"],
      ["tower-slim", "right:11%; transform:scale(.68);"]
    ]
  },
  {
    label: "うみのちかく",
    className: "stage-seaside",
    hazards: ["cat", "dog", "windbox"],
    decor: [
      ["sea", ""],
      ["big-bridge", "right:8%; left:auto; transform:scale(.78);"],
      ["building", "left:12%; height:58px;"]
    ]
  },
  {
    label: "ビルのまち",
    className: "stage-city",
    hazards: ["cat", "dog"],
    decor: [
      ["building", "left:7%; height:95px;"],
      ["building", "left:16%; height:72px;"],
      ["tower-slim", "right:18%;"]
    ]
  },
  {
    label: "ゆうえんち",
    className: "stage-amusement",
    hazards: ["dog", "cat"],
    decor: [
      ["wheel-bg", "left:10%;"],
      ["building", "right:20%; height:58px;"],
      ["park-tree", "right:10%; transform:scale(.78);"]
    ]
  },
  {
    label: "ドームのまち",
    className: "stage-dome",
    hazards: ["cat", "dog", "windbox"],
    decor: [
      ["dome", "left:9%;"],
      ["building", "right:18%; height:70px;"],
      ["park-tree", "right:10%; transform:scale(.72);"]
    ]
  },
  {
    label: "タワーのまち",
    className: "stage-tower",
    hazards: ["cat", "dog"],
    decor: [
      ["tower-red", "left:12%;"],
      ["building", "right:18%; height:70px;"],
      ["building", "right:9%; height:58px;"]
    ]
  },
  {
    label: "みずうみ",
    className: "stage-lake",
    hazards: ["cat", "dog", "windbox"],
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
  currentSpeed: 0,
  targetSpeed: 0,
  speedStepIndex: 0,
  braking: false,
  running: true,
  stageIndex: 0,
  danger: null,
  eventIndex: 0,
  nextDangerAt: 70,
  dangerClearAt: 0,
  lastTime: 0,
  animationId: 0
};

const input = {
  spacePressed: false,
  brakeTriggeredByHold: false,
  holdTimer: 0,
  spaceConfirmLocked: false
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
}

function getStepSpeed(stepIndex = game.speedStepIndex) {
  return game.selectedTrain.baseSpeed * speedSteps[stepIndex].multiplier;
}

function setSpeedStep(stepIndex) {
  game.speedStepIndex = stepIndex % speedSteps.length;
  game.targetSpeed = getStepSpeed();
  game.braking = false;
  game.running = true;
  updateSpeedMeter();
}

function resetGame() {
  cancelAnimationFrame(game.animationId);
  clearSpaceHold();
  input.brakeTriggeredByHold = false;
  input.spaceConfirmLocked = false;
  unlockAudio();
  stages = buildStageRoute();
  applyTrainStyle();
  game.trainX = 0;
  game.speedStepIndex = 0;
  game.currentSpeed = getStepSpeed(0);
  game.targetSpeed = game.currentSpeed;
  game.braking = false;
  game.running = true;
  game.stageIndex = 0;
  game.danger = null;
  game.eventIndex = 0;
  game.nextDangerAt = randomDangerPoint();
  game.dangerClearAt = 0;
  game.lastTime = 0;
  updateStageView();
  updateTrainPosition();
  updateSpeedMeter();
  updateResultHint();
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
  return 28 + Math.random() * 34;
}

function getStageEventChances(index) {
  return {
    crossingChance: index === 0 ? 1 : index === 1 ? 0.9 : 0.75,
    roamChance: index === 0 ? 0.25 : index === 1 ? 0.45 : 0.7
  };
}

function buildStageRoute() {
  const shuffledThemes = shuffle(backgroundThemes);
  return stagePlan.map((slot, index) => {
    const theme = shuffledThemes[index % shuffledThemes.length];
    const weather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    const { crossingChance, roamChance } = getStageEventChances(index);
    const events = [];

    if (index === 0 || Math.random() < crossingChance) {
      events.push({ kind: "crossing" });
    }

    if (Math.random() < roamChance) {
      events.push({ kind: "roam" });
    }

    return {
      ...theme,
      events,
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

function currentEvent() {
  const stageInfo = currentStage();
  return stageInfo.events[game.eventIndex] || null;
}

function chooseHazard(kind) {
  const hazards = kind === "crossing"
    ? crossingHazards
    : currentStage().hazards?.filter((hazard) => obstacleHazards.includes(hazard)) || obstacleHazards;
  return hazards[Math.floor(Math.random() * hazards.length)];
}

function updateStageView() {
  const stageInfo = currentStage();
  stage.className = `stage ${stageInfo.className} ${stageInfo.weatherClass}`;
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
  updateControls();
}

function getHazardMarkup(hazard) {
  const templates = {
    person: `
      <span class="person-head"></span>
      <span class="person-body"></span>
      <span class="person-arm person-arm-left"></span>
      <span class="person-arm person-arm-right"></span>
      <span class="person-leg person-leg-left"></span>
      <span class="person-leg person-leg-right"></span>
    `,
    cat: `
      <span class="animal-shell">
        <span class="animal-tail cat-tail"></span>
        <span class="animal-body cat-body"></span>
        <span class="animal-leg animal-leg-one"></span>
        <span class="animal-leg animal-leg-two"></span>
        <span class="animal-head cat-head"></span>
        <span class="animal-ear cat-ear-left"></span>
        <span class="animal-ear cat-ear-right"></span>
        <span class="animal-eye animal-eye-one"></span>
        <span class="animal-eye animal-eye-two"></span>
        <span class="animal-nose cat-nose"></span>
        <span class="cat-whiskers"></span>
      </span>
    `,
    dog: `
      <span class="animal-shell">
        <span class="animal-tail dog-tail"></span>
        <span class="animal-body dog-body"></span>
        <span class="animal-leg animal-leg-one"></span>
        <span class="animal-leg animal-leg-two"></span>
        <span class="animal-head dog-head"></span>
        <span class="dog-ear dog-ear-left"></span>
        <span class="dog-ear dog-ear-right"></span>
        <span class="animal-eye animal-eye-one"></span>
        <span class="animal-eye animal-eye-two"></span>
        <span class="animal-nose dog-nose"></span>
      </span>
    `
  };

  return templates[hazard] || "";
}

function updateResultHint() {
  if (!resultHint) {
    return;
  }

  resultHint.textContent = input.spaceConfirmLocked
    ? "スペースキーをはなしてから、もういちど押してね"
    : "スペースキーでもどる";
}

function updateControls() {
  if (!speedButton) {
    return;
  }

  speedButton.textContent = "はやさきりかえ";
  updateSpeedMeter();
}

function updateSpeedMeter() {
  if (!speedMeter || !speedLabel || !speedFill) {
    return;
  }

  const maxSpeed = getStepSpeed(speedSteps.length - 1);
  const percent = Math.max(0, Math.min(100, (game.currentSpeed / maxSpeed) * 100));
  const displayLabel = game.currentSpeed <= 0.8 ? "ていし" : game.braking ? "ブレーキ" : speedSteps[game.speedStepIndex].label;
  speedLabel.textContent = displayLabel;
  speedFill.style.setProperty("--speed-percent", `${percent}%`);
  speedMeter.classList.toggle("is-braking", game.braking);
  speedMeter.classList.toggle("is-stopped", game.currentSpeed <= 0.8);
  speedMeter.querySelectorAll(".speed-lamps span").forEach((lamp, index) => {
    lamp.classList.toggle("is-on", game.currentSpeed > 0.8 && index <= game.speedStepIndex);
  });
}

function setDanger(danger) {
  game.danger = danger;
  const isCrossingDanger = danger && danger.kind === "crossing";
  const isRoamDanger = danger && danger.kind === "roam";

  crossing.classList.toggle("is-danger", Boolean(isCrossingDanger));
  signal.classList.toggle("danger", Boolean(isCrossingDanger));
  signal.classList.toggle("safe", !isCrossingDanger);
  crossing.toggleAttribute("data-danger-active", Boolean(isCrossingDanger));

  hazardElement.className = isCrossingDanger ? `hazard crossing-hazard ${danger.hazard}` : "hazard crossing-hazard hidden";
  roamHazardElement.className = isRoamDanger
    ? `hazard roam-hazard is-moving ${danger.hazard}`
    : "hazard roam-hazard hidden";
  hazardElement.innerHTML = isCrossingDanger ? getHazardMarkup(danger.hazard) : "";
  roamHazardElement.innerHTML = isRoamDanger ? getHazardMarkup(danger.hazard) : "";
  hazardElement.toggleAttribute("data-danger-active", Boolean(isCrossingDanger));
  roamHazardElement.toggleAttribute("data-danger-active", Boolean(isRoamDanger));
  updateControls();
  updateLoops();
}

function triggerDanger() {
  const eventInfo = currentEvent();
  if (!eventInfo) {
    return;
  }
  const kind = eventInfo.kind;
  const hazard = chooseHazard(kind);
  const clearDelay = kind === "crossing" ? 3000 + Math.random() * 1500 : 3800 + Math.random() * 1400;

  game.dangerClearAt = performance.now() + clearDelay;
  setDanger({
    kind,
    hazard,
    stageIndex: game.stageIndex,
    eventIndex: game.eventIndex
  });
  setStatus("とまって！", "danger");
  showScreen("danger");
}

function clearDanger() {
  const finishedKind = game.danger ? game.danger.kind : "";
  const metrics = getStageMetrics();
  setDanger(null);
  game.eventIndex += 1;
  game.nextDangerAt = getNextDangerStart(metrics, finishedKind, currentEvent());
  setStatus(currentEvent() ? "つぎも あんぜんかくにん" : "すすめるよ！", game.running ? "safe" : "wait");
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
    roamStart: stageWidth * 0.7 - trainWidth * 0.12,
    roamEnd: stageWidth * 0.82
  };
}

function getDangerZone(metrics, kind) {
  const isFollowUpEvent = game.eventIndex > 0;
  if (kind === "crossing") {
    return {
      start: metrics.crossingStart,
      end: metrics.crossingEnd,
      triggerLimit: metrics.crossingStart - (isFollowUpEvent ? 48 : 128)
    };
  }

  return {
    start: metrics.roamStart,
    end: metrics.roamEnd,
    triggerLimit: metrics.roamStart - (isFollowUpEvent ? 24 : 96)
  };
}

function getNextDangerSpacing(finishedKind, nextKind) {
  if (finishedKind === "crossing" && nextKind === "roam") {
    return 32;
  }

  return 40;
}

function getNextDangerStart(metrics, finishedKind, nextEvent) {
  if (!nextEvent) {
    return game.trainX + 40;
  }

  const spacing = getNextDangerSpacing(finishedKind, nextEvent.kind);
  const zone = getDangerZone(metrics, nextEvent.kind);
  const minStart = game.trainX + 12;
  const preferredStart = game.trainX + spacing;
  const latestReachableStart = Math.max(minStart, zone.triggerLimit - 8);
  return Math.min(preferredStart, latestReachableStart);
}

function updateMotion(deltaSeconds) {
  const train = game.selectedTrain;
  const rate = game.braking ? train.brake : train.accel;

  if (game.currentSpeed < game.targetSpeed) {
    game.currentSpeed = Math.min(game.targetSpeed, game.currentSpeed + rate * deltaSeconds);
  } else if (game.currentSpeed > game.targetSpeed) {
    game.currentSpeed = Math.max(game.targetSpeed, game.currentSpeed - rate * deltaSeconds);
  }

  if (game.braking && game.currentSpeed <= 0.8) {
    game.currentSpeed = 0;
    game.targetSpeed = 0;
    game.running = false;
    game.braking = false;
    showScreen(game.danger ? "danger" : "stopped");
    setStatus(game.danger ? "あんぜんかくにん" : "ていし", game.danger ? "danger" : "wait");
  }

  updateSpeedMeter();
}

function getStoppingDistance() {
  const brake = Math.max(1, game.selectedTrain.brake);
  return (game.currentSpeed * game.currentSpeed) / (2 * brake);
}

function getWarningDistance(kind) {
  const stepBonus = game.speedStepIndex * 22;
  const baseDistance = kind === "crossing" ? 130 : 310;
  return baseDistance + getStoppingDistance() + stepBonus;
}

function updateGame(time) {
  if (!game.lastTime) {
    game.lastTime = time;
  }

  const deltaSeconds = Math.min((time - game.lastTime) / 1000, 0.05);
  game.lastTime = time;

  updateMotion(deltaSeconds);
  if (game.currentSpeed > 0) {
    game.trainX += game.currentSpeed * deltaSeconds;
    updateTrainPosition();
  }

  const metrics = getStageMetrics();
  const eventInfo = currentEvent();

  if (!game.danger && eventInfo) {
    const zone = getDangerZone(metrics, eventInfo.kind);
    const trainFront = game.trainX + trainElement.offsetWidth * 0.86;
    const warningStart = Math.max(game.nextDangerAt, zone.start - getWarningDistance(eventInfo.kind));
    const warningPosition = eventInfo.kind === "crossing" ? trainFront : game.trainX;
    if (warningPosition >= warningStart && game.trainX < zone.triggerLimit) {
      triggerDanger();
    }
  }

  if (!game.danger && !eventInfo && game.trainX < metrics.finishX) {
    setStatus("すすめるよ！", "safe");
  }

  if (game.danger && !game.running && time >= game.dangerClearAt) {
    clearDanger();
  }

  if (isDangerCollisionArmed() && trainInDangerZone(metrics)) {
    endGame(false);
    return;
  }

  if (game.trainX >= metrics.finishX) {
    completeStage(metrics);
    return;
  }

  game.animationId = requestAnimationFrame(updateGame);
}

/*
  Collision rule:
  - crossing: the train overlaps the road/track crossing while a person or car remains.
  - roam: the train overlaps the later track crossing zone while a cat or dog remains.
  The train uses a slightly inset front/back so the result matches what the player sees.
*/
function trainInDangerZone(metrics) {
  if (!isDangerCollisionArmed()) {
    return false;
  }

  const trainFront = game.trainX + trainElement.offsetWidth * 0.86;
  const trainBack = game.trainX + trainElement.offsetWidth * 0.14;
  const zone = getDangerZone(metrics, game.danger.kind);
  return trainFront >= zone.start && trainBack <= zone.end;
}

function dangerMatchesCurrentEvent() {
  const eventInfo = currentEvent();
  return Boolean(
    game.danger
    && eventInfo
    && game.danger.kind === eventInfo.kind
    && game.danger.stageIndex === game.stageIndex
    && game.danger.eventIndex === game.eventIndex
  );
}

function isCrossingDangerVisible() {
  return Boolean(
    game.danger
    && game.danger.kind === "crossing"
    && crossing.hasAttribute("data-danger-active")
    && hazardElement.hasAttribute("data-danger-active")
    && crossing.classList.contains("is-danger")
    && signal.classList.contains("danger")
    && hazardElement.classList.contains("crossing-hazard")
    && !hazardElement.classList.contains("hidden")
    && crossingHazards.includes(game.danger.hazard)
    && hazardElement.classList.contains(game.danger.hazard)
  );
}

function isRoamDangerVisible() {
  return Boolean(
    game.danger
    && game.danger.kind === "roam"
    && roamHazardElement.hasAttribute("data-danger-active")
    && roamHazardElement.classList.contains("roam-hazard")
    && roamHazardElement.classList.contains("is-moving")
    && !roamHazardElement.classList.contains("hidden")
    && obstacleHazards.includes(game.danger.hazard)
    && roamHazardElement.classList.contains(game.danger.hazard)
  );
}

function isDangerCollisionArmed() {
  if (!dangerMatchesCurrentEvent()) {
    return false;
  }

  return game.danger.kind === "crossing" ? isCrossingDangerVisible() : isRoamDangerVisible();
}

function completeStage(metrics) {
  if (game.stageIndex >= stages.length - 1) {
    endGame(true);
    return;
  }

  game.stageIndex += 1;
  game.trainX = metrics.resetX;
  game.running = true;
  game.eventIndex = 0;
  game.nextDangerAt = randomDangerPoint();
  game.dangerClearAt = 0;
  game.lastTime = 0;
  setDanger(null);
  updateStageView();
  updateTrainPosition();
  setStatus("つぎのステージ", "safe");
  updateControls();
  playToneSet("next");
  updateLoops();
  game.animationId = requestAnimationFrame(updateGame);
}

function resumeTrainFromBrake() {
  if (game.state !== "playing" && game.state !== "danger" && game.state !== "stopped") {
    return;
  }

  if (game.danger) {
    showScreen("danger");
    setStatus("とまって！", "danger");
  } else {
    showScreen("playing");
    setStatus(speedSteps[game.speedStepIndex].label, "safe");
  }

  game.targetSpeed = getStepSpeed(game.speedStepIndex);
  game.braking = false;
  game.running = true;
  updateControls();
  updateLoops();
}

function accelerateTrain() {
  unlockAudio();

  if (game.state === "title") {
    showScreen("selectTrain");
    startBgm();
    playToneSet("select");
    return;
  }

  if (game.state === "playing" || game.state === "stopped" || game.state === "danger") {
    setSpeedStep((game.speedStepIndex + 1) % speedSteps.length);
    showScreen(game.danger ? "danger" : "playing");
    setStatus(game.danger ? "とまって！" : speedSteps[game.speedStepIndex].label, game.danger ? "danger" : "safe");
    playToneSet("go");
    updateControls();
    updateLoops();
  }
}

function brakeTrain() {
  unlockAudio();

  if (game.state !== "playing" && game.state !== "danger" && game.state !== "stopped") {
    return;
  }

  if (game.currentSpeed <= 0.8 || game.braking) {
    return;
  }

  game.braking = true;
  game.targetSpeed = 0;
  showScreen(game.danger ? "danger" : "playing");
  setStatus("ブレーキ！", game.danger ? "danger" : "wait");
  playToneSet("stop");
  updateControls();
  updateLoops();
}

function clearSpaceHold() {
  if (input.holdTimer) {
    window.clearTimeout(input.holdTimer);
    input.holdTimer = 0;
  }
}

function onSpacePress() {
  if (input.spacePressed) {
    return;
  }

  input.spacePressed = true;
  input.brakeTriggeredByHold = false;
  clearSpaceHold();
  input.holdTimer = window.setTimeout(() => {
    if (!input.spacePressed) {
      return;
    }
    input.brakeTriggeredByHold = true;
    brakeTrain();
  }, holdToBrakeDelay);
}

function onSpaceRelease() {
  const wasPressed = input.spacePressed;
  if (!wasPressed && !input.spaceConfirmLocked) {
    return;
  }

  clearSpaceHold();
  input.spacePressed = false;
  input.spaceConfirmLocked = false;
  updateResultHint();

  if (!wasPressed) {
    return;
  }

  if (input.brakeTriggeredByHold) {
    input.brakeTriggeredByHold = false;
    resumeTrainFromBrake();
    return;
  }

  accelerateTrain();
}

function confirmBeforeGame() {
  if (game.state === "title") {
    showScreen("selectTrain");
    startBgm();
    playToneSet("select");
    return;
  }

  if (game.state === "selectTrain") {
    resetGame();
    return;
  }

  if (game.state === "clear" || game.state === "gameover") {
    showScreen("title");
  }
}

function moveTrainSelection(direction) {
  const currentIndex = trains.findIndex((train) => train.id === game.selectedTrain.id);
  const nextIndex = (currentIndex + direction + trains.length) % trains.length;
  selectTrain(trains[nextIndex].id);
  const selectedCard = document.querySelector(`.train-card[data-train-id="${trains[nextIndex].id}"]`);
  if (selectedCard) {
    selectedCard.focus({ preventScroll: true });
  }
  playToneSet("select");
}

function handleMenuKeys(event) {
  const code = event.code;

  if (game.state === "title") {
    if (code === "Space") {
      event.preventDefault();
      if (event.repeat) {
        return true;
      }
      unlockAudio();
      confirmBeforeGame();
      return true;
    }
    return false;
  }

  if (game.state === "selectTrain") {
    if (code === "ArrowRight" || code === "ArrowDown") {
      event.preventDefault();
      moveTrainSelection(1);
      return true;
    }
    if (code === "ArrowLeft" || code === "ArrowUp") {
      event.preventDefault();
      moveTrainSelection(-1);
      return true;
    }
    if (code === "Space") {
      event.preventDefault();
      if (event.repeat) {
        return true;
      }
      resetGame();
      return true;
    }
    if (code === "Escape") {
      event.preventDefault();
      showScreen("title");
      return true;
    }
    return false;
  }

  if (game.state === "clear" || game.state === "gameover") {
    if (code === "Space") {
      event.preventDefault();
      if (input.spaceConfirmLocked || event.repeat) {
        updateResultHint();
        return true;
      }
      showScreen("title");
      playToneSet("select");
      return true;
    }
    return false;
  }

  return false;
}

function endGame(clear) {
  cancelAnimationFrame(game.animationId);
  clearSpaceHold();
  game.running = false;
  const lastDanger = game.danger;
  setDanger(null);
  stopRunLoop();
  stopCrossingLoop();
  input.spaceConfirmLocked = input.spacePressed;
  input.brakeTriggeredByHold = false;
  resultScreen.classList.toggle("gameover", !clear);

  if (clear) {
    resultHeading.textContent = "クリア！";
    resultText.textContent = "ぜんぶ あんぜんに とおれたね";
    updateResultHint();
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
  updateResultHint();
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
  input.spaceConfirmLocked = false;
  updateResultHint();
  playToneSet("select");
  showScreen("title");
});

speedButton.addEventListener("click", accelerateTrain);

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
  if (handleMenuKeys(event)) {
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    if (!event.repeat) {
      onSpacePress();
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code !== "Space") {
    return;
  }

  event.preventDefault();
  onSpaceRelease();
});

window.addEventListener("resize", updateTrainPosition);
window.addEventListener("blur", () => {
  clearSpaceHold();
  input.spacePressed = false;
  input.brakeTriggeredByHold = false;
  input.spaceConfirmLocked = false;
  updateResultHint();
});

stages = buildStageRoute();
buildTrainChoices();
applyTrainStyle();
updateStageView();
updateSoundButton();
updateControls();
updateResultHint();
showScreen("title");
