"use client";

import React from "react";
import Image from "next/image";
import { Star, Clock, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  isFeatured?: boolean;
}

interface RestoCardProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestoCard({ restaurant, className }: RestoCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className={`group relative flex flex-col rounded-[24px] overflow-hidden bg-white border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image Container */}
      <div className={`relative w-full overflow-hidden ${restaurant.isFeatured ? 'aspect-[16/9] md:aspect-auto md:h-full' : 'aspect-[3/2]'}`}>
        <motion.div
          className="w-full h-full"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority={restaurant.isFeatured}
          />
        </motion.div>

        {/* Glassmorphism Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/40 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-gray-900 shadow-sm">
            <Clock size={14} className="text-brand-orange" />
            {restaurant.deliveryTime}
          </div>
        </div>

        {/* View Menu Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center z-20"
            >
              <motion.div
                initial={{ scale: 0.8, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <Button variant="primary" className="bg-white text-brand-orange hover:bg-white hover:scale-105 shadow-xl font-bold">
                  View Menu
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className={`p-5 flex flex-col justify-between ${restaurant.isFeatured ? 'md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-gradient-to-t md:from-black/80 md:to-transparent md:pt-12 md:text-white' : 'bg-white'}`}>
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className={`text-xl font-bold font-plus-jakarta leading-tight group-hover:text-brand-orange transition-colors ${restaurant.isFeatured ? 'md:text-2xl md:group-hover:text-white' : ''}`}>
              {restaurant.name}
            </h3>
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-sm font-bold ${restaurant.isFeatured ? 'md:bg-white/20 md:backdrop-blur-sm' : 'bg-green-50 text-green-700'}`}>
              <Star size={14} className="fill-current" />
              {restaurant.rating}
            </div>
          </div>
          
          <div className={`flex items-center gap-4 text-sm font-medium ${restaurant.isFeatured ? 'md:text-gray-200' : 'text-gray-500'}`}>
            <div className="flex items-center gap-1.5">
              <Truck size={15} className="text-brand-orange" />
              {restaurant.deliveryFee}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
