# Historia zmian

Wersja jest widoczna w stopce aplikacji oraz w zakładce **Więcej → O aplikacji**.

> Przy każdym wydaniu podbij **dwa** miejsca: `APP.wersja` w `data.js` oraz `CACHE` w `sw.js`.
> Bez podbicia `CACHE` service worker może serwować starą wersję z pamięci.

---

## 1.2.5 — 27.08.2026

**Wskoki na skrzynię**
- Start wysokości skrzyni: **75 cm** (obie apki).

**Szczyt 1.0.6**
- Ikona góry+ciężarek w nagłówku i w „O aplikacji” (oraz jako favicon / PWA).

## 1.2.4 — 27.08.2026

**Wskoki na skrzynię**
- Progresja wysokości (cm) + powtórzeń — jak przy ciężarach: po 4 × 5 czysto podbijamy skrzynię o 5 cm (start 40 cm).
- W polach serii: `cm` i powtórzenia; w rekordach też cm zamiast kg.

**Szczyt 1.0.5**
- Ta sama progresja box jumps.
- Nowa ikona PWA: góry + ciężarek (różowa hybryda).

## 1.2.3 — 27.08.2026

**Nazwy ćwiczeń**
- Polskie nazwy + angielski w nawiasie (łatwiejsze wyszukiwanie w netcie).
- Dawki unilateralne jaśniej: „na każdą nogę / stronę” zamiast skrótu `/nogę`, `/str`.

## 1.2.2 — 27.08.2026

**Sugestia**
- Padel **nie** jest dniem ciężkim — po siłowni / siatkówce apka nie pcha w rest tylko z powodu padla.

## 1.2.1 — 27.08.2026

**Postęp — jak często grasz**
- Średnia siatkówki/padla z **max 4 pełnych tygodni**, liczonych **od pierwszego wpisu** — bez dzielenia przez puste tygodnie sprzed startu.
- Alerty o zbyt rzadkiej / częstej siatkówce od **2** pełnych tygodni z danymi (wcześniej od 4, przy zerach).
- Podpis pokazuje, z ilu tygodni jest średnia.

**Szczyt**
- Osobna PWA dla Olgi w katalogu `szczyt/` (bez SKB, plan nóg/pośladków + góry).

## 1.2.0 — 22.08.2026

**Sugestia dnia wolnego**
- Apka proponuje rest, gdy w oknie 7 dni jest już 6 jednostek, po trzech treningach z rzędu albo po dwóch ciężkich dniach z rzędu (A, C, siatkówka, padel).
- Żółte SKB po dniu treningowym podpowiada rest albo D. Czerwone nadal D.
- To **tylko propozycja** — chipy A–D / sport zostają klikalne, nic się samo nie zapisuje.
- Dzień wolny loguje się jednym przyciskiem, jak sport. Stare wpisy w `trening-v1` bez zmian.

**Plan**
- Cele tygodnia: A, B, C, siatkówka ×2, padel (suma 6). D zostaje na chipie i przy czerwonym SKB, ale nie zjada slotu na regenerację.
- Szkic tygodnia: niedziela = dzień wolny.

**Poprawki**
- Światła SKB odświeżają kartę sugestii.
- Data dnia liczona lokalnie, nie z UTC (późny mecz nie wpada w „wczoraj”).
- Import JSON: `confirm` przed nadpisaniem i `scalStan` — stara kopia 1.1.0 wczytuje się bez utraty wpisów; zepsute tablice są uzupełniane.
- Usunięty zdublowany `odtworzPominiete`.
- Silnik sugestii w `engine.js` + testy jednostkowe (`npm test`). Po zapisanym reście apka nie proponuje kolejnej sesji tego samego dnia.

## 1.1.0 — 18.08.2026

**Wygląd**
- Przebudowa warstwy wizualnej: nowa paleta, hierarchia typografii, miękkie cienie zamiast gęstej siatki ramek.
- **Hero sesji** z literą jednostki i pierścieniem postępu zamiast cienkiego paska.
- Dawki ćwiczeń jako pigułki, zaliczone pozycje z zielonym paskiem po lewej zamiast pełnego tła.
- Nawigacja z pigułką pod aktywną zakładką, większe pola dotykowe (16 px w polach = brak zoomu na iOS).
- Paleta danych **zwalidowana pod kątem daltonizmu** — niebieski i zielony morski, oddzielone od kolorów statusu.
- Pasek SKB koduje nasilenie **wysokością słupka**, nie tylko kolorem.

**Funkcje**
- Wersja aplikacji w stopce i w zakładce Więcej.
- Toast **„Dostępna nowa wersja"** po wykryciu aktualizacji przez service workera.

## 1.0.0 — 18.08.2026

Pierwsze wydanie.

- Ekran **Dziś**: status SKB, adaptacyjna sugestia jednostki, checklista, log serii z podwójną progresją, stopery, pomijanie ćwiczeń, notatka.
- Siatkówka i padel jako rozpiska z jednym zatwierdzeniem.
- **Postęp**: jak często grasz, regularność, trend SKB, kontrola tempa redukcji, waga, testy, rekordy, historia.
- Edycja treningów wstecz, usuwanie wpisów.
- Import wag z CSV/JSON, eksport kopii JSON i danych do CSV.
- Działanie offline, instalacja jako PWA.
