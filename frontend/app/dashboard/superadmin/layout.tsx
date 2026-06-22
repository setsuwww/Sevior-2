import ProtectedRoute from "@/_components/ux/ProtectedRoute";
import SuperAdminSidebarLayout from "@/_components/SuperAdminSidebarLayout";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <SuperAdminSidebarLayout>
                {children}
            </SuperAdminSidebarLayout>
        </ProtectedRoute>
    );
}
