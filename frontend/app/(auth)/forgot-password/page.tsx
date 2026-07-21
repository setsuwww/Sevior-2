"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import Image from "next/image";

import { forgotPasswordSchema, ForgotPasswordFormValues } from "@/features/auth/validators/auth.validator";
import { authService } from "@/features/auth/services/auth.service";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";

export default function ForgotPasswordPage() {
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            await authService.forgotPassword(data);
            setIsSuccess(true);
        } catch (err: any) {
            // In a real app we don't leak user existence, so we always show success.
            // But we can log it here.
            console.error("Forgot password error", err);
            setIsSuccess(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 selection:bg-teal-500/30 relative">
            {/* Back Navigation */}
            <div className="absolute top-6 left-6 md:top-8 md:left-10">
                <Link 
                    href="/login" 
                    className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md p-1 -ml-1"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to login
                </Link>
            </div>

            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden">
                        <Image src="/1.png" alt="Sevior Logo" fill className="object-cover" />
                    </div>
                </div>

                <Card className="shadow-xl border-slate-200/60 dark:border-slate-800">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-slate-500">
                            Enter your email to receive a password reset link
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mb-2">
                                    <MailCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Check your email</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[300px]">
                                    If an account exists for that email, we have sent a password reset link. Please check your inbox.
                                </p>
                                <div className="pt-4">
                                    <Link href="/login">
                                        <Button variant="outline" className="font-semibold">
                                            Return to log in
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        disabled={isSubmitting}
                                        className={`transition-colors ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-teal-500"}`}
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>
                                    )}
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="w-full h-11 text-base font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md shadow-teal-500/20"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Sending link...
                                        </>
                                    ) : (
                                        "Send reset link"
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
