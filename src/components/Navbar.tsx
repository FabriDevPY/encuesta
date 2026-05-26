"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Droplet, Zap, BarChart3, ClipboardList, Home, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Agua", path: "/agua", icon: Droplet },
    { name: "Energía", path: "/energia", icon: Zap },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/80 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-emerald-400 font-bold text-lg hover:opacity-95 transition-all">
              <div className="flex -space-x-1">
                <Droplet className="h-6 w-6 text-blue-500 fill-blue-500/20" />
                <Zap className="h-6 w-6 text-amber-500 fill-amber-500/20" />
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent hidden sm:inline-block">
                EcoVida
              </span>
              <span className="text-zinc-500 text-xs font-normal border-l border-zinc-800 pl-2 hidden md:inline-block">
                Proyecto Universitario
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 shadow-sm"
                      : "text-zinc-400 hover:bg-zinc-900/50 hover:text-emerald-400"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="pl-4 border-l border-zinc-800 ml-2">
              <Link
                href="/encuesta"
                className={`flex items-center space-x-1 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  pathname === "/encuesta"
                    ? "bg-teal-500 text-zinc-950 shadow-md shadow-teal-500/20 scale-105 font-bold"
                    : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 font-bold"
                }`}
              >
                <ClipboardList className="h-4 w-4" />
                <span>Ir a Encuesta</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-900" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "bg-emerald-950/40 text-emerald-400 font-semibold border border-emerald-500/20"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-emerald-400"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 pb-2 px-3 border-t border-zinc-900 mt-2">
              <Link
                href="/encuesta"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center space-x-2 w-full py-3 rounded-full text-base font-semibold transition-all ${
                  pathname === "/encuesta"
                    ? "bg-teal-500 text-zinc-950 shadow-md shadow-teal-500/20"
                    : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/10"
                }`}
              >
                <ClipboardList className="h-5 w-5" />
                <span>Ir a Encuesta</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
