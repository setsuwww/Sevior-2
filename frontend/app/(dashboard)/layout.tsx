"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import AppSidebar from "@/_components/ui/layout/AppSidebar";
import AppHeader from "@/_components/ui/layout/AppHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated || !user) {
            router.replace("/login");
            return;
        }

        const role = user.Role;

        if (
            pathname.startsWith("/dashboard/superadmin") &&
            role !== "SUPER_ADMIN"
        ) {
            router.replace("/login");
            return;
        }

        if (
            pathname.startsWith("/dashboard/admin") &&
            role !== "ADMIN"
        ) {
            router.replace("/login");
            return;
        }

        if (
            pathname.startsWith("/dashboard/developer") &&
            role !== "DEVELOPER"
        ) {
            router.replace("/login");
            return;
        }

        if (
            pathname.startsWith("/dashboard/client") &&
            role !== "CLIENT"
        ) {
            router.replace("/login");
            return;
        }
    }, [isLoading, isAuthenticated, user, pathname, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600" />
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex font-sans selection:bg-teal-500/30">
            <AppSidebar />

            <div className="flex-1 flex flex-col min-w-0 relative">
                <AppHeader />

                <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth bg-gray-50/50">
                    <div className="max-w-10xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
