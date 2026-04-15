import { BottomNav } from "@/components/layout/BottomNav";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/features/cart/CartDrawer";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RestoEat | Cravings satisfied in a click",
  description: "RestoEat is the fastest way to get your favorite local food delivered to your doorstep. Order from 500+ local favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-inter">
        <CartProvider>
          {children}
          <BottomNav />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
