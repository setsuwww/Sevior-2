"use client";

import Link from "next/link";
import { Button } from "@/_components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Star } from "lucide-react";

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

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-600 tracking-tight leading-[1.2] mb-6">
              Agency Manager more Easy with <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-teal-600">Sevior.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Empower your developers, impress your clients, and scale your operations seamlessly with our all-in-one role-based management system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/login?tab=register">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-white text-lg font-semibold bg-gradient-to-r from-slate-800 hover:from-slate-700 to-teal-600 hover:to-teal-500 border-2 border-white ring ring-teal-600">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300">
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center"><Star className="w-4 h-4 mr-2 text-amber-500" /> High Quality System-information</div>
            </div>
          </div>

          {/* Graphic / Mockup */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative animate-in fade-in slide-in-from-right-8 duration-600 delay-200">
            {/* Main Mockup Window */}
            <div className="group relative rounded-2xl bg-white border border-slate-300 hover:border-slate-600 hover:scale-105 duration-500 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] overflow-hidden transform transition-transform duration-500">
              {/* Window Header */}
              <div className="bg-slate-100 border-b border-slate-300 px-4 py-3 flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400 group-hover:bg-red-600 transition-colors duration-500 border border-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 group-hover:bg-yellow-600 transition-colors duration-500 border border-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 group-hover:bg-green-600 transition-colors duration-500 border border-green-500"></div>
              </div>
              {/* Window Body Mockup */}
              <div className="p-6 bg-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="h-4 w-32 bg-slate-300 group-hover:bg-teal-500/40 transition-colors duration-500 rounded-full mb-2"></div>
                    <div className="h-8 w-48 bg-slate-300 group-hover:bg-teal-500/40 transition-colors duration-500 rounded-lg"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 rounded-xl bg-slate-300 p-4 flex flex-col justify-between group-hover:bg-teal-600/20 transition-colors duration-500">
                      <div className="w-8 h-8 rounded-full bg-slate-400 group-hover:bg-teal-600/40 transition-colors duration-500"></div>
                      <div className="h-2 w-16 bg-slate-400 group-hover:bg-teal-600/40 transition-colors duration-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <div className="h-48 rounded-xl bg-gradient-to-r from-slate-300 to-slate-400/40 group-hover:from-teal-600/30 group-hover:to-teal-600/20 transition-colors duration-500 border border-slate-300 relative overflow-hidden">
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
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-sm shadow-lg border border-slate-400 flex items-center space-x-4 z-10" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 rounded-full bg-radial from-emerald-400/20 to-emerald-200/5 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 uppercase">System Status</p>
                <p className="text-xs font-bold text-slate-500">All Systems Operational</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
