"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, Mail } from "lucide-react";

interface FooterAndPartnersProps {
  onOpenConsultation: () => void;
  onOpenCatalog: () => void;
}

export default function FooterAndPartners({ onOpenConsultation, onOpenCatalog }: FooterAndPartnersProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "center center"],
  });

  const ctaScale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Closing CTA Block */}
      <div className="bg-[#ffffff] px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <motion.div
          ref={ctaRef}
          style={{ scale: ctaScale, opacity: ctaOpacity }}
          className="relative w-full h-[450px] sm:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center text-center p-6 sm:p-12"
        >
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1400&auto=format&fit=crop"
            alt="Two luxury real estate consultants reviewing architectural documents"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
          <div className="relative z-10 max-w-2xl flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-400 mb-3">
              Al Monte • Dubai
            </span>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Built Your Future With Us
            </h2>
          </div>
        </motion.div>
      </div>

      {/* ── FOOTER ── cream #F0F0C2 background */}
      <div className="bg-[#F0F0C2] text-[#1a1a1a]">

        {/* Top section: 3 columns */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-10 grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex items-end gap-[2px] h-5">
                <span className="w-[2px] h-2.5 bg-[#1a1a1a] rounded-full" />
                <span className="w-[2px] h-[18px] bg-[#1a1a1a] rounded-full" />
                <span className="w-[2px] h-5 bg-[#1a1a1a] rounded-full" />
                <span className="w-[2px] h-3 bg-[#1a1a1a] rounded-full" />
                <span className="w-[2px] h-1.5 bg-[#1a1a1a] rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-light tracking-[0.25em] uppercase text-[#1a1a1a] leading-none">Monte</span>
                <span className="text-[7px] uppercase tracking-[0.35em] text-[#1a1a1a]/50 font-medium -mt-0.5">Real Estate</span>
              </div>
            </a>
            <p className="text-sm text-[#1a1a1a]/70 leading-relaxed max-w-[220px]">
              Building Your Dreams In Real Estate
            </p>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#1a1a1a]/50 font-medium">
              Quick Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", href: "#" },
                { label: "Our Properties", href: "#portfolio" },
                { label: "Our Advantages", href: "#advantages" },
                { label: "Our Services", href: "#solutions" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[15px] font-medium text-[#1a1a1a] hover:text-[#1a1a1a]/60 transition-colors leading-none"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Founder + CTA */}
          <div className="flex flex-col gap-5">
            {/* Founder pill */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#1a1a1a]/15 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  alt="Ethan Thompson"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] text-[#1a1a1a]/50 uppercase tracking-wider">Monte Founder</p>
                <p className="text-sm font-semibold text-[#1a1a1a]">Ethan Thompson</p>
              </div>
            </div>

            <p className="text-[22px] font-light text-[#1a1a1a] leading-snug max-w-[260px]">
              We are here to change your future.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="rounded-full bg-[#1a1a1a] text-[#F0F0C2] px-5 py-2.5 text-xs font-semibold tracking-wide hover:bg-[#333] transition-colors cursor-pointer"
              >
                Contact Us
              </button>
              <a
                href="mailto:info@monterealestate.ae"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a]/10 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1a1a1a]/20 text-[#1a1a1a] hover:bg-[#1a1a1a]/10 transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="border-t border-[#1a1a1a]/10" />
        </div>

        {/* Bottom section: subscribe + map + legal */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Subscribe */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-semibold text-[#1a1a1a]">Subscribe to our news</h4>
            <p className="text-xs text-[#1a1a1a]/55 leading-relaxed max-w-[240px]">
              Stay Informed and Never Miss a Beat: Subscribe to Our Exclusive News Updates!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mt-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-[#1a1a1a]/30 pb-2 text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
              <button
                type="submit"
                className="self-start rounded-full bg-[#1a1a1a] text-[#F0F0C2] px-6 py-2.5 text-xs font-semibold tracking-wide hover:bg-[#333] transition-colors cursor-pointer"
              >
                {newsletterSuccess ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Map thumbnail + address */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full h-[130px] rounded-2xl overflow-hidden border border-[#1a1a1a]/10">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=55.13%2C25.07%2C55.17%2C25.09&layer=mapnik&marker=25.080%2C55.150"
                className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                title="Office Location"
              />
            </div>
            <div className="text-xs text-[#1a1a1a]/70 leading-relaxed">
              <p className="font-medium text-[#1a1a1a]">123 Zayed Road,</p>
              <p>Dubai Marina,</p>
              <p>Dubai, United Arab Emirates</p>
            </div>
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <p className="text-xs text-[#1a1a1a]/50">
              Copyright 2023 © Golden Gate Properties
            </p>
            <div className="flex items-center gap-4 md:justify-end">
              <a href="#" className="text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors">
                Terms Of Service
              </a>
              <a href="#" className="text-xs text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
