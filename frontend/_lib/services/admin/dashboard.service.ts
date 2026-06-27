import { axiosInstance } from "@/_lib/axiosInstance";

export const adminDashboardService = {
    getStats: async () => {
        const response = await axiosInstance.get('/api/v1/agency-admin/dashboard/stats');
        return response.data;
    }
};
