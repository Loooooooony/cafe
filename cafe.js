/**
 * كافيه البنات المشترك | Pookie Cozy Cafe Rush
 * Game Engine, Upgrades Shop, Animated SVG Avatars & Expanded Levels
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
// 2. أيقونات الحركات والحيوانات المتحركة (SVG)
// ==========================================
const ANIMAL_AVATARS = {
  cat: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><circle cx="32" cy="36" r="22" fill="#ffeaa7"/><path d="M14 20 L24 8 L28 26 Z" fill="#fdcb6e"/><path d="M50 20 L40 8 L36 26 Z" fill="#fdcb6e"/><circle cx="24" cy="34" r="3" fill="#2d3436"/><circle cx="40" cy="34" r="3" fill="#2d3436"/><ellipse cx="32" cy="40" rx="4" ry="2.5" fill="#ff7597"/><ellipse cx="18" cy="38" rx="3.5" ry="2" fill="#ff7597" opacity="0.5"/><ellipse cx="46" cy="38" rx="3.5" ry="2" fill="#ff7597" opacity="0.5"/></g></svg>`,
  bunny: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><ellipse cx="22" cy="16" rx="6" ry="16" fill="#ffd6e0"/><ellipse cx="42" cy="16" rx="6" ry="16" fill="#ffd6e0"/><circle cx="32" cy="38" r="20" fill="#fff"/><circle cx="24" cy="36" r="3" fill="#2d3436"/><circle cx="40" cy="36" r="3" fill="#2d3436"/><polygon points="32,41 29,44 35,44" fill="#ff7597"/><ellipse cx="18" cy="40" rx="3" ry="2" fill="#ff7597" opacity="0.6"/><ellipse cx="46" cy="40" rx="3" ry="2" fill="#ff7597" opacity="0.6"/></g></svg>`,
  bear: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><circle cx="16" cy="18" r="8" fill="#e1b12c"/><circle cx="48" cy="18" r="8" fill="#e1b12c"/><circle cx="32" cy="36" r="22" fill="#fbc531"/><ellipse cx="32" cy="40" rx="9" ry="7" fill="#fff"/><circle cx="24" cy="32" r="3" fill="#2d3436"/><circle cx="40" cy="32" r="3" fill="#2d3436"/><ellipse cx="32" cy="38" rx="3" ry="2" fill="#2d3436"/></g></svg>`,
  shiba: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><path d="M12 18 L24 10 L26 28 Z" fill="#e67e22"/><path d="M52 18 L40 10 L38 28 Z" fill="#e67e22"/><circle cx="32" cy="36" r="21" fill="#f39c12"/><path d="M20 44 C20 30, 44 30, 44 44 C44 54, 20 54, 20 44 Z" fill="#fff"/><circle cx="24" cy="32" r="3" fill="#2d3436"/><circle cx="40" cy="32" r="3" fill="#2d3436"/><ellipse cx="32" cy="37" rx="3" ry="2" fill="#2d3436"/></g></svg>`,
  fox: `<svg class="animated-avatar-svg" viewBox="0 0 64 64" width="42" height="42"><g class="bounce-anim"><path d="M10 14 L24 10 L28 30 Z" fill="#e74c3c"/><path d="M54 14 L40 10 L36 30 Z" fill="#e74c3c"/><circle cx="32" cy="36" r="21" fill="#e67e22"/><polygon points="32,56 18,36 46,36" fill="#fff"/><circle cx="23" cy="32" r="3" fill="#2d3436"/><circle cx="41" cy="32" r="3" fill="#2d3436"/><circle cx="32" cy="48" r="3" fill="#2d3436"/></g></svg>`
};

const CUSTOMERS = [
  { name: 'ميمي القطة', avatar: ANIMAL_AVATARS.cat },
  { name: 'سمسم الأرنوبة', avatar: ANIMAL_AVATARS.bunny },
  { name: 'بوبا الدبدوب', avatar: ANIMAL_AVATARS.bear },
  { name: 'كوكي الشيبا', avatar: ANIMAL_AVATARS.shiba },
  { name: 'توتو الثعلوبة', avatar: ANIMAL_AVATARS.fox }
];

const SHOP_MACHINES = {
  espresso_machine: { id: 'espresso_machine', name: 'آلة الإسبريسو الاحترافية', price: 100, icon: '☕', desc: 'تفتح تحضير القهوة، الإسبريسو واللاتيه' },
  boba_brewer: { id: 'boba_brewer', name: 'صانعة شاي البوبا', price: 150, icon: '🧋', desc: 'تفتح المشروبات المتقدمة وشاي الخوخ' },
  pastry_oven: { id: 'pastry_oven', name: 'فرن الحلويات المتقدم', price: 200, icon: '🍪', desc: 'يفتح الكوكيز والوافل الملكي' },
  ice_cream_maker: { id: 'ice_cream_maker', name: 'آلة الآيس كريم', price: 250, icon: '🍦', desc: 'تفتح آيس كريم الماتشا والحلويات المثلجة' }
};

const RECIPES = [
  { id: 'matcha_boba', name: 'ماتشا مثلجة بالبوبا', type: 'drink', icon: '🧋', minLevel: 1, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'ماتشا 🍵', 'حليب 🥛', 'بوبا ⚫'], required: ['cup', 'ice', 'matcha', 'milk', 'boba'] },
  { id: 'strawberry_milk', name: 'حليب الفراولة بالكريمة', type: 'drink', icon: '🍓', minLevel: 1, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'فراولة 🍓', 'حليب 🥛', 'كريمة 🍦'], required: ['cup', 'ice', 'strawberry', 'milk', 'cream'] },
  { id: 'pink_donut', name: 'دونات وردية بالسبرنكلز', type: 'bakery', icon: '🍩', minLevel: 1, requiredMachine: null, tags: ['دونات 🍩', 'خبز بالفرن 🔥', 'تغطية وردية 🌸', 'سبرنكلز ✨'], required: ['donut_base', 'baked', 'pink_glaze', 'sprinkles'] },
  
  { id: 'spanish_latte', name: 'سبانش كولد لاتيه', type: 'drink', icon: '☕', minLevel: 2, requiredMachine: 'espresso_machine', tags: ['كوب 🥛', 'ثلج 🧊', 'قهوة ☕', 'حليب 🥛', 'كراميل 🍯'], required: ['cup', 'ice', 'coffee', 'milk', 'caramel'] },
  { id: 'strawberry_cake', name: 'كيكة الفراولة السحابية', type: 'bakery', icon: '🍰', minLevel: 2, requiredMachine: null, tags: ['كيك 🍰', 'خبز بالفرن 🔥', 'كريمة 🍦', 'فراولة 🍓'], required: ['cake_base', 'baked', 'cream', 'strawberry'] },
  
  { id: 'peach_tea', name: 'شاي خوخ منعش بالبوبا', type: 'drink', icon: '🍑', minLevel: 3, requiredMachine: 'boba_brewer', tags: ['كوب 🥛', 'ثلج 🧊', 'شاي 🫖', 'خوخ 🍑', 'بوبا ⚫'], required: ['cup', 'ice', 'tea', 'peach', 'boba'] },
  { id: 'honey_pancake', name: 'بان كيك العسل والزبدة', type: 'bakery', icon: '🥞', minLevel: 3, requiredMachine: null, tags: ['بان كيك 🥞', 'خبز بالفرن 🔥', 'زبدة 🧈', 'عسل 🍯'], required: ['pancake_base', 'baked', 'butter', 'honey'] },

  { id: 'cortado', name: 'كورتادو دافئ', type: 'drink', icon: '☕', minLevel: 4, requiredMachine: 'espresso_machine', tags: ['كوب 🥛', 'قهوة ☕', 'حليب 🥛'], required: ['cup', 'coffee', 'milk'] },
  { id: 'iced_choco', name: 'آيس شوكولاتة مارشميلو', type: 'drink', icon: '🍫', minLevel: 4, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'شوكولاتة 🍫', 'حليب 🥛', 'مارشميلو ☁️'], required: ['cup', 'ice', 'choco', 'milk', 'marshmallow'] },
  { id: 'choc_cookie', name: 'كوكيز الشوكولاتة والجوز', type: 'bakery', icon: '🍪', minLevel: 4, requiredMachine: 'pastry_oven', tags: ['عجينة كوكيز 🍪', 'خبز بالفرن 🔥', 'قطع شوكولاتة 🍫'], required: ['cookie_base', 'baked', 'choco_chips'] },

  { id: 'waffle_delight', name: 'وافل الكراميل والآيس كريم', type: 'bakery', icon: '🧇', minLevel: 5, requiredMachine: 'pastry_oven', tags: ['وافل 🧇', 'خبز بالفرن 🔥', 'آيس كريم 🍦', 'كراميل 🍯'], required: ['waffle_base', 'baked', 'icecream_scoop', 'caramel'] },
  { id: 'matcha_icecream', name: 'آيس كريم الماتشا الملكي', type: 'bakery', icon: '🍨', minLevel: 5, requiredMachine: 'ice_cream_maker', tags: ['ماتشا 🍵', 'آيس كريم 🍦', 'سبرنكلز ✨'], required: ['matcha', 'icecream_scoop', 'sprinkles'] },
  { id: 'lemon_mojito', name: 'موهيتو الليمون والنعناع', type: 'drink', icon: '🍹', minLevel: 5, requiredMachine: null, tags: ['كوب 🥛', 'ثلج 🧊', 'ليمون 🍋', 'نعناع 🌿', 'صودا 🫧'], required: ['cup', 'ice', 'lemon', 'mint', 'soda'] }
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

  coffee: { name: 'قهوة', icon: '☕', minLevel: 2, machine: 'espresso_machine' },
  caramel: { name: 'صوص كراميل', icon: '🍯', minLevel: 2 },
  cake_base: { name: 'طبقات كيك', icon: '🍰', minLevel: 2 },

  tea: { name: 'شاي مثلج', icon: '🫖', minLevel: 3, machine: 'boba_brewer' },
  peach: { name: 'خوخ', icon: '🍑', minLevel: 3 },
  pancake_base: { name: 'خليط بانكيك', icon: '🥞', minLevel: 3 },
  butter: { name: 'مكعب زبدة', icon: '🧈', minLevel: 3 },
  honey: { name: 'عسل صافي', icon: '🍯', minLevel: 3 },
  
  choco: { name: 'شوكولاتة', icon: '🍫', minLevel: 4 },
  marshmallow: { name: 'مارشميلو', icon: '☁️', minLevel: 4 },
  cookie_base: { name: 'عجينة كوكيز', icon: '🍪', minLevel: 4, machine: 'pastry_oven' },
  choco_chips: { name: 'قطع شوكولاتة', icon: '🍫', minLevel: 4 },

  waffle_base: { name: 'عجينة وافل', icon: '🧇', minLevel: 5, machine: 'pastry_oven' },
  icecream_scoop: { name: 'كرة آيس كريم', icon: '🍦', minLevel: 5, machine: 'ice_cream_maker' },
  lemon: { name: 'ليمون', icon: '🍋', minLevel: 5 },
  mint: { name: 'نعناع', icon: '🌿', minLevel: 5 },
  soda: { name: 'صودا فوارة', icon: '🫧', minLevel: 5 },

  baked: { name: 'مخبوز بالفرن', icon: '🔥', minLevel: 1 }
};

const state = {
  mode: 'solo',
  roomCode: '',
  isHost: false,
  player: { name: 'باريستا بوكي', avatar: ANIMAL_AVATARS.cat },
  players: [],
  level: 1,
  levelTargetScore: 200,
  shiftActive: false,
  shiftInterval: null,
  orderInterval: null,
  score: 0,
  coins: 50,
  servedCount: 0,
  missedCount: 0,
  ownedMachines: [],
  orders: [],
  sharedItems: [],
  currentDrink: { ingredients: [] },
  currentBakery: { ingredients: [] },
  selectedStation: 'drinks',
  leaderboard: JSON.parse(localStorage.getItem('pookie_leaderboard') || '[]')
};

let screens, statsBar, playerNameInput, avatarChoices, roomWaitingBox, displayRoomCode, copyRoomLinkBtn, playersChipsContainer, startShiftBtn, ordersRack, sharedItemsContainer, currentItemVisual, stationHint, ingredientsGrid, toastShout, toggleMusicBtn;

function initDOMReferences() {
  screens = { lobby: document.getElementById('lobbyScreen'), game: document.getElementById('gameScreen'), results: document.getElementById('resultsScreen') };
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

window.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  injectAnimationStyles();
  initDOMReferences();
  setupAvatarChoiceElements();

  if (playerNameInput) {
    playerNameInput.addEventListener('input', (e) => {
      state.player.name = e.target.value.trim() || 'باريستا بوكي';
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam) {
    const inputField = document.getElementById('joinRoomCodeInput');
    if (inputField) inputField.value = roomParam.toUpperCase();
    showToast(`تم تعبئة كود الغرفة تلقائياً: ${roomParam} 💖`);
  }

  if (toggleMusicBtn) {
    toggleMusicBtn.addEventListener('click', () => {
      const isPlaying = audio.toggleMusic();
      toggleMusicBtn.textContent = isPlaying ? '🎵' : '🔇';
      showToast(isPlaying ? 'تم تشغيل الموسيقى 🎶' : 'تم كتم الموسيقى 🔇');
    });
  }

  const createRoomBtn = document.getElementById('createRoomBtn');
  if (createRoomBtn) createRoomBtn.addEventListener('click', handleCreateRoom);

  const joinRoomBtn = document.getElementById('joinRoomBtn');
  if (joinRoomBtn) joinRoomBtn.addEventListener('click', handleJoinRoom);

  const soloPlayBtn = document.getElementById('soloPlayBtn');
  if (soloPlayBtn) soloPlayBtn.addEventListener('click', handleSoloPlay);

  if (startShiftBtn) startShiftBtn.addEventListener('click', startShift);

  setupLeaderboardUI();
  setupStopShiftButton();

  const playAgain = document.getElementById('playAgainBtn');
  if (playAgain) {
    playAgain.addEventListener('click', () => {
      showScreen('lobby');
      if (statsBar) statsBar.style.display = 'none';
      renderLeaderboard();
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

  renderLeaderboard();
}

function injectAnimationStyles() {
  if (document.getElementById('pookieAnimStyles')) return;
  const style = document.createElement('style');
  style.id = 'pookieAnimStyles';
  style.innerHTML = `
    @keyframes avatarBounce {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-4px) scale(1.03); }
    }
    .bounce-anim {
      animation: avatarBounce 2.4s ease-in-out infinite;
      transform-origin: center bottom;
    }
    .animated-avatar-svg {
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    }
    .shop-card-machine {
      background: #fff;
      border: 2px solid var(--pink-subtle);
      border-radius: 14px;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    }
  `;
  document.head.appendChild(style);
}

function setupAvatarChoiceElements() {
  const container = document.querySelector('.avatar-choices');
  if (!container) return;
  container.innerHTML = '';

  const list = [
    { key: 'cat', svg: ANIMAL_AVATARS.cat },
    { key: 'bunny', svg: ANIMAL_AVATARS.bunny },
    { key: 'bear', svg: ANIMAL_AVATARS.bear },
    { key: 'shiba', svg: ANIMAL_AVATARS.shiba },
    { key: 'fox', svg: ANIMAL_AVATARS.fox }
  ];

  list.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `avatar-choice ${index === 0 ? 'selected' : ''}`;
    div.innerHTML = item.svg;
    div.addEventListener('click', () => {
      audio.playPop();
      document.querySelectorAll('.avatar-choice').forEach(c => c.classList.remove('selected'));
      div.classList.add('selected');
      state.player.avatar = item.svg;
    });
    container.appendChild(div);
  });
}

function showScreen(name) {
  Object.keys(screens).forEach(key => {
    if (screens[key]) screens[key].classList.toggle('active', key === name);
  });
}

function showToast(text, avatarSvg = '✨') {
  if (!toastShout) return;
  toastShout.innerHTML = `<span>${avatarSvg}</span> <span>${text}</span>`;
  toastShout.classList.add('show');
  setTimeout(() => {
    toastShout.classList.remove('show');
  }, 2400);
}

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

  if (displayRoomCode) displayRoomCode.textContent = room;
  if (roomWaitingBox) roomWaitingBox.style.display = 'block';
  if (startShiftBtn) startShiftBtn.style.display = 'inline-flex';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  const createBtn = document.getElementById('createRoomBtn');
  if (createBtn) createBtn.style.display = 'none';

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

  if (displayRoomCode) displayRoomCode.textContent = code;
  if (roomWaitingBox) roomWaitingBox.style.display = 'block';
  if (startShiftBtn) startShiftBtn.style.display = 'none';

  const joinWrap = document.getElementById('joinRoomInputWrap');
  if (joinWrap) joinWrap.style.display = 'none';
  const createBtn = document.getElementById('createRoomBtn');
  if (createBtn) createBtn.style.display = 'none';

  renderPlayersChips();
  showToast('جاري الاتصال بالكافيه... ☕✨');

  const sendJoin = () => {
    net.send({
      type: 'JOIN_REQUEST',
      player: { id: net.clientId, name: state.player.name, avatar: state.player.avatar, isHost: false }
    });
  };

  setTimeout(sendJoin, 200);
  setTimeout(sendJoin, 1000);
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
    ownedMachines: state.ownedMachines,
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
    state.coins = data.coins || 50;
    state.ownedMachines = data.ownedMachines || [];
    
    if (data.level && data.level !== state.level) {
      state.level = data.level;
      showToast(`🎉 انتقل الجميع إلى اللفل ${state.level}!`, '🌟');
      audio.playFanfare();
    }

    if (data.shiftActive && !state.shiftActive) {
      launchGameView();
    } else if (!data.shiftActive && state.shiftActive) {
      endShiftLocally();
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
  } else if (data.type === 'BUY_MACHINE') {
    if (!state.ownedMachines.includes(data.machineId)) {
      state.ownedMachines.push(data.machineId);
      audio.playCash();
      showToast(`اشترت الكافيه آلة جديدة: ${SHOP_MACHINES[data.machineId].name}! 🎉`, '🛍️');
      renderStationView();
    }
  } else if (data.type === 'END_SHIFT') {
    endShiftLocally();
  }
}

function sendShout(msg) {
  audio.playPop();
  const text = `${state.player.name}: ${msg}`;
  showToast(text, state.player.avatar);
  net.send({ type: 'SHOUT', message: text, avatar: state.player.avatar });
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
    chip.style.cssText = 'display:flex; align-items:center; gap:6px;';
    chip.innerHTML = `<span style="width:28px; height:28px; display:inline-block;">${p.avatar}</span> <span>${p.name}</span> ${p.isHost ? '👑' : ''}`;
    playersChipsContainer.appendChild(chip);
  });
}

function setupStopShiftButton() {
  const headerControls = document.querySelector('.header-controls');
  if (headerControls && !document.getElementById('stopShiftBtn')) {
    const stopBtn = document.createElement('button');
    stopBtn.id = 'stopShiftBtn';
    stopBtn.className = 'icon-btn';
    stopBtn.style.cssText = 'background:#ff4757; color:#fff; border-color:#ff4757; width:auto; padding:0 12px; border-radius:20px; font-size:12px; font-weight:800; display:none; gap:4px;';
    stopBtn.innerHTML = '⏹️ إنهاء الشيفت';
    stopBtn.addEventListener('click', stopShift);
    headerControls.prepend(stopBtn);
  }
}

function setupLeaderboardUI() {
  const lobbyCard = document.querySelector('.lobby-card');
  if (lobbyCard && !document.getElementById('leaderboardSection')) {
    const lbBox = document.createElement('div');
    lbBox.id = 'leaderboardSection';
    lbBox.style.cssText = 'margin-top:24px; background:#fff; border:1.5px solid var(--pink-subtle); border-radius:var(--radius-md); padding:16px; text-align:right;';
    lbBox.innerHTML = `
      <div style="font-size:15px; font-weight:900; color:var(--pink-main); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
        <span>🏆</span> <span>لوحة المتصدرين (أفضل الباريستات)</span>
      </div>
      <div id="leaderboardList" style="display:flex; flex-direction:column; gap:6px;"></div>
    `;
    lobbyCard.appendChild(lbBox);
  }
}

function renderLeaderboard() {
  const lbList = document.getElementById('leaderboardList');
  if (!lbList) return;

  lbList.innerHTML = '';
  if (state.leaderboard.length === 0) {
    lbList.innerHTML = '<div style="font-size:12px; color:var(--text-muted); text-align:center; padding:8px;">لا توجد نتائج مسجلة بعد.. ابدأي أول شيفت لتتصَدّري! 🌸</div>';
    return;
  }

  const sorted = [...state.leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);
  sorted.forEach((entry, idx) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex; justify-content:space-between; align-items:center; background:var(--bg-primary); padding:8px 12px; border-radius:10px; font-size:12px; font-weight:800;';
    row.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span>#${idx+1}</span>
        <span>${entry.name}</span>
      </div>
      <div style="color:var(--pink-main);">${entry.score} نقطة ☕</div>
    `;
    lbList.appendChild(row);
  });
}

function startShift() {
  audio.playFanfare();
  state.shiftActive = true;
  state.score = 0;
  state.coins = 50;
  state.servedCount = 0;
  state.missedCount = 0;
  state.level = 1;
  state.levelTargetScore = 200;
  state.orders = [];
  state.sharedItems = [];
  state.currentDrink = { ingredients: [] };
  state.currentBakery = { ingredients: [] };

  launchGameView();

  if (state.isHost) {
    generateRandomOrder();
    generateRandomOrder();

    state.orderInterval = setInterval(() => {
      if (!state.shiftActive) return;
      if (state.orders.length < 5) {
        generateRandomOrder();
        broadcastState();
      }
    }, 9000);

    state.shiftInterval = setInterval(() => {
      if (!state.shiftActive) return;
      updateOrdersPatience();
    }, 400);

    broadcastState();
  }
}

function launchGameView() {
  showScreen('game');
  if (statsBar) statsBar.style.display = 'flex';
  const stopBtn = document.getElementById('stopShiftBtn');
  if (stopBtn) stopBtn.style.display = 'inline-flex';
  updateStatsDisplay();
  renderStationView();
  renderOrders();
  renderSharedItems();
  showToast('بدأ الشيفت! جهزوا الطلبات بسرعة 🛎️');
}

function stopShift() {
  audio.playAlert();
  if (state.isHost) {
    net.send({ type: 'END_SHIFT' });
  }
  endShiftLocally();
}

function endShiftLocally() {
  state.shiftActive = false;
  if (state.orderInterval) clearInterval(state.orderInterval);
  if (state.shiftInterval) clearInterval(state.shiftInterval);

  saveToLeaderboard(state.player.name, state.score);

  const resScore = document.getElementById('resScore');
  const resCoins = document.getElementById('resCoins');
  const resServed = document.getElementById('resServed');
  const resMissed = document.getElementById('resMissed');

  if (resScore) resScore.textContent = state.score;
  if (resCoins) resCoins.textContent = state.coins;
  if (resServed) resServed.textContent = state.servedCount;
  if (resMissed) resMissed.textContent = state.missedCount;

  showScreen('results');
  if (statsBar) statsBar.style.display = 'none';
  const stopBtn = document.getElementById('stopShiftBtn');
  if (stopBtn) stopBtn.style.display = 'none';
}

function saveToLeaderboard(name, score) {
  if (score <= 0) return;
  state.leaderboard.push({ name, score, date: new Date().toLocaleDateString() });
  state.leaderboard.sort((a,b) => b.score - a.score);
  if (state.leaderboard.length > 10) state.leaderboard.pop();
  localStorage.setItem('pookie_leaderboard', JSON.stringify(state.leaderboard));
}

function updateStatsDisplay() {
  const statScore = document.getElementById('statScore');
  const statCoins = document.getElementById('statCoins');
  const statTimer = document.getElementById('statTimer');

  if (statScore) statScore.textContent = state.score;
  if (statCoins) statCoins.textContent = `${state.coins} 🪙`;
  if (statTimer) statTimer.innerHTML = `اللفل <strong style="color:var(--pink-main);">${state.level}</strong> ⭐`;
}

function generateRandomOrder() {
  const unlockedRecipes = RECIPES.filter(r => r.minLevel <= state.level);
  const recipe = unlockedRecipes[Math.floor(Math.random() * unlockedRecipes.length)];
  const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];

  const newOrder = {
    id: 'ord_' + Math.random().toString(36).substring(2, 8),
    recipeId: recipe.id,
    recipeName: recipe.name,
    recipeType: recipe.type,
    icon: recipe.icon,
    customerName: customer.name,
    customerAvatar: customer.avatar,
    maxPatience: 100,
    patience: 100
  };

  state.orders.push(newOrder);
  renderOrders();
}

function updateOrdersPatience() {
  if (!state.shiftActive || !state.isHost) return;
  let changed = false;

  state.orders.forEach(ord => {
    ord.patience -= 0.8;
    if (ord.patience <= 0) {
      changed = true;
      state.missedCount++;
      state.score = Math.max(0, state.score - 15);
      showToast(`فات الزبون ${ord.customerName} غاضباً! 😭`, ord.customerAvatar);
    }
  });

  state.orders = state.orders.filter(ord => ord.patience > 0);

  if (changed) {
    renderOrders();
    updateStatsDisplay();
    broadcastState();
  } else {
    renderOrdersPatienceOnly();
  }
}

function renderOrdersPatienceOnly() {
  if (!ordersRack) return;
  state.orders.forEach(ord => {
    const fillEl = document.getElementById(`pat_fill_${ord.id}`);
    if (fillEl) {
      fillEl.style.width = `${Math.max(0, ord.patience)}%`;
      if (ord.patience < 35) {
        fillEl.style.background = '#ff4757';
      } else {
        fillEl.style.background = 'var(--pink-main)';
      }
    }
  });
}

function renderOrders() {
  if (!ordersRack) return;
  ordersRack.innerHTML = '';

  if (state.orders.length === 0) {
    ordersRack.innerHTML = '<div style="font-size:12px; color:var(--text-muted); padding:10px;">لا توجد طلبات حالياً.. انتظر قليلاً وصول الزبائن 🛎️</div>';
    return;
  }

  state.orders.forEach(ord => {
    const card = document.createElement('div');
    card.className = `order-card ${ord.patience < 35 ? 'urgent' : ''}`;
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:6px;">
        <span style="font-size:20px;">${ord.icon}</span>
        <div>
          <div style="font-size:11px; font-weight:800;">${ord.recipeName}</div>
          <div style="font-size:9.5px; color:var(--text-muted);">${ord.customerName}</div>
        </div>
      </div>
      <div class="patience-bar-bg">
        <div id="pat_fill_${ord.id}" class="patience-bar-fill" style="width:${ord.patience}%; background:${ord.patience < 35 ? '#ff4757' : 'var(--pink-main)'};"></div>
      </div>
    `;
    ordersRack.appendChild(card);
  });
}

function renderSharedItems() {
  if (!sharedItemsContainer) return;
  sharedItemsContainer.innerHTML = '';

  if (state.sharedItems.length === 0) {
    sharedItemsContainer.innerHTML = '<div style="font-size:11px; color:#955; padding:4px;">الطاولة فارغة.. جهزي الأطباق والمشروبات وضعيها هنا ليتم تقديمها 🍰</div>';
    return;
  }

  state.sharedItems.forEach(item => {
    const chip = document.createElement('div');
    chip.style.cssText = 'background:#fff; border:1.5px solid var(--gold-border); padding:6px 10px; border-radius:12px; display:flex; align-items:center; gap:6px; margin-left:6px; font-size:11px; font-weight:800; cursor:pointer;';
    chip.innerHTML = `<span>${item.icon}</span> <span>${item.name}</span> <span style="font-size:10px; color:var(--pink-main);">(اضطي للتقديم 🛎️)</span>`;
    
    chip.addEventListener('click', () => {
      audio.playPop();
      attemptServeSharedItem(item);
    });

    sharedItemsContainer.appendChild(chip);
  });
}

function attemptServeSharedItem(item) {
  if (state.orders.length === 0) {
    showToast('لا توجد طلبات بانتظار التقديم حالياً! 🌸');
    return;
  }

  const matchingOrder = state.orders.find(o => o.recipeId === item.recipeId);
  if (!matchingOrder) {
    showToast('لا يوجد زبون يطلب هذا الصنف حالياً! راقبي الطلبات 🛎️');
    return;
  }

  if (state.isHost) {
    handleServeOrder(matchingOrder.id, item.id, state.player.name);
  } else {
    net.send({
      type: 'SERVE_ORDER',
      orderId: matchingOrder.id,
      itemId: item.id,
      senderName: state.player.name
    });
  }
}

function handleServeOrder(orderId, itemId, serverName) {
  const orderIdx = state.orders.findIndex(o => o.id === orderId);
  const itemIdx = state.sharedItems.findIndex(i => i.id === itemId);

  if (orderIdx !== -1 && itemIdx !== -1) {
    state.orders.splice(orderIdx, 1);
    state.sharedItems.splice(itemIdx, 1);

    audio.playCash();
    audio.playDing();
    state.score += 45;
    state.coins += 20;
    state.servedCount++;

    checkLevelProgression();

    showToast(`قدمت ${serverName} الطلب بنجاح وكسبتن نقاط ونقود! 💖`, '🌟');

    renderOrders();
    renderSharedItems();
    updateStatsDisplay();

    if (state.isHost) broadcastState();
  }
}

function checkLevelProgression() {
  if (state.score >= state.level * state.levelTargetScore && state.level < 5) {
    state.level++;
    audio.playFanfare();
    showToast(`🌟 مبروك! ترقت الكافيه إلى اللفل ${state.level}!`, '🎉');
  }
}

function renderStationView() {
  if (!ingredientsGrid || !currentItemVisual || !stationHint) return;
  ingredientsGrid.innerHTML = '';

  if (state.selectedStation === 'drinks') {
    stationHint.textContent = 'اضغطي على المكونات بالترتيب لتحضير المشروب أو اضغطي على زر التجهيز لوضعه بالطاولة المشتركة 🍹';
    renderDrinkCurrentVisual();
    renderIngredientsForCurrentStation();
  } else if (state.selectedStation === 'bakery') {
    stationHint.textContent = 'جهزي الحلويات والمعجنات بالترتيب واخبزيها بالفرن ثم ضعيها بالطاولة المشتركة 🍪';
    renderBakeryCurrentVisual();
    renderIngredientsForCurrentStation();
  } else if (state.selectedStation === 'serving') {
    stationHint.textContent = 'هنا قائمة الطلبات وطاولة التجهيز المشتركة لتقديمها بسرعة للزبائن 🛎️';
    currentItemVisual.innerHTML = `<div style="font-size:13px; font-weight:800; color:var(--pink-main);">🛎️ محطة التقديم السريع والتعاوني</div><div style="font-size:11px; color:var(--text-muted); margin-top:4px;">اضغطي على أي طبق جاهز بالطاولة المشتركة لتقديمه للزبون المطلوب فوراً!</div>`;
    ingredientsGrid.innerHTML = `<div style="grid-column: span 3; text-align:center; font-size:12px; color:var(--text-muted); padding:20px;">تعاوني مع صديقاتك لتجهيز الطلبات بأسرع وقت لجمع أكبر قدر من النقاط والنقود! 💖</div>`;
  } else if (state.selectedStation === 'shop') {
    stationHint.textContent = 'اشتري آلات وأجهزة جديدة لفتح وصفات ومشروبات ألذ وأغلى 🛍️';
    renderShopView();
  }
}

function renderDrinkCurrentVisual() {
  const ingList = state.currentDrink.ingredients;
  if (ingList.length === 0) {
    currentItemVisual.innerHTML = `<div style="font-size:12px; font-weight:800; color:var(--text-muted);">🍹 المشروب قيد التحضير (ارفعي المكونات)</div><div style="font-size:24px; margin-top:6px;">🥛✨</div>`;
    return;
  }

  let html = `<div style="font-size:12px; font-weight:800; color:var(--pink-main);">🍹 المشروب الحالي:</div><div style="display:flex; gap:6px; margin-top:6px; flex-wrap:wrap; justify-content:center;">`;
  ingList.forEach(ingKey => {
    const ing = INGREDIENT_NAMES[ingKey];
    if (ing) {
      html += `<span style="background:var(--bg-primary); padding:4px 8px; border-radius:8px; font-size:11px; font-weight:800;">${ing.icon} ${ing.name}</span>`;
    }
  });
  html += `</div>`;

  const matchedRecipe = RECIPES.find(r => r.type === 'drink' && arraysMatch(r.required, ingList));
  if (matchedRecipe) {
    html += `<div style="margin-top:8px; font-size:12px; color:#2ed573; font-weight:900;">✨ جاهز للتقديم: ${matchedRecipe.name} (${matchedRecipe.icon})</div>`;
    html += `<button id="finishDrinkBtn" class="btn-primary" style="margin-top:8px; padding:6px 12px; font-size:12px; background:#2ed573;">✨ ضعه في طاولة التجهيز المشتركة</button>`;
  }

  currentItemVisual.innerHTML = html;

  const btn = document.getElementById('finishDrinkBtn');
  if (btn && matchedRecipe) {
    btn.addEventListener('click', () => {
      audio.playPour();
      const sharedItem = {
        id: 'item_' + Math.random().toString(36).substring(2,8),
        recipeId: matchedRecipe.id,
        name: matchedRecipe.name,
        icon: matchedRecipe.icon
      };

      state.sharedItems.push(sharedItem);
      state.currentDrink = { ingredients: [] };

      net.send({ type: 'ADD_SHARED_ITEM', item: sharedItem, senderName: state.player.name });
      showToast(`وضعت ${matchedRecipe.name} على طاولة التجهيز! 🍰`);
      renderSharedItems();
      renderStationView();
    });
  }
}

function renderBakeryCurrentVisual() {
  const ingList = state.currentBakery.ingredients;
  if (ingList.length === 0) {
    currentItemVisual.innerHTML = `<div style="font-size:12px; font-weight:800; color:var(--text-muted);">🍪 المخبوز قيد التحضير</div><div style="font-size:24px; margin-top:6px;">🍩🔥</div>`;
    return;
  }

  let html = `<div style="font-size:12px; font-weight:800; color:var(--pink-main);">🍪 المخبوزات الحالية:</div><div style="display:flex; gap:6px; margin-top:6px; flex-wrap:wrap; justify-content:center;">`;
  ingList.forEach(ingKey => {
    const ing = INGREDIENT_NAMES[ingKey];
    if (ing) {
      html += `<span style="background:var(--bg-primary); padding:4px 8px; border-radius:8px; font-size:11px; font-weight:800;">${ing.icon} ${ing.name}</span>`;
    }
  });
  html += `</div>`;

  const matchedRecipe = RECIPES.find(r => r.type === 'bakery' && arraysMatch(r.required, ingList));
  if (matchedRecipe) {
    html += `<div style="margin-top:8px; font-size:12px; color:#2ed573; font-weight:900;">✨ جاهز للتقديم: ${matchedRecipe.name} (${matchedRecipe.icon})</div>`;
    html += `<button id="finishBakeryBtn" class="btn-primary" style="margin-top:8px; padding:6px 12px; font-size:12px; background:#2ed573;">✨ ضعه في طاولة التجهيز المشتركة</button>`;
  }

  currentItemVisual.innerHTML = html;

  const btn = document.getElementById('finishBakeryBtn');
  if (btn && matchedRecipe) {
    btn.addEventListener('click', () => {
      audio.playPour();
      const sharedItem = {
        id: 'item_' + Math.random().toString(36).substring(2,8),
        recipeId: matchedRecipe.id,
        name: matchedRecipe.name,
        icon: matchedRecipe.icon
      };

      state.sharedItems.push(sharedItem);
      state.currentBakery = { ingredients: [] };

      net.send({ type: 'ADD_SHARED_ITEM', item: sharedItem, senderName: state.player.name });
      showToast(`وضعت ${matchedRecipe.name} على طاولة التجهيز! 🍰`);
      renderSharedItems();
      renderStationView();
    });
  }
}

function renderIngredientsForCurrentStation() {
  if (!ingredientsGrid) return;
  ingredientsGrid.innerHTML = '';

  const targetType = state.selectedStation;
  const validIngredients = Object.keys(INGREDIENT_NAMES).filter(key => {
    if (key === 'baked') return true;
    const ing = INGREDIENT_NAMES[key];
    if (ing.minLevel > state.level) return false;
    if (ing.machine && !state.ownedMachines.includes(ing.machine)) return false;
    return true;
  });

  validIngredients.forEach(key => {
    const ing = INGREDIENT_NAMES[key];
    const card = document.createElement('div');
    card.className = 'ingredient-card';
    card.innerHTML = `
      <span class="ing-icon">${ing.icon}</span>
      <span class="ing-name">${ing.name}</span>
    `;

    card.addEventListener('click', () => {
      audio.playPop();
      if (targetType === 'drinks') {
        if (state.currentDrink.ingredients.length < 5) {
          state.currentDrink.ingredients.push(key);
          renderDrinkCurrentVisual();
        } else {
          showToast('المشروب ممتلئ بالمكونات! قومي بتقديمه أو تصفيته');
        }
      } else if (targetType === 'bakery') {
        if (state.currentBakery.ingredients.length < 5) {
          state.currentBakery.ingredients.push(key);
          renderBakeryCurrentVisual();
        } else {
          showToast('المخبوز ممتلئ بالمكونات!');
        }
      }
    });

    ingredientsGrid.appendChild(card);
  });
}

function renderShopView() {
  if (!currentItemVisual || !ingredientsGrid) return;

  currentItemVisual.innerHTML = `<div style="font-size:13px; font-weight:800; color:var(--pink-main);">🛍️ متجر تطويرات وآلات الكافيه</div><div style="font-size:11px; color:var(--text-muted); margin-top:4px;">استخدمي النقود المكتسبة لفتح آلات جديدة تفتح لك وصفات ومشروبات ممتازة!</div>`;
  ingredientsGrid.innerHTML = '';
  ingredientsGrid.style.display = 'flex';
  ingredientsGrid.style.flexDirection = 'column';
  ingredientsGrid.style.gap = '8px';

  Object.keys(SHOP_MACHINES).forEach(machKey => {
    const mach = SHOP_MACHINES[machKey];
    const isOwned = state.ownedMachines.includes(machKey);

    const div = document.createElement('div');
    div.className = 'shop-card-machine';
    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:26px;">${mach.icon}</span>
        <div>
          <div style="font-size:13px; font-weight:900;">${mach.name}</div>
          <div style="font-size:10px; color:var(--text-muted);">${mach.desc}</div>
        </div>
      </div>
      <div>
        ${isOwned ? '<span style="font-size:11px; font-weight:800; color:#2ed573; background:#e8f8f0; padding:4px 8px; border-radius:8px;">مملوك ✔️</span>' : `<button class="btn-primary" style="padding:6px 12px; font-size:11px; background:#ffa502;">شراء (${mach.price} 🪙)</button>`}
      </div>
    `;

    if (!isOwned) {
      const buyBtn = div.querySelector('button');
      buyBtn.addEventListener('click', () => {
        if (state.coins >= mach.price) {
          state.coins -= mach.price;
          state.ownedMachines.push(machKey);
          audio.playCash();
          showToast(`مبروك! اشتريتِ ${mach.name}! 🎉`);
          updateStatsDisplay();
          renderShopView();
          net.send({ type: 'BUY_MACHINE', machineId: machKey });
        } else {
          showToast('عذراً، لا توجد نقود كافية لشراء هذه الآلة! 🪙');
        }
      });
    }

    ingredientsGrid.appendChild(div);
  });
}

function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const s1 = [...arr1].sort();
  const s2 = [...arr2].sort();
  return s1.every((val, idx) => val === s2[idx]);
}
