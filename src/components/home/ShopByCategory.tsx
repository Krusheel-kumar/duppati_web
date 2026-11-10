"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const collections: CuratedCollection[] = [
    {
      id: "bed_sanctuary",
      departmentId: "bed_sanctuary",
      title: "Bed & Sanctuary",
      tagline: "400 TC Bedsheets & Covers",
      tag: "Pure Combed Cotton",
      price: "₹1,299",
      image: "/assets/bedcovers/charcoal-floral-montage.png",
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

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
      const index = Math.round((scrollLeft / maxScroll) * (collections.length - 1));
      setActiveSlide(index);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const target = (maxScroll / (collections.length - 1)) * index;
    scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
    setActiveSlide(index);
  };

  return (
    <section className="relative pt-8 sm:pt-16 lg:pt-20 pb-0 bg-[#FAF6F0] w-full overflow-hidden border-b border-[#E5DDD0] select-none">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#C28A42]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-3.5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* 1. Section Header & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between max-w-7xl mx-auto mb-6 sm:mb-12 gap-3">
          <div className="text-left sm:text-center sm:mx-auto max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.26em] text-[#541827] mb-1.5 sm:mb-2">
              <span className="w-5 sm:w-8 h-[1.5px] bg-[#C28A42]" />
              <span>THE CURATED COLLECTIONS</span>
              <span className="w-5 sm:w-8 h-[1.5px] bg-[#C28A42]" />
            </div>

            {/* Heading */}
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium text-[#181512] leading-tight">
              Shop by Collection
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mt-1 sm:mt-2">
              From restful bedroom sanctuaries to handcrafted dining linens and bath essentials, curate
              your entire home in authentic, breathable artisan textiles.
            </p>
          </div>

          {/* Desktop / Tablet Scroll Controls */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={scrollLeft}
              className="w-9 h-9 rounded-full bg-white border border-[#E5DDD0] shadow-2xs hover:bg-[#541827] hover:text-white flex items-center justify-center text-stone-700 transition cursor-pointer active:scale-90"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="w-9 h-9 rounded-full bg-white border border-[#E5DDD0] shadow-2xs hover:bg-[#541827] hover:text-white flex items-center justify-center text-stone-700 transition cursor-pointer active:scale-90"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Interactive Cathedral-Arch Window Cards (Horizontal Snap with Smooth Peek on Mobile) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-5 lg:gap-4 xl:gap-5 pb-4 px-1 sm:px-0 no-scrollbar"
        >
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
                className="group cursor-pointer flex flex-col items-center text-center transition-all duration-300 w-[172px] sm:w-auto shrink-0 snap-start active:scale-98"
              >
                {/* Real High-Resolution Cathedral Arch Window (Pure CSS) */}
                <div
                  className={`relative w-full aspect-[3/4.5] rounded-t-[90px] rounded-b-[36px] sm:rounded-t-[120px] sm:rounded-b-[50px] lg:rounded-t-[140px] lg:rounded-b-[60px] overflow-hidden border-[1.5px] transition-all duration-500 bg-white p-1.5 shadow-[0_8px_25px_-5px_rgba(41,37,31,0.08)] ${
                    isSelected
                      ? "border-[#541827] ring-2 ring-[#541827]/40 shadow-2xl scale-102"
                      : "border-[#C28A42]/40 group-hover:border-[#541827] group-hover:shadow-[0_20px_35px_-8px_rgba(84,24,39,0.22)] group-hover:-translate-y-1.5"
                  }`}
                >
                  {/* High-Resolution Photo Container */}
                  <div className="relative w-full h-full rounded-t-[84px] rounded-b-[30px] sm:rounded-t-[114px] sm:rounded-b-[44px] lg:rounded-t-[134px] lg:rounded-b-[54px] overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Subtle Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                    {/* Badge Pill overlay on bottom of image */}
                    <div className="absolute bottom-2.5 inset-x-2 flex items-center justify-center z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-[#541827] shadow-sm border border-white/80">
                        {item.price}+
                      </span>
                    </div>
                  </div>
                </div>

                {/* Circular Antique Gold / Ivory Icon Coin */}
                <div className="mt-3.5 sm:mt-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E5DDD0] shadow-xs flex items-center justify-center text-[#541827] group-hover:bg-[#541827] group-hover:text-white group-hover:border-[#541827] group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>

                {/* Collection Title (Serif) */}
                <h3 className="font-serif text-sm sm:text-base lg:text-[17px] font-bold text-[#141210] mt-1.5 group-hover:text-[#541827] transition-colors leading-tight truncate max-w-full px-1">
                  {item.title}
                </h3>

                {/* Tagline */}
                <p className="text-[10.5px] sm:text-xs text-stone-500 font-medium mt-0.5 line-clamp-1">
                  {item.tagline}
                </p>

                {/* Interactive Link */}
                <div className="inline-flex items-center justify-center gap-1 text-[10.5px] sm:text-xs font-bold text-[#541827] group-hover:text-[#43121e] transition-colors mt-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#C28A42]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Mobile Smooth Scroll Progress Bar & Dots */}
        <div className="flex flex-col items-center justify-center gap-2 mt-4 sm:mt-8">
          {/* Mobile Interactive Scroll Track */}
          <div className="sm:hidden w-36 h-1 bg-[#E5DDD0] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#541827] rounded-full transition-all duration-150"
              style={{ width: `${Math.max(16, scrollProgress)}%` }}
            />
          </div>

          {/* Interactive Dots for direct jump */}
          <div className="flex items-center justify-center gap-2">
            {collections.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeSlide === i
                    ? "w-6 h-2 bg-[#541827]"
                    : "w-2 h-2 bg-[#E5DDD0] hover:bg-[#C28A42]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Pure Vector SVG Heritage Wave Divider (100% Vector, Sharp at 4K) */}
      <div className="relative z-10 w-full mt-8 sm:mt-14 overflow-hidden leading-none -mb-0.5">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-14 lg:h-18"
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
        <div className="h-2 sm:h-4 bg-[#541827] w-full" />
      </div>
    </section>
  );
}
