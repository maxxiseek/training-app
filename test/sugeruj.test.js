'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot, setHist } = require('./harness');

// DZIS domyślnie: środa 2026-10-14. Stała gra: sobota (6).
const FRI = '2026-10-16', SAT = '2026-10-17', SUN = '2026-10-18';

test('pusta historia, środa: sugeruje A (priorytet A > B > C), nigdy gry', () => {
  const ctx = boot();
  setHist(ctx, []);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'A');
  assert.match(s.powod, /Ostatnio|Brak/i);
});

test('PRIORYTET to A, B, C; gry poza sugestią', () => {
  const ctx = boot();
  assert.deepEqual([...ctx.PRIORYTET], ['A', 'B', 'C']);
  assert.deepEqual({ ...ctx.CELE_TYG }, { A: 1, B: 1, C: 1 });
  assert.deepEqual([...ctx.GRY], ['VB', 'PADEL']);
});

test('stała gra = sobota: w piątek i sobotę A nigdy nie jest sugerowane', () => {
  [FRI, SAT].forEach(dzis => {
    const ctx = boot({ DZIS: dzis, TODAY: dzis });
    setHist(ctx, []);
    assert.ok(ctx.blokady().A, 'A powinno być zablokowane ' + dzis);
    assert.notEqual(ctx.sugeruj().k, 'A');
  });
});

test('stała gra = sobota: w piątek C nie jest sugerowane (dzień przed grą)', () => {
  const ctx = boot({ DZIS: FRI, TODAY: FRI });
  setHist(ctx, []);
  assert.ok(ctx.blokady().C);
  assert.match(ctx.blokady().C, /stała gra/);
  assert.equal(ctx.sugeruj().k, 'B');
});

test('stała gra = sobota: w sobotę C nie jest blokowane regułą „dzień przed”', () => {
  const ctx = boot({ DZIS: SAT, TODAY: SAT });
  setHist(ctx, []);
  assert.equal(ctx.blokady().C, undefined);
});

test('czwartek (48 h do gry): A dozwolone', () => {
  const ctx = boot({ DZIS: '2026-10-15', TODAY: '2026-10-15' });
  setHist(ctx, []);
  assert.equal(ctx.blokady().A, undefined);
  assert.equal(ctx.sugeruj().k, 'A');
});

test('ustawienie stalaGra (niedziela): sobota blokuje A i C, piątek tylko... nic', () => {
  const ctx = boot({ DZIS: SAT, TODAY: SAT });
  ctx.ST.ustawienia = { stalaGra: 0 };
  setHist(ctx, []);
  assert.ok(ctx.blokady().A);   // 24 h do gry
  assert.ok(ctx.blokady().C);   // dzień przed grą
  const ctx2 = boot({ DZIS: FRI, TODAY: FRI });
  ctx2.ST.ustawienia = { stalaGra: 0 };
  setHist(ctx2, []);
  assert.equal(ctx2.blokady().A, undefined);   // 48 h do gry
  assert.equal(ctx2.blokady().C, undefined);
});

test('gra wczoraj: A nie jest sugerowane, B jest', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-13', k: 'VB', sport: true }]);
  assert.ok(ctx.blokady().A);
  assert.match(ctx.blokady().A, /gra/);
  assert.equal(ctx.sugeruj().k, 'B');
});

test('padel liczy się jako gra tak samo jak siatkówka', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-13', k: 'PADEL', sport: true }]);
  assert.ok(ctx.blokady().A);
  assert.equal(ctx.sugeruj().k, 'B');
});

test('gra wczoraj nie blokuje C ani B (reguła „dni skoków” usunięta)', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-13', k: 'VB', sport: true }]);
  assert.equal(ctx.blokady().C, undefined);
  assert.equal(ctx.blokady().B, undefined);
});

test('A i C: min. 48 h od siebie (obie strony)', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-13', k: 'A' }]);
  assert.match(ctx.blokady().C, /48 h/);
  setHist(ctx, [{ d: '2026-10-13', k: 'C' }]);
  assert.match(ctx.blokady().A, /48 h/);
});

test('B nie ma blokad poza „zrobione dziś”', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-13', k: 'A' }, { d: '2026-10-12', k: 'C' }]);
  assert.equal(ctx.blokady().B, undefined);
  setHist(ctx, [{ d: '2026-10-14', k: 'B' }]);
  assert.equal(ctx.blokady().B, 'zrobione dziś');
});

test('trzy dni aktywności z rzędu (siłownia + gra) → REST', () => {
  const ctx = boot();
  setHist(ctx, [
    { d: '2026-10-13', k: 'VB', sport: true },
    { d: '2026-10-12', k: 'B' },
    { d: '2026-10-11', k: 'PADEL', sport: true },
  ]);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.equal(s.wolne, true);
  assert.match(s.powod, /propozycja/i);
});

test('dwa dni z rzędu to jeszcze nie REST', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-13', k: 'VB', sport: true }, { d: '2026-10-12', k: 'B' }]);
  assert.notEqual(ctx.sugeruj().k, 'REST');
});

test('REST wczoraj przerywa serię', () => {
  const ctx = boot();
  setHist(ctx, [
    { d: '2026-10-13', k: 'REST', rest: true },
    { d: '2026-10-12', k: 'A' },
    { d: '2026-10-11', k: 'B' },
  ]);
  assert.equal(ctx.sugeruj().k, 'C');
});

test('brak kandydatów (cele A/B/C odhaczone) → REST', () => {
  const ctx = boot();
  setHist(ctx, [
    { d: '2026-10-12', k: 'C' },
    { d: '2026-10-10', k: 'B' },
    { d: '2026-10-09', k: 'A' },
  ]);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.equal(s.wolne, true);
});

test('zaległości są, ale wszystkie zablokowane → REST (np. piątek po A)', () => {
  const ctx = boot({ DZIS: FRI, TODAY: FRI });
  setHist(ctx, [{ d: '2026-10-15', k: 'B' }, { d: '2026-10-14', k: 'A' }]);
  // zostaje C: dzień przed grą → zablokowane
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.match(s.powod, /zablokowane/);
});

test('REST już zapisany dziś → zostaje REST', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-14', k: 'REST', rest: true }]);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'REST');
  assert.match(s.powod, /już odpoczynek/);
});

test('D (rehab) liczy się do serii dni z rzędu, ale nie jest sugerowane', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-13', k: 'D' }, { d: '2026-10-12', k: 'D' }, { d: '2026-10-11', k: 'D' }]);
  assert.equal(ctx.sugeruj().k, 'REST');
  setHist(ctx, []);
  assert.notEqual(ctx.sugeruj().k, 'D');
});

test('stary wpis A bez pola rest nadal działa', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-11', k: 'A', pct: 80, zrob: 10, total: 12, sw: 'green', trybSesji: 'full' }]);
  assert.ok(ctx.sugeruj().k);
  assert.equal(ctx.jestRest({ d: '2026-10-11', k: 'A' }), false);
});

test('chipy: REST w SESJE, bez VB/PADEL/D w priorytecie', () => {
  const ctx = boot();
  assert.equal(ctx.SESJE.REST.typ, 'rest');
  ['REST', 'D', 'VB', 'PADEL'].forEach(k => assert.ok(!ctx.PRIORYTET.includes(k)));
});

test('sugestia nie zależy od świateł: pole swiatlo w starych dniach jest ignorowane', () => {
  const ctx = boot();
  setHist(ctx, []);
  ctx.ST.dni['2026-10-14'] = { sesja: null, zrobione: [], swiatlo: 'red', pominiete: [], notatka: '' };
  assert.equal(ctx.sugeruj().k, 'A');
});

test('opisOstatnich etykietuje A/B/C i gry', () => {
  const ctx = boot();
  setHist(ctx, [{ d: '2026-10-13', k: 'A' }, { d: '2026-10-12', k: 'PADEL', sport: true }]);
  assert.match(ctx.opisOstatnich(5), /A \(wczoraj\)/);
  assert.match(ctx.opisOstatnich(5), /Padel/);
});
