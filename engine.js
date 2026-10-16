/* ---------------------------------------------------------------
   engine.js — daty, stan, cykl, progresja, silnik sugestii. Bez DOM.
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
function dniMiedzy(a, b){ return Math.round((parseDay(b) - parseDay(a)) / 86400000); }

/* ============ stan i migracja ============ */
const SCHEMA = 2; // 2 = 1.4.0 (zmiana kluczy ćwiczeń, ustawienia)

function blank(){
  return { dni:{}, lifty:{}, pomiary:[], testy:[], historia:[], ostatniBackup:null, ustawienia:{}, schema:SCHEMA };
}

/* 1.4.0: zmiana kluczy ćwiczeń + porządki w dniach. Uruchamia się raz (st.schema). */
function migruj(st){
  if((st.schema || 1) >= SCHEMA) return st;
  const L = st.lifty;
  // stary pullup był logowany w kg ściągania → pulldown (nowy pullup = podciąganie z dodatkowym ciężarem)
  if(L.pullup){ L.pulldown = (L.pulldown || []).concat(L.pullup); delete L.pullup; }
  // stary rdl (uginanie nóg albo RDL jednonóż w A) → legcurl; nowy slrdl startuje od zera
  if(L.rdl){ L.legcurl = (L.legcurl || []).concat(L.rdl); delete L.rdl; }
  // porządki w dniach
  Object.keys(st.dni).forEach(d => {
    const dn = st.dni[d];
    if(!dn || typeof dn !== 'object') return;
    const wpisy = st.historia.filter(x => x && x.d === d);
    if(!dn.sesja && Array.isArray(dn.zrobione) && dn.zrobione.length){
      const pref = String(dn.zrobione[0]).split('-')[0];
      if(SESJE[pref]) dn.sesja = pref;
    }
    if(wpisy.length){
      const ks = wpisy.map(x => x.k);
      if(dn.sesja && !ks.includes(dn.sesja)){
        // źródłem prawdy jest historia (preferuj jednostkę siłową)
        const sila = wpisy.find(x => !(SESJE[x.k] && SESJE[x.k].typ === 'sport') && x.k !== 'REST');
        dn.sesja = (sila || wpisy[0]).k;
      }
    }
  });
  st.schema = SCHEMA;
  return st;
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
  if(!st.ustawienia || typeof st.ustawienia !== 'object' || Array.isArray(st.ustawienia)) st.ustawienia = {};
  // brak schema = kopia sprzed 1.4.0 (Object.assign(blank()) wstawił domyślne SCHEMA — odczytaj z oryginału)
  st.schema = (typeof o.schema === 'number') ? o.schema : 1;
  return { ok: true, st: migruj(st) };
}

function dzien(){
  if(!ST.dni[TODAY]) ST.dni[TODAY] = { sesja:null, zrobione:[], pominiete:[], notatka:'' };
  return ST.dni[TODAY];
}

/* ============ ustawienia i cykl ============ */
function ust(){ return (ST && ST.ustawienia) || {}; }
function stalaGra(){
  const v = ust().stalaGra;
  return (typeof v === 'number' && v >= 0 && v <= 6) ? v : STALA_GRA;
}
function startCyklu(){ return ust().startCyklu || START_CYKLU; }

/* Cykl N, tydzień X/4. Przed startem cyklu: normalna progresja, bez tygodnia lżejszego. */
function cyklInfo(data){
  const diff = dniMiedzy(startCyklu(), data);
  if(diff < 0) return { przed: true, cykl: 0, tydz: 0, lekki: false };
  const w = Math.floor(diff / 7);
  return { przed: false, cykl: Math.floor(w / CYKL_TYGODNI) + 1, tydz: (w % CYKL_TYGODNI) + 1, lekki: (w % CYKL_TYGODNI) === CYKL_TYGODNI - 1 };
}
function etykietaCyklu(data){
  const c = cyklInfo(data || TODAY);
  return c.przed ? 'Przed startem cyklu' : 'Cykl ' + c.cykl + ', tydzień ' + c.tydz + '/' + CYKL_TYGODNI;
}

/* ============ historia ============ */
function hist(){ return (ST.historia||[]).slice().sort((a,b)=> a.d < b.d ? -1 : 1); }
function dniTemu(data){ return Math.round((parseDay(DZIS) - parseDay(data)) / 86400000); }
function dniOd(k){ const h = hist().filter(x => x.k === k); return h.length ? dniTemu(h[h.length-1].d) : 999; }
function dniOdGry(){ return Math.min(...GRY.map(dniOd)); }
function licz7(k){
  const g = przesunDni(DZIS, -6);
  return hist().filter(x => x.k === k && x.d >= g).length;
}
function jestSport(k){ return typSesji(k) === 'sport'; }
function ostatnieTreningi(n){
  n = n || 5;
  return hist().filter(x => x.k !== 'REST').slice().reverse().slice(0, n);
}
function opisOstatnich(n){
  const list = ostatnieTreningi(n);
  if(!list.length) return 'Brak zapisanych treningów.';
  return 'Ostatnio: ' + list.map(x => {
    const dt = dniTemu(x.d);
    const kiedy = dt === 0 ? 'dziś' : dt === 1 ? 'wczoraj' : (dt + ' dn. temu');
    return etykietaK(x.k) + ' (' + kiedy + ')';
  }).join(' · ');
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

/* ============ sugestia dnia ============ */
const DNI_TYG = ['niedziela','poniedziałek','wtorek','środa','czwartek','piątek','sobota'];

/* Ile dni od dziś (DZIS) do najbliższej stałej gry; 0 = dziś jest dzień stałej gry. */
function dniDoGry(){
  return (stalaGra() - parseDay(DZIS).getDay() + 7) % 7;
}

function blokady(){
  const b = {};
  const dA = dniOd('A'), dC = dniOd('C'), dGra = dniOdGry(), doGry = dniDoGry();
  const gra = DNI_TYG[stalaGra()];
  ['A','B','C'].forEach(k => { if(dniOd(k) < 1) b[k] = 'zrobione dziś'; });
  // A: nie dzień po grze; min. 48 h do stałej gry; min. 48 h od C
  if(!b.A){
    if(dGra === 1) b.A = 'wczoraj była gra';
    else if(dGra < 1) b.A = 'dziś była gra';
    else if(dC < 2) b.A = 'A potrzebuje 48 h od sesji C';
    else if(doGry < 2) b.A = 'za blisko stałej gry (' + gra + ')';
  }
  // C: nie dzień przed stałą grą; nie dzień po A
  if(!b.C){
    if(dA < 2) b.C = 'C potrzebuje 48 h od sesji A';
    else if(doGry === 1) b.C = 'jutro stała gra (' + gra + ')';
  }
  return b;
}

function zKontekstem(res){
  res.ostatnio = opisOstatnich(5);
  res.powod = (res.powod || '') + '<br><span style="color:var(--dim2)">' + res.ostatnio + '</span>';
  return res;
}

function sugeruj(){
  const b = blokady();

  if(kluczeOd(0).includes('REST'))
    return zKontekstem({ k: 'REST', wolne: true,
      powod: 'Dziś już odpoczynek. Jutro wraca normalny rytm.' + dopisekPropozycja() });

  // Dowolna aktywność (siłownia, rehab, gra) 3 dni z rzędu → regeneracja.
  const seria = ileZRzedu(ks => ks.some(k => k !== 'REST'));
  if(seria >= MAX_AKTYWNOSC_Z_RZEDU)
    return zKontekstem({ k: 'REST', wolne: true,
      powod: 'Trzy dni aktywności pod rząd (siłownia, rehab lub gra). Dziś regeneracja — sen, spacer.' + dopisekPropozycja() });

  const kand = PRIORYTET.map(k => ({ k, def: (CELE_TYG[k] || 0) - licz7(k), blok: b[k] }));
  const wolne = kand.filter(x => !x.blok && x.def > 0);
  if(wolne.length){
    const w = wolne[0];
    const zablokowane = kand.filter(x => x.blok && x.def > 0);
    const brak = wolne.slice(1).map(x => etykietaK(x.k));
    let p = brak.length
      ? 'Dalej w kolejce: ' + brak.join(', ') + '.'
      : 'To najlepszy wybór z zaległości w oknie 7 dni.';
    if(zablokowane.length) p += '<br>Dziś odpada: ' + zablokowane.map(x => etykietaK(x.k) + ' — ' + x.blok).join('; ') + '.';
    p += '<br><span style="color:var(--dim2)">Gry (siatkówka, padel) odhaczasz osobno — nie wchodzą w tę sugestię.</span>';
    return zKontekstem({ k: w.k, powod: p });
  }
  const zablokowane = kand.filter(x => x.blok && x.def > 0);
  return zKontekstem({ k: 'REST', wolne: true,
    powod: (zablokowane.length
      ? 'Zaległe jednostki są dziś zablokowane: ' + zablokowane.map(x => etykietaK(x.k) + ' — ' + x.blok).join('; ') + '. '
      : 'Cele siłowe (A/B/C) odhaczone. ') + 'Odpocznij albo odhacz grę, jeśli grasz.' + dopisekPropozycja() });
}

function tally(){
  const cele = Object.keys(CELE_TYG).map(k => {
    const c = licz7(k), t = CELE_TYG[k] || 0;
    const ok = c >= t;
    return '<span style="color:' + (ok ? 'var(--ok)' : 'var(--dim)') + '">' + k + ' ' + c + '/' + t + '</span>';
  }).join('<span style="color:var(--line)"> · </span>');
  const gry = GRY.reduce((s, k) => s + licz7(k), 0);
  return cele + '<span style="color:var(--line)"> · </span>' +
         '<span style="color:var(--dim2)">Gry ' + gry + '</span><span style="color:var(--line)"> · </span>' +
         '<span style="color:var(--dim2)">Wolne ' + licz7('REST') + '</span>';
}

function wpisHistorii(k, d, extras){
  const typ = typSesji(k);
  const lekki = typ === 'sport' || typ === 'rest';
  const base = { d: d.d, k, notka: (d.notatka || '').slice(0, 300) };
  if(lekki) return Object.assign(base, { pct: 100 }, typ === 'sport' ? { sport: true } : { rest: true });
  return Object.assign(base, {
    pct: d.__pct || 0, zrob: extras && extras.zrob || 0, total: extras && extras.total || 0,
    pom: extras && extras.pom || [],
    skrot: !!(extras && extras.skrot),
  });
}

/* Średnia aktywności sportowej: max 4 pełne tygodnie, od pierwszego wpisu (bez pustych sprzed startu). */
function statystykiSportu(keys, opts){
  opts = opts || {};
  const maxPeln = opts.maxPeln || 4;
  const maxWidok = opts.maxWidok || (maxPeln + 1);
  const sport = hist().filter(x => keys.includes(x.k)).sort((a,b) => a.d < b.d ? -1 : 1);
  const od = sport.length ? sport[0].d : null;
  const tyg = [];
  for(let w = 0; w < maxWidok; w++){
    const b = przesunDni(DZIS, -w * 7);
    const a = przesunDni(b, -6);
    const counts = {};
    keys.forEach(k => { counts[k] = hist().filter(x => x.k === k && x.d >= a && x.d <= b).length; });
    tyg.push({ w, a, b, counts, sum: keys.reduce((s, k) => s + counts[k], 0) });
  }
  const peln = od
    ? tyg.slice(1).filter(row => row.b >= od).slice(0, maxPeln)
    : [];
  const avgs = {};
  keys.forEach(k => {
    avgs[k] = peln.length ? peln.reduce((s, x) => s + x.counts[k], 0) / peln.length : 0;
  });
  return { tyg, peln, avgs, nPeln: peln.length, od };
}

/* ============ log serii i progresja ============ */
const pl0 = n => (n == null ? '' : String(n).replace('.', ','));
function zaokr(kg, krok){
  krok = krok || 2.5;
  return Math.round(Math.round(kg / krok) * krok * 100) / 100;
}
function setyDnia(kl, data){
  return (ST.lifty[kl] || []).filter(x => x.d === data).sort((a,b) => (a.i||0) - (b.i||0));
}
function setDnia(kl, i){ return (ST.lifty[kl] || []).find(x => x.d === TODAY && x.i === i); }

/* Jeden wpis na dzień: najcięższy ciężar (albo najwyższy wariant drabinki), ile serii na nim, najmniej powtórzeń. */
function dniLiftu(kl){
  const g = {};
  (ST.lifty[kl] || []).forEach(x => { if(x.p > 0) (g[x.d] = g[x.d] || []).push(x); });
  return Object.keys(g).sort().map(d => {
    const sety = g[d].slice().sort((a,b)=>(a.i||0)-(b.i||0));
    const w = Math.max(...sety.map(x => x.w || 0));
    const kg = Math.max(...sety.map(x => x.kg || 0));
    const top = sety.filter(x => (x.kg || 0) === kg && (x.w || 0) === w);
    return { d, kg, w, sety: top.length, min: Math.min(...top.map(x => x.p)),
             powt: sety.map(x => x.p), lekki: cyklInfo(d).lekki };
  });
}

/* Liczba sesji od ostatniej przerwy > POWROT_DNI (łącznie z sesją powrotną); null, gdy przerwy nie było. */
function sesjiOdPrzerwy(h){
  for(let i = h.length - 1; i >= 1; i--){
    if(dniMiedzy(h[i-1].d, h[i].d) > POWROT_DNI) return h.length - i;
  }
  return null;
}

/* Serie dziś: tydzień lżejszy = −1 seria; blok mocy = połowa objętości. */
function serieEf(it, b){
  const base = it.serie || 3;
  if(!cyklInfo(TODAY).lekki) return base;
  if(b && b.moc) return Math.max(1, Math.ceil(base / 2));
  return Math.max(1, base - 1);
}
function dawkaTekst(it, b){
  if(!it.serie || !it.d) return it.d;
  const s = serieEf(it, b);
  return s === it.serie ? it.d : it.d.replace(/^\s*\d+(\s*[×x])/, s + '$1');
}
function idItemu(k, bi, it){ return k + '-' + bi + '-' + (it.id || it.n); }

function ostatniLog(kl){
  const a = (ST.lifty[kl] || []).filter(x => x.p > 0).map(x => x.d).sort();
  return a.length ? a[a.length - 1] : '';
}
/* Pozycja „X lub Y” → konkretny wariant: wybór z dnia, inaczej ostatnio używany, inaczej pierwszy. */
function itemDnia(it, d){
  if(!it.warianty) return it;
  const wyb = d && d.wyb ? d.wyb[it.id] : null;
  let v = it.warianty.find(x => x.lift === wyb);
  if(!v){
    v = it.warianty.slice().sort((a, b) => (ostatniLog(b.lift) > ostatniLog(a.lift) ? 1 : ostatniLog(b.lift) < ostatniLog(a.lift) ? -1 : 0))[0];
    if(!ostatniLog(v.lift)) v = it.warianty[0];
  }
  return Object.assign({}, it, v);
}

const tekstSerie = (serie, zak, jed) => serie + ' × ' + (zak[0] === zak[1] ? zak[0] : zak[0] + '–' + zak[1]) + (jed === 's' ? ' s' : jed === 'm' ? ' m' : '');

/* Podwójna progresja — patrzy na poprzednie sesje (sprzed TODAY), nie na dzisiejszą.
   Kolejność: start → brak progresji → przerwa → tydzień lżejszy → stagnacja → progresja. */
function analiza(it, b){
  if(it.ladder) return analizaDrabinka(it, b);
  const kl = it.lift, L = LIFTY[kl] || {};
  const baza = it.serie || 3, serie = serieEf(it, b);
  const zak = it.zakres || [8, 10], krok = it.krok || 2.5, jed = it.jednostka || 'powt';
  const h = dniLiftu(kl).filter(x => x.d < TODAY);
  const lekki = cyklInfo(TODAY).lekki;
  const bw = !!L.bw;

  if(!h.length){
    const st = (L.start != null) ? L.start : null;
    if(st != null) return { kg: st, powt: zak[0], serie, tekst: bw && st === 0
      ? `Start: sama masa ciała (0 kg dodatkowo) — ${tekstSerie(serie, zak, jed)}, zostaw 2 powt. zapasu.`
      : `Start: <b>${pl0(st)} kg</b> — ${tekstSerie(serie, zak, jed)}, zostaw 2 powt. zapasu.` };
    return { kg: null, powt: zak[0], serie, tekst:
      `Pierwszy raz — dobierz ciężar tak, żeby ${zak[0]} powt. wyszło z 2 powt. zapasu. Od następnego razu policzę progresję.` };
  }

  const hn = h.filter(x => !x.lekki);          // sesje z tygodni lżejszych nie wyznaczają progresji
  const baz = hn.length ? hn : h;
  const ost = baz[baz.length - 1], poprz = baz.length > 1 ? baz[baz.length - 2] : null;
  const ostAny = h[h.length - 1];
  const opis = `${ost.d} · <b>${pl0(ost.kg)} kg</b> — ${ost.powt.join(' / ')}`;
  const dniPrzerwy = dniMiedzy(ostAny.d, TODAY);

  if(it.progresja === 'brak'){
    const kg = lekki ? zaokr(ost.kg * LEKKI_PROC, krok) : ost.kg;
    return { kg, powt: zak[0], serie, tekst: `${opis}<br>Bez auto-progresji — dobierz ciężar sam${lekki ? ' (tydzień lżejszy: ~90%)' : ''}.` };
  }
  if(dniPrzerwy > POWROT_DNI){
    const kg = zaokr(ost.kg * POWROT_PROC, krok);
    return { kg, powt: zak[0], serie, tekst:
      `${opis}<br>Przerwa ${dniPrzerwy} dni — wracasz łagodnie: <b>${pl0(kg)} kg</b> (${Math.round(POWROT_PROC * 100)}%), ${tekstSerie(serie, zak, jed)}. Przez kolejne ${POWROT_BEZ_PODBIJANIA} sesje bez podbijania.` };
  }
  if(lekki){
    const kg = zaokr(ost.kg * LEKKI_PROC, krok);
    return { kg, powt: zak[0], serie, tekst:
      `${opis}<br>Tydzień lżejszy — <b>${pl0(kg)} kg</b> (${Math.round(LEKKI_PROC * 100)}%), ${tekstSerie(serie, zak, jed)}, bez podbijania.` };
  }

  let stag = 0;
  for(let i = baz.length - 1; i >= 0; i--){
    if(baz[i].kg === ost.kg && !(baz[i].sety >= baza && baz[i].min >= zak[1])) stag++; else break;
  }
  if(stag >= 3){
    const niz = Math.max(krok, Math.round(ost.kg * 0.1 / krok) * krok);
    return { kg: ost.kg - niz, powt: zak[1], serie, tekst:
      `${opis}<br><b>${stag} sesje w miejscu na ${pl0(ost.kg)} kg.</b> Zejdź do <b>${pl0(ost.kg - niz)} kg</b>, zrób ${tekstSerie(serie, [zak[1], zak[1]], jed)} czysto i wracaj w górę.` };
  }
  const od = sesjiOdPrzerwy(h);
  const bezPodb = od != null && od <= POWROT_BEZ_PODBIJANIA;
  if(ost.sety >= baza && ost.min >= zak[1]){
    if(bezPodb) return { kg: ost.kg, powt: zak[1], serie, tekst:
      `${opis}<br>Po przerwie bez podbijania (jeszcze ${POWROT_BEZ_PODBIJANIA - od + 1} ${POWROT_BEZ_PODBIJANIA - od + 1 === 1 ? 'sesja' : 'sesje'}) — zostań na <b>${pl0(ost.kg)} kg</b>.` };
    const kg = Math.round((ost.kg + krok) * 100) / 100;
    return { kg, powt: zak[0], serie, tekst:
      `${opis}<br>Zaliczone ${tekstSerie(serie, [zak[1], zak[1]], jed)} — dziś <b>${pl0(kg)} kg</b>, wracasz do ${zak[0]} powt.` };
  }
  if(ost.sety < baza)
    return { kg: ost.kg, powt: Math.max(zak[0], ost.min), serie, tekst:
      `${opis}<br>Zostań na <b>${pl0(ost.kg)} kg</b> — ostatnio brakło serii do ${baza}.` };
  const nast = Math.min(zak[1], ost.min + 1);
  const trend = poprz && poprz.kg === ost.kg && ost.min > poprz.min ? ' Idzie w górę.' : '';
  return { kg: ost.kg, powt: nast, serie, tekst:
    `${opis}<br>Zostań na <b>${pl0(ost.kg)} kg</b>, celuj w ${tekstSerie(serie, [nast, nast], jed)}. Podbiję ciężar po ${tekstSerie(baza, [zak[1], zak[1]], jed)}.${trend}` };
}

/* Drabinka wariantów (ćwiczenia bez ciężaru). Wpis logu: { d, i, w: indeks wariantu, p: powt. albo s, kg: 0 }. */
function analizaDrabinka(it, b){
  const D = it.ladder, kl = it.lift;
  const baza = it.serie || 3, serie = serieEf(it, b);
  const h = dniLiftu(kl).filter(x => x.d < TODAY);
  const lekki = cyklInfo(TODAY).lekki;
  const krokP = D[0].jednostka === 's' ? 5 : 1;
  const jedn = w => D[w].jednostka === 's' ? ' s' : '';
  const R = (w, powt, tekst) => ({ ladder: true, w, kg: 0, powt, serie, wariant: D[w].wariant, tekst });

  if(!h.length) return R(0, D[0].zakres[0], `Start: wariant <b>${D[0].wariant}</b> — ${tekstSerie(serie, D[0].zakres, D[0].jednostka)}.`);

  const hn = h.filter(x => !x.lekki);
  const baz = hn.length ? hn : h;
  const ost = baz[baz.length - 1];
  const w = Math.min(ost.w || 0, D.length - 1), zak = D[w].zakres;
  const opis = `${ost.d} · <b>${D[w].wariant}</b> — ${ost.powt.join(' / ')}${jedn(w)}`;
  const dniPrzerwy = dniMiedzy(h[h.length - 1].d, TODAY);

  if(dniPrzerwy > POWROT_DNI)
    return R(w, zak[0], `${opis}<br>Przerwa ${dniPrzerwy} dni — wracasz do dolnego zakresu: ${tekstSerie(serie, [zak[0], zak[0]], D[w].jednostka)}. Przez kolejne ${POWROT_BEZ_PODBIJANIA} sesje bez zmiany wariantu.`);
  if(lekki)
    return R(w, Math.max(zak[0], Math.min(zak[1], ost.min)), `${opis}<br>Tydzień lżejszy — ten sam wariant, ${serie} ${serie === 1 ? 'seria' : 'serie'}, bez zmiany wariantu.`);

  let stag = 0;
  for(let i = baz.length - 1; i >= 0; i--){
    if((baz[i].w || 0) === (ost.w || 0) && !(baz[i].sety >= baza && baz[i].min >= zak[1])) stag++; else break;
  }
  if(stag >= 3){
    if(w > 0){
      const z0 = D[w - 1].zakres;
      return R(w - 1, z0[1], `${opis}<br><b>${stag} sesje bez postępu.</b> Wróć do wariantu <b>${D[w - 1].wariant}</b>, zrób ${tekstSerie(serie, [z0[1], z0[1]], D[w - 1].jednostka)} czysto i wracaj w górę.`);
    }
    return R(w, zak[1], `${opis}<br><b>${stag} sesje bez postępu.</b> Zrób ${tekstSerie(serie, [zak[1], zak[1]], D[w].jednostka)} czysto, bez pośpiechu.`);
  }
  const od = sesjiOdPrzerwy(h);
  const bezPodb = od != null && od <= POWROT_BEZ_PODBIJANIA;
  if(ost.sety >= baza && ost.min >= zak[1]){
    if(!bezPodb && w + 1 < D.length){
      const z1 = D[w + 1].zakres;
      return R(w + 1, z1[0], `${opis}<br>Zaliczone ${tekstSerie(serie, [zak[1], zak[1]], D[w].jednostka)} — kolejny wariant: <b>${D[w + 1].wariant}</b>, ${tekstSerie(serie, [z1[0], z1[0]], D[w + 1].jednostka)}.`);
    }
    return R(w, zak[1], `${opis}<br>${bezPodb ? 'Po przerwie bez zmiany wariantu.' : 'Najwyższy wariant.'} Utrzymaj ${tekstSerie(serie, [zak[1], zak[1]], D[w].jednostka)}.`);
  }
  if(ost.sety < baza)
    return R(w, Math.max(zak[0], ost.min), `${opis}<br>Ten sam wariant — ostatnio brakło serii do ${baza}.`);
  const nast = Math.min(zak[1], ost.min + krokP);
  return R(w, nast, `${opis}<br>Ten sam wariant, celuj w ${tekstSerie(serie, [nast, nast], D[w].jednostka)}. Następny wariant po ${tekstSerie(baza, [zak[1], zak[1]], D[w].jednostka)}.`);
}

/* Pozycje z kluczem logu odhaczone bez wpisanego ciężaru (przypomnienie przy zapisie). */
function brakCiezaru(pozycje, zrobione, dataLogu){
  return pozycje.filter(it => {
    if(!it.lift || it.ladder) return false;
    if(!zrobione.includes(it.__id)) return false;
    const bw = !!(LIFTY[it.lift] && LIFTY[it.lift].bw);
    return !setyDnia(it.lift, dataLogu).some(x => x.p > 0 && (bw || x.kg > 0));
  }).map(it => it.n);
}
