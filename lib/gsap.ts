"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * useScopedGsap
 * Runs a GSAP animation callback inside a gsap.context() scoped to a ref,
 * so all tweens/ScrollTriggers created inside are cleaned up automatically
 * on unmount. Respects prefers-reduced-motion.
 */
export function useScopedGsap<T extends HTMLElement>(
  callback: (ctx: { el: T }) => void,
  deps: React.DependencyList = []
) {
  const scopeRef = useRef<T | null>(null);

  useEffect(() => {
    registerGsap();
    if (!scopeRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      callback({ el: scopeRef.current as T });
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

export { gsap, ScrollTrigger };
