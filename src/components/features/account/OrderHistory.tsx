"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  ChevronRight, 
  RotateCcw, 
  MapPin, 
  Clock,
  CheckCircle2,
  Package,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  restaurant: string;
  image: string;
  date: string;
  amount: number;
  status: "Delivered" | "In Progress" | "Cancelled";
  items: string[];
}

const ORDERS: Order[] = [
  {
    id: "ORD-9283",
    restaurant: "Gourmet Garden",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop",
    date: "Oct 24, 2023 at 7:30 PM",
    amount: 42.50,
    status: "Delivered",
    items: ["Truffle Pasta x1", "Caprese Salad x1", "Tiramisu x2"]
  },
  {
    id: "ORD-8172",
    restaurant: "Street Burger Express",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
    date: "Today at 12:15 PM",
    amount: 28.10,
    status: "In Progress",
    items: ["Classic Smash x2", "Large Fries x1", "Cola x2"]
  },
  {
    id: "ORD-7162",
    restaurant: "Sushi Zen",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop",
    date: "Oct 21, 2023 at 8:45 PM",
    amount: 64.00,
    status: "Cancelled",
    items: ["Dragon Roll x2", "Miso Soup x2", "Sashimi Deluxe x1"]
  }
];

export function OrderHistory() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
          <div>
            <h3 className="text-xl font-black text-gray-900 font-plus-jakarta tracking-tight">Recent Activity</h3>
            <p className="text-sm text-gray-500 font-medium">Keep track of your favorites</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 bg-white rounded-lg shadow-sm text-xs font-bold text-gray-900">All</button>
              <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">Active</button>
          </div>
      </div>

      <div className="space-y-4">
        {ORDERS.map((order, idx) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-gray-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex gap-5">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden">
                    <img src={order.image} alt={order.restaurant} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  {order.status === "In Progress" && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange text-white rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                        <Clock size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-black text-gray-900 tracking-tight font-plus-jakarta">{order.restaurant}</h4>
                      <div className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                        order.status === "Delivered" && "bg-green-50 text-green-600",
                        order.status === "In Progress" && "bg-orange-50 text-brand-orange",
                        order.status === "Cancelled" && "bg-gray-100 text-gray-500"
                      )}>
                        {order.status}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{order.id} • {order.date}</p>
                  </div>
                  <div className="text-xs font-medium text-gray-500 max-w-md line-clamp-1">
                    {order.items.join(", ")}
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-3 md:min-w-[120px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                <div className="text-xl font-black text-gray-900 font-plus-jakarta">${order.amount.toFixed(2)}</div>
                
                <div className="flex gap-2">
                   {order.status === "Delivered" ? (
                     <button className="flex items-center gap-2 text-xs font-black text-brand-orange hover:bg-brand-orange/5 px-4 py-2 rounded-xl transition-all">
                        <RotateCcw size={14} /> Reorder
                     </button>
                   ) : (
                     <button className="flex items-center gap-2 text-xs font-black bg-brand-orange text-white shadow-lg shadow-brand-orange/20 px-4 py-2 rounded-xl active:scale-95 transition-all">
                        Track Order <ArrowRight size={14} />
                     </button>
                   )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-300 mb-4 shadow-sm">
            <ShoppingBag size={28} />
          </div>
          <h4 className="font-bold text-gray-800">Hungry for something else?</h4>
          <p className="text-sm text-gray-500 mt-1 mb-6">Explore thousands of local favorites near you.</p>
          <Button className="bg-white border border-gray-100 text-gray-900 font-bold hover:bg-gray-50 px-8 rounded-2xl shadow-sm">
            Discover Restaurants
          </Button>
      </div>
    </div>
  );
}
