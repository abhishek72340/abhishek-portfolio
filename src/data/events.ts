export interface PressEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  city: string;
  venue: string;
  address: string;
  speakers: string[];
  category: "Reading" | "Discussion" | "Salon" | "Workshop" | "Launch";
  capacity: number;
  availableTickets: number;
  price: string;
  description: string;
  curatorNote: string;
}

export const PRESS_EVENTS: PressEvent[] = [
  {
    id: "autumn-list-gala",
    title: "The Autumn 32 Salon & List Reading",
    date: "14 November 2026",
    time: "19:00 — 22:30 GMT",
    city: "London",
    venue: "The London Library, Reading Room",
    address: "14 St James's Square, London SW1Y 4LG",
    speakers: ["Hugo Varga", "Aria Vance", "Theo Lin", "Elin Berg"],
    category: "Salon",
    capacity: 120,
    availableTickets: 18,
    price: "£25.00 (Includes Autumn hardback)",
    description: "An evening of readings, wine, and discussion marking the release of the complete Margin Press Autumn 2026 catalogue. Accompanied by live string chamber music.",
    curatorNote: "The central reading table will showcase all 32 original hand-bound proof editions under soft library lamps.",
  },
  {
    id: "nocturnal-cartographies",
    title: "Nocturnal Cartographies: In Conversation with Aria Vance",
    date: "21 November 2026",
    time: "18:30 — 20:30 EST",
    city: "New York",
    venue: "New York Public Library, Bartos Forum",
    address: "476 5th Ave, New York, NY 10018",
    speakers: ["Aria Vance", "Ezra Cole", "Moderated by Hilton Als"],
    category: "Discussion",
    capacity: 180,
    availableTickets: 34,
    price: "$20.00",
    description: "A deep dive into night astronomy, navigational folklore, and the writing of Night Cartography, exploring how maps function as psychological memoirs.",
    curatorNote: "Rare 18th-century nautical sea charts from the NYPL map division will be on display exclusively for attendees.",
  },
  {
    id: "paris-letterpress-atelier",
    title: "The Small Press Atelier: Typesetting & Letterpress Workshop",
    date: "04 December 2026",
    time: "10:00 — 17:00 CET",
    city: "Paris",
    venue: "Atelier Margin, Saint-Germain",
    address: "24 Rue de Beaune, 75007 Paris",
    speakers: ["Arthur Pendelton (Master Printer)", "Mara Kell"],
    category: "Workshop",
    capacity: 16,
    availableTickets: 4,
    price: "€85.00 (Includes personal typeset keepsake)",
    description: "Hands-on masterclass in movable lead type, ink mixing, proofing on a 1954 Heidelberg platen press, and binding a 16-page limited edition chapbook.",
    curatorNote: "Strictly limited to 16 participants to ensure individual press time.",
  },
  {
    id: "stockholm-wintering",
    title: "Wintering: Solitude and the Archipelago with Elin Berg",
    date: "12 December 2026",
    time: "19:00 — 21:00 CET",
    city: "Stockholm",
    venue: "Kulturhuset Stadsteatern",
    address: "Sergels torg, 111 57 Stockholm",
    speakers: ["Elin Berg", "Sarah Death (Translator)"],
    category: "Reading",
    capacity: 90,
    availableTickets: 22,
    price: "180 SEK",
    description: "A bilingual reading from Wintering alongside Swedish folk instrumentation. Discussion on translating stillness and the cold into English syntax.",
    curatorNote: "Mulled spiced cloudberry cider served at the reception.",
  },
  {
    id: "midnight-bloomsbury-salon",
    title: "The Midnight Bookshop & String Quartet",
    date: "31 December 2026",
    time: "22:00 — 01:30 GMT",
    city: "London",
    venue: "Margin Press Bookshop & Cellar",
    address: "42 Great Russell Street, London WC1B 3PE",
    speakers: ["Rosa Quinn", "Sol Navarro", "Ensemble Margin"],
    category: "Launch",
    capacity: 60,
    availableTickets: 8,
    price: "£35.00 (Includes midnight champagne)",
    description: "Ring in the new year surrounded by shelves of first editions. Late-night browsing by candle and oil lamp light, live poetry readings, and chamber cello.",
    curatorNote: "Our downstairs cellar archive of rare out-of-print titles will be open for the first time this year.",
  }
];

