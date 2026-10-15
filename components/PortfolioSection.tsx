"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Property, MOCK_MAP_HOTSPOTS } from "@/data/mockData";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import {
  usePortfolioHeaderReveal,
  usePortfolioGridReveal,
} from "@/hooks/useGSAPAnimations";

export interface PortfolioCardData {
  id: string;
  title: string;
  category: "All" |"Apartments" | "Villas" | "For Rent";
  imageUrl: string;
  price: string;
  installment: string;
  downPayment: string;
  handover: string;
  location: string;
}

export const PORTFOLIO_ITEMS: PortfolioCardData[] = [
  {
    id: "item-1",
    title: "Azure Heights Luxury Residences",
    category: "Apartments",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    price: "from $290k",
    installment: "for 10 years",
    downPayment: "$30,000",
    handover: "09/2025",
    location: "Dubai Marina",
  },
  {
    id: "item-2",
    title: "The Palm Royal Beachfront Villa",
    category: "Villas",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    price: "from $1.4M",
    installment: "for 7 years",
    downPayment: "$140,000",
    handover: "12/2025",
    location: "Palm Jumeirah",
  },
  {
    id: "item-3",
    title: "Creek Horizon Sky Penthouse",
    category: "Apartments",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    price: "from $850k",
    installment: "for 5 years",
    downPayment: "$85,000",
    handover: "04/2026",
    location: "Dubai Creek Harbour",
  },
  {
    id: "item-4",
    title: "Bulgari Marina Private Haven",
    category: "For Rent",
    imageUrl: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
    price: "from $38k/mo",
    installment: "Annual Contract",
    downPayment: "10% Deposit",
    handover: "Ready Now",
    location: "Jumeirah Bay",
  },
  {
    id: "item-5",
    title: "Dubai Hills Golf Estate Mansion",
    category: "Villas",
    imageUrl: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop",
    price: "from $3.2M",
    installment: "for 6 years",
    downPayment: "$320,000",
    handover: "06/2026",
    location: "Dubai Hills Estate",
  },
];

interface PortfolioSectionProps {
  onSelectProperty?: (property: Property) => void;
  onOpenConsultation: () => void;
}

export default function PortfolioSection({
  onSelectProperty,
  onOpenConsultation,
}: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const sectionScale = useTransform(
    sectionScrollProgress,
    [0.90, 1],
    [1, 0.95]
  );

  const sectionBorderRadius = useTransform(
    sectionScrollProgress,
    [0.90, 1],
    ["0px", "40px"]
  );

const filterContainer = {
  hidden: {
    width: 48,
    opacity: 0,
    borderRadius: 999,
  },
  visible: {
    width: "auto",
    opacity: 1,
    borderRadius: 999,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delayChildren: 0.55,
      staggerChildren: 0.12,
      staggerDirection: -1,
    },
  },
};

const filterItem = {
  hidden: {
    opacity: 0,
    x: 24,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};
  const [activeFilter, setActiveFilter] = useState<"All" | "Apartments" | "Villas" | "For Rent">("All");

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);
  const displayItems = filteredItems.length > 0 ? filteredItems : PORTFOLIO_ITEMS;

  // 1. GSAP Scroll Reveal for Header
  usePortfolioHeaderReveal(sectionRef, titleContainerRef, filterBarRef);

  // 2. Section 3: GSAP ScrollTrigger.batch for the property cards grid entry
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".portfolio-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.85,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  

  const toolbarRef = useRef<HTMLDivElement>(null);

  // GSAP fade-in + slide-up for bottom toolbar (All Properties + Social)
  useEffect(() => {
    if (!toolbarRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        toolbarRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: toolbarRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      id="portfolio"
      ref={sectionRef}
      style={{ scale: sectionScale, borderRadius: sectionBorderRadius, transformOrigin: "center top" }}
      className="portfolio-section sticky top-0 relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#121212] text-white border-t border-white/5 transition-colors duration-500  rounded-b-[40px] sm:rounded-b-[56px]"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header: Flex container aligning title to left and filter bar to right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          {/* Left Title: Explore Our Property Portfolio (White text, modern sans-serif, ~32px) */}
          <div ref={titleContainerRef} className="will-change-transform">
        
<motion.span
  initial="hidden"
  whileInView="visible"
  className="
    relative
    block
    w-fit
    mb-2
    text-xs
    uppercase
    tracking-[0.25em]
    font-medium
    text-white/50
    overflow-hidden
  "
>
  Private Real Estate Showcase

  {/* Reveal mask */}
  <motion.span
    variants={{
      hidden: {
        width: "100%",
      },
      visible: {
        width: "0%",
        transition: {
          duration: 1.5,
          delay: 0.25,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      },
    }}
    className="
      absolute
      inset-y-0
      right-0
      z-10
      w-full
      bg-[#b7b6b6]
      pointer-events-none
    "
  />
</motion.span>
        <motion.h2
  initial="hidden"
  whileInView="visible"
  className="
    relative
    w-fit
    text-3xl
    sm:text-4xl
    md:text-[34px]
    lg:text-4xl
    font-medium
    tracking-tight
    text-white
    leading-tight
  "
>
  Explore Our Property Portfolio

  {/* Reveal mask */}
  <motion.span
    variants={{
      hidden: {
        width: "100%",
      },
      visible: {
        width: "0%",
        transition: {
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          delay: 0.25,
        },
      },
    }}
    className="
      absolute
      top-0
      left-0
      h-full
      bg-white
      pointer-events-none
    "
  />
</motion.h2>
          </div>

          {/* Right Filter Bar: Dark pill-shaped container holding toggle buttons */}
 

{/* Right Filter Bar */}
<motion.div
  ref={filterBarRef}
  variants={filterContainer}
  initial="hidden"
  whileInView="visible"
  className="
    inline-flex
    items-center
    overflow-hidden
    rounded-full
    bg-[#1D1F24]
    p-1.5
    border
    border-white/10
    self-start
    md:self-end
    shadow-xl
  "
>
  {(["All","Apartments", "Villas", "For Rent"] as const).map(
    (filter) => {
      const isActive = activeFilter === filter;

      return (
        <motion.button
          key={filter}
          variants={filterItem}
          onClick={() => setActiveFilter(filter)}
          className={`
            shrink-0
            rounded-full
            px-5
            py-2.5
            text-xs
            uppercase
            tracking-wider
            transition-colors
            duration-300
            cursor-pointer
            ${
              isActive
                ? "bg-white text-black font-semibold shadow-md"
                : "bg-transparent text-white/70 hover:text-white font-medium"
            }
          `}
        >
          {filter}
        </motion.button>
      );
    }
  )}
</motion.div>
        </div>

        {/* 2x2 Property Portfolio Grid */}
        <motion.div  initial="hidden"
  whileInView="visible"
    variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  }} className="portfolio-grid grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {displayItems.map((item, index) => {
          const isOddCard = index % 2 === 0;
          return ( 
            <div
              key={item.id}
              onClick={() => {
                if (onSelectProperty) {
                  onSelectProperty({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    priceUSD: item.price,
                    priceAED: item.price,
                    location: item.location,
                    beds: item.category === "Villas" ? 5 : item.category === "Apartments" ? 3 : 2,
                    baths: item.category === "Villas" ? 6 : item.category === "Apartments" ? 3 : 2,
                    areaSqft: item.category === "Villas" ? 7800 : 2400,
                    imageUrl: item.imageUrl,
                    tag: item.category,
                    handover: item.handover,
                    roi: "8.5% Net ROI",
                  });
                }
              }}
              className="portfolio-card group relative h-[500px] sm:h-[560px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#1D1F24] border border-white/[0.08] shadow-2xl cursor-pointer will-change-transform"
            >
           {/* Inner Image Container */}
<div className="absolute inset-0 w-full h-full overflow-hidden">
  <Image
    src={item.imageUrl}
    alt={item.title}
    fill
    sizes="(max-width: 1024px) 100vw, 50vw"
    className="object-cover scale-110 transition-transform duration-700 ease-out group-hover:scale-115"
  />
</div>

              {/* Ambient Dark Gradient Vignette for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-black/35 to-black/20 pointer-events-none" />

              {/* Top-Right Floating Action Button (Angled Arrow ↗) */}
              <div className="absolute top-6 right-6 z-20">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-xl transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              {/* Bottom Frosted-Glass Label (Default view) */}
              <div className="absolute bottom-6 left-6 z-10 transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
                <div className="rounded-full bg-white/15 backdrop-blur-xl border border-white/25 px-5 py-2.5 text-white shadow-xl flex items-center gap-2">
                  <span className="text-sm font-medium tracking-tight">{item.title}</span>
                </div>
              </div>

              {/* Hover Overlay: title + location row + white metric pill cards */}
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-350 ease-out pointer-events-none group-hover:pointer-events-auto">
                {/* Gradient backdrop for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-[2rem] sm:rounded-[2.5rem]" />

                {/* Top: title then location stacked to avoid clash */}
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-snug pr-2">{item.title}</h3>
                  <div className="flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md px-3 py-1.5 text-[11px] text-white border border-white/20 self-start">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Bottom: white metric pill cards in a row */}
                <div className="relative z-10">
                  {/* Metric pills row */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3">
                    {/* Price */}
                    <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 px-4 py-3 shadow-lg">
                      <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5">Starting Price</p>
                      <p className="text-sm font-bold text-neutral-900 leading-none">{item.price}</p>
                    </div>
                    {/* Installment */}
                    <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 px-4 py-3 shadow-lg">
                      <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5">Installment Plan</p>
                      <p className="text-sm font-bold text-neutral-900 leading-none">{item.installment}</p>
                    </div>
                    {/* Down Payment */}
                    <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 px-4 py-3 shadow-lg">
                      <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5">Initial Payment</p>
                      <p className="text-sm font-bold text-neutral-900 leading-none">{item.downPayment}</p>
                    </div>
                    {/* Handover */}
                    <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 px-4 py-3 shadow-lg">
                      <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5">Handover</p>
                      <p className="text-sm font-bold text-neutral-900 leading-none">{item.handover}</p>
                    </div>
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-white/50 flex items-center gap-1">
                      <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Escrow Protected
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsultation();
                      }}
                      className="rounded-full bg-white text-neutral-900 px-5 py-2 text-xs font-semibold tracking-wide hover:bg-neutral-100 transition-colors cursor-pointer shadow-md"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
          })}

          {/* Map Card — always last in grid */}
          <div className="portfolio-card group relative h-[500px] sm:h-[560px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#e8e8e8] border border-white/[0.08] shadow-2xl cursor-pointer will-change-transform">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=54.89%2C24.99%2C55.57%2C25.38&layer=mapnik"
              className="absolute inset-0 w-full h-full border-0 pointer-events-none"
              title="Dubai Map"
            />
            <div className="absolute inset-0 bg-white/10 pointer-events-none" />

            <div className="absolute top-5 left-5 z-20">
              <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 px-4 py-2 shadow-md">
                <span className="text-xs font-semibold text-neutral-800 tracking-tight">Find On The Map</span>
              </div>
            </div>

            <div className="absolute top-5 right-5 z-20">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-md text-neutral-800 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>

            {MOCK_MAP_HOTSPOTS.map((spot) => (
              <div
                key={spot.name}
                style={{ top: spot.top, left: spot.left }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group/pin"
              >
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="#111215"/>
                  <circle cx="14" cy="14" r="5" fill="white"/>
                </svg>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 min-w-[180px] rounded-2xl bg-[#111215]/95 backdrop-blur-xl border border-white/20 p-3 shadow-2xl opacity-0 scale-95 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:scale-100 transition-all duration-200 z-30">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 block">{spot.type}</span>
                  <h4 className="text-xs font-semibold text-white mt-0.5">{spot.name}</h4>
                  <div className="flex items-center justify-between gap-3 mt-2 pt-2 border-t border-white/10 text-[11px]">
                    <span className="text-emerald-400 font-medium">{spot.avgRoi}</span>
                    <span className="text-white/80">{spot.startingPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Toolbar: All Properties pill + "Follow Us on Social" row */}
        <div ref={toolbarRef} className="portfolio-toolbar flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-6 sm:mt-8 will-change-transform">
            {/* Left: Centered All Properties CTA */}
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2.5 rounded-full bg-white text-black px-7 py-3.5 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-100 transition-all shadow-lg active:scale-95 cursor-pointer hover:scale-105"
            >
              <span>All Properties</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            {/* Right: "Don't Miss Out" text + social icons */}
            <div className="flex items-center gap-4">
              <p className="text-xs text-white/40 tracking-wide hidden md:block max-w-[220px] leading-relaxed">
                Don&apos;t Miss Out on Hot Deals!{" "}
                <span className="text-white/70 font-medium">Follow Us on Social Media</span>
              </p>

              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/15 text-white transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <svg
                    className="h-[18px] w-[18px] stroke-current fill-none stroke-[1.75]"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  title="TikTok"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/15 text-white transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <svg className="h-[16px] w-[16px] fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.14 1.15 2.06 2.29 2.31.74.17 1.54.08 2.22-.24.77-.35 1.37-.99 1.67-1.77.24-.61.3-1.27.3-1.92V.02h-.07z" />
                  </svg>
                </a>
              </div>
            </div>
        </div>
      </div>
    </motion.section>
  );
}
