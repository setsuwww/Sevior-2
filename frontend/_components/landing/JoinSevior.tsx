"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function JoinSevior() {
  return (
    <section className="relative py-24 sm:py-32 bg-white dark:bg-black overflow-hidden border-t border-slate-100 dark:border-zinc-900">

      {/* Decorative subtle radial background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl opacity-50 dark:opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Side: 3D Logo */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-end">

            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes float-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              .animate-float-slow {
                animation: float-slow 10s ease-in-out infinite;
              }
            `}} />

            {/* Glowing orb behind the logo for 3D depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-[80px] -z-10" />

            <div className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[650px] lg:h-[650px] xl:w-[750px] xl:h-[750px] animate-float-slow transition-transform duration-700 rotate-[-12deg] scale-180 hover:scale-175 z-10 -ml-10 lg:-ml-20">
              <Image
                src="/3.png"
                alt="Sevior 3D Logo"
                fill
                className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_30px_30px_rgba(20,184,166,0.15)]"
                priority
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left">
            <span className="text-sm font-bold tracking-widest text-teal-600 dark:text-teal-500 uppercase mb-4">
              INTERESTED?
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              Build your agency.<br />
              Manage your projects.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-teal-600 dark:from-teal-400 dark:to-teal-600">
                Scale without limits.
              </span>
            </h2>

            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-[550px] mx-auto lg:mx-0 leading-relaxed mb-10">
              Join thousands of developers, agencies, and clients building better software with Sevior. Manage projects, collaborate with your team, handle invoices, and grow your agency from one powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
              >
                Register Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#about"
                className="w-full sm:w-auto flex items-center justify-center bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-700 dark:text-slate-300 font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-zinc-800"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
