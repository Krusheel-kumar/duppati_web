"use client";

import React, { useState } from "react";
import { Truck, CheckCircle2, AlertCircle, MapPin, Loader2 } from "lucide-react";
import { PINCODES_DATA } from "@/data/products";

export default function PincodeChecker({ compact = false }: { compact?: boolean }) {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    city?: string;
    state?: string;
    days?: string;
    cod?: boolean;
    valid: boolean;
    message: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setResult({
        valid: false,
        message: "Please enter a valid 6-digit Indian postal pincode.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate Shiprocket Courier Serviceability Lookup
    setTimeout(() => {
      setLoading(false);
      const found = PINCODES_DATA[clean];
      if (found) {
        setResult({
          city: found.city,
          state: found.state,
          days: found.days,
          cod: found.cod,
          valid: true,
          message: `Serviceable by Shiprocket Express! Estimated delivery in ${found.days} to ${found.city}, ${found.state}.`,
        });
      } else {
        setResult({
          city: "Standard Zone",
          state: "India",
          days: "3-5 Business Days",
          cod: true,
          valid: true,
          message:
            "Shiprocket Express available! Estimated delivery in 3-5 business days. Cash on delivery available.",
        });
      }
    }, 500);
  };

  return (
    <div
      className={`rounded-md border border-[#E5DDD0] bg-[#FAF6F0] p-4 transition-all ${
        compact ? "text-xs" : "text-sm shadow-xs"
      }`}
    >
      <div className="flex items-center gap-2 mb-2 text-[#29251F] font-medium text-xs">
        <Truck className="w-4 h-4 text-[#541827]" />
        <span>Check Express Delivery & COD Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit Pincode (e.g. 500001, 302001)"
            className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-[#E5DDD0] bg-white text-[#29251F] placeholder:text-stone-400 focus:outline-none focus:border-[#541827]"
          />
        </div>
        <button
          type="submit"
          disabled={loading || pincode.length !== 6}
          className="px-4 py-2 rounded-sm bg-[#541827] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#43121e] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Check
        </button>
      </form>

      {/* Result feedback */}
      {result && (
        <div
          className={`mt-3 p-3 rounded-sm flex items-start gap-2.5 text-xs ${
            result.valid
              ? "bg-white text-stone-800 border border-emerald-300"
              : "bg-white text-rose-800 border border-rose-300"
          }`}
        >
          {result.valid ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="leading-relaxed">
            <p className="font-medium text-xs">{result.message}</p>
            {result.valid && (
              <p className="text-[11px] text-stone-500 font-light mt-0.5">
                Dispatched directly from Jaipur Craft Center within 24 hours.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
