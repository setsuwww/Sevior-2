"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService, RegisterData } from "@/_lib/auth";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { Checkbox } from "@/_components/ui/checkbox";
import Link from "next/link";

export default function RegisterPage() {
    const [form, setForm] = useState<RegisterData>({
        name: "",
        email: "",
        role: "",
        password: "",
        agree: false, // dummy checkbox state
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.agree) {
            alert("You must agree to the terms!");
            return;
        }
        setLoading(true);
        try {
            await authService.register(form);
            router.push("/login");
        } catch (err: any) {
            alert(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-radial from-teal-400 to-teal-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Register</CardTitle>
                    <CardDescription>Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Username</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        {/* Email */}
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

                        {/* Password */}
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

                        {/* Checkbox dummy */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="agree"
                                checked={form.agree}
                                onCheckedChange={(checked) => setForm({ ...form, agree: !!checked })}
                            />
                            <Label htmlFor="agree">I agree to the terms and conditions</Label>
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full text-md bg-teal-500 hover:bg-teal-700">
                            {loading ? "Loading..." : "Register"}
                        </Button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-orange-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
