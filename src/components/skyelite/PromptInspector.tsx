"use client";

import { useState } from "react";

interface PromptInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  useNegativeMargin: boolean;
  onToggleNegativeMargin: () => void;
}

export default function PromptInspector({
  isOpen,
  onClose,
  useNegativeMargin,
  onToggleNegativeMargin,
}: PromptInspectorProps) {
  const [copied, setCopied] = useState(false);

  const rawPrompt = `Build a luxury private jet landing page hero section in React with Tailwind CSS.

VIDEO BACKGROUND:
- Autoplaying, muted, looping, playsInline video (100vh, object-cover)
- Subtle radial dark gradient overlay for typography readability

NAVIGATION BAR:
- Max width 7xl, centered with px-8 py-6
- Brand name "SkyElite" on the left (text-2xl, font-semibold, text-gray-900)
- Desktop menu items: Start, Story, Rates, Benefits, FAQ
- Navigation links in gray-900 with hover:text-gray-700 transition
- Mobile menu with Lucide Menu/X icons and frosted backdrop

HERO CONTENT (centered, -mt-80 to pull up):
- Small uppercase label: "PRIVATE JETS" (text-sm, font-semibold, gray-600, tracking-wider, mb-4)
- Large two-line heading with overlapping effect:
  Line 1: "Premium." (text-6xl md:text-7xl lg:text-8xl, font-normal, text-gray-500, leading-none, tracking-tighter)
  Line 2: "Accessible." (same size, color #202A36, negative margin-top -12px for overlap)
- Subtitle: "Your dedication deserves recognition."
- High-contrast pill CTA buttons: "Request a Flight" and "Explore Fleet & Rates"`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-3xl border border-zinc-200 bg-white shadow-2xl overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Thinking Gods: Prompt Margin Technique
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Turn one prompt into a premium Hero section with negative margin overlap
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Interactive Live Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                Live Negative Margin (-12px) Effect
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                Current status: <strong className="text-amber-600 dark:text-amber-400">{useNegativeMargin ? "ACTIVE (-mt-12px overlap)" : "DISABLED (Standard spacing)"}</strong>
              </div>
            </div>
            <button
              onClick={onToggleNegativeMargin}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold shadow-sm transition-all ${
                useNegativeMargin
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200"
              }`}
            >
              <span>{useNegativeMargin ? "✓ Negative Margin Enabled" : "Enable Negative Margin"}</span>
            </button>
          </div>

          {/* Explanation Box */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Why this prompt works
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Generic AI code outputs often suffer from floating, disconnected headlines due to default browser line-heights. By baking in <strong>`negative margin-top -12px`</strong> (or Tailwind’s <code>-mt-3</code> / <code>-mt-6</code>) directly in the prompt, the second line subtly pulls up beneath the first line&apos;s descender, achieving the high-end editorial overlap characteristic of luxury brands.
            </p>
          </div>

          {/* Raw Prompt Code Block */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Original MotionSites / Thinking Gods Prompt
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {copied ? (
                  <>
                    <span className="text-emerald-600">✓ Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <pre className="rounded-2xl border border-zinc-200 bg-zinc-950 p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed dark:border-zinc-800">
              {rawPrompt}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/30">
          <a
            href="https://thinkingods.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:underline dark:text-zinc-400"
          >
            Resource by Thinking Gods (Kunal Chaudhary)
          </a>
          <button
            onClick={onClose}
            className="rounded-full bg-zinc-900 px-5 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
