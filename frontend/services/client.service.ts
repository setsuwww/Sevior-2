import { Client, ClientStats } from "../types/client";
import { axiosInstance } from "../_lib/axiosInstance";

export const clientService = {
    async getClients(
        search: string,
        statusFilter: string,
        sortBy: string,
        page: number,
        limit: number = 10
    ): Promise<{ data: Client[]; total: number; stats: ClientStats }> {
        const response = await axiosInstance.get("/agency-admin/users/clients", {
            params: {
                search,
                status: statusFilter !== "All" ? statusFilter : undefined,
                sort: sortBy,
                page,
                limit
            }
        });
        return response.data;
    },

    async getClientById(id: string): Promise<Client> {
        const response = await axiosInstance.get(`/agency-admin/users/clients/${id}`);
        return response.data;
    },

    async createClient(data: Partial<Client>): Promise<Client> {
        const response = await axiosInstance.post("/agency-admin/users/clients", data);
        return response.data;
    },

    async updateClient(id: string, data: Partial<Client>): Promise<Client> {
        const response = await axiosInstance.patch(`/agency-admin/users/clients/${id}`, data);
        return response.data;
    },

    async deleteClient(id: string): Promise<void> {
        await axiosInstance.delete(`/agency-admin/users/clients/${id}`);
    }
};
