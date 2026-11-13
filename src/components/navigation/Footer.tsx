"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Truck, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <footer className="bg-[#29251F] text-[#F7F1E8] border-t border-[#3d3830]">
      {/* 1. VIP Club Newsletter Row */}
      <div className="border-b border-[#3d3830] bg-[#221f1a] py-8 sm:py-14 w-full">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C28A42] font-semibold">
                DUPPAT Patron Circle
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                Receive 10% off your first handcrafted creation
              </h3>
              <p className="text-xs text-stone-400 mt-2 font-light max-w-md">
                Subscribers receive seasonal collection previews, artisan stories from Jaipur, and
                complimentary interior styling guides.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                {subscribed ? (
                  <div className="w-full py-3 px-5 rounded-md bg-[#541827] text-white text-xs font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C28A42]" />
                    <span>Welcome to the circle! Use code DUPPAT10 at checkout.</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/15 text-white placeholder:text-stone-400 text-xs focus:outline-none focus:border-[#C28A42]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-md bg-[#541827] hover:bg-[#661d2f] text-white font-medium text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shrink-0"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C28A42]" />
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Columns */}
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & Studio details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src="/assets/duppati_logo_clean.png"
                alt="DUPPATI"
                className="h-12 sm:h-16 w-auto object-contain bg-[#F7F1E8] px-3.5 py-1.5 rounded-md shadow-xs"
              />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
              Honoring traditional Indian craftsmanship with contemporary home comfort. Handblock
              printed bed covers, quilts, dohars, curtains, and pitloom flat-weave rugs curated for
              thoughtful homes.
            </p>
            <div className="text-xs text-stone-400 font-light space-y-1 pt-2">
              <p>📍 Studio: Sanganer Handblock Enclave, Jaipur 302029</p>
              <p>📞 Care: +91 98290 XXXXX • support@duppat.com</p>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C28A42] mb-4">
              Handcrafted Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 font-light">
              <li>
                <a href="#bestsellers" className="hover:text-[#C28A42] transition">
                  King & Super King Bed Covers
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-[#C28A42] transition">
                  Slub Cotton Pillow Shams
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-[#C28A42] transition">
                  Summer Mulmul Dohars & Quilts
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-[#C28A42] transition">
                  Hand-Knotted Dhurries & Rugs
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-[#C28A42] transition">
                  Semi-Sheer Door Curtains
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Sanctuary */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C28A42] mb-4">
              Customer Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 font-light">
              <li>
                <a href="#shipping" className="hover:text-[#C28A42] transition">
                  Track via Shiprocket Express
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-[#C28A42] transition">
                  7-Day Doorstep Returns Policy
                </a>
              </li>
              <li>
                <a href="#care" className="hover:text-[#C28A42] transition">
                  Pure Cotton Fabric Care Guide
                </a>
              </li>
              <li>
                <a href="#craft-story" className="hover:text-[#C28A42] transition">
                  Jaipur Artisan Collective Fair Wage
                </a>
              </li>
            </ul>
          </div>

          {/* Third-party verified partners */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C28A42] mb-4">
              Verified Partners
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="p-3 rounded-md bg-white/5 border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C28A42] shrink-0" />
                <div>
                  <p className="text-white font-medium text-[11px]">Razorpay Payment Gateway</p>
                  <p className="text-[10px] text-stone-400 font-light">
                    UPI, RuPay, Visa, Master, COD
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-md bg-white/5 border border-white/10 flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#C28A42] shrink-0" />
                <div>
                  <p className="text-white font-medium text-[11px]">Shiprocket Logistics</p>
                  <p className="text-[10px] text-stone-400 font-light">
                    Pan-India 29,000+ Pincodes Air Express
                  </p>
                </div>
              </div>

              {/* Client Demo & Costs Quick Link */}
              <Link
                href="/client-demo"
                className="p-3 rounded-md bg-[#541827]/40 hover:bg-[#541827] border border-[#C28A42]/30 flex items-center justify-between text-[#E6C687] text-xs font-semibold transition group cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
                  Client Demo & Cost Architecture
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Copyright */}
        <div className="mt-14 pt-8 border-t border-[#3d3830] text-xs text-stone-500 font-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 DUPPAT Cozy Homezzz India Private Limited. All rights reserved.</p>
          <p className="text-stone-400 text-[11px]">
            Jaipur • New Delhi • Mumbai • Hyderabad • Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
