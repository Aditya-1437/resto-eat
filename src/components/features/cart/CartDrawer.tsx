"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, Timer, Calendar } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { CartItem } from "./CartItem";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, currentTime, maxDeliveryTime, totalItems } = useCart();
  const [lastEstimate, setLastEstimate] = useState<string>("");

  // Calculate estimated arrival time
  const arrivalDate = new Date(currentTime.getTime() + maxDeliveryTime * 60000);
  const arrivalTimeStr = arrivalDate.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Track changes to estimation for rolling effect
  useEffect(() => {
    if (arrivalTimeStr !== lastEstimate) {
      setLastEstimate(arrivalTimeStr);
    }
  }, [arrivalTimeStr, lastEstimate]);

  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header: Compact Smart Header */}
            <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
                      <ShoppingBag size={22} />
                    </div>
                    {totalItems > 0 && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                      >
                        {totalItems}
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1.5">Your Cart</h2>
                    <div className="flex items-center gap-2">
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                         Order Summary
                       </p>
                       <AnimatePresence>
                         {items.length > 0 && (
                           <>
                             <div className="w-1 h-1 bg-gray-200 rounded-full" />
                             <motion.div 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               exit={{ opacity: 0, x: -10 }}
                               className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-orange/5 rounded-full border border-brand-orange/10"
                             >
                               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
                               <div className="flex items-center gap-1">
                                 <Timer size={11} className="text-brand-orange" />
                                 <span className="text-[10px] font-bold text-brand-orange/60 uppercase tracking-tight">Est. Arrival</span>
                               </div>
                               <div className="h-3.5 overflow-hidden relative">
                                 <AnimatePresence mode="wait">
                                   <motion.span
                                     key={arrivalTimeStr}
                                     initial={{ y: 8, opacity: 0 }}
                                     animate={{ y: 0, opacity: 1 }}
                                     exit={{ y: -8, opacity: 0 }}
                                     transition={{ type: "spring", damping: 15, stiffness: 200 }}
                                     className="text-[10px] font-black text-brand-orange uppercase tracking-tight block leading-none"
                                   >
                                     {arrivalTimeStr}
                                   </motion.span>
                                 </AnimatePresence>
                               </div>
                             </motion.div>
                           </>
                         )}
                       </AnimatePresence>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 group active:scale-90"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {items.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                    <ShoppingBag size={48} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Your cart is empty</h3>
                  <p className="text-gray-400 mt-2">Add some delicious dishes to see them here!</p>
                  <Button 
                    onClick={() => setIsOpen(false)}
                    variant="primary" 
                    className="mt-6 bg-brand-orange text-white rounded-full px-8"
                  >
                    Start Ordering
                  </Button>
                </div>
              )}
            </div>

            {/* Footer: Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-8px_24px_rgba(0,0,0,0.04)]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm font-medium text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-400">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t border-gray-50">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-brand-orange text-white rounded-2xl py-6 flex items-center justify-center gap-3 text-lg font-black hover:bg-brand-orange-hover shadow-xl shadow-brand-orange/20 transition-all active:scale-[0.98] group">
                  Proceed to Checkout
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                  Secure Checkout Powered by RestoEat
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
