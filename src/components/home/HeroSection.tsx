"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RefreshCw,
  Check,
  ChevronRight,
  Play,
  Pause,
  Award,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product } from "@/data/products";

// 4 Essential Quick-Access Category Cards with Direct Price Anchors
const QUICK_CATEGORIES = [
  {
    id: "bed_sanctuary",
    subcat: "Dohars",
    title: "Mulmul Dohars",
    tagline: "3-Layer breathable cloud cotton",
    priceText: "From ₹2,499",
    image: "/assets/bedcovers/charcoal-floral-montage.png",
  },
  {
    id: "bed_sanctuary",
    subcat: "Bed Covers",
    title: "Heirloom Razais",
    tagline: "Hand-quilted Jaipur tagai stitching",
    priceText: "From ₹3,999",
    image: "/assets/hero/jaipur-chic-bedroom.png",
  },
  {
    id: "bed_sanctuary",
    subcat: "Bedsheets",
    title: "400 TC Bedsheets",
    tagline: "Silky Egyptian combed percale",
    priceText: "From ₹1,899",
    image: "/assets/bedsheets/warm-floral-bedding.png",
  },
  {
    id: "kids_atelier",
    subcat: "Baby Quilts",
    title: "Baby Nursery Quilts",
    tagline: "Hypoallergenic organic mulmul",
    priceText: "From ₹1,299",
    image: "/assets/collections_curated/quilts-blankets.jpg",
  },
];

// 4 Auto-Rotating Editorial Lifestyle Slides (Curated by Luxury Brand Copywriter)
const EDITORIAL_SLIDES = [
  {
    id: "slide-1",
    tag: "PURE JAIPUR MULMUL",
    headline: "Cloud-Light Mulmul.",
    highlightText: "Crafted for Rest.",
    subtitle: "Triple-layered air cotton filled with hand-carded fluff for all-night bliss.",
    priceTag: "From ₹2,499",
    ctaText: "Shop Summer Dohars",
    deptId: "bed_sanctuary",
    subcat: "Dohars",
    image: "/assets/hero/jaipur-chic-bedroom.png",
    productId: "dup-01", // Royal Jaipuri Silk-Mulmul Dohar
  },
  {
    id: "slide-2",
    tag: "400-YEAR SANGANER ATELIER",
    headline: "Hand-Stamped Heritage,",
    highlightText: "Woven for Life.",
    subtitle: "Carved teakwood blocks dipped in botanical dyes & sun-cured in Rajasthan.",
    priceTag: "From ₹3,499",
    ctaText: "Explore Bedcovers",
    deptId: "bed_sanctuary",
    subcat: "Bed Covers",
    image: "/assets/bedcovers/charcoal-floral-montage.png",
    productId: "bed-01", // Bespoke Floral Heritage King Bedcover
  },
  {
    id: "slide-3",
    tag: "COOLING 400 THREAD COUNT",
    headline: "Silky Sateen Weave,",
    highlightText: "Crisp Pure Slumber.",
    subtitle: "Breathable long-staple combed cotton sheets that stay refreshingly cool.",
    priceTag: "From ₹1,899",
    ctaText: "Shop 400 TC Sheets",
    deptId: "bed_sanctuary",
    subcat: "Bedsheets",
    image: "/assets/bedsheets/warm-floral-bedding.png",
    productId: "bed-03", // Charcoal Botanical Night Bedspread Set
  },
  {
    id: "slide-4",
    tag: "WINTER HEIRLOOM RAZAI",
    headline: "Carded Cotton Warmth,",
    highlightText: "Generational Touch.",
    subtitle: "Featherweight warmth stitched with authentic Jaipur micro-tagai quilting.",
    priceTag: "From ₹3,999",
    ctaText: "Shop Heirloom Razais",
    deptId: "bed_sanctuary",
    subcat: "Bed Covers",
    image: "/assets/bedcovers/royal-blue-geometric.png",
    productId: "bed-05", // Amber Fort Silk-Mulmul Razai
  },
];

interface HeroSectionProps {
  onShopNow: () => void;
  onSelectCategory?: (deptId: string, subcat?: string) => void;
}

export default function HeroSection({ onShopNow, onSelectCategory }: HeroSectionProps) {
  const { addToCart } = useCart();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Auto-rotate background image slides every 5 seconds
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % EDITORIAL_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const activeSlide = EDITORIAL_SLIDES[currentSlideIndex];
  const activeProduct: Product =
    PRODUCTS.find((p) => p.id === activeSlide.productId) || PRODUCTS[0];

  const handleHotspotAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2200);
  };

  const handleQuickNav = (deptId: string, subcat?: string) => {
    if (onSelectCategory) {
      onSelectCategory(deptId, subcat);
    }
    const el =
      document.getElementById("department-showcases") || document.getElementById("bestsellers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] border-b border-[#E5DDD0] select-none">
      
      {/* ========================================================================= */}
      {/* 1. DEDICATED MOBILE HERO (Auto-Scrolling Imagery + Modern Brand Presence)  */}
      {/* Exclusively Active on Screens < lg (Phones & Small Tablets)               */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full">
        {/* Full-Bleed High-Fashion Mobile Cinema Cover */}
        <div className="relative w-full h-[76vh] min-h-[520px] max-h-[640px] overflow-hidden bg-stone-900 shadow-xl flex flex-col justify-between p-4">
          
          {/* Background Auto-Scrolling / Cross-Fading Images */}
          {EDITORIAL_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlideIndex ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.headline}
                className="w-full h-full object-cover transition-transform duration-7000 ease-out scale-105"
              />
            </div>
          ))}

          {/* Luxury Gradient Overlay Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/45 pointer-events-none z-10" />

          {/* TOP BAR: Brand Presence Tag & Progress Indicators */}
          <div className="relative z-20 space-y-3 pt-1">
            {/* 4 Segmented Slide Progress Indicators */}
            <div className="grid grid-cols-4 gap-1.5 w-full">
              {EDITORIAL_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className="h-1 rounded-full overflow-hidden bg-white/35 backdrop-blur-xs relative cursor-pointer"
                  aria-label={`Jump to slide ${idx + 1}`}
                >
                  {idx === currentSlideIndex && (
                    <div className="h-full w-full bg-[#C28A42] shadow-xs" />
                  )}
                </button>
              ))}
            </div>

            {/* Minimalist Brand Presence Eyebrow */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md text-[#C28A42] text-[9.5px] font-mono font-bold tracking-[0.2em] uppercase border border-white/20 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C28A42] animate-pulse" />
                <span>DUPPATI • SLEEP IN ART</span>
              </span>

              {/* Pause / Play Auto-Rotation Button */}
              <button
                onClick={() => setIsAutoRotating((prev) => !prev)}
                className="p-1.5 rounded-full bg-black/55 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-xs transition active:scale-90 cursor-pointer"
                title={isAutoRotating ? "Pause Slide Rotation" : "Resume Slide Rotation"}
                aria-label="Toggle auto rotation"
              >
                {isAutoRotating ? (
                  <Pause className="w-3 h-3 text-[#C28A42] fill-current" />
                ) : (
                  <Play className="w-3 h-3 text-[#C28A42] fill-current ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* LOWER THIRD: Modern Luxury Copywriting & Shoppable Add to Bag */}
          <div className="relative z-20 space-y-3.5 pb-1">
            
            {/* Modern Poetic Typography */}
            <div className="text-white drop-shadow-md pr-1">
              <span className="inline-block text-[9.5px] font-mono uppercase tracking-[0.25em] text-[#C28A42] font-bold mb-1">
                ✦ {activeSlide.tag}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium leading-[1.16] text-white">
                {activeSlide.headline}{" "}
                <span className="italic font-serif bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">
                  {activeSlide.highlightText}
                </span>
              </h2>

              <p className="text-xs text-stone-200 font-light mt-1.5 line-clamp-2 leading-relaxed">
                {activeSlide.subtitle}
              </p>

              {/* Modern Action Row */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => handleQuickNav(activeSlide.deptId, activeSlide.subcat)}
                  className="px-5 py-2.5 rounded-full bg-[#541827] text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 active:scale-95 transition"
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C28A42]" />
                </button>

                <span className="text-xs font-mono font-bold text-amber-200 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/20">
                  {activeSlide.priceTag}
                </span>
              </div>
            </div>

            {/* Floating In-Image Shoppable Card with 1-Click "Add to Bag" */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-white/90 shadow-2xl text-[#141210] flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-stone-100 border border-[#E5DDD0] shrink-0">
                  <img
                    src={activeProduct.images[0]}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-mono text-[#C28A42] font-bold uppercase block truncate">
                    Featured Atelier Creation
                  </span>
                  <h4 className="font-serif text-xs font-bold text-[#141210] truncate leading-tight mt-0.5">
                    {activeProduct.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xs font-black text-[#541827] font-mono">
                      ₹{activeProduct.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-stone-400 line-through font-mono">
                      ₹{activeProduct.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* 1-Tap Direct Add to Bag */}
              <button
                onClick={(e) => handleHotspotAdd(activeProduct, e)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0 active:scale-95 ${
                  addedProductId === activeProduct.id
                    ? "bg-emerald-700 text-white"
                    : "bg-[#541827] text-white hover:bg-[#43121e]"
                }`}
              >
                {addedProductId === activeProduct.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-200 stroke-[2.6]" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C28A42]" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>


        {/* Compact Trust Guarantees */}
        <div className="px-3.5 pb-4">
          <div className="bg-white rounded-xl border border-[#E5DDD0] p-2.5 grid grid-cols-2 gap-2 text-stone-700 shadow-2xs">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-[#541827] shrink-0" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-[#181512]">Free Express Shipping</p>
                <p className="text-stone-400 font-light">All India</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#541827] shrink-0" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-[#181512]">100% Combed Cotton</p>
                <p className="text-stone-400 font-light">Pure breathability</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#541827] shrink-0" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-[#181512]">COD Available</p>
                <p className="text-stone-400 font-light">Pay at doorstep</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#541827] shrink-0" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-[#181512]">10-Day Easy Exchange</p>
                <p className="text-stone-400 font-light">Hassle-free pickup</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DEDICATED DESKTOP HERO (2-Column Atelier Stage with Video Showcase)   */}
      {/* Exclusively Active on Screens >= lg (Laptops & Desktops)                 */}
      {/* Unchanged & Preserved Exactly as Approved                                 */}
      {/* ========================================================================= */}
      <div className="hidden lg:block pt-8 pb-10 max-w-[1700px] w-full mx-auto px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* LEFT COLUMN: Headline, Value Proposition & Quick Shop Hub */}
          <div className="col-span-7 flex flex-col items-start gap-4 xl:gap-5">
            {/* Atelier Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5DDD0] text-[#541827] text-xs uppercase tracking-[0.22em] font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C28A42] animate-pulse" />
              <span>JAIPUR HERITAGE ATELIER • 100% PURE COMBED COTTON</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl lg:text-5xl xl:text-[56px] font-medium tracking-tight text-[#181512] leading-[1.12]">
              Handcrafted Comfort,{" "}
              <span className="italic font-serif bg-gradient-to-r from-[#541827] via-[#85182a] to-[#C28A42] bg-clip-text text-transparent">
                Woven for Soulful Rest.
              </span>
            </h1>

            {/* Useful, Crisp Subtitle */}
            <p className="text-stone-700 text-sm lg:text-base leading-relaxed max-w-xl font-normal">
              Authentic Sanganeri block-print bedcovers, whisper-light 3-layer mulmul dohars, and
              breathable 400 TC percale bedsheets crafted directly by generational artisans in Rajasthan.
            </p>

            {/* 4 Direct Category Quick-Shop Cards */}
            <div className="w-full pt-1">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#C28A42] uppercase block mb-2">
                WHAT WOULD YOU LIKE TO EXPLORE?
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {QUICK_CATEGORIES.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleQuickNav(cat.id, cat.subcat)}
                    className="group bg-white hover:bg-[#FAF7F2] p-2.5 rounded-2xl border border-[#E5DDD0] hover:border-[#541827] transition-all duration-300 shadow-2xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-stone-100 border border-[#E5DDD0] shrink-0">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-xs font-bold text-[#181512] group-hover:text-[#541827] truncate leading-tight transition-colors">
                          {cat.title}
                        </h4>
                        <span className="text-[9.5px] font-mono font-bold text-[#541827] block mt-0.5">
                          {cat.priceText}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-stone-500 font-medium border-t border-[#E5DDD0]/50 pt-1.5">
                      <span className="truncate">
                        {cat.tagline.split(" ")[0]} {cat.tagline.split(" ")[1]}
                      </span>
                      <ChevronRight className="w-3 h-3 text-[#C28A42] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onShopNow}
                className="px-7 py-3 rounded-full bg-[#541827] hover:bg-[#43121e] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Bestselling Bedding</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C28A42] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-3 rounded-full bg-white hover:bg-stone-50 text-[#181512] border border-[#E5DDD0] hover:border-[#541827] font-bold text-xs tracking-wider uppercase transition shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C28A42]" />
                <span>All Collections</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Auto-Rotating Sanctuary Lifestyle Showcase */}
          <div className="col-span-5 relative w-full">
            <div className="relative w-full aspect-[4/3.8] rounded-3xl overflow-hidden border-2 border-[#E5DDD0] bg-stone-900 shadow-xl group">
              
              <img
                src={activeSlide.image}
                alt={activeSlide.headline}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/35 pointer-events-none" />

              {/* Top Slide Tag */}
              <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#C28A42] text-[10px] font-mono font-bold tracking-wider border border-white/20 shadow-xs">
                  {activeSlide.tag}
                </span>
              </div>

              {/* Floating Interactive Hotspot Shoppable Drawer with DIRECT ADD TO CART */}
              <div className="absolute bottom-3.5 inset-x-3.5 z-20">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-2xl text-[#141210] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-[#E5DDD0] shrink-0">
                      <img
                        src={activeProduct.images[0]}
                        alt={activeProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9.5px] font-mono text-[#C28A42] font-bold uppercase block truncate">
                        Featured Sanctuary Look
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[#141210] truncate leading-tight mt-0.5">
                        {activeProduct.name}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-sm font-black text-[#541827] font-mono">
                          ₹{activeProduct.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10.5px] text-stone-400 line-through font-mono">
                          ₹{activeProduct.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Direct "Add to Cart" Button */}
                  <button
                    onClick={(e) => handleHotspotAdd(activeProduct, e)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0 active:scale-95 ${
                      addedProductId === activeProduct.id
                        ? "bg-emerald-700 text-white"
                        : "bg-[#541827] hover:bg-[#43121e] text-white"
                    }`}
                  >
                    {addedProductId === activeProduct.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-200 stroke-[2.6]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C28A42]" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Slide Switcher Dots */}
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  {EDITORIAL_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentSlideIndex
                          ? "w-7 bg-[#C28A42]"
                          : "w-2 bg-white/50 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Trust Strip */}
        <div className="mt-8 pt-4 border-t border-[#E5DDD0] grid grid-cols-4 gap-4 text-stone-700">
          <div className="flex items-center gap-2.5 p-1">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E5DDD0] flex items-center justify-center shrink-0 shadow-2xs">
              <Truck className="w-4 h-4 text-[#541827]" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-[#181512]">Free Express Shipping</p>
              <p className="text-[10px] text-stone-500 font-normal">All India on all orders</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E5DDD0] flex items-center justify-center shrink-0 shadow-2xs">
              <Award className="w-4 h-4 text-[#541827]" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-[#181512]">100% Combed Cotton</p>
              <p className="text-[10px] text-stone-500 font-normal">Pure breathable fibers</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E5DDD0] flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#541827]" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-[#181512]">COD Available</p>
              <p className="text-[10px] text-stone-500 font-normal">Pay at your doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="w-8 h-8 rounded-full bg-white border border-[#E5DDD0] flex items-center justify-center shrink-0 shadow-2xs">
              <RefreshCw className="w-4 h-4 text-[#541827]" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-[#181512]">10-Day Easy Exchange</p>
              <p className="text-[10px] text-stone-500 font-normal">Doorstep pickup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
