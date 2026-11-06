"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function FeaturedCollectionBanner({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-[#F7F1E8] border-b border-[#E5DDD0] w-full">
      <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative rounded-lg overflow-hidden bg-white border border-[#E5DDD0] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Editorial Campaign Imagery */}
            <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-stone-100">
              <img
                src="/assets/bedcovers/charcoal-floral-montage.png"
                alt="Studio Handblock Collection"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#541827] text-[#F7F1E8] px-2.5 sm:px-3.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm">
                Limited Studio Edition
              </div>
            </div>

            {/* Campaign Narrative & Action */}
            <div className="lg:col-span-5 p-4 sm:p-8 lg:p-14 flex flex-col justify-between h-full bg-white">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C28A42]">
                  Featured Campaign
                </span>

                <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-[#29251F] mt-1 sm:mt-2 mb-2 sm:mb-4 leading-snug">
                  Warmth, Heritage & <br />
                  <span className="italic text-[#541827]">Everyday Comfort</span>
                </h2>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light mb-3 sm:mb-6">
                  Each piece in our Studio Essentials series takes over two weeks to hand-print
                  and quilt. Layered with soft carded cotton and bound in pure unbleached mulmul,
                  they offer breathable insulation that softens gracefully with every wash.
                </p>

                <div className="space-y-2 sm:space-y-3 pt-2 border-t border-[#E5DDD0] mb-4 sm:mb-8 text-xs text-stone-700 font-light">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#541827]" />
                    <span>Teakwood handblock printed by master textile artisans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#541827]" />
                    <span>Pure carded cotton batting — 100% natural and breathable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#541827]" />
                    <span>Skin-safe non-toxic natural and mineral dyes</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={onExplore}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-md bg-[#541827] hover:bg-[#43121e] text-white font-medium text-xs tracking-wider uppercase transition shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore the Campaign</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
