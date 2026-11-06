"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DEPARTMENTS, DepartmentId } from "@/data/products";
import { ArrowRight, X } from "lucide-react";

interface DepartmentMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDepartment: (deptId: string, subcategory?: string) => void;
}

export default function DepartmentMegaMenu({
  isOpen,
  onClose,
  onSelectDepartment,
}: DepartmentMegaMenuProps) {
  const [hoveredDept, setHoveredDept] = useState<DepartmentId>("bed_sanctuary");

  if (!isOpen) return null;

  const currentDept = DEPARTMENTS.find((d) => d.id === hoveredDept) || DEPARTMENTS[0];

  const handleSubcategoryClick = (deptId: string, subcat: string) => {
    onSelectDepartment(deptId, subcat === "All" || subcat.startsWith("All") ? "" : subcat);
    onClose();
    const el = document.getElementById("bestsellers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        onMouseLeave={onClose}
        className="absolute top-full left-0 right-0 z-50 bg-[#FAF6F0] border-b border-[#E5DDD0] shadow-2xl overflow-hidden"
      >
        <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-16 py-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5DDD0]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C28A42]">
                DUPPAT Lifestyle Universe
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-xs text-stone-600 font-light">
                Explore handcrafted Indian textiles across 6 curated home collections
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 transition p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-12 gap-8 items-start">
            {/* 6 Department Columns (8 cols) */}
            <div className="col-span-8 grid grid-cols-3 gap-x-8 gap-y-7">
              {DEPARTMENTS.map((dept, idx) => {
                const isHovered = hoveredDept === dept.id;
                return (
                  <div
                    key={dept.id}
                    onMouseEnter={() => setHoveredDept(dept.id)}
                    className="flex flex-col space-y-2 group"
                  >
                    <div
                      onClick={() => handleSubcategoryClick(dept.id, "All")}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#C28A42] font-semibold">
                        <span>0{idx + 1}.</span>
                        <span>{dept.tagline.split(" ")[0]}</span>
                      </div>
                      <h4
                        className={`font-serif text-sm font-medium transition-colors ${
                          isHovered ? "text-[#541827] font-semibold" : "text-[#29251F]"
                        }`}
                      >
                        {dept.name}
                      </h4>
                    </div>

                    <ul className="space-y-1.5 pt-1 text-xs text-stone-600 font-light">
                      {dept.subcategories.slice(1, 6).map((sub) => (
                        <li key={sub}>
                          <button
                            onClick={() => handleSubcategoryClick(dept.id, sub)}
                            className="hover:text-[#541827] hover:translate-x-0.5 transition-all text-left text-[11px] block text-stone-600 cursor-pointer"
                          >
                            {sub}
                          </button>
                        </li>
                      ))}
                      {dept.subcategories.length > 6 && (
                        <li>
                          <button
                            onClick={() => handleSubcategoryClick(dept.id, "All")}
                            className="text-[10px] font-semibold uppercase tracking-wider text-[#541827] hover:text-[#C28A42] transition pt-0.5 block"
                          >
                            +{dept.subcategories.length - 6} more &rarr;
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Right Featured Department Spotlight Vignette (4 cols) */}
            <div className="col-span-4 pl-6 border-l border-[#E5DDD0] flex flex-col justify-between h-full">
              <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-stone-200 border border-[#E5DDD0] shadow-sm mb-4">
                <img
                  src={currentDept.image}
                  alt={currentDept.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C28A42] font-semibold">
                    Curated Collection
                  </span>
                  <h4 className="font-serif text-base font-normal mt-0.5">
                    {currentDept.headline}
                  </h4>
                </div>
              </div>

              <div>
                <p className="text-xs text-stone-600 font-light leading-relaxed mb-4">
                  {currentDept.description}
                </p>

                <button
                  onClick={() => handleSubcategoryClick(currentDept.id, "All")}
                  className="w-full py-2.5 rounded-sm bg-[#541827] hover:bg-[#43121e] text-white text-xs uppercase tracking-wider font-medium transition flex items-center justify-center gap-2 shadow-xs cursor-pointer group"
                >
                  <span>Explore {currentDept.navLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
