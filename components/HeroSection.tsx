"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import {
  Phone,
  ArrowUpRight,
  ArrowDownToLine,
  Heart,
  Map,
  Menu,
  X,
  Star,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onOpenCatalog: () => void;
  onToggleNavbar: () => void;
  isNavbarOpen?: boolean;
  isLoading?: boolean;
}

export default function HeroSection({
  onOpenConsultation,
  onOpenCatalog,
  onToggleNavbar,
  isNavbarOpen = false,
  isLoading = false,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const revealOverlayRef = useRef<HTMLDivElement>(null);
const containerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};


  const introRef = useRef<gsap.core.Timeline | null>(null);
const { scrollYProgress } = useScroll({
  target: heroImageRef,
  offset: ["start end", "end start"],
});

const imageY = useTransform(
  scrollYProgress,
  [0, 1],
  ["-15%", "15%"]
);
  // Play hero intro only after loading screen has exited
  useEffect(() => {
    if (!isLoading && introRef.current) {
      introRef.current.play();
    }
  }, [isLoading]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            desktop: "(min-width: 1024px)",
            mobile: "(max-width: 1023px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const { desktop, reduceMotion } = context.conditions as {
              desktop: boolean;
              mobile: boolean;
              reduceMotion: boolean;
            };

            const panel = heroPanelRef.current;
            const image = heroImageRef.current;
            const overlay = revealOverlayRef.current;
            const headlineLines =
              headlineRef.current?.querySelectorAll(".hero-line-inner");

            if (!panel || !image || !overlay || !headlineLines) return;

            // ---------------------------------------------------------
            // REDUCED MOTION
            // ---------------------------------------------------------

            if (reduceMotion) {
              gsap.set(
                [
                  panel,
                  overlay,
                  image,
                  ".hero-eyebrow",
                  ".hero-line-inner",
                  ".hero-cta-btn",
                  ".catalog-floating-pill",
                  ".hero-meta",
                ],
                {
                  clearProps: "all",
                },
              );

              return;
            }

            // ---------------------------------------------------------
            // INITIAL STATE
            // ---------------------------------------------------------

            gsap.set(panel, {
              clipPath: "inset(0 0 100% 0 round 28px)",
              y: desktop ? 35 : 20,
            });

            gsap.set(overlay, {
              clipPath: "inset(0 0 100% 0)",
            });

            gsap.set(image, {
              scale: desktop ? 1.16 : 1.1,
              opacity: 0,
            });

            gsap.set(".hero-eyebrow", {
              y: 24,
              opacity: 0,
            });

            gsap.set(".hero-line-inner", {
              yPercent: 115,
              opacity: 0,
            });

            gsap.set(".hero-cta-btn", {
              y: 25,
              opacity: 0,
            });

            gsap.set(".hero-meta", {
              y: 15,
              opacity: 0,
            });

            gsap.set(".catalog-floating-pill", {
              y: 25,
              scale: 0.92,
              opacity: 0,
            });

            // ---------------------------------------------------------
            // MASTER REVEAL INTRO — paused until loading screen exits
            // ---------------------------------------------------------

            const intro = gsap.timeline({
              paused: true,
              defaults: {
                ease: "power3.out",
              },
            });

            introRef.current = intro;

            // 01 — Main white hero panel reveals upward
            intro.to(
              panel,
              {
                clipPath: "inset(0 0 0% 0 round 28px)",
                y: 0,
                duration: 1.15,
                ease: "power4.inOut",
              },
              0,
            );

            // 02 — Image starts appearing slightly after panel begins
            intro.to(
              image,
              {
                opacity: 1,
                scale: 1,
                duration: 1.65,
                ease: "power3.out",
              },
              0.15,
            );

            // 03 — Image overlay sweeps away
            intro.to(
              overlay,
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.9,
                ease: "power3.inOut",
              },
              0.25,
            );

            // Reverse overlay into transparent state
            intro.to(
              overlay,
              {
                opacity: 0,
                duration: 0.75,
                ease: "power2.out",
              },
              0.8,
            );

            // 04 — Small eyebrow appears
            intro.to(
              ".hero-eyebrow",
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power3.out",
              },
              0.65,
            );

            // 05 — Main heading line reveal
            intro.to(
              headlineLines,
              {
                yPercent: 0,
                opacity: 1,
                duration: desktop ? 1.05 : 0.9,
                stagger: desktop ? 0.11 : 0.08,
                ease: "power4.out",
              },
              0.72,
            );

            // 06 — CTA buttons
            intro.to(
              ".hero-cta-btn",
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
              },
              1.18,
            );

            // 07 — Bottom metadata
            intro.to(
              ".hero-meta",
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
              },
              1.28,
            );

            // 08 — Floating catalog button
            intro.to(
              ".catalog-floating-pill",
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.85,
                ease: "back.out(1.4)",
              },
              1.38,
            );

            // ---------------------------------------------------------
            // SUBTLE IDLE IMAGE PARALLAX
            // ---------------------------------------------------------

            gsap.to(image, {
              y: desktop ? -8 : -3,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 2,
            });

            // ---------------------------------------------------------
            // IMAGE HOVER
            // ---------------------------------------------------------

            const imageContainer = heroImageRef.current;

            if (imageContainer && desktop) {
              const imageElement =
                imageContainer.querySelector(".hero-main-image");

              imageContainer.addEventListener("mouseenter", () => {
                gsap.to(imageElement, {
                  scale: 1.045,
                  duration: 0.8,
                  ease: "power3.out",
                });
              });

              imageContainer.addEventListener("mouseleave", () => {
                gsap.to(imageElement, {
                  scale: 1,
                  duration: 0.9,
                  ease: "power3.out",
                });
              });
            }

            // ---------------------------------------------------------
            // BUTTON MICRO INTERACTIONS
            // ---------------------------------------------------------

            const interactiveButtons = containerRef.current?.querySelectorAll(
              ".hero-magnetic-button",
            );

            interactiveButtons?.forEach((button) => {
              button.addEventListener("mouseenter", () => {
                gsap.to(button, {
                  y: -2,
                  duration: 0.35,
                  ease: "power3.out",
                });
              });

              button.addEventListener("mouseleave", () => {
                gsap.to(button, {
                  y: 0,
                  duration: 0.45,
                  ease: "power3.out",
                });
              });
            });
          },
        );

        return () => mm.revert();
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="
        hero-section
        relative
        w-full
        min-h-screen
        bg-white
        px-3
        py-3
        sm:px-5
        sm:py-5
        lg:px-6
        lg:py-6
        overflow-hidden
      "
    >
      {/* ============================================================
          HERO PANEL
      ============================================================ */}

      <div
        ref={heroPanelRef}
        className="
          relative
          w-full
          min-h-[calc(100vh-24px)]
          sm:min-h-[calc(100vh-40px)]
          lg:min-h-[calc(100vh-48px)]
          overflow-hidden
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-7
          lg:gap-10
          xl:gap-14
        
        "
      >
        {/* ============================================================
            INTRO REVEAL OVERLAY
        ============================================================ */}

        <div
          ref={revealOverlayRef}
          className="
            pointer-events-none
            absolute
            inset-0
            z-50
            bg-[#111111]
          "
        />

        {/* ============================================================
            LEFT CONTENT
        ============================================================ */}

        <div
          className="
            lg:col-span-6
            flex
            flex-col
            justify-between
            min-h-[520px]
            lg:min-h-0
            relative
            z-10
          "
        >
          {/* --------------------------------------------------------
              TOP BAR
          -------------------------------------------------------- */}

          <div className="hero-meta flex items-center justify-between w-full">
            {/* Logo */}

            <div className="flex items-center gap-3 select-none">
              <div className="flex items-end gap-[3px] h-7">
                <span className="w-[2.5px] h-3.5 bg-[#111111] rounded-full" />
                <span className="w-[2.5px] h-6 bg-[#111111] rounded-full" />
                <span className="w-[2.5px] h-7 bg-[#111111] rounded-full" />
                <span className="w-[2.5px] h-4 bg-[#111111] rounded-full" />
                <span className="w-[2.5px] h-2.5 bg-[#111111] rounded-full" />
              </div>

              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-semibold tracking-[0.25em] text-[#111111] leading-none uppercase">
                  MONTE
                </span>

                <span className="text-[7.5px] uppercase tracking-[0.35em] text-[#666666] font-medium mt-1">
                  REAL ESTATE
                </span>
              </div>
            </div>

            {/* Controls */}

            <div className="flex items-center gap-2.5">
              <a
                href="#portfolio"
                title="View on Map"
                className="
                  hero-magnetic-button
                  h-10
                  w-10
                  sm:h-11
                  sm:w-11
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  flex
                  items-center
                  justify-center
                  text-neutral-700
                  hover:bg-neutral-100
                  transition-colors
                "
              >
                <Map className="h-[18px] w-[18px]" />
              </a>

              <button
                onClick={onToggleNavbar}
                title={
                  isNavbarOpen
                    ? "Close Navigation Bar"
                    : "Display Navigation Bar"
                }
                aria-label={
                  isNavbarOpen
                    ? "Close Navigation Bar"
                    : "Display Navigation Bar"
                }
                className="
                  hero-magnetic-button
                  h-10
                  w-10
                  sm:h-11
                  sm:w-11
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  flex
                  items-center
                  justify-center
                  text-neutral-700
                  hover:bg-neutral-100
                  active:scale-95
                  transition-colors
                  cursor-pointer
                "
              >
                {isNavbarOpen ? (
                  <X className="h-[18px] w-[18px]" />
                ) : (
                  <Menu className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
          </div>

          {/* --------------------------------------------------------
              CENTER HERO CONTENT
          -------------------------------------------------------- */}

          <div
            className="
              my-auto
              py-12
              sm:py-16
              lg:py-10
              flex
              flex-col
              items-center
              text-center
              max-w-2xl
              mx-auto
              w-full
            "
          >
            <span
              className="
                hero-eyebrow
                text-[10px]
                sm:text-xs
                font-medium
                text-[#666666]
                uppercase
                tracking-[0.24em]
                mb-5
                sm:mb-6
              "
            >
              Building Your Dreams
            </span>

            <h1
              ref={headlineRef}
              className="
                text-[2rem]
                sm:text-4xl
                lg:text-[2.9rem]
                xl:text-[3.5rem]
                font-medium
                text-[#111111]
                leading-[1.1]
                tracking-[-0.035em]
                text-center
              "
            >
              <motion.span
                initial="hidden"
                whileInView="visible"
                className="block relative overflow-hidden pb-2"
              >
                <span className="hero-line-inner inline-block">
                  Real Estate in Dubai:
                </span>{" "}
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
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="
      absolute
      inset-y-0
      left-0
      z-10
      w-full
      bg-[#121212]
      pointer-events-none
    "
                />
              </motion.span>

              <motion.span
                initial="hidden"
                whileInView="visible"
                className="block relative overflow-hidden pb-2"
              >
                <span className="hero-line-inner inline-block">
                  Ideal for Living and
                </span>{" "}
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
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="
      absolute
      inset-y-0
      right-0
      z-10
      w-full
      bg-[#121212]
      pointer-events-none
    "
                />
              </motion.span>

              <motion.span
                initial="hidden"
                whileInView="visible"
                className="block relative overflow-hidden pb-2"
              >
                <span className="hero-line-inner inline-block">Investing</span>{" "}
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
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="
      absolute
      inset-y-0
      left-0
      z-10
      w-full
      bg-[#121212]
      pointer-events-none
    "
                />
              </motion.span>
            </h1>
          </div>

          {/* --------------------------------------------------------
              BOTTOM ACTIONS
          -------------------------------------------------------- */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-start
              sm:items-center
              justify-between
              gap-5
              pt-6
              border-t
              border-neutral-100
              w-full
            "
          >
            {/* Contact */}



<motion.button
  onClick={onOpenConsultation}
  initial="initial"
  animate="animate"
  variants={{
    initial: { width: 52 },
    animate: {
      width: "auto",
      transition: {
        duration: 1.5,
        delay: 1.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }}
  whileTap={{ scale: 0.97 }}
  className="
    hero-cta-btn
    hero-magnetic-button
    group
    flex
    items-center
    gap-3
    overflow-hidden
    rounded-full
    bg-[#111111]
    text-white
    py-2
    pl-2
    pr-6
    hover:bg-neutral-800
    shadow-md
    cursor-pointer
  "
>
  <motion.div
    className="
      h-9
      w-9
      sm:h-10
      sm:w-10
      shrink-0
      rounded-full
      bg-white
      flex
      items-center
      justify-center
      text-[#111111]
    "
  >
    <Phone className="h-4 w-4" />
  </motion.div>

  <motion.span
    initial={{ opacity: 0, width: 0 }}
    animate={{ opacity: 1, width: "auto" }}
    transition={{
      duration: 0.5,
      delay: 1,
      ease: "easeOut",
    }}
    className="
      whitespace-nowrap
      overflow-hidden
      text-[11px]
      uppercase
      tracking-[0.12em]
      font-semibold
    "
  >
    Contact Us Now
  </motion.span>
</motion.button>

            {/* Portfolio */}



<motion.a
  href="#portfolio"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
  whileHover={{ y: -3 }}
  className="
    hero-cta-btn
    flex
    items-center
    gap-3.5
    group
    select-none
    self-end
    sm:self-auto
    cursor-pointer
  "
>
  {/* Text */}
  <motion.div
    variants={{
      hidden: { opacity: 0, x: -15 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6 },
      },
    }}
    className="text-right"
  >
    <span className="text-xs font-semibold text-[#111111] block leading-tight">
      Explore All
    </span>

    <span className="text-xs text-[#666666] block leading-tight">
      Our Properties
    </span>
  </motion.div>

  {/* Property Images */}
  <motion.div
    className="flex items-center -space-x-3"
    variants={containerVariants}
  >
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.12, y: -4, zIndex: 10 }}
      className="
        relative h-10 w-10 sm:h-11 sm:w-11
        rounded-full overflow-hidden
        ring-2 ring-white shadow-sm shrink-0
      "
    >
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=200&auto=format&fit=crop"
        alt="Featured Property 1"
        fill
        sizes="44px"
        className="object-cover"
      />
    </motion.div>

    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.12, y: -4, zIndex: 10 }}
      className="
        relative h-10 w-10 sm:h-11 sm:w-11
        rounded-full overflow-hidden
        ring-2 ring-white shadow-sm shrink-0
      "
    >
      <Image
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=200&auto=format&fit=crop"
        alt="Featured Property 2"
        fill
        sizes="44px"
        className="object-cover"
      />
    </motion.div>

    {/* Arrow Circle */}
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.12,
        rotate: 45,
        backgroundColor: "#333333",
      }}
      transition={{ duration: 0.3 }}
      className="
        relative h-10 w-10 sm:h-11 sm:w-11
        rounded-full bg-black text-white
        flex items-center justify-center
        ring-2 ring-white shadow-sm shrink-0
      "
    >
      <motion.div
        whileHover={{ x: 2, y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUpRight className="h-4 w-4" />
      </motion.div>
    </motion.div>
  </motion.div>
</motion.a>
          </div>
        </div>

        {/* ============================================================
            RIGHT IMAGE
        ============================================================ */}


<div className="lg:col-span-6 w-full flex min-h-[420px] sm:min-h-[560px] lg:min-h-0">
  <motion.div
    ref={heroImageRef}
    initial={{ width: "0%" }}
    animate={{ width: "100%" }}
    transition={{
      duration: 1.4,
      delay: 2,
      ease: [0.76, 0, 0.24, 1],
    }}
    className="
      relative
      w-full
      min-h-[420px]
      sm:min-h-[560px]
      lg:min-h-[640px]
      rounded-[20px]
      sm:rounded-[24px]
      lg:rounded-[28px]
      overflow-hidden
      border
      border-black/5
      bg-[#0e3b5e]
      flex
      flex-col
      justify-between
      p-5
      sm:p-7
      lg:p-8
      xl:p-10
      will-change-[width]
    "
  >
    {/* Background Image */}
    <motion.div  style={{ y: imageY }} className="absolute inset-0 overflow-hidden">
      <Image
        src="/burj_al_arab_hero.jpg"
        alt="Burj Al Arab on Jumeirah Beach Dubai"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="
          hero-main-image
          object-cover
          object-center
          will-change-transform
        "
      />

      {/* Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
    </motion.div>

    {/* Top Overlay */}
    <div className="hero-meta relative z-10 flex items-center justify-between w-full">
      {/* Rating Badge */}
      <div
        className="
          rounded-full
          bg-black/40
          backdrop-blur-md
          border
          border-white/20
          py-1.5
          px-4
          flex
          items-center
          gap-2
          text-white
          shadow-md
        "
      >
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />

        <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">
          Prime Palm &amp; Jumeirah Residences
        </span>
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        aria-label="Add property to wishlist"
        className="
          h-10
          w-10
          rounded-full
          bg-black/35
          backdrop-blur-md
          border
          border-white/20
          flex
          items-center
          justify-center
          text-white
          shadow-md
          hover:bg-black/50
          hover:scale-105
          transition-all
          duration-300
          cursor-pointer
        "
      >
        <Heart className="h-4 w-4 fill-white/20" />
      </button>
    </div>

    {/* Download Catalog */}
    <div className="relative z-10 flex justify-end w-full">
      <button
        type="button"
        onClick={onOpenCatalog}
        className="
          catalog-floating-pill
          group
          flex
          items-center
          gap-3
          rounded-full
          bg-white
          text-black
          py-2.5
          sm:py-3
          px-5
          sm:px-6
          shadow-2xl
          hover:bg-neutral-100
          hover:scale-[1.03]
          active:scale-[0.97]
          transition-all
          duration-500
          cursor-pointer
        "
      >
        {/* Download Icon */}
        <div
          className="
            h-8
            w-8
            sm:h-9
            sm:w-9
            rounded-full
            bg-black/5
            flex
            items-center
            justify-center
            text-black
            group-hover:scale-110
            transition-transform
            duration-500
          "
        >
          <ArrowDownToLine className="h-4 w-4" />
        </div>

        {/* Catalog Text */}
        <div className="text-left">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-neutral-500 block leading-tight font-medium">
            Master Portfolio
          </span>

          <span className="text-xs sm:text-sm font-semibold text-black block leading-tight">
            Download Catalog
          </span>
        </div>
      </button>
    </div>
  </motion.div>
</div>
      </div>
    </section>
  );
}
