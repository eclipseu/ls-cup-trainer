"use client";

import Link from "next/link";
import { useState } from "react";
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
} from "react-icons/hi";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  activeItem: string;
  setActiveItem: (href: string) => void;
  onClick: () => void;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-green-600 text-white"
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
    bg-white p-6 flex flex-col border-r border-green-100 shadow-lg
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 p-4">
          <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
            <HiAcademicCap className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold text-green-800">LS Cup Practice</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-green-50">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
            <HiUser size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">John Doe</p>
            <p className="text-sm text-green-600">Premium Account</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-grow">
          <NavItem
            href="/"
            icon={<HiHome size={20} />}
            label="Home"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/dashboard"
            icon={<HiChartBar size={20} />}
            label="Dashboard"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/practice"
            icon={<HiAcademicCap size={20} />}
            label="Practice"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/advocacy"
            icon={<HiBookOpen size={20} />}
            label="Advocacy"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/drills"
            icon={<HiFire size={20} />}
            label="Drills"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/mock"
            icon={<HiMicrophone size={20} />}
            label="Mock Session"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={toggleSidebar}
          />
          <NavItem
            href="/admin"
            icon={<HiCog size={20} />}
            label="Admin"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onClick={toggleSidebar}
          />
        </nav>

        {/* Footer */}
        <div className="pt-6 border-t border-green-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Online</span>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({
  href,
  icon,
  label,
  activeItem,
  setActiveItem,
  onClick,
}: NavItemProps) {
  const isActive = activeItem === href;

  return (
    <Link href={href} legacyBehavior>
      <a
        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer
          ${
            isActive
              ? "bg-green-500 text-white shadow-lg"
              : "text-gray-600 hover:bg-green-50 hover:text-green-600"
          }`}
        onClick={() => {
          setActiveItem(href);
          onClick();
        }}
      >
        <span className={`${isActive ? "text-white" : "text-green-500"}`}>
          {icon}
        </span>
        <span className="font-medium">{label}</span>
        {isActive && (
          <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
        )}
      </a>
    </Link>
  );
}
