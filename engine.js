/* ---------------------------------------------------------------
   engine.js — daty, stan, silnik sugestii. Bez DOM.
   Ładowany po data.js. Testy: node --test
----------------------------------------------------------------*/

function iso(d){
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function parseDay(s){
  const [y,m,d] = String(s).split('-').map(Number);
  return new Date(y, m-1, d);
}
function przesunDni(data, n){
  const d = parseDay(data);
  d.setDate(d.getDate() + n);
  return iso(d);
}

function blank(){
  return { dni:{}, lifty:{}, pomiary:[], testy:[], historia:[], ostatniBackup:null };
}
function scalStan(o){
  if(!o || typeof o !== 'object' || Array.isArray(o)) return { ok: false };
  if(!('historia' in o) && !('dni' in o)) return { ok: false };
  const st = Object.assign(blank(), o);
  if(!Array.isArray(st.historia)) st.historia = [];
  if(!st.dni || typeof st.dni !== 'object' || Array.isArray(st.dni)) st.dni = {};
  if(!st.lifty || typeof st.lifty !== 'object' || Array.isArray(st.lifty)) st.lifty = {};
  if(!Array.isArray(st.pomiary)) st.pomiary = [];
  if(!Array.isArray(st.testy)) st.testy = [];
  return { ok: true, st };
}

function dzien(){
  if(!ST.dni[TODAY]) ST.dni[TODAY] = { sesja:null, zrobione:[], swiatlo:null, pominiete:[], notatka:'' };
  return ST.dni[TODAY];
}

function tydzienNr(data){
  const diff = Math.round((parseDay(data) - parseDay(PLAN_START)) / 86400000);
  return Math.max(1, Math.floor(diff/7) + 1);
}
function tydzien(){ return tydzienNr(TODAY); }
function faza(){ const t = tydzien(); return FAZY.find(f => t>=f.od && t<=f.do) || FAZY[FAZY.length-1]; }

function hist(){ return (ST.historia||[]).slice().sort((a,b)=> a.d < b.d ? -1 : 1); }
function dniTemu(data){ return Math.round((parseDay(DZIS) - parseDay(data)) / 86400000); }
function dniOd(k){ const h = hist().filter(x => x.k === k); return h.length ? dniTemu(h[h.length-1].d) : 999; }
function licz7(k){
  const g = przesunDni(DZIS, -6);
  return hist().filter(x => x.k === k && x.d >= g).length;
}
function liczTreningi7(){
  const g = przesunDni(DZIS, -6);
  return hist().filter(x => x.k !== 'REST' && x.d >= g).length;
}
function kluczeOd(offset){
  return hist().filter(x => dniTemu(x.d) === offset).map(x => x.k);
}
function ileZRzedu(pred){
  let n = 0;
  for(let i = 1; i < 40; i++){
    if(pred(kluczeOd(i))) n++;
    else break;
  }
  return n;
}
function badgeK(k){ return k === 'VB' ? 'VB' : k === 'PADEL' ? 'PD' : k === 'REST' ? 'W' : k; }
function tytulS(S){ const p = (S && S.nazwa || '').split('—'); return (p.length > 1 ? p[1] : p[0]).trim(); }
function nazwaK(k){
  return k === 'VB' ? 'siatkówka' : k === 'PADEL' ? 'padel' : k === 'D' ? 'rehab (D)'
       : k === 'REST' ? 'dzień wolny' : 'sesja ' + k;
}
function nazwaSesji(k){ return (SESJE[k] && SESJE[k].nazwa) || k; }
function etykietaK(k){
  return k === 'VB' ? 'Siatkówka' : k === 'PADEL' ? 'Padel' : k === 'REST' ? 'Wolne' : k;
}
function typSesji(k){ return (SESJE[k] && SESJE[k].typ) || ''; }
function jestRest(x){ return !!(x && (x.k === 'REST' || x.rest)); }
function dopisekPropozycja(){
  return '<br><span style="color:var(--dim2)">To tylko propozycja, możesz wybrać inną jednostkę.</span>';
}

function blokady(){
  const b = {};
  const dA = dniOd('A'), dC = dniOd('C');
  if(dA < 1) b.A = 'A było dziś';
  else if(dA < 2 && CELE_TYG.A <= 1) b.A = 'A było wczoraj';
  if(dC < 1) b.C = 'C było dziś';
  else if(dC < 2) b.C = 'C było wczoraj';
  if(dA < 2 && !b.C) b.C = 'C potrzebuje 48 h od sesji A';
  if(dC < 2 && !b.A) b.A = 'A potrzebuje 48 h od sesji C';
  const wczoraj = hist().filter(x => dniTemu(x.d) === 1).map(x => x.k);
  const skokWczoraj = wczoraj.find(k => SKOKI.includes(k));
  if(skokWczoraj) SKOKI.forEach(k => { if(!b[k]) b[k] = 'wczoraj był dzień skoków (' + nazwaK(skokWczoraj) + ')'; });
  const dzis = hist().filter(x => dniTemu(x.d) === 0).map(x => x.k);
  dzis.forEach(k => { if(!b[k]) b[k] = 'zrobione dziś'; });
  return b;
}

function sugeruj(){
  const b = blokady();
  if(dzien().swiatlo === 'red')
    return { k: 'D', powod: 'Czerwone światło — dziś tylko rehab, sport i siłownia wypadają.' };

  if(kluczeOd(0).includes('REST'))
    return { k: 'REST', wolne: true,
      powod: 'Dziś już odpoczynek. Jutro wraca normalny rytm.' + dopisekPropozycja() };

  const seriaT = ileZRzedu(ks => ks.some(k => k !== 'REST'));
  if(seriaT >= MAX_TRENING_Z_RZEDU)
    return { k: 'REST', wolne: true,
      powod: 'Trzy treningi pod rząd. Dziś regeneracja — sen, spacer, bez siłowni i bez gry.' + dopisekPropozycja() };

  const seriaC = ileZRzedu(ks => ks.some(k => CIEZKIE.includes(k)));
  if(seriaC >= MAX_CIEZKIE_Z_RZEDU){
    const ciezkie = [];
    for(let i = seriaC; i >= 1; i--){
      const k = kluczeOd(i).find(x => CIEZKIE.includes(x));
      if(k) ciezkie.push(nazwaK(k));
    }
    return { k: 'REST', wolne: true,
      powod: 'Kolejny ciężki dzień z rzędu (' + ciezkie.join(', ') + '). Dziś regeneracja.' + dopisekPropozycja() };
  }

  if(liczTreningi7() >= MAX_SESJE_7)
    return { k: 'REST', wolne: true,
      powod: 'W oknie 7 dni jest już ' + MAX_SESJE_7 + ' jednostek — dziś regeneracja.' + dopisekPropozycja() };

  if(dzien().swiatlo === 'yellow' && kluczeOd(1).some(k => k !== 'REST')){
    if(licz7('D') < 1 && !b['D'])
      return { k: 'D', powod: 'Żółte światło po dniu treningowym — dziś rehab, bez siłowni i bez gry.' + dopisekPropozycja() };
    return { k: 'REST', wolne: true,
      powod: 'Żółte światło po dniu treningowym — dziś regeneracja.' + dopisekPropozycja() };
  }

  const kand = PRIORYTET.map(k => ({ k, def: (CELE_TYG[k] || 0) - licz7(k), blok: b[k] }));
  const wolne = kand.filter(x => !x.blok && x.def > 0).sort((x,y) => y.def - x.def);
  if(wolne.length){
    const w = wolne[0];
    const zablokowane = kand.filter(x => x.blok && x.def > 0);
    const brak = wolne.slice(1).map(x => nazwaK(x.k));
    let p = 'W oknie 7 dni brakuje: <b>' + nazwaK(w.k) + '</b>' +
            (brak.length ? ', dalej ' + brak.join(', ') : '') + '.';
    if(zablokowane.length) p += '<br>Dziś odpada: ' + zablokowane.map(x => nazwaK(x.k) + ' — ' + x.blok).join('; ') + '.';
    return { k: w.k, powod: p };
  }
  return { k: 'REST', wolne: true,
    powod: 'Cele tygodnia odhaczone. Odpocznij — jutro wraca normalny rytm.' + dopisekPropozycja() };
}

function tally(){
  const cele = PRIORYTET.map(k => {
    const c = licz7(k), t = CELE_TYG[k] || 0;
    const ok = c >= t;
    return '<span style="color:' + (ok ? 'var(--ok)' : 'var(--dim)') + '">' +
           (k === 'VB' ? 'Siatk.' : k === 'PADEL' ? 'Padel' : k) + ' ' + c + '/' + t + '</span>';
  }).join('<span style="color:var(--line)"> · </span>');
  return cele + '<span style="color:var(--line)"> · </span>' +
         '<span style="color:var(--dim2)">Wolne ' + licz7('REST') + '</span>';
}

function wpisHistorii(k, d, extras){
  const typ = typSesji(k);
  const lekki = typ === 'sport' || typ === 'rest';
  const base = { d: d.d, k, sw: d.swiatlo || null, notka: (d.notatka || '').slice(0, 300) };
  if(lekki) return Object.assign(base, { pct: 100 }, typ === 'sport' ? { sport: true } : { rest: true });
  return Object.assign(base, {
    pct: d.__pct || 0, zrob: extras && extras.zrob || 0, total: extras && extras.total || 0,
    pom: extras && extras.pom || [],
  });
}
