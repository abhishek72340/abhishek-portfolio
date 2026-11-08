"use client";

import { useState } from "react";

interface NavbarProps {
  onOpenInspector: () => void;
}

export default function Navbar({ onOpenInspector }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Start", href: "#start" },
    { name: "Story", href: "#story" },
    { name: "Rates", href: "#rates" },
    { name: "Benefits", href: "#benefits" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex items-center justify-between rounded-full border border-black/5 bg-white/70 px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70">
          {/* Brand Logo */}
          <a href="#start" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#202A36] text-xs font-bold tracking-widest text-white shadow-sm dark:bg-white dark:text-zinc-950">
              SE
            </span>
            <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              SkyElite
            </span>
          </a>

          {/* Desktop Menu Items: Start, Story, Rates, Benefits, FAQ */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-950 dark:text-zinc-300 dark:hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Prompt Inspector Trigger */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={onOpenInspector}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-900 transition hover:bg-amber-500/20 dark:text-amber-300"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>Prompt Margin Info</span>
            </button>
            <a
              href="#booking"
              className="rounded-full bg-[#202A36] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#151c24] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Book Flight
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenInspector}
              aria-label="Inspect prompt"
              className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-900 dark:text-amber-300"
            >
              Prompt
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 dark:border-zinc-700 dark:text-zinc-300"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mx-6 rounded-3xl border border-gray-100 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-900 hover:text-black dark:text-zinc-200"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#202A36] py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
              >
                Book Flight
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
