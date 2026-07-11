"use client";

import { Suspense } from "react";
import { AgencyOnboardingProvider, useAgencyOnboardingContext } from "./steps/logic/AgencyOnboardingProvider";
import { OnboardingLayout } from "./components/OnboardingLayout";
import { StepAgencyProfile } from "./steps/StepAgencyProfile";
import { StepChoosePlan } from "./steps/StepChoosePlan";
import { StepReview } from "./steps/StepReview";

function AgencyOnboardingSteps() {
    const { step } = useAgencyOnboardingContext();

    return (
        <OnboardingLayout>
            {step === 1 && <StepAgencyProfile />}
            {step === 2 && <StepChoosePlan />}
            {step === 3 && <StepReview />}
        </OnboardingLayout>
    );
}

export default function AgencyRegistrationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black"><div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <AgencyOnboardingProvider>
                <AgencyOnboardingSteps />
            </AgencyOnboardingProvider>
        </Suspense>
    );
}
