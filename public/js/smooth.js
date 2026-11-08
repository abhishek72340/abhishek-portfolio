/* ============================================================
   Smooth scroll — a light lerp on the wheel, nothing more.

   Deliberately not a library. Lenis and friends are ~3KB plus a CSP
   exception, and the heavier ones scroll a transformed wrapper, which
   breaks position:sticky — this page leans on sticky in four places
   (nav, the "Let's talk" panel, the pricing rail, the mobile credential
   line). This drives the real window scroll position instead, so sticky,
   anchors, the scrollbar and every scroll-driven animation already on the
   page keep working untouched.

   Off for touch (native momentum is better than anything we'd fake),
   off under prefers-reduced-motion, and it yields to any element that
   scrolls on its own.
   ============================================================ */
(function () {
  'use strict';

  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || calm) return;

  // Ease per 120Hz frame, scaled by real elapsed time so a 60Hz monitor (or a
  // busy main thread) glides exactly as long as a 120Hz MacBook does, rather
  // than twice as long.
  var EASE = 0.11;        // lower = heavier glide. 0.11 is a gentle drift
  var FRAME = 1000 / 120;
  var SNAP = 0.4;         // px: close enough, stop animating

  var target = window.scrollY;
  var raf = 0, last = 0;

  function limit() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function run(now) {
    // the page can grow or shrink mid-glide as images and reveals land
    target = Math.max(0, Math.min(target, limit()));
    var diff = target - window.scrollY;
    if (Math.abs(diff) < SNAP) {
      window.scrollTo(0, target);
      raf = 0;
      return;
    }
    // cap the step so a long stall lands the page instead of overshooting
    var dt = Math.max(1, Math.min(now - last, 100));
    last = now;
    window.scrollTo(0, window.scrollY + diff * (1 - Math.pow(1 - EASE, dt / FRAME)));
    raf = requestAnimationFrame(run);
  }

  function start() {
    // rAF is paused in a background tab, which would strand the glide
    // half-finished; just put the page where it was asked to go
    if (document.hidden) { window.scrollTo(0, target); return; }
    if (!raf) { last = performance.now() - FRAME; raf = requestAnimationFrame(run); }
  }

  // anything with its own scrollbar keeps it: the modal, a code block, a select
  function scrollsItself(node) {
    for (var el = node; el && el !== document.body; el = el.parentElement) {
      if (!el.scrollHeight) continue;
      var cs = getComputedStyle(el);
      var oy = cs.overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) return true;
    }
    return false;
  }

  addEventListener('wheel', function (e) {
    if (e.ctrlKey || e.metaKey) return;            // pinch-zoom, browser zoom
    if (e.defaultPrevented) return;
    if (scrollsItself(e.target)) return;

    // deltaMode 1 is lines, 2 is pages — normalise both to pixels
    var d = e.deltaY;
    if (e.deltaMode === 1) d *= 16;
    else if (e.deltaMode === 2) d *= window.innerHeight;

    e.preventDefault();
    target = Math.max(0, Math.min(target + d, limit()));
    start();
  }, { passive: false });

  // Anything that moves the page another way — keyboard, scrollbar drag, an
  // anchor jump, scrollIntoView — must reset the target, or the next wheel
  // tick would yank the page back to where the lerp thought it was.
  addEventListener('scroll', function () {
    if (!raf) target = window.scrollY;
  }, { passive: true });

  addEventListener('resize', function () {
    target = Math.min(target, limit());
  }, { passive: true });

  // the CSS smooth-scroll would fight the lerp, so anchors are handled here
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    // honour scroll-margin-top so anchors clear fixed bars, exactly as a
    // native anchor jump would
    var pad = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    target = Math.max(0, Math.min(
      el.getBoundingClientRect().top + window.scrollY - pad, limit()));
    start();
  });
})();
