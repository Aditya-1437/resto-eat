"use client";

import React, { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "w-full bg-white border border-gray-200 rounded-2xl py-4 transition-all focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange",
          icon ? "pl-12 pr-4" : "px-6",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function AddressSearch() {
  const [address, setAddress] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleLocate = () => {
    setIsLocating(true);
    // Simulate geolocation functionality
    setTimeout(() => {
      setAddress("123 Foodie Lane, Gourmet District");
      setIsLocating(false);
    }, 1500);
  };

  return (
    <div className="relative group w-full max-w-2xl">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-orange z-10">
        <MapPin size={24} />
      </div>
      <input
        type="text"
        placeholder="Enter your delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full bg-white text-lg border-2 border-transparent shadow-2xl rounded-3xl py-6 pl-14 pr-36 focus:outline-none focus:border-brand-orange transition-all placeholder:text-gray-400"
      />
      <button
        onClick={handleLocate}
        disabled={isLocating}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-orange text-white px-6 py-3 rounded-2xl font-semibold hover:bg-brand-orange-hover transition-colors flex items-center gap-2"
      >
        {isLocating ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Find Me"
        )}
      </button>
    </div>
  );
}
