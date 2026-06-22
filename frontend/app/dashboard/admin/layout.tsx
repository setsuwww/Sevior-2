import ProtectedRoute from "@/_components/ux/ProtectedRoute";
import AdminSidebarLayout from "@/_components/AdminSidebarLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <AdminSidebarLayout>
                {children}
            </AdminSidebarLayout>
        </ProtectedRoute>
    );
}
