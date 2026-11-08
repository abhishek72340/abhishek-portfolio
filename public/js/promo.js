/* ============================================================
   Ebook promo: a card that slides up a few seconds into a visit.

   A fan of real pages from Sites That Convert sits at the top; hovering
   the card spreads the fan open. Shown at most once a week per browser,
   never on the ebook, pricing or account pages, and never to someone
   signed in who already owns the book. Add ?promo to any URL to preview.

   Self-contained: its styles live here, so one <script> tag is all a page
   needs (and the ?v= cache stamp on that tag covers the styles too).
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'tg.promo.seen', WEEK = 7 * 864e5, DELAY = 3500;
  var force = /[?&]promo\b/.test(location.search);
  var path = location.pathname.replace(/\.html$/, '');
  if (!force && /^\/(ebook|pricing|account)\/?$/.test(path)) return;
  try {
    if (!force && Date.now() - (+localStorage.getItem(KEY) || 0) < WEEK) return;
  } catch (e) { /* storage blocked: still fine to show once */ }

  var PAGES = ['p-costcurve', 'p-comp', 'p-colour', 'cover', 'p-screens', 'p-effects', 'p-direction'];

  var css = '' +
    '.tgp{position:fixed;inset:0;z-index:9000;display:grid;place-items:center;padding:16px;visibility:hidden}' +
    '.tgp.on{visibility:visible}' +
    '.tgp-scrim{position:absolute;inset:0;background:rgba(10,10,12,.46);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;transition:opacity .45s cubic-bezier(.22,1,.36,1)}' +
    '.tgp.on .tgp-scrim{opacity:1}' +
    '.tgp-card{outline:none;position:relative;width:min(640px,100%);max-height:calc(100dvh - 32px);overflow:auto;background:#fff;color:#121212;border-radius:28px;padding:12px;' +
      'box-shadow:0 40px 90px -30px rgba(0,0,0,.45);opacity:0;transform:translateY(28px) scale(.97);' +
      'transition:opacity .5s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}' +
    '.tgp.on .tgp-card{opacity:1;transform:none}' +
    '.tgp-x{position:absolute;top:22px;right:22px;z-index:5;width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.9);color:#121212;cursor:pointer;display:grid;place-items:center;box-shadow:0 2px 10px rgba(0,0,0,.08);transition:transform .3s cubic-bezier(.22,1,.36,1)}' +
    '.tgp-x:hover{transform:rotate(90deg)}' +
    '.tgp-x svg{width:16px;height:16px;stroke:currentColor;stroke-width:2;fill:none;stroke-linecap:round}' +
    '.tgp-stage{position:relative;height:250px;border-radius:20px;overflow:hidden;background:radial-gradient(120% 90% at 50% 100%,#ffe3ec 0%,#f3f3f1 58%,#efefed 100%)}' +
    '.tgp-page{position:absolute;left:50%;bottom:-62px;width:150px;aspect-ratio:1400/1980;margin-left:-75px;border-radius:8px;overflow:hidden;background:#ddd;' +
      'box-shadow:0 14px 30px -12px rgba(0,0,0,.35),0 0 0 1px rgba(0,0,0,.06);transform-origin:50% 120%;' +
      'transform:translateX(calc(var(--i) * 58px)) translateY(calc(var(--a) * 12px)) rotate(calc(var(--i) * 3deg));' +
      'transition:transform .7s cubic-bezier(.22,1,.36,1),box-shadow .7s}' +
    '.tgp-page img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.tgp-page.is-cover{width:176px;margin-left:-88px;bottom:-54px}' +
    /* hover: the fan opens and the cover lifts toward you */
    '.tgp-card:hover .tgp-page{transform:translateX(calc(var(--i) * 96px)) translateY(calc(var(--a) * 20px - 6px)) rotate(calc(var(--i) * 6deg))}' +
    '.tgp-card:hover .tgp-page.is-cover{transform:translateY(-22px) scale(1.05);box-shadow:0 30px 50px -18px rgba(0,0,0,.45),0 0 0 1px rgba(0,0,0,.06)}' +
    '.tgp-body{padding:30px 30px 26px}' +
    '.tgp-tag{display:inline-flex;align-items:center;gap:8px;margin:0 0 16px;padding:6px 12px;border-radius:999px;background:#fff0f4;color:#d81f57;font:500 11px/1 var(--mono,ui-monospace,monospace);letter-spacing:.12em;text-transform:uppercase}' +
    '.tgp-tag i{width:6px;height:6px;border-radius:50%;background:#fc4778;animation:tgp-pulse 1.8s ease-in-out infinite}' +
    '@keyframes tgp-pulse{50%{opacity:.25}}' +
    '.tgp-h{margin:0;font-family:var(--display,system-ui,sans-serif);font-weight:500;font-size:clamp(28px,4.4vw,40px);line-height:1.04;letter-spacing:-.035em;color:#121212;text-wrap:balance}' +
    '.tgp-p{margin:14px 0 0;font-size:16px;line-height:1.55;color:#5a5a5e;max-width:46ch}' +
    '.tgp-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;margin-top:24px}' +
    '.tgp-go{display:inline-flex;align-items:center;gap:10px;padding:15px 24px;border-radius:999px;background:#121212;color:#fff;font-size:15.5px;font-weight:500;text-decoration:none;transition:background .3s,transform .3s cubic-bezier(.22,1,.36,1)}' +
    '.tgp-go:hover{background:#fc4778;transform:translateY(-2px)}' +
    '.tgp-go span{transition:transform .3s cubic-bezier(.22,1,.36,1)}' +
    '.tgp-go:hover span{transform:translateX(3px)}' +
    '.tgp-later{border:0;background:none;padding:6px 2px;font:inherit;font-size:14.5px;color:#6b6b70;cursor:pointer;border-bottom:1px solid #d6d6d8}' +
    '.tgp-later:hover{color:#121212;border-color:#121212}' +
    '.tgp-fine{margin:18px 0 0;font-size:13px;color:#8a8a8f}' +
    '.tgp-fine a{color:#121212;border-bottom:1px solid #d6d6d8;text-decoration:none}' +
    '@media (max-width:560px){.tgp{align-items:end;padding:10px}.tgp-card{border-radius:24px}.tgp-stage{height:190px}' +
      '.tgp-page{width:104px;margin-left:-52px;bottom:-46px;transform:translateX(calc(var(--i) * 40px)) translateY(calc(var(--a) * 9px)) rotate(calc(var(--i) * 3deg))}' +
      '.tgp-page.is-cover{width:124px;margin-left:-62px;bottom:-40px}' +
      '.tgp-card:hover .tgp-page{transform:translateX(calc(var(--i) * 52px)) translateY(calc(var(--a) * 12px)) rotate(calc(var(--i) * 5deg))}' +
      '.tgp-body{padding:24px 18px 20px}.tgp-x{top:18px;right:18px}}' +
    '@media (prefers-reduced-motion:reduce){.tgp-scrim,.tgp-card,.tgp-page,.tgp-go{transition:none}.tgp-tag i{animation:none}}';

  function build() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    var fan = PAGES.map(function (p, n) {
      var i = n - 3;
      return '<div class="tgp-page' + (i === 0 ? ' is-cover' : '') + '" style="--i:' + i + ';--a:' + Math.abs(i) + ';z-index:' + (10 - Math.abs(i)) + '">' +
        '<img src="/images/promo/' + p + '.jpg" alt="" ' + (i === 0 ? '' : 'loading="lazy" ') + 'decoding="async" /></div>';
    }).join('');

    var el = document.createElement('div');
    el.className = 'tgp';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'tgp-h');
    el.innerHTML =
      '<div class="tgp-scrim" data-tgp-close></div>' +
      '<div class="tgp-card" tabindex="-1">' +
        '<button class="tgp-x" type="button" aria-label="Close" data-tgp-close><svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13"/></svg></button>' +
        '<div class="tgp-stage" aria-hidden="true">' + fan + '</div>' +
        '<div class="tgp-body">' +
          '<p class="tgp-tag"><i></i>New &middot; Edition 02</p>' +
          '<h2 class="tgp-h" id="tgp-h">Sites That Convert, Edition 02 is live</h2>' +
          '<p class="tgp-p">95 pages on designing sites that sell: 31 chapters, 12 editable templates and three worked briefs. Buy once, and every future edition is yours.</p>' +
          '<div class="tgp-row">' +
            '<a class="tgp-go" href="/ebook" data-tgp-go>Get the ebook <span aria-hidden="true">&rarr;</span></a>' +
            '<button class="tgp-later" type="button" data-tgp-close>Maybe later</button>' +
          '</div>' +
          '<p class="tgp-fine">Not sure yet? <a href="/read/7457b3a10bcfec5926a46feb/sites-that-convert.pdf" target="_blank" rel="noopener">Read a free sample &#8599;</a></p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);
    return el;
  }

  function show() {
    var last = document.activeElement;
    var el = build();
    try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('on'); }); });
    // focus the card itself, so keyboard users land inside without a ring on the button
    setTimeout(function () { el.querySelector('.tgp-card').focus({ preventScroll: true }); }, 400);

    function close() {
      el.classList.remove('on');
      document.removeEventListener('keydown', key);
      setTimeout(function () { el.remove(); if (last && last.focus) last.focus({ preventScroll: true }); }, 500);
    }
    function key(e) {
      if (e.key === 'Escape') close();
      // keep Tab inside the card while it is open
      if (e.key === 'Tab') {
        var f = el.querySelectorAll('a,button');
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    }
    document.addEventListener('keydown', key);
    el.addEventListener('click', function (e) {
      if (e.target.closest('[data-tgp-close]')) close();
    });
  }

  function whenReady() {
    // a signed-in owner of the book never sees it
    var A = window.TGAccount;
    (A && A.ready ? A.ready : Promise.resolve(null)).then(function (me) {
      if (me && me.ebook && !force) return;
      // wait for the tab to actually be in front, so the timer means "seconds on the page"
      if (document.hidden) {
        document.addEventListener('visibilitychange', function v() {
          if (!document.hidden) { document.removeEventListener('visibilitychange', v); setTimeout(show, DELAY); }
        });
      } else setTimeout(show, force ? 600 : DELAY);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', whenReady);
  else whenReady();
})();
