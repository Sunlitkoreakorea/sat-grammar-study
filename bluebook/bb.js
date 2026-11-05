/* Bluebook-style practice with College Board SAT Suite Question Bank questions (Reading and Writing).
   Nothing from College Board is stored in this repository: question lists and each question are fetched
   in the visitor's browser from the endpoints the official Question Bank site itself uses (they allow any origin).
   Only question keys with right/wrong, review flags, recent scores and settings are kept, in this browser's localStorage. */
(function () {
  'use strict';

  var API = 'https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank';
  var CB_SITE = 'https://satsuitequestionbank.collegeboard.org/';
  var TESTS = [['99', 'SAT'], ['100', 'PSAT/NMSQT & PSAT 10'], ['102', 'PSAT 8/9']];
  // listed in the order a Reading and Writing module presents them
  var DOMAINS = [
    { cd: 'CAS', name: 'Craft and Structure', ko: '기법과 구조', rw: 'R', skills: [
      { cd: 'WIC', name: 'Words in Context', ko: '문맥 속 어휘' },
      { cd: 'TSP', name: 'Text Structure and Purpose', ko: '글의 구조와 목적' },
      { cd: 'CTC', name: 'Cross-Text Connections', ko: '두 글 연결' }] },
    { cd: 'INI', name: 'Information and Ideas', ko: '정보와 아이디어', rw: 'R', skills: [
      { cd: 'CID', name: 'Central Ideas and Details', ko: '중심 내용과 세부' },
      { cd: 'COE', name: 'Command of Evidence', ko: '근거 찾기 (글, 표, 그래프)' },
      { cd: 'INF', name: 'Inferences', ko: '추론' }] },
    { cd: 'SEC', name: 'Standard English Conventions', ko: '문법', rw: 'W', skills: [
      { cd: 'BOU', name: 'Boundaries', ko: '구두점과 문장 연결', alto: 'ALTO 3, 12' },
      { cd: 'FSS', name: 'Form, Structure, and Sense', ko: '일치, 시제, 형태', alto: 'ALTO 4–11' }] },
    { cd: 'EOI', name: 'Expression of Ideas', ko: '표현', rw: 'W', skills: [
      { cd: 'TRA', name: 'Transitions', ko: '전환어', alto: 'ALTO 12' },
      { cd: 'SYN', name: 'Rhetorical Synthesis', ko: '메모 종합' }] }
  ];
  var SK = {}, ORDER = [], READ = [], WRITE = [];
  DOMAINS.forEach(function (d) {
    d.skills.forEach(function (s) { s.dm = d.cd; SK[s.cd] = s; ORDER.push(s.cd); (d.rw === 'R' ? READ : WRITE).push(s.cd); });
  });
  var DIFFS = [['E', 'Easy', '쉬움'], ['M', 'Medium', '보통'], ['H', 'Hard', '어려움']];
  var DIFF_EN = { E: 'Easy', M: 'Medium', H: 'Hard' }, DIFF_KO = { E: '쉬움', M: '보통', H: '어려움' };
  var BANDS = [1, 2, 3, 4, 5, 6, 7];
  var FONTS = [[15, '작게'], [17, '보통'], [19, '크게'], [21, '아주 크게']];
  var POOLS = [['new', '안 푼 문제 먼저'], ['unseen', '안 푼 문제만'], ['wrong', '틀린 문제만'], ['right', '맞힌 문제만'], ['flag', '리뷰 표시한 문제만'], ['any', '상관없이 무작위']];
  var ORDERS = [['random', '무작위'], ['easy', '쉬운 문제부터'], ['hard', '어려운 문제부터'], ['test', '실제 시험 순서', '유형 순서대로, 같은 유형은 쉬운 문제부터']];
  var TIMERS = [['pace', '실제 시험 속도', '문제당 71초 (27문제 32분)'], ['custom', '직접 정하기'], ['up', '걸린 시간만 표시'], ['off', '끄기']];
  var CHECKS = [['end', '끝나고 한꺼번에', 'Bluebook처럼 제출한 뒤 채점'], ['instant', '한 문제씩 바로', '답을 고르고 Check Answer로 확인']];
  var COUNTS = [[5, '5'], [10, '10'], [20, '20'], [27, '27 (1모듈)'], [54, '54 (2모듈)'], [9999, '전부']];
  var ROWS = [
    ['문제 범위', [['test', '시험'], ['area', '영역'], ['diff', '난이도'], ['band', 'Score Band'], ['added', '추가 시기'], ['active', 'Active 문제'], ['pool', '풀이 기록']]],
    ['푸는 방식', [['count', '문제 수'], ['order', '순서'], ['time', '시간'], ['check', '채점'], ['view', '화면']]],
    ['', [['ids', 'ID로 풀기'], ['stats', '내 기록']]]
  ];
  var SEC_PER_Q = 71;                       // a Reading and Writing module: 32 minutes for 27 questions
  var SKEY = 'sat-bb-v1', DAY = 864e5;

  var app = document.getElementById('app');
  var $ = function (s) { return app.querySelector(s); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var nf = function (n) { return Number(n).toLocaleString('en-US'); };
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function fmt(sec) { sec = Math.max(0, sec | 0); var m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }
  function setOf(a) { var o = {}; (a || []).forEach(function (v) { o[v] = 1; }); return o; }
  function sameSet(a, b) { return a.length === b.length && a.every(function (v) { return b.indexOf(v) >= 0; }); }
  function byOrder(a) { return a.sort(function (x, y) { return ORDER.indexOf(x) - ORDER.indexOf(y); }); }

  /* ───────── storage ───────── */
  function defaults() {
    return {
      ev: '99', skills: ORDER.slice(), diffs: ['E', 'M', 'H'], bands: BANDS.slice(), offT: [], noActive: false, pool: 'new',
      count: 10, order: 'random', timer: 'pace', mins: 32, auto: true, check: 'end', info: false, font: 1
    };
  }
  var store = { v: 2, res: {}, flag: {}, sessions: [], prefs: defaults(), legacy: false };
  try {
    var raw = JSON.parse(localStorage.getItem(SKEY) || 'null');
    if (raw) {
      store.res = raw.res || {};
      store.flag = raw.flag || {};
      store.sessions = raw.sessions || [];
      if (raw.v === 2) {
        for (var k in (raw.prefs || {})) if (k in store.prefs) store.prefs[k] = raw.prefs[k];
        store.legacy = !!raw.legacy;
      } else {
        store.legacy = Object.keys(store.res).length > 0;   // version 1 keyed results by SAT question id; moved once the SAT list loads
      }
    }
    localStorage.removeItem('sat-cb-list-v1');
  } catch (e) { /* storage unavailable: run without persistence */ }
  function save() { try { localStorage.setItem(SKEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }
  function migrate(items) {
    if (!store.legacy) return;
    items.forEach(function (x) { if (x.id in store.res) { store.res[x.ext] = store.res[x.id]; delete store.res[x.id]; } });
    store.legacy = false;
    save();
  }

  /* ───────── College Board data ───────── */
  var lists = {}, listP = {}, live = null, liveP = null, qcache = {};
  function req(path, body) {
    var opt = body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {};
    return fetch(API + path, opt).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }
  function readCache(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  function writeCache(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  // "Active" questions: the ones used on official Bluebook practice tests (the Question Bank's own exclusion list)
  function loadLive() {
    if (live) return Promise.resolve(live);
    if (liveP) return liveP;
    var c = readCache('sat-cb-live-v1');
    var p = c && c.ids && Date.now() - c.at < DAY ? Promise.resolve(c.ids)
      : req('/lookup').then(function (d) {
        var ids = d.readingLiveItems || [];
        writeCache('sat-cb-live-v1', { at: Date.now(), ids: ids });
        return ids;
      }).catch(function () { return c && c.ids ? c.ids : []; });   // without it the filter just has nothing to remove
    liveP = p.then(function (ids) { live = setOf(ids); liveP = null; return live; });
    return liveP;
  }
  function month(ms) { var d = new Date(ms); return isNaN(d.getTime()) ? '' : d.getUTCFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2); }
  // one list per test: difficulty is rated against each test's own population
  function loadList(ev) {
    if (lists[ev]) return Promise.resolve(lists[ev]);
    if (listP[ev]) return listP[ev];
    var key = 'sat-cb-rw-' + ev, c = readCache(key);
    var p = c && c.items && Date.now() - c.at < DAY ? Promise.resolve(c.items)
      : req('/digital/get-questions', { asmtEventId: +ev, test: 1, domain: 'INI,CAS,EOI,SEC' }).then(function (l) {
        var items = [];
        (l || []).forEach(function (x) {
          if (x && x.external_id && SK[x.skill_cd] && DIFF_EN[x.difficulty]) {
            items.push({ id: x.questionId, ext: x.external_id, sk: x.skill_cd, d: x.difficulty, b: +x.score_band_range_cd || 0, t: month(x.createDate) });
          }
        });
        if (!items.length) throw new Error('empty list');
        writeCache(key, { at: Date.now(), items: items });
        return items;
      }).catch(function (err) { if (c && c.items) return c.items; throw err; });   // a stale list beats nothing
    listP[ev] = Promise.all([p, loadLive()]).then(function (r) {
      lists[ev] = r[0];
      delete listP[ev];
      if (ev === '99') migrate(r[0]);
      return r[0];
    }, function (err) { delete listP[ev]; throw err; });
    return listP[ev];
  }

  // External HTML goes through an allow-list. Text formatting, tables and the inline SVG charts College Board
  // uses are rebuilt element by element; scripts, event handlers, links and unknown elements never get through.
  var SVGNS = 'http://www.w3.org/2000/svg';
  var TAGS = setOf(['P', 'SPAN', 'BR', 'U', 'EM', 'I', 'STRONG', 'B', 'S', 'SUP', 'SUB', 'SMALL', 'UL', 'OL', 'LI', 'TABLE', 'THEAD', 'TBODY', 'TFOOT',
    'TR', 'TD', 'TH', 'CAPTION', 'COLGROUP', 'COL', 'BLOCKQUOTE', 'FIGURE', 'FIGCAPTION', 'DIV']);
  var DROP = setOf(['SCRIPT', 'STYLE', 'TEMPLATE', 'IFRAME', 'OBJECT', 'EMBED', 'NOSCRIPT', 'MATH', 'VIDEO', 'AUDIO', 'LINK', 'META', 'FORM',
    'INPUT', 'BUTTON', 'TEXTAREA', 'SELECT', 'CANVAS']);
  var SVG_TAGS = setOf(['svg', 'g', 'defs', 'pattern', 'rect', 'line', 'polyline', 'polygon', 'path', 'circle', 'ellipse', 'text', 'tspan',
    'title', 'desc', 'clipPath', 'marker', 'linearGradient', 'radialGradient', 'stop', 'mask']);
  var SVG_ATTRS = setOf(('width height viewBox x y x1 y1 x2 y2 cx cy r rx ry d points dx dy fill stroke stroke-width stroke-linecap stroke-linejoin ' +
    'stroke-dasharray stroke-dashoffset stroke-opacity stroke-miterlimit fill-opacity fill-rule clip-rule opacity transform text-anchor ' +
    'dominant-baseline alignment-baseline baseline-shift font-size font-family font-weight font-style letter-spacing id role aria-label ' +
    'aria-hidden preserveAspectRatio patternUnits patternContentUnits patternTransform offset stop-color stop-opacity gradientUnits ' +
    'gradientTransform markerWidth markerHeight refX refY orient markerUnits clip-path clipPathUnits marker-start marker-mid marker-end ' +
    'mask visibility display').split(' '));
  var HTML_ATTRS = ['scope', 'colspan', 'rowspan', 'role', 'aria-label', 'aria-level', 'lang'];
  var STYLE_OK = setOf(['text-align', 'vertical-align', 'caption-side', 'text-decoration', 'padding-left', 'margin-left', 'text-indent', 'font-style', 'font-weight']);
  function safeStyle(s) {
    return (s || '').split(';').map(function (part) {
      var i = part.indexOf(':');
      if (i < 0) return '';
      var k = part.slice(0, i).trim().toLowerCase(), v = part.slice(i + 1).trim();
      return STYLE_OK[k] && /^[\w\s.,%#-]+$/.test(v) ? k + ': ' + v : '';
    }).filter(Boolean).join('; ');
  }
  function clean(html, inline) {
    var src = new DOMParser().parseFromString('<div>' + (html || '') + '</div>', 'text/html').body.firstChild;
    var box = document.createElement('div');
    (function walk(node, out, inSvg) {
      Array.prototype.forEach.call(node.childNodes, function (c) {
        if (c.nodeType === 3) { out.appendChild(document.createTextNode(c.nodeValue)); return; }
        if (c.nodeType !== 1) return;
        var el;
        if (c.namespaceURI === SVGNS) {
          if (!SVG_TAGS[c.localName]) return;
          el = document.createElementNS(SVGNS, c.localName);
          Array.prototype.forEach.call(c.attributes, function (at) {
            if (SVG_ATTRS[at.name] && !/javascript:|data:|url\((?!\s*['"]?#)/i.test(at.value)) el.setAttribute(at.name, at.value);
          });
          walk(c, el, true);
          out.appendChild(el);
          return;
        }
        if (inSvg) return;
        var nm = c.nodeName.toUpperCase();
        if (DROP[nm]) return;
        if (nm === 'IMG') {
          var s = c.getAttribute('src') || '';
          if (!/^(https:\/\/|data:image\/(png|jpe?g|gif|webp);)/i.test(s)) return;
          el = document.createElement('img');
          el.setAttribute('src', s);
          el.setAttribute('alt', c.getAttribute('alt') || '');
          el.setAttribute('referrerpolicy', 'no-referrer');
          out.appendChild(el);
          return;
        }
        if (!TAGS[nm]) { walk(c, out); return; }                 // unknown wrapper: keep its text only
        el = document.createElement(inline && (nm === 'P' || nm === 'BLOCKQUOTE' || nm === 'DIV') ? 'span' : nm.toLowerCase());
        if (/(^|\s)sr-only(\s|$)/.test(c.getAttribute('class') || '')) el.className = 'sr-only';
        if (c.getAttribute('aria-hidden') === 'true') el.setAttribute('aria-hidden', 'true');
        HTML_ATTRS.forEach(function (a) {
          var v = c.getAttribute(a);
          if (v != null && ((a !== 'colspan' && a !== 'rowspan') || /^\d{1,2}$/.test(v))) el.setAttribute(a, v);
        });
        var st = safeStyle(c.getAttribute('style'));
        if (st) el.setAttribute('style', st);
        walk(c, el, false);
        out.appendChild(el);
      });
    })(src, box, false);
    return box.innerHTML;
  }
  function textOf(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    Array.prototype.forEach.call(d.querySelectorAll('.sr-only, svg, table, figure'), function (e) { e.parentNode.removeChild(e); });
    return d.textContent.replace(/\s+/g, ' ').trim();
  }
  function loadQ(ext) {
    if (qcache[ext]) return Promise.resolve(qcache[ext]);
    return req('/digital/get-question', { external_id: ext }).then(function (d) {
      var opts = (d.answerOptions || []).slice(0, 4), key = (d.correct_answer || [])[0];
      if (opts.length !== 4 || !/^[A-D]$/.test(key || '')) throw new Error('unexpected question format');
      var q = { stim: clean(d.stimulus), stem: clean(d.stem), key: key, why: clean(d.rationale), opts: opts.map(function (o) { return clean(o.content, true); }) };
      q.text = textOf(q.stim) || textOf(q.stem);
      return (qcache[ext] = q);
    });
  }
  // load a whole set up front (4 at a time) so moving between questions never waits
  function fetchAll(items, onStep) {
    return new Promise(function (resolve) {
      var i = 0, active = 0, done = 0;
      (function pump() {
        if (i >= items.length && active === 0) { resolve(items.filter(function (x) { return qcache[x.ext]; })); return; }
        while (active < 4 && i < items.length) {
          (function (x) {
            active++;
            loadQ(x.ext).catch(function () { return loadQ(x.ext); }).catch(function () { /* dropped from the set */ })
              .then(function () { active--; done++; onStep(done, items.length); pump(); });
          })(items[i++]);
        }
      })();
    });
  }
  function stats(items) {
    var s = { n: items.length, good: 0, bad: 0 };
    items.forEach(function (x) { var v = store.res[x.ext]; if (v === 1) s.good++; else if (v === 0) s.bad++; });
    return s;
  }

  /* ───────── icons ───────── */
  var I = {
    down: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    up: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg class="chev" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    left: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pen: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 7l3 3" stroke="currentColor" stroke-width="1.8"/></svg>',
    dots: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.9" fill="currentColor"/><circle cx="12" cy="12" r="1.9" fill="currentColor"/><circle cx="12" cy="19" r="1.9" fill="currentColor"/></svg>',
    mark: '<svg width="16" height="20" viewBox="0 0 18 22" aria-hidden="true"><path d="M2 2h14v18l-7-5-7 5z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    flag: '<svg class="flag" width="12" height="15" viewBox="0 0 18 22" aria-hidden="true"><path d="M2 2h14v18l-7-5-7 5z" fill="#c8102e"/></svg>',
    pin: '<svg class="pin" width="14" height="16" viewBox="0 0 24 28" aria-hidden="true"><path d="M12 1a9 9 0 0 0-9 9c0 7 9 17 9 17s9-10 9-17a9 9 0 0 0-9-9z" fill="currentColor"/><circle cx="12" cy="10" r="3.4" fill="#fff"/></svg>',
    clock: '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    grip: '<svg width="14" height="20" viewBox="0 0 14 20" aria-hidden="true"><path d="M5 4l-4 6 4 6M9 4l4 6-4 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    minus: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>'
  };

  /* ───────── filtering ───────── */
  var view = 'home', S = null, timerId = null;
  var ui = { sel: 'area', open: false, ids: '' };
  function cur() { return lists[store.prefs.ev] || []; }
  // every filter except `skip`, so each option can show how many questions it would add
  function matcher(skip) {
    var p = store.prefs, sk = setOf(p.skills), df = setOf(p.diffs), bd = setOf(p.bands), off = setOf(p.offT);
    var allB = p.bands.length >= BANDS.length, lv = live || {};
    return function (x) {
      return (skip === 'skill' || sk[x.sk]) && (skip === 'diff' || df[x.d]) && (skip === 'band' || allB || bd[x.b]) &&
        (skip === 'active' || !p.noActive || !lv[x.ext]) && (skip === 'added' || !off[x.t]);
    };
  }
  function tally(skip, keyOf) {
    var m = matcher(skip), c = {};
    cur().forEach(function (x) { if (m(x)) { var v = keyOf(x); c[v] = (c[v] || 0) + 1; } });
    return c;
  }
  function inPool(kind, x) {
    var r = store.res[x.ext];
    if (kind === 'unseen') return r === undefined;
    if (kind === 'wrong') return r === 0;
    if (kind === 'right') return r === 1;
    if (kind === 'flag') return !!store.flag[x.ext];
    return true;
  }
  function matching() { return cur().filter(matcher()); }
  function poolItems(m) { var kind = store.prefs.pool; return (m || matching()).filter(function (x) { return inPool(kind, x); }); }
  function months() {
    var o = {};
    cur().forEach(function (x) { if (x.t) o[x.t] = 1; });
    return Object.keys(o).sort().reverse();
  }
  var DR = { E: 0, M: 1, H: 2 };
  function arrange(a) {
    var o = store.prefs.order;
    if (o === 'easy') return a.sort(function (x, y) { return DR[x.d] - DR[y.d] || x.b - y.b; });
    if (o === 'hard') return a.sort(function (x, y) { return DR[y.d] - DR[x.d] || y.b - x.b; });
    if (o === 'test') return a.sort(function (x, y) { return ORDER.indexOf(x.sk) - ORDER.indexOf(y.sk) || DR[x.d] - DR[y.d] || x.b - y.b; });
    return a;
  }
  function buildSet() {
    var items = poolItems(), picked;
    if (store.prefs.pool === 'new') {
      picked = shuffle(items.filter(function (x) { return store.res[x.ext] === undefined; }))
        .concat(shuffle(items.filter(function (x) { return store.res[x.ext] !== undefined; })));
    } else picked = shuffle(items.slice());
    return arrange(picked.slice(0, store.prefs.count));
  }
  function findIds(text) {
    var toks = (text || '').toLowerCase().match(/[0-9a-f]{8}(?:-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?/g) || [];
    var byId = {}, seen = {}, items = [];
    cur().forEach(function (x) { byId[String(x.id).toLowerCase()] = x; byId[x.ext.toLowerCase()] = x; });
    toks.forEach(function (t) { var x = byId[t]; if (x && !seen[x.ext]) { seen[x.ext] = 1; items.push(x); } });
    return { asked: toks.length, items: items };
  }

  /* ───────── labels ───────── */
  function testName(ev) { for (var i = 0; i < TESTS.length; i++) if (TESTS[i][0] === ev) return TESTS[i][1]; return 'SAT'; }
  function areaLabel(s) {
    if (!s.length) return '없음';
    if (s.length === ORDER.length) return '전체';
    if (sameSet(s, READ)) return 'Reading';
    if (sameSet(s, WRITE)) return 'Writing';
    var whole = [], part = false;
    DOMAINS.forEach(function (d) {
      var n = d.skills.filter(function (k) { return s.indexOf(k.cd) >= 0; }).length;
      if (n === d.skills.length) whole.push(d.ko); else if (n) part = true;
    });
    if (!part) return whole.join(', ');
    return s.length === 1 ? SK[s[0]].name : s.length + '개 유형';
  }
  function bandLabel(b) {
    if (b.length >= BANDS.length) return '전체';
    if (!b.length) return '없음';
    var a = b.slice().sort(function (x, y) { return x - y; }), out = [], st = a[0], pv = a[0];
    for (var i = 1; i <= a.length; i++) {
      if (a[i] === pv + 1) { pv = a[i]; continue; }
      out.push(st === pv ? '' + st : st + '–' + pv);
      st = pv = a[i];
    }
    return out.join(', ');
  }
  function monthLabel(t) { var p = t.split('-'); return p[0] + '년 ' + (+p[1]) + '월'; }
  function pick(list, v) { for (var i = 0; i < list.length; i++) if (String(list[i][0]) === String(v)) return list[i]; return list[0]; }
  function rowValue(k) {
    var p = store.prefs;
    switch (k) {
      case 'test': return testName(p.ev);
      case 'area': return areaLabel(p.skills);
      case 'diff': return p.diffs.length === 3 ? '전체' : p.diffs.length ? DIFFS.filter(function (d) { return p.diffs.indexOf(d[0]) >= 0; }).map(function (d) { return d[1]; }).join(', ') : '없음';
      case 'band': return bandLabel(p.bands);
      case 'added':
        var ms = months(), on = ms.filter(function (m) { return p.offT.indexOf(m) < 0; });
        return on.length === ms.length ? '전체' : !on.length ? '없음' : on.length === 1 ? monthLabel(on[0]) : on.length + '개 시기';
      case 'active': return p.noActive ? '빼기' : '포함';
      case 'pool': return pick(POOLS, p.pool)[1];
      case 'count': return p.count >= 9999 ? '전부' : p.count + '문제';
      case 'order': return pick(ORDERS, p.order)[1];
      case 'time': return p.timer === 'custom' ? p.mins + '분' : pick(TIMERS, p.timer)[1];
      case 'check': return pick(CHECKS, p.check)[1];
      case 'view': return FONTS[p.font][1] + (p.info ? ', 유형 표시' : '');
      case 'ids': return findIds(ui.ids).items.length ? findIds(ui.ids).items.length + '문제' : '';
      case 'stats': var st = stats(cur()); return st.good + st.bad ? (st.good + st.bad) + '문제 풂' : '';
    }
    return '';
  }
  function sessionLabel() { var p = store.prefs; return testName(p.ev) + ', ' + areaLabel(p.skills); }

  /* ───────── setup screen: option list + one option's controls ───────── */
  function optBtn(a, k, v, on, title, sub, n, disabled, multi) {
    return '<button type="button" class="opt' + (multi ? ' multi' : '') + (on ? ' on' : '') + '" data-a="' + a + '" data-k="' + k + '" data-v="' + esc(v) + '" aria-pressed="' + !!on + '"' + (disabled ? ' disabled' : '') + '>' +
      '<span class="mk">' + (multi && on ? I.check : '') + '</span><span class="t"><b>' + title + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + '</span>' +
      (n != null && n !== '' ? '<span class="n">' + n + '</span>' : '') + '</button>';
  }
  function radios(k, opts) {
    var v = store.prefs[k];
    return '<div class="opts">' + opts.map(function (o) { return optBtn('opt', k, o[0], String(v) === String(o[0]), o[1], o[2], o[3], o[4]); }).join('') + '</div>';
  }
  function stepper(k, val, min, max, text, typed) {
    return '<div class="stepper"><button type="button" data-a="step" data-k="' + k + '" data-v="-1"' + (val <= min ? ' disabled' : '') + ' aria-label="줄이기">−</button>' +
      (typed ? '<input type="number" inputmode="numeric" data-a="num" data-k="' + k + '" min="' + min + '" max="' + max + '" value="' + val + '" aria-label="문제 수">' : '<output>' + text + '</output>') +
      '<button type="button" data-a="step" data-k="' + k + '" data-v="1"' + (val >= max ? ' disabled' : '') + ' aria-label="늘리기">+</button></div>';
  }
  function sw(k, on, label) {
    return '<label class="switch"><input type="checkbox" data-a="sw" data-k="' + k + '"' + (on ? ' checked' : '') + '><span class="track"></span><span>' + label + '</span></label>';
  }
  function allNone(a1, a2, k) {
    return '<button type="button" class="mini" data-a="' + a1 + '" data-k="' + k + '">전체</button><button type="button" class="mini" data-a="' + a2 + '" data-k="' + k + '">해제</button>';
  }
  function detail(k) {
    var p = store.prefs, h = '', tools = '', title = '';
    ROWS.forEach(function (g) { g[1].forEach(function (r) { if (r[0] === k) title = r[1]; }); });
    if (k === 'test') {
      h = radios('ev', TESTS.map(function (t) { return [t[0], t[1], '', lists[t[0]] ? nf(lists[t[0]].length) : '']; }));
    } else if (k === 'area') {
      var c = tally('skill', function (x) { return x.sk; });
      var preset = sameSet(p.skills, ORDER) ? 'all' : sameSet(p.skills, READ) ? 'R' : sameSet(p.skills, WRITE) ? 'W' : '';
      tools = '<button type="button" class="mini" data-a="preset" data-v="none">해제</button>';
      h = '<div class="seg wide">' + [['all', '전체'], ['R', 'Reading'], ['W', 'Writing']].map(function (o) {
        return '<button type="button" class="' + (preset === o[0] ? 'on' : '') + '" data-a="preset" data-v="' + o[0] + '">' + o[1] + '</button>';
      }).join('') + '</div>';
      h += DOMAINS.map(function (d) {
        var n = d.skills.filter(function (s) { return p.skills.indexOf(s.cd) >= 0; }).length, tot = 0;
        d.skills.forEach(function (s) { tot += c[s.cd] || 0; });
        var state = n === d.skills.length ? ' on' : n ? ' part' : '';
        return '<div class="dom"><button type="button" class="dom-h' + state + '" data-a="dom" data-v="' + d.cd + '" aria-pressed="' + (n === d.skills.length) + '">' +
          '<span class="mk">' + (state === ' on' ? I.check : state ? I.minus : '') + '</span><span class="t"><b>' + d.name + '</b><small>' + d.ko + '</small></span><span class="n">' + nf(tot) + '</span></button>' +
          '<div class="opts">' + d.skills.map(function (s) {
            var st = stats(cur().filter(function (x) { return x.sk === s.cd; }));
            var n2 = nf(c[s.cd] || 0) + (st.good + st.bad ? '<i><em class="g">✓' + st.good + '</em> <em class="r">✗' + st.bad + '</em></i>' : '');
            return optBtn('tog', 'skills', s.cd, p.skills.indexOf(s.cd) >= 0, s.name + (s.alto ? ' <em class="alto">' + s.alto + '</em>' : ''), s.ko, n2, false, true);
          }).join('') + '</div></div>';
      }).join('');
    } else if (k === 'diff') {
      var cd = tally('diff', function (x) { return x.d; });
      tools = allNone('all', 'none', 'diffs');
      h = '<div class="opts">' + DIFFS.map(function (d) { return optBtn('tog', 'diffs', d[0], p.diffs.indexOf(d[0]) >= 0, d[1], d[2], nf(cd[d[0]] || 0), false, true); }).join('') + '</div>';
    } else if (k === 'band') {
      var cb = tally('band', function (x) { return x.b; });
      tools = allNone('all', 'none', 'bands');
      h = '<p class="d-note">난이도를 7단계로 더 잘게 나눈 것. 숫자가 클수록 어려워요.</p><div class="opts cols">' + BANDS.map(function (b) {
        return optBtn('tog', 'bands', b, p.bands.indexOf(b) >= 0, 'Band ' + b, '', nf(cb[b] || 0), false, true);
      }).join('') + '</div>';
    } else if (k === 'added') {
      var ct = tally('added', function (x) { return x.t; });
      tools = allNone('addall', 'addnone', 'offT');
      h = '<div class="opts cols">' + months().map(function (m) {
        return optBtn('tmon', 'offT', m, p.offT.indexOf(m) < 0, monthLabel(m), '', nf(ct[m] || 0), false, true);
      }).join('') + '</div>';
    } else if (k === 'active') {
      var ma = matcher('active'), na = 0, lv = live || {};
      cur().forEach(function (x) { if (ma(x) && lv[x.ext]) na++; });
      h = '<div class="d-line first">' + sw('noActive', p.noActive, 'Active 문제 빼기') + '<span class="n">' + nf(na) + '문제</span></div>' +
        '<p class="d-note">Bluebook 공식 모의고사에 쓰이는 문제예요.</p>';
    } else if (k === 'pool') {
      var m = matching();
      h = radios('pool', POOLS.map(function (o) {
        var n = m.filter(function (x) { return inPool(o[0], x); }).length;
        return [o[0], o[1], '', nf(n), !n && o[0] !== 'new' && o[0] !== 'any'];
      }));
    } else if (k === 'count') {
      var max = poolItems().length, cnt = Math.min(p.count, max);
      h = '<div class="count-box">' + stepper('count', cnt, 1, Math.max(1, max), '', true) + '<span class="n">최대 ' + nf(max) + '</span></div>' +
        '<div class="chips">' + COUNTS.map(function (o) {
          return '<button type="button" class="chip' + (p.count === o[0] ? ' on' : '') + '" data-a="opt" data-k="count" data-v="' + o[0] + '"' + (o[0] !== 9999 && o[0] > max ? ' disabled' : '') + '>' + o[1] + '</button>';
        }).join('') + '</div>';
    } else if (k === 'order') {
      h = radios('order', ORDERS);
    } else if (k === 'time') {
      h = radios('timer', TIMERS);
      if (p.timer === 'custom') h += '<div class="d-sub">시간</div>' + stepper('mins', p.mins, 1, 180, p.mins + '분');
      if (p.timer === 'pace' || p.timer === 'custom') h += '<div class="d-line">' + sw('auto', p.auto, '시간이 끝나면 자동 제출') + '</div>';
    } else if (k === 'check') {
      h = radios('check', CHECKS);
    } else if (k === 'view') {
      h = '<div class="d-sub first">글자 크기</div><div class="count-box">' + stepper('font', p.font, 0, FONTS.length - 1, FONTS[p.font][1]) +
        '<span class="fs-demo" style="font-size:' + FONTS[p.font][0] + 'px">Aa</span></div>' +
        '<div class="d-line">' + sw('info', p.info, '푸는 중에 유형과 난이도 보기') + '</div>';
    } else if (k === 'ids') {
      var f = findIds(ui.ids);
      h = '<textarea class="ids" data-a="ids" placeholder="Question ID (예: 5e8b3a1c)" spellcheck="false" autocapitalize="off">' + esc(ui.ids) + '</textarea>' +
        '<div class="d-line"><span class="n" id="idsN">' + idsText(f) + '</span><button type="button" class="pill" data-a="idstart"' + (f.items.length ? '' : ' disabled') + '>이 문제로 시작</button></div>';
    } else if (k === 'stats') {
      var tot2 = stats(cur());
      h = '<table class="st-table"><thead><tr><th>유형</th><th>푼 문제</th><th>정답률</th></tr></thead><tbody>' + ORDER.map(function (code) {
        var st = stats(cur().filter(function (x) { return x.sk === code; })), done = st.good + st.bad;
        return '<tr><td>' + SK[code].name + '</td><td>' + done + ' / ' + nf(st.n) + '</td><td>' + (done ? Math.round(st.good / done * 100) + '%' : '–') + '</td></tr>';
      }).join('') + '<tr class="tot"><td>전체</td><td>' + (tot2.good + tot2.bad) + ' / ' + nf(tot2.n) + '</td><td>' +
        (tot2.good + tot2.bad ? Math.round(tot2.good / (tot2.good + tot2.bad) * 100) + '%' : '–') + '</td></tr></tbody></table>';
      if (store.sessions.length) {
        h += '<div class="d-sub">최근 기록</div><ul class="recent">' + store.sessions.slice(0, 10).map(function (s) {
          var d = new Date(s.at);
          var lab = s.label || (s.skills || []).map(function (c2) { return SK[c2] ? SK[c2].name : c2; }).join(', ');
          return '<li><span>' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + '  ' + esc(lab) + '</span><span class="r-score">' + s.ok + ' / ' + s.n + '</span></li>';
        }).join('') + '</ul>';
      }
      h += '<div class="d-line"><span></span><button type="button" class="mini danger" data-a="clearask">기록 지우기</button></div>';
    }
    return '<div class="d-top"><button type="button" class="d-back" data-a="back">' + I.left + '설정</button><h2>' + title + '</h2><div class="d-tools">' + tools + '</div></div>' + h;
  }
  function idsText(f) { return f.asked ? '찾은 문제 ' + f.items.length + ' / ' + f.asked : ''; }
  function failHtml(back) {
    return '<div class="panel fail"><b>College Board에서 문제를 불러오지 못했어요</b><div class="acts">' +
      (back ? '<button class="pill ghost" data-a="home">처음으로</button>' : '<button class="pill ghost" data-a="reload">다시 시도</button>') +
      '<a class="pill" style="display:inline-flex;align-items:center;text-decoration:none" href="' + CB_SITE + '" target="_blank" rel="noopener">공식 사이트에서 풀기</a></div></div>';
  }

  function showHome() {
    stopTimer(); S = null; view = 'home';
    document.title = 'Bluebook 연습 · 공식 문제';
    app.className = 'home';
    renderHome();
    window.scrollTo(0, 0);
    var ev = store.prefs.ev;
    loadList(ev).then(function () { if (view === 'home') renderHome(); }, function () { if (view === 'home' && store.prefs.ev === ev) renderHome(true); });
  }
  function renderHome(failed) {
    if (view !== 'home') return;
    var p = store.prefs, ready = !!lists[p.ev], body, bar = '';
    if (!ready) body = failed ? failHtml() : '<div class="panel home-loading">' + esc(testName(p.ev)) + ' 문제 목록을 불러오는 중…</div>';
    else {
      var pool = poolItems(), n = Math.min(p.count, pool.length);
      var rows = ROWS.map(function (g) {
        return (g[0] ? '<div class="og-h">' + g[0] + '</div>' : '<div class="og-sep"></div>') + g[1].map(function (r) {
          return '<button type="button" class="orow' + (ui.sel === r[0] ? ' on' : '') + '" data-a="sel" data-v="' + r[0] + '"><span class="l">' + r[1] + '</span>' +
            '<span class="v">' + esc(rowValue(r[0])) + '</span>' + I.right + '</button>';
        }).join('');
      }).join('');
      body = '<div class="cfg' + (ui.open ? ' open' : '') + '"><nav class="opt-list" aria-label="설정">' + rows + '</nav><section class="opt-detail">' + detail(ui.sel) + '</section></div>';
      var tm = p.timer === 'pace' ? fmt(n * SEC_PER_Q) : p.timer === 'custom' ? p.mins + '분' : p.timer === 'up' ? '시간 재기' : '';
      bar = '<div class="startbar"><div class="startbar-in"><div class="sb-info">' +
        (n ? '<b>' + n + '문제</b>' + (tm ? '<span>' + tm + '</span>' : '') + '<span>' + esc(pick(CHECKS, p.check)[1]) + '</span>' : '<span>조건에 맞는 문제가 없어요</span>') +
        '</div><button type="button" class="pill" data-a="start"' + (n ? '' : ' disabled') + '>시작하기</button></div></div>';
    }
    var y = window.scrollY;
    app.innerHTML = '<header class="home-top"><a class="home-back" href="../">← SAT 그래머 스터디</a></header>' +
      '<main class="setup"><div class="setup-h"><h1>Reading and Writing</h1>' + (ready ? '<span class="tot">' + esc(testName(p.ev)) + ' ' + nf(cur().length) + '문제</span>' : '') + '</div>' +
      body + '<p class="home-src">문제 출처: <a href="' + CB_SITE + '" target="_blank" rel="noopener">College Board SAT Suite Question Bank</a>. 문제는 열 때마다 College Board에서 불러오고 이 사이트에는 저장하지 않아요. ' +
      'College Board, Bluebook과 관계없는 개인 연습용 화면이에요.</p></main>' + bar;
    window.scrollTo(0, y);
  }

  /* ───────── loading a set ───────── */
  function startTest(items, label) {
    if (!items.length) return;
    stopTimer(); view = 'prep';
    app.className = '';
    app.innerHTML = '<div class="prep"><div><h2>Preparing your questions…</h2><p>College Board에서 문제를 불러오는 중 <span id="pc">0</span> / ' + items.length + '</p>' +
      '<div class="bar"><span id="pb" style="width:0%"></span></div></div></div>';
    var p = store.prefs, flagPool = !label && p.pool === 'flag';
    label = label || sessionLabel();
    fetchAll(items, function (d, n) {
      var pc = $('#pc'), pb = $('#pb');
      if (pc) pc.textContent = d;
      if (pb) pb.style.width = Math.round(d / n * 100) + '%';
    }).then(function (ready) {
      if (view !== 'prep') return;
      if (!ready.length) { app.className = 'home'; app.innerHTML = '<main class="setup">' + failHtml(true) + '</main>'; return; }
      var mark = {};
      if (flagPool) ready.forEach(function (x, j) { if (store.flag[x.ext]) mark[j] = true; });
      S = {
        items: ready, i: 0, ans: {}, mark: mark, elim: {}, hl: {}, checked: {}, phase: 'test',
        elimMode: false, annotate: false, nav: false, dir: false, more: false, hide: false,
        tmode: p.timer, left: p.timer === 'custom' ? p.mins * 60 : ready.length * SEC_PER_Q, auto: p.auto,
        instant: p.check === 'instant', info: p.info, font: p.font, flagPool: flagPool,
        start: Date.now(), end: 0, split: 50, label: label, dropped: items.length - ready.length
      };
      view = 'test';
      renderTest();
      startTimer();
    });
  }

  /* ───────── timer ───────── */
  function startTimer() { stopTimer(); if (S && S.tmode !== 'off') timerId = setInterval(tick, 1000); }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
  function elapsed() { return Math.round(((S.end || Date.now()) - S.start) / 1000); }
  function tick() {
    if (!S || (S.phase !== 'test' && S.phase !== 'check')) return stopTimer();
    var t = $('.bb-time');
    if (S.tmode === 'up') { if (t) t.textContent = fmt(elapsed()); return; }
    S.left--;
    if (S.left === 300 && S.hide) { S.hide = false; renderTest(); return; }   // like Bluebook: the clock comes back for the last 5 minutes
    if (t) t.textContent = fmt(S.left);
    if (S.left <= 0) { stopTimer(); if (S.auto) { closeModal(); submit(); } else modal('timeup'); }
  }

  /* ───────── test / review screens (Bluebook layout) ───────── */
  function graded(j) { return S.phase === 'answers' || (S.instant && S.checked[j]); }
  function cell(j) {
    var x = S.items[j], cls = 'bb-cell';
    if (graded(j)) cls += S.ans[j] === qcache[x.ext].key ? ' r-ok' : ' r-bad';
    else if (S.ans[j]) cls += ' done';
    return '<button class="' + cls + '" data-a="goto" data-v="' + j + '" aria-label="Question ' + (j + 1) + '">' +
      (j === S.i && S.phase !== 'check' ? I.pin : '') + (S.mark[j] && S.phase !== 'answers' ? I.flag : '') + (j + 1) + '</button>';
  }
  function legend() {
    var okBad = '<span><i class="sq ok"></i> Correct</span><span><i class="sq bad"></i> Incorrect</span>';
    if (S.phase === 'answers') return '<div class="bb-legend"><span>' + I.pin + ' Current</span>' + okBad + '</div>';
    return '<div class="bb-legend">' + (S.phase === 'check' ? '' : '<span>' + I.pin + ' Current</span>') +
      '<span><i class="sq"></i> Unanswered</span><span>' + I.flag + ' For Review</span>' + (S.instant ? okBad : '') + '</div>';
  }
  function grid() { return '<div class="bb-grid">' + S.items.map(function (x, j) { return cell(j); }).join('') + '</div>'; }

  function renderTest() {
    if (!S) return;
    var same = S._shown === S.i + ':' + S.phase, keep = null;
    if (same) {
      var l0 = $('.bb-left'), r0 = $('.bb-right'), m0 = $('.bb-main');
      keep = { l: l0 ? l0.scrollTop : 0, r: r0 ? r0.scrollTop : 0, m: m0 ? m0.scrollTop : 0 };
    }
    var x = S.items[S.i], q = qcache[x.ext], n = S.items.length, rev = S.phase === 'answers', sk = SK[x.sk];
    document.title = (rev ? 'Review' : 'Question ' + (S.i + 1)) + ' · Bluebook 연습';
    app.className = '';

    var top = '<header class="bb-top"><div class="bb-top-l"><div class="bb-sec">' + (rev ? 'Review: Reading and Writing' : 'Section 1: Reading and Writing') + '</div>' +
      '<button class="bb-dir" data-a="dir" aria-expanded="' + S.dir + '">Directions ' + (S.dir ? I.up : I.down) + '</button></div><div class="bb-top-c">';
    if (rev) {
      var okN = S.items.filter(function (y, j) { return S.ans[j] === qcache[y.ext].key; }).length;
      top += '<div class="bb-review-tag">' + okN + ' / ' + n + ' correct</div>';
    } else if (S.tmode !== 'off') {
      top += S.hide ? '<button class="bb-hide" data-a="hide">' + I.clock + ' Show</button>'
        : '<div class="bb-time">' + fmt(S.tmode === 'up' ? elapsed() : S.left) + '</div><button class="bb-hide" data-a="hide">Hide</button>';
    }
    top += '</div><div class="bb-top-r">' +
      (S.phase === 'check' ? '' : '<button class="bb-tool' + (S.annotate ? ' on' : '') + '" data-a="annotate" aria-pressed="' + S.annotate + '" title="Select passage text to highlight it">' + I.pen + '<span>Highlights &amp; Notes</span></button>') +
      '<button class="bb-tool" data-a="more" aria-expanded="' + S.more + '">' + I.dots + '<span>More</span></button></div></header><div class="dash"></div>';

    var pops = '';
    if (S.dir) {
      pops += '<div class="bb-drop bb-dirpanel"><p>This section tests a range of reading and writing skills. Every question comes with a short passage (sometimes two, or a table or graph). ' +
        'Read the passage and the question carefully, then choose the answer the passage best supports.</p>' +
        '<p>Each question has four answer choices and one best answer.</p><div class="acts"><button class="bb-btn" data-a="dir">Close</button></div></div>';
    }
    if (S.more) {
      pops += '<div class="bb-drop bb-more">' + (rev ? '<button data-a="results">결과 화면으로</button>' : '') +
        '<div class="mrow"><span>Text size</span><span class="fs"><button data-a="font" data-v="-1"' + (S.font <= 0 ? ' disabled' : '') + ' aria-label="Smaller text">A−</button>' +
        '<button data-a="font" data-v="1"' + (S.font >= FONTS.length - 1 ? ' disabled' : '') + ' aria-label="Larger text">A+</button></span></div>' +
        (rev ? '' : '<button data-a="info">' + (S.info ? 'Hide question type' : 'Show question type') + '</button>') +
        '<button data-a="keys">Keyboard shortcuts</button><button data-a="exit">' + (rev ? '처음 화면으로' : 'Exit practice') + '</button></div>';
    }

    var mid;
    if (S.phase === 'check') {
      mid = '<main class="bb-check"><div class="bb-check-in"><h2>Check Your Work</h2>' +
        '<p>Before you submit, look over any questions you marked for review or left unanswered. Select a question number to go back to it.</p>' +
        '<div class="bb-check-card"><div class="bb-navhead"><b>Section 1: Reading and Writing Questions</b></div>' + legend() + grid() + '</div></div></main>';
    } else {
      var showAns = graded(S.i), passage = q.stim ? (S.hl[S.i] || q.stim) : '';
      var tag = sk.name + ' · ' + DIFF_EN[x.d];
      var head = '<div class="bb-qhead"><span class="bb-qnum">' + (S.i + 1) + '</span>' +
        (rev ? '<span class="bb-mark bb-info-rev">' + esc(tag) + '<small>ID ' + esc(x.id) + '</small></span>'
          : '<button class="bb-mark' + (S.mark[S.i] ? ' on' : '') + '" data-a="mark" aria-pressed="' + !!S.mark[S.i] + '">' + I.mark + 'Mark for Review</button>' +
            (S.info ? '<span class="bb-info">' + esc(tag) + '</span>' : '') +
            (showAns ? '' : '<button class="bb-abc' + (S.elimMode ? ' on' : '') + '" data-a="elim" aria-pressed="' + S.elimMode + '" title="Cross out answer choices"><span>ABC</span></button>')) +
        '</div>';
      var el = S.elim[S.i] || {}, mine = S.ans[S.i];
      var choices = '<div class="bb-choices">' + q.opts.map(function (o, k) {
        var L = 'ABCD'.charAt(k), cls = 'bb-choice', t2 = '';
        if (showAns) {
          if (L === q.key) { cls += ' key'; t2 = '<span class="bb-tag">' + (mine === L ? 'Your answer · Correct' : 'Correct answer') + '</span>'; }
          else if (L === mine) { cls += ' miss'; t2 = '<span class="bb-tag">Your answer</span>'; }
        } else {
          if (mine === L) cls += ' sel';
          if (el[L]) cls += ' out';
        }
        var side = '';
        if (!showAns && S.elimMode) {
          side = el[L] ? '<button class="bb-undo" data-a="unelim" data-v="' + L + '">Undo</button>'
            : '<button class="bb-x" data-a="elimone" data-v="' + L + '" aria-label="Cross out choice ' + L + '">' + L + '</button>';
        }
        return '<div class="bb-ch-row"><button class="' + cls + '" data-a="pick" data-v="' + L + '"' + (showAns ? ' disabled' : '') + '>' +
          '<span class="bb-letter">' + L + '</span><span class="bb-ch-text">' + o + '</span>' + t2 + '</button>' + side + '</div>';
      }).join('') + '</div>';
      var after = '';
      if (showAns) {
        var ok = mine === q.key;
        after = '<div class="bb-verdict ' + (ok ? 'ok' : 'bad') + '">' + (ok ? 'Correct' : mine ? 'Incorrect — you chose ' + mine + ', the answer is ' + q.key : 'Not answered — the answer is ' + q.key) + '</div>' +
          '<div class="bb-why"><div class="bb-why-h">EXPLANATION</div>' + q.why + '</div>';
      } else if (S.instant && mine) {
        after = '<div class="bb-checkrow"><button class="bb-btn" data-a="checkone">Check Answer</button></div>';
      }
      mid = '<main class="bb-main' + (passage ? '' : ' single') + '" style="--split:' + S.split + '%">' +
        (passage ? '<section class="bb-pane bb-left"><div class="bb-passage">' + passage + '</div></section><div class="bb-divider" title="Drag to resize"><span class="bb-grip">' + I.grip + '</span></div>' : '') +
        '<section class="bb-pane bb-right">' + head + '<div class="bb-stem">' + q.stem + '</div>' + choices + after + '</section></main>';
    }

    var foot = '<div class="dash"></div><footer class="bb-foot"><div class="bb-foot-l">' +
      (rev ? '<button class="bb-btn light" data-a="results">Results</button>' : '<div class="bb-name">Practice</div>') + '</div><div class="bb-foot-c">' +
      (S.phase === 'check' ? '' : '<button class="bb-qbtn" data-a="nav" aria-expanded="' + S.nav + '">Question ' + (S.i + 1) + ' of ' + n + ' ' + (S.nav ? I.down : I.up) + '</button>') +
      '</div><div class="bb-foot-r">' +
      (S.phase === 'check' || S.i > 0 ? '<button class="bb-btn" data-a="back">Back</button>' : '') +
      '<button class="bb-btn" data-a="next">' + (S.phase === 'check' ? 'Submit' : 'Next') + '</button></div>';
    if (S.nav && S.phase !== 'check') {
      foot += '<div class="bb-drop bb-navpop"><div class="bb-navhead"><b>Section 1: Reading and Writing Questions</b><button class="bb-close" data-a="nav" aria-label="Close">×</button></div>' +
        legend() + grid() + (rev ? '' : '<div class="bb-navfoot"><button class="pill ghost" data-a="checkpage">Go to Review Page</button></div>') + '</div>';
    }
    foot += '</footer>';

    app.innerHTML = '<div class="bb' + (S.annotate ? ' annotate' : '') + '" style="--fs:' + FONTS[S.font][0] + 'px">' + top + pops + mid + foot + '</div>';
    S._shown = S.i + ':' + S.phase;
    if (keep) {
      var l1 = $('.bb-left'), r1 = $('.bb-right'), m1 = $('.bb-main');
      if (l1) l1.scrollTop = keep.l;
      if (r1) r1.scrollTop = keep.r;
      if (m1) m1.scrollTop = keep.m;
    }
  }

  /* ───────── results ───────── */
  function submit() {
    stopTimer();
    S.end = Date.now();
    var ok = 0;
    S.items.forEach(function (x, j) {
      var good = S.ans[j] === qcache[x.ext].key;
      if (good) ok++;
      store.res[x.ext] = good ? 1 : 0;
      if (S.mark[j]) store.flag[x.ext] = 1;
      else if (S.flagPool) delete store.flag[x.ext];
    });
    store.sessions.unshift({ at: S.end, n: S.items.length, ok: ok, label: S.label, secs: elapsed() });
    store.sessions = store.sessions.slice(0, 30);
    save();
    showResults();
  }
  function showResults() {
    view = 'result'; S.phase = 'result'; S.nav = S.more = S.dir = false;
    document.title = '결과 · Bluebook 연습';
    var n = S.items.length, ok = S.items.filter(function (x, j) { return S.ans[j] === qcache[x.ext].key; }).length;
    var wrong = n - ok;
    app.className = 'res';
    app.innerHTML = '<header class="home-top"><a class="home-back" href="../">← SAT 그래머 스터디</a></header><main class="res-main">' +
      '<div class="res-score"><b>' + ok + '</b><span>/ ' + n + '</span></div>' +
      '<p class="res-sub">정답률 ' + Math.round(ok / n * 100) + '%, 걸린 시간 ' + fmt(elapsed()) + (S.dropped ? ', 불러오지 못한 ' + S.dropped + '문제는 빠졌어요' : '') + '</p>' +
      '<div class="res-acts"><button class="pill" data-a="open" data-v="0">해설 보기</button>' +
      (wrong ? '<button class="pill ghost" data-a="retrywrong">틀린 문제 다시 풀기 (' + wrong + ')</button>' : '') +
      '<button class="pill ghost" data-a="again">같은 조건으로 새로 풀기</button><button class="pill ghost" data-a="home">처음 화면</button></div>' +
      '<table class="res-table"><thead><tr><th>#</th><th></th><th>유형</th><th>난이도</th><th>정답</th><th>내 답</th><th>문제</th></tr></thead><tbody>' +
      S.items.map(function (x, j) {
        var q = qcache[x.ext], good = S.ans[j] === q.key;
        return '<tr class="row-link" data-a="open" data-v="' + j + '"><td>' + (j + 1) + '</td><td class="mk ' + (good ? 'ok' : 'bad') + '">' + (good ? '✓' : '✗') + '</td>' +
          '<td class="sk">' + esc(SK[x.sk].name) + '</td><td>' + DIFF_KO[x.d] + '</td><td>' + q.key + '</td><td>' + (S.ans[j] || '–') + '</td>' +
          '<td class="ex">' + esc(q.text.slice(0, 90)) + '</td></tr>';
      }).join('') + '</tbody></table></main>';
    window.scrollTo(0, 0);
  }

  /* ───────── modal ───────── */
  function modal(kind) {
    var unanswered = S ? S.items.filter(function (x, j) { return !S.ans[j]; }).length : 0;
    var t, p, acts;
    if (kind === 'timeup') { t = "Time's up"; p = '시간이 끝났어요. 실제 시험은 여기서 자동 제출돼요.'; acts = [['close', '계속 풀기', 'light'], ['dosubmit', '제출하기', '']]; }
    else if (kind === 'submit') { t = '제출할까요?'; p = '답하지 않은 문제가 ' + unanswered + '개 있어요. 답하지 않은 문제는 틀린 것으로 기록돼요.'; acts = [['close', '돌아가기', 'light'], ['dosubmit', '제출하기', '']]; }
    else if (kind === 'exit') { t = '연습을 그만둘까요?'; p = '지금까지 고른 답은 기록되지 않아요.'; acts = [['close', '계속 풀기', 'light'], ['home', '그만두기', '']]; }
    else if (kind === 'clear') { t = '기록을 지울까요?'; p = '맞힌 문제, 틀린 문제, 리뷰 표시, 최근 기록이 모두 지워져요.'; acts = [['close', '취소', 'light'], ['doclear', '지우기', '']]; }
    else { t = 'Keyboard shortcuts'; p = 'A–D 또는 1–4: 보기 고르기<br>Enter: Check Answer (한 문제씩 채점일 때)<br>← →: 이전 / 다음 문제<br>Esc: 열린 창 닫기'; acts = [['close', '닫기', '']]; }
    closeModal();
    app.insertAdjacentHTML('beforeend', '<div class="bb-modal-bg"><div class="bb-modal" role="dialog" aria-modal="true"><h3>' + t + '</h3><p>' + p + '</p><div class="acts">' +
      acts.map(function (a) { return '<button class="bb-btn ' + a[2] + '" data-a="' + a[0] + '">' + a[1] + '</button>'; }).join('') + '</div></div></div>');
  }
  function closeModal() { var m = $('.bb-modal-bg'); if (m) m.parentNode.removeChild(m); }

  /* ───────── events ───────── */
  function clampCount(v) { var mx = Math.max(1, poolItems().length); return Math.max(1, Math.min(mx, v | 0)); }
  function homeClick(a, k, v) {
    var p = store.prefs;
    if (a === 'sel') { ui.sel = v; ui.open = true; renderHome(); if (window.innerWidth <= 760) window.scrollTo(0, 0); return; }
    if (a === 'back') { ui.open = false; renderHome(); return; }
    if (a === 'close') { closeModal(); return; }
    if (a === 'clearask') { modal('clear'); return; }
    if (a === 'doclear') { store.res = {}; store.flag = {}; store.sessions = []; save(); closeModal(); renderHome(); return; }
    if (a === 'start') { save(); startTest(buildSet()); return; }
    if (a === 'idstart') { var f = findIds(ui.ids); if (f.items.length) startTest(f.items, testName(p.ev) + ', ID로 고른 문제'); return; }
    if (a === 'reload') { showHome(); return; }
    if (a === 'opt') {
      p[k] = k === 'count' ? +v : v;
      if (k === 'ev') {
        save(); renderHome();
        loadList(v).then(function () { renderHome(); }, function () { if (store.prefs.ev === v) renderHome(true); });
        return;
      }
    } else if (a === 'tog') {
      var val = k === 'bands' ? +v : v, i = p[k].indexOf(val);
      if (i >= 0) p[k].splice(i, 1); else p[k].push(val);
      if (k === 'skills') byOrder(p.skills); else if (k === 'bands') p.bands.sort(); else p.diffs.sort(function (x, y) { return DR[x] - DR[y]; });
    } else if (a === 'tmon') {
      var j = p.offT.indexOf(v);
      if (j >= 0) p.offT.splice(j, 1); else p.offT.push(v);
    } else if (a === 'all') p[k] = k === 'diffs' ? ['E', 'M', 'H'] : BANDS.slice();
    else if (a === 'none') p[k] = [];
    else if (a === 'addall') p.offT = [];
    else if (a === 'addnone') p.offT = months();
    else if (a === 'preset') p.skills = (v === 'R' ? READ : v === 'W' ? WRITE : v === 'none' ? [] : ORDER).slice();
    else if (a === 'dom') {
      var dm = DOMAINS.filter(function (d) { return d.cd === v; })[0];
      var allOn = dm.skills.every(function (s) { return p.skills.indexOf(s.cd) >= 0; });
      if (allOn) p.skills = p.skills.filter(function (c) { return SK[c].dm !== v; });
      else dm.skills.forEach(function (s) { if (p.skills.indexOf(s.cd) < 0) p.skills.push(s.cd); });
      byOrder(p.skills);
    } else if (a === 'step') {
      var dl = +v;
      if (k === 'count') p.count = clampCount(Math.min(p.count, poolItems().length) + dl);
      else if (k === 'mins') p.mins = Math.max(1, Math.min(180, p.mins + dl));
      else if (k === 'font') p.font = Math.max(0, Math.min(FONTS.length - 1, p.font + dl));
    } else return;
    save(); renderHome();
  }

  app.addEventListener('click', function (e) {
    if (e.target.classList && e.target.classList.contains('bb-modal-bg')) { closeModal(); return; }
    var hl = e.target.closest('mark.hl');
    if (hl && S && S.annotate && !window.getSelection().toString()) { unwrap(hl); return; }   // tap a highlight to remove it
    var t = e.target.closest('[data-a]');
    if (!t || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
    var a = t.getAttribute('data-a'), v = t.getAttribute('data-v');

    if (view === 'home') { homeClick(a, t.getAttribute('data-k'), v); return; }
    if (view === 'result') {
      if (a === 'open') { S.phase = 'answers'; S.i = +v; view = 'test'; S.annotate = false; renderTest(); window.scrollTo(0, 0); }
      else if (a === 'retrywrong') startTest(S.items.filter(function (x, j) { return S.ans[j] !== qcache[x.ext].key; }), S.label.replace(/, 틀린 문제 다시$/, '') + ', 틀린 문제 다시');
      else if (a === 'again') startTest(buildSet());
      else if (a === 'home') showHome();
      return;
    }
    if (a === 'home') { closeModal(); showHome(); return; }
    if (!S) return;

    // popups close when anything else is chosen
    var keepNav = a === 'nav' || a === 'goto', keepMore = a === 'more' || a === 'font' || a === 'info', keepDir = a === 'dir';
    if (!keepNav) S.nav = false;
    if (!keepMore) S.more = false;
    if (!keepDir) S.dir = false;
    var locked = S.instant && S.checked[S.i];

    if (a === 'close') { closeModal(); }
    else if (a === 'dosubmit') { closeModal(); submit(); return; }
    else if (a === 'dir') S.dir = !S.dir;
    else if (a === 'more') S.more = !S.more;
    else if (a === 'nav') S.nav = !S.nav;
    else if (a === 'hide') S.hide = !S.hide;
    else if (a === 'annotate') S.annotate = !S.annotate;
    else if (a === 'font') { S.font = Math.max(0, Math.min(FONTS.length - 1, S.font + (+v))); store.prefs.font = S.font; save(); }
    else if (a === 'info') { S.info = !S.info; store.prefs.info = S.info; save(); }
    else if (a === 'keys') { modal('keys'); }
    else if (a === 'exit') { if (S.phase === 'answers') { showHome(); return; } modal('exit'); }
    else if (a === 'results') { showResults(); return; }
    else if (a === 'mark') S.mark[S.i] = !S.mark[S.i];
    else if (a === 'elim') S.elimMode = !S.elimMode;
    else if (a === 'pick' && S.phase === 'test' && !locked) {
      S.ans[S.i] = v;
      if (S.elim[S.i]) delete S.elim[S.i][v];                     // choosing a crossed-out answer brings it back
    } else if (a === 'checkone') { if (S.ans[S.i]) S.checked[S.i] = true; }
    else if (a === 'elimone' && !locked) {
      (S.elim[S.i] = S.elim[S.i] || {})[v] = true;
      if (S.ans[S.i] === v) delete S.ans[S.i];
    } else if (a === 'unelim') { if (S.elim[S.i]) delete S.elim[S.i][v]; }
    else if (a === 'goto') { S.i = +v; S.nav = false; if (S.phase === 'check') S.phase = 'test'; }
    else if (a === 'checkpage') { S.phase = 'check'; }
    else if (a === 'back') { if (S.phase === 'check') { S.phase = 'test'; S.i = S.items.length - 1; } else if (S.i > 0) S.i--; }
    else if (a === 'next') {
      if (S.phase === 'check') { if (S.items.some(function (x, j) { return !S.ans[j]; })) modal('submit'); else submit(); return; }
      if (S.i < S.items.length - 1) S.i++;
      else if (S.phase === 'answers') { showResults(); return; }
      else S.phase = 'check';
    }
    renderTest();
  });

  app.addEventListener('change', function (e) {
    if (view !== 'home') return;
    var a = e.target.getAttribute('data-a'), k = e.target.getAttribute('data-k');
    if (a === 'sw') { store.prefs[k] = e.target.checked; save(); renderHome(); }
    else if (a === 'num') { store.prefs.count = clampCount(+e.target.value || 1); save(); renderHome(); }
  });
  app.addEventListener('input', function (e) {
    if (view !== 'home' || e.target.getAttribute('data-a') !== 'ids') return;
    ui.ids = e.target.value;
    var f = findIds(ui.ids), nEl = $('#idsN'), b = $('[data-a="idstart"]'), row = $('.orow[data-v="ids"] .v');
    if (nEl) nEl.textContent = idsText(f);
    if (b) b.disabled = !f.items.length;
    if (row) row.textContent = f.items.length ? f.items.length + '문제' : '';
  });

  // Highlights: with "Highlights & Notes" on, selecting passage text marks it
  function unwrap(m) {
    var p = m.parentNode;
    while (m.firstChild) p.insertBefore(m.firstChild, m);
    p.removeChild(m);
    p.normalize();
    var box = $('.bb-passage'); if (box && S) S.hl[S.i] = box.innerHTML;
  }
  function highlightSelection() {
    if (!S || !S.annotate) return;
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed) return;
    var box = $('.bb-passage'), r = sel.getRangeAt(0);
    if (!box || !box.contains(r.commonAncestorContainer)) return;
    var mk = document.createElement('mark');
    mk.className = 'hl';
    try { r.surroundContents(mk); } catch (err) { mk.appendChild(r.extractContents()); r.insertNode(mk); }
    sel.removeAllRanges();
    S.hl[S.i] = box.innerHTML;
  }
  app.addEventListener('mouseup', highlightSelection);
  app.addEventListener('touchend', function () { setTimeout(highlightSelection, 30); });

  // drag the divider between passage and question, like Bluebook
  app.addEventListener('pointerdown', function (e) {
    var d = e.target.closest('.bb-divider');
    if (!d || !S) return;
    e.preventDefault();
    var main = $('.bb-main'), rect = main.getBoundingClientRect();
    d.setPointerCapture(e.pointerId);
    function move(ev) {
      S.split = Math.max(25, Math.min(75, (ev.clientX - rect.left) / rect.width * 100));
      main.style.setProperty('--split', S.split + '%');
    }
    function up() { d.removeEventListener('pointermove', move); d.removeEventListener('pointerup', up); }
    d.addEventListener('pointermove', move);
    d.addEventListener('pointerup', up);
  });

  document.addEventListener('keydown', function (e) {
    if (!S || view !== 'test' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '')) return;
    if (e.key === 'Escape') {
      if ($('.bb-modal-bg')) closeModal(); else if (S.nav || S.more || S.dir) { S.nav = S.more = S.dir = false; renderTest(); }
      return;
    }
    if ($('.bb-modal-bg')) return;
    var k = '1234'.indexOf(e.key), L = k >= 0 ? 'ABCD'.charAt(k) : (/^[a-dA-D]$/.test(e.key) ? e.key.toUpperCase() : '');
    if (L && S.phase === 'test') { var b = app.querySelector('.bb-choice[data-v="' + L + '"]'); if (b) b.click(); }
    else if (e.key === 'Enter' && S.phase === 'test') { var c = app.querySelector('[data-a="checkone"]'); if (c) { e.preventDefault(); c.click(); } }
    else if (e.key === 'ArrowRight' && S.phase !== 'check') { var n = app.querySelector('[data-a="next"]'); if (n) { e.preventDefault(); n.click(); } }
    else if (e.key === 'ArrowLeft') { var bk = app.querySelector('[data-a="back"]'); if (bk) { e.preventDefault(); bk.click(); } }
  });

  window.addEventListener('beforeunload', function (e) {
    if (S && (S.phase === 'test' || S.phase === 'check') && Object.keys(S.ans).length) { e.preventDefault(); e.returnValue = ''; }
  });

  showHome();
})();
