export const getPlanId = (name: string) => {
    if (name === "Free") return "free";
    if (name === "Pro") return "team";
    if (name === "Executive") return "company";
    return "free";
};

export interface AgencyForm {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
    agency_name: string;
    agency_slug: string;
    agency_description?: string;
    website: string;
    subscription_plan: string;
}

export type SubscriptionPlan = "free" | "team" | "company" | "";

export type EntryPoint = "register" | "pricing";

export type Step = 1 | 2 | 3;

export interface ValidationErrors {
    [key: string]: string;
}

// Validation

export const validateAgencyProfile = (form: AgencyForm): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!form.agency_name.trim()) errors.agency_name = "Agency Name is required";
    if (!form.full_name.trim()) errors.full_name = "Full Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email format";
    return errors;
};

export const validatePasswords = (form: AgencyForm): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 6) errors.password = "Password must be at least 6 characters";

    if (form.password !== form.confirm_password) errors.confirm_password = "Passwords do not match";

    return errors;
};

export const validatePlanSelection = (form: AgencyForm): ValidationErrors => {
    const errors: ValidationErrors = {};
    if (!form.subscription_plan) errors.subscription_plan = "Please select a subscription plan";
    return errors;
};
