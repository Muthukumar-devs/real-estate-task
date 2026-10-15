"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MOCK_TEAM } from "@/data/mockData";
import { motion, useScroll, useTransform } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatsSectionProps {
  onOpenConsultation: () => void;
}

export default function StatsSection({ onOpenConsultation }: StatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageScaleRef = useRef<HTMLDivElement>(null);

const { scrollYProgress } = useScroll({
  target: imageRef,
  offset: ["start end", "end start"],
});

const imageY = useTransform(
  scrollYProgress,
  [0, 1],
  ["-15%", "15%"]
);
  useGSAP(
    () => {
      // 1. Smooth background color sync
      gsap.to(document.body, {
        backgroundColor: "#FFFFFF",
        color: "#111111",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
      });

      // 2. Staggered reveal for left elements
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ".advisory-fade",
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.85,
              ease: "power2.out",
            }
          );

          // Number rolling with roundProps (integer-only, matching reference image)
          const statConfigs = [
            { ref: stat1Ref, target: 54, suffix: "+" },
            { ref: stat2Ref, target: 53, suffix: "%" },
            { ref: stat3Ref, target: 270, suffix: "" },
          ];

          statConfigs.forEach(({ ref, target, suffix }) => {
            if (!ref.current) return;
            const counter = { value: 0 };
            gsap.to(counter, {
              value: target,
              duration: 2.2,
              ease: "power2.out",
              roundProps: "value",
              onUpdate: () => {
                if (ref.current) {
                  ref.current.innerText = `${counter.value}${suffix}`;
                }
              },
            });
          });
        },
      });

      // 3. Right image scale reveal: 1.15 -> 1 (on inner element, not the Framer Motion parallax wrapper)
      if (imageScaleRef.current) {
        gsap.fromTo(
          imageScaleRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="advisory-section relative bg-white text-[#111111] pt-16 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 xl:px-16 transition-colors duration-500 overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-[1520px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">

          {/* ──────────────────────────────────────────────────────────────────
              LEFT COLUMN: Intro Paragraph · Team Widget · 3 Vertical Stat Rows
          ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Top Paragraph */}
            <div className="advisory-fade">
              <p className="text-sm sm:text-[15px] lg:text-base text-neutral-500 font-normal leading-relaxed max-w-lg">
                At Golden Gate Properties, we offer more than just real estate
                services; we provide an unparalleled experience tailored to meet
                your needs and exceed your expectations.
              </p>
            </div>

            {/* "Meet Our Professional Team" Avatars */}
            <div className="advisory-fade flex items-center gap-4 mt-8 sm:mt-10">
              <div className="flex -space-x-2.5 overflow-hidden">
                {MOCK_TEAM.slice(0, 4).map((member) => (
                  <div
                    key={member.name}
                    title={`${member.name} — ${member.role}`}
                    className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full ring-2 ring-white overflow-hidden shadow-xs grayscale hover:grayscale-0 transition-all cursor-pointer"
                  >
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-[13px] font-medium text-neutral-700 leading-snug">
                Meet Our<br />Professional Team
              </p>
            </div>

            {/* ── 3 Horizontal Stat Rows (Stacked Vertically) ── */}
            <div className="mt-14 sm:mt-20 space-y-7 sm:space-y-10">

              {/* Stat 1: 54+ | Successful Transactions Monthly */}
              <div className="advisory-fade flex items-center gap-8 sm:gap-12 pb-7 sm:pb-9 border-b border-neutral-100/90">
                <div className="w-36 sm:w-48 shrink-0">
                  <span
                    ref={stat1Ref}
                    className="text-6xl sm:text-7xl lg:text-8xl font-normal text-neutral-900 tracking-tight leading-none tabular-nums"
                  >
                    0
                  </span>
                </div>
                <p className="text-sm sm:text-base font-normal text-neutral-700 leading-snug">
                  Successful<br />Transactions Monthly
                </p>
              </div>

              {/* Stat 2: 53% | Customer Satisfaction Rate */}
              <div className="advisory-fade flex items-center gap-8 sm:gap-12 pb-7 sm:pb-9 border-b border-neutral-100/90">
                <div className="w-36 sm:w-48 shrink-0">
                  <span
                    ref={stat2Ref}
                    className="text-6xl sm:text-7xl lg:text-8xl font-normal text-neutral-900 tracking-tight leading-none tabular-nums"
                  >
                    0
                  </span>
                </div>
                <p className="text-sm sm:text-base font-normal text-neutral-700 leading-snug">
                  Customer<br />Satisfaction Rate
                </p>
              </div>

              {/* Stat 3: 270 | Exquisite Properties Ready for Your Selection */}
              <div className="advisory-fade flex items-center gap-8 sm:gap-12">
                <div className="w-36 sm:w-48 shrink-0">
                  <span
                    ref={stat3Ref}
                    className="text-6xl sm:text-7xl lg:text-8xl font-normal text-neutral-900 tracking-tight leading-none tabular-nums"
                  >
                    0
                  </span>
                </div>
                <p className="text-sm sm:text-base font-normal text-neutral-700 leading-snug">
                  Exquisite Properties<br />Ready for Your Selection
                </p>
              </div>

            </div>

          </div>

          {/* ──────────────────────────────────────────────────────────────────
              RIGHT COLUMN: Tall Architectural Arch Hero Card with Overlays
          ────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[680px] xl:h-[720px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-neutral-100">

              {/* Architectural Archway Image overlooking Dubai Skyline */}
              <motion.div ref={imageRef} style={{ y: imageY }} className="absolute inset-0 w-full h-full overflow-hidden">
                <div ref={imageScaleRef} className="absolute inset-0 will-change-transform">
                <Image
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1400&auto=format&fit=crop"
                  alt="Modern architectural archway overlooking Dubai skyline"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center will-change-transform"
                />
                {/* Subtle soft daylight vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />
                </div>
              </motion.div>

              {/* ── Top-Right Pill: Contact Us Now ── */}
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white/85 hover:bg-white text-neutral-800 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-[13px] font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100">
                    <Phone className="h-2.5 w-2.5 text-neutral-700" />
                  </div>
                  <span>Contact Us Now</span>
                </button>
              </div>

              {/* ── Bottom-Left Caption: Building Your Dreams ── */}
              <div className="absolute bottom-6 left-7 sm:bottom-8 sm:left-9 z-20">
                <span className="text-xs sm:text-[13px] text-white/80 font-normal tracking-wide drop-shadow-sm">
                  Building Your Dreams
                </span>
              </div>

              {/* ── Bottom-Right: Floating Consultation Card + Help Icon ── */}
              <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-20 flex items-center gap-2 sm:gap-3">

                {/* Floating Light Frosted Card */}
                <div
                  onClick={onOpenConsultation}
                  className="flex items-center gap-3.5 rounded-2xl sm:rounded-3xl bg-white/85 hover:bg-white/95 backdrop-blur-xl border border-white/60 p-3 sm:p-3.5 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  {/* Avatar with status dot */}
                  <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden ring-1 ring-neutral-300 shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                      alt="Advisor"
                      fill
                      className="object-cover"
                    />
                    {/* Status Badge Dot */}
                    <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-neutral-900 ring-2 ring-white" />
                  </div>

                  {/* Text block */}
                  <div className="text-left pr-2 sm:pr-3">
                    <span className="text-[10px] text-neutral-400 font-medium block leading-none mb-1">
                      Special Offer
                    </span>
                    <h4 className="text-xs sm:text-[13px] font-semibold text-neutral-900 leading-tight">
                      Get The Consultation<br />With Our Expert
                    </h4>
                  </div>
                </div>

                {/* Circular Help / Question Icon */}
                <button
                  onClick={onOpenConsultation}
                  title="Need help?"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/70 hover:bg-white/95 backdrop-blur-md border border-white/50 text-neutral-700 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <svg
                    className="h-4 w-4 stroke-current fill-none stroke-[2]"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
