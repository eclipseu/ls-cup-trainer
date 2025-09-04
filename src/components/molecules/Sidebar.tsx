"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiChartBar,
  HiAcademicCap,
  HiBookOpen,
  HiFire,
  HiMicrophone,
  HiCog,
  HiUser,
  HiX,
  HiMenu,
  HiLogout,
} from "react-icons/hi";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { logout } from "@/app/login/actions";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-red-600 text-white"
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed lg:static top-0 left-0 z-50 w-64 min-h-screen
    bg-white p-6 flex flex-col border-r border-red-100 shadow-lg
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 p-4">
          <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
            <HiAcademicCap className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold text-red-800">LS Cup Trainer</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-green-50">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            <HiUser size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800 truncate">
              {user ? user.email?.split("@")[0] : "Guest"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-grow">
          <NavItem
            href="/"
            icon={<HiHome size={20} />}
            label="Home"
            isActive={pathname === "/"}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/dashboard"
            icon={<HiChartBar size={20} />}
            label="Dashboard"
            isActive={pathname === "/dashboard"}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/practice"
            icon={<HiAcademicCap size={20} />}
            label="Practice"
            isActive={pathname === "/practice"}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/advocacy"
            icon={<HiBookOpen size={20} />}
            label="Advocacy"
            isActive={pathname === "/advocacy"}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/drills"
            icon={<HiFire size={20} />}
            label="Drills"
            isActive={pathname === "/drills"}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/mock"
            icon={<HiMicrophone size={20} />}
            label="Mock Session"
            isActive={pathname === "/mock"}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/user"
            icon={<HiUser size={20} />}
            label="User"
            isActive={pathname === "/user"}
            onClick={toggleSidebar}
          />
        </nav>

        {/* Footer */}
        <div className="pt-6 border-t border-green-100">
          <form action={logout}>
            <button className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer text-gray-600 hover:bg-red-50 w-full">
              <span className="text-red-500">
                <HiLogout size={20} />
              </span>
              <span className="font-medium">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

function NavItem({ href, icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer
        ${
          isActive
            ? "bg-red-500 text-white shadow-lg"
            : "text-gray-600 hover:bg-green-50 hover:text-red-600"
        }`}
    >
      <span className={`${isActive ? "text-white" : "text-red-500"}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
      {isActive && (
        <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
      )}
    </Link>
  );
}
