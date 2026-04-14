"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { motion, AnimatePresence } from "framer-motion";

interface LogoProps {
  className?: string;
  hideText?: boolean;
}

export function Logo({ className, hideText }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brand-orange shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path
          d="M10 12C10 10.8954 10.8954 10 12 10H20C21.1046 10 22 10.8954 22 12V22H10V12Z"
          fill="white"
          fillOpacity="0.2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 8C13.2386 8 11 10.2386 11 13V15H21V13C21 10.2386 18.7614 8 16 8ZM13 15V13C13 11.3431 14.3431 10 16 10C17.6569 10 19 11.3431 19 13V15H13Z"
          fill="white"
        />
        <rect x="11" y="15" width="10" height="9" rx="1" fill="white" />
        <circle cx="16" cy="19" r="1.5" fill="currentColor" />
      </svg>
      <AnimatePresence>
        {!hideText && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold tracking-tight text-foreground whitespace-nowrap overflow-hidden"
          >
            Resto<span className="text-brand-orange">Eat</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
