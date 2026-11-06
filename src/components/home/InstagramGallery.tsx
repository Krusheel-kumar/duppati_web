"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramGallery() {
  const posts = [
    {
      image: "/assets/hero/jaipur-chic-bedroom.png",
      tag: "#DuppatBedroom",
      author: "@ananya_interiors",
    },
    {
      image: "/assets/bedcovers/charcoal-bedspread.png",
      tag: "#SlowCraftBedding",
      author: "@the_mewar_home",
    },
    {
      image: "/assets/livingroom/living_decorative_cushion_Covers.png",
      tag: "#LivingSanctuary",
      author: "@delhi_haveli",
    },
    {
      image: "/assets/kids/baby_blankets.png",
      tag: "#MulmulCloud",
      author: "@priya_nursery",
    },
    {
      image: "/assets/kitchen/kitchen_dinningmats.png",
      tag: "#FestiveDining",
      author: "@artisan_table",
    },
    {
      image: "/assets/duppatis/blue-green-floral-print.png",
      tag: "#JaipurDrapes",
      author: "@kavita_textiles",
    },
  ];

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-white border-b border-[#E5DDD0] w-full">
      <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C28A42]">
              Community & Interiors
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F] mt-1">
              Styled in Living Sanctuaries
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#541827] hover:text-[#C28A42] transition"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @duppat.cozyhomezzz</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Grid items (2 on mobile, 3 on tablet, 6 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden rounded-md border border-[#E5DDD0] bg-stone-100"
            >
              <img
                src={post.image}
                alt={post.tag}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] font-mono text-[#C28A42]">{post.tag}</span>
                <span className="text-[11px] font-medium truncate">{post.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
