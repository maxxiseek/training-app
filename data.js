/* ---------------------------------------------------------------
   data.js — plan treningowy: sesje, ćwiczenia, cykl
   Edytuj ten plik, jeśli chcesz zmienić plan. Reszta apki się dostosuje.
----------------------------------------------------------------*/

const APP = { wersja: '1.4.0', data: '2026-10-16' };

/* Cykl 4-tygodniowy: tygodnie 1–3 normalna progresja, tydzień 4 lżejszy.
   Wartości domyślne — w aplikacji (Więcej → Ustawienia) można je zmienić. */
const START_CYKLU = '2026-10-19';   // poniedziałek startu cyklu
const CYKL_TYGODNI = 4;
const LEKKI_PROC = 0.9;             // tydzień lżejszy: 90% ostatniego ciężaru (zaokrąglone do kroku), −1 seria

/* Stała gra (siatkówka/padel) — dzień tygodnia: 0 = niedziela … 6 = sobota. */
const STALA_GRA = 6;

/* Powrót po przerwie: ostatnia sesja z ćwiczeniem starsza niż POWROT_DNI dni. */
const POWROT_DNI = 14;
const POWROT_PROC = 0.9;            // podpowiedź = 90% ostatniego ciężaru (zaokrąglone do kroku), dolny zakres powt.
const POWROT_BEZ_PODBIJANIA = 2;    // tyle kolejnych sesji bez podbijania ciężaru

/* Żywienie — jedno źródło (zakładka Plan). */
const ZYWIENIE = { trening: 2700, wolny: 2250, bialko: 180, kreatyna: 5 };

/* Sesje.
   item: {
     n: nazwa, d: dawka wyświetlana, u: uwaga,
     id:     opcjonalny stały identyfikator (przy pozycjach z wariantami)
     lift:   klucz loga (ciężary / powtórzenia / sekundy)
     krok:   o ile kg podbić przy progresji
     serie:  ile serii w sesji
     zakres: [min, max] powtórzeń — podwójna progresja:
             najpierw dochodzisz do max we WSZYSTKICH seriach,
             dopiero potem apka podbija ciężar i wracasz do min
     jednostka: 'powt' (domyślnie) | 's' | 'm' — czym jest „p” w logu
     progresja: 'brak' → log ciężaru bez auto-progresji
     ladder: [{ wariant, zakres:[min,max], jednostka }] — drabinka wariantów (ćwiczenia bez ciężaru)
     warianty: [item, item] — pozycja „X lub Y”; użytkownik wybiera wariant
     ss:     true → superseria z następną pozycją
     przerwa: true → robione w przerwie superserii (osobny wiersz logu)
     yt:     opcjonalny link YouTube (technika)
   }
   blok: { t, items, rdzen?, opcjonalny?, moc?, rozgrzewka? }
     rdzen      — bloki 1–3, pokazywane w trybie „Skrót”
     opcjonalny — nie wpływa na zaliczenie sesji
     moc        — blok mocy; w tygodniu lżejszym połowa objętości
*/
const SESJE = {
  A: {
    nazwa: 'A — Nogi + wyskok', dur: '~50 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6–8 min', rozgrzewka: true, items: [
        { n: 'Odwodzenie z gumą + zginacz + monster walk + pogo', d: '6–8 min łącznie',
          u: 'Po kolei, bez logowania: odwodzenie z gumą 15/str. (noga na bok) → zginacz biodra w półklęku 30 s/str. → monster walk 2×10/str. → pogo 2×15 → 2 lekkie rozbiegi.' },
      ]},
      { t: '1 · Wyskok · przerwy 90–120 s', rdzen: true, moc: true, items: [
        { n: 'Wyskok z rozbiegu (2–3 kroki, max dosięg)', d: '4 × 2', serie: 4,
          u: 'Rozbieg 2–3 kroki, wyskok na maksymalny dosięg. Każde powtórzenie na świeżo, ciche lądowanie. Tylko odhaczenie.' },
      ]},
      { t: '2 · Moc · przerwy 90–120 s', rdzen: true, moc: true, items: [
        { n: 'Trap bar jump (pusty / +10–20 kg)', d: '3 × 3', serie: 3, zakres: [3, 3], lift: 'trapjump', progresja: 'brak',
          u: 'Pusty gryf albo +10–20 kg. Wpisz dodatkowy ciężar (0 = pusty). Eksplozywny wyskok, miękkie lądowanie.' },
      ]},
      { t: '3 · Siła + core · przerwy 2–3 min', rdzen: true, items: [
        { n: 'Martwy ciąg z trap barem (trap bar deadlift)', d: '3 × 4–5', serie: 3, zakres: [4, 5], krok: 5, lift: 'trapbar', ss: true,
          u: 'Uchwyty wysokie, plecy neutralne, sztanga „przez podłogę”. Ostatnie powtórzenie w serii nadal szybkie.' },
        { n: 'Pallof press', d: '3 × 10 na każdą stronę', serie: 3, zakres: [10, 10], krok: 2.5, lift: 'pallof',
          u: 'Miednica nieruchoma, wyciskasz przed siebie i wracasz. W przerwie między seriami martwego ciągu.' },
      ]},
      { t: '4 · Jedna noga + łydka', items: [
        { n: 'Bułgarski przysiad z hantlami (Bulgarian split squat)', d: '2 × 6–8 na każdą nogę', serie: 2, zakres: [6, 8], krok: 2.5, lift: 'rfess', ss: true,
          u: 'Tułów lekko pochylony, kolano śledzi środek stopy.' },
        { n: 'Wspięcia na palce jednonóż (single-leg calf raise)', d: '2 × 10–15 na każdą nogę', serie: 2, zakres: [10, 15], krok: 2.5, lift: 'calfsl',
          u: 'Pełny zakres, 1 s pauza na górze.' },
      ]},
      { t: '5 · Pośladki + hamstringi', items: [
        { n: 'Hip thrust ze sztangą (barbell hip thrust)', d: '3 × 6–8', serie: 3, zakres: [6, 8], krok: 5, lift: 'hipthrust', ss: true,
          u: 'Podbródek do klatki, żebra w dół, bez przeprostu lędźwi. Peak squeeze 1 s na górze.' },
        { id: 'a5-ham', warianty: [
          { n: 'Nordic curl — negatyw', d: '2 × 4–6', serie: 2, lift: 'nordic',
            u: 'Opuszczasz się jak najwolniej, łapiesz rękami. Drabinka: negatyw → wolniej (5 s) → negatyw + odbicie z dołu.',
            ladder: [
              { wariant: 'Negatyw', zakres: [4, 6], jednostka: 'powt' },
              { wariant: 'Negatyw wolniej (5 s)', zakres: [4, 6], jednostka: 'powt' },
              { wariant: 'Negatyw + odbicie z dołu', zakres: [4, 6], jednostka: 'powt' },
            ] },
          { n: 'Uginanie nóg (leg curl)', d: '2 × 8–10', serie: 2, zakres: [8, 10], krok: 2.5, lift: 'legcurl',
            u: 'Kontrolowane opuszczanie, bez bujania biodrami.' },
        ]},
      ]},
    ],
  },

  B: {
    nazwa: 'B — Góra', dur: '~50 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 4–5 min', rozgrzewka: true, items: [
        { n: 'Band pull-apart + rotacja zewnętrzna barku', d: '4–5 min',
          u: 'Band pull-apart 2×15 → rotacja zewnętrzna barku z gumą 2×12/str. (łokieć przy tułowiu). Bez logowania.' },
      ]},
      { t: '1 · Moc · przerwy 90 s', rdzen: true, moc: true, items: [
        { n: 'Slam piłką o podłoże (medicine ball slam)', d: '3 × 5', serie: 3,
          u: 'Pełny wyprost bioder, piłka w podłogę z maksymalną prędkością. Tylko odhaczenie.' },
      ]},
      { t: '2 · Pion i pchnięcie · przerwy 2 min', rdzen: true, items: [
        { n: 'Landmine press w półklęku (half-kneeling landmine press)', d: '3 × 8–10 na każdą stronę', serie: 3, zakres: [8, 10], krok: 2.5, lift: 'landminepress', ss: true,
          u: 'Wpisz ciężar na talerzach (+ gryf). Żebra w dół, bez przeprostu lędźwi.' },
        { id: 'b2-pull', warianty: [
          { n: 'Podciąganie (pull-up)', d: '3 × 6–10', serie: 3, zakres: [6, 10], krok: 2.5, lift: 'pullup',
            u: 'Wpisz dodatkowy ciężar (0 = sama masa ciała). Pełny zwis → klatka do drążka.' },
          { n: 'Ściąganie drążka (lat pulldown)', d: '3 × 6–10', serie: 3, zakres: [6, 10], krok: 2.5, lift: 'pulldown',
            u: 'Ciężar na stosie. Łopatki w dół, drążek do górnej części klatki.' },
        ]},
      ]},
      { t: '3 · Poziom + core · przerwy 2 min', rdzen: true, items: [
        { n: 'Wyciskanie hantli na ławce skośnej 30° (incline dumbbell press)', d: '3 × 8–10', serie: 3, zakres: [8, 10], krok: 2.5, lift: 'inclinedb', ss: true,
          u: 'Ławka skos 30°, łopatki ściągnięte, stopy w podłodze. Kontrolowane opuszczanie.' },
        { n: 'Wiosłowanie hantlem (single-arm dumbbell row)', d: '3 × 8–10 na każdą stronę', serie: 3, zakres: [8, 10], krok: 2.5, lift: 'row', ss: true,
          u: 'Łokieć blisko tułowia, bez rotacji tułowia.' },
        { n: 'Dead bug', d: '3 × 8–12 na każdą stronę', serie: 3, lift: 'deadbug', przerwa: true,
          u: 'W przerwie między seriami. Lędźwie wklejone w podłogę. Gdy wszystkie serie na 12 — kolejny wariant.',
          ladder: [
            { wariant: 'Bez obciążenia', zakres: [8, 12], jednostka: 'powt' },
            { wariant: 'Z gumą nad głową', zakres: [8, 12], jednostka: 'powt' },
            { wariant: 'Z hantlem 4–6 kg', zakres: [8, 12], jednostka: 'powt' },
          ] },
      ]},
      { t: '4 · Barki', items: [
        { n: 'Wznosy bokiem (lateral raises)', d: '3 × 12–15', serie: 3, zakres: [12, 15], krok: 1, lift: 'lateralraise', ss: true,
          u: 'Lekkie hantle, bez szarpania. Łokcie miękkie, zatrzymaj na górze.' },
        { n: 'Face pull', d: '2 × 12–15', serie: 2, zakres: [12, 15], krok: 2.5, lift: 'facepull',
          u: 'Łokcie wysoko, ściągasz do twarzy, rotacja zewnętrzna na końcu ruchu.' },
      ]},
      { t: '5 · Ramiona', items: [
        { n: 'Uginanie ramion z hantlami (biceps curl)', d: '3 × 10–12', serie: 3, zakres: [10, 12], krok: 2.5, lift: 'curl', ss: true,
          u: 'Superseria z wyprostami. Bez bujania tułowiem.' },
        { n: 'Wyprosty ramion na wyciągu (triceps pushdown)', d: '3 × 10–12', serie: 3, zakres: [10, 12], krok: 2.5, lift: 'pushdown',
          u: 'Łokcie przy tułowiu, pełny wyprost.' },
      ]},
    ],
  },

  C: {
    nazwa: 'C — Atletyczny', dur: '~45–50 min', typ: 'silownia',
    bloki: [
      { t: 'Rozgrzewka · 6–8 min', rozgrzewka: true, items: [
        { n: 'Skipy + karioka + 90/90 + monster walk', d: '6–8 min',
          u: 'Skipy A → karioka → krok odstawno-dostawny 2×12 m → przejścia 90/90 2×6/str. → monster walk 2×10/str. Bez logowania.' },
      ]},
      { t: '1 · Moc · przerwy 90 s', rdzen: true, moc: true, items: [
        { n: 'Skok boczny + lądowanie (lateral bound + stick)', d: '3 × 3 na każdą stronę', serie: 3, ss: true,
          u: 'Hold 2 s na lądowaniu. Tylko odhaczenie.', yt: 'https://www.youtube.com/shorts/IyMLKJX4MRU' },
        { n: 'Rzut piłką rotacyjnie o ścianę (rotational med-ball throw)', d: '3 × 5 na każdą stronę', serie: 3,
          u: 'Rotacja z bioder i klatki, nie z lędźwi. Tylko odhaczenie.', yt: 'https://www.youtube.com/shorts/02c2YLgF8iE' },
      ]},
      { t: '2 · Rotacja + ciągnięcie · przerwy 2 min', rdzen: true, items: [
        { n: 'Landmine rotational press (eksplozywnie)', d: '3 × 5 na każdą stronę', serie: 3, zakres: [5, 5], lift: 'landminerot', progresja: 'brak', ss: true,
          u: 'Eksplozywna rotacja z bioder. Wpisz ciężar na talerzach (+ gryf) — bez auto-progresji.' },
        { n: 'Podciąganie podchwytem (chin-up)', d: '3 × 6–8', serie: 3, zakres: [6, 8], krok: 2.5, lift: 'chinup',
          u: 'Wpisz dodatkowy ciężar (0 = sama masa ciała). Pełny zwis → broda nad drążek.' },
      ]},
      { t: '3 · Jedna noga + pchnięcie + core · przerwy 2 min', rdzen: true, items: [
        { n: 'RDL jednonóż z hantlem (single-leg RDL)', d: '3 × 8–10 na każdą nogę', serie: 3, zakres: [8, 10], krok: 2.5, lift: 'slrdl', ss: true,
          u: 'Biodro kwadratowe, plecy neutralne, hantla po stronie nogi zakrocznej.' },
        { id: 'c3-push', warianty: [
          { n: 'Pompki z obciążeniem (weighted push-up)', d: '3 × 8–12', serie: 3, zakres: [8, 12], krok: 2.5, lift: 'pushupw',
            u: 'Wpisz dodatkowy ciężar (0 = sama masa ciała). Ciało w linii, klatka do podłogi.' },
          { n: 'Dipy (dips)', d: '3 × 8–12', serie: 3, zakres: [8, 12], krok: 2.5, lift: 'dips',
            u: 'Wpisz dodatkowy ciężar (0 = sama masa ciała). Barki w dół, kontrolowane opuszczanie.' },
        ]},
        { n: 'Deska boczna (side plank)', d: '3 × 30–45 s na każdą stronę', serie: 3, lift: 'sideplank', przerwa: true,
          u: 'W przerwie. Bark nad łokciem, biodra do przodu. Gdy wszystkie serie na 45 s — kolejny wariant.',
          ladder: [
            { wariant: 'Zwykła', zakres: [30, 45], jednostka: 's' },
            { wariant: 'Z odwodzeniem górnej nogi', zakres: [30, 45], jednostka: 's' },
            { wariant: 'Z mini-gumą na kolanach', zakres: [30, 45], jednostka: 's' },
          ] },
      ]},
      { t: '4 · Core + noszenie', items: [
        { n: 'Ab wheel', d: '3 × 8–12', serie: 3, lift: 'abwheel', ss: true,
          u: 'Z kolan, lędźwie wklejone. Gdy wszystkie serie na 12 — kolejny wariant.',
          ladder: [
            { wariant: 'Z kolan, krótki zasięg', zakres: [8, 12], jednostka: 'powt' },
            { wariant: 'Z kolan, pełny zasięg', zakres: [8, 12], jednostka: 'powt' },
            { wariant: 'Z kolan, pauza 1 s na dole', zakres: [8, 12], jednostka: 'powt' },
          ] },
        { n: 'Suitcase carry', d: '2 × 30 m na każdą stronę', serie: 2, zakres: [30, 30], jednostka: 'm', krok: 2, lift: 'suitcase',
          u: 'Hantla / kettlebell w jednej ręce, tułów prosty, bez przechyłu. W logu wpisz metry (30).' },
      ]},
      { t: '5 · Ramiona (opcjonalnie)', opcjonalny: true, items: [
        { n: 'Uginanie młotkowe (hammer curl)', d: '2 × 12', serie: 2, zakres: [12, 12], krok: 2.5, lift: 'hammer', ss: true,
          u: 'Opcjonalnie — nie wpływa na zaliczenie sesji.' },
        { n: 'Wyprosty ramion na wyciągu (triceps pushdown)', d: '2 × 12', serie: 2, zakres: [12, 12], krok: 2.5, lift: 'pushdown',
          u: 'Opcjonalnie — nie wpływa na zaliczenie sesji.' },
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
      { t: 'Aktywacja', czas: '3 min', tekst: 'Pachwina i biodra (wymachy w bok, monster walk, Copenhagen plank 2×20 s/str.), potem bark i nadgarstek (pull-apart, rotacja, zgięcie/wyprost z gumą). Najpierw noga do dojścia, potem ramię do uderzenia.' },
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

const TYDZIEN = { 1: 'A', 2: null, 3: 'C', 4: null, 5: 'B', 6: 'GRA', 0: 'REST' };

/* Cele w oknie 7 dni. Siatkówka i padel bez celu — logowane ręcznie jako „gra”. */
const CELE_TYG = { A: 1, B: 1, C: 1 };

/* Jednostki liczone jako „gra” (blokują A dzień po grze, liczą się do serii dni z rzędu). */
const GRY = ['VB', 'PADEL'];

/* Hamulec regeneracji: tylko sugestia, nie blokada chipów. */
const MAX_AKTYWNOSC_Z_RZEDU = 3;

/* Priorytet sugestii dnia. VB i padel zostają na chipach do ręcznego wyboru. */
const PRIORYTET = ['A', 'B', 'C'];

/* Ćwiczenia z logiem — punkty startowe i cele (do ekranu Postęp).
   bw: true → dozwolone 0 kg (dodatkowy ciężar do masy ciała).
   archiwum: true → usunięte z planu, historia zostaje w danych i CSV. */
const LIFTY = {
  trapbar:       { n: 'Martwy ciąg trap bar (trap bar deadlift)', start: null, f1: 110, f2: 130 },
  hipthrust:     { n: 'Hip thrust (barbell hip thrust)',           start: 15,   f1: 90,  f2: 120 },
  rfess:         { n: 'Bułgarski przysiad (Bulgarian split squat)', start: null, f1: 20,  f2: 26 },
  legcurl:       { n: 'Uginanie nóg (leg curl)',                    start: 35,   f1: null, f2: null },
  calfsl:        { n: 'Wspięcia jednonóż (single-leg calf raise)',  start: null, f1: null, f2: null },
  pallof:        { n: 'Pallof press',                               start: null, f1: null, f2: null },
  trapjump:      { n: 'Trap bar jump (dodatkowy ciężar)',           start: null, f1: null, f2: null, bw: true },
  landminepress: { n: 'Landmine press w półklęku',                  start: 5,    f1: null, f2: null },
  landminerot:   { n: 'Landmine rotational press',                  start: null, f1: null, f2: null },
  pulldown:      { n: 'Ściąganie drążka (lat pulldown)',            start: 55,   f1: null, f2: null },
  pullup:        { n: 'Podciąganie (pull-up, dodatkowy ciężar)',    start: 0,    f1: null, f2: null, bw: true },
  chinup:        { n: 'Podciąganie podchwytem (chin-up)',           start: 0,    f1: null, f2: null, bw: true },
  inclinedb:     { n: 'Wyciskanie hantli skos 30° (incline press)', start: 22.5, f1: 27.5, f2: 30 },
  row:           { n: 'Wiosłowanie hantlem (single-arm dumbbell row)', start: 20, f1: 27.5, f2: 32.5 },
  lateralraise:  { n: 'Wznosy bokiem (lateral raises)',             start: null, f1: null, f2: null },
  facepull:      { n: 'Face pull',                                  start: null, f1: null, f2: null },
  curl:          { n: 'Uginanie ramion (biceps curl)',              start: null, f1: null, f2: null },
  pushdown:      { n: 'Wyprosty na wyciągu (triceps pushdown)',     start: null, f1: null, f2: null },
  hammer:        { n: 'Uginanie młotkowe (hammer curl)',            start: null, f1: null, f2: null },
  slrdl:         { n: 'RDL jednonóż z hantlem (single-leg RDL)',    start: 16,   f1: null, f2: null },
  pushupw:       { n: 'Pompki z obciążeniem (weighted push-up)',    start: 0,    f1: null, f2: null, bw: true },
  dips:          { n: 'Dipy (dips)',                                start: 0,    f1: null, f2: null, bw: true },
  suitcase:      { n: 'Suitcase carry',                             start: null, f1: null, f2: null },
  // archiwum — usunięte w 1.4.0 (historia zostaje)
  benchdb:  { n: 'Wyciskanie hantli (dumbbell bench press)',       start: 22.5, f1: 27.5, f2: 30, archiwum: true },
  ohp:      { n: 'Wyciskanie nad głowę (overhead press)',           start: null, f1: null, f2: null, archiwum: true },
  squat:    { n: 'Przysiad goblet (goblet squat)',                  start: null, f1: null, f2: null, archiwum: true },
  lunge:    { n: 'Zakroki (lunges)',                                start: 16,   f1: null, f2: null, archiwum: true },
  boxjump:  { n: 'Wskoki na skrzynię (box jumps)',                  start: 75,   f1: null, f2: null, tryb: 'wysokosc', archiwum: true },
};

/* Drabinki wariantów (ćwiczenia bez ciężaru) — klucze logów. */
const DRABINKI = ['nordic', 'deadbug', 'sideplank', 'abwheel'];

const TESTY = [
  { k: 'jump',    n: 'Wyskok dosiężny z rozbiegu (approach jump reach)', j: 'cm', cel: '+4–7 cm' },
  { k: 'cmj',     n: 'CMJ — wyskok z miejsca (countermovement jump)',     j: 'cm', cel: '+3–5 cm' },
  { k: 'broad',   n: 'Skok w dal z miejsca (standing broad jump)',       j: 'cm', cel: '+10–20 cm' },
  { k: 'plankL',  n: 'Deska boczna — lewa (side plank L)',          j: 's',  cel: '90 s' },
  { k: 'plankR',  n: 'Deska boczna — prawa (side plank R)',         j: 's',  cel: '90 s' },
  { k: 'ball',    n: 'Deska na piłce (stability ball plank)',             j: 's',  cel: '90 s' },
];
