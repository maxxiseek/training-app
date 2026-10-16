# Plan atletyczny — PWA

Aplikacja treningowa na telefon. Instaluje się na ekranie głównym Androida jak zwykła apka, działa offline, zapisuje dane lokalnie w telefonie.

Aktualna wersja: **1.4.0** · historia zmian w `CHANGELOG.md`.

Osobna wersja dla Olgi: katalog **[`szczyt/`](szczyt/)** — PWA **Szczyt** (plan nóg/pośladków + góry). Deploy: `…/szczyt/`.

Opis obu planów (cele, cykl, sesje, progresje): **[`PLANY.md`](PLANY.md)** — sekcja 1 (Twój plan) jest zgodna z `data.js`.

---

## Wdrożenie na GitHub Pages — 5 minut

1. **Nowe repo.** github.com → New repository → nazwa np. `trening` → **Public** (Pages działa na darmowym koncie tylko dla repo publicznych) → Create.

2. **Wrzuć pliki.** Na stronie repo: `Add file` → `Upload files` → przeciągnij **wszystkie** pliki z tego folderu:
   ```
   index.html
   data.js
   engine.js
   sw.js
   manifest.webmanifest
   icon-192.png
   icon-512.png
   icon-512-maskable.png
   CHANGELOG.md
   ```
   → `Commit changes`.

   > Pliki muszą wylądować w **katalogu głównym** repo, nie w podfolderze.

3. **Włącz Pages.** `Settings` → `Pages` (lewe menu) → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → `Save`.

4. **Poczekaj ~1 minutę.** Odśwież stronę Settings → Pages, pojawi się adres:
   ```
   https://TWOJ-LOGIN.github.io/trening/
   ```

5. **Zainstaluj na telefonie.** Otwórz ten adres w **Chrome na Androidzie** → menu (⋮) → **„Dodaj do ekranu głównego"** / „Zainstaluj aplikację". Ikona pojawi się obok innych apek, otworzy się na pełnym ekranie bez paska przeglądarki.

---

## Alternatywa: Cloudflare Pages (działa z **prywatnym** repo, za darmo)

GitHub Pages na darmowym koncie wymaga repo publicznego. Cloudflare Pages obsługuje prywatne repozytoria na darmowym planie.

1. Wrzuć pliki do **prywatnego** repo na GitHubie
2. dash.cloudflare.com → **Workers & Pages** → `Create` → zakładka **Pages** → `Connect to Git`
3. Autoryzuj GitHuba, wybierz repo
4. Framework preset: **None**. Build command: **zostaw puste**. Output directory: `/`
5. `Save and Deploy` → dostajesz adres `https://cos.pages.dev`

> Uwaga: prywatne repo ukrywa **kod**, nie stronę — adres `.pages.dev` jest publiczny. Jeśli chcesz też bramkę logowania, dołóż Cloudflare Access (Zero Trust, darmowy do 50 użytkowników).

---

## Alternatywa: Netlify Drop (bez gita, ~2 min)

1. Wejdź na **app.netlify.com/drop**
2. Przeciągnij cały folder z plikami na stronę
3. Dostajesz od razu adres `https://cos-tam.netlify.app` — otwórz go na telefonie i „Dodaj do ekranu głównego"

Konto założysz później, jeśli będziesz chciał zmienić nazwę adresu.

---

## Co apka robi

**Dziś**
- **Adaptacyjna sugestia treningu siłowego (A/B/C)** — bez siatkówki/padla (te odhaczasz osobno); w karcie widać też ostatnie treningi.
- Wybór jednostki: A, B, C, D, siatkówka, padel, **dzień wolny**. Kropka przy chipie = dzisiejsza sugestia — zawsze możesz stuknąć inną.
- **Skrót** — przycisk na górze sesji siłowej. Pokazuje tylko bloki 1–3 (rdzeń); używasz go na gorszy dzień, domyślnie sesja jest pełna. Zalicza cel tygodnia tak samo. Blok 5 w C jest opcjonalny i nie wpływa na zaliczenie sesji.
- **Superserie i „lub”** — pozycje z „+” robisz w parze; przy „X lub Y” (np. podciąganie / ściąganie drążka) wybierasz wariant, każdy ma własny log.
- **Drabinka wariantów** przy ćwiczeniach bez ciężaru (dead bug, deska boczna, ab wheel, nordic) — apka podpowiada, kiedy przejść na trudniejszy wariant.
- **Cykl 4-tygodniowy** — w nagłówku „Cykl N, tydzień X/4”; tydzień 4 jest lżejszy (~90% ciężaru, −1 seria, moc w połowie objętości).
- Checklista z odznaczaniem, pasek postępu, wibracja przy odznaczeniu.
- Przy ćwiczeniach siłowych **wszystkie serie z planu są od razu otwarte**, z wpisanym z góry sugerowanym ciężarem. Wpisujesz tylko powtórzenia; ciężar zmieniasz, jeśli bierzesz inny. Komplet serii = ćwiczenie odhacza się samo.
- **Siatkówka i padel działają inaczej niż siłownia** — patrz niżej.
- **Pomiń** przy każdym ćwiczeniu — ćwiczenie zostaje oznaczone jako świadomie odpuszczone i trafia pod tą nazwą do historii.
- Trening **nie musi być kompletny**, żeby go zapisać. Zapisujesz ile zrobiłeś, a apka odnotowuje resztę.
- **Stopery** przy ćwiczeniach czasowych — apka sama czyta czas z opisu („30 s", „45 s/str", „1 min") i pokazuje przycisk ⏱. Stuknięcie startuje odliczanie, koniec sygnalizuje wibracją. Ponowne stuknięcie anuluje.
- **Notatka z treningu** — jak się czuło, co bolało, co odpuściłeś. Pokazuje się potem przy wpisie w historii.
- **Przypomnienia na górze ekranu** — testy sprawnościowe po 28 dniach od ostatniego pomiaru, kopia zapasowa po 30 dniach od ostatniej.
- **Zakończ i zapisz w historii** — zapisuje jednostkę wraz z tym, co pominięte, i od razu przelicza sugestię na kolejny dzień. Po zapisie u góry pojawia się zielona ramka z podsumowaniem, a przycisk zmienia się w *Zaktualizuj wpis w historii* — możesz dopisać coś później i zapisać ponownie.

**Postęp**
- **Regularność** — realizacja celów tygodniowych za 4 ostatnie tygodnie, z kolorem wg progu (≥80% zielony, ≥50% żółty).
- **Kontrola tempa redukcji** — porównuje średnią 7-dniową z poprzednim tygodniem i reaguje: za szybko (>0,8 kg/tydz.) → dodaj 200–250 kcal; w celu → nic nie zmieniaj; stoi → odejmij 150–200 kcal albo sprawdź weekendy.
- **Historia treningów** — co, kiedy, ile z ilu punktów zrobione i **imiennie co zostało pominięte**. Licznik ostatnich 30 dni.
- Waga: wykres, ostatni pomiar, średnia z 7 dni, ile zostało do 85 kg.
- Obwód pasa.
- Testy sprawnościowe co 4 tygodnie — wyskok dosiężny, CMJ, skok w dal, side plank L/P, plank na piłce. Pokazuje różnicę względem pierwszego pomiaru.
- Rekordy siłowe.

---

## Siatkówka i padel — jedno zatwierdzenie

Sport to nie trening do odhaczania punkt po punkcie. Rozgrzewka i schłodzenie są tam **rozpiską poglądową** — czytasz kolejność, nie klikasz każdej pozycji. Brak checkboxów, brak paska postępu, brak „pomiń".

Na dole jest jeden przycisk: **Zagrane — zapisz w historii**. Wpis idzie do historii jako ✓ za cały dzień, razem z notatką.

Dzięki temu widzisz potem, **jak często realnie grasz**: Postęp → *Jak często grasz* pokazuje średnią siatkówek i padli na tydzień (z **max 4 pełnych tygodni**, od pierwszego wpisu — bez pustych tygodni sprzed startu), liczbę gier w 30 dniach i rozkład tygodni (● siatkówka, ▪ padel).

Siatkówka i padel nie mają celu tygodniowego — liczy się to, kiedy grasz (wpływa na blokady A/C, patrz niżej).

Chcesz, żeby jakaś jednostka działała w tym trybie? Ustaw jej `typ: 'sport'` w `data.js`. Dzień wolny (`typ: 'rest'`) zapisuje się tak samo — jednym przyciskiem, bez checklisty.

---

## Edycja treningów wstecz

Na górze ekranu **Dziś** jest pasek daty: strzałki ‹ ›, kalendarz i przycisk *dziś*. Ustawiasz dowolny miniony dzień i poprawiasz go tak samo, jak bieżący — odhaczenia, pominięte, ciężary, powtórzenia, a nawet którą jednostkę tego dnia zrobiłeś.

Szybsza droga: **Postęp → Historia treningów → kliknij wpis**. Przeskakuje prosto w tryb edycji tego dnia.

W trybie edycji:

- nagłówek zmienia się na **Edycja**, pojawia się żółta ramka z datą
- **sugestia jednostki znika** — dotyczy dzisiaj, nie dnia sprzed tygodnia
- podpowiedzi ciężarów liczą się z sesji **sprzed tego dnia**, nie z najnowszych
- przycisk to *Zapisz zmiany* (albo *Dodaj do historii*, jeśli tego dnia nic nie było)
- dochodzi **Usuń ten trening z historii**
- **w przód nie wejdziesz** — kalendarz kończy się na dzisiaj

Jeśli wpis w historii istnieje, ale szczegółowe odhaczenia z tamtego dnia nie są dostępne (np. wpis z importu kopii), apka ostrzega żółtym tekstem, że zapis nadpisze licznik tym, co widzisz na liście. Listę pominiętych ćwiczeń odtwarza automatycznie z wpisu.

---

## Jak działa sugestia kolejnego treningu

Apka nie trzyma się kalendarza. Patrzy na **ruchome okno 7 dni** i liczy, czego brakuje: **A, B, C po 1×**. Siatkówka i padel nie mają celu — logujesz je ręcznie jako „grę”. Rehab/mobilność (D) jest opcjonalna i zostaje na chipie.

Ustawienie **stała gra** (Więcej → Ustawienia, domyślnie sobota) steruje blokadami:

- **A:** nie dzień po grze; nie, gdy do najbliższej stałej gry jest mniej niż 48 h (przy sobocie: nie w piątek i sobotę); min. 48 h od C
- **C:** nie dzień przed stałą grą; nie dzień po A
- **B:** brak blokad (poza „już zrobione dziś”)

Kolejność decyzji: (1) dziś zapisano wolne → wolne; (2) 3 dni z rzędu jakakolwiek aktywność (siłownia, rehab, gra) → sugestia dnia wolnego; (3) spośród niezablokowanych jednostek z zaległością — priorytet **A > B > C**; (4) brak kandydatów → wolne. W karcie widzisz **dlaczego**. Chipy zawsze możesz stuknąć ręcznie. Gra w dniu planowanej A/C zastępuje sesję — przesuń, nie rób obu.

Cele i reguły zmienisz w `data.js`: `CELE_TYG`, `PRIORYTET`, `GRY`, `MAX_AKTYWNOSC_Z_RZEDU`, `STALA_GRA`.

**Plan** — tydzień, fazy, zasady przy rozsypanym tygodniu, makro.

**Więcej** — wskazówki dla pracy przy biurku, eksport i import danych.

---

## Jak działa podpowiedź ciężarów — podwójna progresja

Każde ćwiczenie siłowe ma w `data.js` liczbę serii i **zakres powtórzeń**, np. hip thrust: `serie: 4, zakres: [8, 10]`.

Zasada: **najpierw rosną powtórzenia, dopiero potem ciężar.**

1. Wchodzisz ciężarem, z którym robisz 4 × 8
2. Co trening dokładasz powtórzenie: 4 × 9, potem 4 × 10
3. Gdy zrobisz **4 × 10 we wszystkich seriach**, apka podbija ciężar o `krok` i wracasz do 8 powtórzeń

Apka patrzy na **całą historię ćwiczenia**, nie tylko ostatni wpis, i rozpoznaje sytuacje:

| Sytuacja | Co powie |
|---|---|
| Brak historii | Punkt startowy albo „dobierz ciężar z 2 powt. zapasu" |
| Dzisiejsze serie | **Nie wpływają na podpowiedź** — liczy się poprzednia sesja, żeby ciężar w polach nie skakał w trakcie treningu |
| Zaliczony górny zakres we wszystkich seriach | *Zaliczone 4 × 10 — dziś 65 kg, wracasz do 8 powt.* |
| Zaliczone, ale nie górny zakres | *Zostań na 60 kg, celuj w 4 × 9* |
| Za mało serii na tym ciężarze | *Brakuje serii do 4* |
| **3 sesje w miejscu na tym samym ciężarze** | *Zejdź do 65 kg, zrób 4 × 10 czysto i wracaj w górę* |
| Tydzień 4 cyklu | *90% ostatniego ciężaru, −1 seria, bez podbijania* |
| Przerwa > 14 dni od ostatniej sesji z tym ćwiczeniem | *Wracasz od 90% ciężaru, dolny zakres; 2 sesje bez podbijania* |

Automatyczny **reset przy stagnacji** to nie kaprys: trzy sesje bez postępu przy twojej objętości treningowej i deficycie kalorycznym oznaczają zwykle, że ciężar wyprzedził technikę albo regenerację, a nie że trzeba mocniej cisnąć. Cofnięcie o 10% i czyste dojście z powrotem daje zwykle nowy rekord w 3–4 tygodnie.

Progi i przyrosty zmienisz w `data.js` przy każdym ćwiczeniu: `serie`, `zakres`, `krok`.

---

## Import wag z zewnątrz

Więcej → *Import wag z zewnątrz*. Wrzucasz plik **CSV albo JSON**, apka sama szuka kolumny z datą i kolumny z masą. Rozumie:

- daty w formatach `2026-08-18`, `18.08.2026` i timestampy uniksowe
- masę w kilogramach z kropką albo przecinkiem, a także w gramach (`90400` → 90,4 kg)
- zagnieżdżony JSON — przechodzi przez całą strukturę i wyłuskuje pary data + waga

Pomiary z tych samych dni są nadpisywane, więc możesz wgrywać ten sam eksport wielokrotnie bez duplikatów.

### O wadze Huawei — stan faktyczny

**Nie da się tego podpiąć automatycznie do tej apki i nie jest to kwestia mojego lenistwa.**

- Huawei Health **nie zapisuje danych do Health Connect** — HMS to ekosystem osobny od Google'owego. Oficjalnej synchronizacji nie ma.
- Nawet gdyby była: **PWA nie ma dostępu do Health Connect**. To natywne API Androida, niedostępne ze strony internetowej. Potrzebna byłaby prawdziwa aplikacja natywna.
- Google Fit REST API, które kiedyś było obejściem, **jest wygaszane z końcem 2026 i nie ma następcy**.

Zostają dwie realne drogi:

1. **Wpisywać ręcznie** — 5 sekund rano. Przy dziennym ważeniu i tak stoisz na wadze, więc różnica to jedno stuknięcie.
2. **Raz na miesiąc eksport z Huawei Health** (Ja → Ustawienia → Prywatność → eksport danych; przychodzi archiwum) i wrzucić plik przez import powyżej. Wtedy uzupełniasz historię hurtem.

Rekomendacja: wpisuj ręcznie na bieżąco, bo średnia 7-dniowa działa tylko przy codziennym pomiarze, a eksport traktuj jako uzupełnienie zaległości.

---

## Ważne o danych

Wszystko siedzi w `localStorage` **tej konkretnej przeglądarki na tym telefonie**. Nie synchronizuje się między urządzeniami.

- **Kopia zapasowa:** Więcej → *Eksportuj kopię (JSON)*. Apka pokazuje datę ostatniej kopii i przypomina po 30 dniach.
- **Eksport CSV** (Więcej) — wszystkie treningi, serie, pomiary i testy w jednym pliku pod Excela, ze średnikiem jako separatorem i przecinkiem dziesiętnym.
- Wyczyszczenie danych witryny w Chrome **skasuje historię treningów**.
- Nie używaj trybu incognito — nic się nie zapisze.

---

## Wersjonowanie

Numer wersji widać **w stopce każdego ekranu** i w **Więcej → O aplikacji** (razem z datą wydania i bieżącym tygodniem programu).

Przy każdej zmianie podbij **dwa** miejsca:

| Plik | Co |
|---|---|
| `data.js` | `const APP = { wersja: '1.4.0', data: '2026-10-16' }` |
| `sw.js` | `const CACHE = 'trening-1.4.0'` |

Bez podbicia `CACHE` service worker może dalej serwować starą wersję z pamięci offline. Po podbiciu apka wykrywa aktualizację i pokazuje na dole toast **„Dostępna nowa wersja — Odśwież"**.

Wpisy dopisuj do `CHANGELOG.md`. Wersjonowanie semantyczne: `MAJOR.MINOR.PATCH` — zmiana układu danych → MAJOR, nowa funkcja → MINOR, poprawka → PATCH.

---

## Testy

```
npm test
```

Silnik sugestii, daty i kompatybilność store (`test/*.test.js`). To samo leci na GitHub Actions przy pushu. `engine.js` nie rusza DOM — apka ładuje go po `data.js`.

---

## Warstwa wizualna — zasady

Żeby kolejne zmiany nie rozjechały spójności, kolory mają przypisane role i nie mieszają się:

| Rola | Kolor | Gdzie |
|---|---|---|
| **Interakcja** | pomarańczowy `#f26c3a` | przyciski, aktywna zakładka, aktywny chip, pierścień postępu |
| **Dane, seria 1** | niebieski `#3987e5` | wykres wagi, siatkówka, podpowiedzi progresji |
| **Dane, seria 2** | zielony morski `#199e70` | padel |
| **Status** | zielony / bursztyn / czerwony | alerty, stan „zrobione" |

Paleta danych jest **zwalidowana pod kątem daltonizmu** (rozdzielność ΔE 20,9 dla pary niebieski–morski, kontrast ≥ 3:1 wobec tła). Kolory statusu są zarezerwowane — nie używaj ich jako kolejnej serii danych.

Wszędzie, gdzie kolor niesie znaczenie, jest **drugie kodowanie**: wykres gier ma różne kształty znaczników (● / ▪).

Pola formularzy mają `font-size: 16px` — poniżej tej wartości mobilne Safari i Chrome przybliżają ekran przy każdym stuknięciu w input.

---

## Zmiana planu

Cały plan siedzi w **`data.js`** — czytelny, opisany plik. Chcesz zmienić ćwiczenie, dawkę albo układ tygodnia? Edytuj `data.js` i wgraj z powrotem do repo. Apka podchwyci zmiany przy następnym otwarciu (czasem trzeba raz odświeżyć).

Struktura pojedynczego ćwiczenia:
```js
{ n: 'Hip thrust ze sztangą',   // nazwa
  d: '3 × 6–8',                 // dawka
  u: 'Żebra w dół',             // uwaga (opcjonalnie)
  lift: 'hipthrust',            // klucz loga ciężarów (opcjonalnie)
  serie: 3, zakres: [6, 8],     // podwójna progresja: najpierw powtórzenia, potem ciężar
  krok: 5,                      // ile kg dokładać
  ss: true }                    // superseria z następną pozycją
// ćwiczenia bez ciężaru: ladder: [{ wariant, zakres, jednostka }, ...] zamiast krok/zakres
// pozycja „X lub Y”: warianty: [ {...}, {...} ]   · blok: rdzen / opcjonalny / moc
```

Start cyklu 4-tygodniowego: stała `START_CYKLU` na górze `data.js` (albo Więcej → Ustawienia) — od niej liczy się „Cykl N, tydzień X/4” i tydzień lżejszy.

---

## Czego apka nie robi

- **Nie wysyła powiadomień push.** Zaplanowane przypomnienia w PWA działają zawodnie na Androidzie. Na kobrę co 90 minut w pracy użyj alarmów w telefonie albo kalendarza.
- **Nie synchronizuje się** między telefonem a laptopem. Do tego potrzebny byłby backend.
- **Nie czyta wagi z Huawei Health ani z Health Connect** — szczegóły wyżej.

---

*Plan opracowany 17.08.2026. Nie zastępuje konsultacji z fizjoterapeutą, który cię badał.*
