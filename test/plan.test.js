'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot } = require('./harness');
const J = x => JSON.parse(JSON.stringify(x));   // dane z vm mają inny prototyp tablic

const wszystkieItemy = ctx => Object.values(ctx.SESJE).flatMap(S => (S.bloki || []).flatMap(b => b.items || []));
const rozwin = items => items.flatMap(it => it.warianty ? it.warianty.map(v => Object.assign({}, it, v)) : [it]);
const nazwy = ctx => rozwin(wszystkieItemy(ctx)).map(it => it.n).join(' | ');

test('usunięte ćwiczenia nie występują w sesjach', () => {
  const ctx = boot();
  const n = nazwy(ctx);
  ['skrzyni', 'box jump', 'goblet', 'front squat', 'Zakroki', 'farmer', 'Deska na piłce', 'unoszeniem biodra', 'wznosy kolan']
    .forEach(x => assert.ok(!new RegExp(x, 'i').test(n), 'zostało: ' + x));
  const klucze = new Set(rozwin(wszystkieItemy(ctx)).map(it => it.lift).filter(Boolean));
  ['boxjump', 'squat', 'lunge', 'benchdb', 'ohp', 'rdl'].forEach(k => assert.ok(!klucze.has(k), k));
});

test('usunięte ćwiczenia zostają w LIFTY jako archiwum (historia, rekordy)', () => {
  const ctx = boot();
  ['boxjump', 'squat', 'lunge', 'benchdb', 'ohp'].forEach(k => assert.equal(ctx.LIFTY[k].archiwum, true, k));
});

test('nie ma MIN/FULL ani rotacji mocy', () => {
  const ctx = boot();
  wszystkieItemy(ctx).forEach(it => {
    assert.equal(it.poziom, undefined);
    assert.equal(it.moc, undefined);
  });
  assert.equal(typeof ctx.itemWidoczny, 'undefined');
  assert.equal(typeof ctx.indeksMocyC, 'undefined');
  assert.equal(typeof ctx.trybSesjiDnia, 'undefined');
});

test('A, B, C: rozgrzewka + bloki 1–5; bloki 1–3 to rdzeń', () => {
  const ctx = boot();
  ['A', 'B', 'C'].forEach(k => {
    const b = ctx.SESJE[k].bloki;
    assert.equal(b.length, 6, k);
    assert.equal(b[0].rozgrzewka, true);
    assert.ok(b[1].rdzen && b[2].rdzen && b[3].rdzen, k + ' bloki 1–3 rdzeń');
    assert.ok(!b[4].rdzen && !b[5].rdzen, k + ' bloki 4–5 poza rdzeniem');
  });
});

test('C: blok 5 jest opcjonalny, A i B nie mają bloków opcjonalnych', () => {
  const ctx = boot();
  assert.equal(ctx.SESJE.C.bloki[5].opcjonalny, true);
  assert.ok(!ctx.SESJE.A.bloki.some(b => b.opcjonalny));
  assert.ok(!ctx.SESJE.B.bloki.some(b => b.opcjonalny));
});

test('core w każdej sesji (rdzeń)', () => {
  const ctx = boot();
  const rdzen = k => rozwin(ctx.SESJE[k].bloki.filter(b => b.rdzen).flatMap(b => b.items)).map(i => i.lift);
  assert.ok(rdzen('A').includes('pallof'));
  assert.ok(rdzen('B').includes('deadbug'));
  assert.ok(rdzen('C').includes('sideplank'));
});

test('B bez nóg, A bez górnych ćwiczeń', () => {
  const ctx = boot();
  const kl = k => new Set(rozwin(wszystkieItemy(ctx).filter(() => true)).length ? rozwin(ctx.SESJE[k].bloki.flatMap(b => b.items)).map(i => i.lift) : []);
  ['trapbar', 'hipthrust', 'rfess', 'legcurl', 'slrdl'].forEach(x => assert.ok(!kl('B').has(x), 'B: ' + x));
  ['pullup', 'pulldown', 'row', 'inclinedb'].forEach(x => assert.ok(!kl('A').has(x), 'A: ' + x));
});

test('każdy klucz logu ma wpis w LIFTY albo jest drabinką', () => {
  const ctx = boot();
  rozwin(wszystkieItemy(ctx)).filter(it => it.lift).forEach(it => {
    if(it.ladder) assert.ok(ctx.DRABINKI.includes(it.lift), 'drabinka ' + it.lift);
    else assert.ok(ctx.LIFTY[it.lift], 'brak LIFTY: ' + it.lift);
  });
});

test('klucze pozycji „lub” są osobne: pullup/pulldown, pushupw/dips, nordic/legcurl', () => {
  const ctx = boot();
  const por = (k, id) => ctx.SESJE[k].bloki.flatMap(b => b.items).find(i => i.id === id).warianty.map(v => v.lift);
  assert.deepEqual(J(por('B', 'b2-pull')), ['pullup', 'pulldown']);
  assert.deepEqual(J(por('C', 'c3-push')), ['pushupw', 'dips']);
  assert.deepEqual(J(por('A', 'a5-ham')), ['nordic', 'legcurl']);
});

test('drabinki mają 3 warianty w kolejności z planu', () => {
  const ctx = boot();
  const lad = {};
  rozwin(wszystkieItemy(ctx)).filter(i => i.ladder).forEach(i => { lad[i.lift] = i.ladder; });
  assert.deepEqual(Object.keys(lad).sort(), [...ctx.DRABINKI].sort());
  assert.equal(lad.deadbug[1].wariant, 'Z gumą nad głową');
  assert.equal(lad.deadbug[2].wariant, 'Z hantlem 4–6 kg');
  assert.deepEqual(J(lad.sideplank.map(v => v.jednostka)), ['s', 's', 's']);
  assert.deepEqual(J(lad.nordic.map(v => v.zakres)), [[4, 6], [4, 6], [4, 6]]);
  assert.equal(lad.abwheel.length, 3);
});

test('serie i zakresy z planu (A)', () => {
  const ctx = boot();
  const it = (k, lift) => rozwin(wszystkieItemy(ctx)).find(i => i.lift === lift);
  assert.deepEqual(J([it('A', 'trapbar').serie, it('A', 'trapbar').zakres, it('A', 'trapbar').krok]), [3, [4, 5], 5]);
  assert.deepEqual(J([it('A', 'hipthrust').serie, it('A', 'hipthrust').zakres, it('A', 'hipthrust').krok]), [3, [6, 8], 5]);
  assert.deepEqual(J([it('A', 'rfess').serie, it('A', 'rfess').zakres]), [2, [6, 8]]);
  assert.deepEqual(J([it('A', 'calfsl').serie, it('A', 'calfsl').zakres]), [2, [10, 15]]);
  assert.deepEqual(J([it('A', 'pallof').serie, it('A', 'pallof').zakres, it('A', 'pallof').krok]), [3, [10, 10], 2.5]);
  assert.equal(it('A', 'trapjump').progresja, 'brak');
  assert.equal(it('A', 'legcurl').krok, 2.5);
});

test('serie i zakresy z planu (B, C)', () => {
  const ctx = boot();
  const it = lift => rozwin(wszystkieItemy(ctx)).find(i => i.lift === lift);
  assert.deepEqual(J(it('landminepress').zakres), [8, 10]);
  assert.deepEqual(J(it('pullup').zakres), [6, 10]);
  assert.deepEqual(J(it('pulldown').zakres), [6, 10]);
  assert.deepEqual(J([it('lateralraise').serie, it('lateralraise').zakres]), [3, [12, 15]]);
  assert.deepEqual(J([it('facepull').serie, it('facepull').zakres]), [2, [12, 15]]);
  assert.deepEqual(J([it('curl').serie, it('curl').zakres]), [3, [10, 12]]);
  assert.equal(it('landminerot').progresja, 'brak');
  assert.deepEqual(J(it('chinup').zakres), [6, 8]);
  assert.deepEqual(J([it('slrdl').serie, it('slrdl').zakres]), [3, [8, 10]]);
  assert.deepEqual(J([it('pushupw').serie, it('pushupw').zakres]), [3, [8, 12]]);
  assert.deepEqual(J([it('suitcase').serie, it('suitcase').jednostka]), [2, 'm']);
});

test('bloki mocy: A1, A2, B1, C1', () => {
  const ctx = boot();
  assert.ok(ctx.SESJE.A.bloki[1].moc && ctx.SESJE.A.bloki[2].moc);
  assert.ok(!ctx.SESJE.A.bloki[3].moc);
  assert.ok(ctx.SESJE.B.bloki[1].moc);
  assert.ok(ctx.SESJE.C.bloki[1].moc);
});

test('rozgrzewka padla ma Copenhagen plank w aktywacji', () => {
  const ctx = boot();
  const akt = ctx.SESJE.PADEL.fazy.find(f => f.t === 'Aktywacja');
  assert.match(akt.tekst, /Copenhagen plank 2×20 s\/str/);
});

test('D, VB i PADEL zachowują format; D bez zmian', () => {
  const ctx = boot();
  assert.equal(ctx.SESJE.VB.format, 'fazy');
  assert.equal(ctx.SESJE.PADEL.format, 'fazy');
  assert.equal(ctx.SESJE.D.bloki[0].items.length, 10);
});

test('szkic tygodnia: Pn A · Śr C · Pt B · So gra · Nd wolne', () => {
  const ctx = boot();
  assert.equal(ctx.TYDZIEN[1], 'A');
  assert.equal(ctx.TYDZIEN[2], null);
  assert.equal(ctx.TYDZIEN[3], 'C');
  assert.equal(ctx.TYDZIEN[4], null);
  assert.equal(ctx.TYDZIEN[5], 'B');
  assert.equal(ctx.TYDZIEN[6], 'GRA');
  assert.equal(ctx.TYDZIEN[0], 'REST');
});

test('żywienie: jedno źródło', () => {
  const ctx = boot();
  assert.deepEqual({ ...ctx.ZYWIENIE }, { trening: 2700, wolny: 2250, bialko: 180, kreatyna: 5 });
});

test('wersja 1.4.0', () => {
  const ctx = boot();
  assert.equal(ctx.APP.wersja, '1.4.0');
  assert.match(require('fs').readFileSync(require('path').join(__dirname, '..', 'sw.js'), 'utf8'), /trening-1\.4\.0/);
});
