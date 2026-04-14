"use client";

import React from "react";
import { Home, Search, ClipboardList, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SearchDrawer } from "./SearchDrawer";

const navItems = [
  { label: "Home", icon: Home, id: "home" },
  { label: "Search", icon: Search, id: "search" },
  { label: "Orders", icon: ClipboardList, id: "orders" },
  { label: "Profile", icon: User, id: "profile" },
];

export function BottomNav() {
  const [activeTab, setActiveTab] = React.useState("home");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleTabClick = (id: string) => {
    if (id === "search") {
      setIsSearchOpen(true);
    } else {
      setActiveTab(id);
    }
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-8 pt-4"
    >
      <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl flex items-center justify-between px-6 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300 relative",
                isActive ? "text-brand-orange" : "text-gray-400"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-1 w-1 h-1 bg-brand-orange rounded-full"
                />
              )}
              <Icon size={24} className={cn("transition-transform", isActive && "scale-110")} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>

      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.div>
  );
}
