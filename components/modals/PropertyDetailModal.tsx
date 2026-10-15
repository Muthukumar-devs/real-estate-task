"use client";

import React, { useEffect, useRef } from "react";
import { X, Bed, Bath, Maximize2, MapPin, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Property } from "@/data/mockData";
import { lenisInstance } from "@/hooks/useLenis";

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
  onOpenConsultation,
}: PropertyDetailModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!property) return;

    // Stop Lenis so it doesn't intercept wheel events inside the modal
    lenisInstance?.stop();

    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    return () => {
      // Resume Lenis when modal closes
      lenisInstance?.start();
    };
  }, [property]);

  if (!property) return null;

  return (
    /* Outer overlay — fixed, covers full screen */
    <div className="fixed inset-0 z-[9998]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Scroll wrapper — data-lenis-prevent stops Lenis intercepting scroll here */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain modal-scroll"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Inner centering shell */}
        <div className="flex min-h-full items-start justify-center p-4 sm:p-6 py-8">

          {/* Modal card */}
          <div className="relative w-full max-w-4xl rounded-[2.5rem] bg-[#121212] border border-white/10 text-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/90 transition-colors border border-white/20"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Hero image */}
            <div className="relative h-64 sm:h-80 w-full shrink-0">
              <Image
                src={property.imageUrl}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/20 to-black/30" />
              <div className="absolute bottom-5 left-6 sm:left-8 pr-14">
                <span className="rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs uppercase tracking-widest text-white border border-white/30">
                  {property.category}
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-light tracking-tight text-white leading-tight">
                  {property.title}
                </h2>
                <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                  <MapPin className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">Offered Price</span>
                  <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-light text-white">{property.priceUSD}</span>
                    <span className="text-sm font-medium text-neutral-400">{property.priceAED}</span>
                  </div>
                </div>
                <button
                  onClick={() => { onClose(); onOpenConsultation(); }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black hover:bg-neutral-200 transition-colors shrink-0"
                >
                  Schedule Private Viewing
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Bed className="h-4 w-4" />, label: "Bedrooms", value: `${property.beds} Suites` },
                  { icon: <Bath className="h-4 w-4" />, label: "Bathrooms", value: `${property.baths} Bathrooms` },
                  { icon: <Maximize2 className="h-4 w-4" />, label: "Total Area", value: `${property.areaSqft.toLocaleString()} Sq.Ft` },
                  { icon: <TrendingUp className="h-4 w-4" />, label: "Projected ROI", value: property.roi || "Prime Yield" },
                ].map((spec) => (
                  <div key={spec.label} className="rounded-2xl bg-neutral-900/80 p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-400 text-[10px] uppercase tracking-wider mb-1.5">
                      {spec.icon} {spec.label}
                    </div>
                    <div className="text-base sm:text-lg font-light text-white leading-tight">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 pt-2">Residence Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-neutral-300">
                  {[
                    "Private elevator access with biometric security",
                    "Designer Italian marble finishes & Poliform kitchens",
                    "Expansive sunset terrace with private infinity plunge pool",
                    "24/7 dedicated butler & valet parking allocation",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer badge */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-neutral-300 shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-300">
                    <span className="font-semibold text-white">Full Freehold Title: </span>
                    Guaranteed 10-Year Golden Visa eligibility with this acquisition.
                  </div>
                </div>
                {property.handover && (
                  <span className="text-xs text-neutral-400 shrink-0 whitespace-nowrap">
                    Handover: {property.handover}
                  </span>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
