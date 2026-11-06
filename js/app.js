(function () {
  'use strict';

  var D = window.SAT_DATA;
  var chapters = D.chapters.slice().sort(function (a, b) { return a.order - b.order; });
  var LABELS = D.labels || {};
  var byId = {};
  chapters.forEach(function (c) { byId[c.id] = c; });

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var KEY = 'sat-grammar-progress-v1';
  var st = { read: {}, quiz: {}, item: {}, last: null, shuffle: false };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { var o = JSON.parse(raw); st.read = o.read || {}; st.quiz = o.quiz || {}; st.item = o.item || {}; st.last = o.last || null; st.shuffle = !!o.shuffle; }
  } catch (e) { /* storage unavailable: run without persistence */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ } }

  var pkey = function (ch, p) { return ch.id + '/' + p.id; };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  /* ───────────── language (EN original / KO explanations) ───────────── */
  // EN: the book's own English text. KO: explanations in Korean, examples & quiz sentences stay English.
  var LKEY = 'sat-grammar-lang';
  var lang = 'en';
  try { if (localStorage.getItem(LKEY) === 'ko') lang = 'ko'; } catch (e) { /* ignore */ }
  var KO = D.ko || {};
  var kch = function (ch) { return lang === 'ko' ? (KO[ch.id] || null) : null; };
  var kpart = function (ch, p) { var k = kch(ch); return (k && k.parts && k.parts[p.id]) || null; };
  var chTitle = function (ch) { var k = kch(ch); return (k && k.title) || ch.title; };
  var chShort = function (ch) { var k = kch(ch); return (k && k.short) || ch.short || ch.title; };
  var pTitle = function (ch, p) { var k = kpart(ch, p); return (k && k.title) || p.title; };
  var pInstr = function (ch, p) { var k = kpart(ch, p); return (k && k.instr) || p.instr; };

  // Merge a Korean overlay entry into one content block. Entries: null/0 keep, string = main text,
  // array = list items / box contents, object = merged over the block (tags, tbl and tree patches supported).
  function localizeBlock(b, ov) {
    if (ov === undefined || ov === null || ov === 0) return b;
    if (typeof b === 'string') return typeof ov === 'string' ? ov : b;
    if (typeof ov === 'string') {
      if (b.h !== undefined) return { h: ov };
      if (b.h4 !== undefined) return { h4: ov };
      if (b.p !== undefined) return Object.assign({}, b, { p: ov });
      if (b.note !== undefined) return Object.assign({}, b, { note: ov });
      return b;
    }
    if (Array.isArray(ov)) {
      if (b.list) return Object.assign({}, b, { list: ov });
      if (b.box) return Object.assign({}, b, { box: b.box.map(function (x, i) { return localizeBlock(x, ov[i]); }) });
      return b;
    }
    var out = Object.assign({}, b, ov);
    delete out.tags; delete out.tbl;
    if (ov.tags && b.ex) {
      out.lines = b.lines.map(function (l, i) {
        var t = ov.tags[i];
        if (t === undefined || t === null) return l;
        return typeof l === 'string' ? [l, t] : [l[0], t, l[2]];
      });
    }
    if (ov.tbl && b.table) {
      var t2 = Object.assign({}, b.table);
      if (ov.tbl.head) t2.head = ov.tbl.head;
      if (ov.tbl.rows) t2.rows = ov.tbl.rows;
      if (ov.tbl.cells) {
        t2.rows = t2.rows.map(function (r) { return r.slice(); });
        ov.tbl.cells.forEach(function (c) { t2.rows[c[0]][c[1]] = c[2]; });
      }
      out.table = t2;
    }
    return out;
  }
  function blocksFor(ch, p) {
    var k = kpart(ch, p);
    if (!k || !k.blocks) return p.blocks;
    return p.blocks.map(function (b, i) { return localizeBlock(b, k.blocks[i]); });
  }

  /* ───────────── progress ───────────── */
  function partDone(ch, p) {
    var k = pkey(ch, p);
    return p.kind === 'quiz' ? !!st.quiz[k] : !!st.read[k];
  }
  function chProgress(ch) {
    var n = ch.parts.length, d = 0;
    ch.parts.forEach(function (p) { if (partDone(ch, p)) d++; });
    return { done: d, total: n, pct: n ? Math.round(d / n * 100) : 0 };
  }
  function overall() {
    var d = 0, n = 0;
    chapters.forEach(function (c) { var p = chProgress(c); d += p.done; n += p.total; });
    return { done: d, total: n, pct: n ? Math.round(d / n * 100) : 0 };
  }
  function wrongList() {
    var out = [];
    chapters.forEach(function (ch) {
      ch.parts.forEach(function (p) {
        if (p.kind !== 'quiz') return;
        p.items.forEach(function (it, i) {
          if (st.item[pkey(ch, p) + '#' + i] === 0) out.push({ ch: ch, p: p, i: i, it: it });
        });
      });
    });
    return out;
  }
  function quizTotals() {
    var q = 0, ok = 0, bad = 0;
    chapters.forEach(function (ch) {
      ch.parts.forEach(function (p) {
        if (p.kind !== 'quiz') return;
        p.items.forEach(function (it, i) {
          q++;
          var v = st.item[pkey(ch, p) + '#' + i];
          if (v === 1) ok++; else if (v === 0) bad++;
        });
      });
    });
    return { total: q, ok: ok, bad: bad };
  }

  /* ───────────── sidebar ───────────── */
  function renderSide(activeId) {
    var all = overall();
    var wc = wrongList().length;
    var h = '<div class="brand"><h1>ALTO SAT Grammar</h1><p>챕터형 학습 · 개념 + 퀴즈</p>' +
      '<div class="total-bar"><span style="width:' + all.pct + '%"></span></div>' +
      '<div class="total-txt">전체 ' + all.done + ' / ' + all.total + ' 단계 · ' + all.pct + '%</div></div>';
    h += '<ul class="nav-list">';
    h += '<li><a class="nav-item' + (activeId === 'home' ? ' active' : '') + '" href="#/"><span class="nav-badge">⌂</span><span class="nav-txt"><b>홈</b><small>전체 진행 현황</small></span></a></li>';
    h += '<li><a class="nav-item' + (activeId === 'practice' ? ' active' : '') + '" href="#/practice"><span class="nav-badge">✎</span><span class="nav-txt"><b>문제만 풀기</b><small>레슨별 문제 모음</small></span></a></li>';
    h += '<li><a class="nav-item' + (activeId === 'wrong' ? ' active' : '') + '" href="#/wrong"><span class="nav-badge">✗</span><span class="nav-txt"><b>오답노트</b><small>틀린 문제 모아 풀기</small></span>' +
      (wc ? '<span class="pill-count">' + wc + '</span>' : '') + '</a></li>';
    h += '<li class="nav-sep">Chapters</li>';
    chapters.forEach(function (ch) {
      var p = chProgress(ch);
      h += '<li><a class="nav-item' + (activeId === ch.id ? ' active' : '') + (p.done === p.total && p.total ? ' done' : '') + '" href="#/c/' + ch.id + '">' +
        '<span class="nav-badge">' + esc(ch.no) + '</span>' +
        '<span class="nav-txt"><b>' + esc(chShort(ch)) + '</b><small>' + esc(ch.ko || '') + '</small></span>' +
        '<span class="nav-prog">' + (p.done === p.total && p.total ? '✓' : p.done + '/' + p.total) + '</span></a></li>';
    });
    h += '</ul>';
    // brand and nav are re-rendered; the search form between them is static so typing never loses focus
    var cut = h.indexOf('<ul class="nav-list">');
    $('#sideBrand').innerHTML = h.slice(0, cut);
    $('#sideNav').innerHTML = h.slice(cut);
  }

  /* ───────────── content blocks ───────────── */
  function tag(t, kind) { return '<span class="tag' + (kind ? ' ' + kind : '') + '">' + t + '</span>'; }

  function treeNode(n) {
    if (typeof n === 'string') {
      var cls = '', t = n;
      if (t[0] === '!') { cls = ' bad'; t = t.slice(1); } else if (t[0] === '+') { cls = ' good'; t = t.slice(1); }
      return '<div class="tnode"><span class="tres' + cls + '">' + t + '</span></div>';
    }
    var br = n.b || [['YES', n.y], ['NO', n.n]].filter(function (x) { return x[1] != null; });
    var h = '<div class="tnode"><span class="tq">' + n.q + '</span>';
    if (br.length) {
      h += '<div class="tbranches">';
      br.forEach(function (b) {
        var k = b[0] === 'YES' ? 'y' : b[0] === 'NO' ? 'n' : '';
        h += '<div class="tbr"><span class="tlabel ' + k + '">' + b[0] + '</span><div class="tbr-body">' + treeNode(b[1]) + '</div></div>';
      });
      h += '</div>';
    }
    return h + '</div>';
  }

  function block(b) {
    if (typeof b === 'string') return '<p>' + b + '</p>';
    if (b.h) return '<h3>' + b.h + '</h3>';
    if (b.h4) return '<h4>' + b.h4 + '</h4>';
    if (b.p) return '<p' + (b.cls ? ' class="' + b.cls + '"' : '') + '>' + b.p + '</p>';
    if (b.list) {
      var tg = b.ol ? 'ol' : 'ul';
      return '<' + tg + '>' + b.list.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</' + tg + '>';
    }
    if (b.ex) {
      var lines = b.lines.map(function (l) {
        if (typeof l === 'string') return '<div class="ex-line"><span>' + l + '</span></div>';
        return '<div class="ex-line"><span>' + l[0] + '</span>' + (l[1] ? tag(l[1], l[2]) : '') + '</div>';
      }).join('');
      return '<div class="ex"><span class="ex-label">' + b.ex + '</span><div class="ex-lines">' + lines + '</div></div>';
    }
    if (b.note) {
      return '<div class="callout ' + (b.kind || '') + '">' + (b.title ? '<span class="callout-t">' + b.title + '</span>' : '') + b.note + '</div>';
    }
    if (b.box) {
      return '<div class="rulebox">' + (Array.isArray(b.box) ? b.box : [b.box]).map(block).join('') + '</div>';
    }
    if (b.words) {
      return '<div class="wordgrid">' + (b.title ? '<div class="wg-title">' + b.title + '</div>' : '') +
        '<div class="wg-cols">' + b.words.map(function (w) {
          var hl = w[0] === '*';
          return '<div' + (hl ? ' class="hl"' : '') + '>' + (hl ? w.slice(1) : w) + '</div>';
        }).join('') + '</div></div>';
    }
    if (b.table) {
      var t = b.table;
      var th = t.head ? '<tr>' + t.head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>' : '';
      var tr = t.rows.map(function (r) {
        return '<tr>' + r.map(function (c) {
          var hl = typeof c === 'string' && c[0] === '*';
          return '<td' + (hl ? ' class="hl"' : '') + '>' + (hl ? c.slice(1) : c) + '</td>';
        }).join('') + '</tr>';
      }).join('');
      return '<div class="tbl-wrap"><table class="tbl">' + th + tr + '</table></div>';
    }
    if (b.tree) {
      return '<div class="tree">' + (b.tree.title ? '<div class="tree-title">' + b.tree.title + '</div>' : '') + treeNode(b.tree.root) + '</div>';
    }
    return '';
  }

  /* ───────────── navigation helpers ───────────── */
  function flatParts() {
    var out = [];
    chapters.forEach(function (ch) { ch.parts.forEach(function (p, i) { out.push({ ch: ch, p: p, i: i }); }); });
    return out;
  }
  function neighbor(ch, idx, dir) {
    var flat = flatParts();
    var pos = flat.findIndex(function (x) { return x.ch === ch && x.i === idx; });
    var n = flat[pos + dir];
    return n || null;
  }
  function href(ch, p) { return '#/c/' + ch.id + '/' + encodeURIComponent(p.id); }
  function partLabel(n) { return n.ch.no + ' · ' + n.p.title; }
  function defaultPart(ch) {
    for (var i = 0; i < ch.parts.length; i++) if (!partDone(ch, ch.parts[i])) return i;
    return 0;
  }

  /* ───────────── views ───────────── */
  var main = $('#main');
  var run = null;       // current quiz run
  var runCtx = null;    // { ch, p } the quiz currently shown (null for wrong-notebook)

  function setTitle(t) { document.title = t ? t + ' · ALTO SAT Grammar' : 'ALTO SAT Grammar 챕터 학습'; }
  function toTop() { window.scrollTo(0, 0); }

  function showHome() {
    run = null; runCtx = null;
    setTitle('');
    renderSide('home');
    var all = overall(), qt = quizTotals(), wc = wrongList().length;
    var h = '<div class="wrap"><div class="home-hero"><h2>SAT 문법, 챕터별로 차근차근</h2>' +
      '<p>교재(ALTO SAT Grammar)의 Reference · Lesson 1–12 내용과 모든 Practice·Cumulative 퀴즈를 챕터 순서대로 담았어요.</p></div>';
    h += '<div class="stat-row">' +
      '<div class="stat"><b>' + all.pct + '%</b><span>전체 진행 (' + all.done + '/' + all.total + ' 단계)</span></div>' +
      '<div class="stat"><b>' + qt.ok + ' / ' + qt.total + '</b><span>맞힌 문제 / 전체 문제</span></div>' +
      '<div class="stat"><b>' + wc + '</b><span>오답노트에 있는 문제</span></div></div>';
    var last = st.last && byId[st.last.ch];
    if (last) {
      var lp = last.parts.findIndex(function (p) { return p.id === st.last.part; });
      if (lp >= 0) {
        h += '<div class="card cont-card"><div><div class="ch-no">이어서 학습</div><b>' + esc(last.no) + ' · ' + esc(last.parts[lp].title) + '</b></div>' +
          '<a class="btn primary" href="' + href(last, last.parts[lp]) + '">계속하기 →</a></div>';
      }
    } else if (chapters[0]) {
      h += '<div class="card cont-card"><div><div class="ch-no">처음이라면</div><b>' + esc(chapters[0].title) + '부터 시작해요</b></div>' +
        '<a class="btn primary" href="#/c/' + chapters[0].id + '">시작하기 →</a></div>';
    }
    h += '<div class="card cont-card"><div><div class="ch-no">개념 없이 문제만</div><b>레슨별 문제만 바로 풀 수 있어요</b></div>' +
      '<a class="btn" href="#/practice">문제만 풀기 →</a></div>';
    h += '<h3 style="margin:22px 0 10px">챕터</h3><div class="grid">';
    chapters.forEach(function (ch) {
      var p = chProgress(ch);
      var nq = ch.parts.filter(function (x) { return x.kind === 'quiz'; }).length;
      h += '<a class="tile" href="#/c/' + ch.id + '"><div class="t-no">' + esc(ch.no) + '</div><div class="t-ti">' + esc(chTitle(ch)) + '</div>' +
        '<div class="t-ko">' + esc(ch.ko || '') + '</div><div class="t-bar"><span style="width:' + p.pct + '%"></span></div>' +
        '<div class="t-meta">개념 ' + (ch.parts.length - nq) + ' · 퀴즈 ' + nq + ' · ' + p.pct + '%</div></a>';
    });
    h += '</div><button class="reset-link" id="resetBtn">진행 기록 초기화</button></div>';
    main.innerHTML = h;
    toTop();
  }

  function showChapter(ch, pi, hit) {
    var p = ch.parts[pi];
    run = null; runCtx = null;
    st.last = { ch: ch.id, part: p.id }; save();
    setTitle(ch.no + ' ' + pTitle(ch, p).replace(/<[^>]+>/g, ''));
    renderSide(ch.id);

    var h = '<div class="wrap"><div class="ch-no">' + esc(ch.no) + '</div><h2 class="ch-title">' + esc(chTitle(ch)) + '</h2>' +
      (ch.ko ? '<p class="ch-sub">' + esc(ch.ko) + '</p>' : '');
    h += '<nav class="rail" aria-label="단계">';
    ch.parts.forEach(function (x, i) {
      h += '<a class="rail-chip' + (x.kind === 'quiz' ? ' quiz' : '') + (partDone(ch, x) ? ' done' : '') + (i === pi ? ' cur' : '') + '" href="' + href(ch, x) + '">' + esc(x.short || x.id) + '</a>';
    });
    h += '</nav>';

    if (p.kind === 'learn') {
      h += '<article class="card content"><h3 class="part-title" style="margin-top:0;color:var(--ink);font-family:var(--sans)">' + pTitle(ch, p) + '</h3>' +
        (p.page ? '<div class="page-ref">교재 ' + esc(p.page) + '</div>' : '') +
        (p.ko ? '<div class="tldr"><b>한 줄 요약</b>' + p.ko + '</div>' : '') +
        blocksFor(ch, p).map(function (b, i) { return '<div class="blk" data-b="' + i + '">' + block(b) + '</div>'; }).join('') + '</article>';
      h += pager(ch, pi, true);
    } else {
      h += '<article class="card"><h3 class="part-title">' + pTitle(ch, p) + '</h3>' +
        (p.page ? '<div class="page-ref">교재 ' + esc(p.page) + '</div>' : '') + '<div id="qarea"></div></article>';
      h += pager(ch, pi, false);
    }
    h += '</div>';
    main.innerHTML = h;
    if (p.kind === 'quiz') { runCtx = { ch: ch, p: p }; renderQuizIntro(); }
    if (hit) revealHit(hit); else toTop();
  }

  function pager(ch, pi, markRead) {
    var prev = neighbor(ch, pi, -1), next = neighbor(ch, pi, 1);
    var h = '<div class="pager">';
    h += prev ? '<a class="btn" href="' + href(prev.ch, prev.p) + '">← ' + esc(prev.p.short || prev.p.title) + '</a>' : '<span></span>';
    if (next) {
      h += '<a class="btn primary" data-act="next-read" data-read="' + (markRead ? '1' : '') + '" data-key="' + esc(pkey(ch, ch.parts[pi])) + '" href="' + href(next.ch, next.p) + '">' +
        (markRead ? '다 읽었어요 · ' : '') + esc(next.ch === ch ? (next.p.short || next.p.title) : next.ch.no + ' ' + (next.p.short || next.p.title)) + ' →</a>';
    } else {
      h += '<a class="btn primary" href="#/" data-act="next-read" data-read="' + (markRead ? '1' : '') + '" data-key="' + esc(pkey(ch, ch.parts[pi])) + '">' + (markRead ? '다 읽었어요 · ' : '') + '홈으로</a>';
    }
    return h + '</div>';
  }

  /* ───────────── quiz ───────────── */
  function legendHtml(p) {
    var keys = p.options || [];
    if (!keys.length) return '';
    var lg = p.legend || {};
    var rows = keys.map(function (k) {
      var d = lg[k] || LABELS[k] || '';
      return '<dt>' + esc(k) + '</dt><dd>' + d + '</dd>';
    }).join('');
    return '<details class="legend"><summary>보기(라벨) 설명</summary><dl>' + rows + '</dl></details>';
  }

  function renderQuizIntro() {
    var ch = runCtx.ch, p = runCtx.p, k = pkey(ch, p), rec = st.quiz[k];
    var h = '';
    if (p.instr) h += '<div class="q-instr"><div>' + pInstr(ch, p) + '</div>' + (p.ko ? '<div class="ko">' + p.ko + '</div>' : '') + '</div>';
    if (p.example) {
      var ex = p.example;
      h += '<div class="q-example"><span class="tag">예시</span>' + ex.q + (ex.a ? ' <b>→ ' + esc(ex.a) + '</b>' : '') + (ex.why ? '<span class="why">' + ex.why + '</span>' : '') + '</div>';
    }
    h += legendHtml(p);
    h += '<div class="start-box"><div class="best">' + p.items.length + '문제' +
      (rec ? ' · 최근 ' + rec.last + '/' + rec.total + ' · 최고 ' + rec.best + '/' + rec.total : '') + '</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">';
    var wrongIdx = [];
    p.items.forEach(function (it, i) { if (st.item[k + '#' + i] === 0) wrongIdx.push(i); });
    if (wrongIdx.length) h += '<button class="btn" data-act="quiz-wrong">틀린 문제만 (' + wrongIdx.length + ')</button>';
    h += '<button class="btn primary" data-act="quiz-start">' + (rec ? '다시 풀기' : '퀴즈 시작') + '</button></div></div>';
    $('#qarea').innerHTML = h;
  }

  function buildItems(ch, p, only) {
    var out = [];
    p.items.forEach(function (it, i) {
      if (only && only.indexOf(i) < 0) return;
      out.push({ q: it.q, a: it.a, why: it.why, reveal: it.reveal, idx: i, key: pkey(ch, p) + '#' + i, p: p, ch: ch });
    });
    return out;
  }

  function startRun(items, meta) {
    run = { items: items, i: 0, res: [], phase: 'q', revealed: false, meta: meta || {}, instrOpen: {} };
    renderRun();
  }

  /* ───────────── practice-only space (문제만 풀기) ───────────── */
  function quizParts(ch) { return ch.parts.filter(function (p) { return p.kind === 'quiz'; }); }
  function lessonStats(ch) {
    var n = 0, good = 0, bad = 0;
    quizParts(ch).forEach(function (p) {
      p.items.forEach(function (it, i) {
        n++;
        var v = st.item[pkey(ch, p) + '#' + i];
        if (v === 1) good++; else if (v === 0) bad++;
      });
    });
    return { n: n, good: good, bad: bad, done: good + bad };
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function exampleHtml(p) {
    if (!p.example) return '';
    var ex = p.example;
    return '<div class="q-example"><span class="tag">예시</span>' + ex.q + (ex.a ? ' <b>→ ' + esc(Array.isArray(ex.a) ? ex.a.join(' / ') : ex.a) + '</b>' : '') + '</div>';
  }
  function startPractice(ch, partIds, mode) {
    var parts = quizParts(ch).filter(function (p) { return !partIds || partIds.indexOf(p.id) >= 0; });
    var items = [];
    parts.forEach(function (p) {
      p.items.forEach(function (it, i) {
        var key = pkey(ch, p) + '#' + i;
        if (mode === 'wrong' && st.item[key] !== 0) return;
        items.push({ q: it.q, a: it.a, why: it.why, reveal: it.reveal, idx: i, key: key, p: p, ch: ch });
      });
    });
    if (!items.length) return;
    if (st.shuffle) shuffle(items);
    startRun(items, { full: false, label: '문제 풀기', practiceCh: ch.id, partIds: partIds, mode: mode, recordSets: mode === 'wrong' ? null : parts, activeSide: 'practice' });
    window.scrollTo(0, 0);
  }

  function showPractice() {
    run = null; runCtx = null;
    setTitle('문제만 풀기');
    renderSide('practice');
    var list = chapters.filter(function (ch) { return quizParts(ch).length; });
    var tn = 0, tg = 0, tb = 0;
    list.forEach(function (ch) { var s = lessonStats(ch); tn += s.n; tg += s.good; tb += s.bad; });
    var h = '<div class="wrap"><div class="home-hero"><h2>문제만 풀기</h2><p>개념 설명은 빼고, 레슨별 문제만 골라서 풀어요. 풀면 정답·오답이 기록되고 오답노트에도 모여요.</p></div>' +
      '<div class="stat-row"><div class="stat"><b>' + (tg + tb) + ' / ' + tn + '</b><span>푼 문제 / 전체 문제</span></div>' +
      '<div class="stat"><b>' + tg + '</b><span>정답</span></div><div class="stat"><b>' + tb + '</b><span>오답</span></div></div>' +
      '<h3 style="margin:22px 0 10px">레슨을 고르세요</h3><div class="grid">';
    list.forEach(function (ch) {
      var s = lessonStats(ch);
      h += '<a class="tile" href="#/practice/' + ch.id + '"><div class="t-no">LESSON ' + esc(ch.id.replace(/^L/, '')) + '</div><div class="t-ti">' + esc(chTitle(ch).replace(/^Lesson \d+\.\s*/, '')) + '</div>' +
        '<div class="t-ko">' + esc(ch.ko || '') + '</div><div class="t-bar"><span style="width:' + (s.n ? Math.round(s.good / s.n * 100) : 0) + '%"></span></div>' +
        '<div class="t-meta">문제 ' + s.n + ' · 정답 ' + s.good + (s.bad ? ' · 오답 ' + s.bad : '') + '</div></a>';
    });
    h += '</div></div>';
    main.innerHTML = h;
    toTop();
  }

  function showPracticeLesson(ch) {
    run = null; runCtx = null;
    setTitle('문제만 풀기 · ' + ch.no);
    renderSide('practice');
    var s = lessonStats(ch), qp = quizParts(ch);
    var h = '<div class="wrap"><a class="back-link" href="#/practice">← 레슨 목록</a>' +
      '<div class="ch-no" style="margin-top:10px">문제만 풀기 · LESSON ' + esc(ch.id.replace(/^L/, '')) + '</div><h2 class="ch-title">' + esc(chTitle(ch)) + '</h2>' +
      '<p class="ch-sub">문제 ' + s.n + '개 · ' + qp.length + '세트' + (s.done ? ' · 정답 ' + s.good + ' / 오답 ' + s.bad : '') + '</p>';
    h += '<div id="plist"><div class="card pr-main"><div class="pr-actions">' +
      '<button class="btn primary big" data-act="pr-all" data-ch="' + ch.id + '">이 레슨 전체 풀기 · ' + s.n + '문제</button>' +
      '<button class="btn" data-act="pr-wrong" data-ch="' + ch.id + '"' + (s.bad ? '' : ' disabled') + '>틀린 문제만 (' + s.bad + ')</button></div>' +
      '<label class="switch"><input type="checkbox" id="shuffleSw"' + (st.shuffle ? ' checked' : '') + '><span class="track"></span><span class="sw-t">문제 순서 섞기</span></label></div>' +
      '<div class="card pr-sets"><h3 class="pr-h">세트별로 풀기</h3>';
    qp.forEach(function (p) {
      var rec = st.quiz[pkey(ch, p)], bad = 0;
      p.items.forEach(function (it, i) { if (st.item[pkey(ch, p) + '#' + i] === 0) bad++; });
      h += '<div class="set-row"><div class="set-t"><b>' + p.title + '</b><small>' + p.items.length + '문제' +
        (rec ? ' · 최근 ' + rec.last + '/' + rec.total + ' · 최고 ' + rec.best + '/' + rec.total : '') + (bad ? ' · 오답 ' + bad : '') + '</small></div>' +
        '<button class="btn primary" data-act="pr-set" data-ch="' + ch.id + '" data-p="' + esc(p.id) + '">풀기</button></div>';
    });
    h += '</div></div><article class="card" id="qcard" hidden><div id="qarea"></div></article></div>';
    main.innerHTML = h;
    toTop();
  }

  /* ───────────── interactive marking (Practice 1A/1B style) ───────────── */
  var TOOLS = {
    S: { name: '주어', how: '밑줄', cls: 'u' },
    O: { name: '목적어', how: '취소선', cls: 's' },
    V: { name: '동사', how: '동그라미', cls: 'v' }
  };

  // Read the annotated answer (<u> = subject, <s> = object, .circ = verb) into word tokens {t, e}.
  function parseReveal(html) {
    var doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
    var tokens = [], cur = null;
    function flush() { if (cur && cur.t) tokens.push(cur); cur = null; }
    function walk(node, type) {
      if (node.nodeType === 3) {
        var s = node.nodeValue;
        for (var k = 0; k < s.length; k++) {
          var c = s.charAt(k);
          if (/\s/.test(c)) { flush(); continue; }
          if (!cur) cur = { t: '', e: '' };
          cur.t += c;
          if (!cur.e && type && /[A-Za-z0-9]/.test(c)) cur.e = type;   // the first letter decides a word's type
        }
      } else if (node.nodeType === 1) {
        var tag = node.nodeName, t2 = type;
        if (tag === 'U') t2 = 'S'; else if (tag === 'S') t2 = 'O'; else if (node.classList && node.classList.contains('circ')) t2 = 'V';
        for (var c2 = node.firstChild; c2; c2 = c2.nextSibling) walk(c2, t2);
      }
    }
    walk(doc.body.firstChild, '');
    flush();
    return tokens;
  }
  function toolsFor(p) {
    if (p._tools) return p._tools;
    var all = p.items.map(function (x) { return x.reveal || ''; }).join(' ') + (p.example ? p.example.q : '');
    var t = ['S'];
    if (/<s>/.test(all)) t.push('O');
    if (/class="circ"/.test(all)) t.push('V');
    return (p._tools = t);
  }
  function prepMarking(it) {
    if (!it._tok) { try { it._tok = parseReveal(it.reveal || ''); } catch (e) { it._tok = []; } }
    if (!it._tok.some(function (w) { return w.e; })) return false;
    run.marks = run.marks || {};
    var tl = toolsFor(it.p);
    if (!run.tool || tl.indexOf(run.tool) < 0) run.tool = tl[0];
    return true;
  }

  // Unit = run of consecutive words with the same expected type. Subjects/objects need at least one word marked
  // (the book marks the whole noun phrase, students often mark the head); verbs need first and last word.
  function gradeMarks(tokens, marks) {
    var n = tokens.length, state = [], i, j, k, miss = 0, bad = 0, total = 0;
    for (i = 0; i < n; i++) state[i] = '';
    i = 0;
    while (i < n) {
      var e = tokens[i].e;
      if (!e) { i++; continue; }
      j = i; while (j + 1 < n && tokens[j + 1].e === e) j++;
      total++;
      var found = false;
      if (e === 'V') found = marks[i] === 'V' && marks[j] === 'V';
      else for (k = i; k <= j; k++) if (marks[k] === e) found = true;
      for (k = i; k <= j; k++) {
        if (marks[k] && marks[k] !== e) { state[k] = 'bad'; bad++; }
        else if (marks[k] === e) state[k] = 'ok';
        else if (!found) state[k] = 'miss';
      }
      if (!found) miss++;
      i = j + 1;
    }
    for (i = 0; i < n; i++) {                       // marks on words that belong to no unit
      if (tokens[i].e || !marks[i]) continue;
      var T = marks[i], tol = false;
      if (T !== 'V') {                              // "The 1844 election": marking the whole noun phrase is fine
        j = i; while (j < n && !tokens[j].e && marks[j] === T) j++;
        if (j < n && tokens[j].e === T && j - i <= 3) tol = true;
      }
      if (tol) state[i] = 'tol'; else { state[i] = 'bad'; bad++; }
    }
    return { ok: miss === 0 && bad === 0, miss: miss, bad: bad, total: total, state: state };
  }

  function tokensHtml(tokens, marks, g) {
    var eff = tokens.map(function (w, i) {
      var m = marks[i] || '', s = g ? g.state[i] : '';
      if (g && s === 'miss') return { type: w.e, status: 'miss' };
      return { type: m, status: g ? (s === 'bad' ? 'bad' : (s === 'ok' || s === 'tol') ? 'ok' : '') : '' };
    });
    return tokens.map(function (w, i) {
      var x = eff[i], cl = 'w';
      var joinPrev = i > 0 && x.type === 'V' && eff[i - 1].type === 'V' && eff[i - 1].status === x.status;
      var joinNext = i < tokens.length - 1 && x.type === 'V' && eff[i + 1].type === 'V' && eff[i + 1].status === x.status;
      if (x.type) cl += ' mk mk-' + x.type;
      if (x.status) cl += ' is-' + x.status;
      if (x.type === 'V') cl += (joinPrev ? '' : ' v-s') + (joinNext ? '' : ' v-e');
      // the space between two joined circled words belongs to the first word so the circle stays unbroken
      return '<span class="' + cl + '" data-act="mk" data-i="' + i + '">' + esc(w.t) + (joinNext ? ' ' : '') + '</span>' + (joinNext || i === tokens.length - 1 ? '' : ' ');
    }).join('');
  }

  function markingHtml(it, p, marks, done, n) {
    var nextBtn = '<button class="btn primary" data-act="next">' + (run.i + 1 >= n ? '결과 보기' : '다음 →') + '</button>';
    var h = '';
    if (!done) {
      var tl = toolsFor(p);
      h += '<div class="mk-hint">도구를 고르고 문장의 단어를 눌러 표시하세요. 같은 도구로 다시 누르면 지워져요.</div><div class="tools">' +
        tl.map(function (k, ki) {
          return '<button type="button" class="tool' + (run.tool === k ? ' on' : '') + '" data-act="tool" data-tool="' + k + '"><span class="sw ' + TOOLS[k].cls + '">abc</span>' +
            TOOLS[k].name + ' · ' + TOOLS[k].how + '<kbd>' + (ki + 1) + '</kbd></button>';
        }).join('') +
        '<button type="button" class="tool' + (run.tool === 'E' ? ' on' : '') + '" data-act="tool" data-tool="E"><span class="sw">⌫</span>지우개</button>' +
        '<button type="button" class="tool plain" data-act="mk-clear"' + (marks.some(Boolean) ? '' : ' disabled') + '>전체 지우기</button></div>';
      h += '<div class="q-actions"><button class="btn ghost" data-act="mk-legacy">종이에 풀고 정답만 볼래요</button>' +
        '<button class="btn primary" data-act="mk-grade"' + (marks.some(Boolean) ? '' : ' disabled') + '>채점하기</button></div>';
      return h;
    }
    var g = done.g;
    h += '<div class="mk-legend"><span class="lg ok">맞게 표시</span><span class="lg bad">잘못 표시</span><span class="lg miss">놓친 표시</span></div>';
    var head = done.ok ? (done.overridden ? '정답으로 처리했어요' : '정답! 모두 찾았어요')
      : '아쉬워요 — 총 ' + g.total + '개 중 ' + (g.total - g.miss) + '개 찾음' + (g.bad ? ' · 잘못 표시 ' + g.bad + '개' : '');
    h += '<div class="feedback ' + (done.ok ? 'ok' : 'bad') + '"><div class="fb-h">' + head + '</div><div class="fb-reveal">' + it.reveal + '</div>' +
      (it.why ? '<div class="fb-why">' + it.why + '</div>' : '') + '</div>';
    h += '<div class="q-actions">' + (done.ok ? '' : '<button class="btn ghost" data-act="mk-override">내 답도 맞아요</button>') + nextBtn + '</div>';
    return h;
  }

  function isRight(it, pick) {
    var a = it.a;
    return Array.isArray(a) ? a.indexOf(pick) >= 0 : a === pick;
  }
  function ansText(it) { return Array.isArray(it.a) ? it.a.join(' / ') : it.a; }

  function renderRun() {
    var area = $('#qarea');
    if (!run) return;
    if (run.i >= run.items.length) return renderSummary();
    var it = run.items[run.i], p = it.p, n = run.items.length;
    var self = p.type === 'self';
    showRunArea();
    var h = '';
    if (run.meta.practiceCh) h += '<div class="pr-top"><span class="best">' + esc(chTitle(it.ch)) + '</span><button class="btn ghost" data-act="pr-exit">나가기</button></div>';
    h += '<div class="q-meta"><span>' + (run.meta.label ? esc(run.meta.label) + ' · ' : '') + '문제 ' + (run.i + 1) + ' / ' + n + '</span>' +
      '<span>' + run.res.filter(function (r) { return r.ok; }).length + ' 정답</span></div>' +
      '<div class="qbar"><span style="width:' + Math.round(run.i / n * 100) + '%"></span></div>';
    if (run.meta.label) h += '<div class="page-ref">' + esc(it.ch.no) + ' · ' + esc(p.title) + '</div>';
    if (run.meta.practiceCh) {
      // the set's instruction travels with the question: open on the first question of each set, then remembered
      var ik = pkey(it.ch, p), first = run.i === 0 || run.items[run.i - 1].p !== p;
      var isOpen = run.instrOpen[ik] !== undefined ? run.instrOpen[ik] : first;
      h += '<details class="q-instr-d" data-ik="' + esc(ik) + '"' + (isOpen ? ' open' : '') + '><summary>이 세트의 지시문 · 예시</summary>' +
        '<div class="q-instr"><div>' + pInstr(it.ch, p) + '</div></div>' + exampleHtml(p) + legendHtml(p) + '</details>';
    }
    // "mark it yourself" sets (underline / cross out / circle) are solved by tapping words, then graded automatically
    var interactive = self && !(run.legacy && run.legacy[run.i]) && prepMarking(it);
    var marks = interactive ? (run.marks[run.i] || (run.marks[run.i] = [])) : null;
    var done = interactive ? run.res[run.i] : null;
    h += '<div class="qcard"><div class="qnum">' + (run.meta.showOrig ? (it.idx + 1) : (run.i + 1)) + '</div><div class="qtext' + (interactive ? ' tok' + (done ? ' graded' : '') : '') + '">' +
      (interactive ? tokensHtml(it._tok, marks, done && done.g) : it.q) + '</div></div>';

    if (interactive) {
      h += markingHtml(it, p, marks, done, n);
    } else if (self) {
      if (run.phase === 'q') {
        h += '<div class="q-actions"><button class="btn primary" data-act="reveal">정답 보기</button></div>';
      } else {
        h += '<div class="feedback ok"><div class="fb-h">정답</div><div class="fb-reveal">' + it.reveal + '</div>' +
          (it.why ? '<div class="fb-why">' + it.why + '</div>' : '') + '</div>';
        if (run.phase === 'reveal') {
          h += '<div class="q-actions"><button class="btn" data-act="self" data-v="0">틀렸어요</button><button class="btn primary" data-act="self" data-v="1">맞혔어요</button></div>';
        } else {
          h += '<div class="q-actions"><button class="btn primary" data-act="next">' + (run.i + 1 >= n ? '결과 보기' : '다음 →') + '</button></div>';
        }
      }
    } else {
      var last = run.res[run.i];
      h += '<div class="opts">' + (p.options || []).map(function (o, oi) {
        var cls = 'opt';
        if (last) {
          if (isRight(it, o)) cls += ' correct';
          else if (o === last.pick) cls += ' wrong';
        }
        return '<button class="' + cls + '" data-act="pick" data-o="' + esc(o) + '"' + (last ? ' disabled' : '') + ' title="' + esc((p.legend && p.legend[o]) || LABELS[o] || '') + '">' +
          (oi < 9 ? '<kbd>' + (oi + 1) + '</kbd>' : '') + esc(o) + '</button>';
      }).join('') + '</div>';
      if (last) {
        h += '<div class="feedback ' + (last.ok ? 'ok' : 'bad') + '"><div class="fb-h">' + (last.ok ? '정답!' : '오답 — 정답은 ' + esc(ansText(it))) + '</div>' +
          (it.why ? '<div class="fb-why">' + it.why + '</div>' : '') + '</div>';
        h += '<div class="q-actions"><button class="btn primary" data-act="next">' + (run.i + 1 >= n ? '결과 보기' : '다음 →') + '</button></div>';
      }
    }
    area.innerHTML = h;
  }

  function record(it, ok) {
    run.res[run.i] = run.res[run.i] || {};
    run.res[run.i].ok = ok;
    st.item[it.key] = ok ? 1 : 0;
    save();
  }

  // practice pages keep the set list and the run side by side in the DOM; show only the run while one is active
  function showRunArea() {
    var qc = $('#qcard'), pl = $('#plist');
    if (qc) qc.hidden = false;
    if (pl) pl.hidden = true;
  }

  function renderSummary() {
    var n = run.items.length, ok = run.res.filter(function (r) { return r && r.ok; }).length;
    var meta = run.meta;
    showRunArea();
    if (meta.recordSets) {
      meta.recordSets.forEach(function (p) {
        var cnt = 0, good = 0;
        run.items.forEach(function (x, i) { if (x.p === p) { cnt++; if (run.res[i] && run.res[i].ok) good++; } });
        if (cnt !== p.items.length) return;
        var k0 = pkey(byId[meta.practiceCh], p), pv = st.quiz[k0];
        st.quiz[k0] = { best: Math.max(pv ? pv.best : 0, good), total: cnt, last: good, at: Date.now() };
      });
      save();
    }
    if (meta.full && runCtx) {
      var k = pkey(runCtx.ch, runCtx.p), prev = st.quiz[k];
      st.quiz[k] = { best: Math.max(prev ? prev.best : 0, ok), total: n, last: ok, at: Date.now() };
      save();
      renderSide(runCtx.ch.id);
    } else if (!meta.full) { renderSide(meta.activeSide || 'wrong'); }
    var pct = Math.round(ok / n * 100);
    var h = '<div class="score-ring"><div class="score-big">' + ok + '<small> / ' + n + '</small></div><div><b>' +
      (pct === 100 ? '완벽해요! 🎉' : pct >= 80 ? '아주 좋아요' : pct >= 60 ? '조금만 더 다듬어요' : '개념을 다시 보고 도전해요') + '</b><div class="best">정답률 ' + pct + '%</div></div></div>';
    h += '<ul class="review">' + run.items.map(function (it, i) {
      var r = run.res[i] || {};
      var self = it.p.type === 'self';
      return '<li class="' + (r.ok ? 'ok' : 'bad') + '"><span class="rv-n">' + (meta.showOrig ? it.idx + 1 : i + 1) + '</span>' +
        (self ? it.reveal : it.q) +
        '<div class="rv-meta">' + (self ? (r.ok ? '맞혔어요' : '틀렸어요') :
          ('정답 <b>' + esc(ansText(it)) + '</b>' + (r.ok ? '' : ' · 내 답 ' + esc(r.pick || '-'))) ) +
        (it.why ? ' — ' + it.why : '') + '</div></li>';
    }).join('') + '</ul>';
    h += '<div class="q-actions" style="margin-top:18px">';
    var wrongs = run.items.filter(function (it, i) { return !(run.res[i] && run.res[i].ok); });
    if (wrongs.length) h += '<button class="btn" data-act="retry-wrong">틀린 문제만 다시 (' + wrongs.length + ')</button>';
    if (meta.full) h += '<button class="btn" data-act="quiz-restart">처음부터 다시</button>';
    else if (meta.practiceCh) h += '<button class="btn" data-act="pr-again">처음부터 다시</button>';
    h += '<button class="btn primary" data-act="quiz-exit">' + (meta.full ? '문제 화면으로' : meta.practiceCh ? '레슨 화면으로' : '오답노트로') + '</button></div>';
    $('#qarea').innerHTML = h;
  }

  /* ───────────── wrong notebook ───────────── */
  function showWrong() {
    run = null; runCtx = null;
    setTitle('오답노트');
    renderSide('wrong');
    var list = wrongList();
    var h = '<div class="wrap"><div class="ch-no">Review</div><h2 class="ch-title">오답노트</h2><p class="ch-sub">틀린 문제만 모아서 다시 풀어요. 맞히면 목록에서 빠집니다.</p>';
    if (!list.length) {
      h += '<div class="card empty" style="margin-top:20px"><b>아직 틀린 문제가 없어요.</b><br>퀴즈를 풀다 틀리면 여기에 모여요.</div></div>';
      main.innerHTML = h; toTop(); return;
    }
    var groups = [];
    list.forEach(function (x) {
      var g = groups[groups.length - 1];
      if (!g || g.p !== x.p) { g = { ch: x.ch, p: x.p, n: 0 }; groups.push(g); }
      g.n++;
    });
    h += '<div class="card" style="margin-top:18px"><div class="start-box" style="margin:0 0 6px"><div class="best">' + list.length + '문제</div>' +
      '<button class="btn primary" data-act="wrong-all">전부 풀기</button></div>' +
      '<ul class="review">' + groups.map(function (g, gi) {
        return '<li><b>' + esc(g.ch.no) + ' · ' + esc(g.p.title) + '</b> <span class="best">— ' + g.n + '문제</span> ' +
          '<a class="btn ghost" style="min-height:32px;padding:3px 12px;margin-left:8px" data-act="wrong-group" data-g="' + gi + '" href="javascript:void(0)">이 퀴즈만 풀기</a></li>';
      }).join('') + '</ul><div id="qarea" style="margin-top:14px"></div></div></div>';
    main.innerHTML = h;
    main._groups = groups;
    toTop();
  }

  /* ───────────── events ───────────── */
  main.addEventListener('change', function (e) {
    if (e.target.id === 'shuffleSw') { st.shuffle = e.target.checked; save(); }
  });

  main.addEventListener('click', function (e) {
    var sm = e.target.closest('.q-instr-d > summary');
    if (sm && run) { run.instrOpen[sm.parentNode.getAttribute('data-ik')] = !sm.parentNode.open; return; }  // remember the user's choice
    var t = e.target.closest('[data-act]');
    if (!t) { if (e.target.id === 'resetBtn') resetAll(); return; }
    var act = t.getAttribute('data-act');
    var it = run && run.items[run.i];

    if (act === 'next-read') {
      if (t.getAttribute('data-read')) { st.read[t.getAttribute('data-key')] = 1; save(); }
      return; // let the link navigate
    }
    if (act === 'quiz-start' || act === 'quiz-restart') {
      startRun(buildItems(runCtx.ch, runCtx.p), { full: true });
    } else if (act === 'quiz-wrong') {
      var k = pkey(runCtx.ch, runCtx.p), idx = [];
      runCtx.p.items.forEach(function (x, i) { if (st.item[k + '#' + i] === 0) idx.push(i); });
      startRun(buildItems(runCtx.ch, runCtx.p, idx), { full: false, label: '틀린 문제', showOrig: true, activeSide: runCtx.ch.id });
    } else if (act === 'retry-wrong') {
      var again = run.items.filter(function (x, i) { return !(run.res[i] && run.res[i].ok); });
      var meta = Object.assign({}, run.meta, { full: false, label: '틀린 문제', showOrig: true, recordSets: null, activeSide: run.meta.activeSide || (runCtx && runCtx.ch.id) });
      startRun(again, meta);
    } else if (act === 'pr-all' || act === 'pr-wrong') {
      startPractice(byId[t.getAttribute('data-ch')], null, act === 'pr-wrong' ? 'wrong' : 'all');
    } else if (act === 'pr-set') {
      startPractice(byId[t.getAttribute('data-ch')], [t.getAttribute('data-p')], 'all');
    } else if (act === 'pr-again') {
      startPractice(byId[run.meta.practiceCh], run.meta.partIds, run.meta.mode);
    } else if (act === 'pr-exit') {
      var pcid = run.meta.practiceCh; run = null; showPracticeLesson(byId[pcid]);
    } else if (act === 'quiz-exit') {
      if (run.meta.practiceCh) { var pc2 = run.meta.practiceCh; run = null; showPracticeLesson(byId[pc2]); }
      else if (run.meta.full && runCtx) { run = null; renderQuizIntro(); }
      else if (runCtx) { run = null; renderQuizIntro(); }
      else { run = null; showWrong(); }
    } else if (act === 'pick' && run && it && !run.res[run.i]) {
      var pick = t.getAttribute('data-o'), ok = isRight(it, pick);
      run.res[run.i] = { ok: ok, pick: pick };
      st.item[it.key] = ok ? 1 : 0; save();
      renderRun();
    } else if (act === 'tool' && run) {
      run.tool = t.getAttribute('data-tool'); renderRun();
    } else if (act === 'mk' && run && it && run.marks && !run.res[run.i]) {
      var mi = +t.getAttribute('data-i'), mm = run.marks[run.i] || (run.marks[run.i] = []);
      mm[mi] = (run.tool === 'E' || mm[mi] === run.tool) ? '' : run.tool;
      renderRun();
    } else if (act === 'mk-clear' && run && run.marks) {
      run.marks[run.i] = []; renderRun();
    } else if (act === 'mk-grade' && run && it && it._tok) {
      var gm = gradeMarks(it._tok, run.marks[run.i] || []);
      run.res[run.i] = { ok: gm.ok, g: gm };
      st.item[it.key] = gm.ok ? 1 : 0; save();
      renderRun();
    } else if (act === 'mk-override' && run && it && run.res[run.i]) {
      run.res[run.i].ok = true; run.res[run.i].overridden = true;
      st.item[it.key] = 1; save();
      renderRun();
    } else if (act === 'mk-legacy' && run) {
      run.legacy = run.legacy || {}; run.legacy[run.i] = true; run.phase = 'q'; renderRun();
    } else if (act === 'reveal' && run) {
      run.phase = 'reveal'; renderRun();
    } else if (act === 'self' && run && it) {
      var okv = t.getAttribute('data-v') === '1';
      run.res[run.i] = { ok: okv };
      st.item[it.key] = okv ? 1 : 0; save();
      run.phase = 'done'; renderRun();
    } else if (act === 'next' && run) {
      run.i++; run.phase = 'q'; renderRun();
      var a = $('#qarea'); if (a) a.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else if (act === 'wrong-all') {
      var all = wrongList().map(function (x) { return { q: x.it.q, a: x.it.a, why: x.it.why, reveal: x.it.reveal, idx: x.i, key: pkey(x.ch, x.p) + '#' + x.i, p: x.p, ch: x.ch }; });
      startRun(all, { full: false, label: '오답노트', showOrig: true, activeSide: 'wrong' });
    } else if (act === 'wrong-group') {
      var g = main._groups[+t.getAttribute('data-g')], k2 = pkey(g.ch, g.p), idx2 = [];
      g.p.items.forEach(function (x, i) { if (st.item[k2 + '#' + i] === 0) idx2.push(i); });
      startRun(buildItems(g.ch, g.p, idx2), { full: false, label: g.p.title, showOrig: true, activeSide: 'wrong' });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '')) return;   // typing in the search box is not a quiz key
    if (!run || e.metaKey || e.ctrlKey || e.altKey) return;
    var it = run.items[run.i];
    if (!it) return;
    if (it.p.type === 'self' && it._tok && it._tok.length && !(run.legacy && run.legacy[run.i])) {   // interactive marking
      if (!run.res[run.i] && /^[1-3]$/.test(e.key)) {
        var tk = toolsFor(it.p)[+e.key - 1]; if (tk) { run.tool = tk; renderRun(); }
      } else if (!run.res[run.i] && (e.key === 'Backspace' || e.key === 'e')) {
        run.tool = 'E'; renderRun();
      } else if (e.key === 'Enter') {
        var ib = main.querySelector('[data-act="mk-grade"]:not([disabled])') || main.querySelector('[data-act="next"]');
        if (ib) { e.preventDefault(); ib.click(); }
      }
      return;
    }
    if (it.p.type !== 'self' && !run.res[run.i] && /^[1-9]$/.test(e.key)) {
      var o = (it.p.options || [])[+e.key - 1];
      if (o) { var b = main.querySelector('.opt[data-o="' + CSS.escape(o) + '"]'); if (b) b.click(); }
    } else if ((e.key === 'Enter' || e.key === 'ArrowRight') && (run.res[run.i] || (it.p.type === 'self' && run.phase === 'done'))) {
      var nb = main.querySelector('[data-act="next"]'); if (nb) { e.preventDefault(); nb.click(); }
    } else if (e.key === 'Enter' && it.p.type === 'self' && run.phase === 'q') {
      var rb = main.querySelector('[data-act="reveal"]'); if (rb) { e.preventDefault(); rb.click(); }
    }
  });

  function resetAll() {
    if (!confirm('학습 기록(읽음 표시, 퀴즈 점수, 오답노트)을 모두 지울까요?')) return;
    st = { read: {}, quiz: {}, item: {}, last: null, shuffle: st.shuffle };
    save(); route();
  }

  /* menu (mobile) */
  function closeNav() { document.body.classList.remove('nav-open'); }
  $('#menuBtn').addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
  $('#scrim').addEventListener('click', closeNav);
  $('#side').addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });

  /* language toggle */
  function syncLangButtons() {
    document.documentElement.setAttribute('data-lang', lang);
    Array.prototype.forEach.call(document.querySelectorAll('#langToggle button'), function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  $('#langToggle').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-lang]');
    if (!b || b.getAttribute('data-lang') === lang) return;
    lang = b.getAttribute('data-lang');
    try { localStorage.setItem(LKEY, lang); } catch (err) { /* ignore */ }
    syncLangButtons();
    var y = window.scrollY, keep = run;       // keep scroll position and any quiz in progress
    route();
    if (keep) { run = keep; renderRun(); }
    window.scrollTo(0, y);
  });
  syncLangButtons();

  /* ───────────── search ───────────── */
  var plain = function (s) {
    return String(s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  };
  function treeText(n) {
    if (typeof n === 'string') return n;
    var s = n.q || '';
    (n.b || []).forEach(function (x) { s += ' ' + x[0] + ' ' + treeText(x[1]); });
    return s;
  }
  function blockText(b) {
    if (typeof b === 'string') return b;
    var out = [];
    ['h', 'h4', 'p', 'note', 'title'].forEach(function (k) { if (typeof b[k] === 'string') out.push(b[k]); });
    if (b.list) out = out.concat(b.list);
    if (b.box) b.box.forEach(function (x) { out.push(blockText(x)); });
    if (b.ex) {
      out.push(b.ex);
      b.lines.forEach(function (l) { out.push(typeof l === 'string' ? l : l[0] + ' ' + (l[1] || '')); });
    }
    if (b.words) out = out.concat(b.words.map(function (w) { return w.replace(/^\*/, ''); }));
    if (b.table) {
      (b.table.head || []).forEach(function (c) { out.push(c); });
      b.table.rows.forEach(function (r) { r.forEach(function (c) { out.push(String(c).replace(/^\*/, '')); }); });
    }
    if (b.tree) out.push((b.tree.title || '') + ' ' + treeText(b.tree.root));
    return out.join(' ');
  }

  // One entry per concept block / part title / quiz question / quiz instruction. English and Korean text are
  // both searchable, whichever language the page is showing.
  var SIDX = null;
  function buildIndex() {
    var out = [];
    chapters.forEach(function (ch) {
      var koC = KO[ch.id] || {};
      ch.parts.forEach(function (p) {
        var koP = (koC.parts || {})[p.id] || {};
        out.push({ k: 'learn', ch: ch, p: p, b: null, rank: 0, en: plain(p.title + ' ' + (p.ko || '')), ko: plain((koP.title || '') + ' ' + (p.ko || '')) });
        if (p.kind === 'learn') {
          p.blocks.forEach(function (b, i) {
            var en = plain(blockText(b)), ov = koP.blocks ? koP.blocks[i] : null;
            var ko = ov ? plain(blockText(localizeBlock(b, ov))) : '';
            if (en || ko) out.push({ k: 'learn', ch: ch, p: p, b: i, rank: 1, en: en, ko: ko });
          });
        } else {
          out.push({ k: 'set', ch: ch, p: p, rank: 2, en: plain(p.instr || ''), ko: plain(koP.instr || '') });
          p.items.forEach(function (it, i) {
            out.push({ k: 'q', ch: ch, p: p, i: i, rank: 3, en: plain(it.q), ko: plain((it.why || '') + ' ' + (it.a === undefined ? '' : ansText(it))) });
          });
        }
      });
    });
    out.forEach(function (e) { e.hay = (e.en + ' ' + e.ko).toLowerCase(); });
    return out;
  }
  function searchTerms(q) {
    return q.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1 || /[^\x00-\x7f]/.test(t); });
  }

  // Matching rules: an English term must start at a word boundary ("one" no longer matches "anyone"),
  // terms of up to 3 letters must be whole words ("not" no longer matches "notices"), longer ones may be
  // prefixes ("fragment" finds "fragments"). Korean terms match anywhere, since particles stick to words.
  var isAlnum = function (c) { return /[A-Za-z0-9]/.test(c); };
  function termOk(text, s, e, term) {
    if (/[^\x00-\x7f]/.test(term)) return true;
    if (s > 0 && isAlnum(text.charAt(s - 1))) return false;
    if (term.length <= 3 && e < text.length && isAlnum(text.charAt(e))) return false;
    return true;
  }
  function findAll(low, term) {
    var out = [], i = low.indexOf(term);
    while (i >= 0) {
      if (termOk(low, i, i + term.length, term)) out.push([i, i + term.length]);
      i = low.indexOf(term, i + 1);
    }
    return out;
  }
  // character ranges to highlight: the whole phrase when it occurs, otherwise each term
  function termRanges(text, terms) {
    var low = text.toLowerCase(), all = [];
    if (terms.length > 1) all = all.concat(findAll(low, terms.join(' ')));
    terms.forEach(function (t) { all = all.concat(findAll(low, t)); });
    all.sort(function (x, y) { return x[0] - y[0] || y[1] - x[1]; });
    var merged = [];
    all.forEach(function (r) {
      var l = merged[merged.length - 1];
      if (l && r[0] <= l[1]) l[1] = Math.max(l[1], r[1]); else merged.push([r[0], r[1]]);
    });
    return merged;
  }
  // 0 = the exact phrase appears, 1 = every term appears, -1 = no match
  function tierOf(hay, terms) {
    if (terms.length > 1 && findAll(hay, terms.join(' ')).length) return 0;
    return terms.every(function (t) { return findAll(hay, t).length > 0; }) ? 1 : -1;
  }
  function runSearch(terms) {
    if (!terms.length) return [];
    var idx = SIDX || (SIDX = buildIndex()), res = [];
    idx.forEach(function (e, n) { var t = tierOf(e.hay, terms); if (t >= 0) res.push({ e: e, t: t, n: n }); });
    res.sort(function (a, b) { return a.t - b.t || a.e.rank - b.e.rank || a.n - b.n; });
    return res;   // [{e: entry, t: tier}]
  }
  function hl(text, terms) {
    var out = '', pos = 0;
    termRanges(text, terms).forEach(function (r) {
      out += esc(text.slice(pos, r[0])) + '<mark class="sh">' + esc(text.slice(r[0], r[1])) + '</mark>';
      pos = r[1];
    });
    return out + esc(text.slice(pos));
  }
  // questions always show the question sentence itself; other entries show the text (in the page's language) that matched
  function snippet(e, terms) {
    var txt;
    if (e.k === 'q') txt = e.en;
    else {
      var pref = (lang === 'ko' ? [e.ko, e.en] : [e.en, e.ko]).filter(Boolean);
      txt = pref.filter(function (t) { return termRanges(t, terms).length; })[0] || pref[0] || '';
    }
    var rs = termRanges(txt, terms), pos = rs.length ? rs[0][0] : 0;
    var from = Math.max(0, pos - 50), to = Math.min(txt.length, pos + (e.k === 'q' ? 240 : 130));
    if (e.k === 'q' && txt.length <= 300) { from = 0; to = txt.length; }
    return (from > 0 ? '…' : '') + hl(txt.slice(from, to), terms) + (to < txt.length ? '…' : '');
  }
  function markTerms(root, terms) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), nodes = [], n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var s = node.nodeValue, rs = termRanges(s, terms);
      if (!rs.length) return;
      var frag = document.createDocumentFragment(), pos = 0;
      rs.forEach(function (r) {
        if (r[0] > pos) frag.appendChild(document.createTextNode(s.slice(pos, r[0])));
        var m = document.createElement('mark'); m.className = 'sh'; m.textContent = s.slice(r[0], r[1]); frag.appendChild(m);
        pos = r[1];
      });
      if (pos < s.length) frag.appendChild(document.createTextNode(s.slice(pos)));
      node.parentNode.replaceChild(frag, node);
    });
  }
  // after opening a result: highlight the terms, flash and scroll to the matching block
  function revealHit(hit) {
    var terms = searchTerms(hit.q || ''), has = hit.b !== null && hit.b !== undefined && hit.b !== '';
    var el = has ? main.querySelector('.blk[data-b="' + hit.b + '"]') : null;
    if (terms.length) {
      // a title hit may sit in the title or in the one-line summary below it
      (el ? [el] : [main.querySelector('.part-title'), main.querySelector('.tldr')]).forEach(function (scope) { if (scope) markTerms(scope, terms); });
    }
    if (el) {
      el.classList.add('hit');
      window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - 90));
    } else toTop();
  }

  function pathLabel(e) {
    return esc(e.ch.no) + ' · ' + esc(plain(pTitle(e.ch, e.p))) + (e.k === 'q' ? ' · ' + (e.i + 1) + '번' : e.k === 'set' ? ' · 지시문' : '');
  }
  function resultHtml(e, terms, q) {
    var base = '#/c/' + e.ch.id + '/' + encodeURIComponent(e.p.id);
    if (e.k === 'q') {
      var it = e.p.items[e.i];
      var ans = it.reveal ? it.reveal : '<b>' + esc(ansText(it)) + '</b>';
      // when the words were found only in the explanation, open it so the match is visible
      var low = e.en.toLowerCase(), inSentence = terms.every(function (t) { return findAll(low, t).length > 0; });
      return '<div class="sr"><a class="sr-link" href="' + base + '"><span class="sr-path">' + pathLabel(e) + '</span><span class="sr-snip">' + snippet(e, terms) + '</span></a>' +
        '<details class="sr-d"' + (inSentence ? '' : ' open') + '><summary>정답 · 해설</summary><div class="sr-ans">' + ans + (it.why ? '<div class="sr-why">' + it.why + '</div>' : '') + '</div></details></div>';
    }
    var href2 = e.k === 'learn' ? base + '?b=' + (e.b === null ? '' : e.b) + '&q=' + encodeURIComponent(q) : base;
    return '<div class="sr"><a class="sr-link" href="' + href2 + '"><span class="sr-path">' + pathLabel(e) + '</span><span class="sr-snip">' + snippet(e, terms) + '</span></a></div>';
  }
  var SUGGEST = ['fragment', 'whom', 'FANBOYS', 'dangling', 'parallel', '세미콜론', '가정법', '도치'];
  var CAP = 40;
  function searchHtml(q) {
    var terms = searchTerms(q);
    var h = '<div class="wrap"><div class="ch-no">검색</div><h2 class="ch-title">' + (q ? esc(q) : '검색') + '</h2>';
    if (!terms.length) {
      h += '<div class="chips">' + SUGGEST.map(function (s) { return '<a class="rail-chip" href="#/search/' + encodeURIComponent(s) + '">' + esc(s) + '</a>'; }).join('') + '</div></div>';
      return h;
    }
    var res = runSearch(terms);
    if (!res.length) return h + '<div class="card empty" style="margin-top:18px"><b>결과가 없어요</b></div></div>';
    function group(title, list) {
      if (!list.length) return '';
      return '<section class="sr-group"><h3>' + title + ' <span>' + list.length + '</span></h3>' +
        list.slice(0, CAP).map(function (e) { return resultHtml(e, terms, q); }).join('') +
        (list.length > CAP ? '<div class="sr-more">+' + (list.length - CAP) + '개 더 있어요. 검색어를 더 구체적으로 써 보세요.</div>' : '') + '</section>';
    }
    function groups(list) {
      return group('개념 · 설명', list.filter(function (e) { return e.k === 'learn'; })) +
        group('문제', list.filter(function (e) { return e.k !== 'learn'; }));
    }
    var exact = res.filter(function (x) { return x.t === 0; }).map(function (x) { return x.e; });
    var loose = res.filter(function (x) { return x.t === 1; }).map(function (x) { return x.e; });
    if (!exact.length) return h + groups(loose) + '</div>';           // single words, or no exact phrase anywhere
    return h + groups(exact) + (loose.length ? '<details class="sr-loose"><summary>단어가 따로 들어간 결과 ' + loose.length + '개</summary>' + groups(loose) + '</details>' : '') + '</div>';
  }
  function showSearch(q) {
    run = null; runCtx = null;
    setTitle(q ? '검색 · ' + q : '검색');
    renderSide('search');
    var inp = $('#sbq'); if (inp && inp.value !== q) inp.value = q;
    main.innerHTML = searchHtml(q);
    var terms = searchTerms(q);
    if (terms.length) Array.prototype.forEach.call(main.querySelectorAll('.sr-ans'), function (a) { markTerms(a, terms); });
    toTop();
  }
  function doSearch(raw) {
    var q = raw.trim(), target = '#/search/' + encodeURIComponent(q);
    if (/^#\/search(\/|$)/.test(location.hash)) { history.replaceState(null, '', target); showSearch(q); }   // typing refines in place
    else location.hash = target;
  }

  (function initSearchUi() {
    var ico = '<svg class="ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
    $('#side').innerHTML = '<div id="sideBrand"></div><form id="sbForm" class="sb-search" role="search" autocomplete="off">' + ico +
      '<input id="sbq" type="search" placeholder="검색" aria-label="검색" enterkeyhint="search"><kbd>/</kbd></form><div id="sideNav"></div>';
    var btn = document.createElement('button');
    btn.id = 'searchBtn'; btn.type = 'button'; btn.className = 'search-btn'; btn.setAttribute('aria-label', '검색'); btn.innerHTML = ico;
    document.body.appendChild(btn);

    var inp = $('#sbq'), timer = null, wide = window.matchMedia('(min-width: 861px)');
    function focusSearch() {
      if (!wide.matches) document.body.classList.add('nav-open');
      inp.focus(); inp.select();
    }
    btn.addEventListener('click', focusSearch);
    $('#sbForm').addEventListener('submit', function (e) {
      e.preventDefault();
      doSearch(inp.value);
      if (!wide.matches) { closeNav(); inp.blur(); }
    });
    inp.addEventListener('input', function () {
      if (!wide.matches) return;                        // on phones the drawer covers the results: search on Enter
      clearTimeout(timer); timer = setTimeout(function () { doSearch(inp.value); }, 140);
    });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Escape') inp.blur(); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '')) return;
      e.preventDefault(); focusSearch();
    });
  })();

  /* router */
  function route() {
    var raw = location.hash.replace(/^#\/?/, '');
    if (/^search(\/|$)/.test(raw)) { var sq = ''; try { sq = decodeURIComponent(raw.slice(7)); } catch (err) { sq = raw.slice(7); } return showSearch(sq); }
    var qi = raw.indexOf('?'), query = qi >= 0 ? raw.slice(qi + 1) : '', h = qi >= 0 ? raw.slice(0, qi) : raw;
    try { h = decodeURIComponent(h); } catch (err2) { /* keep raw */ }
    var seg = h.split('/');
    if (seg[0] === 'c' && byId[seg[1]]) {
      var ch = byId[seg[1]];
      var pi = seg[2] ? ch.parts.findIndex(function (p) { return p.id === seg[2]; }) : defaultPart(ch);
      var hp = query ? new URLSearchParams(query) : null;
      return showChapter(ch, pi < 0 ? 0 : pi, hp && (hp.has('b') || hp.has('q')) ? { b: hp.get('b'), q: hp.get('q') } : null);
    }
    if (seg[0] === 'wrong') return showWrong();
    if (seg[0] === 'practice') {
      var pch = byId[seg[1]];
      return pch && quizParts(pch).length ? showPracticeLesson(pch) : showPractice();
    }
    showHome();
  }
  window.addEventListener('hashchange', route);
  if (!chapters.length) { main.innerHTML = '<div class="wrap"><div class="card empty">데이터가 아직 없어요.</div></div>'; }
  else route();
})();
