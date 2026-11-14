"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";
import BirdsBackground from "@/components/BirdsBackground";
import MagneticButton from "@/components/MagneticButton";
import Nav from "@/components/Nav";
import VoicePanel from "@/components/VoicePanel";
import Headline from "@/components/Headline";
import LikhariMark from "@/components/LikhariMark";
import { REPO } from "@/lib/site";
import { SectionHeading, Features, HowItWorks, Pricing, Faq } from "@/components/Sections";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen overflow-x-clip bg-transparent text-[var(--fg)]">
      <Nav />

      {/* Hero — the birds own this section; everything above sits at z-10. */}
      <section className="relative min-h-screen overflow-hidden px-5 pt-32 pb-12">
        <BirdsBackground
          quantity={3}
          birdSize={1.6}
          speedLimit={2}
          wingSpan={16}
          separation={40}
          keyboardControls
        />
        <div className="pointer-events-none absolute inset-0 hero-wash" />
        <div className="pointer-events-none absolute inset-0 hero-tint" />
        <div className="noise-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:items-start lg:pt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 lg:pt-16"
          >
            <Headline />

            <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-[var(--fg-muted)]">
              Likhari <span className="text-[var(--fg-dim)]">(writer)</span> turns your voice
              into clean, formatted writing, in any app on your machine. Hold a key, say what
              you mean, let go. No tab switching. No cleanup.
            </p>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <MagneticButton href={REPO}>
                <Mic className="h-5 w-5" />
                <span className="tracking-widest">Download Free</span>
                <ArrowRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </MagneticButton>
              <a
                href="#how"
                className="inline-flex h-16 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-8 text-sm font-semibold text-[var(--fg-muted)] transition-all hover:border-white/25 hover:text-[var(--fg)]"
              >
                How it works
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <VoicePanel />
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative border-t border-[var(--border)] px-5 py-28">
        <SectionHeading
          eyebrow="Features"
          title="Built for people who"
          accent="think out loud"
          sub="Everything you need to get words down at the speed you talk, and nothing you don't."
        />
        <div className="mx-auto max-w-7xl">
          <Features />
        </div>
      </section>

      <section id="how" className="relative border-t border-[var(--border)] px-5 py-28">
        <SectionHeading
          eyebrow="How it works"
          title="Three seconds to"
          accent="clean text"
          sub="No setup, no training, no dashboard to learn."
        />
        <div className="mx-auto max-w-6xl">
          <HowItWorks />
        </div>
      </section>

      <section id="pricing" className="relative border-t border-[var(--border)] px-5 py-28">
        <SectionHeading
          eyebrow="Pricing"
          title="Free. Actually"
          accent="free"
          sub="No trial, no credit card, no usage meter running in the background."
        />
        <div className="mx-auto max-w-7xl">
          <Pricing />
        </div>
      </section>

      <section id="faq" className="relative border-t border-[var(--border)] px-5 py-28">
        <SectionHeading eyebrow="Resources" title="Got" accent="questions?" />
        <Faq />
      </section>

      <section id="download" className="relative overflow-hidden border-t border-[var(--border)] px-5 py-32">
        <div className="pointer-events-none absolute inset-0 hero-tint" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            From talking{" "}
            <span className="luxury-script whitespace-nowrap text-[var(--accent)]">to written</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg font-light text-[var(--fg-muted)]">
            Join the people who stopped typing their first drafts.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href={REPO}>
              <Mic className="h-5 w-5" />
              <span className="tracking-widest">Download Likhari</span>
              <ArrowRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[var(--fg-dim)] sm:flex-row">
          <span className="flex items-center gap-2.5 font-black tracking-tight text-[var(--fg-muted)]">
            <LikhariMark className="h-5 w-5 text-[var(--fg-muted)]" />
            <span>
              Likh<span className="text-[var(--accent)]">ari</span>
            </span>
            <span className="font-normal text-[var(--fg-dim)]">|</span>
            <span lang="ur" dir="rtl" className="urdu text-[15px] font-normal">
              لکھاری
            </span>
            <span className="font-normal text-[var(--fg-dim)]">|</span>
            <span lang="hi" className="hindi text-[14px] font-normal">
              लिखारी
            </span>
          </span>
          <span>© {new Date().getFullYear()} Likhari. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
