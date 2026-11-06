"use client";

import React, { useState } from "react";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl border border-[#E5DDD0] overflow-hidden transition-all duration-300 hover:border-[#C28A42] hover:shadow-xl hover:-translate-y-1 shadow-2xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Big, Prominent Image Container: aspect-[3/4] on mobile (hero visual), sm:aspect-[4/3.3] on desktop */}
      <div
        onClick={() => openQuickView(product)}
        className="relative aspect-[3/4] sm:aspect-[4/3.3] w-full overflow-hidden bg-[#FAF6F0] cursor-pointer"
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 select-none"
          loading="lazy"
        />

        {/* Subtle Dark Gradient at bottom of image for contrast */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

        {/* Top-Left Badge (Bestseller, Cloud Soft, Discount) */}
        {product.badge ? (
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold bg-white/95 backdrop-blur-md text-[#541827] border border-[#C28A42]/40 shadow-xs rounded-full">
              {product.badge}
            </span>
          </div>
        ) : product.discountPercent ? (
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold bg-[#541827] text-white shadow-xs rounded-full">
              {product.discountPercent}% OFF
            </span>
          </div>
        ) : null}

        {/* Top-Right Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition border cursor-pointer shadow-xs ${
            wishlisted
              ? "bg-[#541827] text-white border-[#541827] scale-105"
              : "bg-white/95 backdrop-blur-md text-stone-700 border-[#E5DDD0] hover:text-[#541827] hover:border-[#541827] hover:bg-white"
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlisted ? "fill-white" : "stroke-[2.2]"}`} />
        </button>

        {/* Floating Rating Pill over image on bottom-left - saves vertical text space below */}
        <div className="absolute bottom-2 left-2 z-10 px-1.5 py-0.5 rounded-md bg-black/55 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1 shadow-xs pointer-events-none">
          <Star className="w-2.5 h-2.5 fill-[#C28A42] text-[#C28A42]" />
          <span className="font-bold">{product.rating}</span>
          <span className="text-white/70 text-[9px] hidden xs:inline">({product.reviewsCount})</span>
        </div>

        {/* Desktop Quick View Hint on hover */}
        <div className="absolute bottom-2 right-2 z-10 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] text-stone-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Quick View
        </div>
      </div>

      {/* Streamlined, Minimal Content Area - Compact on Mobile, Rich on Desktop */}
      <div className="p-2 sm:p-3.5 flex-1 flex flex-col justify-between bg-white gap-1.5 sm:gap-2">
        <div className="space-y-0.5 sm:space-y-1">
          {/* Subcategory Pill (Desktop only, saves mobile vertical bulk) */}
          <div className="hidden sm:flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#C28A42] font-black">
            <span className="truncate">{product.subcategory || product.craft}</span>
          </div>

          {/* Product Title: 1 Clean Line on Mobile (truncated), 2 Lines on Desktop */}
          <h3
            onClick={() => openQuickView(product)}
            title={product.name}
            className="font-serif text-xs xs:text-[13px] sm:text-base font-bold text-[#141210] hover:text-[#541827] transition-colors cursor-pointer truncate sm:line-clamp-2 leading-tight"
          >
            {product.name}
          </h3>

          {/* Redundant Technical Fabric/Craft Details: Hidden on Mobile to keep card light */}
          <p className="hidden sm:block text-[11px] text-stone-500 font-medium line-clamp-1">
            {product.fabric} • {product.craft}
          </p>
        </div>

        {/* Price & Variant Row */}
        <div className="pt-1 sm:pt-1.5 flex items-center justify-between gap-1">
          {/* Bold Price Display */}
          <div className="flex items-baseline gap-1 sm:gap-1.5">
            <span className="font-mono text-xs xs:text-sm sm:text-base font-black text-[#541827]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono text-[9px] xs:text-[10px] sm:text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Color Variant Dots (Micro on mobile, regular on desktop) */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1 shrink-0">
              {product.colors.slice(0, 3).map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  title={c.name}
                  className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full transition-all cursor-pointer ${
                    selectedColor === c.name
                      ? "ring-1.5 ring-[#541827] ring-offset-1 scale-110"
                      : "opacity-75 hover:opacity-100 border border-stone-200"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Compact, Sleek Tactile CTA */}
        <button
          onClick={handleQuickAdd}
          className={`w-full py-1.5 xs:py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95 ${
            justAdded
              ? "bg-emerald-700 text-white shadow-xs"
              : "bg-[#541827] hover:bg-[#43121e] text-white hover:shadow-xs"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[2.8]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-[#C28A42] stroke-[2.2]" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
