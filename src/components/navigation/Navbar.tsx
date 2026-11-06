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
  User,
  Layers,
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
      {/* Main Header (Sticky: h-16 on mobile, h-20 on tablet, h-26 on desktop) - Full Width Luxury Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F1E8]/98 backdrop-blur-md border-b border-[#E5DDD0] w-full shadow-2xs">
        <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-15 sm:h-20 lg:h-26 xl:h-28 gap-2 sm:gap-4 xl:gap-6">
            {/* 1. LEFT: Mobile Triggers & Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E5DDD0] bg-white flex items-center justify-center text-[#141210] hover:text-[#541827] hover:border-[#541827] cursor-pointer transition shadow-2xs active:scale-95"
                aria-label="Open mobile menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
              </button>

              {/* Mobile Quick City Chip */}
              <button
                onClick={onOpenCityPicker}
                className="lg:hidden flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#E5DDD0] bg-white text-[10px] font-bold text-[#141210] hover:border-[#541827] transition shadow-2xs cursor-pointer active:scale-95"
                title="Change delivery destination"
              >
                <MapPin className="w-3 h-3 text-[#C28A42]" />
                <span className="max-w-[70px] truncate">{selectedCity.split(" ")[0]}</span>
                <ChevronDown className="w-2.5 h-2.5 text-stone-400" />
              </button>

              {/* Brand Logo - On the Left */}
              <div
                onClick={() => {
                  onSelectCategory("all");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center cursor-pointer py-1 group pr-1 sm:pr-2 xl:pr-4"
              >
                <img
                  src="/assets/duppatilogo.png"
                  alt="DUPPAT Cozy Homezzz"
                  className="h-10 sm:h-13 md:h-16 lg:h-22 xl:h-24 max-w-[170px] xs:max-w-[190px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[340px] xl:max-w-[380px] w-auto object-contain transition-all duration-300 group-hover:scale-104 drop-shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
                />
                {/* Subtle luxury editorial divider on ultra-wide screens */}
                <div className="hidden 2xl:block h-10 w-[1px] bg-[#E5DDD0] ml-4 shrink-0" />
              </div>
            </div>

            {/* 2. CENTER: Curated Collections Links (Desktop only) */}
            <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 2xl:gap-7 text-sm xl:text-[15px] 2xl:text-[16px] tracking-wide uppercase font-extrabold">
              {/* All Collections Dropdown Trigger */}
              <div className="relative" onMouseEnter={() => setIsMegaMenuOpen(true)}>
                <button
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className="flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-full bg-[#541827] hover:bg-[#43121e] text-white transition-all font-black cursor-pointer shadow-xs whitespace-nowrap text-xs xl:text-sm tracking-wide border border-[#C28A42]/40"
                >
                  <Layers className="w-4 h-4 text-[#C28A42]" />
                  <span>All Collections</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#C28A42] transition-transform duration-200 ${
                      isMegaMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* 6 Direct Collection Links */}
              <div className="flex items-center gap-2.5 xl:gap-5 2xl:gap-6">
                {DEPARTMENTS.map((dept) => {
                  const isActive = activeCategory === dept.id;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => {
                        onSelectCategory(dept.id);
                        setIsMegaMenuOpen(false);
                        const el = document.getElementById("department-showcases");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`relative py-1 px-1 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "text-[#541827] font-black"
                          : "text-[#141210] hover:text-[#541827] font-extrabold hover:font-black"
                      }`}
                    >
                      <span>{dept.navLabel}</span>
                      {isActive ? (
                        <span className="absolute -bottom-1 inset-x-0 h-[3px] bg-[#541827] rounded-full" />
                      ) : (
                        <span className="absolute -bottom-1 inset-x-0 h-[3px] bg-transparent hover:bg-[#541827]/35 rounded-full transition-colors" />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* 3. RIGHT: Search, City, Wishlist, Account, Bag */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 xl:gap-3.5 shrink-0">
              {/* Desktop Search Bar */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search pure cotton..."
                    className="w-32 lg:w-40 xl:w-52 2xl:w-60 focus:w-64 pl-4 pr-9 py-2 text-xs xl:text-sm font-bold rounded-full border border-[#E5DDD0] bg-white text-[#141210] placeholder:text-stone-500 placeholder:font-medium focus:outline-none focus:border-[#541827] focus:ring-2 focus:ring-[#541827]/15 transition-all shadow-2xs"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#541827] pointer-events-none" />
                </div>
              </div>

              {/* Mobile Dedicated Search Trigger Button */}
              <button
                onClick={() => {
                  if (onOpenMobileSearch) {
                    onOpenMobileSearch();
                  } else {
                    setIsSearchModalOpen(true);
                  }
                }}
                className="md:hidden w-9 h-9 rounded-full border border-[#E5DDD0] bg-white flex items-center justify-center text-[#141210] hover:text-[#541827] hover:border-[#541827] transition shadow-2xs cursor-pointer active:scale-95"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 stroke-[2.4]" />
              </button>

              {/* Desktop City Selector Pill */}
              <button
                onClick={onOpenCityPicker}
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E5DDD0] bg-white hover:border-[#541827] text-xs xl:text-sm font-bold text-[#141210] transition shadow-2xs cursor-pointer shrink-0"
                title="Deliver to city"
              >
                <MapPin className="w-4 h-4 text-[#C28A42] shrink-0" />
                <span className="max-w-[95px] truncate">{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  onSelectCategory("all");
                  const el = document.getElementById("department-showcases");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full border border-[#E5DDD0] hover:border-[#541827] hover:bg-white bg-white/90 flex items-center justify-center text-[#141210] hover:text-[#541827] transition shadow-2xs relative cursor-pointer shrink-0 active:scale-95"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#541827] text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center border-2 border-[#F7F1E8]">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account (desktop & tablet) */}
              <button
                onClick={onOpenCityPicker}
                className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full border border-[#E5DDD0] hover:border-[#541827] hover:bg-white bg-white/90 items-center justify-center text-[#141210] hover:text-[#541827] transition shadow-2xs cursor-pointer shrink-0"
                aria-label="User Account"
                title="Account & Delivery Pin"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
              </button>

              {/* Shopping Bag Trigger - Sleek Circular on Mobile, Full Pill on Tablet/Desktop */}
              <button
                onClick={openCart}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-full bg-[#541827] text-white hover:bg-[#43121e] border border-[#C28A42]/60 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C28A42] stroke-[2.4]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-[#C28A42] text-[#29251F] text-[9px] font-black flex items-center justify-center border-2 border-[#541827]">
                      {cartCount}
                    </span>
                  )}
                </div>
                {/* On small mobile show Bag count or 'Bag'; on sm+ show live total */}
                <span className="hidden xs:inline text-xs sm:text-sm lg:text-base font-black tracking-wide font-mono">
                  {cartCount > 0 ? (
                    `₹${total.toLocaleString("en-IN")}`
                  ) : (
                    <span className="font-sans font-bold">Bag</span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Signature Antique Gold Ribbon Hairline */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C28A42]/60 to-transparent" />

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
                  src="/assets/duppatilogo.png"
                  alt="DUPPAT Cozy Homezzz"
                  className="h-10 w-auto object-contain"
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
      </header>
    </>
  );
}
