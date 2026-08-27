'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot, setHist } = require('./harness');

test('statystykiSportu: bez historii → nPeln 0, średnie 0', () => {
  const ctx = boot();
  setHist(ctx, []);
  const st = ctx.statystykiSportu(['VB','PADEL'], { maxPeln: 4 });
  assert.equal(st.nPeln, 0);
  assert.equal(st.avgs.VB, 0);
  assert.equal(st.avgs.PADEL, 0);
});

test('statystykiSportu: nie rozcieńcza pustymi tygodniami sprzed pierwszego wpisu', () => {
  // DZIS = środa 2026-09-10; pełne tygodnie wstecz kończą się: -1=09-03, -2=08-27, ...
  const ctx = boot({ DZIS: '2026-09-10', TODAY: '2026-09-10' });
  setHist(ctx, [
    { d:'2026-09-01', k:'VB', sport:true },
    { d:'2026-09-02', k:'VB', sport:true },
    { d:'2026-09-08', k:'PADEL', sport:true },
  ]);
  const st = ctx.statystykiSportu(['VB','PADEL'], { maxPeln: 4 });
  // Pełne tygodnie od pierwszego wpisu (01.09): co najwyżej 2 (końce 03.09 i ewentualnie wcześniejszy jeśli b>=od)
  assert.ok(st.nPeln <= 4);
  assert.ok(st.nPeln >= 1);
  // Stary algorytm dzieliłby przez 7 → VB ~0.3; nowy powinien dać ~1
  assert.ok(st.avgs.VB >= 0.8, 'avg VB=' + st.avgs.VB);
  assert.ok(st.avgs.VB <= 2.5, 'avg VB=' + st.avgs.VB);
});

test('statystykiSportu: max 4 pełne tygodnie', () => {
  const ctx = boot({ DZIS: '2026-10-15', TODAY: '2026-10-15' });
  const hist = [];
  // gra co tydzień od lipca
  for(let i = 0; i < 12; i++){
    hist.push({ d: ctx.przesunDni('2026-10-14', -i*7), k: 'VB', sport:true });
  }
  setHist(ctx, hist);
  const st = ctx.statystykiSportu(['VB'], { maxPeln: 4 });
  assert.equal(st.nPeln, 4);
  assert.equal(st.tyg.length, 5); // bieżący + 4
});
