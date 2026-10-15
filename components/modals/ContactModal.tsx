"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Phone, Mail, Building2 } from "lucide-react";
import { lenisInstance } from "@/hooks/useLenis";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export default function ContactModal({ isOpen, onClose, defaultTopic = "Private Consultation" }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "$3M - $7M",
    propertyType: "Penthouse / Luxury Residence",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      lenisInstance?.stop();
    } else {
      lenisInstance?.start();
    }
    return () => { lenisInstance?.start(); };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep open to show success, user can close
    }, 2500);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9998]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleResetAndClose}
      />
      {/* Modal Dialog */}
      <div
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain modal-scroll"
      >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 py-8">
      <div className="relative w-full max-w-2xl rounded-[2.5rem] bg-[#121212] border border-white/10 text-white shadow-2xl p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/20">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">Request Received</span>
            <h3 className="text-3xl font-light tracking-tight text-white mb-3">
              Consultation Scheduled
            </h3>
            <p className="max-w-md text-sm text-neutral-400 mb-8 leading-relaxed">
              Thank you, {formData.name || "esteemed client"}. Our Senior Private Client Advisor for Dubai Luxury Properties will reach out to you within 2 hours.
            </p>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-xs text-neutral-300 flex items-center gap-3 max-w-md w-full mb-8">
              <ShieldCheck className="h-5 w-5 text-neutral-400 shrink-0" />
              <span>Direct RERA-licensed advisor assignment • Confidential NDA assured</span>
            </div>
            <button
              onClick={handleResetAndClose}
              className="rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-neutral-200 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                  Private Client Office • Dubai
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                Book a Consultation With Our Expert
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Discreet off-market advice, portfolio structuring, and Golden Visa concierge.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Alexander Wright"
                    className="w-full rounded-2xl bg-neutral-900 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 000 0000"
                      className="w-full rounded-2xl bg-neutral-900 border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@luxuryholding.com"
                      className="w-full rounded-2xl bg-neutral-900 border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Target Investment Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded-2xl bg-neutral-900 border border-white/10 px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
                  >
                    <option value="$1M - $3M">$1,000,000 – $3,000,000 USD</option>
                    <option value="$3M - $7M">$3,000,000 – $7,000,000 USD</option>
                    <option value="$7M - $15M">$7,000,000 – $15,000,000 USD</option>
                    <option value="$15M+">$15,000,000+ USD (Ultra-Prime Mansions)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Primary Interest
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Penthouses", "Villas & Mansions", "Off-Plan ROI", "Golden Visa"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFormData({ ...formData, propertyType: item })}
                      className={`rounded-xl px-3 py-2 text-xs font-medium border text-center transition-all ${
                        formData.propertyType === item
                          ? "bg-white text-black border-white"
                          : "bg-neutral-900 text-neutral-300 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Specific Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Preferred locations (e.g. Palm Jumeirah, Downtown, Creek Harbour), desired view or timeline..."
                  className="w-full rounded-2xl bg-neutral-900 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-[11px] text-neutral-400 hidden sm:inline flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 inline text-neutral-400" />
                  RERA License No. 49201 • Dubai
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-neutral-200 transition-all hover:gap-3"
                >
                  Confirm Consultation
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  );
}
