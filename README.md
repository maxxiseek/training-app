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

## Alternatywa: Netlify Drop (bez gita, ~2 min)

1. Wejdź na **app.netlify.com/drop**
2. Przeciągnij cały folder z plikami na stronę
3. Dostajesz od razu adres `https://cos-tam.netlify.app` — otwórz go na telefonie i „Dodaj do ekranu głównego"

Konto założysz później, jeśli będziesz chciał zmienić nazwę adresu.

---

## Co apka robi

**Dziś**
- Status SKB — zielone / żółte / czerwone. **Zmienia to, co widzisz.** Przy żółtym plyometria znika z listy i nie dostajesz podpowiedzi progresji ciężaru. Przy czerwonym apka przełącza na sesję D i ostrzega, jeśli wybierzesz co innego.
- Wybór jednostki: A, B, C, D, siatkówka, padel. Kropka przy chipie = sugestia na dany dzień tygodnia.
- Checklista z odznaczaniem, pasek postępu, wibracja przy odznaczeniu.
- Przy ćwiczeniach siłowych: pola na ciężar i powtórzenia + podpowiedź typu *„Ostatnio: 45 kg × 8 → dziś spróbuj 50 kg"*.

**Postęp**
- Waga: wykres, ostatni pomiar, średnia z 7 dni, ile zostało do 85 kg.
- Obwód pasa.
- Testy sprawnościowe co 4 tygodnie — wyskok dosiężny, CMJ, skok w dal, side plank L/P, plank na piłce. Pokazuje różnicę względem pierwszego pomiaru.
- Rekordy siłowe.

**Plan** — tydzień, fazy, zasady przy rozsypanym tygodniu, makro.

**Więcej** — zasady bezpieczeństwa L5/S1 i SKB, czerwone flagi, eksport i import danych.

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

---

*Plan opracowany 17.08.2026. Nie zastępuje konsultacji z fizjoterapeutą, który cię badał.*
