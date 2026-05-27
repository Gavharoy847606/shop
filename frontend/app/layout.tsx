'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { LogOut, User, ChevronDown } from "lucide-react";
import "./globals.css";
import { useAuthStore } from "./store/useAuthStore";
import LoginModal from "./components/loginModel";

const inter = Inter({ subsets: ["latin"] });

// ─── Navbar (Client Component) ───
function Navbar() {
  const { user, logout } = useAuthStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roleBadgeColor = {
    admin: 'text-red-400 bg-red-500/10 border-red-500/20',
    manager: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    employee: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-emerald-500/10 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="text-xl font-bold tracking-wider bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent flex-shrink-0">
              STUFFUS<span className="text-emerald-400 font-light">.ERP</span>
            </Link>

            {/* Menu */}
            <div className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                Ombor
              </Link>
              <Link href="/orders" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                Buyurtmalar
              </Link>
              {user?.role === 'admin' && (
                <Link href="/clients" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  Mijozlar
                </Link>
              )}
            </div>

            {/* Auth */}
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(v => !v)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-xs font-bold text-slate-200 leading-none">{user.name}</div>
                      <div className={`text-[9px] font-bold border px-1 rounded mt-0.5 inline-block ${roleBadgeColor[user.role]}`}>
                        {user.role.toUpperCase()}
                      </div>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
                      <div className="px-3 py-2 border-b border-slate-800">
                        <div className="text-xs text-slate-400">{user.email}</div>
                      </div>
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Chiqish
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300"
                >
                  Kirish
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen font-sans antialiased`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}