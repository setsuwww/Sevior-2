"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { loginSchema, LoginFormValues } from "@/features/auth/validators/auth.validator";
import { authService, setAccessToken } from "@/features/auth/services/auth.service";
import { useAuth } from "@/features/auth/providers/AuthProvider";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Checkbox } from "@/_components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const rememberMe = watch("rememberMe");

    const onSubmit = async (data: LoginFormValues) => {
        setAuthError(null);
        try {
            const res = await authService.login(data);
            login(res.accessToken, res.user);

            toast.success("Welcome back!", { duration: 3000 });

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
            setAuthError(err.response?.data?.error || err.message || "An unexpected error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 selection:bg-teal-500/30">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden">
                        <Image src="/1.png" alt="Sevior Logo" fill className="object-cover" />
                    </div>
                </div>

                <Card className="shadow-xl border-slate-300">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</CardTitle>
                        <CardDescription className="text-slate-500">Sign in to your account</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Email */}
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

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
                                    <Link href="/forgot-password" className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
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
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500 font-medium">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-2 pt-1">
                                <Checkbox
                                    id="rememberMe"
                                    disabled={isSubmitting}
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
                                    className="data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                                />
                                <Label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 dark:text-slate-400 cursor-pointer">
                                    Remember me
                                </Label>
                            </div>

                            {/* Global Auth Error */}
                            {authError && (
                                <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                    <p className="text-sm font-medium text-red-800 dark:text-red-300">{authError}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-11 text-base font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md shadow-teal-500/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                            Don't have an account?{" "}
                            <Link href="/register" className="font-semibold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                                Register now
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
