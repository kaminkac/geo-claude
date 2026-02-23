/**
 * app.js — logika quizu geograficznego z mapą Leaflet
 */

// ============================================================
// STAN APLIKACJI
// ============================================================
const state = {
  selectedCategories: ['all'],
  items:        [],
  usedIds:      [],
  current:      null,
  sessionCount: 0,
  quizMode:     'question',   // 'question' | 'answer'
};

// ============================================================
// MAPA LEAFLET
// ============================================================
let map = null;
let answerMarker = null;

// Widok domyślny — cała Europa
const EUROPE_CENTER = [54, 16];
const EUROPE_ZOOM   = 4;

function initMap() {
  if (map) return;

  // ── Atrybuty ─────────────────────────────────────────────────
  const attrOSM   = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  const attrCarto = '© <a href="https://carto.com/attributions">CARTO</a>';
  const attrESRI  = 'Tiles © <a href="https://www.esri.com/">Esri</a>';
  const attrTopo  = 'map data: © OpenStreetMap contributors, SRTM | ' +
                    'style: © <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)';

  // ── Warstwy bazowe (bez klucza) ──────────────────────────────
  const layerKonturowa = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    { attribution: `${attrOSM} ${attrCarto}`, subdomains: 'abcd', maxZoom: 20 }
  );
  const layerFizyczna = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
    { attribution: attrESRI, maxZoom: 8 }
  );
  const layerTopo = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    { attribution: attrTopo, subdomains: 'abc', maxZoom: 17 }
  );

  // ── Nakładka etykiet (CartoDB) ───────────────────────────────
  const overlayEtykiety = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
    { attribution: `${attrOSM} ${attrCarto}`, subdomains: 'abcd', maxZoom: 20, pane: 'overlayPane' }
  );

  // ── Warstwy MapTiler z polskimi etykietami ───────────────────
  let defaultLayer = layerKonturowa;
  const baseMaps   = {};

  const hasMaptiler = typeof maptilersdk !== 'undefined' &&
                      typeof L.MaptilerLayer !== 'undefined' &&
                      typeof L.MaptilerLanguage !== 'undefined' &&
                      typeof MAPTILER_KEY === 'string' &&
                      MAPTILER_KEY.trim().length > 0;

  if (hasMaptiler) {
    try {
      maptilersdk.config.apiKey = MAPTILER_KEY;

      // language=pl w URL stylu — pewniejsze niż opcja SDK
      const styleDataviz = `https://api.maptiler.com/maps/dataviz/style.json?key=${MAPTILER_KEY}&language=pl`;
      const styleStreets = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}&language=pl`;

      const mtDataviz = new L.MaptilerLayer({ style: styleDataviz });
      const mtStreets = new L.MaptilerLayer({ style: styleStreets });

      baseMaps['PL: Konturowa'] = mtDataviz;
      baseMaps['PL: Ulice']     = mtStreets;
      defaultLayer = mtDataviz;
    } catch (e) {
      console.warn('MapTiler init failed, using fallback layers.', e);
    }
  }

  // Warstwy bez polskich etykiet zawsze dostępne jako fallback
  baseMaps['Konturowa']     = layerKonturowa;
  baseMaps['Fizyczna']      = layerFizyczna;
  baseMaps['Topograficzna'] = layerTopo;

  // ── Mapa ─────────────────────────────────────────────────────
  map = L.map('quiz-map', {
    center:             EUROPE_CENTER,
    zoom:               EUROPE_ZOOM,
    minZoom:            3,
    maxZoom:            17,
    zoomControl:        true,
    attributionControl: true,
    layers:             [defaultLayer],
  });

  // ── Kontrolka warstw ─────────────────────────────────────────
  L.control.layers(
    baseMaps,
    { 'Nazwy krajów': overlayEtykiety },
    { position: 'topright', collapsed: true }
  ).addTo(map);
}

// ============================================================
// INICJALIZACJA MENU
// ============================================================
function initMenu() {
  const list = document.getElementById('category-list');
  list.innerHTML = '';

  const allBtn = createCatOption('all', 'Wszystkie kategorie', null, true);
  list.appendChild(allBtn);

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

  div.appendChild(document.createTextNode(name));
  div.addEventListener('click', () => toggleCategory(id));
  return div;
}

function toggleCategory(id) {
  if (id === 'all') {
    state.selectedCategories = ['all'];
  } else {
    state.selectedCategories = state.selectedCategories.filter(c => c !== 'all');
    if (state.selectedCategories.includes(id)) {
      state.selectedCategories = state.selectedCategories.filter(c => c !== id);
    } else {
      state.selectedCategories.push(id);
    }
    if (state.selectedCategories.length === 0) {
      state.selectedCategories = ['all'];
    }
  }

  document.querySelectorAll('.cat-option').forEach(btn => {
    const cid = btn.dataset.catId;
    const selected = state.selectedCategories.includes('all')
      ? cid === 'all'
      : state.selectedCategories.includes(cid);
    btn.classList.toggle('selected', selected);
  });
}

function renderMenuStats() {
  const el = document.getElementById('menu-stats');
  if (state.sessionCount === 0) { el.innerHTML = ''; return; }
  el.innerHTML = `<span class="stat-item">Sesja: <strong>${state.sessionCount}</strong> pytań</span>`;
}

// ============================================================
// NAWIGACJA
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // Poinformuj Leaflet o zmianie rozmiaru kontenera
  if (id === 'screen-quiz' && map) {
    setTimeout(() => map.invalidateSize(), 50);
  }
}

function goToMenu() {
  clearMarker();
  renderMenuStats();
  showScreen('screen-menu');
}

// ============================================================
// START QUIZU
// ============================================================
function startQuiz() {
  if (state.selectedCategories.includes('all')) {
    state.items = CATEGORIES.flatMap(cat =>
      cat.items.map(it => ({ ...it, categoryId: cat.id, categoryName: cat.name, color: cat.color, rgb: cat.rgb, zoom: cat.zoom }))
    );
  } else {
    state.items = CATEGORIES
      .filter(cat => state.selectedCategories.includes(cat.id))
      .flatMap(cat =>
        cat.items.map(it => ({ ...it, categoryId: cat.id, categoryName: cat.name, color: cat.color, rgb: cat.rgb, zoom: cat.zoom }))
      );
  }

  if (state.items.length === 0) {
    alert('Brak obiektów w wybranej kategorii.');
    return;
  }

  state.usedIds = [];

  // Inicjalizuj mapę przy pierwszym uruchomieniu
  showScreen('screen-quiz');
  setTimeout(() => {
    initMap();
    nextQuestion();
  }, 50);
}

// ============================================================
// LOSOWANIE PYTANIA
// ============================================================
function pickRandom() {
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

  // Uzupełnij panel pytania
  document.getElementById('question-name').textContent    = state.current.name;
  document.getElementById('q-category-badge').textContent = state.current.categoryName;
  document.getElementById('q-progress').textContent       = progress;

  // Uzupełnij też panel odpowiedzi (na zapas)
  document.getElementById('answer-name').textContent      = state.current.name;
  document.getElementById('answer-country').textContent   = state.current.country ? `(${state.current.country})` : '';
  document.getElementById('a-category-badge').textContent = state.current.categoryName;
  document.getElementById('a-progress').textContent       = progress;

  setQuizMode('question');
}

// ============================================================
// POKAŻ ODPOWIEDŹ
// ============================================================
function showAnswer() {
  setQuizMode('answer');
  placeMarker(state.current);
}

// ============================================================
// TRYB PANELU: question / answer
// ============================================================
function setQuizMode(mode) {
  state.quizMode = mode;

  const panel   = document.getElementById('quiz-panel');
  const pQ      = document.getElementById('panel-question');
  const pA      = document.getElementById('panel-answer');

  if (mode === 'question') {
    panel.classList.remove('quiz-panel-answer');
    pQ.classList.remove('hidden');
    pA.classList.add('hidden');
    clearMarker();
    if (map) map.flyTo(EUROPE_CENTER, EUROPE_ZOOM, { duration: 0.6 });
  } else {
    panel.classList.add('quiz-panel-answer');
    pQ.classList.add('hidden');
    pA.classList.remove('hidden');
  }
}

// ============================================================
// MARKER NA MAPIE LEAFLET
// ============================================================
function placeMarker(item) {
  clearMarker();

  const color = item.color || '#1e40af';
  const zoom  = item.zoom  || 5;

  // Niestandardowa ikona — kolorowa kropka
  const icon = L.divIcon({
    html: `<div style="
      width: 18px; height: 18px; border-radius: 50%;
      background: ${color};
      border: 3px solid #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.45);
    "></div>`,
    className: '',
    iconSize:   [18, 18],
    iconAnchor: [9, 9],
    tooltipAnchor: [9, -9],
  });

  answerMarker = L.marker([item.lat, item.lon], { icon })
    .addTo(map)
    .bindTooltip(item.name, {
      permanent:  true,
      direction:  'top',
      offset:     [0, -4],
      className:  'map-tooltip',
    })
    .openTooltip();

  map.flyTo([item.lat, item.lon], zoom, { duration: 0.8 });
}

function clearMarker() {
  if (answerMarker) {
    map.removeLayer(answerMarker);
    answerMarker = null;
  }
}

// ============================================================
// START
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  document.querySelector('.cat-option[data-cat-id="all"]').classList.add('selected');
});
