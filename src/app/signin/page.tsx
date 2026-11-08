"use client";

import React, { useState } from "react";
import Link from "next/link";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [memberCode, setMemberCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606] flex flex-col justify-between">
      <MarginNav />

      <main className="flex-1 flex items-center justify-center px-4 py-32 relative z-20">
        <div className="w-full max-w-md bg-[#0d0c0b] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <span className="mark mx-auto scale-90 block mb-2" />
            <h1 className="font-display italic text-4xl sm:text-5xl text-[#ece7dd]">
              Collector Access
            </h1>
            <p className="font-book text-xs sm:text-sm text-[#8d887e] leading-relaxed max-w-xs mx-auto">
              Sign in to manage your Autumn 32 subscriptions, reserve hand-bound editions, and bookmark your digital readings.
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <span className="w-12 h-12 rounded-full border border-[#c9a27a] text-[#c9a27a] inline-flex items-center justify-center text-xl mx-auto">
                ✓
              </span>
              <h2 className="font-display italic text-2xl text-[#ece7dd]">Access Link Dispatched</h2>
              <p className="font-mono text-xs text-[#8d887e] max-w-xs mx-auto leading-relaxed">
                An authentication token has been delivered to <span className="text-[#ece7dd]">{email}</span>. Click the link in your email to enter the Press Room.
              </p>
              <div className="pt-4">
                <Link href="/" className="pill-btn text-xs py-2 px-5 inline-flex">
                  Return to 3D Shelf &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8d887e] mb-1.5">
                  Reader Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@independentpress.com"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-[#ece7dd] placeholder:text-white/30 focus:outline-hidden focus:border-[#c9a27a] transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8d887e] mb-1.5">
                  Membership Passcode (Optional)
                </label>
                <input
                  type="text"
                  value={memberCode}
                  onChange={(e) => setMemberCode(e.target.value)}
                  placeholder="MGN-AUTUMN-2026"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-[#ece7dd] placeholder:text-white/30 focus:outline-hidden focus:border-[#c9a27a] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full pill-btn justify-center py-3.5 mt-2 cursor-pointer font-medium text-xs tracking-wider"
              >
                Enter Bloomsbury Press Room &rarr;
              </button>

              <div className="pt-4 text-center border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#8d887e]">
                <Link href="/catalogue" className="hover:text-white transition-colors">
                  &larr; Browse Catalogue
                </Link>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Read Journal &rarr;
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <MarginFooter />
    </div>
  );
}

