"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Truck,
  CheckCircle,
  Loader2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";

export default function RazorpayModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    total,
    subtotal,
    discount,
    shippingFee,
    setOrderSuccess,
  } = useCart();

  const [method, setMethod] = useState<"upi" | "card" | "netbanking" | "cod">("upi");
  const [upiOption, setUpiOption] = useState<"gpay" | "phonepe" | "paytm" | "custom">("gpay");
  const [customUpi, setCustomUpi] = useState("");
  const [formData, setFormData] = useState({
    name: "Aaditya Sharma",
    phone: "9876543210",
    email: "aaditya@example.com",
    address: "B-42, Civil Lines, Near Raj Mandir",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [awbCode, setAwbCode] = useState("");

  if (!isCheckoutOpen && !isSuccess) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedOrderId = "DUP-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);
    setAwbCode("SR" + Math.floor(100000000 + Math.random() * 900000000));

    // Simulate Razorpay secure payment gateway
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#541827", "#C28A42", "#29251F"],
      });

      setOrderSuccess({
        orderId: generatedOrderId,
        items: [...cart],
        amount: total,
        paymentMethod: method.toUpperCase(),
        pincode: formData.pincode,
      });
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    closeCheckout();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-md shadow-2xl overflow-hidden border border-[#E5DDD0]"
        >
          {isSuccess ? (
            /* Success confirmation */
            <div className="p-8 sm:p-12 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border border-[#C28A42] flex items-center justify-center text-[#541827] mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C28A42] bg-[#FAF6F0] px-3 py-1 rounded-sm border border-[#E5DDD0]">
                Payment Verified via Razorpay
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#29251F] mt-3">
                Order Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md font-light">
                Your order <strong className="text-[#29251F] font-mono">#{orderId}</strong> for{" "}
                <strong className="text-[#29251F]">₹{total.toLocaleString("en-IN")}</strong> has
                been placed. A tracking link will be sent via SMS & WhatsApp.
              </p>

              {/* Shiprocket Delivery tracking badge */}
              <div className="w-full mt-6 p-4 rounded-sm bg-[#FAF6F0] border border-[#E5DDD0] text-left text-xs text-stone-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-sm bg-white border border-[#E5DDD0] flex items-center justify-center text-[#541827]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[#29251F]">Shiprocket Express Logistics</p>
                    <p className="text-[11px] text-stone-500 font-light">
                      Dispatched from Jaipur Craft Center to Pincode {formData.pincode}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[#541827] font-semibold bg-white px-2.5 py-1 rounded-sm border border-[#E5DDD0] text-[11px]">
                  AWB: {awbCode || "SR729481029"}
                </span>
              </div>

              <button
                onClick={handleClose}
                className="mt-8 px-8 py-3 rounded-sm bg-[#541827] text-white font-medium text-xs uppercase tracking-wider hover:bg-[#43121e] transition"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            /* Checkout screen */
            <div>
              {/* Header */}
              <div className="bg-[#541827] text-white px-6 py-4 flex items-center justify-between border-b border-[#43121e]">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/duppati_logo_clean.png"
                    alt="DUPPATI"
                    className="h-8 sm:h-9 w-auto object-contain bg-white/95 p-1 rounded-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-medium tracking-wide">Razorpay Gateway</span>
                      <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-xs font-mono">
                        SECURE
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-300 flex items-center gap-1 font-light">
                      <Lock className="w-3 h-3 text-[#C28A42]" />
                      256-Bit SSL Encrypted & RBI Compliant
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-stone-300 uppercase tracking-wider font-light">Total</p>
                  <p className="text-base font-bold font-mono">₹{total.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <form onSubmit={handlePay} className="p-6 max-h-[78vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Delivery details */}
                  <div>
                    <h4 className="font-serif font-normal text-[#29251F] text-base mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#541827]" />
                      Delivery Destination
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-stone-600 mb-1 font-medium">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] focus:bg-white text-[#29251F] focus:outline-none focus:border-[#541827]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-stone-600 mb-1 font-medium">
                            Mobile (+91)
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] focus:bg-white text-[#29251F] focus:outline-none focus:border-[#541827]"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 mb-1 font-medium">Pincode</label>
                          <input
                            type="text"
                            maxLength={6}
                            required
                            value={formData.pincode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pincode: e.target.value.replace(/\D/g, ""),
                              })
                            }
                            className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] focus:bg-white text-[#29251F] focus:outline-none focus:border-[#541827]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-600 mb-1 font-medium">
                          Street Address / House
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] focus:bg-white text-[#29251F] focus:outline-none focus:border-[#541827]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-stone-600 mb-1 font-medium">City</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] focus:bg-white text-[#29251F] focus:outline-none focus:border-[#541827]"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 mb-1 font-medium">State</label>
                          <input
                            type="text"
                            required
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] focus:bg-white text-[#29251F] focus:outline-none focus:border-[#541827]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h4 className="font-serif font-normal text-[#29251F] text-base mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#541827]" />
                      Select Payment Method
                    </h4>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-4 gap-1 p-1 bg-[#FAF6F0] border border-[#E5DDD0] rounded-sm mb-4 text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => setMethod("upi")}
                        className={`py-1.5 rounded-xs transition ${
                          method === "upi"
                            ? "bg-white text-[#541827] shadow-xs font-semibold"
                            : "text-stone-600 hover:text-stone-900"
                        }`}
                      >
                        UPI
                      </button>
                      <button
                        type="button"
                        onClick={() => setMethod("card")}
                        className={`py-1.5 rounded-xs transition ${
                          method === "card"
                            ? "bg-white text-[#541827] shadow-xs font-semibold"
                            : "text-stone-600 hover:text-stone-900"
                        }`}
                      >
                        Cards
                      </button>
                      <button
                        type="button"
                        onClick={() => setMethod("netbanking")}
                        className={`py-1.5 rounded-xs transition ${
                          method === "netbanking"
                            ? "bg-white text-[#541827] shadow-xs font-semibold"
                            : "text-stone-600 hover:text-stone-900"
                        }`}
                      >
                        NetBank
                      </button>
                      <button
                        type="button"
                        onClick={() => setMethod("cod")}
                        className={`py-1.5 rounded-xs transition ${
                          method === "cod"
                            ? "bg-white text-[#541827] shadow-xs font-semibold"
                            : "text-stone-600 hover:text-stone-900"
                        }`}
                      >
                        COD
                      </button>
                    </div>

                    {/* Method details */}
                    <div className="p-3.5 rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] min-h-[160px] text-xs">
                      {method === "upi" && (
                        <div className="space-y-3">
                          <p className="font-medium text-stone-800">
                            Instant UPI Payment (GPay, PhonePe, Paytm)
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              type="button"
                              onClick={() => setUpiOption("gpay")}
                              className={`p-2 rounded-sm border text-center transition flex flex-col items-center gap-1 ${
                                upiOption === "gpay"
                                  ? "border-[#541827] bg-white text-[#541827] font-semibold"
                                  : "border-[#E5DDD0] bg-white text-stone-700"
                              }`}
                            >
                              <Smartphone className="w-4 h-4 text-emerald-600" />
                              <span>GPay UPI</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setUpiOption("phonepe")}
                              className={`p-2 rounded-sm border text-center transition flex flex-col items-center gap-1 ${
                                upiOption === "phonepe"
                                  ? "border-[#541827] bg-white text-[#541827] font-semibold"
                                  : "border-[#E5DDD0] bg-white text-stone-700"
                              }`}
                            >
                              <Smartphone className="w-4 h-4 text-purple-600" />
                              <span>PhonePe</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setUpiOption("paytm")}
                              className={`p-2 rounded-sm border text-center transition flex flex-col items-center gap-1 ${
                                upiOption === "paytm"
                                  ? "border-[#541827] bg-white text-[#541827] font-semibold"
                                  : "border-[#E5DDD0] bg-white text-stone-700"
                              }`}
                            >
                              <Smartphone className="w-4 h-4 text-sky-600" />
                              <span>Paytm</span>
                            </button>
                          </div>
                          <input
                            type="text"
                            value={customUpi}
                            onChange={(e) => setCustomUpi(e.target.value)}
                            placeholder="Or enter UPI ID (e.g. mobile@upi)"
                            className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-white text-[#29251F] focus:outline-none focus:border-[#541827]"
                          />
                        </div>
                      )}

                      {method === "card" && (
                        <div className="space-y-2.5">
                          <input
                            type="text"
                            placeholder="Card Number (Visa / Master / RuPay)"
                            defaultValue="4532 •••• •••• 8821"
                            className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-white text-[#29251F]"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              defaultValue="08/29"
                              className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-white text-[#29251F]"
                            />
                            <input
                              type="password"
                              maxLength={4}
                              placeholder="CVV"
                              defaultValue="123"
                              className="w-full px-3 py-2 rounded-sm border border-[#E5DDD0] bg-white text-[#29251F]"
                            />
                          </div>
                        </div>
                      )}

                      {method === "netbanking" && (
                        <div className="space-y-2">
                          <p className="font-medium text-stone-800">Popular Banks:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank"].map(
                              (bank, i) => (
                                <label
                                  key={bank}
                                  className="flex items-center gap-2 p-2 rounded-sm border border-[#E5DDD0] bg-white text-stone-800 cursor-pointer"
                                >
                                  <input type="radio" name="bank" defaultChecked={i === 0} />
                                  <span>{bank}</span>
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {method === "cod" && (
                        <div className="space-y-2 text-stone-700">
                          <p className="font-medium text-[#541827]">
                            Cash on Delivery via Shiprocket
                          </p>
                          <p className="text-[11px] text-stone-600 font-light leading-relaxed">
                            Pay with cash or UPI QR code at your doorstep upon receiving your parcel
                            from the delivery agent.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Breakdown */}
                    <div className="mt-4 p-3 rounded-sm bg-[#FAF6F0] border border-[#E5DDD0] space-y-1 text-xs text-stone-600 font-light">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span>₹{subtotal.toLocaleString("en-IN")}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-[#541827] font-medium">
                          <span>Promo Discount:</span>
                          <span>-₹{discount.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shiprocket Express:</span>
                        <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-[#E5DDD0] text-[#29251F] font-bold text-sm">
                        <span>Payable Amount:</span>
                        <span className="font-mono">₹{total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit footer */}
                <div className="mt-6 pt-4 border-t border-[#E5DDD0] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={closeCheckout}
                    className="text-xs text-stone-500 hover:text-stone-800 font-medium"
                  >
                    Back to Bag
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-3 rounded-sm bg-[#541827] hover:bg-[#43121e] text-white font-medium text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs transition disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C28A42]" />
                        <span>Verifying with Razorpay...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹{total.toLocaleString("en-IN")}</span>
                        <ArrowRight className="w-4 h-4 text-[#C28A42]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white p-1 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
