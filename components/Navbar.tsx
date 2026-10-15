"use client";

import React, { useState, useEffect } from "react";
import { User, Menu, X, ArrowUpRight, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenCatalog: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Navbar({
  onOpenConsultation,
  onOpenCatalog,
  isOpen = false,
  onClose,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive whether the mobile drawer should be open from the isOpen prop
  const isMobileDrawerOpen =
    mobileMenuOpen ||
    (isOpen && typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseAll = () => {
    setMobileMenuOpen(false);
    onClose?.();
  };


  return (
    <>
      {/* Sticky / Manually Toggled Glassmorphism Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-md py-3.5"
            : "-translate-y-full opacity-0 pointer-events-none py-3.5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: MONTE Logo */}
          <a
            href="#"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="flex items-end gap-[2px] h-5">
              <span className="w-[2px] h-2.5 bg-black dark:bg-white rounded-full" />
              <span className="w-[2px] h-4.5 bg-black dark:bg-white rounded-full" />
              <span className="w-[2px] h-5 bg-black dark:bg-white rounded-full" />
              <span className="w-[2px] h-3 bg-black dark:bg-white rounded-full" />
              <span className="w-[2px] h-1.5 bg-black dark:bg-white rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-light tracking-[0.25em] uppercase text-black dark:text-white">
                Monte
              </span>
              <span className="text-[7px] uppercase tracking-[0.35em] text-neutral-400 font-medium -mt-0.5">
                Real Estate
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-neutral-600 dark:text-neutral-300">
            <a
              href="#portfolio"
              onClick={handleCloseAll}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#stats"
              onClick={handleCloseAll}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Advisory
            </a>
            <a
              href="#solutions"
              onClick={handleCloseAll}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Solutions
            </a>
            <a
              href="#ownership"
              onClick={handleCloseAll}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Smart Ownership
            </a>
            <a
              href="#advantages"
              onClick={handleCloseAll}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Why Dubai
            </a>
            <a
              href="#gallery"
              onClick={handleCloseAll}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Gallery
            </a>
          </nav>

          {/* Right Elements */}
          <div className="flex items-center gap-3">
            {/* Catalog direct pill */}
            <button
              onClick={onOpenCatalog}
              className="hidden lg:flex items-center gap-1.5 rounded-full border border-black/15 dark:border-white/20 px-4 py-2 text-[11px] uppercase tracking-wider font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Catalog
              <ArrowUpRight className="h-3 w-3" />
            </button>

            {/* User profile / Contact trigger */}
            <button
              onClick={onOpenConsultation}
              title="Private Client Access"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-black dark:text-white hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
              aria-label="Private Client Access"
            >
              <User className="h-4 w-4" />
            </button>

            {/* Close button on desktop if navbar was toggled via hero button */}
            {isOpen && (
              <button
                onClick={handleCloseAll}
                title="Close Navigation Bar"
                aria-label="Close Navigation Bar"
                className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Hamburger Button for mobile */}
            <button
              onClick={() => {
                if (isMobileDrawerOpen) {
                  handleCloseAll();
                } else {
                  setMobileMenuOpen(true);
                }
              }}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl bg-[#121212] text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileDrawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 md:hidden bg-[#0e0e0e] text-white flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle grain overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')]" />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease: "easeOut" }}
              className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/8"
            >
              <div>
                <span className="text-xl font-light tracking-[0.2em] uppercase text-white">Monte</span>
                <span className="block text-[8px] uppercase tracking-[0.35em] text-neutral-500 mt-0.5">Real Estate</span>
              </div>
              <button
                onClick={handleCloseAll}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/8 border border-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Nav Links */}
            <nav className="flex flex-col px-6 py-8 gap-1 flex-1 justify-center">
              {[
                { href: "#portfolio", label: "Property Portfolio", index: 0 },
                { href: "#stats",     label: "Advisory & Team",     index: 1 },
                { href: "#solutions", label: "Tailored Solutions",  index: 2 },
                { href: "#ownership", label: "Path to Smart Ownership", index: 3 },
                { href: "#advantages",label: "Why Dubai Stands Unrivalled", index: 4 },
                { href: "#gallery",   label: "Collection Gallery",  index: 5 },
              ].map(({ href, label, index }) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={handleCloseAll}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.22 + index * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center justify-between py-4 border-b border-white/6 last:border-b-0"
                >
                  <span className="text-2xl font-light tracking-tight text-white group-hover:text-neutral-400 transition-colors duration-200">
                    {label}
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.07, duration: 0.35 }}
                    className="text-neutral-600 group-hover:text-neutral-300 transition-colors"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.span>
                </motion.a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 pb-10 pt-6 border-t border-white/8 space-y-3"
            >
              <button
                onClick={() => { handleCloseAll(); onOpenConsultation(); }}
                className="w-full rounded-full bg-white text-black py-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <PhoneCall className="h-4 w-4" />
                Contact Us Now
              </button>
              <button
                onClick={() => { handleCloseAll(); onOpenCatalog(); }}
                className="w-full rounded-full border border-white/15 text-white py-4 text-xs font-semibold uppercase tracking-widest hover:bg-white/8 transition-colors cursor-pointer"
              >
                Download Catalog
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
