"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/_stores/auth";

export default function DashboardPage() {
  const router = useRouter();
  const { user, restoreAuth, fetchCurrentUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await restoreAuth();
      await fetchCurrentUser();
      setLoading(false);
    };
    init();
  }, [restoreAuth, fetchCurrentUser]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.Role === "SUPER_ADMIN") {
        router.push("/dashboard/superadmin");
      } else {
        // Since we are focusing only on SUPER_ADMIN for now, others are unauthorized
        router.push("/login"); 
      }
    }
  }, [loading, user, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
        <p className="mt-4 text-sm text-gray-500">Redirecting...</p>
      </div>
    </div>
  );
}
