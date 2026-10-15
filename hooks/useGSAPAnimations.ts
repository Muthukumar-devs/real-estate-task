"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for smooth video scale parallax on scroll
 */
export function useVideoParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | HTMLElement | null>
) {
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 1.15 },
        {
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, videoRef]);
}

/**
 * Hook for infinite marquee text animation with optional scroll velocity acceleration
 */
export function useInfiniteMarquee(
  containerRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLElement | null>,
  duration = 20
) {
  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      const loopTween = gsap.to(trackRef.current, {
        xPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
      });

      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity() / 300);
            gsap.to(loopTween, {
              timeScale: 1 + Math.min(velocity, 3.5),
              duration: 0.35,
              overwrite: "auto",
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, trackRef, duration]);
}

/**
 * Hook for coordinated scroll-triggered reveal of portfolio header & filter pill buttons
 */
export function usePortfolioHeaderReveal(
  sectionRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLElement | null>,
  filterBarRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Title slide up and fade in (y: 40, opacity: 0, duration: 0.8, ease: "power3.out")
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        );
      }

      // 2. Filter container slide in from right with slight stagger (x: 30, opacity: 0, duration: 0.6)
      if (filterBarRef.current) {
        tl.fromTo(
          filterBarRef.current,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          0.15
        );

        // Stagger individual filter pill buttons
        const pills = filterBarRef.current.querySelectorAll("button");
        if (pills.length > 0) {
          tl.fromTo(
            pills,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.4,
              ease: "power2.out",
            },
            0.25
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, titleRef, filterBarRef]);
}

/**
 * Hook for staggered grid entry of property cards (y: 80, opacity: 0, stagger: 0.2)
 */
export function usePortfolioGridReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  gridSelector = ".portfolio-grid",
  cardSelector = ".portfolio-card"
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(cardSelector);
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridSelector,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Card inner image parallax scrub
      const parallaxImgs = gsap.utils.toArray<HTMLElement>(".portfolio-parallax-img");
      parallaxImgs.forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(cardSelector) || img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, gridSelector, cardSelector]);
}
