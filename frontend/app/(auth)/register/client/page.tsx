"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/_lib/axiosInstance";
import { useAuthStore } from "@/_stores/auth";

import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { OnboardingLayout } from "./components/OnboardingLayout";

export default function ClientRegistrationPage() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/auth/register/client", form);
            useAuthStore.getState().setAuth(data.accessToken, data.refreshToken, data.user);
            router.push("/dashboard/client");
        } catch (err: any) {
            alert(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OnboardingLayout loading={loading}>
            <h4 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-8">1. Account Profile</h4>
            <form id="client-register-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                        id="full_name"
                        required
                        value={form.full_name}
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        className="h-11 bg-white border-gray-200"
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-11 bg-white border-gray-200"
                    />
                </div>
                <div className="space-y-3">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="h-11 bg-white border-gray-200"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            minLength={6}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="h-11 bg-white border-gray-200"
                        />
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <Input
                            id="confirm_password"
                            type="password"
                            required
                            minLength={6}
                            value={form.confirm_password}
                            onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                            className="h-11 bg-white border-gray-200"
                        />
                    </div>
                </div>
            </form>
        </OnboardingLayout>
    );
}
