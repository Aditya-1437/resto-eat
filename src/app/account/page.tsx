"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { AccountSidebar, AccountTab } from "@/components/features/account/AccountSidebar";
import { ProfileSection } from "@/components/features/account/ProfileSection";
import { SecuritySection } from "@/components/features/account/SecuritySection";
import { AddressManager } from "@/components/features/account/AddressManager";
import { RewardsCard } from "@/components/features/account/RewardsCard";
import { mockAuth } from "@/lib/auth";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check auth
    const auth = mockAuth.getAuthState();
    if (!auth.isLoggedIn) {
      router.push("/auth/signin");
      return;
    }
    
    // Check URL params for tab
    const tabParam = searchParams.get("tab") as AccountTab;
    if (tabParam && ["profile", "security", "addresses", "payments", "rewards"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    
    setIsLoading(false);
  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return <ProfileSection />;
      case "security": return <SecuritySection />;
      case "addresses": return <AddressManager />;
      case "rewards": return <RewardsCard />;
      case "payments": return (
        <div className="p-12 text-center bg-white rounded-[3rem] border border-gray-100 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 font-plus-jakarta font-black text-4xl italic">$$</div>
            <h3 className="text-xl font-black text-gray-900">Payment Methods</h3>
            <p className="text-gray-500 mt-2">Secure payments coming soon...</p>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col font-inter">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 h-fit">
            <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </aside>

          {/* Content Area */}
          <section className="flex-1 lg:max-w-[800px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "circOut" }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .font-plus-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
