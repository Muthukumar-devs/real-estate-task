"use client";

import React, { useState, useRef } from "react";
import {
  ArrowUpRight,
  Home,
  KeyRound,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

const logos = [
  { src: "/logo/logo1.png", alt: "DAMAC" },
  { src: "/logo/logo2.png", alt: "EMAAR" },
  { src: "/logo/logo3.png", alt: "NAKHEEL" },
  { src: "/logo/logo4.png", alt: "SOBHA" },
  { src: "/logo/logo5.png", alt: "MERAAS" },
  { src: "/logo/logo6.png", alt: "Developer logo 6" },
  { src: "/logo/logo7.png", alt: "Developer logo 7" },
  { src: "/logo/logo8.png", alt: "Developer logo 8" },
];
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =========================================================
   TYPES
========================================================= */

interface GalleryCardItem {
  number?: string;
  title?: string;
  imageUrl: string;
  heightClass: string;
}

interface MasonryGalleryProps {
  onCategorySelect?: (catTitle: string) => void;
  onOpenConsultation: () => void;
}

/* =========================================================
   PARALLAX IMAGE
========================================================= */

function ParallaxGalleryImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-15%", "15%"]
  );

  return (
    <div
      ref={imageRef}
      className="
        absolute
        inset-0
        overflow-hidden
      "
    >
      <motion.div
        style={{
          y: imageY,
        }}
        className="
          absolute
          left-0
          right-0
          -top-[6%]
          -bottom-[6%]
          will-change-transform
        "
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            20vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.05]
          "
        />
      </motion.div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MasonryGallery({
  onOpenConsultation,
}: MasonryGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const partnersTrackRef = useRef<HTMLDivElement>(null);

  const [openFaqIndex, setOpenFaqIndex] =
    useState<number | null>(0);

  /* =======================================================
     FAQ
  ======================================================= */

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) =>
      current === index ? null : index
    );
  };

  /* =======================================================
     GSAP
  ======================================================= */

  useGSAP(
    () => {
      const cards =
        gsap.utils.toArray<HTMLElement>(
          ".masonry-item"
        );

      /* =====================================================
         CARD REVEAL

         IMPORTANT:
         Do NOT animate height.

         We animate clip-path instead.

         This prevents:
         - layout jumps
         - masonry reflow
         - offsetHeight problems
         - repeated animations
      ===================================================== */

      cards.forEach((card) => {
        gsap.set(card, {
          clipPath: "inset(100% 0% 0% 0%)",
          opacity: 1,
          y: 30,
        });

        gsap.to(card, {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,

          duration: 1.1,

          ease: "power3.out",

          scrollTrigger: {
            trigger: card,

            start: "top 88%",

            once: true,

            toggleActions:
              "play none none none",
          },
        });
      });

      /* =====================================================
         PARTNER MARQUEE
      ===================================================== */

      if (partnersTrackRef.current) {
        gsap.to(
          partnersTrackRef.current,
          {
            xPercent: -50,

            duration: 22,

            ease: "none",

            repeat: -1,
          }
        );
      }
    },
    {
      scope: containerRef,

      dependencies: [],
    }
  );

  /* =======================================================
     COLUMN 1
  ======================================================= */

  const col1Cards: GalleryCardItem[] = [
    {
      number: "01",
      title: "Luxury Villas",
      imageUrl:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[240px] sm:h-[280px] lg:h-[300px]",
    },

    {
      number: "06",
      title: "Commercial Spaces",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[260px] sm:h-[300px] lg:h-[320px]",
    },
  ];

  /* =======================================================
     COLUMN 2
  ======================================================= */

  const col2Cards: GalleryCardItem[] = [
    {
      number: "02",
      title: "Penthouse Suites",
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[360px] sm:h-[420px] lg:h-[450px]",
    },

    {
      number: "07",
      title: "Townhouses",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[240px] sm:h-[280px] lg:h-[290px]",
    },

    {
      imageUrl:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[190px] sm:h-[220px] lg:h-[240px]",
    },
  ];

  /* =======================================================
     COLUMN 3
  ======================================================= */

  const col3Cards: GalleryCardItem[] = [
    {
      number: "03",
      title: "Apartments",
      imageUrl:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[280px] sm:h-[320px] lg:h-[340px]",
    },

    {
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[230px] sm:h-[260px] lg:h-[280px]",
    },

    {
      number: "08",
      title: "Waterfront Homes",
      imageUrl:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[250px] sm:h-[290px] lg:h-[310px]",
    },
  ];

  /* =======================================================
     COLUMN 4
  ======================================================= */

  const col4Cards: GalleryCardItem[] = [
    {
      number: "04",
      title: "Beachfront Properties",
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[360px] sm:h-[420px] lg:h-[450px]",
    },

    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[230px] sm:h-[260px] lg:h-[280px]",
    },

    {
      number: "11",
      title: "Holiday Homes",
      imageUrl:
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[210px] sm:h-[240px] lg:h-[260px]",
    },
  ];

  /* =======================================================
     COLUMN 5
  ======================================================= */

  const col5Cards: GalleryCardItem[] = [
    {
      number: "05",
      title: "Golf Course Residences",
      imageUrl:
        "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[360px] sm:h-[410px] lg:h-[440px]",
    },

    {
      number: "12",
      title: "Desert Retreats",
      imageUrl:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
      heightClass:
        "h-[250px] sm:h-[290px] lg:h-[310px]",
    },
  ];

  /* =======================================================
     FAQ
  ======================================================= */

  const faqs = [
    {
      question:
        "What types of properties do we offer in Dubai?",

      answer:
        "At Monte, our curated portfolio features ultra-luxury penthouses, private beachfront villas, golf course residences, townhouses, and trophy commercial spaces across Dubai's most prestigious freehold locations including Palm Jumeirah, Downtown Dubai, Dubai Marina, and Dubai Hills Estate.",
    },

    {
      question:
        "What are the payment options available for purchasing a property?",

      answer:
        "We arrange flexible developer installment plans ranging from 3 to 7 years with initial payments starting from 10% to 20%. Payments can be made via verified bank wire transfers, UAE local mortgages, or compliant digital asset solutions.",
    },

    {
      question:
        "Can foreign nationals buy property in Dubai?",

      answer:
        "Yes, 100%. Under Dubai Law No. 7 of 2006, foreign buyers and non-residents enjoy 100% freehold ownership rights in all designated prime zones with complete title deeds registered directly with the Dubai Land Department.",
    },

    {
      question:
        "What is the process for obtaining a residency visa through property investment?",

      answer:
        "Purchasing property of AED 2,000,000 (~$545,000) or more grants full eligibility for the 10-Year renewable UAE Golden Visa for you, your spouse, children, and domestic staff. Our private client team oversees the entire expedited application process within 7 to 10 working days.",
    },
  ];

  /* =======================================================
     CARD RENDER
  ======================================================= */

  const renderCard = (
    card: GalleryCardItem,
    index: number
  ) => {
    return (
      <div
        key={index}
        onClick={onOpenConsultation}
        className={`
          masonry-item
          group
          relative
          w-full

          ${card.heightClass}

          rounded-2xl
          sm:rounded-3xl

          overflow-hidden

          bg-neutral-100

          border
          border-neutral-200/80

          shadow-xs
          hover:shadow-xl

          transition-shadow
          duration-500

          cursor-pointer

          will-change-[clip-path,transform]
        `}
      >
        {/* =================================================
            IMAGE
        ================================================= */}

        <ParallaxGalleryImage
          src={card.imageUrl}
          alt={
            card.title ||
            "Dubai Luxury Property"
          }
        />

        {/* =================================================
            GRADIENT
        ================================================= */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/75
            via-black/20
            to-transparent

            pointer-events-none

            z-10
          "
        />

        {/* =================================================
            ARROW
        ================================================= */}

        <div
          className="
            absolute
            top-3.5
            right-3.5

            sm:top-4
            sm:right-4

            z-20
          "
        >
          <div
            className="
              flex
              h-8
              w-8

              sm:h-9
              sm:w-9

              items-center
              justify-center

              rounded-full

              bg-white/80

              backdrop-blur-md

              text-[#111111]

              border
              border-white/60

              shadow-xs

              transition-all
              duration-300

              group-hover:rotate-45
              group-hover:bg-white
              group-hover:scale-105
            "
          >
            <ArrowUpRight
              className="h-4 w-4"
            />
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        {(card.title || card.number) && (
          <div
            className="
              absolute
              bottom-3.5
              left-3.5

              sm:bottom-4
              sm:left-4

              z-20

              pr-4
            "
          >
            {card.number && (
              <span
                className="
                  inline-block

                  text-[10px]
                  sm:text-[11px]

                  font-semibold

                  text-white/95

                  bg-white/20

                  backdrop-blur-md

                  px-2
                  py-0.5

                  rounded-full

                  mb-1

                  border
                  border-white/20
                "
              >
                {card.number}
              </span>
            )}

            {card.title && (
              <h3
                className="
                  text-sm
                  sm:text-base

                  font-medium

                  text-white

                  tracking-tight

                  leading-snug

                  drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                "
              >
                {card.title}
              </h3>
            )}
          </div>
        )}
      </div>
    );
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="
        relative

        bg-[#F0F0C2]
        text-[#111111]

        py-20
        sm:py-28

        px-4
        sm:px-6
        lg:px-8

        border-t
        border-[#d8d8a8]

        overflow-hidden
      "
    >
      <div
        className="
          max-w-[1600px]
          mx-auto
          w-full
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative

            flex
            items-center
            justify-center

            text-center

            mb-12
            sm:mb-16
          "
        >
          <h2
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl

              font-medium

              tracking-tight

              text-[#1a1a1a]

              leading-tight
            "
          >
           <motion.span   initial="hidden"
                whileInView="visible" className="relative ">Discover Your Ideal<motion.span
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
                 bg-[#F0F0C2]
                 pointer-events-none
               "
             /></motion.span> 
            <br />
           <motion.span initial="hidden"
                whileInView="visible" className="relative ">Property Type<motion.span
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
                 bg-[#F0F0C2]
                 pointer-events-none
               "
             /></motion.span> 
          </h2>

          <div
            className="
              absolute
              right-0
              top-1/2

              -translate-y-1/2

              hidden
              md:flex

              items-center
              gap-2
            "
          >
            <button
              onClick={onOpenConsultation}
              title="Overview"
              className="
                h-9
                w-9

                rounded-xl

                border
                border-[#1a1a1a]/15

                bg-[#e8e8b0]

                hover:bg-[#d8d8a0]

                flex
                items-center
                justify-center

                text-[#1a1a1a]/60

                hover:text-[#1a1a1a]

                transition-colors

                cursor-pointer
              "
            >
              <Home className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenConsultation}
              title="Key Access"
              className="
                h-9
                w-9

                rounded-xl

                border
                border-[#1a1a1a]/15

                bg-[#e8e8b0]

                hover:bg-[#d8d8a0]

                flex
                items-center
                justify-center

                text-[#1a1a1a]/60

                hover:text-[#1a1a1a]

                transition-colors

                cursor-pointer
              "
            >
              <KeyRound className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* =================================================
            MASONRY GRID
        ================================================= */}

        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5

            gap-4
            lg:gap-5

            items-start
          "
        >
          {/* COLUMN 1 */}

          <div
            className="
              flex
              flex-col

              gap-4
              lg:gap-5

              w-full

              lg:pt-16
              xl:pt-20
            "
          >
            {col1Cards.map(renderCard)}
          </div>

          {/* COLUMN 2 */}

          <div
            className="
              flex
              flex-col

              gap-4
              lg:gap-5

              w-full
            "
          >
            {col2Cards.map(renderCard)}
          </div>

          {/* COLUMN 3 */}

          <div
            className="
              flex
              flex-col

              gap-4
              lg:gap-5

              w-full

              lg:pt-8
              xl:pt-10
            "
          >
            {col3Cards.map(renderCard)}
          </div>

          {/* COLUMN 4 */}

          <div
            className="
              flex
              flex-col

              gap-4
              lg:gap-5

              w-full
            "
          >
            {col4Cards.map(renderCard)}
          </div>

          {/* COLUMN 5 */}

          <div
            className="
              flex
              flex-col

              gap-4
              lg:gap-5

              w-full

              lg:pt-16
              xl:pt-20
            "
          >
            {col5Cards.map(renderCard)}
          </div>
        </div>

        {/* =================================================
            SKYLINE
        ================================================= */}

        <div
          className="
            flex
            items-end
            justify-center

            gap-[3px]

            h-7

            mx-auto

            mt-16
            sm:mt-24

            mb-8

            select-none
          "
        >
          <span className="w-[2.5px] h-3.5 bg-[#1a1a1a]/30 rounded-full" />
          <span className="w-[2.5px] h-6 bg-[#1a1a1a]/50 rounded-full" />
          <span className="w-[2.5px] h-7 bg-[#1a1a1a] rounded-full" />
          <span className="w-[2.5px] h-[18px] bg-[#1a1a1a]/50 rounded-full" />
          <span className="w-[2.5px] h-2.5 bg-[#1a1a1a]/30 rounded-full" />
        </div>

        {/* =================================================
            PARTNERS
        ================================================= */}

        <div
          className="
            text-center

            mb-16
            sm:mb-24

            overflow-hidden
          "
        >
          <span
            className="
              text-xs
              sm:text-sm

              font-medium

              tracking-[0.2em]

              text-[#1a1a1a]/50

              uppercase

              block

              mb-8
              sm:mb-10
            "
          >
            Our valued partners
          </span>

          <div
            className="
              relative
              w-full
              overflow-hidden

              [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
            "
          >
            <div
              ref={partnersTrackRef}
              className="
                flex
                items-center

                whitespace-nowrap

                will-change-transform

                py-3

                select-none
              "
            >
          
{Array.from({ length: 4 }).map((_, setIdx) => (
  <div
    key={setIdx}
    className="
      flex items-center gap-14 sm:gap-20 lg:gap-28
      shrink-0 pr-14 sm:pr-20 lg:pr-28
    "
  >
    {[...logos,...logos].map((logo, logoIdx) => (
      <div
        key={`${setIdx}-${logoIdx}`}
        className="relative h-10 w-28 sm:h-12 sm:w-36 lg:h-20 lg:w-40 shrink-0"
      >
        <Image
          src={logo.src}
          alt={logo.alt}
fill
          quality={75}
          priority
          sizes="180px"
          className="object-contain hover:scale-110 transition-all duration-300 ease-in brightness-0"
        />
      </div>
    ))}
  </div>
))}

            </div>
          </div>
        </div>

        {/* =================================================
            FAQ
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1

            lg:grid-cols-12

            gap-10
            sm:gap-14

            items-start

            pt-6

            border-t
            border-[#1a1a1a]/10
          "
        >
          {/* LEFT */}

          <div
            className="
              lg:col-span-5

              pr-0
              lg:pr-8
            "
          >
            <div
              className="
                flex
                items-center
                gap-2

                mb-3
              "
            >
              <span
                className="
                  h-2
                  w-2

                  rounded-full

                  bg-[#1a1a1a]
                "
              />

              <span
                className="
                  text-xs

                  uppercase

                  tracking-[0.25em]

                  font-medium

                  text-[#1a1a1a]/50
                "
              >
                Explore Our Advantages
              </span>
            </div>

            <h2
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl

                font-medium

                tracking-tight

                text-[#1a1a1a]

                leading-tight

                mb-4
              "
            >
              Frequent Asked Questions
            </h2>

            <p
              className="
                text-sm
                sm:text-base

                text-[#1a1a1a]/55

                font-light

                leading-relaxed

                max-w-md
              "
            >
              At Monte, we offer more than
              just real estate services, we
              provide an unparalleled
              experience tailored to meet
              your needs and exceed your
              expectations.
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              lg:col-span-7

              bg-[#FAFAF5]

              rounded-3xl

              border
              border-[#1a1a1a]/10

              p-6
              sm:p-8
            "
          >
            {faqs.map(
              (faq, index) => {
                const isOpen =
                  openFaqIndex === index;

                return (
                  <div
                    key={index}
                    className="
                      border-b
                      border-[#1a1a1a]/10

                      last:border-b-0

                      py-4
                      sm:py-5

                      first:pt-2
                      last:pb-2
                    "
                  >
                    <button
                      onClick={() =>
                        toggleFaq(index)
                      }
                      className="
                        w-full

                        flex
                        items-center
                        justify-between

                        text-left

                        gap-4

                        group

                        cursor-pointer
                      "
                      aria-expanded={isOpen}
                    >
                      <span
                        className="
                          text-sm
                          sm:text-base

                          font-medium

                          text-[#1a1a1a]

                          group-hover:text-[#1a1a1a]/60

                          transition-colors
                        "
                      >
                        {faq.question}
                      </span>

                      <span
                        className="
                          text-lg

                          text-[#1a1a1a]/40

                          group-hover:text-[#1a1a1a]

                          transition-colors

                          font-light

                          shrink-0
                        "
                      >
                        {isOpen
                          ? "−"
                          : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <p
                        className="
                          mt-3

                          text-xs
                          sm:text-sm

                          text-[#1a1a1a]/60

                          font-light

                          leading-relaxed

                          animate-in
                          fade-in
                          duration-200
                        "
                      >
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}