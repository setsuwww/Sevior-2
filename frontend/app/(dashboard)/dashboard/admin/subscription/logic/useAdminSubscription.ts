"use client";

import { useEffect, useMemo, useState } from "react";

import {
    fetchSubscription,
    SubscriptionResponse,
} from "@/_lib/services/admin/subscription.service";

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
            return "border-olive-200 bg-olive-100 text-olive-600";

        default:
            return "border-olive-200 bg-olive-50 text-olive-600";
    }
}

export function useAdminSubscription() {
    const [data, setData] = useState<SubscriptionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSubscription = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const result = await fetchSubscription();

                setData(result);
            } catch (err) {
                console.error(
                    "Failed to fetch subscription:",
                    err,
                );

                setError(
                    "Gagal mengambil data subscription. Silakan coba lagi.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadSubscription();
    }, []);

    const subscription = data?.subscription ?? null;

    const isExpired =
        subscription?.status.toLowerCase() === "expired" ||
        (subscription?.days_remaining ?? 0) <= 0;

    const recentPayments = useMemo(() => {
        if (!data?.payments) {
            return [];
        }

        return [...data.payments]
            .sort((a, b) => {
                const dateA = new Date(
                    a.payment_date ?? a.created_at,
                ).getTime();

                const dateB = new Date(
                    b.payment_date ?? b.created_at,
                ).getTime();

                return dateB - dateA;
            })
            .slice(0, 5);
    }, [data?.payments]);

    return {
        data,
        subscription,
        recentPayments,
        isExpired,
        isLoading,
        error,
    };
}
