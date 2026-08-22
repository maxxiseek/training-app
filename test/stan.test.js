'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot } = require('./harness');

test('blank ma komplet kluczy store', () => {
  const ctx = boot();
  const b = ctx.blank();
  assert.equal(JSON.stringify(Object.keys(b).sort()), JSON.stringify(['dni','historia','lifty','ostatniBackup','pomiary','testy'].sort()));
  assert.equal(b.historia.length, 0);
});

test('scalStan: stary eksport 1.1.0 (bez REST) przechodzi i nic nie kasuje', () => {
  const ctx = boot();
  const stary = {
    dni: { '2026-08-20': { sesja:'A', zrobione:['x'], swiatlo:'green', pominiete:[], notatka:'ok' } },
    lifty: { trapbar: [{ d:'2026-08-20', i:0, kg:80, p:5 }] },
    pomiary: [{ d:'2026-08-20', kg:90.4, pas:null }],
    testy: [],
    historia: [{ d:'2026-08-20', k:'A', pct:80, zrob:10, total:12, pom:[], sw:'green' }],
    ostatniBackup: '2026-08-20',
  };
  const s = ctx.scalStan(stary);
  assert.equal(s.ok, true);
  assert.equal(s.st.historia.length, 1);
  assert.equal(s.st.historia[0].k, 'A');
  assert.equal(s.st.historia[0].rest, undefined);
  assert.equal(s.st.lifty.trapbar[0].kg, 80);
  assert.equal(s.st.dni['2026-08-20'].sesja, 'A');
});

test('scalStan: Object.assign dopełnia brakujące klucze top-level', () => {
  const ctx = boot();
  const s = ctx.scalStan({ historia: [{ d:'2026-08-20', k:'VB', sport:true, pct:100 }] });
  assert.equal(s.ok, true);
  assert.equal(Object.keys(s.st.dni).length, 0);
  assert.equal(s.st.pomiary.length, 0);
  assert.equal(Object.keys(s.st.lifty).length, 0);
});

test('scalStan odrzuca śmieci', () => {
  const ctx = boot();
  assert.equal(ctx.scalStan(null).ok, false);
  assert.equal(ctx.scalStan([]).ok, false);
  assert.equal(ctx.scalStan('x').ok, false);
  assert.equal(ctx.scalStan({ foo: 1 }).ok, false);
});

test('scalStan naprawia zepsute tablice', () => {
  const ctx = boot();
  const s = ctx.scalStan({ historia: 'nope', dni: [] });
  assert.equal(s.ok, true);
  assert.equal(s.st.historia.length, 0);
  assert.equal(Object.keys(s.st.dni).length, 0);
});

test('wpisHistorii REST jest additive (rest:true, bez zrob/total)', () => {
  const ctx = boot();
  const w = ctx.wpisHistorii('REST', { d:'2026-08-22', swiatlo:'green', notatka:'sen' }, {});
  assert.equal(w.k, 'REST');
  assert.equal(w.rest, true);
  assert.equal(w.sport, undefined);
  assert.equal(w.pct, 100);
  assert.equal(w.zrob, undefined);
  assert.equal(w.notka, 'sen');
});

test('wpisHistorii sport ma sport:true, siłownia ma zrob/total', () => {
  const ctx = boot();
  const sport = ctx.wpisHistorii('VB', { d:'2026-08-22', swiatlo:null, notatka:'' }, {});
  assert.equal(sport.sport, true);
  const gym = ctx.wpisHistorii('A', { d:'2026-08-22', swiatlo:'yellow', notatka:'', __pct:50 },
    { zrob:4, total:8, pom:['Pallof press'] });
  assert.equal(gym.rest, undefined);
  assert.equal(gym.zrob, 4);
  assert.equal(gym.total, 8);
  assert.equal(gym.pom.length, 1);
  assert.equal(gym.pom[0], 'Pallof press');
});

test('jestRest rozpoznaje k i flagę', () => {
  const ctx = boot();
  assert.equal(ctx.jestRest({ k:'REST' }), true);
  assert.equal(ctx.jestRest({ k:'D', rest:true }), true);
  assert.equal(ctx.jestRest({ k:'A' }), false);
  assert.equal(ctx.jestRest(null), false);
});
