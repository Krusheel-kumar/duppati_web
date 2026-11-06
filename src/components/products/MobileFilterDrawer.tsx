"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, SlidersHorizontal, Check, RotateCcw } from "lucide-react";
import { DEPARTMENTS } from "@/data/products";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onSelectCategory: (catId: string, subcategory?: string) => void;
  activeSubcategory?: string;
  onSelectSubcategory?: (subcat: string) => void;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating";
  onSelectSort: (sort: "featured" | "price-asc" | "price-desc" | "rating") => void;
  selectedCraft: string;
  onSelectCraft: (craft: string) => void;
  totalResults: number;
  onReset: () => void;
}

const CRAFTS = [
  "All Crafts",
  "Block Print",
  "Kantha Quilt",
  "Organic Mulmul",
  "Handloom Checks",
  "Hand-Knotted Dhurrie",
  "Pure Cotton Slub",
  "Stone-Washed",
  "Upcycled Sari",
];

const SORT_OPTIONS: { id: "featured" | "price-asc" | "price-desc" | "rating"; label: string }[] = [
  { id: "featured", label: "Featured Curations" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Customer Rated (4.8+ ★)" },
];

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  activeSubcategory = "",
  onSelectSubcategory,
  sortBy,
  onSelectSort,
  selectedCraft,
  onSelectCraft,
  totalResults,
  onReset,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  const currentDept = DEPARTMENTS.find((d) => d.id === activeCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs"
        />

        {/* Bottom Sheet */}
        <div className="fixed inset-x-0 bottom-0 max-h-[88vh] flex flex-col">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="w-full bg-[#FAF6F0] rounded-t-2xl shadow-2xl flex flex-col border-t border-[#E5DDD0] max-h-[88vh]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#E5DDD0] bg-white rounded-t-2xl flex flex-col items-center relative">
              <div className="w-12 h-1 bg-stone-300 rounded-full mb-3" />
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#541827]" />
                  <h3 className="font-serif text-lg font-medium text-[#29251F]">
                    Filter & Refine
                  </h3>
                  <span className="text-xs text-stone-500 font-mono">
                    ({totalResults} items)
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Filter Body */}
            <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* 1. Sort Order */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#541827] mb-2.5">
                  Sort Order
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = sortBy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => onSelectSort(opt.id)}
                        className={`p-3 rounded-md text-left flex items-center justify-between border transition cursor-pointer ${
                          isSelected
                            ? "bg-[#541827] text-white border-[#541827] font-semibold"
                            : "bg-white text-stone-700 border-[#E5DDD0]"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#C28A42]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Department Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#541827] mb-2.5">
                  Departments (6 Worlds)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onSelectCategory("all", "");
                      if (onSelectSubcategory) onSelectSubcategory("");
                    }}
                    className={`p-2.5 rounded-md text-left text-xs transition border flex items-center justify-between cursor-pointer ${
                      activeCategory === "all"
                        ? "bg-[#541827] text-white border-[#541827] font-semibold"
                        : "bg-white text-stone-700 border-[#E5DDD0]"
                    }`}
                  >
                    <span>All Creations</span>
                    {activeCategory === "all" && <Check className="w-3.5 h-3.5 text-[#C28A42]" />}
                  </button>

                  {DEPARTMENTS.map((dept) => {
                    const isSelected = activeCategory === dept.id;
                    return (
                      <button
                        key={dept.id}
                        onClick={() => {
                          onSelectCategory(dept.id, "");
                          if (onSelectSubcategory) onSelectSubcategory("");
                        }}
                        className={`p-2.5 rounded-md text-left text-xs transition border flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#541827] text-white border-[#541827] font-semibold"
                            : "bg-white text-stone-700 border-[#E5DDD0]"
                        }`}
                      >
                        <span className="truncate">{dept.navLabel}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#C28A42] shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Subcategories (if a department is selected) */}
              {currentDept && (
                <div className="animate-fadeIn">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#541827] mb-2.5">
                    {currentDept.navLabel} Specific Items
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDept.subcategories.map((sub) => {
                      const isAll = sub.startsWith("All");
                      const isSubSelected =
                        (isAll && (!activeSubcategory || activeSubcategory === "")) ||
                        activeSubcategory === sub;
                      return (
                        <button
                          key={sub}
                          onClick={() => {
                            if (onSelectSubcategory) onSelectSubcategory(isAll ? "" : sub);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs transition border cursor-pointer ${
                            isSubSelected
                              ? "bg-[#29251F] text-white border-[#29251F] font-semibold"
                              : "bg-white text-stone-700 border-[#E5DDD0]"
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Craft Techniques */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#541827] mb-2.5">
                  Artisan Technique
                </label>
                <div className="flex flex-wrap gap-2">
                  {CRAFTS.map((craft) => {
                    const isSelected =
                      (craft === "All Crafts" && !selectedCraft) || selectedCraft === craft;
                    return (
                      <button
                        key={craft}
                        onClick={() => onSelectCraft(craft === "All Crafts" ? "" : craft)}
                        className={`px-3 py-2 rounded-sm text-xs transition border cursor-pointer ${
                          isSelected
                            ? "bg-[#29251F] text-white border-[#29251F] font-semibold"
                            : "bg-white text-stone-700 border-[#E5DDD0]"
                        }`}
                      >
                        {craft}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sticky Actions */}
            <div className="p-4 bg-white border-t border-[#E5DDD0] flex items-center gap-3">
              <button
                onClick={onReset}
                className="px-5 py-3 rounded-xl border border-[#E5DDD0] text-stone-700 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-stone-50 cursor-pointer active:scale-95 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-[#541827] text-white text-xs font-black uppercase tracking-wider hover:bg-[#43121e] shadow-md text-center cursor-pointer active:scale-95 transition"
              >
                View {totalResults} Creations
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
