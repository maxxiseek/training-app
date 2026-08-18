/* ---------------------------------------------------------------
   data.js — plan treningowy: sesje, ćwiczenia, fazy
   Edytuj ten plik, jeśli chcesz zmienić plan. Reszta apki się dostosuje.
----------------------------------------------------------------*/

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
   item: { n: nazwa, d: dawka, u: uwaga, lift: klucz-loga, krok: przyrost kg, cel: górny próg powt., plyo: true }
   plyo:true  → ukrywane przy żółtym świetle
*/
const SESJE = {
  A: {
    nazwa: 'A — Dolne / moc pionowa', dur: '~70 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 8–10 min', items: [
        { n: 'Kobra (McKenzie)', d: '10 powt.' },
        { n: 'Odwodzenie nogi z gumą, stojąc', d: '2 × 15/str', u: 'Aktywacja pośladka średniego — polisa na SKB' },
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
        { n: 'Martwy ciąg z trap barem', d: '4 × 5', u: 'Uchwyty wysokie, plecy neutralne', lift: 'trapbar', krok: 5, cel: 5 },
        { n: 'Hip thrust ze sztangą', d: '4 × 8', u: 'Podbródek do klatki, żebra w dół, bez przeprostu', lift: 'hipthrust', krok: 5, cel: 8 },
        { n: 'Bułgarski przysiad z hantlami', d: '3 × 8/nogę', u: 'Tułów lekko pochylony do przodu', lift: 'rfess', krok: 2.5, cel: 8 },
        { n: 'RDL jednonóż / uginanie nóg', d: '3 × 8', u: 'Dwugłowe — ochrona kolana i prędkość', lift: 'rdl', krok: 2.5, cel: 8 },
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
    nazwa: 'B — Góra / core / ramiona', dur: '~60 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6 min', items: [
        { n: 'Face pull', d: '2 × 15' },
        { n: 'Rotacja zewnętrzna barku z gumą', d: '2 × 15/str', u: 'Łokieć przy tułowiu' },
        { n: 'Band pull-apart', d: '2 × 20' },
        { n: 'Open book', d: '2 × 8/str' },
      ]},
      { t: 'Główne · przerwy 2 min', items: [
        { n: 'Wyciskanie hantli na ławce', d: '4 × 8', lift: 'benchdb', krok: 2.5, cel: 10 },
        { n: 'Podciąganie / ściąganie drążka', d: '4 × 8', lift: 'pullup', krok: 2.5, cel: 10 },
        { n: 'Wyciskanie hantli nad głowę, siedząc', d: '3 × 10', u: 'Z oparciem — nie stojąc', lift: 'ohp', krok: 2.5, cel: 10 },
        { n: 'Wiosłowanie hantlem', d: '3 × 10/str', lift: 'row', krok: 2.5, cel: 12 },
      ]},
      { t: 'Ramiona i barki · 60 s', items: [
        { n: 'Wznosy bokiem', d: '3 × 15' },
        { n: 'Face pull', d: '3 × 20' },
        { n: 'Uginanie hantli + młotkowe', d: '3 × 12' },
        { n: 'Wyprosty na wyciągu', d: '3 × 15' },
      ]},
      { t: 'Core', items: [
        { n: 'Plank na piłce, przedramiona', d: '3 × 45–60 s' },
        { n: 'Side plank z uniesieniem biodra', d: '3 × 10/str', u: 'Hold 3 s w górze' },
        { n: 'Suitcase carry', d: '3 × 30 m/str', u: 'Nie przechylaj się' },
      ]},
    ],
  },

  C: {
    nazwa: 'C — Atletyczny FBW', dur: '~65 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 8 min', items: [
        { n: 'Kobra + child’s pose', d: '10 + 1 min' },
        { n: 'Odwodzenie z gumą + monster walk', d: '2 × 15/str' },
        { n: 'Skipy + krok odstawno-dostawny', d: '3 × 15 m' },
        { n: '90/90 przejścia biodrami', d: '2 × 8/str' },
      ]},
      { t: 'Blok mocy · przerwy 90 s', items: [
        { n: 'Skok w dal z miejsca', d: '4 × 3', u: 'Mierz odległość', plyo: true },
        { n: 'Skok boczny + lądowanie na jednej nodze', d: '3 × 4/str', u: 'Hold 2 s. Kluczowe pod padel i SKB', plyo: true },
        { n: 'Rzut piłką rotacyjnie o ścianę', d: '3 × 6/str', u: 'Rotacja z bioder i klatki, nie z lędźwi' },
        { n: 'Slam piłką o podłoże', d: '3 × 8' },
      ]},
      { t: 'Siła · przerwy 90 s', items: [
        { n: 'Przysiad goblet / przedni', d: '3 × 8', u: 'Bez sztangi na plecach w fazie 0–1', lift: 'squat', krok: 2.5, cel: 8 },
        { n: 'Zakroki z hantlami po bokach', d: '3 × 10/nogę', lift: 'lunge', krok: 2.5, cel: 10 },
        { n: 'Podciąganie', d: '3 × max' },
        { n: 'Pompki z podwyższeniem nóg', d: '3 × 12' },
      ]},
      { t: 'Core i finisz', items: [
        { n: 'Dead bug z gumą', d: '3 × 10/str' },
        { n: 'Pallof press z krokiem w bok', d: '3 × 8/str' },
        { n: 'Farmer’s walk', d: '3 × 40 m' },
      ]},
    ],
  },

  D: {
    nazwa: 'D — Rehab / mobilność', dur: '~20 min', typ: 'rehab',
    bloki: [
      { t: 'Sesja w domu', items: [
        { n: 'Kobra (McKenzie)', d: '15 powt.' },
        { n: 'Zginacz biodra w półklęku', d: '2 × 45 s/str', u: 'Priorytet przy przodopochyleniu' },
        { n: 'Prosty uda (leżąc bokiem)', d: '2 × 45 s/str' },
        { n: '90/90 przejścia + hold', d: '8 przejść + 30 s/str' },
        { n: 'Open book', d: '10/str' },
        { n: 'Pies z głową w dół z przyciąganiem kolana', d: '10/str' },
        { n: 'Ukłon japoński trójkierunkowy', d: '1 min × 3' },
        { n: 'Dead bug', d: '3 × 10/str' },
        { n: 'Side plank z zatrzymaniem 3 s', d: '3 × 8/str' },
        { n: 'Odwodzenie + kickback z gumą', d: '2 × 15/str' },
      ]},
    ],
  },

  VB: {
    nazwa: 'Siatkówka', dur: 'rozgrzewka + schłodzenie', typ: 'sport',
    bloki: [
      { t: 'Rozgrzewka 1 · Bieganie — 2,5 min', items: [
        { n: 'Trucht wzdłuż boiska', d: '2× tam i z powrotem' },
        { n: 'Krok odstawno-dostawny', d: '2× w każdą stronę' },
        { n: 'Przeplatanka (karioka)', d: '2× w każdą stronę' },
        { n: 'Skipy A + pięty do pośladków', d: '2× tam i z powrotem' },
      ]},
      { t: 'Rozgrzewka 2 · Mobilność — 3 min', items: [
        { n: 'Najlepsze rozciąganie świata', d: '6/str', u: 'Ręka po stronie nogi wykrocznej idzie w górę' },
        { n: 'Wymachy nogą przód–tył', d: '10/str' },
        { n: 'Wymachy nogą w bok', d: '10/str' },
        { n: 'Kołyska (leg cradle) w marszu', d: '6/str' },
        { n: 'Krążenia ramion + rotacje tułowia', d: '10 + 10' },
      ]},
      { t: 'Rozgrzewka 3 · Aktywacja z gumą — 2,5 min', items: [
        { n: 'Monster walk z gumą', d: '15 kroków × 2 w każdą stronę', u: 'Ma piec po zewnętrznej stronie biodra' },
        { n: 'Mostek biodrowy', d: '15' },
        { n: 'Półklęk: podwinięcie miednicy + spięcie pośladka', d: '5 × 5 s/str' },
        { n: 'Band pull-apart + rotacja zewnętrzna barku', d: '15 + 12/str' },
      ]},
      { t: 'Rozgrzewka 4 · Skakanie — 3 min', items: [
        { n: 'Pogo hops', d: '2 × 15' },
        { n: 'Skoki obunóż narastająco', d: '3× lekko / 3× średnio / 3× mocno' },
        { n: 'Rozbieg z wyskokiem BEZ piłki', d: '3: 60% → 80% → 95%' },
        { n: 'Zamach ramieniem jak przy ataku', d: '10 na sucho + 10 z gumą' },
      ]},
      { t: 'Gra', items: [
        { n: 'Pierwsze ataki na 70–80%', d: 'pełna moc po 6–8 uderzeniach' },
        { n: 'Serwis z połowy boiska', d: '3–4 przed linią końcową' },
      ]},
      { t: 'Schłodzenie — 8 min', items: [
        { n: 'Marsz / luźne chodzenie', d: '2 min' },
        { n: 'Roller: łydki', d: '30 s/str' },
        { n: 'Roller: czworogłowy', d: '30 s/str' },
        { n: 'Roller: pośladek', d: '45 s/str', u: 'Zatrzymaj się przed kością krzyżową' },
        { n: 'Roller: odcinek piersiowy w poprzek', d: '45 s', u: 'Nie niżej niż dolny kąt łopatek' },
        { n: 'Zginacz biodra w półklęku', d: '45 s/str' },
        { n: 'Prosty uda leżąc bokiem', d: '30 s/str' },
        { n: 'Klatka w futrynie', d: '30 s/str' },
        { n: 'Łydka o ścianę', d: '30 s prosta + 15 s ugięta /str' },
        { n: 'Kobra', d: '10 powt.' },
        { n: 'Ukłon japoński', d: '1 min' },
        { n: 'Zwis na drążku', d: '2 × 30 s' },
      ]},
    ],
  },

  PADEL: {
    nazwa: 'Padel', dur: 'rozgrzewka + schłodzenie', typ: 'sport',
    bloki: [
      { t: 'Rozgrzewka 1 · Bieganie — 2 min', items: [
        { n: 'Trucht po korcie', d: '60 s' },
        { n: 'Krok odstawno-dostawny', d: '2× w każdą stronę' },
        { n: 'Bieg tyłem', d: '2× długość kortu', u: 'Do szyby cofasz się cały mecz' },
        { n: 'Przeplatanka', d: '2× w każdą stronę' },
      ]},
      { t: 'Rozgrzewka 2 · Drabinka — 2 min', items: [
        { n: 'Bieg przez szczeble (1 stopa na kratkę)', d: '2 przejścia' },
        { n: 'Dwie stopy w kratce', d: '2 przejścia' },
        { n: 'In-in-out-out (icky shuffle)', d: '2 przejścia' },
        { n: 'Krok boczny przez drabinkę', d: '2× w każdą stronę' },
      ]},
      { t: 'Rozgrzewka 3 · Mobilność — 2 min', items: [
        { n: 'Najlepsze rozciąganie świata', d: '6/str' },
        { n: 'Wymachy nogą w bok', d: '12/str', u: 'Pachwina — ważniejsze niż w siatkówce' },
        { n: 'Wymachy nogą przód–tył', d: '10/str' },
        { n: 'Rotacje tułowia z rakietą', d: '15', u: 'Miednica względnie nieruchoma' },
        { n: 'Krążenia nadgarstka + otwieranie dłoni', d: '15 + 20' },
      ]},
      { t: 'Rozgrzewka 4 · Aktywacja z gumą — 2 min', items: [
        { n: 'Monster walk z gumą', d: '15 kroków × 2 w każdą stronę' },
        { n: 'Półklęk: podwinięcie miednicy + spięcie pośladka', d: '5 × 5 s/str' },
        { n: 'Band pull-apart + rotacja zewnętrzna barku', d: '15 + 12/str' },
        { n: 'Zgięcie i wyprost nadgarstka z gumą', d: '15 w każdą stronę', u: 'Profilaktyka łokcia' },
      ]},
      { t: 'Rozgrzewka 5 · Hamowanie — 2 min', items: [
        { n: 'Wypad w bok narastająco', d: '5/str, coraz głębiej' },
        { n: 'Skok boczny + lądowanie na jednej nodze', d: '3/str', u: 'Hold 2 s', plyo: true },
        { n: 'Sprint 4–5 m z ostrym zatrzymaniem', d: '4: 60→80→90→90%' },
        { n: 'Imitacja uderzeń bez piłki', d: '8 FH + 8 BH + 6 nad głową' },
      ]},
      { t: 'Schłodzenie — 8 min', items: [
        { n: 'Marsz', d: '2 min' },
        { n: 'Roller: łydki', d: '30 s/str' },
        { n: 'Roller: czworogłowy', d: '30 s/str' },
        { n: 'Roller: pośladek', d: '45 s/str', u: 'Przed kością krzyżową' },
        { n: 'Roller: przywodziciele', d: '30 s/str', u: 'Po padlu obowiązkowo' },
        { n: 'Roller: odcinek piersiowy', d: '45 s' },
        { n: 'Zginacz biodra w półklęku', d: '45 s/str' },
        { n: 'Przywodziciele — motyl', d: '45 s' },
        { n: 'Prosty uda leżąc bokiem', d: '30 s/str' },
        { n: 'Łydka o ścianę', d: '30 s + 15 s /str' },
        { n: 'Kobra', d: '10 powt.' },
        { n: 'Ukłon japoński', d: '1 min' },
      ]},
    ],
  },
};

/* Domyślny tydzień: 0 = niedziela */
const TYDZIEN = { 1: 'A', 2: 'VB', 3: 'B', 4: 'VB', 5: 'C', 6: 'PADEL', 0: 'D' };

/* Ćwiczenia siłowe — punkty startowe i cele (do ekranu Postęp) */
const LIFTY = {
  trapbar:   { n: 'Martwy ciąg trap bar', start: null, f1: 110, f2: 130 },
  hipthrust: { n: 'Hip thrust',           start: 15,   f1: 90,  f2: 120 },
  benchdb:   { n: 'Wyciskanie hantli',    start: 22.5, f1: 27.5, f2: 30 },
  row:       { n: 'Wiosłowanie hantlem',  start: 20,   f1: 27.5, f2: 32.5 },
  rfess:     { n: 'Bułgarski przysiad',   start: null, f1: 20,  f2: 26 },
  rdl:       { n: 'RDL jednonóż',         start: null, f1: null, f2: null },
  squat:     { n: 'Przysiad goblet',      start: null, f1: null, f2: null },
  lunge:     { n: 'Zakroki',              start: 16,   f1: null, f2: null },
  ohp:       { n: 'Wyciskanie nad głowę', start: null, f1: null, f2: null },
  pullup:    { n: 'Podciąganie / drążek', start: 55,   f1: null, f2: null },
};

const TESTY = [
  { k: 'jump',    n: 'Wyskok dosiężny z rozbiegu', j: 'cm', cel: '+4–7 cm' },
  { k: 'cmj',     n: 'CMJ — wyskok z miejsca',     j: 'cm', cel: '+3–5 cm' },
  { k: 'broad',   n: 'Skok w dal z miejsca',       j: 'cm', cel: '+10–20 cm' },
  { k: 'plankL',  n: 'Side plank — lewa',          j: 's',  cel: '90 s' },
  { k: 'plankR',  n: 'Side plank — prawa',         j: 's',  cel: '90 s' },
  { k: 'ball',    n: 'Plank na piłce',             j: 's',  cel: '90 s' },
];
