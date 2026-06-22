"use client";

import Link from "next/link";
import { Building2, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";

export default function RegisterSelectionPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join Sevior</h1>
                <p className="text-gray-500 mt-2">Choose your account type to get started.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* Agency Owner Card */}
                <Card className="hover:border-teal-500 transition-colors flex flex-col justify-between">
                    <CardHeader>
                        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                            <Building2 size={24} />
                        </div>
                        <CardTitle className="text-xl">Agency Owner</CardTitle>
                        <CardDescription className="text-base mt-2">
                            I own a software house / agency and want to manage projects and developers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 border-t mt-auto">
                        <Link href="/register/agency" className="w-full">
                            <Button className="w-full bg-teal-600 hover:bg-teal-700">Continue as Agency Owner</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Client Card */}
                <Card className="hover:border-blue-500 transition-colors flex flex-col justify-between">
                    <CardHeader>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <User size={24} />
                        </div>
                        <CardTitle className="text-xl">Client</CardTitle>
                        <CardDescription className="text-base mt-2">
                            I want to request software development projects from agencies.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 border-t mt-auto">
                        <Link href="/register/client" className="w-full">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">Continue as Client</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <p className="mt-8 text-gray-500">
                Already have an account? <Link href="/login" className="text-teal-600 hover:underline">Log in</Link>
            </p>
        </div>
    );
}
