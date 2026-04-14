"use client";

import React from "react";
import { ShieldCheck, Map, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

const markers = [
  {
    title: "500+ Local Favorites",
    description: "Your favorite local restaurants all in one place.",
    icon: <Users className="text-brand-orange" size={32} />,
  },
  {
    title: "Real-time Tracking",
    description: "Follow your order from the kitchen to your doorstep.",
    icon: <Map className="text-brand-orange" size={32} />,
  },
  {
    title: "Super Fast Delivery",
    description: "Delivery so fast you'll think your food was already there.",
    icon: <Clock className="text-brand-orange" size={32} />,
  },
  {
    title: "Secure Payments",
    description: "100% secure checkout with all major credit cards.",
    icon: <ShieldCheck className="text-brand-orange" size={32} />,
  },
];

export function TrustMarkers() {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {markers.map((marker, index) => (
            <motion.div
              key={marker.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 bg-brand-orange/5 rounded-3xl group-hover:bg-brand-orange/10 transition-colors">
                {marker.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{marker.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {marker.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
