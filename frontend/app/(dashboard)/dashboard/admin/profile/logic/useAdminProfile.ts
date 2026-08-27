"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
    fetchUserProfile,
    updateUserProfile,
    changeUserPassword,
    uploadUserProfileImage,
    uploadAgencyProfileImage,
    UserProfile,
} from "@/_lib/services/admin/profile.service";

import { authService } from "@/_lib/services/auth.service";
import { getImageUrl } from "@/_lib/helpers/url-image";
import { ProfileTheme } from "@/_constants/theme/profile";

type ActiveModal = | "edit" | "password" | "user-photo" | "agency-photo" | null;

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

const getProfileFormValues = (profile: UserProfile): AdminProfileFormValues => ({
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

export function useAdminProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const [profileTheme, setProfileTheme] = useState<ProfileTheme>("slate-teal");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);

    const [activeModal, setActiveModal] = useState<ActiveModal>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [userImage, setUserImage] = useState<File | null>(null);
    const [agencyImage, setAgencyImage] = useState<File | null>(null);
    const [userImagePreview, setUserImagePreview] = useState<string | null>(null);
    const [agencyImagePreview, setAgencyImagePreview] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const profileForm = useForm<AdminProfileFormValues>({
        defaultValues: {
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
        },

        mode: "onChange",
    });

    const { register, handleSubmit, reset,
        formState: {
            errors: profileErrors,
            isDirty: profileIsDirty,
        },
    } = profileForm;

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        getValues,
        reset: resetPassword,
        formState: {
            errors: passwordErrors,
            isSubmitting: isPasswordSubmitting,
        },
    } = useForm<PasswordFormValues>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

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

    const loadProfile = useCallback(async () => {
        try {
            setLoading(true);

            const data = await fetchUserProfile();

            setProfile(data);
            setProfileTheme(data.ProfileTheme || "slate-teal");
            reset(getProfileFormValues(data));

            setUserImagePreview(
                getImageUrl(data.ProfileImage) || "/default-profile.png"
            );

            setAgencyImagePreview(
                getImageUrl(data.Agency?.ProfileImage) || "/default-profile.png"
            );
        } catch (error: any) {
            showError(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to load profile."
            );
        } finally {
            setLoading(false);
        }
    }, [reset, showError]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);


    const openModal = useCallback(
        (modal: Exclude<ActiveModal, null>) => {
            setActiveModal(modal);
        },
        []
    );

    const closeModal = useCallback(() => {
        setActiveModal(null);

        if (activeModal === "password") {
            resetPassword();
        }
    }, [activeModal, resetPassword]);

    const onSubmitProfile = useCallback(
        async (values: AdminProfileFormValues) => {
            if (!profile) return;

            try {
                setSaving(true);

                const payload = {
                    full_name: values.fullName.trim(),
                    email: values.email.trim(),
                    phone: values.phone.trim(),
                    biography: values.biography.trim(),

                    agency_name: values.agencyName.trim(),
                    agency_slug: values.agencySlug.trim(),
                    contact: values.agencyContact.trim(),
                    agency_email: values.agencyEmail.trim(),
                    description: values.agencyDescription.trim(),
                    website: values.agencyWebsite.trim(),
                    location: values.agencyLocation.trim(),
                };

                // Update
                await updateUserProfile(payload);

                // Ambil profile terbaru
                const updatedProfile = await fetchUserProfile();

                setProfile(updatedProfile);

                // Sync React Hook Form
                reset(getProfileFormValues(updatedProfile));

                showSuccess("Profile updated successfully.");

                setActiveModal(null);
            } catch (error: any) {
                console.error("UPDATE PROFILE ERROR:", error);

                showError(
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Failed to update profile."
                );
            } finally {
                setSaving(false);
            }
        },
        [
            profile,
            reset,
            showError,
            showSuccess,
        ]
    );

    const onSubmitPassword = useCallback(
        async (values: PasswordFormValues) => {
            try {
                setChangingPassword(true);

                await changeUserPassword({
                    current_password: values.currentPassword,
                    new_password: values.newPassword,
                });

                showSuccess("Password changed successfully.");

                resetPassword();
                setActiveModal(null);
            }
            catch (error: any) {
                showError(
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    "Failed to change password."
                );
            } finally {
                setChangingPassword(false);
            }
        },
        [
            resetPassword,
            showError,
            showSuccess,
        ]
    );

    const handleUserImageChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                showError("Please select a valid image.");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                showError("Image size must be less than 5MB.");
                return;
            }

            setUserImage(file);

            const preview = URL.createObjectURL(file);

            setUserImagePreview(preview);
        },
        [showError]
    );

    const handleAgencyImageChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                showError("Please select a valid image.");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                showError("Image size must be less than 5MB.");
                return;
            }

            setAgencyImage(file);

            const preview = URL.createObjectURL(file);

            setAgencyImagePreview(preview);
        },
        [showError]
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

    const uploadUserImage = useCallback(async () => {
        if (!userImage) return;

        try {
            const response = await uploadUserProfileImage(userImage);

            setProfile((current) => {
                if (!current) return current;

                return {
                    ...current,
                    ProfileImage: response.profile_image,
                };
            });

            setUserImagePreview(
                getImageUrl(response.profile_image)
            );
            setUserImage(null);
            setActiveModal(null);
            showSuccess("Profile image selected.");
        }
        catch (error: any) { showError(error?.response?.data?.error || "Failed to upload profile image.") }
    }, [userImage, showError, showSuccess]);

    const uploadAgencyImage = useCallback(async () => {
        if (!agencyImage) return;

        try {
            const response = await uploadAgencyProfileImage(agencyImage);

            setProfile((current) => {
                if (!current || !current.Agency) {
                    return current;
                }

                return {
                    ...current,

                    Agency: {
                        ...current.Agency,
                        ProfileImage: response.profile_image,
                    },
                };
            });

            setAgencyImagePreview(
                getImageUrl(response.profile_image)
            );
            setAgencyImage(null);
            setActiveModal(null);

            showSuccess("Agency image updated successfully.");
        }
        catch (error: any) { showError(error?.response?.data?.error || "Failed to upload agency image.") }
    }, [agencyImage, showError, showSuccess]);

    const handleLogout = useCallback(async () => {
        try {
            setLoggingOut(true);

            await authService.logout();

            window.location.href = "/login";
        } catch (error: any) {
            showError(
                error?.response?.data?.error ||
                "Logout failed."
            );

            setLoggingOut(false);
        }
    }, [showError]);

    const handleDeleteAccount = useCallback(async () => {
        try {
            setDeletingAccount(true);

            /*
             * TODO:
             *
             * await deleteAccount();
             */

            window.location.href = "/goodbye";
        }
        catch (error: any) { showError(error?.response?.data?.error || "Failed to delete account.") }
        finally { setDeletingAccount(false) }
    }, [showError]);

    return {
        profile, loading,

        profileTheme, setProfileTheme,

        activeModal, openModal, closeModal, setActiveModal,

        showDeleteConfirm, setShowDeleteConfirm,
        successMessage, errorMessage,

        register, handleSubmit, onSubmitProfile,
        profileErrors, profileIsDirty, saving,

        registerPassword, handlePasswordSubmit, onSubmitPassword,
        passwordErrors, changingPassword, getValues,

        userImage, agencyImage,

        userImagePreview, agencyImagePreview,

        handleUserImageChange, handleAgencyImageChange,

        uploadUserImage, uploadAgencyImage,

        resetUserImage, resetAgencyImage,

        handleLogout, loggingOut,

        handleDeleteAccount, deletingAccount,

        loadProfile,
    };
}
