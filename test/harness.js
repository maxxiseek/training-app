'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const EXPORTS = `
this.APP=APP; this.START_CYKLU=START_CYKLU; this.CYKL_TYGODNI=CYKL_TYGODNI; this.STALA_GRA=STALA_GRA;
this.SESJE=SESJE; this.TYDZIEN=TYDZIEN; this.CELE_TYG=CELE_TYG; this.GRY=GRY;
this.PRIORYTET=PRIORYTET; this.LIFTY=LIFTY; this.TESTY=TESTY; this.DRABINKI=DRABINKI;
this.POWROT_DNI=POWROT_DNI; this.POWROT_PROC=POWROT_PROC; this.LEKKI_PROC=LEKKI_PROC;
this.ZYWIENIE=ZYWIENIE;
`;

function boot(opts){
  opts = opts || {};
  const DZIS = opts.DZIS || '2026-10-14'; // środa
  const ctx = {
    Date, Math, Number, String, Object, Array, JSON, parseFloat, parseInt, isNaN, console,
    ST: opts.ST || { dni:{}, lifty:{}, pomiary:[], testy:[], historia:[], ostatniBackup:null, ustawienia:{} },
    DZIS, TODAY: opts.TODAY || DZIS,
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8') + EXPORTS, ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine.js'), 'utf8') + '\nthis.SCHEMA=SCHEMA;', ctx);
  return ctx;
}

function setHist(ctx, arr){
  ctx.ST.historia = arr;
  ctx.ST.dni = {};
}

module.exports = { boot, setHist };
