import { axiosInstance } from "@/_lib/axiosInstance";

export const adminDeveloperService = {
    getDevelopers: async (params: { search?: string; status?: string; sort?: string; page?: number; limit?: number }) => {
        const response = await axiosInstance.get('/api/v1/agency-admin/users/developers', { params });
        return response.data;
    },
    getDeveloper: async (id: number) => {
        const response = await axiosInstance.get(`/api/v1/agency-admin/users/developers/${id}`);
        return response.data;
    },
    createDeveloper: async (data: any) => {
        const response = await axiosInstance.post(`/api/v1/agency-admin/users/developers`, data);
        return response.data;
    },
    updateDeveloper: async (id: number, data: any) => {
        const response = await axiosInstance.patch(`/api/v1/agency-admin/users/developers/${id}`, data);
        return response.data;
    },
    deleteDeveloper: async (id: number) => {
        const response = await axiosInstance.delete(`/api/v1/agency-admin/users/developers/${id}`);
        return response.data;
    }
};
