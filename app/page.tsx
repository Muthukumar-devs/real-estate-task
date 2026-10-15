"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoMarqueeSection from "@/components/VideoMarqueeSection";
import PortfolioSection from "@/components/PortfolioSection";
import StatsSection from "@/components/StatsSection";
import AccordionSection from "@/components/AccordionSection";
import CircleMerge from "@/components/CircleMerge";
import AdvantagesGrid from "@/components/AdvantagesGrid";
import MasonryGallery from "@/components/MasonryGallery";
import FooterAndPartners from "@/components/FooterAndPartners";
import ContactModal from "@/components/modals/ContactModal";
import CatalogModal from "@/components/modals/CatalogModal";
import PropertyDetailModal from "@/components/modals/PropertyDetailModal";
import LoadingScreen from "@/components/LoadingScreen";
import { Property } from "@/data/mockData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/hooks/useLenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useLenis();

  const advisoryRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    // Refresh ScrollTrigger after initial mount and images load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    // Parallax: Advisory section slides up (y: 60 → 0) as Portfolio scrolls out
    if (advisoryRef.current) {
      gsap.fromTo(
        advisoryRef.current,
        { y: 60 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: advisoryRef.current,
            start: "top bottom",
            end: "top 40%",
            scrub: 1.2,
          },
        }
      );
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const handleOpenCatalog = () => setIsCatalogOpen(true);
  const handleCloseCatalog = () => setIsCatalogOpen(false);

  const handleToggleNavbar = () => setIsNavbarOpen((prev) => !prev);
  const handleCloseNavbar = () => setIsNavbarOpen(false);

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleClosePropertyModal = () => {
    setSelectedProperty(null);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#121212] overflow-x-hidden selection:bg-[#121212] selection:text-white">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {/* 1. Navigation Header */}
      <Navbar
        onOpenConsultation={handleOpenContact}
        onOpenCatalog={handleOpenCatalog}
        isOpen={isNavbarOpen}
        onClose={handleCloseNavbar}
      />

      {/* 2. Hero Section */}
      <HeroSection
        onOpenConsultation={handleOpenContact}
        onOpenCatalog={handleOpenCatalog}
        onToggleNavbar={handleToggleNavbar}
        isNavbarOpen={isNavbarOpen}
        isLoading={isLoading}
      />

      {/* 3. Middle Video Showcase & Centered Marquee Section */}
      <VideoMarqueeSection />

      {/* 4. Dark Portfolio Section — sits on top (z-20) for the overlap transition */}
      <div className="relative z-20">
        <PortfolioSection
          onSelectProperty={handleSelectProperty}
          onOpenConsultation={handleOpenContact}
        />
      </div>

      {/* 5. Advisory & Stats — revealed from underneath as Portfolio slides up */}
      <div ref={advisoryRef} className="relative z-10 -mt-8 sm:-mt-10 will-change-transform">
        <StatsSection
          onOpenConsultation={handleOpenContact}
        />
      </div>

      {/* 6. Services Accordion Section (Dark Theme with white pill containers) */}
      <AccordionSection
        onOpenConsultation={handleOpenContact}
      />

      {/* 7. Path to Smart Ownership (Circle Merge Pinned Animation) */}
      <CircleMerge
        onOpenCatalog={handleOpenCatalog}
      />

      {/* 8. Advantages Grid ("Why Dubai Stands Unrivalled?") */}
      <AdvantagesGrid
        onOpenConsultation={handleOpenContact}
      />

      {/* 9. Property Type Masonry Gallery */}
      <MasonryGallery
        onOpenConsultation={handleOpenContact}
      />

      {/* 10. Footer & Partners */}
      <FooterAndPartners
        onOpenConsultation={handleOpenContact}
        onOpenCatalog={handleOpenCatalog}
      />

      {/* Interactive Luxury Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
      />

      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={handleCloseCatalog}
      />

      <PropertyDetailModal
        property={selectedProperty}
        onClose={handleClosePropertyModal}
        onOpenConsultation={handleOpenContact}
      />
    </main>
  );
}
