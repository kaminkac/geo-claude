/**
 * data.js — pełna baza danych geograficznych Europy
 *
 * Układ współrzędnych mapy (zakładany zasięg Europe_blank_map.png):
 *   Zachód:  -25°W  |  Wschód:  55°E  |  Szerokość: 80°
 *   Północ:   75°N  |  Południe: 33°N  |  Wysokość:  42°
 *
 * Przeliczenie stopni na procenty:
 *   x = (lon + 25) / 80 * 100
 *   y = (75 - lat) / 42 * 100
 *
 * Jeśli Twoja mapa ma inny zasięg, wystarczy skorygować wartości x/y
 * w poniższych tablicach lub zmienić funkcję kalkulującą pozycję.
 */

const CATEGORIES = [
  {
    id: 'seas',
    name: 'Morza i oceany',
    color: '#1565c0',
    rgb: '21,101,192',
    items: [
      { id: 'atlantic',      name: 'Ocean Atlantycki',       x: 10.0, y: 38.1 },
      { id: 'arctic',        name: 'Ocean Arktyczny',        x: 50.0, y:  0.0 },
      { id: 'north_sea',     name: 'Morze Północne',         x: 36.3, y: 45.2 },
      { id: 'baltic',        name: 'Morze Bałtyckie',        x: 53.8, y: 47.6 },
      { id: 'norwegian',     name: 'Morze Norweskie',        x: 37.5, y: 16.7 },
      { id: 'barents',       name: 'Morze Barentsa',         x: 73.8, y:  5.0 },
      { id: 'white',         name: 'Morze Białe',            x: 75.0, y: 19.0 },
      { id: 'mediterranean', name: 'Morze Śródziemne',       x: 48.8, y: 88.1 },
      { id: 'black',         name: 'Morze Czarne',           x: 72.5, y: 76.2 },
      { id: 'caspian',       name: 'Morze Kaspijskie',       x: 93.8, y: 78.6 },
      { id: 'adriatic',      name: 'Morze Adriatyckie',      x: 56.3, y: 73.8 },
      { id: 'aegean',        name: 'Morze Egejskie',         x: 66.3, y: 83.3 },
      { id: 'tyrrhenian',    name: 'Morze Tyrreńskie',       x: 50.0, y: 78.6 },
      { id: 'ionian',        name: 'Morze Jońskie',          x: 58.8, y: 83.3 },
      { id: 'ligurian',      name: 'Morze Liguryjskie',      x: 45.0, y: 73.8 },
      { id: 'irish',         name: 'Morze Irlandzkie',       x: 23.8, y: 52.4 },
    ],
  },

  {
    id: 'bays',
    name: 'Zatoki',
    color: '#0277bd',
    rgb: '2,119,189',
    items: [
      { id: 'biscay',       name: 'Zatoka Biskajska',    x: 22.5, y: 66.7 },
      { id: 'bothnia',      name: 'Zatoka Botnicka',     x: 56.3, y: 28.6 },
      { id: 'finland',      name: 'Zatoka Fińska',       x: 63.8, y: 38.1 },
      { id: 'riga',         name: 'Zatoka Ryska',        x: 61.3, y: 42.9 },
      { id: 'lions',        name: 'Zatoka Lwia',         x: 41.3, y: 78.6 },
      { id: 'naples',       name: 'Zatoka Neapolitańska', x: 55.0, y: 80.9 },
    ],
  },

  {
    id: 'straits',
    name: 'Cieśniny',
    color: '#006064',
    rgb: '0,96,100',
    items: [
      { id: 'gibraltar',    name: 'Cieśnina Gibraltarska',  x: 21.3, y: 90.5 },
      { id: 'danish',       name: 'Cieśnina Duńska',        x:  5.0, y: 26.2 },
      { id: 'dover',        name: 'Cieśnina Kaletańska',    x: 28.8, y: 54.8 },
      { id: 'oresund',      name: 'Sund (Öresund)',          x: 45.0, y: 45.2 },
      { id: 'bosphorus',    name: 'Bosfor',                  x: 67.5, y: 71.4 },
      { id: 'dardanelles',  name: 'Dardanele',               x: 65.0, y: 73.8 },
      { id: 'messina',      name: 'Cieśnina Mesyńska',      x: 55.0, y: 83.3 },
    ],
  },

  {
    id: 'channels',
    name: 'Kanały',
    color: '#00695c',
    rgb: '0,105,92',
    items: [
      { id: 'kiel',         name: 'Kanał Kiloński',    x: 43.8, y: 47.6 },
      { id: 'suez',         name: 'Kanał Sueski',      x: 72.5, y: 95.2 },
      { id: 'corinth',      name: 'Kanał Koryncki',    x: 63.8, y: 83.3 },
    ],
  },

  {
    id: 'islands',
    name: 'Wyspy',
    color: '#e65100',
    rgb: '230,81,0',
    items: [
      { id: 'iceland',      name: 'Islandia',             x:  6.3, y: 26.2 },
      { id: 'gb',           name: 'Wielka Brytania',      x: 26.3, y: 50.0 },
      { id: 'ireland',      name: 'Irlandia',             x: 18.8, y: 52.4 },
      { id: 'sicily',       name: 'Sycylia',              x: 52.5, y: 85.7 },
      { id: 'sardinia',     name: 'Sardynia',             x: 47.5, y: 80.9 },
      { id: 'corsica',      name: 'Korsyka',              x: 46.3, y: 76.2 },
      { id: 'crete',        name: 'Kreta',                x: 67.5, y: 88.1 },
      { id: 'malta',        name: 'Malta',                x: 52.5, y: 90.5 },
      { id: 'cyprus',       name: 'Cypr',                 x: 76.3, y: 90.5 },
      { id: 'gotland',      name: 'Gotlandia',            x: 57.5, y: 42.9 },
      { id: 'bornholm',     name: 'Bornholm',             x: 51.3, y: 45.2 },
    ],
  },

  {
    id: 'peninsulas',
    name: 'Półwyspy',
    color: '#2e7d32',
    rgb: '46,125,50',
    items: [
      { id: 'scandinavian', name: 'Półwysep Skandynawski', x: 48.8, y: 26.2 },
      { id: 'iberian',      name: 'Półwysep Iberyjski',    x: 22.5, y: 78.6 },
      { id: 'apennine',     name: 'Półwysep Apeniński',    x: 52.5, y: 76.2 },
      { id: 'balkan',       name: 'Półwysep Bałkański',    x: 61.3, y: 76.2 },
      { id: 'jutland',      name: 'Półwysep Jutlandzki',   x: 42.5, y: 45.2 },
      { id: 'kola',         name: 'Półwysep Kolski',       x: 72.5, y: 21.4 },
      { id: 'crimea',       name: 'Półwysep Krymski',      x: 73.8, y: 66.7 },
      { id: 'breton',       name: 'Półwysep Bretoński',    x: 26.3, y: 61.9 },
    ],
  },

  {
    id: 'mountains',
    name: 'Góry',
    color: '#4e342e',
    rgb: '78,52,46',
    items: [
      { id: 'alps',         name: 'Alpy',                    x: 43.8, y: 64.3 },
      { id: 'pyrenees',     name: 'Pireneje',                x: 27.5, y: 71.4 },
      { id: 'carpathians',  name: 'Karpaty',                 x: 60.0, y: 59.5 },
      { id: 'scandinavian_mts', name: 'Góry Skandynawskie', x: 45.0, y: 26.2 },
      { id: 'ural',         name: 'Ural',                    x: 97.5, y: 40.5 },
      { id: 'apennines',    name: 'Apeniny',                 x: 53.8, y: 76.2 },
      { id: 'balkans_mts',  name: 'Bałkany (Stara Płanina)', x: 67.5, y: 71.4 },
      { id: 'dinaric',      name: 'Dinary',                  x: 57.5, y: 69.0 },
      { id: 'caucasus',     name: 'Kaukaz',                  x: 83.8, y: 71.4 },
      { id: 'tatras',       name: 'Tatry',                   x: 58.8, y: 57.1 },
      { id: 'sudetes',      name: 'Sudety',                  x: 55.0, y: 54.8 },
      { id: 'massif',       name: 'Masyw Centralny',         x: 33.8, y: 64.3 },
      { id: 'rhodopes',     name: 'Rodopy',                  x: 66.3, y: 73.8 },
    ],
  },

  {
    id: 'uplands',
    name: 'Wyżyny',
    color: '#bf360c',
    rgb: '191,54,12',
    items: [
      { id: 'bohemian',     name: 'Wyżyna Czeska',              x: 53.8, y: 57.1 },
      { id: 'meseta',       name: 'Meseta Iberyjska',           x: 22.5, y: 76.2 },
      { id: 'malopolska',   name: 'Wyżyna Małopolska',          x: 60.0, y: 54.8 },
      { id: 'east_europ',   name: 'Wyżyna Wschodnioeuropejska', x: 76.3, y: 47.6 },
      { id: 'volhynia',     name: 'Wyżyna Wołyńska',           x: 63.8, y: 54.8 },
      { id: 'ardennes',     name: 'Ardeny',                    x: 37.5, y: 59.5 },
    ],
  },

  {
    id: 'lowlands',
    name: 'Niziny',
    color: '#388e3c',
    rgb: '56,142,60',
    items: [
      { id: 'centraleurope', name: 'Nizina Środkowoeuropejska', x: 52.5, y: 52.4 },
      { id: 'popadana',      name: 'Nizina Padańska',           x: 47.5, y: 64.3 },
      { id: 'pannonian',     name: 'Nizina Pannońska (Węgierska)', x: 57.5, y: 61.9 },
      { id: 'easteurop_pl',  name: 'Nizina Wschodnioeuropejska', x: 76.3, y: 50.0 },
    ],
  },

  {
    id: 'rivers',
    name: 'Rzeki',
    color: '#0288d1',
    rgb: '2,136,209',
    items: [
      { id: 'danube',       name: 'Dunaj',    x: 57.5, y: 64.3 },
      { id: 'rhine',        name: 'Ren',      x: 40.0, y: 57.1 },
      { id: 'elbe',         name: 'Łaba',     x: 46.3, y: 52.4 },
      { id: 'vistula',      name: 'Wisła',    x: 57.5, y: 50.0 },
      { id: 'volga',        name: 'Wołga',    x: 83.8, y: 47.6 },
      { id: 'dnieper',      name: 'Dniepr',   x: 72.5, y: 57.1 },
      { id: 'don',          name: 'Don',      x: 82.5, y: 61.9 },
      { id: 'oder',         name: 'Odra',     x: 51.3, y: 52.4 },
      { id: 'seine',        name: 'Sekwana',  x: 32.5, y: 57.1 },
      { id: 'thames',       name: 'Tamiza',   x: 28.8, y: 52.4 },
      { id: 'loire',        name: 'Loara',    x: 28.8, y: 61.9 },
      { id: 'po',           name: 'Pad',      x: 46.3, y: 64.3 },
      { id: 'rhone',        name: 'Rodan',    x: 37.5, y: 61.9 },
      { id: 'garonne',      name: 'Garonna',  x: 28.8, y: 66.7 },
      { id: 'ebro',         name: 'Ebro',     x: 28.8, y: 71.4 },
      { id: 'douro',        name: 'Duero',    x: 21.3, y: 73.8 },
      { id: 'tagus',        name: 'Tag',      x: 18.8, y: 76.2 },
      { id: 'dniester',     name: 'Dniestr',  x: 66.3, y: 65.5 },
    ],
  },

  {
    id: 'lakes',
    name: 'Jeziora',
    color: '#00838f',
    rgb: '0,131,143',
    items: [
      { id: 'ladoga',       name: 'Jezioro Ładoga',      x: 72.5, y: 33.3 },
      { id: 'onega',        name: 'Jezioro Onega',       x: 76.3, y: 30.9 },
      { id: 'vanern',       name: 'Jezioro Vänern',      x: 46.3, y: 38.1 },
      { id: 'geneva',       name: 'Jezioro Genewskie',   x: 38.8, y: 61.9 },
      { id: 'balaton',      name: 'Jezioro Bałaton',     x: 57.5, y: 61.9 },
      { id: 'constance',    name: 'Jezioro Bodeńskie',   x: 43.8, y: 59.5 },
      { id: 'skadar',       name: 'Jezioro Szkoderskie', x: 58.8, y: 73.8 },
      { id: 'peipus',       name: 'Jezioro Pejpus',      x: 67.5, y: 35.7 },
    ],
  },
];

// Płaski słownik: id → item (z dodanym polem category id i color)
const ITEMS_BY_ID = {};
CATEGORIES.forEach(cat => {
  cat.items.forEach(item => {
    ITEMS_BY_ID[item.id] = { ...item, categoryId: cat.id, categoryName: cat.name, color: cat.color, rgb: cat.rgb };
  });
});
