"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product } from "@/data/products";
import { Plus, Check, ShoppingBag, Eye, Sparkles, Layers, ChevronRight } from "lucide-react";

interface Hotspot {
  id: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  productId: string;
  label: string;
  role: string; // e.g., "Layer 1: Base Sheet", "Layer 2: Cloud Dohar"
}

interface SanctuaryLook {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  palette: string[];
  hotspots: Hotspot[];
}

const SANCTUARY_LOOKS: SanctuaryLook[] = [
  {
    id: "jaipur-sunlit",
    title: "Jaipur Sunlit Master Sanctuary",
    subtitle: "Warm earthy botanicals layered with breathable 100% mulmul",
    tagline: "Vogue Living Pick • Featured in Architectural Digest India",
    image: "/assets/bedsheets/floral-linen-bedroom.png",
    palette: ["#C28A42", "#8B4513", "#FAF6F0"],
    hotspots: [
      {
        id: "hs-1",
        x: 38,
        y: 28,
        productId: "pil-02",
        label: "Pillow Shams (Pair)",
        role: "Layer 1 • Accent Pillows",
      },
      {
        id: "hs-2",
        x: 52,
        y: 52,
        productId: "bed-01",
        label: "Heritage King Bedcover",
        role: "Layer 2 • Reversible Quilted Base",
      },
      {
        id: "hs-3",
        x: 68,
        y: 72,
        productId: "dup-01",
        label: "Jaipuri Mulmul Dohar",
        role: "Layer 3 • Breathable Cloud Layer",
      },
      {
        id: "hs-4",
        x: 25,
        y: 65,
        productId: "ess-02",
        label: "Percale Cotton Bedsheet",
        role: "Foundation • 400 TC Fitted Sheet",
      },
    ],
  },
  {
    id: "forest-emerald",
    title: "Mewar Emerald Suite",
    subtitle: "Deep forest greens harmonized with natural unbleached ivory",
    tagline: "Cooling All-Season • Handcrafted in Sanganer",
    image: "/assets/bedcovers/forest-green-suite.png",
    palette: ["#144233", "#D4A373", "#FAF8F5"],
    hotspots: [
      {
        id: "hs-21",
        x: 48,
        y: 35,
        productId: "bed-07",
        label: "Floral Bolster Pair",
        role: "Layer 1 • Bolster Support",
      },
      {
        id: "hs-22",
        x: 55,
        y: 62,
        productId: "bed-04",
        label: "Forest Green King Bedcover",
        role: "Layer 2 • Heritage Quilt",
      },
      {
        id: "hs-23",
        x: 32,
        y: 58,
        productId: "ess-02",
        label: "Percale Fitted Sheet",
        role: "Foundation • 100% Combed Cotton",
      },
    ],
  },
  {
    id: "indigo-royale",
    title: "Royal Indigo Haveli Loft",
    subtitle: "Traditional vegetable indigo block prints with crisp white percale",
    tagline: "400-Year Heritage • Natural Plant Dye Indigo",
    image: "/assets/bedcovers/blue-collection.png",
    palette: ["#1E3A8A", "#64748B", "#F8FAFC"],
    hotspots: [
      {
        id: "hs-31",
        x: 42,
        y: 32,
        productId: "pil-02",
        label: "Indigo Motif Accent Pillows",
        role: "Layer 1 • Decorative Shams",
      },
      {
        id: "hs-32",
        x: 58,
        y: 55,
        productId: "bed-02",
        label: "Royal Blue Geometric Bedcover",
        role: "Layer 2 • Master Bedcover",
      },
      {
        id: "hs-33",
        x: 72,
        y: 75,
        productId: "bed-06",
        label: "Teakwood Paisley Bed Runner",
        role: "Layer 3 • Foot Runner Accent",
      },
    ],
  },
];

export default function ShopTheLook() {
  const { addToCart, openQuickView, openCart } = useCart();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    SANCTUARY_LOOKS[0].hotspots[1].id
  );
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [isBundleAdded, setIsBundleAdded] = useState(false);

  const currentLook = SANCTUARY_LOOKS[activeLookIndex];

  // Resolve products for current look
  const currentHotspotsWithProducts = currentLook.hotspots
    .map((hs) => {
      const product = PRODUCTS.find((p) => p.id === hs.productId);
      return {
        ...hs,
        product,
      };
    })
    .filter((hs): hs is Hotspot & { product: Product } => hs.product !== undefined);

  // Active highlighted hotspot
  const activeSpot =
    currentHotspotsWithProducts.find((hs) => hs.id === activeHotspotId) ||
    currentHotspotsWithProducts[0];

  // Calculate bundle total price
  const bundleTotalPrice = currentHotspotsWithProducts.reduce(
    (sum, hs) => sum + hs.product.price,
    0
  );
  const bundleOriginalPrice = currentHotspotsWithProducts.reduce(
    (sum, hs) => sum + hs.product.originalPrice,
    0
  );
  const bundleSavings = bundleOriginalPrice - bundleTotalPrice;

  const handleSelectLook = (idx: number) => {
    setActiveLookIndex(idx);
    const firstSpot = SANCTUARY_LOOKS[idx].hotspots[1] || SANCTUARY_LOOKS[idx].hotspots[0];
    setActiveHotspotId(firstSpot.id);
  };

  const handleAddSingleItem = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(product, product.colors?.[0]?.name || "Natural Cotton", 1);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2200);
  };

  const handleAddEntireBundle = () => {
    currentHotspotsWithProducts.forEach((hs) => {
      addToCart(hs.product, hs.product.colors?.[0]?.name || "Natural Cotton", 1);
    });
    setIsBundleAdded(true);
    setTimeout(() => {
      setIsBundleAdded(false);
      openCart();
    }, 900);
  };

  return (
    <section className="w-full py-8 sm:py-16 bg-[#FAF6F0] border-b border-[#E5DDD0] overflow-hidden">
      <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#541827]/10 border border-[#541827]/20 text-[#541827] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-1.5">
              <Sparkles className="w-3 h-3 text-[#C28A42]" />
              Interactive Lookbook
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#29251F] font-normal tracking-tight">
              Shop The Bedroom Sanctuary
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light mt-1 max-w-xl">
              Tap the glowing <span className="font-semibold text-[#541827]">+</span> pins on the styled bed to reveal each handcrafted layer — from breathable base sheets to whisper-light mulmul dohars.
            </p>
          </div>

          {/* Lookbook Room Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
            {SANCTUARY_LOOKS.map((look, idx) => {
              const isActive = idx === activeLookIndex;
              return (
                <button
                  key={look.id}
                  onClick={() => handleSelectLook(idx)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#541827] text-white shadow-sm ring-2 ring-[#541827]/20"
                      : "bg-white text-stone-700 border border-[#E5DDD0] hover:border-stone-400"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: look.palette[0] }}
                  />
                  <span>Look 0{idx + 1}</span>
                  <span className="hidden sm:inline text-[11px] opacity-75">
                    • {look.title.split(" ")[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          {/* Interactive Bedroom Canvas (7 cols on Desktop, Full Bleed on Mobile) */}
          <div className="lg:col-span-8 relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 border border-[#E5DDD0] shadow-md group">
            {/* Visual Bedroom Canvas Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full select-none">
              <Image
                src={currentLook.image}
                alt={currentLook.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Editorial Caption Tag (Top Left) */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-medium border border-white/20">
                  {currentLook.tagline}
                </span>
              </div>

              {/* Mobile "Tap Pin" Hint Badge (Top Right) */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-[#541827] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C28A42] animate-pulse" />
                  Tap pins to shop
                </span>
              </div>

              {/* HOTSPOT PINS OVERLAY */}
              {currentHotspotsWithProducts.map((hs, index) => {
                const isSelected = hs.id === activeHotspotId;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspotId(hs.id)}
                    aria-label={`View ${hs.label}`}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group/pin transition-transform duration-300 cursor-pointer ${
                      isSelected ? "scale-125 z-40" : "hover:scale-115"
                    }`}
                  >
                    {/* Pulsing Outer Aura */}
                    <span
                      className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                        isSelected ? "bg-[#C28A42]" : "bg-white"
                      }`}
                    />

                    {/* Outer Border Ring */}
                    <div
                      className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-sm ${
                        isSelected
                          ? "bg-[#541827] text-white ring-4 ring-[#C28A42]/80 shadow-[#541827]/40"
                          : "bg-white/95 text-[#29251F] ring-2 ring-white/60 hover:bg-[#541827] hover:text-white"
                      }`}
                    >
                      <Plus
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                          isSelected ? "rotate-45 text-[#E6C687]" : ""
                        }`}
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#C28A42] text-white text-[8px] font-black flex items-center justify-center border border-white">
                        {index + 1}
                      </span>
                    </div>

                    {/* Hover Desktop Tooltip Tag */}
                    <div className="hidden lg:group-hover/pin:flex absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/85 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-md shadow-md pointer-events-none items-center gap-1.5 border border-white/15">
                      <span className="font-medium">{hs.label}</span>
                      <span className="text-[#C28A42] font-bold">₹{hs.product.price}</span>
                    </div>
                  </button>
                );
              })}

              {/* Bottom Hotspot Quick Selector Pills (Mobile Friendly) */}
              <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-20 flex items-center justify-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {currentHotspotsWithProducts.map((hs, index) => {
                  const isSelected = hs.id === activeHotspotId;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setActiveHotspotId(hs.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium transition cursor-pointer flex items-center gap-1 whitespace-nowrap shadow-sm backdrop-blur-md ${
                        isSelected
                          ? "bg-[#541827] text-white ring-1 ring-white/50"
                          : "bg-black/60 text-white/90 hover:bg-black/80"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-[9px] flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <span>{hs.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Inspector Column (Detail of selected Hotspot + Sanctuary Bundle CTA) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Active Pinned Item Card */}
            {activeSpot && activeSpot.product && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#E5DDD0] shadow-sm relative overflow-hidden transition-all duration-300">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD0]">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-[#C28A42]">
                    {activeSpot.role}
                  </span>
                  <span className="text-[10px] font-medium bg-[#FAF6F0] px-2 py-0.5 rounded text-stone-600 border border-[#E5DDD0]">
                    In Stock • Ready to Ship
                  </span>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 border border-[#E5DDD0] bg-stone-50">
                    <Image
                      src={activeSpot.product.images[0] || currentLook.image}
                      alt={activeSpot.product.name}
                      fill
                      sizes="(max-width: 640px) 80px, 96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm sm:text-base font-normal text-[#29251F] leading-snug line-clamp-2">
                      {activeSpot.product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-light mt-0.5 truncate">
                      {activeSpot.product.fabric} • {activeSpot.product.craft}
                    </p>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-serif text-base sm:text-lg font-bold text-[#541827]">
                        ₹{activeSpot.product.price.toLocaleString("en-IN")}
                      </span>
                      {activeSpot.product.originalPrice > activeSpot.product.price && (
                        <span className="text-xs text-stone-400 line-through">
                          ₹{activeSpot.product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        Save {activeSpot.product.discountPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1-Tap Actions for Active Hotspot */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E5DDD0]">
                  <button
                    onClick={() => openQuickView(activeSpot.product)}
                    className="py-2.5 px-3 rounded-md bg-[#FAF6F0] hover:bg-[#F2EAE0] text-stone-700 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#E5DDD0]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>

                  <button
                    onClick={(e) => handleAddSingleItem(activeSpot.product, e)}
                    className={`py-2.5 px-3 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs ${
                      addedItemIds[activeSpot.product.id]
                        ? "bg-emerald-700 text-white"
                        : "bg-[#541827] hover:bg-[#43121e] text-white"
                    }`}
                  >
                    {addedItemIds[activeSpot.product.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Sanctuary Bundle Card: "Shop The Entire Sanctuary Set" */}
            <div className="bg-gradient-to-br from-[#541827] to-[#360F1A] rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-md border border-[#7A253A] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C28A42]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#E6C687] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#E6C687]" />
                  Curated Sanctuary Set
                </span>
                <span className="text-[10px] bg-[#E6C687] text-[#541827] px-2 py-0.5 rounded font-black tracking-wide uppercase">
                  Save 15%
                </span>
              </div>

              <h3 className="font-serif text-base sm:text-lg font-normal text-white">
                Shop Complete {currentLook.title.split(" ")[0]} Bedroom Look
              </h3>
              <p className="text-[11px] sm:text-xs text-white/80 font-light mt-1">
                Includes all {currentHotspotsWithProducts.length} layered pieces styled above: sheets, shams & dohar.
              </p>

              {/* Price Breakdown */}
              <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-white/15">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#E6C687]">
                  ₹{bundleTotalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-white/50 line-through">
                  ₹{bundleOriginalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-emerald-300 font-medium">
                  (Save ₹{bundleSavings.toLocaleString("en-IN")})
                </span>
              </div>

              <button
                onClick={handleAddEntireBundle}
                disabled={isBundleAdded}
                className="w-full mt-3.5 py-3 px-4 rounded-md bg-[#E6C687] hover:bg-[#D4A373] text-[#541827] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-sm active:scale-98"
              >
                {isBundleAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#541827]" />
                    <span>Adding Complete Set to Bag...</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4 text-[#541827]" />
                    <span>Add Entire Set to Bag ({currentHotspotsWithProducts.length} Items)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
