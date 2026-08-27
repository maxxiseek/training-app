/* ---------------------------------------------------------------
   data.js — Szczyt (trening Olgi): sesje, ćwiczenia, fazy
----------------------------------------------------------------*/

const APP = { wersja: '1.0.0', data: '2026-08-27' };

const PLAN_START = '2026-08-27';

const CEL_WAGA = null; // docelowa waga — do uzupełnienia

const FAZY = [
  { od: 1,  do: 3,  nazwa: 'Faza 0 — Kalibracja',
    opis: 'Dobierz ciężary z zapasem 2 powtórzeń. Plyometria ostrożnie. Easy GORY (marsz / lekka stromizna). Lekki deficyt.' },
  { od: 4,  do: 11, nazwa: 'Faza 1 — Baza + redukcja',
    opis: 'Siła nóg i pośladków + dynamika. Buduj objętość marszu i stromizny pod pięciotysięcznik. Tydzień 8 = deload.' },
  { od: 12, do: 99, nazwa: 'Faza 2 — Pod szczyt',
    opis: 'Utrzymaj siłę. Dłuższe / bardziej obciążone wyjścia (plecak). Intensywność bez zbędnego maxowania.' },
];

const DELOADY = [8, 16];

/* Sesje.
   item: { n, d, u?, lift?, krok?, serie?, zakres?, plyo? }
   extra: true → tracker „Dodatkowo dziś”, poza CELE_TYG i chipami głównymi
*/
const SESJE = {
  A: {
    nazwa: 'A — Dolne / moc', dur: '~70 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 8–10 min', items: [
        { n: 'Kobra (McKenzie)', d: '10 powt.' },
        { n: 'Odwodzenie nogi z gumą, stojąc', d: '2 × 15/str', u: 'Aktywacja pośladka średniego' },
        { n: 'Mostek biodrowy z gumą', d: '2 × 12' },
        { n: 'Zginacz biodra w półklęku', d: '2 × 30 s/str', u: 'Podwiń miednicę, spinaj pośladek nogi tylnej' },
        { n: 'Dead bug', d: '2 × 8/str', u: 'Lędźwie wklejone w podłogę' },
        { n: 'Pogo hops', d: '2 × 20', u: 'Kolana prawie sztywne, praca ze stopy' },
      ]},
      { t: 'Blok mocy · przerwy 90–120 s', items: [
        { n: 'Wskoki na skrzynię', d: '4 × 3', u: 'Zejście krokiem, nigdy zeskok', plyo: true },
        { n: 'Zeskok z lądowaniem (stick landing)', d: '3 × 4', u: 'Skrzynia 30–40 cm, cichy lądunek, hold 2 s. Od tyg. 4', plyo: true },
      ]},
      { t: 'Siła · przerwy 2–3 min', items: [
        { n: 'Martwy ciąg z trap barem', d: '4 × 5', u: 'Uchwyty wysokie, plecy neutralne', lift: 'trapbar', krok: 5, serie: 4, zakres: [5, 6] },
        { n: 'Hip thrust ze sztangą', d: '4 × 8', u: 'Podbródek do klatki, żebra w dół, bez przeprostu', lift: 'hipthrust', krok: 5, serie: 4, zakres: [8, 10] },
        { n: 'Bułgarski przysiad z hantlami', d: '3 × 8/nogę', u: 'Tułów lekko pochylony do przodu', lift: 'rfess', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'RDL jednonóż / uginanie nóg', d: '3 × 8', u: 'Dwugłowe — ochrona kolana i prędkość', lift: 'rdl', krok: 2.5, serie: 3, zakres: [8, 10] },
      ]},
      { t: 'Akcesoria · superserie, 60 s', items: [
        { n: 'Wspięcia na palce jednonóż', d: '3 × 12 + izo 30 s' },
        { n: 'Pallof press', d: '3 × 12/str', u: 'Miednica nieruchoma' },
        { n: 'Copenhagen plank', d: '3 × 20 s/str' },
        { n: 'Wznosy kolan w zwisie', d: '3 × 10', u: 'Bez szarpania' },
      ]},
    ],
  },

  B: {
    nazwa: 'B — Góra light + glute', dur: '~60 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6 min', items: [
        { n: 'Face pull', d: '2 × 15' },
        { n: 'Rotacja zewnętrzna barku z gumą', d: '2 × 15/str', u: 'Łokieć przy tułowiu' },
        { n: 'Band pull-apart', d: '2 × 20' },
        { n: 'Open book', d: '2 × 8/str' },
      ]},
      { t: 'Góra · przerwy 2 min', items: [
        { n: 'Wyciskanie hantli na ławce', d: '4 × 8', lift: 'benchdb', krok: 2.5, serie: 4, zakres: [8, 10] },
        { n: 'Podciąganie / ściąganie drążka', d: '4 × 8', lift: 'pullup', krok: 2.5, serie: 4, zakres: [8, 10] },
        { n: 'Wiosłowanie hantlem', d: '3 × 10/str', lift: 'row', krok: 2.5, serie: 3, zakres: [10, 12] },
      ]},
      { t: 'Pośladki · 60–90 s', items: [
        { n: 'Hip thrust / mostek na wyciągu', d: '3 × 12', u: 'Pełne spięcie u góry', lift: 'hipthrustb', krok: 5, serie: 3, zakres: [10, 12] },
        { n: 'Kickback na wyciągu', d: '3 × 12/str', u: 'Bez przeprostu lędźwi' },
        { n: 'Odwodzenie biodra (maszyna / guma)', d: '3 × 15', u: 'Kontrola, bez szarpania' },
        { n: 'Frog pump / mostek izo', d: '2 × 20', u: 'Finisz — spięcie 1 s u góry' },
      ]},
      { t: 'Core', items: [
        { n: 'Plank na piłce, przedramiona', d: '3 × 45–60 s' },
        { n: 'Side plank z uniesieniem biodra', d: '3 × 10/str', u: 'Hold 3 s w górze' },
      ]},
    ],
  },

  C: {
    nazwa: 'C — Atletyczny + nogi', dur: '~65 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 8 min', items: [
        { n: 'Kobra + child’s pose', d: '10 + 1 min' },
        { n: 'Odwodzenie z gumą + monster walk', d: '2 × 15/str' },
        { n: 'Skipy + krok odstawno-dostawny', d: '3 × 15 m' },
        { n: '90/90 przejścia biodrami', d: '2 × 8/str' },
      ]},
      { t: 'Blok mocy · przerwy 90 s', items: [
        { n: 'Skok w dal z miejsca', d: '4 × 3', u: 'Mierz odległość', plyo: true },
        { n: 'Skok boczny + lądowanie na jednej nodze', d: '3 × 4/str', u: 'Hold 2 s', plyo: true },
        { n: 'Rzut piłką rotacyjnie o ścianę', d: '3 × 6/str', u: 'Rotacja z bioder i klatki, nie z lędźwi' },
        { n: 'Slam piłką o podłoże', d: '3 × 8' },
      ]},
      { t: 'Siła · przerwy 90 s', items: [
        { n: 'Przysiad goblet / przedni', d: '3 × 8', u: 'Bez sztangi na plecach w fazie 0–1', lift: 'squat', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'Zakroki z hantlami po bokach', d: '3 × 10/nogę', lift: 'lunge', krok: 2.5, serie: 3, zakres: [10, 12] },
        { n: 'Step-up na skrzynię', d: '3 × 8/nogę', u: 'Cała stopa, bez odbicia', lift: 'stepup', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'Pompki / pompki na kolanach', d: '2 × 10', u: 'Technicznie, bez maxów' },
      ]},
      { t: 'Core i finisz', items: [
        { n: 'Dead bug z gumą', d: '3 × 10/str' },
        { n: 'Pallof press z krokiem w bok', d: '3 × 8/str' },
        { n: 'Farmer’s walk / spacer z obciążeniem', d: '3 × 40 m', u: 'Symulacja plecaka — tułów prosty' },
      ]},
    ],
  },

  GORY: {
    nazwa: 'Góry / stromizna', dur: 'podejście lub sesja kondycyjna', typ: 'sport',
    bloki: [
      { t: 'Opcje (wybierz jedną)', items: [
        { n: 'Marsz w terenie / podejście', d: '45–90+ min', u: 'Oddychanie rozmową; weekend może być dłuższy' },
        { n: 'Stromizna na siłowni', d: '25–40 min', u: 'Bieżnia wznios / stepper / schody' },
        { n: 'Podejście z lekkim plecakiem', d: 'wg formy', u: 'Buduj objętość stopniowo pod pięciotysięcznik' },
      ]},
      { t: 'Schłodzenie — 6–8 min', items: [
        { n: 'Marsz / luźne chodzenie', d: '2 min' },
        { n: 'Łydki + zginacz biodra', d: '45 s/str' },
        { n: 'Pośladek (roller lub rozciąganie)', d: '45 s/str' },
      ]},
    ],
  },

  VB: {
    nazwa: 'Siatkówka', dur: 'tracker', typ: 'sport', extra: true,
    bloki: [],
  },

  PADEL: {
    nazwa: 'Padel', dur: 'tracker', typ: 'sport', extra: true,
    bloki: [],
  },

  AKT: {
    nazwa: 'Inna aktywność', dur: 'tracker', typ: 'sport', extra: true,
    bloki: [],
  },

  REST: {
    nazwa: 'Dzień wolny', dur: 'regeneracja', typ: 'rest',
    bloki: [],
  },
};

/* Szkic tygodnia (zakładka Plan). 0 = niedziela. */
const TYDZIEN = { 1: 'A', 2: 'GORY', 3: 'B', 4: 'GORY', 5: 'C', 6: 'REST', 0: 'REST' };

const CELE_TYG = { A: 1, B: 1, C: 1, GORY: 2 };

const SKOKI = ['A', 'C'];
const CIEZKIE = ['A', 'C'];

const MAX_TRENING_Z_RZEDU = 3;
const MAX_CIEZKIE_Z_RZEDU = 2;
const MAX_SESJE_7 = 5;

const PRIORYTET = ['A', 'C', 'B', 'GORY'];

const LIFTY = {
  trapbar:    { n: 'Martwy ciąg trap bar', start: null, f1: null, f2: null },
  hipthrust:  { n: 'Hip thrust',           start: null, f1: null, f2: null },
  hipthrustb: { n: 'Hip thrust (sesja B)',  start: null, f1: null, f2: null },
  benchdb:    { n: 'Wyciskanie hantli',    start: null, f1: null, f2: null },
  row:        { n: 'Wiosłowanie hantlem',  start: null, f1: null, f2: null },
  rfess:      { n: 'Bułgarski przysiad',   start: null, f1: null, f2: null },
  rdl:        { n: 'RDL jednonóż',         start: null, f1: null, f2: null },
  squat:      { n: 'Przysiad goblet',      start: null, f1: null, f2: null },
  lunge:      { n: 'Zakroki',              start: null, f1: null, f2: null },
  stepup:     { n: 'Step-up',              start: null, f1: null, f2: null },
  pullup:     { n: 'Podciąganie / drążek', start: null, f1: null, f2: null },
};

const TESTY = [];
