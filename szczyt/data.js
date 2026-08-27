/* ---------------------------------------------------------------
   data.js — Szczyt (trening Olgi): sesje, ćwiczenia, fazy
----------------------------------------------------------------*/

const APP = { wersja: '1.0.4', data: '2026-08-27' };

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
   item: { n, d, u?, lift?, krok?, serie?, zakres?, plyo? }
   extra: true → tracker „Dodatkowo dziś”, poza CELE_TYG i chipami głównymi
*/
const SESJE = {
  A: {
    nazwa: 'A — Dolne / moc', dur: '~70 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 8–10 min', items: [
        { n: 'Kobra / wyprost leżąc (McKenzie press-up)', d: '10 powt.' },
        { n: 'Odwodzenie biodra z gumą, stojąc (standing band hip abduction)', d: '2 × 15 na każdą stronę', u: 'Aktywacja pośladka średniego' },
        { n: 'Mostek biodrowy z gumą (banded glute bridge)', d: '2 × 12' },
        { n: 'Rozciąganie zginacza biodra w półklęku (half-kneeling hip flexor stretch)', d: '2 × 30 s na każdą stronę', u: 'Podwiń miednicę, spinaj pośladek nogi tylnej' },
        { n: 'Dead bug (martwy robak)', d: '2 × 8 na każdą stronę', u: 'Lędźwie wklejone w podłogę' },
        { n: 'Pogo hops (sprężyste podskoki ze sztywnymi kolanami)', d: '2 × 20', u: 'Kolana prawie sztywne, praca ze stopy' },
      ]},
      { t: 'Blok mocy · przerwy 90–120 s', items: [
        { n: 'Wskoki na skrzynię (box jumps)', d: '4 × 3', u: 'Zejście krokiem, nigdy zeskok', plyo: true },
        { n: 'Zeskok z lądowaniem (depth drop / stick landing)', d: '3 × 4', u: 'Skrzynia 30–40 cm, cichy lądunek, hold 2 s. Od tyg. 4', plyo: true },
      ]},
      { t: 'Siła · przerwy 2–3 min', items: [
        { n: 'Martwy ciąg z trap barem (trap bar deadlift)', d: '4 × 5', u: 'Uchwyty wysokie, plecy neutralne', lift: 'trapbar', krok: 5, serie: 4, zakres: [5, 6] },
        { n: 'Hip thrust ze sztangą (barbell hip thrust)', d: '4 × 8', u: 'Podbródek do klatki, żebra w dół, bez przeprostu', lift: 'hipthrust', krok: 5, serie: 4, zakres: [8, 10] },
        { n: 'Bułgarski przysiad z hantlami (Bulgarian split squat / RFESS)', d: '3 × 8 na każdą nogę', u: '3 serie × 8 na lewą i 8 na prawą w każdej serii. Tułów lekko pochylony do przodu.', lift: 'rfess', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'RDL jednonóż / uginanie nóg (single-leg RDL / leg curl)', d: '3 × 8 na każdą nogę', u: '3 × 8 na każdą nogę (nie łącznie). Dwugłowe — ochrona kolana i prędkość.', lift: 'rdl', krok: 2.5, serie: 3, zakres: [8, 10] },
      ]},
      { t: 'Akcesoria · superserie, 60 s', items: [
        { n: 'Wspięcia na palce jednonóż (single-leg calf raise)', d: '3 × 12 na każdą nogę + izo 30 s' },
        { n: 'Pallof press (wyciskanie antyrotacyjne)', d: '3 × 12 na każdą stronę', u: 'Miednica nieruchoma' },
        { n: 'Copenhagen plank (deska kopenhaska na przywodziciele)', d: '3 × 20 s na każdą stronę' },
        { n: 'Wznosy kolan w zwisie (hanging knee raises)', d: '3 × 10', u: 'Bez szarpania' },
      ]},
    ],
  },

  B: {
    nazwa: 'B — Góra light + glute', dur: '~60 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6 min', items: [
        { n: 'Face pull (przyciąganie linki do twarzy)', d: '2 × 15' },
        { n: 'Rotacja zewnętrzna barku z gumą (band external rotation)', d: '2 × 15 na każdą stronę', u: 'Łokieć przy tułowiu' },
        { n: 'Band pull-apart (rozciąganie gumy przed sobą)', d: '2 × 20' },
        { n: 'Open book (otwarta książka — rotacja tułowia leżąc)', d: '2 × 8 na każdą stronę' },
      ]},
      { t: 'Góra · przerwy 2 min', items: [
        { n: 'Wyciskanie hantli na ławce (dumbbell bench press)', d: '4 × 8', lift: 'benchdb', krok: 2.5, serie: 4, zakres: [8, 10] },
        { n: 'Podciąganie / ściąganie drążka (pull-up / lat pulldown)', d: '4 × 8', lift: 'pullup', krok: 2.5, serie: 4, zakres: [8, 10] },
        { n: 'Wiosłowanie hantlem (single-arm dumbbell row)', d: '3 × 10 na każdą stronę', u: '3 × 10 na każdą stronę.', lift: 'row', krok: 2.5, serie: 3, zakres: [10, 12] },
      ]},
      { t: 'Pośladki · 60–90 s', items: [
        { n: 'Hip thrust / mostek na wyciągu (cable / machine hip thrust)', d: '3 × 12', u: 'Pełne spięcie u góry', lift: 'hipthrustb', krok: 5, serie: 3, zakres: [10, 12] },
        { n: 'Kickback pośladka na wyciągu (cable glute kickback)', d: '3 × 12 na każdą stronę', u: '3 × 12 na każdą stronę. Bez przeprostu lędźwi.' },
        { n: 'Odwodzenie biodra — maszyna / guma (hip abduction machine / band)', d: '3 × 15', u: 'Kontrola, bez szarpania' },
        { n: 'Frog pump / mostek izometryczny (frog pumps)', d: '2 × 20', u: 'Finisz — spięcie 1 s u góry' },
      ]},
      { t: 'Core', items: [
        { n: 'Deska na piłce, przedramiona (stability ball plank)', d: '3 × 45–60 s' },
        { n: 'Deska boczna z uniesieniem biodra (side plank hip dips/lifts)', d: '3 × 10 na każdą stronę', u: 'Hold 3 s w górze' },
      ]},
    ],
  },

  C: {
    nazwa: 'C — Atletyczny + nogi', dur: '~65 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 8 min', items: [
        { n: 'Kobra + pozycja dziecka (McKenzie + child’s pose)', d: '10 + 1 min' },
        { n: 'Odwodzenie z gumą + monster walk (band abduction + monster walk)', d: '2 × 15 na każdą stronę' },
        { n: 'Skipy + krok odstawno-dostawny (A-skips + side shuffle)', d: '3 × 15 m' },
        { n: 'Przejścia biodrami 90/90 (90/90 hip switches)', d: '2 × 8 na każdą stronę' },
      ]},
      { t: 'Blok mocy · przerwy 90 s', items: [
        { n: 'Skok w dal z miejsca (standing broad jump)', d: '4 × 3', u: 'Mierz odległość', plyo: true },
        { n: 'Skok boczny + lądowanie na jednej nodze (lateral bound + single-leg stick)', d: '3 × 4 na każdą stronę', u: 'Na każdą stronę osobno, hold 2 s.', plyo: true },
        { n: 'Rzut piłką rotacyjnie o ścianę (rotational med-ball throw)', d: '3 × 6 na każdą stronę', u: 'Rotacja z bioder i klatki, nie z lędźwi' },
        { n: 'Slam piłką o podłoże (medicine ball slam)', d: '3 × 8' },
      ]},
      { t: 'Siła · przerwy 90 s', items: [
        { n: 'Przysiad goblet / przedni (goblet / front squat)', d: '3 × 8', u: 'Bez sztangi na plecach w fazie 0–1', lift: 'squat', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'Zakroki z hantlami (walking/reverse lunges)', d: '3 × 10 na każdą nogę', u: '3 × 10 na każdą nogę w każdej serii.', lift: 'lunge', krok: 2.5, serie: 3, zakres: [10, 12] },
        { n: 'Wykrok na skrzynię (step-up)', d: '3 × 8 na każdą nogę', u: '3 × 8 na każdą nogę. Cała stopa na skrzyni, bez odbicia.', lift: 'stepup', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'Pompki / pompki na kolanach (push-ups / knee push-ups)', d: '2 × 10', u: 'Technicznie, bez maxów' },
      ]},
      { t: 'Core i finisz', items: [
        { n: 'Dead bug z gumą (banded dead bug)', d: '3 × 10 na każdą stronę' },
        { n: 'Pallof press z krokiem w bok (Pallof press with lateral step)', d: '3 × 8 na każdą stronę' },
        { n: 'Spacer farmera / z obciążeniem (farmer’s walk)', d: '3 × 40 m', u: 'Symulacja plecaka — tułów prosty' },
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
const TYDZIEN = { 1: 'A', 2: 'B', 3: 'GORY', 4: 'C', 5: 'REST', 6: 'REST', 0: 'REST' };

const CELE_TYG = { A: 1, B: 1, C: 1, GORY: 1 };

const SKOKI = ['A', 'C'];
const CIEZKIE = ['A', 'C'];

const MAX_TRENING_Z_RZEDU = 3;
const MAX_CIEZKIE_Z_RZEDU = 2;
const MAX_SESJE_7 = 4;

const PRIORYTET = ['A', 'C', 'B', 'GORY'];

const LIFTY = {
  trapbar:    { n: 'Martwy ciąg trap bar (trap bar deadlift)', start: null, f1: null, f2: null },
  hipthrust:  { n: 'Hip thrust (barbell hip thrust)',           start: null, f1: null, f2: null },
  hipthrustb: { n: 'Hip thrust — sesja B (cable/machine hip thrust)',  start: null, f1: null, f2: null },
  benchdb:    { n: 'Wyciskanie hantli (dumbbell bench press)',    start: null, f1: null, f2: null },
  row:        { n: 'Wiosłowanie hantlem (single-arm dumbbell row)',  start: null, f1: null, f2: null },
  rfess:      { n: 'Bułgarski przysiad (Bulgarian split squat)',   start: null, f1: null, f2: null },
  rdl:        { n: 'RDL jednonóż (single-leg RDL)',         start: null, f1: null, f2: null },
  squat:      { n: 'Przysiad goblet (goblet squat)',      start: null, f1: null, f2: null },
  lunge:      { n: 'Zakroki (lunges)',              start: null, f1: null, f2: null },
  stepup:     { n: 'Wykrok na skrzynię (step-up)',              start: null, f1: null, f2: null },
  pullup:     { n: 'Podciąganie / drążek (pull-up / lat pulldown)', start: null, f1: null, f2: null },
  schody:     { n: 'Schody / stepper (stair climber)',     start: 25,   f1: null, f2: null, tryb: 'czas' },
  bieznia:    { n: 'Bieżnia pod górę (incline treadmill walk)',       start: 20,   f1: null, f2: null, tryb: 'czas' },
  marsz:      { n: 'Marsz / podejście (hike)',    start: 45,   f1: null, f2: null, tryb: 'czas' },
  plecak:     { n: 'Podejście z plecakiem (rucking / weighted hike)', start: 40,  f1: null, f2: null, tryb: 'czas' },
};

const TESTY = [];
