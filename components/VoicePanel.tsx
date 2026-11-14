"use client";

import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";

const TAKES = [
  {
    raw: "um so basically i wanted to say that the uh the deploy went out friday and we should probably like tell the team about it",
    clean: "The deploy went out Friday. We should let the team know.",
  },
  {
    raw: "hey can you uh send me that doc from last week the one about the pricing thing i think sarah made it",
    clean: "Could you send me last week's pricing doc? I believe Sarah made it.",
  },
  {
    raw: "i think we should uh maybe push the launch to next month because the the testing isnt done yet you know",
    clean: "I think we should push the launch to next month. Testing isn't done yet.",
  },
  {
    raw: "so the bug happens when you click submit twice really fast and then it like duplicates the order somehow",
    clean: "The bug occurs when Submit is clicked twice quickly, which duplicates the order.",
  },
  {
    raw: "thanks so much for the review i'll uh get those changes in by end of day tomorrow at the latest",
    clean: "Thanks for the review. I'll have those changes in by end of day tomorrow.",
  },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function VoicePanel() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"raw" | "thinking" | "clean">("raw");
  const [text, setText] = useState("");
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    const type = async (full: string, step: number, delay: number) => {
      for (let i = 0; i <= full.length; i += step) {
        if (cancelled.current) return;
        setText(full.slice(0, i));
        await wait(delay);
      }
      setText(full);
    };

    (async () => {
      const take = TAKES[idx];
      setPhase("raw");
      setText("");
      await wait(300);
      await type(take.raw, 1, 20);
      await wait(600);
      if (cancelled.current) return;
      setPhase("thinking");
      await wait(700);
      if (cancelled.current) return;
      setPhase("clean");
      setText("");
      await type(take.clean, 2, 16);
      await wait(2200);
      if (!cancelled.current) setIdx((v) => (v + 1) % TAKES.length);
    })();

    return () => {
      cancelled.current = true;
    };
  }, [idx]);

  const isClean = phase === "clean";

  return (
    <div className="relative rounded-3xl border border-[var(--border)] panel-shell p-1 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-sm">
      <div className="rounded-[20px] bg-[var(--panel)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="rounded-full bg-[var(--accent)]/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
            Live dictation
          </span>
        </div>

        <div className="flex items-center justify-between px-5 py-3">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--fg-dim)]">
            <Mic className="h-3.5 w-3.5 text-[var(--accent)]" />
            Likhari
          </span>
          <div className="flex gap-1.5">
            <span
              className={`rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-colors ${
                !isClean ? "bg-white/15 text-[var(--fg)]" : "text-[var(--fg-dim)]"
              }`}
            >
              Spoken
            </span>
            <span
              className={`rounded-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-colors ${
                isClean ? "bg-[var(--accent)] text-black" : "text-[var(--fg-dim)]"
              }`}
            >
              Written
            </span>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="min-h-[148px] rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 sm:min-h-[130px]">
            {phase === "thinking" ? (
              <div className="flex h-full min-h-[90px] items-center justify-center gap-3 text-[var(--fg-dim)]">
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-bounce rounded-full bg-[var(--accent)]"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider">Cleaning up</span>
              </div>
            ) : (
              <p
                className={`font-mono text-[14px] leading-relaxed transition-colors ${
                  isClean ? "text-[var(--accent)]" : "text-[var(--fg-dim)]"
                }`}
              >
                {text}
                <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-[var(--accent)]" />
              </p>
            )}
          </div>

          {/* waveform */}
          <div className="mt-4 flex items-end justify-center gap-[3px]">
            {Array.from({ length: 34 }).map((_, i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full transition-all duration-300 ${
                  isClean ? "bg-white/10" : "wave-bar bg-[var(--accent)]/70"
                }`}
                style={{
                  // Rounded so the server and client render byte-identical strings.
                  height: `${Math.round(8 + Math.abs(Math.sin(i * 0.9)) * 22)}px`,
                  animationDelay: `${(i * 45)}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
