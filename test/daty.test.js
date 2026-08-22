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

test('tydzień programu od PLAN_START (lokalnie, z zaokrągleniem DST)', () => {
  const ctx = boot({ TODAY: '2026-08-18', DZIS: '2026-08-18' });
  assert.equal(ctx.PLAN_START, '2026-08-18');
  assert.equal(ctx.tydzienNr('2026-08-18'), 1);
  assert.equal(ctx.tydzienNr('2026-08-24'), 1);
  assert.equal(ctx.tydzienNr('2026-08-25'), 2);
});

test('parseDay nie przesuwa dnia względem UTC', () => {
  const ctx = boot();
  const d = ctx.parseDay('2026-08-22');
  assert.equal(d.getFullYear(), 2026);
  assert.equal(d.getMonth(), 7);
  assert.equal(d.getDate(), 22);
});
