"use client";

import { useEffect, useRef, useState } from "react";

type VantaEffect = {
  destroy: () => void;
  /** Vanta keeps the pointer in centered units (-0.5 -> 0.5) and repulses boids from it. */
  triggerMouseMove?: (x: number, y: number) => void;
  mouseX?: number;
  mouseY?: number;
  resize?: () => void;
};

type Props = {
  quantity?: number;
  birdSize?: number;
  speedLimit?: number;
  wingSpan?: number;
  separation?: number;
  alignment?: number;
  cohesion?: number;
  color1?: number;
  color2?: number;
  backgroundColor?: number;
  opacity?: number;
  /** Enable arrow-key steering of the flock. */
  keyboardControls?: boolean;
  className?: string;
};

/** Cached module promise so THREE/Vanta are only ever fetched once. */
let vantaLoader: Promise<((opts: Record<string, unknown>) => VantaEffect) | null> | null = null;

function loadVanta() {
  if (!vantaLoader) {
    vantaLoader = (async () => {
      const THREE = await import("three");
      // Vanta reads THREE off the window when it is not passed a build it recognizes.
      (window as unknown as { THREE: unknown }).THREE = THREE;
      const mod = await import("vanta/dist/vanta.birds.min.js");
      return (mod as { default?: (o: Record<string, unknown>) => VantaEffect }).default ?? null;
    })().catch(() => null);
  }
  return vantaLoader;
}

/** Bird colours per palette; WebGL cannot read CSS variables. */
const PALETTE_COLORS: Record<string, { c1: number; c2: number }> = {
  lime: { c1: 0x1f7a4d, c2: 0xb8d61a },
  cyan: { c1: 0x0e7490, c2: 0x22d3ee },
  violet: { c1: 0x6d28d9, c2: 0xa78bfa },
  amber: { c1: 0xb45309, c2: 0xfbbf24 },
  rose: { c1: 0xbe123c, c2: 0xfb7185 },
};

function readTheme() {
  if (typeof document === "undefined") return { theme: "dark", palette: "lime" };
  const root = document.documentElement;
  return {
    theme: root.getAttribute("data-theme") || "dark",
    palette: root.getAttribute("data-palette") || "lime",
  };
}

export default function BirdsBackground({
  quantity = 4,
  birdSize = 2.4,
  speedLimit = 2.4,
  wingSpan = 18,
  separation = 28,
  alignment = 28,
  cohesion = 20,
  color1,
  color2,
  backgroundColor = 0x000000,
  opacity = 1,
  keyboardControls = false,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const [skin, setSkin] = useState(readTheme);

  // Re-init the flock whenever the theme or palette attribute changes.
  useEffect(() => {
    const obs = new MutationObserver(() => setSkin(readTheme()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-palette"],
    });
    setSkin(readTheme());
    return () => obs.disconnect();
  }, []);

  const pal = PALETTE_COLORS[skin.palette] ?? PALETTE_COLORS.lime;
  const isLight = skin.theme === "light";
  const bg = isLight ? 0xf7f7f4 : backgroundColor;
  const c1 = color1 ?? pal.c1;
  const c2 = color2 ?? pal.c2;

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !ref.current) return;

    let cancelled = false;

    (async () => {
      const BIRDS = await loadVanta();
      if (cancelled || !BIRDS || !ref.current) return;
      try {
        effectRef.current = BIRDS({
          el: ref.current,
          THREE: (window as unknown as { THREE: unknown }).THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: bg,
          color1: c1,
          color2: c2,
          birdSize,
          wingSpan,
          speedLimit,
          separation,
          alignment,
          cohesion,
          quantity,
          backgroundAlpha: opacity === 1 ? 1 : 0,
        });
      } catch {
        // A WebGL-less context should not take the page down with it.
      }
    })();

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [
    quantity,
    birdSize,
    speedLimit,
    wingSpan,
    separation,
    alignment,
    cohesion,
    c1,
    c2,
    bg,
    opacity,
  ]);

  // BIRDS repulses boids away from the pointer rather than steering toward it,
  // so arrow keys drive that same point: the flock scatters from the held edge.
  // Vanta expects centered units (-0.5 -> 0.5), matching its own onMouseMove.
  useEffect(() => {
    if (!keyboardControls) return;

    const held = new Set<string>();
    const KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    let raf = 0;
    let x = 0;
    let y = 0;

    const tick = () => {
      const fx = effectRef.current;
      if (fx?.triggerMouseMove && held.size) {
        const step = 0.02;
        if (held.has("ArrowLeft")) x -= step;
        if (held.has("ArrowRight")) x += step;
        if (held.has("ArrowUp")) y -= step;
        if (held.has("ArrowDown")) y += step;
        x = Math.min(0.5, Math.max(-0.5, x));
        y = Math.min(0.5, Math.max(-0.5, y));
        fx.triggerMouseMove(x, y);
      }
      raf = requestAnimationFrame(tick);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!KEYS.includes(e.key)) return;
      const el = e.target as HTMLElement | null;
      // Never steal arrow keys from a field the visitor is typing in.
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      held.add(e.key);
      e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => held.delete(e.key);
    const onBlur = () => held.clear();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      cancelAnimationFrame(raf);
    };
  }, [keyboardControls]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, zIndex: 0, opacity }}
    />
  );
}
