"use client";

import { useMemo } from "react";

import type {
    SubscriptionResponse,
} from "@/_lib/services/admin-service/settings/subscription.server";

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatDate(value: string | null) {
    if (!value) return "-";

    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(value));
}

export function getStatusClass(status: string) {
    switch (status.toLowerCase()) {
        case "active":
        case "paid":
            return "border-emerald-200 bg-emerald-50 text-emerald-700";

        case "pending":
            return "border-amber-200 bg-amber-50 text-amber-700";

        case "cancelled":
        case "failed":
            return "border-red-200 bg-red-50 text-red-700";

        case "expired":
            return "border-gray-200 bg-gray-100 text-gray-600";

        default:
            return "border-gray-200 bg-gray-50 text-gray-600";
    }
}

export function useAdminSubscription(
    data: SubscriptionResponse
) {
    const subscription = data.subscription;

    const isExpired =
        subscription.status.toLowerCase() === "expired" ||
        subscription.days_remaining <= 0;

    const recentPayments = useMemo(() => {
        return [...data.payments]
            .sort((a, b) => {
                const dateA = new Date(
                    a.payment_date ?? a.created_at
                ).getTime();

                const dateB = new Date(
                    b.payment_date ?? b.created_at
                ).getTime();

                return dateB - dateA;
            })
            .slice(0, 5);
    }, [data.payments]);

    return {
        data,
        subscription,
        recentPayments,
        isExpired,
    };
}
