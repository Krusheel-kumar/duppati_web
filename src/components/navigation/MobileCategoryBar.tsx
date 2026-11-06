"use client";

import React, { useRef } from "react";
import { DEPARTMENTS } from "@/data/products";
import { LayoutGrid, Bed, Baby, Sofa, UtensilsCrossed, Bath } from "lucide-react";

interface MobileCategoryBarProps {
  activeCategory: string;
  onSelectCategory: (catId: string, subcategory?: string) => void;
  activeSubcategory?: string;
  onSelectSubcategory?: (subcat: string) => void;
}

const getDeptIcon = (id: string) => {
  switch (id) {
    case "bed_sanctuary":
      return <Bed className="w-3.5 h-3.5 stroke-[2.2]" />;
    case "kids_baby":
      return <Baby className="w-3.5 h-3.5 stroke-[2.2]" />;
    case "living_luxe":
      return <Sofa className="w-3.5 h-3.5 stroke-[2.2]" />;
    case "dining_kitchen":
      return <UtensilsCrossed className="w-3.5 h-3.5 stroke-[2.2]" />;
    case "bath_organizers":
      return <Bath className="w-3.5 h-3.5 stroke-[2.2]" />;
    default:
      return null;
  }
};

export default function MobileCategoryBar({
  activeCategory,
  onSelectCategory,
  activeSubcategory = "",
  onSelectSubcategory,
}: MobileCategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToDepartment = (deptId: string) => {
    if (deptId === "all") {
      const el = document.getElementById("department-showcases");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      const el = document.getElementById(`dept-${deptId}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentDept = DEPARTMENTS.find((d) => d.id === activeCategory);

  return (
    <div className="lg:hidden bg-[#FAF6F0]/98 backdrop-blur-md border-b border-[#E5DDD0] py-2 px-3 sticky top-[89px] sm:top-[97px] z-30 shadow-2xs">
      {/* 1. Primary Collection Swipeable Rail */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 scroll-smooth"
        >
          {/* All Creations pill */}
          <button
            onClick={() => {
              onSelectCategory("all", "");
              if (onSelectSubcategory) onSelectSubcategory("");
              scrollToDepartment("all");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 border cursor-pointer active:scale-95 ${
              activeCategory === "all"
                ? "bg-[#541827] text-white border-[#541827] shadow-xs"
                : "bg-white text-[#141210] border-[#E5DDD0] hover:border-[#541827]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>All Creations</span>
          </button>

          {/* 6 Curated Department Pills with Icons */}
          {DEPARTMENTS.map((dept) => {
            const isSelected = activeCategory === dept.id;
            const Icon = getDeptIcon(dept.id);
            return (
              <button
                key={dept.id}
                onClick={() => {
                  onSelectCategory(dept.id, "");
                  if (onSelectSubcategory) onSelectSubcategory("");
                  scrollToDepartment(dept.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 border cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-[#541827] text-white border-[#541827] shadow-xs"
                    : "bg-white text-[#141210] border-[#E5DDD0] hover:border-[#541827]"
                }`}
              >
                {Icon}
                <span>{dept.navLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Secondary Subcategory Micro-Rail (Contextual when a department is selected) */}
      {currentDept && currentDept.subcategories.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1.5 pb-0.5 border-t border-[#E5DDD0]/70 animate-fadeIn mt-1">
          {currentDept.subcategories.map((subcat) => {
            const isAll = subcat.startsWith("All");
            const isSubSelected =
              (isAll && (!activeSubcategory || activeSubcategory === "")) ||
              activeSubcategory === subcat;
            return (
              <button
                key={subcat}
                onClick={() => {
                  const targetSub = isAll ? "" : subcat;
                  if (onSelectSubcategory) onSelectSubcategory(targetSub);
                  scrollToDepartment(currentDept.id);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer active:scale-95 ${
                  isSubSelected
                    ? "bg-[#141210] text-white shadow-2xs"
                    : "bg-white text-stone-700 border border-[#E5DDD0] hover:bg-stone-50"
                }`}
              >
                {subcat}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
