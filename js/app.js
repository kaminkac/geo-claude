/**
 * app.js — logika nawigacji i quizu
 * Etap 1: działająca nawigacja, placeholder danych
 */

// ============================================================
// STAN
// ============================================================
const state = {
  category: 'all',
  items: [],       // lista obiektów z wybranej kategorii
  current: null,   // aktualnie wylosowany obiekt
  usedIds: [],     // żeby nie powtarzać pytań z rzędu
};

// ============================================================
// DANE — placeholder, zastąpione w Etapie 4
// ============================================================
const CATEGORY_NAMES = {
  all:        'Wszystkie',
  oceans:     'Oceany',
  seas:       'Morza',
  bays:       'Zatoki',
  straits:    'Cieśniny',
  channels:   'Kanały',
  islands:    'Wyspy',
  peninsulas: 'Półwyspy',
  mountains:  'Góry',
  uplands:    'Wyżyny',
  lowlands:   'Niziny',
  rivers:     'Rzeki',
  lakes:      'Jeziora',
};

// Przykładowe dane — zostaną zastąpione pełnym data.js w Etapie 4
const SAMPLE_DATA = [
  { id: 'baltic',      name: 'Morze Bałtyckie',   category: 'seas' },
  { id: 'north_sea',   name: 'Morze Północne',     category: 'seas' },
  { id: 'alps',        name: 'Alpy',               category: 'mountains' },
  { id: 'danube',      name: 'Dunaj',              category: 'rivers' },
  { id: 'rhine',       name: 'Ren',                category: 'rivers' },
  { id: 'sicily',      name: 'Sycylia',            category: 'islands' },
  { id: 'iberia',      name: 'Półwysep Iberyjski', category: 'peninsulas' },
  { id: 'biscay',      name: 'Zatoka Biskajska',   category: 'bays' },
];

// ============================================================
// NAWIGACJA
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToMenu() {
  showScreen('screen-menu');
}

// ============================================================
// START QUIZU
// ============================================================
function startQuiz() {
  const cat = document.getElementById('category-select').value;
  state.category = cat;
  state.usedIds  = [];

  state.items = cat === 'all'
    ? SAMPLE_DATA
    : SAMPLE_DATA.filter(d => d.category === cat);

  if (state.items.length === 0) {
    alert('Brak danych dla tej kategorii — wróć do menu.');
    return;
  }

  nextQuestion();
}

// ============================================================
// LOSOWANIE PYTANIA
// ============================================================
function pickRandom() {
  // Jeśli wszystkie zostały pokazane, reset puli
  if (state.usedIds.length >= state.items.length) {
    state.usedIds = [];
  }

  const pool = state.items.filter(it => !state.usedIds.includes(it.id));
  return pool[Math.floor(Math.random() * pool.length)];
}

function nextQuestion() {
  state.current = pickRandom();
  state.usedIds.push(state.current.id);

  const catName = CATEGORY_NAMES[state.category] || '';

  // Ustaw treść ekranu pytania
  document.getElementById('question-name').textContent   = state.current.name;
  document.getElementById('category-badge').textContent  = catName;

  // Ustaw treść ekranu odpowiedzi (z wyprzedzeniem)
  document.getElementById('answer-name').textContent          = state.current.name;
  document.getElementById('answer-category-badge').textContent = catName;

  // TODO (Etap 3): załaduj pustą mapę do #map-question

  showScreen('screen-question');
}

// ============================================================
// POKAŻ ODPOWIEDŹ
// ============================================================
function showAnswer() {
  // TODO (Etap 3): załaduj mapę z zaznaczonym obiektem do #map-answer
  showScreen('screen-answer');
}
