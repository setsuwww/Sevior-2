"use client";

import SubscriptionStats from "./components/SubscriptionStats";
import DueDateSubscription from "./components/DueDateSubscription";
import RecentPayments from "./components/RecentPayments";

import { useAdminSubscription } from "./logic/useAdminSubscription";

export default function SubscriptionPage() {
    const {
        data,
        subscription,
        recentPayments,
        isExpired,
        isLoading,
        error,
    } = useAdminSubscription();

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 w-48 rounded-sm bg-slate-200" />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="h-32 rounded-sm bg-slate-200" />
                        <div className="h-32 rounded-sm bg-slate-200" />
                        <div className="h-32 rounded-sm bg-slate-200" />
                    </div>

                    <div className="h-72 rounded-sm bg-slate-200" />
                    <div className="h-80 rounded-sm bg-slate-200" />
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

    if (!data || !subscription) {
        return null;
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Subscription
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Kelola subscription dan lihat informasi billing
                    agency kamu.
                </p>
            </div>

            {/* Stats */}
            <SubscriptionStats
                subscription={subscription}
                isExpired={isExpired}
            />

            {/* Subscription Details */}
            <DueDateSubscription
                subscription={subscription}
                isExpired={isExpired}
            />

            {/* Recent Payments */}
            <RecentPayments
                payments={recentPayments}
                totalPayments={data.payments.length}
            />
        </div>
    );
}
