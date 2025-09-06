import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/molecules/Header";
import Sidebar from "@/components/molecules/Sidebar";
import MobileNav from "@/components/molecules/MobileNav";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen mobile-tap-highlight">
        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Mobile Navigation */}
        <MobileNav />

        <div className="flex flex-1">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 bg-white mobile-safe-area animate-fadeInUp md:pt-20">
            <div className="page-enter-active">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
