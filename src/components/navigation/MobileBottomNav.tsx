"use client";

import React from "react";
import { Home, Layers, Search, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MobileBottomNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  onOpenCityPicker: () => void;
  onOpenSearch?: () => void;
}

export default function MobileBottomNav({
  activeCategory,
  onSelectCategory,
  onOpenCityPicker: _onOpenCityPicker,
  onOpenSearch,
}: MobileBottomNavProps) {
  const { cartCount, openCart, wishlist, total } = useCart();
  const isHome = activeCategory === "all";

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#E5DDD0] px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-4px_25px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => {
            onSelectCategory("all");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition cursor-pointer active:scale-90 ${
            isHome ? "text-[#541827]" : "text-stone-500 hover:text-[#541827]"
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight ${isHome ? "font-black" : "font-semibold"}`}>
            Home
          </span>
          {isHome && <span className="w-1 h-1 rounded-full bg-[#C28A42] mt-0.5" />}
        </button>

        {/* 2. Collections */}
        <button
          onClick={() => {
            const el = document.getElementById("department-showcases");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition cursor-pointer active:scale-90 ${
            !isHome ? "text-[#541827]" : "text-stone-500 hover:text-[#541827]"
          }`}
        >
          <Layers className={`w-5 h-5 ${!isHome ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight ${!isHome ? "font-black" : "font-semibold"}`}>
            Collections
          </span>
          {!isHome && <span className="w-1 h-1 rounded-full bg-[#C28A42] mt-0.5" />}
        </button>

        {/* 3. Search */}
        <button
          onClick={() => {
            if (onOpenSearch) {
              onOpenSearch();
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-stone-500 hover:text-[#541827] transition cursor-pointer active:scale-90"
        >
          <Search className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-0.5 font-semibold tracking-tight">Search</span>
        </button>

        {/* 4. Wishlist */}
        <button
          onClick={() => {
            onSelectCategory("all");
            const el = document.getElementById("department-showcases");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-stone-500 hover:text-[#541827] relative cursor-pointer active:scale-90"
        >
          <div className="relative">
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#541827] text-white text-[9px] font-black flex items-center justify-center border-2 border-white">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-semibold tracking-tight">Saved</span>
        </button>

        {/* 5. Bag */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[#541827] relative cursor-pointer active:scale-90"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#541827] stroke-[2.3]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#C28A42] text-[#141210] text-[9px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-black tracking-tight text-[#541827]">
            {cartCount > 0 ? `₹${total.toLocaleString("en-IN")}` : "Bag"}
          </span>
        </button>
      </div>
    </nav>
  );
}
