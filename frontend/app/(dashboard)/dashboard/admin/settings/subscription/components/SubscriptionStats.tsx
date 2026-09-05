"use client";

import {
    Clock3,
    CreditCard,
    WalletCards,
} from "lucide-react";

import { Badge } from "@/_components/ui/badge";
import {
    formatCurrency,
    formatDate,
    getStatusClass,
} from "../logic/useAdminSubscription";

interface SubscriptionStatsProps {
    subscription: {
        plan: string;
        status: string;
        days_remaining: number;
        end_date: string | null;
        price: number;
    };
    isExpired: boolean;
}

export default function SubscriptionStats({
    subscription,
    isExpired,
}: SubscriptionStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Current Plan */}
            <div className="rounded-sm border border-olive-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-olive-500">
                            Current Plan
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-olive-900">
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
                            subscription.status,
                        )}`}
                    >
                        {subscription.status}
                    </Badge>
                </div>
            </div>

            {/* Remaining */}
            <div className="rounded-sm border border-olive-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-olive-500">
                            Remaining
                        </p>

                        <h2
                            className={`mt-1 text-2xl font-bold ${isExpired
                                ? "text-red-600"
                                : "text-olive-900"
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

                <p className="mt-3 text-xs text-olive-500">
                    Expires on{" "}
                    {formatDate(subscription.end_date)}
                </p>
            </div>

            {/* Price */}
            <div className="rounded-sm border border-olive-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-olive-500">
                            Subscription Price
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-olive-900">
                            {formatCurrency(subscription.price)}
                        </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-blue-50">
                        <WalletCards className="h-5 w-5 text-blue-600" />
                    </div>
                </div>

                <p className="mt-3 text-xs text-olive-500">
                    Current subscription price
                </p>
            </div>
        </div>
    );
}
