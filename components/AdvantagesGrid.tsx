"use client";

import React, { useRef } from "react";
import {
  Globe2,
  ShieldCheck,
  Coins,
  FileCheck2,
  PercentSquare,
  TrendingUp,
  Laptop,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MOCK_ADVANTAGES, Advantage } from "@/data/mockData";

gsap.registerPlugin(ScrollTrigger);

interface AdvantagesGridProps {
  onOpenConsultation: () => void;
}

export default function AdvantagesGrid({ onOpenConsultation }: AdvantagesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".advantage-grid-item");
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  const getIcon = (name: string) => {
    switch (name) {
      case "Globe2":
        return <Globe2 className="h-5 w-5 text-black" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-5 w-5 text-black" />;
      case "Coins":
        return <Coins className="h-5 w-5 text-black" />;
      case "FileCheck2":
        return <FileCheck2 className="h-5 w-5 text-black" />;
      case "PercentSquare":
        return <PercentSquare className="h-5 w-5 text-black" />;
      case "TrendingUp":
        return <TrendingUp className="h-5 w-5 text-black" />;
      case "Laptop":
      default:
        return <Laptop className="h-5 w-5 text-black" />;
    }
  };

  return (
    <section
      id="advantages"
      ref={containerRef}
      className="relative bg-white text-[#121212] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header + Contact Us Now Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block h-2 w-2 rounded-full bg-black" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-neutral-500">
                Sovereign Fundamentals
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121212] leading-tight">
              Why Dubai Stands Unrivalled?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 font-light max-w-xl">
              An unprecedented confluence of tax neutrality, geopolitical neutrality, and state-backed capital security.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-3 rounded-full bg-[#121212] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-xl hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] transition-all self-start md:self-end"
          >
            <span>Contact Us Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MOCK_ADVANTAGES.map((adv, idx) => (
            <div
              key={adv.id}
              className="advantage-grid-item group relative flex flex-col gap-5 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-7 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-neutral-200 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {getIcon(adv.iconName)}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold tracking-tight text-[#121212] leading-snug">
                {adv.title}
              </h3>

              {/* Description */}
              <p className="text-xs leading-relaxed text-neutral-600 font-medium flex-1">
                {adv.description}
              </p>

              {/* Highlight tag */}
              <span className="self-start text-[10px] uppercase tracking-widest font-semibold text-neutral-600 bg-neutral-200 group-hover:bg-neutral-300 px-2.5 py-1 rounded-full transition-colors duration-300">
                {adv.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
