"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            router.replace("/login");
            return;
        }

        if (user.Role !== "CLIENT") {
            router.replace("/dashboard");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-olive-200 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (user.Role !== "CLIENT") {
        return null;
    }

    return <>{children}</>;
}
