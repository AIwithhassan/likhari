"use client";

import { useEffect, useState } from "react";
import { Menu, X, Mic } from "lucide-react";
import { REPO } from "@/lib/site";
import LikhariMark from "./LikhariMark";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    mq.addEventListener("change", onChange);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <div className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-5 sm:pt-5">
        <div
          className={`mx-auto max-w-7xl rounded-2xl border border-[var(--border)] px-3 py-2 transition-all duration-300 lg:rounded-none lg:border-0 lg:p-0 ${
            open || scrolled ? "nav-mobile-shell-open" : "nav-mobile-shell"
          }`}
        >
          <nav className="flex items-center justify-between gap-3 sm:gap-4">
            <a
              href="#top"
              onClick={() => setOpen(false)}
              className={`flex min-w-0 items-center gap-2.5 pl-1 transition-all duration-300 sm:gap-3 ${
                scrolled
                  ? "lg:rounded-[20px] lg:border lg:border-[var(--border)] lg:px-3.5 lg:py-1.5 lg:backdrop-blur-xl nav-pill-scrolled"
                  : ""
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--logo-bg)] text-[var(--logo-fg)] sm:h-10 sm:w-10">
                <LikhariMark className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px]" />
              </span>
              <span className="flex items-baseline gap-1.5 whitespace-nowrap text-[15px] font-black tracking-tight sm:gap-2.5 sm:text-[17px]">
                <span>
                  Likh<span className="text-[var(--accent)]">ari</span>
                </span>
                <span className="font-normal text-[var(--fg-dim)]">|</span>
                <span lang="ur" dir="rtl" className="urdu text-[15px] font-normal text-[var(--fg-muted)] sm:text-[17px]">
                  لکھاری
                </span>
                <span className="font-normal text-[var(--fg-dim)]">|</span>
                <span lang="hi" className="hindi text-[14px] font-normal text-[var(--fg-muted)] sm:text-[16px]">
                  लिखारी
                </span>
              </span>
            </a>

            <div
              className={`hidden items-center gap-1 rounded-[22px] border px-3 py-2.5 transition-all duration-300 lg:flex ${
                scrolled
                  ? "border-[var(--border)] nav-pill-scrolled backdrop-blur-xl"
                  : "border-[var(--border)] nav-pill backdrop-blur-md"
              }`}
            >
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative overflow-hidden rounded-xl px-4 py-2.5 text-[14px] font-medium text-[var(--fg-muted)] transition-all duration-300 hover:text-[var(--fg)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-[#ffe600]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative">{l.label}</span>
                </a>
              ))}
              <span className="mx-2 h-6 w-px bg-[var(--border)]" />
              <ThemeToggle />
              <span className="mx-2 h-6 w-px bg-[var(--border)]" />
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta group relative flex h-[48px] items-center gap-3 overflow-hidden rounded-[14px] px-6 text-[14px] font-bold ring-1 ring-[var(--border)] transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Mic className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Download Free</span>
              </a>
            </div>

            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <span className="hidden items-center gap-2 sm:flex">
                <ThemeToggle />
              </span>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] text-[var(--fg)] transition-colors hover:bg-[var(--bg-elev-hover)]"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {open && (
            <div className="mt-2.5 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain border-t border-[var(--border)] pt-3 pb-1.5 lg:hidden">
              <div className="flex flex-col gap-1">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3.5 py-3 text-[15px] font-medium text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-elev-hover)] hover:text-[var(--fg)]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-[var(--border)] px-3.5 pt-3 pb-1 sm:hidden">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-dim)]">
                  Appearance
                </span>
                <ThemeToggle />
              </div>

              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[var(--accent)] px-4 text-[15px] font-bold text-[var(--on-accent)] transition-transform active:scale-[0.99]"
              >
                <Mic className="h-4 w-4" />
                <span>Download Free</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
