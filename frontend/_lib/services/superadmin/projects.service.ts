import { axiosInstance } from "@/_lib/axiosInstance";

export interface Project {
  id: number;
  name: string;
  status: string;
  budget: number;
  deadline: string;
  agency?: { name: string };
  client?: { full_name: string };
  created_at: string;
  updated_at: string;
}

export interface GetProjectsResponse {
  data: Project[];
  total: number;
  page: number;
  limit: number;
}

class ProjectsService {
  async getAll(params: { page: number; limit: number; search?: string; filter?: string; sort?: string }): Promise<GetProjectsResponse> {
    const response = await axiosInstance.get('/superadmin/projects', { params });
    return response.data;
  }

  async getById(id: number): Promise<Project> {
    const response = await axiosInstance.get(`/superadmin/projects/${id}`);
    return response.data;
  }
}

export const superadminProjectsService = new ProjectsService();
