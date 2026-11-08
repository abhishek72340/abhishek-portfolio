"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface MarginNavProps {
  onOpenReader?: () => void;
  onOpenSignIn?: () => void;
}

export default function MarginNav({ onOpenReader }: MarginNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-8 lg:px-14 py-4 sm:py-6 flex items-center justify-between ${
        scrolled ? "bg-[#060606]/85 backdrop-blur-md border-b border-white/5 py-3 sm:py-4 shadow-2xl" : ""
      }`}
    >
      {/* Brand logo left */}
      <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden">
        <span className="mark transition-transform group-hover:scale-105" aria-hidden="true" />
        <span className="h-[34px] flex flex-col justify-between py-[1px]">
          <span className="font-display italic text-[20px] sm:text-[22px] leading-[0.95] tracking-tight text-[#ece7dd] whitespace-nowrap">
            Abhishek Singh Rana
          </span>
          <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-[0.2em] text-[#8d887e] font-medium leading-none">
            Software Engineer
          </span>
        </span>
      </Link>

      {/* Center Nav Pill */}
      <nav
        className="hidden md:flex items-center gap-5 lg:gap-7 px-6 py-2.5 rounded-full border border-[rgba(236,231,221,0.13)] bg-[rgba(236,231,221,0.035)] backdrop-blur-md text-[13px] font-medium tracking-wide text-[#ece7dd]"
        aria-label="Primary Navigation"
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors relative py-0.5 ${
                isActive
                  ? "text-[#c9a27a] font-semibold"
                  : "opacity-80 hover:opacity-100 hover:text-white"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a27a] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/contact"
          className="hidden sm:inline-block font-mono text-xs uppercase tracking-widest text-[#8d887e] hover:text-[#ece7dd] transition-colors"
        >
          Get in Touch
        </Link>

        {onOpenReader ? (
          <button
            type="button"
            onClick={onOpenReader}
            className="pill-btn cursor-pointer"
            title="Open 3D Portfolio Book"
          >
            <span>Open Book</span>
            <svg
              className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 6h7M6.5 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <Link href="/#shelf" className="pill-btn">
            <span>Open Book</span>
            <svg
              className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 6h7M6.5 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}

        {/* Mobile menu hamburger toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full border border-white/10 text-[#ece7dd] hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            {mobileMenuOpen ? (
              <path d="M3 3l10 10M13 3L3 13" strokeWidth="1.4" strokeLinecap="round" />
            ) : (
              <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" strokeWidth="1.4" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 p-6 rounded-3xl border border-white/15 bg-[#0d0c0b]/95 backdrop-blur-2xl shadow-2xl flex flex-col gap-4 z-50 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c9a27a]">
              Navigation
            </span>
            <span className="font-mono text-[10px] text-[#8d887e]">
              Abhishek Singh Rana
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-white/10 text-[#c9a27a] font-semibold"
                    : "text-[#ece7dd] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3 font-mono text-xs">
            <a
              href={`mailto:${PORTFOLIO_DATA.email}`}
              className="text-[#c9a27a] hover:underline"
            >
              {PORTFOLIO_DATA.email}
            </a>
            <div className="flex items-center gap-4 text-[#8d887e]">
              <a
                href={PORTFOLIO_DATA.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
              <a
                href={PORTFOLIO_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href={PORTFOLIO_DATA.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                LeetCode
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
