import React from "react";
import { Button } from "@/_components/ui/button";
import { useRouter } from "next/navigation";
import { useAgencyOnboarding } from "../steps/logic/useAgencyOnboarding";

export function FooterActions() {
    const { step, form, nextStep, previousStep, submitAgency } = useAgencyOnboarding();
    const router = useRouter();

    return (
        <div className="dark:bg-zinc-900 border-t border-gray-100 dark:border-gray-800 p-8 flex items-center justify-between">
            <Button
                type="button"
                variant="ghost"
                onClick={step === 1 ? () => router.push("/register") : previousStep}
                className="bg-slate-100 hover:bg-slate-200 text-gray-700"
            >
                {step === 1 ? "Cancel" : "Back"}
            </Button>

            {step < 3 ? (
                <Button
                    type="button"
                    onClick={nextStep}
                    disabled={step === 2 && !form.subscription_plan}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                >
                    Continue
                </Button>
            ) : (
                <Button
                    type="button"
                    onClick={submitAgency}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                >
                    Create Agency
                </Button>
            )}
        </div>
    );
}
