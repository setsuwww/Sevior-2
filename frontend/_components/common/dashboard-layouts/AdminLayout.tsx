import { ReactNode } from "react";
import AdminHeader from "../dashboard-headers/AdminHeader";
import AdminSidebar from "../dashboard-sidebars/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 px-6 py-4 overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
