"use client";

import SubscriptionStats from "./components/SubscriptionStats";
import DueDateSubscription from "./components/DueDateSubscription";
import RecentPayments from "./components/RecentPayments";

import { useAdminSubscription } from "./logic/useAdminSubscription";

import SubscriptionSkeleton from "./skeleton";
import { CalendarHeart } from "lucide-react";

export default function SubscriptionPage() {
    const { data, subscription, recentPayments, isExpired, isLoading, error } = useAdminSubscription();

    if (isLoading) { return (<SubscriptionSkeleton />) }

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
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-teal-700 shadow-sm">
                    <CalendarHeart className="h-6 w-6 text-white" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-olive-900">
                        Subscription
                    </h1>

                    <p className="mt-1 text-sm text-olive-500">
                        Kelola subscription dan lihat informasi billing agency kamu.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <SubscriptionStats subscription={subscription} isExpired={isExpired} />

            {/* Subscription Details */}
            <DueDateSubscription subscription={subscription} isExpired={isExpired} />

            {/* Recent Payments */}
            <RecentPayments payments={recentPayments} totalPayments={data.payments.length} />
        </div>
    );
}
