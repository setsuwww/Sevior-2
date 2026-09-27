import { api } from "@/_lib/axiosInstance";
import { serverFetch } from "@/_lib/serverFetch";
import { Project } from "@/types/project";

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
