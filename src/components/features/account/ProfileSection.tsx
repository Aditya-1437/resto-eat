"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Mail, Phone, Camera } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ProfileSection() {
  const [isChanged, setIsChanged] = useState(false);

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-8 font-plus-jakarta tracking-tight">Public Profile</h3>
        
        <div className="flex items-center gap-6 mb-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-brand-orange/10 flex items-center justify-center text-brand-orange border-2 border-dashed border-brand-orange/30 group-hover:border-solid transition-all cursor-pointer">
              <User size={40} />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-brand-orange transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Profile Picture</h4>
            <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                <input 
                  type="text" 
                  defaultValue="Aditya Kuncha"
                  onChange={() => setIsChanged(true)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all placeholder:text-gray-300"
                />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                <input 
                  type="email" 
                  defaultValue="aditya@example.com"
                  onChange={() => setIsChanged(true)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all placeholder:text-gray-300"
                />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative group">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 000-0000"
                  onChange={() => setIsChanged(true)}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all placeholder:text-gray-300"
                />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-6 font-plus-jakarta tracking-tight">Biography</h3>
        <textarea 
          placeholder="Tell us a bit about your taste preferences..."
          className="w-full min-h-[120px] bg-gray-50/50 border border-gray-100 rounded-3xl p-6 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all placeholder:text-gray-300 resize-none"
          onChange={() => setIsChanged(true)}
        />
      </div>

      {/* Floating Save Button */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: isChanged ? 0 : 100 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Button 
          onClick={() => setIsChanged(false)}
          className="bg-brand-orange text-white rounded-full px-8 py-4 h-auto shadow-2xl shadow-brand-orange/40 flex items-center gap-3 active:scale-95 transition-all text-lg font-black group"
        >
          <Save size={24} className="group-hover:rotate-12 transition-transform" />
          Save Changes
        </Button>
      </motion.div>
    </div>
  );
}
