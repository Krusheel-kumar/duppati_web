"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SplashScreenProps {
  durationMs?: number; // default 5000ms (5 seconds)
  onComplete?: () => void;
}

export default function SplashScreen({
  durationMs = 5000,
  onComplete,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out slightly before completion for a buttery-smooth 900ms exit
    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, durationMs - 900);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, durationMs);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onComplete]);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Welcome"
      onClick={() => setIsFadingOut(true)}
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-all duration-900 ease-out select-none cursor-pointer ${
        isFadingOut
          ? "opacity-0 scale-104 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at center, #FFFFFF 0%, #FCFAF7 35%, #F7F1E8 70%, #EFE7DC 100%)",
      }}
    >
      {/* ============================================================== */}
      {/* 1. MODERN MINIMAL BACKGROUND GRAPHICAL MOTIONS                 */}
      {/* ============================================================== */}

      {/* Floating Organic Aurora Orb 1 (Warm Gold Champagne) */}
      <div className="absolute top-1/4 left-1/3 w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] rounded-full bg-[#E8D3B4]/40 blur-[100px] pointer-events-none animate-aurora-float" />

      {/* Floating Organic Aurora Orb 2 (Soft Rose Terracotta) */}
      <div className="absolute bottom-1/4 right-1/3 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full bg-[#D4AF8B]/30 blur-[110px] pointer-events-none animate-aurora-float-reverse" />

      {/* Concentric Hairline Echo Ripples radiating behind the Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
        {/* Ripple Wave 1 */}
        <div className="absolute w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] rounded-full border border-[#C28A42]/20 animate-ripple-1" />
        {/* Ripple Wave 2 */}
        <div className="absolute w-[360px] h-[360px] sm:w-[560px] sm:h-[560px] rounded-full border border-[#C28A42]/15 animate-ripple-2" />
        {/* Ripple Wave 3 */}
        <div className="absolute w-[460px] h-[460px] sm:w-[700px] sm:h-[700px] rounded-full border border-[#541827]/10 animate-ripple-3" />

        {/* Minimal Subtle Orbit Ring */}
        <div className="absolute w-[520px] h-[520px] sm:w-[780px] sm:h-[780px] rounded-full border border-dashed border-[#C28A42]/15 animate-spin-slow pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. CENTER STAGE: LOGO REVEAL ONLY (NO TEXT)                    */}
      {/* ============================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6">
        {/* Logo Container with Smooth Cinematic Reveal Animation */}
        <div className="relative w-64 sm:w-80 md:w-96 lg:w-[420px] h-28 sm:h-36 md:h-44 lg:h-48 animate-logo-reveal flex items-center justify-center">
          {/* Subtle Ambient Back-Glow */}
          <div className="absolute inset-0 bg-[#C28A42]/15 blur-2xl rounded-full scale-90 pointer-events-none animate-pulse duration-[3000ms]" />

          {/* Exact Original Logo with Cozy Home */}
          <div className="relative w-full h-full">
            <Image
              src="/assets/duppatilogo.png"
              alt="DUPPATI Cozy Home"
              fill
              priority
              sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 420px"
              className="object-contain drop-shadow-[0_4px_24px_rgba(41,37,31,0.08)]"
            />

            {/* Delicate Light Sheen Sweep */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 animate-brand-gleam" />
            </div>
          </div>
        </div>

        {/* Minimalist Breathing Line Indicator (Ultra subtle) */}
        <div className="w-16 sm:w-24 h-[1.5px] bg-[#E5DDD0] rounded-full mt-6 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-[#C28A42] to-transparent animate-line-pulse" />
        </div>
      </div>

      {/* Embedded Modern Keyframe Animations */}
      <style jsx>{`
        @keyframes auroraFloat {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(30px, -25px) scale(1.12);
          }
        }
        @keyframes auroraFloatReverse {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(-30px, 25px) scale(1.1);
          }
        }
        @keyframes ripple {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        @keyframes logoReveal {
          0% {
            opacity: 0;
            transform: scale(0.92);
            filter: blur(12px);
          }
          40% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1.02);
            filter: blur(0px);
          }
        }
        @keyframes linePulse {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-aurora-float {
          animation: auroraFloat 9s ease-in-out infinite;
        }
        .animate-aurora-float-reverse {
          animation: auroraFloatReverse 11s ease-in-out infinite;
        }
        .animate-ripple-1 {
          animation: ripple 4.5s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
        }
        .animate-ripple-2 {
          animation: ripple 4.5s cubic-bezier(0.2, 0.8, 0.4, 1) 1.5s infinite;
        }
        .animate-ripple-3 {
          animation: ripple 4.5s cubic-bezier(0.2, 0.8, 0.4, 1) 3s infinite;
        }
        .animate-logo-reveal {
          animation: logoReveal 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-line-pulse {
          animation: linePulse 2.8s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spinSlow 60s linear infinite;
        }
      `}</style>
    </aside>
  );
}
