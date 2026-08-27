'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const EXPORTS = `
this.APP=APP; this.PLAN_START=PLAN_START; this.FAZY=FAZY; this.DELOADY=DELOADY;
this.SESJE=SESJE; this.TYDZIEN=TYDZIEN; this.CELE_TYG=CELE_TYG; this.SKOKI=SKOKI;
this.CIEZKIE=CIEZKIE; this.MAX_TRENING_Z_RZEDU=MAX_TRENING_Z_RZEDU;
this.MAX_CIEZKIE_Z_RZEDU=MAX_CIEZKIE_Z_RZEDU; this.MAX_SESJE_7=MAX_SESJE_7;
this.PRIORYTET=PRIORYTET; this.LIFTY=LIFTY; this.TESTY=TESTY;
this.CEL_WAGA=typeof CEL_WAGA!=='undefined'?CEL_WAGA:null;
`;

function boot(opts){
  opts = opts || {};
  const DZIS = opts.DZIS || '2026-08-27';
  const ctx = {
    Date, Math, Number, String, Object, Array, JSON, parseFloat, parseInt, isNaN, console,
    ST: opts.ST || { dni:{}, lifty:{}, pomiary:[], testy:[], historia:[], ostatniBackup:null },
    DZIS, TODAY: opts.TODAY || DZIS,
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8') + EXPORTS, ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine.js'), 'utf8'), ctx);
  return ctx;
}

function setHist(ctx, arr){
  ctx.ST.historia = arr;
  ctx.ST.dni = {};
}

module.exports = { boot, setHist };
