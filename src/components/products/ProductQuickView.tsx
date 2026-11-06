"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import PincodeChecker from "@/components/pincode/PincodeChecker";

export default function ProductQuickView() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isWishlisted } = useCart();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);
  const currentColor = selectedColor || product.colors[0]?.name;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          className="relative w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden border border-[#E5DDD0] max-h-[92vh] sm:my-8 overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/95 text-stone-700 hover:text-stone-900 border border-[#E5DDD0] shadow-sm transition cursor-pointer"
            aria-label="Close Preview"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-4 sm:p-6 bg-[#FAF6F0] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5DDD0]">
              <div className="relative aspect-[4/3.2] sm:aspect-[4/5] rounded-xl overflow-hidden bg-stone-200">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold bg-white/95 text-[#541827] border border-[#E5DDD0]">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-14 h-16 rounded-sm overflow-hidden border transition ${
                      activeImageIdx === i ? "border-[#541827]" : "border-[#E5DDD0] opacity-70"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info & Actions Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C28A42]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C28A42]" />
                  <span>{product.craft}</span>
                </div>

                <h2 className="font-serif text-2xl font-normal text-[#29251F] mt-1">
                  {product.name}
                </h2>
                <p className="text-xs text-stone-500 font-light mt-1">{product.tagline}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3 text-xs text-stone-700">
                  <div className="flex items-center gap-0.5 text-[#C28A42]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? "fill-[#C28A42]" : "text-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-stone-400 font-light">
                    ({product.reviewsCount} verified patrons)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-[#29251F]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="font-mono text-sm text-stone-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#541827] bg-[#541827]/10 px-2 py-0.5 rounded-sm">
                        Save {product.discountPercent}%
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 font-light mt-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Fabric & Dimensions Spec Sheet */}
                <div className="mt-4 p-3.5 rounded-sm bg-[#FAF6F0] border border-[#E5DDD0] space-y-1.5 text-xs text-stone-700">
                  <p>
                    <strong className="text-[#29251F] font-medium">Fabric:</strong> {product.fabric}
                  </p>
                  <p>
                    <strong className="text-[#29251F] font-medium">Dimensions:</strong> {product.dimensions}
                  </p>
                </div>

                {/* Color Chooser */}
                <div className="mt-5">
                  <label className="block text-[11px] font-medium text-stone-800 uppercase tracking-wider mb-2">
                    Palette: <span className="font-normal text-stone-500">{currentColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 rounded-sm border text-xs flex items-center gap-1.5 transition ${
                          currentColor === c.name
                            ? "border-[#541827] bg-[#541827] text-white"
                            : "border-[#E5DDD0] bg-white text-stone-700 hover:border-stone-400"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pincode Shiprocket Check */}
                <div className="mt-5">
                  <PincodeChecker compact />
                </div>
              </div>

              {/* Sticky Action Buttons */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-md pt-3 pb-1 mt-5 border-t border-[#E5DDD0] flex gap-2.5 z-20">
                <button
                  onClick={() => {
                    addToCart(product, currentColor);
                    closeQuickView();
                  }}
                  className="flex-1 py-3 sm:py-3.5 rounded-xl bg-[#541827] hover:bg-[#43121e] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C28A42]" />
                  <span>Add to Bag • ₹{product.price.toLocaleString("en-IN")}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 sm:p-3.5 rounded-xl border transition cursor-pointer active:scale-90 ${
                    wishlisted
                      ? "border-[#541827] bg-[#541827] text-white"
                      : "border-[#E5DDD0] text-stone-700 hover:border-[#541827]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlisted ? "fill-white" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
