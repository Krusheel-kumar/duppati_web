"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Search, X, ShoppingBag, Check } from "lucide-react";
import { PRODUCTS, DEPARTMENTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
  onSelectCategory: (catId: string, subcat?: string) => void;
}

const TRENDING_SEARCHES = [
  { label: "King Bedcovers", deptId: "bed_sanctuary", subcat: "Bed Covers" },
  { label: "Mulmul Dohars", deptId: "bed_sanctuary", subcat: "Dohar" },
  { label: "Baby Bedding", deptId: "kids_atelier", subcat: "Baby Bedding Sets" },
  { label: "Sofa Slipcovers", deptId: "living_room", subcat: "Sofa Covers" },
  { label: "Dining Placemats", deptId: "kitchen_dining", subcat: "Dining Mats" },
  { label: "Dhurrie Rugs", deptId: "living_room", subcat: "Dhurries" },
  { label: "Bath Towels", deptId: "bath_utility", subcat: "Bath Towels" },
];

export default function MobileSearchModal({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory,
}: MobileSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.departmentLabel.toLowerCase().includes(q) ||
        p.craft.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#FAF6F0] lg:hidden">
        {/* Top Header Bar */}
        <div className="px-4 py-3.5 bg-white border-b border-[#E5DDD0] flex items-center gap-3 shrink-0 shadow-xs">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#541827]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bedcovers, dohars, cushions..."
              className="w-full pl-10 pr-9 py-2.5 text-sm font-semibold rounded-full bg-[#FAF6F0] border border-[#E5DDD0] text-[#141210] placeholder:text-stone-400 placeholder:font-normal focus:bg-white focus:outline-none focus:border-[#541827]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-xs font-bold uppercase tracking-wider text-[#541827] px-2 py-1.5 shrink-0"
          >
            Cancel
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* If no query, show trending search pills & department quick links */}
          {!query.trim() ? (
            <div className="space-y-6">
              {/* Trending Searches */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C28A42] mb-3">
                  Trending Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        onSelectCategory(item.deptId, item.subcat);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white border border-[#E5DDD0] text-[#141210] hover:border-[#541827] shadow-2xs cursor-pointer active:scale-95 transition"
                    >
                      <Search className="w-3 h-3 text-[#C28A42]" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Collection */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C28A42] mb-3">
                  Explore Collections
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => {
                        onSelectCategory(dept.id);
                        onClose();
                      }}
                      className="p-3 rounded-xl bg-white border border-[#E5DDD0] flex flex-col items-start text-left shadow-2xs hover:border-[#541827] active:scale-98 transition cursor-pointer"
                    >
                      <span className="font-serif font-bold text-sm text-[#141210]">
                        {dept.navLabel}
                      </span>
                      <span className="text-[10px] text-stone-500 font-medium line-clamp-1 mt-0.5">
                        {dept.tagline}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            /* No Results */
            <div className="py-16 text-center">
              <p className="font-serif text-lg text-[#141210]">No creations found</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto font-light">
                We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try another craft keyword.
              </p>
            </div>
          ) : (
            /* Results list */
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C28A42] mb-3">
                {searchResults.length} Creations Found
              </p>
              <div className="space-y-2.5">
                {searchResults.map((product) => {
                  const isJustAdded = addedId === product.id;
                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product.id);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#E5DDD0] shadow-2xs cursor-pointer active:scale-98 transition"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-100"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider font-black text-[#C28A42] block">
                          {product.subcategory}
                        </span>
                        <h4 className="font-serif font-bold text-xs text-[#141210] truncate mt-0.5">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-xs font-black text-[#541827]">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="font-mono text-[10px] text-stone-400 line-through">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                          setAddedId(product.id);
                          setTimeout(() => setAddedId(null), 1800);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                          isJustAdded
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-[#541827] text-white border-[#541827] active:scale-90"
                        }`}
                        title="Add to Bag"
                      >
                        {isJustAdded ? (
                          <Check className="w-4 h-4 text-emerald-200 stroke-[3]" />
                        ) : (
                          <ShoppingBag className="w-4 h-4 text-[#C28A42]" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
