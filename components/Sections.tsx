"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ChevronDown, Mic, Zap, Wand2, Globe, Brain, Gauge } from "lucide-react";
import { REPO } from "@/lib/site";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)]">{eyebrow}</span>
      <h2 className="mt-5 text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="luxury-script whitespace-nowrap text-[1.1em] font-normal lowercase text-[var(--accent)]">
              {accent}
            </span>
          </>
        )}
      </h2>
      {sub && <p className="mt-6 text-lg font-light leading-relaxed text-[var(--fg-muted)]">{sub}</p>}
    </div>
  );
}

const FEATURES = [
  { icon: Mic, title: "Speak Anywhere", body: "Hold one key and talk. Likhari types into any app on your machine, with no window to switch to." },
  { icon: Wand2, title: "Cleaned As You Speak", body: "Filler words, stumbles and false starts disappear. What lands is what you meant to say." },
  { icon: Zap, title: "Faster Than Typing", body: "Speak at 150 words a minute and watch it land as formatted text, instantly." },
  { icon: Globe, title: "Works Everywhere", body: "Slack, Gmail, VS Code, Notion, your terminal. Anywhere with a cursor." },
  { icon: Brain, title: "Knows Your Words", body: "Names, jargon and acronyms you use get learned, so they come out spelled right." },
  { icon: Gauge, title: "Private By Default", body: "Nothing is stored after it is transcribed. Your voice stays yours." },
];

export function Features() {
  return (
    <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-b from-white/[0.06] to-transparent p-8 transition-all duration-700 hover:bg-[var(--bg-elev-hover)]"
        >
          <div className="premium-card-border" />
          <div className="glass-sheen" />
          <div className="agency-grain" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(214,255,0,0.08),transparent_70%)]" />
          <div className="relative">
            <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-black">
              <f.icon className="h-5 w-5 text-[var(--accent)]" />
            </span>
            <span className="font-mono text-xs text-[var(--fg-dim)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-xl font-bold">{f.title}</h3>
            <p className="mt-3 text-[15px] font-light leading-relaxed text-[var(--fg-muted)]">{f.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const STEPS = [
  { n: "01", t: "Hold the key", d: "Press and hold your hotkey from any app. A quiet indicator tells you Likhari is listening." },
  { n: "02", t: "Say it out loud", d: "Talk the way you normally would. Ramble, restart, think out loud. It keeps up." },
  { n: "03", t: "Let go", d: "Release the key and clean, punctuated text lands exactly where your cursor was." },
];

export function HowItWorks() {
  return (
    <div className="mt-20 grid gap-5 md:grid-cols-3">
      {STEPS.map((s, i) => (
        <motion.div
          key={s.n}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-elev)] p-8 transition-all duration-700 hover:bg-[var(--bg-elev-hover)]"
        >
          <div className="premium-card-border" />
          <div className="glass-sheen" />
          <div className="agency-grain" />
          <span className="relative luxury-script text-5xl text-[var(--accent)]">{s.n}</span>
          <h3 className="relative mt-4 text-xl font-bold">{s.t}</h3>
          <p className="relative mt-3 text-[15px] font-light leading-relaxed text-[var(--fg-muted)]">{s.d}</p>
        </motion.div>
      ))}
    </div>
  );
}

const PLANS = [
  {
    name: "Free",
    price: "$0",
    note: "forever",
    desc: "Everything you need to stop typing.",
    features: [
      "Unlimited dictation",
      "Works in every app",
      "Auto punctuation & formatting",
      "Custom vocabulary",
    ],
    cta: "Download Free",
    badge: null,
  },
  {
    name: "Pro",
    price: "$0",
    note: "also forever",
    desc: "For people who want the word \u201cPro\u201d next to their name.",
    features: [
      "Everything in Free",
      "The Pro badge (cosmetic)",
      "Same unlimited dictation",
      "Bragging rights",
    ],
    cta: "Download Free",
    featured: true,
    badge: "100% free",
  },
  {
    name: "Ultra",
    price: "$0",
    note: "you guessed it",
    desc: "Maximum tier. Identical features. Zero dollars.",
    features: [
      "Everything in Pro",
      "An even better badge",
      "Still unlimited, still free",
      "Our eternal gratitude",
    ],
    cta: "Download Free",
    badge: null,
  },
];

export function Pricing() {
  return (
    <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PLANS.map((p) => (
        <div
          key={p.name}
          className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-700 md:last:col-span-2 md:last:mx-auto md:last:w-[calc(50%-0.75rem)] lg:last:col-span-1 lg:last:w-auto ${
            p.featured
              ? "border-[var(--accent)]/40 bg-gradient-to-b from-[var(--accent)]/[0.08] to-transparent"
              : "border-[var(--border)] bg-[var(--bg-elev)]"
          }`}
        >
          <div className="premium-card-border" />
          <div className="glass-sheen" />
          <div className="agency-grain" />

          {p.badge && (
            <span className="relative mb-4 inline-flex rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-black">
              {p.badge}
            </span>
          )}
          <h3 className="relative text-lg font-bold">{p.name}</h3>
          <p className="relative mt-2 text-sm font-light text-[var(--fg-muted)]">{p.desc}</p>
          <p className="relative mt-6 flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tight">{p.price}</span>
            <span className="text-sm font-light text-[var(--fg-dim)]">{p.note}</span>
          </p>
          <ul className="relative mt-8 space-y-3">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] text-[var(--fg-muted)]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative mt-8 flex h-12 items-center justify-center rounded-xl text-sm font-bold transition-all ${
              p.featured
                ? "bg-[var(--accent)] text-black hover:bg-[#e6ff4d]"
                : "border border-white/15 text-[var(--fg)] hover:bg-[var(--bg-elev)]"
            }`}
          >
            {p.cta}
          </a>
        </div>
      ))}
    </div>
  );
}

const FAQS = [
  { q: "Is Likhari really free?", a: "Yes. Unlimited dictation, every feature, no card. A paid team tier is coming later, but the app you use stays free." },
  { q: "Does my voice get stored anywhere?", a: "No. Audio is transcribed and discarded immediately. It is never written to disk or kept on a server." },
  { q: "Which apps does it work in?", a: "All of them. Likhari types at your cursor, so anywhere you can type works: Slack, Gmail, Notion, VS Code, your terminal." },
  { q: "What languages are supported?", a: "Over 30 languages out of the box, and it handles switching mid-sentence without being told." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-20 max-w-3xl space-y-3">
      {FAQS.map((f, i) => (
        <div key={f.q} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-semibold transition-colors hover:text-[var(--accent)]"
          >
            {f.q}
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[var(--fg-dim)] transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <p className="px-6 pb-6 text-[15px] font-light leading-relaxed text-[var(--fg-muted)]">{f.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
