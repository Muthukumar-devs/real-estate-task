"use client";

import React, { useState, useEffect } from "react";
import { X, Download, FileText, CheckCircle, ArrowDownToLine, Sparkles } from "lucide-react";
import { lenisInstance } from "@/hooks/useLenis";

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogModal({ isOpen, onClose }: CatalogModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("exclusive-portfolio");
  const [clientEmail, setClientEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      lenisInstance?.stop();
    } else {
      lenisInstance?.start();
    }
    return () => { lenisInstance?.start(); };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1500);
  };

  const handleClose = () => {
    setDownloading(false);
    setDownloaded(false);
    onClose();
  };

  const catalogs = [
    {
      id: "exclusive-portfolio",
      title: "Al Monte Exclusive Portfolio 2026/2027",
      size: "48 Pages • 24.5 MB",
      badge: "Flagship Edition",
      desc: "Complete dossier of off-market penthouses, Palm Jumeirah signature villas, and high-ROI Creek developments.",
    },
    {
      id: "golden-visa-guide",
      title: "Dubai Golden Visa & RERA Investor Manual",
      size: "18 Pages • 8.2 MB",
      badge: "Regulatory Guide",
      desc: "Legal step-by-step path to the 10-Year UAE Golden Visa, tax benefits, and escrow account protections.",
    },
    {
      id: "smart-ownership-matrix",
      title: "Path to Smart Ownership: 5-Year Installment Matrix",
      size: "12 Pages • 6.4 MB",
      badge: "Financial Models",
      desc: "Exact breakdown of the 10% down, 5-year post-handover installment plans, and 15% net yield forecasts.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[9998]">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      />
      <div
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain modal-scroll"
      >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 py-8">
      <div className="relative w-full max-w-xl rounded-[2.5rem] bg-[#121212] border border-white/10 text-white shadow-2xl p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {downloaded ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/20 text-emerald-400">
              <CheckCircle className="h-10 w-10" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">Direct Access Ready</span>
            <h3 className="text-2xl sm:text-3xl font-light text-white mb-3">
              Catalog Download Initiated
            </h3>
            <p className="max-w-md text-sm text-neutral-400 mb-6 leading-relaxed">
              The high-resolution dossier has been prepared for download and sent directly to <span className="text-white font-medium">{clientEmail || "your email"}</span>.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleClose}
                className="rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-neutral-200 transition-colors"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-neutral-400" />
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                  Instant Private Access
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                Download Official Catalog
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Receive confidential architectural plans, floor layouts, and financial returns.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {catalogs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedDoc(item.id)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                    selectedDoc === item.id
                      ? "bg-white/10 border-white text-white shadow-lg"
                      : "bg-neutral-900/60 border-white/5 text-neutral-400 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2.5">
                      <FileText className={`h-4 w-4 shrink-0 ${selectedDoc === item.id ? "text-white" : "text-neutral-500"}`} />
                      <span className="text-sm font-medium text-white">{item.title}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider rounded-full bg-white/10 px-2 py-0.5 text-neutral-300 shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 pl-6.5 leading-relaxed">{item.desc}</p>
                  <div className="mt-2 text-[11px] text-neutral-500 pl-6.5">{item.size}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Email for Instant Delivery (PDF)
                </label>
                <input
                  required
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="investor@familyoffice.com"
                  className="w-full rounded-2xl bg-neutral-900 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-white py-4 text-xs font-semibold uppercase tracking-widest text-black hover:bg-neutral-200 transition-all disabled:opacity-50"
              >
                {downloading ? (
                  <>
                    <ArrowDownToLine className="h-4 w-4 animate-bounce" />
                    Packaging Catalog PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Selected Catalog
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  );
}
