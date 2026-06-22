import ProtectedRoute from "@/_components/ProtectedRoute";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            {children}
        </ProtectedRoute>
    );
}
