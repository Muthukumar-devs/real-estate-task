"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Global Lenis instance so modals can stop/start it
export let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenisInstance = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
