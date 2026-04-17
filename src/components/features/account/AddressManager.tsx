"use client";

import React, { useState } from "react";
import { MapPin, Edit2, Trash2, Plus, Home, Briefcase, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Address {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  address: string;
}

const INITIAL_ADDRESSES: Address[] = [
  { id: "1", type: "home", name: "My House", address: "123 Gourmet St, Foodville, NY 10001" },
  { id: "2", type: "work", name: "Office", address: "444 Chef's Way, Tech City, CA 90210" },
];

export function AddressManager() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);

  const getIcon = (type: string) => {
    switch (type) {
      case "home": return Home;
      case "work": return Briefcase;
      default: return Heart;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="text-xl font-black text-gray-900 font-plus-jakarta tracking-tight">Saved Addresses</h3>
            <p className="text-sm text-gray-500 font-medium">Manage your delivery locations</p>
        </div>
        <Button className="bg-brand-orange text-white rounded-2xl px-6 py-3 h-auto flex items-center gap-2 font-bold shadow-lg shadow-brand-orange/20 active:scale-95 transition-all">
          <Plus size={20} />
          Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => {
          const Icon = getIcon(addr.type);
          return (
            <div 
              key={addr.id} 
              className="bg-white border border-gray-100 p-6 rounded-[2rem] hover:shadow-xl hover:shadow-gray-200/50 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 tracking-tight">{addr.name}</h4>
                    <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed max-w-[200px]">
                      {addr.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-brand-orange/10 hover:text-brand-orange transition-all">
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}
                        className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
              </div>
              
              {/* Subtle background decoration */}
              <MapPin className="absolute -bottom-4 -right-4 w-24 h-24 text-gray-50 -rotate-12 pointer-events-none group-hover:text-brand-orange/5 transition-colors" />
            </div>
          );
        })}

        <button className="border-2 border-dashed border-gray-100 p-8 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-brand-orange/30 hover:bg-brand-orange/5 hover:text-brand-orange transition-all group">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all">
                <Plus size={24} />
            </div>
            <span className="font-bold text-sm">Add another address</span>
        </button>
      </div>
    </div>
  );
}
