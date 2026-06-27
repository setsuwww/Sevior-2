import { axiosInstance } from "@/_lib/axiosInstance";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  agency?: { name: string };
  created_at: string;
  updated_at: string;
}

export interface GetUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

class UsersService {
  async getAll(params: { page: number; limit: number; search?: string; role?: string; status?: string; sort?: string }): Promise<GetUsersResponse> {
    const response = await axiosInstance.get('/superadmin/users', { params });
    return response.data;
  }

  async getById(id: number): Promise<User> {
    const response = await axiosInstance.get(`/superadmin/users/${id}`);
    return response.data;
  }

  async updateStatus(id: number, isActive: boolean): Promise<void> {
    await axiosInstance.patch(`/superadmin/users/${id}/status`, { is_active: isActive });
  }

  async update(id: number, updates: Partial<User>): Promise<void> {
    await axiosInstance.patch(`/superadmin/users/${id}`, updates);
  }
}

export const superadminUsersService = new UsersService();
