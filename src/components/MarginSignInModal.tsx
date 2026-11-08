"use client";

import React, { useState } from "react";

interface MarginSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MarginSignInModal({ isOpen, onClose }: MarginSignInModalProps) {
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060606]/85 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-[#0f0e0d] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl text-[#ece7dd] space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center space-y-2">
          <span className="mark mx-auto scale-90 block mb-3" />
          <h2 className="font-display italic text-3xl sm:text-4xl">Collector &amp; Reader Portal</h2>
          <p className="font-book text-xs text-[#8d887e] leading-relaxed max-w-xs mx-auto">
            Access advance reading copies, view your autumn reserved editions, and track reading bookmarks.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-2 animate-fadeIn">
            <span className="w-10 h-10 rounded-full border border-[#c9a27a] text-[#c9a27a] inline-flex items-center justify-center text-lg mx-auto">
              ✓
            </span>
            <p className="font-display italic text-xl">Welcome to Margin Press</p>
            <p className="font-mono text-xs text-[#8d887e]">Authentication link dispatched to your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8d887e] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@domain.com"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-[#ece7dd] placeholder:text-white/30 focus:outline-hidden focus:border-[#c9a27a] font-mono text-xs transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8d887e] mb-1.5">
                Membership Code (Optional)
              </label>
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="MGN-MEMBER-XXXX"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-[#ece7dd] placeholder:text-white/30 focus:outline-hidden focus:border-[#c9a27a] font-mono text-xs transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full pill-btn justify-center py-3.5 mt-2 cursor-pointer font-medium text-xs tracking-wider"
            >
              Sign In to Press Room &rarr;
            </button>

            <p className="text-center font-mono text-[10px] text-[#8d887e] pt-2">
              New to Margin? Entering your email creates a complimentary reading archive.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

