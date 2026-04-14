"use client";

import React from "react";
import Image from "next/image";
import { Smartphone, Play, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function TiltCard({ children, className, gradient }: { children: React.ReactNode, className?: string, gradient: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full rounded-[3rem] overflow-hidden p-8 lg:p-12 transition-shadow duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${className}`}
    >
      <div className={`absolute inset-0 -z-10 ${gradient}`} />
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

export function DualCTAs() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          
          {/* Partner CTA - Minimalist Mesh Design */}
          <TiltCard 
            gradient="bg-gradient-to-br from-brand-orange via-orange-500 to-red-600"
            className="group h-[420px]"
          >
            <div className="flex flex-col h-full justify-between items-start relative z-10">
              <div className="max-w-xs">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-block bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6"
                >
                  Partner With Us
                </motion.div>
                <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                  Grow your business.
                </h3>
                <p className="text-lg text-white/80 font-medium leading-relaxed">
                  Join 5,000+ local partners delivering happiness every day.
                </p>
              </div>

              <div>
                <Button className="bg-white text-brand-orange hover:bg-white/90 rounded-2xl px-7 py-3.5 text-base font-bold shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group/btn">
                  Get Started <ArrowUpRight size={18} strokeWidth={2.5} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
              </div>

              {/* Floating 3D Plate */}
              <motion.div
                style={{ transform: "translateZ(80px)" }}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-16 -bottom-10 lg:-right-24 lg:-bottom-16 w-72 h-72 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700 -z-10"
              >
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
                  alt="Signature Dish"
                  fill
                  className="object-contain drop-shadow-[20px_40px_40px_rgba(0,0,0,0.3)]"
                />
              </motion.div>
            </div>
          </TiltCard>

          {/* App CTA - Sleek Minimal Design */}
          <TiltCard 
            gradient="bg-gray-950"
            className="group h-[420px]"
          >
            {/* Animated Mesh Background Part */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#FF4B3A33,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex flex-col h-full justify-between items-start relative z-10">
              <div className="max-w-xs">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-block bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6"
                >
                  Download App
                </motion.div>
                <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                  Ready to eat?
                </h3>
                <p className="text-lg text-white/50 font-medium leading-relaxed">
                  The best local flavors, delivered to your door in minutes.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-white text-gray-900 rounded-2xl px-6 py-3.5 transition-all hover:scale-105 active:scale-95 shadow-xl font-bold">
                  <Smartphone size={20} /> App Store
                </button>
                <button className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-2xl px-6 py-3.5 transition-all hover:scale-105 active:scale-95 hover:bg-white/20 font-bold">
                  <Play size={20} className="fill-current" /> Play Store
                </button>
              </div>

              {/* Floating Phone Mockup */}
              <motion.div
                style={{ transform: "translateZ(100px)" }}
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [10, 15, 10]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 top-10 lg:-right-36 w-80 h-[480px] pointer-events-none opacity-20 group-hover:opacity-60 transition-all duration-1000 group-hover:rotate-0 -z-10"
              >
                <div className="relative w-full h-full">
                   <Image
                    src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbab?q=80&w=800&auto=format&fit=crop"
                    alt="App Preview"
                    fill
                    className="object-contain rounded-[40px] drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-40" />
                </div>
              </motion.div>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
