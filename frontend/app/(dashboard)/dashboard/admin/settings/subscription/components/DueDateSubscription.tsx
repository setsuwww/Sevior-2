"use client";

import { CalendarDays } from "lucide-react";

import SubscriptionDetails from "./SubscriptionDetails";
import { formatDate } from "../logic/useAdminSubscription";
import { SubscriptionPlan } from "@/app/(auth)/register/agency/types";

interface DueDateSubscriptionProps {
    subscription: {
        plan: SubscriptionPlan;
        status: string;
        start_date: string | null;
        end_date: string | null;
    };
    isExpired: boolean;
}

export default function DueDateSubscription({
    subscription,
    isExpired,
}: DueDateSubscriptionProps) {
    return (
        <div className="rounded-sm border border-gray-200 bg-white shadow-xs">
            {/* Header */}
            <div className="border-b border-gray-100 p-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-teal-50">
                        <CalendarDays className="h-5 w-5 text-teal-600" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            Subscription Details
                        </h2>

                        <p className="text-sm text-gray-500">
                            Your subscription period information
                        </p>
                    </div>
                </div>
            </div>

            {/* Bento */}
            <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-4">
                <SubscriptionDetails
                    subscription={{
                        plan: subscription.plan,
                        status: subscription.status,
                    }}
                />

                {/* Start Date */}
                <div className="rounded-sm border border-gray-200 bg-gray-50/70 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Start Date
                            </p>

                            <p className="mt-3 text-xl font-semibold text-gray-900">
                                {formatDate(
                                    subscription.start_date,
                                )}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Subscription started
                            </p>
                        </div>

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-gray-200 bg-white text-gray-500 shadow-xs">
                            <CalendarDays className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                {/* End Date */}
                <div className="rounded-sm border border-gray-200 bg-gray-50/70 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                End Date
                            </p>

                            <p
                                className={`mt-3 text-xl font-semibold ${isExpired
                                    ? "text-red-600"
                                    : "text-gray-900"
                                    }`}
                            >
                                {formatDate(
                                    subscription.end_date,
                                )}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Subscription expires
                            </p>
                        </div>

                        <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border bg-white shadow-xs ${isExpired
                                ? "border-red-200 text-red-500"
                                : "border-gray-200 text-gray-500"
                                }`}
                        >
                            <CalendarDays className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
