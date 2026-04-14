"use client";

import React from "react";
import { RestaurantCard, Restaurant } from "./RestaurantCard";

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Pizza Project",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 1200,
    deliveryTime: "15-25 min",
    deliveryFee: "Free Delivery",
    categories: ["Pizza", "Italian", "Pasta"],
  },
  {
    id: "2",
    name: "Sushi Zen Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 850,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99 Delivery",
    categories: ["Sushi", "Japanese", "Seafood"],
  },
  {
    id: "3",
    name: "Green Garden Bowls",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 500,
    deliveryTime: "10-20 min",
    deliveryFee: "Free Delivery",
    categories: ["Healthy", "Salads", "Vegan"],
  },
  {
    id: "4",
    name: "Burger Haven",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: 2100,
    deliveryTime: "15-25 min",
    deliveryFee: "$1.50 Delivery",
    categories: ["Burgers", "American", "Fast Food"],
  },
];

export function RestoGrid() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-extrabold mb-4">Popular near you</h2>
            <p className="text-muted-foreground">The best restaurants in your neighborhood, delivered fast.</p>
          </div>
          <button className="text-brand-orange font-bold hover:underline">View all</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {restaurants.map((resto, index) => (
            <RestaurantCard key={resto.id} restaurant={resto} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
