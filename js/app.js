/**
 * app.js — pełna logika quizu geograficznego
 */

// ============================================================
// STAN APLIKACJI
// ============================================================
const state = {
  selectedCategories: ['all'],  // 'all' lub lista id kategorii
  items: [],        // pula pytań bieżącej sesji
  usedIds: [],      // już pokazane w tej rundzie
  current: null,    // aktualny obiekt
  sessionCount: 0,  // ile pytań pokazano w tej sesji
};

// ============================================================
// INICJALIZACJA MENU
// ============================================================
function initMenu() {
  const list = document.getElementById('category-list');
  list.innerHTML = '';

  // Opcja "Wszystkie"
  const allBtn = createCatOption('all', 'Wszystkie kategorie', null, true);
  list.appendChild(allBtn);

  // Opcja dla każdej kategorii
  CATEGORIES.forEach(cat => {
    const btn = createCatOption(cat.id, cat.name, cat.color, false);
    list.appendChild(btn);
  });

  renderMenuStats();
}

function createCatOption(id, name, color, isAll) {
  const div = document.createElement('div');
  div.className = 'cat-option' + (isAll ? ' cat-all' : '');
  div.dataset.catId = id;
  if (color) div.style.setProperty('--cat-color', color);

  if (!isAll) {
    const dot = document.createElement('span');
    dot.className = 'cat-dot';
    div.appendChild(dot);
  }

  const label = document.createTextNode(name);
  div.appendChild(label);

  div.addEventListener('click', () => toggleCategory(id));
  return div;
}

function toggleCategory(id) {
  if (id === 'all') {
    state.selectedCategories = ['all'];
  } else {
    // Odznacz 'all', gdy wybrano konkretną kategorię
    state.selectedCategories = state.selectedCategories.filter(c => c !== 'all');

    if (state.selectedCategories.includes(id)) {
      state.selectedCategories = state.selectedCategories.filter(c => c !== id);
    } else {
      state.selectedCategories.push(id);
    }

    // Jeśli nic nie zaznaczone → wróć do 'all'
    if (state.selectedCategories.length === 0) {
      state.selectedCategories = ['all'];
    }
  }

  // Zaktualizuj wygląd przycisków
  document.querySelectorAll('.cat-option').forEach(btn => {
    const cid = btn.dataset.catId;
    const isSelected =
      state.selectedCategories.includes('all')
        ? cid === 'all'
        : state.selectedCategories.includes(cid);
    btn.classList.toggle('selected', isSelected);
  });
}

function renderMenuStats() {
  const el = document.getElementById('menu-stats');
  if (state.sessionCount === 0) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <span class="stat-item">Sesja: <strong>${state.sessionCount}</strong> pytań</span>
  `;
}

// ============================================================
// NAWIGACJA
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToMenu() {
  renderMenuStats();
  showScreen('screen-menu');
}

// ============================================================
// START QUIZU
// ============================================================
function startQuiz() {
  // Zbuduj pulę pytań
  if (state.selectedCategories.includes('all')) {
    state.items = CATEGORIES.flatMap(cat =>
      cat.items.map(it => ({ ...it, categoryId: cat.id, categoryName: cat.name, color: cat.color, rgb: cat.rgb }))
    );
  } else {
    state.items = CATEGORIES
      .filter(cat => state.selectedCategories.includes(cat.id))
      .flatMap(cat =>
        cat.items.map(it => ({ ...it, categoryId: cat.id, categoryName: cat.name, color: cat.color, rgb: cat.rgb }))
      );
  }

  if (state.items.length === 0) {
    alert('Brak obiektów w wybranej kategorii.');
    return;
  }

  state.usedIds = [];
  nextQuestion();
}

// ============================================================
// LOSOWANIE PYTANIA
// ============================================================
function pickRandom() {
  // Reset puli gdy wszystkie pokazano
  if (state.usedIds.length >= state.items.length) {
    state.usedIds = [];
  }
  const pool = state.items.filter(it => !state.usedIds.includes(it.id));
  return pool[Math.floor(Math.random() * pool.length)];
}

function nextQuestion() {
  state.current = pickRandom();
  state.usedIds.push(state.current.id);
  state.sessionCount++;

  const progress = `${state.usedIds.length} / ${state.items.length}`;

  document.getElementById('question-name').textContent     = state.current.name;
  document.getElementById('q-category-badge').textContent  = state.current.categoryName;
  document.getElementById('q-progress').textContent        = progress;

  document.getElementById('answer-name').textContent       = state.current.name;
  document.getElementById('a-category-badge').textContent  = state.current.categoryName;
  document.getElementById('a-progress').textContent        = progress;

  // Ukryj marker (na wypadek gdyby był widoczny z poprzedniej odpowiedzi)
  hideMarker();

  showScreen('screen-question');
}

// ============================================================
// POKAŻ ODPOWIEDŹ
// ============================================================
function showAnswer() {
  placeMarker(state.current);
  showScreen('screen-answer');
}

// ============================================================
// MARKER NA MAPIE
// ============================================================
function placeMarker(item) {
  const marker  = document.getElementById('map-marker');
  const dot     = document.getElementById('marker-dot');
  const pulse   = document.getElementById('marker-pulse');
  const label   = document.getElementById('marker-label');
  const img     = document.getElementById('map-img-answer');
  const wrapper = document.getElementById('map-wrapper-answer');

  // Ustaw kolor markera z danych kategorii
  const color = item.color || '#1e40af';
  const rgb   = item.rgb   || '30,64,175';
  marker.style.setProperty('--marker-color', color);
  marker.style.setProperty('--marker-rgb',   rgb);

  label.textContent = item.name;

  // Oblicz pozycję na podstawie rendered rozmiaru obrazu
  // Używamy naturalnego rozmiaru obrazu i rozmiaru kontenera
  const imgRect     = img.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  const naturalW = img.naturalWidth  || imgRect.width;
  const naturalH = img.naturalHeight || imgRect.height;
  const aspect   = naturalW / naturalH;

  // Faktycznie renderowany obszar obrazu (object-fit: contain)
  let rendW, rendH, rendLeft, rendTop;
  if (imgRect.width / imgRect.height > aspect) {
    // słupki pionowe (pillarbox)
    rendH    = imgRect.height;
    rendW    = rendH * aspect;
    rendLeft = (imgRect.width - rendW) / 2;
    rendTop  = 0;
  } else {
    // słupki poziome (letterbox)
    rendW    = imgRect.width;
    rendH    = rendW / aspect;
    rendLeft = 0;
    rendTop  = (imgRect.height - rendH) / 2;
  }

  // Pozycja markera w pikselach względem wrappera
  const markerX = rendLeft + (item.x / 100) * rendW;
  const markerY = rendTop  + (item.y / 100) * rendH;

  // Korekta na offset wrappera vs obrazu
  const offsetX = imgRect.left - wrapperRect.left;
  const offsetY = imgRect.top  - wrapperRect.top;

  marker.style.left = (offsetX + markerX) + 'px';
  marker.style.top  = (offsetY + markerY) + 'px';

  // Restart animacji pulsu
  pulse.style.animation = 'none';
  void pulse.offsetWidth;
  pulse.style.animation = '';

  marker.classList.remove('hidden');
}

function hideMarker() {
  document.getElementById('map-marker').classList.add('hidden');
}

// ============================================================
// START
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  // Domyślnie zaznacz "Wszystkie"
  document.querySelector('.cat-option[data-cat-id="all"]').classList.add('selected');
});
