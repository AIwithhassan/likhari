"use client";

import { useEffect, useState } from "react";
import { Type, Check } from "lucide-react";

export const FONTS = [
  { id: "original", label: "Original", note: "Geist + Pinyon Script" },
  { id: "editorial", label: "Editorial", note: "Instrument Sans + Serif italic" },
  { id: "literary", label: "Literary", note: "Fraunces + Playfair italic" },
  { id: "handwritten", label: "Handwritten", note: "Bricolage + Caveat" },
  { id: "modern", label: "Modern", note: "Sora + Gloock" },
  { id: "grotesque", label: "Grotesque", note: "Bricolage + Instrument italic" },
] as const;

export default function FontSwitcher() {
  const [font, setFont] = useState("original");
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFont(document.documentElement.getAttribute("data-font") || "original");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.setAttribute("data-font", font);
    try {
      localStorage.setItem("likhari-font", font);
    } catch {
      // Private mode: the choice simply will not persist.
    }
  }, [font, ready]);

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change font"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
      >
        <Type className="h-4 w-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-20 w-60 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-2 backdrop-blur-xl">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFont(f.id);
                  setOpen(false);
                }}
                className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[var(--bg-elev-hover)]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[var(--fg)]">{f.label}</span>
                  <span className="block text-[11px] text-[var(--fg-dim)]">{f.note}</span>
                </span>
                {font === f.id && (
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
