/**
 * كافيه البنات المشترك | Pookie Cozy Cafe Rush
 * Game Engine, Levels System, Dynamic Motion & Multi-player Network Fixed
 */

// ==========================================
// 1. نظام المؤثرات الصوتية (Web Audio API)
// ==========================================
class CuteAudio {
  constructor() {
    this.ctx = null;
    this.musicPlaying = false;
    this.musicInterval = null;
  }

  init() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch(e) {}
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch(e) {}
  }

  playPour() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(560, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch(e) {}
  }

  playDing() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [1046.5, 2093].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(idx === 0 ? 0.4 : 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.8);
      });
    } catch(e) {}
  }

  playCash() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [587.33, 880, 1174.66].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.25, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.2);
      });
    } catch(e) {}
  }

  playFanfare() {
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const now = this.ctx.currentTime + i * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch(e) {}
  }

  playAlert() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch(e) {}
  }

  toggleMusic() {
    this.init();
    this.musicPlaying = !this.musicPlaying;
    if (this.musicPlaying) {
      this.startLofiLoop();
    } else {
      this.stopLofiLoop();
    }
    return this.musicPlaying;
  }

  startLofiLoop() {
    if (!this.ctx) return;
    const chords = [
      [261.63, 329.63, 392.00, 493.88],
      [220.00, 261.63, 329.63, 392.00],
      [174.61, 220.00, 261.63, 329.63],
      [196.00, 246.94, 293.66, 349.23]
    ];
    let chordIdx = 0;
    const playChord = () => {
      if (!this.musicPlaying || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const current = chords[chordIdx % chords.length];
        chordIdx++;
        current.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 2.8);
        });
      } catch(e) {}
    };
    playChord();
    this.musicInterval = setInterval(playChord, 3000);
  }

  stopLofiLoop() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

const audio = new CuteAudio();

// ==========================================
// 2. البيانات والأصناف والوصفات
// ==========================================
const CUSTOMERS = [
  { name: 'ميمي القطة', avatar: '🐱' },
  { name: 'سمسم الأرنوبة', avatar: '🐰' },
  { name: 'بوبا الدبدوب', avatar: '🐻' },
  { name: 'كوكي الشيبا', avatar: '🐶' },
  { name: 'توتو الثعلوبة', avatar: '🦊' }
];

const RECIPES = [
  {
    id: 'matcha_boba',
    name: 'ماتشا مثلجة بالبوبا',
    type: 'drink',
    icon: '🧋',
    minLevel: 1,
    tags: ['كوب 🥛', 'ثلج 🧊', 'ماتشا 🍵', 'حليب 🥛', 'بوبا ⚫'],
    required: ['cup', 'ice', 'matcha', 'milk', 'boba']
  },
  {
    id: 'strawberry_milk',
    name: 'حليب الفراولة بالكريمة',
    type: 'drink',
    icon: '🍓',
    minLevel: 1,
    tags: ['كوب 🥛', 'ثلج 🧊', 'فراولة 🍓', 'حليب 🥛', 'كريمة 🍦'],
    required: ['cup', 'ice', 'strawberry', 'milk', 'cream']
  },
  {
    id: 'pink_donut',
    name: 'دونات وردية بالسبرنكلز',
    type: 'bakery',
    icon: '🍩',
    minLevel: 1,
    tags: ['دونات 🍩', 'خبز بالفرن 🔥', 'تغطية وردية 🌸', 'سبرنكلز ✨'],
    required: ['donut_base', 'baked', 'pink_glaze', 'sprinkles']
  },
  {
    id: 'spanish_latte',
    name: 'سبانش كولد لاتيه',
    type: 'drink',
    icon: '☕',
    minLevel: 2,
    tags: ['كوب 🥛', 'ثلج 🧊', 'قهوة ☕', 'حليب 🥛', 'كراميل 🍯'],
    required: ['cup', 'ice', 'coffee', 'milk', 'caramel']
  },
  {
    id: 'strawberry_cake',
    name: 'كيكة الفراولة السحابية',
    type: 'bakery',
    icon: '🍰',
    minLevel: 2,
    tags: ['كيك 🍰', 'خبز بالفرن 🔥', 'كريمة 🍦', 'فراولة 🍓'],
    required: ['cake_base', 'baked', 'cream', 'strawberry']
  },
  {
    id: 'peach_tea',
    name: 'شاي خوخ منعش بالبوبا',
    type: 'drink',
    icon: '🍑',
    minLevel: 3,
    tags: ['كوب 🥛', 'ثلج 🧊', 'شاي 🫖', 'خوخ 🍑', 'بوبا ⚫'],
    required: ['cup', 'ice', 'tea', 'peach', 'boba']
  },
  {
    id: 'honey_pancake',
    name: 'بان كيك العسل والزبدة',
    type: 'bakery',
    icon: '🥞',
    minLevel: 3,
    tags: ['بان كيك 🥞', 'خبز بالفرن 🔥', 'زبدة 🧈', 'عسل 🍯'],
    required: ['pancake_base', 'baked', 'butter', 'honey']
  }
];

const INGREDIENT_NAMES = {
  cup: { name: 'كوب فارغ', icon: '🥛', minLevel: 1 },
  ice: { name: 'ثلج', icon: '🧊', minLevel: 1 },
  matcha: { name: 'ماتشا', icon: '🍵', minLevel: 1 },
  strawberry: { name: 'فراولة', icon: '🍓', minLevel: 1 },
  milk: { name: 'حليب نقي', icon: '🥛', minLevel: 1 },
  boba: { name: 'بوبا تابيوكا', icon: '⚫', minLevel: 1 },
  cream: { name: 'كريمة خفق', icon: '🍦', minLevel: 1 },
  donut_base: { name: 'عجينة دونات', icon: '🍩', minLevel: 1 },
  pink_glaze: { name: 'تغطية وردية', icon: '🌸', minLevel: 1 },
  sprinkles: { name: 'سبرنكلز ملون', icon: '✨', minLevel: 1 },

  coffee: { name: 'قهوة', icon: '☕', minLevel: 2 },
  caramel: { name: 'صوص كراميل', icon: '🍯', minLevel: 2 },
  cake_base: { name: 'طبقات كيك', icon: '🍰', minLevel: 2 },

  tea: { name: 'شاي مثلج', icon: '🫖', minLevel: 3 },
  peach: { name: 'خوخ', icon: '🍑', minLevel: 3 },
  pancake_base: { name: 'خليط بانكيك', icon: '🥞', minLevel: 3 },
  butter: { name: 'مكعب زبدة', icon: '🧈', minLevel: 3 },
  honey: { name: 'عسل صافي', icon: '🍯', minLevel: 3 },
  baked: { name: 'مخبوز بالفرن', icon: '🔥', minLevel: 1 }
};

// ==========================================
// 3. حالة اللعبة المحلية والشبكية
// ==========================================
const state = {
  mode: 'solo',
  roomCode: '',
  isHost: false,

  player: {
    name: 'باريستا بوكي',
    avatar: '🐱'
  },
  players: [],

  level: 1,
  levelTargetScore: 200,
  shiftActive: false,
  shiftInterval: null,
  orderInterval: null,

  score: 0,
  coins: 0,
  servedCount: 0,
  missedCount: 0,

  orders: [],
  sharedItems: [],

  currentDrink: { ingredients: [] },
  currentBakery: { ingredients: [] },

  selectedStation: 'drinks'
};

// ==========================================
// 4. عناصر واجهة المستخدم (DOM Elements)
// ==========================================
let screens, statsBar, playerNameInput, avatarChoices, roomWaitingBox, displayRoomCode, copyRoomLinkBtn, playersChipsContainer, startShiftBtn, ordersRack, sharedItemsContainer, currentItemVisual, stationHint, ingredientsGrid, toastShout, toggleMusicBtn;

function initDOMReferences() {
  screens = {
    lobby: document.getElementById('lobbyScreen'),
    game: document.getElementById('gameScreen'),
    results: document.getElementById('resultsScreen')
  };
  statsBar = document.getElementById('gameStatsBar');
  playerNameInput = document.getElementById('playerNameInput');
  avatarChoices = document.querySelectorAll('.avatar-choice');
  roomWaitingBox = document.getElementById('roomWaitingBox');
  displayRoomCode = document.getElementById('displayRoomCode');
  copyRoomLinkBtn = document.getElementById('copyRoomLinkBtn');
  playersChipsContainer = document.getElementById('playersChipsContainer');
  startShiftBtn = document.getElementById('startShiftBtn');
  ordersRack = document.getElementById('ordersRack');
  sharedItemsContainer = document.getElementById('sharedItemsContainer');
  currentItemVisual = document.getElementById('currentItemVisual');
  stationHint = document.getElementById('stationHint');
  ingredientsGrid = document.getElementById('ingredientsGrid');
  toastShout = document.getElementById('toastShout');
  toggleMusicBtn = document.getElementById('toggleMusicBtn');
}

// ==========================================
// 5. التهيئة والأحداث (Init & Setup)
// ==========================================
function initApp() {
  initDOMReferences();

  // تفعيل اختيار الشخصيات فوراً
  avatarChoices.forEach(choice => {
    choice.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.playPop();
      avatarChoices.forEach(c => c.classList.remove('selected'));
      choice.classList.add('selected');
      state.player.avatar = choice.dataset.avatar;
    });
  });

  playerNameInput.addEventListener('input', (e) => {
    state.player.name = e.target.value.trim() || 'باريستا بوكي';
  });

  // قراءة الرابط المباشر بذكاء
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam) {
    const inputField = document.getElementById('joinRoomCodeInput');
    if (inputField) inputField.value = roomParam.toUpperCase();
    showToast(`تم تعبئة كود الغرفة تلقائياً: ${roomParam} 💖`);
  }

  toggleMusicBtn.addEventListener('click', () => {
    const isPlaying = audio.toggleMusic();
    toggleMusicBtn.textContent = isPlaying ? '🎵' : '🔇';
    showToast(isPlaying ? 'تم تشغيل الموسيقى 🎶' : 'تم كتم الموسيقى 🔇');
  });

  document.getElementById('createRoomBtn').addEventListener('click', handleCreateRoom);
  document.getElementById('joinRoomBtn').addEventListener('click', handleJoinRoom);
  document.getElementById('soloPlayBtn').addEventListener('click', handleSoloPlay);
  startShiftBtn.addEventListener('click', startShift);
  
  const playAgain = document.getElementById('playAgainBtn');
  if (playAgain) {
    playAgain.addEventListener('click', () => {
      showScreen('lobby');
      if (statsBar) statsBar.style.display = 'none';
    });
  }

  if (copyRoomLinkBtn) copyRoomLinkBtn.addEventListener('click', copyDirectLink);

  document.querySelectorAll('.station-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.playPop();
      document.querySelectorAll('.station-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedStation = btn.dataset.station;
      renderStationView();
    });
  });

  document.querySelectorAll('.shout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.dataset.shout;
      sendShout(msg);
    });
  });
}

function showScreen(name) {
  Object.keys(screens).forEach(key => {
    if (screens[key]) screens[key].classList.toggle('active', key === name);
  });
}

function showToast(text, avatar = '✨') {
  if (!toastShout) return;
  toastShout.innerHTML = `<span>${avatar}</span> <span>${text}</span>`;
  toastShout.classList.add('show');
  setTimeout(() => {
    toastShout.classList.remove('show');
  }, 2400);
}

// ==========================================
// 6. شبكة الاتصال المحسّنة (Reliable Multi-Channel Network)
// ==========================================
class CuteNetwork {
  constructor() {
    this.clientId = 'client_' + Math.random().toString(36).substring(2, 9);
    this.roomCode = '';
    this.channel = null;
    this.mqttClient = null;
    this.seenMsgIds = new Set();
    this.isMqttConnected = false;
    this.onMessageCallback = null;
  }

  connect(roomCode, onMessage) {
    this.roomCode = roomCode.toUpperCase();
    this.onMessageCallback = onMessage;

    if (typeof BroadcastChannel !== 'undefined') {
      if (this.channel) {
        try { this.channel.close(); } catch(e){}
      }
      this.channel = new BroadcastChannel('pookie_cafe_' + this.roomCode);
      this.channel.onmessage = (e) => {
        this.receivePacket(e.data);
      };
    }

    if (window.mqtt) {
      if (this.mqttClient) {
        try { this.mqttClient.end(true); } catch(e){}
      }
      try {
        const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
        this.mqttClient = mqtt.connect(brokerUrl, {
          clientId: this.clientId + '_' + Math.floor(Math.random() * 1000),
          clean: true,
          connectTimeout: 8000,
          keepalive: 60
        });

        this.mqttClient.on('connect', () => {
          this.isMqttConnected = true;
          this.mqttClient.subscribe(`pookie/cafe/${this.roomCode}/#`);
        });

        this.mqttClient.on('message', (topic, payload) => {
          try {
            const data = JSON.parse(payload.toString());
            this.receivePacket(data);
          } catch(e) {}
        });
      } catch (e) {}
    }
  }

  receivePacket(packet) {
    if (!packet || typeof packet !== 'object') return;
    if (packet.senderClientId === this.clientId) return;

    if (packet.msgId) {
      if (this.seenMsgIds.has(packet.msgId)) return;
      this.seenMsgIds.add(packet.msgId);
      if (this.seenMsgIds.size > 200) {
        const first = this.seenMsgIds.values().next().value;
        this.seenMsgIds.delete(first);
      }
    }

    if (this.onMessageCallback) {
      this.onMessageCallback(packet);
    }
  }

  send(data) {
    const packet = {
      ...data,
      msgId: this.clientId + '_' + Date.now() + '_' + Math.floor(Math.random()*10000),
      senderClientId: this.clientId
    };
    this.seenMsgIds.add(packet.msgId);

    if (this.channel) {
      try { this.channel.postMessage(packet); } catch(e) {}
    }

    if (this.mqttClient && this.isMqttConnected) {
      try {
        this.mqttClient.publish(`pookie/cafe/${this.roomCode}/events`, JSON.stringify(packet));
      } catch(e) {}
    }
  }
}

const net = new CuteNetwork();

function generateRoomCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}

function handleCreateRoom() {
  audio.playPop();
  const room = generateRoomCode();
  state.roomCode = room;
  state.isHost = true;
  state.mode = 'host';
  state.players = [{ id: net.clientId, name: state.player.name, avatar: state.player.avatar, isHost: true }];

  net.connect(room, handleIncomingData);

  displayRoomCode.textContent = room;
  roomWaitingBox.style.display = 'block';
  startShiftBtn.style.display = 'inline-flex';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  document.getElementById('createRoomBtn').style.display = 'none';

  renderPlayersChips();
  showToast('تم فتح الغرفة بنجاح! شاركي الكود مع صديقاتك 🎀');
}

function handleJoinRoom() {
  audio.playPop();
  const codeInput = document.getElementById('joinRoomCodeInput');
  const code = codeInput ? codeInput.value.trim().toUpperCase() : '';
  if (!code) {
    showToast('الرجاء إدخال كود الغرفة أولاً 🌸');
    return;
  }

  state.roomCode = code;
  state.isHost = false;
  state.mode = 'client';
  state.players = [{ id: net.clientId, name: state.player.name, avatar: state.player.avatar, isHost: false }];

  net.connect(code, handleIncomingData);

  displayRoomCode.textContent = code;
  roomWaitingBox.style.display = 'block';
  startShiftBtn.style.display = 'none';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  document.getElementById('createRoomBtn').style.display = 'none';

  renderPlayersChips();
  showToast('جاري الاتصال بالكافيه... ☕✨');

  const sendJoin = () => {
    net.send({
      type: 'JOIN_REQUEST',
      player: {
        id: net.clientId,
        name: state.player.name,
        avatar: state.player.avatar,
        isHost: false
      }
    });
  };

  setTimeout(sendJoin, 200);
  setTimeout(sendJoin, 1000);
  setTimeout(sendJoin, 2500);
}

function handleSoloPlay() {
  audio.playPop();
  state.mode = 'solo';
  state.isHost = true;
  state.players = [{ id: 'solo', name: state.player.name, avatar: state.player.avatar, isHost: true }];
  startShift();
}

function broadcastState() {
  if (!state.isHost) return;
  net.send({
    type: 'SYNC_STATE',
    players: state.players,
    orders: state.orders,
    sharedItems: state.sharedItems,
    score: state.score,
    coins: state.coins,
    level: state.level,
    shiftActive: state.shiftActive
  });
}

function handleIncomingData(data) {
  if (data.type === 'JOIN_REQUEST') {
    if (state.isHost) {
      const exists = state.players.some(p => p.id === data.player.id);
      if (!exists) {
        state.players.push(data.player);
        audio.playDing();
        showToast(`انضمت ${data.player.name} إلى الكافيه! 💖`, data.player.avatar);
        renderPlayersChips();
      }
      broadcastState();
    }
  } else if (data.type === 'SYNC_STATE') {
    state.players = data.players || state.players;
    state.orders = data.orders || [];
    state.sharedItems = data.sharedItems || [];
    state.score = data.score || 0;
    state.coins = data.coins || 0;
    
    if (data.level && data.level !== state.level) {
      state.level = data.level;
      showToast(`🎉 انتقل الجميع إلى اللفل ${state.level}!`, '🌟');
      audio.playFanfare();
    }

    if (data.shiftActive && !state.shiftActive) {
      launchGameView();
    }

    renderOrders();
    renderSharedItems();
    updateStatsDisplay();
    renderPlayersChips();
    renderStationView();
  } else if (data.type === 'SHOUT') {
    audio.playAlert();
    showToast(data.message, data.avatar || '💬');
  } else if (data.type === 'ADD_SHARED_ITEM') {
    if (!state.sharedItems.some(i => i.id === data.item.id)) {
      state.sharedItems.push(data.item);
      audio.playDing();
      showToast(`وضعت ${data.senderName} ${data.item.name} على طاولة التجهيز!`, '✨');
      renderSharedItems();
      if (state.isHost) broadcastState();
    }
  } else if (data.type === 'SERVE_ORDER') {
    handleServeOrder(data.orderId, data.itemId, data.senderName);
  } else if (data.type === 'DISCARD_SHARED_ITEM') {
    const idx = state.sharedItems.findIndex(i => i.id === data.itemId);
    if (idx !== -1) {
      state.sharedItems.splice(idx, 1);
      renderSharedItems();
      if (state.isHost) broadcastState();
    }
  }
}

function sendShout(msg) {
  audio.playPop();
  const text = `${state.player.name}: ${msg}`;
  showToast(text, state.player.avatar);
  net.send({
    type: 'SHOUT',
    message: text,
    avatar: state.player.avatar
  });
}

function copyDirectLink() {
  audio.playPop();
  const directUrl = `${window.location.origin}${window.location.pathname}?room=${state.roomCode}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(directUrl).then(() => {
      showToast('تم نسخ الرابط المباشر! 📋✨');
    }).catch(() => {
      prompt('انسخي هذا الرابط وصلي لصديقاتك:', directUrl);
    });
  } else {
    prompt('انسخي هذا الرابط وصلي لصديقاتك:', directUrl);
  }
}

function renderPlayersChips() {
  if (!playersChipsContainer) return;
  playersChipsContainer.innerHTML = '';
  state.players.forEach(p => {
    const chip = document.createElement('div');
    chip.className = `player-chip ${p.isHost ? 'is-host' : ''}`;
    chip.innerHTML = `<span>${p.avatar}</span> <span>${p.name}</span> ${p.isHost ? '👑' : ''}`;
    playersChipsContainer.appendChild(chip);
  });
}

// ==========================================
// 7. اللعبة ونظام اللفلات
// ==========================================
function startShift() {
  audio.playDing();
  state.shiftActive = true;
  state.level = 1;
  state.levelTargetScore = 200;
  state.score = 0;
  state.coins = 0;
  state.servedCount = 0;
  state.missedCount = 0;
  state.orders = [];
  state.sharedItems = [];
  state.currentDrink = { ingredients: [] };
  state.currentBakery = { ingredients: [] };

  launchGameView();

  if (state.isHost) {
    spawnCustomerOrder();
    setTimeout(spawnCustomerOrder, 2500);

    if (state.orderInterval) clearInterval(state.orderInterval);
    if (state.shiftInterval) clearInterval(state.shiftInterval);

    const spawnSpeed = Math.max(5000, 11000 - (state.level * 1500));
    state.orderInterval = setInterval(() => {
      if (state.orders.length < 5) {
        spawnCustomerOrder();
      }
    }, spawnSpeed);

    state.shiftInterval = setInterval(() => {
      updateCustomerPatience();
      checkLevelUpProgress();
      updateStatsDisplay();
      broadcastState();
    }, 1000);
  }
}

function checkLevelUpProgress() {
  if (state.score >= state.levelTargetScore) {
    state.level++;
    state.levelTargetScore += 250 + (state.level * 100);
    audio.playFanfare();
    showToast(`👑 مبرووك! ارتفع المستوى إلى اللفل ${state.level}! انفتحت وصفات جديدة!`, '🎉');
    renderStationView();
    broadcastState();
  }
}

function launchGameView() {
  showScreen('game');
  if (statsBar) statsBar.style.display = 'flex';
  renderStationView();
  renderOrders();
  renderSharedItems();
  updateStatsDisplay();
}

function spawnCustomerOrder() {
  const availableRecipes = RECIPES.filter(r => r.minLevel <= state.level);
  const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
  const cust = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  
  const basePatience = Math.max(45, 90 - (state.level * 8));

  const newOrder = {
    id: 'ord_' + Date.now() + '_' + Math.floor(Math.random()*100),
    customerName: cust.name,
    customerAvatar: cust.avatar,
    recipeId: recipe.id,
    recipeName: recipe.name,
    recipeIcon: recipe.icon,
    recipeTags: recipe.tags,
    required: recipe.required,
    maxPatience: basePatience,
    patience: basePatience
  };
  state.orders.push(newOrder);
  audio.playDing();
  showToast(`وصل زبون جديد: ${cust.name}!`, cust.avatar);
  renderOrders();
  broadcastState();
}

function updateCustomerPatience() {
  for (let i = state.orders.length - 1; i >= 0; i--) {
    state.orders[i].patience--;
    if (state.orders[i].patience <= 0) {
      const missed = state.orders.splice(i, 1)[0];
      state.missedCount++;
      state.score = Math.max(0, state.score - 20);
      showToast(`${missed.customerName} زعل وغادر! 💔`, '😭');
      audio.playAlert();
    }
  }
  renderOrders();
}

function updateStatsDisplay() {
  const scElem = document.getElementById('statScore');
  const cnElem = document.getElementById('statCoins');
  if (scElem) scElem.textContent = `${state.score} / ${state.levelTargetScore}`;
  if (cnElem) cnElem.textContent = `${state.coins} 🪙`;
  
  const timerElem = document.getElementById('statTimer');
  if (timerElem) {
    timerElem.innerHTML = `اللفل <strong style="color:var(--pink-main); font-size:16px;">${state.level}</strong> ⭐`;
  }
}

// ==========================================
// 8. عرض تذاكر الزبائن وطاولة التجهيز مع المهملات
// ==========================================
function renderOrders() {
  if (!ordersRack) return;
  ordersRack.innerHTML = '';
  if (state.orders.length === 0) {
    ordersRack.innerHTML = '<div style="font-size:13px; color:var(--text-muted); padding:10px;">لا يوجد زبائن حالياً.. استراحة باريستا 🌸</div>';
    return;
  }

  state.orders.forEach(order => {
    const card = document.createElement('div');
    const isUrgent = order.patience < 20;
    card.className = `order-card ${isUrgent ? 'urgent' : ''}`;

    const pct = Math.max(0, (order.patience / order.maxPatience) * 100);
    let barColor = '#2ed573';
    if (pct < 35) barColor = '#ff4757';
    else if (pct < 65) barColor = '#ffa502';

    let tagsHtml = order.recipeTags.map(t => `<span class="recipe-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="order-customer">
        <span class="order-avatar">${order.customerAvatar}</span>
        <span class="order-name">${order.customerName}</span>
      </div>
      <div class="patience-bar-bg">
        <div class="patience-bar-fill" style="width: ${pct}%; background-color: ${barColor};"></div>
      </div>
      <div class="order-recipe">
        <div class="recipe-title">${order.recipeIcon} ${order.recipeName}</div>
        <div class="recipe-tags">${tagsHtml}</div>
      </div>
    `;

    ordersRack.appendChild(card);
  });
}

function renderSharedItems() {
  if (!sharedItemsContainer) return;
  sharedItemsContainer.innerHTML = '';
  if (state.sharedItems.length === 0) {
    sharedItemsContainer.innerHTML = '<span class="shared-empty-hint">طاولة التجهيز فارغة. جهزي صنفاً وضعيها هنا! 🍰</span>';
    return;
  }

  state.sharedItems.forEach((item) => {
    const card = document.createElement('div');
    card.style.cssText = 'display:flex; flex-direction:column; align-items:center; background:var(--gold-light); border:1.5px solid #ffde8a; border-radius:12px; padding:6px 8px; gap:4px; margin-left:6px; min-width:110px;';
    
    card.innerHTML = `
      <div style="font-size:12px; font-weight:800; color:#7a4f00; display:flex; align-items:center; gap:4px; white-space:nowrap;">
        <span>${item.icon}</span> <span>${item.name}</span>
      </div>
      <div style="font-size:9.5px; color:#a87400; font-weight:700;">(${item.makerName})</div>
      <div style="display:flex; gap:4px; width:100%; margin-top:2px;">
        <button class="quick-serve-btn" style="background:var(--pink-main); color:#fff; border:none; border-radius:10px; padding:4px 6px; font-size:11px; font-weight:800; cursor:pointer; flex:1; box-shadow:0 2px 6px rgba(255,117,151,0.3); transition:all 0.2s;">
          🛎️ تقديم
        </button>
        <button class="trash-item-btn" title="رمي في السلة" style="background:#ff4757; color:#fff; border:none; border-radius:10px; padding:4px 8px; font-size:11px; font-weight:800; cursor:pointer; box-shadow:0 2px 6px rgba(255,71,87,0.3); transition:all 0.2s;">
          🗑️
        </button>
      </div>
    `;
    
    const serveBtn = card.querySelector('.quick-serve-btn');
    serveBtn.addEventListener('click', () => {
      directServeSharedItem(item);
    });

    const trashBtn = card.querySelector('.trash-item-btn');
    trashBtn.addEventListener('click', () => {
      discardSharedItem(item.id);
    });

    sharedItemsContainer.appendChild(card);
  });
}

function discardSharedItem(itemId) {
  audio.playPop();
  const idx = state.sharedItems.findIndex(i => i.id === itemId);
  if (idx !== -1) {
    const removed = state.sharedItems.splice(idx, 1)[0];
    showToast(`تم رمي (${removed.name}) في السلة! 🗑️`);
    renderSharedItems();
    
    net.send({
      type: 'DISCARD_SHARED_ITEM',
      itemId: itemId
    });

    if (state.isHost) broadcastState();
  }
}

function directServeSharedItem(item) {
  const matchedOrder = state.orders.find(o => o.recipeId === item.recipeId);
  if (!matchedOrder) {
    showToast(`هذا الصنف (${item.name}) لا يطابق أي طلب مفتوح حالياً!`);
    return;
  }

  handleServeOrder(matchedOrder.id, item.id, state.player.name);
  net.send({
    type: 'SERVE_ORDER',
    orderId: matchedOrder.id,
    itemId: item.id,
    senderName: state.player.name
  });
}

function handleServeOrder(orderId, itemId, senderName) {
  const orderIdx = state.orders.findIndex(o => o.id === orderId);
  const itemIdx = state.sharedItems.findIndex(i => i.id === itemId);

  if (orderIdx !== -1 && itemIdx !== -1) {
    const order = state.orders.splice(orderIdx, 1)[0];
    state.sharedItems.splice(itemIdx, 1);

    state.score += 60 + Math.floor(order.patience);
    state.coins += 20;
    state.servedCount++;

    audio.playCash();
    showToast(`كفووو! سلّمت ${senderName} الطلب لـ ${order.customerName} بنجاح! 💖💰`, '🎉');

    renderOrders();
    renderSharedItems();
    checkLevelUpProgress();
    updateStatsDisplay();
    broadcastState();
  }
}

// ==========================================
// 9. محطات العمل
// ==========================================
function renderStationView() {
  if (!ingredientsGrid) return;
  ingredientsGrid.innerHTML = '';

  if (state.selectedStation === 'drinks') {
    renderDrinksStation();
  } else if (state.selectedStation === 'bakery') {
    renderBakeryStation();
  } else if (state.selectedStation === 'serving') {
    renderServingStation();
  }
}

function renderDrinksStation() {
  if (stationHint) stationHint.textContent = `مستواك الحالي: اللفل ${state.level} 🌟 (المكونات المقفولة تفتح مع ارتفاع اللفل)`;

  updateDrinkVisual();

  const drinkIngredients = [
    { key: 'cup', name: 'كوب فارغ', icon: '🥛', sound: 'pour' },
    { key: 'ice', name: 'ثلج', icon: '🧊', sound: 'pop' },
    { key: 'matcha', name: 'ماتشا خضراء', icon: '🍵', sound: 'pour' },
    { key: 'strawberry', name: 'فراولة', icon: '🍓', sound: 'pour' },
    { key: 'milk', name: 'حليب', icon: '🥛', sound: 'pour' },
    { key: 'boba', name: 'كرات البوبا', icon: '⚫', sound: 'pop' },
    { key: 'cream', name: 'كريمة خفق', icon: '🍦', sound: 'pour' },
    { key: 'coffee', name: 'إسبريسو', icon: '☕', sound: 'pour' },
    { key: 'caramel', name: 'كراميل', icon: '🍯', sound: 'pour' },
    { key: 'tea', name: 'شاي مثلج', icon: '🫖', sound: 'pour' },
    { key: 'peach', name: 'نكهة خوخ', icon: '🍑', sound: 'pour' }
  ];

  drinkIngredients.forEach(ing => {
    const meta = INGREDIENT_NAMES[ing.key] || {};
    const minLvl = meta.minLevel || 1;
    const isLocked = state.level < minLvl;

    const card = document.createElement('div');
    card.className = `ingredient-card ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `
      <span class="ing-icon">${ing.icon}</span>
      <span class="ing-name">${ing.name}</span>
      ${isLocked ? `<span class="lock-badge">🔒 لفل ${minLvl}</span>` : ''}
    `;

    card.addEventListener('click', () => {
      if (isLocked) {
        showToast(`هذا المكون ينفتح في اللفل ${minLvl}! واصلي تجميع النقاط! ⭐`);
        audio.playAlert();
        return;
      }
      addDrinkIngredient(ing.key, ing.sound);
    });

    ingredientsGrid.appendChild(card);
  });
}

function addDrinkIngredient(key, soundType) {
  if (soundType === 'pour') audio.playPour();
  else audio.playPop();

  if (key === 'cup' && state.currentDrink.ingredients.includes('cup')) {
    showToast('الكوب موجود بالفعل!');
    return;
  }
  if (key !== 'cup' && !state.currentDrink.ingredients.includes('cup')) {
    showToast('ضعي الكوب الفارغ أولاً 🥛');
    return;
  }

  if (!state.currentDrink.ingredients.includes(key)) {
    state.currentDrink.ingredients.push(key);
    updateDrinkVisual();
  }
}

function updateDrinkVisual() {
  const current = state.currentDrink.ingredients;
  const visualContainer = currentItemVisual;
  if (!visualContainer) return;

  if (current.length === 0) {
    visualContainer.innerHTML = `
      <span class="item-cup-preview" style="opacity:0.4;">🥛</span>
      <span style="font-size:12.5px; color:var(--text-muted);">طاولة المشروبات فارغة. اضغطي على كوب للبدء!</span>
    `;
    return;
  }

  let previewIcon = '🥛';
  if (current.includes('boba')) previewIcon = '🧋';
  else if (current.includes('matcha')) previewIcon = '🍵';
  else if (current.includes('strawberry')) previewIcon = '🍓';
  else if (current.includes('coffee')) previewIcon = '☕';
  else if (current.includes('tea')) previewIcon = '🫖';

  const badges = current.map(k => {
    const info = INGREDIENT_NAMES[k] || { name: k, icon: '✨' };
    return `<span class="ingredient-badge">${info.icon} ${info.name}</span>`;
  }).join('');

  visualContainer.innerHTML = `
    <span class="item-cup-preview">${previewIcon}</span>
    <div class="item-ingredients-tags">${badges}</div>
    <div style="display:flex; gap:8px; margin-top:10px;">
      <button class="btn-primary" id="placeDrinkBtn" style="font-size:12px; padding:7px 14px;">✨ وضع على طاولة التجهيز</button>
      <button class="btn-solo" id="clearDrinkBtn" style="font-size:12px; padding:7px 14px; background:#ffeaa7; color:#d63031;">🗑️ تفريغ</button>
    </div>
  `;

  document.getElementById('placeDrinkBtn').addEventListener('click', finishDrink);
  document.getElementById('clearDrinkBtn').addEventListener('click', () => {
    audio.playPop();
    state.currentDrink.ingredients = [];
    updateDrinkVisual();
  });
}

function finishDrink() {
  const ing = state.currentDrink.ingredients;
  const matchedRecipe = RECIPES.find(r => r.type === 'drink' && r.required.every(req => ing.includes(req)));

  if (!matchedRecipe) {
    showToast('هذه الخلطة لا تطابق أي مشروب في القائمة! 🍵');
    audio.playAlert();
    return;
  }

  const newItem = {
    id: 'item_' + Date.now() + '_' + Math.floor(Math.random()*100),
    recipeId: matchedRecipe.id,
    name: matchedRecipe.name,
    icon: matchedRecipe.icon,
    makerName: state.player.name
  };

  state.sharedItems.push(newItem);
  audio.playDing();
  showToast(`تم تجهيز ${matchedRecipe.name}! ✨`);

  net.send({
    type: 'ADD_SHARED_ITEM',
    item: newItem,
    senderName: state.player.name
  });

  state.currentDrink.ingredients = [];
  updateDrinkVisual();
  renderSharedItems();
  if (state.isHost) broadcastState();
}

function renderBakeryStation() {
  if (stationHint) stationHint.textContent = 'جهزي العجينة ثم اضغطي زر (خبز بالفرن 🔥) بجانب زر التقديم!';

  updateBakeryVisual();

  const bakeryIngredients = [
    { key: 'donut_base', name: 'عجينة دونات', icon: '🍩' },
    { key: 'pink_glaze', name: 'تغطية وردية', icon: '🌸' },
    { key: 'sprinkles', name: 'سبرنكلز', icon: '✨' },
    { key: 'cake_base', name: 'طبقات كيك', icon: '🍰' },
    { key: 'cream', name: 'كريمة خفق', icon: '🍦' },
    { key: 'strawberry', name: 'فراولة', icon: '🍓' },
    { key: 'pancake_base', name: 'خليط بانكيك', icon: '🥞' },
    { key: 'butter', name: 'مكعب زبدة', icon: '🧈' },
    { key: 'honey', name: 'عسل صافي', icon: '🍯' }
  ];

  bakeryIngredients.forEach(ing => {
    const meta = INGREDIENT_NAMES[ing.key] || {};
    const minLvl = meta.minLevel || 1;
    const isLocked = state.level < minLvl;

    const card = document.createElement('div');
    card.className = `ingredient-card ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `
      <span class="ing-icon">${ing.icon}</span>
      <span class="ing-name">${ing.name}</span>
      ${isLocked ? `<span class="lock-badge">🔒 لفل ${minLvl}</span>` : ''}
    `;

    card.addEventListener('click', () => {
      if (isLocked) {
        showToast(`هذا الصنف يفتح باللفل ${minLvl}! ⭐`);
        audio.playAlert();
        return;
      }
      addBakeryIngredient(ing.key);
    });

    ingredientsGrid.appendChild(card);
  });
}

function addBakeryIngredient(key) {
  audio.playPop();
  const bases = ['donut_base', 'cake_base', 'pancake_base'];
  const ing = state.currentBakery.ingredients;

  if (bases.includes(key)) {
    if (ing.some(b => bases.includes(b))) {
      showToast('القاعدة موجودة بالفعل على صينية التحضير!');
      return;
    }
  } else {
    if (!ing.some(b => bases.includes(b))) {
      showToast('اختاري قاعدة الكيك أو الدونات أولاً! 🧁');
      return;
    }
  }

  if (!ing.includes(key)) {
    ing.push(key);
    updateBakeryVisual();
  }
}

function updateBakeryVisual() {
  const current = state.currentBakery.ingredients;
  const visualContainer = currentItemVisual;
  if (!visualContainer) return;

  if (current.length === 0) {
    visualContainer.innerHTML = `
      <span class="item-cup-preview" style="opacity:0.4;">🧁</span>
      <span style="font-size:12.5px; color:var(--text-muted);">طاولة الفرن فارغة. اختاري قاعدة حلى للبدء!</span>
    `;
    return;
  }

  let previewIcon = '🧁';
  if (current.includes('donut_base')) previewIcon = '🍩';
  else if (current.includes('cake_base')) previewIcon = '🍰';
  else if (current.includes('pancake_base')) previewIcon = '🥞';

  const badges = current.map(k => {
    const info = INGREDIENT_NAMES[k] || { name: k, icon: '✨' };
    return `<span class="ingredient-badge">${info.icon} ${info.name}</span>`;
  }).join('');

  const isBaked = current.includes('baked');

  visualContainer.innerHTML = `
    <span class="item-cup-preview">${previewIcon}</span>
    <div class="item-ingredients-tags">${badges}</div>
    <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; justify-content:center;">
      <button class="btn-primary" id="bakeOvenBtn" style="font-size:12px; padding:7px 14px; background:linear-gradient(135deg, #ff9f43, #ee5253); display:${isBaked ? 'none' : 'inline-flex'};">🔥 خبز بالفرن</button>
      <button class="btn-primary" id="placeBakeryBtn" style="font-size:12px; padding:7px 14px;">✨ وضع على طاولة التجهيز</button>
      <button class="btn-solo" id="clearBakeryBtn" style="font-size:12px; padding:7px 14px; background:#ffeaa7; color:#d63031;">🗑️ تفريغ</button>
    </div>
  `;

  const bakeBtn = document.getElementById('bakeOvenBtn');
  if (bakeBtn) {
    bakeBtn.addEventListener('click', () => {
      if (!current.includes('baked')) {
        current.push('baked');
        audio.playPour();
        showToast('تم الخبز بالفرن بنجاح! 🔥✨');
        updateBakeryVisual();
      }
    });
  }

  document.getElementById('placeBakeryBtn').addEventListener('click', finishBakery);
  document.getElementById('clearBakeryBtn').addEventListener('click', () => {
    audio.playPop();
    state.currentBakery.ingredients = [];
    updateBakeryVisual();
  });
}

function finishBakery() {
  const ing = state.currentBakery.ingredients;
  const matchedRecipe = RECIPES.find(r => r.type === 'bakery' && r.required.every(req => ing.includes(req)));

  if (!matchedRecipe) {
    showToast('هذه الوصفة غير مكتملة أو لم تُخبز بالفرن بعد! 🍰');
    audio.playAlert();
    return;
  }

  const newItem = {
    id: 'item_' + Date.now() + '_' + Math.floor(Math.random()*100),
    recipeId: matchedRecipe.id,
    name: matchedRecipe.name,
    icon: matchedRecipe.icon,
    makerName: state.player.name
  };

  state.sharedItems.push(newItem);
  audio.playDing();
  showToast(`تم التجهيز: ${matchedRecipe.name} جاهزة! ✨`);

  net.send({
    type: 'ADD_SHARED_ITEM',
    item: newItem,
    senderName: state.player.name
  });

  state.currentBakery.ingredients = [];
  updateBakeryVisual();
  renderSharedItems();
  if (state.isHost) broadcastState();
}

function renderServingStation() {
  if (stationHint) stationHint.textContent = 'تفحصي الطلبات وطاولة التجهيز، وقدميها للزبائن!';

  if (currentItemVisual) {
    currentItemVisual.innerHTML = `
      <span style="font-size:32px;">🛎️</span>
      <span style="font-size:13px; color:var(--text-dark); font-weight:700;">محطة التقديم التسليم الفوري</span>
      <span style="font-size:11.5px; color:var(--text-muted);">اضغطي زر (🛎️ تقديم) تحت الصنف المنشور!</span>
    `;
  }

  if (!ingredientsGrid) return;
  ingredientsGrid.innerHTML = '';
  if (state.orders.length === 0) {
    ingredientsGrid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:var(--text-muted);">لا توجد طلبات جارية الآن 🎉</div>';
    return;
  }

  state.orders.forEach(ord => {
    const card = document.createElement('div');
    card.style.cssText = 'background:#fff; border-radius:12px; padding:10px; border:1px solid #ffd6e0; display:flex; flex-direction:column; gap:6px; align-items:center; text-align:center;';
    card.innerHTML = `
      <div style="font-size:20px;">${ord.recipeIcon}</div>
      <div style="font-weight:800; font-size:12px; color:var(--text-dark);">${ord.recipeName}</div>
      <div style="font-size:11px; color:var(--pink-main); font-weight:700;">للزبون: ${ord.customerAvatar} ${ord.customerName}</div>
    `;
    ingredientsGrid.appendChild(card);
  });
}

// ==========================================
// 10. التشغيل التلقائي المضمون
// ==========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
