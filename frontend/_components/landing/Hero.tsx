"use client";

import Link from "next/link";
import { Button } from "@/_components/ui/button";
import { ArrowRight, Sparkles, LayoutDashboard, Users, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100/80 via-teal-100/40 to-transparent text-teal-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-teal-300">
              <Sparkles className="w-4 h-4" />
              <span className="text-teal-600">The Next Generation SaaS Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-600 tracking-tight leading-[1.2] mb-6">
              Agency Manager more Easy with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Sevior.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Empower your developers, impress your clients, and scale your operations seamlessly with our all-in-one role-based management system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/login?tab=register">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold shadow-lg shadow-teal-600/20 hover:shadow-teal-600/40 transition-all">
                  Start for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300">
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" /> Secure</div>
              <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-blue-500" /> Multi-Tenant</div>
              <div className="flex items-center"><LayoutDashboard className="w-4 h-4 mr-2 text-purple-500" /> Analytics</div>
            </div>
          </div>

          {/* Graphic / Mockup */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            {/* Main Mockup Window */}
            <div className="relative rounded-2xl bg-white border border-gray-500 shadow-2xl overflow-hidden transform transition-transform duration-500">
              {/* Window Header */}
              <div className="bg-gray-800 border-b border-gray-500 px-4 py-3 flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              {/* Window Body Mockup */}
              <div className="p-6 bg-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="h-4 w-32 bg-gray-600 rounded-full mb-2"></div>
                    <div className="h-8 w-48 bg-gray-600 rounded-lg"></div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-teal-800/60 flex items-center justify-center">
                    <div className="w-5 h-5 bg-teal-400 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 rounded-xl bg-gray-600 border border-gray-700 p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                      <div className="h-2 w-16 bg-gray-700 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <div className="h-48 rounded-xl bg-gradient-to-r from-gray-800 to-gray-800/60 border border-gray-700 relative overflow-hidden">
                  {/* Mock graph line */}
                  <svg className="absolute bottom-0 w-full h-24 text-teal-500/20 dark:text-teal-500/10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,100 C20,80 40,90 60,40 C80,10 90,30 100,20 L100,100 Z" fill="currentColor" />
                  </svg>
                  <svg className="absolute bottom-0 w-full h-24 text-teal-500" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,100 C20,80 40,90 60,40 C80,10 90,30 100,20" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-600 flex items-center space-x-4 z-10" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 rounded-full bg-radial from-emerald-400/20 to-emerald-200/5 dark:bg-emerald-900/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-200 uppercase tracking-wider">System Status</p>
                <p className="text-xs font-bold text-gray-400">All Systems Operational</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
