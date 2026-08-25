"use client";

import { useEffect, useState } from "react";
import { Mail, Building2, MapPin, Globe, Edit3, Key, LogOut, Trash2, Camera, Phone, FileText, Hash, CheckCircle, XCircle, X } from "lucide-react";
import {
    fetchUserProfile,
    updateUserProfile,
    changeUserPassword,
    UserProfile,
} from "@/_lib/services/admin/profile.service";
import { authService } from "@/_lib/auth";

export function AdminProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const [activeModal, setActiveModal] = useState<"edit" | "password" | "user-photo" | "agency-photo" | null>(null);

    const [editForm, setEditForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        biography: "",

        agencyName: "",
        agencySlug: "",
        agencyContact: "",
        agencyEmail: "",
        agencyDescription: "",
        agencyWebsite: "",
        agencyLocation: "",
    });

    const [userImage, setUserImage] = useState<File | null>(null);
    const [agencyImage, setAgencyImage] = useState<File | null>(null);

    const [userImagePreview, setUserImagePreview] = useState<string | null>(null);

    const [agencyImagePreview, setAgencyImagePreview] = useState<string | null>(null);

    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();

                setProfile(data);

                setEditForm({
                    fullName: data.FullName || "",
                    email: data.Email || "",
                    phone: data.Phone || "",
                    biography: data.Biography || "",

                    agencyName: data.Agency?.AgencyName || "",
                    agencySlug: data.Agency?.AgencySlug || "",
                    agencyContact: data.Agency?.Contact || "",
                    agencyEmail: data.Agency?.Email || "",
                    agencyDescription: data.Agency?.Description || "",
                    agencyWebsite: data.Agency?.Website || "",
                    agencyLocation: data.Agency?.Location || "",
                });

                setUserImagePreview(data.ProfileImage || null);
                setAgencyImagePreview(data.Agency?.ProfileImage || null);
            } catch (error) {
                setErrorMessage("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const showSuccess = (message: string) => {
        setSuccessMessage(message);

        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    const showError = (message: string) => {
        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    };

    const handleUserImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setUserImage(file);

        const preview = URL.createObjectURL(file);
        setUserImagePreview(preview);
    };

    const handleAgencyImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setAgencyImage(file);

        const preview = URL.createObjectURL(file);
        setAgencyImagePreview(preview);
    };

    const handleEditProfile = async () => {
        if (!profile) return;

        try {
            const payload = {
                full_name: editForm.fullName,
                email: editForm.email,
                phone: editForm.phone,
                biography: editForm.biography,

                agency_name: editForm.agencyName,
                agency_slug: editForm.agencySlug,
                contact: editForm.agencyContact,
                agency_email: editForm.agencyEmail,
                description: editForm.agencyDescription,
                website: editForm.agencyWebsite,
                location: editForm.agencyLocation,
            };

            await updateUserProfile(payload);

            const updatedProfile = await fetchUserProfile();

            setProfile(updatedProfile);

            setEditForm({
                fullName: updatedProfile.FullName || "",
                email: updatedProfile.Email || "",
                phone: updatedProfile.Phone || "",
                biography: updatedProfile.Biography || "",

                agencyName: updatedProfile.Agency?.AgencyName || "",
                agencySlug: updatedProfile.Agency?.AgencySlug || "",
                agencyContact: updatedProfile.Agency?.Contact || "",
                agencyEmail: updatedProfile.Agency?.Email || "",
                agencyDescription: updatedProfile.Agency?.Description || "",
                agencyWebsite: updatedProfile.Agency?.Website || "",
                agencyLocation: updatedProfile.Agency?.Location || "",
            });

            showSuccess("Profile updated successfully.");
            setActiveModal(null);
        }
        catch (error: any) {
            showError(
                error?.response?.data?.error ||
                "Failed to update profile."
            );
        }
    };

    const handleChangePassword = async () => {
        if (!passwordData.currentPassword) {
            showError("Current password is required.");
            return;
        }
        if (!passwordData.newPassword) {
            showError("New password is required.");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            showError("New password must be at least 6 characters.");
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showError("Passwords do not match.");
            return;
        }

        try {
            await changeUserPassword({
                current_password: passwordData.currentPassword,
                new_password: passwordData.newPassword,
            });

            showSuccess("Password changed successfully.");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });

            setActiveModal(null);
        }
        catch (error: any) {
            showError(
                error?.response?.data?.error ||
                "Failed to change password."
            );
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();

            window.location.href = "/login";
        }
        catch (error: any) {
            showError(
                error?.response?.data?.error ||
                "Logout failed."
            );
        }
    };

    const handleDeleteAccount = async () => {
        try {
            /*
             * TODO:
             *
             * await deleteAccount()
             */

            window.location.href = "/goodbye";
        } catch (error) {
            showError("Failed to delete account.");
        }
    };

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
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* COVER */}

                    <div className="h-48 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 relative">
                        {/* USER AVATAR */}

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
                                                {profile.FullName?.charAt(0) ||
                                                    "A"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveModal("user-photo")
                                    }
                                    className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-2 border-2 border-white hover:bg-teal-700 transition-colors shadow-md"
                                >
                                    <Camera className="h-4 w-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* PROFILE HEADER */}

                    <div className="pt-20 pb-8 px-8">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {profile.FullName}
                                </h1>

                                <div className="flex items-center gap-2 mt-2 text-gray-600">
                                    <Mail className="h-4 w-4" />
                                    <span>{profile.Email}</span>
                                </div>

                                {profile.Phone && (
                                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                                        <Phone className="h-4 w-4" />
                                        <span>{profile.Phone}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm font-medium text-gray-600">
                                        {profile.Role}
                                    </span>

                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${profile.IsActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {profile.IsActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setActiveModal("edit")}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Profile
                            </button>
                        </div>

                        {/* BIOGRAPHY */}

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

                        {profile.Agency && (
                            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-16 w-16 rounded-xl overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                                            {agencyImagePreview ? (
                                                <img
                                                    src={agencyImagePreview}
                                                    alt={
                                                        profile.Agency.AgencyName
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-teal-100">
                                                    <Building2 className="h-7 w-7 text-teal-600" />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    {
                                                        profile.Agency
                                                            .AgencyName
                                                    }
                                                </h2>

                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full
                                                    ${profile.Agency.Status === "ACTIVE" ?
                                                        "bg-green-100 text-green-700" :
                                                        "bg-gray-100 text-gray-700"
                                                    }`}
                                                >
                                                    {profile.Agency.Status}
                                                </span>
                                            </div>

                                            {/* SLUG */}

                                            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 italic">
                                                <span># {profile.Agency.AgencySlug}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setActiveModal("edit")}
                                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-100 transition-colors text-sm"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                        Edit Agency
                                    </button>
                                </div>

                                {/* DESCRIPTION */}

                                {profile.Agency.Description && (
                                    <p className="text-gray-700 mt-5 leading-relaxed">
                                        {profile.Agency.Description}
                                    </p>
                                )}

                                {/* AGENCY DETAILS */}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {/* CONTACT */}

                                    {profile.Agency.Contact && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-gray-500 mt-0.5" />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Contact
                                                </p>

                                                <p className="text-gray-700 mt-1">
                                                    {profile.Agency.Contact}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* EMAIL */}

                                    {profile.Agency.Email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-gray-500 mt-0.5" />

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

                                    {/* LOCATION */}

                                    {profile.Agency.Location && (
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Location
                                                </p>

                                                <p className="text-gray-700 mt-1">
                                                    {
                                                        profile.Agency
                                                            .Location
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* WEBSITE */}

                                    {profile.Agency.Website && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-gray-500 mt-0.5" />

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Website
                                                </p>

                                                <a
                                                    href={
                                                        profile.Agency.Website
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-teal-600 hover:underline mt-1 block break-all"
                                                >
                                                    {
                                                        profile.Agency
                                                            .Website
                                                    }
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* SUBSCRIPTION */}

                                <div className="mt-6 pt-5 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                                Subscription Plan
                                            </p>

                                            <p className="font-semibold text-gray-800 mt-1">
                                                {
                                                    profile.Agency
                                                        .SubscriptionPlan
                                                }
                                            </p>
                                        </div>

                                        <div className="ml-8">
                                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                                Subscription Status
                                            </p>

                                            <p className="font-semibold text-gray-800 mt-1">
                                                {
                                                    profile.Agency
                                                        .SubscriptionStatus
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ================================================== */}
                        {/* ACTIONS */}
                        {/* ================================================== */}

                        <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveModal("password")
                                }
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Key className="h-4 w-4" />
                                Change Password
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-red-600"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowDeleteConfirm(true)
                                }
                                className="flex items-center gap-2 px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ====================================================== */}
            {/* EDIT PROFILE MODAL */}
            {/* ====================================================== */}

            {activeModal === "edit" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Edit Profile
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Update your personal and agency
                                        information.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveModal(null)
                                    }
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* USER */}

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
                                                type="text"
                                                value={editForm.fullName}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        fullName:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                value={editForm.email}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        email:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone
                                            </label>

                                            <input
                                                type="text"
                                                value={editForm.phone}
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        phone:
                                                            e.target.value,
                                                    })
                                                }
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
                                            value={editForm.biography}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    biography:
                                                        e.target.value,
                                                })
                                            }
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
                                            {/* NAME */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Agency Name
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        editForm.agencyName
                                                    }
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            agencyName:
                                                                e.target
                                                                    .value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>

                                            {/* SLUG */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Agency Slug
                                                </label>

                                                <div className="relative">
                                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                                                    <input
                                                        type="text"
                                                        value={
                                                            editForm.agencySlug
                                                        }
                                                        onChange={(e) =>
                                                            setEditForm({
                                                                ...editForm,
                                                                agencySlug:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* CONTACT */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Contact
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        editForm.agencyContact
                                                    }
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            agencyContact:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>

                                            {/* EMAIL */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Agency Email
                                                </label>

                                                <input
                                                    type="email"
                                                    value={
                                                        editForm.agencyEmail
                                                    }
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            agencyEmail:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>

                                            {/* LOCATION */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Location
                                                </label>

                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                                                    <input
                                                        type="text"
                                                        value={
                                                            editForm.agencyLocation
                                                        }
                                                        onChange={(e) =>
                                                            setEditForm({
                                                                ...editForm,
                                                                agencyLocation:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* WEBSITE */}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Website
                                                </label>

                                                <input
                                                    type="url"
                                                    value={
                                                        editForm.agencyWebsite
                                                    }
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            agencyWebsite:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                                />
                                            </div>
                                        </div>

                                        {/* DESCRIPTION */}

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>

                                            <textarea
                                                rows={4}
                                                value={
                                                    editForm.agencyDescription
                                                }
                                                onChange={(e) =>
                                                    setEditForm({
                                                        ...editForm,
                                                        agencyDescription:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* BUTTON */}

                                <div className="flex gap-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={handleEditProfile}
                                        className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveModal(null)
                                        }
                                        className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ====================================================== */}
            {/* USER PHOTO MODAL */}
            {/* ====================================================== */}

            {activeModal === "user-photo" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold">
                                Update Profile Photo
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveModal(null)
                                }
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <label className="block cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500 transition-colors">
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
                                onClick={() => {
                                    /*
                                     * TODO:
                                     *
                                     * uploadUserProfileImage(userImage)
                                     */
                                    showSuccess(
                                        "Profile image selected."
                                    );
                                    setActiveModal(null);
                                }}
                                disabled={!userImage}
                                className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg disabled:opacity-50"
                            >
                                Upload Image
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveModal(null)
                                }
                                className="px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ====================================================== */}
            {/* AGENCY PHOTO MODAL */}
            {/* ====================================================== */}

            {activeModal === "agency-photo" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold">
                                Update Agency Image
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveModal(null)
                                }
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <label className="block cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-500 transition-colors">
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
                                onClick={() => {
                                    /*
                                     * TODO:
                                     *
                                     * uploadAgencyProfileImage(
                                     *     agencyImage
                                     * )
                                     */
                                    showSuccess(
                                        "Agency image selected."
                                    );
                                    setActiveModal(null);
                                }}
                                disabled={!agencyImage}
                                className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg disabled:opacity-50"
                            >
                                Upload Image
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveModal(null)
                                }
                                className="px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ====================================================== */}
            {/* CHANGE PASSWORD */}
            {/* ====================================================== */}

            {activeModal === "password" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">
                                    Change Password
                                </h2>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveModal(null)
                                    }
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>

                                    <input
                                        type="password"
                                        value={
                                            passwordData.currentPassword
                                        }
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                currentPassword:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        value={
                                            passwordData.newPassword
                                        }
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                newPassword:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>

                                    <input
                                        type="password"
                                        value={
                                            passwordData.confirmPassword
                                        }
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                confirmPassword:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={
                                            handleChangePassword
                                        }
                                        className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                                    >
                                        Update Password
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveModal(null)
                                        }
                                        className="px-4 py-2.5 border border-gray-300 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ====================================================== */}
            {/* DELETE ACCOUNT */}
            {/* ====================================================== */}

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
                                    onClick={handleDeleteAccount}
                                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Yes, Delete Account
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowDeleteConfirm(false)
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
