"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface MarqueeItem {
  type: "brand" | "product";
  text: string;
  deptId?: string;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Pure Cotton Bedcovers & Bedsheets", deptId: "bed_sanctuary" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Cloud-Soft Dohars & Traditional Razais", deptId: "bed_sanctuary" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Luxury Sofa & Velvet Cushion Covers", deptId: "living_room" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Handloom Door Curtains & Floor Dhurries", deptId: "living_room" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Artisan Dining Mats & Table Covers", deptId: "kitchen_dining" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Fine Combed Cotton Bath Towels & Mats", deptId: "bath_utility" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Hypoallergenic Baby Quilts & Nursery Bedding", deptId: "kids_atelier" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Botanical Wall Hangings & Fabric Organizers", deptId: "wall_decor" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "100% Breathable Long-Staple Pure Cotton" },
  { type: "brand", text: "DUPPATI COZY HOME" },
  { type: "product", text: "Free Express Shipping Across India > ₹999" },
];

export default function TrustStrip({
  onSelectCategory,
}: {
  onSelectCategory?: (deptId: string) => void;
}) {
  const handleClick = (deptId?: string) => {
    if (deptId && onSelectCategory) {
      onSelectCategory(deptId);
      const el = document.getElementById(`dept-${deptId}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      const el = document.getElementById("department-showcases");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#541827] text-white border-y border-[#C28A42]/35 py-3.5 sm:py-4.5 w-full overflow-hidden select-none shadow-xs relative">
      {/* Subtle edge fade overlays for infinite seamless blend */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-[#541827] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-[#541827] to-transparent z-10 pointer-events-none" />

      {/* Infinite Horizontal Running Marquee Track */}
      <div className="animate-marquee flex items-center gap-6 sm:gap-10">
        {/* Render items twice to create the continuous seamless loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(item.deptId)}
            className="flex items-center gap-6 sm:gap-10 shrink-0 cursor-pointer group"
          >
            {item.type === "brand" ? (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C28A42]" />
                <span className="font-serif italic font-bold tracking-[0.2em] uppercase text-xs sm:text-sm text-[#C28A42] drop-shadow-xs group-hover:text-amber-200 transition-colors">
                  {item.text}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-[#F7F1E8]/90 group-hover:text-white transition-colors whitespace-nowrap">
                  {item.text}
                </span>
                {item.deptId && (
                  <ArrowUpRight className="w-3 h-3 text-[#C28A42]/60 group-hover:text-[#C28A42] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                )}
              </div>
            )}

            {/* Separator Diamond */}
            <span className="text-[#C28A42]/50 text-xs sm:text-sm font-light select-none">
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

