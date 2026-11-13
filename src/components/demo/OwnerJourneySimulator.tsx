"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Store,
  Bell,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  Barcode,
  FileText,
  Printer,
  Download,
  Building2,
  Package,
  Layers,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  ShieldCheck,
  Check,
  Receipt,
  Warehouse,
  Boxes,
  Activity,
  Send,
  MessageSquare,
  ChevronRight,
  Phone,
} from "lucide-react";

export default function OwnerJourneySimulator() {
  // Current active stage (1 to 6)
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Stage 1: New order sound/toast state
  const [showNotificationToast, setShowNotificationToast] = useState(true);

  // Stage 2: Barcode scan and invoice modal state
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Stage 3: Courier Selection & AWB state
  const [selectedCourier, setSelectedCourier] = useState<"bluedart" | "delhivery" | "xpressbees">("bluedart");
  const [isAwbGenerated, setIsAwbGenerated] = useState(false);
  const [showShippingLabel, setShowShippingLabel] = useState(false);

  // Stage 4: WhatsApp Broadcast and Inventory Sync state
  const [isWhatsappTriggered, setIsWhatsappTriggered] = useState(false);
  const [warehouseStock, setWarehouseStock] = useState(4); // 4 -> 3
  const [isArtisanAlerted, setIsArtisanAlerted] = useState(false);

  // Stage 5: Delivery & Customer Availability Monitor state
  const [customerResponseStatus, setCustomerResponseStatus] = useState<"available" | "rescheduled" | "safe_drop">("available");

  // Stage 1: Dismiss toast
  const dismissToast = () => setShowNotificationToast(false);

  // Stage 2: Barcode scan simulation
  const handleScanBarcode = () => {
    setIsBarcodeScanned(true);
  };

  // Stage 3: Generate AWB & Shipping Label
  const handleGenerateAwb = () => {
    setIsAwbGenerated(true);
    setShowShippingLabel(true);
  };

  // Stage 4: Trigger WhatsApp broadcast and deduct stock
  const handleTriggerBroadcast = () => {
    setIsWhatsappTriggered(true);
    setWarehouseStock(3);
    setIsArtisanAlerted(true);
  };

  // Reset entire simulator
  const handleReset = () => {
    setStage(1);
    setShowNotificationToast(true);
    setIsBarcodeScanned(false);
    setShowInvoiceModal(false);
    setSelectedCourier("bluedart");
    setIsAwbGenerated(false);
    setShowShippingLabel(false);
    setIsWhatsappTriggered(false);
    setWarehouseStock(4);
    setIsArtisanAlerted(false);
    setCustomerResponseStatus("available");
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E5DDD0] shadow-sm overflow-hidden">
      {/* ========================================================== */}
      {/* 1. TOP HEADER & STAGE PROGRESS TRACKER                     */}
      {/* ========================================================== */}
      <div className="bg-[#1E050D] text-white p-6 sm:p-8 border-b border-[#3D0C1A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6C687]/15 border border-[#E6C687]/30 text-[#E6C687] text-xs font-semibold uppercase tracking-wider mb-2">
              <Store className="w-3.5 h-3.5" />
              Owner & Merchant Control Center Simulator
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF6F0] font-normal">
              Store Owner & Admin Operations Flow
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light mt-1 max-w-2xl">
              Experience what happens behind the scenes when a customer places an order: from instant Razorpay notification and GST invoice generation to Shiprocket courier booking, automated WhatsApp tracking, and bank settlement.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#E6C687] text-xs font-medium transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Admin Simulation</span>
            </button>
          </div>
        </div>

        {/* Live Admin Hub Status Ribbon */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-white font-medium">Jaipur Central Hub:</strong> Operational
            </span>
            <span className="text-white/20">•</span>
            <span>Razorpay Webhook: Connected</span>
            <span className="text-white/20">•</span>
            <span>Shiprocket API: Ready (Air & Surface)</span>
          </div>

          <div className="text-[11px] text-[#E6C687] font-mono bg-[#3D0C1A] px-2.5 py-1 rounded-md border border-[#E6C687]/20">
            Current Order Under Process: #DUP-2026-8941 (₹2,478)
          </div>
        </div>

        {/* 6-Stage Milestone Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6">
          {[
            { step: 1, title: "1. Order Alert", subtitle: "Command Center" },
            { step: 2, title: "2. GST Invoice", subtitle: "Scan & Pack" },
            { step: 3, title: "3. Logistics Dispatch", subtitle: "Shiprocket AWB" },
            { step: 4, title: "4. Automation", subtitle: "WhatsApp & Stock" },
            { step: 5, title: "5. RTO Guard", subtitle: "Delivery Monitor" },
            { step: 6, title: "6. Bank Payout", subtitle: "Profit Ledger" },
          ].map((item) => {
            const isCompleted = stage > item.step;
            const isCurrent = stage === item.step;
            return (
              <button
                key={item.step}
                onClick={() => setStage(item.step as any)}
                className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#541827] border-[#E6C687] text-white ring-1 ring-[#E6C687]/40"
                    : isCompleted
                    ? "bg-white/10 border-emerald-500/40 text-stone-200"
                    : "bg-white/5 border-white/10 text-stone-400 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-semibold">
                  <span className={isCurrent ? "text-[#E6C687]" : isCompleted ? "text-emerald-400" : "text-stone-400"}>
                    {item.title}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-[11px] font-medium text-white/90 truncate mt-0.5">{item.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================== */}
      {/* 2. INTERACTIVE WORKSPACE AREA                              */}
      {/* ========================================================== */}
      <div className="p-6 sm:p-8 bg-[#FAF7F2]/60 min-h-[580px]">
        {/* ========================================================== */}
        {/* STAGE 1: REAL-TIME ORDER INFLUX & COMMAND CENTER           */}
        {/* ========================================================== */}
        {stage === 1 && (
          <div className="space-y-6 animate-fade-in">
            {/* Real-time Order Notification Banner */}
            {showNotificationToast && (
              <div className="p-4 rounded-2xl bg-[#1E050D] text-white border border-[#E6C687]/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-bounce-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#541827] text-[#E6C687] flex items-center justify-center shrink-0 border border-[#E6C687]/30">
                    <Bell className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#E6C687] uppercase tracking-wider">
                        ⚡ Real-Time Webhook Alert
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Paid via Razorpay UPI
                      </span>
                    </div>
                    <div className="text-sm font-medium text-white mt-0.5">
                      New Order #DUP-2026-8941 received from Aditi Sharma (Hyderabad 500081) — <strong>₹2,478</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setStage(2)}
                    className="px-4 py-2 rounded-xl bg-[#E6C687] text-[#1E050D] font-bold text-xs hover:bg-[#d8b56f] transition cursor-pointer shadow-sm"
                  >
                    Process Order Now →
                  </button>
                  <button
                    onClick={dismissToast}
                    className="p-2 text-stone-400 hover:text-white transition text-xs"
                    title="Dismiss alert"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Admin Live Dashboard Snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  Today&apos;s Gross Sales
                </div>
                <div className="text-2xl font-serif text-[#29251F] font-bold mt-1">₹68,450</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-0.5">↑ 22% vs yesterday (18 orders)</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#541827]" />
                  Prepaid Payment Rate
                </div>
                <div className="text-2xl font-serif text-[#541827] font-bold mt-1">84.2%</div>
                <div className="text-[11px] text-stone-500 font-medium mt-0.5">High trust • Zero COD RTO risk</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Next Bank Payout
                </div>
                <div className="text-2xl font-serif text-blue-700 font-bold mt-1">₹66,944</div>
                <div className="text-[11px] text-stone-500 font-medium mt-0.5">Releasing to HDFC Bank tomorrow</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-amber-600" />
                  Warehouse Stock
                </div>
                <div className="text-2xl font-serif text-amber-700 font-bold mt-1">4 units left</div>
                <div className="text-[11px] text-amber-700 font-medium mt-0.5">Mulmul Dohar • Jaipur Bin A4</div>
              </div>
            </div>

            {/* Pending Orders Queue Table */}
            <div className="bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden shadow-2xs">
              <div className="p-4 sm:px-6 bg-stone-50/80 border-b border-[#E5DDD0] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#29251F]">Fulfillment Queue</h3>
                  <p className="text-xs text-stone-500">Orders awaiting warehouse packing & courier dispatch</p>
                </div>
                <span className="text-xs bg-[#541827] text-[#E6C687] font-semibold px-2.5 py-1 rounded-full">
                  1 Priority Action Required
                </span>
              </div>

              <div className="divide-y divide-[#E5DDD0]">
                {/* Active Focus Order */}
                <div className="p-4 sm:p-6 bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-14 h-14 rounded-xl relative overflow-hidden shrink-0 border border-[#E5DDD0]">
                      <Image
                        src="/assets/bedsheets/dohar_jaipuri.png"
                        alt="Royal Jaipuri Silk Mulmul Dohar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#541827]">#DUP-2026-8941</span>
                        <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-300">
                          Prepaid (Razorpay UPI)
                        </span>
                        <span className="text-[10px] text-stone-500">Placed 2 mins ago</span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#29251F] mt-1">
                        Royal Jaipuri Silk-Mulmul Dohar (King Size • 90x108 in)
                      </h4>
                      <div className="text-xs text-stone-600 mt-0.5 flex flex-wrap items-center gap-3">
                        <span>Customer: <strong>Aditi Sharma</strong> (+91 98765 43210)</span>
                        <span>•</span>
                        <span>Destination: <strong>Hyderabad, Telangana (500081)</strong></span>
                        <span>•</span>
                        <span>Slot: <strong>Morning 9 AM – 1 PM</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#E5DDD0]">
                    <div className="text-right">
                      <div className="text-base font-bold text-[#541827]">₹2,478.00</div>
                      <div className="text-[10px] text-stone-400">Net after coupon JAIPUR15</div>
                    </div>
                    <button
                      onClick={() => setStage(2)}
                      className="px-4 py-2.5 rounded-xl bg-[#541827] text-white hover:bg-[#3D0C1A] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                    >
                      <span>Pack & Invoice</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E6C687]" />
                    </button>
                  </div>
                </div>

                {/* Other simulated queued orders */}
                <div className="p-4 sm:p-5 opacity-60 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-medium text-stone-600">#DUP-2026-8940</span>
                    <span className="text-stone-800 font-medium">Bagh Printed Sateen Bed Sheet • Rohan V. (Mumbai 400050)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-stone-700">₹3,450</span>
                    <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">Packed</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 opacity-60 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-medium text-stone-600">#DUP-2026-8939</span>
                    <span className="text-stone-800 font-medium">Indigo Dabu Quilt • Sunita M. (Bengaluru 560034)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-stone-700">₹4,199</span>
                    <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">In Transit (BlueDart)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Walkthrough Guidance */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Client Presentation Talking Point:</strong> In the Duppati admin, incoming webhooks from Razorpay instantly flag orders as <em>Prepaid</em>. This eliminates the manual payment verification call that slows down traditional merchants and gives the warehouse an immediate green light for dispatch.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STAGE 2: 1-CLICK BARCODE SCANNING & GST TAX INVOICE        */}
        {/* ========================================================== */}
        {stage === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E5DDD0] gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#C28A42] uppercase tracking-wider">
                  Warehouse Packing Station • Jaipur Studio
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#29251F]">
                  Order Verification & GST Tax Invoice
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStage(1)}
                  className="px-3 py-1.5 rounded-lg border border-[#E5DDD0] text-xs text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  ← Back to Orders
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Physical Item Verification */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                      <Barcode className="w-4 h-4 text-[#541827]" />
                      Warehouse SKU & Bin Verification
                    </h4>
                    <span className="text-[11px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                      Bin: JAI-BAY-A4
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl relative overflow-hidden shrink-0 border border-[#E5DDD0]">
                        <Image
                          src="/assets/bedsheets/dohar_jaipuri.png"
                          alt="Dohar"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#541827]">SKU: DUP-JAI-SLK-01</div>
                        <div className="text-sm font-bold text-[#29251F]">Royal Jaipuri Silk-Mulmul Dohar</div>
                        <div className="text-xs text-stone-500">Size: King (90x108 in) • Weight: 1.2 kg</div>
                      </div>
                    </div>

                    <div>
                      {!isBarcodeScanned ? (
                        <button
                          onClick={handleScanBarcode}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#541827] text-white hover:bg-[#3D0C1A] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                        >
                          <Barcode className="w-4 h-4 text-[#E6C687]" />
                          <span>Simulate SKU Scan</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-3.5 py-2 rounded-xl border border-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>SKU & Bin A4 Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer Delivery Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                      <div className="text-stone-500 font-medium mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-600" />
                        Shipping Destination:
                      </div>
                      <div className="font-semibold text-stone-800">Aditi Sharma</div>
                      <div className="text-stone-600">Flat 402, Royal Palms, Jubilee Hills Rd 36</div>
                      <div className="text-stone-600 font-medium">Hyderabad, Telangana - 500081</div>
                      <div className="text-stone-500 mt-1">Phone: +91 98765 43210</div>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                      <div className="text-stone-500 font-medium mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C28A42]" />
                        Customer Delivery Preference:
                      </div>
                      <div className="font-semibold text-[#541827]">Morning Slot (9:00 AM – 1:00 PM)</div>
                      <div className="text-stone-600 mt-1">Special notes: Ring doorbell and hand over to customer or security desk.</div>
                      <div className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Packaging: Luxury Gold Foil Cotton Duffle
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: GST Tax Invoice Summary & Preview */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#541827]" />
                      B2C GST Tax Invoice
                    </h4>
                    <span className="text-[10px] bg-stone-100 text-stone-600 font-mono px-2 py-0.5 rounded">
                      INV-2026-1108
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] text-xs space-y-2">
                    <div className="flex justify-between text-stone-600">
                      <span>HSN Code (Textiles):</span>
                      <strong className="text-stone-800 font-mono">6304</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Taxable Value:</span>
                      <span className="text-stone-800">₹2,360.00</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>CGST (2.5%):</span>
                      <span className="text-stone-800">₹59.00</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>SGST (2.5%):</span>
                      <span className="text-stone-800">₹59.00</span>
                    </div>
                    <div className="pt-2 border-t border-[#E5DDD0] flex justify-between font-bold text-sm text-[#541827]">
                      <span>Invoice Total (Inc. GST):</span>
                      <span>₹2,478.00</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowInvoiceModal(!showInvoiceModal)}
                      className="w-full py-2 rounded-xl border border-[#541827] text-[#541827] hover:bg-[#541827]/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>{showInvoiceModal ? "Hide Preview" : "Preview Tax Invoice"}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setStage(3)}
                    disabled={!isBarcodeScanned}
                    className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                      isBarcodeScanned
                        ? "bg-[#541827] text-white hover:bg-[#3D0C1A]"
                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    <span>Proceed to Courier Allocation</span>
                    <ArrowRight className="w-4 h-4 text-[#E6C687]" />
                  </button>
                  {!isBarcodeScanned && (
                    <p className="text-[11px] text-center text-amber-700">
                      * Please click &ldquo;Simulate SKU Scan&rdquo; first to verify inventory before dispatch.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Simulated Printable GST Tax Invoice Modal */}
            {showInvoiceModal && (
              <div className="p-6 rounded-2xl bg-white border-2 border-[#541827] shadow-xl animate-fade-in font-sans text-xs">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#541827]">
                      DUPPATI LUXURY LIVING PVT. LTD.
                    </h3>
                    <p className="text-stone-500 text-[11px]">
                      GSTIN: 08AAACD1234F1Z8 • C-Scheme, Ashok Nagar, Jaipur, Rajasthan 302001
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-stone-800">TAX INVOICE</div>
                    <div className="text-[11px] text-stone-500 font-mono">#INV-2026-1108 • 13-Nov-2026</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-b border-stone-200 text-[11px]">
                  <div>
                    <strong className="text-stone-700">Bill To / Ship To:</strong>
                    <div className="text-stone-800 mt-0.5">Aditi Sharma (Ph: +91 98765 43210)</div>
                    <div className="text-stone-600">Flat 402, Royal Palms, Jubilee Hills Rd 36</div>
                    <div className="text-stone-600">Hyderabad, Telangana - 500081 (State Code: 36)</div>
                  </div>
                  <div className="text-right">
                    <strong className="text-stone-700">Payment Information:</strong>
                    <div className="text-stone-800 mt-0.5">Paid via Razorpay UPI</div>
                    <div className="text-stone-600 font-mono">Payment ID: pay_Ox892LKm9Z42</div>
                    <div className="text-emerald-700 font-semibold">Payment Status: Confirmed</div>
                  </div>
                </div>

                <div className="py-3">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-500 uppercase">
                        <th className="py-1">Description</th>
                        <th className="py-1">HSN</th>
                        <th className="py-1 text-center">Qty</th>
                        <th className="py-1 text-right">Taxable</th>
                        <th className="py-1 text-right">GST (5%)</th>
                        <th className="py-1 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      <tr>
                        <td className="py-2 font-medium">Royal Jaipuri Silk-Mulmul Dohar (King)</td>
                        <td className="py-2 font-mono">6304</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-right">₹2,360.00</td>
                        <td className="py-2 text-right">₹118.00</td>
                        <td className="py-2 text-right font-semibold">₹2,478.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                  <span>* This is a computer generated invoice and does not require a physical signature.</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert("Simulated print command sent to warehouse thermal printer.")}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-medium cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      Print
                    </button>
                    <button
                      onClick={() => alert("Downloading PDF...")}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-medium cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================== */}
        {/* STAGE 3: SMART SHIPROCKET LOGISTICS & 1-CLICK AWB          */}
        {/* ========================================================== */}
        {stage === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E5DDD0] gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#C28A42] uppercase tracking-wider">
                  Automated Logistics Gateway • Shiprocket API
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#29251F]">
                  Courier Allocation & Airway Bill (AWB) Generation
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStage(2)}
                  className="px-3 py-1.5 rounded-lg border border-[#E5DDD0] text-xs text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  ← Back to Packing
                </button>
              </div>
            </div>

            {/* Package Specifications & Weight Verification */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DDD0] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#541827]/10 text-[#541827] flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#29251F]">Package Specs: Dohar Vacuum Pack</div>
                  <div className="text-stone-500">Dimensions: 30 x 25 x 10 cm • Volumetric: 1.50 kg • Dead Weight: 1.20 kg</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-stone-600">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Origin</span>
                  <strong>Jaipur (302001)</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400" />
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Destination</span>
                  <strong>Hyderabad (500081)</strong>
                </div>
              </div>
            </div>

            {/* Real-time Courier Rate Comparison Table */}
            <div className="bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden shadow-2xs">
              <div className="p-4 bg-stone-50 border-b border-[#E5DDD0] flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Live Courier Engine • Shiprocket Rate Cards
                </h4>
                <span className="text-[11px] text-stone-500">Auto-sorted by delivery speed & SLA</span>
              </div>

              <div className="divide-y divide-[#E5DDD0]">
                {/* BlueDart Express */}
                <div
                  onClick={() => setSelectedCourier("bluedart")}
                  className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition ${
                    selectedCourier === "bluedart"
                      ? "bg-[#541827]/5 border-l-4 border-l-[#541827]"
                      : "hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <input
                      type="radio"
                      checked={selectedCourier === "bluedart"}
                      onChange={() => setSelectedCourier("bluedart")}
                      className="accent-[#541827] w-4 h-4"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#29251F]">BlueDart Express Air</strong>
                        <span className="text-[10px] font-bold bg-[#E6C687]/30 text-[#541827] px-2 py-0.5 rounded-full border border-[#E6C687]/40">
                          Recommended for Luxury Dohar
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Transit: <strong>24 – 36 hrs (Air Cargo)</strong> • Delivery SLA: 98.4%
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-[#541827]">₹88.00</div>
                    <div className="text-[10px] text-stone-400">Merchant absorbs standard freight</div>
                  </div>
                </div>

                {/* Delhivery Surface */}
                <div
                  onClick={() => setSelectedCourier("delhivery")}
                  className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition ${
                    selectedCourier === "delhivery"
                      ? "bg-[#541827]/5 border-l-4 border-l-[#541827]"
                      : "hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <input
                      type="radio"
                      checked={selectedCourier === "delhivery"}
                      onChange={() => setSelectedCourier("delhivery")}
                      className="accent-[#541827] w-4 h-4"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#29251F]">Delhivery Surface Standard</strong>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Transit: 48 – 72 hrs (Ground) • Delivery SLA: 94.2%
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-stone-700">₹58.00</div>
                    <div className="text-[10px] text-stone-400">Economical surface freight</div>
                  </div>
                </div>

                {/* Xpressbees */}
                <div
                  onClick={() => setSelectedCourier("xpressbees")}
                  className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition ${
                    selectedCourier === "xpressbees"
                      ? "bg-[#541827]/5 border-l-4 border-l-[#541827]"
                      : "hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <input
                      type="radio"
                      checked={selectedCourier === "xpressbees"}
                      onChange={() => setSelectedCourier("xpressbees")}
                      className="accent-[#541827] w-4 h-4"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#29251F]">Xpressbees Surface</strong>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Transit: 72 – 96 hrs • Delivery SLA: 91.5%
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-stone-700">₹52.00</div>
                    <div className="text-[10px] text-stone-400">Budget tier</div>
                  </div>
                </div>
              </div>
            </div>

            {/* AWB Generation Action */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs space-y-4">
              {!isAwbGenerated ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#29251F]">
                      Ready to assign {selectedCourier === "bluedart" ? "BlueDart Express Air" : "Selected Courier"}?
                    </h4>
                    <p className="text-xs text-stone-500">
                      This will automatically generate the carrier barcode shipping label and schedule an afternoon pickup at Jaipur Studio.
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateAwb}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#541827] text-white hover:bg-[#3D0C1A] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm shrink-0"
                  >
                    <Truck className="w-4 h-4 text-[#E6C687]" />
                    <span>Generate AWB & Shipping Label</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <div>AWB Generated: <span className="font-mono text-sm text-[#541827]">BLUEDART-82947192-AIR</span></div>
                        <div className="text-emerald-700 text-[11px] font-normal">Courier pickup scheduled: Today at 3:00 PM IST</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStage(4)}
                      className="px-5 py-2.5 rounded-xl bg-[#541827] text-white hover:bg-[#3D0C1A] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                    >
                      <span>Next: Trigger WhatsApp & Sync Stock</span>
                      <ArrowRight className="w-4 h-4 text-[#E6C687]" />
                    </button>
                  </div>

                  {/* Printable Shipping Label Preview */}
                  {showShippingLabel && (
                    <div className="p-5 rounded-xl bg-white border-2 border-dashed border-stone-300 max-w-lg mx-auto font-mono text-[11px] space-y-3 shadow-inner">
                      <div className="flex items-center justify-between border-b pb-2">
                        <strong className="text-sm font-sans text-[#541827]">BLUEDART EXPRESS AIR</strong>
                        <span className="text-[10px] bg-stone-100 px-2 py-0.5">PREPAID</span>
                      </div>
                      <div className="text-center py-2 bg-stone-50 border border-stone-200 rounded">
                        <div className="text-lg tracking-widest font-bold">||||||||||||||||||||||||||||||||||</div>
                        <div className="text-xs font-bold text-stone-800 mt-1">AWB: 82947192</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <strong>SHIP TO:</strong>
                          <div>Aditi Sharma</div>
                          <div>Flat 402, Royal Palms, Jubilee Hills</div>
                          <div>Hyderabad, TS - 500081</div>
                        </div>
                        <div className="text-right">
                          <strong>ROUTING:</strong>
                          <div className="text-sm font-bold">HYD / HUB-36</div>
                          <div>Weight: 1.2 kg</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STAGE 4: AUTOMATED WHATSAPP BROADCAST & INVENTORY SYNC     */}
        {/* ========================================================== */}
        {stage === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E5DDD0] gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#C28A42] uppercase tracking-wider">
                  Automated Customer Retention & Inventory Engine
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#29251F]">
                  WhatsApp Dispatch Broadcast & Warehouse Sync
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStage(3)}
                  className="px-3 py-1.5 rounded-lg border border-[#E5DDD0] text-xs text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  ← Back to Logistics
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp Broadcast Automation */}
              <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    Automated WhatsApp Utility Alert
                  </h4>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    Cost: ₹0.115 / message
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#0B141A] text-white space-y-3 font-sans text-xs">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-semibold text-emerald-400">Meta Cloud API: Outbound Dispatch Event</span>
                  </div>

                  <div className="bg-[#202C33] p-3 rounded-lg space-y-2 border-l-4 border-l-emerald-500">
                    <div className="font-semibold text-emerald-300">Recipient: +91 98765 43210 (Aditi Sharma)</div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      &ldquo;Namaste Aditi! Your Royal Jaipuri Silk-Mulmul Dohar is packed and dispatched via BlueDart Air (AWB: 82947192). Expected delivery: Tomorrow by 1:00 PM.&rdquo;
                    </p>
                    <div className="text-[10px] text-stone-400">Buttons attached: [ 📦 Track Shipment ] [ 💬 Contact Support ]</div>
                  </div>
                </div>

                {!isWhatsappTriggered ? (
                  <button
                    onClick={handleTriggerBroadcast}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send WhatsApp Alert & Decrement Stock</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp alert delivered to Aditi&apos;s phone. Cost ₹0.115 billed to wallet.</span>
                  </div>
                )}
              </div>

              {/* Warehouse Stock Sync & Artisan Re-order */}
              <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                    <Warehouse className="w-4 h-4 text-[#541827]" />
                    Central Warehouse Stock Sync
                  </h4>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                    Jaipur Studio Bin A4
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-600">Inventory Status:</span>
                    <span className="font-bold text-stone-800">
                      {warehouseStock === 4 ? "4 Units Available" : "3 Units Remaining (1 Fulfilled)"}
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${
                        warehouseStock <= 3 ? "w-3/12 bg-amber-500" : "w-4/12 bg-emerald-500"
                      }`}
                    />
                  </div>

                  {isArtisanAlerted && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Low Stock Reorder Trigger Active!
                      </div>
                      <p className="text-[11px] text-amber-800">
                        Stock reached threshold (&le;3 units). Automated production requisition sent to Master Artisan Unit in Sanganer for batch re-weaving.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setStage(5)}
                  disabled={!isWhatsappTriggered}
                  className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                    isWhatsappTriggered
                      ? "bg-[#541827] text-white hover:bg-[#3D0C1A]"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed"
                  }`}
                >
                  <span>Proceed to Live RTO Guard & Delivery Monitor</span>
                  <ArrowRight className="w-4 h-4 text-[#E6C687]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STAGE 5: LIVE RTO GUARD & DELIVERY AVAILABILITY MONITOR    */}
        {/* ========================================================== */}
        {stage === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E5DDD0] gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#C28A42] uppercase tracking-wider">
                  Amazon & Flipkart Operational Model
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#29251F]">
                  Live RTO Guard & Pre-Delivery Availability Monitor
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStage(4)}
                  className="px-3 py-1.5 rounded-lg border border-[#E5DDD0] text-xs text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  ← Back to Automation
                </button>
              </div>
            </div>

            {/* Courier Delivery Partner Status */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                    RK
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#29251F]">Rider Ramesh Kumar</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                        Out for Delivery
                      </span>
                    </div>
                    <div className="text-xs text-stone-500">
                      BlueDart Express • Hyderabad Jubilee Hills Van 14 • Contact: +91 98480 12345
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="font-semibold text-stone-700">Estimated Delivery: Today, 11:45 AM</div>
                  <div className="text-stone-500">Scheduled Morning Slot (9 AM – 1 PM)</div>
                </div>
              </div>

              {/* Interactive Customer Availability Simulation */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-[#541827] uppercase tracking-wider">
                    Customer Response to Pre-Delivery Morning Prompt:
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCustomerResponseStatus("available")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        customerResponseStatus === "available"
                          ? "bg-emerald-600 text-white"
                          : "bg-white text-stone-600 border border-stone-200"
                      }`}
                    >
                      Customer Available
                    </button>
                    <button
                      onClick={() => setCustomerResponseStatus("rescheduled")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        customerResponseStatus === "rescheduled"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-stone-600 border border-stone-200"
                      }`}
                    >
                      Rescheduled
                    </button>
                    <button
                      onClick={() => setCustomerResponseStatus("safe_drop")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        customerResponseStatus === "safe_drop"
                          ? "bg-amber-600 text-white"
                          : "bg-white text-stone-600 border border-stone-200"
                      }`}
                    >
                      Safe Drop
                    </button>
                  </div>
                </div>

                {customerResponseStatus === "available" && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Customer Confirmed Available at Home:</strong>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        Aditi confirmed availability via WhatsApp prompt. One-Time Delivery Verification OTP <strong className="font-mono text-emerald-950">7391</strong> shared with customer to verify rider Ramesh upon arrival. Delivery success probability: 99.2%.
                      </p>
                    </div>
                  </div>
                )}

                {customerResponseStatus === "rescheduled" && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Zero-Penalty Reschedule Triggered:</strong>
                      <p className="text-[11px] text-blue-800 mt-0.5">
                        Customer clicked &ldquo;Reschedule to Tomorrow&rdquo; at 8:15 AM before the rider departed the hub. BlueDart API automatically held package in hub locker without incurring a failed door-trip charge (₹85 return penalty avoided!).
                      </p>
                    </div>
                  </div>
                )}

                {customerResponseStatus === "safe_drop" && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Security Gate Safe Drop Authorized:</strong>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Customer authorized drop-off at Royal Palms Security Gate with Officer Satish. Photo proof of delivery will be uploaded by the courier.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* RTO Cost Savings Metric for Client */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-stone-500 font-medium">Industry Average RTO Rate</div>
                  <div className="text-lg font-bold text-red-600 mt-0.5">14.8%</div>
                  <div className="text-[10px] text-stone-500">Blind door trips with no pre-check</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-stone-500 font-medium">Duppati Pre-Check RTO Rate</div>
                  <div className="text-lg font-bold text-emerald-600 mt-0.5">3.2%</div>
                  <div className="text-[10px] text-emerald-700">78% reduction in failed deliveries</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="text-stone-500 font-medium">Net Monthly Freight Saved</div>
                  <div className="text-lg font-bold text-[#541827] mt-0.5">₹18,450</div>
                  <div className="text-[10px] text-stone-500">Calculated on 350 monthly orders</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStage(6)}
                className="px-6 py-3 rounded-xl bg-[#541827] text-white hover:bg-[#3D0C1A] text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-sm"
              >
                <span>Next: Inspect Razorpay Settlement & Profit Ledger</span>
                <ArrowRight className="w-4 h-4 text-[#E6C687]" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STAGE 6: RAZORPAY SETTLEMENT & NET PROFIT LEDGER           */}
        {/* ========================================================== */}
        {stage === 6 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E5DDD0] gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#C28A42] uppercase tracking-wider">
                  Store Owner Financial Ledger & Payout Transparency
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#29251F]">
                  Razorpay Bank Settlement & Order Unit Economics
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStage(5)}
                  className="px-3 py-1.5 rounded-lg border border-[#E5DDD0] text-xs text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  ← Back to Delivery
                </button>
              </div>
            </div>

            {/* Payout Bank Transfer Status */}
            <div className="p-5 rounded-2xl bg-[#1E050D] text-white border border-[#E6C687]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#541827] text-[#E6C687] flex items-center justify-center shrink-0 border border-[#E6C687]/30">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#E6C687] font-semibold uppercase tracking-wider">
                    Bank Settlement In Progress (T+2 Cycle)
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    HDFC Bank Current A/c ending 4902
                  </div>
                  <div className="text-xs text-stone-300">
                    Account Name: Duppati Luxury Living Pvt Ltd • IFSC: HDFC0000240
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-stone-300">Estimated Deposit Time</div>
                <div className="text-lg font-bold text-[#E6C687]">Tomorrow, 10:00 AM IST</div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Direct NEFT / IMPS Credit
                </span>
              </div>
            </div>

            {/* Unit Economics Waterfall: Order #DUP-2026-8941 */}
            <div className="bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden shadow-2xs">
              <div className="p-4 sm:px-6 bg-stone-50 border-b border-[#E5DDD0] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Unit Economics Breakdown • Order #DUP-2026-8941
                  </h4>
                  <p className="text-[11px] text-stone-500">Every rupee accounted for with zero hidden deductions</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#541827] bg-[#541827]/10 px-2.5 py-1 rounded-full">
                  Net Realization: 94.1%
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-3 font-sans text-xs">
                {/* 1. Customer Payment */}
                <div className="flex justify-between items-center py-2 border-b border-stone-200">
                  <span className="font-semibold text-stone-800 text-sm">
                    Gross Customer Payment (Product + Shipping):
                  </span>
                  <span className="font-bold text-stone-900 text-sm">₹2,478.00</span>
                </div>

                {/* 2. Deductions */}
                <div className="space-y-2 pt-1 pl-3 border-l-2 border-[#541827]/30 text-stone-600">
                  <div className="flex justify-between items-center">
                    <span>Less: Razorpay Processing Fee (2.0% + 18% GST):</span>
                    <span className="font-mono text-red-600 font-semibold">-₹58.48</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Less: BlueDart Express Air Courier Freight:</span>
                    <span className="font-mono text-red-600 font-semibold">-₹88.00</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Less: WhatsApp Utility OTP & Dispatch Alerts (2 msgs):</span>
                    <span className="font-mono text-red-600 font-semibold">-₹0.23</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Less: Master Weaver Artisan Cost & Silk-Mulmul COGS:</span>
                    <span className="font-mono text-stone-700">-₹980.00</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Less: GST Output Tax Payable (5% on ₹2,360):</span>
                    <span className="font-mono text-stone-700">-₹118.00</span>
                  </div>
                </div>

                {/* 3. Final Owner Net Profit */}
                <div className="pt-4 border-t-2 border-[#541827] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C28A42]">
                      Owner Net Operating Profit on this Order:
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Transferred directly into your business bank account
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-serif font-bold text-emerald-700">
                      +₹1,233.29
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      49.8% Healthy Net Profit Margin
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Presentation Summary / Replay Controls */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600 max-w-xl">
                <strong>Congratulations!</strong> You have walked through the full operational lifecycle of a luxury e-commerce order from the merchant&apos;s eyes. You can restart the simulation or switch to the customer view at any time.
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-[#541827] text-[#541827] hover:bg-[#541827]/5 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Admin Journey</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================== */}
      {/* 3. BOTTOM STAGE NAVIGATION BAR                             */}
      {/* ========================================================== */}
      <div className="p-4 sm:px-8 bg-white border-t border-[#E5DDD0] flex items-center justify-between">
        <button
          onClick={() => setStage((prev) => Math.max(1, prev - 1) as any)}
          disabled={stage === 1}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            stage === 1
              ? "opacity-40 cursor-not-allowed text-stone-400"
              : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <div className="text-xs text-stone-500 font-medium hidden sm:block">
          Stage {stage} of 6 • Admin Operations Flow
        </div>

        <button
          onClick={() => setStage((prev) => Math.min(6, prev + 1) as any)}
          disabled={stage === 6}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
            stage === 6
              ? "opacity-40 cursor-not-allowed text-stone-400"
              : "bg-[#541827] text-white hover:bg-[#3D0C1A]"
          }`}
        >
          <span>Next Step</span>
          <ArrowRight className="w-4 h-4 text-[#E6C687]" />
        </button>
      </div>
    </div>
  );
}
