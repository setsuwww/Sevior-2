import ProtectedRoute from "@/_components/ux/ProtectedRoute";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            {children}
        </ProtectedRoute>
    );
}
