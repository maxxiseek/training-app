# Mój trening i zasady progresji — wersja do omówienia z asystentem

Dokument opisuje **dokładnie to, co robi apka w wersji 1.3.0** (źródło prawdy: `data.js`, `engine.js`, `index.html`). Nie zawiera nic poza tym, co jest w kodzie; tam, gdzie widzę rozjazd lub lukę, oznaczam to jako **⚠ do omówienia**.

> **Jak z tego korzystać:** wklej cały plik do rozmowy z asystentem i dopisz na końcu sekcji 9 swoje odpowiedzi (co konkretnie się nie sprawdza). Bez tego asystent będzie zgadywał.

---

## 1. Kontekst

- Start programu: **18.08.2026** (poniedziałek). Dziś (16.10.2026) to ok. **tydzień 9** — czyli koniec deloadu z tygodnia 8, początek drugiej połowy fazy 1.
- Cel sportowy: siła + moc pod **siatkówkę** (2×/tydz.) i **padel** (1×/tydz.).
- Cel masy: **85 kg** (redukcja, tempo −0,4 do −0,5 kg/tydz.). Waga startowa i obecna — brak w kodzie (są tylko w localStorage telefonu).
- Praca biurowa ~10 h dziennie.
- Dawna kontuzja prawego SKB / L5/S1. Od 1.3.0 apka tego nie śledzi (użytkownik zgłosił, że problem ustąpił).
- Dane o treningach (ciężary, powtórzenia, historia) są **tylko w telefonie** — żeby asystent mógł ocenić, co się nie sprawdza, trzeba wyeksportować CSV (Więcej → Eksportuj dane do CSV) i dołączyć do rozmowy.

## 2. Struktura tygodnia

### Cele w oknie 7 dni (ruchome, nie kalendarzowe)

| Jednostka | Cel / 7 dni |
|---|---|
| A — dolne / moc pionowa | 1 |
| B — góra / core / ramiona | 1 |
| C — atletyczny FBW | 1 |
| Siatkówka (VB) | 2 |
| Padel | 1 |
| **Suma** | **6** (zostaje 1 slot na regenerację) |

D (rehab/mobilność) i dzień wolny nie są celami.

### Szkic tygodnia (tylko podpowiedź w zakładce Plan)

Pn **A** · Wt **VB** · Śr **B** · Cz **VB** · Pt **C** · So **Padel** · Nd **REST**

> ⚠ **Ten szkic łamie własne reguły apki.** Pn A → Wt VB oraz Cz VB → Pt C to **dwa dni skoków z rzędu** (A, C i VB są „dniami skoków”). Silnik sugestii by tego nie zaproponował — szkic i reguły są niespójne.

### Sugestia dnia (adaptacyjna, nie kalendarzowa)

Sugerowane są tylko **A / B / C** (albo REST). Siatkówkę i padel odhaczasz ręcznie. Kolejność decyzji w `sugeruj()`:

1. Dziś już zapisano REST → zostaje REST.
2. **3 dni z rzędu** jakikolwiek trening (poza sportem) → REST.
3. **2 ciężkie dni z rzędu** (A, C, VB) → REST.
4. **≥ 4 sesje siłowe/rehab w 7 dniach** → REST (siatkówka i padel nie liczą się do tego limitu).
5. Inaczej: spośród A, C, B (w tej kolejności priorytetu) wybierana jest jednostka z **największą zaległością** względem celu 7-dniowego, która nie jest zablokowana.

Blokady pojedynczych jednostek:
- A i C: **minimum 48 h** od siebie.
- **Nigdy dwa dni skoków z rzędu** (A, C, VB) — dotyczy też VB, więc po A/C nie sugeruje się kolejnej jednostki skokowej.
- Jednostka już zrobiona dziś nie jest sugerowana ponownie.

Wszystko to są **sugestie** — chipy zawsze można stuknąć ręcznie.

Reguły „gdy tydzień się sypie” (zakładka Plan):
- Ciężka sesja nóg minimum 48 h przed meczem.
- Kolejność cięcia: akcesoria B → blok siłowy C → blok mocy zostaje do końca.
- Wypada jedna sesja? Niech to będzie **B, nigdy A**.
- Sen poniżej 6,5 h przez kilka dni → tnij siłownię, nie sport.

## 3. Fazy programu

| Tygodnie | Faza | Opis w apce |
|---|---|---|
| 1–3 | 0 — Kalibracja | Zapas 2–3 powt. przed upadkiem. Plyo: tylko lądowania i pogo hops. Kalorie 2600. |
| 4–11 | 1 — Baza siły + redukcja | Kalorie ~2500. Plyo w pełni, maks. 40 kontaktów/sesję. **Tydzień 8 = deload.** |
| 12–19 | 2 — Konwersja na moc | Kalorie 2650. Trap bar 4×3 z maksymalną prędkością. Depth jumps. **Tydzień 16 = deload.** |
| 20+ | 3 — Podtrzymanie w sezonie | 2 sesje siłowe + D. Objętość ~60% fazy 2. Kalorie ~2900. |

> ⚠ **Fazy są w apce tylko opisem tekstowym** (plus deload w tyg. 8 i 16). Kod **nie zmienia** ćwiczeń, serii, celów tygodniowych ani limitów między fazami. Konkretnie: w fazie 2 sesja A nadal ma trap bar 3×4–5 (nie 4×3), nie ma depth jumps; w fazie 3 cele tygodniowe nadal wynoszą A1/B1/C1/VB2/Padel1 (a nie „2 sesje siłowe”); w fazie 0 box jump ma te same dawki co później.
>
> ⚠ **Kalorie są niespójne:** fazy mówią 2600 / 2500 / 2650 / 2900, a zakładka Plan podaje stałe 2700 (dzień treningowy) / 2250 (wolny), białko 180 g, kreatyna 5 g, catering 2000 kcal + suplementy.

## 4. Sesje — pełna rozpiska

Każda sesja A/B/C ma tryb **MINIMUM** (domyślny) i **FULL** (+ dodatki). Oba zaliczają cel tygodnia tak samo. Stare wpisy bez zapisanego trybu liczą się jako FULL.

### A — Dolne / moc pionowa (MINIMUM ~40–45 min · FULL ~50–60 min)

| Blok | Ćwiczenie | Dawka | Uwagi |
|---|---|---|---|
| Rozgrzewka 6–8 min | Mobilność biodra + mostek + odwodzenie | kobra 8–10× → odwodzenie z gumą 2×12/str (noga **na bok**) → mostek 2×10 → zginacz w półklęku 2×20–30 s/str → dead bug 2×6/str → lekkie pogo 1–2×15 | bez logowania serii |
| Moc (przerwy 90–120 s) | Wskoki na skrzynię | **3×3** | start 75 cm, +5 cm po czystym 3×3, zejście krokiem |
| Siła (przerwy 2–3 min) | Martwy ciąg trap bar | **3×4–5**, krok 5 kg | uchwyty wysokie, ostatnie powt. nadal szybkie |
| | Hip thrust ze sztangą | **3×6–8**, krok 5 kg | peak squeeze 1 s |
| | Bułgarski przysiad | **2×6–8** na nogę, krok 2,5 kg | |
| Core | Pallof press **albo** dead bug | 2×8–10 | wybierasz 1 |
| *FULL* | Uginanie nóg / RDL jednonóż | 2×8–10, krok 2,5 kg | |
| *FULL* | Wspięcia na palce jednonóż | 2×10–15 / nogę | |

### B — Góra / core / ramiona (MINIMUM ~40–45 min · FULL ~50–55 min)

| Blok | Ćwiczenie | Dawka | Uwagi |
|---|---|---|---|
| Rozgrzewka 5–6 min | Face pull + rotacja zewnętrzna + pull-apart | 2×12 / 2×12 na str. / 2×15 | |
| Główne (przerwy 2 min) | Wyciskanie hantli na ławce | **3×8–10**, krok 2,5 kg | |
| | Podciąganie / ściąganie drążka | **3×8–10**, krok 2,5 kg | pulldown jeśli <8 podciągnięć |
| | Wyciskanie hantli nad głowę, siedząc | **3×8–10**, krok 2,5 kg | |
| | Wiosłowanie hantlem | **3×8–10** / stronę, krok 2,5 kg | |
| Core | Deska na piłce | 2–3×45–60 s | |
| | Deska boczna z unoszeniem biodra | 2×8–10 / stronę | |
| *FULL* | Wznosy bokiem | 2×12–15 | |
| *FULL* | Uginanie + wyprosty (superseria) | 2×10–12 | |

### C — Atletyczny FBW (MINIMUM ~45–50 min · FULL ~55–60 min)

| Blok | Ćwiczenie | Dawka | Uwagi |
|---|---|---|---|
| Rozgrzewka 6–8 min | Mobilność + aktywacja bioder + skipy | kobra, odwodzenie + monster walk 2×10/str, skipy A + shuffle 2×12 m, 90/90 2×6/str | |
| Moc (przerwy 90 s) — **rotacja jednego z trzech** | Skok w dal z miejsca | 3×3 | rotacja: liczba zapisanych sesji C modulo 3 |
| | Skok boczny + lądowanie (lateral bound + stick) | 3×4 / stronę | hold 2 s |
| | Rzut piłką rotacyjnie | 3×6 / stronę | |
| *FULL* | Slam piłką | 2–3×4–6 | dokładany do aktualnej mocy |
| Siła (przerwy 90 s) | Przysiad goblet / przedni | **3×6–8**, krok 2,5 kg | bez sztangi na plecach w fazie 0–1 |
| | Zakroki tyłem z hantlami | **2×8** / nogę, krok 2,5 kg | |
| | Pompki / wyciskanie (łatwiejszy wariant) | 2–3×8–12 | bez logu ciężaru |
| | Spacer farmera | 2×30–40 m | |
| *FULL* | Dead bug z gumą | 2×8–10 / stronę | |
| *FULL* | Pallof press z krokiem | 2×8 / stronę | |

### D — Rehab / mobilność (~20 min, dom)

Opcjonalna jednostka ręczna (od 1.3.0 nic jej nie sugeruje): kobra/McKenzie 15×, zginacz biodra w półklęku 2×45 s/str, prosty uda leżąc bokiem 2×45 s/str, 90/90 (8 przejść + 30 s), open book 10/str, pies z głową w dół z kolanem 10/str, pozycja dziecka 3 kierunki (1 min ×3), dead bug 3×10/str, deska boczna 3×8/str (3 s), odwodzenie + kickback z gumą 2×15/str.

### Siatkówka i padel

Nie trening do odhaczania, tylko cztery fazy opisowe (rozruszanie → aktywacja → przygotowanie pod grę → schłodzenie, razem ~15–20 min) i jedno zatwierdzenie „Zagrane”. Apka liczy tylko częstotliwość gier (średnia z max 4 pełnych tygodni) i komentuje:
- siatkówka < ~1,5×/tydz. → przesuń trochę plyometrii z powrotem na siłownię,
- siatkówka > ~3,2×/tydz. → blok mocy w A można ciąć o połowę.

## 5. Progresja ciężarów — dokładny algorytm

### Podwójna progresja (wszystkie ćwiczenia z ciężarem)

Dla każdego ćwiczenia: liczba serii, zakres powtórzeń `[min, max]`, krok (kg). Algorytm patrzy na **poprzednią sesję** (dzisiejsze serie nie wpływają na podpowiedź) i bierze **najcięższy ciężar** z tej sesji, liczbę serii na nim i **najmniejszą liczbę powtórzeń** w tych seriach.

Kolejność reguł:

1. **Brak historii** → ciężar startowy z `LIFTY` (jeśli jest) albo „dobierz ciężar z 2 powt. zapasu”.
2. **Tydzień deload (8, 16)** → 60% ostatniego ciężaru, zaokrąglone do 2,5 kg, bez maksów.
3. **Stagnacja:** ≥ 3 ostatnie sesje na tym samym ciężarze bez zaliczenia „wszystkie serie × górny zakres” → zejście o ~10% (min. jeden krok), cel `serie × max`, potem wracasz w górę.
4. **Zaliczone serie × górny zakres** → ciężar + krok, wracasz do dolnego zakresu.
5. **Za mało serii** na tym ciężarze → ten sam ciężar, dokończ do pełnej liczby serii.
6. W pozostałych przypadkach → ten sam ciężar, cel = (najmniejsze powt. z ostatniej sesji + 1), max do górnego zakresu.

### Tabela ćwiczeń (z `data.js`)

| Ćwiczenie | Sesja | Serie | Zakres | Krok | Start | Cele w Postępie (f1 / f2) |
|---|---|---|---|---|---|---|
| Trap bar deadlift | A | 3 | 4–5 | 5 kg | — | 110 / 130 kg |
| Hip thrust | A | 3 | 6–8 | 5 kg | 15 kg | 90 / 120 kg |
| Bułgarski przysiad | A | 2 | 6–8 /nogę | 2,5 kg | — | 20 / 26 kg |
| RDL jednonóż / leg curl | A (FULL) | 2 | 8–10 | 2,5 kg | — | — |
| Wyciskanie hantli (ławka) | B | 3 | 8–10 | 2,5 kg | 22,5 kg | 27,5 / 30 kg |
| Podciąganie / ściąganie | B | 3 | 8–10 | 2,5 kg | 55 kg (ściąganie) | — |
| Wyciskanie nad głowę | B | 3 | 8–10 | 2,5 kg | — | — |
| Wiosłowanie hantlem | B | 3 | 8–10 /str. | 2,5 kg | 20 kg | 27,5 / 32,5 kg |
| Przysiad goblet / przedni | C | 3 | 6–8 | 2,5 kg | — | — |
| Zakroki tyłem | C | 2 | **8–8** | 2,5 kg | 16 kg | — |
| Wskoki na skrzynię | A | 3 | **3–3** | **5 cm** | **75 cm** | — |

### Szczególne przypadki

- **Box jump** — progresja wysokością, nie ciężarem: czyste 3×3 → +5 cm (bez dokładania powtórzeń). Stagnacja 3 sesji → −10% wysokości (min. 20 cm). Deload: 70% wysokości.
- **Zakroki tyłem** mają zakres 8–8, więc **jedna czysta sesja 2×8 od razu podbija o 2,5 kg** — nie ma etapu dokładania powtórzeń.
- **Pull-up/pulldown** loguje się w kg ściągania (start 55), ale opis ćwiczenia sugeruje też podciąganie — jeden klucz dla dwóch różnych ruchów.
- Ćwiczenia bez klucza `lift` (pompki, farmer, deski, core, wznosy, curls/triceps, slam, rzuty, skoki w dal) **nie mają żadnej automatycznej progresji** — nic nie loguje ciężaru ani nie podpowiada zwiększenia.
- Pominięcie ćwiczenia zapisuje się w historii imiennie; trening nie musi być kompletny.

> ⚠ **Rozjazd w dokumentacji:** `PLANY.md` (wcześniejszy opis) podaje inne serie/zakresy niż `data.js` (np. trap bar 4×5–6, hip thrust 4×8–10, bench 4×8–10). **Obowiązuje `data.js`** — tabela wyżej jest z niego.

## 6. Waga i testy

**Kontrola tempa redukcji** (średnia 7 dni vs poprzedni tydzień, wymaga ≥ 8 pomiarów i ≥ 3 w każdym tygodniu):

| Zmiana średniej | Komunikat |
|---|---|
| ≤ −0,8 kg/tydz. | za szybko → dodaj 200–250 kcal |
| −0,55 … −0,8 | nieco szybciej niż cel; jeśli drugi tydzień → +150 kcal |
| −0,25 … −0,55 | w celu, nic nie zmieniaj |
| −0,25 … +0,1 | stoi → drugi tydzień z rzędu: −150–200 kcal albo sprawdź weekendy |
| > +0,1 | rośnie → przejrzyj kalorie |

**Testy sprawnościowe co 28 dni** (przypomnienie w apce), na świeżo, przed treningiem:

| Test | Cel |
|---|---|
| Wyskok dosiężny z rozbiegu | +4–7 cm |
| CMJ | +3–5 cm |
| Skok w dal z miejsca | +10–20 cm |
| Deska boczna L / P | 90 s |
| Deska na piłce | 90 s |

Apka pokazuje różnicę względem pierwszego pomiaru.

## 7. Tryb sesji MINIMUM / FULL

- Domyślnie **MINIMUM** (silnik zawsze sugeruje minimum).
- FULL dokłada ćwiczenia oznaczone *FULL* w tabelach wyżej.
- Oba tryby zaliczają ten sam cel tygodnia.
- Rotacja mocy w C idzie po liczbie zapisanych sesji C (0 → skok w dal, 1 → lateral bound, 2 → rzut piłką).

## 8. Moje obserwacje z kodu (hipotezy, nie diagnoza)

To wnioski z samej struktury planu, **nie z Twoich danych** — nie wiem, co u Ciebie nie działa.

1. **Szkic tygodnia sprzeczny z regułami** (sekcja 2) — cztery dni skoków w tygodniu (A, C, 2×VB) bez sąsiadowania wymagają układu typu Pn/Śr/Pt/Nd, a szkic tego nie zachowuje (to też oznacza, że przy obecnych regułach 4 jednostki skokowe zostawiają prawie zerowy margines na przesunięcia).
2. **Fazy nie sterują niczym** (sekcja 3) — plan po 8 tygodniach wygląda tak samo jak w tygodniu 1; faza 2 („moc”) i 3 („podtrzymanie”) istnieją tylko w opisie.
3. **Niska objętość w trybie MINIMUM** — domyślny tryb to np. 3 ćwiczenia siłowe po 2–3 serie na całe dolne partie w A; przy celu redukcji i wzrostu mocy to może być za mało bodźca (do oceny po Twoich danych).
4. **Progresja liczona na jedną sesję wstecz** — jedna słaba sesja (np. po grze w siatkówkę poprzedniego dnia) zatrzymuje podbijanie ciężaru; z drugiej strony zakroki skaczą od razu o 2,5 kg po jednej czystej sesji.
5. **Wiele ćwiczeń bez progresji** — core, pompki, farmer i całe C-moc nie mają automatycznego mechanizmu postępu.
6. **Deficyt kaloryczny + 4–6 jednostek tygodniowo + praca biurowa** — to kontekst, który zwykle ogranicza regenerację; apka nie ma żadnego pomiaru snu, zmęczenia ani RPE.

## 9. Do uzupełnienia przed rozmową z asystentem

Odpowiedz (najlepiej konkretnie), bo od tego zależy, czy rady będą trafne:

- Co dokładnie „się nie sprawdza”? (brak postępu w ciężarach / zmęczenie / za dużo / za mało / nuda / czas / waga nie spada / forma w siatkówce)
- Które ćwiczenia stoją w miejscu i od kiedy? (eksport CSV z apki)
- Ile realnie trenujesz w tygodniu vs ile zakłada plan? Ile razy grasz w siatkówkę i padla?
- Waga startowa, obecna, tempo; ile śpisz; jak wygląda jedzenie poza cateringiem?
- Ile masz czasu na jedną sesję? Czy MINIMUM wystarcza, czy zawsze robisz FULL?
- Dostęp do sprzętu (trap bar, skrzynia, hantle — do jakiej wagi, wyciąg, guma, piłka)?
- Czy w sezonie siatkarskim planujesz zmienić częstotliwość gier?
- Czy któraś część planu (np. szkic tygodnia, fazy, kalorie) ma być traktowana jako wiążąca, a która jako luźna?

### Prompt startowy (do wklejenia razem z tym plikiem)

> Jesteś trenerem siłowo-kondycyjnym. Poniżej mój aktualny plan i reguły progresji z aplikacji, którą sam napisałem. Plan „trochę się nie sprawdza” — [tu opisz objawy]. Przeanalizuj spójność planu, wskaż błędy w logice (np. szkic tygodnia vs reguły skoków, fazy, które nic nie zmieniają) i zaproponuj konkretne zmiany: ćwiczenia, serie, zakresy, kroki progresji, strukturę tygodnia i faz. Dla każdej zmiany podaj uzasadnienie i co należałoby ją zweryfikować w danych. Nie zgaduj brakujących informacji — zadaj mi pytania.
