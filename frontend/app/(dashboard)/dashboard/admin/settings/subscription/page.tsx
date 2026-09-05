"use client";

import SubscriptionStats from "./components/SubscriptionStats";
import DueDateSubscription from "./components/DueDateSubscription";
import RecentPayments from "./components/RecentPayments";

import { useAdminSubscription } from "./logic/useAdminSubscription";

import SubscriptionSkeleton from "./skeleton";
import { CalendarHeart } from "lucide-react";
import { SectionHeader } from "@/_components/ui/common/SectionHeader";

export default function SubscriptionPage() {
    const { data, subscription, recentPayments, isExpired, isLoading, error } = useAdminSubscription();

    if (isLoading) { return <SubscriptionSkeleton /> }

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
            <SectionHeader
                icon={CalendarHeart}
                title="Subscription"
                description="Kelola subscription dan lihat informasi billing agency kamu."
            />

            {/* Stats */}
            <SubscriptionStats subscription={subscription} isExpired={isExpired} />

            {/* Subscription Details */}
            <DueDateSubscription subscription={subscription} isExpired={isExpired} />

            {/* Recent Payments */}
            <RecentPayments payments={recentPayments} totalPayments={data.payments.length} />
        </div>
    );
}
