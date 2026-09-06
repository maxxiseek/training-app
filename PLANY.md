# Plany treningowe — Ty i Olga

Dokument wyjęty z aplikacji (stan kodu na `main`, wrzesień 2026).  
Opisuje **konteksty, cele, fazy, sesje, progresje i reguły**, bez technicznych szczegółów UI.

| | Ty (root PWA) | Olga — **Szczyt** (`szczyt/`) |
|---|---|---|
| Start planu | 18.08.2026 | 27.08.2026 |
| Główny cel sportowy | Siła + moc pod **siatkówkę** (i padel) | Nogi/pośladki + dynamika + **pięciotysięcznik (~5000 m)** |
| Kontrola zdrowia | Światła **SKB** (prawy pośladek) + rehab D | Bez SKB |
| Waga | Cel **85 kg**, kontrola tempa redukcji | Lekka redukcja (`CEL_WAGA` jeszcze nieustawione) |
| Wspólne | Duży overlap A/C (trap, hip thrust, bułgarski, RDL, box jump…) — da się ćwiczyć razem | |

---

## 1. Twój plan (aplikacja główna)

### 1.1 Kontekst

- Plan **atletyczny**: siła dolnych + plyometria + sport (siatkówka ×2, padel ×1).
- Historia / ograniczenie: **prawy SKB** i okolica L5/S1 — apka ma światła i sesję rehab **D**.
- Padel jest **lekki** (nie liczy się jako „ciężki dzień”) — można grać po siłowni.
- Siatkówka jest **ciężka i skokowa** — nigdy dzień po A/C (i odwrotnie).

### 1.2 Cele

**Tygodniowe (okno 7 dni, suma 6 → zostaje slot na rest):**

| Jednostka | Cel |
|---|---|
| A — Dolne / moc pionowa | 1× |
| B — Góra / core / ramiona | 1× |
| C — Atletyczny FBW | 1× |
| Siatkówka (VB) | 2× |
| Padel | 1× |
| D — Rehab | nie jest celem tygodnia (wchodzi przy SKB) |
| REST | sugestia, nie „cel do odhaczenia” |

**Długoterminowe (fazy):**

| Tygodnie | Faza | Kalorie (orient.) | Akcent |
|---|---|---|---|
| 1–3 | 0 — Kalibracja | ~2600 | 2–3 RIR; plyo tylko lądowania / pogo |
| 4–11 | 1 — Baza siły + redukcja | ~2500 | Pełna plyo, max ~40 kontaktów/sesję; **tyg. 8 = deload** |
| 12–19 | 2 — Konwersja na moc | ~2650 | Trap bar prędkościowo (kierunek 4×3); depth jumps; **tyg. 16 = deload** |
| 20+ | 3 — Podtrzymanie w sezonie | ~2900 | 2 siłowe + D w razie potrzeby; objętość ~60% fazy 2 |

**Waga:** trend w kierunku **85 kg**; alert jeśli spadek > ~0,8 kg/tydzień.

**Testy co ~4 tygodnie:** wyskok dosiężny z rozbiegu, CMJ, skok w dal z miejsca, side plank L/P, plank na piłce.

### 1.3 Szkic tygodnia (tylko podpowiedź w Planie)

Pn **A** · Wt **VB** · Śr **B** · Cz **VB** · Pt **C** · So **Padel** · Nd **REST**

Sugestia dnia jest **adaptacyjna** (zaległości + blokady), nie sztywny kalendarz.

### 1.4 Sesje siłowe — skrót

#### A — Dolne / moc pionowa (~70 min)

1. **Rozgrzewka** — McKenzie, odwodzenie biodra z gumą (noga **na bok**), mostek, zginacz w półklęku, dead bug, pogo hops.  
2. **Moc** — box jumps **4×3** (progresja wysokości od **75 cm**); depth drop / stick od tyg. 4.  
3. **Siła** — trap bar 4×5 →6; hip thrust 4×8→10; bułgarski 3×8/nogę; RDL jednonóż / curl 3×8/nogę.  
4. **Akcesoria** — łydki jednonóż, Pallof, Copenhagen, hanging knee raises.

#### B — Góra / core / ramiona (~60 min)

Bench DB, podciąganie/ściąganie, OHP siedząc, wiosło hantlem + barki/ramiona + plank / side plank / suitcase.

#### C — Atletyczny FBW (~65 min)

Broad jump, **lateral bound + stick** (film YT), **rotational med-ball throw** (film YT), slam; goblet/front squat, zakroki, podciąganie max, pompki feet-elevated; core + farmer’s walk.  
*Bez sztangi na plecach w fazie 0–1 przy przysiadzie.*

#### D — Rehab / mobilność (~20 min, dom)

McKenzie, zginacz, prosty uda, 90/90, open book, downward dog, child’s pose 3 kierunki, dead bug, side plank, abduction + kickback z gumą.

#### VB / Padel

Rozgrzewka + schłodzenie jako **rozpiska poglądowa** (jedno zatwierdzenie „zagrane”).  
Siatkówka: aktywacja bioder/barków + skoki/approach.  
Padel: drabinka, pachwina, hamowanie, profilaktyka łokcia; po grze roller na przywodziciele.

### 1.5 Progresje (Ty)

**Podwójna progresja ciężaru (siła):**  
w zakresie `[min, max]` — najpierw wszystkie serie na max powtórzeń → potem podbicie o `krok` kg i powrót do min.

| Lift (klucz) | Krok | Serie | Zakres | Start / cele w Postępie |
|---|---|---|---|---|
| trapbar | 5 kg | 4 | 5–6 | cele f1/f2: 110 / 130 |
| hipthrust | 5 | 4 | 8–10 | start 15; 90 / 120 |
| rfess | 2.5 | 3 | 8–10 | f1/f2: 20 / 26 |
| rdl | 2.5 | 3 | 8–10 | — |
| squat | 2.5 | 3 | 8–10 | — |
| lunge | 2.5 | 3 | 10–12 | start 16 |
| benchdb | 2.5 | 4 | 8–10 | 22.5 → 27.5 / 30 |
| row | 2.5 | 3 | 10–12 | 20 → 27.5 / 32.5 |
| ohp | 2.5 | 3 | 10–12 | — |
| pullup | 2.5 | 4 | 8–10 | start 55 (ściąganie) |
| boxjump | **5 cm** | 4 | 3–5 powt. | start **75 cm** (pole = cm, nie kg) |

**Box jump:** po czystym 4×5 → +5 cm, wracasz do 3 powt. Zejście **krokiem**, nigdy zeskokiem.

**Żółte SKB:** chowa plyo; bez podbijania ciężaru.  
**Czerwone SKB:** sugestia / nacisk na **D**.

**Hamulce sugestii (nie blokują chipów):** max 3 treningi z rzędu; max 2 ciężkie (A/C/VB) z rzędu; max 6 jednostek / 7 dni; nie dwa dni skoków pod rząd (A, C, VB).

**Priorytet zaległości:** A → C → VB → B → Padel.

---

## 2. Plan Olgi — Szczyt

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

| Element | Ty | Olga |
|---|---|---|
| A: trap, hip thrust, RFESS, RDL, box jump | tak | tak (te same lifty) |
| C: plyo + goblet + lunges | tak | tak (+ step-up zamiast ciężkiego podciągania) |
| B | pełna góra | góra light + glute volume |
| Sport | VB+padel jako pełne jednostki tygodnia | VB/padel/balet jako extra |
| Góry | — | dedykowany TG 1×/tydz. |
| SKB / D | tak | nie |
| Box jump start | 75 cm | 75 cm |
| Filmy YT | lateral bound, med-ball throw | to samo |

**Praktycznie:** dni A i C da się robić równolegle na tych samych stanowiskach; różnice są w B i w „górskim / sportowym” slotcie.

---

## 4. Bezpieczeństwo (skrót z apki)

**Ty — L5/S1 i prawy SKB**

- Żółte: bez plyo, bez gonienia ciężaru.  
- Czerwone: D / odpoczynek.  
- Nie roluj bezpośrednio lędźwi / SKB — wokół.  
- Czerwone flagi: ból SKB >48 h po treningu, ból w nocy, neurologia → fizjo/lekarz.  
- Przy ≥6 dniach z objawami / 30 dni apka traktuje to jako wzorzec.

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
