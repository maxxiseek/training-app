/* ---------------------------------------------------------------
   data.js — plan treningowy: sesje, ćwiczenia, fazy
   Edytuj ten plik, jeśli chcesz zmienić plan. Reszta apki się dostosuje.
----------------------------------------------------------------*/

const APP = { wersja: '1.2.6', data: '2026-08-27' };

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
   }
*/
const SESJE = {
  A: {
    nazwa: 'A — Dolne / moc pionowa', dur: '~70 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 8–10 min', items: [
        { n: 'Kobra / wyprost leżąc (McKenzie press-up)', d: '10 powt.' },
        { n: 'Odwodzenie biodra z gumą, stojąc (standing band hip abduction)', d: '2 × 15 na każdą stronę', u: 'Noga na bok (nie do tyłu — kickback to inne ćwiczenie). Guma nad kolanami — polisa na SKB.' },
        { n: 'Mostek biodrowy z gumą (banded glute bridge)', d: '2 × 12' },
        { n: 'Rozciąganie zginacza biodra w półklęku (half-kneeling hip flexor stretch)', d: '2 × 30 s na każdą stronę', u: 'Podwiń miednicę, spinaj pośladek nogi tylnej' },
        { n: 'Dead bug (martwy robak)', d: '2 × 8 na każdą stronę', u: 'Lędźwie wklejone w podłogę' },
        { n: 'Pogo hops (sprężyste podskoki ze sztywnymi kolanami)', d: '2 × 20', u: 'Kolana prawie sztywne, praca ze stopy' },
      ]},
      { t: 'Blok mocy · przerwy 90–120 s', items: [
        { n: 'Wskoki na skrzynię (box jumps)', d: '4 × 3', u: 'Zejście krokiem, nigdy zeskok. Wpisz wysokość skrzyni (cm) i powtórzenia.', plyo: true, lift: 'boxjump', tryb: 'wysokosc', krok: 5, serie: 4, zakres: [3, 5], startCm: 75 },
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
    nazwa: 'B — Góra / core / ramiona', dur: '~60 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6 min', items: [
        { n: 'Face pull (przyciąganie linki do twarzy)', d: '2 × 15' },
        { n: 'Rotacja zewnętrzna barku z gumą (band external rotation)', d: '2 × 15 na każdą stronę', u: 'Łokieć przy tułowiu' },
        { n: 'Band pull-apart (rozciąganie gumy przed sobą)', d: '2 × 20' },
        { n: 'Open book (otwarta książka — rotacja tułowia leżąc)', d: '2 × 8 na każdą stronę' },
      ]},
      { t: 'Główne · przerwy 2 min', items: [
        { n: 'Wyciskanie hantli na ławce (dumbbell bench press)', d: '4 × 8', lift: 'benchdb', krok: 2.5, serie: 4, zakres: [8, 10] },
        { n: 'Podciąganie / ściąganie drążka (pull-up / lat pulldown)', d: '4 × 8', lift: 'pullup', krok: 2.5, serie: 4, zakres: [8, 10] },
        { n: 'Wyciskanie hantli nad głowę, siedząc (seated dumbbell overhead press)', d: '3 × 10', u: 'Z oparciem — nie stojąc', lift: 'ohp', krok: 2.5, serie: 3, zakres: [10, 12] },
        { n: 'Wiosłowanie hantlem (single-arm dumbbell row)', d: '3 × 10 na każdą stronę', u: '3 × 10 na każdą stronę.', lift: 'row', krok: 2.5, serie: 3, zakres: [10, 12] },
      ]},
      { t: 'Ramiona i barki · 60 s', items: [
        { n: 'Wznosy bokiem (lateral raises)', d: '3 × 15' },
        { n: 'Face pull (przyciąganie linki do twarzy)', d: '3 × 20' },
        { n: 'Uginanie hantli + młotkowe (dumbbell curls + hammer curls)', d: '3 × 12' },
        { n: 'Wyprosty na wyciągu (triceps pushdown)', d: '3 × 15' },
      ]},
      { t: 'Core', items: [
        { n: 'Deska na piłce, przedramiona (stability ball plank)', d: '3 × 45–60 s' },
        { n: 'Deska boczna z uniesieniem biodra (side plank hip dips/lifts)', d: '3 × 10 na każdą stronę', u: 'Hold 3 s w górze' },
        { n: 'Suitcase carry (spacer z obciążeniem w jednej ręce)', d: '3 × 30 m na każdą stronę', u: 'Nie przechylaj się' },
      ]},
    ],
  },

  C: {
    nazwa: 'C — Atletyczny FBW', dur: '~65 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 8 min', items: [
        { n: 'Kobra + pozycja dziecka (McKenzie + child’s pose)', d: '10 + 1 min' },
        { n: 'Odwodzenie z gumą + monster walk (band abduction + monster walk)', d: '2 × 15 na każdą stronę', u: 'Odwodzenie = noga na bok (nie do tyłu). Potem monster walk w półprzysiadzie.' },
        { n: 'Skipy + krok odstawno-dostawny (A-skips + side shuffle)', d: '3 × 15 m' },
        { n: 'Przejścia biodrami 90/90 (90/90 hip switches)', d: '2 × 8 na każdą stronę' },
      ]},
      { t: 'Blok mocy · przerwy 90 s', items: [
        { n: 'Skok w dal z miejsca (standing broad jump)', d: '4 × 3', u: 'Mierz odległość', plyo: true },
        { n: 'Skok boczny + lądowanie na jednej nodze (lateral bound + single-leg stick)', d: '3 × 4 na każdą stronę', u: '3 × 4 na każdą stronę, hold 2 s. Kluczowe pod padel i SKB.', plyo: true },
        { n: 'Rzut piłką rotacyjnie o ścianę (rotational med-ball throw)', d: '3 × 6 na każdą stronę', u: 'Rotacja z bioder i klatki, nie z lędźwi' },
        { n: 'Slam piłką o podłoże (medicine ball slam)', d: '3 × 8' },
      ]},
      { t: 'Siła · przerwy 90 s', items: [
        { n: 'Przysiad goblet / przedni (goblet / front squat)', d: '3 × 8', u: 'Bez sztangi na plecach w fazie 0–1', lift: 'squat', krok: 2.5, serie: 3, zakres: [8, 10] },
        { n: 'Zakroki z hantlami (walking/reverse lunges)', d: '3 × 10 na każdą nogę', u: '3 × 10 na każdą nogę w każdej serii.', lift: 'lunge', krok: 2.5, serie: 3, zakres: [10, 12] },
        { n: 'Podciąganie (pull-ups)', d: '3 × max' },
        { n: 'Pompki z nogami w górze (feet-elevated push-ups)', d: '3 × 12' },
      ]},
      { t: 'Core i finisz', items: [
        { n: 'Dead bug z gumą (banded dead bug)', d: '3 × 10 na każdą stronę' },
        { n: 'Pallof press z krokiem w bok (Pallof press with lateral step)', d: '3 × 8 na każdą stronę' },
        { n: 'Spacer farmera (farmer’s walk)', d: '3 × 40 m' },
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
    nazwa: 'Siatkówka', dur: 'rozgrzewka + schłodzenie', typ: 'sport',
    bloki: [
      { t: 'Rozgrzewka 1 · Bieganie — 2,5 min', items: [
        { n: 'Trucht wzdłuż boiska (jog)', d: '2× tam i z powrotem' },
        { n: 'Krok odstawno-dostawny (side shuffle)', d: '2× w każdą stronę' },
        { n: 'Przeplatanka / karioka (carioca)', d: '2× w każdą stronę' },
        { n: 'Skipy A + pięty do pośladków (A-skips + butt kicks)', d: '2× tam i z powrotem' },
      ]},
      { t: 'Rozgrzewka 2 · Mobilność — 3 min', items: [
        { n: 'Najlepsze rozciąganie świata (world’s greatest stretch)', d: '6 na każdą stronę', u: 'Ręka po stronie nogi wykrocznej idzie w górę' },
        { n: 'Wymachy nogą przód–tył (leg swings front-back)', d: '10 na każdą stronę' },
        { n: 'Wymachy nogą w bok (lateral leg swings)', d: '10 na każdą stronę' },
        { n: 'Kołyska w marszu (walking leg cradle)', d: '6 na każdą stronę' },
        { n: 'Krążenia ramion + rotacje tułowia (arm circles + torso twists)', d: '10 + 10' },
      ]},
      { t: 'Rozgrzewka 3 · Aktywacja z gumą — 2,5 min', items: [
        { n: 'Monster walk z gumą (banded monster walk)', d: '15 kroków × 2 w każdą stronę', u: 'Ma piec po zewnętrznej stronie biodra' },
        { n: 'Mostek biodrowy (glute bridge)', d: '15' },
        { n: 'Półklęk: podwinięcie miednicy + spięcie pośladka (half-kneeling posterior tilt)', d: '5 × 5 s na każdą stronę' },
        { n: 'Band pull-apart + rotacja zewnętrzna barku (pull-apart + external rotation)', d: '15 + 12 na każdą stronę' },
      ]},
      { t: 'Rozgrzewka 4 · Skakanie — 3 min', items: [
        { n: 'Pogo hops (sprężyste podskoki ze sztywnymi kolanami)', d: '2 × 15' },
        { n: 'Skoki obunóż narastająco (bilateral hops, building intensity)', d: '3× lekko / 3× średnio / 3× mocno' },
        { n: 'Rozbieg z wyskokiem bez piłki (approach jump, no ball)', d: '3: 60% → 80% → 95%' },
        { n: 'Zamach ramieniem jak przy ataku (arm swing / spike motion)', d: '10 na sucho + 10 z gumą' },
      ]},
      { t: 'Gra', items: [
        { n: 'Pierwsze ataki na 70–80% (warm-up spikes)', d: 'pełna moc po 6–8 uderzeniach' },
        { n: 'Serwis z połowy boiska (serve from mid-court)', d: '3–4 przed linią końcową' },
      ]},
      { t: 'Schłodzenie — 8 min', items: [
        { n: 'Marsz / luźne chodzenie (easy walk)', d: '2 min' },
        { n: 'Roller: łydki (foam roll calves)', d: '30 s na każdą stronę' },
        { n: 'Roller: czworogłowy (foam roll quads)', d: '30 s na każdą stronę' },
        { n: 'Roller: pośladek (foam roll glutes)', d: '45 s na każdą stronę', u: 'Zatrzymaj się przed kością krzyżową' },
        { n: 'Roller: odcinek piersiowy w poprzek (foam roll thoracic)', d: '45 s', u: 'Nie niżej niż dolny kąt łopatek' },
        { n: 'Rozciąganie zginacza biodra w półklęku (half-kneeling hip flexor stretch)', d: '45 s na każdą stronę' },
        { n: 'Rozciąganie prostego uda leżąc bokiem (side-lying quad stretch)', d: '30 s na każdą stronę' },
        { n: 'Rozciąganie klatki w futrynie (doorway chest stretch)', d: '30 s na każdą stronę' },
        { n: 'Rozciąganie łydki o ścianę (wall calf stretch)', d: '30 s prosta + 15 s ugięta na stronę' },
        { n: 'Kobra / wyprost leżąc (McKenzie press-up)', d: '10 powt.' },
        { n: 'Ukłon japoński (child’s pose)', d: '1 min' },
        { n: 'Zwis na drążku (dead hang)', d: '2 × 30 s' },
      ]},
    ],
  },

  PADEL: {
    nazwa: 'Padel', dur: 'rozgrzewka + schłodzenie', typ: 'sport',
    bloki: [
      { t: 'Rozgrzewka 1 · Bieganie — 2 min', items: [
        { n: 'Trucht po korcie (court jog)', d: '60 s' },
        { n: 'Krok odstawno-dostawny (side shuffle)', d: '2× w każdą stronę' },
        { n: 'Bieg tyłem (backpedal)', d: '2× długość kortu', u: 'Do szyby cofasz się cały mecz' },
        { n: 'Przeplatanka / karioka (carioca)', d: '2× w każdą stronę' },
      ]},
      { t: 'Rozgrzewka 2 · Drabinka — 2 min', items: [
        { n: 'Bieg przez szczeble — 1 stopa (ladder 1-in)', d: '2 przejścia' },
        { n: 'Dwie stopy w kratce (ladder 2-in)', d: '2 przejścia' },
        { n: 'In-in-out-out (ladder icky shuffle)', d: '2 przejścia' },
        { n: 'Krok boczny przez drabinkę (ladder lateral step)', d: '2× w każdą stronę' },
      ]},
      { t: 'Rozgrzewka 3 · Mobilność — 2 min', items: [
        { n: 'Najlepsze rozciąganie świata (world’s greatest stretch)', d: '6 na każdą stronę' },
        { n: 'Wymachy nogą w bok (lateral leg swings)', d: '12 na każdą stronę', u: 'Pachwina — ważniejsze niż w siatkówce' },
        { n: 'Wymachy nogą przód–tył (leg swings front-back)', d: '10 na każdą stronę' },
        { n: 'Rotacje tułowia z rakietą (racket torso rotations)', d: '15', u: 'Miednica względnie nieruchoma' },
        { n: 'Krążenia nadgarstka + otwieranie dłoni (wrist circles + hand opens)', d: '15 + 20' },
      ]},
      { t: 'Rozgrzewka 4 · Aktywacja z gumą — 2 min', items: [
        { n: 'Monster walk z gumą (banded monster walk)', d: '15 kroków × 2 w każdą stronę' },
        { n: 'Półklęk: podwinięcie miednicy + spięcie pośladka (half-kneeling posterior tilt)', d: '5 × 5 s na każdą stronę' },
        { n: 'Band pull-apart + rotacja zewnętrzna barku (pull-apart + external rotation)', d: '15 + 12 na każdą stronę' },
        { n: 'Zgięcie i wyprost nadgarstka z gumą (banded wrist flexion/extension)', d: '15 w każdą stronę', u: 'Profilaktyka łokcia' },
      ]},
      { t: 'Rozgrzewka 5 · Hamowanie — 2 min', items: [
        { n: 'Wypad w bok narastająco (lateral lunge, building depth)', d: '5 na każdą stronę, coraz głębiej' },
        { n: 'Skok boczny + lądowanie na jednej nodze (lateral bound + single-leg stick)', d: '3 na każdą stronę', u: 'Na każdą stronę osobno, hold 2 s.', plyo: true },
        { n: 'Sprint 4–5 m z ostrym zatrzymaniem (short sprint + hard stop)', d: '4: 60→80→90→90%' },
        { n: 'Imitacja uderzeń bez piłki (shadow swings)', d: '8 FH + 8 BH + 6 nad głową' },
      ]},
      { t: 'Schłodzenie — 8 min', items: [
        { n: 'Marsz (easy walk)', d: '2 min' },
        { n: 'Roller: łydki (foam roll calves)', d: '30 s na każdą stronę' },
        { n: 'Roller: czworogłowy (foam roll quads)', d: '30 s na każdą stronę' },
        { n: 'Roller: pośladek (foam roll glutes)', d: '45 s na każdą stronę', u: 'Przed kością krzyżową' },
        { n: 'Roller: przywodziciele (foam roll adductors)', d: '30 s na każdą stronę', u: 'Po padlu obowiązkowo' },
        { n: 'Roller: odcinek piersiowy (foam roll thoracic)', d: '45 s' },
        { n: 'Rozciąganie zginacza biodra w półklęku (half-kneeling hip flexor stretch)', d: '45 s na każdą stronę' },
        { n: 'Rozciąganie przywodzicieli — motyl (butterfly stretch)', d: '45 s' },
        { n: 'Rozciąganie prostego uda leżąc bokiem (side-lying quad stretch)', d: '30 s na każdą stronę' },
        { n: 'Rozciąganie łydki o ścianę (wall calf stretch)', d: '30 s + 15 s na stronę' },
        { n: 'Kobra / wyprost leżąc (McKenzie press-up)', d: '10 powt.' },
        { n: 'Ukłon japoński (child’s pose)', d: '1 min' },
      ]},
    ],
  },

  REST: {
    nazwa: 'Dzień wolny', dur: 'regeneracja', typ: 'rest',
    bloki: [],
  },
};

/* Domyślny tydzień: 0 = niedziela. Używany tylko w zakładce Plan jako szkic. */
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
