import "server-only";

import { serverFetch } from "@/_lib/serverFetch";
import type { Project, ProjectRequest } from "@/types/project";

interface ProjectRequestListResponse {
    data: ProjectRequest[];
}

interface ProjectListResponse {
    data: Project[];
}

export async function getMyProjectRequests(view: "pending" | "history" = "pending"): Promise<ProjectRequest[]> {
    const response =
        await serverFetch<ProjectRequestListResponse>(
            `/api/v1/client/project-requests?view=${view}`
        );

    return response.data;
}

export async function getMyProjects(): Promise<Project[]> {
    const response =
        await serverFetch<ProjectListResponse>(
            "/api/v1/client/projects"
        );

    return response.data;
}
