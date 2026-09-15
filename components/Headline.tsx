"use client";

import { motion } from "framer-motion";

export default function Headline() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-8 max-w-2xl text-5xl font-normal leading-[1.05] tracking-tight text-[var(--fg)] sm:text-6xl lg:max-w-4xl lg:text-7xl"
    >
      Mirza Ghalib&apos;s
      <span className="block pt-2 sm:pt-3">
        <span className="luxury-script font-normal text-[var(--accent)] sm:whitespace-nowrap sm:text-6xl lg:text-[1.1em]">
          favourite <span className="acronym">AI</span> tool
        </span>
      </span>
    </motion.h1>
  );
}
