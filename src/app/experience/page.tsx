"use client";

import React from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      <MarginNav />

      {/* Atmospheric lighting */}
      <div className="atmos fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto space-y-16">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Work Experience</span>
          </div>

          <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-[#ece7dd] leading-[1.05] tracking-tight">
            Professional Trajectory
          </h1>

          <p className="font-book text-lg sm:text-xl text-[#8d887e] leading-relaxed max-w-3xl">
            A chronological timeline of production engineering roles, software milestones, and technical achievements across full-stack and modern frontend development.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-12 border-t border-white/10 pt-12">
          {PORTFOLIO_DATA.experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0d0c0b] hover:border-white/20 transition-all space-y-8 shadow-2xl relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs text-[#c9a27a] uppercase tracking-widest block">
                    Role 0{idx + 1} &middot; {exp.period}
                  </span>
                  <h2 className="font-display italic text-3xl sm:text-4xl text-[#ece7dd] mt-1">
                    {exp.role}
                  </h2>
                  <p className="font-mono text-sm text-[#8d887e] mt-1">
                    <span className="text-[#ece7dd] font-semibold">{exp.company}</span> &middot; {exp.location} ({exp.type})
                  </p>
                </div>

                <div className="font-mono text-xs text-[#8d887e] px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 self-start">
                  {exp.period}
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-book text-base text-[#8d887e] leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#c9a27a] block">
                    Key Achievements &amp; Contributions
                  </span>
                  <ul className="space-y-3 font-book text-sm sm:text-base text-[#ece7dd]/90 list-disc pl-5 leading-relaxed">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full font-mono text-xs text-[#8d887e] bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-r from-[#12100e] via-[#0e0d0c] to-[#12100e] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-display italic text-3xl text-[#ece7dd]">
              Looking for a dedicated software engineer?
            </h3>
            <p className="font-book text-sm text-[#8d887e]">
              Available for full-time roles, contract work, and technical architecture.
            </p>
          </div>
          <Link href="/contact" className="pill-btn shrink-0">
            <span>Get in Touch &rarr;</span>
          </Link>
        </div>
      </main>

      <MarginFooter />
    </div>
  );
}

