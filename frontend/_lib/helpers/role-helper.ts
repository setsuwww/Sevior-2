import { PlatformRole } from "@/types/User";

const PLATFORM_ROLES: PlatformRole[] = [
    "SUPER_ADMIN",
    "ADMIN",
    "DEVELOPER",
    "CLIENT",
    "USER",
];

export function isPlatformRole(role: string): role is PlatformRole {
    return PLATFORM_ROLES.includes(role as PlatformRole);
}
