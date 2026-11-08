"use client";

import React, { useState } from "react";
import { JOURNAL_ARTICLES, JournalArticle } from "@/data/journal";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";
import MarginSignInModal from "@/components/MarginSignInModal";

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);
  const [signInOpen, setSignInOpen] = useState<boolean>(false);

  const categories = ["All", "Editorial", "Typography", "Interview", "Translation", "Craft"];

  const filteredArticles = JOURNAL_ARTICLES.filter((a) => {
    if (selectedCategory === "All") return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      <MarginNav onOpenSignIn={() => setSignInOpen(true)} />

      <main className="pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            Dispatches &middot; Bloomsbury
          </span>
          <h1 className="font-display italic text-5xl sm:text-7xl leading-none text-[#ece7dd]">
            Margin Journal
          </h1>
          <p className="font-book text-base sm:text-lg text-[#8d887e] leading-relaxed">
            Critical essays on independent publishing, hand-typeset typography, the craft of Smyth-sewn binding, and literary memoirs from our authors and translators.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-white/10 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === c
                  ? "bg-[#ece7dd] text-[#060606] font-semibold"
                  : "border border-white/10 bg-white/5 text-[#8d887e] hover:text-[#ece7dd] hover:border-white/25"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured First Essay */}
        {filteredArticles.length > 0 && (
          <article
            className="rounded-3xl border border-white/15 bg-[#0d0c0b] p-8 sm:p-14 shadow-2xl space-y-8 cursor-pointer hover:border-white/30 transition-colors"
            onClick={() => setActiveArticle(filteredArticles[0])}
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#8d887e]">
              <span className="text-[#c9a27a] uppercase tracking-widest">{filteredArticles[0].category}</span>
              <span>{filteredArticles[0].date} &middot; {filteredArticles[0].readTime}</span>
            </div>

            <div className="space-y-4">
              <h2 className="font-display italic text-3xl sm:text-5xl text-[#ece7dd] leading-tight">
                {filteredArticles[0].title}
              </h2>
              <p className="font-book text-base text-[#8d887e] leading-relaxed max-w-3xl">
                {filteredArticles[0].subtitle}
              </p>
            </div>

            {filteredArticles[0].pullQuote && (
              <blockquote className="font-display italic text-xl sm:text-2xl text-[#ece7dd]/90 border-l-2 border-[#c9a27a] pl-6 py-2 my-4">
                &ldquo;{filteredArticles[0].pullQuote}&rdquo;
              </blockquote>
            )}

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="mark scale-75" />
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-[#ece7dd]">{filteredArticles[0].author}</span>
                  <span className="font-mono text-[10px] text-[#8d887e]">{filteredArticles[0].authorRole}</span>
                </div>
              </div>

              <span className="pill-btn text-xs">
                <span>Read Full Essay</span>
                <span>&rarr;</span>
              </span>
            </div>
          </article>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {filteredArticles.slice(1).map((art) => (
            <article
              key={art.slug}
              id={art.slug}
              onClick={() => setActiveArticle(art)}
              className="group rounded-2xl border border-white/10 bg-[#0d0c0b] p-8 hover:border-white/25 transition-all flex flex-col justify-between space-y-6 shadow-lg cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8d887e]">
                  <span className="text-[#c9a27a] uppercase tracking-wider">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-display italic text-2xl sm:text-3xl text-[#ece7dd] group-hover:text-white transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="font-book text-xs sm:text-sm text-[#8d887e] leading-relaxed">
                  {art.excerpt}
                </p>

                {art.pullQuote && (
                  <blockquote className="font-display italic text-sm text-[#ece7dd]/85 border-l border-[#c9a27a]/60 pl-3 py-1">
                    &ldquo;{art.pullQuote}&rdquo;
                  </blockquote>
                )}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8d887e]">
                <span>{art.author}</span>
                <span className="group-hover:translate-x-1 transition-transform text-[#ece7dd] font-semibold">
                  Read &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#060606]/92 backdrop-blur-2xl animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#0d0c0b] border border-white/15 rounded-3xl p-8 sm:p-14 shadow-2xl text-[#ece7dd] space-y-8 scrollbar-thin">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-4 border-b border-white/10 pb-8">
              <div className="flex items-center gap-3 font-mono text-xs text-[#8d887e]">
                <span className="text-[#c9a27a] uppercase tracking-wider">{activeArticle.category}</span>
                <span>&middot;</span>
                <span>{activeArticle.date}</span>
                <span>&middot;</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h1 className="font-display italic text-3xl sm:text-5xl text-[#ece7dd] leading-tight">
                {activeArticle.title}
              </h1>

              <p className="font-mono text-xs text-[#8d887e]">
                By {activeArticle.author} ({activeArticle.authorRole})
              </p>
            </div>

            {/* Essay Paragraphs */}
            <div className="space-y-6 font-book text-base leading-relaxed text-[#ece7dd]/90 text-justify">
              {activeArticle.content.map((p, idx) => (
                <p key={idx} className={idx === 0 ? "first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:pr-3 first-letter:pt-1" : ""}>
                  {p}
                </p>
              ))}
            </div>

            {activeArticle.pullQuote && (
              <blockquote className="font-display italic text-2xl text-[#c9a27a] border-l-2 border-[#c9a27a] pl-6 py-2 my-8">
                &ldquo;{activeArticle.pullQuote}&rdquo;
              </blockquote>
            )}

            <div className="pt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#8d887e]">
              <span>Margin Press &middot; Bloomsbury Press Room</span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="pill-btn text-xs py-1.5 px-4 cursor-pointer"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}

      <MarginFooter />

      <MarginSignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
      />
    </div>
  );
}

