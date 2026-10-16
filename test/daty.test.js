'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot } = require('./harness');

test('iso używa daty lokalnej, nie UTC', () => {
  const ctx = boot();
  assert.equal(ctx.iso(new Date(2026, 7, 22, 0, 30)), '2026-08-22');
  assert.equal(ctx.iso(new Date(2026, 7, 22, 23, 50)), '2026-08-22');
});

test('przesunDni i dniTemu liczą pełne dni lokalne', () => {
  const ctx = boot({ DZIS: '2026-08-22' });
  assert.equal(ctx.przesunDni('2026-08-22', -6), '2026-08-16');
  assert.equal(ctx.dniTemu('2026-08-22'), 0);
  assert.equal(ctx.dniTemu('2026-08-21'), 1);
  assert.equal(ctx.dniTemu('2026-08-16'), 6);
});

test('cykl 4-tygodniowy od START_CYKLU (poniedziałek 19.10.2026)', () => {
  const ctx = boot();
  assert.equal(ctx.START_CYKLU, '2026-10-19');
  assert.deepEqual(JSON.parse(JSON.stringify(ctx.cyklInfo('2026-10-19'))), { przed: false, cykl: 1, tydz: 1, lekki: false });
  assert.equal(ctx.cyklInfo('2026-10-25').tydz, 1);
  assert.equal(ctx.cyklInfo('2026-10-26').tydz, 2);
  assert.equal(ctx.cyklInfo('2026-11-02').tydz, 3);
  const t4 = ctx.cyklInfo('2026-11-09');
  assert.equal(t4.tydz, 4);
  assert.equal(t4.lekki, true);
  assert.equal(ctx.cyklInfo('2026-11-15').lekki, true);
  const n = ctx.cyklInfo('2026-11-16');
  assert.equal(n.cykl, 2);
  assert.equal(n.tydz, 1);
  assert.equal(n.lekki, false);
});

test('przed startem cyklu: bez numeru i bez tygodnia lżejszego', () => {
  const ctx = boot();
  const c = ctx.cyklInfo('2026-10-16');
  assert.equal(c.przed, true);
  assert.equal(c.lekki, false);
  assert.equal(ctx.etykietaCyklu('2026-10-16'), 'Przed startem cyklu');
  assert.equal(ctx.etykietaCyklu('2026-11-10'), 'Cykl 1, tydzień 4/4');
});

test('startCyklu można nadpisać w ustawieniach', () => {
  const ctx = boot();
  ctx.ST.ustawienia = { startCyklu: '2026-10-12' };
  assert.equal(ctx.cyklInfo('2026-10-12').tydz, 1);
  assert.equal(ctx.cyklInfo('2026-11-02').lekki, true);
});

test('parseDay nie przesuwa dnia względem UTC', () => {
  const ctx = boot();
  const d = ctx.parseDay('2026-08-22');
  assert.equal(d.getFullYear(), 2026);
  assert.equal(d.getMonth(), 7);
  assert.equal(d.getDate(), 22);
});
