"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [localTime, setLocalTime] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
            <span>Get in Touch</span>
          </div>

          <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-[#ece7dd] leading-[1.05] tracking-tight">
            Start a Conversation
          </h1>

          <p className="font-book text-lg sm:text-xl text-[#8d887e] leading-relaxed max-w-3xl">
            Whether you are discussing a software engineering role, exploring an interactive web project, or just wanting to talk tech — my inbox is always open.
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-16">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0d0c0b] space-y-6">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a] block">
                Direct Inquiries
              </span>

              <div className="space-y-2">
                <span className="font-mono text-xs text-[#8d887e] uppercase tracking-wider block">
                  Primary Email
                </span>
                <a
                  href={`mailto:${PORTFOLIO_DATA.email}`}
                  className="font-display italic text-2xl sm:text-3xl text-[#ece7dd] hover:text-[#c9a27a] transition-colors block break-all"
                >
                  {PORTFOLIO_DATA.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="mt-2 inline-flex items-center gap-2 font-mono text-xs text-[#c9a27a] hover:underline cursor-pointer"
                >
                  <span>{copied ? "Copied to clipboard ✓" : "Copy email address"}</span>
                </button>
              </div>

              <div className="space-y-1 pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-[#8d887e] uppercase tracking-wider block">
                  Location &amp; Time
                </span>
                <p className="font-display italic text-xl text-[#ece7dd]">
                  {PORTFOLIO_DATA.location}
                </p>
                <p className="font-mono text-xs text-[#c9a27a] pt-1">
                  Local IST: <span className="font-semibold">{localTime || "12:00 PM"}</span>
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-[#8d887e] uppercase tracking-wider block">
                  Availability Status
                </span>
                <div className="flex items-center gap-2 font-mono text-xs text-[#7fe0a6]">
                  <span className="w-2 h-2 rounded-full bg-[#7fe0a6] animate-pulse" />
                  <span>Actively Open to Opportunities</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0d0c0b] space-y-4 font-mono text-xs">
              <span className="text-[#8d887e] uppercase tracking-widest text-[10px] block">
                Professional Networks
              </span>
              <ul className="space-y-3">
                <li>
                  <a
                    href={PORTFOLIO_DATA.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-[#ece7dd] hover:text-[#c9a27a] transition-colors"
                  >
                    <span>LinkedIn &middot; Abhishek Singh Rana</span>
                    <span>&rarr;</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PORTFOLIO_DATA.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-[#ece7dd] hover:text-[#c9a27a] transition-colors"
                  >
                    <span>GitHub &middot; @abhishek72340</span>
                    <span>&rarr;</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PORTFOLIO_DATA.socials.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-[#ece7dd] hover:text-[#c9a27a] transition-colors"
                  >
                    <span>LeetCode &middot; 100+ Solved</span>
                    <span>&rarr;</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PORTFOLIO_DATA.socials.hashnode}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-[#ece7dd] hover:text-[#c9a27a] transition-colors"
                  >
                    <span>Hashnode &middot; Tech Publications</span>
                    <span>&rarr;</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-[#0d0c0b] shadow-2xl space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
                  Dispatch Form
                </span>
                <h2 className="font-display italic text-3xl sm:text-4xl text-[#ece7dd]">
                  Send a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-[#8d887e]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-sm text-[#ece7dd] font-mono placeholder:text-[#8d887e]/60 focus:outline-hidden focus:border-[#c9a27a] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-[#8d887e]">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-sm text-[#ece7dd] font-mono placeholder:text-[#8d887e]/60 focus:outline-hidden focus:border-[#c9a27a] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-[#8d887e]">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Engineering Role / Project Consultation / Collaboration"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-sm text-[#ece7dd] font-mono placeholder:text-[#8d887e]/60 focus:outline-hidden focus:border-[#c9a27a] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-[#8d887e]">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Provide details about the opportunity or what you are looking to build..."
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-xl text-sm text-[#ece7dd] font-mono placeholder:text-[#8d887e]/60 focus:outline-hidden focus:border-[#c9a27a] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="pill-btn cursor-pointer py-3.5 px-8 text-sm w-full sm:w-auto justify-center"
                  >
                    {submitted ? "Message Dispatched ✓ Thank you!" : "Send Message →"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <MarginFooter />
    </div>
  );
}

