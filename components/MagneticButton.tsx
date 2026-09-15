"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({
  href,
  children,
  className = "hero-primary-btn",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.3 });

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.18);
        ref.current?.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`);
        ref.current?.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex h-16 items-center justify-center gap-4 overflow-hidden rounded-full px-10 text-sm transition-all duration-300 ${className}`}
    >
      {className === "hero-primary-btn" && <div className="hero-primary-glow" />}
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.a>
  );
}
