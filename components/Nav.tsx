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

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-5 pt-5">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 pl-1">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--logo-bg)] text-[var(--logo-fg)]">
              <LikhariMark className="h-[30px] w-[30px]" />
            </span>
            <span className="flex items-baseline gap-2.5 text-[17px] font-black tracking-tight">
              <span>
                Likh<span className="text-[var(--accent)]">ari</span>
              </span>
              <span className="font-normal text-[var(--fg-dim)]">|</span>
              <span lang="ur" dir="rtl" className="urdu text-[17px] font-normal text-[var(--fg-muted)]">
                لکھاری
              </span>
              <span className="font-normal text-[var(--fg-dim)]">|</span>
              <span lang="hi" className="hindi text-[16px] font-normal text-[var(--fg-muted)]">
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

          <span className="hidden items-center gap-2 sm:flex lg:hidden">
            <ThemeToggle />
          </span>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] text-[var(--fg)] transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="border-t border-[var(--border)] px-5 py-4 lg:hidden">
            <div className="flex items-center gap-2 pb-3 sm:hidden">
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] font-medium text-[var(--fg-muted)] hover:bg-[var(--bg-elev)] hover:text-[var(--fg)]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-[15px] font-bold text-[var(--on-accent)]"
              >
                Download Free
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
