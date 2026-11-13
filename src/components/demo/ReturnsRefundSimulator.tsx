"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  RotateCcw,
  Undo2,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  Building2,
  Wallet,
  Banknote,
  Gift,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Package,
  Check,
  Clock,
  Send,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

export default function ReturnsRefundSimulator() {
  // Scenario configuration
  const [paymentMode, setPaymentMode] = useState<"prepaid" | "cod">("prepaid");
  const [cancellationStage, setCancellationStage] = useState<
    "pre_dispatch" | "in_transit" | "post_delivery"
  >("pre_dispatch");
  const [refundMethod, setRefundMethod] = useState<"instant_upi" | "standard_source" | "store_credit">("instant_upi");
  const [codRefundDestination, setCodRefundDestination] = useState<"upi_id" | "bank_account" | "store_credit">("upi_id");

  // Interactive Simulation State
  const [isProcessingRefund, setIsProcessingRefund] = useState(false);
  const [isRefundCompleted, setIsRefundCompleted] = useState(false);
  const [isQcPassed, setIsQcPassed] = useState(false);
  const [isReversePickupBooked, setIsReversePickupBooked] = useState(false);
  const [showWhatsappNotification, setShowWhatsappNotification] = useState(false);

  // Trigger interactive refund process
  const handleExecuteRefund = () => {
    setIsProcessingRefund(true);
    setTimeout(() => {
      setIsProcessingRefund(false);
      setIsRefundCompleted(true);
      setShowWhatsappNotification(true);
    }, 1800);
  };

  // Reset simulation state
  const handleReset = () => {
    setIsProcessingRefund(false);
    setIsRefundCompleted(false);
    setIsQcPassed(false);
    setIsReversePickupBooked(false);
    setShowWhatsappNotification(false);
  };

  // Switch payment mode or stage resets the active simulation
  const handleConfigChange = (
    newPaymentMode: "prepaid" | "cod",
    newStage: "pre_dispatch" | "in_transit" | "post_delivery"
  ) => {
    setPaymentMode(newPaymentMode);
    setCancellationStage(newStage);
    handleReset();
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E5DDD0] shadow-sm overflow-hidden">
      {/* ========================================================== */}
      {/* 1. TOP HEADER & EXECUTIVE BRIEFING                         */}
      {/* ========================================================== */}
      <div className="bg-[#1E050D] text-white p-6 sm:p-8 border-b border-[#3D0C1A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6C687]/15 border border-[#E6C687]/30 text-[#E6C687] text-xs font-semibold uppercase tracking-wider mb-2">
              <RotateCcw className="w-3.5 h-3.5 text-[#E6C687]" />
              Returns, Refunds & RTO Operations Simulator
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF6F0] font-normal">
              Order Cancellation, Razorpay Refunds & COD Reverse Logistics
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light mt-1 max-w-2xl">
              Understand exactly how refunds are debited, how Razorpay returns customer money, how COD orders are refunded when cash was collected, and how reverse pickups operate without draining merchant profits.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#E6C687] text-xs font-medium transition cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Scenario</span>
          </button>
        </div>

        {/* Quick Decision Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Prepaid Refund Source</span>
            <span className="text-sm font-serif text-[#E6C687] font-semibold">Merchant Razorpay Balance</span>
            <span className="text-[10px] text-stone-300 block mt-0.5">Debited from daily merchant payouts</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Razorpay Gateway Fee</span>
            <span className="text-sm font-serif text-amber-300 font-semibold">2% Fee Retained by PG</span>
            <span className="text-[10px] text-stone-300 block mt-0.5">Standard banking aggregator policy</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">COD Refund Mechanism</span>
            <span className="text-sm font-serif text-emerald-400 font-semibold">Direct UPI / Bank Payout</span>
            <span className="text-[10px] text-stone-300 block mt-0.5">Instant transfer via Razorpay Payouts</span>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 2. SCENARIO CONFIGURATOR                                   */}
      {/* ========================================================== */}
      <div className="p-6 sm:p-8 bg-[#FAF7F2]/60 border-b border-[#E5DDD0]">
        <h3 className="font-serif text-lg font-bold text-[#29251F] mb-1">
          Choose a Real-World Scenario to Simulate
        </h3>
        <p className="text-xs text-stone-600 mb-4">
          Select the payment mode and the exact moment when the customer cancels or returns the order:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Payment Method Selector */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5DDD0] shadow-2xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              1. Customer Payment Method:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleConfigChange("prepaid", cancellationStage)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  paymentMode === "prepaid"
                    ? "bg-[#541827] text-white border-[#541827] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Prepaid (Razorpay UPI)</span>
                  {paymentMode === "prepaid" && <CheckCircle2 className="w-3.5 h-3.5 text-[#E6C687]" />}
                </div>
                <div className="text-[10px] opacity-80 mt-0.5">Money already debited from customer</div>
              </button>

              <button
                onClick={() => handleConfigChange("cod", cancellationStage)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  paymentMode === "cod"
                    ? "bg-[#541827] text-white border-[#541827] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Cash on Delivery (COD)</span>
                  {paymentMode === "cod" && <CheckCircle2 className="w-3.5 h-3.5 text-[#E6C687]" />}
                </div>
                <div className="text-[10px] opacity-80 mt-0.5">Physical cash transaction</div>
              </button>
            </div>
          </div>

          {/* Cancellation Timing Selector */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5DDD0] shadow-2xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              2. When is the Request Raised?
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleConfigChange(paymentMode, "pre_dispatch")}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  cancellationStage === "pre_dispatch"
                    ? "bg-[#541827] text-white border-[#541827] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <div className="text-xs font-bold truncate">Pre-Dispatch</div>
                <div className="text-[9px] opacity-80 mt-0.5">Before pickup (0 freight loss)</div>
              </button>

              <button
                onClick={() => handleConfigChange(paymentMode, "in_transit")}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  cancellationStage === "in_transit"
                    ? "bg-[#541827] text-white border-[#541827] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <div className="text-xs font-bold truncate">Doorstep RTO</div>
                <div className="text-[9px] opacity-80 mt-0.5">Rejected at delivery van</div>
              </button>

              <button
                onClick={() => handleConfigChange(paymentMode, "post_delivery")}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  cancellationStage === "post_delivery"
                    ? "bg-[#541827] text-white border-[#541827] shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                <div className="text-xs font-bold truncate">7-Day Return</div>
                <div className="text-[9px] opacity-80 mt-0.5">Customer received & returns</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 3. INTERACTIVE SIMULATION RUNNER                           */}
      {/* ========================================================== */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Dynamic Scenario Title Banner */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-[#E5DDD0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#541827]/10 text-[#541827] flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium">Simulating Case:</div>
              <h4 className="text-sm font-bold text-[#29251F]">
                {paymentMode === "prepaid" ? "Prepaid Razorpay Order" : "Cash on Delivery Order"} •{" "}
                {cancellationStage === "pre_dispatch" && "Pre-Dispatch Instant Cancellation"}
                {cancellationStage === "in_transit" && "Doorstep Refusal (In-Transit RTO)"}
                {cancellationStage === "post_delivery" && "Post-Delivery 7-Day Return with Reverse Pickup"}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-stone-600">Order: #DUP-2026-8941</span>
            <span className="font-bold text-[#541827] bg-[#541827]/10 px-2 py-0.5 rounded">₹2,478.00</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CASE A: PREPAID (RAZORPAY) REFUND SIMULATION                      */}
        {/* ------------------------------------------------------------------ */}
        {paymentMode === "prepaid" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Step-by-Step Operations Flow */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E5DDD0] shadow-2xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#541827]" />
                  Razorpay Refund Execution Steps
                </h4>

                {/* Step 1: Where does the money get debited? */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#541827] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C28A42]" />
                      Debit Source (Where Money Comes From):
                    </span>
                    <span className="font-mono font-bold text-stone-800">Merchant Razorpay Balance</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Razorpay automatically debits <strong>₹2,478.00</strong> from your ongoing daily settled collections before transferring daily payouts to your HDFC bank account. If your current Razorpay balance is insufficient, you can top it up with one click via NetBanking or UPI.
                  </p>
                </div>

                {/* Step 2: Choose Refund Mode */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-stone-700 block">
                    Select Refund Speed for Customer:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setRefundMethod("instant_upi")}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                        refundMethod === "instant_upi"
                          ? "bg-[#541827]/5 border-[#541827] ring-1 ring-[#541827]"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[#29251F]">
                        <span>⚡ Razorpay Instant Refund</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Takes 5–10 seconds
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Credits customer&apos;s original UPI / Bank account immediately via IMPS. Creates world-class brand loyalty.
                      </p>
                    </div>

                    <div
                      onClick={() => setRefundMethod("standard_source")}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                        refundMethod === "standard_source"
                          ? "bg-[#541827]/5 border-[#541827] ring-1 ring-[#541827]"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[#29251F]">
                        <span>Standard Bank Refund</span>
                        <span className="text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                          5–7 Working Days
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Zero extra convenience charge. Follows traditional bank clearing cycles back to card/netbanking.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3: Logistics Action (Pre-dispatch vs In-transit vs Return) */}
                {cancellationStage === "pre_dispatch" && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Zero Shipping Loss (Pre-Dispatch):</strong>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        Because the order was cancelled before courier pickup, the Shiprocket AWB pickup is cancelled automatically via API. Zero courier freight is charged!
                      </p>
                    </div>
                  </div>
                )}

                {cancellationStage === "in_transit" && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>In-Transit Doorstep RTO Freight Impact:</strong>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Customer rejected the parcel at the door. Courier brings it back to Jaipur hub. Forward freight (₹88) + Return RTO freight (₹88) = <strong>₹176 freight loss</strong> incurred on the merchant. Refund is released to customer once parcel returns.
                      </p>
                    </div>
                  </div>
                )}

                {cancellationStage === "post_delivery" && (
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
                      <div className="font-bold flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-blue-600" />
                        Doorstep Reverse QC Pickup Process:
                      </div>
                      <p className="text-[11px] text-blue-800 leading-relaxed">
                        1. Shiprocket books reverse pickup with BlueDart/Delhivery.<br />
                        2. Courier agent checks item physically (unwashed, original tag, luxury bag).<br />
                        3. Parcel reaches Jaipur warehouse $\rightarrow$ Staff performs barcode QC scan.
                      </p>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-semibold">Warehouse QC Inspection Status:</span>
                        {!isQcPassed ? (
                          <button
                            onClick={() => setIsQcPassed(true)}
                            className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer"
                          >
                            Mark QC Passed (Item Pristine)
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300">
                            ✓ QC Passed & Restocked in Bin A4
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Execution Button */}
                {!isRefundCompleted ? (
                  <button
                    onClick={handleExecuteRefund}
                    disabled={isProcessingRefund || (cancellationStage === "post_delivery" && !isQcPassed)}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                      cancellationStage === "post_delivery" && !isQcPassed
                        ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                        : "bg-[#541827] text-white hover:bg-[#3D0C1A]"
                    }`}
                  >
                    {isProcessingRefund ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#E6C687]" />
                        <span>Communicating with Razorpay Refund API...</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4 text-[#E6C687]" />
                        <span>
                          {refundMethod === "instant_upi"
                            ? "Initiate Razorpay Instant Refund (₹2,478.00)"
                            : "Initiate Standard Bank Refund (₹2,478.00)"}
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs space-y-2">
                    <div className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                      <span>Refund Successfully Processed via Razorpay!</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div>Refund ID: <strong className="font-mono">rfnd_Ox928172La9</strong></div>
                      <div>Amount: <strong className="font-mono">₹2,478.00</strong></div>
                      <div>Destination: <strong>Customer GPay UPI</strong></div>
                      <div>Status: <strong className="text-emerald-800">Processed (100% Settled)</strong></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Financial Waterfall & Merchant P&L */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E5DDD0] shadow-2xs space-y-3 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-stone-700 text-xs flex items-center justify-between">
                  <span>Merchant Cost Impact</span>
                  <span className="font-mono text-[10px] text-stone-500">Audit Ledger</span>
                </h4>

                <div className="divide-y divide-stone-100 space-y-2 pt-1 font-sans">
                  <div className="flex justify-between py-1 text-stone-700">
                    <span>Order Value Refunded to Customer:</span>
                    <strong className="text-stone-900">-₹2,478.00</strong>
                  </div>

                  <div className="flex justify-between py-1 text-stone-700">
                    <div>
                      <span>Razorpay 2% Gateway MDR:</span>
                      <span className="block text-[10px] text-stone-400">Not refunded by PG</span>
                    </div>
                    <strong className="text-amber-700">-₹49.56</strong>
                  </div>

                  <div className="flex justify-between py-1 text-stone-700">
                    <div>
                      <span>Shipping Freight Expense:</span>
                      <span className="block text-[10px] text-stone-400">
                        {cancellationStage === "pre_dispatch" ? "0 (Stopped before dispatch)" : "Forward + Return freight"}
                      </span>
                    </div>
                    <strong className={cancellationStage === "pre_dispatch" ? "text-emerald-700" : "text-red-700"}>
                      {cancellationStage === "pre_dispatch" ? "₹0.00" : "-₹176.00"}
                    </strong>
                  </div>

                  <div className="flex justify-between py-1 text-stone-700">
                    <span>Product Physical Inventory:</span>
                    <strong className="text-emerald-700">+₹980.00 (Restocked)</strong>
                  </div>

                  <div className="pt-3 border-t-2 border-[#541827] flex justify-between items-center font-bold">
                    <span>Net Cash Impact on Merchant:</span>
                    <span className={`text-sm font-mono ${cancellationStage === "pre_dispatch" ? "text-amber-700" : "text-red-700"}`}>
                      {cancellationStage === "pre_dispatch" ? "-₹49.56 (Only PG fee)" : "-₹225.56 (PG fee + freight)"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-stone-50 text-[11px] text-stone-600 leading-relaxed border border-stone-200">
                  💡 <strong>Key Takeaway for Client:</strong> When an order is cancelled before shipping, the merchant&apos;s only loss is the ~₹50 payment gateway transaction fee. When cancelled post-shipping, reverse courier charges add up. That&apos;s why our proactive delivery confirmation model is essential.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* CASE B: CASH ON DELIVERY (COD) REFUND & RTO SIMULATION             */}
        {/* ------------------------------------------------------------------ */}
        {paymentMode === "cod" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Step-by-Step Operations Flow */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E5DDD0] shadow-2xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-[#541827]" />
                  Cash on Delivery (COD) Return & Refund Flow
                </h4>

                {/* Sub-scenario 1: Cancelled Before Delivery */}
                {(cancellationStage === "pre_dispatch" || cancellationStage === "in_transit") && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-950">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Important: NO Money Refund Needed from Merchant!
                    </div>
                    <p className="text-amber-800 leading-relaxed">
                      In COD orders, the customer pays <strong>physical cash only upon delivery</strong>. If the order is cancelled prior to delivery or rejected at the doorstep:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-amber-900">
                      <li><strong>Zero money was collected</strong> $\rightarrow$ Therefore, no bank refund or debit is required.</li>
                      <li>
                        {cancellationStage === "pre_dispatch"
                          ? "Pre-dispatch cancellation: Shiprocket AWB stopped with ₹0 freight charge."
                          : "Doorstep rejection: Courier returns package as RTO. Merchant pays return shipping fee (~₹88 to ₹120) to Shiprocket."}
                      </li>
                    </ul>
                  </div>
                )}

                {/* Sub-scenario 2: Customer Paid Cash at Door & Requests 7-Day Return */}
                {cancellationStage === "post_delivery" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-2 text-xs">
                      <div className="font-bold text-[#541827]">
                        How Do We Refund a Customer Who Paid Physical Cash?
                      </div>
                      <p className="text-stone-600 leading-relaxed">
                        The delivery agent collected ₹2,478 cash and deposited it with Shiprocket (remitted to your bank account). When the customer requests a return, the merchant offers two automated payout methods:
                      </p>

                      {/* COD Refund Method Toggle */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div
                          onClick={() => setCodRefundDestination("upi_id")}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                            codRefundDestination === "upi_id"
                              ? "bg-[#541827]/5 border-[#541827] ring-1 ring-[#541827]"
                              : "border-stone-200 hover:bg-stone-50"
                          }`}
                        >
                          <div className="font-bold text-[#29251F] flex items-center justify-between">
                            <span>Direct UPI / Bank Transfer</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                              Instant Payout
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Customer enters their UPI ID (<code className="text-stone-700">aditi@oksbi</code>). System runs automated Penny Drop name verification and sends ₹2,478 in 10 seconds via Razorpay Payouts.
                          </p>
                        </div>

                        <div
                          onClick={() => setCodRefundDestination("store_credit")}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                            codRefundDestination === "store_credit"
                              ? "bg-[#541827]/5 border-[#541827] ring-1 ring-[#541827]"
                              : "border-stone-200 hover:bg-stone-50"
                          }`}
                        >
                          <div className="font-bold text-[#29251F] flex items-center justify-between">
                            <span>🎁 Duppati Store Credit (+10% Bonus)</span>
                            <span className="text-[10px] bg-[#E6C687]/40 text-[#541827] px-2 py-0.5 rounded-full font-bold">
                              Recommended
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Offer customer <strong>₹2,725</strong> store credit (+10% incentive). 100% of revenue stays in the business, zero bank payout fees!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Warehouse QC Check */}
                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                      <div>
                        <strong>Warehouse Reverse QC Status:</strong>
                        <div className="text-[11px] text-blue-700">Package returned from Hyderabad to Jaipur warehouse</div>
                      </div>
                      {!isQcPassed ? (
                        <button
                          onClick={() => setIsQcPassed(true)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer"
                        >
                          Verify & Pass QC
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                          ✓ QC Passed
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* COD Execution Action */}
                {!isRefundCompleted ? (
                  <button
                    onClick={handleExecuteRefund}
                    disabled={isProcessingRefund || (cancellationStage === "post_delivery" && !isQcPassed)}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                      cancellationStage === "post_delivery" && !isQcPassed
                        ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                        : "bg-[#541827] text-white hover:bg-[#3D0C1A]"
                    }`}
                  >
                    {isProcessingRefund ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#E6C687]" />
                        <span>Processing COD Resolution...</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4 text-[#E6C687]" />
                        <span>
                          {cancellationStage === "post_delivery"
                            ? codRefundDestination === "upi_id"
                              ? "Send Instant Bank Refund via UPI Payout (₹2,478.00)"
                              : "Issue ₹2,725 Store Credit Voucher to Customer"
                            : "Confirm Cancellation & Restock Inventory"}
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs space-y-2">
                    <div className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                      <span>COD Resolution Successfully Executed!</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div>Status: <strong className="text-emerald-800">Closed & Completed</strong></div>
                      <div>
                        Resolution:{" "}
                        <strong>
                          {cancellationStage === "post_delivery"
                            ? codRefundDestination === "upi_id"
                              ? "IMPS UPI Payout Sent"
                              : "Store Credit Issued"
                            : "Zero Cash Flow Impact"}
                        </strong>
                      </div>
                      <div>Inventory: <strong className="text-emerald-800">+1 Restocked in Jaipur Hub</strong></div>
                      <div>Customer WhatsApp: <strong className="text-emerald-800">Sent Alert</strong></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: COD Risk Management Guide */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E5DDD0] shadow-2xs space-y-3 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-stone-700 text-xs flex items-center justify-between">
                  <span>COD RTO Protection Rules</span>
                  <span className="font-mono text-[10px] text-stone-500">Industry SOP</span>
                </h4>

                <div className="space-y-3 pt-1 text-stone-600 text-xs">
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      Rule 1: WhatsApp OTP Address Verification
                    </div>
                    <p className="text-[11px] text-amber-800">
                      Before dispatching COD, the system automatically sends a WhatsApp button: <em>&ldquo;Confirm your COD order of ₹2,478&rdquo;</em>. If unconfirmed within 24h, the order is placed on hold, preventing bogus orders.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-emerald-600" />
                      Rule 2: Prepaid Conversion Discount
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Offer ₹100 extra off or free luxury packaging if customer switches from COD to Razorpay UPI at checkout. Over 30% of Indian shoppers convert to prepaid, cutting RTO risk to zero!
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Wallet className="w-3.5 h-3.5 text-blue-600" />
                      Rule 3: Store Credit Over Cash Payout
                    </div>
                    <p className="text-[11px] text-blue-800">
                      Giving a 10% bonus store credit encourages 65% of returning COD customers to buy another item instead of taking cash out of the business bank account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* WHATSAPP NOTIFICATION MOCK (WHEN REFUND/CANCEL COMPLETED)           */}
        {/* ------------------------------------------------------------------ */}
        {showWhatsappNotification && (
          <div className="p-4 rounded-2xl bg-[#0B141A] text-white border border-emerald-500/40 shadow-xl space-y-3 animate-fade-in font-sans text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-emerald-400">
                  Live Customer WhatsApp Notification Triggered (Meta Cloud API)
                </span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono">Cost: ₹0.115</span>
            </div>

            <div className="bg-[#202C33] p-3.5 rounded-xl border-l-4 border-l-emerald-500 space-y-2">
              <div className="text-emerald-300 font-semibold text-xs">
                To: +91 98765 43210 (Aditi Sharma) • Duppati Luxury Living (Verified Green Checkmark)
              </div>
              <p className="text-stone-200 text-xs leading-relaxed">
                {paymentMode === "prepaid" ? (
                  <>
                    &ldquo;Namaste Aditi, your refund of <strong>₹2,478.00</strong> for Order #DUP-2026-8941 has been initiated via Razorpay (Refund ID: <code>rfnd_Ox928172La9</code>). The amount will reflect in your original payment account shortly. Thank you for choosing Duppati.&rdquo;
                  </>
                ) : (
                  <>
                    &ldquo;Namaste Aditi, your COD request for Order #DUP-2026-8941 has been processed.{" "}
                    {codRefundDestination === "store_credit"
                      ? "Your Duppati Store Credit code DUP-CREDIT-2725 (value ₹2,725) is now active in your wallet!"
                      : "The refund payout of ₹2,478.00 has been transferred directly to your UPI ID."}
                    &rdquo;
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 4. EXECUTIVE CLIENT PRESENTATION CHEAT SHEET                       */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-8 pt-6 border-t border-[#E5DDD0]">
          <h4 className="font-serif text-lg font-bold text-[#29251F] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C28A42]" />
            Client Meeting Answers: Quick Reference
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-[#E5DDD0] space-y-1.5 shadow-2xs">
              <div className="font-bold text-[#541827]">
                Q1: Can Razorpay easily refund the money?
              </div>
              <p className="text-stone-600 leading-relaxed">
                <strong>Yes, with 1 click.</strong> Razorpay provides both a dashboard button and an automated API. You can choose <em>Instant Refund</em> (funds reach the customer&apos;s UPI or bank within 5–10 seconds) or <em>Standard Refund</em> (5–7 banking days).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5DDD0] space-y-1.5 shadow-2xs">
              <div className="font-bold text-[#541827]">
                Q2: Where is the refund money debited from?
              </div>
              <p className="text-stone-600 leading-relaxed">
                The money is debited directly from your <strong>Merchant Razorpay Account Balance</strong> (accumulated from daily customer checkouts). You never have to manually transfer money to individual customers; Razorpay handles the routing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5DDD0] space-y-1.5 shadow-2xs">
              <div className="font-bold text-[#541827]">
                Q3: Does Razorpay refund their 2% gateway commission?
              </div>
              <p className="text-stone-600 leading-relaxed">
                <strong>No.</strong> In Indian banking, payment aggregators (Razorpay, Cashfree, PayU) retain their 2% MDR fee for having processed the initial transaction. On a ₹2,478 order, this fee is ~₹49.56.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5DDD0] space-y-1.5 shadow-2xs">
              <div className="font-bold text-[#541827]">
                Q4: What happens if a COD order is cancelled or returned?
              </div>
              <p className="text-stone-600 leading-relaxed">
                If cancelled before delivery, <strong>zero refund is needed</strong> because the customer hasn&apos;t paid. If returned after delivery, the customer inputs their UPI ID on the portal, and the system sends an instant IMPS payout using <em>Razorpay Payouts</em>, or issues a bonus store credit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
