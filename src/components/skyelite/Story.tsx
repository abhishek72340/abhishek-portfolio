export default function Story() {
  return (
    <section id="story" className="relative border-t border-black/5 bg-zinc-50/50 py-28 dark:border-white/5 dark:bg-zinc-900/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300">
              The SkyElite Philosophy
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#202A36] sm:text-5xl dark:text-white">
              Aviation reimagined around human time sovereignty
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-zinc-300">
              Commercial flying has become a gauntlet of delays, invasive terminal checkpoints, and rigid schedules. SkyElite was founded to restore aviation to its purest promise: freedom of movement.
            </p>

            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-zinc-400">
              We leverage an intelligent dispatch network connecting vetted, safety-audited operators worldwide. By eliminating costly membership subscriptions, upfront capital locks, and idle fleet overhead, we pass unprecedented value directly to you.
            </p>

            {/* Core Values Grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950">
                <div className="text-base font-bold text-[#202A36] dark:text-white">
                  Zero Membership Barrier
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                  Fly whenever you want, pay only for what you fly. No \$100k card commitments.
                </div>
              </div>
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950">
                <div className="text-base font-bold text-[#202A36] dark:text-white">
                  Bespoke Flight Experience
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
                  Curated sommelier lists, pet-friendly cabins, and direct tarmac-to-tarmac transfers.
                </div>
              </div>
            </div>
          </div>

          {/* Right Image / Showcase */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-2xl dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80"
                alt="SkyElite Private Jet Luxury Cabin"
                className="h-[480px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold tracking-widest text-amber-300 uppercase">
                  Flagship Cabin Comfort
                </span>
                <p className="mt-1 text-lg font-bold">
                  Hand-stitched Italian leather, acoustic noise damping, and Ka-band satellite internet.
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-black/5 bg-white p-5 shadow-xl sm:flex sm:items-center sm:gap-4 dark:border-white/10 dark:bg-zinc-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">Wyvern Wingman</div>
                <div className="text-xs text-gray-500 dark:text-zinc-400">Exceeds FAA Part 135 safety criteria</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
