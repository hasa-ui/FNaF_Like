const CAMS = [
  { id: 'stage', name: 'STAGE' },
  { id: 'hallL', name: 'HALL L' },
  { id: 'hallR', name: 'HALL R' },
  { id: 'storage', name: 'STORAGE' },
  { id: 'office', name: 'OFFICE OUT' },
];

const cameraDescriptions = {
  stage: 'Abandoned performance stage',
  hallL: 'Left hallway. Footsteps sometimes echo here.',
  hallR: 'Right hallway. Blind spot near the office entrance.',
  storage: 'Storage room. Something drags across the floor.',
  office: 'Office exterior. If they are here, react immediately.'
};

const routes = {
  Rust: ['stage', 'office', 'hallL'],
  Moth: ['stage', 'storage', 'hallR'],
  Grin: ['storage', 'office', 'hallL', 'hallR']
};

let state;
let secondTimer = null;
let moveTimer = null;
let lossTimeout = null;
let statusTimeout = null;

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

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function formatClock(minutesElapsed) {
  const hour = Math.min(6, Math.floor(minutesElapsed / 10) + 12);
  return `${hour > 12 ? hour - 12 : hour} AM`;
}

function setBriefStatus(text) {
  state.statusText = text;
  updateUI();
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => {
    if (state.gameState === 'playing') {
      state.statusText = 'Watch the doors. Check cameras only when needed.';
      updateUI();
    }
  }, 1800);
}

function createCamButtons() {
  camGrid.innerHTML = '';
  for (const cam of CAMS) {
    const btn = document.createElement('button');
    btn.textContent = cam.name;
    btn.className = 'ghost-btn cam-btn';
    btn.addEventListener('click', () => {
      if (!state.cameraOpen || state.gameState !== 'playing') return;
      state.currentCam = cam.id;
      setBriefStatus(`Switched to ${cam.name}.`);
      renderScreen();
      updateUI();
    });
    camGrid.appendChild(btn);
  }
}

function resetGame() {
  clearInterval(secondTimer);
  clearInterval(moveTimer);
  clearTimeout(lossTimeout);
  clearTimeout(statusTimeout);

  state = {
    power: 100,
    minutesElapsed: 0,
    leftDoorClosed: false,
    rightDoorClosed: false,
    cameraOpen: false,
    currentCam: 'stage',
    positions: { Rust: 'stage', Moth: 'stage', Grin: 'storage' },
    aiLevels: { Rust: 0.24, Moth: 0.18, Grin: 0.14 },
    statusText: 'Shift started. Keep power usage under control.',
    gameState: 'playing',
    tick: 0,
  };

  createCamButtons();
  updateUI();
  renderScreen();
  startLoops();
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

function getHint() {
  if (state.power <= 15) return 'Power critical. Stop wasting energy.';
  if (leftAtDoor() && !state.leftDoorClosed) return 'Left corridor danger.';
  if (rightAtDoor() && !state.rightDoorClosed) return 'Right corridor danger.';
  if (state.cameraOpen) return 'Cameras drain power. Use them deliberately.';
  return 'No immediate breach detected.';
}

function lose(reason, desc) {
  if (state.gameState !== 'playing') return;
  state.gameState = 'lose';
  state.statusText = reason;
  endPanel.style.display = 'block';
  endTitle.textContent = 'Shift Failed';
  endTitle.className = 'end-title red';
  endDesc.textContent = desc;
  updateButtons();
  renderScreen();
  updateUI();
}

function win() {
  if (state.gameState !== 'playing') return;
  state.gameState = 'win';
  state.statusText = '6 AM reached. You survived the shift.';
  endPanel.style.display = 'block';
  endTitle.textContent = 'Shift Complete';
  endTitle.className = 'end-title green';
  endDesc.textContent = 'You balanced information and energy correctly.';
  updateButtons();
  renderScreen();
  updateUI();
}

function scheduleThreatCheck() {
  clearTimeout(lossTimeout);
  if (state.gameState !== 'playing') return;

  if (state.power <= 0) {
    if (Object.values(state.positions).includes('office')) {
      lossTimeout = setTimeout(() => {
        lose('Something moved in the dark.', 'A power outage left the office exposed.');
      }, 2200);
    }
    return;
  }

  if (leftAtDoor() && !state.leftDoorClosed) {
    lossTimeout = setTimeout(() => {
      lose('The left side was left open.', 'An enemy reached the left entrance while it was exposed.');
    }, 900);
    return;
  }

  if (rightAtDoor() && !state.rightDoorClosed) {
    lossTimeout = setTimeout(() => {
      lose('The right side was left open.', 'An enemy reached the right entrance while it was exposed.');
    }, 900);
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
    if (state.power <= 0) {
      state.leftDoorClosed = false;
      state.rightDoorClosed = false;
      state.cameraOpen = false;
      state.statusText = 'Power outage. The office goes dark.';
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
      const canMove = Math.random() < state.aiLevels[name];
      if (!canMove) continue;

      if (current === 'office') {
        state.positions[name] = (name === 'Rust' || name === 'Grin') ? 'hallL' : 'hallR';
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
  $('leftDoorBtn').disabled = !playable;
  $('rightDoorBtn').disabled = !playable;
  $('cameraBtn').disabled = !playable;
  document.querySelectorAll('.cam-btn').forEach(btn => {
    btn.disabled = !playable || !state.cameraOpen;
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
    right.textContent = state.cameraOpen ? pos.toUpperCase() : 'UNKNOWN';
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
  usageText.textContent = `Usage: ${usage} bar${usage > 1 ? 's' : ''}`;
  leftDoorState.textContent = state.leftDoorClosed ? 'Closed' : 'Open';
  leftDoorState.className = state.leftDoorClosed ? 'amber' : 'muted';
  rightDoorState.textContent = state.rightDoorClosed ? 'Closed' : 'Open';
  rightDoorState.className = state.rightDoorClosed ? 'amber' : 'muted';
  statusText.textContent = state.statusText;
  hintText.textContent = getHint();
  clock.textContent = state.minutesElapsed >= 60 ? '6 AM' : formatClock(state.minutesElapsed);
  $('leftDoorBtn').textContent = state.leftDoorClosed ? 'Open Left' : 'Close Left';
  $('rightDoorBtn').textContent = state.rightDoorClosed ? 'Open Right' : 'Close Right';
  $('cameraBtn').textContent = state.cameraOpen ? 'Lower Cameras' : 'Raise Cameras';
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
  label.textContent = 'OFFICE';
  screen.appendChild(label);

  if (state.gameState === 'lose') {
    const overlay = document.createElement('div');
    overlay.className = 'overlay-end';
    overlay.innerHTML = '<div class="box"><div class="big-text">CAUGHT</div><div class="muted">You failed to hold the office until 6 AM.</div></div>';
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
    configs.forEach(([l,t,w,h]) => {
      const box = document.createElement('div');
      box.className = 'storage-box';
      box.style.left = l; box.style.top = t; box.style.width = w; box.style.height = h;
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
    monster.style.opacity = present.length >= 2 ? '1' : present.length === 1 ? '.7' : '.4';
    screen.appendChild(monster);
  }

  const label = document.createElement('div');
  label.className = 'label';
  label.textContent = `CAM ${cam.toUpperCase()}`;
  screen.appendChild(label);

  const desc = document.createElement('div');
  desc.className = 'label bottom';
  desc.textContent = cameraDescriptions[cam] || 'Signal unstable.';
  screen.appendChild(desc);

  if (present.length > 0) {
    const motion = document.createElement('div');
    motion.className = 'label right';
    motion.textContent = `Motion trace: ${present.join(', ')}`;
    screen.appendChild(motion);
  }

  addScreenBase();
}

function renderScreen() {
  screen.innerHTML = '';
  if (state.cameraOpen) renderCamera();
  else renderOffice();
}

$('leftDoorBtn').addEventListener('click', () => {
  if (state.power <= 0 || state.gameState !== 'playing') return;
  state.leftDoorClosed = !state.leftDoorClosed;
  setBriefStatus(state.leftDoorClosed ? 'Left door closed.' : 'Left door opened.');
  scheduleThreatCheck();
  renderScreen();
  updateUI();
});

$('rightDoorBtn').addEventListener('click', () => {
  if (state.power <= 0 || state.gameState !== 'playing') return;
  state.rightDoorClosed = !state.rightDoorClosed;
  setBriefStatus(state.rightDoorClosed ? 'Right door closed.' : 'Right door opened.');
  scheduleThreatCheck();
  renderScreen();
  updateUI();
});

$('cameraBtn').addEventListener('click', () => {
  if (state.power <= 0 || state.gameState !== 'playing') return;
  state.cameraOpen = !state.cameraOpen;
  setBriefStatus(state.cameraOpen ? 'Camera tablet raised.' : 'Camera tablet lowered.');
  renderScreen();
  updateUI();
});

$('restartBtn').addEventListener('click', () => {
  endPanel.style.display = 'none';
  resetGame();
});

resetGame();
