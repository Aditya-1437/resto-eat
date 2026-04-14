import React from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Smartphone, Play, Camera, Send, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Dual CTA Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-brand-orange rounded-[2rem] p-10 text-white flex flex-col items-start justify-between relative overflow-hidden group">
            <div className="z-10">
              <h3 className="text-3xl font-bold mb-4">Wanna partner with us?</h3>
              <p className="text-white/80 mb-8 max-w-xs">
                Join our network of restaurants and reach more hungry customers.
              </p>
              <Button className="bg-white text-brand-orange hover:bg-gray-100">
                Join as Restaurant
              </Button>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform">
              <Logo className="w-48 h-48" />
            </div>
          </div>

          <div className="bg-gray-900 rounded-[2rem] p-10 text-white flex flex-col items-start justify-between relative overflow-hidden group">
            <div className="z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to eat?</h3>
              <p className="text-white/80 mb-8 max-w-xs">
                Download the RestoEat app for the best experience and exclusive offers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white/10 hover:bg-white/20 flex items-center gap-2 backdrop-blur-sm">
                  <Smartphone size={20} /> App Store
                </Button>
                <Button className="bg-white/10 hover:bg-white/20 flex items-center gap-2 backdrop-blur-sm">
                  <Play size={20} /> Play Store
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-muted-foreground mb-6 max-w-xs">
              Bringing the best local flavors to your doorstep. Cravings satisfied in a click.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-brand-orange transition-colors">
                <Send size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-brand-orange transition-colors">
                <Camera size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-brand-orange transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-brand-orange">About Us</a></li>
              <li><a href="#" className="hover:text-brand-orange">Careers</a></li>
              <li><a href="#" className="hover:text-brand-orange">Blog</a></li>
              <li><a href="#" className="hover:text-brand-orange">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-brand-orange">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-orange">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-orange">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 RestoEat. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-orange">Privacy</a>
            <a href="#" className="hover:text-brand-orange">Terms</a>
            <a href="#" className="hover:text-brand-orange">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
