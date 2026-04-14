"use client";

import React from "react";
import { Coffee, Salad, Cake, Pizza, Beef, IceCream, Utensils } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Breakfast", icon: <Coffee size={24} /> },
  { name: "Fast Food", icon: <Beef size={24} /> },
  { name: "Pizza", icon: <Pizza size={24} /> },
  { name: "Vegan", icon: <Salad size={24} /> },
  { name: "Desserts", icon: <Cake size={24} /> },
  { name: "Ice Cream", icon: <IceCream size={24} /> },
  { name: "Burgers", icon: <Beef size={24} /> },
  { name: "Sushi", icon: <Utensils size={24} /> },
];

export function CategoryScroller() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-10">Explore Categories</h2>
        
        <div className="flex gap-6 overflow-x-auto pb-8 mask-gradient no-scrollbar">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 flex flex-col items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                {category.icon}
              </div>
              <span className="text-sm font-bold text-gray-700">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-gradient {
          mask-image: linear-gradient(to right, black 85%, transparent);
        }
      `}</style>
    </section>
  );
}
