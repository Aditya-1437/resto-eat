"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings, 
  History, 
  LogOut, 
  ChevronDown,
  UserCircle 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockAuth } from "@/lib/auth";
import { LogoutOverlay } from "@/components/ui/LogoutOverlay";

interface UserMenuProps {
  userName: string;
}

export function UserMenu({ userName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsOpen(false);
    
    // Dispatch a global event so the Navbar can dim the background
    window.dispatchEvent(new Event("resto-logout-start"));

    // Smooth exit delay
    setTimeout(() => {
      mockAuth.logout();
      window.dispatchEvent(new Event("resto-logout-end"));
      router.push("/");
    }, 2500);
  };

  const menuItems = [
    { label: "Profile", href: "/account", icon: User },
    { label: "Order History", href: "/account?tab=history", icon: History },
  ];

  return (
    <div className="relative">
      <motion.button
        layout
        onClick={() => !isLoggingOut && setIsOpen(!isOpen)}
        disabled={isLoggingOut}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border group relative overflow-hidden h-12 min-w-[120px] ${
          isLoggingOut 
            ? "bg-brand-orange border-brand-orange text-white shadow-xl shadow-brand-orange/20" 
            : "bg-gray-50 hover:bg-gray-100 border-gray-100 text-gray-700"
        }`}
      >
        <AnimatePresence mode="wait">
          {!isLoggingOut ? (
            <motion.div 
              key="logged-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0">
                <UserCircle size={18} />
              </div>
              <span className="text-sm font-bold hidden sm:block">
                Hi, {userName.split(" ")[0]}
              </span>
              <ChevronDown 
                size={14} 
                className={`text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} 
              />
            </motion.div>
          ) : (
            <motion.div 
              key="logging-out"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 px-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight whitespace-nowrap font-plus-jakarta uppercase tracking-widest">
                  See you soon! 👋
                </span>
              </div>
              {/* Internal progress line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && !isLoggingOut && (
          <>
            {/* Backdrop for closing */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2"
            >
              <div className="px-4 py-3 border-b border-gray-50 mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                <p className="text-sm font-black text-gray-900 truncate">{userName}</p>
              </div>

              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-brand-orange hover:bg-brand-orange/5 transition-all group"
                >
                  <item.icon size={18} className="text-gray-400 group-hover:text-brand-orange transition-colors" />
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-gray-50" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all group"
              >
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
