"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import ShopByCategory from "@/components/home/ShopByCategory";
import FeaturedCollectionBanner from "@/components/home/FeaturedCollectionBanner";
import ShopTheLook from "@/components/home/ShopTheLook";
import CinematicVideoSection from "@/components/home/CinematicVideoSection";
import DepartmentSection from "@/components/home/DepartmentSection";
import ShopByRoom from "@/components/home/ShopByRoom";
import HeritageStory from "@/components/home/HeritageStory";
import CustomerReviews from "@/components/home/CustomerReviews";
import InstagramGallery from "@/components/home/InstagramGallery";
import Footer from "@/components/navigation/Footer";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import ProductCard from "@/components/products/ProductCard";
import ProductQuickView from "@/components/products/ProductQuickView";
import MobileFilterDrawer from "@/components/products/MobileFilterDrawer";
import CartDrawer from "@/components/cart/CartDrawer";
import RazorpayModal from "@/components/checkout/RazorpayModal";
import PincodeChecker from "@/components/pincode/PincodeChecker";
import CityPickerModal from "@/components/navigation/CityPickerModal";
import MobileSearchModal from "@/components/navigation/MobileSearchModal";
import SplashScreen from "@/components/common/SplashScreen";
import { PRODUCTS, DEPARTMENTS, DepartmentId } from "@/data/products";
import { SlidersHorizontal, PackageOpen, ArrowRight, Layers } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [selectedCraft, setSelectedCraft] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Group products by department for individual dedicated department sections
  const productsByDepartment = useMemo(() => {
    const map: Record<DepartmentId, typeof PRODUCTS> = {
      bed_sanctuary: [],
      kids_atelier: [],
      living_room: [],
      kitchen_dining: [],
      bath_utility: [],
      wall_decor: [],
    };

    PRODUCTS.forEach((product) => {
      if (map[product.department]) {
        map[product.department].push(product);
      }
    });

    return map;
  }, []);

  // Filtered products list (when searching or applying specific craft/sort filters)
  const isSearchOrFilterActive =
    searchQuery.trim() !== "" || selectedCraft !== "" || sortBy !== "featured";

  const filteredSearchResults = useMemo(() => {
    const list = PRODUCTS.filter((item) => {
      const matchDept =
        activeCategory === "all" ||
        item.department === activeCategory ||
        item.category === activeCategory;

      const matchSubcat =
        !activeSubcategory ||
        activeSubcategory === "" ||
        item.subcategory.toLowerCase() === activeSubcategory.toLowerCase() ||
        item.name.toLowerCase().includes(activeSubcategory.toLowerCase());

      const matchSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.departmentLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCraft =
        !selectedCraft ||
        item.craft.toLowerCase().includes(selectedCraft.toLowerCase()) ||
        item.fabric.toLowerCase().includes(selectedCraft.toLowerCase());

      return matchDept && matchSubcat && matchSearch && matchCraft;
    });

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [activeCategory, activeSubcategory, searchQuery, sortBy, selectedCraft]);

  const scrollToDepartments = () => {
    const el = document.getElementById("department-showcases");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectDepartment = (deptId: string, subcategory?: string) => {
    setActiveCategory(deptId);
    if (subcategory !== undefined) {
      setActiveSubcategory(subcategory);
    } else {
      setActiveSubcategory("");
    }

    // Smooth scroll to the individual department section
    if (deptId !== "all") {
      const el = document.getElementById(`dept-${deptId}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      const el = document.getElementById("department-showcases");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setActiveSubcategory("");
    setSelectedCraft("");
    setSearchQuery("");
    setSortBy("featured");
    setIsFilterDrawerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1E8] text-[#29251F] selection:bg-[#541827] selection:text-white pb-16 lg:pb-0 font-sans">
      {/* Modern Luxury Splash Screen (Plays for ~5.5s on site open) */}
      <SplashScreen durationMs={5500} />

      {/* 1. Header with Slim Announcement, Department Mega Menu & Minimal Nav */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectDepartment}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCity={selectedCity}
        onOpenCityPicker={() => setIsCityPickerOpen(true)}
        onOpenMobileSearch={() => setIsMobileSearchOpen(true)}
      />

      {/* 2. Premium Editorial Hero with Auto-Rotating Video & 1-Click Add to Cart */}
      <HeroSection
        onShopNow={scrollToDepartments}
        onSelectCategory={handleSelectDepartment}
      />

      {/* 3. Luxury Infinite Marquee Running Text Loop Banner */}
      <TrustStrip onSelectCategory={handleSelectDepartment} />

      {/* 4. Shop by Department (High-level visual tiles linking to each room) */}
      <ShopByCategory
        activeCategory={activeCategory}
        onSelectCategory={handleSelectDepartment}
      />

      {/* 5. Featured Rajasthani Collection Campaign Banner */}
      <FeaturedCollectionBanner onExplore={() => handleSelectDepartment("bed_sanctuary")} />

      {/* 5B. Interactive Shop The Look Bedroom Sanctuary Hotspot Map */}
      <ShopTheLook />

      {/* 5C. Cinematic Brand & Craft Video Stories (4K Films) */}
      <CinematicVideoSection onSelectCategory={handleSelectDepartment} />

      {/* 6. INDIVIDUAL CATEGORY SHOWCASE SECTIONS WITH DEDICATED HEADINGS */}
      <div id="department-showcases" className="w-full">
          {/* If user is actively searching or filtering by craft/sort, show focused search results */}
          {isSearchOrFilterActive ? (
            <section className="max-w-[1700px] w-full mx-auto px-3 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-14 border-b border-[#E5DDD0]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C28A42] font-semibold">
                    Custom Filter Results
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F] mt-0.5">
                    Filtered Creations ({filteredSearchResults.length})
                  </h2>
                  <p className="text-xs text-stone-600 font-light mt-0.5">
                    {searchQuery && `Matching "${searchQuery}" • `}
                    {selectedCraft && `Craft: ${selectedCraft} • `}
                    Sorted by {sortBy}
                  </p>
                </div>

                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-sm bg-[#541827] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#43121e] cursor-pointer self-start sm:self-auto"
                >
                  Clear Search & View All
                </button>
              </div>

              {filteredSearchResults.length === 0 ? (
                <div className="py-12 sm:py-16 text-center bg-white rounded-md border border-[#E5DDD0]">
                  <PackageOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-normal">No creations found</h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4 font-light">
                    Try adjusting your keywords or reset all filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-sm bg-[#541827] text-white text-xs uppercase tracking-wider font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 lg:gap-8">
                  {filteredSearchResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          ) : (
            /* When browsing normally: Render each category individually with its own heading & subcategory pills! */
            DEPARTMENTS.map((department, idx) => (
              <DepartmentSection
                key={department.id}
                department={department}
                index={idx}
                products={productsByDepartment[department.id] || []}
              />
            ))
          )}
        </div>

        {/* 7. Shop by Room Experience */}
        <ShopByRoom onSelectCategory={handleSelectDepartment} />

        {/* 8. Shiprocket Delivery Checker Hub Card */}
        <section className="py-10 sm:py-14 bg-[#F7F1E8] border-b border-[#E5DDD0] w-full">
          <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
            <div className="p-5 sm:p-10 rounded-md bg-white border border-[#E5DDD0] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center shadow-xs">
              <div className="lg:col-span-6">
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C28A42] bg-[#FAF6F0] px-2.5 py-1 rounded-xs border border-[#E5DDD0]">
                  Express Logistics
                </span>
                <h3 className="font-serif text-xl sm:text-3xl font-normal text-[#29251F] mt-2 sm:mt-3">
                  Check Express Delivery & COD to Your City
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light mt-1.5 sm:mt-2 leading-relaxed">
                  Dispatched directly from our Sanganer printing studios in Jaipur across 29,000+ Indian
                  postal codes via Shiprocket air couriers.
                </p>
              </div>
              <div className="lg:col-span-6">
                <PincodeChecker />
              </div>
            </div>
          </div>
        </section>

        {/* 9. Brand Craftsmanship Story */}
        <HeritageStory />

        {/* 10. Customer Reviews */}
        <CustomerReviews />

        {/* 11. Instagram Community Gallery */}
        <InstagramGallery />

        {/* 12. VIP Newsletter & Premium Footer */}
        <Footer />

      {/* Interactive Modals & Drawers */}
      <CartDrawer />
      <ProductQuickView />
      <RazorpayModal />
      <CityPickerModal
        isOpen={isCityPickerOpen}
        onClose={() => setIsCityPickerOpen(false)}
        currentCity={selectedCity}
        onSelectCity={setSelectedCity}
      />
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectDepartment}
        activeSubcategory={activeSubcategory}
        onSelectSubcategory={setActiveSubcategory}
        sortBy={sortBy}
        onSelectSort={(sort) => {
          setSortBy(sort);
          setIsFilterDrawerOpen(false);
        }}
        selectedCraft={selectedCraft}
        onSelectCraft={(craft) => {
          setSelectedCraft(craft);
          setIsFilterDrawerOpen(false);
        }}
        totalResults={filteredSearchResults.length}
        onReset={handleResetFilters}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={handleSelectDepartment}
        onOpenCityPicker={() => setIsCityPickerOpen(true)}
        onOpenSearch={() => setIsMobileSearchOpen(true)}
      />

      {/* Dedicated Full-Screen Instant Mobile Search Modal */}
      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        onSelectProduct={(productId) => {
          const el = document.getElementById(productId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onSelectCategory={handleSelectDepartment}
      />
    </div>
  );
}
