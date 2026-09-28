import { serverFetch } from "@/_lib/serverFetch";
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

export async function getSubscription(): Promise<SubscriptionResponse> {
    return serverFetch<SubscriptionResponse>(
        "/api/v1/agency-admin/subscription"
    );
}
