"use client";

import React from "react";

export default function HeritageStory() {
  const steps = [
    {
      number: "01",
      title: "Teakwood Block Carving",
      description:
        "Master woodcarvers in Purani Basti, Jaipur hand-chisel intricate motifs into seasoned Sheesham teakwood.",
      image: "/assets/craft/artisan-stamp-craft.png",
    },
    {
      number: "02",
      title: "Botanical Plant Dyes",
      description:
        "Dried pomegranate rind for warm ochre, crushed indigo for royal blues, and iron rust for deep blacks.",
      image: "/assets/craft/blockprint-details.png",
    },
    {
      number: "03",
      title: "The Rhythmic Stamp",
      description:
        "Over 850 rhythmic stamps per bedsheet, aligned entirely by eye and seasoned generational intuition.",
      image: "/assets/craft/placemats-wood-craft.png",
    },
    {
      number: "04",
      title: "Thar Sun-Baked Setting",
      description:
        "River-washed in soft waters to clear excess pigments, then laid across sands to cure under desert sunshine.",
      image: "/assets/bedcovers/charcoal-floral-montage.png",
    },
  ];

  return (
    <section id="craft-story" className="py-12 sm:py-20 lg:py-24 bg-[#F7F1E8] border-b border-[#E5DDD0] w-full">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C28A42]">
              Living Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#29251F] mt-1">
              The Art of Slow Craft
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            Every piece from DUPPAT is crafted by hand across 14 generations of artisan lineage. We
            honor the slow, deliberate rhythm of authentic Indian textiles.
          </p>
        </div>

        {/* 2-column on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-md p-3.5 sm:p-6 border border-[#E5DDD0] flex flex-col justify-between hover:border-[#C28A42] transition-colors"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-3 sm:mb-4 bg-stone-100">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-xs bg-[#541827] text-white text-[9px] sm:text-[10px] font-mono font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif text-xs sm:text-lg font-normal text-[#29251F] mb-1 sm:mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-stone-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-stone-100 text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C28A42] font-semibold">
                Jaipur Craft
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
