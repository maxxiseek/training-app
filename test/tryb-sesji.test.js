'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot, setHist } = require('./harness');

test('MINIMUM ukrywa pozycje full; FULL pokazuje wszystkie (poza rotacją mocy)', () => {
  const ctx = boot();
  const A = ctx.SESJE.A;
  const items = A.bloki.flatMap(b => b.items);
  const min = items.filter(it => ctx.itemWidoczny(it, 'minimum', 0));
  const full = items.filter(it => ctx.itemWidoczny(it, 'full', 0));
  assert.ok(min.length < full.length);
  assert.ok(min.every(it => it.poziom !== 'full'));
  assert.ok(full.some(it => it.poziom === 'full'));
});

test('oba tryby A/B/C nadal są w CELE_TYG (zaliczanie po kluczu sesji)', () => {
  const ctx = boot();
  assert.equal(ctx.CELE_TYG.A, 1);
  assert.equal(ctx.CELE_TYG.B, 1);
  assert.equal(ctx.CELE_TYG.C, 1);
});

test('rotacja mocy C: indeks z liczby ukończonych C', () => {
  const ctx = boot();
  setHist(ctx, []);
  assert.equal(ctx.indeksMocyC(), 0);
  setHist(ctx, [
    { d: '2026-08-20', k: 'C' },
    { d: '2026-08-15', k: 'C' },
  ]);
  assert.equal(ctx.indeksMocyC(), 2);
  const items = ctx.SESJE.C.bloki.flatMap(b => b.items).filter(it => typeof it.moc === 'number');
  assert.equal(items.length, 3);
  assert.ok(ctx.itemWidoczny(items[2], 'minimum', 2));
  assert.ok(!ctx.itemWidoczny(items[0], 'minimum', 2));
});

test('stary wpis bez trybSesji = full', () => {
  const ctx = boot();
  assert.equal(ctx.trybSesjiWpisu({ k: 'A', d: '2026-08-01' }), 'full');
  assert.equal(ctx.trybSesjiWpisu({ k: 'A', d: '2026-08-01', trybSesji: 'minimum' }), 'minimum');
});

test('box jump: stałe 3×3 (zakres zablokowany)', () => {
  const ctx = boot();
  const box = ctx.SESJE.A.bloki.flatMap(b => b.items).find(it => it.lift === 'boxjump');
  assert.ok(box, 'brak boxjump w A');
  assert.equal(box.zakres[0], 3);
  assert.equal(box.zakres[1], 3);
  assert.equal(box.serie, 3);
});

test('VB/PADEL mają format fazy', () => {
  const ctx = boot();
  assert.equal(ctx.SESJE.VB.format, 'fazy');
  assert.ok(ctx.SESJE.VB.fazy.length >= 4);
  assert.equal(ctx.SESJE.PADEL.format, 'fazy');
});
