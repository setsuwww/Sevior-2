"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/_stores/auth";
import {
    Menu,
    X,
    LogOut,
    ShieldAlert,
    ChevronDown,
    ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";
import { superadminLink } from "@/_constants/sidebar-link-content/superadmin";

export default function SuperAdminSidebarLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
    const pathname = usePathname();
    const { user, resetAuth } = useAuthStore();

    const handleLogout = () => {
        resetAuth();
        window.location.href = "/login";
    };

    const toggleCollapsible = (collapsible: string) => {
        if (openCollapsible === collapsible) {
            setOpenCollapsible(null);
        } else {
            setOpenCollapsible(collapsible);
        }
    };

    const isChildActive = (children?: { link: string }[]) => {
        if (!children) return false;
        return children.some(child => pathname === child.link || pathname.startsWith(child.link + '/'));
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans selection:bg-teal-500/30">

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-all"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                    } flex flex-col`}
            >
                {/* Sidebar Header (Logo) */}
                <div className="h-20 flex items-center px-8 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100 shadow-sm">
                            <ShieldAlert className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Sevior</h1>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
                    {superadminLink.map((item) => {
                        const Icon = item.icon;

                        // Handle links without children
                        if (!item.child) {
                            const isActive = pathname === item.link || (item.link !== "/dashboard/superadmin" && pathname.startsWith(item.link || ""));
                            return (
                                <Link
                                    key={item.label}
                                    href={item.link || "#"}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? "text-teal-700 bg-teal-50 font-semibold"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium"
                                        }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-600 rounded-r-full shadow-sm"></div>
                                    )}
                                    {Icon && <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-teal-600" : "text-gray-400 group-hover:text-gray-600"}`} />}
                                    <span className="text-sm">{item.label}</span>
                                </Link>
                            );
                        }

                        // Handle collapsible menus
                        const hasActiveChild = isChildActive(item.child);
                        const isOpen = openCollapsible === item.collapsible || hasActiveChild;

                        return (
                            <div key={item.label} className="space-y-1">
                                <button
                                    onClick={() => toggleCollapsible(item.collapsible || "")}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${hasActiveChild || isOpen ? "bg-gray-50 text-gray-900 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        {Icon && <Icon className={`w-5 h-5 ${hasActiveChild || isOpen ? "text-teal-600" : "text-gray-400 group-hover:text-gray-600"}`} />}
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className={`w-4 h-4 ${hasActiveChild ? "text-teal-600" : "text-gray-400"}`} />
                                    ) : (
                                        <ChevronRight className={`w-4 h-4 text-gray-400 group-hover:text-gray-600`} />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="pl-12 pr-4 py-1 space-y-1">
                                        {item.child.map((subItem) => {
                                            const isSubActive = pathname === subItem.link || pathname.startsWith(subItem.link + '/');
                                            return (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.link}
                                                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isSubActive
                                                        ? "text-teal-700 font-semibold bg-teal-50"
                                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 font-medium"
                                                        }`}
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Sidebar Footer (Logout) */}
                <div className="p-6 border-t border-gray-100 bg-white">
                    <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-100 mb-4">
                        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center shadow-sm text-white font-bold text-sm">
                            {user?.FullName?.charAt(0) || "S"}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 truncate">
                                {user?.FullName || "Super Administrator"}
                            </p>
                            <p className="text-xs text-gray-500 truncate font-medium">
                                {user?.Email || "admin@sevior.com"}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 relative">

                {/* Top Header */}
                <header className="h-20 sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 z-30">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-4 lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                        <h2 className="text-xl font-bold text-gray-900 hidden sm:block tracking-tight">
                            {/* We can do a reverse lookup to find the title, or just a generic one */}
                            Overview
                        </h2>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative cursor-pointer group">
                            <div className="relative w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-teal-300 transition-colors">
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth bg-gray-50/50">
                    <div className="max-w-10xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

        </div>
    );
}
