"use client";

import { useState } from "react";

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [origin, setOrigin] = useState("New York (TEB)");
  const [destination, setDestination] = useState("Miami (OPF)");
  const [aircraft, setAircraft] = useState("Midsize (Challenger 350)");
  const [passengers, setPassengers] = useState("4");
  const [date, setDate] = useState("2026-11-20");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative border-t border-black/5 bg-[#202A36] py-28 text-white overflow-hidden">
      {/* Decorative luxury background glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Instant Flight Estimate
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Ready to take flight? Request your bespoke itinerary.
            </h2>
            <p className="mt-6 text-base text-zinc-300 sm:text-lg">
              Submit your itinerary details and our flight operations team will prepare tailored tail options with fixed guaranteed quotes within 15 minutes.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  ✓
                </span>
                <span>Immediate confirmation with live tail availability</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  ✓
                </span>
                <span>Complimentary ground concierge and FBO transfer</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  ✓
                </span>
                <span>Direct phone & WhatsApp coordination with dispatch</span>
              </div>
            </div>
          </div>

          {/* Booking Form Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Flight Request Received</h3>
                <p className="text-sm text-zinc-300 max-w-sm mx-auto">
                  Your itinerary from <strong>{origin}</strong> to <strong>{destination}</strong> on <strong>{date}</strong> has been transmitted. A flight coordinator will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-zinc-900 transition hover:bg-zinc-200"
                >
                  Request Another Itinerary
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Flight Parameters</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Departure City / FBO
                    </label>
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Arrival Destination
                    </label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Passengers
                    </label>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                    >
                      <option value="1-3">1 – 3 Passengers</option>
                      <option value="4-6">4 – 6 Passengers</option>
                      <option value="7-9">7 – 9 Passengers</option>
                      <option value="10+">10+ Passengers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Preferred Class
                    </label>
                    <select
                      value={aircraft}
                      onChange={(e) => setAircraft(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white focus:border-white focus:outline-none"
                    >
                      <option value="Light Jet">Light Jet</option>
                      <option value="Midsize">Midsize & Super-Mid</option>
                      <option value="Heavy Jet">Heavy & Ultra Long</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-white py-3.5 text-center text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 shadow-lg"
                >
                  Generate Tail Quote & Availability
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
