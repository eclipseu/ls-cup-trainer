import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/molecules/Header";
import Sidebar from "@/components/molecules/Sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
