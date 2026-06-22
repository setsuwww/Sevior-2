"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserService } from "@/_lib/services/user_service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateDeveloperPage() {
    const router = useRouter();
    const userService = new UserService();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirm_password) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await userService.create({
                full_name: form.full_name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: "DEVELOPER"
            });
            alert("Developer added successfully!");
            router.push("/dashboard/admin/developers");
        } catch (err: any) {
            alert(err.response?.data?.error || "Failed to create developer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center space-x-4">
                <Link href="/dashboard/admin/developers">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Add New Developer</h1>
                    <p className="text-gray-500 mt-1">Register a new developer to your agency.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Developer Information</CardTitle>
                    <CardDescription>Fill in the details to invite a developer.</CardDescription>
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
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Temporary Password</Label>
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
                        </div>

                        <div className="pt-4 flex justify-end space-x-2">
                            <Link href="/dashboard/admin/developers">
                                <Button variant="outline" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={loading}>
                                {loading ? "Saving..." : "Add Developer"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
