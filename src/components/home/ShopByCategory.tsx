"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface ShopByCategoryProps {
  activeCategory: string;
  onSelectCategory: (catId: string, subcategory?: string) => void;
}

interface CuratedCollection {
  id: string;
  departmentId: string;
  subcategory?: string;
  title: string;
  tagline: string;
  tag: string;
  price: string;
  image: string;
  icon: React.ReactNode;
}

export default function ShopByCategory({
  activeCategory,
  onSelectCategory,
}: ShopByCategoryProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const collections: CuratedCollection[] = [
    {
      id: "bed_sanctuary",
      departmentId: "bed_sanctuary",
      title: "Bed & Sanctuary",
      tagline: "400 TC Bedsheets & Covers",
      tag: "Pure Combed Cotton",
      price: "₹1,299",
      image: "/assets/bedcovers/warm-floral-bedding.png",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20" />
          <path d="M6 8v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8M14 8v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8" />
        </svg>
      ),
    },
    {
      id: "pillow_covers",
      departmentId: "living_room",
      subcategory: "Cushion Covers",
      title: "Pillow Covers",
      tagline: "Botanical Slub Cushions",
      tag: "Hand-Block Motifs",
      price: "₹499",
      image: "/assets/livingroom/living_decorative_cushion_Covers.png",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M9 12h6M12 9v6" strokeOpacity="0.4" />
        </svg>
      ),
    },
    {
      id: "table_linen",
      departmentId: "kitchen_dining",
      title: "Table Linen",
      tagline: "Runners, Mats & Napkins",
      tag: "Handwoven Cotton",
      price: "₹699",
      image: "/assets/kitchen/kitchen_tablerunners.png",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h18M5 8v12M19 8v12M8 8v5h8V8" />
          <path d="M7 5h10M4 8l1-3h14l1 3" />
        </svg>
      ),
    },
    {
      id: "curtains",
      departmentId: "living_room",
      subcategory: "Curtains",
      title: "Curtains & Drapes",
      tagline: "Light-Filtering Panels",
      tag: "Zero Synthetics",
      price: "₹899",
      image: "/assets/livingroom/living_curtains.png",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h18M4 3v18M20 3v18" />
          <path d="M4 12c3.5 0 5-4 5-9M20 12c-3.5 0-5-4-5-9" />
          <path d="M4 12c3.5 0 5 4 5 9M20 12c-3.5 0-5 4-5 9" />
          <path d="M8 11.5h2M14 11.5h2" />
        </svg>
      ),
    },
    {
      id: "quilts_blankets",
      departmentId: "kids_atelier",
      title: "Kids & Blankets",
      tagline: "Baby Dohars & Cloud Quilts",
      tag: "Pure Mulmul Cotton",
      price: "₹1,499",
      image: "/assets/kids/kids_qutils.png",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="5" rx="2" />
          <rect x="3" y="10" width="18" height="5" rx="2" />
          <path d="M3 15h18a2 2 0 0 1 2 2v2H1v-2a2 2 0 0 1 2-2z" />
        </svg>
      ),
    },
    {
      id: "home_organizers",
      departmentId: "bath_utility",
      subcategory: "Storage Baskets",
      title: "Home Organizers",
      tagline: "Quilted Storage Baskets",
      tag: "Handcrafted Utility",
      price: "₹599",
      image: "/assets/bath/fabric-basket-organizer-set.jpg",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10h16l-1.5 10a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 10zM8 10V6a4 4 0 0 1 8 0v4" />
          <circle cx="10" cy="15" r="0.9" fill="currentColor" />
          <circle cx="14" cy="15" r="0.9" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-0 bg-[#FAF6F0] w-full overflow-hidden border-b border-[#E5DDD0]">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#C28A42]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* 1. Bespoke Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.28em] text-[#541827] mb-2 sm:mb-3">
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#C28A42]" />
            <span>THE CURATED COLLECTIONS</span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#C28A42]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#181512] leading-tight">
            Shop by Collection
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-stone-600 font-light leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            From restful bedroom sanctuaries to handcrafted dining linens and bath essentials, curate
            your entire home in authentic, breathable artisan textiles.
          </p>
        </div>

        {/* 2. Architectural Cathedral-Arch Window Cards (Horizontal Snap on Mobile, 6-col Grid on Desktop) */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 overflow-x-auto snap-x snap-mandatory gap-3.5 sm:gap-5 lg:gap-4 xl:gap-6 pb-4 sm:pb-0 px-1 sm:px-0 no-scrollbar">
          {collections.map((item) => {
            const isSelected = activeCategory === item.departmentId;

            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectCategory(item.departmentId, item.subcategory || "");
                  const el =
                    document.getElementById(`dept-${item.departmentId}`) ||
                    document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group cursor-pointer flex flex-col items-center text-center transition-all duration-300 w-[148px] xs:w-[165px] sm:w-auto shrink-0 snap-start"
              >
                {/* Real High-Resolution Cathedral Arch Window (Pure CSS) */}
                <div
                  className={`relative w-full aspect-[3/4.6] rounded-t-[90px] rounded-b-[40px] sm:rounded-t-[120px] sm:rounded-b-[50px] lg:rounded-t-[140px] lg:rounded-b-[60px] overflow-hidden border-[1.5px] transition-all duration-500 bg-white p-1 ${
                    isSelected
                      ? "border-[#541827] ring-2 ring-[#541827]/40 shadow-2xl scale-102"
                      : "border-[#C28A42]/40 group-hover:border-[#541827] shadow-[0_8px_25px_-5px_rgba(41,37,31,0.06)] group-hover:shadow-[0_20px_35px_-8px_rgba(84,24,39,0.18)] group-hover:-translate-y-1.5"
                  }`}
                >
                  {/* High-Resolution Photo Container */}
                  <div className="relative w-full h-full rounded-t-[84px] rounded-b-[36px] sm:rounded-t-[114px] sm:rounded-b-[46px] lg:rounded-t-[134px] lg:rounded-b-[54px] overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Subtle Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Badge Pill overlay on bottom of image */}
                    <div className="absolute bottom-3 inset-x-2 flex items-center justify-center z-10">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-[#541827] shadow-xs border border-white/60">
                        {item.price}+
                      </span>
                    </div>
                  </div>
                </div>

                {/* Circular Antique Gold / Ivory Icon Coin */}
                <div className="mt-4 sm:mt-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E5DDD0] shadow-xs flex items-center justify-center text-[#541827] group-hover:bg-[#541827] group-hover:text-white group-hover:border-[#541827] group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>

                {/* Collection Title (Serif) */}
                <h3 className="font-serif text-sm sm:text-base lg:text-[17px] font-bold text-[#141210] mt-2 group-hover:text-[#541827] transition-colors leading-tight">
                  {item.title}
                </h3>

                {/* Tagline */}
                <p className="text-[11px] sm:text-xs text-stone-500 font-medium mt-0.5 line-clamp-1">
                  {item.tagline}
                </p>

                {/* Interactive Link */}
                <div className="inline-flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold text-[#541827] group-hover:text-[#43121e] transition-colors mt-1.5">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Interactive Carousel Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-12">
          {collections.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeSlide === i
                  ? "w-7 h-2.5 bg-[#541827]"
                  : "w-2.5 h-2.5 bg-[#E5DDD0] hover:bg-[#C28A42]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 4. Pure Vector SVG Heritage Wave Divider (100% Vector, Sharp at 4K) */}
      <div className="relative z-10 w-full mt-12 sm:mt-16 overflow-hidden leading-none -mb-0.5">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 lg:h-20"
          preserveAspectRatio="none"
        >
          {/* Deep Royal Burgundy Wave Fill */}
          <path
            d="M0,45 C280,80 440,15 720,48 C1000,80 1160,15 1440,48 L1440,90 L0,90 Z"
            fill="#541827"
          />
          {/* Gleaming Antique Gold Metallic Crest Line */}
          <path
            d="M0,45 C280,80 440,15 720,48 C1000,80 1160,15 1440,48"
            stroke="#C28A42"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="h-3 sm:h-5 bg-[#541827] w-full" />
      </div>
    </section>
  );
}
