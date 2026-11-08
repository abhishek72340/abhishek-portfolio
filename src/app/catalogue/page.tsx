"use client";

import React, { useState, useMemo } from "react";
import { BOOKS, Book } from "@/data/books";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";
import MarginReaderModal from "@/components/MarginReaderModal";
import MarginSignInModal from "@/components/MarginSignInModal";

export default function CataloguePage() {
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [signInOpen, setSignInOpen] = useState<boolean>(false);

  const genres = [
    "All",
    "New Releases",
    "Bestsellers",
    "Fiction",
    "Nonfiction",
    "Poetry",
    "In Translation",
    "Small Press",
  ];

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((b) => {
      // Genre filter
      if (selectedGenre === "New Releases" && !b.isNewRelease) return false;
      if (selectedGenre === "Bestsellers" && !b.isBestseller) return false;
      if (
        selectedGenre !== "All" &&
        selectedGenre !== "New Releases" &&
        selectedGenre !== "Bestsellers" &&
        b.genre !== selectedGenre
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.code.toLowerCase().includes(q) ||
          b.openingLine.toLowerCase().includes(q) ||
          b.synopsis.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [selectedGenre, searchQuery]);

  return (
    <div className="min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      <MarginNav
        onOpenReader={() => setSelectedBook(BOOKS[0])}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      <main className="pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            Catalogue &middot; Autumn 2026
          </span>
          <h1 className="font-display italic text-5xl sm:text-7xl leading-none text-[#ece7dd]">
            The Autumn Thirty-Two
          </h1>
          <p className="font-book text-base sm:text-lg text-[#8d887e] leading-relaxed">
            The complete list of thirty-two new titles. Smyth-sewn in Bloomsbury on Munken Pure unbleached rag paper. Click any title to open its typeset interior preview.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pt-4 pb-8 border-b border-white/10">
          {/* Genre pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {genres.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGenre(g)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedGenre === g
                    ? "bg-[#ece7dd] text-[#060606] font-semibold"
                    : "border border-white/10 bg-white/5 text-[#8d887e] hover:text-[#ece7dd] hover:border-white/25"
                }`}
              >
                {g} {g === "All" && `(${BOOKS.length})`}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, author, #..."
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
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8d887e] hover:text-white"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Book Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <span className="font-display italic text-3xl text-[#8d887e]">No volumes found</span>
            <p className="font-mono text-xs text-[#8d887e]">Try adjusting your search query or selected genre filter.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedGenre("All");
                setSearchQuery("");
              }}
              className="pill-btn cursor-pointer mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBooks.map((b) => (
              <div
                key={b.id}
                className="group rounded-2xl border border-white/10 bg-[#0d0c0b] p-6 hover:border-white/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
              >
                <div className="space-y-5">
                  {/* Book Spine Mockup */}
                  <div
                    className="w-full aspect-[1/1.45] rounded-lg shadow-md relative overflow-hidden flex flex-col justify-between p-6 cursor-pointer"
                    style={{
                      backgroundColor: b.spineColor,
                      backgroundImage:
                        "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.48) 100%)",
                    }}
                    onClick={() => setSelectedBook(b)}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] text-[#c9a27a] font-semibold tracking-wider">
                        {b.code}
                      </span>
                      <span className="mark scale-75 opacity-90" />
                    </div>

                    <div className="my-auto text-center space-y-2">
                      <h3 className="font-display italic text-2xl text-[#ece7dd] leading-snug tracking-tight">
                        {b.title}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#ece7dd]/80">{b.author}</p>
                    </div>

                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[#ece7dd]/60 border-t border-white/10 pt-2">
                      <span>{b.genre}</span>
                      <span>{b.pubYear}</span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#c9a27a]">{b.code}</span>
                      <span className="text-[#8d887e]">{b.price}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedBook(b)}
                      className="font-display italic text-2xl text-[#ece7dd] group-hover:text-white transition-colors cursor-pointer leading-tight"
                    >
                      {b.title}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#8d887e]">{b.author}</p>

                    <p className="font-book text-xs text-[#8d887e] line-clamp-2 leading-relaxed pt-1">
                      &ldquo;{b.openingLine}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedBook(b)}
                    className="font-mono text-[11px] uppercase tracking-wider text-[#ece7dd] hover:text-[#c9a27a] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Read Preview</span>
                    <span>&rarr;</span>
                  </button>
                  <span className="font-mono text-[10px] text-[#8d887e]">{b.pages} pp.</span>
                </div>
              </div>
            ))}
          </div>
        )}
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

