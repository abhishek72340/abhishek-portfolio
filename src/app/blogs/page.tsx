"use client";

import React from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";

export default function BlogsPage() {
  return (
    <div className="relative min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      <MarginNav />

      {/* Atmospheric lighting */}
      <div className="atmos fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto space-y-16">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Articles &amp; Dispatches</span>
          </div>

          <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-[#ece7dd] leading-[1.05] tracking-tight">
            Technical Dispatches
          </h1>

          <p className="font-book text-lg sm:text-xl text-[#8d887e] leading-relaxed max-w-3xl">
            Essays and deep dives into JavaScript runtime internals, asynchronous patterns, modern language proposals, and distributed systems architecture.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-8 border-t border-white/10 pt-12">
          {PORTFOLIO_DATA.blogs.map((b, idx) => (
            <article
              key={b.id}
              className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0d0c0b] hover:border-white/20 transition-all space-y-6 shadow-2xl group"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 font-mono text-xs text-[#8d887e]">
                <div className="flex items-center gap-3">
                  <span className="text-[#c9a27a]">ESSAY 0{idx + 1}</span>
                  <span>&middot;</span>
                  <span className="uppercase tracking-widest">{b.category}</span>
                </div>
                <div>
                  <span>{b.date}</span> &middot; <span>{b.readTime}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="font-display italic text-3xl sm:text-4xl text-[#ece7dd] group-hover:text-white transition-colors">
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {b.title}
                  </a>
                </h2>

                <p className="font-book text-base text-[#8d887e] leading-relaxed max-w-4xl">
                  {b.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="flex flex-wrap gap-2">
                  {b.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#8d887e]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#c9a27a] hover:underline"
                >
                  <span>Read Article on Hashnode</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Hashnode Profile Link */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-[#0e0d0c] text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            More Publications
          </span>
          <h3 className="font-display italic text-3xl text-[#ece7dd]">
            Follow My Writing on Hashnode
          </h3>
          <p className="font-book text-sm text-[#8d887e] max-w-lg mx-auto leading-relaxed">
            I periodically write about frontend architecture, browser optimizations, and practical software design.
          </p>
          <div className="pt-2">
            <a
              href={PORTFOLIO_DATA.socials.hashnode}
              target="_blank"
              rel="noreferrer"
              className="pill-btn inline-flex"
            >
              <span>Visit @abhishek72340 on Hashnode &rarr;</span>
            </a>
          </div>
        </div>
      </main>

      <MarginFooter />
    </div>
  );
}

