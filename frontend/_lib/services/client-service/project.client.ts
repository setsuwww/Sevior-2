import { api } from "@/_lib/axiosInstance";

import type {
    ProjectRequest,
} from "@/types/project";

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

interface CreateProjectRequestResponse {
    message: string;
    data: ProjectRequest;
}

export async function createProjectRequest(
    payload: CreateProjectRequestPayload
): Promise<ProjectRequest> {
    const response =
        await api.post<CreateProjectRequestResponse>(
            "/api/v1/client/project-requests",
            payload
        );

    return response.data.data;
}
