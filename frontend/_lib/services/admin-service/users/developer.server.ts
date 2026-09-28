import { serverFetch } from "@/_lib/serverFetch";

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

export async function getDevelopers(): Promise<Developer[]> {
    const response = await serverFetch<Developer[]>(
        "/api/v1/agency-admin/developers"
    );

    return response;
}

export async function getDeveloperById(
    id: number
): Promise<Developer> {
    const response = await serverFetch<Developer>(
        `/api/v1/agency-admin/developers/${id}`
    );

    return response;
}
