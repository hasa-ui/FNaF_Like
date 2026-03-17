const CAMS = [
  { id: 'stage' },
  { id: 'hallL' },
  { id: 'hallR' },
  { id: 'storage' },
  { id: 'office' },
];

const routes = {
  Rust: ['stage', 'office', 'hallL'],
  Moth: ['stage', 'storage', 'hallR'],
  Grin: ['storage', 'office', 'hallL', 'hallR']
};

const enemyTraits = {
  Rust: { doorDelay: 550, moveMultiplier: 0.72 },
  Moth: { doorDelay: 900, aggroMax: 0.28 },
  Grin: { doorDelay: 700 }
};

const TEXT = {
  ja: {
    meta: {
      documentTitle: 'Night Shift Survival',
      brandEyebrow: 'Night Shift Survival',
      gameTitle: '午前6時まで持ちこたえろ',
      timeLabel: '時刻',
      menuEyebrow: 'Night Shift Survival',
      menuTitle: '深夜シフトを生き延びろ',
      menuCopy: '限られた電力の中で監視、ドア、防衛を切り替えながら午前6時まで持ちこたえてください。',
      howToEyebrow: '遊び方',
      howToTitle: 'シフトの基本',
    },
    howto: {
      surviveTitle: '生存条件',
      surviveBody: '12 AM から 6 AM までオフィスを守り切ると勝利です。',
      doorTitle: 'ドア',
      doorBody: '左右ドアを閉めると侵入を防げますが、その間は電力消費が増えます。',
      cameraTitle: 'カメラ',
      cameraBody: 'タブレットを上げている間だけ監視映像を確認できます。',
      powerTitle: '電力',
      powerBody: '0% になるとドアとカメラが使えず、オフィスが無防備になります。',
      reactTitle: '基本対処',
      reactBody: '気配を確認した側だけ閉め、危険が去ったらすぐ開けて節電します。',
    },
    cards: {
      power: '電力',
      doors: 'ドア',
      status: '状況',
      controls: '操作',
      cameraMap: 'カメラマップ',
      threat: '脅威読取',
      cameraMapHint: 'タブレットを上げている間だけカメラを切り替えられます。',
      threatHint: '試作版のため敵の位置情報を補助表示しています。',
    },
    labels: {
      left: '左',
      right: '右',
    },
    buttons: {
      start: '開始',
      howto: '遊び方',
      back: '戻る',
      restart: 'シフトを再開',
      raiseCameras: 'モニターを上げる',
      lowerCameras: 'モニターを下げる',
      closeLeft: '左ドアを閉じる',
      openLeft: '左ドアを開く',
      closeRight: '右ドアを閉じる',
      openRight: '右ドアを開く',
    },
    states: {
      open: '開',
      closed: '閉',
      unknown: '不明',
      unstable: '不安定',
    },
    status: {
      menu: 'ルールを確認してからシフトを開始してください。',
      shiftStart: 'シフト開始。電力の使いすぎに注意してください。',
      watchDoors: '左右の入口を見張り、必要な時だけモニターを使ってください。',
      leftClosed: '左ドアを閉じました。',
      leftOpened: '左ドアを開きました。',
      rightClosed: '右ドアを閉じました。',
      rightOpened: '右ドアを開きました。',
      cameraRaised: 'モニターを上げました。',
      cameraLowered: 'モニターを下げました。',
      switchedCam: '{name} に切り替えました。',
      powerOutage: '停電発生。オフィスが闇に包まれました。',
      loseLeft: '左側の入口が無防備でした。',
      loseRight: '右側の入口が無防備でした。',
      loseOutage: '暗闇の中で何かが動きました。',
      win: '6 AM 到達。シフトを生き延びました。',
    },
    hints: {
      title: '開始を押すとシフトが始まります。',
      howto: 'ルールを確認したらシフトを開始してください。',
      powerCritical: '電力が危険域です。設備の使いすぎに注意。',
      moth: 'Moth はモニターを見すぎると活性化します。',
      leftDanger: '左通路に脅威反応。',
      rightDanger: '右通路に脅威反応。',
      cameraDrain: 'モニターは電力を消費します。',
      none: '差し迫った侵入反応はありません。',
    },
    end: {
      loseTitle: 'シフト失敗',
      loseLeft: '左入口から侵入を許しました。',
      loseRight: '右入口から侵入を許しました。',
      loseOutage: '停電でオフィスが無防備になりました。',
      winTitle: 'シフト完了',
      winDesc: '情報と電力のバランスを保ち切りました。',
      caughtTitle: '捕獲',
      caughtDesc: '午前6時までオフィスを守り切れませんでした。',
    },
    misc: {
      officeLabel: 'オフィス',
      camPrefix: 'CAM',
      motionTrace: '反応: {names}',
      usage: '使用量: {count}',
      barSingle: '本',
      barPlural: '本',
    },
    cameraNames: {
      stage: 'ステージ',
      hallL: '左通路',
      hallR: '右通路',
      storage: '倉庫',
      office: 'オフィス前',
    },
    cameraDescriptions: {
      stage: '放棄されたステージ。視線を感じる。',
      hallL: '左の通路。足音が反響しやすい。',
      hallR: '右の通路。入口直前が見えにくい。',
      storage: '倉庫。床を引きずる音がする。',
      office: 'オフィス外側。ここに映ったら即対応が必要。',
    }
  },
  en: {
    meta: {
      documentTitle: 'Night Shift Survival',
      brandEyebrow: 'Night Shift Survival',
      gameTitle: 'Hold Out Until 6 AM',
      timeLabel: 'Time',
      menuEyebrow: 'Night Shift Survival',
      menuTitle: 'Survive The Graveyard Shift',
      menuCopy: 'Balance surveillance, doors, and power to hold the office until 6 AM.',
      howToEyebrow: 'How To Play',
      howToTitle: 'Rules Of The Shift',
    },
    howto: {
      surviveTitle: 'Survival',
      surviveBody: 'Protect the office from 12 AM to 6 AM to win.',
      doorTitle: 'Doors',
      doorBody: 'Closing a door blocks that side, but increases power drain.',
      cameraTitle: 'Cameras',
      cameraBody: 'You can check camera feeds only while the monitor is raised.',
      powerTitle: 'Power',
      powerBody: 'At 0%, doors and cameras fail and the office is left exposed.',
      reactTitle: 'Basic Response',
      reactBody: 'Close only the threatened side, then reopen it as soon as danger passes.',
    },
    cards: {
      power: 'Power',
      doors: 'Doors',
      status: 'Status',
      controls: 'Controls',
      cameraMap: 'Camera Map',
      threat: 'Threat Readout',
      cameraMapHint: 'Camera switching works only while the monitor is raised.',
      threatHint: 'Prototype helper readout. Hide this later for harder modes.',
    },
    labels: {
      left: 'Left',
      right: 'Right',
    },
    buttons: {
      start: 'Start',
      howto: 'How To Play',
      back: 'Back',
      restart: 'Restart Shift',
      raiseCameras: 'Raise Monitor',
      lowerCameras: 'Lower Monitor',
      closeLeft: 'Close Left Door',
      openLeft: 'Open Left Door',
      closeRight: 'Close Right Door',
      openRight: 'Open Right Door',
    },
    states: {
      open: 'Open',
      closed: 'Closed',
      unknown: 'UNKNOWN',
      unstable: 'UNSTABLE',
    },
    status: {
      menu: 'Review the rules, then start the shift.',
      shiftStart: 'Shift started. Keep power usage under control.',
      watchDoors: 'Watch both entrances and raise the monitor only when needed.',
      leftClosed: 'Left door closed.',
      leftOpened: 'Left door opened.',
      rightClosed: 'Right door closed.',
      rightOpened: 'Right door opened.',
      cameraRaised: 'Monitor raised.',
      cameraLowered: 'Monitor lowered.',
      switchedCam: 'Switched to {name}.',
      powerOutage: 'Power outage. The office goes dark.',
      loseLeft: 'The left entrance was left exposed.',
      loseRight: 'The right entrance was left exposed.',
      loseOutage: 'Something moved in the dark.',
      win: '6 AM reached. You survived the shift.',
    },
    hints: {
      title: 'Press Start when you are ready.',
      howto: 'Read the rules, then begin the shift.',
      powerCritical: 'Power critical. Stop wasting energy.',
      moth: 'Moth becomes aggressive if you overuse the monitor.',
      leftDanger: 'Threat detected in the left corridor.',
      rightDanger: 'Threat detected in the right corridor.',
      cameraDrain: 'The monitor drains power while raised.',
      none: 'No immediate breach detected.',
    },
    end: {
      loseTitle: 'Shift Failed',
      loseLeft: 'An enemy breached through the left entrance.',
      loseRight: 'An enemy breached through the right entrance.',
      loseOutage: 'A power outage left the office exposed.',
      winTitle: 'Shift Complete',
      winDesc: 'You balanced information and energy correctly.',
      caughtTitle: 'CAUGHT',
      caughtDesc: 'You failed to hold the office until 6 AM.',
    },
    misc: {
      officeLabel: 'OFFICE',
      camPrefix: 'CAM',
      motionTrace: 'Motion trace: {names}',
      usage: 'Usage: {count} {bars}',
      barSingle: 'bar',
      barPlural: 'bars',
    },
    cameraNames: {
      stage: 'STAGE',
      hallL: 'HALL L',
      hallR: 'HALL R',
      storage: 'STORAGE',
      office: 'OFFICE OUT',
    },
    cameraDescriptions: {
      stage: 'Abandoned performance stage.',
      hallL: 'Left hallway. Footsteps echo here.',
      hallR: 'Right hallway. Blind spot near the office entrance.',
      storage: 'Storage room. Something drags across the floor.',
      office: 'Office exterior. React immediately if anything appears here.',
    }
  }
};

let currentLanguage = 'ja';
let state;
let secondTimer = null;
let moveTimer = null;
let lossTimeout = null;
let statusTimeout = null;
let cameraTransitionTimeout = null;
let jumpscareTimeout = null;

const $ = (id) => document.getElementById(id);
const screen = $('screen');
const powerText = $('powerText');
const powerBar = $('powerBar');
const usageText = $('usageText');
const leftDoorState = $('leftDoorState');
const rightDoorState = $('rightDoorState');
const statusText = $('statusText');
const hintText = $('hintText');
const clock = $('clock');
const threatList = $('threatList');
const camGrid = $('camGrid');
const endPanel = $('endPanel');
const endTitle = $('endTitle');
const endDesc = $('endDesc');
const menuOverlay = $('menuOverlay');
const titleScreen = $('titleScreen');
const howToScreen = $('howToScreen');
const cameraTransition = $('cameraTransition');
const jumpscareLayer = $('jumpscareLayer');
const languageBtn = $('languageBtn');

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function t(path, vars = {}) {
  const value = path.split('.').reduce((obj, key) => obj?.[key], TEXT[currentLanguage]) ?? path;
  if (typeof value !== 'string') return path;
  return value.replace(/\{(\w+)\}/g, (_, key) => `${vars[key] ?? ''}`);
}

function getCamName(id) {
  return t(`cameraNames.${id}`);
}

function getCamDescription(id) {
  return t(`cameraDescriptions.${id}`);
}

function setText(id, value) {
  $(id).textContent = value;
}

function applyLanguage() {
  document.title = t('meta.documentTitle');
  setText('brandEyebrow', t('meta.brandEyebrow'));
  setText('gameTitle', t('meta.gameTitle'));
  setText('timeLabel', t('meta.timeLabel'));
  setText('menuEyebrow', t('meta.menuEyebrow'));
  setText('menuTitle', t('meta.menuTitle'));
  setText('menuCopy', t('meta.menuCopy'));
  setText('howToEyebrow', t('meta.howToEyebrow'));
  setText('howToTitle', t('meta.howToTitle'));
  setText('howToSurviveTitle', t('howto.surviveTitle'));
  setText('howToSurviveBody', t('howto.surviveBody'));
  setText('howToDoorTitle', t('howto.doorTitle'));
  setText('howToDoorBody', t('howto.doorBody'));
  setText('howToCameraTitle', t('howto.cameraTitle'));
  setText('howToCameraBody', t('howto.cameraBody'));
  setText('howToPowerTitle', t('howto.powerTitle'));
  setText('howToPowerBody', t('howto.powerBody'));
  setText('howToReactTitle', t('howto.reactTitle'));
  setText('howToReactBody', t('howto.reactBody'));
  setText('powerCardTitle', t('cards.power'));
  setText('doorsCardTitle', t('cards.doors'));
  setText('statusCardTitle', t('cards.status'));
  setText('leftDoorLabel', t('labels.left'));
  setText('rightDoorLabel', t('labels.right'));
  setText('controlsCardTitle', t('cards.controls'));
  setText('cameraMapCardTitle', t('cards.cameraMap'));
  setText('cameraMapHint', t('cards.cameraMapHint'));
  setText('threatCardTitle', t('cards.threat'));
  setText('threatCardHint', t('cards.threatHint'));
  $('startGameBtn').textContent = t('buttons.start');
  $('showHowToBtn').textContent = t('buttons.howto');
  $('backToTitleBtn').textContent = t('buttons.back');
  $('startFromHowToBtn').textContent = t('buttons.start');
  languageBtn.textContent = currentLanguage === 'ja' ? 'English' : '日本語';
  createCamButtons();
  renderScreen();
  updateUI();
}

function formatClock(minutesElapsed) {
  const hour = Math.floor(minutesElapsed / 10);
  return `${hour === 0 ? 12 : hour} AM`;
}

function setStatus(key, args = {}) {
  state.statusKey = key;
  state.statusArgs = args;
}

function getStatusText() {
  return t(state.statusKey, state.statusArgs);
}

function setBriefStatus(key, args = {}) {
  setStatus(key, args);
  updateUI();
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => {
    if (state.gameState === 'playing') {
      setStatus('status.watchDoors');
      updateUI();
    }
  }, 1800);
}

function createCamButtons() {
  camGrid.innerHTML = '';
  for (const cam of CAMS) {
    const btn = document.createElement('button');
    btn.textContent = getCamName(cam.id);
    btn.className = 'ghost-btn cam-btn';
    btn.addEventListener('click', () => {
      if (!state.cameraOpen || state.gameState !== 'playing' || isInputLocked()) return;
      state.currentCam = cam.id;
      setBriefStatus('status.switchedCam', { name: getCamName(cam.id) });
      renderScreen();
      updateUI();
    });
    camGrid.appendChild(btn);
  }
}

function createBaseState(gameState = 'title') {
  const nextState = {
    power: 100,
    minutesElapsed: 0,
    leftDoorClosed: false,
    rightDoorClosed: false,
    cameraOpen: false,
    currentCam: 'stage',
    positions: { Rust: 'stage', Moth: 'stage', Grin: 'storage' },
    aiLevels: { Rust: 0.24, Moth: 0.18, Grin: 0.14 },
    statusKey: gameState === 'playing' ? 'status.shiftStart' : 'status.menu',
    statusArgs: {},
    mothAggro: 0,
    inputLockedUntil: 0,
    gameState,
    tick: 0,
  };
  return nextState;
}

function clearTimers() {
  clearInterval(secondTimer);
  clearInterval(moveTimer);
  clearTimeout(lossTimeout);
  clearTimeout(statusTimeout);
  clearTimeout(cameraTransitionTimeout);
  clearTimeout(jumpscareTimeout);
}

function resetGame() {
  clearTimers();
  state = createBaseState('playing');
  endPanel.style.display = 'none';
  jumpscareLayer.classList.add('hidden');
  cameraTransition.classList.add('hidden');
  createCamButtons();
  updateUI();
  renderScreen();
  startLoops();
}

function showMenu(screenName) {
  clearTimers();
  state = createBaseState(screenName);
  endPanel.style.display = 'none';
  titleScreen.classList.toggle('hidden', screenName !== 'title');
  howToScreen.classList.toggle('hidden', screenName !== 'howto');
  menuOverlay.classList.remove('hidden');
  jumpscareLayer.classList.add('hidden');
  cameraTransition.classList.add('hidden');
  createCamButtons();
  renderScreen();
  updateUI();
}

function isInputLocked() {
  return Boolean(state) && Date.now() < state.inputLockedUntil;
}

function lockInputs(duration) {
  state.inputLockedUntil = Date.now() + duration;
  updateButtons();
  setTimeout(() => {
    if (state) updateButtons();
  }, duration + 20);
}

function animateCameraTransition() {
  clearTimeout(cameraTransitionTimeout);
  cameraTransition.className = 'camera-transition';
  void cameraTransition.offsetWidth;
  cameraTransition.classList.add('active');
  cameraTransition.classList.remove('hidden');
  cameraTransitionTimeout = setTimeout(() => {
    cameraTransition.classList.remove('active');
    cameraTransition.classList.add('hidden');
    renderScreen();
  }, 340);
}

function triggerJumpscare(callback) {
  clearTimeout(jumpscareTimeout);
  jumpscareLayer.innerHTML = '';
  const face = document.createElement('div');
  face.className = 'jumpscare-face';
  jumpscareLayer.appendChild(face);
  jumpscareLayer.className = 'jumpscare-layer active';
  renderScreen();
  jumpscareTimeout = setTimeout(() => {
    jumpscareLayer.className = 'jumpscare-layer hidden';
    jumpscareLayer.innerHTML = '';
    callback();
  }, 760);
}

function getUsage() {
  return 1 + (state.leftDoorClosed ? 1 : 0) + (state.rightDoorClosed ? 1 : 0) + (state.cameraOpen ? 1 : 0);
}

function leftAtDoor() {
  return state.positions.Rust === 'hallL' || state.positions.Grin === 'hallL';
}

function rightAtDoor() {
  return state.positions.Moth === 'hallR' || state.positions.Grin === 'hallR';
}

function getDoorAttackers(side) {
  const target = side === 'left' ? 'hallL' : 'hallR';
  return Object.entries(state.positions)
    .filter(([, pos]) => pos === target)
    .map(([name]) => name);
}

function isOutageThreat() {
  return Object.values(state.positions).some((pos) => ['office', 'hallL', 'hallR'].includes(pos));
}

function getBreachDelay(side) {
  const attackers = getDoorAttackers(side);
  if (attackers.length === 0) return null;
  return Math.min(...attackers.map((name) => enemyTraits[name].doorDelay));
}

function getMoveChance(name, current) {
  if (name === 'Rust') {
    const multiplier = current === 'hallL' ? 1 : enemyTraits.Rust.moveMultiplier;
    return clamp(state.aiLevels.Rust * multiplier, 0.05, 0.92);
  }

  if (name === 'Moth') {
    const cameraPressure = state.cameraOpen ? 0.06 : 0;
    return clamp(state.aiLevels.Moth + state.mothAggro + cameraPressure, 0.15, 0.9);
  }

  return clamp(state.aiLevels.Grin, 0.1, 0.94);
}

function getHint() {
  if (state.gameState === 'title') return t('hints.title');
  if (state.gameState === 'howto') return t('hints.howto');
  if (state.power <= 15) return t('hints.powerCritical');
  if (state.mothAggro >= 0.18) return t('hints.moth');
  if (leftAtDoor() && !state.leftDoorClosed) return t('hints.leftDanger');
  if (rightAtDoor() && !state.rightDoorClosed) return t('hints.rightDanger');
  if (state.cameraOpen) return t('hints.cameraDrain');
  return t('hints.none');
}

function lose(reasonKey, descKey) {
  if (state.gameState !== 'playing') return;
  state.gameState = 'lose';
  setStatus(reasonKey);
  triggerJumpscare(() => {
    endPanel.style.display = 'block';
    endTitle.textContent = t('end.loseTitle');
    endTitle.className = 'end-title red';
    endDesc.textContent = t(descKey);
    updateButtons();
    renderScreen();
    updateUI();
  });
}

function win() {
  if (state.gameState !== 'playing') return;
  state.gameState = 'win';
  setStatus('status.win');
  endPanel.style.display = 'block';
  endTitle.textContent = t('end.winTitle');
  endTitle.className = 'end-title green';
  endDesc.textContent = t('end.winDesc');
  updateButtons();
  renderScreen();
  updateUI();
}

function scheduleThreatCheck() {
  clearTimeout(lossTimeout);
  if (state.gameState !== 'playing') return;

  if (state.power <= 0) {
    if (isOutageThreat()) {
      lossTimeout = setTimeout(() => {
        lose('status.loseOutage', 'end.loseOutage');
      }, 2200);
    }
    return;
  }

  if (leftAtDoor() && !state.leftDoorClosed) {
    lossTimeout = setTimeout(() => {
      lose('status.loseLeft', 'end.loseLeft');
    }, getBreachDelay('left'));
    return;
  }

  if (rightAtDoor() && !state.rightDoorClosed) {
    lossTimeout = setTimeout(() => {
      lose('status.loseRight', 'end.loseRight');
    }, getBreachDelay('right'));
  }
}

function startLoops() {
  secondTimer = setInterval(() => {
    if (state.gameState !== 'playing') return;
    state.tick += 1;
    state.minutesElapsed += 1;
    if (state.minutesElapsed >= 60) {
      state.minutesElapsed = 60;
      win();
      return;
    }

    state.power = clamp(state.power - getUsage() * 0.42, 0, 100);
    if (state.cameraOpen) state.mothAggro = clamp(state.mothAggro + 0.03, 0, enemyTraits.Moth.aggroMax);
    else state.mothAggro = clamp(state.mothAggro - 0.05, 0, enemyTraits.Moth.aggroMax);

    if (state.power <= 0) {
      state.leftDoorClosed = false;
      state.rightDoorClosed = false;
      state.cameraOpen = false;
      setStatus('status.powerOutage');
    }

    scheduleThreatCheck();
    renderScreen();
    updateUI();
  }, 1000);

  moveTimer = setInterval(() => {
    if (state.gameState !== 'playing') return;

    state.aiLevels.Rust = clamp(state.aiLevels.Rust + 0.015, 0.2, 0.92);
    state.aiLevels.Moth = clamp(state.aiLevels.Moth + 0.013, 0.15, 0.9);
    state.aiLevels.Grin = clamp(state.aiLevels.Grin + 0.018, 0.1, 0.94);

    for (const name of Object.keys(state.positions)) {
      const current = state.positions[name];
      const path = routes[name];
      const idx = path.indexOf(current);
      const canMove = Math.random() < getMoveChance(name, current);
      if (!canMove) continue;

      if (current === 'office') {
        if (name === 'Rust') state.positions[name] = 'hallL';
        else if (name === 'Moth') state.positions[name] = 'hallR';
        else state.positions[name] = Math.random() < 0.5 ? 'hallL' : 'hallR';
        continue;
      }

      if (idx === path.length - 1) state.positions[name] = 'office';
      else state.positions[name] = path[idx + 1];
    }

    scheduleThreatCheck();
    renderScreen();
    updateUI();
  }, 3000);
}

function updateButtons() {
  const playable = state.gameState === 'playing';
  const restartAllowed = state.gameState !== 'title' && state.gameState !== 'howto';
  const locked = isInputLocked();
  $('leftDoorBtn').disabled = !playable || state.cameraOpen || locked;
  $('rightDoorBtn').disabled = !playable || state.cameraOpen || locked;
  $('cameraBtn').disabled = !playable || locked;
  $('restartBtn').disabled = !restartAllowed || locked;
  document.querySelectorAll('.cam-btn').forEach((btn) => {
    btn.disabled = !playable || !state.cameraOpen || locked;
  });
}

function updateThreatList() {
  threatList.innerHTML = '';
  Object.entries(state.positions).forEach(([name, pos]) => {
    const row = document.createElement('div');
    row.className = 'row';
    const left = document.createElement('span');
    left.textContent = name;
    const right = document.createElement('span');
    if (!state.cameraOpen) right.textContent = t('states.unknown');
    else if (name === 'Grin' && state.currentCam !== pos) right.textContent = t('states.unstable');
    else right.textContent = getCamName(pos);
    right.style.fontFamily = 'monospace';
    right.className = 'muted';
    row.appendChild(left);
    row.appendChild(right);
    threatList.appendChild(row);
  });
}

function updateUI() {
  powerText.textContent = `${Math.ceil(state.power)}%`;
  powerBar.style.width = `${clamp(state.power, 0, 100)}%`;
  const usage = getUsage();
  const bars = usage === 1 ? t('misc.barSingle') : t('misc.barPlural');
  usageText.textContent = t('misc.usage', { count: usage, bars });
  leftDoorState.textContent = state.leftDoorClosed ? t('states.closed') : t('states.open');
  leftDoorState.className = state.leftDoorClosed ? 'amber' : 'muted';
  rightDoorState.textContent = state.rightDoorClosed ? t('states.closed') : t('states.open');
  rightDoorState.className = state.rightDoorClosed ? 'amber' : 'muted';
  statusText.textContent = getStatusText();
  hintText.textContent = getHint();
  clock.textContent = state.minutesElapsed >= 60 ? '6 AM' : formatClock(state.minutesElapsed);
  $('leftDoorBtn').textContent = state.leftDoorClosed ? t('buttons.openLeft') : t('buttons.closeLeft');
  $('rightDoorBtn').textContent = state.rightDoorClosed ? t('buttons.openRight') : t('buttons.closeRight');
  $('cameraBtn').textContent = state.cameraOpen ? t('buttons.lowerCameras') : t('buttons.raiseCameras');
  $('restartBtn').textContent = t('buttons.restart');
  document.querySelectorAll('.cam-btn').forEach((btn, i) => {
    btn.classList.toggle('active', CAMS[i].id === state.currentCam);
  });
  updateThreatList();
  updateButtons();
}

function makeEyes(container) {
  const e1 = document.createElement('div');
  e1.className = 'eye left1';
  const e2 = document.createElement('div');
  e2.className = 'eye left2';
  container.appendChild(e1);
  container.appendChild(e2);
}

function makeMonster() {
  const monster = document.createElement('div');
  monster.className = 'monster';
  const head = document.createElement('div'); head.className = 'head';
  const body = document.createElement('div'); body.className = 'body';
  const mouth = document.createElement('div'); mouth.className = 'mouth';
  const limbL = document.createElement('div'); limbL.className = 'limb left';
  const limbR = document.createElement('div'); limbR.className = 'limb right';
  const legL = document.createElement('div'); legL.className = 'leg left';
  const legR = document.createElement('div'); legR.className = 'leg right';
  const eye1 = document.createElement('div'); eye1.className = 'eye'; eye1.style.left = '40px'; eye1.style.top = '20px';
  const eye2 = document.createElement('div'); eye2.className = 'eye'; eye2.style.right = '40px'; eye2.style.top = '20px';
  monster.append(head, eye1, eye2, body, mouth, limbL, limbR, legL, legR);
  return monster;
}

function addScreenBase() {
  const noise = document.createElement('div'); noise.className = 'screen-noise';
  const scan = document.createElement('div'); scan.className = 'scanlines';
  const vig = document.createElement('div'); vig.className = 'vignette';
  screen.append(noise, scan, vig);
}

function renderOffice() {
  const leftOpenThreat = leftAtDoor() && !state.leftDoorClosed;
  const rightOpenThreat = rightAtDoor() && !state.rightDoorClosed;

  const sideL = document.createElement('div'); sideL.className = 'office-side left';
  const sideR = document.createElement('div'); sideR.className = 'office-side right';
  const center = document.createElement('div'); center.className = 'office-center';
  const desk = document.createElement('div'); desk.className = 'desk';
  const doorL = document.createElement('div'); doorL.className = 'doorframe left';
  const doorR = document.createElement('div'); doorR.className = 'doorframe right';
  screen.append(sideL, sideR, center, desk, doorL, doorR);

  if (leftOpenThreat) {
    const m = document.createElement('div');
    m.className = 'monster-door left';
    makeEyes(m);
    screen.appendChild(m);
  }
  if (rightOpenThreat) {
    const m = document.createElement('div');
    m.className = 'monster-door right';
    makeEyes(m);
    screen.appendChild(m);
  }

  if (state.leftDoorClosed) {
    const d = document.createElement('div'); d.className = 'door left';
    screen.appendChild(d);
  }
  if (state.rightDoorClosed) {
    const d = document.createElement('div'); d.className = 'door right';
    screen.appendChild(d);
  }

  const label = document.createElement('div');
  label.className = 'label';
  label.textContent = t('misc.officeLabel');
  screen.appendChild(label);

  if (state.gameState === 'lose' && jumpscareLayer.classList.contains('hidden')) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay-end';
    overlay.innerHTML = `<div class="box"><div class="big-text">${t('end.caughtTitle')}</div><div class="muted">${t('end.caughtDesc')}</div></div>`;
    screen.appendChild(overlay);
  }

  addScreenBase();
}

function renderCamera() {
  const cam = state.currentCam;
  const present = Object.entries(state.positions).filter(([, p]) => p === cam).map(([name]) => name);

  if (cam === 'stage') {
    const a = document.createElement('div'); a.className = 'cam-prop'; a.style.left = '8%'; a.style.top = '10%'; a.style.width = '28%'; a.style.height = '22%';
    const b = document.createElement('div'); b.className = 'cam-prop'; b.style.right = '8%'; b.style.top = '12%'; b.style.width = '15%'; b.style.height = '16%';
    screen.append(a, b);
  } else if (cam === 'hallL') {
    const wall = document.createElement('div'); wall.className = 'hall-block'; wall.style.left = '0'; wall.style.top = '0'; wall.style.width = '33%'; wall.style.height = '100%'; wall.style.background = '#111';
    const col = document.createElement('div'); col.className = 'hall-block'; col.style.right = '6%'; col.style.top = '6%'; col.style.width = '14%'; col.style.height = '84%';
    screen.append(wall, col);
  } else if (cam === 'hallR') {
    const wall = document.createElement('div'); wall.className = 'hall-block'; wall.style.right = '0'; wall.style.top = '0'; wall.style.width = '33%'; wall.style.height = '100%'; wall.style.background = '#111';
    const col = document.createElement('div'); col.className = 'hall-block'; col.style.left = '6%'; col.style.top = '6%'; col.style.width = '14%'; col.style.height = '84%';
    screen.append(wall, col);
  } else if (cam === 'storage') {
    const configs = [
      ['10%', '10%', '12%', '18%'],
      ['28%', '24%', '14%', '26%'],
      ['74%', '12%', '16%', '36%']
    ];
    configs.forEach(([l, tPos, w, h]) => {
      const box = document.createElement('div');
      box.className = 'storage-box';
      box.style.left = l;
      box.style.top = tPos;
      box.style.width = w;
      box.style.height = h;
      screen.appendChild(box);
    });
  } else if (cam === 'office') {
    const center = document.createElement('div'); center.className = 'cam-prop'; center.style.left = '50%'; center.style.transform = 'translateX(-50%)'; center.style.top = '0'; center.style.width = '16%'; center.style.height = '100%';
    const l = document.createElement('div'); l.className = 'cam-prop'; l.style.left = '6%'; l.style.bottom = '6%'; l.style.width = '12%'; l.style.height = '22%';
    const r = document.createElement('div'); r.className = 'cam-prop'; r.style.right = '6%'; r.style.bottom = '6%'; r.style.width = '12%'; r.style.height = '22%';
    screen.append(center, l, r);
  }

  if (present.length > 0) {
    const monster = makeMonster();
    monster.style.opacity = present.length >= 2 ? '1' : '.75';
    screen.appendChild(monster);
  }

  const label = document.createElement('div');
  label.className = 'label';
  label.textContent = `${t('misc.camPrefix')} ${getCamName(cam)}`;
  screen.appendChild(label);

  const desc = document.createElement('div');
  desc.className = 'label bottom';
  desc.textContent = getCamDescription(cam);
  screen.appendChild(desc);

  if (present.length > 0) {
    const motion = document.createElement('div');
    motion.className = 'label right';
    motion.textContent = t('misc.motionTrace', { names: present.join(', ') });
    screen.appendChild(motion);
  }

  addScreenBase();
}

function renderScreen() {
  screen.innerHTML = '';
  if (state.cameraOpen) renderCamera();
  else renderOffice();
  screen.appendChild(jumpscareLayer);
  screen.appendChild(cameraTransition);
  screen.appendChild(menuOverlay);
}

function startGame() {
  menuOverlay.classList.add('hidden');
  endPanel.style.display = 'none';
  resetGame();
}

$('leftDoorBtn').addEventListener('click', () => {
  if (state.power <= 0 || state.gameState !== 'playing' || state.cameraOpen || isInputLocked()) return;
  state.leftDoorClosed = !state.leftDoorClosed;
  setBriefStatus(state.leftDoorClosed ? 'status.leftClosed' : 'status.leftOpened');
  scheduleThreatCheck();
  renderScreen();
  updateUI();
});

$('rightDoorBtn').addEventListener('click', () => {
  if (state.power <= 0 || state.gameState !== 'playing' || state.cameraOpen || isInputLocked()) return;
  state.rightDoorClosed = !state.rightDoorClosed;
  setBriefStatus(state.rightDoorClosed ? 'status.rightClosed' : 'status.rightOpened');
  scheduleThreatCheck();
  renderScreen();
  updateUI();
});

$('cameraBtn').addEventListener('click', () => {
  if (state.power <= 0 || state.gameState !== 'playing' || isInputLocked()) return;
  const nextOpen = !state.cameraOpen;
  lockInputs(340);
  animateCameraTransition();
  setTimeout(() => {
    state.cameraOpen = nextOpen;
    if (state.cameraOpen) {
      state.mothAggro = clamp(state.mothAggro + 0.08, 0, enemyTraits.Moth.aggroMax);
    }
    setBriefStatus(state.cameraOpen ? 'status.cameraRaised' : 'status.cameraLowered');
    renderScreen();
    updateUI();
  }, 160);
});

$('restartBtn').addEventListener('click', () => {
  if (state.gameState === 'title' || state.gameState === 'howto' || isInputLocked()) return;
  menuOverlay.classList.add('hidden');
  resetGame();
});

$('startGameBtn').addEventListener('click', startGame);
$('startFromHowToBtn').addEventListener('click', startGame);
$('showHowToBtn').addEventListener('click', () => showMenu('howto'));
$('backToTitleBtn').addEventListener('click', () => showMenu('title'));
languageBtn.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'ja' ? 'en' : 'ja';
  applyLanguage();
});

showMenu('title');
applyLanguage();
