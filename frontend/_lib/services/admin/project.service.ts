import { api } from "@/_lib/axiosInstance";
import { serverFetch } from "@/_lib/serverFetch";

export interface Project {
    id: number;
    agencyId: number;
    projectRequestId: number | null;
    clientId: number | null;
    title: string;
    description: string;
    budget: number | null;
    progress: number | null;
    currentPhase: string;
    startDate: string | null;
    endDate: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface ProjectResponse {
    data: Project[];
}

export async function fetchProjects(): Promise<Project[]> {
    const response = await serverFetch<ProjectResponse>(
        "/api/v1/agency-admin/projects"
    );

    return response.data;
}

export async function fetchProjectById(id: number): Promise<Project> {
    const response = await api.get<Project>(
        `/api/v1/agency-admin/projects/${id}`
    );

    return response.data;
}
