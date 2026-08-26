"use client";

import { Mail, Building2, MapPin, Globe, LogOut, Trash2, Camera, Phone, FileText, Hash, CheckCircle, XCircle, X, SquarePen, Lock } from "lucide-react";

import { useAdminProfile } from "../logic/useAdminProfile";

import { Button } from "@/_components/ui/button";
import { Badge } from "@/_components/ui/badge";

import { ROLE_COLORS } from "@/_constants/theme/user";

export function AdminProfilePage() {
    const {
        profile, loading,

        activeModal, openModal, closeModal, setActiveModal,

        showDeleteConfirm, setShowDeleteConfirm,

        successMessage, errorMessage,

        register, handleSubmit, onSubmitProfile,
        profileErrors, saving,

        registerPassword, handlePasswordSubmit, onSubmitPassword,
        passwordErrors, changingPassword, getValues,

        userImage, agencyImage,

        userImagePreview, agencyImagePreview,

        handleUserImageChange, handleAgencyImageChange,
        resetUserImage, resetAgencyImage,

        uploadUserImage, uploadAgencyImage,

        handleLogout, loggingOut,

        handleDeleteAccount, deletingAccount,
    } = useAdminProfile();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />

                    <h2 className="text-2xl font-semibold text-gray-700">
                        Profile Not Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Unable to load profile information.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {successMessage && (
                <div className="fixed top-4 right-4 z-[100]">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-lg">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />

                            <p className="text-green-700 font-medium">
                                {successMessage}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="fixed top-4 right-4 z-[100]">
                    <div className="bg-red-50 border border-red-200 p-4 rounded-xl shadow-lg">
                        <div className="flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-red-500" />

                            <p className="text-red-700 font-medium">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto">
                <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">

                    <div className="h-48 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 relative">

                        <div className="absolute -bottom-16 left-8">
                            <div className="relative">

                                <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                                    {userImagePreview ? (
                                        <img
                                            src={userImagePreview}
                                            alt={profile.FullName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-slate-600 to-teal-600 flex items-center justify-center">
                                            <span className="text-4xl font-bold text-white">
                                                {profile.FullName?.charAt(0) || "A"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        openModal("user-photo")
                                    }
                                    className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-2 border-2 border-white hover:bg-teal-700 transition-colors shadow-md"
                                >
                                    <Camera className="h-4 w-4 text-white" />
                                </button>

                            </div>
                        </div>

                    </div>

                    {/* HEADER */}

                    <div className="pt-20 pb-8 px-8">

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                            <div>

                                <div className="flex items-center">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {profile.FullName}
                                    </h1>

                                    <Badge
                                        variant="outline"
                                        className={`ml-2 text-xs ${ROLE_COLORS[profile.Role]}`}
                                    >
                                        {profile.Role}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-2 mt-2 text-gray-600">
                                    <Mail className="h-4 w-4" />
                                    <span>
                                        {profile.Email}
                                    </span>
                                </div>

                                {profile.Phone && (
                                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                                        <Phone className="h-4 w-4" />

                                        <span>
                                            {profile.Phone}
                                        </span>
                                    </div>
                                )}

                            </div>

                            <Button
                                type="button"
                                onClick={() =>
                                    openModal("edit")
                                }
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white hover:bg-teal-700"
                            >
                                <SquarePen className="h-4 w-4" />
                                Edit Profile
                            </Button>

                        </div>

                        {/* BIO */}

                        {profile.Biography && (
                            <div className="mt-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-gray-500" />

                                    <h3 className="font-semibold text-gray-900">
                                        Biography
                                    </h3>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    {profile.Biography}
                                </p>
                            </div>
                        )}

                        {/* AGENCY */}

                        {profile.Agency && (
                            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-sm p-6">

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    <div className="flex items-center gap-3">

                                        <div className="h-16 w-16 rounded-full overflow-hidden bg-slate-800 border border-gray-900">
                                            {profile.Agency?.ProfileImage ? (
                                                <img
                                                    src={profile.Agency.ProfileImage}
                                                    alt={profile.Agency.AgencyName || "Agency"}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-slate-800">
                                                    <Building2 className="h-7 w-7 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        <div>

                                            <div className="flex items-center gap-2">

                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    {profile.Agency.AgencyName}
                                                </h2>

                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${profile.Agency.Status ===
                                                        "ACTIVE"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {profile.Agency.Status}
                                                </span>

                                            </div>

                                            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 italic">
                                                <Hash className="h-3 w-3" />

                                                <span>
                                                    {profile.Agency.AgencySlug}
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            openModal("edit")
                                        }
                                    >
                                        <SquarePen className="h-4 w-4" />
                                        Edit Agency
                                    </Button>

                                </div>

                                {profile.Agency.Description && (
                                    <p className="text-md text-gray-700 mt-5 leading-relaxed max-w-xl">
                                        {profile.Agency.Description}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                                    {profile.Agency.Contact && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-gray-500" />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Agency Phone
                                                </p>

                                                <p className="text-gray-700 mt-1">
                                                    {profile.Agency.Contact}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {profile.Agency.Email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-gray-500" />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Agency Email
                                                </p>

                                                <p className="text-gray-700 mt-1">
                                                    {profile.Agency.Email}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {profile.Agency.Location && (
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-gray-500" />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Location
                                                </p>

                                                <p className="text-gray-700 mt-1">
                                                    {profile.Agency.Location}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {profile.Agency.Website && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-gray-500" />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Website
                                                </p>

                                                <a
                                                    href={profile.Agency.Website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-teal-600 hover:underline mt-1 block break-all"
                                                >
                                                    {profile.Agency.Website}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* SUBSCRIPTION */}

                                <div className="mt-6 pt-5 border-t border-gray-200">

                                    <div className="flex flex-wrap gap-8">

                                        <div>
                                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                                Subscription Plan
                                            </p>

                                            <p className="text-sm font-semibold text-gray-800 mt-1 capitalize">
                                                {profile.Agency.SubscriptionPlan}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                                Subscription Status
                                            </p>

                                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                                {profile.Agency.SubscriptionStatus}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                        {/* ACTIONS */}

                        <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">

                            <Button
                                type="button"
                                onClick={() =>
                                    openModal("password")
                                }
                                variant="outline"
                                size="sm"
                            >
                                <Lock className="h-4 w-4" />
                                Change Password
                            </Button>

                            <div className="flex gap-3 ml-auto">

                                <Button
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={loggingOut}
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500"
                                >
                                    <LogOut className="h-4 w-4" />

                                    {loggingOut
                                        ? "Logging out..."
                                        : "Logout"}
                                </Button>

                                <Button
                                    type="button"
                                    onClick={() =>
                                        setShowDeleteConfirm(true)
                                    }
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete Account
                                </Button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* ================================================== */}
            {/* EDIT MODAL */}
            {/* ================================================== */}

            {activeModal === "edit" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">

                        <form
                            onSubmit={handleSubmit(
                                onSubmitProfile
                            )}
                            className="p-6"
                        >

                            <div className="flex items-center justify-between mb-6">

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Edit Profile
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Update your personal and agency information.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                            </div>

                            {/* PERSONAL */}

                            <div className="space-y-6">

                                <div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Personal Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>

                                            <input
                                                {...register(
                                                    "fullName",
                                                    {
                                                        required:
                                                            "Full name is required.",
                                                    }
                                                )}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                            />

                                            {profileErrors.fullName && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    {
                                                        profileErrors.fullName.message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                {...register(
                                                    "email",
                                                    {
                                                        required:
                                                            "Email is required.",
                                                    }
                                                )}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone
                                            </label>

                                            <input
                                                {...register(
                                                    "phone"
                                                )}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                            />
                                        </div>

                                    </div>

                                    <div className="mt-4">

                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Biography
                                        </label>

                                        <textarea
                                            rows={4}
                                            {...register(
                                                "biography"
                                            )}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                        />

                                    </div>

                                </div>

                                {/* AGENCY */}

                                {profile.Agency && (
                                    <div className="border-t pt-6">

                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            Agency Information
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Agency Name
                                                </label>

                                                <input
                                                    {...register(
                                                        "agencyName"
                                                    )}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Agency Slug
                                                </label>

                                                <div className="relative">

                                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                                                    <input
                                                        {...register(
                                                            "agencySlug"
                                                        )}
                                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg"
                                                    />

                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Contact
                                                </label>

                                                <input
                                                    {...register(
                                                        "agencyContact"
                                                    )}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Agency Email
                                                </label>

                                                <input
                                                    type="email"
                                                    {...register(
                                                        "agencyEmail"
                                                    )}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Location
                                                </label>

                                                <input
                                                    {...register(
                                                        "agencyLocation"
                                                    )}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Website
                                                </label>

                                                <input
                                                    type="url"
                                                    {...register(
                                                        "agencyWebsite"
                                                    )}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                                />
                                            </div>

                                        </div>

                                        <div className="mt-4">

                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>

                                            <textarea
                                                rows={4}
                                                {...register(
                                                    "agencyDescription"
                                                )}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none"
                                            />

                                        </div>

                                    </div>
                                )}

                                <div className="flex gap-3 pt-4 border-t">

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg disabled:opacity-50"
                                    >
                                        {saving
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetUserImage();
                                            setActiveModal(null);
                                        }}
                                        className="px-4 py-2.5 border border-gray-300 rounded-lg"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>
                </div>
            )}

            {/* ================================================== */}
            {/* USER PHOTO MODAL */}
            {/* ================================================== */}

            {activeModal === "user-photo" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl max-w-md w-full p-6">

                        <div className="flex items-center justify-between mb-5">

                            <h2 className="text-xl font-bold">
                                Update Profile Photo
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>

                        </div>

                        <label className="block cursor-pointer">

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500">

                                <Camera className="h-10 w-10 mx-auto text-gray-400 mb-3" />

                                <p className="font-medium text-gray-700">
                                    Choose profile image
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    PNG, JPG or WEBP
                                </p>

                            </div>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={handleUserImageChange}
                            />

                        </label>

                        {userImage && (
                            <div className="mt-4">

                                <p className="text-sm text-gray-500">
                                    Selected:
                                </p>

                                <p className="text-sm font-medium mt-1">
                                    {userImage.name}
                                </p>

                            </div>
                        )}

                        <div className="flex gap-3 mt-6">

                            <button
                                type="button"
                                onClick={uploadUserImage}
                                disabled={!userImage}
                                className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg disabled:opacity-50"
                            >
                                Upload Image
                            </button>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* ================================================== */}
            {/* AGENCY PHOTO MODAL */}
            {/* ================================================== */}

            {activeModal === "agency-photo" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl max-w-md w-full p-6">

                        <div className="flex items-center justify-between mb-5">

                            <h2 className="text-xl font-bold">
                                Update Agency Image
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>

                        </div>

                        <label className="block cursor-pointer">

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500">

                                <Building2 className="h-10 w-10 mx-auto text-gray-400 mb-3" />

                                <p className="font-medium text-gray-700">
                                    Choose agency image
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    PNG, JPG or WEBP
                                </p>

                            </div>

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={handleAgencyImageChange}
                            />

                        </label>

                        {agencyImage && (
                            <div className="mt-4">

                                <p className="text-sm text-gray-500">
                                    Selected:
                                </p>

                                <p className="text-sm font-medium mt-1">
                                    {agencyImage.name}
                                </p>

                            </div>
                        )}

                        <div className="flex gap-3 mt-6">

                            <button
                                type="button"
                                onClick={uploadAgencyImage}
                                disabled={!agencyImage}
                                className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg disabled:opacity-50"
                            >
                                Upload Image
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    resetAgencyImage();
                                    setActiveModal(null);
                                }}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {/* ================================================== */}
            {/* PASSWORD MODAL */}
            {/* ================================================== */}

            {activeModal === "password" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl max-w-md w-full p-6">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-2xl font-bold">
                                Change Password
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>

                        </div>

                        <form
                            onSubmit={handlePasswordSubmit(
                                onSubmitPassword
                            )}
                            className="space-y-4"
                        >

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    {...registerPassword(
                                        "currentPassword",
                                        {
                                            required:
                                                "Current password is required.",
                                        }
                                    )}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                />

                                {passwordErrors.currentPassword && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {
                                            passwordErrors
                                                .currentPassword
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    {...registerPassword(
                                        "newPassword",
                                        {
                                            required:
                                                "New password is required.",

                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Password must be at least 6 characters.",
                                            },
                                        }
                                    )}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                />

                                {passwordErrors.newPassword && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {
                                            passwordErrors
                                                .newPassword
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>

                                <input
                                    type="password"
                                    {...registerPassword("confirmPassword", {
                                        required: "Please confirm your password.",
                                        validate: (value) =>
                                            value === getValues("newPassword") ||
                                            "Passwords do not match.",
                                    })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                />

                                {passwordErrors.confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {
                                            passwordErrors
                                                .confirmPassword
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">

                                <button
                                    type="submit"
                                    disabled={changingPassword}
                                    className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg disabled:opacity-50"
                                >
                                    {changingPassword
                                        ? "Updating..."
                                        : "Update Password"}
                                </button>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2.5 border border-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

            {/* ================================================== */}
            {/* DELETE MODAL */}
            {/* ================================================== */}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl max-w-md w-full p-6">

                        <div className="text-center">

                            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <Trash2 className="h-8 w-8 text-red-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">
                                Delete Account
                            </h2>

                            <p className="text-gray-600 mt-2">
                                Are you sure you want to delete your
                                account? This action cannot be undone.
                            </p>

                            <div className="flex gap-3 mt-6">

                                <button
                                    type="button"
                                    onClick={
                                        handleDeleteAccount
                                    }
                                    disabled={
                                        deletingAccount
                                    }
                                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg disabled:opacity-50"
                                >
                                    {deletingAccount
                                        ? "Deleting..."
                                        : "Yes, Delete Account"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowDeleteConfirm(
                                            false
                                        )
                                    }
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
