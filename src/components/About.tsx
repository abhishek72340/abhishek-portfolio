export default function About() {
  const highlights = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Client Satisfaction", value: "100%" },
  ];

  return (
    <section id="about" className="border-t border-zinc-200/80 py-20 dark:border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              About Me
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Passionate about code quality and human-centered design
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              I develop fast, accessible, and scalable applications. My focus is on turning complex technical problems into elegant, intuitive interfaces that delight users and deliver real business value.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Whether building full-stack platforms or crafting pixel-perfect frontend experiences, I strive for high performance, maintainable code, and modern best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
