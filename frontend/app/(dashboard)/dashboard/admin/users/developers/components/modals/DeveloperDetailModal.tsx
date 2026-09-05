import { X } from "lucide-react";

import type { Developer } from "@/_lib/services/admin/users/developer.service";

import { getInitials, getPhoneFormat } from "../../logic/adminDeveloperHelpers";
import { DetailItem } from "../DetailItem";
import { StatusBadge } from "../StatusBadge";
import { Button } from "@/_components/ui/button";
import { formatDateLongTime } from "@/_lib/helpers/date-formatter";

interface DeveloperDetailModalProps {
    developer: Developer | null;
    loading: boolean;
    onClose: () => void;
}

export function DeveloperDetailModal({
    developer,
    loading,
    onClose,
}: DeveloperDetailModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl">

                {loading ? (
                    <div className="animate-pulse space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="h-6 w-40 rounded-sm bg-gray-200" />
                            <div className="h-5 w-5 rounded-sm bg-gray-200" />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-gray-200" />

                            <div className="flex-1 space-y-2">
                                <div className="h-5 w-36 rounded-sm bg-gray-200" />
                                <div className="h-4 w-48 rounded-sm bg-gray-200" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="h-12 rounded-sm bg-gray-100" />
                            <div className="h-12 rounded-sm bg-gray-100" />
                            <div className="h-12 rounded-sm bg-gray-100" />
                            <div className="h-20 rounded-sm bg-gray-100" />
                        </div>
                    </div>
                ) : developer ? (
                    <>
                        {/* HEADER */}
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Developer Detail
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Developer information.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-400 transition hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* PROFILE */}
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-lg font-medium text-gray-600">
                                {developer.ProfileImage ? (
                                    <img
                                        src={developer.ProfileImage}
                                        alt={developer.FullName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    getInitials(
                                        developer.FullName
                                    )
                                )}
                            </div>

                            <div className="min-w-0 space-y-1">
                                <h3 className="truncate text-base font-semibold text-gray-900">
                                    {developer.FullName}
                                </h3>

                                <p className="truncate text-sm text-gray-700">
                                    {developer.Email}
                                </p>

                                <p className="truncate text-xs text-gray-500">
                                    {getPhoneFormat(developer.Phone)}
                                </p>
                            </div>
                        </div>

                        {/* INFORMATION */}
                        <div className="space-y-4">
                            <DetailItem
                                label="Role"
                                value={developer.Role}
                            />

                            <div>
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Status
                                </p>

                                <StatusBadge
                                    isActive={
                                        developer.IsActive
                                    }
                                />
                            </div>

                            <DetailItem
                                label="Biography"
                                value={
                                    developer.Biography || "-"
                                }
                            />

                            <div className="gap-4">
                                <p className="text-sm text-gray-700">Created At : {formatDateLongTime(developer.CreatedAt)}</p>
                                <p className="text-xs text-gray-500">Updated At : {formatDateLongTime(developer.UpdatedAt)}</p>
                            </div>

                            <DetailItem
                                label="Last Login"
                                value={
                                    developer.LastLogin
                                        ? formatDateLongTime(
                                            developer.LastLogin
                                        )
                                        : "Never"
                                }
                            />
                        </div>

                        {/* FOOTER */}
                        <div className="mt-6 flex justify-end border-t border-gray-200 pt-5">
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={onClose}

                            >
                                Close
                            </Button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
