/* ---------------------------------------------------------------
   data.js — plan treningowy: sesje, ćwiczenia, fazy
   Edytuj ten plik, jeśli chcesz zmienić plan. Reszta apki się dostosuje.
----------------------------------------------------------------*/

const APP = { wersja: '1.2.8', data: '2026-09-06' };

const PLAN_START = '2026-08-18'; // poniedziałek startu programu

const FAZY = [
  { od: 1,  do: 3,  nazwa: 'Faza 0 — Kalibracja',
    opis: 'Serie 2–3 powt. przed upadkiem. Plyometria: tylko lądowania i pogo hops. Kalorie 2600.' },
  { od: 4,  do: 11, nazwa: 'Faza 1 — Baza siły + redukcja',
    opis: 'Kalorie 2500 średnio. Plyometria w pełni, maks. 40 kontaktów na sesję. Tydzień 8 = deload.' },
  { od: 12, do: 19, nazwa: 'Faza 2 — Konwersja na moc',
    opis: 'Kalorie 2650. Trap bar 4×3 z maksymalną prędkością. Depth jumps. Tydzień 16 = deload.' },
  { od: 20, do: 99, nazwa: 'Faza 3 — Podtrzymanie w sezonie',
    opis: '2 sesje siłowe + D. Objętość ~60% fazy 2, intensywność bez zmian. Kalorie ~2900.' },
];

const DELOADY = [8, 16];

/* Sesje.
   item: {
     n: nazwa, d: dawka wyświetlana, u: uwaga,
     lift:   klucz loga ciężarów,
     krok:   o ile kg podbić przy progresji,
     serie:  ile serii trzeba zaliczyć,
     zakres: [min, max] powtórzeń — podwójna progresja:
             najpierw dochodzisz do max powtórzeń we WSZYSTKICH seriach,
             dopiero potem apka podbija ciężar i wracasz do min,
     plyo:   true → ukrywane przy żółtym świetle
     yt:     opcjonalny link YouTube (technika)
     poziom: 'min'|'full' (brak = zawsze; 'full' = tylko tryb FULL)
     moc:    0|1|2 — rotacja mocy w C (widać tylko aktualny indeks)
   }
*/
const SESJE = {
  A: {
    nazwa: 'A — Dolne / moc pionowa', dur: '~40–45 min', durMin: '~40–45 min', durFull: '~50–60 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6–8 min', items: [
        { n: 'Mobilność biodra + mostek + odwodzenie (noga na bok)', d: '6–8 min łącznie',
          u: 'Krótki blok: mobilność biodra, mostek, odwodzenie z gumą (noga na bok), zginacz w półklęku, dead bug, lekkie pogo. Bez rozbijania na osobne serie.' },
      ]},
      { t: 'Moc · przerwy 90–120 s', items: [
        { n: 'Wskoki na skrzynię (box jumps)', d: '3 × 3', u: 'Stałe 3×3. Zejście krokiem. Po czystym 3×3 → +5 cm. Start 75 cm.', plyo: true, lift: 'boxjump', tryb: 'wysokosc', krok: 5, serie: 3, zakres: [3, 3], startCm: 75 },
      ]},
      { t: 'Siła · przerwy 2–3 min', items: [
        { n: 'Martwy ciąg z trap barem (trap bar deadlift)', d: '3 × 4–5', u: 'Uchwyty wysokie, plecy neutralne', lift: 'trapbar', krok: 5, serie: 3, zakres: [4, 5] },
        { n: 'Hip thrust ze sztangą (barbell hip thrust)', d: '3 × 6–8', u: 'Podbródek do klatki, żebra w dół, bez przeprostu', lift: 'hipthrust', krok: 5, serie: 3, zakres: [6, 8] },
        { n: 'Bułgarski przysiad z hantlami (Bulgarian split squat / RFESS)', d: '2 × 6–8 na każdą nogę', u: '2 serie × 6–8 na lewą i na prawą.', lift: 'rfess', krok: 2.5, serie: 2, zakres: [6, 8] },
      ]},
      { t: 'Core', items: [
        { n: 'Pallof press albo dead bug — wybierz 1', d: '2 serie', u: 'Jedno z dwóch: Pallof albo dead bug. Miednica stabilna.' },
      ]},
      { t: 'Dodatki FULL', items: [
        { n: 'Uginanie nóg albo RDL jednonóż (leg curl / single-leg RDL)', d: '2 × 8–10', u: 'Hamstring — wybierz wariant. Na każdą nogę przy RDL.', poziom: 'full', lift: 'rdl', krok: 2.5, serie: 2, zakres: [8, 10] },
        { n: 'Wspięcia na palce jednonóż (single-leg calf raise)', d: '2 × 10–15 na każdą nogę', poziom: 'full' },
      ]},
    ],
  },

  B: {
    nazwa: 'B — Góra / core / ramiona', dur: '~40–45 min', durMin: '~40–45 min', durFull: '~50–55 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 5–6 min', items: [
        { n: 'Face pull + rotacja zewnętrzna + pull-apart', d: '5–6 min', u: 'Krótka aktywacja barków — bez rozbudowy na osobne bloki.' },
      ]},
      { t: 'Główne · przerwy 2 min', items: [
        { n: 'Wyciskanie hantli na ławce (dumbbell bench press)', d: '3 × 8–10', lift: 'benchdb', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'Podciąganie / ściąganie drążka (pull-up / lat pulldown)', d: '3 × 8–10', lift: 'pullup', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'Wyciskanie hantli nad głowę, siedząc (seated DB OHP)', d: '3 × 8–10', u: 'Z oparciem — nie stojąc', lift: 'ohp', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'Wiosłowanie hantlem (single-arm dumbbell row)', d: '3 × 8–10 na każdą stronę', lift: 'row', krok: 2.5, serie: 3, zakres: [8, 10] },
      ]},
      { t: 'Dodatki FULL · barki / ramiona / core', items: [
        { n: 'Wznosy bokiem (lateral raises)', d: '2 × 12–15', poziom: 'full' },
        { n: 'Uginanie + wyprosty (curls + triceps pushdown)', d: '2 × 10–12', poziom: 'full' },
        { n: 'Deska / deska boczna', d: '2 serie', poziom: 'full' },
      ]},
    ],
  },

  C: {
    nazwa: 'C — Atletyczny FBW', dur: '~45–50 min', durMin: '~45–50 min', durFull: '~55–60 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6–8 min', items: [
        { n: 'Mobilność + aktywacja bioder + skipy', d: '6–8 min', u: 'Kobra/pozycja dziecka, odwodzenie + monster walk, skipy / shuffle, 90/90 — krótko.' },
      ]},
      { t: 'Moc · 1 ćwiczenie (rotacja) · przerwy 90 s', items: [
        { n: 'Skok w dal z miejsca (standing broad jump)', d: '3 serie jakościowe', u: 'Mierz odległość. Rotacja mocy — tylko to ćwiczenie dziś.', plyo: true, moc: 0 },
        { n: 'Skok boczny + lądowanie (lateral bound + stick)', d: '3 serie jakościowe', u: 'Na każdą stronę, hold 2 s. Rotacja mocy.', plyo: true, moc: 1, yt: 'https://www.youtube.com/shorts/IyMLKJX4MRU' },
        { n: 'Rzut piłką rotacyjnie (rotational med-ball throw)', d: '3 serie jakościowe', u: 'Rotacja z bioder i klatki, nie z lędźwi. Rotacja mocy.', moc: 2, yt: 'https://www.youtube.com/shorts/02c2YLgF8iE' },
        { n: 'Slam piłką o podłoże (medicine ball slam)', d: '2–3 × 4', u: 'Tylko w FULL — dołożenie do aktualnej mocy.', poziom: 'full' },
      ]},
      { t: 'Siła · przerwy 90 s', items: [
        { n: 'Przysiad goblet / przedni (goblet / front squat)', d: '3 × 6–8', u: 'Bez sztangi na plecach w fazie 0–1', lift: 'squat', krok: 2.5, serie: 3, zakres: [6, 8] },
        { n: 'Zakroki tyłem z hantlami (reverse lunges)', d: '2 × 8 na każdą nogę', lift: 'lunge', krok: 2.5, serie: 2, zakres: [8, 8] },
        { n: 'Pompki / wyciskanie (łatwiejszy wariant)', d: '2–3 × 8–12', u: 'Pompki z nogami w górze, klasyczne albo hantle — wybierz wariant, który domkniesz technicznie.' },
        { n: 'Spacer farmera (farmer’s walk)', d: '2 przejścia' },
        { n: 'Wykrok na skrzynię (step-up)', d: '2 × 8 na każdą nogę', poziom: 'full', lift: 'stepup', krok: 2.5, serie: 2, zakres: [8, 8] },
      ]},
      { t: 'Core FULL', items: [
        { n: 'Dead bug', d: '2 serie', poziom: 'full' },
        { n: 'Pallof press z krokiem w bok', d: '2 × na każdą stronę', poziom: 'full' },
      ]},
    ],
  },

  D: {
    nazwa: 'D — Rehab / mobilność', dur: '~20 min', typ: 'rehab',
    bloki: [
      { t: 'Sesja w domu', items: [
        { n: 'Kobra / wyprost leżąc (McKenzie press-up)', d: '15 powt.' },
        { n: 'Rozciąganie zginacza biodra w półklęku (half-kneeling hip flexor stretch)', d: '2 × 45 s na każdą stronę', u: 'Priorytet przy przodopochyleniu' },
        { n: 'Rozciąganie prostego uda leżąc bokiem (side-lying quad stretch)', d: '2 × 45 s na każdą stronę' },
        { n: 'Przejścia biodrami 90/90 + hold (90/90 hip switches + hold)', d: '8 przejść + 30 s hold na stronę' },
        { n: 'Open book (otwarta książka — rotacja tułowia leżąc)', d: '10 na każdą stronę' },
        { n: 'Pies z głową w dół + przyciąganie kolana (downward dog knee drive)', d: '10 na każdą stronę' },
        { n: 'Ukłon japoński trójkierunkowy (child’s pose, 3 directions)', d: '1 min × 3' },
        { n: 'Dead bug (martwy robak)', d: '3 × 10 na każdą stronę' },
        { n: 'Deska boczna z zatrzymaniem 3 s (side plank with 3 s hold)', d: '3 × 8 na każdą stronę' },
        { n: 'Odwodzenie + kickback z gumą (band abduction + glute kickback)', d: '2 × 15 na każdą stronę' },
      ]},
    ],
  },

  VB: {
    nazwa: 'Siatkówka', dur: 'rozgrzewka + schłodzenie', typ: 'sport', format: 'fazy',
    fazy: [
      { t: 'Rozruszanie', czas: '2–3 min', tekst: 'Lekki trucht, shuffle i karioka po boisku. Celem jest podnieść temperaturę i przypomnieć stopom kierunki ruchu przed skokami.' },
      { t: 'Aktywacja', czas: '3–4 min', tekst: 'Najpierw biodra (monster walk, mostek), potem barki (pull-apart + rotacja zewnętrzna). Taka kolejność: stabilne biodro pod spodem, potem ramię do ataku.' },
      { t: 'Przygotowanie pod grę', czas: '3–4 min', tekst: 'Pogo → skoki narastająco → 2–3 approach bez piłki. Bez liczenia serii jak na siłowni — chodzi o czyste lądowanie i gotowość do pierwszego bloku.' },
      { t: 'Po grze — schłodzenie', czas: '6–8 min', tekst: 'Marsz, roller (łydki, ud, pośladek, piersiowy) i 2–3 stretchy: zginacz, klatka, łydka. Krótko, bez checklisty ćwiczeń.' },
    ],
    bloki: [],
  },

  PADEL: {
    nazwa: 'Padel', dur: 'rozgrzewka + schłodzenie', typ: 'sport', format: 'fazy',
    fazy: [
      { t: 'Rozruszanie', czas: '2 min', tekst: 'Trucht po korcie, shuffle, cofanie tyłem do szyby, karioka. Padel to dużo hamowań bocznych — rozruszaj stopy we wszystkich kierunkach.' },
      { t: 'Aktywacja', czas: '3 min', tekst: 'Pachwina i biodra (wymachy w bok, monster walk), potem bark i nadgarstek (pull-apart, rotacja, zgięcie/wyprost z gumą). Najpierw noga do dojścia, potem ramię do uderzenia.' },
      { t: 'Przygotowanie pod grę', czas: '2–3 min', tekst: 'Wypad w bok → bound + stick → krótki sprint z ostrym stopem → shadow swings. Bez rozpisywania serii — czuj hamowanie i rotację tułowia.' },
      { t: 'Po grze — schłodzenie', czas: '6–8 min', tekst: 'Marsz, roller (łydki, ud, pośladek, przywodziciele — obowiązkowo po padlu) i stretch: zginacz, motyl, łydka. Krótko i konkretnie.' },
    ],
    bloki: [],
  },

  REST: {
    nazwa: 'Dzień wolny', dur: 'regeneracja', typ: 'rest',
    bloki: [],
  },
};

const TYDZIEN = { 1: 'A', 2: 'VB', 3: 'B', 4: 'VB', 5: 'C', 6: 'PADEL', 0: 'REST' };

/* Ile razy w ruchomym oknie 7 dni. To steruje sugestiami. Suma 6 → zostaje slot na rest. */
const CELE_TYG = { A: 1, B: 1, C: 1, VB: 2, PADEL: 1 };

/* Jednostki liczone jako "dzień skoków" — nigdy dwa z rzędu. */
const SKOKI = ['A', 'C', 'VB'];

/* Dni wysokiego obciążenia — padel nie: da się grać po siłowni. */
const CIEZKIE = ['A', 'C', 'VB'];

/* Hamulce regeneracji: tylko sugestia, nie blokada chipów. */
const MAX_TRENING_Z_RZEDU = 3;
const MAX_CIEZKIE_Z_RZEDU = 2;
const MAX_SESJE_7 = 6;

/* Priorytet, gdy kilka jednostek ma zaległość. D i REST nie są celami tygodnia. */
const PRIORYTET = ['A', 'C', 'VB', 'B', 'PADEL'];

/* Ćwiczenia siłowe — punkty startowe i cele (do ekranu Postęp) */
const LIFTY = {
  trapbar:   { n: 'Martwy ciąg trap bar (trap bar deadlift)', start: null, f1: 110, f2: 130 },
  hipthrust: { n: 'Hip thrust (barbell hip thrust)',           start: 15,   f1: 90,  f2: 120 },
  benchdb:   { n: 'Wyciskanie hantli (dumbbell bench press)',    start: 22.5, f1: 27.5, f2: 30 },
  row:       { n: 'Wiosłowanie hantlem (single-arm dumbbell row)',  start: 20,   f1: 27.5, f2: 32.5 },
  rfess:     { n: 'Bułgarski przysiad (Bulgarian split squat)',   start: null, f1: 20,  f2: 26 },
  rdl:       { n: 'RDL jednonóż (single-leg RDL)',         start: null, f1: null, f2: null },
  squat:     { n: 'Przysiad goblet (goblet squat)',      start: null, f1: null, f2: null },
  lunge:     { n: 'Zakroki (lunges)',              start: 16,   f1: null, f2: null },
  stepup:    { n: 'Wykrok na skrzynię (step-up)', start: null, f1: null, f2: null },
  ohp:       { n: 'Wyciskanie nad głowę (overhead press)', start: null, f1: null, f2: null },
  pullup:    { n: 'Podciąganie / drążek (pull-up / lat pulldown)', start: 55,   f1: null, f2: null },
  boxjump:   { n: 'Wskoki na skrzynię (box jumps)', start: 75, f1: null, f2: null, tryb: 'wysokosc' },
};

const TESTY = [
  { k: 'jump',    n: 'Wyskok dosiężny z rozbiegu (approach jump reach)', j: 'cm', cel: '+4–7 cm' },
  { k: 'cmj',     n: 'CMJ — wyskok z miejsca (countermovement jump)',     j: 'cm', cel: '+3–5 cm' },
  { k: 'broad',   n: 'Skok w dal z miejsca (standing broad jump)',       j: 'cm', cel: '+10–20 cm' },
  { k: 'plankL',  n: 'Deska boczna — lewa (side plank L)',          j: 's',  cel: '90 s' },
  { k: 'plankR',  n: 'Deska boczna — prawa (side plank R)',         j: 's',  cel: '90 s' },
  { k: 'ball',    n: 'Deska na piłce (stability ball plank)',             j: 's',  cel: '90 s' },
];
