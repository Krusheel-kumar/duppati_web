"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Truck,
  CreditCard,
  MessageSquare,
  Lock,
  Calendar,
  Building,
  UserCheck,
  Check,
  Bell,
  Smartphone,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function CustomerJourneySimulator() {
  // Current active stage in the 6-step simulator
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Stage 1 & 2: User profile & OTP state
  const [mobileNumber, setMobileNumber] = useState("98765 43210");
  const [customerName, setCustomerName] = useState("Aditi Sharma");
  const [customerEmail, setCustomerEmail] = useState("aditi.sharma@gmail.com");
  const [otpCode, setOtpCode] = useState(["4", "8", "2", "9"]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOtpNotification, setShowOtpNotification] = useState(false);

  // Stage 3: Address state
  const [deliveryPincode, setDeliveryPincode] = useState("500081");
  const [deliveryAddress, setDeliveryAddress] = useState("Flat 402, Royal Palms, Jubilee Hills Road 36");
  const [deliveryCity, setDeliveryCity] = useState("Hyderabad, Telangana");
  const [deliverySlot, setDeliverySlot] = useState<"morning" | "evening">("morning");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");

  // Stage 4: Razorpay state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");

  // Stage 6: Delivery Availability (Amazon/Flipkart style)
  const [availabilityChoice, setAvailabilityChoice] = useState<
    "unselected" | "available" | "reschedule" | "security"
  >("unselected");

  // Stage 2: Trigger OTP
  const handleSendOtp = () => {
    setIsOtpSent(true);
    setShowOtpNotification(true);
    setTimeout(() => {
      setShowOtpNotification(false);
    }, 4500);
  };

  const handleVerifyOtp = () => {
    setIsOtpVerified(true);
    setTimeout(() => {
      setStage(3); // Auto advance to Address Checkout
    }, 900);
  };

  // Stage 4: Simulate Razorpay execution
  const handleExecutePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaymentSuccess(true);
      setTimeout(() => {
        setStage(5); // Auto advance to WhatsApp confirmation
      }, 1400);
    }, 1800);
  };

  // Reset entire simulator for another walkthrough
  const handleReset = () => {
    setStage(1);
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setIsProcessingPayment(false);
    setIsPaymentSuccess(false);
    setAvailabilityChoice("unselected");
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5DDD0] shadow-sm overflow-hidden">
      {/* Top Simulator Header with 6-Stage Stepper Navigation */}
      <div className="bg-[#1E050D] text-white p-4 sm:p-6 border-b border-[#3D0C1A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6C687]/15 border border-[#E6C687]/30 text-[#E6C687] text-[10px] font-semibold tracking-widest uppercase mb-1">
              <Sparkles className="w-3 h-3 text-[#E6C687]" />
              Live Interactive Visual Mockup
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
              End-to-End Customer Order & Delivery Journey
            </h3>
            <p className="text-xs text-stone-300 font-light mt-0.5">
              Click through each step or use the interactive buttons to experience how guests are converted, verified via WhatsApp, and tracked to their doorstep.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#E6C687] transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* 6-Stage Visual Stepper Tabs */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none pt-4 text-left">
          {[
            { num: 1, label: "Add to Bag", desc: "Guest Browsing" },
            { num: 2, label: "WhatsApp OTP", desc: "Mobile Sign Up" },
            { num: 3, label: "Address & Slot", desc: "Express Checkout" },
            { num: 4, label: "Razorpay PG", desc: "2% Commission" },
            { num: 5, label: "WhatsApp Alert", desc: "Order Confirmation" },
            { num: 6, label: "Courier Tracking", desc: "Amazon Delivery Check" },
          ].map((item) => {
            const isActive = stage === item.num;
            const isCompleted = stage > item.num;
            return (
              <button
                key={item.num}
                onClick={() => setStage(item.num as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 text-left ${
                  isActive
                    ? "bg-[#E6C687] text-[#1E050D] shadow-sm font-bold"
                    : isCompleted
                    ? "bg-white/10 text-white/90 hover:bg-white/15"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? "bg-[#1E050D] text-[#E6C687]"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {isCompleted ? "✓" : item.num}
                </span>
                <div className="hidden md:block">
                  <div className="text-xs leading-none">{item.label}</div>
                  <div className={`text-[10px] font-normal mt-0.5 ${isActive ? "text-[#1E050D]/80" : "text-white/50"}`}>
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Workspace Body */}
      <div className="p-4 sm:p-8 bg-[#FAF7F2] min-h-[520px]">
        {/* ========================================================================= */}
        {/* STAGE 1: UNLOGGED GUEST BROWSING & ADD TO CART TRIGGER                   */}
        {/* ========================================================================= */}
        {stage === 1 && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3.5 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Scenario:</strong> Customer visits Duppati Home for the first time. They have <strong>not logged in</strong> and have no prior account.
                </span>
              </div>
              <span className="text-[10px] bg-amber-200/60 px-2 py-0.5 rounded font-semibold shrink-0 uppercase">
                Step 1 of 6
              </span>
            </div>

            {/* Product Card Showcase */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DDD0] shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-5 relative aspect-square rounded-xl overflow-hidden bg-stone-100 border border-[#E5DDD0]">
                <Image
                  src="/assets/duppatis/blue-green-floral-print.png"
                  alt="Jaipuri Silk-Mulmul Dohar"
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#541827] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Bestseller
                </span>
              </div>

              <div className="sm:col-span-7 space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C28A42] tracking-widest">
                    Pure Jaipur Mulmul • Sanganer Print
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-normal text-[#29251F] mt-0.5 leading-snug">
                    Royal Jaipuri Silk-Mulmul Dohar Blanket
                  </h4>
                  <p className="text-xs text-stone-500 font-light mt-1">
                    Triple-layer breathable combed cotton cloud dohar. All-season cooling haveli bedding.
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pt-1 border-t border-stone-100">
                  <span className="font-serif text-2xl font-bold text-[#541827]">₹2,799</span>
                  <span className="text-xs text-stone-400 line-through">₹3,999</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Save 30%
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setStage(2)}
                    className="w-full py-3 px-5 rounded-xl bg-[#541827] hover:bg-[#43121e] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md active:scale-98 group"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E6C687]" />
                    <span>Add to Bag • ₹2,799</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-[10px] text-stone-400 mt-2">
                    ⚡ Clicking &apos;Add to Bag&apos; will trigger the seamless mobile sign-up prompt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: MOBILE NUMBER & INSTANT WHATSAPP OTP ACCOUNT CREATION           */}
        {/* ========================================================================= */}
        {stage === 2 && (
          <div className="max-w-md mx-auto space-y-5 animate-fade-in relative">
            {/* Simulated Live WhatsApp Push Notification at Top */}
            {showOtpNotification && (
              <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-80 sm:w-96 bg-[#075E54] text-white p-3.5 rounded-2xl shadow-2xl border border-emerald-400/40 flex items-start gap-3 animate-bounce">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#075E54]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      WhatsApp • Duppati Home
                      <Check className="w-3 h-3 text-emerald-300" />
                    </span>
                    <span className="text-[10px] text-emerald-200">now</span>
                  </div>
                  <p className="text-[11px] text-emerald-50 mt-0.5 leading-snug">
                    Your verification OTP is <strong className="text-white text-sm bg-black/20 px-1 rounded">4829</strong>. Valid for 10 minutes.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 border border-[#E5DDD0] shadow-sm space-y-4">
              <div className="text-center pb-3 border-b border-[#E5DDD0]">
                <div className="w-10 h-10 rounded-full bg-[#541827]/10 flex items-center justify-center mx-auto mb-2 text-[#541827]">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl font-normal text-[#29251F]">
                  Welcome to Duppati Home
                </h4>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  Sign in or create an account with your mobile number to unlock 15% off and save your delivery sanctuary.
                </p>
              </div>

              {/* Mobile Input */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Mobile Number (WhatsApp Enabled)
                </label>
                <div className="flex rounded-lg border border-[#E5DDD0] overflow-hidden focus-within:border-[#541827] focus-within:ring-1 focus-within:ring-[#541827]/20">
                  <span className="bg-stone-50 text-stone-600 px-3 py-2.5 text-xs font-bold border-r border-[#E5DDD0] flex items-center">
                    🇮🇳 +91
                  </span>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="flex-1 px-3 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Name & Email for profile creation */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5DDD0] text-stone-900 focus:outline-none focus:border-[#541827]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Email ID</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5DDD0] text-stone-900 focus:outline-none focus:border-[#541827]"
                  />
                </div>
              </div>

              {!isOtpSent ? (
                <button
                  onClick={handleSendOtp}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-xs active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send WhatsApp OTP (Meta Verified)</span>
                </button>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>Enter 4-Digit OTP sent to +91 {mobileNumber}</span>
                    <button
                      onClick={() => setShowOtpNotification(true)}
                      className="text-[10px] text-[#541827] font-bold underline cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  </div>

                  {/* 4 Digit Boxes */}
                  <div className="flex items-center justify-center gap-2">
                    {otpCode.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        readOnly
                        className="w-12 h-12 text-center text-lg font-bold rounded-lg border border-[#541827] bg-[#FAF6F0] text-[#541827]"
                      />
                    ))}
                  </div>

                  {/* Auto fill helper for presentation */}
                  <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Simulated code auto-filled: <strong>4829</strong></span>
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={isOtpVerified}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#541827] hover:bg-[#43121e] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-xs active:scale-98"
                  >
                    {isOtpVerified ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>✓ Verified & Logged In! Redirecting...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#E6C687]" />
                        <span>Verify & Proceed to Address</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E5DDD0] text-[10px] text-stone-500 flex items-center justify-between">
                <span>Cost to Merchant for this login:</span>
                <strong className="text-emerald-700">₹0.115 (Meta Official Rate)</strong>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: EXPRESS CHECKOUT & DELIVERY ADDRESS FORM                         */}
        {/* ========================================================================= */}
        {stage === 3 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Left Column: Address & Delivery Preference Form */}
              <div className="md:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DDD0] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD0]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#541827]" />
                    <h4 className="font-serif text-base sm:text-lg font-normal text-[#29251F]">
                      Delivery Address
                    </h4>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                    Logged in as {customerName}
                  </span>
                </div>

                {/* Pincode & City */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">Postal Pincode</label>
                    <input
                      type="text"
                      value={deliveryPincode}
                      onChange={(e) => setDeliveryPincode(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-[#E5DDD0] text-stone-900 focus:outline-none focus:border-[#541827]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">City & State</label>
                    <input
                      type="text"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5DDD0] text-stone-900 focus:outline-none focus:border-[#541827]"
                    />
                  </div>
                </div>

                {/* Street address */}
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">House / Flat & Street Name</label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E5DDD0] text-stone-900 focus:outline-none focus:border-[#541827]"
                  />
                </div>

                {/* Amazon / Flipkart Style Delivery Time Preference */}
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C28A42]" />
                    Preferred Delivery Slot:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliverySlot("morning")}
                      className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex items-center justify-between ${
                        deliverySlot === "morning"
                          ? "border-[#541827] bg-[#541827]/5 text-[#541827] font-bold"
                          : "border-[#E5DDD0] text-stone-600"
                      }`}
                    >
                      <span>☀️ Morning (9 AM – 1 PM)</span>
                      {deliverySlot === "morning" && <Check className="w-3.5 h-3.5 text-[#541827]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliverySlot("evening")}
                      className={`p-2.5 rounded-lg border text-left transition cursor-pointer flex items-center justify-between ${
                        deliverySlot === "evening"
                          ? "border-[#541827] bg-[#541827]/5 text-[#541827] font-bold"
                          : "border-[#E5DDD0] text-stone-600"
                      }`}
                    >
                      <span>🌆 Evening (4 PM – 8 PM)</span>
                      {deliverySlot === "evening" && <Check className="w-3.5 h-3.5 text-[#541827]" />}
                    </button>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="pt-2 border-t border-stone-100">
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1.5">
                    Select Payment Mode:
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                        paymentMethod === "upi"
                          ? "border-[#541827] bg-[#541827]/5 ring-1 ring-[#541827]"
                          : "border-[#E5DDD0]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-[#C28A42]" />
                        <div>
                          <div className="font-bold text-xs text-[#29251F]">
                            Online Payment via Razorpay (UPI, GPay, Cards)
                          </div>
                          <div className="text-[10px] text-emerald-700">Instant confirmation • Extra 5% Prepaid Discount</div>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-[#541827] flex items-center justify-center">
                        {paymentMethod === "upi" && <span className="w-2 h-2 rounded-full bg-[#541827]" />}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                        paymentMethod === "cod"
                          ? "border-[#541827] bg-[#541827]/5 ring-1 ring-[#541827]"
                          : "border-[#E5DDD0]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Truck className="w-4 h-4 text-stone-500" />
                        <div>
                          <div className="font-bold text-xs text-[#29251F]">Cash on Delivery (COD)</div>
                          <div className="text-[10px] text-stone-500">+₹40 courier handling fee • OTP verified upon delivery</div>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-stone-300 flex items-center justify-center">
                        {paymentMethod === "cod" && <span className="w-2 h-2 rounded-full bg-[#541827]" />}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Proceed Button */}
              <div className="md:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DDD0] shadow-sm space-y-4">
                <h4 className="font-serif text-base font-normal text-[#29251F] pb-2 border-b border-[#E5DDD0]">
                  Order Summary
                </h4>

                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#E5DDD0] shrink-0">
                    <Image
                      src="/assets/duppatis/blue-green-floral-print.png"
                      alt="Dohar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-semibold text-stone-800 truncate">Royal Jaipuri Silk-Mulmul Dohar</div>
                    <div className="text-stone-500 text-[11px]">King (90x108 in) • Qty: 1</div>
                    <div className="font-bold text-[#541827] mt-0.5">₹2,799</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal:</span>
                    <span>₹2,799</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promo JAIPUR15 (15% OFF):</span>
                    <span>-₹420</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Express Air Delivery:</span>
                    <span className="text-emerald-700 font-semibold">FREE (Order &gt; ₹1,999)</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#29251F] pt-2 border-t border-[#E5DDD0]">
                    <span>Total Amount:</span>
                    <span className="text-[#541827] font-serif text-base">₹2,379</span>
                  </div>
                </div>

                <button
                  onClick={() => setStage(4)}
                  className="w-full py-3 px-4 rounded-xl bg-[#541827] hover:bg-[#43121e] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md active:scale-98"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E6C687]" />
                  <span>Proceed to Razorpay Payment</span>
                </button>

                <p className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Secured with 256-bit bank encryption
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4: RAZORPAY PAYMENT SIMULATION & SUCCESS SCREEN                     */}
        {/* ========================================================================= */}
        {stage === 4 && (
          <div className="max-w-md mx-auto space-y-4 animate-fade-in">
            {/* Razorpay Branded Window */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#0C2340]/20 shadow-xl">
              {/* Razorpay Navy Header */}
              <div className="bg-[#0C2340] text-white px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">
                    Razorpay Trusted Gateway
                  </div>
                  <h4 className="font-semibold text-sm">Duppati Home (Official Store)</h4>
                </div>
                <div className="text-right">
                  <div className="text-xs text-sky-200">Amount to Pay</div>
                  <div className="font-mono text-base font-bold text-white">₹2,379.00</div>
                </div>
              </div>

              {!isPaymentSuccess ? (
                <div className="p-5 space-y-4">
                  <div className="text-xs font-semibold text-stone-700">Select UPI Payment Application:</div>

                  {/* UPI Apps Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {[
                      { id: "gpay", label: "Google Pay", icon: "GPay" },
                      { id: "phonepe", label: "PhonePe", icon: "PhonePe" },
                      { id: "paytm", label: "Paytm UPI", icon: "Paytm" },
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setSelectedUpiApp(app.id)}
                        className={`p-3 rounded-xl border transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          selectedUpiApp === app.id
                            ? "border-sky-600 bg-sky-50/50 text-sky-900 font-bold ring-1 ring-sky-600"
                            : "border-stone-200 hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <span className="font-bold text-xs">{app.icon}</span>
                        <span className="text-[10px] text-stone-500">{app.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Enter VPA Option */}
                  <div className="pt-2">
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Or Pay with UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="aditi@okaxis"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 text-stone-700"
                    />
                  </div>

                  <button
                    onClick={handleExecutePayment}
                    disabled={isProcessingPayment}
                    className="w-full py-3 px-4 rounded-xl bg-[#2B83EA] hover:bg-[#1E73DA] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md active:scale-98"
                  >
                    {isProcessingPayment ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Authorizing with Bank UPI...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pay ₹2,379.00 via UPI</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[10px] text-stone-500 pt-2 border-t border-stone-100">
                    <span>Razorpay MDR: 2% (₹47.58 + GST)</span>
                    <span className="text-emerald-700 font-semibold">T+2 Settlement to Brand Bank</span>
                  </div>
                </div>
              ) : (
                /* Payment Success View */
                <div className="p-8 text-center space-y-3 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#29251F] font-normal">
                    Payment Successful!
                  </h4>
                  <p className="text-xs text-stone-600">
                    Transaction ID: <span className="font-mono font-bold text-stone-800">pay_Ox892LKm9Z42</span>
                  </p>
                  <p className="text-xs text-stone-500">
                    Order #DUP-2026-8942 has been placed with Duppati Jaipur Studio.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setStage(5)}
                      className="px-4 py-2 rounded-full bg-[#541827] text-white text-xs font-semibold cursor-pointer"
                    >
                      View Customer WhatsApp Confirmation Alert →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 5: WHATSAPP ORDER CONFIRMATION (HYPER-REALISTIC SMARTPHONE MOCK)    */}
        {/* ========================================================================= */}
        {stage === 5 && (
          <div className="max-w-md mx-auto space-y-4 animate-fade-in">
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#25D366]">
                Meta WhatsApp Business API Delivery
              </span>
              <h4 className="font-serif text-xl text-[#29251F]">Instant Customer Order Alert</h4>
              <p className="text-xs text-stone-500">
                Delivered in &lt; 5 seconds with 98% open rate. Cost to merchant: <strong>₹0.115</strong>.
              </p>
            </div>

            {/* Smartphone Mockup */}
            <div className="bg-[#111B21] rounded-[36px] p-3 shadow-2xl border-4 border-stone-800 max-w-sm mx-auto">
              <div className="bg-[#0B141A] rounded-[28px] overflow-hidden border border-stone-700/50">
                {/* WhatsApp Chat Header */}
                <div className="bg-[#202C33] px-3.5 py-3 flex items-center justify-between text-white border-b border-stone-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#541827] flex items-center justify-center font-serif text-xs font-bold text-[#E6C687] border border-[#E6C687]/40">
                      D
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold">
                        <span>Duppati Home</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 text-black" />
                      </div>
                      <div className="text-[9px] text-stone-400">Official Business Account</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-400">12:34 PM</span>
                </div>

                {/* Chat Background & Message Bubble */}
                <div className="p-3 bg-[#0B141A] min-h-[360px] space-y-3 flex flex-col justify-end">
                  {/* Verified WhatsApp Template Message */}
                  <div className="bg-[#005C4B] text-white p-3.5 rounded-2xl rounded-tl-xs text-xs space-y-2 shadow-sm max-w-[92%]">
                    <p className="font-semibold text-emerald-100">
                      Namaste {customerName}! 🙏
                    </p>
                    <p className="text-[11px] text-emerald-50 leading-relaxed">
                      Thank you for choosing Duppati Home. Your order <strong className="text-white">#DUP-2026-8942</strong> has been confirmed! 🛏️
                    </p>

                    <div className="p-2.5 rounded-lg bg-black/20 text-[11px] space-y-1">
                      <div>📦 <strong>Item:</strong> Royal Jaipuri Silk-Mulmul Dohar (King)</div>
                      <div>💰 <strong>Amount:</strong> ₹2,379 (Paid via UPI)</div>
                      <div>📍 <strong>Address:</strong> Jubilee Hills, Hyderabad - 500081</div>
                      <div>🚚 <strong>Logistics:</strong> Shiprocket Express Air Dispatch</div>
                    </div>

                    <p className="text-[10px] text-emerald-200/90 pt-1">
                      Our Sanganer printing atelier has initiated hand-inspection &amp; vacuum poly-pack.
                    </p>
                    <div className="text-[9px] text-emerald-300 text-right">12:34 PM ✓✓</div>
                  </div>

                  {/* Interactive Quick Action Buttons in WhatsApp */}
                  <div className="space-y-1.5 pt-1">
                    <button
                      onClick={() => setStage(6)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#202C33] hover:bg-[#2A3942] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer border border-stone-600/50"
                    >
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>📦 Track Delivery Status &amp; Account</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    <button
                      type="button"
                      className="w-full py-2 px-3 rounded-xl bg-[#202C33]/60 text-stone-300 text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3 text-sky-400" />
                      <span>💬 Chat with Customer Stylist</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 6: ACCOUNT TRACKING & AMAZON/FLIPKART DELIVERY AVAILABILITY CHECK   */}
        {/* ========================================================================= */}
        {stage === 6 && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Top Shipment Status Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DDD0] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5DDD0] gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                    Shiprocket Express Tracking (Air Courier)
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#29251F] mt-0.5">
                    Order #DUP-2026-8942 • Out for Delivery
                  </h4>
                  <p className="text-xs text-stone-500 font-light mt-0.5">
                    Courier: <strong>Delhivery Air Express</strong> • AWB Number: <strong className="font-mono">849201948271</strong>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-stone-500">Delivery Executive</div>
                  <div className="font-semibold text-xs text-[#29251F]">Ramesh Kumar (+91 98765 12345)</div>
                  <span className="inline-block mt-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">
                    ETA: Today by 4:30 PM
                  </span>
                </div>
              </div>

              {/* 5-Step Courier Milestone Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-6 text-center text-xs">
                <div className="space-y-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                    ✓
                  </div>
                  <div className="font-semibold text-[#29251F]">Order Placed</div>
                  <div className="text-[10px] text-stone-400">Jaipur Studio</div>
                </div>

                <div className="space-y-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                    ✓
                  </div>
                  <div className="font-semibold text-[#29251F]">Vacuum Packed</div>
                  <div className="text-[10px] text-stone-400">Saved 40% Vol.</div>
                </div>

                <div className="space-y-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                    ✓
                  </div>
                  <div className="font-semibold text-[#29251F]">Picked Up by Air</div>
                  <div className="text-[10px] text-stone-400">Delhivery Hub</div>
                </div>

                <div className="space-y-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold">
                    ✓
                  </div>
                  <div className="font-semibold text-[#29251F]">Hyderabad Hub</div>
                  <div className="text-[10px] text-stone-400">Sorting Complete</div>
                </div>

                <div className="space-y-1">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
                    🚚
                  </div>
                  <div className="font-bold text-[#541827]">Out for Delivery</div>
                  <div className="text-[10px] text-emerald-700 font-bold">Today 4:30 PM</div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* THE AMAZON / FLIPKART STYLE CUSTOMER AVAILABILITY CHECKER               */}
              {/* ========================================================================= */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 via-[#FAF6F0] to-amber-50 border-2 border-amber-300/80 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-700 animate-bounce" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        Delivery Availability Confirmation (Amazon / Flipkart Feature)
                      </span>
                    </div>
                    <h5 className="font-serif text-base font-normal text-[#29251F] mt-1">
                      🚚 Your parcel is scheduled for delivery today between 2:00 PM – 5:00 PM
                    </h5>
                    <p className="text-xs text-stone-600 font-light mt-0.5">
                      Will you be available at <strong>Flat 402, Jubilee Hills</strong> to receive your Duppati Home parcel?
                    </p>
                  </div>

                  <span className="text-[10px] bg-white text-stone-600 px-2 py-0.5 rounded border border-stone-200 shrink-0 font-mono">
                    Prevents RTO
                  </span>
                </div>

                {/* Interactive Choice Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <button
                    onClick={() => setAvailabilityChoice("available")}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                      availabilityChoice === "available"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500"
                        : "border-[#E5DDD0] bg-white hover:bg-stone-50 text-stone-800"
                    }`}
                  >
                    <div>
                      <div>✓ Yes, I am Available</div>
                      <div className="text-[10px] text-stone-500 font-normal mt-0.5">Hand delivery to customer</div>
                    </div>
                    {availabilityChoice === "available" && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => setAvailabilityChoice("reschedule")}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                      availabilityChoice === "reschedule"
                        ? "border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500"
                        : "border-[#E5DDD0] bg-white hover:bg-stone-50 text-stone-800"
                    }`}
                  >
                    <div>
                      <div>⏱ Reschedule to Tomorrow</div>
                      <div className="text-[10px] text-stone-500 font-normal mt-0.5">Zero penalty re-attempt</div>
                    </div>
                    {availabilityChoice === "reschedule" && <Check className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    onClick={() => setAvailabilityChoice("security")}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                      availabilityChoice === "security"
                        ? "border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-500"
                        : "border-[#E5DDD0] bg-white hover:bg-stone-50 text-stone-800"
                    }`}
                  >
                    <div>
                      <div>🏢 Leave at Security Gate</div>
                      <div className="text-[10px] text-stone-500 font-normal mt-0.5">Contactless safe-drop</div>
                    </div>
                    {availabilityChoice === "security" && <Check className="w-4 h-4 text-sky-600" />}
                  </button>
                </div>

                {/* Dynamic Status Feedback */}
                {availabilityChoice !== "unselected" && (
                  <div className="p-3 rounded-lg bg-white border border-stone-200 text-xs text-stone-700 animate-fade-in flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {availabilityChoice === "available" && (
                      <span>
                        <strong>Confirmed:</strong> Courier Executive Ramesh Kumar notified. Delivery OTP: <strong className="font-mono text-[#541827]">7391</strong> (share only upon package receipt).
                      </span>
                    )}
                    {availabilityChoice === "reschedule" && (
                      <span>
                        <strong>Rescheduled:</strong> Delivery re-assigned for Tomorrow between 10:00 AM – 1:00 PM. No RTO or courier penalty!
                      </span>
                    )}
                    {availabilityChoice === "security" && (
                      <span>
                        <strong>Safe-drop Verified:</strong> Executive instructed to drop package with Building Security and upload signature photo.
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Why This Matters for Client Margins */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DDD0] text-xs space-y-2">
              <h5 className="font-bold text-[#541827] uppercase tracking-wider text-[11px]">
                Why This Flow Protects Your Business:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-stone-600 text-[11px]">
                <div>
                  <strong>1. Zero Password Friction:</strong> WhatsApp OTP authentication yields a 35% higher signup conversion rate than legacy password forms.
                </div>
                <div>
                  <strong>2. 45% Lower RTO Loss:</strong> Asking for delivery availability before the courier knocks eliminates &quot;customer not home&quot; returns.
                </div>
                <div>
                  <strong>3. Transparent 2% Gateway:</strong> Razorpay processes UPI and Cards reliably with T+2 automatic bank payouts and zero setup fees.
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-full bg-[#541827] text-white text-xs font-semibold hover:bg-[#43121e] cursor-pointer shadow-sm transition"
              >
                Restart Customer Journey Simulation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
