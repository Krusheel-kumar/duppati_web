"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ShopByRoomProps {
  onSelectCategory: (catId: string) => void;
}

export default function ShopByRoom({ onSelectCategory }: ShopByRoomProps) {
  const rooms = [
    {
      id: "bed_sanctuary",
      title: "Master Bedroom",
      tagline: "Serene Living",
      description:
        "Dress your bed in pure 300 & 400 TC cotton bedcovers, reversible quilts, and shams.",
      image: "/assets/hero/jaipur-chic-bedroom.png",
      cta: "Explore Bedding",
    },
    {
      id: "living_room",
      title: "Living Sanctuary",
      tagline: "Warmth Underfoot",
      description:
        "Flat-weave wool & cotton Dhurries, complemented by 350 GSM slub cotton cushions.",
      image: "/assets/livingroom/living_sofa_covers.png",
      cta: "Explore Living",
    },
    {
      id: "kids_atelier",
      title: "Children’s Nursery",
      tagline: "Cloud Tenderness",
      description:
        "Featherlight organic mulmul quilts weighing 340 grams, hand-tufted with pure cotton knots.",
      image: "/assets/kids/baby_bedding_sets.png",
      cta: "Explore Nursery",
    },
    {
      id: "kitchen_dining",
      title: "Dining & Balcony",
      tagline: "Heirloom Gatherings",
      description:
        "Quilted cotton placemat sets and semi-sheer Sanganeri floral curtains filtering sun.",
      image: "/assets/kitchen/kitchen_tablecovers.png",
      cta: "Explore Dining",
    },
  ];

  return (
    <section id="shop-by-room" className="py-10 sm:py-18 lg:py-24 bg-[#F7F1E8] border-b border-[#E5DDD0] w-full">
      <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C28A42]">
              Interior Styling
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#29251F] mt-1">
              Shop by Room
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md font-light">
            Thoughtfully curated textiles designed to transform every corner of your home into an
            oasis of warmth and peace.
          </p>
        </div>

        {/* 2-column on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {rooms.map((room) => (
            <div
              key={room.title}
              onClick={() => {
                onSelectCategory(room.id);
                const el = document.getElementById("bestsellers");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group cursor-pointer flex flex-col bg-white rounded-md overflow-hidden border border-[#E5DDD0] hover:border-[#C28A42] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  loading="lazy"
                />
              </div>

              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-white border-t border-[#E5DDD0]">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C28A42] font-semibold">
                    {room.tagline}
                  </span>
                  <h3 className="font-serif text-xs sm:text-lg font-medium text-[#29251F] group-hover:text-[#541827] transition-colors mt-0.5 mb-1 sm:mb-2 leading-snug">
                    {room.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-stone-600 font-light leading-relaxed mb-3 line-clamp-2">
                    {room.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-[#541827]">
                  <span>{room.cta}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
