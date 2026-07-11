import React from "react";
import { Label } from "@/_components/ui/label";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";
import { UploadCloud, Building2, User, Mail, Lock, Globe, Tag, FileText } from "lucide-react";
import { useAgencyOnboarding } from "./logic/useAgencyOnboarding";

export function StepAgencyProfile() {
    const { form, updateForm, errors, nextStep } = useAgencyOnboarding();

    return (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-8">1. Agency Profile</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-3">
                        <Label htmlFor="agency_name" className="flex items-center text-gray-700 dark:text-gray-300">
                            Agency Name *
                        </Label>
                        <Input
                            id="agency_name"
                            placeholder="Acme Studio"
                            className={`h-11 bg-white dark:bg-zinc-900 ${errors.agency_name ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'}`}
                            value={form.agency_name}
                            onChange={(e) => updateForm({ agency_name: e.target.value })}
                        />
                        {errors.agency_name && <p className="text-xs text-red-500">{errors.agency_name}</p>}
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="agency_slug" className="flex items-center text-gray-700 dark:text-gray-300">
                            Agency Slug (Optional)
                        </Label>
                        <Input
                            id="agency_slug"
                            placeholder="acme-studio"
                            className="h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-800"
                            value={form.agency_slug}
                            onChange={(e) => updateForm({ agency_slug: e.target.value })}
                        />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                        <Label htmlFor="agency_description" className="flex items-center text-gray-700 dark:text-gray-300">
                            Agency Description (Optional)
                        </Label>
                        <Textarea
                            id="agency_description"
                            placeholder="We are a software development agency specializing in SaaS products..."
                            className="h-24 bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-800 resize-none"
                            value={form.agency_description}
                            maxLength={500}
                            onChange={(e) => updateForm({ agency_description: e.target.value })}
                        />
                        <div className="text-xs text-gray-400 text-right">
                            {form.agency_description?.length || 0} / 500
                        </div>
                    </div>

                    <div className="space-y-3 md:col-span-2">
                        <Label htmlFor="website" className="flex items-center text-gray-700 dark:text-gray-300">
                            Website (Optional)
                        </Label>
                        <Input
                            id="website"
                            placeholder="https://acmestudio.com"
                            className="h-11 bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-800"
                            value={form.website}
                            onChange={(e) => updateForm({ website: e.target.value })}
                        />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                        <Label className="flex items-center text-gray-700 dark:text-gray-300">
                            Company Logo (Optional)
                        </Label>
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                            <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                            <span className="text-sm">Click to upload or drag and drop</span>
                            <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-8">2. Owner Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-3">
                        <Label htmlFor="full_name" className="flex items-center text-gray-700 dark:text-gray-300">
                            Full Name *
                        </Label>
                        <Input
                            id="full_name"
                            placeholder="John Doe"
                            className={`h-11 bg-white dark:bg-zinc-900 ${errors.full_name ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'}`}
                            value={form.full_name}
                            onChange={(e) => updateForm({ full_name: e.target.value })}
                        />
                        {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="email" className="flex items-center text-gray-700 dark:text-gray-300">
                            Email Address *
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="john@acmestudio.com"
                            className={`h-11 bg-white dark:bg-zinc-900 ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'}`}
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="password" className="flex items-center text-gray-700 dark:text-gray-300">
                            Password *
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className={`h-11 bg-white dark:bg-zinc-900 ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'}`}
                            value={form.password}
                            onChange={(e) => updateForm({ password: e.target.value })}
                        />
                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="confirm_password" className="flex items-center text-gray-700 dark:text-gray-300">
                            Confirm Password *
                        </Label>
                        <Input
                            type="password"
                            id="confirm_password"
                            placeholder="••••••••"
                            className={`h-11 bg-white dark:bg-zinc-900 ${errors.confirm_password ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'}`}
                            value={form.confirm_password}
                            onChange={(e) => updateForm({ confirm_password: e.target.value })}
                        />
                        {errors.confirm_password && <p className="text-xs text-red-500">{errors.confirm_password}</p>}
                    </div>
                </div>
            </div>
            {/* Hidden submit button to allow form submission via Enter key */}
            <button type="submit" className="hidden" />
        </form>
    );
}
