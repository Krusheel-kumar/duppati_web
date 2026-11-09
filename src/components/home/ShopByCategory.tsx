"use client";

import React, { useState } from "react";

interface ShopByCategoryProps {
  activeCategory: string;
  onSelectCategory: (catId: string, subcategory?: string) => void;
}

interface CuratedCollection {
  id: string;
  departmentId: string;
  subcategory?: string;
  label: string;
  title: string;
  tagline: string;
  price: string;
  image: string;
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
      label: "BED & SANCTUARY",
      title: "Bed Sanctuary",
      tagline: "400 TC Bedsheets & Mulmul Dohars",
      price: "₹1,299",
      image: "/assets/bedcovers/warm-floral-bedding.png",
    },
    {
      id: "living_room",
      departmentId: "living_room",
      subcategory: "Cushion Covers",
      label: "LIVING ROOM",
      title: "Living Room Luxe",
      tagline: "Quilted Cushions & Handloom Throws",
      price: "₹499",
      image: "/assets/livingroom/living_decorative_cushion_Covers.png",
    },
    {
      id: "kitchen_dining",
      departmentId: "kitchen_dining",
      label: "DINING & KITCHEN",
      title: "Dining & Kitchen",
      tagline: "Table Runners, Mats & Napkins",
      price: "₹699",
      image: "/assets/kitchen/kitchen_tablerunners.png",
    },
    {
      id: "kids_atelier",
      departmentId: "kids_atelier",
      label: "KIDS & NURSERY",
      title: "Kids & Blankets",
      tagline: "Organic Baby Quilts & Swaddles",
      price: "₹1,499",
      image: "/assets/kids/kids_blankets.png",
    },
    {
      id: "curtains",
      departmentId: "living_room",
      subcategory: "Curtains",
      label: "CURTAINS & DRAPES",
      title: "Curtains & Drapes",
      tagline: "Pure Cotton Light-Filtering Drapes",
      price: "₹899",
      image: "/assets/livingroom/living_curtains.png",
    },
    {
      id: "bath_utility",
      departmentId: "bath_utility",
      subcategory: "Storage Baskets",
      label: "BATH & STORAGE",
      title: "Bath & Storage",
      tagline: "Handcrafted Organizers & Bath Rugs",
      price: "₹599",
      image: "/assets/bath/fabric-basket-organizer-set.jpg",
    },
  ];

  return (
    <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 bg-[#FAF7F2] w-full overflow-hidden border-b border-[#E5DDD0]">
      {/* Background Subtle Warm Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-[#C28A42]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* 1. Atelier Editorial Header (Two-column layout matching reference) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-8">
          <div className="max-w-2xl">
            {/* Gold Dash Eyebrow Kicker */}
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-[#C28A42] mb-2 sm:mb-3">
              <span className="w-6 sm:w-8 h-[2px] bg-[#C28A42]" />
              <span>THE DUPPATI ARCHIVE</span>
            </div>

            {/* Main Heading with Two-Tone Gradient */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#141210] leading-tight tracking-tight">
              Six Chapters.{" "}
              <span className="bg-gradient-to-r from-[#541827] via-[#85182a] to-[#C28A42] bg-clip-text text-transparent">
                Timeless
              </span>{" "}
              Comfort
            </h2>
          </div>

          {/* Poetic Right-Aligned Subtext */}
          <div className="md:max-w-xs lg:max-w-sm md:text-right">
            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
              Woven by hand, loved for generations. Six home stories, from quiet sunlit mornings to
              restful starry nights.
            </p>
          </div>
        </div>

        {/* 2. Ornate Mughal Jharokha Spire Gallery (6 Columns on Desktop, Horizontal Snap on Mobile) */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-5 lg:gap-4 xl:gap-6 pb-4 sm:pb-2 px-1 sm:px-0 no-scrollbar">
          {collections.map((item, idx) => {
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
                className="group cursor-pointer flex flex-col items-center text-center transition-all duration-300 w-[150px] xs:w-[170px] sm:w-auto shrink-0 snap-start"
              >
                {/* Authentic Rajputana Jharokha Arch with Brass Kalash Spire */}
                <div className="relative w-full aspect-[280/430] transition-all duration-500 group-hover:-translate-y-2">
                  <svg
                    viewBox="0 0 280 430"
                    className={`w-full h-full transition-all duration-500 overflow-visible ${
                      isSelected
                        ? "drop-shadow-[0_20px_35px_rgba(84,24,39,0.28)] scale-102"
                        : "drop-shadow-[0_10px_22px_rgba(20,18,16,0.08)] group-hover:drop-shadow-[0_22px_36px_rgba(84,24,39,0.22)]"
                    }`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Unique clip path for Jharokha multi-foil arch */}
                      <clipPath id={`jharokha-clip-${idx}`}>
                        <path
                          d="M140,32 
                             C130,48 116,62 108,68
                             C100,74 96,78 94,86
                             C90,98 76,108 68,118
                             C62,126 58,136 56,148
                             L56,416
                             C56,422 61,426 67,426
                             L213,426
                             C219,426 224,422 224,416
                             L224,148
                             C222,136 218,126 212,118
                             C204,108 190,98 186,86
                             C184,78 180,74 172,68
                             C164,62 150,48 140,32 Z"
                        />
                      </clipPath>

                      {/* Subtle Bottom Vignette Gradient */}
                      <linearGradient id={`jharokha-vignette-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                        <stop offset="70%" stopColor="#141210" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#141210" stopOpacity="0.75" />
                      </linearGradient>
                    </defs>

                    {/* High-Resolution Home Textile Image clipped to Jharokha silhouette */}
                    <g clipPath={`url(#jharokha-clip-${idx})`}>
                      <image
                        href={item.image}
                        x="36"
                        y="20"
                        width="208"
                        height="418"
                        preserveAspectRatio="xMidYMid slice"
                        className="transition-transform duration-700 ease-out group-hover:scale-108"
                        style={{ transformOrigin: "center" }}
                      />
                      {/* Vignette overlay */}
                      <rect
                        x="48"
                        y="260"
                        width="184"
                        height="170"
                        fill={`url(#jharokha-vignette-${idx})`}
                        className="pointer-events-none"
                      />
                    </g>

                    {/* Outer Antique Gold Arch Border */}
                    <path
                      d="M140,32 
                         C130,48 116,62 108,68
                         C100,74 96,78 94,86
                         C90,98 76,108 68,118
                         C62,126 58,136 56,148
                         L56,416
                         C56,422 61,426 67,426
                         L213,426
                         C219,426 224,422 224,416
                         L224,148
                         C222,136 218,126 212,118
                         C204,108 190,98 186,86
                         C184,78 180,74 172,68
                         C164,62 150,48 140,32 Z"
                      stroke={isSelected ? "#541827" : "#C28A42"}
                      strokeWidth={isSelected ? "2.6" : "1.8"}
                      strokeLinejoin="round"
                      className="transition-colors duration-300"
                    />

                    {/* Inner Delicate Gold Hairline Detail */}
                    <path
                      d="M140,39 
                         C132,53 119,66 112,72
                         C105,78 101,81 100,89
                         C96,100 83,110 75,120
                         C70,127 66,136 64,147
                         L64,410
                         C64,414 67,418 71,418
                         L209,418
                         C213,418 216,414 216,410
                         L216,147
                         C214,136 210,127 205,120
                         C197,110 184,100 180,89
                         C179,81 175,78 168,72
                         C161,66 148,53 140,39 Z"
                      stroke="#C28A42"
                      strokeWidth="0.8"
                      strokeOpacity="0.5"
                    />

                    {/* Ornate Brass Finial Spire Pinnacle on Top */}
                    <g
                      className={`transition-all duration-300 ${
                        isSelected
                          ? "scale-110 -translate-y-1"
                          : "group-hover:-translate-y-1.5 group-hover:scale-105"
                      }`}
                      style={{ transformOrigin: "140px 32px" }}
                    >
                      {/* Vertical Needle */}
                      <line
                        x1="140"
                        y1="4"
                        x2="140"
                        y2="20"
                        stroke="#C28A42"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {/* Diamond Jewel */}
                      <polygon
                        points="140,12 144,18 140,24 136,18"
                        fill="#C28A42"
                        stroke="#541827"
                        strokeWidth="0.6"
                      />
                      {/* Stepped Pedestal Base */}
                      <ellipse cx="140" cy="27" rx="5.5" ry="2" fill="#C28A42" />
                      <ellipse cx="140" cy="31" rx="7.5" ry="2.2" fill="#541827" />
                    </g>
                  </svg>
                </div>

                {/* Minimalist Under-Arch Label (Wide Letterspaced Uppercase) */}
                <div className="mt-3.5 sm:mt-4 flex flex-col items-center">
                  <span
                    className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.20em] transition-colors leading-tight ${
                      isSelected
                        ? "text-[#541827]"
                        : "text-[#141210] group-hover:text-[#541827]"
                    }`}
                  >
                    {item.label}
                  </span>
                  {/* Subtle active / hover indicator dot */}
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? "bg-[#541827] scale-100 opacity-100"
                        : "bg-[#C28A42] scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Mobile Swipe Dots */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-4">
          {collections.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                activeSlide === i ? "w-6 h-1.5 bg-[#541827]" : "w-1.5 h-1.5 bg-[#E5DDD0]"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
