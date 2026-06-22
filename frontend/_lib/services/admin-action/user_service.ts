"use client";

import { axiosInstance } from "../axiosInstance";
import { authService } from "../auth";
import { CreateUserPayload, UpdateUserPayload, User } from "@/types/User";

export class UserService {
  private apiUrl: string;

  constructor(baseUrl?: string) {
    this.apiUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  }

  async getAll(params?: { page?: number; limit?: number; role?: string; search?: string }): Promise<{ data: User[], meta: any }> {
    const res = await axiosInstance.get(`/admin/users`, {
      headers: authService.getAuthHeader(),
      params,
    });
    return {
      data: res.data.data || [],
      meta: res.data.meta || {},
    };
  }

  async getById(id: number): Promise<User | null> {
    try {
      const res = await axiosInstance.get(`/admin/users/${id}`, {
        headers: authService.getAuthHeader(),
      });
      return res.data.user;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      return null;
    }
  }

  async create(payload: CreateUserPayload): Promise<User> {
    const res = await axiosInstance.post(`/admin/users`, payload, {
      headers: authService.getAuthHeader(),
    });
    return res.data;
  }

  // Update user
  async update(id: number, payload: UpdateUserPayload): Promise<User> {
    const res = await axiosInstance.put(`/admin/users/${id}`, payload, {
      headers: authService.getAuthHeader(),
    });
    return res.data;
  }

  // Delete user
  async delete(id: number): Promise<boolean> {
    await axiosInstance.delete(`/admin/users/${id}`, {
      headers: authService.getAuthHeader(),
    });
    return true;
  }

  async activate(id: number): Promise<User> {
    return this.update(id, { isActive: true });
  }

  async deactivate(id: number): Promise<User> {
    return this.update(id, { isActive: false });
  }
}
