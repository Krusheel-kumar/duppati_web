"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Box, ChevronLeft, ChevronRight } from "lucide-react";

// Dynamically import 3D Fabric Drape Viewer
const FabricDrape3D = dynamic(() => import("@/components/canvas/FabricDrape3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] sm:min-h-[440px] rounded-lg bg-[#EFE8DC] flex items-center justify-center border border-[#E5DDD0]">
      <div className="flex flex-col items-center gap-2 text-stone-500 text-xs">
        <div className="w-7 h-7 rounded-full border-2 border-[#541827]/30 border-t-[#541827] animate-spin" />
        <span>Loading 3D Drape...</span>
      </div>
    </div>
  ),
});

// All 4 cinematic brand films available in public/assets/videos
const HERO_FILMS = [
  {
    id: "luxury-home",
    src: "/assets/videos/luxury-home-creation.mp4",
    tag: "LIVING IN COMFORT",
    title: "Curating Luxury Home Sanctuaries",
    subtitle: "Pure combed cotton bed covers & layered cloud-soft dohars",
  },
  {
    id: "luxury-craft",
    src: "/assets/videos/luxury-craft-production.mp4",
    tag: "ATELIER WEAVES",
    title: "Artisanal Looms & Slow Craft",
    subtitle: "High-density natural fibres spun into heirloom comfort",
  },
  {
    id: "tender-baby",
    src: "/assets/videos/mother-baby-quilt.mp4",
    tag: "NURSERY COLLECTION",
    title: "Tender Touch for Pure Rest",
    subtitle: "Hypoallergenic cloud quilts & breathable baby essentials",
  },
  {
    id: "pillow-accents",
    src: "/assets/videos/pillow-cover-ad.mp4",
    tag: "SIGNATURE ACCENTS",
    title: "Sculpted Textures & Pillow Covers",
    subtitle: "Understated elegance for serene living room & bedroom spaces",
  },
];

export default function HeroSection({ onShopNow }: { onShopNow: () => void }) {
  // Default to video mode so the user sees the films playing in an infinite loop
  const [viewMode, setViewMode] = useState<"video" | "photo" | "3d">("video");
  const [activeFilmIndex, setActiveFilmIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentFilm = HERO_FILMS[activeFilmIndex];

  // When a video finishes, automatically advance to the next video in the loop
  const handleVideoEnded = () => {
    setActiveFilmIndex((prevIndex) => (prevIndex + 1) % HERO_FILMS.length);
  };

  const handlePrevFilm = () => {
    setActiveFilmIndex((prev) => (prev === 0 ? HERO_FILMS.length - 1 : prev - 1));
  };

  const handleNextFilm = () => {
    setActiveFilmIndex((prev) => (prev + 1) % HERO_FILMS.length);
  };

  // Ensure autoplay on film switch
  useEffect(() => {
    if (viewMode === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle autoplay policy gracefully
      });
    }
  }, [activeFilmIndex, viewMode]);

  return (
    <section className="relative overflow-hidden bg-[#F7F1E8] border-b border-[#E5DDD0] py-6 sm:py-12 md:py-16 xl:py-20 w-full">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column: Unique Luxury Editorial Headline & Copy */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start gap-4 sm:gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white border border-[#E5DDD0] text-[#541827] text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.22em] font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C28A42] shrink-0" />
              <span className="sm:hidden">Curated Luxury Atelier</span>
              <span className="hidden sm:inline">Curated Luxury Home Collections • Bespoke Atelier</span>
            </div>

            <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-[#29251F] leading-[1.12] sm:leading-[1.08]">
              Bespoke Textiles, <br />
              <span className="italic font-normal text-[#541827]">Woven for Pure Comfort.</span>
            </h1>

            <p className="text-stone-700 text-xs sm:text-base lg:text-xl leading-relaxed max-w-xl font-normal">
              Elevate your personal sanctuary with breathable bedcovers, cloud-soft dohars, and sculpted home linens.
              Thoughtfully created from 100% pure combed long-staple cotton to bring enduring grace, soulful calm, and everyday luxury to every room.
            </p>

            {/* CTAs & Perspective Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-3 w-full sm:w-auto">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-[#541827] hover:bg-[#43121e] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Minimal 3-Mode Perspective Toggle */}
              <div className="inline-flex self-center sm:self-auto rounded-full border-2 border-[#E5DDD0] bg-white p-1 text-xs shadow-2xs">
                <button
                  onClick={() => setViewMode("video")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "video"
                      ? "bg-[#541827] text-white shadow-xs"
                      : "text-stone-700 hover:text-stone-900"
                  }`}
                >
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Films (Loop)</span>
                </button>
                <button
                  onClick={() => setViewMode("photo")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold transition cursor-pointer ${
                    viewMode === "photo"
                      ? "bg-[#29251F] text-white shadow-xs"
                      : "text-stone-700 hover:text-stone-900"
                  }`}
                >
                  Suite Photo
                </button>
                <button
                  onClick={() => setViewMode("3d")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    viewMode === "3d"
                      ? "bg-[#541827] text-white shadow-xs"
                      : "text-stone-700 hover:text-stone-900"
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[#C28A42]" />
                  <span>3D Drape</span>
                </button>
              </div>
            </div>

            {/* Value metrics - Quality & Craftsmanship driven */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-[#E5DDD0] w-full">
              <div className="p-2 sm:p-3.5 rounded-xl bg-white/70 border border-[#E5DDD0] text-center sm:text-left shadow-2xs">
                <p className="font-serif text-lg sm:text-3xl lg:text-4xl font-bold text-[#541827]">100%</p>
                <p className="text-stone-700 text-[9px] sm:text-xs mt-0.5 font-bold leading-tight">Pure Cotton</p>
              </div>
              <div className="p-2 sm:p-3.5 rounded-xl bg-white/70 border border-[#E5DDD0] text-center sm:text-left shadow-2xs">
                <p className="font-serif text-lg sm:text-3xl lg:text-4xl font-bold text-[#541827]">400+ TC</p>
                <p className="text-stone-700 text-[9px] sm:text-xs mt-0.5 font-bold leading-tight">Silky Weaves</p>
              </div>
              <div className="p-2 sm:p-3.5 rounded-xl bg-white/70 border border-[#E5DDD0] text-center sm:text-left shadow-2xs">
                <p className="font-serif text-lg sm:text-3xl lg:text-4xl font-bold text-[#541827]">Zero</p>
                <p className="text-stone-700 text-[9px] sm:text-xs mt-0.5 font-bold leading-tight">Synthetics</p>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Video Infinite Loop Player */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full">
            {viewMode === "3d" ? (
              <div className="relative w-full aspect-[4/3] xs:aspect-[16/11] sm:h-[440px] lg:h-[540px] xl:h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5DDD0] bg-white shadow-md">
                <FabricDrape3D />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                  <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#541827] border border-[#E5DDD0] shadow-xs">
                    Interactive 3D Simulation
                  </span>
                </div>
              </div>
            ) : viewMode === "video" ? (
              <div className="relative w-full aspect-[4/3] xs:aspect-[16/11] sm:h-[440px] lg:h-[540px] xl:h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5DDD0] bg-black shadow-lg group">
                {/* Active Video Element with Automatic Loop on End */}
                <video
                  ref={videoRef}
                  key={currentFilm.src}
                  src={currentFilm.src}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover transition-opacity duration-700"
                />

                {/* Subtle vignette gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                {/* Top Badge: Film status + continuous loop indicator */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-auto">
                  <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#C28A42] border border-white/20 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Film {activeFilmIndex + 1} of {HERO_FILMS.length}</span>
                  </span>

                  {/* Manual Prev / Next controls */}
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/20">
                    <button
                      onClick={handlePrevFilm}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
                      title="Previous Film"
                      aria-label="Previous Film"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={handleNextFilm}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
                      title="Next Film"
                      aria-label="Next Film"
                    >
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Story & Interactive Playlist Dots */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-7 sm:left-7 sm:right-7 text-white flex flex-col gap-2 sm:gap-3 z-20 pointer-events-auto">
                  <div>
                    <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C28A42] font-bold">
                      {currentFilm.tag}
                    </span>
                    <h3 className="font-serif text-base sm:text-2xl lg:text-3xl font-medium mt-0.5 text-white drop-shadow-sm line-clamp-1">
                      {currentFilm.title}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-stone-300 font-light mt-0.5 line-clamp-1 hidden xs:block">
                      {currentFilm.subtitle}
                    </p>
                  </div>

                  {/* 4 Interactive Film Loop Selector Bars */}
                  <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                    {HERO_FILMS.map((film, idx) => (
                      <button
                        key={film.id}
                        onClick={() => setActiveFilmIndex(idx)}
                        className={`group/bar flex-1 h-1.5 sm:h-2 rounded-full transition-all cursor-pointer relative overflow-hidden ${
                          activeFilmIndex === idx
                            ? "bg-[#C28A42]"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                        title={`Film ${idx + 1}: ${film.title}`}
                        aria-label={`Switch to film ${idx + 1}`}
                      >
                        {activeFilmIndex === idx && (
                          <div className="absolute inset-0 bg-white/40 animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-[260px] xs:h-[320px] sm:h-[440px] lg:h-[540px] xl:h-[620px] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5DDD0] bg-white group shadow-md">
                <img
                  src="/assets/hero/jaipur-chic-bedroom.png"
                  alt="Modern Luxury Bedroom Suite"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-7 sm:left-7 sm:right-7 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C28A42] font-bold">
                      SIGNATURE SUITE
                    </span>
                    <h3 className="font-serif text-base sm:text-2xl lg:text-3xl font-medium mt-0.5">
                      Bespoke Pure Cotton Sanctuary
                    </h3>
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#C28A42] hidden sm:inline bg-black/40 px-3 py-1 rounded-full border border-white/20">
                    From ₹2,499
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


