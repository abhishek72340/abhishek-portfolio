"use client";

import React, { useState } from "react";
import { BOOKS, Book } from "@/data/books";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";
import MarginReaderModal from "@/components/MarginReaderModal";
import MarginSignInModal from "@/components/MarginSignInModal";

export default function AuthorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);

  const filteredAuthors = BOOKS.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.author.toLowerCase().includes(q) ||
      b.authorLocation.toLowerCase().includes(q) ||
      b.title.toLowerCase().includes(q) ||
      b.authorBio.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      <MarginNav
        onOpenReader={() => setSelectedBook(BOOKS[0])}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      <main className="pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
              The Press Directory
            </span>
            <h1 className="font-display italic text-5xl sm:text-7xl text-[#ece7dd] leading-none">
              Margin Authors
            </h1>
            <p className="font-book text-base text-[#8d887e] leading-relaxed">
              Thirty-two novelists, cartographers, translators, and essayists. From the remote archipelagos of Sweden to the night diners of Route 9.
            </p>
          </div>

          {/* Search author */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search author or city..."
              className="w-full bg-white/5 border border-white/15 rounded-full px-4 py-2.5 pl-10 text-xs font-mono text-[#ece7dd] placeholder:text-[#8d887e] focus:outline-hidden focus:border-[#c9a27a] transition-colors"
            />
            <svg
              className="w-3.5 h-3.5 text-[#8d887e] absolute left-3.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="7" cy="7" r="4.4" strokeWidth="1.5" />
              <path d="m10.4 10.4 3.1 3.1" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAuthors.map((b) => (
            <div
              key={b.id}
              className="group rounded-2xl border border-white/10 bg-[#0d0c0b] p-8 hover:border-white/25 transition-all flex flex-col justify-between space-y-6 shadow-lg"
            >
              <div className="space-y-4">
                {/* Author Avatar / Monogram */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center font-display italic text-2xl text-[#ece7dd] shadow-inner"
                    style={{ backgroundColor: `${b.spineColor}33` }}
                  >
                    {b.author.charAt(0)}
                  </div>
                  <span className="font-mono text-[10px] text-[#c9a27a] tracking-wider uppercase">
                    {b.code}
                  </span>
                </div>

                {/* Name & Origin */}
                <div>
                  <h3 className="font-display italic text-3xl text-[#ece7dd] group-hover:text-white transition-colors">
                    {b.author}
                  </h3>
                  <p className="font-mono text-xs text-[#8d887e] mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a27a]" />
                    <span>{b.authorLocation}</span>
                  </p>
                </div>

                {/* Bio */}
                <p className="font-book text-xs text-[#8d887e] leading-relaxed">
                  {b.authorBio}
                </p>

                {/* Notebook Epigraph */}
                <blockquote className="font-display italic text-sm text-[#ece7dd]/90 border-l border-[#c9a27a]/60 pl-3 py-0.5">
                  &ldquo;{b.epigraph}&rdquo;
                </blockquote>
              </div>

              {/* Published Book Link */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#8d887e] block">
                    Published with Margin
                  </span>
                  <p className="font-display italic text-base text-[#ece7dd] mt-0.5">{b.title}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedBook(b)}
                  className="pill-btn text-xs cursor-pointer py-1.5 px-3"
                >
                  <span>Read</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MarginFooter />

      <MarginReaderModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <MarginSignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
      />
    </div>
  );
}

