"use client";

import React from "react";
import { ShieldCheck, Key, Smartphone, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SecuritySection() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-8 font-plus-jakarta tracking-tight">Security Credentials</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-brand-orange/20 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-gray-400 group-hover:text-brand-orange shadow-sm transition-colors">
                <Key size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Account Password</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Last changed 3 months ago</p>
              </div>
            </div>
            <button className="text-sm font-black text-brand-orange hover:text-brand-orange-hover transition-colors px-4 py-2 hover:bg-brand-orange/5 rounded-xl">
              Change Password
            </button>
          </div>

          <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-brand-orange/20 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl text-gray-400 group-hover:text-brand-orange shadow-sm transition-colors">
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Two-Factor Authentication</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Currently disabled</p>
              </div>
            </div>
            <button className="text-sm font-black text-gray-400 hover:text-brand-orange transition-colors px-4 py-2 hover:bg-brand-orange/5 rounded-xl">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-2 font-plus-jakarta tracking-tight">Connected Devices</h3>
        <p className="text-sm text-gray-500 font-medium mb-6">Manage where you are signed in</p>
        
        <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">MacBook Pro M2</h4>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-0.5">Current Session · New York, USA</p>
                </div>
            </div>
            <button className="text-xs font-black text-gray-400">This Device</button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50/30 rounded-[2rem] p-8 border border-red-100 shadow-sm border-dashed">
        <div className="flex items-center gap-3 text-red-600 mb-4">
            <AlertCircle size={20} />
            <h3 className="text-lg font-black font-plus-jakarta tracking-tight">Danger Zone</h3>
        </div>
        <p className="text-sm text-gray-600 font-medium mb-8 leading-relaxed">
          Once you delete your account, there is no going back. Please be certain before proceeding. All your RestoPoints and order history will be permanently removed.
        </p>
        
        <button className="flex items-center gap-2 text-red-600 font-black text-sm px-6 py-4 bg-white border border-red-100 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95 group">
            <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
            Delete Account permanently
        </button>
      </div>
    </div>
  );
}
