"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
const barHeights = [14, 24, 28, 16, 10];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const center = centerRef.current;
    const right = rightRef.current;
    const label = labelRef.current;
    const overlay = overlayRef.current;

    if (!left || !center || !right || !label || !overlay) return;

    // Initial positions — 3 horizontal circles
    gsap.set(left,   { x: -90, opacity: 0 });
    gsap.set(center, { x: 0,   opacity: 0 });
    gsap.set(right,  { x: 90,  opacity: 0 });
    gsap.set(label,  { opacity: 0, scale: 0.85 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide the whole loader up and out
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    // Phase 1 — fade circles in
    tl.to([left, center, right], {
      opacity: 1,
      duration: 0.5,
      stagger: 0.12,
      ease: "power2.out",
    });

    // Phase 2 — rearrange into triangle / venn
    tl.to(center, { x: 0,   y: -55, duration: 0.9, ease: "power3.inOut" }, "venn");
    tl.to(left,   { x: -48, y: 28,  duration: 0.9, ease: "power3.inOut" }, "venn");
    tl.to(right,  { x: 48,  y: 28,  duration: 0.9, ease: "power3.inOut" }, "venn");

    // Hold venn
    tl.to({}, { duration: 0.35 });

    // Phase 3 — all converge to center (no fade)
    tl.to([left, center, right], {
      x: 0,
      y: 0,
      duration: 1.0,
      ease: "power3.inOut",
      stagger: 0,
    });

    // Hold merged
    tl.to({}, { duration: 0.2 });

    // Reveal label
    tl.to(label, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    // Hold before exit
    tl.to({}, { duration: 0.55 });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111215]"
    >
      {/* Circles */}
      <div className="relative flex items-center justify-center w-[220px] h-[220px]">
        {/* Left */}
        <div
          ref={leftRef}
          className="absolute w-[130px] h-[130px] rounded-full border border-white/30"
        />
        {/* Center */}
        <div
          ref={centerRef}
          className="absolute w-[130px] h-[130px] rounded-full border border-white/30"
        />
        {/* Right */}
        <div
          ref={rightRef}
          className="absolute w-[130px] h-[130px] rounded-full border border-white/30"
        />

        {/* Label — shown after merge */}
        <div
          ref={labelRef}
          className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none select-none"
        >
   

<div className="flex items-end gap-[3px] h-8">
  {barHeights.map((height, index) => (
    <motion.span
      key={index}
      className="w-[2.5px] bg-white rounded-full"
      animate={{
        height: [
          `${height}px`,
          `${Math.max(5, height * 0.45)}px`,
          `${height * 1.1}px`,
          `${height}px`,
        ],
      }}
      transition={{
        duration: 0.7 + index * 0.12,
        ease: "easeInOut",
        delay: index * 0.1,
      }}
    />
  ))}
</div>
          <span className="text-[11px] font-semibold text-white/80 leading-tight tracking-wide">
             MONTE
          </span>
         
        </div>
      </div>

      {/* Brand name */}
      <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-white/30 font-medium">
        Smart Ownership · Real Estate
      </p>
    </div>
  );
}
