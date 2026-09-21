import React from "react";
import { useAgencyOnboarding } from "../steps/logic/useAgencyOnboarding";

export function AgencySummaryCard() {
    const { form } = useAgencyOnboarding();

    return (
        <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Agency Information</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
                    <span className="text-gray-500 dark:text-gray-400">Agency Name</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{form.agency_name || "—"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
                    <span className="text-gray-500 dark:text-gray-400">Owner</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{form.full_name || "—"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
                    <span className="text-gray-500 dark:text-gray-400">Email</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{form.email || "—"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
                    <span className="text-gray-500 dark:text-gray-400">Website</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{form.website || "—"}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-500 dark:text-gray-400">Logo</span>
                    <span className="text-sm text-gray-400 italic">No logo uploaded</span>
                </div>
            </div>
        </div>
    );
}
