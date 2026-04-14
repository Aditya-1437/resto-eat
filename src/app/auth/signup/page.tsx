"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  User,
  ArrowRight, 
  CheckCircle2,
  X
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { FloatingInput, PasswordStrength } from "@/components/features/auth/AuthComponents";
import { mockAuth } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bgImage, setBgImage] = useState("/images/auth_morning.png");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setBgImage("/images/auth_night.png");
    } else {
      setBgImage("/images/auth_morning.png");
    }
  }, []);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock login as the new user
      mockAuth.login(name || "Foodie Explorer");
      setIsLoading(false);
      // Navigate back home
      router.push("/");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-white font-plus-jakarta overflow-hidden">
      
      {/* 1. Visual Side (60%) */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden bg-black outline-none border-r border-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgImage}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={bgImage}
              alt="Restaurant background"
              fill
              className="object-cover transition-all duration-1000"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/">
              <Logo white className="scale-125 origin-left hover:opacity-80 transition-opacity cursor-pointer" />
            </Link>
          </motion.div>

          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-6xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-lg"
            >
              Start your culinary journey.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl text-white/80 font-medium max-w-md leading-relaxed"
            >
              Join thousands of foodies who enjoy the best flavors their city has to offer, at the speed of thought.
            </motion.p>
          </div>
        </div>
      </div>

      {/* 2. Auth Side (40%) */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 relative bg-white">
        
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link href="/">
            <Logo className="hover:opacity-80 transition-opacity cursor-pointer" />
          </Link>
        </div>

        {/* Floating Close Button */}
        <Link 
          href="/"
          className="absolute top-8 right-8 p-3 bg-gray-50 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-900 transition-all z-50 group shadow-sm border border-gray-100"
          title="Back to Home"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[32px] font-extrabold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500 font-medium tracking-tight">Join RestoEat and explore local favorites.</p>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 active:scale-[0.98] shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 active:scale-[0.98] shadow-sm">
              <svg className="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714.013.014.28.026.31.026 1.325 0 2.651-.714 3.25-1.728z" />
              </svg>
              <span className="text-sm font-bold">Apple</span>
            </button>
          </div>

          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or create with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-1">
            <FloatingInput
              id="name"
              label="Full Name"
              type="text"
              value={name}
              onChange={setName}
              icon={<User size={20} />}
            />

            <FloatingInput
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              icon={<Mail size={20} />}
            />

            <FloatingInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              icon={<Lock size={20} />}
            />
            
            {password && <PasswordStrength password={password} />}

            <div className="flex items-start gap-2 px-0.5 mt-4 mb-8">
              <div className="mt-1 bg-green-50 text-green-600 rounded-full p-0.5">
                <CheckCircle2 size={14} />
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed tracking-tight">
                By creating an account, you agree to our <Link href="#" className="text-brand-orange font-bold hover:underline">Terms of Service</Link> and <Link href="#" className="text-brand-orange font-bold hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            <Button 
              type="submit"
              disabled={isLoading || (!name || !email || !password)}
              className="w-full bg-brand-orange text-white py-4.5 rounded-2xl font-bold text-lg hover:bg-brand-orange-hover transition-all shadow-lg shadow-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-12 text-center text-sm">
            <span className="text-gray-500 font-medium tracking-tight">Already have an account? </span>
            <Link href="/auth/signin" className="text-brand-orange font-bold hover:text-brand-orange-hover transition-colors">
              Sign in here
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
}
