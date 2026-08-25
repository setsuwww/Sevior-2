import { api } from "@/services/auth.service";

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

interface ProfileResponse {
    user: {
        id: number;
        full_name: string;
        email: string;
        phone: string;
        profile_image: string;
        biography: string;
        role: string;
        is_active: boolean;
        last_login: string | null;
    };

    agency: {
        id: number;
        agency_name: string;
        agency_slug: string;
        owner_name: string;
        contact: string;
        email: string;
        description: string;
        website: string;
        location: string;
        profile_image: string;
        status: string;
        subscription_plan: string;
        subscription_status: string;
    } | null;
}

interface UpdateProfilePayload {
    full_name: string;
    email: string;
    phone: string;
    biography: string;

    agency_name?: string;
    agency_slug?: string;
    contact?: string;
    agency_email?: string;
    description?: string;
    website?: string;
    location?: string;
}

interface ChangePasswordPayload {
    current_password: string;
    new_password: string;
}

function mapProfile(data: ProfileResponse): UserProfile {
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

        Agency: data.agency
            ? {
                ID: data.agency.id,
                AgencyName: data.agency.agency_name,
                AgencySlug: data.agency.agency_slug,
                OwnerName: data.agency.owner_name,
                Contact: data.agency.contact,
                Email: data.agency.email,
                Description: data.agency.description,
                Website: data.agency.website,
                Location: data.agency.location,
                ProfileImage: data.agency.profile_image,
                Status: data.agency.status,
                SubscriptionPlan: data.agency.subscription_plan,
                SubscriptionStatus:
                    data.agency.subscription_status,
            }
            : null,
    };
}

export async function fetchUserProfile(): Promise<UserProfile> {
    const response = await api.get<ProfileResponse>("/api/v1/agency-admin/profile");

    return mapProfile(response.data);
}

export async function updateUserProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    const response = await api.patch<ProfileResponse>("/api/v1/agency-admin/profile", payload);

    return mapProfile(response.data);
}

export async function changeUserPassword(payload: ChangePasswordPayload): Promise<void> {
    await api.patch("/api/v1/agency-admin/profile/password", payload);
}
