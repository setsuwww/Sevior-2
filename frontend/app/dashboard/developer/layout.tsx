import ProtectedRoute from "@/_components/ux/ProtectedRoute";

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={["DEVELOPER"]}>
            {children}
        </ProtectedRoute>
    );
}
