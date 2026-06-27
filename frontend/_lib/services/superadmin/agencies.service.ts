import { axiosInstance } from "@/_lib/axiosInstance";

export interface Agency {
  id: number;
  name: string;
  is_active: boolean;
  owner?: { full_name: string; email: string };
  subscription?: { status: string; plan: string };
  created_at: string;
  updated_at: string;
}

export interface GetAgenciesResponse {
  data: Agency[];
  total: number;
  page: number;
  limit: number;
}

class AgenciesService {
  async getAll(params: { page: number; limit: number; search?: string; subscription?: string; sort?: string }): Promise<GetAgenciesResponse> {
    const response = await axiosInstance.get('/superadmin/agencies', { params });
    return response.data;
  }

  async getById(id: number): Promise<Agency> {
    const response = await axiosInstance.get(`/superadmin/agencies/${id}`);
    return response.data;
  }

  async updateStatus(id: number, isActive: boolean): Promise<void> {
    await axiosInstance.patch(`/superadmin/agencies/${id}/status`, { is_active: isActive });
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/superadmin/agencies/${id}`);
  }
}

export const superadminAgenciesService = new AgenciesService();
