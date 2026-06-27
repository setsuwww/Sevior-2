import { axiosInstance } from "@/_lib/axiosInstance";

export interface Subscription {
  id: number;
  agency_id: number;
  plan: string;
  price: number;
  status: string;
  start_date: string;
  end_date: string;
  agency?: { name: string };
  created_at: string;
  updated_at: string;
}

export interface GetSubscriptionsResponse {
  data: Subscription[];
  total: number;
  page: number;
  limit: number;
}

export interface PaymentStats {
  monthly_revenue: number;
  pending_revenue: number;
  total_paid: number;
}

class PaymentsService {
  async getSubscriptions(params: { page: number; limit: number; status?: string }): Promise<GetSubscriptionsResponse> {
    const response = await axiosInstance.get('/superadmin/payments/subscriptions', { params });
    return response.data;
  }

  async getStats(): Promise<PaymentStats> {
    const response = await axiosInstance.get('/superadmin/payments/stats');
    return response.data;
  }

  async markAsPaid(id: number): Promise<void> {
    await axiosInstance.post(`/superadmin/payments/subscriptions/${id}/pay`);
  }

  async cancelSubscription(id: number): Promise<void> {
    await axiosInstance.post(`/superadmin/payments/subscriptions/${id}/cancel`);
  }

  async extendSubscription(id: number, days: number): Promise<void> {
    await axiosInstance.post(`/superadmin/payments/subscriptions/${id}/extend`, { days });
  }
}

export const superadminPaymentsService = new PaymentsService();
