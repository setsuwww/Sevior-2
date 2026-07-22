"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/app/providers/AuthProvider";

import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { OnboardingLayout } from "./components/OnboardingLayout";
import toast from "react-hot-toast";

export default function ClientRegistrationPage() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    });

    // Status states
    const [status, setStatus] = useState<"idle" | "creating" | "signing_in">("idle");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (form.password !== form.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setStatus("creating");

        try {
            // Step 1: Create Account
            const res = await authService.registerClient({
                full_name: form.full_name,
                email: form.email,
                phone: form.phone,
                password: form.password,
            });

            // Step 2: Automatically Sign In
            setStatus("signing_in");

            // Wait slightly for smooth UX transition
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Establish Auth Session in Provider
            login(res.accessToken, res.user);

            // Notify & Redirect
            toast.success("Welcome to Sevior!", { duration: 3000 });

            const userRole = res.user.Role;
            if (userRole === "SUPER_ADMIN") {
                router.push("/dashboard/superadmin");
            } else if (userRole === "ADMIN") {
                router.push("/dashboard/admin");
            } else if (userRole === "DEVELOPER") {
                router.push("/dashboard/developer");
            } else if (userRole === "CLIENT") {
                router.push("/dashboard/client");
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || "An unexpected error occurred during registration.");
            setStatus("idle");
        }
    };

    const isSubmitting = status !== "idle";

    return (
        <OnboardingLayout loading={isSubmitting}>
            <div className="flex justify-between items-center mb-8">
                <h4 className="text-sm font-semibold text-teal-600 uppercase tracking-wider">1. Account Profile</h4>
            </div>

            {error && (
                <div className="mb-6 p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
                </div>
            )}

            <form id="client-register-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                        id="full_name"
                        required
                        disabled={isSubmitting}
                        value={form.full_name}
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        className="h-11 bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-50"
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-11 bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-50"
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        required
                        disabled={isSubmitting}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="h-11 bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-50"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            minLength={6}
                            disabled={isSubmitting}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="h-11 bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="confirm_password">Confirm Password *</Label>
                        <Input
                            id="confirm_password"
                            type="password"
                            required
                            minLength={6}
                            disabled={isSubmitting}
                            value={form.confirm_password}
                            onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                            className="h-11 bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800 disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center space-x-2 h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all disabled:opacity-80 disabled:cursor-not-allowed shadow-md shadow-teal-500/20"
                    >
                        {status === "creating" && (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Creating your account...</span>
                            </>
                        )}
                        {status === "signing_in" && (
                            <>
                                <CheckCircle2 className="w-5 h-5 text-teal-200" />
                                <span>Automatically signing in...</span>
                            </>
                        )}
                        {status === "idle" && (
                            <span>Create Account</span>
                        )}
                    </button>
                </div>
            </form>
        </OnboardingLayout>
    );
}
