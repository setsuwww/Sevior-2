import { axiosInstance } from "@/_lib/axiosInstance";

export interface ActivityLog {
  id: number;
  user_id: number;
  agency_id: number;
  action: string;
  details: string;
  ip_address?: string;
  user?: { full_name: string };
  agency?: { name: string };
  created_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  is_active: boolean;
  created_by: number;
  author?: { full_name: string };
  created_at: string;
  updated_at: string;
}

export interface GetAuditLogsResponse {
  data: ActivityLog[];
  total: number;
  page: number;
  limit: number;
}

export interface GetAnnouncementsResponse {
  data: Announcement[];
  total: number;
  page: number;
  limit: number;
}

class SettingsService {
  // Maintenance
  async getMaintenanceMode(): Promise<boolean> {
    const response = await axiosInstance.get('/superadmin/settings/maintenance');
    return response.data.is_active;
  }

  async toggleMaintenanceMode(isActive: boolean): Promise<void> {
    await axiosInstance.post('/superadmin/settings/maintenance', { is_active: isActive });
  }

  // Audit Logs
  async getAuditLogs(params: { page: number; limit: number; search?: string }): Promise<GetAuditLogsResponse> {
    const response = await axiosInstance.get('/superadmin/settings/audit-logs', { params });
    return response.data;
  }

  // Announcements
  async getAnnouncements(params: { page: number; limit: number }): Promise<GetAnnouncementsResponse> {
    const response = await axiosInstance.get('/superadmin/settings/announcements', { params });
    return response.data;
  }

  async createAnnouncement(title: string, content: string): Promise<void> {
    await axiosInstance.post('/superadmin/settings/announcements', { title, content });
  }

  async updateAnnouncement(id: number, updates: Partial<Announcement>): Promise<void> {
    await axiosInstance.patch(`/superadmin/settings/announcements/${id}`, updates);
  }

  async deleteAnnouncement(id: number): Promise<void> {
    await axiosInstance.delete(`/superadmin/settings/announcements/${id}`);
  }
}

export const superadminSettingsService = new SettingsService();
