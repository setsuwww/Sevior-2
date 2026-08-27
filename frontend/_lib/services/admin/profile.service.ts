import {
    PROFILE_THEMES,
    ProfileTheme,
    isProfileTheme,
} from "@/_constants/theme/profile";
import { api } from "@/_lib/axiosInstance";
import { isPlatformRole } from "@/_lib/helpers/role-helper";
import { PlatformRole } from "@/types/User";

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
    ProfileTheme: ProfileTheme;
    Biography: string;
    Role: PlatformRole;
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
        profile_theme: string;
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
    profile_theme: ProfileTheme;

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

interface UploadImageResponse {
    profile_image: string;
}

function mapProfile(data: ProfileResponse): UserProfile {
    if (!isPlatformRole(data.user.role)) {
        throw new Error(`Invalid platform role: ${data.user.role}`);
    }

    if (!isProfileTheme(data.user.profile_theme)) {
        throw new Error(
            `Invalid profile theme: ${data.user.profile_theme}`
        );
    }

    return {
        ID: data.user.id,
        FullName: data.user.full_name,
        Email: data.user.email,
        Phone: data.user.phone,
        ProfileImage: data.user.profile_image,

        ProfileTheme: data.user.profile_theme,

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
                SubscriptionStatus: data.agency.subscription_status,
            }
            : null,
    };
}

export async function fetchUserProfile(): Promise<UserProfile> {
    const response = await api.get<ProfileResponse>("/api/v1/agency-admin/profile");

    return mapProfile(response.data);
}

export async function updateUserProfile(payload: UpdateProfilePayload): Promise<void> {
    await api.patch("/api/v1/agency-admin/profile", payload);
}

export async function changeUserPassword(payload: ChangePasswordPayload): Promise<void> {
    await api.patch("/api/v1/agency-admin/profile/password", payload);
}

export async function uploadUserProfileImage(file: File): Promise<UploadImageResponse> {
    const formData = new FormData();

    formData.append("profile_image", file);

    const response = await api.patch<UploadImageResponse>(
        "/api/v1/agency-admin/profile/image",
        formData
    );

    return response.data;
}

export async function uploadAgencyProfileImage(file: File): Promise<UploadImageResponse> {
    const formData = new FormData();

    formData.append("profile_image", file);

    const response = await api.patch<UploadImageResponse>(
        "/api/v1/agency-admin/profile/agency-image",
        formData
    );

    return response.data;
}
