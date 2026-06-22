"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/_lib/axiosInstance";
import { useAuthStore } from "@/_stores/auth";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/_components/ui/card";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const PLANS = [
    { id: "free", name: "FREE", price: "$0/mo", features: ["1 Admin", "3 Developers", "20 Projects"] },
    { id: "team", name: "TEAM", price: "$49/mo", features: ["3 Admins", "15 Developers", "Unlimited Projects"] },
    { id: "company", name: "COMPANY", price: "$99/mo", features: ["Unlimited Admins", "Unlimited Developers", "Unlimited Projects"] }
];

export default function AgencyRegistrationPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        agency_name: "",
        agency_description: "",
        location: "",
        website: "",
        subscription_plan: "free",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1 && form.password !== form.confirm_password) {
            alert("Passwords do not match!");
            return;
        }
        setStep(step + 1);
    };

    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/auth/register/agency", form);
            useAuthStore.getState().setAuth(data.accessToken, data.refreshToken, data.user);
            
            if (form.subscription_plan !== "free") {
                alert("Payment gateway is not available yet. Your subscription request has been recorded.");
            }
            
            router.push("/dashboard/admin");
        } catch (err: any) {
            alert(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-2xl shadow-lg border-t-4 border-teal-500">
                <CardHeader>
                    {step === 1 && (
                        <Link href="/register" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to roles
                        </Link>
                    )}
                    <CardTitle className="text-2xl font-bold">Agency Registration</CardTitle>
                    <CardDescription>
                        Step {step} of 3: {step === 1 ? "Owner Details" : step === 2 ? "Agency Profile" : "Choose Plan"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 1 && (
                        <form id="step1-form" onSubmit={handleNext} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="full_name">Owner Name</Label>
                                    <Input required id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input required type="email" id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input required type="tel" id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input required type="password" minLength={6} id="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                    <Input required type="password" minLength={6} id="confirm_password" value={form.confirm_password} onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} />
                                </div>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form id="step2-form" onSubmit={handleNext} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="agency_name">Agency Name</Label>
                                <Input required id="agency_name" value={form.agency_name} onChange={(e) => setForm({ ...form, agency_name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="agency_description">Description</Label>
                                <Textarea id="agency_description" value={form.agency_description} onChange={(e) => setForm({ ...form, agency_description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location (City, Country)</Label>
                                    <Input required id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website (Optional)</Label>
                                    <Input id="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                                </div>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                            {PLANS.map((plan) => (
                                <Card 
                                    key={plan.id} 
                                    className={`cursor-pointer transition-all ${form.subscription_plan === plan.id ? 'border-teal-500 shadow-md ring-2 ring-teal-200' : 'hover:border-gray-300'}`}
                                    onClick={() => setForm({ ...form, subscription_plan: plan.id })}
                                >
                                    <CardHeader className="p-4 text-center">
                                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                                        <CardDescription className="text-xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                                            {plan.features.map((f, i) => (
                                                <li key={i} className="flex items-center"><CheckCircle2 className="w-4 h-4 text-teal-500 mr-2" /> {f}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                    {step > 1 ? (
                        <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                    ) : (
                        <div></div>
                    )}
                    
                    {step < 3 ? (
                        <Button type="submit" form={`step${step}-form`} className="bg-teal-600 hover:bg-teal-700">Next Step</Button>
                    ) : (
                        <Button type="button" onClick={handleSubmit} disabled={loading} className="bg-teal-600 hover:bg-teal-700">
                            {loading ? "Creating Agency..." : "Complete Registration"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
