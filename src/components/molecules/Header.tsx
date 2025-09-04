"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiChip, HiSparkles } from "react-icons/hi";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showCircuit, setShowCircuit] = useState(false);
  const [loading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    // Circuit board animation effect
    const circuitInterval = setInterval(() => {
      setShowCircuit(true);
      setTimeout(() => setShowCircuit(false), 1500);
    }, 6000);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(circuitInterval);
    };
  }, []);

  // placeholder

  if (loading) return null; // Optionally, add a loading state

  // Avoid window access during SSR
  const winW = typeof window !== "undefined" ? window.innerWidth : 0;
  const winH = typeof window !== "undefined" ? window.innerHeight : 0;

  return (
    <>
      <header
        className={`
        fixed top-0 w-full z-50 px-6 py-4 transition-all duration-500
        bg-gradient-to-r from-red-900/95 via-red-800/95 to-red-900/95 backdrop-blur-sm
        ${scrolled ? "shadow-2xl py-3" : "shadow-lg"}
      `}
      >
        {/* Aurora gradient accents (subtle) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-24 -left-16 w-64 h-64 rounded-full bg-rose-400/10 blur-xl animate-float-slow"
            style={{
              transform: `translate(${(mouse.x - winW / 2) * 0.006}px, ${
                (mouse.y - winH / 2) * 0.006
              }px)`,
            }}
          />
          <div
            className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full bg-red-300/10 blur-xl animate-float-slower"
            style={{
              transform: `translate(${(mouse.x - winW / 2) * -0.005}px, ${
                (mouse.y - winH / 2) * -0.005
              }px)`,
            }}
          />
          <div className="absolute top-10 right-1/3 w-44 h-44 rounded-full bg-amber-200/10 blur-lg animate-float" />
        </div>
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

        {/* Soft texture overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-15 mix-blend-soft-light">
          <div className="noise-layer" />
        </div>

        <div className="relative flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo and title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Thin rotating ring */}
              <div className="absolute -inset-3 rounded-xl bg-[conic-gradient(from_90deg,transparent_0_60%,rgba(255,255,255,0.28)_60%_62%,transparent_62%_100%)] opacity-30 animate-spin-slow" />
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
              className="relative px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-700 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center space-x-1 border border-red-400 overflow-hidden"
            >
              <span className="relative z-10">Start Training</span>
              <HiSparkles className="relative z-10 text-sm" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </Link>
          </div>
        </div>

        {/* Scanner line effect */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-scan" />

        <style jsx>{`
          .bg-circuit-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M25 25h50v50H25z' stroke='%23fff' stroke-width='0.5' fill='none'/%3E%3Cpath d='M25 25l50 50M75 25L25 75' stroke='%23fff' stroke-width='0.3'/%3E%3Cpath d='M0 50h100M50 0v100' stroke='%23fff' stroke-width='0.2'/%3E%3C/svg%3E");
          }

          .noise-layer {
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
            background-size: cover;
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

          .animate-spin-slow {
            animation: spin 12s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .animate-float {
            animation: float 12s ease-in-out infinite alternate;
          }
          .animate-float-slow {
            animation: float 16s ease-in-out infinite alternate;
          }
          .animate-float-slower {
            animation: float 20s ease-in-out infinite alternate;
          }
          @keyframes float {
            from {
              transform: translateY(-10px);
            }
            to {
              transform: translateY(10px);
            }
          }

          .animate-shimmer {
            animation: shimmer 2.8s linear infinite;
          }
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </header>
    </>
  );
}
