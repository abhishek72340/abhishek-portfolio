"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";

export default function SkillsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", ...PORTFOLIO_DATA.skills.map((s) => s.category)];

  const filteredSkills =
    selectedFilter === "All"
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter((s) => s.category === selectedFilter);

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
            <span>Skills &amp; Capabilities</span>
          </div>

          <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-[#ece7dd] leading-[1.05] tracking-tight">
            The Technical Repertoire
          </h1>

          <p className="font-book text-lg sm:text-xl text-[#8d887e] leading-relaxed max-w-3xl">
            A comprehensive matrix of modern web engineering technologies, full-stack frameworks, 3D graphics tools, and computational systems applied across 3+ years of production experience.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-t border-b border-white/10 py-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#8d887e] mr-2">
            Filter by domain:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${selectedFilter === cat
                  ? "bg-[#c9a27a] text-[#060606] font-semibold shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-[#ece7dd] border border-white/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((cat, idx) => (
            <div
              key={cat.category}
              className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#0d0c0b] hover:border-white/20 transition-all flex flex-col justify-between space-y-8 shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[#8d887e]">
                  <span className="text-[#c9a27a]">DOM–0{idx + 1}</span>
                  <span className="uppercase tracking-widest">{cat.skills.length} Capabilities</span>
                </div>

                <h2 className="font-display italic text-3xl text-[#ece7dd] group-hover:text-white transition-colors">
                  {cat.category}
                </h2>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-full font-mono text-xs border border-white/10 bg-white/5 text-[#ece7dd] group-hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-[#8d887e]">
                <span>Applied in Production &amp; Architecture</span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Detail Box: Code Quality & Architecture Standards */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-br from-[#12100e] to-[#080808] space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a] block">
            Engineering Standard
          </span>
          <h2 className="font-display italic text-3xl sm:text-4xl text-[#ece7dd]">
            Zero-Compromise Performance &amp; Clean Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-mono text-[#8d887e]">
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2">
              <span className="text-[#c9a27a] text-sm font-semibold">40% FCP Reduction</span>
              <p className="font-book text-sm leading-relaxed text-[#ece7dd]/80">
                Optimized Core Web Vitals, code-splitting, tree-shaking, and streaming server components.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2">
              <span className="text-[#c9a27a] text-sm font-semibold">Strict Type Safety</span>
              <p className="font-book text-sm leading-relaxed text-[#ece7dd]/80">
                End-to-end typed contracts between client interfaces, server actions, and database schemas.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2">
              <span className="text-[#c9a27a] text-sm font-semibold">100+ LeetCode DSA</span>
              <p className="font-book text-sm leading-relaxed text-[#ece7dd]/80">
                Consistent practice in space-time complexity analysis, graphs, dynamic programming, and data structures.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link href="/projects" className="pill-btn">
              <span>See Selected Projects &rarr;</span>
            </Link>
            <Link href="/experience" className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 font-mono text-xs text-[#ece7dd] transition-colors">
              Experience History
            </Link>
          </div>
        </div>
      </main>

      <MarginFooter />
    </div>
  );
}

