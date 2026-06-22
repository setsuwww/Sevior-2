"use client";

import { useAuthStore } from "@/_stores/auth";
import { Users, Building2, Activity, ArrowUpRight, Globe } from "lucide-react";
import { Card, CardContent } from "@/_components/ui/card";

export default function SuperAdminDashboard() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Welcome back, {user?.FullName?.split(" ")[0] || "Admin"}
                </h1>
                <p className="text-gray-500 text-md max-w-2xl">
                    Here is what's happening across the Sevior ecosystem today.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Total Agencies */}
                <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative h-full bg-white p-6 rounded-[15px]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center border border-teal-100">
                                <Building2 className="w-6 h-6 text-teal-600" />
                            </div>
                            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                                <ArrowUpRight className="w-3 h-3" />
                                <span>12%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">Total Agencies</p>
                            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">142</h3>
                        </div>
                    </div>
                </div>

                {/* Active Users */}
                <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative h-full bg-white p-6 rounded-[15px]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                                <ArrowUpRight className="w-3 h-3" />
                                <span>8%</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">Total Active Users</p>
                            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">8,492</h3>
                        </div>
                    </div>
                </div>

                {/* Server Status */}
                <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative h-full bg-white p-6 rounded-[15px]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100">
                                <Activity className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold text-emerald-600">Optimal</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">System Health</p>
                            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">99.9%</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
                {/* Recent Activity */}
                <Card className="xl:col-span-2 bg-white border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900">Platform Activity</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">Last 24 hours</span>
                        </div>
                    </div>
                    <CardContent className="p-0">
                        <div className="h-72 w-full flex items-center justify-center bg-gradient-to-b from-gray-50/50 to-white">
                            <div className="text-center">
                                <Globe className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                <p className="text-gray-400 text-sm font-medium">Activity graph will be rendered here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* New Agencies */}
                <Card className="bg-white border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900">Recent Agencies</h3>
                        <button className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">View All</button>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-center">
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-teal-300 group-hover:bg-teal-50 transition-colors shadow-sm">
                                            <span className="text-gray-600 font-bold text-sm group-hover:text-teal-700 transition-colors">A{i}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Agency {i}</p>
                                            <p className="text-xs font-medium text-gray-500">{i * 2} mins ago</p>
                                        </div>
                                    </div>
                                    <div className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold border border-teal-100 shadow-sm">
                                        New
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    );
}
