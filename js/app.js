/**
 * app.js — Nawigacja i stan gry
 * Etap 1: szkielet bez logiki quizu i mapy
 */

// ============================================================
// STAN GLOBALNY
// ============================================================
const state = {
  category:   'all',   // wybrana kategoria
  difficulty: 'easy',  // 'easy' | 'hard'
  mode:       'endless', // 'endless' | 'ten'
  score:      0,
  questionNo: 0,       // numer bieżącego pytania (tryb "do 10")
};

// ============================================================
// NAWIGACJA — przełączanie ekranów
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ============================================================
// MENU — obsługa wyboru
// ============================================================
function selectDifficulty(btn) {
  document.querySelectorAll('#difficulty-group .btn-toggle').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.difficulty = btn.dataset.value;

  const hint = document.getElementById('difficulty-hint');
  if (state.difficulty === 'easy') {
    hint.textContent = 'Elementy kategorii są zaznaczone na mapie — kliknij właściwy.';
  } else {
    hint.textContent = 'Mapa jest pusta — kliknij we właściwe miejsce z pamięci.';
  }
}

function selectMode(btn) {
  document.querySelectorAll('#mode-group .btn-toggle').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.mode = btn.dataset.value;
}

// ============================================================
// START GRY
// ============================================================
function startGame() {
  state.category   = document.getElementById('category-select').value;
  state.score      = 0;
  state.questionNo = 0;

  updateScoreDisplay();
  setFeedback('', '');
  document.getElementById('question-text').textContent = 'Ładowanie pytania…';

  showScreen('screen-game');

  // TODO (Etap 4): zainicjuj quiz i wylosuj pierwsze pytanie
  // quiz.start(state);
}

// ============================================================
// GRA — powrót do menu
// ============================================================
function goToMenu() {
  showScreen('screen-menu');
}

// ============================================================
// WYNIKI — zagraj ponownie (te same ustawienia)
// ============================================================
function playAgain() {
  startGame();
}

// ============================================================
// HELPERS — wyświetlanie
// ============================================================
function updateScoreDisplay() {
  document.getElementById('score-value').textContent = state.score;

  const progress = document.getElementById('score-progress');
  if (state.mode === 'ten') {
    progress.textContent = `${state.questionNo} / 10`;
  } else {
    progress.textContent = '';
  }
}

function setFeedback(text, type) {
  const bar = document.getElementById('feedback-bar');
  bar.textContent = text;
  bar.className = 'feedback-bar' + (type ? ` ${type}` : '');
  document.getElementById('feedback-text').textContent = '';
}

function showResults() {
  const score = state.score;
  document.getElementById('results-score').textContent = score;

  let msg = '';
  if (score === 10)      msg = '🏆 Idealny wynik! Jesteś mistrzem geografii!';
  else if (score >= 8)   msg = '🎉 Świetny wynik! Prawie perfekcja!';
  else if (score >= 6)   msg = '👍 Dobra robota! Jeszcze trochę ćwiczeń i będzie idealnie.';
  else if (score >= 4)   msg = '😊 Niezły początek! Spróbuj jeszcze raz.';
  else                   msg = '💪 Ćwicz dalej — dasz radę!';

  document.getElementById('results-message').textContent = msg;
  showScreen('screen-results');
}
