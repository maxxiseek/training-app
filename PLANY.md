# Plany treningowe — Ty i Olga

Dokument opisuje **konteksty, cele, sesje, progresje i reguły**, bez technicznych szczegółów UI.  
Sekcja 1 (Twój plan) jest zgodna z `data.js` / `engine.js` w wersji **1.4.0**. Sekcja 2 (Olga — Szczyt) opisuje osobną aplikację w `szczyt/`, która **nie zmieniła się w 1.4.0**.

| | Ty (root PWA) | Olga — **Szczyt** (`szczyt/`) |
|---|---|---|
| Start | cykl od 19.10.2026 | 27.08.2026 |
| Główny cel sportowy | Eksplozywność + siła pod **siatkówkę** (i padel) | Nogi/pośladki + dynamika + **pięciotysięcznik (~5000 m)** |
| Waga | Cel **85 kg**, kontrola tempa redukcji | Lekka redukcja |
| Wspólne | Od 1.4.0 plany A/C **nie pokrywają się** już z planem Olgi | |

---

## 1. Twój plan (aplikacja główna, v1.4.0)

### 1.1 Cele przebudowy

- Sesje ~50 min, jedna wersja (zamiast MIN/FULL); gorszy dzień → przycisk **Skrót** (tylko bloki 1–3).
- Mniej obciążenia nóg (siatkówka i padel też je obciążają), więcej eksplozywności pod siatkówkę.
- **Core w każdej sesji**, równy rozwój górnej części ciała.

### 1.2 Cele tygodniowe (okno 7 dni, ruchome)

| Jednostka | Cel |
|---|---|
| A — Nogi + wyskok | 1× |
| B — Góra | 1× |
| C — Atletyczny | 1× |
| Siatkówka / padel („gra”) | bez celu, logowane ręcznie |
| D — rehab/mobilność | opcjonalna, ręcznie |
| REST | sugestia |

**Szkic tygodnia:** Pn **A** · Wt – · Śr **C** · Cz – · Pt **B** · So **gra** · Nd wolne.  
Wolne dni to sloty na gry z doskoku. **Gra w dniu planowanej A/C zastępuje sesję — przesuń, nie rób obu.**

### 1.3 Sugestia dnia (`sugeruj()`)

Ustawienie **stała gra** = dzień tygodnia (domyślnie sobota, edytowalne w Więcej → Ustawienia).

Blokady:

| Jednostka | Blokada |
|---|---|
| **A** | nie dzień po grze; nie, gdy do najbliższej stałej gry jest < 48 h (przy sobocie: nie w piątek i sobotę); min. 48 h od C |
| **C** | nie dzień przed stałą grą; min. 48 h od A (nie dzień po A) |
| **B** | tylko „już zrobione dziś” |

Kolejność decyzji:

1. Dziś zapisano REST → REST.
2. 3 dni z rzędu jakakolwiek aktywność (siłownia, rehab, gry) → sugeruj REST.
3. Spośród niezablokowanych jednostek z zaległością wybierz według priorytetu **A > B > C**.
4. Brak kandydatów → REST.

Chipy zawsze można stuknąć ręcznie. Usunięte w 1.4.0: reguła „nigdy dwa dni skoków z rzędu”, limity ciężkich dni z rzędu i 4 sesji na 7 dni.

### 1.4 Cykl 4-tygodniowy

- Start cyklu: `START_CYKLU` = **19.10.2026** (poniedziałek), zmienialny w Więcej → Ustawienia. UI: „Cykl N, tydzień X/4”.
- Tygodnie 1–3: normalna progresja.
- **Tydzień 4 lżejszy:** ciężar = 90% ostatniego (zaokrąglony do kroku), −1 seria, bez podbijania, bloki mocy w połowie objętości. Sesje z tygodnia lżejszego nie wyznaczają progresji (po nim wraca się do ostatniej normalnej sesji).
- Przed startem cyklu: normalna progresja, bez tygodnia lżejszego.
- Fazy 0–3 i deload w tyg. 8/16 usunięte.

**Żywienie (jedno źródło, zakładka Plan):** dzień treningowy 2700 kcal · dzień wolny 2250 kcal · białko 180 g · kreatyna 5 g. Tempo redukcji −0,4 do −0,5 kg/tydz.

### 1.5 Sesje

Każda sesja: rozgrzewka (bez logowania) + bloki 1–5. Bloki 1–3 = **rdzeń** (widoczne w trybie Skrót). „+” = superseria; „w przerwie” = osobny wiersz logu w tym samym bloku. Dawki podają liczbę serii × zakres.

#### A — Nogi + wyskok (~50 min)

Rozgrzewka: odwodzenie z gumą 15/str. · zginacz biodra w półklęku 30 s/str. · monster walk 2×10/str. · pogo 2×15 · 2 lekkie rozbiegi.

| Blok | Ćwiczenie | Serie × zakres | Krok | Progresja |
|---|---|---|---|---|
| 1 *(moc, rdzeń)* | Wyskok z rozbiegu (2–3 kroki, max dosięg) | 4×2 | — | tylko odhaczenie |
| 2 *(moc, rdzeń)* | Trap bar jump (pusty / +10–20 kg) | 3×3 | — | log kg, bez auto-progresji |
| 3 *(rdzeń)* | Trap bar deadlift + | 3×4–5 | 5 kg | podwójna |
| 3 | Pallof press | 3×10/str. | 2,5 kg | podwójna |
| 4 | Bułgarski przysiad + | 2×6–8/nogę | 2,5 kg | podwójna |
| 4 | Wspięcia jednonóż | 2×10–15/nogę | 2,5 kg | podwójna |
| 5 | Hip thrust + | 3×6–8 | 5 kg | podwójna |
| 5 | Nordic (negatyw) **lub** uginanie nóg | 2×4–6 / 2×8–10 | — / 2,5 kg | drabinka / podwójna |

#### B — Góra (~50 min, bez nóg)

Rozgrzewka: band pull-apart 2×15 · rotacja zewnętrzna barku z gumą 2×12/str.

| Blok | Ćwiczenie | Serie × zakres | Krok | Progresja |
|---|---|---|---|---|
| 1 *(moc, rdzeń)* | Slam piłką | 3×5 | — | tylko odhaczenie |
| 2 *(rdzeń)* | Landmine press w półklęku + | 3×8–10/str. | 2,5 kg | podwójna |
| 2 | Podciąganie **lub** ściąganie drążka | 3×6–10 | 2,5 kg | podwójna; osobne klucze `pullup` (dodatkowy ciężar, 0 = masa ciała) i `pulldown` |
| 3 *(rdzeń)* | Wyciskanie hantli, skos 30° + | 3×8–10 | 2,5 kg | podwójna |
| 3 | Wiosłowanie hantlem + | 3×8–10/str. | 2,5 kg | podwójna |
| 3 | Dead bug (w przerwie) | 3×8–12/str. | — | drabinka |
| 4 | Wznosy bokiem + | 3×12–15 | 1 kg | podwójna |
| 4 | Face pull | 2×12–15 | 2,5 kg | podwójna |
| 5 | Uginanie ramion + wyprosty (superseria) | 3×10–12 | 2,5 kg | podwójna (osobne klucze `curl`, `pushdown`) |

#### C — Atletyczny (~45–50 min)

Rozgrzewka: skipy A · karioka · krok odstawno-dostawny 2×12 m · 90/90 2×6/str. · monster walk 2×10/str.

| Blok | Ćwiczenie | Serie × zakres | Krok | Progresja |
|---|---|---|---|---|
| 1 *(moc, rdzeń)* | Lateral bound + stick 2 s + | 3×3/str. | — | tylko odhaczenie |
| 1 | Rzut piłką rotacyjnie o ścianę | 3×5/str. | — | tylko odhaczenie |
| 2 *(rdzeń)* | Landmine rotational press (eksplozywnie) + | 3×5/str. | — | log kg, bez auto-progresji |
| 2 | Podciąganie podchwytem | 3×6–8 | 2,5 kg | podwójna (`chinup`) |
| 3 *(rdzeń)* | RDL jednonóż z hantlem + | 3×8–10/str. | 2,5 kg | podwójna (`slrdl`, start 16 kg) |
| 3 | Pompki z obciążeniem **lub** dipy + | 3×8–12 | 2,5 kg | podwójna (`pushupw` / `dips`) |
| 3 | Deska boczna (w przerwie) | 3×30–45 s/str. | — | drabinka |
| 4 | Ab wheel + | 3×8–12 | — | drabinka |
| 4 | Suitcase carry | 2×30 m/str. | 2 kg | podwójna (kg; po 2×30 m → +krok) |
| 5 *(opcjonalny)* | Uginanie młotkowe + wyprosty na wyciągu | 2×12 | 2,5 kg | podwójna; nie wpływa na zaliczenie sesji |

#### D — Rehab / mobilność (~20 min, dom) — bez zmian

McKenzie, zginacz, prosty uda, 90/90, open book, downward dog, child’s pose 3 kierunki, dead bug, side plank, abduction + kickback z gumą.

#### Siatkówka / padel

Opisowe fazy (rozruszanie → aktywacja → pod grę → schłodzenie) z jednym zatwierdzeniem „Zagrane”. Rozgrzewka padla: w aktywacji dodany **Copenhagen plank 2×20 s/str.**

### 1.6 Progresje

**Podwójna progresja** (ćwiczenia z `zakres` i `krok`): najpierw wszystkie serie na górnym zakresie → potem ciężar + `krok`, powrót do dolnego zakresu. Podpowiedź liczy się z **poprzedniej sesji** (najcięższy ciężar, liczba serii na nim, najmniej powtórzeń); dzisiejsze serie jej nie zmieniają. Kolejność reguł:

1. brak historii → start (`LIFTY.start`) albo „dobierz z 2 powt. zapasu”,
2. `progresja: 'brak'` → pokazuje ostatni ciężar, bez podbijania,
3. **powrót po przerwie** (ostatnia sesja > 14 dni) → 90% ostatniego ciężaru (zaokrąglone do kroku), cel = dolny zakres; przez kolejne 2 sesje tego ćwiczenia bez podbijania, potem normalnie,
4. **tydzień lżejszy** → 90% ostatniego, −1 seria, bez podbijania,
5. **stagnacja** (3 sesje na tym samym ciężarze bez zaliczenia) → ~10% niżej,
6. normalnie: zaliczone → +krok; brak serii → ten sam ciężar; inaczej ten sam ciężar, cel +1 powt.

Ćwiczenia z masą ciała (`pullup`, `chinup`, `pushupw`, `dips`, `trapjump`) mają start **0 kg** (dodatkowy ciężar); zapis 0 kg jest dozwolony.

**Drabinka wariantów** (ćwiczenia bez ciężaru; `ladder` w `data.js`): wszystkie serie na górnym zakresie → następny wariant od dolnego zakresu; inaczej ten sam wariant, cel +1 powt. lub +5 s. Stagnacja → wariant niżej; tydzień lżejszy → −1 seria, bez awansu; po przerwie → ten sam wariant, dolny zakres.

| Ćwiczenie | Drabinka |
|---|---|
| Dead bug | bez obciążenia 8–12 → z gumą nad głową 8–12 → z hantlem 4–6 kg 8–12 |
| Deska boczna | zwykła 30–45 s → z odwodzeniem górnej nogi 30–45 s → z mini-gumą na kolanach 30–45 s |
| Ab wheel | z kolan, krótki zasięg 8–12 → z kolan, pełny zasięg 8–12 → z kolan, pauza 1 s na dole 8–12 |
| Nordic | negatyw 4–6 → negatyw wolniej (5 s) 4–6 → negatyw + odbicie z dołu 4–6 |

**Zapis serii:** ćwiczenie z kluczem logu odhaczone bez wpisanego ciężaru → przy zapisie jedno zbiorcze przypomnienie „Brak ciężaru: X, Y — uzupełnić?” (bez blokowania zapisu).

### 1.7 Migracja danych (1.4.0)

Historia zostaje w całości; ćwiczenia usunięte z planu (`benchdb`, `ohp`, `squat`, `lunge`, `boxjump`) zostają w danych i CSV, tylko nie są pokazywane w sesjach (w Postępie → Rekordy mają dopisek „archiwum”).

| Stary klucz | Nowy klucz |
|---|---|
| trapbar, hipthrust, rfess, row | bez zmian |
| rdl | `legcurl` (historia = uginanie nóg); nowy `slrdl` (C) od zera, start 16 kg |
| pullup | `pulldown` (logowane w kg ściągania); nowy `pullup` = podciąganie, start 0 kg |
| benchdb | archiwum; nowy `inclinedb`, start 22,5 kg |
| ohp | archiwum; nowy `landminepress`, start 5 kg (+ gryf) |
| squat, lunge, boxjump | archiwum |

Migracja uruchamia się raz (pole `schema: 2`), także przy wczytaniu starej kopii JSON. Porządki: dni z `sesja: null` i niepustym `zrobione` dostają sesję z prefiksu ID; gdy `dni[d].sesja` różni się od wpisu w `historia`, wygrywa `historia`; pole `trybSesji` jest ignorowane.

---

## 2. Plan Olgi — Szczyt

### Szczyt — różnice po 1.1.0

- **B** = góra light + glute (bez OHP); FULL dokłada frog pump + drugą izolację glute.
- **GORY** bez MIN/FULL; po ciężkim wyjściu (marsz/plecak ≥60 min albo schody/bieżnia na max czasie) sugestia unika A/C następnego dnia i preferuje MINIMUM.
- Extra VB/Padel: podgląd faz przy „Dodatkowo dziś”.

### 2.1 Kontekst

- Osobna PWA (dane lokalne osobno), motyw „góry + siła”.
- **Bez SKB**, bez sesji rehab D, bez testów wyskoku.
- Fokus: **nogi i pośladki**, dynamika, **trening górski pod szczyt ~5000 m**.
- Siłownia mocno zsynchronizowana z Twoim A/C (te same lifty), żeby dało się trenować razem.
- Siatkówka / padel / **balet** / „inne” = **Dodatkowo dziś** — lekkie, łączone z siłownią tego samego dnia; **nie** liczą się do limitu głównych sesji.

### 2.2 Cele

**Tygodniowe (suma 4):**

| Jednostka | Cel |
|---|---|
| A — Dolne / moc | 1× |
| B — Góra light + glute | 1× |
| C — Atletyczny + nogi | 1× |
| TG — Trening górski | **1×** |
| Extra (VB, padel, balet, AKT) | tracker, poza celem |

**Hamulce:** max 3 treningi główne z rzędu; max 2 ciężkie (A/C) z rzędu; max **4** sesje główne / 7 dni.

**Fazy:**

| Tygodnie | Faza | Akcent |
|---|---|---|
| 1–3 | 0 — Kalibracja | zapas 2 powt.; ostrożna plyo; lekki GORY; lekki deficyt |
| 4–11 | 1 — Baza + redukcja | siła nóg/pośladków + dynamika; budowa objętości marszu/stromizny; **tyg. 8 deload** |
| 12+ | 2 — Pod szczyt | utrzymaj siłę; dłuższe / obciążone wyjścia (plecak); bez zbędnego maxowania; **tyg. 16 deload** |

### 2.3 Szkic tygodnia

Pn **A** · Wt **B** · Śr **GORY** · Cz **C** · Pt–Nd **REST** (szkic — sugestia i tak dopasowuje).

### 2.4 Sesje

#### A — jak u Ciebie (overlap)

Te same bloki mocy i siły (box 75 cm, trap, hip thrust, bułgarski, RDL) + te same akcesoria.  
**Starty ciężarów Olgi** (konwencja zapisu poniżej): trap **45** (tylko talerze), hip thrust **25** (talerze), bułgarski **20** (łącznie w rękach), RDL **16** (jedna hantla).

#### B — Góra light + glute (~60 min)

- Góra: bench DB (**7,5** / hantla), ściąganie/podciąganie, wiosło (**10** / hantla).  
- Pośladki: hip thrust na wyciągu/maszynie, kickback, odwodzenie, frog pump.  
- Core: plank na piłce, side plank.

*(U Ciebie B jest pełniejszą górą z OHP i ramionami — u Olgi zamiast tego wolumen glute.)*

#### C — Atletyczny + nogi

Jak u Ciebie w mocy (broad / lateral bound + YT / med-ball + YT / slam).  
Siła: goblet (**20**), zakroki (**20** łącznie), **step-up**, pompki łatwiejszy wariant.  
Finisz: dead bug, Pallof z krokiem, farmer’s walk (symulacja plecaka).

#### TG — Trening górski (checklist, można odhaczyć >1)

Progresja **czasu** (minuty), potem trudności (wznios / kg plecaka):

| Opcja | Zakres | Start | Krok czasu |
|---|---|---|---|
| Schody / stepper | 25–40 min | 25 min, wznios ~5 | +2 min |
| Bieżnia pod górę | 20–35 min | 20 min, wznios ~6 | +2 |
| Marsz / podejście | 45–90 min | 45 min | +5 |
| Podejście z plecakiem | 40–90 min | 40 min, ~4 kg | +5 |

Po `zakres[1]` minut apka zaczyna podbijać wznios/poziom zamiast czasu.

#### Dodatkowo dziś

Siatkówka, padel, **balet**, inna aktywność — odhaczenie + historia + Postęp; nie blokują A/B/C/GORY.

### 2.5 Progresje (Olga)

Ta sama **podwójna progresja** kg + box jump w cm (start 75).  
Dodatkowo **progresja czasu** na GORY (kg w store = minuty, p = wznios).

**Konwencja wpisywania kg (żeby nie mieszać „ze sztangą / bez”):**

| Typ | Co wpisujesz | Przykłady |
|---|---|---|
| `talerze` | tylko talerze, **bez** barem | trap 45, hip thrust 25 |
| `hantla` | waga **jednej** hantli | RDL 16, bench 7,5, row 10 |
| `rece` | **łącznie** w rękach | bułgarski 20, zakroki 20 |
| `goblet` | kettle / hantla przy klatce | przysiad 20 |
| `stos` | kg na maszynie / wyciągu | hip thrust B, ściąganie |

---

## 3. Co jest wspólne / jak trenować razem

Od 1.4.0 **plany A i C nie pokrywają się** z planem Olgi (Szczyt nie został zmieniony) — wspólne treningi na tych samych stanowiskach nie są już zakładane. Sprzęt i kroki ciężarów są niezależne.

| Element | Ty | Olga |
|---|---|---|
| A | nogi + wyskok | dolne / moc (stary plan) |
| C | atletyczny | atletyczny + nogi (stary plan) |
| B | góra | góra light + glute |
| Sport | gry bez celu tygodniowego | VB/padel/balet jako extra |
| Góry | — | dedykowany TG 1×/tydz. |
| D (rehab/mobilność) | opcjonalnie | nie |

---

## 4. Bezpieczeństwo (skrót z apki)

**Ty**

- Plyo na świeżych nogach (blok mocy na początku).  
- Trap bar zamiast klasycznego martwego ciągu; przysiad ze sztangą na plecach dopiero po fazie 0–1.  
- Wyciskanie nad głowę siedząc, z oparciem.  
- Od 1.3.0 brak świateł SKB i czerwonych flag w apce.

**Olga**

- Plyo na świeżych nogach (blok mocy na początku).  
- Przysiad ze sztangą na plecach dopiero gdy goblet/front jest czysty.  
- Po długim GORY: łydki, zginacz, pośladek.  
- Odwodzenie z gumą = **noga na bok**, nie kickback do tyłu.

---

## 5. Gdzie to żyje w kodzie

| | Ty | Olga |
|---|---|---|
| Plan / fazy / cele | `data.js` | `szczyt/data.js` |
| Sugestia dnia | `engine.js` | `szczyt/engine.js` |
| UI | `index.html` | `szczyt/index.html` |
| Deploy | root Pages | `…/szczyt/` |

Po zmianie planu podbij `APP.wersja` **i** `CACHE` w service workerze odpowiedniej apki.

---

*Wygenerowane z aktualnych `data.js` / README / logiki progresji w HTML — jako źródło prawdy dla Ciebie i Olgi poza telefonem.*
