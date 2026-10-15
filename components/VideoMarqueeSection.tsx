
"use client";

import React, { useRef } from "react";
import { Home, KeyRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoMarqueeSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const videoWrapper = videoWrapperRef.current;
      const video = videoRef.current;
      const ticker = tickerTrackRef.current;

      if (!container || !videoWrapper || !video || !ticker) return;

      // ============================================================
      // 1. CINEMATIC VIDEO REVEAL
      // ============================================================
      //
      // The entire video showcase starts at 50% scale.
      // As the section enters the viewport, it expands to 100%.
      //
      // 90% = section is just entering viewport
      // 20% = reveal is almost complete
      //
      // scrub: 1 makes the animation smoothly follow scrolling.
      // ============================================================

      gsap.fromTo(
        videoWrapper,
        {
          scale: 0.5,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // ============================================================
      // 2. SUBTLE VIDEO PARALLAX
      // ============================================================
      //
      // The video itself moves very slightly while scrolling.
      // This is intentionally subtle so it doesn't fight the
      // main scale reveal.
      // ============================================================

      gsap.fromTo(
        video,
        {
          scale: 1.08,
          yPercent: -3,
        },
        {
          scale: 1,
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // ============================================================
      // 3. BACKGROUND COLOR TRANSITION
      // ============================================================
      //
      // Smoothly transition the page into the dark visual section.
      // ============================================================

      gsap.to(document.body, {
        backgroundColor: "#121212",
        color: "#FFFFFF",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
        },
      });

      // ============================================================
      // 4. INFINITE MARQUEE
      // ============================================================
      //
      // Continuous horizontal movement.
      // The duplicated content creates a seamless loop.
      // ============================================================

      gsap.to(ticker, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      // ============================================================
      // 5. TOP ICON MICRO REVEAL
      // ============================================================
      //
      // The Home + Key icons subtly appear as the video enters.
      // ============================================================

      const topIcons = container.querySelectorAll(".video-top-icon");

      gsap.fromTo(
        topIcons,
        {
          opacity: 0,
          y: -15,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ============================================================
      // 6. MARQUEE TEXT REVEAL
      // ============================================================

      gsap.fromTo(
        ".video-marquee-text",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    {
      scope: containerRef,
    }
  );

  const phraseSet = [
    "with an initial payment from $25,000",
    "interest-free",
    "installment plan up to 5 years",
  ];

  return (
    <section
      ref={containerRef}
      className="
        video-marquee-section
        relative
        w-full
        py-6
        sm:py-10
        lg:py-12
        px-3
        sm:px-6
        lg:px-8
        bg-[#121212]
        text-white
        overflow-hidden
      "
    >
      <div className="max-w-[1600px] mx-auto w-full">

        {/* ============================================================
            VIDEO SHOWCASE
        ============================================================ */}

        <div
          ref={videoWrapperRef}
          className="
            relative
            w-full
            h-[520px]
            sm:h-[620px]
            lg:h-[720px]
            xl:h-[780px]
            rounded-3xl
            sm:rounded-[2.5rem]
            lg:rounded-[3rem]
            overflow-hidden
            shadow-2xl
            border
            border-white/10
            bg-[#0d0e12]
            flex
            items-center
            justify-center
            origin-center
            will-change-transform
          "
        >

          {/* ========================================================
              BACKGROUND VIDEO
          ======================================================== */}

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
              pointer-events-none
              will-change-transform
            "
          >
            <source
              src="/video/video1.mp4"
              type="video/mp4"
            />

            Your browser does not support the video tag.
          </video>

          {/* ========================================================
              CINEMATIC OVERLAY
          ======================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-black/25
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-transparent
              to-black/40
              pointer-events-none
            "
          />

          {/* ========================================================
              TOP CENTER ICONS
          ======================================================== */}

          <div
            className="
              absolute
              top-6
              sm:top-8
              left-1/2
              -translate-x-1/2
              z-20
              flex
              items-center
              gap-2.5
              pointer-events-none
            "
          >

            {/* Home */}

            <div
              className="
                video-top-icon
                h-8
                w-8
                sm:h-9
                sm:w-9
                rounded-full
                bg-black/55
                backdrop-blur-md
                border
                border-white/20
                text-white
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <Home className="h-4 w-4" />
            </div>

            {/* Key */}

            <div
              className="
                video-top-icon
                h-8
                w-8
                sm:h-9
                sm:w-9
                rounded-full
                bg-black/55
                backdrop-blur-md
                border
                border-white/20
                text-white
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <KeyRound className="h-4 w-4" />
            </div>

          </div>

          {/* ========================================================
              MARQUEE
          ======================================================== */}

          <div
            className="
              relative
              z-10
              w-full
              overflow-hidden
              pointer-events-none
              py-4
              select-none
              [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]
            "
          >

            <div
              ref={tickerTrackRef}
              className="
                flex
                items-center
                whitespace-nowrap
                will-change-transform
              "
            >

              {/* ====================================================
                  DUPLICATED CONTENT
              ==================================================== */}

              {Array.from({ length: 6 }).map((_, setIdx) => (
                <div
                  key={setIdx}
                  className="
                    flex
                    items-center
                    shrink-0
                  "
                >

                  {phraseSet.map((phrase, phraseIndex) => (
                    <div
                      key={phraseIndex}
                      className="
                        flex
                        items-center
                        shrink-0
                      "
                    >

                      {/* Text */}

                      <span
                        className="
                          video-marquee-text
                          text-2xl
                          sm:text-4xl
                          md:text-5xl
                          lg:text-[56px]
                          font-medium
                          text-white
                          tracking-tight
                          drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]
                        "
                      >
                        {phrase}
                      </span>

                      {/* Separator */}

                      <span
                        className="
                          inline-block
                          h-3
                          w-3
                          sm:h-4
                          sm:w-4
                          rounded-full
                          bg-white
                          mx-6
                          sm:mx-10
                          shrink-0
                          shadow-[0_0_12px_rgba(255,255,255,0.9)]
                        "
                      />

                    </div>
                  ))}

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}