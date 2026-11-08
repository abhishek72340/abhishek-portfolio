"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    "Full Stack & E-Commerce",
    "WebGL & Creative Engineering",
    "Browser Web APIs & Utility",
    "Interactive Engine",
  ];

  const filteredProjects =
    filter === "All"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === filter);

  return (
    <div className="relative min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      <MarginNav />

      {/* Atmospheric lighting */}
      <div className="atmos fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Projects &amp; Works</span>
          </div>

          <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-[#ece7dd] leading-[1.05] tracking-tight">
            Selected Digital Works
          </h1>

          <p className="font-book text-lg sm:text-xl text-[#8d887e] leading-relaxed max-w-3xl">
            A curated catalogue of full-stack web platforms, 3D interactive WebGL graphics, and browser utility tools built with high attention to performance and craft.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-t border-b border-white/10 py-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8d887e] mr-2">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#c9a27a] text-[#060606] font-semibold shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-[#ece7dd] border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0d0c0b] hover:border-[#c9a27a]/40 transition-all flex flex-col justify-between space-y-8 shadow-2xl group relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[#8d887e] border-b border-white/10 pb-4">
                  <span className="text-[#c9a27a]">WORKS–0{idx + 1}</span>
                  <span className="uppercase tracking-widest">{proj.category}</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display italic text-3xl sm:text-4xl text-[#ece7dd] group-hover:text-white transition-colors">
                    {proj.title}
                  </h2>
                  <p className="font-mono text-xs text-[#c9a27a]">
                    {proj.tagline}
                  </p>
                </div>

                <p className="font-book text-sm sm:text-base text-[#8d887e] leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full font-mono text-xs text-[#ece7dd] bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-5 pt-6 border-t border-white/10 font-mono text-xs">
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pill-btn text-xs py-2 px-5"
                >
                  <span>Launch Live App</span>
                  <span>&rarr;</span>
                </a>
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8d887e] hover:text-white transition-colors"
                  >
                    GitHub Source Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-[#0e0d0c] text-center space-y-6 max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            More on GitHub
          </span>
          <h3 className="font-display italic text-3xl sm:text-4xl text-[#ece7dd]">
            Looking for more repositories and open source contributions?
          </h3>
          <p className="font-book text-sm text-[#8d887e] leading-relaxed">
            Check out my GitHub profile for code samples, micro-libraries, and ongoing experiments.
          </p>
          <a
            href={PORTFOLIO_DATA.socials.github}
            target="_blank"
            rel="noreferrer"
            className="pill-btn inline-flex"
          >
            <span>Visit @abhishek72340 on GitHub &rarr;</span>
          </a>
        </div>
      </main>

      <MarginFooter />
    </div>
  );
}

