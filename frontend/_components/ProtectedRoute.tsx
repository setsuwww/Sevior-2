"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/_stores/auth";
import { PlatformRole } from "@/types/User";

export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: PlatformRole[] }) {
    const router = useRouter();
    const { user, token, restoreAuth, fetchCurrentUser } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            let currentUser = user;
            if (!currentUser) {
                currentUser = await restoreAuth();
            }
            if (!currentUser && token) {
                currentUser = await fetchCurrentUser();
            }

            if (!currentUser) {
                router.push("/login");
                return;
            }

            if (allowedRoles && !allowedRoles.includes(currentUser.Role)) {
                router.push("/dashboard");
                return;
            }

            setLoading(false);
        };
        checkAuth();
    }, [user, router, allowedRoles, restoreAuth, fetchCurrentUser]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return <>{children}</>;
}
