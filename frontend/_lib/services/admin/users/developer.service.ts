import { api } from "@/_lib/axiosInstance";

export interface Developer {
    ID: number;
    AgencyID: number | null;
    FullName: string;
    Email: string;
    Phone: string;
    ProfileImage: string;
    Biography: string;
    ProfileTheme: string;
    Role: "DEVELOPER";
    IsActive: boolean;
    LastLogin: string | null;
    CreatedAt: string;
    UpdatedAt: string;
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

export async function fetchDevelopers(): Promise<Developer[]> {
    const response = await api.get<Developer[]>(
        "/api/v1/agency-admin/developers"
    );

    return response.data;
}

export async function fetchDeveloperById(
    id: number
): Promise<Developer> {
    const response = await api.get<Developer>(
        `/api/v1/agency-admin/developers/${id}`
    );

    return response.data;
}

export async function createDeveloper(
    payload: CreateDeveloperPayload
): Promise<Developer> {
    const response = await api.post<Developer>(
        "/api/v1/agency-admin/developers",
        payload
    );

    return response.data;
}

export async function updateDeveloper(
    id: number,
    payload: UpdateDeveloperPayload
): Promise<Developer> {
    const response = await api.patch<Developer>(
        `/api/v1/agency-admin/developers/${id}`,
        payload
    );

    return response.data;
}

export async function deleteDeveloper(
    id: number
): Promise<void> {
    await api.delete(
        `/api/v1/agency-admin/developers/${id}`
    );
}
