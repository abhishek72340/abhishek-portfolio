"use client";

import { useState } from "react";

export default function FleetRates() {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const fleet = [
    {
      id: 0,
      name: "Light Jet",
      model: "Citation CJ3+ / Phenom 300",
      passengers: "6 – 8 Seats",
      range: "1,875 nm (~3.5 hrs)",
      speed: "518 mph",
      rate: "$3,600",
      description: "Ideal for short regional hops and executive day trips with runway access to remote airfields.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80",
      features: ["Enclosed lavatory", "High-speed WiFi", "Ski / golf bag storage", "Refreshment center"],
    },
    {
      id: 1,
      name: "Midsize & Super-Mid",
      model: "Citation Latitude / Challenger 350",
      passengers: "8 – 10 Seats",
      range: "3,200 nm (~6 hrs)",
      speed: "540 mph",
      rate: "$5,800",
      description: "The gold standard for transcontinental flights. Stand-up cabin height with generous baggage hold.",
      image: "https://images.unsplash.com/photo-1519074069444-1ba4e34c9c43?auto=format&fit=crop&w=800&q=80",
      features: ["Full stand-up cabin", "Flight attendant available", "Lie-flat club seating", "Full galley"],
    },
    {
      id: 2,
      name: "Heavy Jet & Ultra Long",
      model: "Gulfstream G650ER / Global 7500",
      passengers: "12 – 16 Seats",
      range: "7,500 nm (~14 hrs)",
      speed: "610 mph",
      rate: "$10,500",
      description: "Global nonstop capability connecting London to Singapore or New York to Tokyo in uncompromised luxury.",
      image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=800&q=80",
      features: ["Dedicated private stateroom", "Dual lavatories with shower", "Full executive conference table", "Chef-prepared dining"],
    },
  ];

  return (
    <section id="rates" className="border-t border-black/5 py-28 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-700 shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300">
            Fleet & Transparent Rates
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#202A36] sm:text-5xl dark:text-white">
            Predictable pricing. Zero hidden surcharges.
          </h2>

          <p className="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-zinc-400">
            Every quote includes flight crew, fuel, landing fees, and luxury in-flight catering. No unexpected repositioning surcharges.
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {fleet.map((item) => {
            const isSelected = selectedTier === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedTier(item.id)}
                className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#202A36] bg-white shadow-xl ring-2 ring-[#202A36]/10 dark:border-white dark:bg-zinc-900 dark:ring-white/20"
                    : "border-black/10 bg-white/60 hover:border-black/20 hover:bg-white dark:border-white/10 dark:bg-zinc-950/40 dark:hover:border-white/20"
                }`}
              >
                {isSelected && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[#202A36] px-3 py-1 text-[11px] font-bold tracking-widest text-white uppercase dark:bg-white dark:text-zinc-950">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-zinc-400">
                    {item.model}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-[#202A36] dark:text-white">
                      {item.rate}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                      / flight hour
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                    {item.description}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-black/5 pt-6 dark:border-white/5">
                    <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-zinc-300">
                      <span>Passengers:</span>
                      <strong className="text-gray-900 dark:text-white">{item.passengers}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-zinc-300">
                      <span>Flight Range:</span>
                      <strong className="text-gray-900 dark:text-white">{item.range}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-zinc-300">
                      <span>Cruise Speed:</span>
                      <strong className="text-gray-900 dark:text-white">{item.speed}</strong>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-zinc-400">
                        <svg className="h-4 w-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
                  <a
                    href="#booking"
                    className={`inline-flex w-full items-center justify-center rounded-full py-3 text-center text-sm font-semibold transition ${
                      isSelected
                        ? "bg-[#202A36] text-white hover:bg-[#151c24] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                        : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    Select {item.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
