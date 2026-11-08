"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does SkyElite's on-demand booking differ from jet cards or fractional ownership?",
      a: "Jet cards and fractional ownership require large upfront deposits (often $100,000 to $500,000+) along with monthly management fees whether you fly or not. SkyElite operates on a purely on-demand, pay-as-you-fly model with zero upfront deposit, no lock-in, and guaranteed pricing transparently confirmed before you confirm.",
    },
    {
      q: "How much advance notice is required to arrange a flight?",
      a: "Our standard callout window is 4 hours for most primary metropolitan markets. For high-demand holiday weekends or ultra-long-range international itineraries, 24 to 48 hours notice is recommended to secure your preferred aircraft type.",
    },
    {
      q: "Can I bring my pets into the passenger cabin?",
      a: "Yes, absolutely. 100% of our charter fleet is pet-friendly. Your pets travel uncaged in the cabin beside you. We even provide custom pet hydration and dining amenities upon request.",
    },
    {
      q: "What safety ratings and pilot requirements do you enforce?",
      a: "We only charter aircraft from operators that carry ARG/US Platinum or Wyvern Wingman safety ratings—the highest certifications in business aviation. Flights always feature two captains with extensive type-rating hours, recurrent simulator training, and rigorous background checks.",
    },
    {
      q: "How does the negative margin typography on this website work?",
      a: "As highlighted in the Thinking Gods prompt margin tutorial, standard CSS line-heights in large headings (e.g. 8xl/9xl) cause unsightly gaps between multi-line titles. Applying negative margin-top (-12px or -mt-6) pulls the second line upward, allowing its letterforms to visually lock into the first line's descenders for an editorial luxury look.",
    },
  ];

  return (
    <section id="faq" className="border-t border-black/5 py-28 dark:border-white/5">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-700 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
            Common Inquiries
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#202A36] sm:text-5xl dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg dark:text-zinc-400">
            Everything you need to know about flying with SkyElite and our prompt-driven layout architecture.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition dark:border-white/10 dark:bg-zinc-950"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                    {faq.q}
                  </span>
                  <span className="ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-black/5 px-6 pb-6 pt-3 text-sm leading-relaxed text-gray-600 dark:border-white/5 dark:text-zinc-400">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
