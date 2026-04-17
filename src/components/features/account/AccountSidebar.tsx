"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Gift, 
  ChevronRight,
  ShoppingBag
} from "lucide-react";

export type AccountTab = "profile" | "history" | "security" | "addresses" | "payments" | "rewards";

interface AccountSidebarProps {
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
}

const navItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "history", label: "Orders", icon: ShoppingBag },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "rewards", label: "Rewards", icon: Gift },
];

export function AccountSidebar({ activeTab, onTabChange }: AccountSidebarProps) {
  return (
    <div className="w-full lg:w-72 flex flex-col gap-2">
      <div className="mb-6 px-4 py-2">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight font-plus-jakarta">Account Settings</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Manage your professional profile</p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as AccountTab)}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group",
                isActive 
                  ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 translate-x-1" 
                  : "bg-white text-gray-600 hover:bg-gray-100/80 hover:translate-x-1"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={cn(
                    "transition-colors",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-brand-orange"
                )} />
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              <ChevronRight size={16} className={cn(
                  "transition-transform",
                  isActive ? "text-white/70" : "text-gray-300 group-hover:translate-x-1 opacity-0 group-hover:opacity-100"
              )} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
