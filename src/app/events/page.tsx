"use client";

import React, { useState } from "react";
import { PRESS_EVENTS, PressEvent } from "@/data/events";
import MarginNav from "@/components/MarginNav";
import MarginFooter from "@/components/MarginFooter";
import MarginSignInModal from "@/components/MarginSignInModal";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<PressEvent | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleBookTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setBookedSuccess(false);
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#ece7dd] selection:bg-[#c9a27a] selection:text-[#060606]">
      <MarginNav onOpenSignIn={() => setSignInOpen(true)} />

      <main className="pt-32 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c9a27a]">
            Calendar &middot; 2026/2027
          </span>
          <h1 className="font-display italic text-5xl sm:text-7xl leading-none text-[#ece7dd]">
            Salons &amp; Readings
          </h1>
          <p className="font-book text-base sm:text-lg text-[#8d887e] leading-relaxed">
            Gatherings in public libraries, private press rooms, and midnight bookshops. Each event features readings from the Autumn 32 list and discussion with our authors.
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {PRESS_EVENTS.map((ev) => (
            <div
              key={ev.id}
              id={ev.id}
              className="group rounded-3xl border border-white/10 bg-[#0d0c0b] p-8 sm:p-12 hover:border-white/25 transition-all shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Date & Location Left */}
              <div className="lg:col-span-3 space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#c9a27a] block">
                  {ev.city} &middot; {ev.category}
                </span>
                <p className="font-display italic text-3xl text-[#ece7dd]">{ev.date}</p>
                <p className="font-mono text-xs text-[#8d887e]">{ev.time}</p>
                <p className="font-mono text-xs text-[#ece7dd]/80 pt-2">{ev.venue}</p>
                <p className="font-mono text-[10px] text-[#8d887e]">{ev.address}</p>
              </div>

              {/* Title & Description Center */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-display italic text-3xl sm:text-4xl text-[#ece7dd] group-hover:text-white transition-colors leading-tight">
                  {ev.title}
                </h3>
                <p className="font-book text-sm text-[#8d887e] leading-relaxed">
                  {ev.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8d887e] block">
                    Featured Speakers:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ev.speakers.map((sp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-xs text-[#ece7dd]"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="font-display italic text-xs text-[#c9a27a]/90 pt-1">
                  Note: {ev.curatorNote}
                </p>
              </div>

              {/* Pricing & Booking Right */}
              <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end h-full space-y-6 lg:text-right border-t lg:border-t-0 border-white/10 pt-6 lg:pt-0">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#8d887e] block">Admission</span>
                  <p className="font-mono text-sm text-[#ece7dd] font-semibold">{ev.price}</p>
                  <span className="font-mono text-[11px] text-[#c9a27a] block">
                    {ev.availableTickets} tickets remaining
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(ev)}
                  className="pill-btn cursor-pointer py-2.5 px-6 text-xs w-full sm:w-auto justify-center"
                >
                  <span>Reserve Seat &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Reservation Ticket Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060606]/90 backdrop-blur-xl animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-[#0f0e0d] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl text-[#ece7dd] space-y-6">
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {bookedSuccess ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <span className="w-12 h-12 rounded-full border border-[#c9a27a] text-[#c9a27a] inline-flex items-center justify-center text-xl mx-auto">
                  ✓
                </span>
                <h3 className="font-display italic text-3xl text-[#ece7dd]">Seat Reserved</h3>
                <p className="font-mono text-xs text-[#8d887e] max-w-xs mx-auto">
                  Your admission for {selectedEvent.title} has been confirmed. Entry card dispatched.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookTicket} className="space-y-5">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[#c9a27a] uppercase tracking-widest">
                    Reservation Ticket
                  </span>
                  <h3 className="font-display italic text-2xl text-[#ece7dd]">{selectedEvent.title}</h3>
                  <p className="font-mono text-xs text-[#8d887e]">
                    {selectedEvent.date} &middot; {selectedEvent.time} &middot; {selectedEvent.venue}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8d887e] mb-1">
                      Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-[#ece7dd] focus:outline-hidden focus:border-[#c9a27a]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8d887e] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="guest@domain.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-[#ece7dd] focus:outline-hidden focus:border-[#c9a27a]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8d887e] mb-1">
                      Number of Seats
                    </label>
                    <select className="w-full bg-[#181615] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-[#ece7dd] focus:outline-hidden focus:border-[#c9a27a]">
                      <option value="1">1 Seat ({selectedEvent.price})</option>
                      <option value="2">2 Seats</option>
                      <option value="4">4 Seats (Patron Group)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full pill-btn justify-center py-3 text-xs tracking-wider cursor-pointer"
                >
                  Confirm Reservation &rarr;
                </button>
              </form>
            )}
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

