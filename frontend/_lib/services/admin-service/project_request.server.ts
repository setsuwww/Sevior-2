import "server-only";

import { serverFetch } from "@/_lib/serverFetch";
import type {
    ProjectRequest,
    ProjectRequestDetail,
    ProjectRequestListResponse,
    ProjectRequestCountResponse,
} from "@/types/project";

export async function getProjectRequests(): Promise<ProjectRequest[]> {
    const response =
        await serverFetch<ProjectRequestListResponse>(
            "/api/v1/agency-admin/project-requests"
        );

    return response.data;
}

export async function getProjectRequest(
    id: number
): Promise<ProjectRequestDetail> {
    const response =
        await serverFetch<{ data: ProjectRequestDetail }>(
            `/api/v1/agency-admin/project-requests/${id}`
        );

    return response.data;
}

export async function getPendingProjectRequestCount(): Promise<number> {
    const response =
        await serverFetch<ProjectRequestCountResponse>(
            "/api/v1/agency-admin/project-requests/count"
        );

    return response.count;
}
