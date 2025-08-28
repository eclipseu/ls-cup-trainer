"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiAcademicCap, HiStar, HiSparkles } from "react-icons/hi";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Add sparkle effect intermittently
    const sparkleInterval = setInterval(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 2000);
    }, 8000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(sparkleInterval);
    };
  }, []);

  return (
    <header
      className={`
      fixed top-0 w-full z-50 px-6 py-4 transition-all duration-500
      bg-gradient-to-r from-green-700 via-green-600 to-emerald-500
      ${scrolled ? "shadow-2xl py-3" : "shadow-lg"}
    `}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {showSparkles && (
          <>
            <div className="absolute top-4 left-1/4 animate-ping">
              <HiSparkles className="text-yellow-300 text-xl" />
            </div>
            <div className="absolute top-2 right-1/3 animate-ping delay-300">
              <HiSparkles className="text-yellow-300 text-xl" />
            </div>
            <div className="absolute bottom-2 left-2/3 animate-ping delay-700">
              <HiSparkles className="text-yellow-300 text-xl" />
            </div>
          </>
        )}

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
      </div>

      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute -inset-2 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
              <HiAcademicCap className="text-white text-2xl" />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              LS CUP <span className="text-yellow-300">Trainer</span>
            </h1>
            <p className="text-xs text-white/80 font-light tracking-wider">
              Leadership Excellence Platform
            </p>
          </div>
        </Link>

        {/* User profile/action */}
        <div className="flex items-center space-x-4">
          <button className="hidden sm:block px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-sm transition-all hover:scale-105">
            Sign In
          </button>

          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-green-900 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center space-x-1">
            <span>Get Started</span>
            <HiStar className="text-sm" />
          </button>
        </div>
      </div>

      {/* Bottom border effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />
    </header>
  );
}
