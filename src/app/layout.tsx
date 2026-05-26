import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoVida | Concientización de Agua y Energía",
  description: "Proyecto universitario académico para la concientización sobre el ahorro de agua y energía, medición de hábitos y análisis de datos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100 font-sans min-h-screen flex flex-col`}
      >
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Academic Global Footer */}
        <footer className="bg-zinc-900/40 border-t border-zinc-800/80 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-zinc-400 text-sm">
            <p className="font-semibold text-emerald-400">EcoVida — Proyecto de Extensión Universitaria</p>
            <p className="mt-1">Concientización y Acción por el Consumo Responsable de Recursos</p>
            <p className="mt-3 text-xs text-zinc-500">© 2026. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
