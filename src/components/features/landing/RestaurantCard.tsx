"use client";

import React from "react";
import Image from "next/image";
import { Star, Clock, Truck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: string;
  categories: string[];
}

export function RestaurantCard({ restaurant, index }: { restaurant: Restaurant, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="primary" className="bg-white/90 backdrop-blur-sm shadow-sm font-bold">
            Popular
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold group-hover:text-brand-orange transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm font-bold">
            <Star size={14} className="fill-current" />
            {restaurant.rating}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">
          {restaurant.categories.join(" • ")}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <Clock size={16} className="text-brand-orange" />
            {restaurant.deliveryTime}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <Truck size={16} className="text-brand-orange" />
            {restaurant.deliveryFee}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
