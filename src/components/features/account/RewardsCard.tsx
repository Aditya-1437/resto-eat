"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, Zap, TrendingUp, Info } from "lucide-react";

export function RewardsCard() {
  const currentPoints = 320;
  const targetPoints = 500;
  const progress = (currentPoints / targetPoints) * 100;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-orange to-orange-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-brand-orange/30">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <Gift size={28} />
            </div>
            <div className="flex flex-col items-end">
                <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">Tier Status</span>
                <span className="text-lg font-black tracking-tight">Silver Member</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-6xl font-black font-plus-jakarta tracking-tighter">{currentPoints}</span>
              <span className="text-xl font-bold text-white/80">RestoPoints</span>
            </div>
            <p className="text-white/70 text-sm font-medium">You're making great progress! Keep ordering to unlock more.</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/90">
                <Zap size={14} className="fill-white" />
                <span>Next Reward: $10 Discount</span>
              </div>
              <span className="text-sm font-black italic">{Math.round(progress)}%</span>
            </div>
            
            <div className="h-4 w-full bg-black/10 backdrop-blur-sm rounded-full overflow-hidden p-1">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white rounded-full shadow-lg relative"
              >
                 <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30 skew-x-12 animate-shimmer" />
              </motion.div>
            </div>
            
            <div className="flex justify-between text-[10px] font-black text-white/50 uppercase tracking-widest pt-1">
              <span>0 Points</span>
              <span>{targetPoints} Points</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
            { label: "Total Saved", value: "$45.20", icon: TrendingUp, color: "bg-green-50 text-green-600" },
            { label: "Points to Gold", value: "180", icon: Zap, color: "bg-blue-50 text-blue-600" }
        ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 p-6 rounded-3xl flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl", stat.color)}>
                    <stat.icon size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl flex items-start gap-4">
          <Info size={20} className="text-brand-orange shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">How points work?</h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Earn 1 RestoPoint for every $1 spent on orders. Points can be redeemed for discounts, free delivery, and exclusive partner offers.
            </p>
          </div>
      </div>
    </div>
  );
}

// Utility for this specific file if cn is not perfectly matched
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
