import { api } from "@/_lib/axiosInstance";
import { SubscriptionPlan } from "@/app/(auth)/register/agency/types";

export interface SubscriptionSummary {
    id: number;
    plan: SubscriptionPlan;
    price: number;
    status: string;
    start_date: string;
    end_date: string;
    days_remaining: number;
}

export interface BillingSummary {
    amount: number;
    status: string;
    payment_date: string | null;
}

export interface PaymentSummary {
    id: number;
    amount: number;
    status: string;
    payment_date: string | null;
    created_at: string;
}

export interface SubscriptionResponse {
    subscription: SubscriptionSummary;
    billing: BillingSummary | null;
    payments: PaymentSummary[];
}

export async function fetchSubscription(): Promise<SubscriptionResponse> {
    const response = await api.get<SubscriptionResponse>(
        "/api/v1/agency-admin/subscription"
    );

    return response.data;
}
