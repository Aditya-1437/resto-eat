"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  ChevronDown, 
  UserCircle,
  X,
  Menu,
  ArrowRight,
  Loader2,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockAuth, type AuthState } from "@/lib/auth";

const navLinks = [
  { label: "Explore", href: "#", secondary: false },
  { label: "Offers", href: "#", secondary: true },
  { label: "Partner", href: "#", secondary: true },
  { label: "Track Order", href: "#", secondary: false },
];

export function Navbar() {
  const [activeLink, setActiveLink] = useState("Explore");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Address Selection States
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("123 Gourmet St, Foodville");
  const [tempAddress, setTempAddress] = useState("");
  const [checkStatus, setCheckStatus] = useState<"idle" | "checking" | "available">("idle");

  // Collapse State
  const [isManualExpand, setIsManualExpand] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });

  useEffect(() => {
    const checkAuth = () => {
      setAuthState(mockAuth.getAuthState());
    };
    
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isScrolled) setIsManualExpand(false);
  }, [isScrolled]);

  const handleCheckAvailability = () => {
    setCheckStatus("checking");
    setTimeout(() => {
      setCheckStatus("available");
    }, 2000);
  };

  const handleUpdateAddress = () => {
    setCurrentAddress(tempAddress);
    setIsLocationOpen(false);
    setCheckStatus("idle");
  };

  const handleOpenLocation = () => {
    setTempAddress(currentAddress);
    setIsLocationOpen(true);
    setCheckStatus("idle");
  };

  const isCollapsed = isScrolled && !isManualExpand && !isLocationOpen && !isSearchOpen;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isScrolled && !isLocationOpen && !isSearchOpen && !isManualExpand ? (typeof window !== "undefined" && window.innerWidth < 768 ? -120 : 0) : 0,
        opacity: 1 
      }}
      transition={{ duration: 0.8, type: "spring", damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 pointer-events-none"
      )}
    >
      <motion.div 
        layout
        onClick={() => isCollapsed && setIsManualExpand(true)}
        className={cn(
          "mx-auto transition-all duration-500 overflow-hidden pointer-events-auto cursor-default",
          "bg-white/80 backdrop-blur-md border border-white/20 shadow-lg",
          isCollapsed 
            ? "w-16 h-16 rounded-2xl flex items-center justify-center ml-auto mr-0 cursor-pointer hover:bg-white hover:scale-105" 
            : "max-w-7xl rounded-[2.5rem]",
          isScrolled && !isCollapsed ? "py-2 px-4 md:px-6" : isCollapsed ? "p-0" : "py-3 px-4 md:px-8",
          isLocationOpen && "ring-2 ring-brand-orange/20 bg-white/95 backdrop-blur-2xl px-4 md:px-10"
        )}
      >
        <div className="relative flex flex-col w-full">
          {/* Main Navigation Row */}
          <div className={cn(
            "relative flex items-center transition-all duration-300",
            isCollapsed ? "justify-center h-16" : "h-12 w-full"
          )}>
            <AnimatePresence mode="wait">
              {isCollapsed ? (
                <motion.div
                  key="collapsed-logo"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Logo hideText className="scale-125" />
                </motion.div>
              ) : isSearchOpen ? (
                <motion.div
                  key="search-field"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center w-full gap-4"
                >
                  <div className="flex-1 relative flex items-center">
                    <Search size={20} className="absolute left-4 text-brand-orange" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search for restaurants, dishes, or cuisines..."
                      className="w-full bg-gray-50/80 border border-gray-100 rounded-full py-2.5 pl-11 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-medium"
                    />
                    <button className="absolute right-2 p-1.5 bg-brand-orange text-white rounded-full hover:bg-brand-orange-hover transition-colors shadow-sm">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(false);
                    }}
                    className="p-2.5 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="nav-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "flex items-center justify-between w-full transition-opacity duration-300",
                    isLocationOpen && "opacity-40 pointer-events-none grayscale-[0.2]"
                  )}
                >
                  {/* Left Section: Logo & Location */}
                  <div className="flex items-center gap-3 md:gap-6">
                    <Logo className="scale-75 sm:scale-90 md:scale-100" />
                    
                    {/* Location Selector */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenLocation();
                      }}
                      className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gray-50/50 hover:bg-gray-100/80 rounded-full cursor-pointer transition-colors border border-gray-100 group max-w-[140px] sm:max-w-none"
                    >
                      <MapPin size={16} className="text-brand-orange group-hover:scale-110 transition-transform shrink-0" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="hidden sm:block text-[10px] text-muted-foreground font-bold uppercase tracking-wider leading-none">Deliver to</span>
                        <span className="text-xs md:text-sm font-bold text-gray-800 flex items-center gap-1 truncate sm:max-w-[120px]">
                          {currentAddress} <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform shrink-0" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Section: Links (Restored for Laptop) */}
                  <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLink(link.label);
                        }}
                        className={cn(
                          "relative text-sm font-bold transition-colors",
                          activeLink === link.label ? "text-brand-orange" : "text-gray-600 hover:text-brand-orange"
                        )}
                      >
                        {link.label}
                        {activeLink === link.label && (
                          <motion.div
                            layoutId="navbar-active-dot"
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-orange rounded-full"
                          />
                        )}
                      </a>
                    ))}
                  </nav>

                  {/* Spacer for Tablet/Mobile (where links are in hamburger) */}
                  <div className="flex-1 lg:hidden" />

                  {/* Right Section: Actions */}
                  <div className="flex items-center gap-1 md:gap-3 lg:gap-6">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSearchOpen(true);
                      }}
                      className="p-2 text-gray-600 hover:text-brand-orange transition-colors hidden md:block"
                    >
                      <Search size={22} />
                    </button>
                    
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-600 hover:text-brand-orange transition-colors relative"
                    >
                      <ShoppingBag className="w-5 h-5 md:w-5.5 md:h-5.5" />
                      <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full border border-white" />
                    </button>

                    <div className="hidden md:flex items-center ml-2">
                      {authState.isLoggedIn ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            mockAuth.logout();
                          }}
                          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full transition-all border border-gray-100 group"
                          title="Click to Logout"
                        >
                          <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            <UserCircle size={18} />
                          </div>
                          <span className="text-sm font-bold text-gray-700">Hi, {authState.name?.split(" ")[0]}</span>
                        </button>
                      ) : (
                        <Link href="/auth/signin">
                          <Button className="bg-brand-orange text-white hover:bg-brand-orange-hover rounded-full px-6 py-2.5 font-bold transition-all shadow-md shadow-brand-orange/10 hover:shadow-lg hover:shadow-brand-orange/20 hover:-translate-y-0.5 active:scale-95 text-sm">
                            Sign In
                          </Button>
                        </Link>
                      )}
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(true);
                      }}
                      className="p-2.5 bg-gray-50 text-gray-700 rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-sm flex lg:hidden items-center justify-center"
                    >
                      <Menu size={22} strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expanded Location Editor Tray */}
          <AnimatePresence>
            {isLocationOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="overflow-hidden"
              >
                <div className="py-6 border-t border-gray-100/50 mt-2">
                  <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                    <div className="flex-1 w-full relative flex items-center">
                      <MapPin size={22} className="absolute left-4 text-brand-orange" />
                      <input
                        autoFocus
                        type="text"
                        value={tempAddress}
                        onChange={(e) => {
                          setTempAddress(e.target.value);
                          if (checkStatus !== "idle") setCheckStatus("idle");
                        }}
                        placeholder="Enter the exact delivery location..."
                        className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all font-bold text-gray-800 text-lg shadow-inner"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <AnimatePresence mode="wait">
                        {checkStatus === "idle" && tempAddress !== currentAddress && (
                          <motion.button
                            key="check-btn"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={handleCheckAvailability}
                            className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-orange-hover transition-all shadow-lg shadow-brand-orange/20 whitespace-nowrap"
                          >
                            Check Availability
                          </motion.button>
                        )}
                        {checkStatus === "checking" && (
                          <motion.div
                            key="checking-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 text-brand-orange font-bold px-4 md:px-8 py-4 bg-orange-50 rounded-2xl border border-orange-100"
                          >
                            <Loader2 size={20} className="animate-spin" />
                            <span className="text-sm">Authenticating location...</span>
                          </motion.div>
                        )}
                        {checkStatus === "available" && (
                          <motion.button
                            key="update-btn"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleUpdateAddress}
                            className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg shadow-green-200"
                          >
                            <Check size={20} /> Update Now
                          </motion.button>
                        )}
                      </AnimatePresence>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLocationOpen(false);
                        }}
                        className="p-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-colors"
                        title="Cancel"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-xs text-muted-foreground ml-4"
                  >
                    Enter your street name, house number, and city for accurate delivery.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <Logo />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-gray-50 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-extrabold text-gray-800 hover:text-brand-orange transition-colors flex items-center justify-between group"
                  >
                    {link.label}
                    <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-orange" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Connect with us</p>
                <div className="flex gap-4">
                  {/* Placeholder social icons could go here */}
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-bold hover:bg-brand-orange hover:text-white transition-all cursor-pointer">fb</div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-bold hover:bg-brand-orange hover:text-white transition-all cursor-pointer">ig</div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-bold hover:bg-brand-orange hover:text-white transition-all cursor-pointer">tw</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
