"use client";

import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    Receipt,
    WalletCards,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
    fetchSubscription,
    SubscriptionResponse,
} from "@/_lib/services/admin/subscription.service";
import { Badge } from "@/_components/ui/badge";
import { PLAN_COLORS } from "@/_constants/theme/subscription";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatDate(value: string | null) {
    if (!value) return "-";

    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(value));
}

function getStatusClass(status: string) {
    switch (status.toLowerCase()) {
        case "active":
        case "paid":
            return "bg-emerald-50 text-emerald-700 border-emerald-300";

        case "pending":
            return "bg-amber-50 text-amber-700 border-amber-200";

        case "cancelled":
        case "failed":
            return "bg-red-50 text-red-700 border-red-200";

        case "expired":
            return "bg-slate-100 text-slate-600 border-slate-200";

        default:
            return "bg-slate-50 text-slate-600 border-slate-200";
    }
}

export default function SubscriptionPage() {
    const [data, setData] = useState<SubscriptionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSubscription = async () => {
            try {
                setIsLoading(true);

                const result = await fetchSubscription();

                setData(result);
            } catch (err) {
                console.error("Failed to fetch subscription:", err);

                setError(
                    "Gagal mengambil data subscription. Silakan coba lagi."
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadSubscription();
    }, []);

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 w-48 rounded bg-slate-200" />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="h-32 rounded-sm bg-slate-200" />
                        <div className="h-32 rounded-sm bg-slate-200" />
                        <div className="h-32 rounded-sm bg-slate-200" />
                    </div>

                    <div className="h-72 rounded-sm bg-slate-200" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="rounded-sm border border-red-200 bg-red-50 p-5">
                    <p className="font-medium text-red-700">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const subscription = data.subscription;
    const billing = data.billing;

    const isExpired =
        subscription.status.toLowerCase() === "expired" ||
        subscription.days_remaining <= 0;

    return (
        <div className="space-y-6 p-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Subscription
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Kelola subscription dan lihat informasi billing agency
                    kamu.
                </p>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Current Plan */}
                <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Current Plan
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                {subscription.plan}
                            </h2>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-teal-50">
                            <CreditCard className="h-5 w-5 text-teal-600" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <Badge
                            className={`inline-flex rounded-sm border text-xs font-medium ${getStatusClass(
                                subscription.status
                            )}`}
                        >
                            {subscription.status}
                        </Badge>
                    </div>
                </div>

                {/* Remaining */}
                <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Remaining
                            </p>

                            <h2
                                className={`mt-1 text-2xl font-bold ${isExpired
                                    ? "text-red-600"
                                    : "text-slate-900"
                                    }`}
                            >
                                {isExpired
                                    ? "Expired"
                                    : `${subscription.days_remaining} Days`}
                            </h2>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-amber-50">
                            <Clock3 className="h-5 w-5 text-amber-600" />
                        </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                        Expires on {formatDate(subscription.end_date)}
                    </p>
                </div>

                {/* Price */}
                <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Subscription Price
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                {formatCurrency(subscription.price)}
                            </h2>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-blue-50">
                            <WalletCards className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                        Current subscription price
                    </p>
                </div>
            </div>

            {/* Subscription Detail */}
            <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-teal-50">
                            <CalendarDays className="h-5 w-5 text-teal-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Subscription Details
                            </h2>

                            <p className="text-sm text-slate-500">
                                Informasi periode subscription kamu
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-3">

                    <div>
                        <p className="text-sm text-slate-500">
                            Plan
                        </p>

                        <span className={`${PLAN_COLORS[subscription.plan]} text-sm font-semibold`}>
                            {subscription.plan}
                        </span>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Start Date
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {formatDate(subscription.start_date)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            End Date
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {formatDate(subscription.end_date)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Billing */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Latest Billing */}
                <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 p-5">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-yellow-50 rounded-sm flex items-center justify-center">
                                <Receipt className="h-5 w-5 text-yellow-500" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Latest Billing
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Pembayaran terakhir
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        {billing ? (
                            <div className="space-y-4">

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Amount
                                    </span>

                                    <span className="font-semibold text-slate-900">
                                        {formatCurrency(
                                            billing.amount
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Status
                                    </span>

                                    <span
                                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                            billing.status
                                        )}`}
                                    >
                                        {billing.status}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Payment Date
                                    </span>

                                    <span className="text-sm font-medium text-slate-900">
                                        {formatDate(
                                            billing.payment_date
                                        )}
                                    </span>
                                </div>

                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <Receipt className="mx-auto h-8 w-8 text-slate-300" />

                                <p className="mt-2 text-sm text-slate-500">
                                    Belum ada data pembayaran.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status */}
                <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 p-5">
                        <h2 className="font-semibold text-slate-900">
                            Subscription Status
                        </h2>

                        <p className="text-sm text-slate-500">
                            Status subscription agency saat ini
                        </p>
                    </div>

                    <div className="flex items-center gap-4 p-5">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${isExpired
                                ? "bg-red-50"
                                : "bg-emerald-50"
                                }`}
                        >
                            <CheckCircle2
                                className={`h-5 w-5 ${isExpired
                                    ? "text-red-600"
                                    : "text-emerald-600"
                                    }`}
                            />
                        </div>

                        <div>
                            <p className="font-semibold text-slate-900">
                                {isExpired
                                    ? "Subscription Expired"
                                    : "Subscription Active"}
                            </p>

                            <p className="text-sm text-slate-500">
                                {isExpired
                                    ? "Silakan perpanjang subscription agency."
                                    : `Subscription kamu masih aktif selama ${subscription.days_remaining} hari.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="rounded-sm border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 p-5">
                    <h2 className="font-semibold text-slate-900">
                        Payment History
                    </h2>

                    <p className="text-sm text-slate-500">
                        Riwayat pembayaran subscription
                    </p>
                </div>

                {data.payments.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-slate-500">
                            Belum ada riwayat pembayaran.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">

                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50">
                                    <th className="px-5 py-3 text-left font-medium text-slate-500">
                                        ID
                                    </th>

                                    <th className="px-5 py-3 text-left font-medium text-slate-500">
                                        Amount
                                    </th>

                                    <th className="px-5 py-3 text-left font-medium text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-left font-medium text-slate-500">
                                        Payment Date
                                    </th>

                                    <th className="px-5 py-3 text-left font-medium text-slate-500">
                                        Created
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.payments.map((payment) => (
                                    <tr
                                        key={payment.id}
                                        className="border-b border-slate-100 last:border-0"
                                    >
                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            #{payment.id}
                                        </td>

                                        <td className="px-5 py-4 text-slate-700">
                                            {formatCurrency(
                                                payment.amount
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                    payment.status
                                                )}`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {formatDate(
                                                payment.payment_date
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-slate-600">
                                            {formatDate(
                                                payment.created_at
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
