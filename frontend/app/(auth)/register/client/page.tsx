"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/_lib/axiosInstance";
import { useAuthStore } from "@/_stores/auth";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-blue-500">
                <CardHeader>
                    <Link href="/register" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to roles
                    </Link>
                    <CardTitle className="text-2xl font-bold">Client Registration</CardTitle>
                    <CardDescription>Create your account to request projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                required
                                value={form.full_name}
                                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                minLength={6}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm_password">Confirm Password</Label>
                            <Input
                                id="confirm_password"
                                type="password"
                                required
                                minLength={6}
                                value={form.confirm_password}
                                onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6" disabled={loading}>
                            {loading ? "Registering..." : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
