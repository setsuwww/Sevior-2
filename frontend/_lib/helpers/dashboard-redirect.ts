import { PlatformRole } from "@/types/User";

export function getDashboardPath(role: PlatformRole) {
    switch (role) {
        case "CLIENT":
            return "/dashboard/client";

        case "ADMIN":
            return "/dashboard/admin";

        case "SUPER_ADMIN":
            return "/dashboard/superadmin";

        case "DEVELOPER":
            return "/dashboard/developer";

        default:
            return "/dashboard";
    }
}
