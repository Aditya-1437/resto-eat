"use client";

import React from "react";
import Image from "next/image";
import { 
  MoveRight, 
  Play, 
  Star, 
  Pizza as PizzaIcon, 
  Beef, 
  Utensils, 
  Salad, 
  Coffee, 
  Cake 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

const foodCategories = [
  { name: "Pizza", icon: <PizzaIcon size={24} /> },
  { name: "Burgers", icon: <Beef size={24} /> },
  { name: "Sushi", icon: <Utensils size={24} /> },
  { name: "Healthy", icon: <Salad size={24} /> },
  { name: "Coffee", icon: <Coffee size={24} /> },
  { name: "Bakery", icon: <Cake size={24} /> },
];

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col pt-32 pb-12 px-6 overflow-hidden bg-gray-50/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-brand-orange/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[40%] bg-brand-orange/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        {/* Left Content (The Hook) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start md:col-span-7"
        >
          <Badge variant="primary" className="mb-8 px-4 py-2 text-sm font-bold bg-white text-brand-orange border border-brand-orange/10 shadow-sm">
            Discover the New Taste
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-[1.1] mb-8 tracking-tight">
            The best flavors of your city, delivered <span className="text-brand-orange italic">fresh.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed font-medium">
            Join <span className="text-gray-900 font-bold">10,000+ foodies</span> in [City] discovering hidden gems and local favorites every day.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Button size="lg" className="rounded-2xl px-10 flex items-center gap-3 w-full sm:w-auto shadow-xl shadow-brand-orange/20">
              Browse Menu <MoveRight size={20} />
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 group font-bold">
              <div className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="text-brand-orange fill-brand-orange ml-1" size={18} />
              </div>
              Watch how it works
            </Button>
          </div>
        </motion.div>

        {/* Right Side (The Hero Visual) */}
        <div className="relative flex items-center justify-center md:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative z-10 w-full"
          >
            <div className="relative w-full aspect-square md:h-[400px] md:aspect-auto max-w-[500px] mx-auto">
              {/* Decorative Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-orange/10 rounded-full blur-[100px] -z-10 animate-pulse" />
              
              <motion.div
                animate={{ 
                  rotate: [0, 2, 0, -2, 0],
                  y: [0, -10, 0, 10, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full"
              >
                <Image
                  src="/images/hero_bowl.png"
                  alt="Premium Poke Bowl"
                  fill
                  className="object-contain drop-shadow-[20px_40px_60px_rgba(0,0,0,0.15)] scale-110 mix-blend-multiply"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Activity Cards */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -right-6 md:right-0 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex align-center gap-3"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-brand-orange">
              <Star size={20} className="fill-current" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Popular Choice</p>
              <p className="text-sm font-bold">Signature Poke</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-10 left-0 md:-left-10 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex flex-col gap-1"
          >
            <div className="flex gap-0.5 text-brand-orange">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className="fill-current" />)}
            </div>
            <p className="text-sm font-bold">"Best bowl I've ever had!"</p>
            <p className="text-[10px] text-gray-400 font-medium">— Sarah M.</p>
          </motion.div>
        </div>
      </div>

      {/* Quick-Jump Ribbon */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-gray-100 mt-auto">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-4 px-2">
          {foodCategories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all group flex-shrink-0"
            >
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <span className="font-bold text-gray-700 group-hover:text-brand-orange transition-colors">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
