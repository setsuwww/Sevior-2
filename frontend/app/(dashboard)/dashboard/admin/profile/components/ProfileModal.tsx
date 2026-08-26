"use client";

import {
    Building2,
    Camera,
    Hash,
    X,
} from "lucide-react";

interface ProfileModalProps {
    profile: any;

    userImage: File | null;
    agencyImage: File | null;

    userImagePreview: string | null;
    agencyImagePreview: string | null;

    onUserImageChange: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;

    onAgencyImageChange: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;

    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

    onClose: () => void;

    register: any;
    errors: any;
    saving: boolean;

    resetUserImage: () => void;
    resetAgencyImage: () => void;
}

export default function ProfileModal({
    profile,
    userImage,
    agencyImage,

    userImagePreview,
    agencyImagePreview,

    onUserImageChange,
    onAgencyImageChange,

    onSubmit,
    onClose,

    register,
    errors,
    saving,

    resetUserImage,
    resetAgencyImage,
}: ProfileModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-sm bg-white">
                <form onSubmit={onSubmit}>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 p-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Edit Profile
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Update your personal and agency information.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-sm p-2 transition-colors hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-8 p-6">
                        {/* ================================================= */}
                        {/* USER IMAGE */}
                        {/* ================================================= */}

                        <section>
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                Profile Photo
                            </h3>

                            <div className="flex items-center gap-5">
                                <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-slate-100">
                                    {userImagePreview ? (
                                        <img
                                            src={userImagePreview}
                                            alt={profile.FullName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-600 to-teal-600">
                                            <span className="text-2xl font-bold text-white">
                                                {profile.FullName?.charAt(
                                                    0,
                                                ) || "A"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                        <Camera className="h-4 w-4" />

                                        Change Photo

                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            className="hidden"
                                            onChange={
                                                onUserImageChange
                                            }
                                        />
                                    </label>

                                    {userImage && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <p className="text-xs text-gray-500">
                                                {userImage.name}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={
                                                    resetUserImage
                                                }
                                                className="text-xs text-red-500 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}

                                    <p className="mt-1 text-xs text-gray-400">
                                        PNG, JPG or WEBP
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* PERSONAL */}
                        {/* ================================================= */}

                        <section>
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>

                                    <input
                                        {...register("fullName", {
                                            required:
                                                "Full name is required.",
                                        })}
                                        className="w-full rounded-sm border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                                    />

                                    {errors.fullName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        {...register("email", {
                                            required:
                                                "Email is required.",
                                        })}
                                        className="w-full rounded-sm border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>

                                    <input
                                        {...register("phone")}
                                        className="w-full rounded-sm border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Biography
                                </label>

                                <textarea
                                    rows={4}
                                    {...register("biography")}
                                    className="w-full resize-none rounded-sm border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* AGENCY */}
                        {/* ================================================= */}

                        {profile.Agency && (
                            <section className="border-t border-gray-200 pt-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    Agency Information
                                </h3>

                                {/* Agency Image */}
                                <div className="mb-6 flex items-center gap-5">
                                    <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-slate-800">
                                        {agencyImagePreview ? (
                                            <img
                                                src={
                                                    agencyImagePreview
                                                }
                                                alt={
                                                    profile.Agency
                                                        .AgencyName
                                                }
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Building2 className="h-8 w-8 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                            <Camera className="h-4 w-4" />

                                            Change Agency Photo

                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp"
                                                className="hidden"
                                                onChange={
                                                    onAgencyImageChange
                                                }
                                            />
                                        </label>

                                        {agencyImage && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <p className="text-xs text-gray-500">
                                                    {
                                                        agencyImage.name
                                                    }
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={
                                                        resetAgencyImage
                                                    }
                                                    className="text-xs text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}

                                        <p className="mt-1 text-xs text-gray-400">
                                            PNG, JPG or WEBP
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Agency Name
                                        </label>

                                        <input
                                            {...register(
                                                "agencyName",
                                            )}
                                            className="w-full rounded-sm border border-gray-300 px-4 py-2.5"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Agency Slug
                                        </label>

                                        <div className="relative">
                                            <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                            <input
                                                {...register(
                                                    "agencySlug",
                                                )}
                                                className="w-full rounded-sm border border-gray-300 py-2.5 pl-9 pr-4"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Contact
                                        </label>

                                        <input
                                            {...register(
                                                "agencyContact",
                                            )}
                                            className="w-full rounded-sm border border-gray-300 px-4 py-2.5"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Agency Email
                                        </label>

                                        <input
                                            type="email"
                                            {...register(
                                                "agencyEmail",
                                            )}
                                            className="w-full rounded-sm border border-gray-300 px-4 py-2.5"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Location
                                        </label>

                                        <input
                                            {...register(
                                                "agencyLocation",
                                            )}
                                            className="w-full rounded-sm border border-gray-300 px-4 py-2.5"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Website
                                        </label>

                                        <input
                                            type="url"
                                            {...register(
                                                "agencyWebsite",
                                            )}
                                            className="w-full rounded-sm border border-gray-300 px-4 py-2.5"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        {...register(
                                            "agencyDescription",
                                        )}
                                        className="w-full resize-none rounded-sm border border-gray-300 px-4 py-2.5"
                                    />
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 border-t border-gray-200 p-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 rounded-sm bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-sm border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
