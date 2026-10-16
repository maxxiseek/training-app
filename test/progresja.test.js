'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot } = require('./harness');

/* Znajdź pozycję (z wariantem) i jej blok po kluczu logu. */
function znajdz(ctx, lift){
  for(const S of Object.values(ctx.SESJE)){
    for(const b of (S.bloki || [])){
      for(const it of (b.items || [])){
        const v = it.warianty ? it.warianty.find(x => x.lift === lift) : (it.lift === lift ? it : null);
        if(v) return { it: Object.assign({}, it, v), b };
      }
    }
  }
  throw new Error('brak ' + lift);
}
const sety = (ctx, kl, d, kg, powt) => {
  ctx.ST.lifty[kl] = ctx.ST.lifty[kl] || [];
  powt.forEach((p, i) => ctx.ST.lifty[kl].push({ d, i, kg, p }));
};
const setyW = (ctx, kl, d, w, powt) => {
  ctx.ST.lifty[kl] = ctx.ST.lifty[kl] || [];
  powt.forEach((p, i) => ctx.ST.lifty[kl].push({ d, i, kg: 0, p, w }));
};
const hint = (ctx, lift) => { const { it, b } = znajdz(ctx, lift); return ctx.analiza(it, b); };

/* ---------- podwójna progresja (bez zmian) ---------- */
test('zaliczone serie × górny zakres → ciężar + krok, powrót do dolnego zakresu', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  sety(ctx, 'trapbar', '2026-10-10', 80, [5, 5, 5]);
  const a = hint(ctx, 'trapbar');
  assert.equal(a.kg, 85);
  assert.equal(a.powt, 4);
  assert.equal(a.serie, 3);
});

test('niepełny górny zakres → ten sam ciężar, +1 powt.', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  sety(ctx, 'hipthrust', '2026-10-10', 60, [6, 6, 6]);
  const a = hint(ctx, 'hipthrust');
  assert.equal(a.kg, 60);
  assert.equal(a.powt, 7);
});

test('za mało serii → ten sam ciężar', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  sety(ctx, 'hipthrust', '2026-10-10', 60, [8, 8]);
  const a = hint(ctx, 'hipthrust');
  assert.equal(a.kg, 60);
  assert.match(a.tekst, /brakło serii/);
});

test('stagnacja: 3 sesje na tym samym ciężarze bez zaliczenia → ~10% niżej', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  ['2026-09-28', '2026-10-02', '2026-10-06', '2026-10-10'].forEach(d => sety(ctx, 'trapbar', d, 100, [4, 4, 4]));
  const a = hint(ctx, 'trapbar');
  assert.equal(a.kg, 90);
  assert.match(a.tekst, /sesje w miejscu/);
});

test('dzisiejsze serie nie wpływają na podpowiedź', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  sety(ctx, 'trapbar', '2026-10-10', 80, [5, 5, 5]);
  sety(ctx, 'trapbar', '2026-10-14', 85, [4, 4, 4]);
  assert.equal(hint(ctx, 'trapbar').kg, 85);
});

/* ---------- powrót po przerwie ---------- */
test('ostatnia sesja > 14 dni temu → 90% ciężaru zaokrąglone do kroku, dolny zakres', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  sety(ctx, 'trapbar', '2026-09-20', 80, [5, 5, 5]);       // 24 dni
  const a = hint(ctx, 'trapbar');
  assert.equal(a.kg, 70);                                   // 72 → krok 5 → 70
  assert.equal(a.powt, 4);
  assert.match(a.tekst, /Przerwa 24 dni/);
  sety(ctx, 'hipthrust', '2026-09-20', 45, [8, 8, 8]);
  assert.equal(hint(ctx, 'hipthrust').kg, 40);              // 40,5 → 40
  sety(ctx, 'pulldown', '2026-09-20', 55, [10, 10, 10]);
  assert.equal(hint(ctx, 'pulldown').kg, 50);               // 49,5 → krok 2,5 → 50
  sety(ctx, 'row', '2026-09-20', 20, [10, 10, 10]);
  assert.equal(hint(ctx, 'row').kg, 17.5);                  // 18 → 17,5
});

test('dokładnie 14 dni to jeszcze nie przerwa', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  sety(ctx, 'trapbar', '2026-09-30', 80, [5, 5, 5]);
  assert.equal(hint(ctx, 'trapbar').kg, 85);
});

test('po powrocie: dwie kolejne sesje bez podbijania, potem normalna progresja', () => {
  const ctx = boot({ DZIS: '2026-11-04', TODAY: '2026-11-04' });
  sety(ctx, 'trapbar', '2026-09-20', 80, [5, 5, 5]);
  sety(ctx, 'trapbar', '2026-10-14', 70, [5, 5, 5]);        // sesja powrotna, komplet
  ctx.TODAY = '2026-10-21';
  assert.equal(hint(ctx, 'trapbar').kg, 70, 'sesja 1 po powrocie: bez podbijania');
  sety(ctx, 'trapbar', '2026-10-21', 70, [5, 5, 5]);
  ctx.TODAY = '2026-10-28';
  assert.equal(hint(ctx, 'trapbar').kg, 70, 'sesja 2 po powrocie: bez podbijania');
  sety(ctx, 'trapbar', '2026-10-28', 70, [5, 5, 5]);
  ctx.TODAY = '2026-11-04';
  assert.equal(hint(ctx, 'trapbar').kg, 75, 'sesja 3: normalna progresja');
});

/* ---------- tydzień lżejszy (4 w cyklu) ---------- */
test('tydzień 4 cyklu: 90% ostatniego ciężaru i −1 seria we wszystkich podwójnych progresjach', () => {
  const ctx = boot({ DZIS: '2026-11-10', TODAY: '2026-11-10' });
  assert.equal(ctx.cyklInfo('2026-11-10').lekki, true);
  const dane = { trapbar: [80, 70, 3], hipthrust: [60, 55, 3], rfess: [30, 27.5, 2], row: [25, 22.5, 3], pulldown: [60, 55, 3], inclinedb: [30, 27.5, 3] };
  Object.entries(dane).forEach(([lift, [kg]]) => sety(ctx, lift, '2026-11-05', kg, [10, 10, 10]));
  Object.entries(dane).forEach(([lift, [kg, oczek, serie]]) => {
    const a = hint(ctx, lift);
    assert.equal(a.kg, oczek, lift + ' kg');
    assert.equal(a.serie, serie - 1, lift + ' serie');
    assert.equal(a.powt, znajdz(ctx, lift).it.zakres[0], lift + ' powt');
  });
});

test('tydzień lżejszy nie podbija ciężaru nawet po zaliczeniu górnego zakresu', () => {
  const ctx = boot({ DZIS: '2026-11-10', TODAY: '2026-11-10' });
  sety(ctx, 'trapbar', '2026-11-05', 100, [5, 5, 5]);
  assert.equal(hint(ctx, 'trapbar').kg, 90);
});

test('po tygodniu lżejszym progresja wraca do ostatniej normalnej sesji', () => {
  const ctx = boot({ DZIS: '2026-11-17', TODAY: '2026-11-17' });
  sety(ctx, 'trapbar', '2026-11-05', 80, [5, 5, 5]);        // tydzień 3
  sety(ctx, 'trapbar', '2026-11-10', 70, [4, 4]);           // tydzień 4: 90%, 2 serie
  const a = hint(ctx, 'trapbar');                           // 17.11 = tydzień 1 cyklu 2
  assert.equal(a.kg, 85);
  assert.equal(a.serie, 3);
});

test('serieEf: tydzień lżejszy −1 seria; blok mocy → połowa objętości', () => {
  const ctx = boot({ DZIS: '2026-11-10', TODAY: '2026-11-10' });
  assert.equal(ctx.serieEf({ serie: 3 }, {}), 2);
  assert.equal(ctx.serieEf({ serie: 2 }, {}), 1);
  assert.equal(ctx.serieEf({ serie: 1 }, {}), 1);
  assert.equal(ctx.serieEf({ serie: 4 }, { moc: true }), 2);
  assert.equal(ctx.serieEf({ serie: 3 }, { moc: true }), 2);
  const normalny = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  assert.equal(normalny.serieEf({ serie: 4 }, { moc: true }), 4);
  assert.equal(normalny.serieEf({ serie: 3 }, {}), 3);
});

test('dawkaTekst w tygodniu lżejszym przelicza liczbę serii w opisie', () => {
  const ctx = boot({ DZIS: '2026-11-10', TODAY: '2026-11-10' });
  assert.equal(ctx.dawkaTekst({ serie: 4, d: '4 × 2' }, { moc: true }), '2 × 2');
  assert.equal(ctx.dawkaTekst({ serie: 3, d: '3 × 8–10 na każdą stronę' }, {}), '2 × 8–10 na każdą stronę');
  assert.equal(ctx.dawkaTekst({ d: '6–8 min łącznie' }, {}), '6–8 min łącznie');
});

/* ---------- bez progresji (log) ---------- */
test('progresja „brak”: pokazuje ostatni ciężar, nie podbija', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  sety(ctx, 'landminerot', '2026-10-10', 15, [5, 5, 5]);
  const a = hint(ctx, 'landminerot');
  assert.equal(a.kg, 15);
  assert.match(a.tekst, /Bez auto-progresji/);
});

/* ---------- masa ciała (0 kg) ---------- */
test('podciąganie: start 0 kg; po zaliczeniu 3×10 → +2,5 kg', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  const start = hint(ctx, 'pullup');
  assert.equal(start.kg, 0);
  assert.equal(start.powt, 6);
  sety(ctx, 'pullup', '2026-10-10', 0, [8, 8, 8]);
  assert.equal(hint(ctx, 'pullup').kg, 0);
  assert.equal(hint(ctx, 'pullup').powt, 9);
  sety(ctx, 'pullup', '2026-10-12', 0, [10, 10, 10]);
  assert.equal(hint(ctx, 'pullup').kg, 2.5);
});

test('pulldown: start 55 kg; historia migrowana z pullup działa', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  assert.equal(hint(ctx, 'pulldown').kg, 55);
});

/* ---------- drabinka wariantów ---------- */
test('dead bug: 3 × 12 w pierwszym wariancie → następna sesja „z gumą” na 3 × 8', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  setyW(ctx, 'deadbug', '2026-10-10', 0, [12, 12, 12]);
  const a = hint(ctx, 'deadbug');
  assert.equal(a.w, 1);
  assert.equal(a.wariant, 'Z gumą nad głową');
  assert.equal(a.powt, 8);
  assert.equal(a.serie, 3);
});

test('dead bug: niepełny zakres → ten sam wariant, cel +1 powt.', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  setyW(ctx, 'deadbug', '2026-10-10', 0, [10, 10, 9]);
  const a = hint(ctx, 'deadbug');
  assert.equal(a.w, 0);
  assert.equal(a.powt, 10);
});

test('deska boczna (sekundy): cel +5 s, a po 3 × 45 s kolejny wariant od 30 s', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  setyW(ctx, 'sideplank', '2026-10-10', 0, [30, 35, 40]);
  assert.equal(hint(ctx, 'sideplank').powt, 35);
  setyW(ctx, 'sideplank', '2026-10-12', 0, [45, 45, 45]);
  const a = hint(ctx, 'sideplank');
  assert.equal(a.w, 1);
  assert.equal(a.powt, 30);
});

test('start drabinki: pierwszy wariant, dolny zakres', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  const a = hint(ctx, 'abwheel');
  assert.equal(a.w, 0);
  assert.equal(a.powt, 8);
});

test('najwyższy wariant drabinki: nie wychodzi poza listę', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  setyW(ctx, 'nordic', '2026-10-10', 2, [6, 6]);
  const a = hint(ctx, 'nordic');
  assert.equal(a.w, 2);
  assert.match(a.tekst, /Najwyższy wariant/);
});

test('drabinka: stagnacja 3 sesji → wariant niżej', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  setyW(ctx, 'abwheel', '2026-09-20', 0, [12, 12, 12]);
  ['2026-09-24', '2026-09-28', '2026-10-02', '2026-10-06', '2026-10-10'].forEach(d => setyW(ctx, 'abwheel', d, 1, [8, 8, 8]));
  const a = hint(ctx, 'abwheel');
  assert.equal(a.w, 0);
});

test('drabinka w tygodniu lżejszym: −1 seria, ten sam wariant, bez awansu', () => {
  const ctx = boot({ DZIS: '2026-11-10', TODAY: '2026-11-10' });
  setyW(ctx, 'deadbug', '2026-11-05', 0, [12, 12, 12]);
  const a = hint(ctx, 'deadbug');
  assert.equal(a.w, 0);
  assert.equal(a.serie, 2);
});

test('drabinka po przerwie: ten sam wariant, dolny zakres', () => {
  const ctx = boot({ DZIS: '2026-10-14', TODAY: '2026-10-14' });
  setyW(ctx, 'deadbug', '2026-09-10', 1, [11, 11, 11]);
  const a = hint(ctx, 'deadbug');
  assert.equal(a.w, 1);
  assert.equal(a.powt, 8);
});

/* ---------- warianty „lub” ---------- */
test('itemDnia: bez wyboru bierze ostatnio używany wariant, inaczej pierwszy', () => {
  const ctx = boot();
  const holder = ctx.SESJE.B.bloki.flatMap(b => b.items).find(i => i.id === 'b2-pull');
  assert.equal(ctx.itemDnia(holder, {}).lift, 'pullup');
  sety(ctx, 'pulldown', '2026-10-10', 55, [8, 8, 8]);
  assert.equal(ctx.itemDnia(holder, {}).lift, 'pulldown');
  assert.equal(ctx.itemDnia(holder, { wyb: { 'b2-pull': 'pullup' } }).lift, 'pullup');
});

/* ---------- przypomnienie o ciężarze ---------- */
test('brakCiezaru: odhaczone ćwiczenie z kluczem logu bez wpisanego ciężaru', () => {
  const ctx = boot();
  const poz = [
    { __id: 'A-3-a', n: 'Trap bar', lift: 'trapbar' },
    { __id: 'A-3-b', n: 'Hip thrust', lift: 'hipthrust' },
    { __id: 'A-3-c', n: 'Pullup', lift: 'pullup' },
    { __id: 'A-3-d', n: 'Dead bug', lift: 'deadbug', ladder: true },
    { __id: 'A-3-e', n: 'Slam', lift: null },
  ];
  sety(ctx, 'hipthrust', '2026-10-14', 60, [8, 8, 8]);
  sety(ctx, 'pullup', '2026-10-14', 0, [6, 6, 6]);          // 0 kg dozwolone dla masy ciała
  const brak = ctx.brakCiezaru(poz, ['A-3-a', 'A-3-b', 'A-3-c', 'A-3-d', 'A-3-e'], '2026-10-14');
  assert.deepEqual(JSON.parse(JSON.stringify(brak)), ['Trap bar']);
  // nieodhaczone — bez przypomnienia
  assert.deepEqual(JSON.parse(JSON.stringify(ctx.brakCiezaru(poz, [], '2026-10-14'))), []);
});
