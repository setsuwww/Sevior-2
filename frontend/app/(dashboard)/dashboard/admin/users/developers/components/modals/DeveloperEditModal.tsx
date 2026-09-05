import { Loader2, X } from "lucide-react";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import type { Developer } from "@/_lib/services/admin/users/developer.service";

interface DeveloperForm {
    full_name: string;
    email: string;
    phone: string;
    biography: string;
    is_active: boolean;
}

interface DeveloperEditModalProps {
    developer: Developer;

    form: DeveloperForm;
    formError: string | null;
    submitting: boolean;

    handleClose: () => void;

    handleFormChange: (
        field: keyof DeveloperForm,
        value: string | boolean
    ) => void;

    handleSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => void;
}

export function DeveloperEditModal({
    developer,
    form,
    formError,
    submitting,
    handleClose,
    handleFormChange,
    handleSubmit,
}: DeveloperEditModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm bg-white p-6 shadow-xl">

                {/* HEADER */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Edit Developer
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Update {developer.FullName}'s information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={submitting}
                        className="text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* ERROR */}
                {formError && (
                    <div className="mb-4 rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                        {formError}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* FULL NAME */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
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
                            disabled={submitting}
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
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
                            disabled={submitting}
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
                            Phone
                        </label>

                        <Input
                            type="text"
                            value={form.phone}
                            onChange={(event) =>
                                handleFormChange(
                                    "phone",
                                    event.target.value
                                )
                            }
                            disabled={submitting}
                        />
                    </div>

                    {/* BIOGRAPHY */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
                            Biography
                        </label>

                        <textarea
                            value={form.biography}
                            onChange={(event) =>
                                handleFormChange(
                                    "biography",
                                    event.target.value
                                )
                            }
                            rows={4}
                            disabled={submitting}
                            className="w-full resize-none rounded-sm border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-400 disabled:bg-gray-100"
                        />
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
                            Status
                        </label>

                        <select
                            value={
                                form.is_active
                                    ? "ACTIVE"
                                    : "INACTIVE"
                            }
                            onChange={(event) =>
                                handleFormChange(
                                    "is_active",
                                    event.target.value === "ACTIVE"
                                )
                            }
                            disabled={submitting}
                            className="w-full rounded-sm border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-400 disabled:bg-gray-100"
                        >
                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>
                        </select>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-end gap-2 border-t border-gray-200 pt-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}

                            {submitting
                                ? "Updating..."
                                : "Update Developer"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
