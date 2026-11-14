"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Palette, Check } from "lucide-react";

type Theme = "dark" | "light";

export const PALETTES = [
  { id: "lime", label: "Lime", dot: "#d6ff00" },
  { id: "cyan", label: "Cyan", dot: "#22d3ee" },
  { id: "violet", label: "Violet", dot: "#a78bfa" },
  { id: "amber", label: "Amber", dot: "#fbbf24" },
  { id: "rose", label: "Rose", dot: "#fb7185" },
] as const;

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [palette, setPalette] = useState<string>("lime");
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Adopt whatever the pre-paint script already put on <html>.
  useEffect(() => {
    const root = document.documentElement;
    setTheme((root.getAttribute("data-theme") as Theme) || "dark");
    setPalette(root.getAttribute("data-palette") || "lime");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-palette", palette);
    try {
      localStorage.setItem("likhari-theme", theme);
      localStorage.setItem("likhari-palette", palette);
    } catch {
      // Private mode: the choice simply will not persist.
    }
  }, [theme, palette, ready]);

  return (
    <div className="relative flex items-center gap-1">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change accent color"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="popover-surface absolute right-0 top-11 z-20 w-40 rounded-2xl border border-[var(--border)] p-2">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPalette(p.id);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-elev-hover)] hover:text-[var(--fg)]"
              >
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full"
                  style={{ background: p.dot }}
                />
                {p.label}
                {palette === p.id && <Check className="ml-auto h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
