import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud ERP - Stuffus Shop",
  description: "Premium Logistics & Cloud ERP Tizimi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen font-sans antialiased`}>
        
        {/* ✨ Premium Glassmorphism Navbar */}
        <nav className="sticky top-0 z-50 w-full border-b border-emerald-500/10 bg-slate-950/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="text-xl font-bold tracking-wider bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">
                  STUFFUS<span className="text-emerald-400 font-light">.ERP</span>
                </Link>
              </div>

              {/* Menyu Havolalari */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-6">
                  <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300">
                    Bosh Sahifa
                  </Link>
                  <Link href="/orders" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300">
                    Buyurtmalar (Orders)
                  </Link>
                  <Link href="/clients" className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300">
                    Mijozlar (Clients)
                  </Link>
                </div>
              </div>

              {/* Login Status (Hozircha oddiy ko'rinishda) */}
              <div className="flex items-center">
                <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  Tizimga kirish
                </button>
              </div>

            </div>
          </div>
        </nav>

        {/* Asosiy Kontent */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

      </body>
    </html>
  );
}