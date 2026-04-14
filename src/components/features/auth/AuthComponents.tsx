"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

// --- FloatingInput Component ---

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  id: string;
}

export function FloatingInput({ label, type = "text", value, onChange, icon, id }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === "password";
  const displayType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative group mb-6">
      {/* Icon with focus animation */}
      <div className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10",
        isFocused || value ? "text-brand-orange scale-110" : "text-gray-400 group-hover:text-gray-500"
      )}>
        {icon}
      </div>
      
      <div className="relative flex-1">
        <input
          id={id}
          type={displayType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full bg-white border-b-2 py-4 pl-12 pr-12 focus:outline-none transition-all duration-300 font-medium text-gray-800",
            "hover:bg-gray-50/50",
            isFocused 
              ? "border-brand-orange bg-brand-orange/[0.02] shadow-[0_4px_12px_-4px_rgba(255,75,58,0.1)]" 
              : "border-gray-200 group-hover:border-gray-300"
          )}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-12 cursor-text transition-all duration-300 pointer-events-none z-10",
            isFocused || value 
              ? "-top-2 text-[11px] font-bold text-brand-orange uppercase tracking-wider" 
              : "top-1/2 -translate-y-1/2 text-gray-400 text-base font-medium"
          )}
        >
          {label}
        </label>
      </div>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-orange transition-colors z-20"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
}

// --- PasswordStrength Component ---

export function PasswordStrength({ password }: { password: string }) {
  const getStrength = (val: string) => {
    if (!val) return 0;
    let s = 0;
    if (val.length > 5) s += 33;
    if (/[A-Z]/.test(val)) s += 33;
    if (/[0-9]/.test(val) || /[^A-Za-z0-9]/.test(val)) s += 34;
    return s;
  };

  const strength = getStrength(password);
  
  const getColor = () => {
    if (strength === 0) return "bg-gray-200";
    if (strength <= 33) return "bg-red-500";
    if (strength <= 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mb-6 overflow-hidden mt-1">
      <div className="flex justify-between items-center mb-2 px-0.5">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Security</span>
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-wider transition-colors duration-300",
          strength > 66 ? "text-green-600" : strength > 33 ? "text-yellow-600" : strength > 0 ? "text-red-500" : "text-gray-400"
        )}>
          {strength > 66 ? "Exceptional" : strength > 33 ? "Strong enough" : strength > 0 ? "Vulnerable" : "Secure your base"}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn("h-full transition-colors duration-500", getColor())}
        />
      </div>
    </div>
  );
}
