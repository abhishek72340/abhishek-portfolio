"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function MarginFooter() {
  const [localTime, setLocalTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(PORTFOLIO_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#060606] text-[#ece7dd] pt-20 pb-12 px-6 sm:px-12 lg:px-20 relative z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top brand & get in touch strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="mark" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-display italic text-3xl text-[#ece7dd]">
                  {PORTFOLIO_DATA.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8d887e]">
                  {PORTFOLIO_DATA.title}
                </span>
              </div>
            </Link>
            <p className="font-book text-sm text-[#8d887e] max-w-sm leading-relaxed">
              {PORTFOLIO_DATA.tagline} Focused on crafting resilient web applications, interactive 3D WebGL experiences, and high-performance Next.js architectures.
            </p>

          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8d887e]">
              Direct Inquiries &amp; Collaborations
            </span>
            <p className="font-display italic text-2xl sm:text-3xl text-[#ece7dd]">
              Have a project in mind or an engineering opportunity? Let&rsquo;s connect.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${PORTFOLIO_DATA.email}`}
                className="pill-btn cursor-pointer text-xs"
              >
                <span>Write an Email &rarr;</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 font-mono text-xs text-[#ece7dd] transition-colors cursor-pointer"
              >
                {copied ? "Copied to Clipboard ✓" : `Copy: ${PORTFOLIO_DATA.email}`}
              </button>
            </div>
          </div>
        </div>

        {/* 4-column directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono text-[#8d887e]">
          {/* Navigation */}
          <div className="space-y-3">
            <p className="uppercase tracking-widest text-[#ece7dd] font-semibold">Portfolio</p>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">About Story</Link></li>
              <li><Link href="/skills" className="hover:text-white transition-colors">Skills Matrix</Link></li>
              <li><Link href="/experience" className="hover:text-white transition-colors">Work Experience</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Selected Projects</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Articles &amp; Dispatches</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Selected Works */}
          <div className="space-y-3">
            <p className="uppercase tracking-widest text-[#ece7dd] font-semibold">Selected Works</p>
            <ul className="space-y-2">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <li key={proj.id}>
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors truncate block"
                  >
                    {proj.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3">
            <p className="uppercase tracking-widest text-[#ece7dd] font-semibold">Connect</p>
            <ul className="space-y-2">
              <li>
                <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  GitHub &middot; @abhishek72340
                </a>
              </li>
              <li>
                <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  LinkedIn &middot; Abhishek Singh Rana
                </a>
              </li>
              <li>
                <a href={PORTFOLIO_DATA.socials.leetcode} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  LeetCode &middot; 100+ Problems
                </a>
              </li>
              <li>
                <a href={PORTFOLIO_DATA.socials.hashnode} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Hashnode &middot; Tech Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Colophon & Local Clock */}
          <div className="space-y-3">
            <p className="uppercase tracking-widest text-[#ece7dd] font-semibold">Colophon</p>
            <p className="leading-relaxed">
              Designed in Obsidian &amp; Ember tones. Set in Instrument Serif, Newsreader, and Geist Mono.
            </p>

          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8d887e]">
          <p>© 2026 Abhishek Singh Rana. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}
