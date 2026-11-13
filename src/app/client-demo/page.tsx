"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCard,
  Truck,
  MessageSquare,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Layers,
  PhoneCall,
  Mail,
  Zap,
  Building2,
  DollarSign,
  PackageCheck,
  Scale,
  Smartphone,
  Store,
  RotateCcw,
} from "lucide-react";
import CustomerJourneySimulator from "@/components/demo/CustomerJourneySimulator";
import OwnerJourneySimulator from "@/components/demo/OwnerJourneySimulator";
import ReturnsRefundSimulator from "@/components/demo/ReturnsRefundSimulator";

export default function ClientDemoPage() {
  const [activeTab, setActiveTab] = useState<
    "simulator" | "admin_simulator" | "returns" | "calculator" | "payments" | "shipping" | "messaging" | "production"
  >("simulator");

  // Interactive Calculator State
  const [monthlyOrders, setMonthlyOrders] = useState<number>(350);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(2650);
  const [shippingModel, setShippingModel] = useState<"free_threshold" | "customer_paid" | "subsidized">("free_threshold");
  const [codSharePercent, setCodSharePercent] = useState<number>(45); // 45% COD in India
  const [selectedGateway, setSelectedGateway] = useState<"razorpay" | "cashfree" | "phonepe">("razorpay");

  // Dynamic Financial Projections
  const financials = useMemo(() => {
    const grossRevenue = monthlyOrders * averageOrderValue;

    // Payment Gateway Costs
    const pgRate = selectedGateway === "razorpay" ? 0.02 : selectedGateway === "cashfree" ? 0.0195 : 0.019;
    const prepaidOrders = Math.round(monthlyOrders * (1 - codSharePercent / 100));
    const codOrders = monthlyOrders - prepaidOrders;
    const prepaidRevenue = prepaidOrders * averageOrderValue;
    const pgBaseFee = prepaidRevenue * pgRate;
    const pgGst = pgBaseFee * 0.18; // 18% GST on processing fee
    const totalPgFee = pgBaseFee + pgGst;

    // Shipping & Logistics Costs
    // Bedding average weight ~ 1.0kg to 1.5kg volumetric (dohars/quilts/sheets)
    const avgFreightPerShipment = 72; // blended national average for ~1kg volumetric
    const codFeePerOrder = 38; // ₹38 flat or 2% COD collection fee
    const totalCodCourierFees = codOrders * codFeePerOrder;
    
    // Who pays shipping?
    let merchantShippingCost = 0;
    let customerShippingRevenue = 0;
    if (shippingModel === "free_threshold") {
      // 80% orders exceed ₹1,999 threshold (free shipping absorbed by merchant)
      // 20% orders below threshold pay ₹99
      const qualifyingFree = Math.round(monthlyOrders * 0.82);
      const customerPaid = monthlyOrders - qualifyingFree;
      customerShippingRevenue = customerPaid * 99;
      merchantShippingCost = (qualifyingFree * avgFreightPerShipment) + (customerPaid * (avgFreightPerShipment - 99)) + totalCodCourierFees;
    } else if (shippingModel === "customer_paid") {
      // Customer pays flat ₹99 on all orders
      customerShippingRevenue = monthlyOrders * 99;
      merchantShippingCost = (monthlyOrders * avgFreightPerShipment) - customerShippingRevenue + totalCodCourierFees;
    } else {
      // Subsidized: customer pays ₹49, merchant absorbs remainder
      customerShippingRevenue = monthlyOrders * 49;
      merchantShippingCost = (monthlyOrders * (avgFreightPerShipment - 49)) + totalCodCourierFees;
    }
    merchantShippingCost = Math.max(0, merchantShippingCost);

    // Messaging & OTP Costs
    // 1 OTP per signup/login (₹0.115 via WhatsApp / ₹0.18 via SMS)
    // 3 transactional WhatsApp alerts (Order confirmation, Dispatch tracking, Delivered) @ ₹0.115 each
    const otpCost = monthlyOrders * 1.3 * 0.15; // factoring repeat customer attempts
    const orderAlertsCost = monthlyOrders * 3 * 0.115;
    const abandonedCartMarketing = Math.round(monthlyOrders * 0.4) * 0.8631; // marketing recovery messages
    const messagingPlatformSaaS = 1200; // AiSensy / MSG91 base plan
    const totalMessagingCost = otpCost + orderAlertsCost + abandonedCartMarketing + messagingPlatformSaaS;

    // Cloud & Core SaaS Subscriptions
    const vercelHosting = 1750; // Vercel Pro $20/mo
    const databaseSupabase = 0; // Free tier up to 50k MAU
    const domainAndDns = 120; // ₹1,400/yr prorated monthly
    const totalSaaS = vercelHosting + databaseSupabase + domainAndDns;

    // Total Third-Party Operational Cost
    const totalOperatingCost = totalPgFee + merchantShippingCost + totalMessagingCost + totalSaaS;
    const costPerOrder = monthlyOrders > 0 ? totalOperatingCost / monthlyOrders : 0;
    const costPercentOfRevenue = grossRevenue > 0 ? (totalOperatingCost / grossRevenue) * 100 : 0;

    return {
      grossRevenue,
      prepaidOrders,
      codOrders,
      totalPgFee,
      merchantShippingCost,
      totalCodCourierFees,
      customerShippingRevenue,
      totalMessagingCost,
      totalSaaS,
      totalOperatingCost,
      costPerOrder,
      costPercentOfRevenue,
    };
  }, [monthlyOrders, averageOrderValue, shippingModel, codSharePercent, selectedGateway]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#29251F] font-sans antialiased selection:bg-[#541827] selection:text-white pb-36">
      {/* 1. Top Executive Navigation Banner */}
      <header className="sticky top-0 z-50 bg-[#1E050D] text-white border-b border-[#3D0C1A] shadow-md">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E6C687] text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Live Boutique</span>
            </Link>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Client Presentation & Production Architecture</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-[#E6C687] font-semibold bg-[#3D0C1A] px-2.5 py-1 rounded-full border border-[#E6C687]/30">
              Commercial Viability Model 2026
            </span>
          </div>
        </div>
      </header>

      {/* 2. Executive Hero Briefing */}
      <section className="bg-gradient-to-b from-[#1E050D] to-[#2D0914] text-white pt-8 pb-14 px-4 sm:px-8 border-b border-[#E5DDD0]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E6C687]/15 border border-[#E6C687]/30 text-[#E6C687] text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
            D2C E-Commerce Economics & Production Integrations
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FAF6F0]">
            Complete Operational Cost Breakdown
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-light mt-2.5 max-w-2xl mx-auto leading-relaxed">
            A transparent market guide covering third-party service fees for payment gateways,
            Shiprocket logistics, WhatsApp & SMS OTP infrastructure, and production launch prerequisites.
          </p>

          {/* Quick Snapshot KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8 text-left">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#E6C687]" />
                Payment Gateway
              </div>
              <div className="text-xl sm:text-2xl font-serif text-[#E6C687] font-normal mt-1">2.0% + GST</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Razorpay standard domestic MDR</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                Shipping Base
              </div>
              <div className="text-xl sm:text-2xl font-serif text-white font-normal mt-1">₹35 – ₹65</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Per 500g via Shiprocket air</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                WhatsApp OTP
              </div>
              <div className="text-xl sm:text-2xl font-serif text-white font-normal mt-1">₹0.115</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Official Meta utility tier rate</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Setup Overhead
              </div>
              <div className="text-xl sm:text-2xl font-serif text-white font-normal mt-1">₹0 Setup</div>
              <div className="text-[10px] text-stone-400 mt-0.5">Zero upfront fees on PG & Logistics</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Navigation Tab Bar */}
      <div className="sticky top-[53px] z-40 bg-white/95 backdrop-blur-md border-b border-[#E5DDD0] shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none py-2.5">
          {[
            { id: "simulator", label: "Customer Journey Flow", icon: Smartphone },
            { id: "admin_simulator", label: "Store Owner / Admin Flow", icon: Store },
            { id: "returns", label: "Returns, Refunds & COD RTO", icon: RotateCcw },
            { id: "calculator", label: "Interactive Cost Calculator", icon: Calculator },
            { id: "payments", label: "Payment Gateways (Razorpay)", icon: CreditCard },
            { id: "shipping", label: "Shiprocket & Delivery Models", icon: Truck },
            { id: "messaging", label: "WhatsApp & SMS OTP", icon: MessageSquare },
            { id: "production", label: "Production Launch Checklist", icon: PackageCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#541827] text-white shadow-sm ring-1 ring-[#541827]"
                    : "bg-[#FAF7F2] text-stone-700 hover:bg-stone-200/80 border border-[#E5DDD0]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#E6C687]" : "text-stone-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Tab Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        {/* Quick Multi-Perspective Switcher for Client Presentations */}
        {(activeTab === "simulator" || activeTab === "admin_simulator" || activeTab === "returns") && (
          <div className="mb-6 p-2 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 pl-2 text-xs text-stone-600">
              <span className="font-serif font-bold text-[#541827]">Interactive Demo View:</span>
              <span className="hidden sm:inline text-stone-400">•</span>
              <span className="text-stone-500">
                {activeTab === "simulator" && "Currently viewing: Shopper front-end checkout & OTP journey"}
                {activeTab === "admin_simulator" && "Currently viewing: Store Owner & Admin back-office fulfillment"}
                {activeTab === "returns" && "Currently viewing: Returns, Razorpay instant refunds & COD RTO"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab("simulator")}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 ${
                  activeTab === "simulator"
                    ? "bg-[#541827] text-white shadow-xs"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-[#E6C687]" />
                <span>1. Customer Flow</span>
              </button>

              <button
                onClick={() => setActiveTab("admin_simulator")}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 ${
                  activeTab === "admin_simulator"
                    ? "bg-[#541827] text-white shadow-xs"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                <Store className="w-3.5 h-3.5 text-[#E6C687]" />
                <span>2. Store Owner Flow</span>
              </button>

              <button
                onClick={() => setActiveTab("returns")}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 ${
                  activeTab === "returns"
                    ? "bg-[#541827] text-white shadow-xs"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#E6C687]" />
                <span>3. Returns & Refunds Flow</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 0A: LIVE CUSTOMER JOURNEY SIMULATOR                    */}
        {/* ========================================================== */}
        {activeTab === "simulator" && (
          <div className="space-y-8 animate-fade-in">
            <CustomerJourneySimulator />
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 0B: LIVE STORE OWNER / ADMIN SIMULATOR                 */}
        {/* ========================================================== */}
        {activeTab === "admin_simulator" && (
          <div className="space-y-8 animate-fade-in">
            <OwnerJourneySimulator />
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 0C: RETURNS, REFUNDS & COD RTO SIMULATOR               */}
        {/* ========================================================== */}
        {activeTab === "returns" && (
          <div className="space-y-8 animate-fade-in">
            <ReturnsRefundSimulator />
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 1: INTERACTIVE CALCULATOR                              */}
        {/* ========================================================== */}
        {activeTab === "calculator" && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#E5DDD0] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E5DDD0] gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C28A42]">
                    Dynamic Profit & Loss Simulator
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F] mt-0.5">
                    Monthly Operational Cost Calculator
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
                    Adjust order volume and average basket size to see real-world third-party fees.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-[#FAF7F2] p-2 rounded-xl border border-[#E5DDD0]">
                  <span className="text-xs font-semibold text-stone-700">Gateway:</span>
                  <select
                    value={selectedGateway}
                    onChange={(e) => setSelectedGateway(e.target.value as any)}
                    className="bg-white text-xs font-bold text-[#541827] px-3 py-1.5 rounded-lg border border-[#E5DDD0] focus:outline-none cursor-pointer"
                  >
                    <option value="razorpay">Razorpay (2.0%)</option>
                    <option value="cashfree">Cashfree (1.95%)</option>
                    <option value="phonepe">PhonePe PG (1.90%)</option>
                  </select>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-[#E5DDD0]">
                {/* 1. Monthly Orders */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-stone-700">Estimated Monthly Orders</label>
                    <span className="text-sm font-bold text-[#541827] font-mono bg-[#FAF7F2] px-2.5 py-0.5 rounded border border-[#E5DDD0]">
                      {monthlyOrders.toLocaleString("en-IN")} orders
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="25"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full accent-[#541827] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>50 orders/mo</span>
                    <span>1,000 orders/mo</span>
                    <span>2,000+ orders/mo</span>
                  </div>
                </div>

                {/* 2. Average Order Value */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-stone-700">Average Basket Size (AOV)</label>
                    <span className="text-sm font-bold text-[#541827] font-mono bg-[#FAF7F2] px-2.5 py-0.5 rounded border border-[#E5DDD0]">
                      ₹{averageOrderValue.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1200"
                    max="5000"
                    step="50"
                    value={averageOrderValue}
                    onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                    className="w-full accent-[#541827] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>₹1,200 (Bedsheet)</span>
                    <span>₹2,800 (Dohar/Quilt)</span>
                    <span>₹5,000 (Sanctuary Set)</span>
                  </div>
                </div>

                {/* 3. COD vs Prepaid Ratio */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-stone-700">Cash on Delivery (COD) Share</label>
                    <span className="text-sm font-bold text-[#541827] font-mono bg-[#FAF7F2] px-2.5 py-0.5 rounded border border-[#E5DDD0]">
                      {codSharePercent}% COD ({100 - codSharePercent}% Prepaid)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={codSharePercent}
                    onChange={(e) => setCodSharePercent(Number(e.target.value))}
                    className="w-full accent-[#541827] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>10% COD (Metro)</span>
                    <span>45% (National Avg)</span>
                    <span>80% COD (Tier 2/3)</span>
                  </div>
                </div>
              </div>

              {/* Shipping Strategy Toggle */}
              <div className="pt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
                  Delivery Expense Strategy
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setShippingModel("free_threshold")}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                      shippingModel === "free_threshold"
                        ? "border-[#541827] bg-[#541827]/5 ring-1 ring-[#541827]"
                        : "border-[#E5DDD0] bg-[#FAF7F2] hover:bg-stone-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#541827]">Free Above ₹1,999 (Recommended)</span>
                      {shippingModel === "free_threshold" && <CheckCircle2 className="w-4 h-4 text-[#541827]" />}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Brand absorbs shipping on high-value orders; drives +28% basket size. Under ₹1,999 customer pays ₹99.
                    </p>
                  </button>

                  <button
                    onClick={() => setShippingModel("customer_paid")}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                      shippingModel === "customer_paid"
                        ? "border-[#541827] bg-[#541827]/5 ring-1 ring-[#541827]"
                        : "border-[#E5DDD0] bg-[#FAF7F2] hover:bg-stone-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-800">100% Customer Paid</span>
                      {shippingModel === "customer_paid" && <CheckCircle2 className="w-4 h-4 text-[#541827]" />}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Flat ₹99 shipping added at checkout for every customer. Zero merchant logistics burn.
                    </p>
                  </button>

                  <button
                    onClick={() => setShippingModel("subsidized")}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                      shippingModel === "subsidized"
                        ? "border-[#541827] bg-[#541827]/5 ring-1 ring-[#541827]"
                        : "border-[#E5DDD0] bg-[#FAF7F2] hover:bg-stone-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-stone-800">Subsidized (Flat ₹49)</span>
                      {shippingModel === "subsidized" && <CheckCircle2 className="w-4 h-4 text-[#541827]" />}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Customer pays nominal ₹49, brand absorbs remaining ~₹25 freight. Reduces cart abandonment.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Financial Breakdown Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Summary Cards */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-[#E5DDD0] shadow-sm">
                  <h3 className="font-serif text-lg font-normal text-[#29251F] pb-3 mb-4 border-b border-[#E5DDD0] flex items-center justify-between">
                    <span>Monthly Expense Breakdown</span>
                    <span className="text-xs font-sans text-stone-500 font-light">
                      Gross GMV: <strong className="text-[#541827]">₹{financials.grossRevenue.toLocaleString("en-IN")}</strong>
                    </span>
                  </h3>

                  <div className="space-y-3.5 text-xs sm:text-sm">
                    {/* PG Fees */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#C28A42]" />
                        <div>
                          <div className="font-semibold text-[#29251F]">
                            {selectedGateway.toUpperCase()} Gateway Fees
                          </div>
                          <div className="text-[11px] text-stone-500">
                            2% + 18% GST on {financials.prepaidOrders} prepaid orders
                          </div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#29251F]">
                        ₹{Math.round(financials.totalPgFee).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Shipping Costs */}
                    <div className="flex items-center justify-between py-1 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-semibold text-[#29251F]">
                            Shiprocket Logistics Expense
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Freight + COD collection charges (net of customer-paid delivery)
                          </div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#29251F]">
                        ₹{Math.round(financials.merchantShippingCost).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* WhatsApp & OTP */}
                    <div className="flex items-center justify-between py-1 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-sky-600" />
                        <div>
                          <div className="font-semibold text-[#29251F]">
                            WhatsApp & SMS OTP Infrastructure
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Meta utility rates (₹0.115) + order tracking + DLT SMS
                          </div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#29251F]">
                        ₹{Math.round(financials.totalMessagingCost).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Core SaaS / Vercel */}
                    <div className="flex items-center justify-between py-1 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-semibold text-[#29251F]">
                            Cloud Hosting & Domain (Vercel Pro)
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Enterprise Next.js hosting, SSL, and image optimization CDN
                          </div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#29251F]">
                        ₹{Math.round(financials.totalSaaS).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>RTO Tip for Bedding:</strong> Home bedding has a lower RTO (~8-12%) than apparel (~25%).
                    Activating automated WhatsApp address confirmation before dispatch reduces COD returns by 40%, saving roughly ₹110 per avoided RTO.
                  </p>
                </div>
              </div>

              {/* Total Bottomline Impact Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#541827] to-[#2D0914] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-[#7A253A] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C28A42]/10 rounded-full blur-2xl pointer-events-none" />

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6C687]">
                  Landed Overhead Per Order
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-white">
                    ₹{Math.round(financials.costPerOrder).toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-[#E6C687]">/ order landed cost</span>
                </div>

                <p className="text-xs text-white/80 font-light mt-1">
                  Accounts for only <strong>{financials.costPercentOfRevenue.toFixed(1)}%</strong> of your gross revenue.
                </p>

                <div className="mt-6 pt-5 border-t border-white/15 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Monthly Revenue:</span>
                    <span className="font-mono font-bold text-white">
                      ₹{financials.grossRevenue.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Total 3rd-Party Overhead:</span>
                    <span className="font-mono font-bold text-[#E6C687]">
                      ₹{Math.round(financials.totalOperatingCost).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold pt-2 border-t border-white/10">
                    <span className="text-emerald-300">Gross Margin Before COGS:</span>
                    <span className="font-mono text-emerald-300">
                      {(100 - financials.costPercentOfRevenue).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-3 rounded-lg bg-black/30 border border-white/10 text-[11px] text-white/80 leading-relaxed">
                  ✓ <strong>Conclusion:</strong> Third-party integrations represent less than 5% of turnover on high-ticket luxury bedding (₹2,500+ AOV), preserving strong profit margins.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: PAYMENT GATEWAYS                                    */}
        {/* ========================================================== */}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C28A42]">
                Fintech Architecture
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F] mt-0.5">
                Indian Payment Gateways Comparison
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-1 max-w-2xl">
                A factual rate analysis across India&apos;s leading RBI-authorized payment aggregators.
              </p>

              {/* Comparison Table */}
              <div className="mt-6 overflow-x-auto border border-[#E5DDD0] rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF7F2] text-stone-700 font-semibold border-b border-[#E5DDD0]">
                    <tr>
                      <th className="p-3.5">Gateway</th>
                      <th className="p-3.5">UPI & RuPay</th>
                      <th className="p-3.5">Domestic Cards & NetBanking</th>
                      <th className="p-3.5">Settlement Cycle</th>
                      <th className="p-3.5">Key Advantage for Duppati</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DDD0]">
                    <tr className="bg-[#541827]/5">
                      <td className="p-3.5 font-bold text-[#541827] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Razorpay (Recommended)
                      </td>
                      <td className="p-3.5 text-stone-700">0% standard / MDR subsidized</td>
                      <td className="p-3.5 font-mono font-bold text-[#541827]">2.0% + 18% GST</td>
                      <td className="p-3.5 text-stone-700">T+2 days (T+0 instant add-on available)</td>
                      <td className="p-3.5 text-stone-600">
                        Highest consumer brand trust in India; Magic Checkout autofills addresses for 80M+ shoppers.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-stone-800">Cashfree Payments</td>
                      <td className="p-3.5 text-stone-700">0% on standard UPI</td>
                      <td className="p-3.5 font-mono font-bold text-stone-800">1.95% + 18% GST</td>
                      <td className="p-3.5 text-stone-700">T+1 day by default</td>
                      <td className="p-3.5 text-stone-600">
                        Fast default settlements; promotional 0% commission on first ₹20L GMV for new startups.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-stone-800">PhonePe PG</td>
                      <td className="p-3.5 text-stone-700">0% on PhonePe UPI</td>
                      <td className="p-3.5 font-mono font-bold text-stone-800">1.90% – 1.99%</td>
                      <td className="p-3.5 text-stone-700">T+1 to T+2 days</td>
                      <td className="p-3.5 text-stone-600">
                        Excellent intent flow for mobile users who have the PhonePe app installed.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-stone-800">Paytm Payment Gateway</td>
                      <td className="p-3.5 text-stone-700">0% standard UPI</td>
                      <td className="p-3.5 font-mono font-bold text-stone-800">1.99% + 18% GST</td>
                      <td className="p-3.5 text-stone-700">T+1 to T+2 days</td>
                      <td className="p-3.5 text-stone-600">
                        Deep Paytm wallet integration; standard enterprise reliability.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-stone-800">Stripe India</td>
                      <td className="p-3.5 text-stone-700">UPI available</td>
                      <td className="p-3.5 font-mono font-bold text-stone-800">2.0% (Domestic) / 4.3% (Intl)</td>
                      <td className="p-3.5 text-stone-700">Rolling 7-day default</td>
                      <td className="p-3.5 text-stone-600">
                        Superior if selling internationally in USD/GBP/EUR; higher fees on domestic.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Recommendation Callout */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-[#E5DDD0]">
                  <h4 className="font-semibold text-xs text-[#541827] uppercase tracking-wider">
                    Why We Integrated Razorpay First:
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 mt-2">
                    <li>• <strong>No Setup or Annual Maintenance Fees:</strong> Zero capital expenditure to get started.</li>
                    <li>• <strong>Universal Payment Modes:</strong> UPI (GPay, PhonePe, Paytm), Visa, Mastercard, Rupay, NetBanking across 58 banks, Cred Pay, and PayLater.</li>
                    <li>• <strong>Automated Refunds:</strong> Instant refund API integrated into our database when customers cancel.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-[#E5DDD0]">
                  <h4 className="font-semibold text-xs text-stone-800 uppercase tracking-wider">
                    How The 2% Calculation Works:
                  </h4>
                  <div className="text-xs text-stone-600 space-y-1 mt-2">
                    <p>On a <strong>₹3,499</strong> Jaipur Mulmul Dohar transaction:</p>
                    <p className="font-mono text-[#541827] font-semibold">
                      ₹3,499 × 2% = ₹69.98 fee + 18% GST (₹12.60) = Total ₹82.58
                    </p>
                    <p className="text-stone-500 text-[11px]">
                      Net settled to your bank: <strong>₹3,416.42</strong> on T+2 basis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 3: SHIPPING & LOGISTICS                                */}
        {/* ========================================================== */}
        {activeTab === "shipping" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                Supply Chain & Delivery
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F] mt-0.5">
                Shiprocket Freight & Expense Models
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-1 max-w-2xl">
                Understanding dead weight vs volumetric weight for home bedding, courier zones, and Cash on Delivery fees.
              </p>

              {/* Bedding Specific Volumetric Weight Warning */}
              <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <Scale className="w-4 h-4 text-emerald-700" />
                  Critical Bedding Rule: Volumetric Weight Formula (L × W × H / 5000)
                </div>
                <p className="mt-1 leading-relaxed text-emerald-800/90">
                  Quilts and dohars are light in weight (~800g) but bulky in volume. If packed loosely in a large box, couriers bill by volumetric weight (~2.5kg = ₹140 freight). 
                  <strong> Solution:</strong> Using poly-mailer vacuum compression bags keeps the volumetric weight under 1.0kg, saving over <strong>₹60 per shipment</strong>!
                </p>
              </div>

              {/* Zone Freight Rates */}
              <div className="mt-6">
                <h3 className="font-semibold text-xs text-[#29251F] uppercase tracking-wider mb-3">
                  Shiprocket Standard Freight Slabs (Per 500g):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2]">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold">Zone A (Intra-City)</span>
                    <div className="text-lg font-serif text-[#29251F] font-bold mt-1">₹28 – ₹35</div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Local Jaipur deliveries (1-2 days)</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2]">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold">Zone B (Regional)</span>
                    <div className="text-lg font-serif text-[#29251F] font-bold mt-1">₹38 – ₹45</div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Within Rajasthan & NCR (2-3 days)</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2]">
                    <span className="text-[10px] text-emerald-700 font-semibold">Zone C (Metro to Metro)</span>
                    <div className="text-lg font-serif text-emerald-800 font-bold mt-1">₹52 – ₹65</div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Delhi, Mumbai, BLR, HYD, MAA</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2]">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold">Zone D (Rest of India)</span>
                    <div className="text-lg font-serif text-[#29251F] font-bold mt-1">₹68 – ₹85</div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Tier 2/3 cities, East & South regions</p>
                  </div>
                </div>
              </div>

              {/* Customer vs Merchant Strategy Comparison */}
              <div className="mt-8 pt-6 border-t border-[#E5DDD0]">
                <h3 className="font-semibold text-xs text-[#29251F] uppercase tracking-wider mb-4">
                  Which Delivery Model Should The Client Adopt?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl border-2 border-[#541827] bg-[#541827]/5">
                    <span className="text-[10px] font-bold text-[#541827] uppercase">Strategy 1 (Recommended)</span>
                    <h4 className="font-bold text-sm text-[#29251F] mt-1">Free Shipping Above ₹1,999</h4>
                    <p className="text-stone-600 mt-1.5 leading-relaxed">
                      This is the exact model currently configured in the website. Because luxury bedding pieces sell between ₹1,800 to ₹4,800, shoppers readily add a cushion or pillow sham to unlock free shipping.
                    </p>
                    <div className="mt-3 text-[11px] font-semibold text-emerald-700">
                      ✓ Increases Average Basket Size by ~28%
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white">
                    <span className="text-[10px] font-bold text-stone-500 uppercase">Strategy 2</span>
                    <h4 className="font-bold text-sm text-stone-800 mt-1">100% Customer Paid (Flat ₹99)</h4>
                    <p className="text-stone-600 mt-1.5 leading-relaxed">
                      Every customer pays ₹99 regardless of order size. Ensures the business never burns money on shipping, but risks up to 25% checkout drop-off when the fee is revealed.
                    </p>
                    <div className="mt-3 text-[11px] font-semibold text-amber-700">
                      ⚠ Higher cart abandonment rate
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white">
                    <span className="text-[10px] font-bold text-stone-500 uppercase">Strategy 3</span>
                    <h4 className="font-bold text-sm text-stone-800 mt-1">Subsidized Split (Flat ₹49)</h4>
                    <p className="text-stone-600 mt-1.5 leading-relaxed">
                      Customer pays a token ₹49, and your brand absorbs the remaining ₹25-35. Mentally feels like a nominal handling charge rather than an expensive shipping fee.
                    </p>
                    <div className="mt-3 text-[11px] font-semibold text-sky-700">
                      ⚖ Balanced compromise
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 4: WHATSAPP & SMS OTP                                  */}
        {/* ========================================================== */}
        {activeTab === "messaging" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700">
                Customer Notifications
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F] mt-0.5">
                WhatsApp Business API & SMS OTP Costs
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-1 max-w-2xl">
                Official Meta 2025/2026 pricing for mobile login OTPs, order confirmation alerts, and delivery tracking.
              </p>

              {/* Meta Official Message Rates Table */}
              <div className="mt-6 border border-[#E5DDD0] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF7F2] text-stone-700 font-semibold border-b border-[#E5DDD0]">
                    <tr>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Meta Official Rate</th>
                      <th className="p-3.5">Use Case in Duppati Home</th>
                      <th className="p-3.5">Customer Open Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DDD0]">
                    <tr className="bg-sky-50/40">
                      <td className="p-3.5 font-bold text-sky-900">WhatsApp Authentication (OTP)</td>
                      <td className="p-3.5 font-mono font-bold text-sky-950">₹0.115 / message</td>
                      <td className="p-3.5 text-stone-600">Passwordless 1-tap mobile login & COD verification</td>
                      <td className="p-3.5 font-semibold text-emerald-700">98% within 15 secs</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-stone-800">WhatsApp Utility (Post-Purchase)</td>
                      <td className="p-3.5 font-mono font-bold text-stone-900">₹0.115 / message</td>
                      <td className="p-3.5 text-stone-600">Order Confirmed, Air Dispatch AWB, Out for Delivery</td>
                      <td className="p-3.5 font-semibold text-emerald-700">95% open rate</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-stone-800">WhatsApp Marketing</td>
                      <td className="p-3.5 font-mono font-bold text-amber-900">₹0.8631 / message</td>
                      <td className="p-3.5 text-stone-600">Abandoned cart recovery message with 10% coupon</td>
                      <td className="p-3.5 text-stone-600">75% (Drives +18% recovered sales)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-stone-800">Traditional SMS OTP (DLT Registered)</td>
                      <td className="p-3.5 font-mono text-stone-700">₹0.15 – ₹0.22 / SMS</td>
                      <td className="p-3.5 text-stone-600">Backup channel if WhatsApp is offline</td>
                      <td className="p-3.5 text-stone-500">60% delivery reliability</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Recommended Solution Provider */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2]">
                  <h4 className="font-semibold text-xs text-[#541827] uppercase tracking-wider">
                    Recommended WhatsApp Gateway: MSG91
                  </h4>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    MSG91 operates on a <strong>zero-markup policy</strong>, passing Meta&apos;s exact ₹0.115 price directly without hidden per-message surcharges. Best suited for clean developer API integration.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2]">
                  <h4 className="font-semibold text-xs text-stone-800 uppercase tracking-wider">
                    Alternative: AiSensy / Wati (Marketing Dashboard)
                  </h4>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Charges ~₹1,500/month platform fee but includes drag-and-drop broadcast campaigns, automated abandoned cart recovery, and a multi-agent WhatsApp live chat inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 5: PRODUCTION LAUNCH CHECKLIST                         */}
        {/* ========================================================== */}
        {activeTab === "production" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C28A42]">
                Go-Live Blueprint
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F] mt-0.5">
                Production-Level E-Commerce Launch Checklist
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-1 max-w-2xl">
                Everything required to transition this fully coded front-end into an active transactional store.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "1. Custom Domain & DNS Configuration",
                    cost: "~₹999 / year (GoDaddy / Namecheap)",
                    status: "Ready to link",
                    desc: "Point duppatihome.com CNAME records to our live Vercel production deployment.",
                  },
                  {
                    title: "2. Razorpay Live Production Keys & KYC",
                    cost: "₹0 setup • 2% per transaction",
                    status: "Account KYC needed",
                    desc: "Complete business KYC with GSTIN and business bank account to obtain live API keys (RAZORPAY_KEY_ID).",
                  },
                  {
                    title: "3. Shiprocket Logistics Integration",
                    cost: "₹0 setup • Pay per shipment",
                    status: "Warehouse pickup address needed",
                    desc: "Configure Jaipur dispatch warehouse address, set volumetric package dimensions, and connect the live Shiprocket API token.",
                  },
                  {
                    title: "4. Meta WhatsApp Business Verification",
                    cost: "Meta business manager approval",
                    status: "Phone number required",
                    desc: "Verify Meta Business Manager with official GSTIN and assign a dedicated support SIM for automated OTPs and dispatch alerts.",
                  },
                  {
                    title: "5. Cloud Database & Customer Authentication",
                    cost: "Free tier up to 50,000 monthly users (Supabase)",
                    status: "Architecture ready",
                    desc: "PostgreSQL database to store customer addresses, order histories, and coupon redemption stats.",
                  },
                  {
                    title: "6. GST Invoicing & Compliance",
                    cost: "Automated via Zoho Books / ClearTax (~₹600/mo)",
                    status: "Recommended",
                    desc: "Automatic PDF invoice generation with HSN codes (5208 for cotton bed linens) and CGST/SGST/IGST breakdown.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="font-semibold text-xs sm:text-sm text-[#29251F]">{item.title}</h4>
                      </div>
                      <p className="text-xs text-stone-600 font-light mt-1 ml-6">{item.desc}</p>
                    </div>

                    <div className="sm:text-right shrink-0 ml-6 sm:ml-0">
                      <div className="text-xs font-bold text-[#541827] font-mono">{item.cost}</div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-0.5">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
