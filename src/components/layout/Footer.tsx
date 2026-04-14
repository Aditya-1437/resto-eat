"use client";

import React from "react";
import { 
  Camera, 
  Send, 
  Globe, 
  Mail, 
  ChevronDown 
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";

const footerLinks = {
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Blog", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Safety Center", href: "#" },
    { name: "Community Guidelines", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
  partner: [
    { name: "Join as Restaurant", href: "#" },
    { name: "Join as Driver", href: "#" },
    { name: "Business Accounts", href: "#" },
    { name: "Refer a Friend", href: "#" },
  ],
};

const socialIcons = [
  { Icon: Camera, href: "#" },
  { Icon: Send, href: "#" },
  { Icon: Globe, href: "#" },
  { Icon: Mail, href: "#" },
];

export function Footer() {
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("English");

  return (
    <footer className="bg-[#FFFFFF] pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 space-y-10 md:space-y-0">
          
          {/* Column A (The Identity) */}
          <div className="flex flex-col items-start gap-8">
            <Logo className="text-brand-orange" />
            <p className="text-gray-500 font-inter text-[15px] leading-relaxed max-w-xs">
              Bringing the best flavors of your city directly to your door with speed and care.
            </p>
            <div className="flex items-center gap-5">
              {socialIcons.map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column B (Company) */}
          <div>
            <h4 className="font-plus-jakarta text-[14px] font-bold uppercase tracking-widest text-gray-900 mb-8">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="font-inter text-[15px] text-gray-500 hover:text-brand-orange transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column C (Support) */}
          <div>
            <h4 className="font-plus-jakarta text-[14px] font-bold uppercase tracking-widest text-gray-900 mb-8">
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="font-inter text-[15px] text-gray-500 hover:text-brand-orange transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column D (Partner) */}
          <div>
            <h4 className="font-plus-jakarta text-[14px] font-bold uppercase tracking-widest text-gray-900 mb-8">
              Partner
            </h4>
            <ul className="space-y-4">
              {footerLinks.partner.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="font-inter text-[15px] text-gray-500 hover:text-brand-orange transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar (The Legal) */}
        <div className="border-t border-gray-100 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <p className="text-gray-400 text-sm font-medium">
              © 2026 RestoEat Technologies. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-400">
              <a href="#" className="hover:text-brand-orange transition-colors">Terms</a>
              <a href="#" className="hover:text-brand-orange transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-orange transition-colors">Cookies</a>
              
              {/* Interactive Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 hover:text-brand-orange transition-colors group"
                >
                  <Globe size={16} />
                  <span>Language: {language}</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full mb-4 right-0 bg-white border border-gray-100 rounded-xl shadow-2xl p-2 min-w-[140px] z-50"
                    >
                      {["English", "Spanish", "French", "German"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                            language === lang 
                              ? 'bg-brand-orange/5 text-brand-orange font-bold' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
