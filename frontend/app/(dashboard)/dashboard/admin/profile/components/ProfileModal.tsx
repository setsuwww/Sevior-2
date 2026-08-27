"use client";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { PROFILE_THEMES, ProfileTheme } from "@/_constants/theme/profile";
import { Building2, Camera, Hash, X } from "lucide-react";

interface ProfileModalProps {
    profile: any;

    profileTheme: ProfileTheme;
    onProfileThemeChange: (theme: ProfileTheme) => void;

    userImage: File | null;
    agencyImage: File | null;

    userImagePreview: string | null;
    agencyImagePreview: string | null;

    onUserImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAgencyImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

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

    profileTheme, onProfileThemeChange,
    userImage, agencyImage,
    userImagePreview, agencyImagePreview,
    onUserImageChange, onAgencyImageChange,
    onSubmit, onClose,

    register,
    errors,
    saving,

    resetUserImage,
    resetAgencyImage,
}: ProfileModalProps) {
    const theme = PROFILE_THEMES[profileTheme] ?? PROFILE_THEMES["slate-teal"];
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm bg-white">
                <form onSubmit={onSubmit}>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-olive-200 p-6">
                        <div>
                            <h2 className="text-2xl font-bold text-olive-900">
                                Edit Profile
                            </h2>

                            <p className="mt-1 text-sm text-olive-500">
                                Update your personal and agency information.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-sm p-2 transition-colors hover:bg-olive-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-6 p-6">
                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-olive-900">
                                    Banner Appearance
                                </h3>

                                <p className="mt-1 text-sm text-olive-500">
                                    Choose a color theme for your profile banner.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {(Object.entries(PROFILE_THEMES) as [ProfileTheme, (typeof PROFILE_THEMES)[ProfileTheme]][]
                                ).map(([theme, config]) => {
                                    const isSelected = profileTheme === theme;

                                    return (
                                        <button key={theme} type="button" onClick={() => onProfileThemeChange(theme)}
                                            className="group flex flex-col items-center gap-2"
                                        >
                                            <div className={`relative h-12 w-12 rounded-full bg-gradient-to-br ${config.avatar} transition-all duration-200
                                                    ${isSelected
                                                    ? "ring-2 ring-olive-400 ring-offset-2"
                                                    : "hover:scale-105"
                                                }`}
                                            >
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <span className="text-sm font-semibold text-white">
                                                        A
                                                    </span>
                                                </div>
                                            </div>

                                            <span
                                                className={`text-xs font-medium ${isSelected
                                                    ? "text-slate-900"
                                                    : "text-slate-500"
                                                    }`}
                                            >
                                                {config.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <div className={`relative mb-5 h-28 overflow-hidden rounded-sm bg-gradient-to-r ${theme.banner}`} />

                        <section>
                            <div className="flex items-center gap-5">
                                <div className="h-20 w-20 overflow-hidden rounded-full border border-olive-200 bg-slate-100">
                                    {userImagePreview ? (
                                        <img
                                            src={userImagePreview}
                                            alt={profile.FullName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${PROFILE_THEMES[profileTheme].avatar}`}>
                                            <span className="text-2xl font-bold text-white">
                                                {profile.FullName?.charAt(
                                                    0,
                                                ) || "A"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label className="flex cursor-pointer items-center gap-1 rounded-sm border border-olive-300 bg-white px-2 py-1 text-xs font-medium text-olive-700 transition-colors hover:bg-olive-50">
                                        <Camera className="h-4 w-4" />

                                        Change Photo

                                        <Input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            className="hidden"
                                            onChange={
                                                onUserImageChange
                                            }
                                        />
                                    </Label>

                                    {userImage && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <p className="text-xs text-olive-500">
                                                {userImage.name}
                                            </p>

                                            <Button
                                                type="button"
                                                onClick={
                                                    resetUserImage
                                                }
                                                className="text-xs text-red-500 hover:underline"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    )}

                                    <p className="mt-1 text-xs text-olive-400">
                                        PNG, JPG or WEBP
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* PERSONAL */}
                        {/* ================================================= */}

                        <section>
                            <h3 className="mb-4 text-lg font-semibold text-olive-900">
                                Personal Information
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label className="mb-1 block text-sm font-medium text-olive-700">
                                        Full Name
                                    </Label>

                                    <Input
                                        {...register("fullName", {
                                            required:
                                                "Full name is required.",
                                        })}
                                        className="w-full rounded-sm border border-olive-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                                    />

                                    {errors.fullName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label className="mb-1 block text-sm font-medium text-olive-700">
                                        Email
                                    </Label>

                                    <Input
                                        type="email"
                                        {...register("email", {
                                            required:
                                                "Email is required.",
                                        })}
                                        className="w-full rounded-sm border border-olive-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label className="mb-1 block text-sm font-medium text-olive-700">
                                        Phone
                                    </Label>

                                    <Input
                                        {...register("phone")}
                                        className="w-full rounded-sm border border-olive-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <Label className="mb-1 block text-sm font-medium text-olive-700">
                                    Biography
                                </Label>

                                <textarea
                                    rows={4}
                                    {...register("biography")}
                                    className="w-full resize-none rounded-sm border border-olive-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </section>

                        {/* ================================================= */}
                        {/* AGENCY */}
                        {/* ================================================= */}

                        {profile.Agency && (
                            <section className="border-t border-olive-200 pt-6">
                                <h3 className="mb-4 text-lg font-semibold text-olive-900">
                                    Agency Information
                                </h3>

                                {/* Agency Image */}
                                <div className="mb-6 flex items-center gap-5">
                                    <div className="h-20 w-20 overflow-hidden rounded-full border border-olive-200 bg-slate-800">
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
                                        <Label className="flex cursor-pointer items-center gap-1 rounded-sm border border-olive-300 bg-white px-2 py-1 text-xs font-medium text-olive-700 transition-colors hover:bg-olive-50">
                                            <Camera className="h-4 w-4" />

                                            Change Agency Photo

                                            <Input
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp"
                                                className="hidden"
                                                onChange={
                                                    onAgencyImageChange
                                                }
                                            />
                                        </Label>

                                        {agencyImage && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <p className="text-xs text-olive-500">
                                                    {
                                                        agencyImage.name
                                                    }
                                                </p>

                                                <Button
                                                    type="button"
                                                    onClick={
                                                        resetAgencyImage
                                                    }
                                                    className="text-xs text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        )}

                                        <p className="mt-1 text-xs text-olive-400">
                                            PNG, JPG or WEBP
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label className="mb-1 block text-sm font-medium text-olive-700">
                                            Agency Name
                                        </Label>

                                        <Input
                                            {...register(
                                                "agencyName",
                                            )}
                                            className="w-full rounded-sm border border-olive-300 px-4 py-2.5"
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-1 block text-sm font-medium text-olive-700">
                                            Agency Slug
                                        </Label>

                                        <div className="relative">
                                            <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-olive-400" />

                                            <Input
                                                {...register(
                                                    "agencySlug",
                                                )}
                                                className="w-full rounded-sm border border-olive-300 py-2.5 pl-9 pr-4"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="mb-1 block text-sm font-medium text-olive-700">
                                            Contact
                                        </Label>

                                        <Input
                                            {...register(
                                                "agencyContact",
                                            )}
                                            className="w-full rounded-sm border border-olive-300 px-4 py-2.5"
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-1 block text-sm font-medium text-olive-700">
                                            Agency Email
                                        </Label>

                                        <Input
                                            type="email"
                                            {...register(
                                                "agencyEmail",
                                            )}
                                            className="w-full rounded-sm border border-olive-300 px-4 py-2.5"
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-1 block text-sm font-medium text-olive-700">
                                            Location
                                        </Label>

                                        <Input
                                            {...register(
                                                "agencyLocation",
                                            )}
                                            className="w-full rounded-sm border border-olive-300 px-4 py-2.5"
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-1 block text-sm font-medium text-olive-700">
                                            Website
                                        </Label>

                                        <Input
                                            type="url"
                                            {...register(
                                                "agencyWebsite",
                                            )}
                                            className="w-full rounded-sm border border-olive-300 px-4 py-2.5"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Label className="mb-1 block text-sm font-medium text-olive-700">
                                        Description
                                    </Label>

                                    <textarea
                                        rows={4}
                                        {...register(
                                            "agencyDescription",
                                        )}
                                        className="w-full resize-none rounded-sm border border-olive-300 px-4 py-2.5"
                                    />
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 border-t border-olive-200 p-6">
                        <Button
                            type="button"
                            onClick={onClose} variant="outline"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
