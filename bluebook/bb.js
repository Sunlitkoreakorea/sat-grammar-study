/* Bluebook-style practice with College Board SAT Suite Question Bank questions.
   Nothing from College Board is stored in this repository: the question list and each question are fetched
   in the visitor's browser from the endpoint the official Question Bank site itself uses (it allows any origin).
   Only question ids with right/wrong, recent scores and settings are kept, in this browser's localStorage. */
(function () {
  'use strict';

  var API = 'https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital';
  var CB_SITE = 'https://satsuitequestionbank.collegeboard.org/';
  var SKILLS = [
    { cd: 'BOU', name: 'Boundaries', ko: '구두점 · 문장 연결', alto: 'ALTO Lesson 3, 12' },
    { cd: 'FSS', name: 'Form, Structure, and Sense', ko: '일치 · 대명사 · 시제 · 병렬', alto: 'ALTO Lesson 4–11' },
    { cd: 'TRA', name: 'Transitions', ko: '접속부사 · 전환어', alto: 'ALTO Lesson 12' }
  ];
  var DIFF_KO = { E: '쉬움', M: '보통', H: '어려움' };
  var DIFF_EN = { E: 'Easy', M: 'Medium', H: 'Hard' };
  var SEC_PER_Q = 71;                       // a Reading and Writing module: 32 minutes for 27 questions
  var LKEY = 'sat-cb-list-v1', SKEY = 'sat-bb-v1';

  var app = document.getElementById('app');
  var $ = function (s) { return app.querySelector(s); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var skillOf = function (cd) { return SKILLS.filter(function (s) { return s.cd === cd; })[0]; };
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function fmt(sec) { sec = Math.max(0, sec | 0); var m = Math.floor(sec / 60), s = sec % 60; return m + ':' + (s < 10 ? '0' : '') + s; }

  /* ───────── storage ───────── */
  var store = { res: {}, sessions: [], prefs: { skills: ['BOU', 'FSS', 'TRA'], diff: 'A', count: 10, timer: true, mode: 'new' } };
  try {
    var raw = JSON.parse(localStorage.getItem(SKEY) || 'null');
    if (raw) {
      store.res = raw.res || {};
      store.sessions = raw.sessions || [];
      for (var k in (raw.prefs || {})) store.prefs[k] = raw.prefs[k];
    }
  } catch (e) { /* storage unavailable: run without persistence */ }
  function save() { try { localStorage.setItem(SKEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }

  /* ───────── College Board data ───────── */
  var list = null, listP = null, qcache = {};
  function post(path, body) {
    return fetch(API + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }
  // SAT (asmtEventId 99), Reading and Writing (test 1): Standard English Conventions + Expression of Ideas
  function loadList() {
    if (list) return Promise.resolve(list);
    if (listP) return listP;
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem(LKEY) || 'null'); } catch (e) { cached = null; }
    if (cached && cached.items && Date.now() - cached.at < 864e5) { list = cached.items; return Promise.resolve(list); }
    listP = Promise.all(['SEC', 'EOI'].map(function (d) { return post('/get-questions', { asmtEventId: 99, test: 1, domain: d }); }))
      .then(function (lists) {
        var items = [];
        lists.forEach(function (l) {
          (l || []).forEach(function (x) {
            if (x && x.external_id && skillOf(x.skill_cd) && DIFF_KO[x.difficulty]) items.push({ id: x.questionId, ext: x.external_id, sk: x.skill_cd, d: x.difficulty });
          });
        });
        if (!items.length) throw new Error('empty list');
        list = items;
        try { localStorage.setItem(LKEY, JSON.stringify({ at: Date.now(), items: items })); } catch (e) { /* ignore */ }
        return items;
      })
      .catch(function (err) {
        listP = null;
        if (cached && cached.items) { list = cached.items; return list; }   // a stale list beats nothing
        throw err;
      });
    return listP;
  }

  // External HTML goes through an allow-list: plain formatting tags only, no attributes except the
  // screen-reader helpers College Board uses around blanks.
  var TAGS = { P: 1, SPAN: 1, BR: 1, U: 1, EM: 1, I: 1, STRONG: 1, B: 1, SUP: 1, SUB: 1, UL: 1, OL: 1, LI: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TD: 1, TH: 1, BLOCKQUOTE: 1 };
  var DROP = { SCRIPT: 1, STYLE: 1, TEMPLATE: 1, IFRAME: 1, OBJECT: 1, EMBED: 1, NOSCRIPT: 1, SVG: 1, MATH: 1, IMG: 1, VIDEO: 1, AUDIO: 1, LINK: 1, META: 1, FORM: 1, INPUT: 1, BUTTON: 1, TEXTAREA: 1, SELECT: 1 };
  function clean(html, inline) {
    var src = new DOMParser().parseFromString('<div>' + (html || '') + '</div>', 'text/html').body.firstChild;
    var box = document.createElement('div');
    (function walk(node, out) {
      Array.prototype.forEach.call(node.childNodes, function (c) {
        if (c.nodeType === 3) { out.appendChild(document.createTextNode(c.nodeValue)); return; }
        if (c.nodeType !== 1) return;
        var nm = c.nodeName.toUpperCase();
        if (DROP[nm]) return;
        if (!TAGS[nm]) { walk(c, out); return; }                 // unknown wrapper: keep its text only
        var el = document.createElement(inline && (nm === 'P' || nm === 'BLOCKQUOTE') ? 'span' : nm.toLowerCase());
        if (c.getAttribute('class') === 'sr-only') el.className = 'sr-only';
        if (c.getAttribute('aria-hidden') === 'true') el.setAttribute('aria-hidden', 'true');
        walk(c, el);
        out.appendChild(el);
      });
    })(src, box);
    return box.innerHTML;
  }
  function textOf(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    Array.prototype.forEach.call(d.querySelectorAll('.sr-only'), function (e) { e.parentNode.removeChild(e); });
    return d.textContent.replace(/\s+/g, ' ').trim();
  }
  function loadQ(ext) {
    if (qcache[ext]) return Promise.resolve(qcache[ext]);
    return post('/get-question', { external_id: ext }).then(function (d) {
      var opts = (d.answerOptions || []).slice(0, 4), key = (d.correct_answer || [])[0];
      if (opts.length !== 4 || !/^[A-D]$/.test(key || '')) throw new Error('unexpected question format');
      var q = { stim: clean(d.stimulus), stem: clean(d.stem), key: key, why: clean(d.rationale), opts: opts.map(function (o) { return clean(o.content, true); }) };
      q.text = textOf(q.stim || q.stem);
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
    items.forEach(function (x) { var v = store.res[x.id]; if (v === 1) s.good++; else if (v === 0) s.bad++; });
    return s;
  }

  /* ───────── icons ───────── */
  var I = {
    down: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    up: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pen: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 7l3 3" stroke="currentColor" stroke-width="1.8"/></svg>',
    dots: '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.9" fill="currentColor"/><circle cx="12" cy="12" r="1.9" fill="currentColor"/><circle cx="12" cy="19" r="1.9" fill="currentColor"/></svg>',
    mark: '<svg width="16" height="20" viewBox="0 0 18 22" aria-hidden="true"><path d="M2 2h14v18l-7-5-7 5z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>',
    flag: '<svg class="flag" width="12" height="15" viewBox="0 0 18 22" aria-hidden="true"><path d="M2 2h14v18l-7-5-7 5z" fill="#c8102e"/></svg>',
    pin: '<svg class="pin" width="14" height="16" viewBox="0 0 24 28" aria-hidden="true"><path d="M12 1a9 9 0 0 0-9 9c0 7 9 17 9 17s9-10 9-17a9 9 0 0 0-9-9z" fill="currentColor"/><circle cx="12" cy="10" r="3.4" fill="#fff"/></svg>',
    clock: '<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    grip: '<svg width="14" height="20" viewBox="0 0 14 20" aria-hidden="true"><path d="M5 4l-4 6 4 6M9 4l4 6-4 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ───────── setup screen ───────── */
  var view = 'home', S = null, timerId = null;

  function seg(name, cur, opts) {
    return '<div class="seg" role="group">' + opts.map(function (o) {
      return '<button type="button" class="' + (String(o[0]) === String(cur) ? 'on' : '') + '" data-a="' + name + '" data-v="' + o[0] + '"' + (o[2] ? ' disabled' : '') + '>' + o[1] + '</button>';
    }).join('') + '</div>';
  }
  function failHtml(back) {
    return '<div class="panel fail"><b>College Board에서 문제를 불러오지 못했어요</b><div class="acts">' +
      (back ? '<button class="pill ghost" data-a="home">처음으로</button>' : '<button class="pill ghost" data-a="reload">다시 시도</button>') +
      '<a class="pill" style="display:inline-flex;align-items:center;text-decoration:none" href="' + CB_SITE + '" target="_blank" rel="noopener">공식 사이트에서 풀기</a></div></div>';
  }
  function poolFor(P) {
    return list.filter(function (x) { return P.skills.indexOf(x.sk) >= 0 && (P.diff === 'A' || x.d === P.diff); });
  }
  function buildSet() {
    var P = store.prefs, pool = poolFor(P);
    var wrongOnly = P.mode === 'wrong' && stats(pool).bad > 0;
    var picked = wrongOnly ? shuffle(pool.filter(function (x) { return store.res[x.id] === 0; }))
      : shuffle(pool.filter(function (x) { return store.res[x.id] === undefined; })).concat(shuffle(pool.filter(function (x) { return store.res[x.id] !== undefined; })));
    return picked.slice(0, P.count);
  }

  function showHome() {
    stopTimer(); S = null; view = 'home';
    document.title = 'Bluebook 연습 · 공식 문제';
    app.className = 'home';
    app.innerHTML = '<header class="home-top"><a class="home-back" href="../">← SAT 그래머 스터디</a></header>' +
      '<main class="home-main"><h1>Reading and Writing 연습</h1><p class="home-sub">College Board 공식 문제은행 문제를 Bluebook 화면으로 풀어요.</p>' +
      '<div id="homeBody"><div class="panel home-loading">문제 목록을 불러오는 중…</div></div>' +
      '<p class="home-src">문제 출처: <a href="' + CB_SITE + '" target="_blank" rel="noopener">College Board SAT Suite Question Bank</a>. 문제는 열 때마다 College Board에서 불러오고 이 사이트에는 저장하지 않아요. ' +
      'College Board, Bluebook과 관계없는 개인 연습용 화면이에요.</p></main>';
    window.scrollTo(0, 0);
    loadList().then(renderHomeBody, function () { var b = $('#homeBody'); if (b && view === 'home') b.innerHTML = failHtml(); });
  }
  function renderHomeBody() {
    var body = $('#homeBody');
    if (view !== 'home' || !body) return;
    var P = store.prefs;
    var bySkills = list.filter(function (x) { return P.skills.indexOf(x.sk) >= 0; });
    var pool = poolFor(P), ps = stats(pool);
    if (P.mode === 'wrong' && !ps.bad) P.mode = 'new';
    var setN = Math.min(P.count, P.mode === 'wrong' ? ps.bad : pool.length);
    var skills = SKILLS.map(function (s) {
      var t = stats(list.filter(function (x) { return x.sk === s.cd; })), on = P.skills.indexOf(s.cd) >= 0;
      return '<button type="button" class="skill' + (on ? ' on' : '') + '" data-a="skill" data-v="' + s.cd + '" aria-pressed="' + on + '">' +
        '<span class="chk">' + (on ? I.check : '') + '</span><div class="s-alto">' + esc(s.alto) + '</div><div class="s-name">' + esc(s.name) + '</div>' +
        '<div class="s-ko">' + esc(s.ko) + '</div><div class="s-meta">' + t.n + '문제 · 정답 ' + t.good + (t.bad ? ' · 오답 ' + t.bad : '') + '</div></button>';
    }).join('');
    var diffOpts = [['A', '전체 ' + bySkills.length]].concat(['E', 'M', 'H'].map(function (d) {
      return [d, DIFF_KO[d] + ' ' + bySkills.filter(function (x) { return x.d === d; }).length];
    }));
    var h = '<div class="panel"><h2>영역</h2><div class="skills">' + skills + '</div></div>' +
      '<div class="panel">' +
      '<div class="row"><span class="lab">난이도</span>' + seg('diff', P.diff, diffOpts) + '</div>' +
      '<div class="row"><span class="lab">문제 수</span>' + seg('count', P.count, [[10, '10'], [20, '20'], [27, '27 · 1모듈']]) + '</div>' +
      '<div class="row"><span class="lab">고르기</span>' + seg('mode', P.mode, [['new', '안 푼 문제 먼저'], ['wrong', '틀린 문제만 ' + ps.bad, !ps.bad]]) + '</div>' +
      '<div class="row"><span class="lab">타이머</span><label class="switch"><input type="checkbox" data-a="timer"' + (P.timer ? ' checked' : '') + '><span class="track"></span>' +
      '<span>' + (P.timer ? '켜짐 · 문제당 71초' : '꺼짐') + '</span></label></div></div>' +
      '<div class="panel start-row"><div class="start-info">' +
      (!P.skills.length ? '영역을 하나 이상 고르세요' : setN ? setN + '문제' + (P.timer ? ' · ' + fmt(setN * SEC_PER_Q) : '') : '조건에 맞는 문제가 없어요') +
      '</div><button class="pill" data-a="start"' + (setN ? '' : ' disabled') + '>시작하기</button></div>';
    if (store.sessions.length) {
      h += '<div class="panel"><h2>최근 기록</h2><ul class="recent">' + store.sessions.slice(0, 6).map(function (s) {
        var d = new Date(s.at);
        return '<li><span>' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + ' · ' +
          esc(s.skills.map(function (c) { return skillOf(c) ? skillOf(c).name : c; }).join(', ')) + (s.diff !== 'A' ? ' · ' + DIFF_KO[s.diff] : '') + '</span>' +
          '<span class="r-score">' + s.ok + ' / ' + s.n + '</span></li>';
      }).join('') + '</ul></div>';
    }
    body.innerHTML = h;
  }

  /* ───────── loading a set ───────── */
  function startTest(items) {
    if (!items.length) return;
    stopTimer(); view = 'prep';
    app.className = '';
    app.innerHTML = '<div class="prep"><div><h2>Preparing your questions…</h2><p>College Board에서 문제를 불러오는 중 · <span id="pc">0</span> / ' + items.length + '</p>' +
      '<div class="bar"><span id="pb" style="width:0%"></span></div></div></div>';
    fetchAll(items, function (d, n) {
      var pc = $('#pc'), pb = $('#pb');
      if (pc) pc.textContent = d;
      if (pb) pb.style.width = Math.round(d / n * 100) + '%';
    }).then(function (ready) {
      if (view !== 'prep') return;
      if (!ready.length) { app.className = 'home'; app.innerHTML = '<main class="home-main">' + failHtml(true) + '</main>'; return; }
      var P = store.prefs;
      S = {
        items: ready, i: 0, ans: {}, mark: {}, elim: {}, hl: {}, phase: 'test',
        elimMode: false, annotate: false, nav: false, dir: false, more: false, hide: false,
        timer: P.timer, left: ready.length * SEC_PER_Q, start: Date.now(), end: 0, split: 50,
        skills: P.skills.slice(), diff: P.diff, dropped: items.length - ready.length
      };
      view = 'test';
      renderTest();
      startTimer();
    });
  }

  /* ───────── timer ───────── */
  function startTimer() { stopTimer(); if (S && S.timer) timerId = setInterval(tick, 1000); }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
  function tick() {
    if (!S || (S.phase !== 'test' && S.phase !== 'check')) return stopTimer();
    S.left--;
    if (S.left === 300 && S.hide) { S.hide = false; renderTest(); return; }   // like Bluebook: the clock comes back for the last 5 minutes
    var t = $('.bb-time');
    if (t) t.textContent = fmt(S.left);
    if (S.left <= 0) { stopTimer(); modal('timeup'); }
  }

  /* ───────── test / review screens (Bluebook layout) ───────── */
  function cell(j) {
    var x = S.items[j], cls = 'bb-cell';
    if (S.phase === 'answers') cls += S.ans[j] === qcache[x.ext].key ? ' r-ok' : ' r-bad';
    else if (S.ans[j]) cls += ' done';
    return '<button class="' + cls + '" data-a="goto" data-v="' + j + '" aria-label="Question ' + (j + 1) + '">' +
      (j === S.i && S.phase !== 'check' ? I.pin : '') + (S.mark[j] && S.phase !== 'answers' ? I.flag : '') + (j + 1) + '</button>';
  }
  function legend() {
    if (S.phase === 'answers') return '<div class="bb-legend"><span>' + I.pin + ' Current</span><span><i class="sq ok"></i> Correct</span><span><i class="sq bad"></i> Incorrect</span></div>';
    return '<div class="bb-legend">' + (S.phase === 'check' ? '' : '<span>' + I.pin + ' Current</span>') +
      '<span><i class="sq"></i> Unanswered</span><span>' + I.flag + ' For Review</span></div>';
  }
  function grid() { return '<div class="bb-grid">' + S.items.map(function (x, j) { return cell(j); }).join('') + '</div>'; }

  function renderTest() {
    if (!S) return;
    var same = S._shown === S.i + ':' + S.phase, keep = null;
    if (same) {
      var l0 = $('.bb-left'), r0 = $('.bb-right'), m0 = $('.bb-main');
      keep = { l: l0 ? l0.scrollTop : 0, r: r0 ? r0.scrollTop : 0, m: m0 ? m0.scrollTop : 0 };
    }
    var x = S.items[S.i], q = qcache[x.ext], n = S.items.length, rev = S.phase === 'answers';
    document.title = (rev ? 'Review' : 'Question ' + (S.i + 1)) + ' · Bluebook 연습';
    app.className = '';

    var top = '<header class="bb-top"><div class="bb-top-l"><div class="bb-sec">' + (rev ? 'Review: Reading and Writing' : 'Section 1: Reading and Writing') + '</div>' +
      '<button class="bb-dir" data-a="dir" aria-expanded="' + S.dir + '">Directions ' + (S.dir ? I.up : I.down) + '</button></div><div class="bb-top-c">';
    if (rev) {
      var okN = S.items.filter(function (y, j) { return S.ans[j] === qcache[y.ext].key; }).length;
      top += '<div class="bb-review-tag">' + okN + ' / ' + n + ' correct</div>';
    } else if (S.timer) {
      top += S.hide ? '<button class="bb-hide" data-a="hide">' + I.clock + ' Show</button>'
        : '<div class="bb-time">' + fmt(S.left) + '</div><button class="bb-hide" data-a="hide">Hide</button>';
    }
    top += '</div><div class="bb-top-r">' +
      (S.phase === 'check' ? '' : '<button class="bb-tool' + (S.annotate ? ' on' : '') + '" data-a="annotate" aria-pressed="' + S.annotate + '" title="Select passage text to highlight it">' + I.pen + '<span>Highlights &amp; Notes</span></button>') +
      '<button class="bb-tool" data-a="more" aria-expanded="' + S.more + '">' + I.dots + '<span>More</span></button></div></header><div class="dash"></div>';

    var pops = '';
    if (S.dir) {
      pops += '<div class="bb-drop bb-dirpanel"><p>This section tests a range of reading and writing skills. Every question comes with a short passage (sometimes two). ' +
        'Read the passage and the question carefully, then choose the answer the passage best supports.</p>' +
        '<p>Each question has four answer choices and one best answer.</p><div class="acts"><button class="bb-btn" data-a="dir">Close</button></div></div>';
    }
    if (S.more) {
      pops += '<div class="bb-drop bb-more">' + (rev ? '<button data-a="results">결과 화면으로</button>' : '') +
        '<button data-a="keys">Keyboard shortcuts</button><button data-a="exit">' + (rev ? '처음 화면으로' : 'Exit practice') + '</button></div>';
    }

    var mid;
    if (S.phase === 'check') {
      mid = '<main class="bb-check"><div class="bb-check-in"><h2>Check Your Work</h2>' +
        '<p>Before you submit, look over any questions you marked for review or left unanswered. Select a question number to go back to it.</p>' +
        '<div class="bb-check-card"><div class="bb-navhead"><b>Section 1: Reading and Writing Questions</b></div>' + legend() + grid() + '</div></div></main>';
    } else {
      var passage = q.stim ? (S.hl[S.i] || q.stim) : '';
      var head = '<div class="bb-qhead"><span class="bb-qnum">' + (S.i + 1) + '</span>' +
        (rev ? '<span class="bb-mark" style="cursor:default">' + esc(skillOf(x.sk).name) + ' · ' + DIFF_EN[x.d] + '</span>'
          : '<button class="bb-mark' + (S.mark[S.i] ? ' on' : '') + '" data-a="mark" aria-pressed="' + !!S.mark[S.i] + '">' + I.mark + 'Mark for Review</button>' +
            '<button class="bb-abc' + (S.elimMode ? ' on' : '') + '" data-a="elim" aria-pressed="' + S.elimMode + '" title="Cross out answer choices"><span>ABC</span></button>') +
        '</div>';
      var el = S.elim[S.i] || {}, mine = S.ans[S.i];
      var choices = '<div class="bb-choices">' + q.opts.map(function (o, k) {
        var L = 'ABCD'.charAt(k), cls = 'bb-choice', tag = '';
        if (rev) {
          if (L === q.key) { cls += ' key'; tag = '<span class="bb-tag">' + (mine === L ? 'Your answer · Correct' : 'Correct answer') + '</span>'; }
          else if (L === mine) { cls += ' miss'; tag = '<span class="bb-tag">Your answer</span>'; }
        } else {
          if (mine === L) cls += ' sel';
          if (el[L]) cls += ' out';
        }
        var side = '';
        if (!rev && S.elimMode) {
          side = el[L] ? '<button class="bb-undo" data-a="unelim" data-v="' + L + '">Undo</button>'
            : '<button class="bb-x" data-a="elimone" data-v="' + L + '" aria-label="Cross out choice ' + L + '">' + L + '</button>';
        }
        return '<div class="bb-ch-row"><button class="' + cls + '" data-a="pick" data-v="' + L + '"' + (rev ? ' disabled' : '') + '>' +
          '<span class="bb-letter">' + L + '</span><span class="bb-ch-text">' + o + '</span>' + tag + '</button>' + side + '</div>';
      }).join('') + '</div>';
      var after = '';
      if (rev) {
        var ok = mine === q.key;
        after = '<div class="bb-verdict ' + (ok ? 'ok' : 'bad') + '">' + (ok ? 'Correct' : mine ? 'Incorrect — you chose ' + mine + ', the answer is ' + q.key : 'Not answered — the answer is ' + q.key) + '</div>' +
          '<div class="bb-why"><div class="bb-why-h">EXPLANATION</div>' + q.why + '</div>';
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

    app.innerHTML = '<div class="bb' + (S.annotate ? ' annotate' : '') + '">' + top + pops + mid + foot + '</div>';
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
      store.res[x.id] = good ? 1 : 0;
    });
    store.sessions.unshift({ at: S.end, n: S.items.length, ok: ok, skills: S.skills, diff: S.diff, secs: Math.round((S.end - S.start) / 1000) });
    store.sessions = store.sessions.slice(0, 30);
    save();
    showResults();
  }
  function showResults() {
    view = 'result'; S.phase = 'result'; S.nav = S.more = S.dir = false;
    document.title = '결과 · Bluebook 연습';
    var n = S.items.length, ok = S.items.filter(function (x, j) { return S.ans[j] === qcache[x.ext].key; }).length;
    var wrong = n - ok, secs = Math.round(((S.end || Date.now()) - S.start) / 1000);
    app.className = 'res';
    app.innerHTML = '<header class="home-top"><a class="home-back" href="../">← SAT 그래머 스터디</a></header><main class="res-main">' +
      '<div class="res-score"><b>' + ok + '</b><span>/ ' + n + '</span></div>' +
      '<p class="res-sub">정답률 ' + Math.round(ok / n * 100) + '% · 걸린 시간 ' + fmt(secs) + (S.dropped ? ' · 불러오지 못한 ' + S.dropped + '문제는 빠졌어요' : '') + '</p>' +
      '<div class="res-acts"><button class="pill" data-a="open" data-v="0">해설 보기</button>' +
      (wrong ? '<button class="pill ghost" data-a="retrywrong">틀린 문제 다시 풀기 (' + wrong + ')</button>' : '') +
      '<button class="pill ghost" data-a="again">같은 조건으로 새로 풀기</button><button class="pill ghost" data-a="home">처음 화면</button></div>' +
      '<table class="res-table"><thead><tr><th>#</th><th></th><th>영역</th><th>난이도</th><th>정답</th><th>내 답</th><th>문제</th></tr></thead><tbody>' +
      S.items.map(function (x, j) {
        var q = qcache[x.ext], good = S.ans[j] === q.key;
        return '<tr class="row-link" data-a="open" data-v="' + j + '"><td>' + (j + 1) + '</td><td class="mk ' + (good ? 'ok' : 'bad') + '">' + (good ? '✓' : '✗') + '</td>' +
          '<td class="sk">' + esc(skillOf(x.sk).name) + '</td><td>' + DIFF_KO[x.d] + '</td><td>' + q.key + '</td><td>' + (S.ans[j] || '–') + '</td>' +
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
    else { t = 'Keyboard shortcuts'; p = 'A–D 또는 1–4: 보기 고르기<br>← →: 이전 / 다음 문제<br>Esc: 열린 창 닫기'; acts = [['close', '닫기', '']]; }
    closeModal();
    app.insertAdjacentHTML('beforeend', '<div class="bb-modal-bg"><div class="bb-modal" role="dialog" aria-modal="true"><h3>' + t + '</h3><p>' + p + '</p><div class="acts">' +
      acts.map(function (a) { return '<button class="bb-btn ' + a[2] + '" data-a="' + a[0] + '">' + a[1] + '</button>'; }).join('') + '</div></div></div>');
  }
  function closeModal() { var m = $('.bb-modal-bg'); if (m) m.parentNode.removeChild(m); }

  /* ───────── events ───────── */
  app.addEventListener('click', function (e) {
    if (e.target.classList && e.target.classList.contains('bb-modal-bg')) { closeModal(); return; }
    var hl = e.target.closest('mark.hl');
    if (hl && S && S.annotate && !window.getSelection().toString()) { unwrap(hl); return; }   // tap a highlight to remove it
    var t = e.target.closest('[data-a]');
    if (!t || t.tagName === 'INPUT') return;
    var a = t.getAttribute('data-a'), v = t.getAttribute('data-v'), P = store.prefs;

    if (view === 'home') {
      if (a === 'skill') {
        var i = P.skills.indexOf(v);
        if (i >= 0) P.skills.splice(i, 1); else P.skills.push(v);
        P.skills.sort(function (x, y) { return SKILLS.map(function (s) { return s.cd; }).indexOf(x) - SKILLS.map(function (s) { return s.cd; }).indexOf(y); });
      } else if (a === 'diff') P.diff = v;
      else if (a === 'count') P.count = +v;
      else if (a === 'mode') P.mode = v;
      else if (a === 'start') { save(); startTest(buildSet()); return; }
      else if (a === 'reload') { list = null; listP = null; showHome(); return; }
      else return;
      save(); renderHomeBody(); return;
    }
    if (view === 'result') {
      if (a === 'open') { S.phase = 'answers'; S.i = +v; view = 'test'; S.annotate = false; renderTest(); window.scrollTo(0, 0); }
      else if (a === 'retrywrong') startTest(S.items.filter(function (x, j) { return S.ans[j] !== qcache[x.ext].key; }));
      else if (a === 'again') startTest(buildSet());
      else if (a === 'home') showHome();
      return;
    }
    if (a === 'home') { closeModal(); showHome(); return; }
    if (!S) return;

    // popups close when anything else is chosen
    var keepNav = a === 'nav' || a === 'goto', keepMore = a === 'more', keepDir = a === 'dir';
    if (!keepNav) S.nav = false;
    if (!keepMore) S.more = false;
    if (!keepDir) S.dir = false;

    if (a === 'close') { closeModal(); }
    else if (a === 'dosubmit') { closeModal(); submit(); return; }
    else if (a === 'dir') S.dir = !S.dir;
    else if (a === 'more') S.more = !S.more;
    else if (a === 'nav') S.nav = !S.nav;
    else if (a === 'hide') S.hide = !S.hide;
    else if (a === 'annotate') S.annotate = !S.annotate;
    else if (a === 'keys') { modal('keys'); }
    else if (a === 'exit') { if (S.phase === 'answers') { showHome(); return; } modal('exit'); }
    else if (a === 'results') { showResults(); return; }
    else if (a === 'mark') S.mark[S.i] = !S.mark[S.i];
    else if (a === 'elim') S.elimMode = !S.elimMode;
    else if (a === 'pick' && S.phase === 'test') {
      S.ans[S.i] = v;
      if (S.elim[S.i]) delete S.elim[S.i][v];                     // choosing a crossed-out answer brings it back
    } else if (a === 'elimone') {
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
    if (view === 'home' && e.target.getAttribute('data-a') === 'timer') { store.prefs.timer = e.target.checked; save(); renderHomeBody(); }
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
    else if (e.key === 'ArrowRight' && S.phase !== 'check') { var n = app.querySelector('[data-a="next"]'); if (n) { e.preventDefault(); n.click(); } }
    else if (e.key === 'ArrowLeft') { var bk = app.querySelector('[data-a="back"]'); if (bk) { e.preventDefault(); bk.click(); } }
  });

  window.addEventListener('beforeunload', function (e) {
    if (S && (S.phase === 'test' || S.phase === 'check') && Object.keys(S.ans).length) { e.preventDefault(); e.returnValue = ''; }
  });

  showHome();
})();
