"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  MapPin,
  ChevronDown,
  ChevronRight,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { DEPARTMENTS } from "@/data/products";
import DepartmentMegaMenu from "@/components/navigation/DepartmentMegaMenu";
import MobileSearchModal from "@/components/navigation/MobileSearchModal";

interface NavbarProps {
  activeCategory: string;
  onSelectCategory: (catId: string, subcategory?: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onOpenCityPicker: () => void;
  onOpenMobileSearch?: () => void;
}

export default function Navbar({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedCity,
  onOpenCityPicker,
  onOpenMobileSearch,
}: NavbarProps) {
  const { cartCount, openCart, wishlist, total } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileExpandedDept, setMobileExpandedDept] = useState<string | null>(null);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleMobileDept = (deptId: string) => {
    setMobileExpandedDept(mobileExpandedDept === deptId ? null : deptId);
  };

  const handleSelectProductFromSearch = (productId: string) => {
    const el = document.getElementById(productId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Sticky Main Header Container */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#E5DDD0] w-full shadow-2xs">
        {/* ============================================================ */}
        {/* 1. DEDICATED MOBILE HEADER (Matches Reference Image Exactly) */}
        {/* ============================================================ */}
        <div className="block lg:hidden w-full">
          {/* Top Row: Left Menu | Big Dead-Centered Logo | Right Actions */}
          <div className="px-3 sm:px-4 h-16 sm:h-18 flex items-center justify-between relative border-b border-[#E5DDD0]/50">
            {/* Left: Clean Hamburger Icon Button */}
            <div className="flex items-center shrink-0 w-12 justify-start z-20">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-9 h-9 flex items-center justify-center text-[#141210] hover:text-[#541827] rounded-lg active:bg-stone-100 cursor-pointer transition active:scale-95"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </button>
            </div>

            {/* Center: Brand Logo (Exactly Dead-Center of Viewport, Big & Majestic Size) */}
            <div
              onClick={() => {
                onSelectCategory("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer py-1 group select-none z-10 max-w-[calc(100vw-170px)]"
            >
              <div className="relative flex items-center justify-center">
                <img
                  src="/assets/duppati_logo_clean.png"
                  alt="DUPPATI Cozy Home"
                  className="h-13 sm:h-15 w-auto max-w-[185px] sm:max-w-[230px] object-contain transition-all duration-300 group-hover:scale-103 drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                />

                {/* Subtle Periodic Luxury Light Shimmer Sweep */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-20">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/45 to-transparent animate-brand-gleam" />
                </div>
              </div>
            </div>

            {/* Right: Search, Wishlist Heart, Shopping Bag (Cleanly Separated with Generous Breathing Room) */}
            <div className="flex items-center justify-end gap-1 sm:gap-1.5 shrink-0 z-20">
              {/* Search */}
              <button
                onClick={() => {
                  if (onOpenMobileSearch) {
                    onOpenMobileSearch();
                  } else {
                    setIsSearchModalOpen(true);
                  }
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#141210] hover:text-[#541827] rounded-lg active:bg-stone-100 cursor-pointer transition active:scale-95"
                aria-label="Search Catalog"
              >
                <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2]" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  onSelectCategory("all");
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#141210] hover:text-[#541827] rounded-lg active:bg-stone-100 cursor-pointer transition active:scale-95 relative"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#85182a] text-white text-[8px] font-bold flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Bag with Count Badge */}
              <button
                onClick={openCart}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#141210] hover:text-[#541827] rounded-lg active:bg-stone-100 cursor-pointer transition active:scale-95 relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2]" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#85182a] text-white text-[8px] font-black flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Row 2: Location Indicator Strip ("📍 Deliver to Hyderabad ⌵") */}
          <div className="px-4 py-2 bg-[#FAF7F2] flex items-center justify-start">
            <button
              onClick={onOpenCityPicker}
              className="inline-flex items-center gap-1.5 text-xs text-[#141210] hover:text-[#541827] transition cursor-pointer active:scale-98"
              title="Change Delivery Location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#541827] stroke-[2] shrink-0" />
              <span className="text-stone-500 font-normal">Deliver to</span>
              <span className="font-bold text-[#141210]">{selectedCity.split(" ")[0]}</span>
              <ChevronDown className="w-3 h-3 text-stone-600 shrink-0" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. DEDICATED DESKTOP HEADER (Bigger Logo + Centered Quick Links + Visible Cart) */}
        {/* ============================================================ */}
        <div className="hidden lg:block w-full px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
          <div className="relative flex items-center justify-between h-22 lg:h-25 w-full">
            {/* 1. LEFT: Exactly 5 Quick Links (Clean Left Alignment) */}
            <nav className="flex items-center gap-4 lg:gap-6 xl:gap-7 text-xs lg:text-[13px] tracking-[0.16em] uppercase font-bold text-[#141210] z-10 shrink-0">
              {/* 1. Bedding */}
              <button
                onClick={() => {
                  onSelectCategory("bed_sanctuary");
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`relative py-1 transition-all cursor-pointer whitespace-nowrap hover:text-[#541827] ${
                  activeCategory === "bed_sanctuary"
                    ? "text-[#541827] font-black"
                    : "text-[#141210]"
                }`}
              >
                <span>Bedding</span>
                {activeCategory === "bed_sanctuary" && (
                  <span className="absolute -bottom-1 inset-x-0 h-[2.5px] bg-[#541827] rounded-full" />
                )}
              </button>

              {/* 2. Quilts */}
              <button
                onClick={() => {
                  onSelectCategory("bed_sanctuary", "Bed Covers");
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative py-1 transition-all cursor-pointer whitespace-nowrap text-[#141210] hover:text-[#541827]"
              >
                <span>Quilts</span>
              </button>

              {/* 3. Living */}
              <button
                onClick={() => {
                  onSelectCategory("living_room");
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`relative py-1 transition-all cursor-pointer whitespace-nowrap hover:text-[#541827] ${
                  activeCategory === "living_room"
                    ? "text-[#541827] font-black"
                    : "text-[#141210]"
                }`}
              >
                <span>Living</span>
                {activeCategory === "living_room" && (
                  <span className="absolute -bottom-1 inset-x-0 h-[2.5px] bg-[#541827] rounded-full" />
                )}
              </button>

              {/* 4. Kids & Baby */}
              <button
                onClick={() => {
                  onSelectCategory("kids_atelier");
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`relative py-1 transition-all cursor-pointer whitespace-nowrap hover:text-[#541827] ${
                  activeCategory === "kids_atelier"
                    ? "text-[#541827] font-black"
                    : "text-[#141210]"
                }`}
              >
                <span>Kids & Baby</span>
                {activeCategory === "kids_atelier" && (
                  <span className="absolute -bottom-1 inset-x-0 h-[2.5px] bg-[#541827] rounded-full" />
                )}
              </button>

              {/* 5. Bestsellers */}
              <button
                onClick={() => {
                  onSelectCategory("all");
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative py-1 transition-all cursor-pointer whitespace-nowrap text-[#541827] font-extrabold flex items-center gap-1.5 hover:text-[#43121e]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C28A42] animate-pulse" />
                <span>Bestsellers</span>
              </button>
            </nav>

            {/* 2. DEAD CENTER: Brand Logo (Significantly Bigger, Dead-Center Placement, Luxury Shimmer) */}
            <div
              onClick={() => {
                onSelectCategory("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer py-1 group select-none z-10"
            >
              <div className="relative flex items-center justify-center">
                <img
                  src="/assets/duppati_logo_clean.png"
                  alt="DUPPATI Cozy Home"
                  className="h-16 lg:h-18 xl:h-20 w-auto max-w-[280px] lg:max-w-[340px] xl:max-w-[400px] object-contain transition-all duration-300 group-hover:scale-103 drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                />

                {/* Subtle Periodic Luxury Light Shimmer Sweep */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-20">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-brand-gleam" />
                </div>
              </div>
            </div>

            {/* 3. RIGHT: Search, Wishlist, and Prominently Pinned Shopping Bag */}
            <div className="flex items-center justify-end gap-2.5 lg:gap-3.5 shrink-0 ml-auto z-10">
              {/* Desktop Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search pure cotton..."
                  className="w-32 lg:w-40 xl:w-48 pl-3.5 pr-8 py-2 text-xs font-semibold rounded-full border border-[#E5DDD0] bg-white text-[#141210] placeholder:text-stone-400 focus:outline-none focus:border-[#541827] focus:ring-1 focus:ring-[#541827]/20 transition-all shadow-2xs"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#541827] pointer-events-none" />
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  onSelectCategory("all");
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-[#E5DDD0] hover:border-[#541827] bg-white flex items-center justify-center text-[#141210] hover:text-[#541827] transition shadow-2xs relative cursor-pointer shrink-0 active:scale-95"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4.5 h-4.5 stroke-[2]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#541827] text-white text-[9px] font-black flex items-center justify-center border-2 border-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* VISIBLE & ANCHORED SHOPPING BAG */}
              <button
                onClick={openCart}
                className="flex items-center gap-2 px-4 py-2 lg:py-2.5 rounded-full bg-[#541827] text-white hover:bg-[#43121e] border border-[#C28A42]/60 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#C28A42] stroke-[2.4]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#C28A42] text-[#29251F] text-[9px] font-black flex items-center justify-center border border-[#541827]">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs lg:text-sm font-bold tracking-wide font-mono whitespace-nowrap">
                  {cartCount > 0 ? `₹${total.toLocaleString("en-IN")}` : "Bag"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Signature Antique Gold Ribbon Hairline */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C28A42]/60 to-transparent" />
      </header>

        {/* Desktop Luxury Editorial Mega Menu */}
        <DepartmentMegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          onSelectDepartment={(deptId, subcat) => {
            onSelectCategory(deptId, subcat);
            setIsMegaMenuOpen(false);
          }}
        />

        {/* Mobile Dedicated Instant Search Sheet */}
        <MobileSearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onSelectProduct={handleSelectProductFromSearch}
          onSelectCategory={onSelectCategory}
        />

        {/* ========================================================= */}
        {/* LUXURY MOBILE OFF-CANVAS SLIDE-OVER DRAWER (FULL HEIGHT)  */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            />

            {/* Slide-out Drawer Container */}
            <div className="relative w-[85vw] max-w-[340px] bg-[#FAF6F0] h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-slideInRight">
              {/* 1. Drawer Header */}
              <div className="p-4 bg-white border-b border-[#E5DDD0] flex items-center justify-between shrink-0 shadow-2xs">
                <img
                  src="/assets/duppati_logo_clean.png"
                  alt="DUPPATI"
                  className="h-11 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#E5DDD0] bg-[#FAF6F0] flex items-center justify-center text-[#141210] hover:text-[#541827] cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4 stroke-[2.4]" />
                </button>
              </div>

              {/* 2. City / Delivery Strip */}
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCityPicker();
                }}
                className="px-4 py-2.5 bg-[#541827] text-white flex items-center justify-between cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C28A42]" />
                  <span>
                    Delivering to: <strong className="underline">{selectedCity}</strong>
                  </span>
                </div>
                <span className="text-[10px] text-[#C28A42] uppercase font-bold">Change</span>
              </div>

              {/* 3. Drawer Scrollable Body: Visual Collection Accordions */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                <p className="text-[10px] uppercase font-black text-stone-400 tracking-[0.2em] mb-1">
                  Atelier Collections
                </p>

                {/* "All Collections" Direct Button */}
                <button
                  onClick={() => {
                    onSelectCategory("all");
                    setMobileMenuOpen(false);
                    const el = document.getElementById("department-showcases");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-between text-left font-black text-xs uppercase tracking-wider transition ${
                    activeCategory === "all"
                      ? "bg-[#541827] text-white border-[#541827] shadow-xs"
                      : "bg-white text-[#141210] border-[#E5DDD0]"
                  }`}
                >
                  <span>All Collections</span>
                  <ChevronRight className="w-4 h-4 text-[#C28A42]" />
                </button>

                {/* 6 Curated Departments with Small Photo Previews */}
                {DEPARTMENTS.map((dept) => {
                  const isExpanded = mobileExpandedDept === dept.id;
                  const isCurrent = activeCategory === dept.id;

                  return (
                    <div
                      key={dept.id}
                      className="rounded-xl border border-[#E5DDD0] bg-white overflow-hidden shadow-2xs"
                    >
                      {/* Department Row */}
                      <div className="flex items-center justify-between p-2.5">
                        <button
                          onClick={() => {
                            onSelectCategory(dept.id);
                            setMobileMenuOpen(false);
                            const el = document.getElementById(`dept-${dept.id}`);
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="flex items-center gap-2.5 flex-1 text-left cursor-pointer"
                        >
                          <img
                            src={dept.image}
                            alt={dept.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                          />
                          <div>
                            <h4
                              className={`font-serif font-bold text-xs ${
                                isCurrent ? "text-[#541827]" : "text-[#141210]"
                              }`}
                            >
                              {dept.name}
                            </h4>
                            <p className="text-[10px] text-stone-500 font-medium line-clamp-1">
                              {dept.tagline}
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => toggleMobileDept(dept.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-800 transition p-1"
                        >
                          <ChevronRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-90 text-[#541827]" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Expanded Subcategory Pills */}
                      {isExpanded && (
                        <div className="px-3 pb-3 pt-1 border-t border-stone-100 bg-[#FAF6F0] flex flex-wrap gap-1.5 animate-fadeIn">
                          {dept.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                onSelectCategory(dept.id, sub.startsWith("All") ? "" : sub);
                                setMobileMenuOpen(false);
                                const el = document.getElementById(`dept-${dept.id}`);
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white border border-[#E5DDD0] text-stone-700 hover:border-[#541827] hover:text-[#541827] active:scale-95 shadow-2xs"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Luxury Brand Assurances */}
                <div className="pt-3 pb-2 space-y-2 border-t border-[#E5DDD0]/70 text-[11px] text-stone-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#541827]" />
                    <span>Free Shipping Across India &gt; ₹999</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#541827]" />
                    <span>100% Combed Pure Long-Staple Cotton</span>
                  </div>
                </div>
              </div>

              {/* 4. Drawer Footer: WhatsApp / Support Concierge */}
              <div className="p-3 bg-white border-t border-[#E5DDD0] shrink-0">
                <a
                  href="https://wa.me/919999999999?text=Hello%20DUPPAT%20I%20am%20interested%20in%20your%20luxury%20bedding%20collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#541827] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs active:scale-98 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C28A42]" />
                  <span>Contact Atelier Concierge</span>
                </a>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
