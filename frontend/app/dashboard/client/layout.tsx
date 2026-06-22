import ProtectedRoute from "@/_components/ux/ProtectedRoute";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={["CLIENT"]}>
            {children}
        </ProtectedRoute>
    );
}
