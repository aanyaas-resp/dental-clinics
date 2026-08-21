"use client";

import { ReactNode } from "react";
import { useScopedGsap, gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "slide-left" | "slide-right" | "blur" | "zoom";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** stagger children of the wrapper instead of animating the wrapper itself */
  stagger?: boolean;
  variant?: RevealVariant;
  y?: number;
  delay?: number;
  as?: "div" | "section";
};

const VARIANT_FROM: Record<RevealVariant, gsap.TweenVars> = {
  "fade-up": { opacity: 0, y: 28 },
  "slide-left": { opacity: 0, x: 48 },
  "slide-right": { opacity: 0, x: -48 },
  blur: { opacity: 0, y: 16, filter: "blur(14px)" },
  zoom: { opacity: 0, scale: 0.92 },
};

const VARIANT_TO: gsap.TweenVars = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  filter: "blur(0px)",
};

/**
 * Reveal
 * Scroll-triggered entrance animation (GSAP + ScrollTrigger). Supports
 * fade-up, slide-in from either side, a soft blur reveal, and a subtle
 * zoom — used throughout the site so each section arrives with intent
 * rather than a single repeated fade. When `stagger` is true, direct
 * children are animated with a stagger instead of the container as a
 * single block. Respects prefers-reduced-motion (see lib/gsap.ts).
 */
export function Reveal({
  children,
  className,
  stagger = false,
  variant = "fade-up",
  y,
  delay = 0,
  as = "div",
}: RevealProps) {
  const from = { ...VARIANT_FROM[variant], ...(y !== undefined ? { y } : {}) };

  const ref = useScopedGsap<HTMLDivElement>(({ el }) => {
    const targets = stagger ? gsap.utils.toArray(el.children) : el;

    gsap.set(targets, from);

    gsap.to(targets, {
      ...VARIANT_TO,
      duration: variant === "blur" ? 1.1 : 0.9,
      delay,
      ease: "power3.out",
      stagger: stagger ? 0.12 : 0,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  const Tag = as;

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
