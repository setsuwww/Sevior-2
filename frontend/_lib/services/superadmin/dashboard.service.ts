import { axiosInstance } from "@/_lib/axiosInstance";

export interface DashboardSummary {
  total_agencies: number;
  total_admins: number;
  total_developers: number;
  total_clients: number;
  total_active_projects: number;
  total_completed_projects: number;
  monthly_revenue: number;
  active_subscriptions: number;
  recent_activities: any[];
}

class DashboardService {
  async getSummary(): Promise<DashboardSummary> {
    const response = await axiosInstance.get('/superadmin/dashboard');
    return response.data;
  }
}

export const superadminDashboardService = new DashboardService();
