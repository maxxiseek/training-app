'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot, setHist } = require('./harness');

test('pusta historia: priorytet A przy równym deficycie', () => {
  const ctx = boot();
  setHist(ctx, []);
  assert.equal(ctx.sugeruj().k, 'A');
});

test('brak ścieżek SKB — czerwone światło nie wymusza D', () => {
  const ctx = boot();
  setHist(ctx, []);
  ctx.ST.dni['2026-08-27'] = { sesja:null, zrobione:[], swiatlo:'red', pominiete:[], notatka:'' };
  assert.notEqual(ctx.sugeruj().k, 'D');
  assert.ok(['GORY','A','B','C','REST'].includes(ctx.sugeruj().k));
});

test('trzy treningi główne pod rząd → REST', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-26', k:'B' },
    { d:'2026-08-25', k:'A' },
    { d:'2026-08-24', k:'C' },
  ]);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.equal(s.wolne, true);
});

test('sam padel nie buduje serii 3 treningów (extra)', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-26', k:'PADEL', sport:true },
    { d:'2026-08-25', k:'PADEL', sport:true },
    { d:'2026-08-24', k:'PADEL', sport:true },
  ]);
  assert.notEqual(ctx.sugeruj().k, 'REST');
});

test('A + padel tego samego dnia — padel nie blokuje celów A jutro jako skok', () => {
  const ctx = boot({ DZIS: '2026-08-28', TODAY: '2026-08-28' });
  setHist(ctx, [
    { d:'2026-08-27', k:'A' },
    { d:'2026-08-27', k:'PADEL', sport:true },
  ]);
  const b = ctx.blokady();
  assert.ok(b.A); // A wczoraj / dziś względem okna — A było 27, dziś 28 → A wczoraj
  assert.ok(b.C); // 48h od A
  assert.equal(b.PADEL, undefined); // padel nie w SKOKI; wczorajszy padel nie w blokadach skoków poza A/C
});

test('cele tygodnia suma 4, GORY ×1', () => {
  const ctx = boot();
  assert.equal(Object.values(ctx.CELE_TYG).reduce((a,b)=>a+b, 0), 4);
  assert.equal(ctx.CELE_TYG.GORY, 1);
  assert.ok(!ctx.PRIORYTET.includes('VB'));
  assert.ok(!ctx.PRIORYTET.includes('PADEL'));
  assert.ok(ctx.SESJE.VB.extra);
  assert.ok(ctx.SESJE.PADEL.extra);
  assert.ok(ctx.SESJE.AKT.extra);
});

test('dwa ciężkie A/C z rzędu → REST', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-26', k:'C' },
    { d:'2026-08-25', k:'A' },
  ]);
  assert.equal(ctx.sugeruj().k, 'REST');
});

test('5 jednostek głównych w 7 dniach → REST; padel nie liczy się', () => {
  const ctx = boot();
  setHist(ctx, [
    { d:'2026-08-27', k:'A' },
    { d:'2026-08-26', k:'B' },
    { d:'2026-08-25', k:'GORY', sport:true },
    { d:'2026-08-24', k:'C' },
    { d:'2026-08-23', k:'GORY', sport:true },
    { d:'2026-08-22', k:'PADEL', sport:true },
  ]);
  assert.equal(ctx.liczTreningi7(), 5);
  assert.equal(ctx.sugeruj().k, 'REST');
});

test('statystykiSportu: średnia z 2 tygodni, nie z pustych 4', () => {
  const ctx = boot({ DZIS: '2026-09-10', TODAY: '2026-09-10' });
  // pierwszy wpis w tygodniu kończącym się 2026-09-02 (śr 27.08–śr 02.09)
  // i drugi tydzień 03.09–09.09
  setHist(ctx, [
    { d:'2026-08-28', k:'VB', sport:true },
    { d:'2026-08-30', k:'VB', sport:true },
    { d:'2026-09-04', k:'VB', sport:true },
    { d:'2026-09-06', k:'PADEL', sport:true },
  ]);
  const st = ctx.statystykiSportu(['VB','PADEL'], { maxPeln: 4 });
  assert.ok(st.nPeln >= 1 && st.nPeln <= 4);
  // nie dziel przez 4 puste — średnia VB powinna być wyraźnie > 0 i sensowna
  assert.ok(st.avgs.VB > 0.5);
  assert.ok(st.avgs.VB < 4);
});

test('etykiety GORY / ekstra', () => {
  const ctx = boot();
  assert.equal(ctx.etykietaK('GORY'), 'Góry');
  assert.equal(ctx.etykietaK('AKT'), 'Inne');
  assert.equal(ctx.badgeK('GORY'), 'G');
  assert.deepEqual(ctx.dodatkoweKlucze().sort(), ['AKT','PADEL','VB']);
});

test('GORY jest kondycją z checklistą i liftami czasu', () => {
  const ctx = boot();
  assert.equal(ctx.SESJE.GORY.typ, 'kondycja');
  const items = ctx.SESJE.GORY.bloki[0].items;
  assert.ok(items.some(x => x.lift === 'schody' && x.tryb === 'czas'));
  assert.ok(items.every(x => x.lift));
  assert.equal(ctx.LIFTY.schody.tryb, 'czas');
});
