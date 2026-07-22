"use client";

import React, { createContext, useContext, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AgencyForm, EntryPoint, Step, ValidationErrors } from "../../types";
import { validateAgencyProfile, validatePasswords, validatePlanSelection } from "../../types"
import { authService } from "@/services/auth.service";
import { useAuth } from "@/app/providers/AuthProvider";
import toast from "react-hot-toast";

interface AgencyOnboardingContextType {
    form: AgencyForm;
    updateForm: (updates: Partial<AgencyForm>) => void;
    step: Step;
    entryPoint: EntryPoint;
    currentDisplayStep: number;
    totalSteps: number;
    nextStep: () => void;
    previousStep: () => void;
    changePlan: () => void;
    submitAgency: () => Promise<void>;
    submittingStatus: "idle" | "creating" | "signing_in";
    submitting: boolean;
    errors: ValidationErrors;
}

const AgencyOnboardingContext = createContext<AgencyOnboardingContextType | undefined>(undefined);

export function AgencyOnboardingProvider({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const planParam = searchParams.get("plan");
    const initialPlanId = planParam === "pro" ? "team" : (planParam === "executive" ? "company" : (planParam === "free" ? "free" : ""));

    const [step, setStep] = useState<Step>(1);
    const [entryPoint, setEntryPoint] = useState<EntryPoint>(initialPlanId ? "pricing" : "register");
    const [submittingStatus, setSubmittingStatus] = useState<"idle" | "creating" | "signing_in">("idle");
    const submitting = submittingStatus !== "idle";
    const [errors, setErrors] = useState<ValidationErrors>({});

    const [form, setForm] = useState<AgencyForm>({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
        agency_name: "",
        agency_slug: "",
        agency_description: "",
        website: "",
        subscription_plan: initialPlanId,
    });

    const updateForm = (updates: Partial<AgencyForm>) => {
        setForm((prev) => ({ ...prev, ...updates }));
        // Clear errors for updated fields
        if (Object.keys(errors).length > 0) {
            const newErrors = { ...errors };
            Object.keys(updates).forEach(key => delete newErrors[key]);
            setErrors(newErrors);
        }
    };

    const totalSteps = entryPoint === "pricing" ? 2 : 3;
    const currentDisplayStep = step === 3 && entryPoint === "pricing" ? 2 : step;

    const nextStep = () => {
        let validationErrors: ValidationErrors = {};

        if (step === 1) {
            validationErrors = { ...validateAgencyProfile(form), ...validatePasswords(form) };
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            if (entryPoint === "pricing" && form.subscription_plan) {
                setStep(3);
            } else {
                setStep(2);
            }
        } else if (step === 2) {
            validationErrors = validatePlanSelection(form);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setStep(3);
        }
    };

    const previousStep = () => {
        if (step === 3 && entryPoint === "pricing") {
            setStep(1);
        } else {
            setStep((step - 1) as Step);
        }
    };

    const changePlan = () => {
        setEntryPoint("register");
        setStep(2);
    };

    const { login } = useAuth();

    const submitAgency = async () => {
        setSubmittingStatus("creating");
        setErrors({});
        try {
            const payload = {
                full_name: form.full_name,
                email: form.email,
                password: form.password,
                agency_name: form.agency_name,
                website: form.website,
                subscription_plan: form.subscription_plan || "free",
            };

            const res = await authService.registerAgency(payload);

            setSubmittingStatus("signing_in");
            // Wait slightly for smooth UX transition
            await new Promise((resolve) => setTimeout(resolve, 800));

            login(res.accessToken, res.user);
            toast.success("Welcome to Sevior!", { duration: 3000 });

            router.push("/dashboard/admin");
        } catch (err: any) {
            setErrors({ submit: err.response?.data?.error || err.message || "Registration failed." });
            setSubmittingStatus("idle");
        }
    };

    return (
        <AgencyOnboardingContext.Provider
            value={{
                form,
                updateForm,
                step,
                entryPoint,
                currentDisplayStep,
                totalSteps,
                nextStep,
                previousStep,
                changePlan,
                submitAgency,
                submittingStatus,
                submitting,
                errors,
            }}
        >
            {children}
        </AgencyOnboardingContext.Provider>
    );
}

export function useAgencyOnboardingContext() {
    const context = useContext(AgencyOnboardingContext);
    if (context === undefined) {
        throw new Error("useAgencyOnboardingContext must be used within an AgencyOnboardingProvider");
    }
    return context;
}
