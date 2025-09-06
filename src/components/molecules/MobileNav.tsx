"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HiMenu,
  HiX,
  HiHome,
  HiUser,
  HiBookOpen,
  HiChartBar,
  HiCog,
} from "react-icons/hi";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: HiHome },
    { href: "/practice", label: "Practice", icon: HiBookOpen },
    { href: "/drills", label: "Drills", icon: HiChartBar },
    { href: "/advocacy", label: "Advocacy", icon: HiUser },
    { href: "/user", label: "Profile", icon: HiCog },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-lg shadow-lg"
      >
        <HiMenu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-600 to-red-700 text-white">
              <h2 className="text-lg font-semibold">LS-Cup Trainer</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-red-700 rounded"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <Link
                href="/login"
                className="block w-full text-center py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
