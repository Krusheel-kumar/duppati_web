"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  freeShippingThreshold: number;
  amountForFreeShipping: number;
  couponCode: string;
  appliedCoupon: string | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  lastOrderDetails: {
    orderId: string;
    items: CartItem[];
    amount: number;
    paymentMethod: string;
    pincode: string;
  } | null;
  setOrderSuccess: (details: {
    orderId: string;
    items: CartItem[];
    amount: number;
    paymentMethod: string;
    pincode: string;
  }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    orderId: string;
    items: CartItem[];
    amount: number;
    paymentMethod: string;
    pincode: string;
  } | null>(null);

  // Load cart from localStorage on client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("duppati_cart");
      const savedWishlist = localStorage.getItem("duppati_wishlist");
      if (savedCart || savedWishlist) {
        queueMicrotask(() => {
          try {
            if (savedCart) setCart(JSON.parse(savedCart));
            if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
          } catch {}
        });
      }
    } catch {
      // fallback
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("duppati_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("duppati_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const addToCart = (product: Product, color?: string, quantity: number = 1) => {
    const chosenColor = color || product.colors[0]?.name || "Standard";
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === chosenColor
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedColor: chosenColor }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, color?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && (!color || item.selectedColor === color))
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!color || item.selectedColor === color)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const freeShippingThreshold = 1999;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 149;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  let discount = 0;
  if (appliedCoupon === "DUPPAT10" || appliedCoupon === "RAJASTHAN10") {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === "WELCOME500") {
    discount = subtotal > 1500 ? 500 : Math.round(subtotal * 0.15);
  }

  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "DUPPAT10" || clean === "RAJASTHAN10" || clean === "WELCOME500") {
      setAppliedCoupon(clean);
      setCouponCode("");
      setCouponError(null);
      return true;
    } else {
      setCouponError("Invalid promo code. Try DUPPAT10 or WELCOME500");
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const setOrderSuccess = (details: {
    orderId: string;
    items: CartItem[];
    amount: number;
    paymentMethod: string;
    pincode: string;
  }) => {
    setLastOrderDetails(details);
    clearCart();
    removeCoupon();
    setIsCheckoutOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        shippingFee,
        total,
        freeShippingThreshold,
        amountForFreeShipping,
        couponCode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        openQuickView: (product: Product) => setQuickViewProduct(product),
        closeQuickView: () => setQuickViewProduct(null),
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        lastOrderDetails,
        setOrderSuccess,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
