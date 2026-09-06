/* ---------------------------------------------------------------
   data.js — Szczyt (trening Olgi): sesje, ćwiczenia, fazy
----------------------------------------------------------------*/

const APP = { wersja: '1.1.1', data: '2026-09-06' };

const PLAN_START = '2026-08-27';

const CEL_WAGA = null; // docelowa waga — do uzupełnienia

const FAZY = [
  { od: 1,  do: 3,  nazwa: 'Faza 0 — Kalibracja',
    opis: 'Dobierz ciężary z zapasem 2 powtórzeń. Plyometria ostrożnie. Lekki trening górski (marsz / stromizna). Lekki deficyt.' },
  { od: 4,  do: 11, nazwa: 'Faza 1 — Baza + redukcja',
    opis: 'Siła nóg i pośladków + dynamika. Buduj objętość marszu i stromizny pod pięciotysięcznik. Tydzień 8 = deload.' },
  { od: 12, do: 99, nazwa: 'Faza 2 — Pod szczyt',
    opis: 'Utrzymaj siłę. Dłuższe / bardziej obciążone wyjścia (plecak). Intensywność bez zbędnego maxowania.' },
];

const DELOADY = [8, 16];

/* Sesje.
   item: { n, d, u?, lift?, krok?, serie?, zakres?, plyo?, yt?, poziom?, moc? }
   poziom: 'full' = tylko tryb FULL; brak = zawsze (MINIMUM+FULL)
   moc: 0|1|2 = rotacja mocy w C
   format:'fazy' + fazy:[{t,czas,tekst}] dla sportu
   extra: true → tracker „Dodatkowo dziś”, poza CELE_TYG i chipami głównymi
*/
const SESJE = {
  A: {
    nazwa: 'A — Dolne / moc', dur: '~40–45 min', durMin: '~40–45 min', durFull: '~50–60 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6–8 min', items: [
        { n: 'Mobilność biodra + mostek + odwodzenie (noga na bok)', d: '6–8 min łącznie',
          u: 'Krótki blok: mobilność biodra, mostek, odwodzenie z gumą (noga na bok), zginacz w półklęku, dead bug, lekkie pogo.' },
      ]},
      { t: 'Moc · przerwy 90–120 s', items: [
        { n: 'Wskoki na skrzynię (box jumps)', d: '3 × 3', u: 'Stałe 3×3. Zejście krokiem. Po czystym 3×3 → +5 cm. Start 75 cm.', plyo: true, lift: 'boxjump', tryb: 'wysokosc', krok: 5, serie: 3, zakres: [3, 3], startCm: 75 },
      ]},
      { t: 'Siła · przerwy 2–3 min', items: [
        { n: 'Martwy ciąg z trap barem (trap bar deadlift)', d: '3 × 4–5', u: 'Uchwyty wysokie, plecy neutralne. Wpisz tylko talerze (bez wagi barem).', lift: 'trapbar', krok: 5, serie: 3, zakres: [4, 5] },
        { n: 'Hip thrust ze sztangą (barbell hip thrust)', d: '3 × 6–8', u: 'Podbródek do klatki, żebra w dół. Wpisz tylko talerze (bez barem).', lift: 'hipthrust', krok: 5, serie: 3, zakres: [6, 8] },
        { n: 'Bułgarski przysiad z hantlami (Bulgarian split squat / RFESS)', d: '2 × 6–8 na każdą nogę', u: 'Wpisz łącznie w rękach (np. 2×10 = 20).', lift: 'rfess', krok: 2.5, serie: 2, zakres: [6, 8] },
      ]},
      { t: 'Core', items: [
        { n: 'Pallof press albo dead bug — wybierz 1', d: '2 serie', u: 'Jedno z dwóch. Miednica stabilna.' },
      ]},
      { t: 'Dodatki FULL', items: [
        { n: 'Uginanie nóg albo RDL jednonóż (leg curl / single-leg RDL)', d: '2 × 8–10', u: 'Wpisz wagę jednej hantli przy RDL.', poziom: 'full', lift: 'rdl', krok: 2.5, serie: 2, zakres: [8, 10] },
        { n: 'Wspięcia na palce jednonóż (single-leg calf raise)', d: '2 × 10–15 na każdą nogę', poziom: 'full' },
      ]},
    ],
  },

  B: {
    nazwa: 'B — Góra light + glute', dur: '~40–45 min', durMin: '~40–45 min', durFull: '~50–55 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 5–6 min', items: [
        { n: 'Face pull + rotacja zewnętrzna + pull-apart', d: '5–6 min', u: 'Krótka aktywacja barków.' },
      ]},
      { t: 'Góra · przerwy 2 min', items: [
        { n: 'Wyciskanie hantli na ławce (dumbbell bench press)', d: '3 × 8–12', u: 'Wpisz wagę jednej hantli.', lift: 'benchdb', krok: 2.5, serie: 3, zakres: [8, 12] },
        { n: 'Ściąganie drążka / podciąganie wspomagane (lat pulldown)', d: '3 × 8–12', lift: 'pullup', krok: 2.5, serie: 3, zakres: [8, 12] },
        { n: 'Wiosłowanie hantlem (single-arm dumbbell row)', d: '2 × 8–12 na każdą stronę', u: 'Wpisz wagę jednej hantli.', lift: 'row', krok: 2.5, serie: 2, zakres: [8, 12] },
      ]},
      { t: 'Pośladki', items: [
        { n: 'Hip thrust maszyna / wyciąg (cable / machine hip thrust)', d: '3 × 8–12', u: 'Pełne spięcie u góry', lift: 'hipthrustb', krok: 5, serie: 3, zakres: [8, 12] },
        { n: 'Kickback pośladka na wyciągu (cable glute kickback)', d: '2 × 10–15 na każdą stronę', u: 'Bez przeprostu lędźwi.' },
        { n: 'Odwodzenie biodra — maszyna / guma (hip abduction)', d: '2 × 12–20', u: 'Kontrola, bez szarpania' },
        { n: 'Deska na piłce albo deska boczna', d: '2 serie', u: 'Wybierz jeden wariant.' },
      ]},
      { t: 'Dodatki FULL · glute', items: [
        { n: 'Frog pump (frog pumps)', d: '2 × 15–20', u: 'Finisz — spięcie 1 s u góry', poziom: 'full' },
        { n: 'Druga izolacja glute (kickback lub odwodzenie — inny wariant)', d: '2 serie', u: 'Nie dokładaj OHP. Tylko druga izolacja pośladka.', poziom: 'full' },
      ]},
    ],
  },

  C: {
    nazwa: 'C — Atletyczny + nogi', dur: '~45–50 min', durMin: '~45–50 min', durFull: '~55–60 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6–8 min', items: [
        { n: 'Mobilność + aktywacja bioder + skipy', d: '6–8 min', u: 'Kobra/pozycja dziecka, odwodzenie + monster walk, skipy / shuffle, 90/90 — krótko.' },
      ]},
      { t: 'Moc · 1 ćwiczenie (rotacja) · przerwy 90 s', items: [
        { n: 'Skok w dal z miejsca (standing broad jump)', d: '3 serie jakościowe', u: 'Mierz odległość. Rotacja mocy.', plyo: true, moc: 0 },
        { n: 'Skok boczny + lądowanie (lateral bound + stick)', d: '3 serie jakościowe', u: 'Na każdą stronę, hold 2 s.', plyo: true, moc: 1, yt: 'https://www.youtube.com/shorts/IyMLKJX4MRU' },
        { n: 'Rzut piłką rotacyjnie (rotational med-ball throw)', d: '3 serie jakościowe', u: 'Rotacja z bioder i klatki, nie z lędźwi.', moc: 2, yt: 'https://www.youtube.com/shorts/02c2YLgF8iE' },
        { n: 'Slam piłką o podłoże (medicine ball slam)', d: '2–3 × 4', poziom: 'full' },
      ]},
      { t: 'Siła · przerwy 90 s', items: [
        { n: 'Przysiad goblet / przedni (goblet / front squat)', d: '3 × 6–8', u: 'Wpisz ciężar kettla / hantli.', lift: 'squat', krok: 2.5, serie: 3, zakres: [6, 8] },
        { n: 'Zakroki tyłem z hantlami (reverse lunges)', d: '2 × 8 na każdą nogę', u: 'Wpisz łącznie w rękach.', lift: 'lunge', krok: 2.5, serie: 2, zakres: [8, 8] },
        { n: 'Pompki / pompki na kolanach (push-ups / knee push-ups)', d: '2–3 × 8–12', u: 'Technicznie, bez maxów — łatwiejszy wariant OK.' },
        { n: 'Spacer farmera / z obciążeniem (farmer’s walk)', d: '2 przejścia', u: 'Symulacja plecaka — tułów prosty' },
        { n: 'Wykrok na skrzynię (step-up)', d: '2 × 8 na każdą nogę', poziom: 'full', lift: 'stepup', krok: 2.5, serie: 2, zakres: [8, 8] },
      ]},
      { t: 'Core FULL', items: [
        { n: 'Dead bug', d: '2 serie', poziom: 'full' },
        { n: 'Pallof press z krokiem w bok', d: '2 × na każdą stronę', poziom: 'full' },
      ]},
    ],
  },

  GORY: {
    nazwa: 'TG — Trening górski', dur: '~30–90 min', typ: 'kondycja',
    bloki: [
      { t: 'Kondycja · odhacz co zrobiłaś (można więcej niż jedno)', items: [
        { n: 'Schody / stepper (stair climber)', d: '25–40 min',
          u: 'Najczęstsze na siłce. Wpisz minuty + wznios/poziom. Cel: najpierw czas, potem trudność.',
          lift: 'schody', tryb: 'czas', krok: 2, serie: 1, zakres: [25, 40], startMin: 25, startWzn: 5 },
        { n: 'Bieżnia pod górę (incline treadmill walk)', d: '20–35 min',
          u: 'Tempo rozmowy. Wznios w polu obok minut.',
          lift: 'bieznia', tryb: 'czas', krok: 2, serie: 1, zakres: [20, 35], startMin: 20, startWzn: 6 },
        { n: 'Marsz w terenie / podejście (trail hike / uphill walk)', d: '45–90 min',
          u: 'Weekend / góry. Wznios = subiektywna trudność 1–10 albo pomiń.',
          lift: 'marsz', tryb: 'czas', krok: 5, serie: 1, zakres: [45, 90], startMin: 45, startWzn: 3 },
        { n: 'Podejście z plecakiem (rucking / weighted hike)', d: '40–90 min',
          u: 'Buduj objętość pod pięciotysięcznik. Wznios = kg plecaka (opcjonalnie).',
          lift: 'plecak', tryb: 'czas', krok: 5, serie: 1, zakres: [40, 90], startMin: 40, startWzn: 4 },
      ]},
      { t: 'Schłodzenie — 6–8 min', items: [
        { n: 'Marsz / luźne chodzenie (easy walk)', d: '2 min' },
        { n: 'Łydki + zginacz biodra (calf + hip flexor stretch)', d: '45 s na każdą stronę' },
        { n: 'Pośladek — roller lub rozciąganie (glute roll / stretch)', d: '45 s na każdą stronę' },
      ]},
    ],
  },

  VB: {
    nazwa: 'Siatkówka', dur: 'tracker', typ: 'sport', extra: true, format: 'fazy',
    fazy: [
      { t: 'Rozruszanie', czas: '2–3 min', tekst: 'Lekki trucht, shuffle i karioka. Podnieś temperaturę zanim wejdziesz w skoki.' },
      { t: 'Aktywacja', czas: '3–4 min', tekst: 'Najpierw biodra (monster walk, mostek), potem barki (pull-apart + rotacja). Stabilne biodro → ramię do ataku.' },
      { t: 'Przygotowanie pod grę', czas: '3–4 min', tekst: 'Pogo → skoki narastająco → 2–3 approach bez piłki. Czyste lądowanie, bez checklisty serii.' },
      { t: 'Po grze — schłodzenie', czas: '6–8 min', tekst: 'Marsz, roller (łydki, ud, pośladek, piersiowy) i 2–3 stretchy: zginacz, klatka, łydka.' },
    ],
    bloki: [],
  },

  PADEL: {
    nazwa: 'Padel', dur: 'tracker', typ: 'sport', extra: true, format: 'fazy',
    fazy: [
      { t: 'Rozruszanie', czas: '2 min', tekst: 'Trucht, shuffle, cofanie tyłem, karioka — stopy we wszystkich kierunkach przed hamowaniami.' },
      { t: 'Aktywacja', czas: '3 min', tekst: 'Pachwina/biodra, potem bark i nadgarstek. Najpierw noga do dojścia, potem ramię do uderzenia.' },
      { t: 'Przygotowanie pod grę', czas: '2–3 min', tekst: 'Wypad w bok → bound + stick → krótki sprint z ostrym stopem → shadow swings.' },
      { t: 'Po grze — schłodzenie', czas: '6–8 min', tekst: 'Marsz, roller (z przywodzicielami) i stretch: zginacz, motyl, łydka.' },
    ],
    bloki: [],
  },

  BALET: {
    nazwa: 'Balet', dur: 'tracker', typ: 'sport', extra: true,
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

const TYDZIEN = { 1: 'A', 2: 'B', 3: 'GORY', 4: 'C', 5: 'REST', 6: 'REST', 0: 'REST' };

const CELE_TYG = { A: 1, B: 1, C: 1, GORY: 1 };

const SKOKI = ['A', 'C'];
const CIEZKIE = ['A', 'C'];

const MAX_TRENING_Z_RZEDU = 3;
const MAX_CIEZKIE_Z_RZEDU = 2;
const MAX_SESJE_7 = 4;

const PRIORYTET = ['A', 'C', 'B', 'GORY'];

const LIFTY = {
  /* waga: jak czytać pole kg — talerze | hantla | rece | goblet | stos */
  trapbar:    { n: 'Martwy ciąg trap bar (trap bar deadlift)', start: 45,   f1: null, f2: null, waga: 'talerze' },
  hipthrust:  { n: 'Hip thrust (barbell hip thrust)',           start: 25,   f1: null, f2: null, waga: 'talerze' },
  hipthrustb: { n: 'Hip thrust — sesja B (cable/machine hip thrust)',  start: null, f1: null, f2: null, waga: 'stos' },
  benchdb:    { n: 'Wyciskanie hantli (dumbbell bench press)',    start: 7.5,  f1: null, f2: null, waga: 'hantla' },
  row:        { n: 'Wiosłowanie hantlem (single-arm dumbbell row)',  start: 10,   f1: null, f2: null, waga: 'hantla' },
  rfess:      { n: 'Bułgarski przysiad (Bulgarian split squat)',   start: 20,   f1: null, f2: null, waga: 'rece' },
  rdl:        { n: 'RDL jednonóż (single-leg RDL)',         start: 16,   f1: null, f2: null, waga: 'hantla' },
  squat:      { n: 'Przysiad goblet (goblet squat)',      start: 20,   f1: null, f2: null, waga: 'goblet' },
  lunge:      { n: 'Zakroki (lunges)',              start: 20,   f1: null, f2: null, waga: 'rece' },
  stepup:     { n: 'Wykrok na skrzynię (step-up)',              start: null, f1: null, f2: null, waga: 'rece' },
  pullup:     { n: 'Podciąganie / drążek (pull-up / lat pulldown)', start: null, f1: null, f2: null, waga: 'stos' },
  boxjump:    { n: 'Wskoki na skrzynię (box jumps)', start: 75, f1: null, f2: null, tryb: 'wysokosc' },
  schody:     { n: 'Schody / stepper (stair climber)',     start: 25,   f1: null, f2: null, tryb: 'czas' },
  bieznia:    { n: 'Bieżnia pod górę (incline treadmill walk)',       start: 20,   f1: null, f2: null, tryb: 'czas' },
  marsz:      { n: 'Marsz / podejście (hike)',    start: 45,   f1: null, f2: null, tryb: 'czas' },
  plecak:     { n: 'Podejście z plecakiem (rucking / weighted hike)', start: 40,  f1: null, f2: null, tryb: 'czas' },
};

const TESTY = [];
