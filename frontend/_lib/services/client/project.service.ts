import { api } from "@/_lib/axiosInstance";

export interface CreateProjectRequestPayload {
    agencyId: number;
    title: string;
    description: string;
    category?: string;
    budgetMin?: number;
    budgetMax?: number;
    deadline?: string;
    attachmentUrl?: string;
}

export interface ProjectRequest {
    id: number;
    agencyId: number;
    clientId: number;
    title: string;
    description: string;
    category: string;
    budgetMin: number | null;
    budgetMax: number | null;
    deadline: string | null;
    attachmentUrl: string;
    status: string;
    createdAt: string;
}

interface ProjectRequestResponse {
    message: string;
    data: ProjectRequest;
}

export async function createProjectRequest(
    payload: CreateProjectRequestPayload
): Promise<ProjectRequest> {
    const response = await api.post<ProjectRequestResponse>(
        "/api/v1/client/project-requests",
        payload
    );

    return response.data.data;
}
