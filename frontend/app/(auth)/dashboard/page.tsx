"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/_stores/auth";

import AdminDashboard from "@/_components/common/dashboards/AdminDashboard";
import UserDashboard from "@/_components/common/dashboards/UserDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { user, restoreAuth, fetchCurrentUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await restoreAuth();              // restore dari localStorage
      await fetchCurrentUser();         // fetch dari backend
      setLoading(false);
    };
    init();
  }, [restoreAuth, fetchCurrentUser]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");            // redirect kalau ga ada user
    }
  }, [loading, user, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  switch (user.Role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return <AdminDashboard />;
    case "DEVELOPER":
      return <div className="p-8 text-2xl font-bold">Berhasil Login sebagai Developer!</div>;
    case "CLIENT":
      return <div className="p-8 text-2xl font-bold">Berhasil Login sebagai Client!</div>;
    default:
      return <div>Unauthorized: Unknown role {user.Role}</div>;
  }
}
