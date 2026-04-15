"use client";

import React from "react";
import Image from "next/image";
import { Flame, Timer, Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Item Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-50">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
            <span className="font-bold text-brand-orange shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>

          {/* Kitchen Status Micro-row */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-brand-orange rounded-full">
              <Flame size={10} strokeWidth={2.5} />
              <span className="text-[10px] font-bold uppercase tracking-tight whitespace-nowrap">
                {item.prepTime} min cook
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
              <Timer size={10} strokeWidth={2.5} />
              <span className="text-[10px] font-bold uppercase tracking-tight whitespace-nowrap">
                {item.deliveryTime} min total
              </span>
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-white rounded-md transition-colors text-gray-500"
            >
              {item.quantity === 1 ? <Trash2 size={14} className="text-red-400" /> : <Minus size={14} />}
            </button>
            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:bg-white rounded-md transition-colors text-gray-500"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <button 
            onClick={() => removeItem(item.id)}
            className="text-gray-300 hover:text-red-500 transition-colors p-1"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
