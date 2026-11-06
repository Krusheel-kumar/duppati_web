"use client";

import React, { useState, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ShoppingBag,
  Check,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product } from "@/data/products";

interface ShoppableReel {
  id: string;
  videoSrc: string;
  title: string;
  categoryTag: string;
  likes: string;
  productId: string;
}

const SHOPPABLE_REELS: ShoppableReel[] = [
  {
    id: "reel-bed-sanctuary",
    videoSrc: "/assets/videos/luxury-home-creation.mp4",
    title: "The Sanctuary Suite",
    categoryTag: "Bed Sanctuary",
    likes: "2.4k",
    productId: "bed-cover-01",
  },
  {
    id: "reel-artisan-craft",
    videoSrc: "/assets/videos/luxury-craft-production.mp4",
    title: "Master Weaving Loom",
    categoryTag: "Artisan Craft",
    likes: "1.8k",
    productId: "dohar-01",
  },
  {
    id: "reel-baby-quilt",
    videoSrc: "/assets/videos/mother-baby-quilt.mp4",
    title: "The Mother & Baby Quilt",
    categoryTag: "Kids & Nursery",
    likes: "3.1k",
    productId: "baby-dohar-01",
  },
  {
    id: "reel-cushion-accents",
    videoSrc: "/assets/videos/pillow-cover-ad.mp4",
    title: "Sculpted Pillow Accents",
    categoryTag: "Living Decor",
    likes: "1.2k",
    productId: "cushion-01",
  },
];

interface CinematicVideoSectionProps {
  onSelectCategory?: (category: string) => void;
}

export default function CinematicVideoSection({ onSelectCategory }: CinematicVideoSectionProps) {
  const { addToCart, openCart } = useCart();
  const [unmutedReelId, setUnmutedReelId] = useState<string | null>(null);
  const [pausedReelIds, setPausedReelIds] = useState<Record<string, boolean>>({});
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const toggleSound = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextUnmuted = unmutedReelId === reelId ? null : reelId;
    setUnmutedReelId(nextUnmuted);

    // Update muted property on all video elements
    Object.entries(videoRefs.current).forEach(([id, vid]) => {
      if (vid) {
        vid.muted = id !== nextUnmuted;
      }
    });
  };

  const togglePlay = (reelId: string) => {
    const vid = videoRefs.current[reelId];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setPausedReelIds((prev) => ({ ...prev, [reelId]: false }));
    } else {
      vid.pause();
      setPausedReelIds((prev) => ({ ...prev, [reelId]: true }));
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2200);
  };

  return (
    <section className="relative w-full bg-[#FAF6F0] py-14 sm:py-20 lg:py-28 border-b border-[#E5DDD0] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#C28A42]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.28em] text-[#541827] mb-2 sm:mb-3">
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#C28A42]" />
            <span>SHOPPABLE REELS • DUPPAT IN MOTION</span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#C28A42]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#181512] leading-tight">
            The Art of Living, <span className="italic text-[#541827]">Captured on Film.</span>
          </h2>

          <p className="text-xs sm:text-base text-stone-600 font-light leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Watch our handcrafted creations in motion. Tap any reel to listen, experience the living
            textures, and add the featured artisanal look directly to your bag.
          </p>
        </div>

        {/* 4 Shoppable Instagram Reels: Horizontal Snap Carousel on Mobile, 4-col Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 sm:pb-0 px-1 sm:px-0 no-scrollbar">
          {SHOPPABLE_REELS.map((reel) => {
            const product =
              PRODUCTS.find((p) => p.id === reel.productId) || PRODUCTS[0];
            const isUnmuted = unmutedReelId === reel.id;
            const isPaused = !!pausedReelIds[reel.id];
            const isAdded = addedProductId === product.id;

            return (
              <div
                key={reel.id}
                onClick={() => togglePlay(reel.id)}
                className="group relative aspect-[9/16] sm:aspect-[9/15.5] w-[78vw] xs:w-[70vw] sm:w-auto shrink-0 snap-center rounded-3xl overflow-hidden border-2 border-[#E5DDD0] hover:border-[#C28A42] bg-stone-900 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* 1. Background Video Running on Loop */}
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={reel.videoSrc}
                  playsInline
                  autoPlay
                  loop
                  muted={!isUnmuted}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/40 pointer-events-none" />

                {/* Pause Overlay Indicator when paused */}
                {isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/90 text-[#541827] flex items-center justify-center shadow-2xl">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                )}

                {/* 2. Top Instagram Header Overlay */}
                <div className="relative z-20 p-3.5 sm:p-4 flex items-center justify-between text-white">
                  {/* Account Badge */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/90 p-0.5 border border-white/60 shadow-xs flex items-center justify-center overflow-hidden">
                      <img
                        src="/assets/duppatilogo.png"
                        alt="DUPPAT"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight drop-shadow-sm">
                        duppat.home
                      </span>
                      <span className="text-[10px] text-stone-200 font-mono font-medium drop-shadow-sm">
                        {reel.categoryTag}
                      </span>
                    </div>
                  </div>

                  {/* Sound Toggle Pill & Likes */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleSound(reel.id, e)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                        isUnmuted
                          ? "bg-[#C28A42] text-[#141210] ring-2 ring-white"
                          : "bg-black/60 hover:bg-black/80 text-white"
                      }`}
                      title={isUnmuted ? "Mute audio" : "Tap for sound"}
                    >
                      {isUnmuted ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-stone-300" />
                      )}
                    </button>

                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-mono font-bold text-white shadow-xs">
                      <Heart className="w-3 h-3 text-rose-400 fill-current" />
                      <span>{reel.likes}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Shoppable Product Card Overlay */}
                <div className="relative z-20 p-3 sm:p-3.5">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white/80 shadow-2xl text-[#141210] transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-2.5">
                      {/* Product Thumbnail */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-[#E5DDD0] shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Name & Price */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-[#141210] truncate leading-tight">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-stone-500 font-medium truncate mt-0.5">
                          {product.fabric}
                        </p>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-xs sm:text-sm font-black text-[#541827] font-mono">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-stone-400 line-through font-mono">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Instant Add to Bag Button */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        isAdded
                          ? "bg-emerald-700 text-white shadow-md"
                          : "bg-[#541827] hover:bg-[#43121e] text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-200 stroke-[2.6]" />
                          <span>Added to Bag!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#C28A42]" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Collections Banner Link */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory("all");
              const el = document.getElementById("bestsellers");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#541827] hover:text-white border-2 border-[#E5DDD0] hover:border-[#541827] text-xs sm:text-sm font-bold text-[#141210] transition-all shadow-xs group cursor-pointer"
          >
            <span>Explore All 30+ Handcrafted Creations</span>
            <ArrowRight className="w-4 h-4 text-[#C28A42] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </section>
  );
}
