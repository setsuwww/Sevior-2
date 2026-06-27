"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/_stores/auth";
import AppSidebar from "@/_components/layout/AppSidebar";
import AppHeader from "@/_components/layout/AppHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, restoreAuth } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const restoredUser = await restoreAuth();
                if (!restoredUser) {
                    router.push("/login");
                    return;
                }

                // Basic role-based route guard
                const role = restoredUser.Role;
                if (pathname.startsWith("/superadmin") && role !== "SUPER_ADMIN") {
                    router.push("/login");
                } else if (pathname.startsWith("/admin") && role !== "ADMIN") {
                    router.push("/login");
                } else if (pathname.startsWith("/developer") && role !== "DEVELOPER") {
                    router.push("/login");
                } else if (pathname.startsWith("/client") && role !== "CLIENT") {
                    router.push("/login");
                } else {
                    setIsChecking(false);
                }
            } catch (error) {
                router.push("/login");
            }
        };

        verifyAuth();
    }, [pathname, restoreAuth, router]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
            </div>
        );
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
