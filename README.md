# Plan atletyczny — PWA

Aplikacja treningowa na telefon. Instaluje się na ekranie głównym Androida jak zwykła apka, działa offline, zapisuje dane lokalnie w telefonie.

---

## Wdrożenie na GitHub Pages — 5 minut

1. **Nowe repo.** github.com → New repository → nazwa np. `trening` → **Public** (Pages działa na darmowym koncie tylko dla repo publicznych) → Create.

2. **Wrzuć pliki.** Na stronie repo: `Add file` → `Upload files` → przeciągnij **wszystkie** pliki z tego folderu:
   ```
   index.html
   data.js
   sw.js
   manifest.webmanifest
   icon-192.png
   icon-512.png
   icon-512-maskable.png
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
- Status SKB — zielone / żółte / czerwone. **Zmienia to, co widzisz.** Przy żółtym plyometria znika z listy i nie dostajesz podpowiedzi progresji ciężaru. Przy czerwonym apka przełącza na sesję D i ostrzega, jeśli wybierzesz co innego.
- **Adaptacyjna sugestia kolejnej jednostki** — nie sztywny kalendarz, tylko decyzja z tego, co faktycznie zrobiłeś (patrz niżej).
- Wybór jednostki: A, B, C, D, siatkówka, padel. Kropka przy chipie = dzisiejsza sugestia.
- Checklista z odznaczaniem, pasek postępu, wibracja przy odznaczeniu.
- Przy ćwiczeniach siłowych: pola na ciężar i powtórzenia + podpowiedź typu *„Ostatnio: 45 kg × 8 → dziś spróbuj 50 kg"*.
- **Zakończ i zapisz w historii** — dopiero to zapisuje jednostkę i przelicza sugestię na kolejny dzień.

**Postęp**
- **Historia treningów** — co i kiedy, ile procent listy odhaczone, licznik ostatnich 30 dni.
- Waga: wykres, ostatni pomiar, średnia z 7 dni, ile zostało do 85 kg.
- Obwód pasa.
- Testy sprawnościowe co 4 tygodnie — wyskok dosiężny, CMJ, skok w dal, side plank L/P, plank na piłce. Pokazuje różnicę względem pierwszego pomiaru.
- Rekordy siłowe.

---

## Jak działa sugestia kolejnego treningu

Apka nie trzyma się kalendarza. Patrzy na **ruchome okno 7 dni** i liczy, czego brakuje:

| Jednostka | Cel / 7 dni |
|---|---|
| A — dolne / moc | 1 |
| B — góra / core | 1 |
| C — atletyczny | 1 |
| D — rehab | 1 |
| Siatkówka | 2 |
| Padel | 1 |

Na to nakłada twarde reguły bezpieczeństwa:

- **A i C nigdy bliżej niż 48 h od siebie**
- **Nigdy dwa dni skoków z rzędu** — A, C i siatkówka liczą się jako dni skoków
- **Czerwone światło → tylko D**, reszta odpada niezależnie od zaległości

Wybiera jednostkę z największą zaległością, która nie łamie żadnej reguły. W karcie widzisz **dlaczego** — co brakuje i co dziś odpada z jakiego powodu. Jak pojedziesz w tygodniu inaczej niż planowałeś, wystarczy odhaczyć co zrobiłeś, a kolejne sugestie same się przestawią.

Cele i reguły zmienisz w `data.js`: stałe `CELE_TYG`, `SKOKI` i `PRIORYTET`.

**Plan** — tydzień, fazy, zasady przy rozsypanym tygodniu, makro.

**Więcej** — zasady bezpieczeństwa L5/S1 i SKB, czerwone flagi, eksport i import danych.

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

- **Kopia zapasowa:** Więcej → *Eksportuj kopię (JSON)*. Rób to raz na miesiąc.
- Wyczyszczenie danych witryny w Chrome **skasuje historię treningów**.
- Nie używaj trybu incognito — nic się nie zapisze.

---

## Zmiana planu

Cały plan siedzi w **`data.js`** — czytelny, opisany plik. Chcesz zmienić ćwiczenie, dawkę albo układ tygodnia? Edytuj `data.js` i wgraj z powrotem do repo. Apka podchwyci zmiany przy następnym otwarciu (czasem trzeba raz odświeżyć).

Struktura pojedynczego ćwiczenia:
```js
{ n: 'Hip thrust ze sztangą',   // nazwa
  d: '4 × 8',                   // dawka
  u: 'Żebra w dół',             // uwaga (opcjonalnie)
  lift: 'hipthrust',            // klucz loga ciężarów (opcjonalnie)
  krok: 5,                      // ile kg dokładać przy progresji
  cel: 8,                       // górny próg powtórzeń → wtedy sugeruje więcej kg
  plyo: true }                  // ukrywane przy żółtym świetle
```

Data startu programu: stała `PLAN_START` na górze `data.js` — od niej liczy się numer tygodnia i faza.

---

## Czego apka nie robi

- **Nie wysyła powiadomień push.** Zaplanowane przypomnienia w PWA działają zawodnie na Androidzie. Na kobrę co 90 minut w pracy użyj alarmów w telefonie albo kalendarza.
- **Nie ma stoperów** — świadomie pominięte w wersji 1. Da się dołożyć.
- **Nie synchronizuje się** między telefonem a laptopem. Do tego potrzebny byłby backend.
- **Nie czyta wagi z Huawei Health ani z Health Connect** — szczegóły wyżej.

---

*Plan opracowany 17.08.2026. Nie zastępuje konsultacji z fizjoterapeutą, który cię badał.*
