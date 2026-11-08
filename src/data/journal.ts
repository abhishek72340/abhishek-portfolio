export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: "Editorial" | "Interview" | "Typography" | "Translation" | "Craft";
  excerpt: string;
  content: string[];
  pullQuote?: string;
  relatedBookId?: number;
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "geometry-of-autumn",
    title: "On the Geometry of Autumn: Why 32 Books Form a Single Constellation",
    subtitle: "Notes on sequence, spine colors, and the tactile rhythm of an independent catalogue.",
    author: "Hugo Varga",
    authorRole: "Author of The Last Light Hotel",
    date: "28 October 2026",
    readTime: "7 min read",
    category: "Editorial",
    excerpt: "When you place thirty-two books along one shelf, you are not merely arranging inventory; you are constructing an optical horizon where each spine answers its neighbor.",
    content: [
      "When we began assembling this autumn’s list at Margin Press, the brief was disarmingly simple: thirty-two titles that could exist in no other season, arranged in a continuum where no two adjacent bindings clash in temperature.",
      "The spine colours were mixed in small batches. A muted slate for Aria Vance’s Night Cartography; a burnt terracotta for Theo Lin’s Afterglow; an almost ecclesiastical black for Ezra Cole’s Monolith. Taken together, they form a spectral chord across the eye.",
      "A bookstore shelf is not a static object. As you approach it, it shifts in parallax; the light from the tall Georgian windows of our Bloomsbury room catches the blind debossing on each cloth casing. We wanted that same kinetic breath in the digital rendering.",
      "To hold a physical volume is to accept the discipline of the margin. The white space around the prose is not empty; it is the silence into which the author’s voice speaks. Without generous margins, fiction suffocates under its own ink."
    ],
    pullQuote: "The white space around the prose is not empty; it is the silence into which the author’s voice speaks.",
    relatedBookId: 9,
  },
  {
    slug: "setting-type-in-the-digital-age",
    title: "Setting Type in the Digital Age: The Anatomy of Newsreader and Instrument Serif",
    subtitle: "How 16th-century punch-cutting traditions inform our dual-screen reader typography.",
    author: "Margin Editorial Board",
    authorRole: "Bloomsbury Press Room",
    date: "14 October 2026",
    readTime: "9 min read",
    category: "Typography",
    excerpt: "Why we abandoned default system typography in favor of hand-tuned optical sizes, ligatures, and genuine drop caps that breathe on high-density displays.",
    content: [
      "Most digital reading experiences treat type as an interchangeable pixel stream. A paragraph is reflowed without regard for rivering, widows, or the mathematical optical balance between x-height and line measure.",
      "At Margin Press, our reader layer was built around two typographic anchors: Instrument Serif, cut with the sharp, sculptural drama of late eighteenth-century Didone punch-cutting, and Newsreader, designed specifically for prolonged literary absorption.",
      "When an opening chapter spread is typeset, our measuring script evaluates word spacing down to half-pixel tolerances. The decorative initial capital letter is dropped precisely two and a half lines deep, floating in calibrated proportion to the running head.",
      "The result is a handover that feels physical: you turn the digital page with the same optical weight and friction as heavy Japanese unbleached paper."
    ],
    pullQuote: "When an opening spread is typeset, the initial capital letter is dropped precisely two and a half lines deep, floating in calibrated proportion to the running head.",
  },
  {
    slug: "translating-winter",
    title: "Translating Winter: Between Swedish Fog and English Syntax",
    subtitle: "Sarah Death in conversation with Elin Berg on the silent vocabulary of the archipelago.",
    author: "Sarah Death & Elin Berg",
    authorRole: "Translator and Author of Wintering",
    date: "02 October 2026",
    readTime: "11 min read",
    category: "Translation",
    excerpt: "Swedish has seven words for the specific consistency of crust formed over sea-ice at dusk. English has none of them, so we had to invent them through rhythm.",
    content: [
      "In Wintering, the protagonist spends six months on a storm-lashed island without speaking aloud. The silence of the island becomes a palpable presence on the page.",
      "Sarah: 'The hardest challenge in translating Elin's prose was that Swedish compound nouns allow an astonishing economy. A word like skärgårdsvinter packs wind, salinity, and island geometry into five syllables. In English, we had to let the syntax breathe to carry the same atmospheric pressure.'",
      "Elin: 'When I write, I listen for the cold. The prose must feel dry and brittle, like birch firewood stacked under frozen eaves. The English edition captures that temperature perfectly.'",
      "Margin Press published the dual-language edition with Swedish facing pages on the left and English on the right, mirroring the island's dual life."
    ],
    pullQuote: "The prose must feel dry and brittle, like birch firewood stacked under frozen eaves.",
    relatedBookId: 15,
  },
  {
    slug: "architecture-of-silence",
    title: "The Architecture of Silence: An Interview with Ivy Marsh",
    subtitle: "On non-functional clockwork, kinetic horology, and writing fiction without clocks.",
    author: "Elena Rostova",
    authorRole: "Literary Critic, Zurich",
    date: "22 September 2026",
    readTime: "6 min read",
    category: "Interview",
    excerpt: "In her Zurich atelier, Ivy Marsh builds brass clockwork mechanisms that tick, turn, and counter-balance—yet possess neither hands nor dials.",
    content: [
      "To visit Ivy Marsh's workshop above the Limmat is to enter an acoustic chamber of ticking brass gears that measure nothing whatsoever.",
      "'My grandfather was a master horologist,' she explains, dusting a minuscule escapement wheel. 'He believed the obsession with punctuality ruined human perception. So he started making machines that purely consumed friction.'",
      "Her new book, The Quiet Engine, chronicles this philosophy through three generations of watchmakers who retreated into the Jura mountains.",
      "Every chapter begins with a schematic of a gear train that does not transmit power, setting an uncanny, hypnotic cadence for the novel."
    ],
    pullQuote: "My grandfather believed the obsession with punctuality ruined human perception. So he started making machines that purely consumed friction.",
    relatedBookId: 6,
  },
  {
    slug: "paper-weights-and-ink-densities",
    title: "Paper Weights and Ink Densities: Notes from Our Heidelberg Letterpress",
    subtitle: "A photographic and mechanical dispatch from our print run in Suffolk.",
    author: "Arthur Pendelton",
    authorRole: "Master Printer, Margin Press",
    date: "09 September 2026",
    readTime: "8 min read",
    category: "Craft",
    excerpt: "Why our hardcovers use 130gsm Munken Pure paper, vegetable-based carbon inks, and real cotton headbands sewn by hand in small craft workshops.",
    content: [
      "Modern mass-market books are printed on paper loaded with groundwood pulp and bleach that will yellow and disintegrate within forty years. Margin Press books are built for century-long shelf life.",
      "We print our autumn run on Munken Pure unbleached Swedish paper—creamy, tactile, and completely acid-free. The ink is a bespoke dense carbon formulation that embeds deep into the cotton fibers without bleeding through.",
      "The bindings are Smyth sewn with linen thread, allowing the spine to lie completely flat on a table without fracturing. It is the same structure used by Aldus Manutius in Venice five centuries ago.",
      "When you open a Margin Press edition, the scent of linseed oil and cotton pulp is immediate. It is an artifact, not disposable media."
    ],
    pullQuote: "The bindings are Smyth sewn with linen thread, allowing the spine to lie completely flat on a table without fracturing.",
  }
];

