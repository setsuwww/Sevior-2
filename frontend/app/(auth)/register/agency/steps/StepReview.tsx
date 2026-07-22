import React from "react";
import { Building2 } from "lucide-react";
import { useAgencyOnboarding } from "./logic/useAgencyOnboarding";
import { AgencySummaryCard } from "../components/AgencySummaryCard";
import { PlanSummaryCard } from "../components/PlanSummaryCard";

export function StepReview() {
    const { submitting, submittingStatus, errors } = useAgencyOnboarding();

    if (submitting) {
        const isCreating = submittingStatus === "creating";
        const isSigningIn = submittingStatus === "signing_in";

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-6 animate-pulse">
                        <Building2 className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {isCreating ? "Creating your account..." : "Automatically signing in..."}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        {isCreating 
                            ? "We are setting up your workspace, provisioning resources, and preparing your dashboard."
                            : "Securing your session and redirecting you to the dashboard..."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            {errors.submit && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400">
                    {errors.submit}
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <AgencySummaryCard />
                <PlanSummaryCard />
            </div>
        </div>
    );
}
