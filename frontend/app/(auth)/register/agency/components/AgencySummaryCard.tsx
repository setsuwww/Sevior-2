import React from "react";
import { useAgencyOnboarding } from "../steps/logic/useAgencyOnboarding";

export function AgencySummaryCard() {
    const { form } = useAgencyOnboarding();

    return (
        <div className="bg-olive-50 dark:bg-zinc-900/50 rounded-2xl p-8 border border-olive-100 dark:border-olive-800">
            <h3 className="text-lg font-bold text-olive-900 dark:text-white mb-6">Agency Information</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-olive-200 dark:border-olive-800 pb-4">
                    <span className="text-olive-500 dark:text-olive-400">Agency Name</span>
                    <span className="font-semibold text-olive-900 dark:text-white">{form.agency_name || "—"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-olive-200 dark:border-olive-800 pb-4">
                    <span className="text-olive-500 dark:text-olive-400">Owner</span>
                    <span className="font-semibold text-olive-900 dark:text-white">{form.full_name || "—"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-olive-200 dark:border-olive-800 pb-4">
                    <span className="text-olive-500 dark:text-olive-400">Email</span>
                    <span className="font-semibold text-olive-900 dark:text-white">{form.email || "—"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-olive-200 dark:border-olive-800 pb-4">
                    <span className="text-olive-500 dark:text-olive-400">Website</span>
                    <span className="font-semibold text-olive-900 dark:text-white">{form.website || "—"}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <span className="text-olive-500 dark:text-olive-400">Logo</span>
                    <span className="text-sm text-olive-400 italic">No logo uploaded</span>
                </div>
            </div>
        </div>
    );
}
