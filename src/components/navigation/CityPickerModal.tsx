"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Check, Truck, Search } from "lucide-react";
import { PINCODES_DATA } from "@/data/products";

interface CityPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  onSelectCity: (city: string) => void;
}

const POPULAR_CITIES = [
  { city: "Hyderabad", state: "Telangana", pin: "500001" },
  { city: "Jaipur", state: "Rajasthan (Origin)", pin: "302001" },
  { city: "New Delhi", state: "Delhi NCR", pin: "110001" },
  { city: "Mumbai", state: "Maharashtra", pin: "400001" },
  { city: "Bengaluru", state: "Karnataka", pin: "560001" },
  { city: "Chennai", state: "Tamil Nadu", pin: "600001" },
  { city: "Kolkata", state: "West Bengal", pin: "700001" },
  { city: "Ahmedabad", state: "Gujarat", pin: "380001" },
];

export default function CityPickerModal({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
}: CityPickerModalProps) {
  const [customPincode, setCustomPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(customPincode)) {
      const found = PINCODES_DATA[customPincode];
      if (found) {
        onSelectCity(found.city);
        onClose();
      } else {
        onSelectCity(`PIN: ${customPincode}`);
        onClose();
      }
    } else {
      setPincodeStatus("Please enter a valid 6-digit Pincode.");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-[#E5DDD0] p-5 sm:p-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD0]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#541827]" />
              <h3 className="font-serif text-lg font-medium text-[#29251F]">
                Delivery Destination
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-stone-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pincode Input Form */}
          <form onSubmit={handleApplyPincode} className="mt-4">
            <label className="block text-xs font-medium text-stone-700 mb-1.5">
              Enter Indian Pincode:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  maxLength={6}
                  value={customPincode}
                  onChange={(e) => {
                    setCustomPincode(e.target.value.replace(/\D/g, ""));
                    setPincodeStatus(null);
                  }}
                  placeholder="e.g. 500001 (Hyderabad)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] focus:bg-white focus:outline-none focus:border-[#541827]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-sm bg-[#541827] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#43121e] transition"
              >
                Apply
              </button>
            </div>
            {pincodeStatus && (
              <p className="text-[11px] text-rose-600 mt-1">{pincodeStatus}</p>
            )}
          </form>

          {/* Popular Cities Grid */}
          <div className="mt-6">
            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-2.5">
              Popular Delivery Hubs (Shiprocket Express)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_CITIES.map((c) => {
                const isSelected = currentCity.toLowerCase().includes(c.city.toLowerCase());
                return (
                  <button
                    key={c.city}
                    onClick={() => {
                      onSelectCity(c.city);
                      onClose();
                    }}
                    className={`p-2.5 rounded-sm text-left border text-xs transition flex items-center justify-between ${
                      isSelected
                        ? "border-[#541827] bg-[#FAF6F0] text-[#541827] font-semibold"
                        : "border-[#E5DDD0] bg-white text-stone-700 hover:border-[#C28A42]"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-xs">{c.city}</p>
                      <p className="text-[10px] text-stone-500 font-light">{c.state}</p>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#541827]" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#E5DDD0] flex items-center justify-center gap-2 text-[11px] text-stone-500 font-light">
            <Truck className="w-3.5 h-3.5 text-[#C28A42]" />
            <span>Dispatched with express tracking from Jaipur Craft Center</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
