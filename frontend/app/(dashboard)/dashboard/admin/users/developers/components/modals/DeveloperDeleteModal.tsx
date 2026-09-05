import { Loader2, Trash2, X } from "lucide-react";

import { Button } from "@/_components/ui/button";
import type { Developer } from "@/_lib/services/admin/users/developer.service";

interface DeveloperDeleteModalProps {
    developer: Developer | null;
    deleting: boolean;

    onClose: () => void;
    onDelete: () => void;
}

export function DeveloperDeleteModal({
    developer,
    deleting,
    onClose,
    onDelete,
}: DeveloperDeleteModalProps) {
    if (!developer) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl">

                {/* HEADER */}
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-red-50 text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Delete Developer
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={deleting}
                        className="text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* CONTENT */}
                <p className="text-sm leading-6 text-gray-500">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-gray-900">
                        {developer.FullName}
                    </span>
                    ?
                </p>

                {/* FOOTER */}
                <div className="mt-6 flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={deleting}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onDelete}
                        disabled={deleting}
                    >
                        {deleting && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        {deleting
                            ? "Deleting..."
                            : "Delete Developer"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
