"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

import { resetPasswordSchema, ResetPasswordFormValues } from "@/features/auth/validators/auth.validator";
import { authService } from "@/services/auth.service";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    if (!token) {
        return (
            <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Invalid Token</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                    No reset token was found in the URL. Please request a new password reset link.
                </p>
                <Link href="/forgot-password">
                    <Button className="bg-teal-600 hover:bg-teal-700">Request New Link</Button>
                </Link>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Password reset complete</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[300px]">
                    Your password has been successfully reset. You can now log in with your new password.
                </p>
                <div className="pt-4">
                    <Link href="/login">
                        <Button className="font-semibold bg-teal-600 hover:bg-teal-700 w-full">
                            Log in
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const onSubmit = async (data: ResetPasswordFormValues) => {
        setAuthError(null);
        try {
            await authService.resetPassword(token, data.password);
            setIsSuccess(true);
            toast.success("Password reset successfully");
        } catch (err: any) {
            setAuthError(err.response?.data?.error || err.message || "An unexpected error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password */}
            <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">New Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        className={`pr-10 transition-colors ${errors.password ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-teal-500"}`}
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus:text-teal-600 transition-colors"
                        disabled={isSubmitting}
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-sm text-red-500 font-medium">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">Confirm Password</Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        className={`pr-10 transition-colors ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-teal-500"}`}
                        {...register("confirmPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus:text-teal-600 transition-colors"
                        disabled={isSubmitting}
                    >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-sm text-red-500 font-medium">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Global Auth Error */}
            {authError && (
                <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">{authError}</p>
                </div>
            )}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 text-base font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md shadow-teal-500/20"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Resetting Password...
                    </>
                ) : (
                    "Reset Password"
                )}
            </Button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 selection:bg-teal-500/30">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden">
                        <Image src="/1.png" alt="Sevior Logo" fill className="object-cover" />
                    </div>
                </div>

                <Card className="shadow-xl border-slate-200/60 dark:border-slate-800">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Set New Password
                        </CardTitle>
                        <CardDescription className="text-slate-500">
                            Please create a strong password for your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /></div>}>
                            <ResetPasswordForm />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
