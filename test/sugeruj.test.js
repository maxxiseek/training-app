'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot, setHist } = require('./harness');

test('pusta historia: sugeruje A (siłownia), nigdy VB/padel', () => {
  const ctx = boot();
  setHist(ctx, []);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'A');
  assert.ok(!['VB', 'PADEL'].includes(s.k));
  assert.match(s.powod, /Sugerowany trening/i);
  assert.match(s.powod, /Ostatnio|Brak/i);
});

test('czerwone SKB → D, niezależnie od zaległości', () => {
  const ctx = boot();
  setHist(ctx, []);
  ctx.ST.dni['2026-08-22'] = { sesja:null, zrobione:[], swiatlo:'red', pominiete:[], notatka:'' };
  assert.equal(ctx.sugeruj().k, 'D');
  assert.equal(ctx.sugeruj().wolne, undefined);
});

test('trzy treningi pod rząd → REST (sugestia)', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-21', k:'B' },
    { d:'2026-08-20', k:'A' },
    { d:'2026-08-19', k:'C' },
  ]);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.equal(s.wolne, true);
  assert.match(s.powod, /propozycja/i);
});

test('dwa ciężkie dni z rzędu (A, VB) → REST', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-21', k:'VB' },
    { d:'2026-08-20', k:'A' },
  ]);
  assert.equal(ctx.sugeruj().k, 'REST');
});

test('padel nie jest ciężki — po VB nie wymusza REST', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-21', k:'PADEL' },
    { d:'2026-08-20', k:'VB' },
  ]);
  assert.notEqual(ctx.sugeruj().k, 'REST');
});

test('REST wczoraj przerywa serię — wraca trening (gdy A/B/C nie domknięte)', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-21', k:'REST', rest:true },
    { d:'2026-08-20', k:'A' },
    { d:'2026-08-19', k:'B' },
    // C jeszcze nie w oknie → sugestia C, nie REST
  ]);
  assert.equal(ctx.sugeruj().k, 'C');
});

test('pusta dziura w kalendarzu przerywa serię (wraca siłownia)', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-19', k:'A' },
    { d:'2026-08-17', k:'B' },
    // przerwa + brak C → sugeruj C
  ]);
  assert.equal(ctx.sugeruj().k, 'C');
});

test('4 sesje siłowe/rehab w oknie 7 dni → REST (sport nie liczy się do limitu)', () => {
  const ctx = boot();
  // Daty z lukami — bez serii 3 dni z rzędu; liczy się limit objętości.
  setHist(ctx, [
    { d:'2026-08-22', k:'A' },
    { d:'2026-08-20', k:'B' },
    { d:'2026-08-18', k:'C' },
    { d:'2026-08-16', k:'D' },
    { d:'2026-08-21', k:'VB' },
    { d:'2026-08-19', k:'PADEL' },
  ]);
  assert.equal(ctx.liczTreningi7(), 4);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.match(s.powod, /4 sesji siłowych\/rehab|już 4/i);
});

test('REST i sport nie liczą się do limitu sesji siłowych', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-21', k:'REST', rest:true },
    { d:'2026-08-20', k:'A' },
    { d:'2026-08-18', k:'B' }, // luka — bez serii 3
    // C jeszcze nie → sugestia C
    { d:'2026-08-17', k:'VB' },
    { d:'2026-08-16', k:'PADEL' },
  ]);
  assert.equal(ctx.liczTreningi7(), 2);
  assert.equal(ctx.sugeruj().k, 'C');
});

test('żółte SKB po treningu → D (gdy nie było rehabu)', () => {
  const ctx = boot();
  setHist(ctx, [{ d:'2026-08-21', k:'B' }]);
  ctx.ST.dni['2026-08-22'] = { sesja:null, zrobione:[], swiatlo:'yellow', pominiete:[], notatka:'' };
  assert.equal(ctx.sugeruj().k, 'D');
});

test('żółte SKB po treningu, D już w oknie → REST', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-21', k:'B' },
    { d:'2026-08-20', k:'D' },
  ]);
  ctx.ST.dni['2026-08-22'] = { sesja:null, zrobione:[], swiatlo:'yellow', pominiete:[], notatka:'' };
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.equal(s.wolne, true);
});

test('żółte SKB po reście nie wymusza wolnego', () => {
  const ctx = boot();
  setHist(ctx, [{ d:'2026-08-21', k:'REST', rest:true }]);
  ctx.ST.dni['2026-08-22'] = { sesja:null, zrobione:[], swiatlo:'yellow', pominiete:[], notatka:'' };
  assert.notEqual(ctx.sugeruj().k, 'REST');
});

test('REST już zapisany dziś → zostaje REST, nie pcha kolejnej sesji', () => {
  const ctx = boot();
  setHist(ctx, [{ d:'2026-08-22', k:'REST', rest:true }]);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.match(s.powod, /już odpoczynek/);
});

test('czerwone SKB wygrywa z zapisanym REST', () => {
  const ctx = boot();
  setHist(ctx, [{ d:'2026-08-22', k:'REST', rest:true }]);
  ctx.ST.dni['2026-08-22'] = { sesja:null, zrobione:[], swiatlo:'red', pominiete:[], notatka:'' };
  assert.equal(ctx.sugeruj().k, 'D');
});

test('blokady: A i C nie dzień po dniu', () => {
  const ctx = boot();
  setHist(ctx, [{ d:'2026-08-21', k:'A' }]);
  const b = ctx.blokady();
  assert.ok(b.C);
  assert.match(b.C, /48 h/);
  assert.ok(b.A);
});

test('blokady: dwa dni skoków z rzędu (VB blokuje A i C)', () => {
  const ctx = boot();
  setHist(ctx, [{ d:'2026-08-21', k:'VB' }]);
  const b = ctx.blokady();
  assert.ok(b.A);
  assert.ok(b.C);
  assert.ok(b.VB);
  assert.equal(b.PADEL, undefined);
});

test('stary wpis A bez pola rest nadal działa', () => {
  const ctx = boot();
  setHist(ctx, [{ d:'2026-08-21', k:'A', pct:80, zrob:10, total:12 }]);
  assert.ok(ctx.sugeruj().k);
  assert.equal(ctx.jestRest({ d:'2026-08-21', k:'A' }), false);
});

test('chipy: REST w SESJE; sugestia bez VB/PADEL; cele sportu zostają w CELE_TYG', () => {
  const ctx = boot();
  assert.equal(ctx.SESJE.REST.typ, 'rest');
  assert.ok(!ctx.PRIORYTET.includes('REST'));
  assert.ok(!ctx.PRIORYTET.includes('D'));
  assert.ok(!ctx.PRIORYTET.includes('VB'));
  assert.ok(!ctx.PRIORYTET.includes('PADEL'));
  assert.deepEqual([...(ctx.PRIORYTET || [])], ['A', 'C', 'B']);
  assert.equal(Object.values(ctx.CELE_TYG).reduce((a,b)=>a+b, 0), 6);
  assert.equal(ctx.CELE_TYG.VB, 2);
  assert.equal(ctx.TYDZIEN[0], 'REST');
});

test('nazwa nieznanego k nie wywala UI', () => {
  const ctx = boot();
  assert.equal(ctx.nazwaSesji('NOPE'), 'NOPE');
  assert.equal(ctx.typSesji('NOPE'), '');
  assert.equal(ctx.etykietaK('REST'), 'Wolne');
});

test('sugestia nigdy nie wybiera VB/PADEL — tylko A/B/C/D/REST', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-21', k:'A' },
  ]);
  const s = ctx.sugeruj();
  assert.ok(['B', 'C', 'D', 'REST'].includes(s.k), s.k);
  assert.ok(!['VB', 'PADEL'].includes(s.k));
  assert.match(s.ostatnio || s.powod, /Ostatnio:.*A|A \(/);
});

test('sama siatkówka/padel nie buduje serii 3 treningów siłowych', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-21', k:'VB' },
    { d:'2026-08-20', k:'PADEL' },
    { d:'2026-08-19', k:'VB' },
  ]);
  assert.notEqual(ctx.sugeruj().k, 'REST');
  // VB blokuje A/C (skoki) → zostaje B
  assert.equal(ctx.sugeruj().k, 'B');
});
