import React from "react";
import { FolderKanban, Store, Send, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/_components/ui/button";

export default function ClientDashboard() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back, Sarah!</h1>
                    <p className="text-slate-500">Here's what's happening with your projects today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Active Projects</p>
                            <p className="text-3xl font-black text-slate-900">4</p>
                        </div>
                        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100">
                            <FolderKanban className="w-6 h-6 text-teal-600" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Requests</p>
                            <p className="text-3xl font-black text-slate-900">1</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                            <Send className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Spent</p>
                            <p className="text-3xl font-black text-slate-900">$24.5k</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Next Action Box */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden shadow-md">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Store className="w-64 h-64" />
                        </div>
                        <div className="relative z-10 max-w-sm">
                            <h2 className="text-2xl lg:text-3xl font-black tracking-tight mb-4 leading-tight">Ready to build something amazing?</h2>
                            <p className="text-slate-300 mb-8 leading-relaxed">Discover top-rated development agencies perfectly matched for your next project.</p>
                            <Link href="/dashboard/client/agencies">
                                <Button className="bg-teal-500 hover:bg-teal-600 text-white h-12 px-8 rounded-xl font-bold shadow-sm text-base">
                                    Browse Marketplace <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Access List */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
                        <div className="space-y-4">
                            <Link href="/dashboard/client/requests" className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-100/50 transition-colors group">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-slate-500 group-hover:text-teal-600 transition-colors">
                                    <Send className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-slate-900">Check Request Status</h3>
                                    <p className="text-sm text-slate-500">You have 1 pending proposal</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                            </Link>
                            <Link href="/dashboard/client/invoices" className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-100/50 transition-colors group">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-slate-500 group-hover:text-teal-600 transition-colors">
                                    <FolderKanban className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-slate-900">Review Invoices</h3>
                                    <p className="text-sm text-slate-500">1 invoice due next week</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
