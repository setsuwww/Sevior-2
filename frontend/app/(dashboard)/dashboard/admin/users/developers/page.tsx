"use client";

import {
    Code2,
    Plus,
} from "lucide-react";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/_components/ui/table";

import { SectionHeader } from "@/_components/ui/common/SectionHeader";

import {
    formatDate,
    getInitials,
    useAdminDeveloper,
} from "./logic/useAdminDeveloper";

export default function DevelopersPage() {
    const {
        filteredDevelopers,

        loading,
        submitting,
        deleting,
        detailLoading,

        search,
        setSearch,

        form,
        formError,
        editingDeveloper,
        showForm,

        selectedDeveloper,
        deleteTarget,

        error,

        handleOpenCreate,
        handleOpenEdit,
        handleCloseForm,
        handleFormChange,
        handleSubmit,

        handleOpenDetail,
        handleCloseDetail,

        handleOpenDelete,
        handleCloseDelete,
        handleDelete,

        handleClearError,
    } = useAdminDeveloper();

    return (
        <div className="p-6">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-6 flex items-center justify-between">
                <SectionHeader
                    icon={Code2}
                    title="Developers"
                    description="Manage agency developers."
                />

                <Button
                    type="button"
                    onClick={handleOpenCreate}
                    variant="default"
                >
                    <Plus />
                    Add Developer
                </Button>
            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
                <div className="mb-4 flex items-center justify-between rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <span>{error}</span>

                    <button
                        type="button"
                        onClick={handleClearError}
                        className="ml-4 font-medium text-red-700"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* ==================================================
                SEARCH
            ================================================== */}

            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="relative w-full max-w-md">
                    <Input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search developer by name..."
                        type="text"
                        typeSearch
                    />
                </div>

                {!loading && (
                    <p className="shrink-0 text-sm text-gray-500">
                        {filteredDevelopers.length}{" "}
                        {filteredDevelopers.length === 1
                            ? "developer"
                            : "developers"}
                    </p>
                )}
            </div>

            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="border-b bg-gray-50 px-4 py-3">
                            <div className="h-4 w-full rounded-sm bg-gray-200" />
                        </div>

                        <div className="space-y-4 p-4">
                            <div className="h-12 rounded-sm bg-gray-100" />
                            <div className="h-12 rounded-sm bg-gray-100" />
                            <div className="h-12 rounded-sm bg-gray-100" />
                            <div className="h-12 rounded-sm bg-gray-100" />
                        </div>
                    </div>
                ) : (
                    <Table>
                        {/* ==================================================
                            HEADER
                        ================================================== */}

                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4">
                                    Name
                                </TableHead>

                                <TableHead className="px-4">
                                    Email
                                </TableHead>

                                <TableHead className="px-4">
                                    Phone
                                </TableHead>

                                <TableHead className="px-4">
                                    Status
                                </TableHead>

                                <TableHead className="px-4 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* ==================================================
                            BODY
                        ================================================== */}

                        <TableBody>
                            {filteredDevelopers.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="px-4 py-12 text-center"
                                    >
                                        <div className="text-sm text-gray-500">
                                            {search.trim()
                                                ? "No developers found matching your search."
                                                : "No developers found."}
                                        </div>

                                        {!search.trim() && (
                                            <button
                                                type="button"
                                                onClick={handleOpenCreate}
                                                className="mt-3 text-sm font-medium text-black underline"
                                            >
                                                Add your first developer
                                            </button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredDevelopers.map(
                                    (developer) => (
                                        <TableRow
                                            key={developer.ID}
                                        >
                                            {/* NAME */}

                                            <TableCell className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                                        {getInitials(
                                                            developer.FullName
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {
                                                                developer.FullName
                                                            }
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            {
                                                                developer.Role
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* EMAIL */}

                                            <TableCell className="px-4 py-3 text-gray-600">
                                                {developer.Email}
                                            </TableCell>

                                            {/* PHONE */}

                                            <TableCell className="px-4 py-3 text-gray-600">
                                                {developer.Phone ||
                                                    "-"}
                                            </TableCell>

                                            {/* STATUS */}

                                            <TableCell className="px-4 py-3">
                                                <StatusBadge
                                                    isActive={
                                                        developer.IsActive
                                                    }
                                                />
                                            </TableCell>

                                            {/* ACTIONS */}

                                            <TableCell className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleOpenDetail(
                                                                developer
                                                            )
                                                        }
                                                        className="rounded-sm border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                                                    >
                                                        Detail
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleOpenEdit(
                                                                developer
                                                            )
                                                        }
                                                        className="rounded-sm border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleOpenDelete(
                                                                developer
                                                            )
                                                        }
                                                        className="rounded-sm border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* ==================================================
                CREATE / UPDATE MODAL
            ================================================== */}

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm bg-white p-6 shadow-xl">
                        {/* HEADER */}

                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {editingDeveloper
                                        ? "Edit Developer"
                                        : "Add Developer"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {editingDeveloper
                                        ? "Update developer information."
                                        : "Create a new developer for your agency."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleCloseForm}
                                disabled={submitting}
                                className="text-gray-400 transition hover:text-gray-700 disabled:cursor-not-allowed"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ERROR */}

                        {formError && (
                            <div className="mb-4 rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                                {formError}
                            </div>
                        )}

                        {/* FORM */}

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
                                    placeholder="John Doe"
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
                                    placeholder="john@sevior.com"
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
                                    placeholder="08123456789"
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
                                    placeholder="Tell something about this developer..."
                                    rows={4}
                                    disabled={submitting}
                                    className="w-full resize-none rounded-sm border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-400 disabled:bg-gray-100"
                                />
                            </div>

                            {/* STATUS */}

                            {editingDeveloper && (
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
                                                event.target.value ===
                                                "ACTIVE"
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
                            )}

                            {/* BUTTONS */}

                            <div className="flex justify-end gap-2 border-t pt-5">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    disabled={submitting}
                                    className="rounded-sm border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="rounded-sm bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {submitting
                                        ? editingDeveloper
                                            ? "Updating..."
                                            : "Creating..."
                                        : editingDeveloper
                                            ? "Update"
                                            : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ==================================================
                DETAIL MODAL
            ================================================== */}

            {(detailLoading || selectedDeveloper) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl">
                        {detailLoading ? (
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
                        ) : (
                            selectedDeveloper && (
                                <>
                                    {/* HEADER */}

                                    <div className="mb-6 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                Developer Detail
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Developer information.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={
                                                handleCloseDetail
                                            }
                                            className="text-gray-400 transition hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* PROFILE */}

                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-lg font-medium text-gray-600">
                                            {selectedDeveloper.ProfileImage ? (
                                                <img
                                                    src={
                                                        selectedDeveloper.ProfileImage
                                                    }
                                                    alt={
                                                        selectedDeveloper.FullName
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                getInitials(
                                                    selectedDeveloper.FullName
                                                )
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="truncate text-base font-semibold text-gray-900">
                                                {
                                                    selectedDeveloper.FullName
                                                }
                                            </h3>

                                            <p className="truncate text-sm text-gray-500">
                                                {
                                                    selectedDeveloper.Email
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* INFORMATION */}

                                    <div className="space-y-4">
                                        <DetailItem
                                            label="Phone"
                                            value={
                                                selectedDeveloper.Phone ||
                                                "-"
                                            }
                                        />

                                        <DetailItem
                                            label="Role"
                                            value={
                                                selectedDeveloper.Role
                                            }
                                        />

                                        <div>
                                            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Status
                                            </p>

                                            <StatusBadge
                                                isActive={
                                                    selectedDeveloper.IsActive
                                                }
                                            />
                                        </div>

                                        <DetailItem
                                            label="Biography"
                                            value={
                                                selectedDeveloper.Biography ||
                                                "-"
                                            }
                                        />

                                        <DetailItem
                                            label="Created At"
                                            value={formatDate(
                                                selectedDeveloper.CreatedAt
                                            )}
                                        />

                                        <DetailItem
                                            label="Last Login"
                                            value={
                                                selectedDeveloper.LastLogin
                                                    ? formatDate(
                                                        selectedDeveloper.LastLogin
                                                    )
                                                    : "Never"
                                            }
                                        />
                                    </div>

                                    {/* FOOTER */}

                                    <div className="mt-6 flex justify-end border-t pt-5">
                                        <button
                                            type="button"
                                            onClick={
                                                handleCloseDetail
                                            }
                                            className="rounded-sm border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* ==================================================
                DELETE CONFIRMATION
            ================================================== */}

            {deleteTarget && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-xl">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Delete Developer
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Are you sure you want to delete{" "}
                                <span className="font-medium text-gray-900">
                                    {deleteTarget.FullName}
                                </span>
                                ? This action cannot be undone.
                            </p>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCloseDelete}
                                disabled={deleting}
                                className="rounded-sm border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="rounded-sm bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ==========================================================
// STATUS BADGE
// ==========================================================

function StatusBadge({
    isActive,
}: {
    isActive: boolean;
}) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${isActive
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-500"
                }`}
        >
            <span
                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${isActive
                    ? "bg-green-500"
                    : "bg-gray-400"
                    }`}
            />

            {isActive ? "Active" : "Inactive"}
        </span>
    );
}

// ==========================================================
// DETAIL ITEM
// ==========================================================

function DetailItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="whitespace-pre-wrap break-words text-sm text-gray-700">
                {value}
            </p>
        </div>
    );
}
