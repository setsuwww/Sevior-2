import { api } from "@/services/auth.service";

export interface UserProfile {
    ID: number;
    FullName: string;
    Email: string;
    Phone: string;
    ProfileImage: string;
    Biography: string;
    Role: string;
    IsActive: boolean;
    LastLogin: string | null;

    Agency: Agency | null;
}

export interface Agency {
    ID: number;
    AgencyName: string;
    AgencySlug: string;
    OwnerName: string;
    Contact: string;
    Email: string;
    Description: string;
    Website: string;
    Location: string;
    ProfileImage: string;
    Status: string;
    SubscriptionPlan: string;
    SubscriptionStatus: string;
}

export async function fetchUserProfile(): Promise<UserProfile> {
    const response = await api.get("/api/v1/agency-admin/profile");

    const data = response.data;

    return {
        ID: data.user.id,
        FullName: data.user.full_name,
        Email: data.user.email,
        Phone: data.user.phone,
        ProfileImage: data.user.profile_image,
        Biography: data.user.biography,
        Role: data.user.role,
        IsActive: data.user.is_active,
        LastLogin: data.user.last_login,
        Agency: data.agency,
    };
}
