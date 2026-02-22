/**
 * data.js — baza danych geograficznych Europy
 *
 * Współrzędne: lon (długość geograficzna °E, ujemna = °W)
 *              lat (szerokość geograficzna °N)
 * Źródło: rzeczywiste dane geograficzne (Wikipedia / GeoNames)
 *
 * zoom — przybliżenie mapy przy odpowiedzi:
 *   3 = cała Europa, 4-5 = region, 6-7 = kraj/rzeka
 */

const CATEGORIES = [
  {
    id: 'seas',
    name: 'Morza i oceany',
    color: '#1565c0',
    rgb: '21,101,192',
    zoom: 4,
    items: [
      { id: 'atlantic',      name: 'Ocean Atlantycki',       lon: -22.0, lat: 52.0 },
      { id: 'arctic',        name: 'Ocean Arktyczny',        lon:  20.0, lat: 83.0 },
      { id: 'north_sea',     name: 'Morze Północne',         lon:   3.0, lat: 56.5 },
      { id: 'baltic',        name: 'Morze Bałtyckie',        lon:  18.5, lat: 57.5 },
      { id: 'norwegian',     name: 'Morze Norweskie',        lon:   5.0, lat: 69.0 },
      { id: 'barents',       name: 'Morze Barentsa',         lon:  40.0, lat: 74.0 },
      { id: 'white',         name: 'Morze Białe',            lon:  34.0, lat: 65.5 },
      { id: 'mediterranean', name: 'Morze Śródziemne',       lon:  14.0, lat: 37.5 },
      { id: 'black',         name: 'Morze Czarne',           lon:  32.5, lat: 43.0 },
      { id: 'caspian',       name: 'Morze Kaspijskie',       lon:  50.5, lat: 42.0 },
      { id: 'adriatic',      name: 'Morze Adriatyckie',      lon:  16.5, lat: 43.0 },
      { id: 'aegean',        name: 'Morze Egejskie',         lon:  25.0, lat: 39.0 },
      { id: 'tyrrhenian',    name: 'Morze Tyrreńskie',       lon:  12.0, lat: 40.5 },
      { id: 'ionian',        name: 'Morze Jońskie',          lon:  19.5, lat: 37.5 },
      { id: 'ligurian',      name: 'Morze Liguryjskie',      lon:   9.0, lat: 43.5 },
      { id: 'irish',         name: 'Morze Irlandzkie',       lon:  -5.5, lat: 53.5 },
    ],
  },

  {
    id: 'bays',
    name: 'Zatoki',
    color: '#0277bd',
    rgb: '2,119,189',
    zoom: 5,
    items: [
      { id: 'biscay',   name: 'Zatoka Biskajska',      lon: -4.0, lat: 46.0 },
      { id: 'bothnia',  name: 'Zatoka Botnicka',       lon: 21.0, lat: 63.5 },
      { id: 'finland',  name: 'Zatoka Fińska',         lon: 26.0, lat: 59.5 },
      { id: 'riga',     name: 'Zatoka Ryska',          lon: 23.5, lat: 57.5 },
      { id: 'lions',    name: 'Zatoka Lwia',           lon:  4.0, lat: 43.0 },
      { id: 'naples',   name: 'Zatoka Neapolitańska',  lon: 14.2, lat: 40.6 },
    ],
  },

  {
    id: 'straits',
    name: 'Cieśniny',
    color: '#006064',
    rgb: '0,96,100',
    zoom: 6,
    items: [
      { id: 'gibraltar',   name: 'Cieśnina Gibraltarska', lon: -5.5,  lat: 36.0  },
      { id: 'danish',      name: 'Cieśnina Duńska',       lon: -25.0, lat: 66.5  },
      { id: 'dover',       name: 'Cieśnina Kaletańska',   lon:  1.5,  lat: 51.0  },
      { id: 'oresund',     name: 'Sund (Öresund)',         lon: 12.7,  lat: 55.8  },
      { id: 'bosphorus',   name: 'Bosfor',                 lon: 29.0,  lat: 41.1  },
      { id: 'dardanelles', name: 'Dardanele',              lon: 26.5,  lat: 40.2  },
      { id: 'messina',     name: 'Cieśnina Mesyńska',     lon: 15.6,  lat: 38.2  },
    ],
  },

  {
    id: 'channels',
    name: 'Kanały',
    color: '#00695c',
    rgb: '0,105,92',
    zoom: 6,
    items: [
      { id: 'kiel',    name: 'Kanał Kiloński', lon:  9.7, lat: 54.3 },
      { id: 'suez',    name: 'Kanał Sueski',   lon: 32.5, lat: 30.5 },
      { id: 'corinth', name: 'Kanał Koryncki', lon: 23.0, lat: 37.9 },
    ],
  },

  {
    id: 'islands',
    name: 'Wyspy',
    color: '#e65100',
    rgb: '230,81,0',
    zoom: 5,
    items: [
      { id: 'iceland',  name: 'Islandia',       lon: -18.5, lat: 64.8 },
      { id: 'gb',       name: 'Wielka Brytania', lon:  -2.0, lat: 54.0 },
      { id: 'ireland',  name: 'Irlandia',        lon:  -8.0, lat: 53.0 },
      { id: 'sicily',   name: 'Sycylia',         lon:  14.3, lat: 37.5 },
      { id: 'sardinia', name: 'Sardynia',        lon:   9.1, lat: 40.1 },
      { id: 'corsica',  name: 'Korsyka',         lon:   9.0, lat: 42.2 },
      { id: 'crete',    name: 'Kreta',           lon:  25.0, lat: 35.2 },
      { id: 'malta',    name: 'Malta',           lon:  14.4, lat: 35.9 },
      { id: 'cyprus',   name: 'Cypr',            lon:  33.0, lat: 35.1 },
      { id: 'gotland',  name: 'Gotlandia',       lon:  18.5, lat: 57.5 },
      { id: 'bornholm', name: 'Bornholm',        lon:  15.0, lat: 55.1 },
    ],
  },

  {
    id: 'peninsulas',
    name: 'Półwyspy',
    color: '#2e7d32',
    rgb: '46,125,50',
    zoom: 4,
    items: [
      { id: 'scandinavian', name: 'Półwysep Skandynawski', lon: 16.0,  lat: 65.0 },
      { id: 'iberian',      name: 'Półwysep Iberyjski',    lon: -5.0,  lat: 40.0 },
      { id: 'apennine',     name: 'Półwysep Apeniński',    lon: 13.5,  lat: 42.0 },
      { id: 'balkan',       name: 'Półwysep Bałkański',    lon: 21.0,  lat: 42.0 },
      { id: 'jutland',      name: 'Półwysep Jutlandzki',   lon:  9.5,  lat: 55.5 },
      { id: 'kola',         name: 'Półwysep Kolski',       lon: 33.0,  lat: 68.0 },
      { id: 'crimea',       name: 'Półwysep Krymski',      lon: 34.0,  lat: 45.2 },
      { id: 'breton',       name: 'Półwysep Bretoński',    lon: -3.5,  lat: 48.2 },
    ],
  },

  {
    id: 'mountains',
    name: 'Góry',
    color: '#4e342e',
    rgb: '78,52,46',
    zoom: 5,
    items: [
      { id: 'alps',             name: 'Alpy',                    lon: 10.0, lat: 46.5 },
      { id: 'pyrenees',         name: 'Pireneje',                lon:  0.5, lat: 42.7 },
      { id: 'carpathians',      name: 'Karpaty',                 lon: 22.0, lat: 48.0 },
      { id: 'scandinavian_mts', name: 'Góry Skandynawskie',     lon: 16.0, lat: 65.0 },
      { id: 'ural',             name: 'Ural',                    lon: 59.0, lat: 57.0 },
      { id: 'apennines',        name: 'Apeniny',                 lon: 14.0, lat: 43.0 },
      { id: 'balkans_mts',      name: 'Bałkany (Stara Płanina)', lon: 25.0, lat: 42.8 },
      { id: 'dinaric',          name: 'Dinary',                  lon: 17.0, lat: 44.0 },
      { id: 'caucasus',         name: 'Kaukaz',                  lon: 43.0, lat: 43.0 },
      { id: 'tatras',           name: 'Tatry',                   lon: 20.0, lat: 49.2 },
      { id: 'sudetes',          name: 'Sudety',                  lon: 16.5, lat: 50.7 },
      { id: 'massif',           name: 'Masyw Centralny',         lon:  3.5, lat: 45.5 },
      { id: 'rhodopes',         name: 'Rodopy',                  lon: 25.0, lat: 42.0 },
    ],
  },

  {
    id: 'uplands',
    name: 'Wyżyny',
    color: '#bf360c',
    rgb: '191,54,12',
    zoom: 5,
    items: [
      { id: 'bohemian',   name: 'Wyżyna Czeska',               lon: 14.0, lat: 50.0 },
      { id: 'meseta',     name: 'Meseta Iberyjska',            lon: -4.0, lat: 40.0 },
      { id: 'malopolska', name: 'Wyżyna Małopolska',           lon: 21.0, lat: 51.0 },
      { id: 'east_europ', name: 'Wyżyna Wschodnioeuropejska',  lon: 35.0, lat: 53.0 },
      { id: 'volhynia',   name: 'Wyżyna Wołyńska',            lon: 26.0, lat: 51.0 },
      { id: 'ardennes',   name: 'Ardeny',                      lon:  5.5, lat: 50.0 },
    ],
  },

  {
    id: 'lowlands',
    name: 'Niziny',
    color: '#388e3c',
    rgb: '56,142,60',
    zoom: 5,
    items: [
      { id: 'centraleurope', name: 'Nizina Środkowoeuropejska',     lon: 16.0, lat: 52.0 },
      { id: 'popadana',      name: 'Nizina Padańska',              lon: 10.5, lat: 45.0 },
      { id: 'pannonian',     name: 'Nizina Pannońska (Węgierska)', lon: 19.0, lat: 47.0 },
      { id: 'easteurop_pl',  name: 'Nizina Wschodnioeuropejska',   lon: 35.0, lat: 54.0 },
    ],
  },

  {
    id: 'rivers',
    name: 'Rzeki',
    color: '#0288d1',
    rgb: '2,136,209',
    zoom: 6,
    items: [
      { id: 'danube',   name: 'Dunaj',   lon: 19.0,  lat: 47.0  },
      { id: 'rhine',    name: 'Ren',     lon:  8.0,  lat: 50.0  },
      { id: 'elbe',     name: 'Łaba',    lon: 13.0,  lat: 52.0  },
      { id: 'vistula',  name: 'Wisła',   lon: 19.5,  lat: 52.0  },
      { id: 'volga',    name: 'Wołga',   lon: 46.0,  lat: 51.0  },
      { id: 'dnieper',  name: 'Dniepr',  lon: 33.0,  lat: 49.0  },
      { id: 'don',      name: 'Don',     lon: 41.0,  lat: 49.0  },
      { id: 'oder',     name: 'Odra',    lon: 15.5,  lat: 51.5  },
      { id: 'seine',    name: 'Sekwana', lon:  2.5,  lat: 48.5  },
      { id: 'thames',   name: 'Tamiza',  lon: -0.5,  lat: 51.5  },
      { id: 'loire',    name: 'Loara',   lon:  1.5,  lat: 47.5  },
      { id: 'po',       name: 'Pad',     lon: 11.0,  lat: 45.0  },
      { id: 'rhone',    name: 'Rodan',   lon:  5.0,  lat: 45.0  },
      { id: 'garonne',  name: 'Garonna', lon:  0.5,  lat: 44.5  },
      { id: 'ebro',     name: 'Ebro',    lon: -0.5,  lat: 41.5  },
      { id: 'douro',    name: 'Duero',   lon: -4.5,  lat: 41.5  },
      { id: 'tagus',    name: 'Tag',     lon: -7.5,  lat: 39.5  },
      { id: 'dniester', name: 'Dniestr', lon: 28.0,  lat: 47.5  },
    ],
  },

  {
    id: 'lakes',
    name: 'Jeziora',
    color: '#00838f',
    rgb: '0,131,143',
    zoom: 6,
    items: [
      { id: 'ladoga',    name: 'Jezioro Ładoga',       lon: 31.5, lat: 61.0 },
      { id: 'onega',     name: 'Jezioro Onega',        lon: 35.5, lat: 61.5 },
      { id: 'vanern',    name: 'Jezioro Vänern',       lon: 13.5, lat: 58.8 },
      { id: 'geneva',    name: 'Jezioro Genewskie',    lon:  6.5, lat: 46.4 },
      { id: 'balaton',   name: 'Jezioro Bałaton',      lon: 17.8, lat: 46.8 },
      { id: 'constance', name: 'Jezioro Bodeńskie',    lon:  9.3, lat: 47.6 },
      { id: 'skadar',    name: 'Jezioro Szkoderskie',  lon: 19.3, lat: 42.1 },
      { id: 'peipus',    name: 'Jezioro Pejpus',       lon: 27.5, lat: 58.5 },
    ],
  },
];

// Płaski słownik: id → item (z dodanym polem category id i color)
const ITEMS_BY_ID = {};
CATEGORIES.forEach(cat => {
  cat.items.forEach(item => {
    ITEMS_BY_ID[item.id] = { ...item, categoryId: cat.id, categoryName: cat.name, color: cat.color, rgb: cat.rgb, zoom: cat.zoom };
  });
});
