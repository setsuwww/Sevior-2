import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { FormHeader } from "@/_components/ui/common/FormHeader";

interface DeveloperForm {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    biography: string;
    is_active: boolean;
}

interface DeveloperCreateFormProps {
    form: DeveloperForm;
    formError: string | null;
    submitting: boolean;

    handleFormChange: (
        field: keyof DeveloperForm,
        value: string | boolean
    ) => void;

    handleSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => void;
}

export function DeveloperCreateForm({
    form,
    formError,
    submitting,
    handleFormChange,
    handleSubmit,
}: DeveloperCreateFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className="rounded-sm border border-border bg-card">
                <div className="border-b border-border px-6 py-5 flex items-center justify-between">
                    <FormHeader
                        title="Developer Information"
                        description="Fill in the information below to create a developer account."
                    />

                    <Link
                        href="/dashboard/admin/users/developers"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Developers
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6">
                    {formError && (
                        <div className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                            {formError}
                        </div>
                    )}

                    {/* FULL NAME */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Full Name
                        </label>

                        <Input
                            type="text"
                            value={form.full_name}
                            onChange={(event) =>
                                handleFormChange(
                                    "full_name",
                                    event.target.value
                                )
                            }
                            placeholder="John Doe"
                            disabled={submitting}
                            required
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Email
                        </label>

                        <Input
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                                handleFormChange(
                                    "email",
                                    event.target.value
                                )
                            }
                            placeholder="john@sevior.com"
                            disabled={submitting}
                            required
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Phone
                        </label>

                        <Input
                            type="tel"
                            value={form.phone}
                            onChange={(event) =>
                                handleFormChange(
                                    "phone",
                                    event.target.value
                                )
                            }
                            placeholder="08123456789"
                            disabled={submitting}
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Password
                        </label>

                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={(event) =>
                                    handleFormChange(
                                        "password",
                                        event.target.value
                                    )
                                }
                                placeholder="Enter password"
                                disabled={submitting}
                                required
                                className="pr-10"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((value) => !value)
                                }
                                disabled={submitting}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>

                        <p className="mt-1.5 text-xs text-muted-foreground">
                            Default password is{" "}
                            <span className="font-medium text-foreground">
                                password123
                            </span>
                            . Change it if needed.
                        </p>
                    </div>

                    {/* BIOGRAPHY */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Biography{" "}
                            <span className="font-normal text-muted-foreground">
                                (Optional)
                            </span>
                        </label>

                        <textarea
                            value={form.biography}
                            onChange={(event) =>
                                handleFormChange(
                                    "biography",
                                    event.target.value
                                )
                            }
                            placeholder="Tell something about this developer..."
                            rows={5}
                            disabled={submitting}
                            className="w-full resize-none rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring/60 focus:ring-3 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted"
                        />

                        <p className="mt-1.5 text-xs text-muted-foreground">
                            Developers can complete or update their biography
                            later from their profile.
                        </p>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-end gap-2 border-t border-border pt-5">
                        <Link href="/dashboard/admin/users/developers">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}

                            {submitting
                                ? "Creating..."
                                : "Create Developer"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
