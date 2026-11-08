/* ============================================================
   Search box for the nav. The button opens a <dialog>; ⌘K or Ctrl K opens
   it from anywhere. It searches /search-index.json, which build.sh writes
   from the cards on prompts.html, the carousel kit and the main pages, and
   which is only fetched once someone reaches for search.
   ============================================================ */
(function () {
  'use strict';

  var trigger = document.querySelector('[data-search]');
  if (!trigger) return;

  var mac = /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
  var key = trigger.querySelector('kbd');
  if (key && !mac) key.textContent = 'Ctrl K';

  var CHIPS = ['scroll', 'video', '3D', 'carousel', 'WebGL', 'landing page'];
  var GLASS = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.4"/><path d="m10.4 10.4 3.1 3.1"/></svg>';
  var PAGE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h5.5L12 5v8.5H4zM9.5 2.5V5H12"/></svg>';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }

  var items = null, loading = null, box, input, body, hits = [], active = -1;

  function load() {
    if (!loading) loading = fetch('/search-index.json')
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { items = d; })
      .catch(function () { loading = null; items = null; });
    return loading;
  }

  // every word must appear somewhere; the name counts for most, then the title
  function find(q) {
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    var out = [];
    items.forEach(function (it, i) {
      var name = it.n.toLowerCase(), title = (it.t || '').toLowerCase(), score = 0;
      for (var w = 0; w < words.length; w++) {
        var word = words[w];
        if (name.indexOf(word) === 0) score += 8;
        else if (name.indexOf(word) > -1) score += 5;
        else if (title.indexOf(word) > -1) score += 3;
        else if (it.s.indexOf(word) > -1) score += 1;
        else return;
      }
      out.push({ it: it, score: score, i: i });
    });
    return out.sort(function (a, b) { return b.score - a.score || a.i - b.i; }).slice(0, 30).map(function (x) { return x.it; });
  }

  function emptyView() {
    return '<div class="tgq-empty"><p>Try a technique, a look or a tool.</p><div class="tgq-chips">' +
      CHIPS.map(function (c) { return '<button type="button" data-q="' + esc(c) + '">' + esc(c) + '</button>'; }).join('') + '</div></div>';
  }

  function row(it, i) {
    return '<li role="presentation"><a class="tgq-item" id="tgq-' + i + '" role="option" aria-selected="false" href="' + esc(it.h) + '" data-i="' + i + '">' +
      '<span class="tgq-thumb">' + (it.i ? '<img src="' + esc(it.i) + '" alt="" loading="lazy" />' : PAGE) + '</span>' +
      '<span class="tgq-text"><b>' + esc(it.n) + '</b><span>' + esc(it.t || '') + '</span></span>' +
      (it.b ? '<span class="tgq-badge tgq-badge--' + esc(it.b.toLowerCase()) + '">' + esc(it.b) + '</span>' : '') +
      '</a></li>';
  }

  function setActive(i, scroll) {
    var rows = body.querySelectorAll('.tgq-item');
    if (rows[active]) { rows[active].classList.remove('on'); rows[active].setAttribute('aria-selected', 'false'); }
    active = i;
    if (rows[i]) {
      rows[i].classList.add('on'); rows[i].setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', rows[i].id);
      if (scroll) rows[i].scrollIntoView({ block: 'nearest' });
    } else input.removeAttribute('aria-activedescendant');
  }

  function render() {
    var q = input.value.trim();
    active = -1; hits = [];
    input.removeAttribute('aria-activedescendant');
    if (!q) { body.innerHTML = emptyView(); return; }
    if (!items) {
      body.innerHTML = '<div class="tgq-empty"><p>Loading&hellip;</p></div>';
      load().then(function () {
        if (items) render();
        else body.innerHTML = '<div class="tgq-empty"><p>Search could not load. <a href="/prompts">Browse all prompts</a>.</p></div>';
      });
      return;
    }
    hits = find(q);
    if (!hits.length) {
      body.innerHTML = '<div class="tgq-empty"><p>Nothing matches &ldquo;' + esc(q) + '&rdquo;. Try a broader word, or <a href="/prompts">browse all prompts</a>.</p></div>';
      return;
    }
    body.innerHTML = '<ul class="tgq-list" role="listbox" id="tgq-list">' + hits.map(row).join('') + '</ul>';
    body.scrollTop = 0;
    setActive(0);
  }

  function build() {
    box = document.createElement('dialog');
    box.className = 'tgq';
    box.setAttribute('aria-label', 'Search Thinking Gods');
    box.innerHTML = '<div class="tgq-bar">' + GLASS +
      '<input type="search" placeholder="Search prompts, kits and pages" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="tgq-list" aria-label="Search" />' +
      '<button class="tgq-esc" type="button" data-close>Esc</button></div>' +
      '<div class="tgq-body"></div>' +
      '<div class="tgq-foot"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> move</span><span><kbd>&crarr;</kbd> open</span><span><kbd>esc</kbd> close</span></div>';
    document.body.appendChild(box);
    input = box.querySelector('input');
    body = box.querySelector('.tgq-body');

    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (hits.length) setActive((active + (e.key === 'ArrowDown' ? 1 : -1) + hits.length) % hits.length, true);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (hits[active]) location.href = hits[active].h;
      }
    });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.closest('[data-close]')) { box.close(); return; }
      var chip = e.target.closest('[data-q]');
      if (chip) { input.value = chip.getAttribute('data-q'); input.focus(); render(); }
    });
    body.addEventListener('mousemove', function (e) {
      var r = e.target.closest('.tgq-item');
      if (r && +r.getAttribute('data-i') !== active) setActive(+r.getAttribute('data-i'));
    });
    box.addEventListener('close', function () { document.documentElement.style.overflow = ''; trigger.focus({ preventScroll: true }); });
  }

  function open() {
    if (!box) build();
    if (box.open) return;
    load();
    document.documentElement.style.overflow = 'hidden';
    box.showModal();
    input.select();
    render();
  }

  trigger.addEventListener('click', open);
  // fetch early once they lean towards it, so the first letters find something
  trigger.addEventListener('pointerenter', load, { once: true });
  addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (box && box.open) box.close(); else open();
    }
  });
})();
