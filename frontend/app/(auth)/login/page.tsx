"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService, LoginData } from "@/_lib/auth";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Checkbox } from "@/_components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";

import Link from "next/link";

export default function LoginPage() {
    const [form, setForm] = useState<LoginData>({ email: "", password: "", agree: false });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.login(form);
            router.push("/dashboard");
        } catch (err: any) {
            alert(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-radial from-teal-300 to-teal-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Access your account</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="agree"
                                checked={form.agree}
                                onCheckedChange={(checked) => setForm({ ...form, agree: !!checked })}
                            />
                            <Label htmlFor="agree">Remember me</Label>
                        </div>
                        <Button type="submit" className="w-full text-md bg-teal-500 hover:bg-teal-700">
                            {loading ? "Loading..." : "Login"}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-orange-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
