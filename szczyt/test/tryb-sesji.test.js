'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot, setHist } = require('./harness');

test('MINIMUM ukrywa full w A i B Olgi', () => {
  const ctx = boot();
  for (const k of ['A', 'B', 'C']) {
    const items = ctx.SESJE[k].bloki.flatMap(b => b.items);
    const min = items.filter(it => ctx.itemWidoczny(it, 'minimum', 0));
    const full = items.filter(it => ctx.itemWidoczny(it, 'full', 0));
    assert.ok(min.length < full.length, k);
  }
});

test('B Olgi bez OHP', () => {
  const ctx = boot();
  const names = ctx.SESJE.B.bloki.flatMap(b => b.items).map(it => it.n).join(' ').toLowerCase();
  assert.ok(!/ohp|overhead|nad głowę|nad glowe/.test(names));
  assert.ok(/hip thrust|kickback|odwodzenie|glute|poślad/.test(names));
});

test('po ciężkim GORY blokada A/C + sugestia MINIMUM', () => {
  const ctx = boot({ DZIS: '2026-08-28', TODAY: '2026-08-28' });
  setHist(ctx, [{ d: '2026-08-27', k: 'GORY' }]);
  ctx.ST.lifty = { marsz: [{ d: '2026-08-27', i: 0, kg: 70, p: 5 }] };
  assert.ok(ctx.ciezkiGoryWczoraj());
  const b = ctx.blokady();
  assert.ok(b.A);
  assert.ok(b.C);
  assert.equal(ctx.sugerujTrybSesji('A'), 'minimum');
});

test('B jako bufor po A: przy deficycie B wygrywa z GORY', () => {
  const ctx = boot({ DZIS: '2026-08-28', TODAY: '2026-08-28' });
  setHist(ctx, [{ d: '2026-08-27', k: 'A' }]);
  const s = ctx.sugeruj();
  assert.equal(s.k, 'B');
});

test('VB/PADEL fazy w extra', () => {
  const ctx = boot();
  assert.equal(ctx.SESJE.VB.format, 'fazy');
  assert.ok(ctx.SESJE.VB.extra);
  assert.ok(ctx.SESJE.PADEL.fazy.length >= 4);
});
