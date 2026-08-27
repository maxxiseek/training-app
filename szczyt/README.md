# Szczyt — trening Olgi

Osobna PWA obok głównego planu atletycznego. Bez SKB, z naciskiem na nogi/pośladki, dynamikę i kondycję pod **pięciotysięcznik**. Siatkówka i padel to lekki tracker („Dodatkowo dziś”).

Aktualna wersja: **1.0.0**.

## Co jest w środku

- Sesje **A / B / C** — duży overlap z planem wspólnym (te same stanowiska na siłowni)
- **Góry** ×2 / tydzień — checklista (schody/stepper na czele) z progresją minut i wzniosu
- **Dodatkowo dziś:** siatkówka, padel, inna aktywność (można obok siłowni tego samego dnia)
- Waga, historia, podwójna progresja ciężarów, PWA offline
- Bez świateł SKB, bez testów wyskoku, bez sesji rehab D

Dane: `localStorage` klucz `szczyt-v1` — osobno od głównej apki i osobno na każdym telefonie.

## Deploy (GitHub Pages)

Jeśli główna apka jest w root repo, Szczyt będzie pod:

```
https://TWOJ-LOGIN.github.io/NAZWA-REPO/szczyt/
```

Upewnij się, że Pages serwuje cały repo (branch `main`, folder `/`). Po wdrożeniu otwórz adres w Chrome → „Dodaj do ekranu głównego”.

Alternatywnie: wrzuć sam katalog `szczyt/` jako osobne Pages / Cloudflare Pages (output `/`).

## Pliki

```
szczyt/
  index.html
  data.js      ← plan i cele — edytuj tutaj
  engine.js
  sw.js
  manifest.webmanifest
  icon-*.png
```

Wersja: podbij `APP.wersja` w `data.js` **oraz** `CACHE` w `sw.js`.

## Testy

Z katalogu głównego repo:

```
npm test
```

Obejmuje też `szczyt/test/*.test.js`.
