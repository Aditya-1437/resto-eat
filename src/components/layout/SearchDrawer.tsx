"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Pizza, Beef, Leaf, Fish, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentSearches = ["Truffle Pasta", "Spicy Ramen", "California Roll"];

const craveCards = [
  { label: "Pizza", icon: Pizza, color: "bg-orange-50 text-orange-600 border-orange-100" },
  { label: "Burger", icon: Beef, color: "bg-red-50 text-red-600 border-red-100" },
  { label: "Vegan", icon: Leaf, color: "bg-green-50 text-green-600 border-green-100" },
  { label: "Sushi", icon: Fish, color: "bg-blue-50 text-blue-600 border-blue-100" },
];

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Prevent scrolling when drawer is open
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

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    console.log("Searching for:", searchQuery);
    // Add navigation logic here if needed
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220, mass: 0.8 }}
            className="absolute bottom-0 left-0 right-0 top-4 bg-white rounded-t-[2.5rem] shadow-2xl flex flex-col outline-none"
          >
            {/* Header / Search Bar */}
            <div className="p-6 pb-4 flex items-center gap-3 border-b border-gray-100 bg-white rounded-t-[2.5rem] sticky top-0 z-10">
              <form onSubmit={handleSearch} className="flex-1 relative flex items-center">
                <Search size={20} className="absolute left-4 text-brand-orange" />
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you craving?"
                  className="w-full h-[50px] bg-gray-100 border-transparent rounded-2xl pl-12 pr-16 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium text-gray-800"
                />
                <AnimatePresence>
                  {searchQuery.trim() && (
                    <motion.button
                      key="go-button"
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 20 }}
                      type="submit"
                      className="absolute right-2 px-4 h-9 bg-brand-orange text-white rounded-xl font-bold text-sm shadow-md shadow-brand-orange/20 flex items-center gap-1 active:scale-95 transition-all"
                    >
                      Go
                      <ChevronRight size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
              <button
                onClick={onClose}
                className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors px-1"
              >
                Cancel
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-32">
              
              {/* Recent Searches */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <div className="p-1 px-2.5 bg-gray-100 rounded-lg text-gray-500">
                    <Clock size={16} />
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">Recent Searches</h3>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      className="whitespace-nowrap bg-gray-50 border border-gray-100 px-5 py-3 rounded-full text-sm font-bold text-gray-600 hover:bg-white hover:border-brand-orange hover:text-brand-orange transition-all shadow-sm"
                    >
                      {term}
                    </button>
                  ))}
                  <div className="w-1 px-4" /> {/* Spacer */}
                </div>
              </section>

              {/* Trending Now / Crave Cards */}
              <section className="space-y-6">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1 px-2.5 bg-brand-orange/10 rounded-lg text-brand-orange">
                      <TrendingUp size={16} />
                    </div>
                    <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">Trending Now</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {craveCards.map((card) => {
                    const CardIcon = card.icon;
                    return (
                      <motion.button
                        key={card.label}
                        whileTap={{ scale: 0.96 }}
                        className={cn(
                          "relative h-32 rounded-[2rem] border overflow-hidden transition-all text-left flex flex-col justify-between p-5 group",
                          card.color
                        )}
                      >
                        <div className="p-2.5 bg-white/60 backdrop-blur-md rounded-2xl w-fit group-hover:scale-110 transition-transform">
                          <CardIcon size={24} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-lg">{card.label}</span>
                          <ChevronRight size={18} className="opacity-40 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              {/* Suggestions */}
              <section className="space-y-2 pt-4">
                <p className="px-1 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Try searching for...</p>
                <div className="space-y-1">
                  {["Healthy Poke Bowl", "Family Pizza Meal", "Late night snacks"].map((item) => (
                    <button key={item} className="w-full flex items-center justify-between py-4 border-b border-gray-50 group">
                      <span className="font-bold text-gray-600 group-hover:text-brand-orange transition-colors">{item}</span>
                      <Search size={16} className="text-gray-300 group-hover:text-brand-orange transition-colors" />
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Bottom Handle / Visual indicator */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
