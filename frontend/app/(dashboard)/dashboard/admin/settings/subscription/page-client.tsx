"use client";

import { useMemo } from "react";

import SubscriptionStats from "./components/SubscriptionStats";
import DueDateSubscription from "./components/DueDateSubscription";
import RecentPayments from "./components/RecentPayments";

import type {
    SubscriptionResponse,
} from "@/_lib/services/admin-service/settings/subscription.server";

import { CalendarHeart } from "lucide-react";
import { SectionHeader } from "@/_components/ui/common/SectionHeader";

interface SubscriptionPageClientProps {
    data: SubscriptionResponse;
}

export default function SubscriptionPageClient({
    data,
}: SubscriptionPageClientProps) {
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

    return (
        <div className="space-y-6 p-6">
            <SectionHeader
                icon={CalendarHeart}
                title="Subscription"
                description="Kelola subscription dan lihat informasi billing agency kamu."
            />

            <SubscriptionStats
                subscription={subscription}
                isExpired={isExpired}
            />

            <DueDateSubscription
                subscription={subscription}
                isExpired={isExpired}
            />

            <RecentPayments
                payments={recentPayments}
                totalPayments={data.payments.length}
            />
        </div>
    );
}
