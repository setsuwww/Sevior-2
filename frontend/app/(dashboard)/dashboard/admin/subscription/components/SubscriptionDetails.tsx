"use client";


import { PLAN_COLORS } from "@/_constants/theme/subscription";

interface SubscriptionDetailsProps {
    subscription: {
        plan: string;
        status: string;
    };
}

interface DueDateSubscriptionProps {
    subscription: {
        plan: string;
        status: string;
        start_date: string | null;
        end_date: string | null;
    };
    isExpired: boolean;
}

export default function SubscriptionDetails({ subscription }: SubscriptionDetailsProps) {
    return (
        <div className="relative overflow-hidden rounded-sm border border-slate-200 bg-gradient-to-r from-slate-900 to-teal-950 p-5 md:col-span-2">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-400">
                        Current Plan
                    </p>

                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {subscription.status}
                    </span>
                </div>

                <div className="mt-5">
                    <p
                        className={`inline-flex items-center rounded-sm text-xs font-semibold uppercase tracking-wide ${PLAN_COLORS[subscription.plan]}`}
                    >
                        {subscription.plan}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-white">
                        {subscription.plan} Plan
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                        Your current plan
                    </p>
                </div>
            </div>
        </div>
    );
}
