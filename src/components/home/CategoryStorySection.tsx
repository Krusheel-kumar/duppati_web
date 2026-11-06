"use client";

import React from "react";
import { ArrowRight, Feather, Shield, Heart } from "lucide-react";
import { CATEGORIES } from "@/data/products";

interface CategoryStoryProps {
  onSelectCategory: (catId: string) => void;
}

export default function CategoryStorySection({ onSelectCategory }: CategoryStoryProps) {
  const stories = [
    {
      id: "bedcovers",
      tag: "Craft Story 01",
      title: "Royal Bedcovers & Dohars",
      subtitle: "The 14-Day Kantha Heirloom",
      description:
        "Every king bedcover is pressed over 850 times with Sheesham wood blocks, then hand-quilted by master women artisans across 14 patient days. Filled with 100% carded cotton batting.",
      image: "/assets/bedcovers/charcoal-floral-montage.png",
      secondaryImage: "/assets/bedcovers/blue-collection.png",
      features: ["Reversible Dual Patterns", "Includes 2 Quilted Shams", "All-Season Breathability"],
    },
    {
      id: "bedsheets",
      tag: "Craft Story 02",
      title: "Heritage Bedsheets",
      subtitle: "The 400 TC Morning Tuck",
      description:
        "Cut generously to an oversized 108 x 108 inches with deep tuck drops. Stays impeccably tucked without popping off your mattress, woven with silky 400 thread count percale cotton.",
      image: "/assets/bedsheets/warm-floral-bedding.png",
      secondaryImage: "/assets/bedsheets/floral-linen-bedroom.png",
      features: ["Super King 108x108 In", "Cool-Touch Percale Weave", "50+ Wash Colorfast Guarantee"],
    },
    {
      id: "kids_quilts",
      tag: "Craft Story 03",
      title: "Kids Quilts & Baby Razai",
      subtitle: "The Cloud-Soft Lullaby",
      description:
        "Designed specifically for sensitive infant and toddler skin. Triple-layered pure organic mulmul with ZERO synthetic polyester fibers. Lightweight at only 340 grams.",
      image: "/assets/kids/safari-animal-quilt.png",
      secondaryImage: "/assets/craft/blockprint-details.png",
      features: ["Zero Synthetics Batting", "AZO-Free Herbal Dyes", "Hand-Tufted Cotton Knots"],
    },
    {
      id: "duppatis",
      tag: "Craft Story 04",
      title: "Royal Mulmul Duppatis",
      subtitle: "The Flow of Desert Water",
      description:
        "Once favored in the royal courts of Amber and Mewar. Whisper-light 2.5-meter pure mulmul that softens with each wash, finished with handcrafted cotton tassels.",
      image: "/assets/duppatis/blue-green-floral-print.png",
      secondaryImage: "/assets/hero/jaipur-chic-bedroom.png",
      features: ["Featherlight 100% Mulmul", "Hand-Rolled Hemming", "Traditional Sanganeri Jaal"],
    },
    {
      id: "cushions",
      tag: "Craft Story 05",
      title: "Cushion Covers & Table Linens",
      subtitle: "Palace Architectural Accents",
      description:
        "Structured heavyweight 350 GSM slub cotton with contrasting piped trims and hidden YKK zippers. Turns everyday sofas and dining tables into haveli courtyards.",
      image: "/assets/cushions/botanical-sage-cushions.png",
      secondaryImage: "/assets/craft/placemats-wood-craft.png",
      features: ["Heavyweight 350 GSM Cotton", "Concealed Bottom Zippers", "Contrast Velvet Piping"],
    },
  ];

  return (
    <section className="py-20 bg-[#faf7f2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-800" />
            <span>Storytelling by Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            The Chapters of DUPPATI
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            Every category tells an authentic Rajasthani craft journey. Click into any chapter to
            explore hand-stamped masterworks tailored for your home.
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-16">
          {stories.map((story, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={story.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Media Column */}
                <div
                  className={`lg:col-span-6 relative ${
                    isReversed ? "lg:col-start-7" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-md">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-stone-900 border border-stone-200 shadow-sm uppercase tracking-wider">
                        {story.tag}
                      </span>
                    </div>
                  </div>

                  {/* Overlapping thumbnail inset */}
                  <div className="hidden sm:block absolute -bottom-5 -right-5 w-36 h-28 rounded-xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={story.secondaryImage}
                      alt="Craft Inset"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Narrative Text Column */}
                <div className={`lg:col-span-6 flex flex-col justify-between ${isReversed ? "lg:col-start-1" : ""}`}>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
                      {story.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1 mb-3">
                      {story.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {story.description}
                    </p>

                    {/* Feature badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8">
                      {story.features.map((feat) => (
                        <div
                          key={feat}
                          className="px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#eee4d2] text-[11px] text-stone-800 font-medium flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA button to jump into this category */}
                  <div>
                    <button
                      onClick={() => {
                        onSelectCategory(story.id);
                        const el = document.getElementById("products");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-md transition-all duration-200 group"
                    >
                      <span>Explore {story.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
