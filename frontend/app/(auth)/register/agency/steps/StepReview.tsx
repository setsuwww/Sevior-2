import React from "react";
import { Building2 } from "lucide-react";
import { useAgencyOnboarding } from "./logic/useAgencyOnboarding";
import { AgencySummaryCard } from "../components/AgencySummaryCard";
import { PlanSummaryCard } from "../components/PlanSummaryCard";

export function StepReview() {
    const { submitting } = useAgencyOnboarding();

    if (submitting) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-6 animate-pulse">
                        <Building2 className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Creating your agency...</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        We are setting up your workspace, provisioning resources, and preparing your dashboard.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <AgencySummaryCard />
                <PlanSummaryCard />
            </div>
        </div>
    );
}
