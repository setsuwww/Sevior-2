import { api } from "@/_lib/axiosInstance";

export interface Developer {
    ID: number;
    AgencyID: number | null;
    FullName: string;
    Email: string;
    Phone: string;
    ProfileImage: string;
    Biography: string;
    Role: "DEVELOPER";
    IsActive: boolean;
    LastLogin: string | null;
    CreatedAt: string;
    UpdatedAt: string;
}

interface DeveloperResponse {
    id: number;
    agency_id: number | null;
    full_name: string;
    email: string;
    phone: string;
    profile_image: string;
    biography: string;
    role: string;
    is_active: boolean;
    last_login: string | null;
    created_at: string;
    updated_at: string;
}

interface DevelopersResponse {
    developers: DeveloperResponse[];
}

export interface CreateDeveloperPayload {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    biography: string;
}

export interface UpdateDeveloperPayload {
    full_name: string;
    email: string;
    phone: string;
    biography: string;
    is_active: boolean;
}

function mapDeveloper(data: DeveloperResponse): Developer {
    return {
        ID: data.id,
        AgencyID: data.agency_id,
        FullName: data.full_name,
        Email: data.email,
        Phone: data.phone,
        ProfileImage: data.profile_image,
        Biography: data.biography,
        Role: "DEVELOPER",
        IsActive: data.is_active,
        LastLogin: data.last_login,
        CreatedAt: data.created_at,
        UpdatedAt: data.updated_at,
    };
}

export async function fetchDevelopers(): Promise<Developer[]> {
    const response = await api.get<DevelopersResponse>(
        "/api/v1/agency-admin/developers"
    );

    return response.data.developers.map(mapDeveloper);
}

export async function fetchDeveloperById(
    id: number
): Promise<Developer> {
    const response = await api.get<DeveloperResponse>(
        `/api/v1/agency-admin/developers/${id}`
    );

    return mapDeveloper(response.data);
}

export async function createDeveloper(
    payload: CreateDeveloperPayload
): Promise<Developer> {
    const response = await api.post<DeveloperResponse>(
        "/api/v1/agency-admin/developers",
        payload
    );

    return mapDeveloper(response.data);
}

export async function updateDeveloper(
    id: number,
    payload: UpdateDeveloperPayload
): Promise<Developer> {
    const response = await api.patch<DeveloperResponse>(
        `/api/v1/agency-admin/developers/${id}`,
        payload
    );

    return mapDeveloper(response.data);
}

export async function deleteDeveloper(
    id: number
): Promise<void> {
    await api.delete(
        `/api/v1/agency-admin/developers/${id}`
    );
}
