"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
    UserProfile,
    fetchUserProfile,
    updateUserProfile,
    uploadUserProfileImage,
    uploadAgencyProfileImage,
    changeUserPassword,
    deleteUserAccount,
} from "@/_lib/services/admin/profile.service";

import { authService } from "@/_lib/services/auth.service";
import { getImageUrl } from "@/_lib/helpers/url-image";
import { ProfileTheme } from "@/_constants/theme/profile";

type ActiveModal = "edit" | "password" | null;

export interface AdminProfileFormValues {
    fullName: string;
    email: string;
    phone: string;
    biography: string;

    agencyName: string;
    agencySlug: string;
    agencyContact: string;
    agencyEmail: string;
    agencyDescription: string;
    agencyWebsite: string;
    agencyLocation: string;
}

export interface PasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const EMPTY_PROFILE_FORM: AdminProfileFormValues = {
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
};

const getProfileFormValues = (
    profile: UserProfile
): AdminProfileFormValues => ({
    fullName: profile.FullName || "",
    email: profile.Email || "",
    phone: profile.Phone || "",
    biography: profile.Biography || "",

    agencyName: profile.Agency?.AgencyName || "",
    agencySlug: profile.Agency?.AgencySlug || "",
    agencyContact: profile.Agency?.Contact || "",
    agencyEmail: profile.Agency?.Email || "",
    agencyDescription: profile.Agency?.Description || "",
    agencyWebsite: profile.Agency?.Website || "",
    agencyLocation: profile.Agency?.Location || "",
});

const getErrorMessage = (
    error: any,
    fallback: string
): string => {
    return (
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        fallback
    );
};

export function useAdminProfile() {
    // ==========================================================
    // PROFILE
    // ==========================================================

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [profileTheme, setProfileTheme] =
        useState<ProfileTheme>("slate-teal");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ==========================================================
    // MODALS
    // ==========================================================

    const [activeModal, setActiveModal] =
        useState<ActiveModal>(null);

    const [showDeleteConfirm, setShowDeleteConfirm] =
        useState(false);

    const openModal = useCallback(
        (modal: Exclude<ActiveModal, null>) => {
            setActiveModal(modal);
        },
        []
    );

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);

    // ==========================================================
    // NOTIFICATION
    // ==========================================================

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const showSuccess = useCallback((message: string) => {
        setSuccessMessage(message);

        window.setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    }, []);

    const showError = useCallback((message: string) => {
        setErrorMessage(message);

        window.setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    }, []);

    // ==========================================================
    // PROFILE FORM
    // ==========================================================

    const profileForm =
        useForm<AdminProfileFormValues>({
            defaultValues: EMPTY_PROFILE_FORM,
            mode: "onChange",
        });

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors: profileErrors,
        },
    } = profileForm;

    // ==========================================================
    // PASSWORD FORM
    // ==========================================================

    const passwordForm =
        useForm<PasswordFormValues>({
            defaultValues: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            mode: "onChange",
        });

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        reset: resetPassword,
        formState: {
            errors: passwordErrors,
            isSubmitting: changingPassword,
        },
    } = passwordForm;

    // ==========================================================
    // IMAGE
    // ==========================================================

    const [userImage, setUserImage] =
        useState<File | null>(null);

    const [agencyImage, setAgencyImage] =
        useState<File | null>(null);

    const [userImagePreview, setUserImagePreview] =
        useState<string | null>(null);

    const [agencyImagePreview, setAgencyImagePreview] =
        useState<string | null>(null);

    const validateImage = useCallback(
        (file: File): boolean => {
            if (!file.type.startsWith("image/")) {
                showError("Please select a valid image.");
                return false;
            }

            if (file.size > 5 * 1024 * 1024) {
                showError("Image size must be less than 5MB.");
                return false;
            }

            return true;
        },
        [showError]
    );

    const handleImageChange = useCallback(
        (
            event: React.ChangeEvent<HTMLInputElement>,
            type: "user" | "agency"
        ) => {
            const file = event.target.files?.[0];

            if (!file || !validateImage(file)) {
                return;
            }

            const preview = URL.createObjectURL(file);

            if (type === "user") {
                setUserImage(file);
                setUserImagePreview(preview);
            } else {
                setAgencyImage(file);
                setAgencyImagePreview(preview);
            }
        },
        [validateImage]
    );

    const handleUserImageChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            handleImageChange(event, "user");
        },
        [handleImageChange]
    );

    const handleAgencyImageChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            handleImageChange(event, "agency");
        },
        [handleImageChange]
    );

    const resetUserImage = useCallback(() => {
        setUserImage(null);

        setUserImagePreview(
            getImageUrl(profile?.ProfileImage)
        );
    }, [profile?.ProfileImage]);

    const resetAgencyImage = useCallback(() => {
        setAgencyImage(null);

        setAgencyImagePreview(
            getImageUrl(profile?.Agency?.ProfileImage)
        );
    }, [profile?.Agency?.ProfileImage]);

    // ==========================================================
    // LOAD PROFILE
    // ==========================================================

    const loadProfile = useCallback(async () => {
        try {
            setLoading(true);

            const data = await fetchUserProfile();

            setProfile(data);
            setProfileTheme(data.ProfileTheme);

            reset(getProfileFormValues(data));

            setUserImagePreview(
                getImageUrl(data.ProfileImage)
            );

            setAgencyImagePreview(
                getImageUrl(data.Agency?.ProfileImage)
            );
        } catch (error) {
            showError(
                getErrorMessage(
                    error,
                    "Failed to load profile."
                )
            );
        } finally {
            setLoading(false);
        }
    }, [reset, showError]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    // ==========================================================
    // UPDATE PROFILE
    // ==========================================================

    const onSubmitProfile = useCallback(
        async (values: AdminProfileFormValues) => {
            if (!profile) return;

            try {
                setSaving(true);

                await updateUserProfile({
                    full_name: values.fullName.trim(),
                    email: values.email.trim(),
                    phone: values.phone.trim(),
                    biography: values.biography.trim(),

                    profile_theme: profileTheme,

                    agency_name: values.agencyName.trim(),
                    agency_slug: values.agencySlug.trim(),
                    contact: values.agencyContact.trim(),
                    agency_email: values.agencyEmail.trim(),
                    description: values.agencyDescription.trim(),
                    website: values.agencyWebsite.trim(),
                    location: values.agencyLocation.trim(),
                });

                if (userImage) {
                    await uploadUserProfileImage(userImage);
                }

                if (agencyImage) {
                    await uploadAgencyProfileImage(agencyImage);
                }

                const updatedProfile =
                    await fetchUserProfile();

                setProfile(updatedProfile);
                setProfileTheme(
                    updatedProfile.ProfileTheme
                );

                reset(
                    getProfileFormValues(updatedProfile)
                );

                setUserImage(null);
                setAgencyImage(null);

                showSuccess(
                    "Profile updated successfully."
                );

                closeModal();
            } catch (error) {
                showError(
                    getErrorMessage(
                        error,
                        "Failed to update profile."
                    )
                );
            } finally {
                setSaving(false);
            }
        },
        [
            profile,
            profileTheme,
            userImage,
            agencyImage,
            reset,
            closeModal,
            showError,
            showSuccess,
        ]
    );

    // ==========================================================
    // CHANGE PASSWORD
    // ==========================================================

    const onSubmitPassword = useCallback(
        async (values: PasswordFormValues) => {
            try {
                await changeUserPassword({
                    current_password:
                        values.currentPassword,
                    new_password:
                        values.newPassword,
                    confirm_password:
                        values.confirmPassword,
                });

                resetPassword();
                closeModal();

                showSuccess(
                    "Password changed successfully."
                );
            } catch (error) {
                showError(
                    getErrorMessage(
                        error,
                        "Failed to change password."
                    )
                );
            }
        },
        [
            resetPassword,
            closeModal,
            showError,
            showSuccess,
        ]
    );

    // ==========================================================
    // LOGOUT
    // ==========================================================

    const [loggingOut, setLoggingOut] =
        useState(false);

    const handleLogout = useCallback(async () => {
        try {
            setLoggingOut(true);

            await authService.logout();

            window.location.href = "/login";
        } catch (error) {
            showError(
                getErrorMessage(
                    error,
                    "Logout failed."
                )
            );

            setLoggingOut(false);
        }
    }, [showError]);

    // ==========================================================
    // DELETE ACCOUNT
    // ==========================================================

    const [deletingAccount, setDeletingAccount] =
        useState(false);

    const handleDeleteAccount = useCallback(
        async () => {
            try {
                setDeletingAccount(true);

                await deleteUserAccount();

                localStorage.removeItem(
                    "accessToken"
                );

                window.dispatchEvent(
                    new Event("auth:logout")
                );

                window.location.href = "/login";
            } catch (error) {
                showError(
                    getErrorMessage(
                        error,
                        "Failed to delete account."
                    )
                );

                setDeletingAccount(false);
            }
        },
        [showError]
    );

    // ==========================================================
    // RETURN
    // ==========================================================

    return {
        // Profile
        profile,
        loading,

        // Profile modal
        activeModal,
        openModal,
        closeModal,

        // Profile form
        profileTheme,
        setProfileTheme,

        register,
        handleSubmit,
        onSubmitProfile,
        profileErrors,
        saving,

        // Images
        userImage,
        agencyImage,

        userImagePreview,
        agencyImagePreview,

        handleUserImageChange,
        handleAgencyImageChange,

        resetUserImage,
        resetAgencyImage,

        // Password
        registerPassword,
        handlePasswordSubmit,
        onSubmitPassword,
        passwordErrors,
        changingPassword,

        // Notifications
        successMessage,
        errorMessage,

        // Logout
        handleLogout,
        loggingOut,

        // Delete
        showDeleteConfirm,
        setShowDeleteConfirm,
        handleDeleteAccount,
        deletingAccount,
    };
}
