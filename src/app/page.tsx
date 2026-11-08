"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";
import MarginReaderModal from "@/components/MarginReaderModal";

const SHELF_VOLUMES = [
  { idx: 0, code: "RAN–001", title: "Abhishek Singh Rana", category: "Portfolio Edition", color: "#1f2838" },
  { idx: 1, code: "RAN–002", title: "DressUp Fashion", category: "Full Stack E-Commerce", color: "#d17b63" },
  { idx: 2, code: "RAN–003", title: "Aura Experience", category: "WebGL & 3D Shaders", color: "#2d3229" },
  { idx: 3, code: "RAN–004", title: "Media Recorder Suite", category: "Browser Web APIs", color: "#202020" },
  { idx: 4, code: "RAN–005", title: "Mental-UP Quiz", category: "Interactive Platform", color: "#27292c" },
  { idx: 5, code: "RAN–006", title: "Chatbot Flow Builder", category: "ReactFlow Canvas", color: "#bdd7c9" },
  { idx: 6, code: "RAN–007", title: "Zetexa Global", category: "MTS-1 Engineering", color: "#4a8089" },
  { idx: 7, code: "RAN–008", title: "98thPercentile", category: "Frontend Systems", color: "#6d8fac" },
  { idx: 8, code: "RAN–009", title: "BrainCells", category: "Frontend Intern", color: "#202a2c" },
  { idx: 9, code: "RAN–010", title: "Next.js 15 Systems", category: "App Router & RSC", color: "#4a5637" },
  { idx: 10, code: "RAN–011", title: "TypeScript Architecture", category: "Strict Type Safety", color: "#d4b5b6" },
  { idx: 11, code: "RAN–012", title: "Three.js & Graphics", category: "Creative WebGL", color: "#797842" },
  { idx: 12, code: "RAN–013", title: "Docker & DevOps", category: "Containers & CI/CD", color: "#09191e" },
  { idx: 13, code: "RAN–014", title: "MongoDB & Databases", category: "Backend Systems", color: "#c66732" },
  { idx: 14, code: "RAN–015", title: "Promises in JS", category: "Hashnode Essay", color: "#bacbdc" },
  { idx: 15, code: "RAN–016", title: "Nullish Coalescing", category: "Hashnode Essay", color: "#58202f" },
  { idx: 16, code: "RAN–017", title: "Equality in JS", category: "Hashnode Essay", color: "#166f8f" },
  { idx: 17, code: "RAN–018", title: "Blockchain & Web3", category: "Hashnode Essay", color: "#843bd7" },
  { idx: 18, code: "RAN–019", title: "LeetCode 100+", category: "DSA Problem Solving", color: "#084253" },
  { idx: 19, code: "RAN–020", title: "Redux Toolkit", category: "State Flows", color: "#0f0f0f" },
  { idx: 20, code: "RAN–021", title: "Core Web Vitals", category: "Performance 40%", color: "#212226" },
  { idx: 21, code: "RAN–022", title: "Tailwind CSS", category: "Design Systems", color: "#3b2f1e" },
  { idx: 22, code: "RAN–023", title: "Node & Express", category: "REST APIs", color: "#010101" },
  { idx: 23, code: "RAN–024", title: "Git & Versioning", category: "Collaboration", color: "#fefefe" },
  { idx: 24, code: "RAN–025", title: "Hyderabad, India", category: "Base Station", color: "#c4c7ce" },
  { idx: 25, code: "RAN–026", title: "Portfolio Edition", category: "Master Archive", color: "#f9d147" },
  { idx: 26, code: "RAN–027", title: "System Design", category: "Architecture", color: "#1a263d" },
  { idx: 27, code: "RAN–028", title: "Full-Stack Engineer", category: "3+ YOE", color: "#e8d8b9" },
  { idx: 28, code: "RAN–029", title: "UI/UX Precision", category: "Pixel Craft", color: "#140c1b" },
  { idx: 29, code: "RAN–030", title: "Open Source", category: "GitHub Works", color: "#854527" },
  { idx: 30, code: "RAN–031", title: "100% Satisfaction", category: "Reliability", color: "#0b0b0b" },
  { idx: 31, code: "RAN–032", title: "Get in Touch", category: "Inquiries", color: "#ae9a6f" },
];

export default function HomePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [readerModalOpen, setReaderModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [hoveredSpine, setHoveredSpine] = useState<typeof SHELF_VOLUMES[0] | null>(null);

  // Smooth scroll controller for iframe wheel events
  useEffect(() => {
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId: number | null = null;
    let isScrolling = false;

    const tick = () => {
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.4) {
        currentY += diff * 0.16;
        window.scrollTo(0, currentY);
        rafId = requestAnimationFrame(tick);
      } else {
        currentY = targetY;
        window.scrollTo(0, targetY);
        isScrolling = false;
        rafId = null;
      }
    };

    const handleMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "SCROLL_PARENT" && typeof e.data.deltaY === "number") {
        if (!isScrolling) {
          currentY = window.scrollY;
          targetY = window.scrollY;
          isScrolling = true;
        }

        // Apply delta with smooth scaling
        targetY += e.data.deltaY;
        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );
        targetY = Math.max(0, Math.min(targetY, maxScroll));

        if (rafId === null) {
          rafId = requestAnimationFrame(tick);
        }
      }
    };

    const handleNativeScroll = () => {
      if (!isScrolling) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("scroll", handleNativeScroll);
    };
  }, []);

  const sendIframeCommand = (type: string, payload?: Record<string, unknown>) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type, ...payload }, "*");
    }
  };

  const handleOpenBookIn3D = (bookIndex: number = 0) => {
    sendIframeCommand("OPEN_BOOK", { index: bookIndex });
    const shelfEl = document.getElementById("shelf");
    if (shelfEl && window.scrollY > 80) {
      shelfEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(PORTFOLIO_DATA.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      {/* Navigation */}
      <MarginNav
        onOpenReader={() => handleOpenBookIn3D(0)}
      />

      {/* Hero: 3D Three.js WebGL Shelf with Books Lined up Linewise across Abhishek */}
      <section id="shelf" className="relative w-full h-[100svh] overflow-hidden bg-[#060606]">
        {/* The 3D Three.js WebGL Shelf */}
        <iframe
          ref={iframeRef}
          src="/demos/margin-press/index.html?autoOpen=true&embedded=true"
          className="w-full h-full border-0 absolute inset-0 z-10"
          title="Abhishek Singh Rana 3D WebGL Portfolio Shelf"
          allow="autoplay"
        />

        {/* Bottom scroll hint */}
        <div className="absolute bottom-6 right-6 sm:right-12 z-20 pointer-events-auto">
          <a
            href="#shelf-ribbon"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("shelf-ribbon")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8d887e] hover:text-[#ece7dd] transition-colors bg-[#060606]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10"
          >
            <span>Explore 32 Shelf Volumes</span>
            <span className="transition-transform group-hover:translate-y-0.5">&darr;</span>
          </a>
        </div>
      </section>

      {/* SECTION 1: THE 32 VOLUMES LINEWISE SHELF STRIP */}
      <section id="shelf-ribbon" className="relative z-30 py-12 px-6 sm:px-12 lg:px-20 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c9a27a]">
                  The 32 Volumes
                </span>
                <span className="text-white/30">&middot;</span>
                <span className="font-mono text-xs text-[#ece7dd]">
                  Abhishek Singh Rana Portfolio Collection
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#8d887e]">
                Hover any spine to inspect &middot; Click to fly open volume in 3D WebGL
              </p>
            </div>

            {hoveredSpine && (
              <div className="font-mono text-xs text-[#c9a27a] flex items-center gap-2 animate-fadeIn">
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15">
                  {hoveredSpine.code}
                </span>
                <span className="font-display italic text-sm text-[#ece7dd]">
                  {hoveredSpine.title}
                </span>
                <span className="text-[#8d887e]">({hoveredSpine.category})</span>
              </div>
            )}
          </div>

          {/* Relative wrapper for Spines Ribbon + Absolute Popover Card */}
          <div className="relative z-40">
            {/* 32 Spines Horizontal Curved Ribbon */}
            <div className="p-3.5 rounded-2xl border border-white/10 bg-[#0d0c0b] overflow-x-auto scrollbar-none shadow-2xl flex items-center gap-1.5">
              {SHELF_VOLUMES.map((b) => (
                <button
                  key={b.code}
                  type="button"
                  onClick={() => handleOpenBookIn3D(b.idx)}
                  onMouseEnter={() => setHoveredSpine(b)}
                  onMouseLeave={() => setHoveredSpine(null)}
                  title={`${b.code}: ${b.title} (${b.category})`}
                  className="group relative flex-1 min-w-[26px] sm:min-w-[34px] h-24 rounded-md transition-all hover:scale-105 hover:-translate-y-2 focus:outline-hidden cursor-pointer shadow-lg overflow-hidden flex flex-col justify-between p-1 border border-white/10"
                  style={{ backgroundColor: b.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-white/15 pointer-events-none" />
                  <span className="font-mono text-[7px] text-white/50 group-hover:text-white uppercase font-bold">
                    {b.code.replace("RAN–", "")}
                  </span>
                  <span className="font-mono text-[8px] text-white/80 group-hover:text-white font-medium rotate-[-90deg] whitespace-nowrap translate-y-[-10px] truncate max-w-[60px]">
                    {b.title}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-[#c9a27a] mx-auto mb-1 transition-colors" />
                </button>
              ))}
            </div>

            {/* Active Hover Open-Book Spread Preview (Floating Overlay with Absolute Position - No Layout Shift) */}
            {hoveredSpine && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-full max-w-xl pointer-events-auto animate-fadeIn"
                onMouseEnter={() => setHoveredSpine(hoveredSpine)}
                onMouseLeave={() => setHoveredSpine(null)}
              >
                <div
                  onClick={() => handleOpenBookIn3D(hoveredSpine.idx)}
                  className="flex w-full h-44 rounded-xl overflow-hidden border border-[#c9a27a]/60 bg-[#f5efe4] text-[#1c1813] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_25px_rgba(201,162,122,0.25)] cursor-pointer hover:scale-[1.01] transition-transform select-none relative"
                >
                  {/* Top Pointer Triangle Indicator */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#c9a27a]" />

                  {/* Left Page */}
                  <div className="flex-1 p-5 flex flex-col justify-between border-r border-[#1c1813]/10 bg-gradient-to-l from-black/5 to-transparent">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[#7e7465]">
                        <span className="text-[#c9a27a] font-semibold">{hoveredSpine.code}</span>
                        <span>Vol. {String(hoveredSpine.idx + 1).padStart(2, "0")}</span>
                      </div>
                      <h4 className="font-display italic text-2xl text-[#1c1813] leading-tight">
                        {hoveredSpine.title}
                      </h4>
                      <p className="font-mono text-[10px] text-[#7e7465] uppercase tracking-wider">
                        {hoveredSpine.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between font-mono text-[9px] text-[#8d8373] border-t border-[#1c1813]/10 pt-2">
                      <span>Abhishek Singh Rana</span>
                      <span>Hyderabad, India</span>
                    </div>
                  </div>

                  {/* Center Spine Gutter Crease Shadow */}
                  <div className="w-3 bg-gradient-to-r from-black/20 via-transparent to-black/20 flex-none relative shadow-inner">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-black/15" />
                  </div>

                  {/* Right Page */}
                  <div className="flex-1 p-5 flex flex-col justify-between bg-gradient-to-r from-black/5 to-transparent">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[#7e7465]">
                        <span>Highlights</span>
                        <span>3+ YOE</span>
                      </div>
                      <p className="font-book text-xs text-[#4a4237] leading-relaxed">
                        Building modern web systems with Next.js 15, Three.js WebGL &amp; TypeScript.
                      </p>
                      <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
                        <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10">Next.js 15</span>
                        <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10">Three.js</span>
                        <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10">MTS-1</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between font-mono text-[9px] text-[#c9a27a] font-semibold border-t border-[#1c1813]/10 pt-2">
                      <span>Click to fly open in 3D WebGL</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT ME & STATS */}
      <section id="about" className="relative z-10 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 bg-[#060606]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Bio & Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a27a]" />
                <span>About &middot; Software Engineer</span>
              </div>

              <h2 className="font-display italic text-4xl sm:text-6xl text-[#ece7dd] leading-[1.1] tracking-tight">
                Crafting performant web architectures with precision and elegance.
              </h2>

              <p className="font-book text-base sm:text-lg text-[#8d887e] leading-relaxed max-w-2xl">
                {PORTFOLIO_DATA.bio}
              </p>

              <blockquote className="font-display italic text-xl text-[#ece7dd] border-l-2 border-[#c9a27a] pl-4 py-1">
                &ldquo;Simplicity is prerequisite for reliability.&rdquo;
              </blockquote>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href="/about" className="pill-btn">
                  <span>Read Full Story &rarr;</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setReaderModalOpen(true)}
                  className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 font-mono text-xs text-[#ece7dd] transition-colors cursor-pointer"
                >
                  Open Book Reader Modal
                </button>
              </div>
            </div>

            {/* Right: Profile Card with Avatar */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-3 rounded-3xl border border-white/15 bg-gradient-to-b from-[#141210] to-[#0a0908] shadow-2xl max-w-sm w-full">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-[#151210]">
                  <Image
                    src={PORTFOLIO_DATA.profileImage}
                    alt={PORTFOLIO_DATA.name}
                    fill
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 380px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 font-mono text-xs text-[#ece7dd]">
                    <div className="font-display italic text-2xl leading-tight">
                      {PORTFOLIO_DATA.name}
                    </div>
                    <div className="text-[11px] text-[#c9a27a] mt-0.5">
                      {PORTFOLIO_DATA.title} &middot; {PORTFOLIO_DATA.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10">
            {PORTFOLIO_DATA.stats.map((st) => (
              <div
                key={st.label}
                className="p-6 rounded-2xl border border-white/10 bg-[#0d0c0b] space-y-2 hover:border-[#c9a27a]/40 transition-colors"
              >
                <div className="font-display italic text-4xl sm:text-5xl text-[#c9a27a]">
                  {st.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#ece7dd]">
                  {st.label}
                </div>
                <div className="font-mono text-[10px] text-[#8d887e]">
                  {st.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TECHNICAL SKILLS MATRIX */}
      <section id="skills" className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 bg-[#0a0908]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
                Core Competencies
              </span>
              <h2 className="font-display italic text-4xl sm:text-6xl text-[#ece7dd]">
                Technical Skills &amp; Stack
              </h2>
            </div>
            <Link
              href="/skills"
              className="font-mono text-xs uppercase tracking-widest text-[#8d887e] hover:text-[#ece7dd] transition-colors"
            >
              View Detailed Matrix &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.skills.map((cat, idx) => (
              <div
                key={cat.category}
                className="p-8 rounded-2xl border border-white/10 bg-[#0d0c0b] hover:border-white/20 transition-all flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#c9a27a] uppercase tracking-widest">
                    Area 0{idx + 1}
                  </span>
                  <h3 className="font-display italic text-2xl text-[#ece7dd]">
                    {cat.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full font-mono text-xs border border-white/10 bg-white/5 text-[#ece7dd]"
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

      {/* SECTION 4: WORK EXPERIENCE TIMELINE */}
      <section id="experience" className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 bg-[#060606]">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
                Career Trajectory
              </span>
              <h2 className="font-display italic text-4xl sm:text-6xl text-[#ece7dd]">
                Work Experience
              </h2>
            </div>
            <Link
              href="/experience"
              className="font-mono text-xs uppercase tracking-widest text-[#8d887e] hover:text-[#ece7dd] transition-colors"
            >
              Full Experience Details &rarr;
            </Link>
          </div>

          <div className="space-y-8">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#0e0d0c] hover:border-white/20 transition-all space-y-6 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#c9a27a] uppercase tracking-widest block">
                      Role 0{idx + 1} &middot; {exp.period}
                    </span>
                    <h3 className="font-display italic text-3xl text-[#ece7dd] mt-1">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-xs text-[#8d887e] mt-0.5">
                      {exp.company} &middot; {exp.location} ({exp.type})
                    </p>
                  </div>
                </div>

                <p className="font-book text-sm sm:text-base text-[#8d887e] leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2 text-xs sm:text-sm font-book text-[#ece7dd]/90 list-disc pl-5 leading-relaxed">
                  {exp.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full font-mono text-[11px] text-[#8d887e] bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: SELECTED PROJECTS SHOWCASE */}
      <section id="projects" className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 bg-[#0a0908]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
                Selected Works
              </span>
              <h2 className="font-display italic text-4xl sm:text-6xl text-[#ece7dd]">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-mono text-xs uppercase tracking-widest text-[#8d887e] hover:text-[#ece7dd] transition-colors"
            >
              Browse All Projects &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#0d0c0b] hover:border-[#c9a27a]/40 transition-all flex flex-col justify-between space-y-6 shadow-xl group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-[#8d887e] border-b border-white/10 pb-3">
                    <span className="text-[#c9a27a]">PROJ–0{idx + 1}</span>
                    <span className="uppercase tracking-widest">{proj.category}</span>
                  </div>

                  <h3 className="font-display italic text-3xl text-[#ece7dd] group-hover:text-white transition-colors">
                    {proj.title}
                  </h3>

                  <p className="font-book text-sm text-[#8d887e] leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full font-mono text-[10px] text-[#ece7dd] bg-white/5 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#c9a27a] hover:underline"
                  >
                    <span>Launch Live Demo</span>
                    <span>&rarr;</span>
                  </a>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8d887e] hover:text-white transition-colors"
                    >
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BLOGS & ARTICLES */}
      <section id="blogs" className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 bg-[#060606]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
                Engineering Insights
              </span>
              <h2 className="font-display italic text-4xl sm:text-6xl text-[#ece7dd]">
                Technical Dispatches
              </h2>
            </div>
            <Link
              href="/blogs"
              className="font-mono text-xs uppercase tracking-widest text-[#8d887e] hover:text-[#ece7dd] transition-colors"
            >
              Read All Articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.blogs.map((b) => (
              <a
                key={b.id}
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className="group p-8 rounded-2xl border border-white/10 bg-[#0d0c0b] hover:border-white/20 transition-all flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-[#8d887e]">
                    <span className="text-[#c9a27a]">{b.category}</span>
                    <span>{b.readTime}</span>
                  </div>

                  <h3 className="font-display italic text-2xl text-[#ece7dd] group-hover:text-white transition-colors">
                    {b.title}
                  </h3>

                  <p className="font-book text-sm text-[#8d887e] leading-relaxed">
                    {b.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between font-mono text-xs text-[#8d887e] pt-4 border-t border-white/10">
                  <span>{b.date}</span>
                  <span className="text-[#c9a27a] group-hover:translate-x-1 transition-transform">
                    Read on Hashnode &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: GET IN TOUCH */}
      <section id="contact" className="relative z-20 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 bg-[#080808]">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
              Connect &middot; Inquiries
            </span>
            <h2 className="font-display italic text-4xl sm:text-6xl text-[#ece7dd]">
              Let&rsquo;s Build Something Remarkable
            </h2>
            <p className="font-book text-base text-[#8d887e] max-w-xl mx-auto leading-relaxed">
              Available for full-time engineering roles, high-performance web products, and technical collaborations.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-[#0d0c0b] shadow-2xl text-left space-y-8">
            <form onSubmit={handleQuickContact} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-[#8d887e]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-sm text-[#ece7dd] font-mono placeholder:text-[#8d887e]/60 focus:outline-hidden focus:border-[#c9a27a] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-[#8d887e]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-sm text-[#ece7dd] font-mono placeholder:text-[#8d887e]/60 focus:outline-hidden focus:border-[#c9a27a] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs uppercase tracking-widest text-[#8d887e]">
                  Message or Opportunity Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your team, role, or project..."
                  className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-sm text-[#ece7dd] font-mono placeholder:text-[#8d887e]/60 focus:outline-hidden focus:border-[#c9a27a] transition-colors resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="pill-btn cursor-pointer py-3 px-6 text-xs"
                >
                  {contactSubmitted ? "Message Sent ✓" : "Send Inquiry →"}
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-mono text-xs text-[#8d887e] hover:text-[#ece7dd] transition-colors cursor-pointer"
                >
                  {copiedEmail ? "Copied email! ✓" : `Direct: ${PORTFOLIO_DATA.email}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <MarginFooter />

      {/* Full Book Reader Modal Fallback */}
      <MarginReaderModal
        isOpen={readerModalOpen}
        onClose={() => setReaderModalOpen(false)}
      />
    </div>
  );
}
