"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product } from "@/data/products";

interface ReelItem {
  id: string;
  reelNumber: string;
  duration: string;
  title: string;
  subtitle: string;
  location: string;
  likes: string;
  videoSrc: string;
  categoryTag: string;
  productId: string;
}

const REELS: ReelItem[] = [
  {
    id: "reel-mulmul-tagai",
    reelNumber: "REEL 01",
    duration: "0:31",
    title: "Jaipur Mulmul Tagai Stitching",
    subtitle: "Triple-layer hand quilting with combed cloud cotton",
    location: "Sanganer Artisan Quarter",
    likes: "3.4k",
    videoSrc: "/assets/videos/luxury-home-creation.mp4",
    categoryTag: "Bed Sanctuary",
    productId: "bed-01",
  },
  {
    id: "reel-indigo-craft",
    reelNumber: "REEL 02",
    duration: "0:15",
    title: "Bagru Mud-Resist Indigo Dyeing",
    subtitle: "Natural fermented indigo vats & teakwood blocks",
    location: "Natural Riverbank Vats",
    likes: "2.1k",
    videoSrc: "/assets/videos/luxury-craft-production.mp4",
    categoryTag: "Artisan Weave",
    productId: "dup-01",
  },
  {
    id: "reel-baby-quilt",
    reelNumber: "REEL 03",
    duration: "0:38",
    title: "Gentle Cloud Baby Quilting",
    subtitle: "Hypoallergenic organic mulmul for tender sleep",
    location: "Nursery Atelier",
    likes: "4.8k",
    videoSrc: "/assets/videos/mother-baby-quilt.mp4",
    categoryTag: "Kids Atelier",
    productId: "kid-01",
  },
  {
    id: "reel-cushion-accents",
    reelNumber: "REEL 04",
    duration: "0:22",
    title: "Sculpted Pillow Accents",
    subtitle: "Heavyweight textured cotton with piped borders",
    location: "Living Decor Suite",
    likes: "1.9k",
    videoSrc: "/assets/videos/pillow-cover-ad.mp4",
    categoryTag: "Living Room",
    productId: "pil-02",
  },
  {
    id: "reel-percale-sheet",
    reelNumber: "REEL 05",
    duration: "0:28",
    title: "400 TC Egyptian Percale Finishing",
    subtitle: "Ultra-crisp breathable weave with satin sheen",
    location: "Master Weaving Loom",
    likes: "2.7k",
    videoSrc: "/assets/videos/luxury-home-creation.mp4",
    categoryTag: "Bed Sanctuary",
    productId: "ess-02",
  },
];

const MARQUEE_ITEMS = [
  "100% COMBED MULMUL",
  "SANGANER HERITAGE",
  "ZERO SYNTHETICS",
  "FAIR ARTISAN WAGES",
  "CERTIFIED BOTANICAL DYES",
  "400 TC EGYPTIAN PERCALE",
  "HAND-QUILTED JAIPUR TAGAI",
  "NATURAL RIVERBANK INDIGO",
];

interface CinematicVideoSectionProps {
  onSelectCategory?: (category: string) => void;
}

export default function CinematicVideoSection({ onSelectCategory }: CinematicVideoSectionProps) {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [unmutedReelId, setUnmutedReelId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const touchStartX = useRef<number | null>(null);

  const prevIndex = (activeIndex - 1 + REELS.length) % REELS.length;
  const nextIndex = (activeIndex + 1) % REELS.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % REELS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + REELS.length) % REELS.length);
  }, []);

  // Autoplay rotation every 7s when enabled and not paused
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isPaused, handleNext]);

  // Sync video playback: active video plays unmuted/muted, side videos run silently in loop
  useEffect(() => {
    const activeReel = REELS[activeIndex];
    Object.entries(videoRefs.current).forEach(([id, vid]) => {
      if (!vid) return;
      if (id === activeReel.id) {
        vid.muted = unmutedReelId !== id;
        if (!isPaused) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      } else {
        vid.muted = true;
        vid.play().catch(() => {});
      }
    });
  }, [activeIndex, unmutedReelId, isPaused]);

  const toggleSound = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextUnmuted = unmutedReelId === reelId ? null : reelId;
    setUnmutedReelId(nextUnmuted);
  };

  const togglePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPaused((prev) => !prev);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2200);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative w-full bg-[#FAF6F0] pt-7 sm:pt-9 lg:pt-10 pb-8 sm:pb-10 border-b border-[#E5DDD0] overflow-hidden select-none">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#541827]/5 via-[#C28A42]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Top Atelier Header & Controls Row (Compact & Always Visible) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-[#C28A42] mb-1">
              <span className="w-5 h-[1.5px] bg-[#C28A42]" />
              <span>SHOPPABLE REELS • DUPPATI IN MOTION</span>
              <span className="w-5 h-[1.5px] bg-[#C28A42]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#181512] leading-tight">
              Pure Cotton,{" "}
              <span className="italic font-serif bg-gradient-to-r from-[#541827] via-[#85182a] to-[#C28A42] bg-clip-text text-transparent">
                in motion.
              </span>
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 font-light leading-relaxed mt-1 max-w-lg">
              Watch our handcrafted creations in living motion. Tap any reel to listen, experience
              the texture, and shop the featured artisanal look directly.
            </p>
          </div>

          {/* Carousel Controls (Top Right) */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-[#E5DDD0] backdrop-blur-md shadow-xs text-xs font-mono">
              <span className="font-bold text-[#541827]">0{activeIndex + 1}</span>
              <span className="text-stone-300">/</span>
              <span className="text-stone-500">0{REELS.length}</span>
            </div>

            <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded-full border border-[#E5DDD0] shadow-xs backdrop-blur-md">
              <button
                onClick={handlePrev}
                aria-label="Previous reel"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-stone-700 hover:bg-[#541827] hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isAutoPlaying
                    ? "bg-[#541827] text-white"
                    : "text-stone-700 hover:bg-[#541827] hover:text-white"
                }`}
                title={isAutoPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
              >
                {isAutoPlaying ? (
                  <Pause className="w-3 h-3 fill-current" />
                ) : (
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                aria-label="Next reel"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-stone-700 hover:bg-[#541827] hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP & TABLET HORIZONTAL 3-CARD STAGE (Compact, Elegant Proportions)
            Middle card: Bigger type. Left & Right: Normal size. Fits within screen!
           ========================================================================= */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 my-3">
          {/* 1. Left Card (Previous Reel - Normal Compact Size) */}
          {(() => {
            const reel = REELS[prevIndex];
            return (
              <div
                onClick={() => setActiveIndex(prevIndex)}
                className="group relative w-[190px] lg:w-[220px] h-[330px] lg:h-[380px] rounded-2xl overflow-hidden bg-stone-900 border-2 border-[#E5DDD0] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer opacity-80 hover:opacity-100 flex flex-col justify-between shrink-0"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={reel.videoSrc}
                  playsInline
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-85 group-hover:brightness-95 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

                {/* Top Badges */}
                <div className="relative z-20 p-2.5 flex items-center justify-between text-white">
                  <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#C28A42]">
                    {reel.reelNumber}
                  </span>
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono text-white">
                    <Heart className="w-2.5 h-2.5 text-rose-400 fill-current" />
                    <span>{reel.likes}</span>
                  </div>
                </div>

                {/* Bottom Story Tag */}
                <div className="relative z-20 p-2.5 flex flex-col gap-1">
                  <div className="text-white drop-shadow-md">
                    <div className="flex items-center gap-1 text-[8.5px] font-mono text-[#C28A42] font-semibold tracking-wider uppercase">
                      <MapPin className="w-2.5 h-2.5" />
                      <span className="truncate">{reel.location}</span>
                    </div>
                    <h3 className="font-serif text-xs font-bold leading-tight line-clamp-1">
                      {reel.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 text-white text-[9px] font-mono">
                    <span className="text-[#C28A42] font-semibold">Tap to view</span>
                    <div className="flex items-center gap-1 text-stone-300">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{reel.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 2. Middle Card (Active Reel - FEATURED BIGGER TYPE, Perfectly Sized) */}
          {(() => {
            const reel = REELS[activeIndex];
            const product = PRODUCTS.find((p) => p.id === reel.productId) || PRODUCTS[0];
            const isUnmuted = unmutedReelId === reel.id;
            const isAdded = addedProductId === product.id;

            return (
              <div
                onClick={() => togglePlayPause()}
                className="relative w-[250px] lg:w-[285px] h-[425px] lg:h-[475px] rounded-3xl overflow-hidden bg-stone-900 ring-2 ring-[#C28A42] border border-[#C28A42]/60 shadow-[0_20px_50px_-10px_rgba(84,24,39,0.4)] transition-all duration-500 cursor-pointer flex flex-col justify-between shrink-0"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={reel.videoSrc}
                  playsInline
                  autoPlay
                  loop
                  muted={!isUnmuted}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/45 pointer-events-none" />

                {/* Pause Overlay indicator */}
                {isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 pointer-events-none animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#541827] flex items-center justify-center shadow-xl">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Top Instagram Header */}
                <div className="relative z-20 p-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-white/95 p-0.5 border border-white/60 shadow-xs flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src="/assets/duppati_logo_clean.png"
                        alt="DUPPATI"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold leading-tight drop-shadow-sm">
                        duppati.home
                      </span>
                      <span className="text-[9px] text-[#C28A42] font-mono font-medium drop-shadow-sm">
                        {reel.reelNumber}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-white shadow-xs">
                      <Heart className="w-2.5 h-2.5 text-rose-400 fill-current" />
                      <span>{reel.likes}</span>
                    </div>

                    <button
                      onClick={(e) => toggleSound(reel.id, e)}
                      className={`p-1 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                        isUnmuted
                          ? "bg-[#C28A42] text-[#141210] ring-2 ring-white"
                          : "bg-black/60 hover:bg-black/80 text-white"
                      }`}
                      title={isUnmuted ? "Mute audio" : "Play audio"}
                    >
                      {isUnmuted ? (
                        <Volume2 className="w-3 h-3" />
                      ) : (
                        <VolumeX className="w-3 h-3 text-stone-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Story & Shoppable Card */}
                <div className="relative z-20 p-3 flex flex-col gap-1.5">
                  <div className="text-white drop-shadow-md px-0.5">
                    <div className="flex items-center gap-1 text-[9px] font-mono text-[#C28A42] font-semibold tracking-wider uppercase mb-0.5">
                      <MapPin className="w-2.5 h-2.5 shrink-0" />
                      <span>{reel.location}</span>
                    </div>
                    <h3 className="font-serif text-sm lg:text-base font-bold leading-tight line-clamp-1">
                      {reel.title}
                    </h3>
                  </div>

                  {/* Compact Sleek Floating Shoppable Card */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-white/80 shadow-2xl text-[#141210]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-stone-100 border border-[#E5DDD0] shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-[11px] font-bold text-[#141210] truncate leading-tight">
                          {product.name}
                        </h4>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-xs font-black text-[#541827] font-mono">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[9px] text-stone-400 line-through font-mono">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`w-full py-1 px-2 rounded-xl text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer ${
                        isAdded
                          ? "bg-emerald-700 text-white shadow-md"
                          : "bg-[#541827] hover:bg-[#43121e] text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-200 stroke-[2.6]" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3 text-[#C28A42]" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 3. Right Card (Next Reel - Normal Compact Size) */}
          {(() => {
            const reel = REELS[nextIndex];
            return (
              <div
                onClick={() => setActiveIndex(nextIndex)}
                className="group relative w-[190px] lg:w-[220px] h-[330px] lg:h-[380px] rounded-2xl overflow-hidden bg-stone-900 border-2 border-[#E5DDD0] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer opacity-80 hover:opacity-100 flex flex-col justify-between shrink-0"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={reel.videoSrc}
                  playsInline
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-85 group-hover:brightness-95 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

                {/* Top Badges */}
                <div className="relative z-20 p-2.5 flex items-center justify-between text-white">
                  <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#C28A42]">
                    {reel.reelNumber}
                  </span>
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono text-white">
                    <Heart className="w-2.5 h-2.5 text-rose-400 fill-current" />
                    <span>{reel.likes}</span>
                  </div>
                </div>

                {/* Bottom Story Tag */}
                <div className="relative z-20 p-2.5 flex flex-col gap-1">
                  <div className="text-white drop-shadow-md">
                    <div className="flex items-center gap-1 text-[8.5px] font-mono text-[#C28A42] font-semibold tracking-wider uppercase">
                      <MapPin className="w-2.5 h-2.5" />
                      <span className="truncate">{reel.location}</span>
                    </div>
                    <h3 className="font-serif text-xs font-bold leading-tight line-clamp-1">
                      {reel.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 text-white text-[9px] font-mono">
                    <span className="text-[#C28A42] font-semibold">Tap to view</span>
                    <div className="flex items-center gap-1 text-stone-300">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{reel.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* =========================================================================
            MOBILE VIEW (< md): 100% Fully Visible Active Video (Zero Half Cuts!)
            Flanked with previous/next tap buttons and quick horizontal reel pills
           ========================================================================= */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="md:hidden relative w-full my-4 flex flex-col items-center"
        >
          {(() => {
            const reel = REELS[activeIndex];
            const product = PRODUCTS.find((p) => p.id === reel.productId) || PRODUCTS[0];
            const isUnmuted = unmutedReelId === reel.id;
            const isAdded = addedProductId === product.id;

            return (
              <div className="relative w-full max-w-[340px] flex items-center justify-center">
                {/* Floating Left Arrow */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous reel"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/90 text-[#541827] shadow-lg border border-[#E5DDD0] flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Main Fully-Framed Mobile Reel Card */}
                <div
                  onClick={() => togglePlayPause()}
                  className="relative w-[86vw] max-w-[320px] aspect-[9/15.5] rounded-3xl overflow-hidden bg-stone-900 ring-2 ring-[#C28A42] border border-[#C28A42]/60 shadow-[0_20px_50px_-10px_rgba(84,24,39,0.35)] flex flex-col justify-between cursor-pointer"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[reel.id] = el;
                    }}
                    src={reel.videoSrc}
                    playsInline
                    autoPlay
                    loop
                    muted={!isUnmuted}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/45 pointer-events-none" />

                  {/* Pause Overlay indicator */}
                  {isPaused && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/95 text-[#541827] flex items-center justify-center shadow-xl">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Top Bar */}
                  <div className="relative z-20 p-3.5 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C28A42] animate-pulse" />
                      <span>{reel.reelNumber}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9.5px] font-mono text-stone-200">
                        <Clock className="w-3 h-3 text-[#C28A42]" />
                        <span>{reel.duration}</span>
                      </div>

                      <button
                        onClick={(e) => toggleSound(reel.id, e)}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                          isUnmuted
                            ? "bg-[#C28A42] text-[#141210] ring-2 ring-white"
                            : "bg-black/60 text-white"
                        }`}
                      >
                        {isUnmuted ? (
                          <Volume2 className="w-3.5 h-3.5" />
                        ) : (
                          <VolumeX className="w-3.5 h-3.5 text-stone-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bottom Story & Shoppable Card */}
                  <div className="relative z-20 p-3 flex flex-col gap-2">
                    <div className="text-white drop-shadow-md px-1">
                      <div className="flex items-center gap-1 text-[9.5px] font-mono text-[#C28A42] font-semibold tracking-wider uppercase mb-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{reel.location}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold leading-tight line-clamp-1">
                        {reel.title}
                      </h3>
                    </div>

                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-white/80 shadow-2xl text-[#141210]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-100 border border-[#E5DDD0] shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-[11px] font-bold text-[#141210] truncate">
                            {product.name}
                          </h4>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-black text-[#541827] font-mono">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[9.5px] text-stone-400 line-through font-mono">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`w-full py-1.5 px-2 rounded-xl text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer ${
                          isAdded
                            ? "bg-emerald-700 text-white"
                            : "bg-[#541827] hover:bg-[#43121e] text-white"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-200 stroke-[2.6]" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3 h-3 text-[#C28A42]" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Right Arrow */}
                <button
                  onClick={handleNext}
                  aria-label="Next reel"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/90 text-[#541827] shadow-lg border border-[#E5DDD0] flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })()}

          {/* Quick-Switch Horizontal Reel Selector Pills (Zero cut-off!) */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto max-w-full px-2 py-1 no-scrollbar">
            {REELS.map((reel, idx) => (
              <button
                key={reel.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  idx === activeIndex
                    ? "bg-[#541827] text-white shadow-xs"
                    : "bg-white/80 text-stone-600 border border-[#E5DDD0] hover:bg-white"
                }`}
              >
                {reel.reelNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Explore All Collections Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory("all");
              const el = document.getElementById("department-showcases");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#541827] hover:text-white border-2 border-[#E5DDD0] hover:border-[#541827] text-xs sm:text-sm font-bold text-[#141210] transition-all shadow-xs group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C28A42] group-hover:text-amber-300 transition-colors" />
            <span>Explore All 30+ Handcrafted Creations</span>
            <ArrowRight className="w-4 h-4 text-[#C28A42] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* Luxury Continuous Diamond Marquee Strip */}
      <div className="mt-12 sm:mt-16 w-full border-y border-[#E5DDD0] bg-[#F5EFEB] py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#541827] uppercase">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-[#C28A42] font-serif">◆</span>
              <span>{item}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
