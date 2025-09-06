"use client";

import Link from "next/link";
import { HiChip } from "react-icons/hi";

export default function MobileHeader() {
  return (
    <header className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-red-900 via-red-800 to-red-900 shadow-md md:hidden z-50 fixed top-0 left-0">
      <Link href="/" className="flex items-center space-x-2">
        <span className="flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-br from-red-600 to-red-800 shadow border border-red-500">
          <HiChip className="text-white text-xl" />
        </span>
        <span className="text-lg font-bold text-white tracking-tight">
          <span className="text-red-300">LS CUP</span>
        </span>
      </Link>
      <Link
        href="/dashboard"
        className="px-3 py-1 rounded bg-red-500 text-white font-semibold text-sm shadow hover:bg-red-600 border border-red-400"
      >
        Training
      </Link>
    </header>
  );
}
