/* ============================================================
   Accounts.

   One small file shared by every page that knows about members:
   the session (a Supabase session, held in localStorage and refreshed
   through /api/auth/refresh), the nav link, the hearts on library cards,
   the premium prompt gates, and the /account page itself.

   The browser never sees a Supabase key and never sees premium text it
   is not entitled to: /api/premium checks the plan on every request.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'tg.session';
  var NEXT = 'tg.next';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function save(s) { try { s ? localStorage.setItem(KEY, JSON.stringify(s)) : localStorage.removeItem(KEY); } catch (e) {} }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }
  var LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>';
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>';

  /* ---- 1. a magic link or Google lands here with the session in the hash ---- */
  var authError = null;
  if (/access_token=|error_description=/.test(location.hash)) {
    var h = new URLSearchParams(location.hash.slice(1));
    if (h.get('access_token')) {
      save({
        access_token: h.get('access_token'),
        refresh_token: h.get('refresh_token'),
        expires_at: +h.get('expires_at') || Math.floor(Date.now() / 1000) + (+h.get('expires_in') || 3600)
      });
    } else {
      authError = (h.get('error_description') || 'That sign-in link did not work.').replace(/\+/g, ' ');
    }
    history.replaceState(null, '', location.pathname + location.search);
  }

  /* ---- 2. the session ---- */
  var refreshing = null;
  function token() {
    var s = load();
    if (!s) return Promise.resolve(null);
    if (s.expires_at - 60 > Date.now() / 1000) return Promise.resolve(s.access_token);
    if (!refreshing) {
      refreshing = fetch('/api/auth/refresh', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: s.refresh_token })
      }).then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { refreshing = null; save(d && d.access_token ? d : null); return d ? d.access_token : null; })
        .catch(function () { refreshing = null; return null; });
    }
    return refreshing;
  }

  function api(path, opts) {
    opts = opts || {};
    return token().then(function (t) {
      if (!t) return { status: 401, data: { error: 'Not signed in.' } };
      var head = { Authorization: 'Bearer ' + t };
      if (opts.body) head['Content-Type'] = 'application/json';
      return fetch(path, { method: opts.method || 'GET', headers: head, body: opts.body && JSON.stringify(opts.body) })
        .then(function (r) {
          if (opts.blob && r.ok) return r.blob().then(function (b) { return { status: r.status, blob: b }; });
          return r.json().catch(function () { return {}; }).then(function (d) { return { status: r.status, data: d }; });
        });
    }).catch(function () { return { status: 0, data: { error: 'Could not reach the server. Check your connection.' } }; });
  }

  var A = window.TGAccount = { me: null, api: api };
  A.signOut = function () { save(null); location.href = 'account'; };

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, no) {
      var t = document.createElement('textarea');
      t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      var done = false; try { done = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(t); done ? ok() : no();
    });
  }
  function flash(btn, msg) {
    var was = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', was);
    btn.textContent = msg; btn.classList.add('done');
    setTimeout(function () { btn.textContent = was; btn.classList.remove('done'); }, 1600);
  }
  function nextMonday(iso) {
    try { return new Date(iso).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }); }
    catch (e) { return 'Monday'; }
  }
  function date(iso) { return iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''; }
  function back() { return encodeURIComponent(location.pathname + location.search); }

  /* ---- 3. hearts on library cards: drawn at once, filled in once we know ---- */
  var cards = [].slice.call(document.querySelectorAll('.lcard[data-slug]'));
  cards.forEach(function (card) {
    var media = card.querySelector('.lcard-media');
    if (!media || media.querySelector('.lcard-fav')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'lcard-fav';
    b.setAttribute('aria-label', 'Save to favourites'); b.setAttribute('aria-pressed', 'false');
    b.innerHTML = HEART;
    media.appendChild(b);
    function stop(e) { e.stopPropagation(); }
    b.addEventListener('keydown', stop);
    b.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      if (!A.me) { location.href = 'account?next=' + back(); return; }
      var on = b.getAttribute('aria-pressed') !== 'true';
      setHeart(b, on);
      api('/api/favourite', { method: 'POST', body: { slug: card.dataset.slug, on: on } })
        .then(function (r) { if (r.status !== 200) setHeart(b, !on); });
    });
  });
  function setHeart(b, on) {
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.setAttribute('aria-label', on ? 'Remove from favourites' : 'Save to favourites');
    b.classList.toggle('on', on);
    if (on) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
  }

  /* ---- 4. premium prompt gates ---- */
  var gate = document.querySelector('.pbox--gate[data-premium]');
  var prompt = null;          // the text, once opened

  function gateSet(title, text, cta, busy) {
    if (!gate) return;
    gate.querySelector('[data-gate-title]').textContent = title;
    gate.querySelector('[data-gate-text]').innerHTML = text;
    gate.querySelector('[data-gate-cta]').innerHTML = cta || '';
    gate.classList.toggle('is-busy', !!busy);
  }

  function openPrompt() {
    var slug = gate.dataset.premium;
    gateSet('Opening…', 'One moment.', '', true);
    api('/api/premium?slug=' + encodeURIComponent(slug) + '&kind=prompt').then(function (r) {
      if (r.status === 200) {
        prompt = r.data.text;
        var pre = gate.querySelector('.pd-copy');
        pre.textContent = prompt; pre.hidden = false;
        gate.querySelector('.gate').hidden = true;
        gate.querySelector('[data-gate-copy]').hidden = false;
        gate.classList.add('is-open');
        if (A.me && r.data.limit) A.me.week.used = r.data.used;
        return;
      }
      var d = r.data || {};
      if (d.need === 'limit') gateSet('That is this week’s ten', esc(d.error), '<a class="btn btn--solid" href="pricing">Go God Mode</a>');
      else if (d.need === 'godmode') gateSet('God Mode', esc(d.error), '<a class="btn btn--solid" href="pricing">Go God Mode</a>');
      else if (d.need === 'plan') gateSet('Members only', esc(d.error), '<a class="btn btn--solid" href="pricing">See plans</a>');
      else if (d.need === 'signin') gateSet('Sign in', esc(d.error), '<a class="btn btn--solid" href="account?next=' + back() + '">Sign in</a>');
      else gateSet('Not this time', esc(d.error || 'Something went wrong.'), '<button class="btn btn--solid" type="button" data-gate-open>Try again</button>');
    });
  }

  function gates() {
    if (!gate) return;
    var slug = gate.dataset.premium, early = gate.dataset.early === '1';
    var me = A.me, plan = me && me.plan;
    if (!me) return;                                         // the authored state is the signed-out one
    if (!plan) {
      gateSet('Members only', 'Creator opens ten new premium prompts a week. God Mode opens all of them, plus the source files.',
        '<a class="btn btn--solid" href="pricing">See plans</a>');
      return;
    }
    if (early && plan.tier !== 'godmode') {
      gateSet('Early access', 'This one is God Mode only until its reel goes out. Creator gets it the same day.',
        '<a class="btn btn--solid" href="pricing">Go God Mode</a>');
      return;
    }
    var opened = (me.unlocked || []).some(function (u) { return u.slug === slug; });
    if (plan.tier === 'godmode' || opened) { openPrompt(); return; }
    var left = plan.weekly - me.week.used;
    if (left <= 0) {
      gateSet('That is this week’s ten', 'Prompts you have opened stay open. New ones unlock again on ' + esc(nextMonday(me.week.resets)) + '.',
        '<a class="btn btn--solid" href="pricing">Go God Mode</a>');
      return;
    }
    gateSet('Ready when you are', 'Opening it uses one of your ten new prompts this week. <b>' + left + '</b> left.',
      '<button class="btn btn--solid" type="button" data-gate-open>Open this prompt</button>');
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-gate-open],[data-gate-copy],[data-premium-get]');
    if (!t) return;
    e.preventDefault();
    if (t.hasAttribute('data-gate-open')) { openPrompt(); return; }
    if (t.hasAttribute('data-gate-copy')) {
      if (prompt) { copyText(prompt).then(function () { flash(t, 'Copied ✓'); }, function () { flash(t, 'Press ⌘C'); }); return; }
      if (gate) { gate.scrollIntoView({ behavior: 'smooth', block: 'center' }); gate.classList.remove('nudge'); void gate.offsetWidth; gate.classList.add('nudge'); }
      return;
    }
    // asset packs and source files: God Mode, delivered as a download
    var kind = t.getAttribute('data-premium-get');
    if (!A.me) { location.href = 'account?next=' + back(); return; }
    if (!A.me.plan || (!A.me.plan.files && !t.hasAttribute('data-members'))) { location.href = 'pricing'; return; }
    flash(t, 'Preparing…');
    api('/api/premium?slug=' + encodeURIComponent(gate.dataset.premium) + '&kind=' + kind, { blob: true }).then(function (r) {
      if (!r.blob) { flash(t, (r.data && r.data.error) ? 'Not available' : 'Try again'); return; }
      var a = document.createElement('a');
      a.href = URL.createObjectURL(r.blob); a.download = gate.dataset.premium + '-' + kind + '.zip';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    });
  });

  /* ---- 5. the /account page ---- */
  var root = document.querySelector('[data-acct]');

  function signInView() {
    var out = root.querySelector('[data-acct-out]');
    root.querySelector('[data-acct-in]').hidden = true;
    out.hidden = false;
    var form = out.querySelector('form'), msg = out.querySelector('[data-acct-msg]');
    var params = new URLSearchParams(location.search);
    if (params.get('next')) try { sessionStorage.setItem(NEXT, params.get('next')); } catch (e) {}
    if (authError) { msg.textContent = authError + ' Ask for a new link below.'; msg.classList.add('is-bad'); }
    // sent here by a plan button: say why, and that checkout follows
    var going = params.get('next') || '';
    try { going = going || sessionStorage.getItem(NEXT) || ''; } catch (e) {}
    if (/^\/pricing\?buy=plan-/.test(going)) out.querySelectorAll('.acct-lede').forEach(function (l) {
      l.innerHTML = 'Sign in or create an account to continue. Checkout opens right after.';
    });

    // one card, two modes: sign in, or create an account (adds name + digest)
    var panel = out.querySelector('.acct-panel');
    if (/[?&#]signup\b/.test(location.search + location.hash)) panel.setAttribute('data-mode', 'up');
    out.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-mode-to]');
      if (!t) return;
      panel.setAttribute('data-mode', t.getAttribute('data-mode-to'));
      msg.textContent = ''; msg.classList.remove('is-bad');
      (panel.getAttribute('data-mode') === 'up' ? form.elements['name'] : form.email).focus();
    });

    fetch('/api/auth/config').then(function (r) { return r.json(); }).then(function (c) {
      if (c.google && c.google_url) {
        var g = out.querySelector('[data-google]');
        g.href = c.google_url; g.hidden = false;
        out.querySelector('[data-or]').hidden = false;
      }
    }).catch(function () {});

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.email.value.trim(), btn = form.querySelector('button[type=submit]');
      var up = panel.getAttribute('data-mode') === 'up', label = btn.getAttribute('data-html') || btn.innerHTML;
      btn.setAttribute('data-html', label);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = 'Enter a valid email address.'; msg.classList.add('is-bad'); return; }
      btn.disabled = true; btn.textContent = 'Sending…'; msg.textContent = ''; msg.classList.remove('is-bad');
      var next = ''; try { next = sessionStorage.getItem(NEXT) || ''; } catch (e2) {}
      fetch('/api/auth/link', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(up ? { email: email, next: next, name: form.elements['name'].value.trim(), digest: form.digest.checked } : { email: email, next: next }) })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (r) {
          if (!r.ok) throw new Error(r.d.error || 'Could not send the link.');
          out.classList.add('is-sent');
          out.querySelector('[data-sent-to]').textContent = email;
          var n = 45;
          btn.textContent = 'Resend in ' + n + 's';
          var iv = setInterval(function () {
            n--; btn.textContent = n > 0 ? 'Resend in ' + n + 's' : 'Send it again';
            if (n <= 0) { clearInterval(iv); btn.disabled = false; }
          }, 1000);
        })
        .catch(function (err) { btn.disabled = false; btn.innerHTML = label; msg.textContent = err.message; msg.classList.add('is-bad'); });
    });
  }

  function money(o) {
    var v = o.amount / 100;
    return (o.currency === 'USD' ? '$' : '₹') + v.toLocaleString(o.currency === 'USD' ? 'en-US' : 'en-IN');
  }
  function tile(c) {
    return '<a class="acct-card" href="' + esc(c.href || 'prompts#library') + '"><span class="acct-thumb"><img src="' + esc(c.img) + '" alt="" loading="lazy" /></span>' +
      '<span class="acct-card-t">' + esc(c.title) + '</span>' + (c.tier === 'premium' ? '<span class="acct-tag">' + (c.early ? 'Early' : 'Premium') + '</span>' : '') + '</a>';
  }

  function daysUntil(iso) {
    var d = Math.ceil((new Date(iso) - Date.now()) / 864e5);
    return d <= 1 ? 'tomorrow' : 'in ' + d + ' days';
  }
  function favTile(c) {
    return '<div class="acct-card-wrap" data-fav-slug="' + esc(c.slug) + '">' + tile(c) +
      '<button class="acct-unfav" type="button" aria-label="Remove ' + esc(c.title) + ' from favourites">' + HEART + '</button></div>';
  }
  function row(c) {
    return '<a class="acct-row" href="' + esc(c.href || 'prompts#library') + '"><span class="acct-row-thumb"><img src="' + esc(c.img) + '" alt="" loading="lazy" /></span>' +
      '<span class="acct-row-t"><b>' + esc(c.title) + '</b><span class="mono">Opened ' + esc(date(c.at)) + '</span></span>' +
      (c.this_week ? '<span class="acct-tag acct-tag--inline">This week</span>' : '') +
      (c.tier === 'premium' ? '<span class="acct-tag acct-tag--inline acct-tag--soft">' + (c.early ? 'Early' : 'Premium') + '</span>' : '') +
      '<span class="acct-row-go" aria-hidden="true">Open &rarr;</span></a>';
  }

  // name and picture: Google gives both; email sign-ups get their initial
  function identity(box, me) {
    var av = box.querySelector('[data-avatar]');
    box.querySelector('[data-name]').textContent = me.name || 'Your library';
    if (me.avatar) {
      av.innerHTML = '<img src="' + esc(me.avatar) + '" alt="" referrerpolicy="no-referrer" />';
      av.querySelector('img').onerror = function () { av.textContent = (me.name || me.email || '?').charAt(0).toUpperCase(); };
    } else av.textContent = (me.name || me.email || '?').charAt(0).toUpperCase();
  }

  function editForm(box, me) {
    var f = box.querySelector('[data-edit-form]'), open = box.querySelector('[data-edit]'), msg = box.querySelector('[data-edit-msg]');
    if (f.dataset.wired) return;
    f.dataset.wired = '1';
    var show = function (on) {
      f.hidden = !on; open.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) { f.elements['name'].value = me.name || ''; f.digest.checked = !!me.digest; f.querySelector('[data-edit-email]').value = me.email; msg.textContent = ''; f.elements['name'].focus(); }
    };
    open.addEventListener('click', function () { show(f.hidden); });
    box.querySelector('[data-edit-cancel]').addEventListener('click', function () { show(false); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = f.querySelector('button[type=submit]');
      btn.disabled = true; msg.textContent = 'Saving…'; msg.classList.remove('is-bad');
      api('/api/me', { method: 'PATCH', body: { name: f.elements['name'].value.trim(), digest: f.digest.checked } }).then(function (r) {
        btn.disabled = false;
        if (r.status !== 200) { msg.textContent = (r.data && r.data.error) || 'Could not save.'; msg.classList.add('is-bad'); return; }
        me.name = r.data.name; me.digest = r.data.digest;
        navAccount(navPerson(me));
        identity(box, me);
        show(false);
      });
    });
  }

  function dashboard(me) {
    root.querySelector('[data-acct-out]').hidden = true;
    var box = root.querySelector('[data-acct-in]');
    box.hidden = false;
    var plan = me.plan;
    box.querySelector('[data-email]').textContent = me.email;
    identity(box, me);
    box.querySelector('[data-since]').textContent = me.since ? 'Member since ' + new Date(me.since).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : '';
    editForm(box, me);
    var badge = box.querySelector('[data-badge]');
    badge.textContent = plan ? plan.label : 'Free';
    badge.classList.toggle('is-god', !!plan && plan.tier === 'godmode');

    // plan
    var p = box.querySelector('[data-plan]');
    p.classList.toggle('is-god', !!plan && plan.tier === 'godmode');
    p.innerHTML = plan
      ? '<p class="acct-k mono">Your plan</p><h2>' + esc(plan.label) + '</h2><p class="acct-sub">' +
        (plan.expires_at ? 'Active until ' + esc(date(plan.expires_at)) + '.' : 'Lifetime. Yours for good.') + '</p>' +
        (plan.tier !== 'godmode' ? '<a class="btn btn--solid" href="pricing">Go God Mode</a>' :
          plan.expires_at ? '<a class="btn btn--ghost" href="pricing">Go lifetime</a>' : '')
      : '<p class="acct-k mono">Your plan</p><h2>No plan yet</h2><p class="acct-sub">Free prompts are open to everyone. Plans open the premium library.</p><a class="btn btn--solid" href="pricing">See plans</a>';

    // weekly allowance
    var u = box.querySelector('[data-usage]'), note = box.querySelector('[data-week-note]');
    if (plan && plan.weekly) {
      var used = Math.min(me.week.used, plan.weekly), left = plan.weekly - used, pct = used / plan.weekly;
      u.innerHTML = '<p class="acct-k mono">This week</p><div class="acct-ring" style="--p:' + pct + '"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><circle class="arc" cx="60" cy="60" r="52"/></svg>' +
        '<b>' + used + '<small>/' + plan.weekly + '</small></b></div><p class="acct-sub"><b>' + left + '</b> new prompt' + (left === 1 ? '' : 's') + ' left. Resets ' + esc(nextMonday(me.week.resets)) + ', ' + daysUntil(me.week.resets) + '.</p>';
      note.textContent = 'Each premium prompt counts once, the first time you open it. Everything below stays open to you, as often as you like.';
    } else if (plan) {
      u.innerHTML = '<p class="acct-k mono">This week</p><b class="acct-inf">&infin;</b><p class="acct-sub">No limits. Open, copy and download anything.</p>';
      note.textContent = 'Every premium prompt you have opened. Open, copy and download them as often as you like.';
    } else {
      u.innerHTML = '<p class="acct-k mono">This week</p><h3>Premium prompts</h3><p class="acct-sub">Creator opens ten new ones a week. God Mode opens all of them.</p><a class="btn btn--ghost" href="pricing">Compare plans</a>';
      note.textContent = '';
    }

    // ebook
    var eb = box.querySelector('[data-ebook]');
    eb.innerHTML = me.ebook
      ? '<p class="acct-k mono">Your ebook</p><h3>Sites That Convert</h3><p class="acct-sub">Edition 02, and every edition after it.</p><button class="btn btn--solid" type="button" data-ebook-dl>Download the PDF</button>'
      : '<p class="acct-k mono">The ebook</p><h3>Sites That Convert</h3><p class="acct-sub">Included with every plan, or on its own.</p><a class="btn btn--ghost" href="ebook#buy">Get the ebook</a>';

    // tabs
    function count(k, n) { box.querySelector('[data-count="' + k + '"]').textContent = n ? n : ''; }
    var opened = box.querySelector('[data-opened]');
    opened.innerHTML = me.unlocked.length ? me.unlocked.map(row).join('')
      : '<p class="acct-empty">' + (plan ? 'Premium prompts you open show up here, and stay open.' : 'Premium prompts you open with a plan show up here.') + ' <a href="prompts#library">Browse the library</a>.</p>';
    count('downloads', me.unlocked.length);

    var favs = box.querySelector('[data-favs]');
    function drawFavs() {
      favs.innerHTML = me.favourites.length ? me.favourites.map(favTile).join('')
        : '<p class="acct-empty">Tap the heart on any card in the <a href="prompts#library">library</a> and it lands here.</p>';
      count('favs', me.favourites.length);
    }
    drawFavs();
    favs.onclick = function (e) {
      var b = e.target.closest('.acct-unfav'); if (!b) return;
      e.preventDefault();
      var wrap = b.closest('[data-fav-slug]'), slug = wrap.getAttribute('data-fav-slug');
      wrap.classList.add('is-leaving');
      api('/api/favourite', { method: 'POST', body: { slug: slug, on: false } }).then(function (r) {
        if (r.status !== 200) { wrap.classList.remove('is-leaving'); return; }
        me.favourites = me.favourites.filter(function (f) { return f.slug !== slug; });
        setTimeout(drawFavs, 280);
      });
    };

    var earlyTab = box.querySelector('[data-tab="early"]');
    earlyTab.hidden = !me.early.length;
    box.querySelector('[data-early]').innerHTML = me.early.map(tile).join('');
    count('early', me.early.length);

    var o = box.querySelector('[data-orders]');
    o.innerHTML = me.orders.length
      ? me.orders.map(function (x) { return '<li><span>' + esc(x.name) + '</span><span class="mono">' + esc(date(x.paid_at)) + '</span><b>' + esc(money(x)) + '</b></li>'; }).join('')
      : '<li class="acct-empty">Nothing yet.</li>';
    count('orders', me.orders.length);

    var tabs = box.querySelectorAll('[data-tab]');
    tabs.forEach(function (t) {
      t.onclick = function () {
        tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
        box.querySelectorAll('[data-pane]').forEach(function (pn) { pn.hidden = pn.getAttribute('data-pane') !== t.getAttribute('data-tab'); });
      };
    });

    box.classList.add('is-in');
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-signout]')) { e.preventDefault(); A.signOut(); }
    var dl = e.target.closest && e.target.closest('[data-ebook-dl]');
    if (dl) {
      flash(dl, 'Preparing…');
      api('/api/ebook').then(function (r) { if (r.data && r.data.url) location.href = r.data.url; else flash(dl, 'Try again'); });
    }
  });

  /* ---- 6. find out who this is, then let every part render ---- */
  var hadSession = !!load();

  // the nav's account pill: Sign in, or the name and plan. The last answer is
  // kept so a page opens with the name already there, then /api/me confirms it.
  var NAV = 'tg.nav', navOut = null, navWho = null;
  function navPerson(me) {
    return {
      name: (me.name || (me.email || '').split('@')[0] || 'Account').split(' ')[0],
      avatar: me.avatar || '',
      tier: me.plan ? me.plan.tier : 'free',
      label: me.plan ? me.plan.label : 'Free'
    };
  }
  function navAccount(who) {
    document.querySelectorAll('[data-acct-link]').forEach(function (a) {
      if (navOut === null) navOut = a.innerHTML;
      a.classList.toggle('is-in', !!who);
      if (!who) { a.innerHTML = navOut; a.removeAttribute('aria-label'); return; }
      a.setAttribute('aria-label', 'Your account: ' + who.name + ', ' + who.label + ' plan');
      var letter = esc(who.name.charAt(0).toUpperCase());
      a.innerHTML = '<span class="nav-av" aria-hidden="true">' + (who.avatar ? '<img src="' + esc(who.avatar) + '" alt="" referrerpolicy="no-referrer" />' : letter) + '</span>' +
        '<span class="nav-who">' + esc(who.name) + '</span><span class="nav-tag nav-tag--' + esc(who.tier) + '">' + esc(who.label) + '</span>';
      var img = a.querySelector('img');
      if (img) img.onerror = function () { img.parentNode.textContent = who.name.charAt(0).toUpperCase(); };
    });
  }
  if (hadSession) try { navWho = JSON.parse(localStorage.getItem(NAV)); if (navWho) navAccount(navWho); } catch (e) {}

  A.ready = (hadSession ? api('/api/me') : Promise.resolve({ status: 401 })).then(function (r) {
    if (r.status === 200) A.me = r.data;
    else if (r.status === 401) save(null);           // other failures keep the session for a retry
    var me = A.me;

    document.documentElement.classList.toggle('is-signed-in', !!me);
    if (me) { navWho = navPerson(me); try { localStorage.setItem(NAV, JSON.stringify(navWho)); } catch (e) {} navAccount(navWho); }
    else if (r.status === 401) { try { localStorage.removeItem(NAV); } catch (e) {} navAccount(null); }
    if (me) cards.forEach(function (card) {
      var b = card.querySelector('.lcard-fav');
      if (b) setHeart(b, me.favourites.some(function (f) { return f.slug === card.dataset.slug; }));
    });
    gates();

    // pricing: mark the plan they already hold
    if (me && me.plan) document.querySelectorAll('[data-plan-card="' + me.plan.tier + '"]').forEach(function (c) { c.classList.add('is-current'); });

    if (root) {
      var ld = root.querySelector('[data-acct-load]'); if (ld) ld.hidden = true;
      if (me) {
        var next = new URLSearchParams(location.search).get('next');
        try { next = next || sessionStorage.getItem(NEXT); sessionStorage.removeItem(NEXT); } catch (e) {}
        if (next && /^\/[^/]/.test(next) && next.indexOf('/account') !== 0) { location.replace(next); return me; }
        dashboard(me);
      } else if (hadSession && r.status !== 401) {
        root.querySelector('[data-acct-out]').hidden = true;
        root.querySelector('[data-acct-err]').hidden = false;
      } else signInView();
    }
    document.dispatchEvent(new CustomEvent('tg:account', { detail: me }));
    return me;
  });
})();
