"use client";

import React, { useState, useMemo } from "react";
import { Department, Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { ArrowRight } from "lucide-react";

interface DepartmentSectionProps {
  department: Department;
  index: number;
  products: Product[];
}

export default function DepartmentSection({
  department,
  index,
  products,
}: DepartmentSectionProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  // Filter products by selected subcategory in this section
  const departmentProducts = useMemo(() => {
    if (!selectedSubcategory || selectedSubcategory === "" || selectedSubcategory.startsWith("All")) {
      return products;
    }
    return products.filter(
      (p) =>
        p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase() ||
        p.name.toLowerCase().includes(selectedSubcategory.toLowerCase())
    );
  }, [products, selectedSubcategory]);

  return (
    <section
      id={`dept-${department.id}`}
      className="py-10 sm:py-20 lg:py-28 border-b border-[#E5DDD0] w-full relative scroll-mt-24"
    >
      <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
        {/* Department Editorial Header Card */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-3 sm:gap-6">
          <div className="max-w-3xl">
            {/* Top Index & Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#541827]/10 text-[#541827] text-xs font-black uppercase tracking-[0.22em] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C28A42]" />
              <span>
                Collection 0{index + 1} • {department.tagline}
              </span>
            </div>

            {/* Department Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141210] leading-tight mt-1">
              {department.name}
            </h2>

            {/* Headline & Description with generous readability */}
            <p className="text-xs sm:text-base text-stone-600 font-normal mt-2 sm:mt-3 leading-relaxed">
              <strong className="font-bold text-[#141210]">{department.headline}:</strong>{" "}
              {department.description}
            </p>
          </div>

          {/* Department Meta stats & direct count */}
          <div className="flex items-center gap-3 text-xs font-mono text-stone-500 shrink-0">
            <span className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border-2 border-[#E5DDD0] text-[#541827] font-black text-xs sm:text-sm tracking-wider uppercase shadow-2xs">
              {products.length} Handcrafted Pieces
            </span>
          </div>
        </div>

        {/* Subcategory Filter Pills - Edge-to-edge on mobile */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
          {department.subcategories.map((subcat) => {
            const isAll = subcat.startsWith("All");
            const isSelected =
              (isAll && (!selectedSubcategory || selectedSubcategory === "")) ||
              selectedSubcategory === subcat;

            return (
              <button
                key={subcat}
                onClick={() => setSelectedSubcategory(isAll ? "" : subcat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#541827] text-white shadow-md font-black scale-102 border-2 border-[#541827]"
                    : "bg-white text-[#141210] border-2 border-[#E5DDD0] hover:border-[#541827] hover:text-[#541827] font-bold"
                }`}
              >
                {subcat}
              </button>
            );
          })}
        </div>

        {/* 4-Column Product Grid (2-Column on Mobile, Medium Card Grid) */}
        {departmentProducts.length === 0 ? (
          <div className="py-12 sm:py-16 text-center bg-white rounded-2xl border border-[#E5DDD0] p-6 sm:p-8 shadow-xs">
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              No items currently in &ldquo;{selectedSubcategory}&rdquo;.
            </p>
            <button
              onClick={() => setSelectedSubcategory("")}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#541827] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#43121e]"
            >
              View All {department.navLabel}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-5 lg:gap-6">
            {departmentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom Department Summary Strip */}
        <div className="mt-10 pt-5 border-t border-stone-200/80 flex items-center justify-between text-xs sm:text-sm text-stone-500 font-light">
          <span className="font-mono text-xs">
            Showing {departmentProducts.length} of {products.length} in {department.name}
          </span>
          <button
            onClick={() => {
              setSelectedSubcategory("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[#541827] font-semibold hover:text-[#C28A42] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Back to Top</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
