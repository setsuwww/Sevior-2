import React from "react";
import { ProgressHeader } from "./ProgressHeader";
import { FooterActions } from "./FooterActions";

export function OnboardingLayout({ children, loading }: { children: React.ReactNode, loading: boolean }) {

    return (
        <div className="min-h-screen bg-olive-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center selection:bg-teal-500/30">
            <div className="w-full max-w-4xl relative">
                <ProgressHeader />

                <div className="shadow-2xl shadow-olive-200/50 dark:shadow-none border-0 rounded-sm overflow-hidden bg-white dark:bg-zinc-950 ring-1 ring-olive-200 dark:ring-olive-800">
                    <div className="p-8">
                        {children}
                    </div>
                    <FooterActions loading={loading} />
                </div>
            </div>
        </div>
    );
}
