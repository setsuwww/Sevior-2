import { Developer, DeveloperStats } from "../types/developer";
import { axiosInstance } from "../_lib/axiosInstance";

export const developerService = {
    async getDevelopers(
        search: string,
        statusFilter: string,
        sortBy: string,
        page: number,
        limit: number = 10
    ): Promise<{ data: Developer[]; total: number; stats: DeveloperStats }> {
        const response = await axiosInstance.get("/agency-admin/users/developers", {
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

    async getDeveloperById(id: string): Promise<Developer> {
        const response = await axiosInstance.get(`/agency-admin/users/developers/${id}`);
        return response.data;
    },

    async createDeveloper(data: Partial<Developer>): Promise<Developer> {
        const response = await axiosInstance.post("/agency-admin/users/developers", data);
        return response.data;
    },

    async updateDeveloper(id: string, data: Partial<Developer>): Promise<Developer> {
        const response = await axiosInstance.patch(`/agency-admin/users/developers/${id}`, data);
        return response.data;
    },

    async deleteDeveloper(id: string): Promise<void> {
        await axiosInstance.delete(`/agency-admin/users/developers/${id}`);
    }
};
