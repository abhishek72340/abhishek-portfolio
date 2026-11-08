/* ============================================================
   Early Access Sale: a slim bar above the nav with a live countdown,
   after the getlayers.ai pricing banner. God Mode lifetime is half
   price until SALE_ENDS.

   The server charges the sale price only until the same instant
   (SALE_ENDS in functions/api/_products.js): change both together.
   Once it has passed, the bar stops showing and the pricing card goes
   back to full price on its own.

   Self-contained: its styles live here, so one <script> tag is all a
   page needs.
   ============================================================ */
(function () {
  'use strict';

  var ENDS = Date.parse('2026-11-30T23:59:59+05:30');
  var PRICE = { INR: { was: '₹19,999', now: '₹9,999' }, USD: { was: '$399', now: '$199' } };

  if (Date.now() >= ENDS) { saleOver(); return; }

  var css = '' +
    // fixed to the top for the whole visit; the gradient drifts slowly and a
    // soft shine passes every few seconds, so the eye keeps finding it
    '.tgs{position:fixed;top:0;left:0;right:0;z-index:51;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:10px;min-height:40px;padding:8px 16px;box-sizing:border-box;' +
      'font-size:14px;line-height:1.3;color:#121212;text-align:center;text-decoration:none;' +
      'background:linear-gradient(100deg,#fde8de,#f6e3ec,#ece4f7,#e2ecf8,#fbeede,#fde8de);background-size:300% 100%;animation:tgs-flow 14s ease-in-out infinite alternate}' +
    '.tgs::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.75) 50%,transparent 65%);transform:translateX(-100%);animation:tgs-shine 6s ease-in-out 1.5s infinite}' +
    '.tgs>*{position:relative;z-index:1}' +
    '.tgs-sp{height:40px}' +
    '@keyframes tgs-flow{to{background-position:100% 0}}' +
    '@keyframes tgs-shine{0%{transform:translateX(-100%)}35%,100%{transform:translateX(100%)}}' +
    '@media (prefers-reduced-motion:reduce){.tgs,.tgs::after{animation:none}.tgs::after{display:none}}' +
    '.tgs:hover .tgs-l{text-decoration:underline;text-underline-offset:3px}' +
    '.tgs svg{flex:none;width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}' +
    '.tgs b{font-weight:600}' +
    '.tgs i{font-style:normal;color:rgba(18,18,18,.35)}' +
    '.tgs s{color:rgba(18,18,18,.5)}' +
    '.tgs [data-cd]{font-variant-numeric:tabular-nums}' +
    '@media (max-width:560px){.tgs{gap:7px;font-size:12.5px}.tgs-l,.tgs i.tgs-d1{display:none}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var bar = document.createElement('a');
  bar.className = 'tgs';
  bar.href = 'pricing';
  bar.setAttribute('aria-label', 'Early Access Sale on God Mode, see pricing');
  bar.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>' +
    '<b class="tgs-l">Early Access Sale</b><i class="tgs-d1">&mdash;</i>' +
    '<span><s data-was>' + PRICE.INR.was + '</s> now <b data-now>' + PRICE.INR.now + '</b></span>' +
    '<i>&mdash;</i><span><b data-cd></b> left</span>';
  // a spacer holds the bar's height in the page, so nothing starts under it
  var sp = document.createElement('div');
  sp.className = 'tgs-sp';
  sp.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(sp, document.body.firstChild);
  document.body.insertBefore(bar, sp);

  // dollars outside India, the same answer checkout uses
  fetch('/api/geo').then(function (r) { return r.json(); }).then(function (g) {
    var p = PRICE[g.currency] || PRICE.INR;
    bar.querySelector('[data-was]').textContent = p.was;
    bar.querySelector('[data-now]').textContent = p.now;
  }).catch(function () {});

  var cd = bar.querySelector('[data-cd]');
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  function tick() {
    var s = Math.max(0, Math.floor((ENDS - Date.now()) / 1000));
    if (!s) { bar.remove(); sp.remove(); place(); saleOver(); clearInterval(iv); return; }
    var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
    cd.textContent = (d ? d + 'd ' : '') + pad(h) + ':' + pad(m) + ':' + pad(s % 60);
  }
  var iv = setInterval(tick, 1000);
  tick();

  // The nav is fixed too: it sits just under the bar. (top, not transform:
  // a transform on the nav would trap the fixed mobile menu inside it.)
  var nav = document.querySelector('.nav');
  function place() {
    var h = bar.isConnected ? bar.offsetHeight : 0;
    sp.style.height = h + 'px';
    if (nav) nav.style.top = h + 'px';
  }
  window.addEventListener('resize', place);
  place();

  // after the deadline: no struck-through price on the pricing card
  function saleOver() {
    document.querySelectorAll('[data-sale]').forEach(function (card) {
      var b = card.querySelector('[data-full-inr]');
      if (b) {
        b.setAttribute('data-inr', b.getAttribute('data-full-inr'));
        b.setAttribute('data-usd', b.getAttribute('data-full-usd'));
        b.textContent = (b.textContent.charAt(0) === '$' ? '$' + b.getAttribute('data-usd') : '₹' + b.getAttribute('data-inr'));
      }
      card.querySelectorAll('[data-sale-was],[data-sale-note]').forEach(function (e) { e.remove(); });
    });
  }
})();
