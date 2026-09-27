"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";

import { createProjectRequest } from "@/_lib/services/client/project.service";
import type { Agency } from "@/types/agency";

interface ProjectsModalRequestProps {
    agency: Agency;
    open: boolean;
    onClose: () => void;
}

export function ProjectsModalRequest({
    agency,
    open,
    onClose,
}: ProjectsModalRequestProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        budgetMin: "",
        budgetMax: "",
        deadline: "",
    });

    if (!open) {
        return null;
    }

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setLoading(true);
        setError(null);

        try {
            await createProjectRequest({
                agencyId: agency.ID,
                title: form.title,
                description: form.description,
                category: form.category || undefined,
                budgetMin: form.budgetMin
                    ? Number(form.budgetMin)
                    : undefined,
                budgetMax: form.budgetMax
                    ? Number(form.budgetMax)
                    : undefined,
                deadline: form.deadline || undefined,
            });

            setForm({
                title: "",
                description: "",
                category: "",
                budgetMin: "",
                budgetMax: "",
                deadline: "",
            });

            onClose();
        } catch (error) {
            console.error(error);

            setError(
                "Failed to submit project request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Request a Project
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Send a project request to{" "}
                            <span className="font-medium text-foreground">
                                {agency.AgencyName}
                            </span>
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Project Title
                        </label>

                        <Input
                            required
                            value={form.title}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    title: event.target.value,
                                }))
                            }
                            placeholder="e.g. Company Website"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Description
                        </label>

                        <Textarea
                            required
                            value={form.description}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    description:
                                        event.target.value,
                                }))
                            }
                            placeholder="Describe your project..."
                            rows={5}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Category
                        </label>

                        <Input
                            value={form.category}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    category: event.target.value,
                                }))
                            }
                            placeholder="e.g. Web Development"
                        />
                    </div>

                    {/* Budget */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Minimum Budget
                            </label>

                            <Input
                                type="number"
                                min="0"
                                value={form.budgetMin}
                                onChange={(event) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        budgetMin:
                                            event.target.value,
                                    }))
                                }
                                placeholder="Rp 0"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Maximum Budget
                            </label>

                            <Input
                                type="number"
                                min="0"
                                value={form.budgetMax}
                                onChange={(event) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        budgetMax:
                                            event.target.value,
                                    }))
                                }
                                placeholder="Rp 0"
                            />
                        </div>
                    </div>

                    {/* Deadline */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Deadline
                        </label>

                        <Input
                            type="date"
                            value={form.deadline}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    deadline: event.target.value,
                                }))
                            }
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}

                            {loading
                                ? "Submitting..."
                                : "Submit Request"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
