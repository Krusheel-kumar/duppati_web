"use client";

import React, { useState, useRef } from "react";
import { Heart, Plus, Check, ChevronLeft, ChevronRight, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product } from "@/data/products";

interface CardDeckItem {
  id: string;
  product: Product;
  categoryName: string;
  badge: string;
  bigTitleLine1: string;
  bigTitleLine2: string;
  bgColor: string;
  textColor: string;
  desktopTilt: string;
}

export default function FeaturedCollectionBanner({
  onExplore,
}: {
  onExplore: () => void;
}) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useCart();
  const [addedCardId, setAddedCardId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 7 Signature Bestsellers with Brand Palette and Category Identifiers
  const deckItems: CardDeckItem[] = [
    {
      id: "deck-1",
      product: PRODUCTS.find((p) => p.id === "dup-01") || PRODUCTS[0],
      categoryName: "Mulmul Dohar",
      badge: "BESTSELLER",
      bigTitleLine1: "JAIPUR",
      bigTitleLine2: "DOHAR",
      bgColor: "bg-[#7C2D12]", // Warm Terracotta Umber
      textColor: "text-amber-100",
      desktopTilt: "lg:-rotate-[5deg] lg:translate-y-2",
    },
    {
      id: "deck-2",
      product: PRODUCTS.find((p) => p.id === "bed-02") || PRODUCTS[1],
      categoryName: "King Bedcover",
      badge: "HANDBLOCK",
      bigTitleLine1: "ROYAL",
      bigTitleLine2: "INDIGO",
      bgColor: "bg-[#1E3A8A]", // Royal Indigo Navy
      textColor: "text-blue-100",
      desktopTilt: "lg:-rotate-[3deg] lg:translate-y-1",
    },
    {
      id: "deck-3",
      product: PRODUCTS.find((p) => p.id === "bed-05") || PRODUCTS[2],
      categoryName: "Heirloom Razai",
      badge: "PURE COTTON",
      bigTitleLine1: "PALACE",
      bigTitleLine2: "RAZAI",
      bgColor: "bg-[#541827]", // Duppati Signature Royal Burgundy
      textColor: "text-rose-100",
      desktopTilt: "lg:-rotate-[1deg] lg:translate-y-0.5",
    },
    {
      id: "deck-4",
      product: PRODUCTS.find((p) => p.id === "bed-03") || PRODUCTS[3],
      categoryName: "400 TC Bedsheet",
      badge: "COOL SATEEN",
      bigTitleLine1: "MEWAR",
      bigTitleLine2: "FOREST",
      bgColor: "bg-[#064E3B]", // Deep Emerald Pine
      textColor: "text-emerald-100",
      desktopTilt: "lg:rotate-0 lg:translate-y-0",
    },
    {
      id: "deck-5",
      product: PRODUCTS.find((p) => p.id === "bed-01") || PRODUCTS[4],
      categoryName: "Artisan Heritage",
      badge: "HERITAGE",
      bigTitleLine1: "AMBER",
      bigTitleLine2: "HERITAGE",
      bgColor: "bg-[#831843]", // Jaipur Rose Madder
      textColor: "text-pink-100",
      desktopTilt: "lg:rotate-[1.5deg] lg:translate-y-0.5",
    },
    {
      id: "deck-6",
      product: PRODUCTS.find((p) => p.id === "kid-01") || PRODUCTS[5],
      categoryName: "Baby Bedding",
      badge: "ORGANIC MULMUL",
      bigTitleLine1: "NURSERY",
      bigTitleLine2: "KANTHA",
      bgColor: "bg-[#92400E]", // Golden Saffron Ochre
      textColor: "text-amber-100",
      desktopTilt: "lg:rotate-[3.5deg] lg:translate-y-1",
    },
    {
      id: "deck-7",
      product: PRODUCTS.find((p) => p.id === "pil-02") || PRODUCTS[6],
      categoryName: "Living Cushion",
      badge: "HAND-STITCHED",
      bigTitleLine1: "BOTANIC",
      bigTitleLine2: "CUSHION",
      bgColor: "bg-[#1E293B]", // Heritage Slate Black
      textColor: "text-stone-200",
      desktopTilt: "lg:rotate-[5.5deg] lg:translate-y-2",
    },
  ];

  const handleQuickAdd = (e: React.MouseEvent, product: Product, cardId: string) => {
    e.stopPropagation();
    addToCart(product, product.colors[0]?.name);
    setAddedCardId(cardId);
    setTimeout(() => setAddedCardId(null), 1800);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-[#FCF9F5] border-b border-[#E5DDD0] w-full overflow-hidden select-none">
      <div className="max-w-[1750px] w-full mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* 1. Section Header: Bestsellers & Category Hub */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-10 gap-3 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#C28A42] mb-1">
              <span className="w-5 h-[1.5px] bg-[#C28A42]" />
              <span>HANDPICKED BESTSELLERS • SIGNATURE ATELIER</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#141210] tracking-tight">
              Our Signature{" "}
              <span className="text-[#541827] italic font-serif">
                Bestsellers
              </span>
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed max-w-xs sm:max-w-md">
              Swipe across our most-loved Jaipur creations. Tap{" "}
              <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#541827] text-white text-[10px] sm:text-[11px] font-bold align-middle mx-0.5">
                +
              </span>{" "}
              to add instantly to your bag.
            </p>

            {/* Scroll Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                onClick={scrollLeft}
                className="w-8 h-8 rounded-full bg-white border border-[#E5DDD0] shadow-2xs hover:bg-[#541827] hover:text-white flex items-center justify-center text-stone-700 transition cursor-pointer active:scale-90"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="w-8 h-8 rounded-full bg-white border border-[#E5DDD0] shadow-2xs hover:bg-[#541827] hover:text-white flex items-center justify-center text-stone-700 transition cursor-pointer active:scale-90"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Interactive Bestseller Cards (Upright Snap on Mobile, Gentle Fan on Desktop) */}
        <div className="relative pt-1 pb-4">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex items-center gap-3 sm:gap-4 lg:gap-5 overflow-x-auto no-scrollbar pb-4 pt-2 px-1 snap-x snap-mandatory"
          >
            {deckItems.map((item) => {
              const { product } = item;
              const wishlisted = isWishlisted(product.id);
              const isJustAdded = addedCardId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => openQuickView(product)}
                  className={`group relative shrink-0 w-[185px] sm:w-[215px] lg:w-[235px] xl:w-[245px] aspect-[1/1.58] rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between overflow-hidden shadow-md transition-all duration-300 ease-out cursor-pointer snap-start select-none ${item.bgColor} ${item.desktopTilt} hover:rotate-0 hover:translate-y-[-6px] hover:scale-103 hover:shadow-xl active:scale-98`}
                >
                  {/* Top: Category Tag Badge & Wishlist Heart */}
                  <div className="relative z-10 flex items-start justify-between w-full gap-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-amber-200 border border-white/15 w-fit">
                        {item.categoryName}
                      </span>
                      <h4 className={`font-serif text-base sm:text-lg font-bold leading-tight mt-1.5 ${item.textColor} line-clamp-1`}>
                        {item.bigTitleLine1} {item.bigTitleLine2}
                      </h4>
                    </div>

                    {/* Circular Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer shrink-0 active:scale-90 ${
                        wishlisted
                          ? "bg-[#541827] text-white scale-105"
                          : "bg-white/95 text-stone-800 hover:bg-white"
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wishlisted ? "fill-white text-white" : "stroke-[2.2]"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Center: High-Resolution Product Artwork */}
                  <div className="relative z-0 my-auto w-full flex items-center justify-center py-1">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/10 backdrop-blur-[2px] shadow-[0_8px_20px_rgba(0,0,0,0.22)] group-hover:scale-104 transition-transform duration-500">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover select-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Bottom: Pricing & Direct Quick Add Button */}
                  <div className="relative z-10 flex items-center justify-between w-full pt-1.5 border-t border-white/20">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs sm:text-sm font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="font-mono text-[9px] text-white/70 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Circular Plus (+) Add-to-Bag Button */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product, item.id)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer active:scale-90 ${
                        isJustAdded
                          ? "bg-emerald-600 text-white scale-110"
                          : "bg-white text-[#141210] hover:bg-[#541827] hover:text-white"
                      }`}
                      aria-label="Add to Bag"
                      title="Quick Add to Bag"
                    >
                      {isJustAdded ? (
                        <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-100" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.8]" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Interactive Scroll Progress Track */}
          <div className="sm:hidden flex justify-center mt-3">
            <div className="w-32 h-1 bg-[#E5DDD0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#541827] rounded-full transition-all duration-150"
                style={{ width: `${Math.max(18, scrollProgress)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3. Bottom Direct Exploration Link */}
        <div className="flex justify-center mt-3 sm:mt-6">
          <button
            onClick={onExplore}
            className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#541827] hover:text-[#43121e] border-b-2 border-[#541827] pb-0.5 cursor-pointer transition-colors"
          >
            Explore All Studio Bestsellers →
          </button>
        </div>
      </div>
    </section>
  );
}
