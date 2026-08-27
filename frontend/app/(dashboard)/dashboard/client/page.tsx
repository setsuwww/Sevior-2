"use client";

import { FolderKanban, Store, Send, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/_components/ui/button";
import { useAuth } from "@/providers/AuthProvider";

export default function ClientDashboard() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-olive-50/50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-olive-200 border-t-teal-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-olive-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-olive-900 tracking-tight mb-2">
                        Welcome Back, {user?.FullName || "User"}!
                    </h1>

                    <p className="text-olive-500">
                        Here's what's happening with your projects today.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-md border border-olive-300 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-olive-500 uppercase tracking-wider mb-1">
                                Active Projects
                            </p>
                            <p className="text-3xl font-black text-olive-900">
                                4
                            </p>
                        </div>

                        <div className="w-12 h-12 bg-teal-50 rounded-md flex items-center justify-center border border-teal-100">
                            <FolderKanban className="w-6 h-6 text-teal-600" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-md border border-olive-300 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-olive-500 uppercase tracking-wider mb-1">
                                Pending Requests
                            </p>

                            <p className="text-3xl font-black text-olive-900">
                                1
                            </p>
                        </div>

                        <div className="w-12 h-12 bg-amber-50 rounded-md flex items-center justify-center border border-amber-100">
                            <Send className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-md border border-olive-300 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-olive-500 uppercase tracking-wider mb-1">
                                Total Spent
                            </p>

                            <p className="text-3xl font-black text-olive-900">
                                $24.5k
                            </p>
                        </div>

                        <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center border border-blue-100">
                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Next Action */}
                    <div className="bg-gradient-to-br from-olive-900 to-olive-800 rounded-md p-8 lg:p-10 text-white relative overflow-hidden shadow-md">

                        <div className="absolute -top-4 -right-10 p-12 opacity-5">
                            <Store className="w-64 h-64" />
                        </div>

                        <div className="relative z-10 max-w-sm">
                            <h2 className="text-2xl lg:text-3xl font-black tracking-tight mb-4 leading-tight">
                                Ready to build something amazing?
                            </h2>

                            <p className="text-olive-300 mb-8 leading-relaxed">
                                Discover top-rated development agencies perfectly
                                matched for your next project.
                            </p>

                            <Link href="/dashboard/client/agencies">
                                <Button className="bg-teal-500 hover:bg-teal-600 text-white h-12 px-8 rounded-md font-bold shadow-sm text-base">
                                    Browse Marketplace
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-md border border-olive-200 shadow-sm p-6 lg:p-8">

                        <h2 className="text-xl font-bold text-olive-900 mb-6">
                            Quick Actions
                        </h2>

                        <div className="space-y-4">

                            <Link
                                href="/dashboard/client/requests"
                                className="flex items-center p-4 bg-olive-50 rounded-2xl border border-olive-100 hover:border-olive-200 hover:bg-olive-100/50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-olive-500 group-hover:text-teal-600 transition-colors">
                                    <Send className="w-5 h-5" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-olive-900">
                                        Check Request Status
                                    </h3>

                                    <p className="text-sm text-olive-500">
                                        You have 1 pending proposal
                                    </p>
                                </div>

                                <ArrowRight className="w-5 h-5 text-olive-400 group-hover:text-olive-600" />
                            </Link>

                            <Link
                                href="/dashboard/client/invoices"
                                className="flex items-center p-4 bg-olive-50 rounded-2xl border border-olive-100 hover:border-olive-200 hover:bg-olive-100/50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-olive-500 group-hover:text-teal-600 transition-colors">
                                    <FolderKanban className="w-5 h-5" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-olive-900">
                                        Review Invoices
                                    </h3>

                                    <p className="text-sm text-olive-500">
                                        1 invoice due next week
                                    </p>
                                </div>

                                <ArrowRight className="w-5 h-5 text-olive-400 group-hover:text-olive-600" />
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
