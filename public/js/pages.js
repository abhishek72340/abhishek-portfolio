/* ============================================================
   Products + Prompts page behaviour.
   Vanilla, no dependencies — same as the rest of the site.
   ============================================================ */
(function () {
  'use strict';
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- clips that load and play only while on screen ----------
     A reference page can carry seven or more films; preload="none" keeps
     them off the wire until they scroll into view, and they pause off it. */
  var plays = document.querySelectorAll('video[data-play]');
  if (plays.length && !calm && 'IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { var p = en.target.play(); if (p && p.catch) p.catch(function () {}); }
        else en.target.pause();
      });
    }, { threshold: 0.25 });
    [].forEach.call(plays, function (v) { pio.observe(v); });
  }

  /* ---------- same interactive dot field as the home hero ----------
     mountField is a top-level function in v2.js, so it's global here.
     Guarded in case this file ever loads without it. */
  var pageHero = document.querySelector('.page-hero');
  if (typeof mountField === 'function' && pageHero) {
    var heroField = mountField(pageHero, { gap: 17, dot: 0.95, alpha: 0.17, lift: 0.30 });
    // The homepage h1 gets the chromatic split/warp on hover; .page-hero h1
    // was never wired to it, so these headings sat inert.
    if (heroField && typeof splitText === 'function') {
      splitText(pageHero.querySelector('h1'), heroField, pageHero);
    }
  }

  /* ---------- cursor-tracked 3D tilt on product cards ---------- */
  if (fine && !calm) {
    document.querySelectorAll('.prod').forEach(function (card) {
      var raf = null;
      card.addEventListener('mousemove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
          var py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            'perspective(1100px) rotateY(' + (px * 7).toFixed(2) + 'deg) rotateX(' +
            (-py * 7).toFixed(2) + 'deg) translateY(-4px)';
          raf = null;
        });
      }, { passive: true });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      }, { passive: true });
    });
  }


  /* ---------- feature cards: fire the same animation on scroll ----------
     The reference only reacts to hover, which leaves the whole grid inert
     on a trackpad. Lighting cards as they enter view means the section
     animates on its own; hover still works independently. */
  var fcards = [].slice.call(document.querySelectorAll('.fcard'));
  if (fcards.length && !calm) {
    var seen = new WeakSet();
    var fio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var card = en.target;
        if (seen.has(card)) return;
        seen.add(card);
        // stagger across the row so they don't all pop at once
        var delay = (fcards.indexOf(card) % 3) * 110;
        setTimeout(function () {
          card.classList.add('is-lit');
          countUp(card);
          // release it after the beat so :hover takes over cleanly
          setTimeout(function () { card.classList.remove('is-lit'); }, 2600);
        }, delay);
      });
    }, { threshold: 0.42 });
    fcards.forEach(function (c) { fio.observe(c); });
    // the stat band counts the same way; it was never observed, which is why
    // every number on it stayed at zero
    document.querySelectorAll('.stat, .sstat').forEach(function (c) { fio.observe(c); });

    // re-run the count whenever the card is hovered too
    fcards.forEach(function (c) {
      c.addEventListener('mouseenter', function () { countUp(c); }, { passive: true });
    });
  }

  function countUp(card) {
    card.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.dataset.count, 10);
      if (isNaN(target) || el.dataset.running === '1') return;
      // A hidden/background tab throttles rAF to a single frame, which would
      // strand the counter on 0 forever. Skip the animation entirely there and
      // show the real number.
      var suffix = el.dataset.suffix || '';
      var show = function (n) { el.textContent = n.toLocaleString('en-IN') + suffix; };
      if (document.hidden) { show(target); return; }

      el.dataset.running = '1';
      var t0 = performance.now(), dur = 900;
      var settle = setTimeout(function () {      // safety net if rAF stalls mid-run
        show(target);
        el.dataset.running = '0';
      }, dur + 400);
      (function step(now) {
        var p = Math.min((now - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        show(Math.round(target * eased));
        if (p < 1) { requestAnimationFrame(step); }
        else { clearTimeout(settle); el.dataset.running = '0'; }
      })(t0);
    });
  }


  /* ---------- Access Today: sample viewer ---------- */
  document.querySelectorAll('.viewer').forEach(function (v) {
    var thumbs = [].slice.call(v.querySelectorAll('.viewer-thumbs button'));
    var slides = [].slice.call(v.querySelectorAll('.viewer-stage .spread'));
    var label  = v.querySelector('[data-viewer-label]');
    var names  = ['Cover', 'Process chapter', 'Layout chapter', 'Colour chapter'];
    function show(i) {
      slides.forEach(function (s, n) { s.classList.toggle('on', n === i); });
      thumbs.forEach(function (t, n) { t.classList.toggle('on', n === i); });
      if (label) label.textContent = names[i] || ('Page ' + (i + 1));
    }
    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('mouseenter', function () { show(i); }, { passive: true });
    });
    show(0);
    // gentle autoplay until the user interacts
    var auto = setInterval(function () {
      var cur = slides.findIndex(function (s) { return s.classList.contains('on'); });
      show((cur + 1) % slides.length);
    }, 3200);
    v.addEventListener('mouseenter', function () { clearInterval(auto); }, { passive: true });
  });

  /* ---------- About the ebook: height-animated disclosure ---------- */
  document.querySelectorAll('.about-toggle').forEach(function (btn) {
    var panel = document.querySelector(btn.getAttribute('data-target'));
    if (!panel) return;
    var inner = panel.firstElementChild;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.style.height = open ? '0px' : inner.offsetHeight + 'px';
    });
    addEventListener('resize', function () {
      if (btn.getAttribute('aria-expanded') === 'true') panel.style.height = inner.offsetHeight + 'px';
    }, { passive: true });
  });

  /* ---------- Start Earning More: pages fan out on scroll-in ---------- */
  var fans = [].slice.call(document.querySelectorAll('.fan'));
  if (fans.length) {
    if (calm) { fans.forEach(function (f) { f.classList.add('in'); }); }
    else {
      var fanIo = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); fanIo.unobserve(e.target); } });
      }, { threshold: 0.3 });
      fans.forEach(function (f) { fanIo.observe(f); });
    }
  }

  /* ---------- prompts: filter + search ---------- */
  var grid = document.querySelector('.pr-grid');
  if (grid) {
    var cards = [].slice.call(grid.querySelectorAll('.pcard'));
    var chips = [].slice.call(document.querySelectorAll('.chip'));
    var search = document.querySelector('.pr-search input');
    var countEl = document.querySelector('.pr-count');
    var empty = document.querySelector('.pr-empty');
    var activeCat = 'all';

    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var catOk = activeCat === 'all' || c.dataset.cat === activeCat;
        var hay = (c.dataset.cat + ' ' + c.textContent).toLowerCase();
        var qOk = !q || hay.indexOf(q) !== -1;
        var show = catOk && qOk;
        c.classList.toggle('is-hidden', !show);
        if (show) shown++;
      });
      if (countEl) countEl.textContent = shown + (shown === 1 ? ' prompt' : ' prompts');
      if (empty) empty.classList.toggle('on', shown === 0);
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.toggle('on', c === chip); });
        activeCat = chip.dataset.filter;
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
    apply();
  }

  /* ---------- copy to clipboard, with a real fallback ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // file:// and plain http have no async clipboard — fall back
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-9999px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // works for both the library cards (.pcard) and the detail-page
      // prompt boxes (.pbox) — same button, different text source
      var host = btn.closest('.pbox') || btn.closest('.pcard');
      // a button outside either (the one-click panel) names its source instead
      var src = host ? (host.querySelector('.pd-copy') || host.querySelector('.pcard-text'))
                     : document.querySelector(btn.getAttribute('data-copy-from') || '.pd-copy');
      if (!src) return;
      copyText(src.textContent.trim()).then(function () {
        btn.textContent = 'Copied ✓';
        btn.classList.add('done');
      }).catch(function () {
        btn.textContent = 'Press ⌘C';
        btn.classList.add('done');
      }).then(function () {
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('done');
        }, 1600);
      });
    });
  });

  /* ---------- expand / collapse a prompt ---------- */
  document.querySelectorAll('.more-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.pcard');
      var open = card.classList.toggle('open');
      btn.textContent = open ? 'Less' : 'More';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();


/* ============================================================
   Ebook lead capture.
   No backend yet: set data-endpoint on the form to a POST URL
   (Formspree, Buttondown, your own) and it submits there. Left
   blank, it falls back to a mailto hand-off so a lead is never
   silently dropped.
   ============================================================ */
(function () {
  'use strict';
  var form = document.querySelector('.lead-form');
  if (!form) return;
  var status = form.querySelector('.lead-status');
  var email = form.querySelector('input[type="email"]');

  email.addEventListener('input', function () { email.classList.remove('invalid'); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = email.value.trim();
    if (!v || !email.checkValidity()) {
      email.classList.add('invalid');
      status.textContent = 'That email doesn\u2019t look right.';
      status.className = 'lead-status err';
      email.focus();
      return;
    }
    var name = (form.querySelector('input[name="name"]') || {}).value || '';
    var endpoint = form.getAttribute('data-endpoint');

    if (endpoint) {
      status.textContent = 'Sending\u2026';
      status.className = 'lead-status';
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: v, name: name, source: 'prompts page', _subject: 'Ebook request', _cc: 'kunal.chaudhary.design@gmail.com', _replyto: v, _captcha: 'false', _honey: (form.querySelector('[name=_honey]') || {}).value || '' })
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        status.textContent = 'Done \u2014 it\u2019s on its way to your inbox.';
        status.className = 'lead-status ok';
      }).catch(function () {
        status.textContent = 'That didn\u2019t send. Email kunal@thinkingods.com and I\u2019ll forward it.';
        status.className = 'lead-status err';
      });
      return;
    }

    // no endpoint configured — hand off to email rather than lose the lead
    status.textContent = 'Opening your email client\u2026';
    status.className = 'lead-status ok';
    window.location.href = 'mailto:kunal@thinkingods.com?cc=kunal.chaudhary.design@gmail.com'
      + '&subject=' + encodeURIComponent('Ebook request')
      + '&body=' + encodeURIComponent('Please send me the ebook.\n\nEmail: ' + v + (name ? '\nName: ' + name : ''));
  });
})();
