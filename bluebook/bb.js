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
  var POOLS = [['new', '안 푼 문제 먼저'], ['unseen', '안 푼 문제만'], ['wrong', '틀린 문제만'], ['right', '맞힌 문제만'], ['star', '별표 문제만'], ['flag', '헷갈린 문제만'], ['any', '상관없이 무작위']];
  var NFILTERS = [['now', '아직 틀림'], ['fixed', '다시 맞힘'], ['star', '별표'], ['flag', '헷갈림'], ['all', '전체']];
  var ORDERS = [['random', '무작위'], ['easy', '쉬운 문제부터'], ['hard', '어려운 문제부터'], ['test', '실제 시험 순서', '유형 순서대로, 같은 유형은 쉬운 문제부터']];
  var TIMERS = [['pace', '실제 시험 속도', '문제당 71초 (27문제 32분)'], ['custom', '직접 정하기'], ['up', '걸린 시간만 표시'], ['off', '끄기']];
  var CHECKS = [['end', '끝나고 한꺼번에', 'Bluebook처럼 제출한 뒤 채점'], ['instant', '한 문제씩 바로', '답을 고르고 Check Answer로 확인']];
  var COUNTS = [[5, '5'], [10, '10'], [20, '20'], [27, '27 (1모듈)'], [54, '54 (2모듈)'], [9999, '전부']];
  var ROWS = [
    ['문제 범위', [['test', '시험'], ['area', '영역'], ['diff', '난이도'], ['band', 'Score Band'], ['added', '추가 시기'], ['active', 'Active 문제'], ['pool', '풀이 기록']]],
    ['푸는 방식', [['count', '문제 수'], ['order', '순서'], ['time', '시간'], ['check', '채점'], ['view', '화면']]],
    ['', [['ids', 'ID로 풀기'], ['stats', '내 기록'], ['backup', '백업과 복원']]]
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
  // res: latest result per question (1/0), log: attempt history with ids/codes/letters only, flag: 헷갈림 (Mark for Review),
  // star: 별표, memo: the user's own notes. No question text is ever saved.
  // words: the user's 단어장 (word, its sentence, own meaning, cached dictionary entry)
  var store = { v: 2, res: {}, log: {}, flag: {}, star: {}, memo: {}, words: {}, sessions: [], prefs: defaults(), legacy: false, lastBackup: 0 };
  try {
    var raw = JSON.parse(localStorage.getItem(SKEY) || 'null');
    if (raw) {
      store.res = raw.res || {};
      store.log = raw.log || {};
      store.flag = raw.flag || {};
      store.star = raw.star || {};
      store.memo = raw.memo || {};
      store.words = raw.words || {};
      store.lastBackup = raw.lastBackup || 0;
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
  // one answered question → latest result + attempt history (used by the 오답노트)
  function recordAnswer(x, key, mine, ev) {
    var good = mine === key;
    store.res[x.ext] = good ? 1 : 0;
    var L = store.log[x.ext] || (store.log[x.ext] = { n: 0, w: 0, s: 0 });
    L.id = x.id; L.sk = x.sk; L.d = x.d; L.ev = ev; L.k = key; L.n++; L.t = Date.now();
    if (good) L.s = (L.s || 0) + 1;
    else { L.w++; L.s = 0; L.a = mine || ''; L.tw = L.t; }
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
  var qpend = {};
  function loadQ(ext) {
    if (qcache[ext]) return Promise.resolve(qcache[ext]);
    if (qpend[ext]) return qpend[ext];
    var p = req('/digital/get-question', { external_id: ext }).then(function (d) {
      var opts = (d.answerOptions || []).slice(0, 4), key = (d.correct_answer || [])[0];
      if (opts.length !== 4 || !/^[A-D]$/.test(key || '')) throw new Error('unexpected question format');
      var q = { stim: clean(d.stimulus), stem: clean(d.stem), key: key, why: clean(d.rationale), opts: opts.map(function (o) { return clean(o.content, true); }) };
      q.text = textOf(q.stim) || textOf(q.stem);
      delete qpend[ext];
      return (qcache[ext] = q);
    }, function (err) { delete qpend[ext]; throw err; });
    return (qpend[ext] = p);
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
    minus: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    star: '<svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    book: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8h7M9 11.5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    down2: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    up2: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V5M7 9.5l5-5 5 5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sound: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };
  function starBtn(ext, a) {
    var on = !!store.star[ext];
    return '<button type="button" class="kp kp-star' + (on ? ' on' : '') + '" data-a="' + a + '" data-v="' + ext + '" aria-pressed="' + on + '">' + I.star + '<span>별표</span></button>';
  }
  function confBtn(ext, a) {
    var on = !!store.flag[ext];
    return '<button type="button" class="kp kp-conf' + (on ? ' on' : '') + '" data-a="' + a + '" data-v="' + ext + '" aria-pressed="' + on + '">' + I.mark + '<span>헷갈림</span></button>';
  }

  /* ───────── filtering ───────── */
  var view = 'home', S = null, timerId = null;
  var ui = {
    sel: 'area', open: false, ids: '', tab: 'solve', nf: 'now', nsk: '', nsort: 'recent', note: null, noteOpen: false, rev: {}, tried: {}, busy: false,
    wordMode: false, wf: 'learn', wq: '', wsort: 'recent', word: null, wordOpen: false, fc: null, pending: null, goBackup: false
  };
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
    if (kind === 'star') return !!store.star[x.ext];
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
      case 'backup': return store.lastBackup ? '마지막 ' + dateStr(store.lastBackup) : '아직 안 함';
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
    } else if (k === 'backup') {
      var c0 = dataCounts(store);
      h = '<p class="d-note">기록은 이 브라우저에만 있어요. 파일로 받아 두면 다른 기기에서도 복원할 수 있어요.</p>' +
        '<div class="bk-grid"><button type="button" class="bk" data-a="bkdown">' + I.down2 + '<span><b>백업 파일 받기</b><small>' +
        (store.lastBackup ? '마지막 백업 ' + dateStr(store.lastBackup) + ' ' + timeStr(store.lastBackup) : 'JSON 파일') + '</small></span></button>' +
        '<button type="button" class="bk" data-a="bkup">' + I.up2 + '<span><b>복원하기</b><small>백업 파일 고르기</small></span></button></div>' +
        '<div class="d-sub">지금 들어 있는 것</div><p class="bk-sum">' + countsText(c0) + '</p>';
    }
    return '<div class="d-top"><button type="button" class="d-back" data-a="back">' + I.left + '설정</button><h2>' + title + '</h2><div class="d-tools">' + tools + '</div></div>' + h;
  }
  function idsText(f) { return f.asked ? '찾은 문제 ' + f.items.length + ' / ' + f.asked : ''; }
  function failHtml(back) {
    return '<div class="panel fail"><b>College Board에서 문제를 불러오지 못했어요</b><div class="acts">' +
      (back ? '<button class="pill ghost" data-a="home">처음으로</button>' : '<button class="pill ghost" data-a="reload">다시 시도</button>') +
      '<a class="pill" style="display:inline-flex;align-items:center;text-decoration:none" href="' + CB_SITE + '" target="_blank" rel="noopener">공식 사이트에서 풀기</a></div></div>';
  }

  /* ───────── 오답노트: wrong answers, stars and 헷갈림 in one place ───────── */
  function findItem(ext) {
    for (var ev in lists) {
      var l = lists[ev];
      if (!l._ix) { l._ix = {}; l.forEach(function (x) { l._ix[x.ext] = x; }); }
      if (l._ix[ext]) return l._ix[ext];
    }
    return null;
  }
  function noteEntry(ext) {
    var L = store.log[ext] || {}, x = findItem(ext), sk = L.sk || (x && x.sk);
    if (!sk || !SK[sk]) return null;                      // older records wait until a list names their type
    return {
      ext: ext, id: L.id || (x && x.id) || '', sk: sk, d: L.d || (x && x.d) || 'M', ev: L.ev || '99',
      n: L.n || 0, w: L.w || (store.res[ext] === 0 ? 1 : 0), s: L.s || 0, a: L.a, k: L.k || (qcache[ext] && qcache[ext].key),
      t: L.tw || L.t || 0, res: store.res[ext], star: !!store.star[ext], flag: !!store.flag[ext], memo: store.memo[ext] || ''
    };
  }
  function nMatch(f, e) {
    if (f === 'now') return e.res === 0;
    if (f === 'fixed') return e.res === 1 && e.w > 0;
    if (f === 'star') return e.star;
    if (f === 'flag') return e.flag;
    return true;
  }
  function noteList() {
    var keys = {};
    Object.keys(store.res).forEach(function (k) { if (store.res[k] === 0) keys[k] = 1; });
    Object.keys(store.log).forEach(function (k) { if (store.log[k].w) keys[k] = 1; });
    Object.keys(store.star).forEach(function (k) { keys[k] = 1; });
    Object.keys(store.flag).forEach(function (k) { keys[k] = 1; });
    var all = Object.keys(keys).map(noteEntry).filter(Boolean);
    var inF = all.filter(function (e) { return nMatch(ui.nf, e); });
    var list = ui.nsk ? inF.filter(function (e) { return e.sk === ui.nsk; }) : inF.slice();
    list.sort(ui.nsort === 'many' ? function (a, b) { return b.w - a.w || b.t - a.t; } : function (a, b) { return b.t - a.t; });
    return { all: all, inF: inF, list: list };
  }
  function nowCount() { var n = 0; for (var k in store.res) if (store.res[k] === 0) n++; return n; }
  function dateStr(t) { var d = new Date(t); return (d.getMonth() + 1) + '/' + d.getDate(); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function noteCard(e) {
    var q = qcache[e.ext];
    var ans = e.res === 1 && e.w ? '<span class="nc-ok">다시 맞힘' + (e.s > 1 ? ' ' + e.s + '번 연속' : '') + '</span>'
      : e.res === 0 && e.k ? (e.a !== undefined ? '<span class="nc-bad">' + (e.a ? '내 답 ' + e.a : '답 안 함') + '</span>' : '') + '<span>정답 ' + e.k + '</span>' : '<span></span>';
    return '<button type="button" class="ncard' + (ui.note === e.ext ? ' on' : '') + '" data-a="nsel" data-v="' + e.ext + '">' +
      '<span class="nc-top"><b>' + esc(SK[e.sk].name) + '</b><span class="nc-d">' + DIFF_EN[e.d] + '</span><span class="nc-ic">' +
      (e.star ? '<i class="ic-star">★</i>' : '') + (e.flag ? I.flag : '') + (e.memo ? '<i class="ic-memo">메모</i>' : '') + '</span></span>' +
      (q ? '<span class="nc-snip">' + esc(q.text.slice(0, 120)) + '</span>' : '') +
      '<span class="nc-meta">' + ans + '<span class="nc-w">' + (e.w ? e.w + '번 틀림  ' : '') + (e.t ? dateStr(e.t) : '') + '</span></span></button>';
  }
  function cardsHtml(list) { return list.length ? list.map(noteCard).join('') : '<p class="n-none">이 조건에 맞는 문제가 없어요</p>'; }
  // question snippets for the cards, fetched quietly a batch at a time
  function prefetchNotes() {
    if (ui.busy || view !== 'home' || ui.tab !== 'notes') return;
    var todo = noteList().list.filter(function (e) { return !qcache[e.ext] && !ui.tried[e.ext]; }).slice(0, 30);
    if (!todo.length) return;
    ui.busy = true;
    todo.forEach(function (e) { ui.tried[e.ext] = 1; });
    fetchAll(todo, function () {}).then(function () {
      ui.busy = false;
      if (view !== 'home' || ui.tab !== 'notes') return;
      var c = document.getElementById('nCards');
      if (c) c.innerHTML = cardsHtml(noteList().list);
      prefetchNotes();
    });
  }
  function noteDetail(ext) {
    var e = ext && noteEntry(ext);
    if (!e) return '<p class="n-none">왼쪽 목록에서 문제를 고르세요</p>';
    var q = qcache[ext];
    var h = '<div class="d-top"><button type="button" class="d-back" data-a="nback">' + I.left + '목록</button>' +
      '<div class="nd-title"><b>' + esc(SK[e.sk].name) + '</b><span>' + DIFF_EN[e.d] + (e.id ? '  ID ' + esc(e.id) : '') + '</span></div>' +
      '<div class="d-tools"><button type="button" class="kp kp-word' + (ui.wordMode ? ' on' : '') + '" data-a="nword" aria-pressed="' + ui.wordMode + '" title="모르는 단어를 눌러 단어장에 저장">' + I.book + '<span>단어</span></button>' +
      starBtn(ext, 'nstar') + confBtn(ext, 'nconf') + '</div></div>' +
      '<p class="nd-hist">' + (e.n ? e.n + '번 풀어서 ' + e.w + '번 틀림' : e.w ? '틀린 문제' : '') +
      (e.w && e.a !== undefined ? ', 마지막 오답 ' + (e.a || '답 안 함') : '') + (e.res === 1 && e.w ? ', 지금은 맞힘' : '') + '</p>';
    if (!q) {
      if (ui.tried[ext] === 2) return h + failHtml(false).replace('data-a="reload"', 'data-a="nload" data-v="' + ext + '"');
      loadQ(ext).catch(function () { return loadQ(ext); }).then(function () { refreshDetail(ext); }, function () { ui.tried[ext] = 2; refreshDetail(ext); });
      return h + '<div class="home-loading">문제를 불러오는 중…</div>';
    }
    var st = ui.rev[ext];
    var choices = '<div class="bb-choices">' + q.opts.map(function (o, k) {
      var L = 'ABCD'.charAt(k), cls = 'bb-choice', tag = '';
      if (st) {
        if (L === q.key) { cls += ' key'; tag = '<span class="bb-tag">' + (st.pick === L ? 'Your answer · Correct' : 'Correct answer') + '</span>'; }
        else if (L === st.pick) { cls += ' miss'; tag = '<span class="bb-tag">Your answer</span>'; }
      }
      return '<div class="bb-ch-row"><button class="' + cls + '" data-a="ntry" data-v="' + L + '"' + (st ? ' disabled' : '') + '><span class="bb-letter">' + L + '</span><span class="bb-ch-text">' + o + '</span>' + tag + '</button></div>';
    }).join('') + '</div>';
    var after = st ? (st.pick ? '<div class="bb-verdict ' + (st.pick === q.key ? 'ok">맞았어요' : 'bad">틀렸어요. 정답은 ' + q.key) + '</div>' : '<div class="bb-verdict">정답은 ' + q.key + '</div>') +
        '<div class="bb-why"><div class="bb-why-h">EXPLANATION</div>' + q.why + '</div>' +
        '<div class="nd-reveal"><span></span><button type="button" class="mini" data-a="nhide">다시 가리기</button></div>'
      : '<div class="nd-reveal"><span>답을 골라 다시 풀어 보세요</span><button type="button" class="mini" data-a="nreveal">정답 보기</button></div>';
    return h + '<div class="nd-q" style="--fs:' + FONTS[store.prefs.font][0] + 'px">' + (q.stim ? '<div class="bb-passage">' + q.stim + '</div>' : '') +
      '<div class="bb-stem">' + q.stem + '</div>' + choices + after + '</div>' +
      '<div class="d-sub">메모</div><textarea class="nd-memo" data-a="memo" data-v="' + ext + '" placeholder="왜 틀렸는지, 다음에 확인할 것">' + esc(store.memo[ext] || '') + '</textarea>' +
      '<div class="d-line"><span></span><button type="button" class="pill ghost" data-a="nretry1" data-v="' + ext + '">Bluebook 화면으로 풀기</button></div>';
  }
  function refreshDetail(ext) {
    var d = document.getElementById('nDetail');
    if (d && view === 'home' && ui.tab === 'notes' && ui.note === ext) { d.innerHTML = noteDetail(ext); applyWordMarks(d); }
    var c = document.getElementById('nCards');
    if (c && view === 'home' && ui.tab === 'notes') c.innerHTML = cardsHtml(noteList().list);
  }
  function notesView() {
    var r = noteList(), all = r.all, list = r.list;
    if (!all.length) {
      return { body: '<div class="panel n-empty"><b>아직 모인 문제가 없어요</b><p>틀린 문제, 별표, 헷갈림(Mark for Review) 표시한 문제가 여기 모여요.</p><a class="pill" href="#">문제 풀러 가기</a></div>', bar: '' };
    }
    if (ui.nsk && !r.inF.some(function (e) { return e.sk === ui.nsk; })) { ui.nsk = ''; list = r.inF.slice(); }
    if (!ui.note && list.length && window.innerWidth > 760) ui.note = list[0].ext;
    var chips = '<div class="n-filters">' + NFILTERS.map(function (f) {
      var c = all.filter(function (e) { return nMatch(f[0], e); }).length;
      return '<button type="button" class="chip' + (ui.nf === f[0] ? ' on' : '') + '" data-a="nf" data-v="' + f[0] + '">' + (f[0] === 'star' ? '★ ' : '') + f[1] + '<b>' + c + '</b></button>';
    }).join('') + '</div>';
    var bySk = {};
    r.inF.forEach(function (e) { bySk[e.sk] = (bySk[e.sk] || 0) + 1; });
    var sks = Object.keys(bySk).sort(function (a, b) { return bySk[b] - bySk[a] || ORDER.indexOf(a) - ORDER.indexOf(b); });
    var types = sks.length > 1 ? '<div class="n-types"><button type="button" class="tchip' + (!ui.nsk ? ' on' : '') + '" data-a="nsk" data-v="">전체 유형</button>' +
      sks.map(function (c) { return '<button type="button" class="tchip' + (ui.nsk === c ? ' on' : '') + '" data-a="nsk" data-v="' + c + '">' + esc(SK[c].name) + '<b>' + bySk[c] + '</b></button>'; }).join('') + '</div>' : '';
    var sort = '<div class="seg n-sort">' + [['recent', '최근순'], ['many', '많이 틀린 순']].map(function (o) {
      return '<button type="button" class="' + (ui.nsort === o[0] ? 'on' : '') + '" data-a="nsort" data-v="' + o[0] + '">' + o[1] + '</button>';
    }).join('') + '</div>';
    var body = chips + types + '<div class="cfg notes' + (ui.noteOpen ? ' open' : '') + '"><div class="opt-list n-list"><div class="n-listhead"><span>' + list.length + '문제</span>' + sort + '</div>' +
      '<div id="nCards">' + cardsHtml(list) + '</div></div><section class="opt-detail n-detail" id="nDetail">' + noteDetail(ui.note) + '</section></div>';
    var label = pick(NFILTERS, ui.nf)[1] + (ui.nsk ? ', ' + SK[ui.nsk].name : '');
    var bar = list.length ? '<div class="startbar"><div class="startbar-in"><div class="sb-info"><b>' + list.length + '문제</b><span>' + esc(label) + '</span></div>' +
      '<div class="sb-acts"><button type="button" class="pill ghost" data-a="pdfask">PDF</button><button type="button" class="pill" data-a="nretry">다시 풀기</button></div></div></div>' : '';
    return { body: body, bar: bar };
  }
  function noteItems(es) { return es.map(function (e) { var x = findItem(e.ext); return x || { id: e.id, ext: e.ext, sk: e.sk, d: e.d, b: 0, t: '' }; }); }

  // PDF: the browser's print dialog ("PDF로 저장") prints a page built from the live questions
  function printHtml(es, full) {
    var label = pick(NFILTERS, ui.nf)[1] + (ui.nsk ? ', ' + SK[ui.nsk].name : '');
    var h = '<header class="pr-h"><h1>SAT Reading and Writing 오답노트</h1><p>' + today() + '   ' + esc(label) + '   ' + es.length + '문제' + (full ? '' : '   (정답은 맨 뒤)') + '</p></header>';
    h += es.map(function (e, i) {
      var q = qcache[e.ext], mine = e.res === 0 ? e.a : undefined;
      var ch = '<ol class="pr-ch">' + q.opts.map(function (o, k) {
        var L = 'ABCD'.charAt(k), key = full && L === q.key, my = full && mine && L === mine;
        return '<li class="' + (key ? 'key' : my ? 'my' : '') + '"><b>' + L + '</b><span>' + o + '</span>' +
          (key ? '<em class="pr-mk ok">정답</em>' : my ? '<em class="pr-mk bad">내 답</em>' : '') + '</li>';
      }).join('') + '</ol>';
      var meta = [SK[e.sk].name, DIFF_EN[e.d]].concat(e.w ? [e.w + '번 틀림'] : [], e.star ? ['★'] : [], e.flag ? ['헷갈림'] : []).join(', ');
      return '<section class="pr-q"><div class="pr-qh"><b>' + (i + 1) + '</b><span>' + esc(meta) + '</span><span class="pr-id">' + (e.id ? 'ID ' + esc(e.id) : '') + '</span></div>' +
        (q.stim ? '<div class="pr-pass">' + q.stim + '</div>' : '') + '<div class="pr-stem">' + q.stem + '</div>' + ch +
        (full ? '<div class="pr-why"><div class="pr-why-h">정답 ' + q.key + (mine !== undefined ? ', 내 답 ' + (mine || '없음') : '') + '</div>' + q.why + '</div>' +
          (store.memo[e.ext] ? '<div class="pr-memo"><b>메모</b> ' + esc(store.memo[e.ext]) + '</div>' : '') : '') + '</section>';
    }).join('');
    if (!full) {
      h += '<section class="pr-key"><h2>정답</h2><ol class="pr-keylist">' + es.map(function (e, i) {
        var mine = e.res === 0 ? e.a : undefined;
        return '<li><span>' + (i + 1) + '.</span> <b>' + qcache[e.ext].key + '</b>' + (mine !== undefined ? ' <small>(내 답 ' + (mine || '없음') + ')</small>' : '') + '</li>';
      }).join('') + '</ol></section>';
    }
    return '<div class="pr">' + h + '<p class="pr-src">문제와 해설 출처: College Board SAT Suite Question Bank. 개인 학습용으로 인쇄한 자료예요.</p></div>';
  }
  function makePdf(full) {
    var es = noteList().list;
    if (!es.length) return;
    modal('pdfwait', es.length);
    fetchAll(es, function (d) { var c = $('#pdfc'); if (c) c.textContent = d; }).then(function (ready) {
      closeModal();
      var ok = es.filter(function (e) { return qcache[e.ext]; });
      if (!ok.length) { modal('pdffail'); return; }
      var box = document.getElementById('print');
      if (!box) { box = document.createElement('div'); box.id = 'print'; document.body.appendChild(box); }
      box.innerHTML = printHtml(ok, full);
      var t0 = document.title;
      document.title = 'SAT 오답노트 ' + today();
      var done = function () { document.title = t0; window.removeEventListener('afterprint', done); };
      window.addEventListener('afterprint', done);
      setTimeout(function () { window.print(); setTimeout(done, 1500); }, 200);   // give charts and fonts a moment to lay out
    });
  }

  /* ───────── 단어장: words the user didn't know ───────── */
  var WFILTERS = [['learn', '외우는 중'], ['ok', '외움'], ['all', '전체']];
  var WORD_AREA = '.bb-passage, .bb-stem, .bb-ch-text, .bb-why';
  var DICT = 'https://api.dictionaryapi.dev/api/v2/entries/en/', WIKT = 'https://en.wiktionary.org/api/rest_v1/page/definition/';
  var LETTER = 'A-Za-z\\u00C0-\\u024F';
  function timeStr(t) { var d = new Date(t); return d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2); }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  var toastT = null;
  function toast(msg) {
    var el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg;
    el.className = 'show';
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.className = ''; }, 1800);
  }
  function wordActive() {
    return (view === 'test' && S && S.wordMode && S.phase !== 'check') || (view === 'home' && ui.tab === 'notes' && ui.wordMode);
  }
  function plainText(el) {
    var c = el.cloneNode(true);
    Array.prototype.forEach.call(c.querySelectorAll('.sr-only, svg'), function (n) { n.parentNode.removeChild(n); });
    return c.textContent.replace(/\s+/g, ' ').trim();
  }
  function sentenceOf(text, w) {
    var lo = text.toLowerCase(), i = lo.indexOf(w.toLowerCase());
    if (i < 0) return text.slice(0, 240);
    var s = Math.max(lo.lastIndexOf('. ', i), lo.lastIndexOf('? ', i), lo.lastIndexOf('! ', i));
    s = s < 0 ? 0 : s + 2;
    var e = text.slice(i).search(/[.?!](\s|$)/);
    e = e < 0 ? text.length : i + e + 1;
    var out = text.slice(s, e).trim();
    return out.length > 320 ? out.slice(0, 320) + '…' : out;
  }
  // the word under a tap: the selection if there is one (lets a mouse drag save a phrase), otherwise the letters around the caret
  function wordAt(e) {
    var sel = window.getSelection(), text = '', node = null, re = new RegExp('[' + LETTER + "'’-]");
    if (sel && !sel.isCollapsed && sel.rangeCount) { text = sel.toString(); node = sel.getRangeAt(0).startContainer; }
    else {
      var r = document.caretRangeFromPoint ? document.caretRangeFromPoint(e.clientX, e.clientY) : null;
      if (!r && document.caretPositionFromPoint) {
        var cp = document.caretPositionFromPoint(e.clientX, e.clientY);
        if (cp) { r = document.createRange(); r.setStart(cp.offsetNode, cp.offset); }
      }
      if (!r || r.startContainer.nodeType !== 3) return null;
      node = r.startContainer;
      var s = node.nodeValue, a = r.startOffset, b = r.startOffset;
      while (a > 0 && re.test(s.charAt(a - 1))) a--;
      while (b < s.length && re.test(s.charAt(b))) b++;
      text = s.slice(a, b);
    }
    text = text.replace(/\s+/g, ' ').replace(new RegExp('^[^' + LETTER + ']+|[^' + LETTER + ']+$', 'g'), '').replace(/['’]s$/i, '');
    if (!text || text.length > 40 || text.split(' ').length > 4) return null;
    var el = node && (node.nodeType === 3 ? node.parentNode : node);
    var block = el && el.closest ? el.closest('p, li, td, th, caption, ' + WORD_AREA) : null;
    return { w: text, ctx: block ? sentenceOf(plainText(block), text) : '' };
  }
  function currentQ() {
    if (view === 'test' && S) return S.items[S.i];
    if (view === 'home' && ui.note) return noteEntry(ui.note);
    return null;
  }
  function pickWord(e) {
    var area = e.target.closest && e.target.closest(WORD_AREA);
    if (!area) return false;
    e.preventDefault();
    var uw = e.target.closest('.uw'), sel = window.getSelection();
    if (uw && (!sel || sel.isCollapsed)) {                    // tapping a saved word takes it back out
      var k0 = uw.textContent.toLowerCase();
      if (store.words[k0]) { delete store.words[k0]; save(); toast('단어장에서 뺐어요: ' + uw.textContent); }
    } else {
      var got = wordAt(e);
      if (!got) { toast('단어를 다시 눌러 주세요'); return true; }
      var key = got.w.toLowerCase(), x = currentQ(), o = store.words[key] || { w: got.w, t: Date.now(), my: '', ok: false, k: 0 };
      if (got.ctx) o.ctx = got.ctx;
      if (x) { o.ext = x.ext; o.qid = x.id; o.sk = x.sk; o.d = x.d; }
      store.words[key] = o;
      save();
      toast('단어장에 저장: ' + got.w);
    }
    if (sel) sel.removeAllRanges();
    if (view === 'test') renderTest(); else refreshDetail(ui.note);
    return true;
  }
  // saved words get a dotted underline wherever they appear in a question
  var wre = null, wreSig = null;
  function wordRegex() {
    var ws = Object.keys(store.words), sig = ws.join('|');
    if (sig !== wreSig) {
      wreSig = sig;
      wre = ws.length ? new RegExp('(^|[^' + LETTER + '])(' + ws.slice().sort(function (a, b) { return b.length - a.length; }).map(escRe).join('|') + ')(?=[^' + LETTER + ']|$)', 'gi') : null;
    }
    return wre;
  }
  function applyWordMarks(root) {
    var re = wordRegex();
    if (!re || !root) return;
    Array.prototype.forEach.call(root.querySelectorAll(WORD_AREA), function (box) {
      var tw = document.createTreeWalker(box, NodeFilter.SHOW_TEXT, null), nodes = [];
      while (tw.nextNode()) { var n = tw.currentNode; if (!n.parentNode.closest('.uw, .sr-only, svg')) nodes.push(n); }
      nodes.forEach(function (n) {
        var s = n.nodeValue, m, last = 0, frag = null;
        re.lastIndex = 0;
        while ((m = re.exec(s))) {
          var st = m.index + m[1].length, en = st + m[2].length, o = store.words[m[2].toLowerCase()];
          frag = frag || document.createDocumentFragment();
          frag.appendChild(document.createTextNode(s.slice(last, st)));
          var sp = document.createElement('span');
          sp.className = 'uw';
          sp.textContent = s.slice(st, en);
          if (o && meanOf(o)) sp.title = meanOf(o);
          frag.appendChild(sp);
          last = en;
          if (re.lastIndex <= m.index) re.lastIndex = m.index + 1;
        }
        if (frag) { frag.appendChild(document.createTextNode(s.slice(last))); n.parentNode.replaceChild(frag, n); }
      });
    });
  }
  function stripUw(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    Array.prototype.forEach.call(d.querySelectorAll('.uw'), function (u) { u.parentNode.replaceChild(document.createTextNode(u.textContent), u); });
    d.normalize();
    return d.innerHTML;
  }

  // English definitions: Free Dictionary API first, Wiktionary when it has nothing (both allow any origin)
  var dictPend = {}, dictFail = {};
  function wordForms(w) {
    var c = [w];
    if (/\s/.test(w)) return c;
    [[/ies$/, 'y'], [/ied$/, 'y'], [/ing$/, ''], [/ing$/, 'e'], [/ed$/, ''], [/ed$/, 'e'], [/es$/, ''], [/s$/, ''], [/ily$/, 'y'], [/ly$/, '']].forEach(function (r) {
      if (r[0].test(w)) { var b = w.replace(r[0], r[1]); if (b.length > 2 && c.indexOf(b) < 0) c.push(b); }
    });
    return c;
  }
  function getJSON(url) {
    return fetch(url).then(function (r) { if (r.status === 404) return null; if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }
  function fromDictApi(d, w) {
    var e = d && d[0];
    if (!e) return null;
    var ph = e.phonetic || '', au = '', m = [];
    (e.phonetics || []).forEach(function (p) { if (!ph && p.text) ph = p.text; if (!au && /^https:\/\//.test(p.audio || '')) au = p.audio; });
    (e.meanings || []).forEach(function (mm) {
      (mm.definitions || []).slice(0, 2).forEach(function (df) { if (m.length < 4 && df.definition) m.push([String(mm.partOfSpeech || ''), String(df.definition).slice(0, 300)]); });
    });
    return m.length ? { ph: String(ph).slice(0, 60), au: au, m: m, base: e.word && String(e.word).toLowerCase() !== w ? String(e.word) : '', src: 'Free Dictionary' } : null;
  }
  function htmlText(h) { return (new DOMParser().parseFromString('<div>' + (h || '') + '</div>', 'text/html').body.textContent || '').replace(/\s+/g, ' ').trim(); }
  function fromWikt(d) {
    var m = [];
    ((d && d.en) || []).forEach(function (x) {
      (x.definitions || []).slice(0, 2).forEach(function (df) { var t = htmlText(df.definition); if (m.length < 4 && t) m.push([String(x.partOfSpeech || '').toLowerCase(), t.slice(0, 300)]); });
    });
    return m.length ? { ph: '', au: '', m: m, base: '', src: 'Wiktionary' } : null;
  }
  var dictCbs = {};
  function lookup(key, cb) {
    if (cb) (dictCbs[key] = dictCbs[key] || []).push(cb);
    if (dictPend[key]) return;
    dictPend[key] = 1;
    var forms = wordForms(key);
    function end() { delete dictPend[key]; var cbs = dictCbs[key] || []; delete dictCbs[key]; refreshWord(key); cbs.forEach(function (f) { f(); }); }
    function finish(v) { if (store.words[key]) { store.words[key].dict = v; save(); } end(); }
    function tryDict(i, retried) {
      if (i >= forms.length) { tryWikt(); return; }
      getJSON(DICT + encodeURIComponent(forms[i])).then(function (d) {
        var v = fromDictApi(d, key);
        if (v) finish(v); else tryDict(i + 1, false);
      }, function () { if (!retried) tryDict(i, true); else tryDict(i + 1, false); });
    }
    function tryWikt() {
      getJSON(WIKT + encodeURIComponent(key)).then(function (d) { finish(fromWikt(d) || 0); }, function () { dictFail[key] = 1; end(); });
    }
    tryDict(0, false);
  }
  function prefetchDefs() {
    if (ui.dictBusy || view !== 'home' || ui.tab !== 'words') return;
    var next = wordEntries().list.filter(function (e) { return e.o.dict === undefined && !dictFail[e.key] && !dictPend[e.key]; })[0];
    if (!next) return;
    ui.dictBusy = true;
    lookup(next.key, function () { ui.dictBusy = false; setTimeout(prefetchDefs, 150); });
  }
  function refreshWord(key) {
    if (view !== 'home' || ui.tab !== 'words') return;
    var d = document.getElementById('wDict');
    if (d && ui.word === key) d.innerHTML = dictHtml(key);
    var c = document.getElementById('wCards');
    if (c) c.innerHTML = wordCards(wordEntries().list);
  }
  function wordEntries() {
    var q = ui.wq.trim().toLowerCase();
    var all = Object.keys(store.words).map(function (k) { return { key: k, o: store.words[k] }; });
    var list = all.filter(function (e) { return ui.wf === 'all' || (ui.wf === 'ok' ? e.o.ok : !e.o.ok); })
      .filter(function (e) { return !q || e.key.indexOf(q) >= 0 || (e.o.my || '').toLowerCase().indexOf(q) >= 0; });
    list.sort(ui.wsort === 'abc' ? function (a, b) { return a.key < b.key ? -1 : a.key > b.key ? 1 : 0; } : function (a, b) { return (b.o.t || 0) - (a.o.t || 0); });
    return { all: all, list: list };
  }
  function meanOf(o) { return o.my || (o.dict && o.dict.m && o.dict.m[0] ? o.dict.m[0][1] : ''); }
  function ctxHtml(o) {
    if (!o.ctx) return '';
    return esc(o.ctx).replace(new RegExp('(^|[^' + LETTER + '])(' + escRe(esc(o.w)) + ')(?=[^' + LETTER + ']|$)', 'i'), '$1<b>$2</b>');
  }
  function wordCard(e) {
    var o = e.o;
    return '<button type="button" class="ncard wcard' + (ui.word === e.key ? ' on' : '') + '" data-a="wsel" data-v="' + esc(e.key) + '">' +
      '<span class="nc-top"><b class="w-w">' + esc(o.w) + '</b>' + (o.ok ? '<span class="w-ok">외움</span>' : '') + '<span class="nc-w">' + (o.t ? dateStr(o.t) : '') + '</span></span>' +
      '<span class="w-mean">' + esc(meanOf(o)) + '</span>' + (o.ctx ? '<span class="nc-snip">' + ctxHtml(o) + '</span>' : '') + '</button>';
  }
  function wordCards(list) { return list.length ? list.map(wordCard).join('') : '<p class="n-none">' + (ui.wq ? '찾는 단어가 없어요' : '이 조건에 맞는 단어가 없어요') + '</p>'; }
  function dictHtml(key) {
    var o = store.words[key];
    if (!o) return '';
    var naver = '<a class="w-link" href="https://en.dict.naver.com/#/search?query=' + encodeURIComponent(o.w) + '" target="_blank" rel="noopener">네이버 사전</a>';
    if (o.dict === undefined) {
      if (dictFail[key]) return '<p class="w-none">사전에 연결하지 못했어요. <button type="button" class="mini" data-a="wdict" data-v="' + esc(key) + '">다시 찾기</button> ' + naver + '</p>';
      lookup(key);
      return '<p class="w-none">찾는 중…</p>';
    }
    if (!o.dict) return '<p class="w-none">영영사전에서 못 찾았어요. ' + naver + '</p>';
    var d = o.dict;
    return (d.base ? '<p class="w-base">기본형 <b>' + esc(d.base) + '</b></p>' : '') +
      '<ol class="w-defs">' + d.m.map(function (m) { return '<li><em>' + esc(m[0]) + '</em> ' + esc(m[1]) + '</li>'; }).join('') + '</ol>' +
      '<p class="w-src"><span>' + esc(d.src || '') + '</span>' + naver + '</p>';
  }
  function wordDetail(key) {
    var o = key && store.words[key];
    if (!o) return '<p class="n-none">왼쪽 목록에서 단어를 고르세요</p>';
    var ph = o.dict && o.dict.ph ? o.dict.ph : '';
    var h = '<div class="d-top"><button type="button" class="d-back" data-a="wback">' + I.left + '목록</button>' +
      '<div class="nd-title"><b class="w-big">' + esc(o.w) + '</b><span class="w-ph">' + esc(ph) +
      (o.dict && o.dict.au ? '<button type="button" class="w-say" data-a="wsay" data-v="' + esc(key) + '" aria-label="발음 듣기">' + I.sound + '</button>' : '') + '</span></div>' +
      '<div class="d-tools"><button type="button" class="kp kp-ok' + (o.ok ? ' on' : '') + '" data-a="wok" data-v="' + esc(key) + '" aria-pressed="' + !!o.ok + '">' + I.check + '<span>외움</span></button>' +
      '<button type="button" class="kp" data-a="wdel" data-v="' + esc(key) + '">삭제</button></div></div>';
    h += '<div class="d-sub first">내 뜻</div><input type="text" class="w-my" data-a="wmy" data-v="' + esc(key) + '" value="' + esc(o.my || '') + '" placeholder="한국어 뜻을 적어 두세요" autocomplete="off">';
    h += '<div class="d-sub">영영 뜻</div><div id="wDict">' + dictHtml(key) + '</div>';
    if (o.ctx) h += '<div class="d-sub">나온 문장</div><p class="w-ctx">' + ctxHtml(o) + '</p>';
    if (o.ext) {
      h += '<div class="d-line"><span class="n">' + (o.sk && SK[o.sk] ? esc(SK[o.sk].name) + ', ' : '') + (DIFF_EN[o.d] || '') + (o.qid ? ', ID ' + esc(o.qid) : '') + '</span>' +
        '<button type="button" class="pill ghost" data-a="wq" data-v="' + esc(key) + '">이 문제 풀기</button></div>';
    }
    return h;
  }
  function wordsView() {
    var r = wordEntries(), all = r.all, list = r.list;
    if (!all.length) {
      return { body: '<div class="panel n-empty"><b>아직 저장한 단어가 없어요</b><p>문제 화면 위쪽의 Words를 켜고 모르는 단어를 누르면 여기 모여요.</p><a class="pill" href="#">문제 풀러 가기</a></div>', bar: '' };
    }
    if (!ui.word && list.length && window.innerWidth > 760) ui.word = list[0].key;
    var chips = '<div class="n-filters">' + WFILTERS.map(function (f) {
      var c = all.filter(function (e) { return f[0] === 'all' || (f[0] === 'ok' ? e.o.ok : !e.o.ok); }).length;
      return '<button type="button" class="chip' + (ui.wf === f[0] ? ' on' : '') + '" data-a="wf" data-v="' + f[0] + '">' + f[1] + '<b>' + c + '</b></button>';
    }).join('') + '</div>';
    var sort = '<div class="seg n-sort">' + [['recent', '최근순'], ['abc', 'ABC순']].map(function (o) {
      return '<button type="button" class="' + (ui.wsort === o[0] ? 'on' : '') + '" data-a="wsort" data-v="' + o[0] + '">' + o[1] + '</button>';
    }).join('') + '</div>';
    var body = chips + '<div class="cfg notes' + (ui.wordOpen ? ' open' : '') + '"><div class="opt-list n-list">' +
      '<div class="w-search"><input type="search" data-a="wsearch" value="' + esc(ui.wq) + '" placeholder="단어나 뜻으로 찾기" autocomplete="off" aria-label="단어 찾기"></div>' +
      '<div class="n-listhead"><span id="wN">' + list.length + '단어</span>' + sort + '</div><div id="wCards">' + wordCards(list) + '</div></div>' +
      '<section class="opt-detail n-detail" id="wDetail">' + wordDetail(ui.word) + '</section></div>';
    var bar = list.length ? '<div class="startbar"><div class="startbar-in"><div class="sb-info"><b>' + list.length + '단어</b><span>' + esc(pick(WFILTERS, ui.wf)[1]) + '</span></div>' +
      '<div class="sb-acts"><button type="button" class="pill" data-a="fcstart">카드로 외우기</button></div></div></div>' : '';
    return { body: body, bar: bar };
  }
  // flashcards: tap to flip, 알아요 twice in a row marks a word 외움
  function renderFc() {
    var old = $('.fc-bg');
    if (old) old.parentNode.removeChild(old);
    var f = ui.fc;
    if (!f) return;
    var h;
    if (f.i >= f.keys.length) {
      h = '<div class="fc-end"><h3>다 봤어요</h3><p>알아요 ' + f.yes + ', 몰라요 ' + f.no + '</p><div class="acts">' +
        (f.nos.length ? '<button class="bb-btn light" data-a="fcagain">몰라요만 다시 (' + f.nos.length + ')</button>' : '') + '<button class="bb-btn" data-a="fcclose">닫기</button></div></div>';
    } else {
      var o = store.words[f.keys[f.i]] || { w: f.keys[f.i] };
      var back = '<span class="fc-my">' + esc(o.my || '') + '</span>' +
        (o.dict && o.dict.m ? '<span class="fc-def">' + o.dict.m.slice(0, 2).map(function (m) { return '<i>' + esc(m[0]) + '</i> ' + esc(m[1]); }).join('<br>') + '</span>' : '') +
        (o.ctx ? '<span class="fc-ctx">' + ctxHtml(o) + '</span>' : '');
      h = '<div class="fc-top"><span>' + (f.i + 1) + ' / ' + f.keys.length + '</span><button class="bb-close" data-a="fcclose" aria-label="닫기">×</button></div>' +
        '<button type="button" class="fc-card' + (f.flip ? ' flip' : '') + '" data-a="fcflip"><b class="fc-w">' + esc(o.w) + '</b>' +
        (o.dict && o.dict.ph ? '<span class="fc-ph">' + esc(o.dict.ph) + '</span>' : '') + (f.flip ? back : '<span class="fc-tap">눌러서 뜻 보기</span>') + '</button>' +
        '<div class="fc-acts"><button class="bb-btn light" data-a="fcno">몰라요</button><button class="bb-btn" data-a="fcyes">알아요</button></div>';
    }
    app.insertAdjacentHTML('beforeend', '<div class="fc-bg"><div class="fc" role="dialog" aria-modal="true" aria-label="단어 카드">' + h + '</div></div>');
  }
  function fcAnswer(yes) {
    var f = ui.fc, key = f.keys[f.i], o = store.words[key];
    if (o) {
      if (yes) { o.k = (o.k || 0) + 1; if (o.k >= 2) o.ok = true; f.yes++; }
      else { o.k = 0; o.ok = false; f.no++; f.nos.push(key); }
      save();
    }
    f.i++; f.flip = false;
    renderFc();
  }

  /* ───────── backup / restore (one JSON file with everything this page keeps) ───────── */
  var BK_APP = 'sat-bluebook-practice', UUIDRE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, QIDRE = /^[0-9a-f]{8}$/i;
  function dataCounts(s) {
    var c = { solved: 0, wrong: 0, star: Object.keys(s.star || {}).length, flag: Object.keys(s.flag || {}).length, memo: Object.keys(s.memo || {}).length, words: Object.keys(s.words || {}).length, sessions: (s.sessions || []).length };
    Object.keys(s.res || {}).forEach(function (k) { c.solved++; if (s.res[k] === 0) c.wrong++; });
    return c;
  }
  function countsText(c) { return '푼 문제 ' + c.solved + ', 아직 틀림 ' + c.wrong + ', 별표 ' + c.star + ', 헷갈림 ' + c.flag + ', 메모 ' + c.memo + ', 단어 ' + c.words + ', 최근 기록 ' + c.sessions; }
  function backupNow() {
    var payload = { app: BK_APP, v: 1, at: new Date().toISOString(), data: { res: store.res, log: store.log, flag: store.flag, star: store.star, memo: store.memo, words: store.words, sessions: store.sessions, prefs: store.prefs } };
    var url = URL.createObjectURL(new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'sat-bluebook-backup-' + today() + '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.parentNode.removeChild(a); }, 1500);
    store.lastBackup = Date.now();
    save();
    renderHome();
    toast('백업 파일을 받았어요');
  }
  function str(v, n) { return typeof v === 'string' ? v.slice(0, n) : ''; }
  function num(v) { return typeof v === 'number' && isFinite(v) ? v : 0; }
  function isObj(v) { return v && typeof v === 'object' && !Array.isArray(v); }
  function oneOf(list, v, dflt) { return list.some(function (x) { return x[0] === v; }) ? v : dflt; }
  function cleanPrefs(p) {
    if (!isObj(p)) return null;
    var d = defaults(), out = defaults();
    Object.keys(d).forEach(function (k) {
      var v = p[k];
      if (Array.isArray(d[k])) {
        if (Array.isArray(v)) out[k] = v.filter(function (x) { return k === 'skills' ? !!SK[x] : k === 'diffs' ? !!DIFF_EN[x] : k === 'bands' ? BANDS.indexOf(x) >= 0 : typeof x === 'string' && /^\d{4}-\d{2}$/.test(x); });
      } else if (typeof v === typeof d[k]) out[k] = v;
    });
    out.ev = oneOf(TESTS, out.ev, '99'); out.pool = oneOf(POOLS, out.pool, 'new'); out.order = oneOf(ORDERS, out.order, 'random');
    out.timer = oneOf(TIMERS, out.timer, 'pace'); out.check = oneOf(CHECKS, out.check, 'end');
    out.font = Math.max(0, Math.min(FONTS.length - 1, out.font | 0)); out.count = Math.max(1, out.count | 0); out.mins = Math.max(1, Math.min(180, out.mins | 0));
    return out;
  }
  // everything from a file is checked field by field before it is used
  function cleanBackup(o) {
    if (!isObj(o) || o.app !== BK_APP || !isObj(o.data)) return null;
    var d = o.data, out = { at: str(o.at, 40), res: {}, log: {}, flag: {}, star: {}, memo: {}, words: {}, sessions: [], prefs: cleanPrefs(d.prefs) };
    if (isObj(d.res)) Object.keys(d.res).forEach(function (k) { if ((UUIDRE.test(k) || QIDRE.test(k)) && (d.res[k] === 0 || d.res[k] === 1)) out.res[k] = d.res[k]; });
    if (isObj(d.log)) Object.keys(d.log).forEach(function (k) {
      var v = d.log[k];
      if (!UUIDRE.test(k) || !isObj(v) || !SK[v.sk]) return;
      out.log[k] = {
        id: QIDRE.test(v.id || '') ? v.id : '', sk: v.sk, d: DIFF_EN[v.d] ? v.d : 'M', ev: oneOf(TESTS, v.ev, '99'),
        k: /^[A-D]$/.test(v.k || '') ? v.k : undefined, a: typeof v.a === 'string' && /^[A-D]?$/.test(v.a) ? v.a : undefined,
        n: num(v.n), w: num(v.w), s: num(v.s), t: num(v.t), tw: num(v.tw)
      };
    });
    ['flag', 'star'].forEach(function (f) { if (isObj(d[f])) Object.keys(d[f]).forEach(function (k) { if (UUIDRE.test(k) && d[f][k]) out[f][k] = 1; }); });
    if (isObj(d.memo)) Object.keys(d.memo).forEach(function (k) { var m = str(d.memo[k], 5000); if (UUIDRE.test(k) && m.trim()) out.memo[k] = m; });
    if (isObj(d.words)) Object.keys(d.words).slice(0, 5000).forEach(function (k) {
      var v = d.words[k];
      if (!isObj(v) || !k || k.length > 60) return;
      var w = { w: str(v.w, 60) || k, t: num(v.t), my: str(v.my, 500), ok: !!v.ok, k: num(v.k), ctx: str(v.ctx, 400) };
      if (UUIDRE.test(v.ext || '')) { w.ext = v.ext; w.qid = QIDRE.test(v.qid || '') ? v.qid : ''; w.sk = SK[v.sk] ? v.sk : undefined; w.d = DIFF_EN[v.d] ? v.d : undefined; }
      if (v.dict === 0) w.dict = 0;
      else if (isObj(v.dict) && Array.isArray(v.dict.m)) {
        w.dict = {
          ph: str(v.dict.ph, 60), au: /^https:\/\//.test(v.dict.au || '') ? str(v.dict.au, 300) : '', base: str(v.dict.base, 60), src: str(v.dict.src, 30),
          m: v.dict.m.slice(0, 4).filter(Array.isArray).map(function (x) { return [str(x[0], 30), str(x[1], 400)]; })
        };
      }
      out.words[k.toLowerCase()] = w;
    });
    if (Array.isArray(d.sessions)) out.sessions = d.sessions.filter(isObj).slice(0, 30).map(function (s) { return { at: num(s.at), n: num(s.n), ok: num(s.ok), label: str(s.label, 80), secs: num(s.secs) }; });
    return out;
  }
  function restoreMerge(d) {
    Object.keys(d.log).forEach(function (k) {
      var a = store.log[k], b = d.log[k];
      if (!a || b.t > (a.t || 0)) { store.log[k] = b; if (k in d.res) store.res[k] = d.res[k]; }   // the newer attempt wins
    });
    Object.keys(d.res).forEach(function (k) { if (!(k in store.res)) store.res[k] = d.res[k]; });
    Object.keys(d.flag).forEach(function (k) { store.flag[k] = 1; });
    Object.keys(d.star).forEach(function (k) { store.star[k] = 1; });
    Object.keys(d.memo).forEach(function (k) {
      var cur0 = store.memo[k];
      store.memo[k] = !cur0 || cur0 === d.memo[k] ? d.memo[k] : cur0 + '\n' + d.memo[k];
    });
    Object.keys(d.words).forEach(function (k) {
      var a = store.words[k], b = d.words[k];
      if (!a) { store.words[k] = b; return; }
      a.my = a.my || b.my; a.ok = a.ok || b.ok; a.ctx = a.ctx || b.ctx; a.t = Math.min(a.t || b.t, b.t || a.t);
      if (a.dict === undefined) a.dict = b.dict;
      if (!a.ext && b.ext) { a.ext = b.ext; a.qid = b.qid; a.sk = b.sk; a.d = b.d; }
    });
    var seen = {};
    store.sessions = store.sessions.concat(d.sessions).filter(function (s) { if (seen[s.at]) return false; seen[s.at] = 1; return true; })
      .sort(function (a, b) { return b.at - a.at; }).slice(0, 30);
  }
  function restoreReplace(d) {
    store.res = d.res; store.log = d.log; store.flag = d.flag; store.star = d.star; store.memo = d.memo; store.words = d.words; store.sessions = d.sessions;
    if (d.prefs) store.prefs = d.prefs;
  }
  var fileIn = document.createElement('input');
  fileIn.type = 'file';
  fileIn.accept = '.json,application/json';
  fileIn.style.display = 'none';
  document.body.appendChild(fileIn);
  fileIn.addEventListener('change', function () {
    var f = fileIn.files && fileIn.files[0];
    fileIn.value = '';
    if (!f) return;
    if (f.size > 20e6) { modal('badfile'); return; }
    var rd = new FileReader();
    rd.onload = function () {
      var d = null;
      try { d = cleanBackup(JSON.parse(String(rd.result))); } catch (err) { d = null; }
      if (!d) { modal('badfile'); return; }
      ui.pending = d;
      modal('restore', d);
    };
    rd.onerror = function () { modal('badfile'); };
    rd.readAsText(f);
  });
  function finishRestore(replace) {
    var d = ui.pending;
    if (!d) return;
    ui.pending = null;
    if (replace) restoreReplace(d); else restoreMerge(d);
    store.legacy = Object.keys(store.res).some(function (k) { return QIDRE.test(k); });
    if (store.legacy && lists['99']) migrate(lists['99']);
    wreSig = null;
    save();
    closeModal();
    ui.note = null; ui.word = null;
    showHome();
    toast(replace ? '백업 파일로 바꿨어요' : '백업 파일을 합쳤어요');
  }

  function showHome() {
    stopTimer(); S = null; view = 'home';
    ui.tab = location.hash === '#notes' ? 'notes' : location.hash === '#words' ? 'words' : 'solve';
    document.title = 'Bluebook 연습 · 공식 문제';
    app.className = 'home';
    renderHome();
    window.scrollTo(0, 0);
    var ev = store.prefs.ev;
    loadList(ev).then(function () { if (view === 'home') renderHome(); }, function () { if (view === 'home' && store.prefs.ev === ev) renderHome(true); });
    // the notebook names older records' types from the SAT list (every PSAT question is in it)
    if (ev !== '99') loadList('99').then(function () { if (view === 'home' && ui.tab !== 'solve') renderHome(); }, function () {});
  }
  function renderHome(failed) {
    if (view !== 'home') return;
    var p = store.prefs, ready = !!lists[p.ev], body, bar = '', notes = ui.tab === 'notes', words = ui.tab === 'words';
    if (notes || words) {
      var nv = notes ? notesView() : wordsView();
      body = nv.body; bar = nv.bar;
    } else if (!ready) body = failed ? failHtml() : '<div class="panel home-loading">' + esc(testName(p.ev)) + ' 문제 목록을 불러오는 중…</div>';
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
    var y = window.scrollY, wrongN = nowCount(), learnN = Object.keys(store.words).filter(function (k) { return !store.words[k].ok; }).length;
    var tab = function (href, id, label, badge) {
      var on = ui.tab === id;
      return '<a href="' + href + '" class="' + (on ? 'on' : '') + '"' + (on ? ' aria-current="page"' : '') + '>' + label + badge + '</a>';
    };
    var tabs = '<nav class="tabs" aria-label="화면">' + tab('#', 'solve', '문제 풀기', '') +
      tab('#notes', 'notes', '오답노트', wrongN ? '<span class="cnt">' + wrongN + '</span>' : '') +
      tab('#words', 'words', '단어장', learnN ? '<span class="cnt soft">' + learnN + '</span>' : '') +
      '<button type="button" class="tab-bk" data-a="gobackup" title="백업과 복원">' + I.down2 + '<span>백업</span></button></nav>';
    app.innerHTML = '<header class="home-top"><a class="home-back" href="../">← SAT 그래머 스터디</a></header>' +
      '<main class="setup"><div class="setup-h"><h1>Reading and Writing</h1>' + (ready && ui.tab === 'solve' ? '<span class="tot">' + esc(testName(p.ev)) + ' ' + nf(cur().length) + '문제</span>' : '') + '</div>' +
      tabs + body + '<p class="home-src">문제 출처: <a href="' + CB_SITE + '" target="_blank" rel="noopener">College Board SAT Suite Question Bank</a>. 문제는 열 때마다 College Board에서 불러오고 이 사이트에는 저장하지 않아요. ' +
      'College Board, Bluebook과 관계없는 개인 연습용 화면이에요.</p></main>' + bar;
    window.scrollTo(0, y);
    if (notes) { applyWordMarks(document.getElementById('nDetail')); setTimeout(prefetchNotes, 0); }
    if (words) setTimeout(prefetchDefs, 0);
    if (ui.fc) renderFc();
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
        items: ready, i: 0, ans: {}, mark: mark, elim: {}, hl: {}, checked: {}, rec: {}, ev: p.ev, phase: 'test',
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
      (S.phase === 'check' ? '' : '<button class="bb-tool' + (S.wordMode ? ' on' : '') + '" data-a="wordmode" aria-pressed="' + !!S.wordMode + '" title="Tap a word you didn\'t know to save it">' + I.book + '<span>Words</span></button>') +
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
      var keepTools = '<span class="bb-keep">' + starBtn(x.ext, 'star') + confBtn(x.ext, 'conf') + '</span>';
      var head = '<div class="bb-qhead"><span class="bb-qnum">' + (S.i + 1) + '</span>' +
        (rev ? '<span class="bb-mark bb-info-rev">' + esc(tag) + '<small>ID ' + esc(x.id) + '</small></span>' + keepTools
          : (showAns ? '' : '<button class="bb-mark' + (S.mark[S.i] ? ' on' : '') + '" data-a="mark" aria-pressed="' + !!S.mark[S.i] + '">' + I.mark + 'Mark for Review</button>') +
            (S.info || showAns ? '<span class="bb-info">' + esc(tag) + '</span>' : '') +
            (showAns ? keepTools : '<button class="bb-abc' + (S.elimMode ? ' on' : '') + '" data-a="elim" aria-pressed="' + S.elimMode + '" title="Cross out answer choices"><span>ABC</span></button>')) +
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

    app.innerHTML = '<div class="bb' + (S.annotate ? ' annotate' : '') + (S.wordMode ? ' wordmode' : '') + '" style="--fs:' + FONTS[S.font][0] + 'px">' + top + pops + mid + foot + '</div>';
    applyWordMarks(app);
    S._shown = S.i + ':' + S.phase;
    if (keep) {
      var l1 = $('.bb-left'), r1 = $('.bb-right'), m1 = $('.bb-main');
      if (l1) l1.scrollTop = keep.l;
      if (r1) r1.scrollTop = keep.r;
      if (m1) m1.scrollTop = keep.m;
    }
  }

  /* ───────── results ───────── */
  function record(j) {
    if (S.rec[j]) return;
    S.rec[j] = 1;
    var x = S.items[j];
    recordAnswer(x, qcache[x.ext].key, S.ans[j] || '', S.ev);
  }
  function submit() {
    stopTimer();
    S.end = Date.now();
    var ok = 0;
    S.items.forEach(function (x, j) {
      if (S.ans[j] === qcache[x.ext].key) ok++;
      record(j);
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
      '<button class="pill ghost" data-a="notes">오답노트</button><button class="pill ghost" data-a="again">같은 조건으로 새로 풀기</button><button class="pill ghost" data-a="home">처음 화면</button></div>' +
      '<table class="res-table"><thead><tr><th>#</th><th></th><th>유형</th><th>난이도</th><th>정답</th><th>내 답</th><th>문제</th></tr></thead><tbody>' +
      S.items.map(function (x, j) {
        var q = qcache[x.ext], good = S.ans[j] === q.key;
        return '<tr class="row-link" data-a="open" data-v="' + j + '"><td>' + (j + 1) + '</td><td class="mk ' + (good ? 'ok' : 'bad') + '">' + (good ? '✓' : '✗') + '</td>' +
          '<td class="sk">' + esc(SK[x.sk].name) + (store.star[x.ext] ? ' <span class="r-star">★</span>' : '') + (store.flag[x.ext] ? ' ' + I.flag : '') + '</td><td>' + DIFF_KO[x.d] + '</td><td>' + q.key + '</td><td>' + (S.ans[j] || '–') + '</td>' +
          '<td class="ex">' + esc(q.text.slice(0, 90)) + '</td></tr>';
      }).join('') + '</tbody></table></main>';
    window.scrollTo(0, 0);
  }

  /* ───────── modal ───────── */
  function modal(kind, arg) {
    var unanswered = S ? S.items.filter(function (x, j) { return !S.ans[j]; }).length : 0;
    var t, p, acts;
    if (kind === 'restore') {
      var at = arg.at && !isNaN(new Date(arg.at)) ? new Date(arg.at) : null;
      t = '백업에서 복원할까요?';
      p = (at ? at.getFullYear() + '-' + ('0' + (at.getMonth() + 1)).slice(-2) + '-' + ('0' + at.getDate()).slice(-2) + ' ' + timeStr(at) + ' 백업<br>' : '') + countsText(dataCounts(arg)) +
        '<br><br><b>합치기</b>는 지금 기록에 더하고, <b>덮어쓰기</b>는 지금 기록을 지우고 파일 내용으로 바꿔요.';
      acts = [['close', '취소', 'light'], ['rsmerge', '합치기', 'light'], ['rsreplace', '덮어쓰기', '']];
    }
    else if (kind === 'badfile') { t = '복원할 수 없는 파일이에요'; p = '이 페이지에서 받은 백업 파일(.json)을 골라 주세요.'; acts = [['close', '닫기', '']]; }
    else if (kind === 'pdf') { t = 'PDF로 저장'; p = arg + '문제를 인쇄 창으로 열어요. 대상에서 "PDF로 저장"을 고르세요.<br>문제지는 정답을 맨 뒤에 모아 둬요.'; acts = [['close', '취소', 'light'], ['pdfq', '문제지', 'light'], ['pdffull', '해설 포함', '']]; }
    else if (kind === 'pdfwait') { t = 'PDF 준비 중'; p = 'College Board에서 문제를 불러오는 중 <span id="pdfc">0</span> / ' + arg; acts = []; }
    else if (kind === 'pdffail') { t = '문제를 불러오지 못했어요'; p = '잠시 뒤 다시 시도해 주세요.'; acts = [['close', '닫기', '']]; }
    else
    if (kind === 'timeup') { t = "Time's up"; p = '시간이 끝났어요. 실제 시험은 여기서 자동 제출돼요.'; acts = [['close', '계속 풀기', 'light'], ['dosubmit', '제출하기', '']]; }
    else if (kind === 'submit') { t = '제출할까요?'; p = '답하지 않은 문제가 ' + unanswered + '개 있어요. 답하지 않은 문제는 틀린 것으로 기록돼요.'; acts = [['close', '돌아가기', 'light'], ['dosubmit', '제출하기', '']]; }
    else if (kind === 'exit') { t = '연습을 그만둘까요?'; p = '지금까지 고른 답은 기록되지 않아요.'; acts = [['close', '계속 풀기', 'light'], ['home', '그만두기', '']]; }
    else if (kind === 'clear') { t = '기록을 지울까요?'; p = '푼 기록, 오답노트(별표, 헷갈림, 메모), 최근 기록이 모두 지워져요. 단어장은 그대로예요.<br>먼저 백업해 두면 나중에 되돌릴 수 있어요.'; acts = [['close', '취소', 'light'], ['doclear', '지우기', '']]; }
    else { t = 'Keyboard shortcuts'; p = 'A–D 또는 1–4: 보기 고르기<br>Enter: Check Answer (한 문제씩 채점일 때)<br>← →: 이전 / 다음 문제<br>Esc: 열린 창 닫기'; acts = [['close', '닫기', '']]; }
    closeModal();
    app.insertAdjacentHTML('beforeend', '<div class="bb-modal-bg"><div class="bb-modal" role="dialog" aria-modal="true"><h3>' + t + '</h3><p>' + p + '</p><div class="acts">' +
      acts.map(function (a) { return '<button class="bb-btn ' + a[2] + '" data-a="' + a[0] + '">' + a[1] + '</button>'; }).join('') + '</div></div></div>');
  }
  function closeModal() { var m = $('.bb-modal-bg'); if (m) m.parentNode.removeChild(m); }

  /* ───────── events ───────── */
  function clampCount(v) { var mx = Math.max(1, poolItems().length); return Math.max(1, Math.min(mx, v | 0)); }
  function notesClick(a, v) {
    if (a === 'nf') { ui.nf = v; ui.nsk = ''; ui.note = null; ui.noteOpen = false; }
    else if (a === 'nsk') { ui.nsk = v; ui.note = null; }
    else if (a === 'nsort') ui.nsort = v;
    else if (a === 'nsel') { ui.note = v; ui.noteOpen = true; renderHome(); if (window.innerWidth <= 760) window.scrollTo(0, 0); return true; }
    else if (a === 'nback') ui.noteOpen = false;
    else if (a === 'nstar' || a === 'nconf') { var m = a === 'nstar' ? store.star : store.flag; if (m[v]) delete m[v]; else m[v] = 1; save(); }
    else if (a === 'ntry') {
      var e = noteEntry(ui.note), q = qcache[ui.note];
      if (!e || !q || ui.rev[ui.note]) return true;
      recordAnswer(e, q.key, v, e.ev);                         // re-solving here counts as an attempt
      ui.rev[ui.note] = { pick: v };
      save();
    }
    else if (a === 'nreveal') { ui.rev[ui.note] = { pick: '' }; refreshDetail(ui.note); return true; }
    else if (a === 'nhide') { delete ui.rev[ui.note]; refreshDetail(ui.note); return true; }
    else if (a === 'nload') { ui.tried[v] = 1; refreshDetail(v); return true; }
    else if (a === 'nretry') {
      var L = noteList().list;
      if (L.length) startTest(shuffle(noteItems(L)), '오답노트 ' + pick(NFILTERS, ui.nf)[1] + ' 다시 풀기');
      return true;
    }
    else if (a === 'nretry1') { var e1 = noteEntry(v); if (e1) startTest(noteItems([e1]), '오답노트 한 문제'); return true; }
    else if (a === 'nword') {
      ui.wordMode = !ui.wordMode;
      if (ui.wordMode) toast('모르는 단어를 누르면 단어장에 저장돼요');
      refreshDetail(ui.note);
      return true;
    }
    else if (a === 'pdfask') { modal('pdf', noteList().list.length); return true; }
    else if (a === 'pdfq' || a === 'pdffull') { closeModal(); makePdf(a === 'pdffull'); return true; }
    else return false;
    renderHome();
    return true;
  }
  function wordsClick(a, v) {
    var o = v != null ? store.words[v] : null;
    if (a === 'wf') { ui.wf = v; ui.word = null; ui.wordOpen = false; }
    else if (a === 'wsort') ui.wsort = v;
    else if (a === 'wsel') { ui.word = v; ui.wordOpen = true; renderHome(); if (window.innerWidth <= 760) window.scrollTo(0, 0); return true; }
    else if (a === 'wback') ui.wordOpen = false;
    else if (a === 'wok') { if (o) { o.ok = !o.ok; o.k = o.ok ? 2 : 0; save(); } }
    else if (a === 'wdel') { if (o) { delete store.words[v]; save(); toast('단어장에서 뺐어요: ' + o.w); ui.word = null; ui.wordOpen = false; } }
    else if (a === 'wsay') { if (o && o.dict && o.dict.au) { try { new Audio(o.dict.au).play().catch(function () {}); } catch (err) { /* no audio */ } } return true; }
    else if (a === 'wdict') { delete dictFail[v]; refreshWord(v); return true; }
    else if (a === 'wq') {
      if (!o || !o.ext) return true;
      var x = findItem(o.ext) || (SK[o.sk] ? { id: o.qid || '', ext: o.ext, sk: o.sk, d: o.d || 'M', b: 0, t: '' } : null);
      if (x) startTest([x], '단어장 문제'); else toast('문제 목록을 불러온 뒤 다시 눌러 주세요');
      return true;
    }
    else if (a === 'fcstart') {
      var keys = wordEntries().list.map(function (e) { return e.key; });
      if (keys.length) { ui.fc = { keys: shuffle(keys), i: 0, flip: false, yes: 0, no: 0, nos: [] }; renderFc(); }
      return true;
    }
    else if (a === 'fcflip') { if (ui.fc) { ui.fc.flip = !ui.fc.flip; renderFc(); } return true; }
    else if (a === 'fcyes' || a === 'fcno') { if (ui.fc && ui.fc.i < ui.fc.keys.length) fcAnswer(a === 'fcyes'); return true; }
    else if (a === 'fcagain') { var nos = ui.fc.nos; ui.fc = { keys: shuffle(nos.slice()), i: 0, flip: false, yes: 0, no: 0, nos: [] }; renderFc(); return true; }
    else if (a === 'fcclose') { ui.fc = null; }
    else return false;
    renderHome();
    return true;
  }
  function homeClick(a, k, v) {
    var p = store.prefs;
    if (notesClick(a, v) || wordsClick(a, v)) return;
    if (a === 'bkdown') { backupNow(); return; }
    if (a === 'bkup') { fileIn.click(); return; }
    if (a === 'rsmerge' || a === 'rsreplace') { finishRestore(a === 'rsreplace'); return; }
    if (a === 'gobackup') {
      ui.sel = 'backup'; ui.open = true;
      if (ui.tab === 'solve') { renderHome(); window.scrollTo(0, 0); } else { ui.goBackup = true; location.hash = ''; }
      return;
    }
    if (a === 'sel') { ui.sel = v; ui.open = true; renderHome(); if (window.innerWidth <= 760) window.scrollTo(0, 0); return; }
    if (a === 'back') { ui.open = false; renderHome(); return; }
    if (a === 'close') { closeModal(); return; }
    if (a === 'clearask') { modal('clear'); return; }
    if (a === 'doclear') { store.res = {}; store.log = {}; store.flag = {}; store.star = {}; store.memo = {}; store.sessions = []; save(); closeModal(); renderHome(); return; }
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
    if (wordActive() && !e.target.closest('.bb-modal-bg, .fc-bg') && pickWord(e)) return;
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
      else if (a === 'notes') { ui.nf = 'now'; ui.nsk = ''; ui.note = null; ui.noteOpen = false; if (location.hash === '#notes') showHome(); else location.hash = 'notes'; }
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
    else if (a === 'annotate') { S.annotate = !S.annotate; if (S.annotate) S.wordMode = false; }
    else if (a === 'wordmode') {
      S.wordMode = !S.wordMode;
      if (S.wordMode) { S.annotate = false; toast('모르는 단어를 누르면 단어장에 저장돼요'); }
    }
    else if (a === 'font') { S.font = Math.max(0, Math.min(FONTS.length - 1, S.font + (+v))); store.prefs.font = S.font; save(); }
    else if (a === 'info') { S.info = !S.info; store.prefs.info = S.info; save(); }
    else if (a === 'keys') { renderTest(); modal('keys'); return; }           // draw first so the dialog stays on screen
    else if (a === 'exit') { if (S.phase === 'answers') { showHome(); return; } renderTest(); modal('exit'); return; }
    else if (a === 'results') { showResults(); return; }
    else if (a === 'mark') S.mark[S.i] = !S.mark[S.i];
    else if (a === 'elim') S.elimMode = !S.elimMode;
    else if (a === 'pick' && S.phase === 'test' && !locked) {
      S.ans[S.i] = v;
      if (S.elim[S.i]) delete S.elim[S.i][v];                     // choosing a crossed-out answer brings it back
    } else if (a === 'checkone') {
      if (S.ans[S.i]) {
        S.checked[S.i] = true;
        record(S.i);
        if (S.mark[S.i]) store.flag[S.items[S.i].ext] = 1;
        save();
      }
    }
    else if (a === 'star') { var e1 = S.items[S.i].ext; if (store.star[e1]) delete store.star[e1]; else store.star[e1] = 1; save(); }
    else if (a === 'conf') {
      var e2 = S.items[S.i].ext;
      if (store.flag[e2]) { delete store.flag[e2]; S.mark[S.i] = false; } else { store.flag[e2] = 1; S.mark[S.i] = true; }
      save();
    }
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
  var memoT = null;
  app.addEventListener('input', function (e) {
    if (view !== 'home') return;
    var ia = e.target.getAttribute('data-a');
    if (ia === 'wmy') {
      var wk = e.target.getAttribute('data-v'), wo = store.words[wk];
      if (wo) { wo.my = e.target.value.slice(0, 500); clearTimeout(memoT); memoT = setTimeout(save, 400); }
      return;
    }
    if (ia === 'wsearch') {
      ui.wq = e.target.value;
      var wl = wordEntries().list, wc = $('#wCards'), wn = $('#wN');
      if (wc) wc.innerHTML = wordCards(wl);
      if (wn) wn.textContent = wl.length + '단어';
      return;
    }
    if (ia === 'memo') {
      var me = e.target.getAttribute('data-v'), val = e.target.value;
      if (val.trim()) store.memo[me] = val; else delete store.memo[me];
      clearTimeout(memoT);
      memoT = setTimeout(save, 400);
      return;
    }
    if (e.target.getAttribute('data-a') !== 'ids') return;
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
    var box = $('.bb-passage'); if (box && S) S.hl[S.i] = stripUw(box.innerHTML);
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
    S.hl[S.i] = stripUw(box.innerHTML);
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
    if (view === 'home' && ui.fc && !e.metaKey && !e.ctrlKey && !e.altKey) {   // flashcards: space flips, ← 몰라요, → 알아요
      var fk = { ' ': 'fcflip', Enter: 'fcflip', ArrowLeft: 'fcno', ArrowRight: 'fcyes', Escape: 'fcclose' }[e.key];
      if (fk && (fk === 'fcclose' || ui.fc.i < ui.fc.keys.length)) { e.preventDefault(); wordsClick(fk); }
      return;
    }
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

  // tabs (문제 풀기 / 오답노트) live in the address hash so the browser's back button and links work
  window.addEventListener('hashchange', function () {
    if (view !== 'home' && view !== 'result') return;
    if (ui.goBackup) { ui.goBackup = false; ui.sel = 'backup'; ui.open = true; } else ui.open = false;
    ui.noteOpen = false; ui.wordOpen = false; ui.fc = null;
    showHome();
  });

  window.addEventListener('beforeunload', function (e) {
    if (S && (S.phase === 'test' || S.phase === 'check') && Object.keys(S.ans).length) { e.preventDefault(); e.returnValue = ''; }
  });

  showHome();
})();
