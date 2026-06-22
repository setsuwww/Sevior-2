import ProtectedRoute from "@/_components/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            {children}
        </ProtectedRoute>
    );
}
