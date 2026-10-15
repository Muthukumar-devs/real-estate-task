"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CircleMergeProps {
  onOpenCatalog: () => void;
}

export default function CircleMerge({ onOpenCatalog }: CircleMergeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const leftCircleRef   = useRef<HTMLDivElement>(null);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const rightCircleRef  = useRef<HTMLDivElement>(null);

  const leftTextRef   = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef  = useRef<HTMLDivElement>(null);

  const finalTextRef  = useRef<HTMLDivElement>(null);
  const catalogBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left       = leftCircleRef.current;
    const center     = centerCircleRef.current;
    const right      = rightCircleRef.current;
    const leftText   = leftTextRef.current;
    const centerText = centerTextRef.current;
    const rightText  = rightTextRef.current;
    const finalText  = finalTextRef.current;
    const catalogBtn = catalogBtnRef.current;

    if (!left || !center || !right || !leftText || !centerText || !rightText || !finalText || !catalogBtn) return;

    const isMobile = window.innerWidth < 768;
    const spread   = isMobile ? 110 : 220;
    const vennX    = isMobile ? 44  : 72;
    const vennY    = isMobile ? 25  : 42;
    const vennUp   = isMobile ? 50  : 82;

    // ── Initial state ──────────────────────────────────────────
    gsap.set(left,   { x: -spread, y: 0, opacity: 0 });
    gsap.set(center, { x: 0,       y: 0, opacity: 0 });
    gsap.set(right,  { x: spread,  y: 0, opacity: 0 });
    gsap.set([leftText, centerText, rightText], { opacity: 1 });
    gsap.set(finalText,  { opacity: 0, scale: 0.85, y: 10 });
    gsap.set(catalogBtn, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ paused: true });

    // Phase 1 — fade circles in
    tl.to([left, center, right], {
      opacity: 1,
      duration: 0.55,
      stagger: 0.12,
      ease: "power2.out",
    });

    // Hold
    tl.to({}, { duration: 0.4 });

    // Phase 2 — rearrange into venn / triangle
    tl.to([leftText, centerText, rightText], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    }, "venn");

    tl.to(center, { x: 0,      y: -vennUp, duration: 0.9, ease: "power3.inOut" }, "venn+=0.1");
    tl.to(left,   { x: -vennX, y: vennY,   duration: 0.9, ease: "power3.inOut" }, "venn+=0.1");
    tl.to(right,  { x: vennX,  y: vennY,   duration: 0.9, ease: "power3.inOut" }, "venn+=0.1");

    // Hold venn
    tl.to({}, { duration: 0.35 });

    // Phase 3 — all converge to center
    tl.to([left, center, right], {
      x: 0,
      y: 0,
      duration: 1.0,
      ease: "power3.inOut",
      stagger: 0,
    });

    // Hold merged
    tl.to({}, { duration: 0.2 });

    // Reveal final text
    tl.to(finalText, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    // Reveal CTA
    tl.to(catalogBtn, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    }, "-=0.1");

    // Replay every time the section enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.restart();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => { observer.disconnect(); tl.kill(); };
  }, []);

  return (
    <section
      ref={containerRef}
      id="ownership"
      className="relative bg-[#121316] text-white overflow-hidden"
    >
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-16 overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center max-w-2xl mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-3">
            Path to Smart Ownership
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
            Scroll to see how upfront capital, deferred installments, and high rental yields converge into sovereign asset equity.
          </p>
        </div>

        {/* Diagram */}
        <div className="relative z-10 w-full max-w-5xl h-[320px] sm:h-[400px] md:h-[460px] flex items-center justify-center">

          {/* Left circle */}
          <div
            ref={leftCircleRef}
            className="absolute w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] rounded-full border border-white bg-transparent flex items-center justify-center will-change-transform z-10"
          >
            <div ref={leftTextRef} className="text-center px-4 pointer-events-none select-none">
              <div className="text-[8px] sm:text-xs md:text-[15px] font-light text-white/90 leading-snug">10% Initial</div>
              <div className="text-xs sm:text-sm md:text-[15px] font-light text-white/90 leading-snug">Payment</div>
            </div>
          </div>

          {/* Center circle */}
          <div
            ref={centerCircleRef}
            className="absolute w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] rounded-full border border-white bg-transparent flex items-center justify-center will-change-transform z-10"
          >
            <div ref={centerTextRef} className="text-center px-4 pointer-events-none select-none">
              <div className="text-xs sm:text-sm md:text-[15px] font-light text-white/90 leading-snug">5 years installment,</div>
              <div className="text-xs sm:text-sm md:text-[15px] font-light text-white/90 leading-snug">0% overpayment</div>
            </div>
          </div>

          {/* Right circle */}
          <div
            ref={rightCircleRef}
            className="absolute w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] rounded-full border border-white bg-transparent flex items-center justify-center will-change-transform z-10"
          >
            <div ref={rightTextRef} className="text-center px-4 pointer-events-none select-none">
              <div className="text-xs sm:text-sm md:text-[15px] font-light text-white/90 leading-snug">Rental income - 15%</div>
            </div>
          </div>

          {/* Final merged label */}
          <div
            ref={finalTextRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none select-none will-change-transform"
          >
            <span className="text-xs sm:text-sm md:text-[15px] font-light text-white/90 leading-tight">Smart</span>
            <span className="text-xs sm:text-sm md:text-[15px] font-light text-white/90 leading-tight">Ownership</span>
          </div>
        </div>

        {/* CTA */}
        <div ref={catalogBtnRef} className="relative z-40 mt-2 sm:mt-4 opacity-0 translate-y-5 pointer-events-auto">
          <button
            onClick={onOpenCatalog}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white text-black px-7 py-3.5 text-xs font-semibold uppercase tracking-wider shadow-xl transition-all duration-300 hover:bg-neutral-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>Download Master Catalog</span>
          </button>
        </div>
      </div>
    </section>
  );
}
