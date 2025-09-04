"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiChip, HiCog, HiServer, HiSparkles, HiLogout } from "react-icons/hi";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showCircuit, setShowCircuit] = useState(false);
  const [user, setUser] = useState(null); // Replace with actual user state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Circuit board animation effect
    const circuitInterval = setInterval(() => {
      setShowCircuit(true);
      setTimeout(() => setShowCircuit(false), 1500);
    }, 6000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(circuitInterval);
    };
  }, []);

  const logout = () => {
    setUser(null);
  };

  if (loading) return null; // Optionally, add a loading state

  return (
    <header
      className={`
      fixed top-0 w-full z-50 px-6 py-4 transition-all duration-500
      bg-gradient-to-r from-red-900 via-red-800 to-red-900
      ${scrolled ? "shadow-2xl py-3" : "shadow-lg"}
    `}
    >
      {/* Circuit board background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-circuit-pattern bg-cover bg-center" />

        {showCircuit && (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-red-400 animate-circuit-line" />
            <div className="absolute top-8 left-0 w-full h-1 bg-red-400 animate-circuit-line delay-300" />
            <div className="absolute top-16 right-0 w-1 h-16 bg-red-400 animate-circuit-vertical" />
          </>
        )}
      </div>

      {/* Binary rain effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="binary-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="binary-digit text-red-300">
              {Math.round(Math.random())}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute -inset-2 bg-white/10 rounded-lg blur-md group-hover:blur-lg transition-all duration-300" />
            <div className="relative flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-red-600 to-red-800 shadow-lg border border-red-500">
              <HiChip className="text-white text-2xl" />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              <span className="text-red-300">LS CUP</span>
            </h1>
            <p className="text-xs text-white/80 font-mono tracking-wider">
              CITE LEADERSHIP PLATFORM
            </p>
          </div>
        </Link>

        {/* User profile/action */}
        <div>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center space-x-1 border border-red-400"
          >
            <span>Start Training</span>
            <HiSparkles className="text-sm" />
          </Link>
        </div>
      </div>

      {/* Scanner line effect */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-scan" />

      <style jsx>{`
        .bg-circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M25 25h50v50H25z' stroke='%23fff' stroke-width='0.5' fill='none'/%3E%3Cpath d='M25 25l50 50M75 25L25 75' stroke='%23fff' stroke-width='0.3'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23fff' stroke-width='0.2'/%3E%3C/svg%3E");
        }

        .binary-rain {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 200%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }

        .binary-digit {
          animation: fall linear infinite;
          animation-duration: ${Math.random() * 5 + 5}s;
          animation-delay: ${Math.random() * 3}s;
          opacity: ${Math.random() * 0.5 + 0.2};
          font-size: 0.6rem;
          font-family: monospace;
        }

        @keyframes fall {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(calc(100vh + 100px));
          }
        }

        @keyframes circuit-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes circuit-vertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-circuit-line {
          animation: circuit-line 1.5s ease-in-out;
        }

        .animate-circuit-vertical {
          animation: circuit-vertical 1s ease-in-out;
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </header>
  );
}
