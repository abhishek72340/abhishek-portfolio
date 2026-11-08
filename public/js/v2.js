// ---- scroll reveal ----
const io = new IntersectionObserver((es) => {
  es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// ---- image parallax (same 0.15 lag factor measured on the reference) ----
const pxImgs = [...document.querySelectorAll('.w-thumb, .pj-cover .frame, .pj-shot')];
if (pxImgs.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let t = false;
  const run = () => {
    const vh = innerHeight;
    pxImgs.forEach((frame) => {
      const r = frame.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const img = frame.querySelector('img');
      if (!img) return;
      const p = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1);
      const range = 0.15 * (vh + r.height);
      const slack = 0.07 * r.height;          // slack from the 116% over-scale
      const ty = Math.max(Math.min((p - 0.5) * range, slack), -slack);
      img.style.setProperty('--py', ty.toFixed(1) + 'px');
    });
    t = false;
  };
  addEventListener('scroll', () => { if (!t) { requestAnimationFrame(run); t = true; } }, { passive: true });
  addEventListener('resize', run, { passive: true });
  run();
}

// ---- FAQ accordion (height-animated, one open at a time) ----
document.querySelectorAll('.faq-item').forEach((item) => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.setAttribute('aria-expanded', 'false');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((other) => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.height = '0px';
      other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      a.style.height = a.firstElementChild.offsetHeight + 'px';
      q.setAttribute('aria-expanded', 'true');
    }
  });
});

// ---- live clock ----
const clock = document.querySelector('[data-clock]');
if (clock) {
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };
  tick(); setInterval(tick, 15000);
}

/* ============================================================
   Interactive layer
   ============================================================ */
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- red dot cursor ---- */
if (fine && !calm) {
  const dot = document.createElement('div');
  dot.className = 'cursor';
  dot.setAttribute('aria-hidden', 'true');
  dot.innerHTML = '<span class="cursor-label">Explore</span>';
  document.body.appendChild(dot);
  // only now is it safe for the CSS to hide the real pointer
  document.documentElement.classList.add('tg-dot');
  // The dot sits exactly on the pointer, written straight from the event. It
  // used to ease after it (0.22 a frame), which is the real pointer lagging
  // and gliding past its stop: twice as slow on a 60Hz screen as on a 120Hz
  // MacBook, and worse while card videos keep the main thread busy.
  const place = (x, y) => { dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`; };
  place(innerWidth / 2, innerHeight / 2);
  addEventListener('mousemove', (e) => { place(e.clientX, e.clientY); dot.classList.remove('gone'); }, { passive: true });
  // The pointer can leave the page without leaving the window: into an iframe
  // (a live demo, the payment window) or off the edge. The dot hides then, so
  // it never sits frozen over the nav looking like the page has stuck, and
  // comes back with the next move. Back-button restores start it clean.
  document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) dot.classList.add('gone'); });
  addEventListener('blur', () => dot.classList.add('gone'));
  addEventListener('pageshow', () => { dot.classList.remove('big', 'explore'); });
  addEventListener('mouseover', (e) => {
    // over a project thumbnail the dot becomes a large pink "Explore" disc;
    // over any other control it just swells.
    const onThumb = !!e.target.closest('.w-thumb, .pj-cover .frame, .pj-shot, .pj-next .thumb');
    dot.classList.toggle('explore', onThumb);
    dot.classList.toggle('big', !onThumb && !!e.target.closest('a, button, .faq-q, .w-card'));
  }, { passive: true });
}

/* ============================================================
   Dot field + pink fluid trail, rendered together on one canvas.
   The trail is a history of eased pointer positions drawn as
   additive radial gradients — that's what removes the "jagged"
   stepping and gives the comet tail seen in the reference.
   ============================================================ */
function mountField(host, opts) {
  // host is null on any page without this element (products/prompts use
  // .page-hero). Without this guard the throw halts every statement that
  // follows in this file — the same cascade the splitText null-crash caused.
  if (!host || calm) return null;
  const o = Object.assign({ gap: 16, dot: 1.0, dark: false, reach: 210, push: 22, alpha: 0.15, lift: 0.42 }, opts || {});
  const cv = document.createElement('canvas');
  cv.className = 'dots';
  host.prepend(cv);
  const ctx = cv.getContext('2d');
  let w = 0, h = 0;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let mx = -9999, my = -9999, px = -9999, py = -9999, inside = false;
  let lastClientX = -9999, lastClientY = -9999;
  const trail = [];
  const TRAIL_LEN = 46;

  const size = () => {
    const r = host.getBoundingClientRect();
    w = Math.max(1, r.width); h = Math.max(1, r.height);
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  addEventListener('resize', size, { passive: true });
  new ResizeObserver(size).observe(host);

  host.addEventListener('mouseenter', () => { inside = true; }, { passive: true });
  host.addEventListener('mouseleave', () => {
    inside = false; mx = -9999; my = -9999;
  }, { passive: true });

  // Hit-test on the document rather than waiting for 'mouseenter' on the host.
  // If the pointer is already parked over the hero when the page appears — which
  // is the normal case after the intro animation — no enter event ever fires,
  // and the effect would sit dead until the visitor clicked or scrolled.
  // A document-level move catches it on the very first flicker of the mouse.
  addEventListener('mousemove', (e) => {
    const r = host.getBoundingClientRect();
    const over = e.clientX >= r.left && e.clientX <= r.right &&
                 e.clientY >= r.top  && e.clientY <= r.bottom;
    if (!over) {
      if (inside) { inside = false; mx = -9999; my = -9999; }
      return;
    }
    inside = true;
    lastClientX = e.clientX; lastClientY = e.clientY;
    mx = e.clientX - r.left; my = e.clientY - r.top;
    if (px < -1000) { px = mx; py = my; }
  }, { passive: true });

  // the cursor doesn't move during a scroll, but the host does — without this,
  // mx/my (last set inside 'mousemove') go stale and the effect freezes onto
  // the content until the mouse physically moves again.
  addEventListener('scroll', () => {
    if (!inside || lastClientX < -1000) return;
    const r = host.getBoundingClientRect();
    mx = lastClientX - r.left; my = lastClientY - r.top;
  }, { passive: true });

  // touch screens have no cursor — drive the pointer along a slow
  // Lissajous curve while the host is on screen so the field still breathes
  if (!fine) {
    let vis = false, t0 = performance.now();
    let tapX = 0, tapY = 0, tapAt = -1e9;          // last tap, host coords
    const HOLD = 2200, BLEND = 1400;               // ms parked on the tap, then eased back onto the curve
    new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (!vis) { inside = false; mx = my = -9999; } }, { threshold: 0.2 }).observe(host);
    // a tap pulls the blob to the finger; the ease in draw() does the travel
    host.addEventListener('pointerdown', (e) => {
      const r = host.getBoundingClientRect();
      tapX = e.clientX - r.left; tapY = e.clientY - r.top; tapAt = performance.now();
    }, { passive: true });
    (function auto() {
      if (vis) {
        const now = performance.now(), t = (now - t0) / 1000;
        const ax = w * (0.5 + 0.40 * Math.sin(t * 0.55) * Math.cos(t * 0.17));
        const ay = h * (0.5 + 0.36 * Math.sin(t * 0.43 + 1.1));
        const since = now - tapAt;
        const k = since < HOLD ? 0 : Math.min((since - HOLD) / BLEND, 1);   // 0 = on the tap, 1 = back on the curve
        const s = k * k * (3 - 2 * k);
        mx = tapX + (ax - tapX) * s; my = tapY + (ay - tapY) * s;
        if (px < -1000) { px = mx; py = my; }
        inside = true;
      }
      requestAnimationFrame(auto);
    })();
  }

  const base = o.dark ? '241,241,241' : '43,43,43';

  (function draw() {
    // ease the pointer, then record it — heavy lag = fluid feel
    px += (mx - px) * 0.10;
    py += (my - py) * 0.10;
    if (inside) trail.push({ x: px, y: py });
    while (trail.length > TRAIL_LEN) trail.shift();
    if (!inside && trail.length) trail.shift();

    ctx.clearRect(0, 0, w, h);

    // 1) the pink comet tail, oldest → newest
    ctx.globalCompositeOperation = 'source-over';
    trail.forEach((pt, i) => {
      const t = (i + 1) / trail.length;          // 0 old → 1 new
      const rad = 34 + t * 88;
      const a = 0.0272 * t * t;   // 20% softer
      const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, rad);
      g.addColorStop(0, `rgba(252,71,120,${(a * 5).toFixed(4)})`);
      g.addColorStop(0.45, `rgba(252,71,120,${(a * 1.9).toFixed(4)})`);
      g.addColorStop(1, 'rgba(252,71,120,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, rad, 0, 6.2832); ctx.fill();
    });

    // 2) the dot grid, displaced away from the pointer
    const hx = trail.length ? trail[trail.length - 1].x : -9999;
    const hy = trail.length ? trail[trail.length - 1].y : -9999;
    for (let y = o.gap / 2; y < h; y += o.gap) {
      for (let x = o.gap / 2; x < w; x += o.gap) {
        let ox = 0, oy = 0, a = o.alpha, r = o.dot;
        const dx = x - hx, dy = y - hy;
        const d = Math.hypot(dx, dy);
        if (d < o.reach) {
          const f = (1 - d / o.reach) ** 2;
          const ang = Math.atan2(dy, dx);
          ox = Math.cos(ang) * f * o.push;
          oy = Math.sin(ang) * f * o.push;
          a += f * o.lift;
          r = o.dot * (1 + f * 0.75);
        }
        ctx.beginPath();
        ctx.arc(x + ox, y + oy, r, 0, 6.2832);
        ctx.fillStyle = `rgba(${base},${a})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  })();

  return { pointer: () => ({ x: px, y: py, inside }) };
}

const heroField  = mountField(document.querySelector('.hero'),        { gap: 17, dot: 0.95, alpha: 0.17, lift: 0.30 });
const quoteField = mountField(document.querySelector('.proof-quote'), { gap: 15, dot: 0.95, dark: true, alpha: 0.10, lift: 0.26 });
const footField  = mountField(document.querySelector('.foot'),        { gap: 18, dot: 0.95, dark: true, alpha: 0.15, lift: 0.30 });

/* ============================================================
   Continuous chromatic split.
   Previously a binary .hot class → visible stepping. Now each
   character gets a 0..1 intensity from its distance to the
   pointer, driving the shadow offset smoothly.
   ============================================================ */
function splitText(el, field, host) {
  if (!el || !field || calm || !fine) return;
  try {
  if (!el.querySelector('.ch')) {
    // walk children so <br> line breaks are preserved
    const nodes = [...el.childNodes];
    el.textContent = '';
    nodes.forEach((n) => {
      if (n.nodeType === 3) {
        // Group characters into word wrappers. Bare per-character spans let
        // the browser break a line mid-word ("Co / nversion"), because every
        // span is an independent break opportunity.
        let word = null;
        for (const c of n.textContent) {
          if (c === ' ' || c === '\n') {
            word = null;
            const sp = document.createElement('span');
            sp.className = 'ch';
            sp.textContent = c;
            el.appendChild(sp);
            continue;
          }
          if (!word) {
            word = document.createElement('span');
            word.className = 'wd';
            el.appendChild(word);
          }
          const sp = document.createElement('span');
          sp.className = 'ch';
          sp.textContent = c;
          word.appendChild(sp);
        }
      } else {
        el.appendChild(n.cloneNode(true));
      }
    });
  }
  const chars = [...el.querySelectorAll('.ch')];
  let boxes = [];
  const measure = () => {
    const root = host || el.closest('.hero, .proof-quote, .foot');
    if (!root) return;
    const hr = root.getBoundingClientRect();
    boxes = chars.map((c) => {
      const r = c.getBoundingClientRect();
      return { cx: r.left + r.width / 2 - hr.left, cy: r.top + r.height / 2 - hr.top };
    });
  };
  measure();
  addEventListener('resize', measure, { passive: true });
  setTimeout(measure, 600);   // after webfonts settle

  const R = 190;
  (function tick() {
    const { x, y, inside } = field.pointer();
    for (let i = 0; i < chars.length; i++) {
      const b = boxes[i]; if (!b) continue;
      let v = 0;
      if (inside) {
        const d = Math.hypot(b.cx - x, b.cy - y);
        if (d < R) { const f = 1 - d / R; v = f * f; }   // smooth falloff
      }
      const c = chars[i];
      if (v < 0.01) {
        if (c.style.textShadow) { c.style.textShadow = ''; c.style.transform = ''; }
      } else {
        const o = (v * 0.075).toFixed(4);
        c.style.textShadow =
          `-${o}em 0 rgba(252,71,120,${(v * 0.9).toFixed(3)}), ${o}em 0 rgba(0,190,255,${(v * 0.75).toFixed(3)})`;
        // warp: swell + lift, strongest at the cursor
        c.style.transform =
          `translateY(${(-v * 7).toFixed(2)}px) scale(${(1 + v * 0.11).toFixed(3)})`;
      }
    }
    requestAnimationFrame(tick);
  })();
  } catch (err) { console.warn('splitText skipped:', err); }
}

splitText(document.querySelector('.hero h1'), heroField, document.querySelector('.hero'));
document.querySelectorAll('.tst blockquote').forEach((b) => splitText(b, quoteField, document.querySelector('.proof-quote')));
splitText(document.querySelector('.foot h2'), footField, document.querySelector('.foot'));

/* ---- nav: transparent over the hero, white once past it ---- */
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const hero = document.querySelector('.hero, .page-hero');
  let t = false;
  const run = () => {
    const limit = hero ? hero.offsetTop + hero.offsetHeight - nav.offsetHeight : 40;
    nav.classList.toggle('solid', scrollY >= limit);
    t = false;
  };
  addEventListener('scroll', () => { if (!t) { requestAnimationFrame(run); t = true; } }, { passive: true });
  addEventListener('resize', run, { passive: true });
  run();
})();

/* ---- hero drifts up as you scroll, section 2 rides over it ---- */
(function () {
  const hero = document.querySelector('.hero');
  if (!hero || calm) return;
  const body = [...hero.querySelectorAll(':scope > .display, :scope > .hero-sub, :scope > .hero-trust')];
  let t = false;
  const run = () => {
    const y = scrollY;
    const h = hero.offsetHeight || innerHeight;
    const p = Math.min(Math.max(y / h, 0), 1);
    // the hero card lifts away at full scroll speed… (not on phones: the
    // transform would drag the pinned credential line up with it)
    if (innerWidth <= 760) {
      hero.style.transform = 'none';
      // phones: the copy drifts down over the hero's scroll-out so the gap
      // under the logo row closes and the row ends 20px past the hero's edge
      const last = body[body.length - 1];
      const gap = hero.offsetTop + h - (last.offsetTop + last.offsetHeight);   // untransformed
      const dy = (p * (gap + 20)).toFixed(1) + 'px';
      body.forEach((el) => { el.style.transform = `translate3d(0, ${dy}, 0)`; });
    } else {
      body.forEach((el) => { el.style.transform = ''; });
      hero.style.transform = `translate3d(0, ${(-p * h * 0.16).toFixed(1)}px, 0) scale(${(1 - p * 0.03).toFixed(4)})`;
    }
    hero.style.borderRadius = `0 0 ${(26 + p * 14).toFixed(0)}px ${(26 + p * 14).toFixed(0)}px`;
    // (section-2 lag reverted: a transform here doesn't reflow, so it drove the
    //  heading down over the cards. Hero card lift alone does the reveal.)
    t = false;
  };
  addEventListener('scroll', () => { if (!t) { requestAnimationFrame(run); t = true; } }, { passive: true });
  addEventListener('resize', run, { passive: true });
  run();
})();

/* ---- journey cards fly in on the X axis ---- */
const jCards = [...document.querySelectorAll('.j-card')];
if (jCards.length && !calm && innerWidth > 900) {
  let jt = false;
  const runCards = () => {
    const vh = innerHeight;
    jCards.forEach((c) => {
      const r = c.getBoundingClientRect();
      // each card runs its own short window as it enters → they land one by one
      const p = Math.min(Math.max((vh - r.top) / (vh * 0.5), 0), 1);
      const e = 1 - Math.pow(1 - p, 3);
      const rx = (1 - e) * -78;          // steeper tilt
      const ty = (1 - e) * 190;          // rises further from below
      const sc = 0.9 + e * 0.1;
      c.style.transform = `rotateX(${rx.toFixed(2)}deg) translateY(${ty.toFixed(1)}px) scale(${sc.toFixed(3)})`;
      c.style.opacity = (0.15 + e * 0.85).toFixed(3);
    });
    jt = false;
  };
  addEventListener('scroll', () => { if (!jt) { requestAnimationFrame(runCards); jt = true; } }, { passive: true });
  addEventListener('resize', runCards, { passive: true });
  runCards();
}

/* ---- work grid: hovering one project fades the others ---- */
const grid = document.querySelector('.work-grid');
if (grid && fine) {
  grid.addEventListener('mouseenter', () => grid.classList.add('focusing'), { passive: true });
  grid.addEventListener('mouseleave', () => grid.classList.remove('focusing'), { passive: true });
}

/* ============================================================
   "See for yourself" — continuous thumbnail trail.
   Each frame every live thumb is re-scored by its position in the
   queue (newest = 1 → oldest = 0), so the tail fades as one smooth
   gradient instead of each tile popping out on its own timer.
   ============================================================ */
(function () {
  const stage = document.getElementById('trail');
  if (!stage || calm) return;

  // Every shot from every project, not just the five covers — 24 images, so
  // the trail stops repeating the same few tiles.
  const PROJECTS = [];
  // cover and shot filenames don't always share a stem (student-attendance-cover
  // vs student-attendance-app-N), so both stems are explicit.
  // images/trail/ holds 360×270 JPEG cuts of every cover and shot (the full
  // images are up to 6400px wide — far too slow to decode mid-hover)
  const addAll = (href, name, coverFile, shotStem, n) => {
    PROJECTS.push([`images/trail/${coverFile.replace(/\.\w+$/, '')}.jpg`, href, name]);
    for (let k = 1; k <= n; k++) PROJECTS.push([`images/trail/${shotStem}-${k}.jpg`, href, name]);
  };
  addAll('mergekart.html',              'MergeKart',          'mergekart-cover.jpg',          'mergekart',              5);
  addAll('student-attendance-app.html', 'Student Attendance', 'student-attendance-cover.jpg', 'student-attendance-app', 5);
  addAll('geekster.html',               'Geekster Portal',    'geekster-cover.png',           'geekster',               4);
  addAll('learning.html',               'Learning Platform',  'learning-cover.png',           'learning',               5);
  addAll('meridian.html',               'Meridian Finance',   'meridian-cover.png',           'meridian',               5);

  // shuffled deck: random order, but every image shows before any repeats
  let deck = [];
  const draw = () => {
    if (!deck.length) {
      deck = PROJECTS.slice();
      for (let a = deck.length - 1; a > 0; a--) { const b = (Math.random() * (a + 1)) | 0; [deck[a], deck[b]] = [deck[b], deck[a]]; }
    }
    return deck.pop();
  };
  // preload so the first pass never flashes an empty tile
  PROJECTS.forEach(([src]) => { const i = new Image(); i.src = src; if (i.decode) i.decode().catch(() => {}); });

  const STEP = 66;     // spawn spacing — raised 48 → 66 (~30% fewer pop-ups)
  const MAX  = 6;      // 8 → 6 on screen at once
  const OUT  = 440;    // brisk exit, still eased

  const live = [];     // newest last
  const dying = [];
  const MAX_DYING = 8;   // hard ceiling → never more than MAX+MAX_DYING on screen
  const MIN_MS = 28;     // floor between spawns
  const HOLD   = 620;    // ms a thumb lives once the cursor stops
  let i = 0, lastX = null, lastY = null, lastSpawn = 0;

  const dotEl = document.querySelector('.cursor');
  stage.addEventListener('mouseenter', () => dotEl && dotEl.classList.add('hidden'), { passive: true });
  stage.addEventListener('mouseleave', () => {
    if (dotEl) dotEl.classList.remove('hidden');
    // retire whatever is left, oldest first, so nothing is stranded on screen
    lastX = null;
    let d = 0;
    while (live.length) {
      const it = live.shift();
      it.died = performance.now() + d;   // staggered exit
      dying.push(it);
      d += 90;
    }
  }, { passive: true });

  const spawn = (x, y) => {
    const [src, href, name] = draw();
    i++;
    const a = document.createElement('a');
    a.className = 'trail-img';
    a.href = href;
    a.setAttribute('aria-label', name);
    a.style.left = x + 'px';
    a.style.top = y + 'px';
    a.style.transition = 'none';
    const img = document.createElement('img');
    img.src = src; img.alt = name;
    a.appendChild(img);
    stage.appendChild(a);
    live.push({ el: a, born: performance.now() });

    // sixth arrives → the oldest starts easing out, in the same order it came in
    while (live.length > MAX) {
      const old = live.shift();
      old.died = performance.now();
      dying.push(old);
    }
    // fast cursor used to let evicted tiles pile up mid-fade — cap them too
    while (dying.length > MAX_DYING) {
      const gone = dying.shift();
      gone.el.remove();
    }
  };

  const feed = (x, y) => {                      // shared by mouse + auto driver
    const now = performance.now();
    if (lastX === null) { lastX = x; lastY = y; lastSpawn = now; spawn(x, y); return; }
    if (Math.hypot(x - lastX, y - lastY) < STEP) return;
    if (now - lastSpawn < MIN_MS) return;      // time floor, not just distance
    lastX = x; lastY = y; lastSpawn = now;
    spawn(x, y);
  };

  if (fine) {
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      feed(e.clientX - r.left, e.clientY - r.top);
    }, { passive: true });
  } else {
    // Touch: no cursor to follow, so a virtual pointer drifts around the
    // stage on a slow Lissajous curve while the stage is on screen. Same
    // spawn/expire pipeline as the mouse — only the source of x/y differs.
    let onScreen = false, t0 = performance.now();
    new IntersectionObserver((es) => { onScreen = es[0].isIntersecting; if (!onScreen) { lastX = null; } },
                             { threshold: 0.35 }).observe(stage);
    const hint = stage.querySelector('.proof-hint');
    if (hint) hint.textContent = 'Tap any project to open it';
    (function drift(now) {
      if (onScreen) {
        const t = (now - t0) / 1000;
        const w = stage.clientWidth, h = stage.clientHeight;
        // two incommensurate frequencies → a figure that never quite repeats
        // ~150px/s of travel → a fresh tile every ~0.3s, so 3–5 are alive at
        // once and it reads as a trail rather than a lone wanderer
        const x = w * (0.5 + 0.38 * Math.sin(t * 1.25) * Math.cos(t * 0.29));
        const y = h * (0.52 + 0.30 * Math.sin(t * 0.97 + 1.2));
        feed(x, y);
      }
      requestAnimationFrame(drift);
    })(t0);
  }

  // symmetric easing — it leaves exactly the way it arrived
  // Entry uses a quart ease-out: lands with a longer, softer settle.
  // Exit uses ease-in-out instead of ease-in — a pure ease-in accelerates
  // right to the end, which is the "bump" on the way out.
  // Entry: ease-out-back with s=3.4 → overshoots to 1.30 in t-space, which
  // through the 0.5→1 scale mapping lands the BOX at 1.15 before it settles
  // back to 1.0. That's the 15% bounce-back.
  const easeOutBack   = (t, s = 3.4) => { const u = t - 1; return 1 + (s + 1) * u * u * u + s * u * u; };
  const easeOutQuart  = (t) => 1 - Math.pow(1 - t, 4);
  const easeInOutCubic = (t) => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
  const easeOutCubic = easeOutBack;      // used for the entry scale
  const easeInCubic  = easeInOutCubic;   // exit
  const IN = 520;      // arrival

  const paint = (o, t, z) => {
    // t: 0 → absent, 1 → fully present
    const tc = Math.min(t, 1);                                  // opacity never overshoots
    o.el.style.opacity = (0.5 + 0.5 * tc).toFixed(3);         // 50% → 100%
    o.el.style.transform = `translate(-50%,-50%) scale(${(0.5 + 0.5 * t).toFixed(3)})`; // 50% → 115% → 100%
    // the image ZOOMS IN inside the box as it opens, on top of the box's own
    // scale — a push-in from 1x to 1.14x
    const im = o.el.firstElementChild;
    if (im) im.style.transform = `scale(${(1 + 0.14 * tc).toFixed(3)})`;
    o.el.style.zIndex = String(z);
  };

  (function frame() {
    const now = performance.now();

    // age out anything that has outlived HOLD, even with the cursor parked
    for (let n = live.length - 1; n >= 0; n--) {
      if (now - live[n].born > HOLD) {
        const old = live.splice(n, 1)[0];
        old.died = now;
        dying.push(old);
      }
    }
    while (dying.length > MAX_DYING) dying.shift().el.remove();

    live.forEach((it, n) => {
      const t = easeOutCubic(Math.min((now - it.born) / IN, 1));
      paint(it, t, 10 + n);
    });

    for (let n = dying.length - 1; n >= 0; n--) {
      const it = dying[n];
      const k = (now - it.died) / OUT;
      if (k < 0) { paint(it, 1, 5); continue; }
      if (k >= 1) { it.el.remove(); dying.splice(n, 1); continue; }
      paint(it, 1 - easeInCubic(k), 5);                        // mirrors the entry
      it.el.style.opacity = ((1 - easeInCubic(k)) * 0.85).toFixed(3);
    }

    requestAnimationFrame(frame);
  })();
})();

/* ---- footer: buttons lean toward the cursor ---- */
if (fine && !calm) {
  document.querySelectorAll('.foot .btn').forEach((b) => {
    b.style.transition = 'transform .35s cubic-bezier(.22,1,.36,1), background .25s, color .25s, border-color .25s';
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      b.style.transform = `translate(${(dx * 9).toFixed(1)}px, ${(dy * 6).toFixed(1)}px)`;
    }, { passive: true });
    b.addEventListener('mouseleave', () => { b.style.transform = ''; }, { passive: true });
  });
}

/* ============================================================
   "How we work" alt list — light up the row nearest the viewport
   centre as you scroll.

   CSS :hover alone was never going to cover this: the browser only
   re-evaluates :hover when the POINTER moves, so scrolling the page
   under a stationary trackpad cursor left the rows inert. Driving an
   .is-active class off scroll position makes the list animate on its
   own, and hover still wins while the pointer is inside it.
   ============================================================ */
(function () {
  const steps = [...document.querySelectorAll('.hww-step')];
  if (!steps.length || calm) return;

  let ticking = false;
  let current = null;

  const run = () => {
    const mid = innerHeight / 2;
    let best = null;
    let bestD = Infinity;

    steps.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;   // offscreen
      const d = Math.abs((r.top + r.bottom) / 2 - mid);
      if (d < bestD) { bestD = d; best = s; }
    });

    if (best !== current) {
      steps.forEach((s) => s.classList.toggle('is-active', s === best));
      current = best;
    }
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(run); ticking = true; }
  }, { passive: true });
  addEventListener('resize', run, { passive: true });
  run();
})();

/* ============================================================
   Testimonial carousel.
   (There was markup for this — .tst slides and .tst-dots — but no
   code driving it, so it never advanced. This is that code.)
   ============================================================ */
(function () {
  const track = document.querySelector('.tst-track');
  if (!track) return;
  const slides = [...track.querySelectorAll('.tst')];
  const dots = [...document.querySelectorAll('.tst-dots button')];
  if (slides.length < 2) return;

  let i = 0, timer = null;
  const STEP = 3600;   // one second longer per slide

  const show = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('on', k === i));
    dots.forEach((d, k) => d.classList.toggle('on', k === i));
  };
  const start = () => { if (!timer && !calm) timer = setInterval(() => show(i + 1), STEP); };
  const stop  = () => { clearInterval(timer); timer = null; };

  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); stop(); start(); }));

  const quote = document.querySelector('.proof-quote');
  if (quote) {
    quote.addEventListener('mouseenter', stop, { passive: true });
    quote.addEventListener('mouseleave', start, { passive: true });
  }
  // don't burn cycles while the tab is in the background
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  show(0);
  start();
})();

/* ============================================================
   "Let's talk" — geometry + opacity.
   Sticky CSS pins the heading; this sizes things so the pin releases
   at the exact moment #proof has cleared, so the heading then rides
   the page scroll and parks 240px above pricing (the section's
   padding-bottom). Opacity ramps with how much of #proof still
   covers the heading.
   ============================================================ */
(function () {
  const above = document.getElementById('proof');
  const cta = document.querySelector('.cta-big');
  const frame = document.querySelector('.cta-sticky');
  const h = frame && frame.querySelector('h2');
  if (!above || !cta || !frame || !h) return;

  // pin the heading dead-centre, and make the section exactly tall enough
  // that its bottom meets the heading's bottom when #proof has scrolled off
  const words = [...h.querySelectorAll('.w')];
  const layout = () => {
    const hh = frame.offsetHeight;
    const top = Math.round(innerHeight / 2 - hh / 2);
    frame.style.top = top + 'px';
    // release happens when scrollY = S0 + 100vh, where S0 = section top.
    // sticky releases when (S0 + H - scrollY) = top + hh  →  H = 1.5vh + hh/2 + 240px padding
    // 1.5vh releases the instant #proof clears; 2.15vh keeps it pinned for
    // another ~0.65 viewport so it actually sits with the reader
    const hold = innerWidth <= 760 ? 1.35 : 2.15;   // phones: shorter pin, then it rides straight into pricing
    cta.style.minHeight = Math.round(innerHeight * hold + hh / 2) + 'px';
  };

  let t = false;
  const run = () => {
    if (calm) { frame.style.opacity = 1; words.forEach((w) => w.classList.add('lit')); t = false; return; }
    const ab = above.getBoundingClientRect().bottom;
    const hr = h.getBoundingClientRect();
    const p = Math.min(Math.max((hr.bottom - ab) / hr.height, 0), 1);
    const e = 1 - Math.pow(1 - p, 2);
    frame.style.opacity = (0.3 + 0.7 * e).toFixed(3);
    h.style.transform = `scale(${(0.9 + 0.1 * e).toFixed(4)})`;
    // words come into focus one by one, starting once the heading sits
    // ~80px clear of the section above, spread over the next ~40vh of scroll.
    // Phones skip the effect and keep the heading black throughout.
    if (words.length) {
      if (innerWidth <= 760) { words.forEach((w) => w.classList.add('lit')); }
      else {
        const wp = Math.min(Math.max((hr.top - ab - 80) / (innerHeight * 0.4), 0), 1);
        const lit = Math.ceil(wp * words.length - 0.001);
        words.forEach((w, i) => w.classList.toggle('lit', i < lit));
      }
    }
    t = false;
  };
  addEventListener('scroll', () => { if (!t) { requestAnimationFrame(run); t = true; } }, { passive: true });
  addEventListener('resize', () => { layout(); run(); }, { passive: true });
  layout(); run();
  // fonts can change the heading height after first paint
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { layout(); run(); });
})();


/* ============================================================
   "How we work" head — surfaces from under the hero.
   The hero sits on a higher layer (z-index 2, opaque) and lifts
   away on scroll. The section head starts pushed up beneath it and
   slides down into place as the hero's bottom edge rises, landing
   above the four cards at full size and opacity.
   ============================================================ */
(function () {
  const hero = document.querySelector('.hero');
  const lag = document.querySelector('#process .para-lag');
  if (!hero || !lag || calm) return;
  let t = false;
  let last = -1;
  const run = () => {
    const vh = innerHeight;
    // untransformed hero bottom: the hero's own lift is cosmetic, the page
    // scroll is the only thing that should drive this
    const hb = hero.offsetTop + hero.offsetHeight - scrollY;
    const p = Math.min(Math.max((vh - hb) / (vh * 0.6), 0), 1);
    if (p === last) { t = false; return; }
    last = p;
    const e = 1 - Math.pow(1 - p, 3);
    lag.style.transform = `translate3d(0, ${(-(1 - e) * vh * 0.34).toFixed(2)}px, 0)`;
    lag.style.opacity = (0.15 + 0.85 * e).toFixed(3);
    t = false;
  };
  addEventListener('scroll', () => { if (!t) { requestAnimationFrame(run); t = true; } }, { passive: true });
  addEventListener('resize', run, { passive: true });
  run();
})();

/* ============================================================
   Pricing panel — bounces in from the left when it enters view,
   and again on every tab switch.
   ============================================================ */
(function () {
  const main = document.querySelector('.pr-main');
  if (!main) return;
  const play = (el) => { el.classList.remove('bounce-in'); void el.offsetWidth; el.classList.add('bounce-in'); };
  if (calm) { main.classList.add('in'); return; }
  new IntersectionObserver((es, io) => {
    if (es[0].isIntersecting) { play(main); io.disconnect(); }
  }, { threshold: 0.25 }).observe(main);
})();

/* ============================================================
   Mobile nav — hamburger → full-screen menu
   ============================================================ */
(function () {
  const nav = document.querySelector('.nav');
  const right = nav && nav.querySelector('.nav-right');
  if (!nav || !right) return;
  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Open menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);
  const set = (open) => {
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => set(!document.body.classList.contains('menu-open')));
  right.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  addEventListener('resize', () => { if (innerWidth > 760) set(false); }, { passive: true });
})();
