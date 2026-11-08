export default function Skills() {
  const categories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "JavaScript (ES6+)"],
    },
    {
      title: "Backend & Database",
      skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB", "Prisma"],
    },
    {
      title: "Tools & DevOps",
      skills: ["Git & GitHub", "Vercel", "Docker", "Turbopack", "npm/pnpm", "CI/CD"],
    },
  ];

  return (
    <section id="skills" className="border-t border-zinc-200/80 py-20 dark:border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Skills & Expertise
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Technologies I work with daily
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{cat.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-lg bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
