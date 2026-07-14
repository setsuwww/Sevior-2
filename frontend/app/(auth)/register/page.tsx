"use client";

import Image from "next/image";

import Link from "next/link";
import { Building2, User, Star, Check, ArrowLeft } from "lucide-react";

export default function RegisterSelectionPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 selection:bg-teal-500/30">
            {/* Back Navigation */}
            <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-10">
                <Link 
                    href="/" 
                    className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md p-1 -ml-1"
                    aria-label="Return to homepage"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to Home
                </Link>
            </div>

            {/* Top Section */}
            <div className="text-center mb-12 flex flex-col items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-2 overflow-hidden">
                    <Image src="/1.png" alt="Sevior Logo" fill className="object-cover" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Join Sevior.</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">Choose your account type to get started.</p>
            </div>

            {/* Layout */}
            <div className="grid md:grid-cols-2 max-w-4xl w-full mx-auto items-center">

                {/* Agency Owner Card */}
                <Link href="/register/agency" className="group relative block w-full outline-none">
                    <div className="bg-gradient-to-r from-slate-900 to-teal-900 text-white rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col shadow-xl transition-all duration-300 md:group-hover:-translate-y-2 md:group-hover:shadow-2xl relative overflow-hidden border border-white/10 ring-2 ring-transparent group-focus:ring-teal-500">
                        <div className="w-14 h-14 bg-white/10 rounded-sm flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
                            <Building2 className="w-7 h-7 text-yellow-400" />
                        </div>

                        <h2 className="text-2xl font-bold mb-3 tracking-tight">Agency Owner</h2>

                        <div className="space-y-3 my-8 flex-1">
                            {[
                                "Manage developers",
                                "Manage client projects",
                                "Create invoices",
                                "Track project progress",
                                "Build your software agency"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center text-teal-50">
                                    <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-3 shrink-0">
                                        <Check className="w-3.5 h-3.5 text-teal-300" />
                                    </div>
                                    <span className="text-base font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <button className="w-full bg-white text-slate-900 hover:bg-slate-50 font-bold py-4 px-8 rounded-xl transition-colors shadow-sm text-base flex items-center justify-center">
                                Continue as Agency owner
                            </button>
                        </div>
                    </div>
                </Link>

                {/* Client Card */}
                <Link href="/register/client" className="group relative block w-full outline-none">
                    <div className="bg-white dark:bg-slate-900 border border-slate-400 dark:border-slate-800 rounded-r-3xl p-8 flex flex-col shadow-sm transition-all duration-300 md:group-hover:-translate-y-1 md:group-hover:shadow-md ring-2 ring-transparent group-focus:ring-blue-500">

                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-sm flex items-center justify-center mb-8">
                            <User className="w-7 h-7" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Client</h2>

                        <div className="space-y-3 my-8 flex-1">
                            {[
                                "Find agencies",
                                "Submit project requests",
                                "Submit task requests",
                                "Track project and task requests"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center text-slate-600 dark:text-slate-400">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mr-3 shrink-0">
                                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-base font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-sm text-base flex items-center justify-center">
                                Continue as Client
                            </button>
                        </div>
                    </div>
                </Link>

            </div>

            <p className="mt-12 text-slate-500 dark:text-slate-400 font-medium">
                Already have an account? <Link href="/login" className="text-teal-600 dark:text-teal-500 font-bold hover:underline">Log In</Link>
            </p>
        </div>
    );
}
