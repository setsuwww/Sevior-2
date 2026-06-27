import { axiosInstance } from "@/_lib/axiosInstance";

export const adminClientService = {
    getClients: async (params: { search?: string; sort?: string; page?: number; limit?: number }) => {
        const response = await axiosInstance.get('/api/v1/agency-admin/users/clients', { params });
        return response.data;
    },
    getClient: async (id: number) => {
        const response = await axiosInstance.get(`/api/v1/agency-admin/users/clients/${id}`);
        return response.data;
    }
};
