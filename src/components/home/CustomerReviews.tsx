"use client";

import React from "react";
import { Star, CheckCircle } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "Meera Singhania",
      city: "New Delhi",
      rating: 5,
      product: "Jaipur Floral Heritage King Bedcover",
      text: "The drape and weight of this cotton bedcover transformed our bedroom. The kantha stitching gives it such a grounded, peaceful feel. It keeps you warm in air conditioning without suffocating. Truly an heirloom.",
      date: "Verified Patron",
    },
    {
      name: "Dr. Ananya Iyer",
      city: "Bengaluru",
      rating: 5,
      product: "Royal Jaipuri Silk-Mulmul Dohar Blanket",
      text: "The mulmul is whisper-soft against the skin. The block print colors have that organic, authentic depth that mass-produced synthetic quilts simply cannot duplicate.",
      date: "Verified Patron",
    },
    {
      name: "Rohan & Priya Mehra",
      city: "Mumbai",
      rating: 5,
      product: "Safari Animal Jaipur Cloud Kids Quilt",
      text: "We bought this for our 8-month-old daughter. Knowing it has zero polyester and only pure carded cotton gives us complete peace of mind. Shiprocket delivered to Bandra in 2 days.",
      date: "Verified Patron",
    },
  ];

  return (
    <section className="py-10 sm:py-18 lg:py-24 bg-white border-b border-[#E5DDD0] w-full">
      <div className="max-w-[1700px] w-full mx-auto px-3 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C28A42]">
              Patron Testimonials
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#29251F] mt-1">
              Adorned in Indian Homes
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-600 font-light">
            <div className="flex text-[#C28A42]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C28A42] text-[#C28A42]" />
              ))}
            </div>
            <span>4.9 / 5.0 Average across 1,800+ homes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-7 rounded-md bg-[#FAF6F0] border border-[#E5DDD0] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C28A42]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C28A42] text-[#C28A42]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                    {rev.date}
                  </span>
                </div>

                <p className="font-serif italic text-stone-800 text-sm leading-relaxed mb-6 font-normal">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DDD0] flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-xs text-[#29251F]">{rev.name}</h4>
                  <p className="text-[10px] text-stone-500 font-light">{rev.city}</p>
                </div>
                <span className="text-[10px] text-[#541827] font-semibold tracking-wide">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
