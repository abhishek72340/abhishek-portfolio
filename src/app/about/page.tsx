"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      <MarginNav />

      {/* Atmospheric lighting & grain */}
      <div className="atmos fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      <main className="relative z-10 pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-20">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>About Abhishek Singh Rana</span>
          </div>

          <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-[#ece7dd] leading-[1.05] tracking-tight">
            Engineering with rigor, craft, and intent.
          </h1>

          <p className="font-book text-lg sm:text-xl text-[#8d887e] leading-relaxed max-w-3xl">
            {PORTFOLIO_DATA.bio}
          </p>
        </div>

        {/* Profile Card & Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
          {/* Left: Avatar Card & Quick Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative p-3 rounded-3xl border border-white/15 bg-gradient-to-b from-[#141210] to-[#0a0908] shadow-2xl">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#151210]">
                <Image
                  src={PORTFOLIO_DATA.profileImage}
                  alt={PORTFOLIO_DATA.name}
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 font-mono text-xs text-[#ece7dd]">
                  <p className="font-display italic text-3xl leading-tight">
                    {PORTFOLIO_DATA.name}
                  </p>
                  <p className="text-[11px] text-[#c9a27a] mt-1">
                    {PORTFOLIO_DATA.title} &middot; 3+ YOE
                  </p>
                  <p className="text-[10px] text-[#8d887e] mt-0.5">
                    {PORTFOLIO_DATA.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact & Links */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d0c0b] space-y-4 font-mono text-xs">
              <div className="text-[#8d887e] uppercase tracking-widest text-[10px]">
                Direct Connect
              </div>
              <a
                href={`mailto:${PORTFOLIO_DATA.email}`}
                className="text-[#c9a27a] hover:underline block truncate"
              >
                {PORTFOLIO_DATA.email}
              </a>
              <div className="flex items-center gap-4 text-[#8d887e] pt-1 border-t border-white/10">
                <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="hover:text-white">
                  GitHub
                </a>
                <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
                  LinkedIn
                </a>
                <a href={PORTFOLIO_DATA.socials.leetcode} target="_blank" rel="noreferrer" className="hover:text-white">
                  LeetCode
                </a>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-7 space-y-10 font-book text-[#ece7dd]/90 text-base sm:text-lg leading-relaxed">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#c9a27a] block">
                The Journey
              </span>
              <h2 className="font-display italic text-3xl sm:text-4xl text-[#ece7dd]">
                From First Principles to Production Scale
              </h2>
              <p>
                My journey in software engineering started with a fascination for computer architecture and the mechanics of modern browsers. Over the past 3+ years, I have had the privilege of architecting critical frontend systems, building interactive WebGL applications, and delivering production Next.js 15 platforms.
              </p>
              <p>
                Currently serving as <span className="text-white font-medium">MTS-1 (Member of Technical Staff)</span> at Zetexa Global in Hyderabad, I spearhead modern web initiatives focusing on zero-runtime overhead, server-driven architecture, and measurable performance optimizations (achieving a 40% reduction in First Contentful Paint).
              </p>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#c9a27a] block">
                Guiding Principles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-xl border border-white/10 bg-[#0d0c0b] space-y-2">
                  <h3 className="font-display italic text-xl text-[#ece7dd]">01. Performance First</h3>
                  <p className="text-xs sm:text-sm text-[#8d887e] font-book leading-relaxed">
                    Fast load times and minimal CPU/GPU overhead aren&rsquo;t afterthoughts — they define usability and user delight.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/10 bg-[#0d0c0b] space-y-2">
                  <h3 className="font-display italic text-xl text-[#ece7dd]">02. Clean Type-Safety</h3>
                  <p className="text-xs sm:text-sm text-[#8d887e] font-book leading-relaxed">
                    TypeScript used to its fullest potential: strict compiler checks, self-documenting models, and zero runtime surprises.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/10 bg-[#0d0c0b] space-y-2">
                  <h3 className="font-display italic text-xl text-[#ece7dd]">03. Tactile Visuals</h3>
                  <p className="text-xs sm:text-sm text-[#8d887e] font-book leading-relaxed">
                    Merging typography traditions with 3D WebGL physics to create experiences that feel alive and responsive.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/10 bg-[#0d0c0b] space-y-2">
                  <h3 className="font-display italic text-xl text-[#ece7dd]">04. Problem Solving</h3>
                  <p className="text-xs sm:text-sm text-[#8d887e] font-book leading-relaxed">
                    Over 100+ algorithm problems solved on LeetCode, keeping data structures and computational efficiency sharp.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#c9a27a] block">
                Academic Background
              </span>
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0d0c0b] space-y-2">
                <h3 className="font-display italic text-2xl text-[#ece7dd]">Bachelor of Technology (B.Tech)</h3>
                <p className="font-mono text-xs text-[#c9a27a]">Computer Science &amp; Engineering</p>
                <p className="text-xs sm:text-sm text-[#8d887e] leading-relaxed pt-1">
                  Rigorous coursework covering Data Structures &amp; Algorithms, Operating Systems, Database Management Systems, Object-Oriented Software Design, and Distributed Computer Networks.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link href="/projects" className="pill-btn">
                <span>Explore Selected Projects &rarr;</span>
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 font-mono text-xs text-[#ece7dd] transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MarginFooter />
    </div>
  );
}

