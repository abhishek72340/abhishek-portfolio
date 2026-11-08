export default function Benefits() {
  const benefits = [
    {
      title: "Direct Tarmac FBO Access",
      desc: "Bypass main terminals entirely. Drive straight up to the aircraft steps and be airborne within 15 minutes of arrival.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      title: "Pet-Friendly In-Cabin",
      desc: "Your companions travel by your side without cages or cargo holds. Gourmet pet amenities provided on every leg.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Guaranteed 4-Hour Callout",
      desc: "Emergency meeting or impromptu weekend getaway? Our fleet stands ready with aircraft positioning guaranteed in 4 hours.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Unmatched Safety Vetting",
      desc: "We exclusively contract aircraft and crews audited by ARG/US Platinum and Wyvern Wingman standards with dual type-rated captains.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "24/7 Dedicated Concierge",
      desc: "Single point of contact for custom gourmet catering, helicopter airport transfers, and bespoke ground security arrangements.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "100% Carbon Neutral Flights",
      desc: "We calculate and offset carbon emissions for 100% of flight hours through verified global reforestation and direct-air capture programs.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="benefits" className="border-t border-black/5 bg-zinc-50/50 py-28 dark:border-white/5 dark:bg-zinc-900/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300">
            Why Choose SkyElite
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#202A36] sm:text-5xl dark:text-white">
            Designed for those who cannot afford wasted time
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg dark:text-zinc-400">
            Every element of our flight protocol has been refined to eliminate friction and elevate your journey.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition hover:border-black/15 hover:shadow-md dark:border-white/10 dark:bg-zinc-950 dark:hover:border-white/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#202A36]/5 text-[#202A36] transition group-hover:bg-[#202A36] group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950">
                {b.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
