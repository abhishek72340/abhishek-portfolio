interface FooterProps {
  onOpenInspector: () => void;
}

export default function Footer({ onOpenInspector }: FooterProps) {
  return (
    <footer className="border-t border-black/10 bg-white py-16 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#202A36] text-xs font-bold tracking-widest text-white dark:bg-white dark:text-zinc-950">
              SE
            </span>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              SkyElite
            </span>
            <span className="ml-2 rounded-full border border-black/10 px-2.5 py-0.5 text-[11px] font-medium text-gray-500 dark:border-white/10 dark:text-zinc-400">
              Private Aviation
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-zinc-400">
            <a href="#start" className="hover:text-black dark:hover:text-white">Start</a>
            <a href="#story" className="hover:text-black dark:hover:text-white">Story</a>
            <a href="#rates" className="hover:text-black dark:hover:text-white">Rates</a>
            <a href="#benefits" className="hover:text-black dark:hover:text-white">Benefits</a>
            <a href="#faq" className="hover:text-black dark:hover:text-white">FAQ</a>
            <button
              onClick={onOpenInspector}
              className="text-amber-700 hover:underline dark:text-amber-400"
            >
              Prompt Margin Blueprint
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-8 text-xs text-gray-500 sm:flex-row dark:border-white/5 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} SkyElite Aviation Systems Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Inspired by the{" "}
            <a
              href="https://thinkingods.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-900 underline hover:text-black dark:text-white"
            >
              Thinking Gods
            </a>{" "}
            Prompt Margin design architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}
