'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { boot } = require('./harness');

test('blank ma komplet kluczy store', () => {
  const ctx = boot();
  const b = ctx.blank();
  assert.equal(JSON.stringify(Object.keys(b).sort()), JSON.stringify(['dni','historia','lifty','ostatniBackup','pomiary','schema','testy','ustawienia'].sort()));
  assert.equal(b.historia.length, 0);
});

test('scalStan: stary eksport 1.1.0 (bez REST) przechodzi i nic nie kasuje', () => {
  const ctx = boot();
  const stary = {
    dni: { '2026-08-20': { sesja:'A', zrobione:['x'], pominiete:[], notatka:'ok' } },
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
  const w = ctx.wpisHistorii('REST', { d:'2026-08-22', notatka:'sen' }, {});
  assert.equal(w.k, 'REST');
  assert.equal(w.rest, true);
  assert.equal(w.sport, undefined);
  assert.equal(w.pct, 100);
  assert.equal(w.zrob, undefined);
  assert.equal(w.notka, 'sen');
});

test('wpisHistorii sport ma sport:true, siłownia ma zrob/total', () => {
  const ctx = boot();
  const sport = ctx.wpisHistorii('VB', { d:'2026-08-22', notatka:'' }, {});
  assert.equal(sport.sport, true);
  const gym = ctx.wpisHistorii('A', { d:'2026-08-22', notatka:'', __pct:50 },
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

test('wpisHistorii nie zapisuje już trybSesji ani świateł; zapisuje skrót', () => {
  const ctx = boot();
  const w = ctx.wpisHistorii('A', { d:'2026-10-14', notatka:'', __pct:100, trybSesji:'full' }, { zrob:6, total:6, pom:[], skrot:true });
  assert.equal(w.trybSesji, undefined);
  assert.equal(w.sw, undefined);
  assert.equal(w.skrot, true);
  assert.equal(ctx.wpisHistorii('A', { d:'2026-10-14', notatka:'' }, { zrob:1, total:2 }).skrot, false);
});

/* ---------- migracja 1.4.0 ---------- */
const stary = () => ({
  dni: {
    '2026-09-01': { sesja:null, zrobione:['B-1-Wyciskanie hantli'], pominiete:[], notatka:'', swiatlo:'green', trybSesji:'full' },
    '2026-09-02': { sesja:'C', zrobione:['C-1-x'], pominiete:[], notatka:'' },
  },
  lifty: {
    pullup: [{ d:'2026-09-01', i:0, kg:55, p:8 }],
    rdl:    [{ d:'2026-09-02', i:0, kg:35, p:10 }],
    benchdb:[{ d:'2026-09-01', i:0, kg:22.5, p:10 }],
    boxjump:[{ d:'2026-09-02', i:0, kg:75, p:3 }],
    trapbar:[{ d:'2026-09-02', i:0, kg:80, p:5 }],
  },
  pomiary: [], testy: [],
  historia: [
    { d:'2026-09-01', k:'B', pct:100, zrob:5, total:5, pom:[], sw:'yellow', trybSesji:'minimum' },
    { d:'2026-09-02', k:'A', pct:90, zrob:5, total:6, pom:[] },
  ],
  ostatniBackup: null,
});

test('migracja: pullup → pulldown, rdl → legcurl, reszta historii zostaje', () => {
  const ctx = boot();
  const s = ctx.scalStan(stary());
  assert.equal(s.ok, true);
  const L = s.st.lifty;
  assert.equal(L.pullup, undefined);
  assert.equal(L.rdl, undefined);
  assert.equal(L.pulldown.length, 1);
  assert.equal(L.pulldown[0].kg, 55);
  assert.equal(L.legcurl.length, 1);
  assert.equal(L.legcurl[0].kg, 35);
  // archiwum zostaje w danych
  assert.equal(L.benchdb.length, 1);
  assert.equal(L.boxjump.length, 1);
  assert.equal(L.trapbar[0].kg, 80);
  assert.equal(s.st.historia.length, 2);
  assert.equal(s.st.schema, ctx.SCHEMA);
});

test('migracja jest jednorazowa: nowy pullup nie zostaje przemianowany drugi raz', () => {
  const ctx = boot();
  const s1 = ctx.scalStan(stary()).st;
  s1.lifty.pullup = [{ d:'2026-10-20', i:0, kg:0, p:6 }];   // nowe podciąganie z masą ciała
  const s2 = ctx.scalStan(JSON.parse(JSON.stringify(s1))).st;
  assert.equal(s2.lifty.pullup.length, 1);
  assert.equal(s2.lifty.pulldown.length, 1);
  assert.equal(s2.lifty.pulldown[0].kg, 55);
});

test('migracja: dzień z sesja:null i niepustym zrobione dostaje sesję z prefiksu ID', () => {
  const ctx = boot();
  const st = ctx.scalStan(stary()).st;
  assert.equal(st.dni['2026-09-01'].sesja, 'B');
});

test('migracja: gdy dni[d].sesja różni się od historii, wygrywa historia', () => {
  const ctx = boot();
  const st = ctx.scalStan(stary()).st;
  assert.equal(st.dni['2026-09-02'].sesja, 'A');   // dni mówiło C, historia A
});

test('migracja: pola swiatlo / trybSesji zostają w danych, ale nic ich nie czyta', () => {
  const ctx = boot();
  const st = ctx.scalStan(stary()).st;
  assert.equal(st.dni['2026-09-01'].swiatlo, 'green');
  assert.equal(st.historia[0].sw, 'yellow');
  ctx.ST = st;
  assert.ok(ctx.sugeruj().k);
});

test('migracja: łączy istniejące wpisy pulldown z pullup (nie gubi żadnych)', () => {
  const ctx = boot();
  const o = stary();
  o.lifty.pulldown = [{ d:'2026-08-20', i:0, kg:50, p:10 }];
  const st = ctx.scalStan(o).st;
  assert.equal(st.lifty.pulldown.length, 2);
});

test('kopia już w schemacie 2 nie jest ruszana', () => {
  const ctx = boot();
  const o = stary(); o.schema = ctx.SCHEMA;
  const st = ctx.scalStan(o).st;
  assert.equal(st.lifty.pullup.length, 1);
  assert.equal(st.lifty.rdl.length, 1);
});
