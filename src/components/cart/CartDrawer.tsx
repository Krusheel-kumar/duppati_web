"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    subtotal,
    discount,
    shippingFee,
    total,
    freeShippingThreshold,
    amountForFreeShipping,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    openCheckout,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#E5DDD0]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E5DDD0] bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/duppatilogo.png"
                  alt="DUPPAT Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
                <span className="text-xs font-bold text-stone-300">|</span>
                <span className="font-serif text-sm font-medium text-[#29251F]">
                  Shopping Bag ({cartCount})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-stone-400 hover:text-stone-800 transition"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3.5 bg-[#FAF6F0] border-b border-[#E5DDD0] text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium text-stone-800">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#541827]" />
                  {amountForFreeShipping === 0 ? (
                    <span className="text-[#541827] font-semibold">
                      Complimentary Express Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{amountForFreeShipping.toLocaleString("en-IN")}</strong> more for{" "}
                      <strong>FREE Express Shipping</strong>
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-mono font-semibold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1 bg-[#E5DDD0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#541827] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-white border border-[#E5DDD0] flex items-center justify-center text-stone-400 mb-3">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base font-normal text-stone-800 mb-1">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs mb-5 font-light">
                    Explore our handblock bed covers, blankets, curtains, and dining linens.
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-sm bg-[#541827] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#43121e] transition"
                  >
                    Discover Collections
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="p-3.5 rounded-md bg-white border border-[#E5DDD0] shadow-xs flex gap-3.5"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-sm bg-stone-100 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-sm font-medium text-[#29251F] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.selectedColor)
                            }
                            className="text-stone-400 hover:text-rose-600 transition p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 font-light">
                          Palette: <span className="text-[#29251F] font-medium">{item.selectedColor}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#E5DDD0] rounded-sm bg-[#FAF6F0]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedColor
                              )
                            }
                            className="p-1 text-stone-500 hover:text-stone-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor
                              )
                            }
                            className="p-1 text-stone-500 hover:text-stone-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-mono text-sm font-bold text-[#29251F]">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E5DDD0] space-y-4">
                {/* Coupon Code Section */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-sm bg-[#FAF6F0] border border-[#C28A42]/50 text-xs">
                      <div className="flex items-center gap-2 text-[#541827] font-medium">
                        <Tag className="w-3.5 h-3.5 text-[#C28A42]" />
                        <span>Code Applied: <strong>{appliedCoupon}</strong></span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-rose-600 text-xs font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                          placeholder="Promo code (e.g. RAJASTHAN10)"
                          className="flex-1 px-3 py-2 text-xs rounded-sm border border-[#E5DDD0] bg-[#FAF6F0] uppercase placeholder:normal-case focus:outline-none focus:border-[#541827]"
                        />
                        <button
                          onClick={() => {
                            if (inputCoupon) applyCoupon(inputCoupon);
                          }}
                          className="px-4 py-2 rounded-sm bg-[#541827] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#43121e] transition"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => applyCoupon("RAJASTHAN10")}
                          className="text-[10px] px-2 py-0.5 rounded-sm bg-[#FAF6F0] text-[#541827] border border-[#E5DDD0] font-mono hover:bg-stone-100 transition"
                        >
                          RAJASTHAN10 (10% Off)
                        </button>
                        <button
                          onClick={() => applyCoupon("WELCOME500")}
                          className="text-[10px] px-2 py-0.5 rounded-sm bg-[#FAF6F0] text-[#541827] border border-[#E5DDD0] font-mono hover:bg-stone-100 transition"
                        >
                          WELCOME500 (₹500 Off)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100 font-light">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#541827] font-medium">
                      <span>Artisan Promo Discount</span>
                      <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shiprocket Express Delivery</span>
                    <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#29251F] pt-2 border-t border-[#E5DDD0]">
                    <span>Total Amount</span>
                    <span className="font-mono">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={openCheckout}
                  className="w-full py-3.5 rounded-sm bg-[#541827] hover:bg-[#43121e] text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#C28A42]" />
                </button>

                <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 font-light">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C28A42]" />
                    Razorpay 256-Bit SSL
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#C28A42]" />
                    Shiprocket Insured
                  </span>
                  <span>•</span>
                  <span>COD Available</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
