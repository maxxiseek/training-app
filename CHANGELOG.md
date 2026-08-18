# Historia zmian

Wersja jest widoczna w stopce aplikacji oraz w zakładce **Więcej → O aplikacji**.

> Przy każdym wydaniu podbij **dwa** miejsca: `APP.wersja` w `data.js` oraz `CACHE` w `sw.js`.
> Bez podbicia `CACHE` service worker może serwować starą wersję z pamięci.

---

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
