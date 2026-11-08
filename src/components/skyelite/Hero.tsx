"use client";

interface HeroProps {
  useNegativeMargin?: boolean;
}

export default function Hero({ useNegativeMargin = true }: HeroProps) {
  return (
    <section id="start" className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pt-28 pb-16">
      {/* Video / Visual Background */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-zinc-950">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-35 filter brightness-90 contrast-110"
          poster="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=2000&q=80"
        >
          {/* High-quality private jet atmospheric flight loop */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-clouds-from-an-airplane-4148-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle radial & linear gradients for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-zinc-950 dark:via-zinc-950/60 dark:to-transparent" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-white/30 to-white/90 dark:via-zinc-950/40 dark:to-zinc-950" />
      </div>

      {/* Main Content Area */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 text-center sm:px-8">
        {/* Small uppercase label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.28em] text-gray-700 uppercase sm:text-sm dark:text-zinc-300">
            PRIVATE JETS
          </span>
        </div>

        {/* Large two-line heading with overlapping negative margin effect */}
        <div className="mt-6 flex flex-col items-center">
          <span className="select-none text-6xl font-normal tracking-tighter text-gray-500 sm:text-7xl md:text-8xl lg:text-9xl leading-none">
            Premium.
          </span>
          <span
            className={`select-none text-6xl font-normal tracking-tighter text-[#202A36] dark:text-white sm:text-7xl md:text-8xl lg:text-9xl leading-none transition-all duration-500 ${
              useNegativeMargin
                ? "-mt-3 sm:-mt-4 md:-mt-6 lg:-mt-8"
                : "mt-2"
            }`}
          >
            Accessible.
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-gray-600 sm:text-xl dark:text-zinc-300">
          Your dedication deserves recognition. Experience private aviation on your terms—direct access to over 5,000 airports worldwide with transparent pricing and zero membership lock-in.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 rounded-full bg-[#202A36] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all hover:bg-[#151c24] hover:shadow-xl dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <span>Request a Flight</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="#rates"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/70 px-8 py-3.5 text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:border-gray-400 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Explore Fleet & Rates
          </a>
        </div>
      </div>

      {/* Floating Key Metrics Bar */}
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-xl sm:grid-cols-4 dark:border-white/10 dark:bg-zinc-900/70">
          <div className="text-center">
            <div className="text-2xl font-bold tracking-tight text-[#202A36] sm:text-3xl dark:text-white">
              5,000+
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Airports Worldwide
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tracking-tight text-[#202A36] sm:text-3xl dark:text-white">
              15 Min
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Curbside to Airborne
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tracking-tight text-[#202A36] sm:text-3xl dark:text-white">
              ARG/US
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Platinum Safety Rated
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tracking-tight text-[#202A36] sm:text-3xl dark:text-white">
              $0
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Membership Fees
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
