"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Book } from "@/data/books";

interface MarginReaderModalProps {
  isOpen?: boolean;
  book?: Book | null;
  onClose: () => void;
  initialSpread?: number;
}

export default function MarginReaderModal({
  isOpen,
  book,
  onClose,
  initialSpread = 0,
}: MarginReaderModalProps) {
  const isModalOpen = isOpen ?? Boolean(book);
  const [spread, setSpread] = useState(initialSpread);
  const [prevProps, setPrevProps] = useState({ isOpen: isModalOpen, initialSpread });
  const totalSpreads = 9;

  if (prevProps.isOpen !== isModalOpen || prevProps.initialSpread !== initialSpread) {
    setPrevProps({ isOpen: isModalOpen, initialSpread });
    if (isModalOpen) {
      setSpread(initialSpread);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setSpread((s) => Math.min(s + 1, totalSpreads - 1));
      if (e.key === "ArrowLeft") setSpread((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, onClose]);

  if (!isModalOpen) return null;

  const getSpreadLabel = (s: number) => {
    switch (s) {
      case 0:
        return "Front cover";
      case 1:
        return "Ex Libris & Half-title";
      case 2:
        return "Title Page & Contents";
      case 3:
        return "About Abhishek Singh Rana (pp. 01–02)";
      case 4:
        return "Skills Matrix (pp. 03–04)";
      case 5:
        return "Work Experience (pp. 05–06)";
      case 6:
        return "Selected Projects (pp. 07–08)";
      case 7:
        return "Articles & Dispatches (pp. 09–10)";
      case 8:
        return "Contact & Back Cover";
      default:
        return `Spread ${s}`;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#060606]/92 backdrop-blur-2xl animate-fadeIn select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Book Reader"
    >
      {/* Top Header Chrome */}
      <div className="absolute top-4 sm:top-6 left-6 right-6 sm:left-12 sm:right-12 flex items-center justify-between text-xs tracking-wider z-10 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[#c9a27a] font-medium">RAN–001</span>
          <span className="text-white/40">&middot;</span>
          <span className="font-display italic text-lg text-[#ece7dd]">
            Abhishek Singh Rana
          </span>
          <span className="text-white/40 hidden sm:inline">&middot;</span>
          <span className="text-[#8d887e] hidden sm:inline">
            Software Engineer (Portfolio Edition)
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(236,231,221,0.18)] bg-[rgba(236,231,221,0.05)] hover:bg-[rgba(236,231,221,0.12)] text-[#ece7dd] font-mono text-[11px] uppercase tracking-widest transition-colors cursor-pointer"
        >
          <span>Close</span>
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
            <path
              d="M1.5 1.5l7 7M8.5 1.5l-7 7"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Book Stage Container */}
      <div className="relative w-full max-w-4xl max-h-[82vh] aspect-[1.45/1] flex items-center justify-center shadow-[0_30px_100px_rgba(0,0,0,0.85)]">
        {/* Cover view */}
        {spread === 0 && (
          <div
            onClick={() => setSpread(1)}
            className="w-[340px] sm:w-[420px] aspect-[1/1.5] rounded-r-xl shadow-2xl relative overflow-hidden transition-all duration-500 border border-white/10 flex flex-col justify-between p-8 sm:p-12 cursor-pointer group bg-[#151210]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, rgba(201,162,122,0.2), transparent 70%), linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.55) 100%)",
            }}
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#c9a27a]">
              <span>RAN–001</span>
              <span>2026 EDITION</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display italic text-4xl sm:text-5xl text-[#ece7dd] leading-tight">
                Abhishek Singh Rana
              </h1>
              <p className="font-mono text-xs text-[#8d887e] tracking-widest uppercase">
                Software Engineer &middot; 3 YOE
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#8d887e] border-t border-white/10 pt-4">
              <span>HYDERABAD, INDIA</span>
              <span className="text-[#c9a27a] group-hover:translate-x-1 transition-transform">
                Click to open &rarr;
              </span>
            </div>
          </div>
        )}

        {/* Spread 1: Ex Libris & Half Title */}
        {spread === 1 && (
          <div className="w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f3eee4] text-[#1f1b16]">
            {/* Left page: Ex Libris */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col items-center justify-center border-r border-[#1f1b16]/15 text-center relative">
              <div className="p-6 border border-[#1f1b16]/30 max-w-[260px] space-y-3 shadow-sm bg-white/40">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#81786b]">
                  Ex Libris
                </span>
                <p className="font-display italic text-2xl sm:text-3xl">Abhishek Singh Rana</p>
                <div className="h-px bg-[#1f1b16]/20 my-2" />
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#81786b]">
                  Software Engineer &middot; Portfolio 2026
                </p>
              </div>
            </div>

            {/* Right page: Half Title */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between text-center">
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] text-right">
                RAN–001
              </div>
              <div className="space-y-4 max-w-xs mx-auto">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#81786b]">
                  The Selected Works
                </span>
                <h2 className="font-display italic text-3xl sm:text-4xl leading-snug">
                  Building modern web experiences with precision &amp; craft.
                </h2>
                <div className="w-12 h-px bg-[#1f1b16]/30 mx-auto" />
              </div>
              <div className="font-mono text-[10px] text-[#81786b]">
                Hyderabad, Telangana &middot; India
              </div>
            </div>
          </div>
        )}

        {/* Spread 2: Title Page & Contents */}
        {spread === 2 && (
          <div className="w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f3eee4] text-[#1f1b16]">
            {/* Left page: Title Page */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between text-center border-r border-[#1f1b16]/15">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b]">
                Software Architecture &middot; UI Engineering
              </span>
              <div className="space-y-3">
                <h2 className="font-display italic text-4xl sm:text-5xl leading-none">
                  Abhishek Singh Rana
                </h2>
                <p className="font-mono text-xs uppercase tracking-widest text-[#81786b]">
                  Full Stack Engineer &middot; 3+ YOE
                </p>
              </div>
              <div className="font-mono text-[10px] text-[#81786b] space-y-1">
                <p>Zetexa Global &middot; 98thPercentile &middot; BrainCells</p>
                <p>Next.js 15 &middot; React &middot; TypeScript &middot; Three.js</p>
              </div>
            </div>

            {/* Right page: Table of Contents */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#81786b] block border-b border-[#1f1b16]/15 pb-2">
                  Table of Contents
                </span>
                <ol className="space-y-3.5 text-xs font-mono">
                  <li className="flex items-baseline justify-between">
                    <span>I. About Abhishek Singh Rana &amp; Philosophy</span>
                    <span className="text-[#81786b]">01</span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>II. Technical Skills Matrix</span>
                    <span className="text-[#81786b]">03</span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>III. Professional Experience</span>
                    <span className="text-[#81786b]">05</span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>IV. Selected Projects &amp; Demos</span>
                    <span className="text-[#81786b]">07</span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>V. Engineering Dispatches</span>
                    <span className="text-[#81786b]">09</span>
                  </li>
                  <li className="flex items-baseline justify-between">
                    <span>VI. Get in Touch &amp; Colophon</span>
                    <span className="text-[#81786b]">10</span>
                  </li>
                </ol>
              </div>
              <div className="font-mono text-[10px] text-[#81786b] border-t border-[#1f1b16]/10 pt-2 text-right">
                Turn page to begin &rarr;
              </div>
            </div>
          </div>
        )}

        {/* Spread 3: Chapter One — About */}
        {spread === 3 && (
          <div className="w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f3eee4] text-[#1f1b16]">
            {/* Left: About Opener */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between border-r border-[#1f1b16]/15">
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b]">
                    Chapter One
                  </span>
                  <h3 className="font-display italic text-2xl sm:text-3xl">About Abhishek Singh Rana</h3>
                </div>
                <div className="w-10 h-px bg-[#1f1b16]/20 mx-auto" />
                <p className="font-book text-xs sm:text-sm leading-relaxed text-justify first-letter:float-left first-letter:text-4xl first-letter:font-display first-letter:mr-2 first-letter:leading-none">
                  I am a Software Engineer based in Hyderabad, India, with 3 years of hands-on experience building high-performance web systems, intuitive digital products, and production Next.js &amp; React architectures.
                </p>
                <p className="font-book text-xs sm:text-sm leading-relaxed text-justify text-[#81786b]">
                  My work combines engineering rigor with creative visual craft, ensuring that every interface is fast, accessible, and delightful to use.
                </p>
              </div>
              <span className="font-mono text-[10px] text-[#81786b]">01</span>
            </div>

            {/* Right: Metrics & Philosophy */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] block text-center">
                  Engineering Values &amp; Metrics
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-[#1f1b16]/15 rounded bg-white/30">
                    <div className="font-display italic text-2xl">3+ YOE</div>
                    <div className="font-mono text-[9px] uppercase text-[#81786b]">
                      Production Eng
                    </div>
                  </div>
                  <div className="p-3 border border-[#1f1b16]/15 rounded bg-white/30">
                    <div className="font-display italic text-2xl">20+</div>
                    <div className="font-mono text-[9px] uppercase text-[#81786b]">
                      Web Projects
                    </div>
                  </div>
                  <div className="p-3 border border-[#1f1b16]/15 rounded bg-white/30">
                    <div className="font-display italic text-2xl">100%</div>
                    <div className="font-mono text-[9px] uppercase text-[#81786b]">
                      Satisfaction
                    </div>
                  </div>
                  <div className="p-3 border border-[#1f1b16]/15 rounded bg-white/30">
                    <div className="font-display italic text-2xl">100+</div>
                    <div className="font-mono text-[9px] uppercase text-[#81786b]">
                      DSA LeetCode
                    </div>
                  </div>
                </div>

                <blockquote className="font-display italic text-base text-[#1f1b16] border-l-2 border-[#c9a27a] pl-3 py-1">
                  &ldquo;Simplicity is prerequisite for reliability.&rdquo;
                </blockquote>
              </div>
              <span className="font-mono text-[10px] text-[#81786b] text-right">02</span>
            </div>
          </div>
        )}

        {/* Spread 4: Chapter Two — Skills Matrix */}
        {spread === 4 && (
          <div className="w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f3eee4] text-[#1f1b16]">
            {/* Left: Frontend & 3D */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between border-r border-[#1f1b16]/15">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] block">
                  Chapter Two &middot; Frontend &amp; 3D Graphics
                </span>
                <h4 className="font-display italic text-2xl">Frontend Architecture</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills[0].skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[#1f1b16]/20 bg-white/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <h4 className="font-display italic text-2xl pt-2">Interactive &amp; WebGL</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills[1].skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[#1f1b16]/20 bg-white/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#81786b]">03</span>
            </div>

            {/* Right: Backend & DevOps */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] block">
                  Backend, DevOps &amp; CS
                </span>
                <h4 className="font-display italic text-2xl">Backend &amp; Databases</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills[2].skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[#1f1b16]/20 bg-white/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <h4 className="font-display italic text-2xl pt-2">Tools &amp; DevOps</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills[3].skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[#1f1b16]/20 bg-white/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#81786b] text-right">04</span>
            </div>
          </div>
        )}

        {/* Spread 5: Chapter Three — Experience */}
        {spread === 5 && (
          <div className="w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f3eee4] text-[#1f1b16]">
            {/* Left: Zetexa Global */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between border-r border-[#1f1b16]/15">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] block">
                  Chapter Three &middot; Work Experience
                </span>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display italic text-2xl">MTS-1</h4>
                    <span className="font-mono text-[10px] text-[#81786b]">Present</span>
                  </div>
                  <p className="font-mono text-xs font-semibold">Zetexa Global &middot; Hyderabad</p>
                </div>
                <ul className="space-y-2 text-xs font-book list-disc pl-4 text-[#1f1b16]/80 leading-relaxed">
                  <li>Spearheaded scalable frontend architecture using Next.js 15 App Router &amp; TypeScript.</li>
                  <li>Reduced First Contentful Paint by 40% with optimized assets and server components.</li>
                  <li>Engineered responsive design system components with Tailwind CSS.</li>
                </ul>
              </div>
              <span className="font-mono text-[10px] text-[#81786b]">05</span>
            </div>

            {/* Right: 98thPercentile & BrainCells */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1 border-b border-[#1f1b16]/15 pb-3">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display italic text-xl">Frontend Developer</h4>
                    <span className="font-mono text-[10px] text-[#81786b]">2023 — 2024</span>
                  </div>
                  <p className="font-mono text-xs font-semibold">98thPercentile &middot; Hyderabad</p>
                  <p className="text-xs font-book text-[#1f1b16]/80 leading-relaxed">
                    Developed high-traffic student &amp; instructor dashboards and real-time quiz modules with Redux Toolkit.
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display italic text-xl">Frontend Intern</h4>
                    <span className="font-mono text-[10px] text-[#81786b]">2022 — 2023</span>
                  </div>
                  <p className="font-mono text-xs font-semibold">BrainCells &middot; Remote</p>
                  <p className="text-xs font-book text-[#1f1b16]/80 leading-relaxed">
                    Built modular React UI flows from Figma specifications with high fidelity.
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#81786b] text-right">06</span>
            </div>
          </div>
        )}

        {/* Spread 6: Chapter Four — Selected Projects */}
        {spread === 6 && (
          <div className="w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f3eee4] text-[#1f1b16]">
            {/* Left: DressUp & Aura */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between border-r border-[#1f1b16]/15">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] block">
                  Chapter Four &middot; Featured Works
                </span>
                <div className="space-y-1 border-b border-[#1f1b16]/15 pb-3">
                  <h4 className="font-display italic text-2xl">DressUp E-Commerce</h4>
                  <p className="text-xs font-book text-[#81786b]">
                    Interactive fashion shopping platform with multi-factor sorting and checkout flows.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://dressup-shop.netlify.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1b16] text-[#f3eee4] font-mono text-[10px]"
                    >
                      <span>Open Live Demo</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <h4 className="font-display italic text-2xl">Aura Web Experience</h4>
                  <p className="text-xs font-book text-[#81786b]">
                    Luxury 3D interactive showcase with Three.js shaders and fluid camera physics.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://aura-delta-hazel.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1b16] text-[#f3eee4] font-mono text-[10px]"
                    >
                      <span>Open Live Demo</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#81786b]">07</span>
            </div>

            {/* Right: Media Recorder & Mental-UP */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] block">
                  Web Utilities &amp; Systems
                </span>
                <div className="space-y-1 border-b border-[#1f1b16]/15 pb-3">
                  <h4 className="font-display italic text-2xl">Media Recorder Suite</h4>
                  <p className="text-xs font-book text-[#81786b]">
                    Browser tool capturing screen recordings, webcam video, and audio streams.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://media-recorder11.netlify.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1b16] text-[#f3eee4] font-mono text-[10px]"
                    >
                      <span>Open Live Demo</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <h4 className="font-display italic text-2xl">Mental-UP &amp; Flow Builder</h4>
                  <p className="text-xs font-book text-[#81786b]">
                    Cognitive quiz engine with real-time feedback &amp; ReactFlow chatbot graph builder.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://activity-app1.netlify.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1b16] text-[#f3eee4] font-mono text-[10px]"
                    >
                      <span>Open Live Demo</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#81786b] text-right">08</span>
            </div>
          </div>
        )}

        {/* Spread 7: Chapter Five — Articles */}
        {spread === 7 && (
          <div className="w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f3eee4] text-[#1f1b16]">
            {/* Left: Articles */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between border-r border-[#1f1b16]/15">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] block">
                  Chapter Five &middot; Articles
                </span>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.blogs.slice(0, 2).map((b) => (
                    <div key={b.id} className="space-y-1">
                      <h4 className="font-display italic text-xl">
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {b.title} &rarr;
                        </a>
                      </h4>
                      <p className="text-xs font-book text-[#81786b] line-clamp-2">
                        {b.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#81786b]">09</span>
            </div>

            {/* Right: Articles Continued */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#81786b] block">
                  Technical Dispatches
                </span>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.blogs.slice(2, 4).map((b) => (
                    <div key={b.id} className="space-y-1">
                      <h4 className="font-display italic text-xl">
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {b.title} &rarr;
                        </a>
                      </h4>
                      <p className="text-xs font-book text-[#81786b] line-clamp-2">
                        {b.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#81786b] text-right">10</span>
            </div>
          </div>
        )}

        {/* Spread 8: Chapter Six — Contact & Back Cover */}
        {spread === 8 && (
          <div className="w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#f3eee4] text-[#1f1b16]">
            {/* Left: Contact */}
            <div className="w-1/2 p-8 sm:p-12 flex flex-col justify-between border-r border-[#1f1b16]/15">
              <div className="space-y-4 text-center my-auto">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#81786b]">
                  Chapter Six &middot; Colophon
                </span>
                <h3 className="font-display italic text-3xl">Let&rsquo;s Build Together</h3>
                <p className="font-book text-xs text-[#81786b] max-w-xs mx-auto">
                  Open for full-time engineering opportunities and creative technical projects.
                </p>
                <div className="pt-2 font-mono text-xs text-[#1f1b16] font-semibold">
                  <a href={`mailto:${PORTFOLIO_DATA.email}`} className="underline">
                    {PORTFOLIO_DATA.email}
                  </a>
                </div>
                <div className="pt-3 flex justify-center gap-3">
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="px-4 py-1.5 rounded-full bg-[#1f1b16] text-[#f3eee4] font-mono text-[11px]"
                  >
                    Open Contact Page &rarr;
                  </Link>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#81786b]">End of Volume</span>
            </div>

            {/* Right: Back Cover */}
            <div
              className="w-1/2 p-8 sm:p-12 flex flex-col justify-between text-[#ece7dd] relative overflow-hidden"
              style={{
                backgroundColor: "#151210",
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            >
              <div className="font-mono text-[9px] text-[#c9a27a] uppercase tracking-widest">
                RAN–001 &middot; 2026
              </div>
              <div className="space-y-3">
                <blockquote className="font-display italic text-xl leading-snug">
                  &ldquo;Building modern web experiences with precision &amp; craft.&rdquo;
                </blockquote>
                <p className="font-mono text-[11px] text-[#8d887e]">
                  Abhishek Singh Rana &middot; Software Engineer
                </p>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-[#8d887e] border-t border-white/10 pt-3">
                <span>PORTFOLIO EDITION</span>
                <span>HYDERABAD, INDIA</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Spread Navigation Chrome */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs font-mono text-[#ece7dd] z-10 pointer-events-auto">
        <button
          type="button"
          onClick={() => setSpread((s) => Math.max(s - 1, 0))}
          disabled={spread === 0}
          className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Previous spread"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
            <path
              d="M11 7H3M6.5 3.5 3 7l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className="min-w-[14ch] text-center text-[#8d887e] uppercase tracking-wider text-[11px]">
          {getSpreadLabel(spread)}
        </span>

        <button
          type="button"
          onClick={() => setSpread((s) => Math.min(s + 1, totalSpreads - 1))}
          disabled={spread === totalSpreads - 1}
          className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Next spread"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
