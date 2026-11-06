import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "DUPPAT Cozy Homezzz — Handcrafted Indian Home Textiles",
  description:
    "Timeless prints, beautiful fabrics and everyday comfort, thoughtfully curated for your home. Pure organic cotton bed covers, blankets, curtains, and rugs.",
};

export const viewport: Viewport = {
  themeColor: "#541827",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F7F1E8] text-[#29251F] font-sans antialiased">
        <CartProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
