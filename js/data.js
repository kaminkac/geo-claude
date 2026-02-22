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
      { id: 'atlantic',      name: 'Ocean Atlantycki',       lon: -22.0, lat: 52.0, country: 'Ocean Atlantycki' },
      { id: 'arctic',        name: 'Ocean Arktyczny',        lon:  20.0, lat: 83.0, country: 'Arktyka' },
      { id: 'north_sea',     name: 'Morze Północne',         lon:   3.0, lat: 56.5, country: 'Wielka Brytania / Norwegia' },
      { id: 'baltic',        name: 'Morze Bałtyckie',        lon:  18.5, lat: 57.5, country: 'Europa Północna' },
      { id: 'norwegian',     name: 'Morze Norweskie',        lon:   5.0, lat: 69.0, country: 'Norwegia / int.' },
      { id: 'barents',       name: 'Morze Barentsa',         lon:  40.0, lat: 74.0, country: 'Norwegia / Rosja' },
      { id: 'white',         name: 'Morze Białe',            lon:  34.0, lat: 65.5, country: 'Rosja' },
      { id: 'mediterranean', name: 'Morze Śródziemne',       lon:  14.0, lat: 37.5, country: 'Europa Południowa' },
      { id: 'black',         name: 'Morze Czarne',           lon:  32.5, lat: 43.0, country: 'Ukraina / Turcja / Rumunia' },
      { id: 'caspian',       name: 'Morze Kaspijskie',       lon:  50.5, lat: 42.0, country: 'Rosja / Kazachstan / Azerbejdżan' },
      { id: 'adriatic',      name: 'Morze Adriatyckie',      lon:  16.5, lat: 43.0, country: 'Włochy / Chorwacja' },
      { id: 'aegean',        name: 'Morze Egejskie',         lon:  25.0, lat: 39.0, country: 'Grecja / Turcja' },
      { id: 'tyrrhenian',    name: 'Morze Tyrreńskie',       lon:  12.0, lat: 40.5, country: 'Włochy' },
      { id: 'ionian',        name: 'Morze Jońskie',          lon:  19.5, lat: 37.5, country: 'Grecja / Włochy' },
      { id: 'ligurian',      name: 'Morze Liguryjskie',      lon:   9.0, lat: 43.5, country: 'Francja / Włochy' },
      { id: 'irish',         name: 'Morze Irlandzkie',       lon:  -5.5, lat: 53.5, country: 'Wielka Brytania / Irlandia' },
    ],
  },

  {
    id: 'bays',
    name: 'Zatoki',
    color: '#0277bd',
    rgb: '2,119,189',
    zoom: 5,
    items: [
      { id: 'biscay',   name: 'Zatoka Biskajska',      lon: -4.0, lat: 46.0, country: 'Francja / Hiszpania' },
      { id: 'bothnia',  name: 'Zatoka Botnicka',       lon: 21.0, lat: 63.5, country: 'Szwecja / Finlandia' },
      { id: 'finland',  name: 'Zatoka Fińska',         lon: 26.0, lat: 59.5, country: 'Finlandia / Estonia / Rosja' },
      { id: 'riga',     name: 'Zatoka Ryska',          lon: 23.5, lat: 57.5, country: 'Łotwa / Estonia' },
      { id: 'lions',    name: 'Zatoka Lwia',           lon:  4.0, lat: 43.0, country: 'Francja' },
      { id: 'naples',   name: 'Zatoka Neapolitańska',  lon: 14.2, lat: 40.6, country: 'Włochy' },
    ],
  },

  {
    id: 'straits',
    name: 'Cieśniny',
    color: '#006064',
    rgb: '0,96,100',
    zoom: 6,
    items: [
      { id: 'gibraltar',   name: 'Cieśnina Gibraltarska', lon: -5.5,  lat: 36.0, country: 'Hiszpania / Maroko' },
      { id: 'danish',      name: 'Cieśnina Duńska',       lon: -25.0, lat: 66.5, country: 'Islandia / Grenlandia' },
      { id: 'dover',       name: 'Cieśnina Kaletańska',   lon:  1.5,  lat: 51.0, country: 'Francja / Wielka Brytania' },
      { id: 'oresund',     name: 'Sund (Öresund)',         lon: 12.7,  lat: 55.8, country: 'Dania / Szwecja' },
      { id: 'bosphorus',   name: 'Bosfor',                 lon: 29.0,  lat: 41.1, country: 'Turcja' },
      { id: 'dardanelles', name: 'Dardanele',              lon: 26.5,  lat: 40.2, country: 'Turcja' },
      { id: 'messina',     name: 'Cieśnina Mesyńska',     lon: 15.6,  lat: 38.2, country: 'Włochy' },
    ],
  },

  {
    id: 'channels',
    name: 'Kanały',
    color: '#00695c',
    rgb: '0,105,92',
    zoom: 6,
    items: [
      { id: 'kiel',    name: 'Kanał Kiloński', lon:  9.7, lat: 54.3, country: 'Niemcy' },
      { id: 'suez',    name: 'Kanał Sueski',   lon: 32.5, lat: 30.5, country: 'Egipt' },
      { id: 'corinth', name: 'Kanał Koryncki', lon: 23.0, lat: 37.9, country: 'Grecja' },
    ],
  },

  {
    id: 'islands',
    name: 'Wyspy',
    color: '#e65100',
    rgb: '230,81,0',
    zoom: 5,
    items: [
      { id: 'iceland',  name: 'Islandia',        lon: -18.5, lat: 64.8, country: 'Islandia' },
      { id: 'gb',       name: 'Wielka Brytania', lon:  -2.0, lat: 54.0, country: 'Wielka Brytania' },
      { id: 'ireland',  name: 'Irlandia',        lon:  -8.0, lat: 53.0, country: 'Irlandia' },
      { id: 'sicily',   name: 'Sycylia',         lon:  14.3, lat: 37.5, country: 'Włochy' },
      { id: 'sardinia', name: 'Sardynia',        lon:   9.1, lat: 40.1, country: 'Włochy' },
      { id: 'corsica',  name: 'Korsyka',         lon:   9.0, lat: 42.2, country: 'Francja' },
      { id: 'crete',    name: 'Kreta',           lon:  25.0, lat: 35.2, country: 'Grecja' },
      { id: 'malta',    name: 'Malta',           lon:  14.4, lat: 35.9, country: 'Malta' },
      { id: 'cyprus',   name: 'Cypr',            lon:  33.0, lat: 35.1, country: 'Cypr' },
      { id: 'gotland',  name: 'Gotlandia',       lon:  18.5, lat: 57.5, country: 'Szwecja' },
      { id: 'bornholm', name: 'Bornholm',        lon:  15.0, lat: 55.1, country: 'Dania' },
    ],
  },

  {
    id: 'peninsulas',
    name: 'Półwyspy',
    color: '#2e7d32',
    rgb: '46,125,50',
    zoom: 4,
    items: [
      { id: 'scandinavian', name: 'Półwysep Skandynawski', lon: 16.0,  lat: 65.0, country: 'Norwegia / Szwecja' },
      { id: 'iberian',      name: 'Półwysep Iberyjski',    lon: -5.0,  lat: 40.0, country: 'Hiszpania / Portugalia' },
      { id: 'apennine',     name: 'Półwysep Apeniński',    lon: 13.5,  lat: 42.0, country: 'Włochy' },
      { id: 'balkan',       name: 'Półwysep Bałkański',    lon: 21.0,  lat: 42.0, country: 'Europa Płd.-Wschodnia' },
      { id: 'jutland',      name: 'Półwysep Jutlandzki',   lon:  9.5,  lat: 55.5, country: 'Dania / Niemcy' },
      { id: 'kola',         name: 'Półwysep Kolski',       lon: 33.0,  lat: 68.0, country: 'Rosja' },
      { id: 'crimea',       name: 'Półwysep Krymski',      lon: 34.0,  lat: 45.2, country: 'Ukraina' },
      { id: 'breton',       name: 'Półwysep Bretoński',    lon: -3.5,  lat: 48.2, country: 'Francja' },
    ],
  },

  {
    id: 'mountains',
    name: 'Góry',
    color: '#4e342e',
    rgb: '78,52,46',
    zoom: 5,
    items: [
      { id: 'alps',             name: 'Alpy',                    lon: 10.0, lat: 46.5, country: 'Francja / Szwajcaria / Austria / Włochy' },
      { id: 'pyrenees',         name: 'Pireneje',                lon:  0.5, lat: 42.7, country: 'Francja / Hiszpania' },
      { id: 'carpathians',      name: 'Karpaty',                 lon: 22.0, lat: 48.0, country: 'Polska / Słowacja / Ukraina / Rumunia' },
      { id: 'scandinavian_mts', name: 'Góry Skandynawskie',     lon: 16.0, lat: 65.0, country: 'Norwegia / Szwecja' },
      { id: 'ural',             name: 'Ural',                    lon: 59.0, lat: 57.0, country: 'Rosja' },
      { id: 'apennines',        name: 'Apeniny',                 lon: 14.0, lat: 43.0, country: 'Włochy' },
      { id: 'balkans_mts',      name: 'Bałkany (Stara Płanina)', lon: 25.0, lat: 42.8, country: 'Bułgaria / Serbia' },
      { id: 'dinaric',          name: 'Dinary',                  lon: 17.0, lat: 44.0, country: 'Chorwacja / Bośnia / Czarnogóra' },
      { id: 'caucasus',         name: 'Kaukaz',                  lon: 43.0, lat: 43.0, country: 'Gruzja / Armenia / Rosja' },
      { id: 'tatras',           name: 'Tatry',                   lon: 20.0, lat: 49.2, country: 'Polska / Słowacja' },
      { id: 'sudetes',          name: 'Sudety',                  lon: 16.5, lat: 50.7, country: 'Polska / Czechy' },
      { id: 'massif',           name: 'Masyw Centralny',         lon:  3.5, lat: 45.5, country: 'Francja' },
      { id: 'rhodopes',         name: 'Rodopy',                  lon: 25.0, lat: 42.0, country: 'Bułgaria / Grecja' },
    ],
  },

  {
    id: 'uplands',
    name: 'Wyżyny',
    color: '#bf360c',
    rgb: '191,54,12',
    zoom: 5,
    items: [
      { id: 'bohemian',   name: 'Wyżyna Czeska',               lon: 14.0, lat: 50.0, country: 'Czechy' },
      { id: 'meseta',     name: 'Meseta Iberyjska',            lon: -4.0, lat: 40.0, country: 'Hiszpania' },
      { id: 'malopolska', name: 'Wyżyna Małopolska',           lon: 21.0, lat: 51.0, country: 'Polska' },
      { id: 'east_europ', name: 'Wyżyna Wschodnioeuropejska',  lon: 35.0, lat: 53.0, country: 'Rosja / Ukraina' },
      { id: 'volhynia',   name: 'Wyżyna Wołyńska',            lon: 26.0, lat: 51.0, country: 'Ukraina' },
      { id: 'ardennes',   name: 'Ardeny',                      lon:  5.5, lat: 50.0, country: 'Belgia / Luksemburg / Francja' },
    ],
  },

  {
    id: 'lowlands',
    name: 'Niziny',
    color: '#388e3c',
    rgb: '56,142,60',
    zoom: 5,
    items: [
      { id: 'centraleurope', name: 'Nizina Środkowoeuropejska',     lon: 16.0, lat: 52.0, country: 'Niemcy / Polska' },
      { id: 'popadana',      name: 'Nizina Padańska',              lon: 10.5, lat: 45.0, country: 'Włochy' },
      { id: 'pannonian',     name: 'Nizina Pannońska (Węgierska)', lon: 19.0, lat: 47.0, country: 'Węgry / Serbia / Rumunia' },
      { id: 'easteurop_pl',  name: 'Nizina Wschodnioeuropejska',   lon: 35.0, lat: 54.0, country: 'Rosja' },
    ],
  },

  {
    id: 'rivers',
    name: 'Rzeki',
    color: '#0288d1',
    rgb: '2,136,209',
    zoom: 6,
    items: [
      { id: 'danube',   name: 'Dunaj',   lon: 19.0,  lat: 47.0, country: 'Austria / Węgry / Serbia / Rumunia' },
      { id: 'rhine',    name: 'Ren',     lon:  8.0,  lat: 50.0, country: 'Niemcy / Francja / Holandia' },
      { id: 'elbe',     name: 'Łaba',    lon: 13.0,  lat: 52.0, country: 'Niemcy' },
      { id: 'vistula',  name: 'Wisła',   lon: 19.5,  lat: 52.0, country: 'Polska' },
      { id: 'volga',    name: 'Wołga',   lon: 46.0,  lat: 51.0, country: 'Rosja' },
      { id: 'dnieper',  name: 'Dniepr',  lon: 33.0,  lat: 49.0, country: 'Ukraina' },
      { id: 'don',      name: 'Don',     lon: 41.0,  lat: 49.0, country: 'Rosja' },
      { id: 'oder',     name: 'Odra',    lon: 15.5,  lat: 51.5, country: 'Polska / Niemcy' },
      { id: 'seine',    name: 'Sekwana', lon:  2.5,  lat: 48.5, country: 'Francja' },
      { id: 'thames',   name: 'Tamiza',  lon: -0.5,  lat: 51.5, country: 'Wielka Brytania' },
      { id: 'loire',    name: 'Loara',   lon:  1.5,  lat: 47.5, country: 'Francja' },
      { id: 'po',       name: 'Pad',     lon: 11.0,  lat: 45.0, country: 'Włochy' },
      { id: 'rhone',    name: 'Rodan',   lon:  5.0,  lat: 45.0, country: 'Francja' },
      { id: 'garonne',  name: 'Garonna', lon:  0.5,  lat: 44.5, country: 'Francja' },
      { id: 'ebro',     name: 'Ebro',    lon: -0.5,  lat: 41.5, country: 'Hiszpania' },
      { id: 'douro',    name: 'Duero',   lon: -4.5,  lat: 41.5, country: 'Hiszpania / Portugalia' },
      { id: 'tagus',    name: 'Tag',     lon: -7.5,  lat: 39.5, country: 'Portugalia / Hiszpania' },
      { id: 'dniester', name: 'Dniestr', lon: 28.0,  lat: 47.5, country: 'Ukraina / Mołdawia' },
    ],
  },

  {
    id: 'lakes',
    name: 'Jeziora',
    color: '#00838f',
    rgb: '0,131,143',
    zoom: 6,
    items: [
      { id: 'ladoga',    name: 'Jezioro Ładoga',       lon: 31.5, lat: 61.0, country: 'Rosja' },
      { id: 'onega',     name: 'Jezioro Onega',        lon: 35.5, lat: 61.5, country: 'Rosja' },
      { id: 'vanern',    name: 'Jezioro Vänern',       lon: 13.5, lat: 58.8, country: 'Szwecja' },
      { id: 'geneva',    name: 'Jezioro Genewskie',    lon:  6.5, lat: 46.4, country: 'Szwajcaria / Francja' },
      { id: 'balaton',   name: 'Jezioro Bałaton',      lon: 17.8, lat: 46.8, country: 'Węgry' },
      { id: 'constance', name: 'Jezioro Bodeńskie',    lon:  9.3, lat: 47.6, country: 'Niemcy / Szwajcaria / Austria' },
      { id: 'skadar',    name: 'Jezioro Szkoderskie',  lon: 19.3, lat: 42.1, country: 'Albania / Czarnogóra' },
      { id: 'peipus',    name: 'Jezioro Pejpus',       lon: 27.5, lat: 58.5, country: 'Estonia / Rosja' },
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
