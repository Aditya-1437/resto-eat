"use client";

import React from "react";
import { RestoCard, Restaurant } from "./RestoCard";
import { motion } from "framer-motion";

const featuredRestaurants: Restaurant[] = [
  {
    id: "feat-1",
    name: "The Signature Kitchen",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    deliveryTime: "15-20 min",
    deliveryFee: "Free Delivery",
    isFeatured: true,
  },
  {
    id: "feat-2",
    name: "Sushi Zen Master",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    deliveryTime: "25-30 min",
    deliveryFee: "$1.99 Delivery",
  },
  {
    id: "feat-3",
    name: "Flame & Grill",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
    rating: 4.7,
    deliveryTime: "20-25 min",
    deliveryFee: "Free Delivery",
  },
];

export function FeaturedRestaurants() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[32px] font-bold font-plus-jakarta text-gray-900 mb-2 leading-tight"
          >
            Top Rated Near You
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            Handpicked local favorites with the fastest delivery.
          </motion.p>
        </div>

        {/* Mobile Swipeable View (Hidden on Tablet/Desktop) */}
        <div className="md:hidden">
          <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-6 px-6 mask-gradient">
            {featuredRestaurants.map((resto) => (
              <div key={resto.id} className="min-w-[280px] flex-shrink-0">
                <RestoCard 
                  restaurant={{...resto, isFeatured: false}} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Grid (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((resto, index) => {
            const isFirst = index === 0;
            return (
              <RestoCard
                key={resto.id}
                restaurant={resto}
                className={isFirst ? "lg:col-span-2 lg:row-span-2 h-full" : "h-full"}
              />
            );
          })}
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
